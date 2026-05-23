process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

// Summary queries for the KNOWLEDGE task area
(async()=>{
  // knowledge_library coverage
  const kl=await p.query("SELECT COUNT(1) as c FROM knowledge_library");
  const klTopics=await p.query("SELECT COUNT(DISTINCT topic_id) as c FROM knowledge_library");
  
  // how many of the 27 TOPICS are covered?
  // The topics table has an 'id' column (integer) and 'name' (varchar).
  // topic_id in knowledge_library maps to the id from the app's TOPICS array (varchar).
  // So we compare against the distinct topic_ids used in exercises.
  const usedTopics=await p.query("SELECT DISTINCT topic_id FROM exercises");
  const missingKl=usedTopics.rows.filter(ut=>{
    // check if any knowledge entry has this topic_id
    // we already know from the previous query
    return true; // just a count
  });

  console.log('=== KNOWLEDGE LIBRARY STATUS ===');
  console.log(`Total entries: ${kl.rows[0].c}`);
  console.log(`Topics covered: ${klTopics.rows[0].c}/27`);

  // Check which exercise topic_ids have no knowledge entry
  const missing=await p.query(`
    SELECT DISTINCT e.topic_id
    FROM exercises e
    WHERE NOT EXISTS (SELECT 1 FROM knowledge_library k WHERE k.topic_id = e.topic_id)
    ORDER BY e.topic_id
  `);
  if(missing.rows.length===0) console.log('All topics with exercises have knowledge entries');
  else missing.rows.forEach(x=>console.log('MISSING:', x.topic_id));

  // Check key-other tables
  const ex=await p.query("SELECT difficulty, COUNT(1) FROM exercises GROUP BY difficulty ORDER BY difficulty");
  console.log('\n=== DIFFICULTY DISTRIBUTION ===');
  ex.rows.forEach(x=>console.log(`${x.difficulty.padEnd(10)} ${x.count}`));

  const niv=await p.query("SELECT nivel, COUNT(1) FROM exercises GROUP BY nivel ORDER BY nivel");
  console.log('\n=== NIVEL DISTRIBUTION ===');
  niv.rows.forEach(x=>console.log(`${(x.nivel||'NULL').padEnd(12)} ${x.count}`));

  const th=await p.query("SELECT COUNT(1) FROM exercises WHERE theory IS NULL OR theory = ''");
  console.log(`\nExercises without theory: ${th.rows[0].count}`);

  await p.end();
})();
