process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');

const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

// Strategy: For each seed generator, extract all "c:" values by parsing the code
// The generators ALL use format: {t:..., n:..., q:..., c:..., o:[...]}
// or t.push({t:..., q:..., c:..., o:[...]})

function extractCorrectFromGenerator(filePath){
  const code=fs.readFileSync(filePath,'utf8');
  const corrects=[];
  // Match all { ... c: 'VALUE' ... } or { ... c: `VALUE` ... }
  // The pattern: a block that contains c: followed by a string
  // This is inside a push() call
  
  // Find all themas.push() or t.push() calls
  const pushRegex=/\.push\(({[^}]+?c:([^,}]+)[^}]+?})\)/g;
  // Actually let me be more careful - extract the whole push content
  const pushBlocks=[];
  let lastIdx=0;
  while(true){
    const idx=code.indexOf('.push({',lastIdx);
    if(idx===-1) break;
    // Find matching closing brace
    let depth=0,start=idx+7; // after .push({
    let end=start;
    for(let i=start;i<code.length;i++){
      if(code[i]==='{') depth++;
      else if(code[i]==='}'){
        if(depth===0){end=i;break;}
        depth--;
      }else if(code[i]==='`'){
        // Skip template literal
        i++;
        while(i<code.length&&code[i]!=='`'){if(code[i]==='\\')i++;i++;}
      }else if(code[i]==="'"||code[i]==='"'){
        const q=code[i];i++;
        while(i<code.length&&code[i]!==q){if(code[i]==='\\')i++;i++;}
      }
    }
    pushBlocks.push(code.substring(start,end));
    lastIdx=end+1;
  }

  for(const block of pushBlocks){
    // Extract c:VALUE — the value after c:
    const cMatch=block.match(/\bc:\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|([^,}\s]+))/);
    if(cMatch){
      let val=cMatch[1];
      // Strip quotes
      if((val.startsWith("'")&&val.endsWith("'"))||(val.startsWith('"')&&val.endsWith('"'))){
        val=val.slice(1,-1);
      }else if(val.startsWith('`')&&val.endsWith('`')){
        val=val.slice(1,-1);
        // Template literal with expressions like ${...} — keep as placeholder
        if(val.includes('$')) val=null;
      }
      if(val) corrects.push(val);
    }
  }
  return corrects;
}

async function main(){
  const genDir=__dirname;
  let totalFixed=0;

  for(let v=1;v<=34;v++){
    const fpath=`${genDir}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    
    const corrects=extractCorrectFromGenerator(fpath);
    if(corrects.length===0){
      console.log(`v${v}: 0 correct answers extracted, skipping`);
      continue;
    }

    // For each index, find matching exercise in DB where source = gen-vN|index
    let fixed=0;
    for(let idx=0;idx<corrects.length;idx++){
      const src=`gen-v${v}|${idx}`;
      const correct=corrects[idx];
      
      // Get the exercise
      const ex=await p.query('SELECT id, options FROM exercises WHERE source=$1',[src]);
      if(ex.rows.length===0) continue;
      
      const opts=ex.rows[0].options;
      if(!Array.isArray(opts)||opts.length<2) continue;

      // Check if correct answer is already at index 0
      if(opts[0]===correct) continue; // already correct

      // Check if correct answer exists in options
      const ci=opts.indexOf(correct);
      if(ci===-1){
        // Correct answer not found in options — something's wrong
        console.log(`  v${v}|${idx}: correct "${correct}" not in options ${JSON.stringify(opts)}`);
        continue;
      }

      // Move correct answer to index 0 (swap with current[0])
      const newOpts=[...opts];
      newOpts[0]=correct;
      newOpts[ci]=opts[0];
      
      await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),ex.rows[0].id]);
      fixed++;
    }
    if(fixed>0) console.log(`v${v}: fixed ${fixed}/${corrects.length} exercises`);
    totalFixed+=fixed;
  }

  console.log(`\nTotal exercises fixed: ${totalFixed}`);

  // Verify some exercises
  console.log('\n=== Verification: sample fixed exercises ===');
  const samples=await p.query(`
    SELECT id, source, LEFT(options::text,120) as opts
    FROM exercises WHERE archivo_origen='generacion-programatica' 
    ORDER BY RANDOM() LIMIT 5
  `);
  samples.rows.forEach(r=>console.log('id:',r.id,'source:',r.source,'opts:',r.opts));

  // Check total count
  const all=await p.query("SELECT COUNT(1) FROM exercises WHERE archivo_origen='generacion-programatica'");
  console.log(`\nTotal seed-generator exercises: ${all.rows[0].count}`);

  await p.end();
}
main().catch(console.error);
