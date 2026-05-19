process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const {Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

(async()=>{
  // Source patterns and format counts
  const r1=await p.query(`
    SELECT 
      CASE 
        WHEN source LIKE 'gen-v%' THEN 'gen-vN'
        WHEN source LIKE 'gen-prog-v%' THEN 'gen-prog-vN'
        WHEN source LIKE 'generacion-programatica-v%' THEN 'generacion-programatica-vN'
        ELSE 'other'
      END as src_type,
      COUNT(1) as cnt,
      SUM(CASE WHEN jsonb_typeof(options)='object' THEN 1 ELSE 0 END) as obj_format
    FROM exercises WHERE archivo_origen='generacion-programatica'
    GROUP BY 1 ORDER BY 2 DESC
  `);
  console.log('=== Source patterns ===');
  r1.rows.forEach(r=>console.log(r.src_type, r.cnt, `obj_format=${r.obj_format}`));

  // Count per generator version
  const r2=await p.query(`
    SELECT 
      CASE 
        WHEN source LIKE 'gen-v%' THEN regexp_replace(source, '^([a-z-]+-v\d+).*$', '\1')
        WHEN source LIKE 'gen-prog-v%' THEN regexp_replace(source, '^(gen-prog-v\d+).*$', '\1')
        WHEN source LIKE 'generacion-programatica-v%' THEN regexp_replace(source, '^(generacion-programatica-v\d+).*$', '\1')
        ELSE source
      END as src_prefix,
      COUNT(1) as cnt
    FROM exercises WHERE archivo_origen='generacion-programatica'
    GROUP BY 1 ORDER BY 1
  `);
  console.log('\n=== Per generator ===');
  r2.rows.forEach(r=>console.log(r.src_prefix, r.cnt));

  // Check existing obj format exercises
  const r3=await p.query(`
    SELECT id, source, LEFT(options::text,100) as opts
    FROM exercises WHERE jsonb_typeof(options)='object' AND archivo_origen='generacion-programatica'
    LIMIT 10
  `);
  console.log('\n=== Exercises with {o,ci} format ===');
  r3.rows.forEach(r=>console.log(r.id, r.source, r.opts));

  // Check a few exercises with missing CI
  const r4=await p.query(`
    SELECT id, source, LEFT(question,60) as q, LEFT(options::text,80) as opts
    FROM exercises WHERE archivo_origen='generacion-programatica' AND jsonb_typeof(options)='array'
    ORDER BY RANDOM() LIMIT 5
  `);
  console.log('\n=== Sample broken exercises (array format) ===');
  r4.rows.forEach(r=>console.log(r.id, r.source, r.q, r.opts));
  
  // Check v1-style source to understand format
  const r5=await p.query(`
    SELECT source FROM exercises WHERE source LIKE '%programatica-v1%' LIMIT 5
  `);
  console.log('\n=== v1 sources ===');
  r5.rows.forEach(r=>console.log(r.source));

  // Check total by format
  const r6=await p.query(`
    SELECT 
      jsonb_typeof(options) as opt_type,
      COUNT(1) as cnt,
      MIN(id) as min_id,
      MAX(id) as max_id
    FROM exercises WHERE archivo_origen='generacion-programatica'
    GROUP BY 1
  `);
  console.log('\n=== Format distribution ===');
  r6.rows.forEach(r=>console.log(r.opt_type, r.cnt, `ids ${r.min_id}-${r.max_id}`));

  await p.end();
})();
