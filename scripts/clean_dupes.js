const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("DELETE FROM exercises WHERE archivo_origen='cuadernillo algebra.pdf' AND source LIKE '%p. general%'");
  console.log('Deleted:',r.rowCount,'old duplicates');
  const r2=await p.query("SELECT archivo_origen,COUNT(*)c FROM exercises WHERE archivo_origen='cuadernillo algebra.pdf' GROUP BY archivo_origen");
  console.log('Remaining:',r2.rows[0]?.c||0);
  const r3=await p.query('SELECT COUNT(*)c FROM exercises');
  console.log('Total DB:',r3.rows[0].c);
  await p.end();
})();
