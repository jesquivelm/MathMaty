process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name='exercises' ORDER BY ordinal_position");
  r.rows.forEach(x=>console.log(x.column_name.padEnd(25),x.data_type));

  // Count exercises by source type
  const src=await p.query("SELECT CASE WHEN archivo_origen='generacion-programatica' THEN 'seed_gen' WHEN archivo_origen IS NOT NULL THEN 'pdf' ELSE 'other' END as type, COUNT(1) FROM exercises GROUP BY 1 ORDER BY 1");
  console.log('\n=== By source type ===');
  src.rows.forEach(x=>console.log(x.type.padEnd(15),x.count));
  await p.end();
})();
