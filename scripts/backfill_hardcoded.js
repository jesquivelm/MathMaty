process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const vm=require('vm');
const path=require('path');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

// Extract S variable from generator code
function extractS(code){
  const m=code.match(/const\s+S\s*=\s*['"`]([^'"`]+)['"`]/);
  return m?m[1]:null;
}

// Extract named array (probs or temas) and return it
function extractArray(code){
  // Try const temas = [...]
  const temasMatch=code.match(/const\s+temas\s*=\s*\[/);
  if(temasMatch){
    const start=temasMatch.index;
    // Find matching ]
    let depth=0,i=start;
    for(;i<code.length;i++){
      if(code[i]==='[')depth++;
      if(code[i]===']'){depth--;if(depth===0)break;}
    }
    if(i<code.length){
      const arrStr=code.substring(start+('const temas ='.length),i+1);
      try{
        const arr=vm.runInNewContext(`(${arrStr})`,{},{timeout:3000});
        if(Array.isArray(arr))return arr;
      }catch(e){/* ignore */}
    }
  }
  return null;
}

// Parse correct answers from a probs or temas array
function parseCorrectFromArray(arr,S){
  const map={};
  const srcTemplate=getSrcTemplate(arr,S);
  if(!srcTemplate)return map;
  for(let i=0;i<arr.length;i++){
    const e=arr[i];
    if(e.c!==undefined){
      const src=srcTemplate(i,e);
      if(src) map[src]=String(e.c).trim();
    }
  }
  return map;
}

// Determine how source is constructed for this generator
function getSrcTemplate(arr,S){
  // Try to detect source format from code patterns
  
  // v4-v20 pattern: S+'|'+typeName+'|'+i  (like 'gen-prog-v4|logic|0')
  // For arrays returned from genLogic(), genVerbal(), etc.
  // These are collections: the array items map to {t, q, c, o}
  // But the source includes the function name (typeName), not just the t value
  
  // For arrays that have {t, q, c, o, tx, ans, ...}
  // Source: S+'|'+label+'|'+i  (v4 insertAll function)
  // Or: S+'|'+e.t+'|'+i (v7, v8, etc. pattern)
  
  // We need to match by source suffix: S+'|'+topic+'|'+i
  // where topic may or may not match arr[i].t
  
  // For v4: source = S+'|'+'logic'+'|'+i
  // For v7: source = S+'|'+e.t+'|'+i
  // For v21: source = S+'|'+e.t+'|'+i
  
  // Return null — we'll use a different approach
  return null;
}

// APPROACH: Parse each generator file, look for hardcoded probs/temas arrays,
// extract {t, c} pairs, and try ALL possible source format combinations

async function extractAndFix(genNum){
  const fpath=path.join(__dirname,`seed_generator_v${genNum}.js`);
  if(!fs.existsSync(fpath)){return;}

  const code=fs.readFileSync(fpath,'utf8');
  const S=extractS(code);
  if(!S){console.log(`v${genNum}: no S found`);return;}

  // Find all hardcoded arrays with c: values
  // Pattern: {..., c:'...', ...} or {..., c:"...", ...}
  // Extract from the raw code
  const entries=[];
  const objRegex=/\{[^]*?t:\s*['"]([^'"]+)['"][^]*?c:\s*['"]([^'"]+)['"][^]*?o:\s*\[([^\]]*)\][^]*?\}/g;
  let match;
  while((match=objRegex.exec(code))!==null){
    const t=match[1],c=match[2];
    // count occurrences of this {t, c} to handle duplicates
    entries.push({t,c});
  }

  if(entries.length===0){
    console.log(`v${genNum}: no hardcoded entries found`);
    return;
  }

  // Deduplicate by (t, c) keeping order
  const seen=new Set();
  const unique=[];
  for(const e of entries){
    const key=e.t+'|||'+e.c;
    if(!seen.has(key)){seen.add(key);unique.push(e);}
  }

  // Try source format possibilities:
  // Format A: S+'|'+e.t+'|'+i  (used by v7-v21 etc.)
  // Format B: S+'|'+label+'|'+i (used by v4's insertAll)
  // Format C: other patterns

  // Fetch all DB exercises for this generator prefix
  const dbRows=await p.query(
    "SELECT id, source, options FROM exercises WHERE source LIKE $1||'|%' AND archivo_origen='generacion-programatica'",
    [S]
  );
  
  if(dbRows.rows.length===0){
    console.log(`v${genNum}: no DB exercises matching '${S}|%'`);
    return;
  }

  // Build db source -> {id, opts} map
  const dbMap={};
  for(const r of dbRows.rows) dbMap[r.source]={id:r.id, opts:r.options};

  // Now for each entry, we know:
  // - t (topic)
  // - c (correct answer)
  // We need to find the correct source format:
  //   source = S + '|' + t + '|' + i  (most common)
  // But i is unknown.
  
  // Strategy: for each source in dbMap, check if the options contain c and c is not at index 0
  let fixed=0;
  for(const [src,db] of Object.entries(dbMap)){
    const opts=db.opts;
    if(!Array.isArray(opts)||opts.length===0)continue;
    
    // First, check if correct answer is at index 0
    const first=String(opts[0]).trim();
    
    // Try each extracted entry: see if c matches first
    let shouldFix=false;
    let correctVal=null;
    
    for(const e of unique){
      // Check if this entry's source could match this src
      // source is like: S|topic|index where S is the generator prefix
      const srcParts=src.split('|');
      const srcTopicIdx=src.indexOf('|'); // first |
      const srcTopic=src.substring(srcTopicIdx+1); // everything after S|
      
      // Check if e.t appears in the source (topic match)
      if(srcTopic.startsWith(e.t+'|')||srcTopic===e.t){
        // Topic matches, check if c matches one of the options
        const ci=opts.findIndex(o=>String(o).trim()===e.c);
        if(ci>0){
          shouldFix=true;
          correctVal=e.c;
          break;
        }else if(ci===0){
          // Already correct at index 0
          break;
        }
      }
    }
    
    if(shouldFix&&correctVal){
      const ci=opts.findIndex(o=>String(o).trim()===correctVal);
      if(ci>0){
        const newOpts=[...opts];
        newOpts[0]=opts[ci];
        newOpts[ci]=opts[0];
        await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),db.id]);
        fixed++;
      }
    }
  }

  console.log(`v${genNum}: fixed ${fixed}/${dbRows.rows.length} exercises`);
}

async function main(){
  for(let v=4;v<=21;v++){
    if(v===3)continue; // v3 is random gen
    try{
      await extractAndFix(v);
    }catch(e){
      console.log(`v${v} error: ${e.message}`);
    }
  }
  console.log('\nDone with v4-v21');
  await p.end();
}
main().catch(e=>{console.error(e.message);process.exit(1);});
