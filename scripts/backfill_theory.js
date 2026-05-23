process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

const TOPICS = [
  { id:'conjuntos', teoria:'Conceptos de conjuntos, unión, intersección, diferencia y complemento. Base para entender lógica matemática.' },
  { id:'numeros-reales', teoria:'Clasificación de números (naturales, enteros, racionales, irracionales), propiedades y operaciones en la recta numérica.' },
  { id:'radicales', teoria:'Raíces, propiedades de radicales, racionalización y exponentes fraccionarios. Operaciones inversas de potencias.' },
  { id:'polinomios', teoria:'Operaciones con polinomios: suma, resta, multiplicación, división. Términos semejantes y grado del polinomio.' },
  { id:'factorizacion', teoria:'Descomponer expresiones en factores. Métodos: factor común, diferencia de cuadrados, trinomio cuadrado perfecto, cubos.' },
  { id:'fracciones-alg', teoria:'Fracciones con polinomios: simplificar, sumar (MCM), restar, multiplicar y dividir. Dominio de la fracción.' },
  { id:'ecuaciones', teoria:'Igualdades con incógnitas. Ecuaciones lineales y cuadráticas. Fórmula general y discriminante.' },
  { id:'sistemas-ecuaciones', teoria:'Sistemas 2x2 y 3x3. Métodos de sustitución, eliminación e igualación. Solución única, infinitas o ninguna.' },
  { id:'inecuaciones', teoria:'Desigualdades con incógnitas. Método de puntos críticos. Solución por intervalos. Inversión del signo.' },
  { id:'plano-cartesiano', teoria:'Sistema de coordenadas, distancia entre puntos, concepto de función, dominio, rango y prueba de la recta vertical.' },
  { id:'exp-log', teoria:'Funciones exponenciales y logarítmicas. Propiedades de logaritmos, cambio de base. Crecimiento exponencial.' },
  { id:'geometria', teoria:'Áreas, perímetros, volúmenes. Teorema de Pitágoras. Figuras: triángulos, círculos, cubos, esferas.' },
  { id:'trigonometria', teoria:'Razones trigonométricas, identidad fundamental, círculo unitario. Ley de senos y cosenos.' },
  { id:'calculo', teoria:'Límites, derivadas e integrales. Reglas de derivación, integración y teorema fundamental del cálculo.' },
  { id:'mcm-mcd', teoria:'Máximo Común Múltiplo y Mínimo Común Divisor. Relación fundamental entre ellos.' },
  { id:'porcentajes', teoria:'Cálculo de porcentajes, descuentos, aumentos e interés simple.' },
  { id:'razones-proporciones', teoria:'Razones, proporciones, regla de tres directa e inversa, proporcionalidad.' },
  { id:'estadistica', teoria:'Estadística descriptiva: media, mediana, moda, varianza y gráficos.' },
  { id:'probabilidad', teoria:'Probabilidad simple, compuesta, condicional. Eventos independientes.' },
  { id:'logica', teoria:'Proposiciones, tablas de verdad, cuantificadores y conjuntos.' },
  { id:'tec-logica', teoria:'Razonamiento deductivo e inductivo para admisión TEC: premisas, conclusiones, casos posibles, patrones y certeza.' },
  { id:'tec-matematica', teoria:'Problemas tipo admisión TEC: conteo, números racionales, proporciones, secuencias, figuras y estrategia sin calculadora.' },
  { id:'tec-verbal', teoria:'Razonamiento verbal para admisión TEC: vocabulario en contexto, inferencias, coherencia textual, ordenamiento y síntesis.' },
  { id:'matrices', teoria:'Suma, multiplicación, determinantes e inversa de matrices.' },
  { id:'vectores', teoria:'Vectores, magnitud, dirección, producto punto y producto cruz.' },
  { id:'sucesiones', teoria:'Sucesiones aritméticas, geométricas y sumatorias.' },
  { id:'geo-analitica', teoria:'Rectas, pendiente, distancia entre puntos, paralelas y perpendiculares.' }
];

(async()=>{
  // Verify total exercises before
  const totalQ=await p.query('SELECT COUNT(1) FROM exercises');
  const nullQ=await p.query("SELECT COUNT(1) FROM exercises WHERE theory IS NULL OR theory = ''");
  console.log(`Total ejercicios: ${totalQ.rows[0].count}`);
  console.log(`Sin teoría: ${nullQ.rows[0].count}`);

  // Mass UPDATE per topic
  let updated=0;
  for(const t of TOPICS){
    const r=await p.query("UPDATE exercises SET theory=$1 WHERE topic_id=$2 AND (theory IS NULL OR theory='')",[t.teoria,t.id]);
    if(r.rowCount>0){console.log(`${t.id.padEnd(20)}→ ${r.rowCount} actualizados`);updated+=r.rowCount;}
  }
  console.log(`\nTotal teoría poblada: ${updated}`);

  // Verify remaining nulls
  const stillNull=await p.query("SELECT COUNT(1) FROM exercises WHERE theory IS NULL OR theory = ''");
  console.log(`Aún sin teoría: ${stillNull.rows[0].count}`);

  // Show remaining nulls per topic
  if(stillNull.rows[0].count>0){
    const remaining=await p.query("SELECT topic_id, COUNT(1) FROM exercises WHERE theory IS NULL OR theory = '' GROUP BY topic_id ORDER BY topic_id");
    remaining.rows.forEach(x=>console.log(`  ${x.topic_id}: ${x.count}`));
  }
  await p.end();
})();
