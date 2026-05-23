process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const mapping = {
    'prim-7': 'primaria','prim-8': 'primaria','prim-9': 'primaria','prim-10': 'primaria',
    '7-8': '7mo','7-9': '7mo','7-10': '7mo','7-11': '7mo',
    '8-9': '8vo','8-10': '8vo','8-11': '8vo',
    '9-10': '9no','9-11': '9no'
  };
  let total=0;
  for(const[from,to]of Object.entries(mapping)){
    const r=await p.query('UPDATE exercises SET nivel=$1 WHERE nivel=$2',[to,from]);
    if(r.rowCount>0){console.log(`${from.padEnd(8)}→ ${to.padEnd(10)}: ${r.rowCount}`);total+=r.rowCount;}
  }
  console.log(`Total actualizados: ${total}`);

  const check=await p.query("SELECT nivel,COUNT(1)c FROM exercises GROUP BY nivel ORDER BY nivel");
  console.log('\n=== NIVEL DISTRIBUTION AFTER BACKFILL ===');
  check.rows.forEach(x=>console.log(String(x.nivel||'NULL').padEnd(12),x.c));

  const nulls=await p.query("SELECT COUNT(1) FROM exercises WHERE nivel NOT IN ('primaria','7mo','8vo','9no','10-11','tec-paa')");
  console.log(`\nEjercicios con nivel no estandar: ${nulls.rows[0].count}`);
  await p.end();
})();
