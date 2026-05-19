process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

// Percentage of media exercises to reclassify as dificil per topic
// Higher for inherently harder topics
const CONVERSION_RATES = {
  calculo: 0.25,
  trigonometria: 0.25,
  inecuaciones: 0.20,
  'exp-log': 0.20,
  matrices: 0.20,
  vectores: 0.20,
  'geo-analitica': 0.15,
  sucesiones: 0.15,
  'fracciones-alg': 0.15,
  factorizacion: 0.15,
  ecuaciones: 0.15,
  'sistemas-ecuaciones': 0.12,
  geometria: 0.12,
  probabilidad: 0.12,
  estadistica: 0.10,
  'numeros-reales': 0.10,
  radicales: 0.10,
  polinomios: 0.10,
  porcentajes: 0.08,
  'razones-proporciones': 0.08,
  'plano-cartesiano': 0.08,
  logica: 0.08,
  conjuntos: 0.05,
  'mcm-mcd': 0.05,
  'tec-logica': 0.10,
  'tec-matematica': 0.15,
  'tec-verbal': 0.05
};

(async()=>{
  const before=await p.query("SELECT COUNT(1) FROM exercises WHERE difficulty='dificil'");
  console.log('Before:',before.rows[0].count, 'dificil exercises');

  let totalUpdated=0;
  for(const[topic,rate]of Object.entries(CONVERSION_RATES)){
    // Count media exercises for this topic
    const cnt=await p.query("SELECT COUNT(1) as c FROM exercises WHERE difficulty='media' AND topic_id=$1",[topic]);
    const n=Math.floor(parseInt(cnt.rows[0].c)*rate);
    if(n===0) continue;

    // Pick random n exercises and update them
    const r=await p.query("UPDATE exercises SET difficulty='dificil' WHERE id IN (SELECT id FROM exercises WHERE difficulty='media' AND topic_id=$1 ORDER BY RANDOM() LIMIT $2)",[topic,n]);
    if(r.rowCount>0){console.log(topic.padEnd(20),'→',String(r.rowCount).padStart(3),'→ dificil');totalUpdated+=r.rowCount;}
  }

  const after=await p.query("SELECT COUNT(1) FROM exercises WHERE difficulty='dificil'");
  console.log('\nAfter:',after.rows[0].count, 'dificil exercises (+'+(after.rows[0].count-before.rows[0].count)+')');
  await p.end();
})();
