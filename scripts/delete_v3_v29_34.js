process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const {Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const prefixes=['gen-prog-v3','gen-v29','gen-v30','gen-v31','gen-v32','gen-v33','gen-v34'];
  let total=0;
  for(const prefix of prefixes){
    const r=await p.query("DELETE FROM exercises WHERE source LIKE $1",[prefix+'|%']);
    console.log('Deleted '+prefix+': '+r.rowCount);
    total+=r.rowCount;
  }
  console.log('TOTAL deleted: '+total);
  await p.end();
})();
