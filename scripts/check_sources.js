process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT archivo_origen,COUNT(1) FROM exercises GROUP BY archivo_origen ORDER BY archivo_origen");
  console.log('=== Exercises by source ===');
  r.rows.forEach(x=>console.log((x.archivo_origen||'NULL').padEnd(30),x.count));

  const r2=await p.query("SELECT source,COUNT(1) FROM exercises WHERE source IS NOT NULL GROUP BY source ORDER BY source");
  console.log('\n=== Exercises by source (source col) ===');
  r2.rows.forEach(x=>console.log(x.source.padEnd(15),x.count));

  await p.end();
})();
