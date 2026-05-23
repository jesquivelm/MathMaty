process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

(async()=>{
  // Fix only questions where $ wraps LaTeX expressions
  const fixes={
    1109:'(3x+6)/(x+2) simplificado:',
    1110:'(x^2-16)/(x-4) simplificado:',
    1111:'2/x + 3/x es:',
    1112:'(x/3) * (6/x^2) es:',
  };
  for(const[id,q]of Object.entries(fixes)){
    await p.query('UPDATE exercises SET question=$1 WHERE id=$2',[q,id]);
    console.log('Fixed:',id);
  }
  // Also clean any remaining $ from options that weren't caught
  const allOpts=(await p.query("SELECT id,options FROM exercises WHERE options::text LIKE '%$%'")).rows;
  let optFix=0;
  for(const{id,options}of allOpts){
    const clean=options.map(o=>{
      if(typeof o!=='string')return o;
      let s=o;
      if(s.startsWith('$')&&s.endsWith('$')&&s.length>2)s=s.slice(1,-1);
      return s;
    });
    const changed=clean.some((o,i)=>o!==options[i]);
    if(changed){
      await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(clean),id]);
      optFix++;
    }
  }
  console.log('Additional options fixed:',optFix);
  // Verify
  const rem=(await p.query("SELECT COUNT(1)c FROM exercises WHERE question LIKE '%$%'")).rows[0].c;
  console.log('Remaining questions with $:',rem);
  await p.end();
})();
