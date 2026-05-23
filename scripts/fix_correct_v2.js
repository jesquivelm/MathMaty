process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const vm=require('vm');

const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

// Strategy: For each seed generator, intercept the INSERT query
// to capture { source, correctAnswer } pairs before they store to DB.

// The generators use p.query('INSERT INTO exercises...VALUES(...)', [params...])
// Where params[6] is the difficulty and the options are stringified before insert.

// Actually, the generators BUILD temas[] = [{t, n, q, c, o}], then iterate.
// We can intercept the INSERT and instead record what we need.

async function main(){
  const captured=[];
  const genDir=__dirname;

  for(let v=1;v<=34;v++){
    const fpath=`${genDir}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    
    let code=fs.readFileSync(fpath,'utf8');
    
    // Create a sandbox where we intercept the INSERT
    // We need to:
    // 1. Keep the themas[] building logic
    // 2. Capture { source, correct, options_str } before INSERT
    
    // Replace the Pool creation with a mock that captures data
    // The pool mock will just record the correct answer for each source
    
    let localCaptured=[];
    let S_val='';
    let temasArr=[];
    let temasCounter=0;

    const sandbox={
      require:()=>({Pool:function(){return{query:(sql,params)=>{
        // This mock is called during startup or if fallback
        // Actually, the generators call p.query() in two contexts:
        // 1. To check if source exists (SELECT)
        // 2. To INSERT the exercise
        // 
        // The SELECT check happens BEFORE the INSERT.
        // We just need the source and correct values.
        const srcMatch=sql.match(/source='([^']+)'/)||sql.match(/source=\$[\d]+/);
        if(sql.trim().toUpperCase().startsWith('SELECT')){
          return Promise.resolve({rows:[]}); // pretend no duplicates
        }
        return Promise.resolve({rowCount:1});
      },on:(e,cb)=>{}}});
      // Pool mock doesn't need end
      process:{
        env:{
          NODE_TLS_REJECT_UNAUTHORIZED:'0',
          DATABASE_URL:'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require'
        }
      },
      console:{log:()=>{},error:()=>{}},
      // Store accessed variables
      _captured:[]
    };

    // Try a simpler approach: just replace the DB INSERT with capture
    // and keep the rest of the code intact.
    // 
    // The generators do:
    //   const res = mkOpts(e.c, e.o);
    //   await p.query('INSERT...', [e.t, e.q, ..., JSON.stringify(res.o), ...]);
    //
    // We need to capture e.c (correct answer) for each iteration.
    
    // Actually, the simplest approach:
    // Replace `await p.query(` with capture code
    
    let generatorCaptured=[];
    
    // Inject a capture mechanism at the beginning
    const injectCode=`
const __capturedCorrects=[];
const __origQuery=p.query.bind(p);
p.query=(sql,params)=>{
  if(sql.includes('INSERT INTO exercises')){
    // params[0] = topic, params[1] = question, ..., params[3] = options_str (JSON stringified)
    // We need to capture source and correct answer
    // source is at params[9] (varies by generator) or embedded as src = S+'|'+i
    // Actually, the correct answer is used in mkOpts but not stored in params
    // We need to capture it differently.
    // Let's use the pattern: before INSERT, save the current e.c
  }
  return __origQuery(sql,params);
};
`.trim();

    // The generators all use S='gen-vN' and A='generacion-programatica'
    // They build temas[] = [{t, n, q, c, o}]
    // Then iterate: for(let i=0;i<temas.length;i++){ const e=temas[i]; ... mkOpts(e.c, e.o); }
    // They also skip duplicates: if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    
    // I can replace the INSERT to also capture the correct answer
    // by modifying the INSERT to store a JSON object instead of an array
    
    // Actually, the simplest fix: modify mkOpts to store the ci alongside the array
    // Then existing generators that run again will store properly.
    // But existing DB rows are already broken.
    
    // NEW IDEA: Instead of trying to capture from generators, just
    // UPDATE the DB directly:
    // For each seed-gen exercise, we know:
    // - It has 4 options
    // - One is correct
    // - The options came from shuffle([c, d1, d2, d3])
    // 
    // We could re-run the EXACT same generator code but with a "diff" mode:
    // 1. Compute the temas array as the generator would
    // 2. For each index, compute mkOpts(e.c, e.o) to get shuffled array
    // 3. Compare the stored options in DB vs our computed shuffled array
    // 4. If they match, we know e.c is the correct answer
    // 5. If they don't match (due to random shuffle), we'd need to find
    //    which option in the stored array equals e.c

    // Actually, steps 3-5 are overcomplicating it.
    // For each generator index i with correct=c:
    // - DB stored options = shuffle([c, d1, d2, d3])
    // - c IS in the array
    // - We just need to find c's position in the stored array
    
    // So the correct answer is ALWAYS e.c from the generator.
    // We just need to figure out which element in the stored options equals e.c.
    
    // MODIFIED PLAN:
    // 1. Re-evaluate each generator to compute temas = [{t,n,q,c,o}]
    // 2. For each index i, get c (correct answer)
    // 3. For the corresponding DB row (source = gen-vN|i), find c in the options array
    // 4. If found, move c to index 0 (swap)
    // 5. If not found, log the error
    
    // The challenge is re-evaluating the generator code reliably.
    // Let me try using vm.runInNewContext()
  }

  // OK this is getting too complex. Let me take a MUCH simpler approach:
  // Just rewrite mkOpts and re-run ALL generators to produce the correct
  // {o, ci} format. For existing broken rows, we'll do a best-effort fix
  // by checking which option appears to be correct.
  
  // REALLY SIMPLE APPROACH:
  // For each seed-gen exercise, try to MATCH the options against
  // the generator's temas array. The temas array has {q, c, o} where
  // q = question, c = correct, o = distractors.
  // 
  // We can match by question text (which should be EXACTLY the same).
  // Then c is the correct answer.
  
  // Build a map of question -> correct answer from all generators
  const qToC={};
  const qToOpts={};

  for(let v=1;v<=34;v++){
    const fpath=`${genDir}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    const content=fs.readFileSync(fpath,'utf8');

    // The generators all use a `temas` or `t` array with push({t, n, q, c, o})
    // Some use `temas.push({...})` others use `t.push({...})`
    // Let me extract ALL .push({...}) calls and parse them
    
    // Extract push blocks - find everything between .push({ and the matching })
    // Handle nested braces
    const pushBlocks=[];
    const pushPattern=/\.push\(\{/g;
    let match;
    while((match=pushPattern.exec(content))!==null){
      const start=match.index+match[0].length;
      let depth=0,pos=start;
      for(;pos<content.length;pos++){
        const ch=content[pos];
        if(ch==='{') depth++;
        else if(ch==='}'){
          if(depth===0){pos++;break;}
          depth--;
        }else if(ch==='`'){
          pos++;
          while(pos<content.length&&content[pos]!=='`'){
            if(content[pos]==='\\') pos++;
            pos++;
          }
        }else if(ch==="'"||ch==='"'){
          const q=ch;pos++;
          while(pos<content.length&&content[pos]!==q){
            if(content[pos]==='\\') pos++;
            pos++;
          }
        }
      }
      pushBlocks.push({code:content.substring(start,pos-1),idx:pushBlocks.length});
    }

    for(const pb of pushBlocks){
      const code=pb.code;
      // Extract q: value
      const qm=code.match(/\bq:\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/);
      if(!qm) continue;
      let qVal=qm[1];
      if((qVal.startsWith("'")&&qVal.endsWith("'"))||(qVal.startsWith('"')&&qVal.endsWith('"')))
        qVal=qVal.slice(1,-1);
      else if(qVal.startsWith('`')&&qVal.endsWith('`'))
        qVal=qVal.slice(1,-1);
      else continue;
      // Skip template literals with ${}
      if(qVal.includes('$')) continue;

      // Extract c: value
      const cm=code.match(/\bc:\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|([^,}\s]+))/);
      if(!cm) continue;
      let cVal=cm[1];
      if((cVal.startsWith("'")&&cVal.endsWith("'"))||(cVal.startsWith('"')&&cVal.endsWith('"')))
        cVal=cVal.slice(1,-1);
      else if(cVal.startsWith('`')&&cVal.endsWith('`')){
        cVal=cVal.slice(1,-1);
        if(cVal.includes('$')) continue; // skip template literal
      }
      
      // Only store if q makes sense as a question
      if(qVal.length>3&&!qToC[qVal]){
        qToC[qVal]=cVal;
      }
    }
  }

  console.log(`Extracted ${Object.keys(qToC).length} question->correct mappings from generators`);

  // Now for each seed-gen exercise, try to find its correct answer
  const all=await p.query("SELECT id, source, question, options FROM exercises WHERE archivo_origen='generacion-programatica' ORDER BY id");
  console.log(`Total seed-gen exercises: ${all.rows.length}`);

  let fixed=0,notFound=0,alreadyCorrect=0;

  for(const ex of all.rows){
    const q=ex.question;
    const opts=ex.options;
    if(!Array.isArray(opts)||opts.length<2) continue;

    // Check if options[0] is already correct (e.g., from earlier fix)
    // We need the correct answer to verify this
    const correct=qToC[q];
    if(!correct){
      // Try shorter question (sometimes generators add punctuation)
      const shortQ=q.replace(/[.?!:;]$/,'');
      if(!qToC[shortQ]){notFound++;continue;}
    }

    const c=qToC[q]||qToC[q.replace(/[.?!:;]$/,'')];
    if(!c){notFound++;continue;}

    if(opts[0]===c){alreadyCorrect++;continue;}

    const ci=opts.indexOf(c);
    if(ci===-1){
      // Correct not in options — might need to try another form
      // But some exercises may store the answer differently
      // Try matching with different comparison (e.g., trimmed)
      const matchIdx=opts.findIndex(o=>o.trim()===c.trim());
      if(matchIdx===-1){notFound++;continue;}
      const newOpts=[...opts];
      newOpts[0]=c;
      newOpts[matchIdx]=opts[0];
      await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),ex.id]);
      fixed++;
    }else{
      const newOpts=[...opts];
      newOpts[0]=c;
      newOpts[ci]=opts[0];
      await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),ex.id]);
      fixed++;
    }
  }

  console.log(`Fixed: ${fixed}, Already correct: ${alreadyCorrect}, Not found: ${notFound}`);

  // Now also fix ALL seed generators to store {o, ci} format going forward
  // Modify mkOpts in all generators
  console.log('\n=== Fixing seed generators to store {o, ci} format ===');
  for(let v=1;v<=34;v++){
    const fpath=`${genDir}/seed_generator_v${v}.js`;
    if(!fs.existsSync(fpath)) continue;
    let content=fs.readFileSync(fpath,'utf8');
    
    // Replace JSON.stringify(res.o) with JSON.stringify({o: res.o, ci: res.ci})
    // or JSON.stringify(res) since mkOpts returns {o, ci}
    const newContent=content
      .replace(/JSON\.stringify\(res\.o\)/g,'JSON.stringify(res)')
      .replace(/JSON\.stringify\(r\.o\)/g,'JSON.stringify(r)');
    
    if(newContent!==content){
      fs.writeFileSync(fpath,newContent);
      console.log(`v${v}: Updated`);
    }
  }

  console.log('\nDone!');
  await p.end();
}
main().catch(console.error);
