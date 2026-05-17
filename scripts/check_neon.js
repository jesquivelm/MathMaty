const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
(async()=>{
  const r = await pool.query('SELECT COUNT(*) as t FROM exercises');
  console.log('Ejercicios en Neon: ' + r.rows[0].t);

  const r2 = await pool.query('SELECT topic_id, COUNT(*) as total FROM exercises GROUP BY topic_id ORDER BY topic_id');
  console.log('\nPor tópico:');
  r2.rows.forEach(x => console.log(' - ' + x.topic_id + ': ' + x.total));

  const c = await pool.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name='exercises' ORDER BY ordinal_position");
  console.log('\nColumnas:');
  c.rows.forEach(x => console.log(' - ' + x.column_name + ' (' + x.data_type + ')'));

  const hasNivel = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='exercises' AND column_name='nivel'");
  console.log('\nColumna nivel existe: ' + (hasNivel.rows.length > 0));

  await pool.end();
})();
