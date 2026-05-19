process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  const sql=fs.readFileSync('scripts/seed_new_topics.sql','utf8');
  // Split on ; and filter empty
  const stmts=sql.split(';').map(s=>s.trim()).filter(s=>s.length>0);
  for(const stmt of stmts){
    try{
      await p.query(stmt);
    }catch(e){
      // Skip errors (conflicts, already exists, etc)
      if(!e.message.includes('already exists')&&!e.message.includes('duplicate')&&!e.message.includes('unique')&&!e.message.includes('Déjà vu'))
        console.log('Error:',e.message.substring(0,100));
    }
  }
  console.log('Done executing seed_new_topics.sql');
  const r=await p.query('SELECT topic_id, COUNT(1) FROM knowledge_library GROUP BY topic_id ORDER BY topic_id');
  console.log('knowledge_library now has',r.rows.reduce((a,x)=>a+x.count,0),'rows across',r.rows.length,'topics');
  r.rows.forEach(x=>console.log('  '+x.topic_id.padEnd(20)+x.count));
  await p.end();
})();
