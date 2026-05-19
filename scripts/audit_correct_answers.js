process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const path=require('path');
const vm=require('vm');

const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

async function main(){
  // 1. Collect all exercises that come from seed generators (archivo_origen = 'generacion-programatica')
  const seedEx=await p.query("SELECT id, source, options, question FROM exercises WHERE archivo_origen='generacion-programatica' ORDER BY source");
  console.log('Seed-generated exercises in DB:', seedEx.rows.length);

  // 2. For each generator v1-v34, extract correct answers
  // We'll build { source: correctAnswer } mapping
  const correctMap={};

  for(let v=1;v<=34;v++){
    const fpath=path.join(__dirname,`seed_generator_v${v}.js`);
    if(!fs.existsSync(fpath)) continue;
    const code=fs.readFileSync(fpath,'utf8');

    // We need to evaluate the code but replace the DB INSERT with capture
    // The generators build a `temas` or `t` array, then iterate inserting
    // Strategy: replace the INSERT call with a capture function
    
    let captured=[];
    const mockPool={
      query:(sql,params)=>{
        // Capture the correct answer and source
        // Parse SQL INSERT to extract what we need
        // Actually, we'll capture via a different mechanism
        captured=temasArr; // capture the temas array
      }
    };

    // We'll use a different approach: wrap in a VM sandbox
    // Replace the INSERT into exercises with a push to a global array
    const modifiedCode=code
      .replace(/await p\.query\([\s\S]*?INSERT INTO exercises[\s\S]*?\);/g,'')
      .replace(/await p\.query\([\s\S]*?\);/g,'')
      .replace(/const \{Pool\}=require\('pg'\);/,'')
      .replace(/const p=new Pool\([\s\S]*?\);/,'')
      .replace(/source:\$[\d]+/g,'source:"CAPTURED"')
      .replace(/archivo_origen:\$[\d]+/g,'archivo_origen:"CAPTURED"');

    // Actually, this is getting complex. Let me take a simpler approach:
    // Just extract the {q, c, o} tuples from the source code using regex
    // The generators all have patterns like: {t:..., q:..., c:..., o:[...]}
  }

  // Simple regex approach: extract all {t, n, q, c, o} patterns
  // We already have source, we need to find the correct answer for each
  // Let's try a different strategy
  
  // For exercises with source matching gen-vN|M, try to find the correct answer
  // by looking at the options to find which option appears as the correct answer
  // in the solution_steps (last math field)
  
  console.log('\n=== Attempting to recover correct answers from solution_steps ===');
  const withSteps=await p.query(`
    SELECT id, source, options, 
           solution_steps#>>'{0}' as step0,
           solution_steps#>'{0}'->>'math' as step0math,
           jsonb_array_length(solution_steps) as steps_len
    FROM exercises 
    WHERE archivo_origen='generacion-programatica'
    LIMIT 10
  `);
  for(const r of withSteps.rows){
    console.log('\nid:',r.id, 'source:',r.source);
    console.log('  options:',JSON.stringify(r.options).slice(0,150));
    console.log('  steps_len:',r.steps_len, 'step0math:',r.step0math?.slice(0,60));
  }

  // Check if options is stored as array or as {o, ci} object
  const formatCheck=await p.query(`
    SELECT id, source, pg_typeof(options) as opt_type,
           CASE 
             WHEN options IS NULL THEN 'null'
             WHEN jsonb_typeof(options) = 'array' THEN 'array'
             WHEN jsonb_typeof(options) = 'object' THEN 'object'
             ELSE jsonb_typeof(options) 
           END as opt_format
    FROM exercises WHERE archivo_origen='generacion-programatica' LIMIT 5
  `);
  console.log('\n=== Options format check ===');
  formatCheck.rows.forEach(r=>console.log('id:',r.id,'format:',r.opt_format));

  // Check exercises with correct solution stored properly
  console.log('\n=== Sample of non-seed exercises ===');
  const nonSeed=await p.query(`
    SELECT id, source, archivo_origen, LEFT(options::text,100) as opts
    FROM exercises 
    WHERE archivo_origen IS DISTINCT FROM 'generacion-programatica'
      AND archivo_origen IS NOT NULL
    LIMIT 10
  `);
  nonSeed.rows.forEach(r=>console.log('id:',r.id,'src:',r.source,'archivo:',r.archivo_origen,'opts:',r.opts));

  await p.end();
}
main().catch(console.error);
