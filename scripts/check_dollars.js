process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

(async()=>{
  const exs=(await p.query("SELECT id,question FROM exercises WHERE question LIKE '%$%' ORDER BY id")).rows;
  console.log('Questions with $:',exs.length);
  exs.forEach(e=>console.log(e.id+'|'+e.question.substring(0,80)));
  await p.end();
})();
