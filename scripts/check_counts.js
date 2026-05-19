process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query('SELECT topic_id,COUNT(1)c FROM exercises GROUP BY topic_id ORDER BY c');
  console.log('=== Exercises per topic ===');
  r.rows.forEach(x=>console.log(x.topic_id.padEnd(20),x.c));
  const low=r.rows.filter(x=>x.c<200);
  if(low.length>0){
    console.log('\n=== Topics below 200 ('+low.length+') ===');
    low.forEach(x=>console.log(x.topic_id.padEnd(20),x.c,'needs',200-x.c,'more'));
  }
  await p.end();
})();
