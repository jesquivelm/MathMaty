process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const vm=require('vm');
const path=require('path');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

const SCRIPTS_DIR=__dirname;
const DB_PREFIX='generacion-programatica';

// Extract S and array(s) from generator code, return source->correct mapping
function extractMappingFromGenerator(code, genNum){
  const sMatch=code.match(/const\s+S\s*=\s*['"]([^'"]+)['"]/);
  if(!sMatch) return null;
  const S=sMatch[1];

  const mapping={};

  // Remove JS single-line comments (but not inside strings)
  const cleaned=code.replace(/\/\/.*$/gm,'');

  // Try to find and evaluate top-level arrays: const probs=[...], const temas=[...], const extra=[...]
  const arrays=[
    {name:'probs',re:/const\s+probs\s*=\s*(\[[\s\S]*?\];)/},
    {name:'temas',re:/const\s+temas\s*=\s*(\[[\s\S]*?\];)/},
    {name:'extra',re:/const\s+extra\s*=\s*(\[[\s\S]*?\];)/},
  ];

  for(const arr of arrays){
    const match=matchBrackets(cleaned, arr.name);
    if(!match) continue;
    try{
      const parsed=vm.runInNewContext(`(${match})`,{},{timeout:5000});
      if(!Array.isArray(parsed)) continue;
      for(let i=0;i<parsed.length;i++){
        const e=parsed[i];
        if(e.c!==undefined){
          // Source format: S + '|' + e.t + '|' + i
          // (used by all v5-v23 generators)
          const src=`${S}|${e.t}|${i}`;
          mapping[src]=String(e.c).trim();
        }
      }
      console.log(`  Found array '${arr.name}' with ${parsed.length} entries`);
    }catch(e){
      console.log(`  Error parsing array '${arr.name}': ${e.message.substring(0,80)}`);
    }
  }

  // For v4: also look for arrays inside functions
  // genLogic -> types, genVerbal -> types, genAlgebraicFractions -> probs, genCalc -> probs, genMore -> probs
  if(genNum===4){
    const funcArrays=[
      {func:'genLogic',label:'logic'},
      {func:'genVerbal',label:'verbal'},
      {func:'genAlgebraicFractions',label:'fracalg'},
      {func:'genCalc',label:'calc'},
      {func:'genMore',label:'more'},
    ];
    for(const fa of funcArrays){
      const innerMapping=extractV4FuncArray(cleaned, S, fa.func, fa.label);
      if(innerMapping) Object.assign(mapping, innerMapping);
    }
  }

  return Object.keys(mapping).length>0 ? mapping : null;
}

// Extract array inside a function in v4 and build mapping
function extractV4FuncArray(code, S, funcName, label){
  // Find function: function genLogic(){ ... }
  const fnStart=code.indexOf(`function ${funcName}(`);
  if(fnStart===-1) return null;

  // Find the innermost array inside this function
  // Look for: const types=[...] or const probs=[...]
  const fnCode=code.substring(fnStart);
  const arrNames=['types','probs','type'];
  
  for(const an of arrNames){
    const arrText=matchBrackets(fnCode, an);
    if(!arrText) continue;
    try{
      const parsed=vm.runInNewContext(`(${arrText})`,{},{timeout:5000});
      if(!Array.isArray(parsed)) continue;
      const mapping={};
      for(let i=0;i<parsed.length;i++){
        const e=parsed[i];
        const c=e.c||e.ans; // some v4 entries have 'ans' field
        if(c!==undefined){
          const src=`${S}|${label}|${i}`;
          mapping[src]=String(c).trim();
        }
      }
      if(Object.keys(mapping).length>0){
        console.log(`  Found v4 func '${funcName}' -> '${label}' with ${parsed.length} entries`);
        return mapping;
      }
    }catch(e){/* ignore */}
  }
  return null;
}

// Find const X = [...] using bracket counting
function matchBrackets(code, name){
  const re=new RegExp(`const\\s+${name}\\s*=\\s*\\[`);
  const match=re.exec(code);
  if(!match) return null;

  const start=match.index+match[0].length-1; // position of [
  let depth=1,i=start+1;
  for(;i<code.length&&depth>0;i++){
    if(code[i]==='[') depth++;
    else if(code[i]===']') depth--;
    // Skip strings
    else if(code[i]==="'"){i++;while(i<code.length&&code[i]!=="'"){if(code[i]==='\\')i++;i++;}}
    else if(code[i]==='"'){i++;while(i<code.length&&code[i]!=='"'){if(code[i]==='\\')i++;i++;}}
  }
  if(depth!==0) return null;

  return code.substring(start, i);
}

async function fixGenerator(genNum){
  const fpath=path.join(SCRIPTS_DIR,`seed_generator_v${genNum}.js`);
  if(!fs.existsSync(fpath)) return;

  console.log(`\n=== v${genNum} ===`);
  const code=fs.readFileSync(fpath,'utf8');
  const mapping=extractMappingFromGenerator(code, genNum);
  if(!mapping) {console.log('  No extractable mapping found'); return;}

  const S=(code.match(/const\s+S\s*=\s*['"]([^'"]+)['"]/)||[])[1];
  if(!S) return;

  // Get all DB exercises matching this generator
  const pattern=`${S}|%`;
  const dbRows=await p.query(
    "SELECT id, source, options FROM exercises WHERE source LIKE $1 AND archivo_origen=$2",
    [pattern, DB_PREFIX]
  );
  console.log(`  DB exercises matching '${pattern}': ${dbRows.rows.length}`);

  let fixed=0, alreadyGood=0, skipped=0;
  for(const row of dbRows.rows){
    const src=row.source;
    const opts=row.options;
    if(!Array.isArray(opts)||opts.length<2){skipped++; continue;}

    const correct=mapping[src];
    if(!correct){skipped++; continue;}

    const first=String(opts[0]).trim();
    if(first===correct){alreadyGood++; continue;}

    // Find correct answer in options
    const ci=opts.findIndex(o=>String(o).trim()===correct);
    if(ci<=0){skipped++; continue;}

    // Swap correct to position 0
    const newOpts=[...opts];
    newOpts[0]=opts[ci];
    newOpts[ci]=opts[0];
    await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),row.id]);
    fixed++;
  }

  console.log(`  Fixed: ${fixed}, Already OK: ${alreadyGood}, Skipped: ${skipped}`);
  return fixed;
}

async function main(){
  let totalFixed=0;
  for(let v=4;v<=23;v++){
    if(v===3) continue; // random gen, skip
    try{
      totalFixed+=await fixGenerator(v)||0;
    }catch(e){
      console.log(`  ERROR: ${e.message}`);
    }
  }
  console.log(`\n=== TOTAL FIXED: ${totalFixed} ===`);

  // Verify some exercises
  const samples=await p.query(`
    SELECT id, source, LEFT(options::text,60) as opts
    FROM exercises WHERE archivo_origen='generacion-programatica' AND source LIKE 'gen-prog-v%'
    ORDER BY RANDOM() LIMIT 5
  `);
  console.log('\n=== Verification samples ===');
  samples.rows.forEach(r=>console.log(r.id, r.source, r.opts));

  await p.end();
}
main().catch(e=>{console.error(e.message);process.exit(1);});
