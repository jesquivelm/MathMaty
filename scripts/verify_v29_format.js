process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const {Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const r=await p.query('SELECT COUNT(1) as c FROM exercises');
  console.log('TOTAL DB: '+r.rows[0].c);
  const s=await p.query("SELECT source,options->'o' as o,options->'ci' as ci FROM exercises WHERE source LIKE 'gen-v29|%' LIMIT 3");
  for(const row of s.rows) console.log(JSON.stringify(row));
  const ar=await p.query("SELECT source,options->'o' as o,options->'ci' as ci FROM exercises WHERE source LIKE 'gen-prog-v3|%' LIMIT 3");
  for(const row of ar.rows) console.log(JSON.stringify(row));
  await p.end();
})();
