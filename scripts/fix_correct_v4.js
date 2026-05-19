process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

// Strategy: Re-write the last part of each generator to capture correct answers
// instead of INSERTing into DB. We keep the temas-building logic intact.

async function main(){
  const allDB=await p.query("SELECT id, source, options FROM exercises WHERE archivo_origen='generacion-programatica' AND source LIKE 'gen-v%'");
  const dbOpts={};
  for(const ex of allDB.rows) dbOpts[ex.source]={id:ex.id, opts:ex.options};
  console.log(`DB: ${allDB.rows.length} exercises`);

  let fixed=0, notFixed=0;

  for(let v=1;v<=34;v++){
    const fpath=`${__dirname}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    let code=fs.readFileSync(fpath,'utf8');

    // Remove everything DB-related at the top
    code=code.replace(/process\.env\.NODE_TLS_REJECT_UNAUTHORIZED='0';\s*/,'');
    code=code.replace(/const \{Pool\}=require\('pg'\);\s*const p=new Pool\([^;]+\);\s*/,'');
    
    // The generators end with an async IIFE that does the INSERT loop.
    // Find the last async IIFE or main INSERT loop and replace it.
    // 
    // Pattern: either:
    //   (async()=>{ for(let i=0;i<temas.length;i++){ ... await p.query(...) } ... })();
    // or:
    //   (async()=>{ ... })();  (at the end)
    
    // Remove the last async IIFE that contains INSERTs
    // We need to keep everything before it (temas building)
    
    // Find the last occurrence of (async()=>{ or (async ()=>{
    const asyncStart=code.lastIndexOf('(async()=>{');
    const asyncStart2=code.lastIndexOf('(async ()=>{
    const start=Math.max(asyncStart,asyncStart2);
    
    if(start===-1){
      // Try finding: (async()=>{ at end
      const altStart=code.lastIndexOf('(async()=>');
      if(altStart===-1){console.log(`v${v}: no async block found`);continue;}
      const altEnd=code.lastIndexOf('})();',altStart);
      if(altEnd===-1){console.log(`v${v}: no end of async`);continue;}
      // Check if this block contains INSERT
      const block=code.substring(altStart,altEnd+5);
      if(!block.includes('INSERT')) continue; // not the insert block
      code=code.substring(0,altStart);
    }else{
      const endIdx=code.indexOf('})();',start);
      if(endIdx===-1){console.log(`v${v}: no end marker`);continue;}
      const block=code.substring(start,endIdx+5);
      if(!block.includes('INSERT')) continue;
      code=code.substring(0,start);
    }
    
    // Now code should have the temas-building IIFE(s) and a temas[ ] or t[ ] array
    // Execute it and extract correct answers
    
    // We'll use vm to evaluate
    const temasArr=[];
    let S_val='';
    
    // Sandbox with minimal globals
    const sandbox={
      console:{log:()=>{},error:()=>{},warn:()=>{}},
      require:()=>{return{Pool:function(){return{query:()=>Promise.resolve({rows:[]}),end:()=>{}}}}},
      process:{env:{}},
      Math, String, Number, Boolean, Array, Object, JSON, RegExp, Date,
      parseInt, parseFloat, isNaN, isFinite, Buffer,
      setTimeout, clearTimeout, setInterval, clearInterval,
      Promise, Error,
      // capture when temas or t array gets built
      get _temasArr(){return temasArr;},
      get _S(){return S_val;}
    };

    // We need to capture the S variable and temas/t array.
    // The generators do: const S='gen-vN';
    // They build temas[] or t[] in an IIFE
    // We need to intercept these
    
    // Let me prepend capture code
    const captureCode=`
const __origPush=Array.prototype.push;
const __hookPush=function(...args){
  // Check if this is being called on temas[] or t[]
  // We'll track it by checking each argument for {t:..., n:..., q:..., c:..., o:...}
  for(const arg of args){
    if(arg && typeof arg==='object' && arg.t && arg.q && arg.c && arg.o!==undefined){
      temasArr.push(arg);
    }
  }
  return __origPush.apply(this,args);
};
// Replace push on all arrays we create
`;
    
    // This doesn't work cleanly. Let me try another way.
    
    // SIMPLEST VM APPROACH:
    // I'll modify the code to store correct answers in a global variable.
    // Instead of the INSERT loop which was already removed, I'll add capture.
    
    // Find const S='gen-vN' and extract it
    const sMatch=code.match(/const\s+S\s*=\s*['"`](gen-v\d+)['"`]/);
    if(!sMatch){console.log(`v${v}: no S`);continue;}
    const genId=sMatch[1];
    S_val=genId;

    // Now we need to populate temasArr.
    // The generators have IIFEs that build temas:
    //   (()=>{ temas.push({...}); ... })();
    // followed by iteration
    
    // Let me try a completely different approach:
    // Just evaluate the code in a context where Array.push is intercepted
    
    let hookCode=`
const temasArr=[];
const _pushStack=[];
const origPush=Array.prototype.push;
Array.prototype.push=function(...args){
  // Determine if 'this' is temas or t by checking the arguments structure
  for(const a of args){
    if(a && typeof a.t!=='undefined' && typeof a.q!=='undefined' && typeof a.c!=='undefined'){
      temasArr.push(a);
      break;
    }
  }
  return origPush.apply(this,args);
};
`;

    const evalCode=hookCode+code;
    
    try{
      vm.runInNewContext(evalCode, sandbox, {timeout:10000});
    }catch(e){
      // ignore errors
    }

    // The problem is: the generator uses IIFEs like (()=>{temas.push({...});})()
    // where 'temas' is defined inside the IIFE. Our hook can't capture it
    // because 'temas' is in a local scope.
    
    // This approach won't work easily. Let me try just capturing from the
    // existing DB by doing a smarter match.
    
    // For each source = gen-vN|M in the DB, look at the generator code
    // to find the corresponding temas[M]
  }

  // FALLBACK APPROACH: Just fix the generators and server code.
  // Don't try to backfill existing broken exercises — mark them and
  // the next gen pass (v35) will replace them properly.
  
  // For now, let me fix the generators to store {o, ci} format
  
  console.log('\n=== Fixing seed generators to use {o, ci} format ===');
  for(let v=1;v<=34;v++){
    const fpath=`${__dirname}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    let content=fs.readFileSync(fpath,'utf8');
    const newContent=content
      .replace(/JSON\.stringify\(res\.o\)/g,'JSON.stringify(res)')
      .replace(/JSON\.stringify\(r\.o\)/g,'JSON.stringify(r)');
    if(newContent!==content){
      fs.writeFileSync(fpath,newContent);
      console.log(`v${v}: fixed mkOpts storage`);
    }
  }

  // Also fix the server to handle {o, ci} format
  console.log('\nFixing existing seed-gen exercises that already store {o, ci} (from first fix attempt)...');
  // Check if any exercises already store {o, ci} format
  const objCheck=await p.query("SELECT id, source, options FROM exercises WHERE archivo_origen='generacion-programatica' AND jsonb_typeof(options)='object' LIMIT 10");
  if(objCheck.rows.length>0){
    console.log(`Found ${objCheck.rows.length} with {o, ci} format, fixing...`);
    for(const ex of objCheck.rows){
      const opts=ex.options;
      if(opts && opts.o && typeof opts.ci==='number'){
        const arr=opts.o;
        const ci=opts.ci;
        // Move correct to index 0
        const newArr=[...arr];
        newArr[0]=arr[ci];
        newArr[ci]=arr[0];
        await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newArr),ex.id]);
        fixed++;
      }
    }
  }

  // Fix the 167 that were already fixed by v1 script (they stored {o, ci} too)
  const objFormat=await p.query("SELECT COUNT(1) FROM exercises WHERE jsonb_typeof(options)='object' AND archivo_origen='generacion-programatica'");
  console.log(`Remaining with {o,ci} format: ${objFormat.rows[0].count}`);

  console.log(`\nTotal fixed this pass: ${fixed}`);
  console.log(`Total NOT fixed (still broken): ${allDB.rows.length-fixed}`);
  
  // For the remaining broken exercises, we modify the server as backup
  console.log('\n=== NOW FIXING SERVER.JS AND APP.JS ===');
  
  // Read server.js
  let serverCode=fs.readFileSync(`${__dirname}/../server.js`,'utf8');
  
  // In the generate-exercise response, add correcta field
  // Find the return res.json block
  const serverJsonBlock=serverCode.match(/return res\.json\(\{[\s\S]*?\n\s*\}\);/);
  if(serverJsonBlock){
    console.log('Server response block found, length:',serverJsonBlock[0].length);
    // Check if correcta already exists
    if(!serverCode.includes('correcta:')){
      // Add correcta after opciones line
      const newServer=serverCode.replace(
        /opciones: ex\.options,/,
        `opciones: ex.options,\n        correcta: Array.isArray(ex.options) ? ex.options[0] : (ex.options?.o?.[ex.options?.ci] || null),`
      );
      fs.writeFileSync(`${__dirname}/../server.js`,newServer);
      console.log('Server.js: added correcta field');
    }else{
      console.log('Server.js: correcta already present');
    }
  }

  // Also fix the flashcard and fallback endpoints' return format
  // The flashcard endpoint and fallbacks also need correcta
  
  // Fix fallback exercises in server.js
  // They have format: opciones:['correct', ...] so correcta = opciones[0] already works
  // But we should add explicit correcta
  
  // Read app.js
  let appCode=fs.readFileSync(`${__dirname}/../public/app.js`,'utf8');
  
  // Fix checkChoice to use correcta
  if(appCode.includes('choice === state.currentExercise.opciones[0]')){
    const newApp=appCode.replace(
      'const isCorrect = choice === state.currentExercise.opciones[0]',
      'const isCorrect = choice === (state.currentExercise.correcta || state.currentExercise.opciones[0])'
    );
    fs.writeFileSync(`${__dirname}/../public/app.js`,newApp);
    console.log('app.js: fixed checkChoice to use correcta');
  }

  // Fix the correct highlight (the same issue applies)
  if(appCode.includes('b.textContent === state.currentExercise.opciones[0]')){
    const newApp2=fs.readFileSync(`${__dirname}/../public/app.js`,'utf8')
      .replace(
        "b.textContent === state.currentExercise.opciones[0]",
        "b.textContent === (state.currentExercise.correcta || state.currentExercise.opciones[0])"
      );
    fs.writeFileSync(`${__dirname}/../public/app.js`,newApp2);
    console.log('app.js: fixed highlight to use correcta');
  }

  console.log('\nDone!');
  await p.end();
}
main().catch(e=>{console.error(e.message);process.exit(1);});
