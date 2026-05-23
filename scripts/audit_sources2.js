process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const {Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

(async()=>{
  // Count per source prefix (first 25 chars)
  const r1=await p.query(`
    SELECT LEFT(source, 25) as prefix, COUNT(1) as cnt
    FROM exercises WHERE archivo_origen='generacion-programatica'
    GROUP BY LEFT(source, 25) ORDER BY cnt DESC
  `);
  console.log('=== Source prefixes (first 25 chars) ===');
  r1.rows.forEach(r=>console.log(r.prefix, r.cnt));

  // Check obj format exercises
  const r2=await p.query(`
    SELECT LEFT(source, 30) as src, id, LEFT(options::text, 80) as opts_preview
    FROM exercises WHERE jsonb_typeof(options)='object' AND archivo_origen='generacion-programatica'
    LIMIT 5
  `);
  console.log('\n=== With {o,ci} format ===');
  r2.rows.forEach(r=>console.log(r.src, r.id, r.opts_preview));

  // Total counts by format
  const r3=await p.query(`
    SELECT jsonb_typeof(options) as fmt, COUNT(1)
    FROM exercises WHERE archivo_origen='generacion-programatica'
    GROUP BY 1
  `);
  console.log('\n=== Format total ===');
  r3.rows.forEach(r=>console.log(r.fmt, r.count));

  await p.end();
})();
