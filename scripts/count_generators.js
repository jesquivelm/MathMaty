process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const {Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

(async()=>{
  const r=await p.query(`
    SELECT regexp_replace(source, '^([a-zA-Z]+-v[0-9]+).*$', '\\1') as gen,
           COUNT(1) as cnt
    FROM exercises WHERE archivo_origen='generacion-programatica'
    GROUP BY 1 ORDER BY 1
  `);
  r.rows.forEach(r=>console.log(r.gen, r.cnt));
  const total=await p.query("SELECT COUNT(1) FROM exercises WHERE archivo_origen='generacion-programatica'");
  console.log('TOTAL:', total.rows[0].count);
  await p.end();
})();
