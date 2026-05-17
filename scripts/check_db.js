const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Calg.1984@localhost:5432/mathmaty'
});
async function main() {
  const r1 = await pool.query(
    "SELECT topic_id, COUNT(*) as total FROM exercises WHERE category='tec_paa' GROUP BY topic_id ORDER BY topic_id"
  );
  console.log('=== EXERCISES BY TOPIC ===');
  console.table(r1.rows.map(x => ({ topic: x.topic_id, total: parseInt(x.total) })));

  const r2 = await pool.query("SELECT COUNT(*) as total FROM exercises WHERE category='tec_paa'");
  console.log(`TOTAL: ${r2.rows[0].total}`);

  const r3 = await pool.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name='exercises' ORDER BY ordinal_position"
  );
  console.log('\n=== EXERCISES COLUMNS ===');
  console.log(r3.rows.map(x => x.column_name).join(', '));
  await pool.end();
}
main().catch(e => { console.error(e.message); process.exit(1); });
