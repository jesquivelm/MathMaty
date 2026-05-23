process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const fs=require('fs');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

(async()=>{
  const sql=fs.readFileSync('scripts/seed_new_topics.sql','utf8');
  // Extract INSERT INTO knowledge_library ... ; (starts at line 27)
  const lines=sql.split('\n');
  const klLines=[];
  let inKl=false;
  for(const line of lines){
    if(line.includes('INSERT INTO knowledge_library')) inKl=true;
    if(inKl){
      klLines.push(line);
      if(line.trim().endsWith(');')) break;
    }
  }
  const klSql=klLines.join('\n');

  try{
    const r=await p.query(klSql);
    console.log(`Inserted ${r.rowCount} knowledge_library rows`);
  }catch(e){
    if(e.message.includes('already exists')||e.message.includes('duplicate')||e.message.includes('unique')||e.message.includes('violates'))
      console.log('Knowledge entries already exist, skipping:', e.message.substring(0,80));
    else
      console.log('Error:', e.message.substring(0,150));
  }

  const r=await p.query('SELECT topic_id, COUNT(1) FROM knowledge_library GROUP BY topic_id ORDER BY topic_id');
  console.log('\n=== knowledge_library ===');
  console.log('Total rows:', r.rows.reduce((a,x)=>a+x.count,0), '| Topics:', r.rows.length);
  r.rows.forEach(x=>console.log('  '+x.topic_id.padEnd(20)+x.count));

  const missing=await p.query("SELECT id as topic_id, name FROM topics WHERE id NOT IN (SELECT topic_id FROM knowledge_library) ORDER BY id");
  if(missing.rows.length>0){
    console.log('\n=== Topics sin knowledge ===');
    missing.rows.forEach(x=>console.log('  '+x.topic_id));
  }
  await p.end();
})();
