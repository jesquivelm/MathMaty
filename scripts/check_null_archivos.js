const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT id,source,topic_id,difficulty,nivel FROM exercises WHERE archivo_origen IS NULL ORDER BY id LIMIT 20");
  console.log('NULL archivo samples:');
  for(const x of r.rows)console.log('  id:'+x.id,'src:'+(x.source||'?'),'topic:'+x.topic_id,'diff:'+x.difficulty,'nivel:'+x.nivel);
  await p.end();
})();
