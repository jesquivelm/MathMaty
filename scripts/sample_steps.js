process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  // Look at actual solution_steps content for media
  const r=await p.query("SELECT id, topic_id, difficulty, LEFT(question,100) as q, LEFT(solution_steps::text,400) as steps FROM exercises WHERE difficulty='media' LIMIT 5");
  console.log('=== Media exercises sample ===');
  r.rows.forEach(x=>{console.log('\n--- id:'+x.id,'topic:'+x.topic_id);console.log('Q:',x.q);console.log('Steps:',x.steps);});

  // Look at basico with 3+ steps
  const r2=await p.query("SELECT id, topic_id, LEFT(question,100) as q, jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) as cnt, LEFT(solution_steps::text,300) as steps FROM exercises WHERE difficulty='basico' AND jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) >= 3 LIMIT 3");
  console.log('\n=== Basico 3+ steps ===');
  r2.rows.forEach(x=>{console.log('\nid:'+x.id,'topic:'+x.topic_id,'steps:'+x.cnt);console.log('Q:',x.q);console.log('Steps:',x.steps);});

  // Look at actual dificil exercises
  const r3=await p.query("SELECT id, topic_id, LEFT(question,100) as q, LEFT(solution_steps::text,200) as steps FROM exercises WHERE difficulty='dificil' LIMIT 5");
  console.log('\n=== Dificil exercises ===');
  r3.rows.forEach(x=>{console.log('\nid:'+x.id,'topic:'+x.topic_id);console.log('Q:',x.q);console.log('Steps:',x.steps);});

  await p.end();
})();
