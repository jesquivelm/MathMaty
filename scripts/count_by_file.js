process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT archivo_origen,COUNT(1)c FROM exercises WHERE archivo_origen IS NOT NULL AND archivo_origen!='' GROUP BY archivo_origen ORDER BY c DESC");
  console.log('=== POR ARCHIVO ===');
  r.rows.forEach(x=>console.log(x.archivo_origen+': '+x.c+' ejercicios'));
  const n=await p.query("SELECT COUNT(1)c FROM exercises WHERE archivo_origen IS NULL OR archivo_origen=''");
  console.log('\nGeneracion programatica (sin archivo): '+n.rows[0].c);
  const t=await p.query('SELECT COUNT(1) FROM exercises');
  console.log('TOTAL: '+t.rows[0].count);
  await p.end();
})();
