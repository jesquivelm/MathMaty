process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query('SELECT topic_id,COUNT(1)cnt FROM exercises GROUP BY topic_id ORDER BY cnt');
  r.rows.forEach(x=>console.log(x.topic_id+': '+x.cnt));
  await p.end();
})();
