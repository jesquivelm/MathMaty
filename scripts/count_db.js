const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query("SELECT COUNT(1)c FROM exercises WHERE archivo_origen='cuadernillo algebra.pdf'");
  console.log('cuadernillo:',r.rows[0].c);
  const t=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('total:',t.rows[0].c);
  const n=await p.query('SELECT nivel,COUNT(1)c FROM exercises GROUP BY nivel ORDER BY nivel');
  for(const x of n.rows)console.log('  nivel',x.nivel,':',x.c);
  const s=await p.query('SELECT archivo_origen,COUNT(1)c FROM exercises GROUP BY archivo_origen ORDER BY c DESC');
  for(const x of s.rows)console.log('  '+(x.archivo_origen||'NULL').padEnd(45),x.c);
  await p.end();
})();
