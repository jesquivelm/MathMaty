const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT id,source,question FROM exercises WHERE archivo_origen='cuadernillo algebra.pdf' ORDER BY id");
  console.log('Total cuadernillo exercises:',r.rows.length);
  for(const row of r.rows){
    console.log(row.id, (row.source||'').substring(0,55), (row.question||'').substring(0,60));
  }
  await p.end();
})();
