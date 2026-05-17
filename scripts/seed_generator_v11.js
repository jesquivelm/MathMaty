process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v11';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === TEC-MATEMATICA (40) ===
  {t:'tec-matematica',q:'Suma de angulos internos de un triangulo:',c:'180°',o:['360°','90°','270°']},
  {t:'tec-matematica',q:'Suma de angulos internos de un cuadrilatero:',c:'360°',o:['180°','540°','720°']},
  {t:'tec-matematica',q:'Cuantos lados tiene un heptagono?',c:'7',o:['5','6','8']},
  {t:'tec-matematica',q:'Cuantos lados tiene un decagono?',c:'10',o:['8','9','12']},
  {t:'tec-matematica',q:'Cuantos lados tiene un dodecagono?',c:'12',o:['10','14','20']},
  {t:'tec-matematica',q:'Un poligono de 8 lados se llama:',c:'Octagono',o:['Heptagono','Nonagono','Decagono']},
  {t:'tec-matematica',q:'La diagonal de un cuadrado de lado 1 mide:',c:'√2',o:['2','1','√3']},
  {t:'tec-matematica',q:'El area de un triangulo es:',c:'(b·h)/2',o:['b·h','b·h·h','2·b·h']},
  {t:'tec-matematica',q:'El perimetro de un circulo se llama:',c:'Circunferencia',o:['Diametro','Radio','Area']},
  {t:'tec-matematica',q:'π equivale aproximadamente a:',c:'3.1416',o:['3.1214','2.1416','3.14']},
  {t:'tec-matematica',q:'Numero primo entre 10 y 20:',c:'11,13,17,19',o:['11,13,15,19','11,12,13,17','10,13,17,19']},
  {t:'tec-matematica',q:'MCD de 12 y 18:',c:'6',o:['3','2','36']},
  {t:'tec-matematica',q:'MCM de 6 y 8:',c:'24',o:['12','48','14']},
  {t:'tec-matematica',q:'Que numero es divisible por 3?',c:'45',o:['47','49','43']},
  {t:'tec-matematica',q:'Criterio de divisibilidad por 5: termina en',c:'0 o 5',o:['0','5','0,2,4,6,8']},
  {t:'tec-matematica',q:'(2/5 + 1/2) =',c:'9/10',o:['3/7','3/10','5/10']},
  {t:'tec-matematica',q:'(5/6 - 1/3) =',c:'1/2',o:['4/3','4/6','2/3']},
  {t:'tec-matematica',q:'(2/3) * (9/4) =',c:'3/2',o:['1/2','18/12','3/4']},
  {t:'tec-matematica',q:'(3/4) / (1/2) =',c:'3/2',o:['3/8','1/2','2/3']},
  {t:'tec-matematica',q:'-5 - (-8) =',c:'3',o:['-13','13','-3']},
  {t:'tec-matematica',q:'(-3)(-4)(-1) =',c:'-12',o:['12','-7','7']},
  {t:'tec-matematica',q:'(-2) + (-5) + 3 =',c:'-4',o:['-10','4','6']},
  {t:'tec-matematica',q:'(-1)(-2)(-3)(-4) =',c:'24',o:['-24','12','-12']},
  {t:'tec-matematica',q:'2^3 * 2^0 =',c:'8',o:['6','1','0']},
  {t:'tec-matematica',q:'(1/2)^-1 =',c:'2',o:['-2','1/2','-1/2']},
  {t:'tec-matematica',q:'(-2)^2 =',c:'4',o:['-4','2','-2']},
  {t:'tec-matematica',q:'(-2)^3 =',c:'-8',o:['8','-6','6']},
  {t:'tec-matematica',q:'-2^2 (sin parentesis) =',c:'-4',o:['4','-2','2']},
  {t:'tec-matematica',q:'∛27 + ∛8 =',c:'5',o:['3','35','6']},
  {t:'tec-matematica',q:'√9 + √16 =',c:'7',o:['5','12','25']},
  {t:'tec-matematica',q:'√(4+9) es diferente de:',c:'√4 + √9 = 5',o:['√13','√(9+4)','√13 ≈ 3.6']},
  {t:'tec-matematica',q:'(a^0) para a≠0:',c:'1',o:['0','a','undefined']},
  {t:'tec-matematica',q:'3^-2 =',c:'1/9',o:['-9','1/6','-6']},
  {t:'tec-matematica',q:'√(x^2) =',c:'|x|',o:['x','±x','x^2']},
  {t:'tec-matematica',q:'Notacion cientifica de 0.00023:',c:'2.3×10^-4',o:['23×10^-5','2.3×10^4','0.23×10^-3']},
  {t:'tec-matematica',q:'Notacion cientifica de 45000:',c:'4.5×10^4',o:['45×10^3','4.5×10^-4','4.5×10^5']},

  // === ECUACIONES (30) ===
  {t:'ecuaciones',q:'6 - 2x = x + 15',tx:'6-2x=x+15',c:'x=-3',o:['x=3','x=-9','x=9']},
  {t:'ecuaciones',q:'5x + 3 = 2(x - 1)',tx:'5x+3=2(x-1)',c:'x=-5/3',o:['x=5/3','x=-1','x=1']},
  {t:'ecuaciones',q:'x(x-3) = 0',tx:'x(x-3)=0',c:'x=0 o x=3',o:['x=0 o x=-3','x=3','x=0']},
  {t:'ecuaciones',q:'(x+2)(x-5) = 0',tx:'(x+2)(x-5)=0',c:'x=-2 o x=5',o:['x=2 o x=-5','x=2 o x=5','x=-2 o x=-5']},
  {t:'ecuaciones',q:'|x| = 7',tx:'|x|=7',c:'x=7 o x=-7',o:['x=7','x=-7','x=7 o x=0']},
  {t:'ecuaciones',q:'|x-5| = 0',tx:'|x-5|=0',c:'x=5',o:['x=0','x=-5','x=0 o x=5']},
  {t:'ecuaciones',q:'x/5 = x/3 + 4',tx:'x/5=x/3+4',c:'x=-30',o:['x=30','x=60','x=-60']},
  {t:'ecuaciones',q:'3x/4 - 2 = x/2',tx:'3x/4-2=x/2',c:'x=8',o:['x=4','x=-8','x=-4']},
  {t:'ecuaciones',q:'0.2x = 1.8',tx:'Ecuacion decimal',c:'x=9',o:['x=1.6','x=3.6','x=90']},
  {t:'ecuaciones',q:'0.5x + 1.2 = 2.7',tx:'Ecuacion decimal',c:'x=3',o:['x=7.8','x=1.5','x=0.3']},
  {t:'ecuaciones',q:'x^2 + 3x = 0',tx:'x^2+3x=0',c:'x=0 o x=-3',o:['x=0 o x=3','x=3','x=-3']},
  {t:'ecuaciones',q:'x^2 - 2x = 0',tx:'x^2-2x=0',c:'x=0 o x=2',o:['x=0 o x=-2','x=2','x=-2']},
  {t:'ecuaciones',q:'x^2 - 8x + 16 = 0',tx:'x^2-8x+16=0',c:'x=4 (doble)',o:['x=4 o x=-4','x=-4','x=8']},

  // === FACTORIZACION (15) ===
  {t:'factorizacion',q:'x^2 + 4x - 12 =',c:'(x+6)(x-2)',o:['(x-6)(x+2)','(x+6)(x+2)','(x-6)(x-2)']},
  {t:'factorizacion',q:'x^2 + 12x + 36 =',c:'(x+6)^2',o:['(x-6)^2','(x+12)^2','(x+6)(x-6)']},
  {t:'factorizacion',q:'x^2 - 16x + 64 =',c:'(x-8)^2',o:['(x+8)^2','(x-8)(x+8)','(x-16)^2']},
  {t:'factorizacion',q:'x^2 + 8x - 20 =',c:'(x+10)(x-2)',o:['(x-10)(x+2)','(x+10)(x+2)','(x-10)(x-2)']},
  {t:'factorizacion',q:'x^2 - 8x - 20 =',c:'(x-10)(x+2)',o:['(x+10)(x-2)','(x-10)(x-2)','(x+10)(x+2)']},
  {t:'factorizacion',q:'x^2 + 9x + 18 =',c:'(x+3)(x+6)',o:['(x-3)(x-6)','(x+3)(x-6)','(x-3)(x+6)']},
  {t:'factorizacion',q:'x^2 - 9x + 20 =',c:'(x-4)(x-5)',o:['(x+4)(x+5)','(x-4)(x+5)','(x+4)(x-5)']},
  {t:'factorizacion',q:'x^2 + 2x - 8 =',c:'(x+4)(x-2)',o:['(x-4)(x+2)','(x+4)(x+2)','(x-4)(x-2)']},
  {t:'factorizacion',q:'x^2 - 2x - 8 =',c:'(x-4)(x+2)',o:['(x+4)(x-2)','(x-4)(x-2)','(x+4)(x+2)']},
  {t:'factorizacion',q:'6x^2 - 24 =',c:'6(x-2)(x+2)',o:['(6x-12)(x+2)','6(x-2)^2','(6x-24)(x+1)']},
  {t:'factorizacion',q:'x^2 + 4 =',c:'No factoriza en reales',o:['(x+2)^2','(x+2)(x-2)','(x-2)^2']},

  // === CALCULO (20) ===
  {t:'calculo',q:'d/dx (csc x) =',c:'-csc x cot x',o:['csc x cot x','sec x tan x','-csc^2 x']},
  {t:'calculo',q:'d/dx (sec x) =',c:'sec x tan x',o:['-sec x tan x','csc x cot x','sec^2 x']},
  {t:'calculo',q:'∫ sec x tan x dx =',c:'sec x + C',o:['tan x + C','csc x + C','cot x + C']},
  {t:'calculo',q:'∫ csc^2 x dx =',c:'-cot x + C',o:['cot x + C','tan x + C','-csc x + C']},
  {t:'calculo',q:'d/dx (x e^x) =',c:'e^x + x e^x',o:['e^x','x e^x','e^x + 1']},
  {t:'calculo',q:'∫_0^1 x dx =',c:'0.5',o:['1','0','2']},
  {t:'calculo',q:'∫_0^2 (x+1) dx =',c:'4',o:['2','3','6']},
  {t:'calculo',q:'d/dx (ln(sen x)) =',c:'cot x',o:['tan x','sec x','csc x']},
  {t:'calculo',q:'d/dx (e^(x^2)) =',c:'2x e^(x^2)',o:['e^(x^2)','x^2 e^(x^2)','2e^(x^2)']},
  {t:'calculo',q:'∫ (2e^(2x)) dx =',c:'e^(2x) + C',o:['2e^(2x) + C','e^(2x)/2 + C','4e^(2x) + C']},
  {t:'calculo',q:'f(x)=x^2+2, tasa cambio [0,3]:',c:'3',o:['0','6','9']},
  {t:'calculo',q:'f(x)=4x-1, tasa cambio [1,5]:',c:'4',o:['0','5','-1']},
  {t:'calculo',q:'Area bajo y=x^2 de 0 a 1:',c:'1/3',o:['1','1/2','2/3']},

  // === TRIGONOMETRIA (10) ===
  {t:'trigonometria',q:'Arco sen(1) =',c:'90°',o:['0°','180°','270°']},
  {t:'trigonometria',q:'Arco cos(0) =',c:'90°',o:['0°','180°','360°']},
  {t:'trigonometria',q:'Arco tan(1) =',c:'45°',o:['30°','60°','90°']},
  {t:'trigonometria',q:'Arco sen(√3/2) =',c:'60°',o:['30°','45°','90°']},
  {t:'trigonometria',q:'Arco cos(1/2) =',c:'60°',o:['30°','45°','90°']},
  {t:'trigonometria',q:'Arco tan(√3) =',c:'60°',o:['30°','45°','90°']},
  {t:'trigonometria',q:'Arco cos(-1) =',c:'180°',o:['0°','90°','360°']},

  // === INECUACIONES (10) ===
  {t:'inecuaciones',q:'-3x < 9',c:'x > -3',o:['x < -3','x > 3','x < 3']},
  {t:'inecuaciones',q:'x/4 ≥ 2',c:'x ≥ 8',o:['x > 8','x ≤ 8','x < 8']},
  {t:'inecuaciones',q:'2x + 1 < 3x - 2',c:'x > 3',o:['x < 3','x > -1','x < 1']},
  {t:'inecuaciones',q:'x^2 + 1 > 0',c:'Todos los reales',o:['x > 0','x < 0','x ≠ 0']},
  {t:'inecuaciones',q:'x^2 + 4 < 0',c:'No tiene solucion',o:['x < -2','x > 2','x = ±2']},
  {t:'inecuaciones',q:'(x-1)/(x-2) > 0',c:'x < 1 o x > 2',o:['1 < x < 2','x > 2','x < 1']},

  // === EXP-LOG (10) ===
  {t:'exp-log',q:'Si 3^x = 81, x =',c:'4',o:['3','9','27']},
  {t:'exp-log',q:'Si 2^x = 1/8, x =',c:'-3',o:['3','-2','-4']},
  {t:'exp-log',q:'log_2 64 =',c:'6',o:['5','7','32']},
  {t:'exp-log',q:'log_7 343 =',c:'3',o:['7','49','5']},
  {t:'exp-log',q:'log_2 16 + log_2 8 =',c:'7',o:['4','3','24']},
  {t:'exp-log',q:'log_3 27 - log_3 9 =',c:'1',o:['3','18','2']},
  {t:'exp-log',q:'log_5 25 * log_2 16 =',c:'8',o:['2','4','10']},

  // === FRACCIONES-ALG (5) ===
  {t:'fracciones-alg',q:'(4x^2-9)/(2x+3) =',c:'2x-3',o:['2x+3','4x-9','(2x+3)^2']},
  {t:'fracciones-alg',q:'(x^2-2x)/(x-2) =',c:'x',o:['x+2','x-2','1']},
  {t:'fracciones-alg',q:'(x^3+8)/(x+2) =',c:'x^2-2x+4',o:['x^2+2x+4','(x+2)^2','x^2-4']},
  {t:'fracciones-alg',q:'(x^3-8)/(x-2) =',c:'x^2+2x+4',o:['x^2-2x+4','(x-2)^2','x^2+4']},
  {t:'fracciones-alg',q:'(x^2+5x+6)/(x^2+3x+2) =',c:'(x+3)/(x+1)',o:['(x+2)/(x+1)','(x+3)/(x+2)','(x+1)/(x+2)']},
];

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<probs.length;i++){
    const e=probs[i];const src=S+'|'+e.t+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.tx||e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:''}]),null,'media','tec_paa',2024,src,A,null,N]);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
