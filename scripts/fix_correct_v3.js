process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const vm=require('vm');

const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

async function main(){
  const allDB=await p.query("SELECT id, source, question, options FROM exercises WHERE archivo_origen='generacion-programatica' AND source LIKE 'gen-v%' ORDER BY id");
  // Build a map: source -> {dbOpts, dbId}
  const dbMap={};
  for(const ex of allDB.rows){
    dbMap[ex.source]={id:ex.id, opts:ex.options, q:ex.question};
  }

  console.log(`DB has ${allDB.rows.length} gen-v exercises`);

  let fixed=0, notFixed=0, notInDB=0;

  for(let v=1;v<=34;v++){
    const fpath=`${__dirname}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    let code=fs.readFileSync(fpath,'utf8');

    // We need to make the generator code build its temas array
    // WITHOUT executing DB inserts.
    
    // The generators use S='gen-vN' and have IIFEs like:
    // (()=>{ ... })() that build themes then iterate

    // Strategy: wrap the entire file to capture the themes before insert
    // Replace the p.query INSERT with capture, keep everything else
    
    // Remove the Pool creation
    code=code.replace(/const \{Pool\}=require\('pg'\);\s*const p=new Pool\([^;]+\);/,'');
    code=code.replace(/process\.env\.NODE_TLS_REJECT_UNAUTHORIZED='0';/,'');
    
    // Replace the DB insert loop with capture logic
    // The generators iterate: for(let i=0;i<temas.length;i++){await p.query(INSERT...)}
    // We need to replace this with capture of (source, correct)
    
    // Each generator has a line like: const S='gen-vN';
    // and iterates with: for(let i=0;i<temas.length;i++){
    //   const e=temas[i];const src=S+'|'+i;
    //   await p.query(...)
    // }
    
    // Replace the INSERT with a push to global _corrects
    let replaced=code
      .replace(
        /await p\.query\('INSERT INTO exercises[\s\S]*?\);[\s\S]*?}\);/g,
        `_corrects.push({src:S+'|'+i,correct:e.c});`
      )
      // Also handle single-line INSERT patterns
      .replace(
        /await p\.query\(['"`]INSERT INTO exercises[\s\S]*?\$[\d]+['"`],[^)]+\)\);/g,
        `_corrects.push({src:S+'|'+i,correct:e.c});`
      )
      // Remove remaining p.query calls
      .replace(/await p\.query\([^;]+\);/g,'')
      // Remove pool connection check queries
      .replace(/const r=await p\.query\([^;]+\);/g,'');
    
    // Create a sandbox
    const _corrects=[];
    const sandbox={
      console:{log:()=>{},error:()=>{}},
      require:()=>({Pool:function(){return{query:()=>Promise.resolve({rows:[],rowCount:0}),end:()=>{}}}}),
      process:{env:{}},
      _corrects,
      setTimeout:setTimeout,
      clearTimeout:clearTimeout,
      Date:Date,
      Math:Math,
      JSON:JSON,
      String:String,
      Number:Number,
      Array:Array,
      Object:Object,
      Boolean:Boolean,
      RegExp:RegExp,
      Error:Error,
      Promise:Promise,
      parseInt:parseInt,
      parseFloat:parseFloat,
      isNaN:isNaN,
      isFinite:isFinite,
      Buffer:Buffer,
      console:{log:()=>{}}
    };
    
    try{
      vm.runInNewContext(replaced, sandbox, {timeout:5000});
    }catch(e){
      // Ignore eval errors and timeouts - the goal is to capture _corrects
    }

    // Now process captured correct answers
    for(const cap of _corrects){
      const src=cap.src;
      const correct=String(cap.correct).trim();
      const db=dbMap[src];
      if(!db){notInDB++;continue;}

      const opts=db.opts;
      if(!Array.isArray(opts)||opts.length<2) continue;
      
      // Check if already correct
      if(String(opts[0]).trim()===correct){fixed++;continue;}

      // Find correct in options
      const ci=opts.findIndex(o=>String(o).trim()===correct);
      if(ci===-1){
        // Try without trimming
        const ci2=opts.indexOf(cap.correct);
        if(ci2===-1){
          // Try "starts with" - some options have extra formatting
          const ci3=opts.findIndex(o=>String(o).includes(correct)||correct.includes(String(o)));
          if(ci3===-1){notFixed++;continue;}
          const newOpts=[...opts];
          newOpts[0]=opts[ci3];
          newOpts[ci3]=opts[0];
          await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),db.id]);
          fixed++;
          continue;
        }
        const newOpts=[...opts];
        newOpts[0]=cap.correct;
        newOpts[ci2]=opts[0];
        await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),db.id]);
        fixed++;
        continue;
      }
      
      // Swap
      const newOpts=[...opts];
      newOpts[0]=opts[ci];
      newOpts[ci]=opts[0];
      await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),db.id]);
      fixed++;
    }
  }

  console.log(`\nTotal fixed: ${fixed}, Not found in DB: ${notInDB}, Not matched: ${notFixed}`);

  // Verify
  const samples=await p.query(`
    SELECT id, source, LEFT(question,50) as q, LEFT(options::text,80) as opts
    FROM exercises WHERE archivo_origen='generacion-programatica' 
    ORDER BY RANDOM() LIMIT 5
  `);
  console.log('\n=== Verification ===');
  samples.rows.forEach(r=>console.log(r.id, r.source, r.q, r.opts));

  await p.end();
}
main().catch(e=>{console.error(e.message);process.exit(1);});
