process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
(async()=>{
  // Steps by difficulty
  const r=await p.query("SELECT difficulty, COUNT(1) as total, ROUND(AVG(jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb))),1) as avg_steps, MAX(jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb))) as max_steps FROM exercises GROUP BY difficulty ORDER BY difficulty");
  console.log('=== Steps by difficulty ===');
  r.rows.forEach(x=>console.log(x.difficulty.padEnd(10),'total:',String(x.total).padStart(5),'avg_steps:',x.avg_steps,'max:',x.max_steps));

  // Per-topic for media
  const r2=await p.query("SELECT topic_id, COUNT(1) as total, ROUND(AVG(jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb))),1) as avg_steps FROM exercises WHERE difficulty='media' GROUP BY topic_id ORDER BY avg_steps DESC");
  console.log('\n=== Media difficulty per topic (by avg steps) ===');
  r2.rows.forEach(x=>console.log(x.topic_id.padEnd(20),'total:',String(x.total).padStart(4),'avg_steps:',x.avg_steps));

  // Count media exercises with 4+ and 5+ steps
  const r3=await p.query("SELECT COUNT(1) FROM exercises WHERE difficulty='media' AND jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) >= 4");
  console.log('\nMedia with 4+ steps:',r3.rows[0].count);
  const r4=await p.query("SELECT COUNT(1) FROM exercises WHERE difficulty='media' AND jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) >= 5");
  console.log('Media with 5+ steps:',r4.rows[0].count);

  // Sample
  const r5=await p.query("SELECT id, topic_id, LEFT(question,80) as q, jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) as steps FROM exercises WHERE difficulty='media' AND jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) >= 5 LIMIT 10");
  console.log('\n=== Sample media exercises with 5+ steps ===');
  r5.rows.forEach(x=>console.log('id:'+x.id,'topic:'+x.topic_id,'steps:'+x.steps,'q:',x.q));

  // Also check if some basico could be facil
  const r6=await p.query("SELECT COUNT(1) FROM exercises WHERE difficulty='basico' AND jsonb_array_length(COALESCE(solution_steps,'[]'::jsonb)) >= 3");
  console.log('\nBasico with 3+ steps:',r6.rows[0].count);

  await p.end();
})();
