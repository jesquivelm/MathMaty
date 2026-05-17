const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT source,COUNT(1)c FROM exercises WHERE archivo_origen='cuadernillo algebra.pdf' GROUP BY source ORDER BY source");
  for(const x of r.rows) console.log(x.source, x.c);
  await p.end();
})();
