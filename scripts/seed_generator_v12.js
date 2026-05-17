process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v12';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === TEC-MATEMATICA (30) ===
  {t:'tec-matematica',q:'La suma de -8 y 5 es:',c:'-3',o:['3','-13','13']},
  {t:'tec-matematica',q:'El producto de -7 y -2 es:',c:'14',o:['-14','9','-9']},
  {t:'tec-matematica',q:'El cociente de -15 entre 3 es:',c:'-5',o:['5','-12','12']},
  {t:'tec-matematica',q:'(-6) + (-4) - (-2) =',c:'-8',o:['-12','8','0']},
  {t:'tec-matematica',q:'Ordenar de menor a mayor: -3, 2, -1, 0, 4',c:'-3, -1, 0, 2, 4',o:['-1, -3, 0, 2, 4','0, -1, -3, 2, 4','-3, -1, 2, 0, 4']},
  {t:'tec-matematica',q:'El valor absoluto de -7 es:',c:'7',o:['-7','0','1/7']},
  {t:'tec-matematica',q:'|-8| - |5| =',c:'3',o:['-3','13','-13']},
  {t:'tec-matematica',q:'3/7 de 49 es:',c:'21',o:['7','28','14']},
  {t:'tec-matematica',q:'5% de 300 es:',c:'15',o:['5','30','150']},
  {t:'tec-matematica',q:'aumento de 10% a 50 es:',c:'55',o:['60','51','45']},
  {t:'tec-matematica',q:'descuento de 20% a 80 es:',c:'64',o:['60','70','16']},
  {t:'tec-matematica',q:'Si 4x = 28, entonces x =',c:'7',o:['24','32','4']},
  {t:'tec-matematica',q:'Si x/3 = 12, entonces x =',c:'36',o:['4','15','9']},
  {t:'tec-matematica',q:'La edad de Maria es el doble que la de Juan. Si Juan tiene 12, Maria tiene:',c:'24',o:['14','10','6']},
  {t:'tec-matematica',q:'En 5 anos, Pedro tendra 25. Que edad tiene ahora?',c:'20',o:['30','15','10']},
  {t:'tec-matematica',q:'Repartir 100 entre A y B con razon 3:2. A recibe:',c:'60',o:['40','50','30']},
  {t:'tec-matematica',q:'Si 3 trabajadores hacen una obra en 6 dias, 1 trabajador tarda:',c:'18',o:['2','9','3']},
  {t:'tec-matematica',q:'Si 5 kg cuestan $20, 8 kg cuestan:',c:'$32',o:['$28','$36','$40']},
  {t:'tec-matematica',q:'Un ciclista recorre 15 km/h por 2h, luego 20 km/h por 1h. Distancia total:',c:'50 km',o:['35 km','30 km','55 km']},
  {t:'tec-matematica',q:'2+3x5-1 =',c:'16',o:['24','20','12']},
  {t:'tec-matematica',q:'(4+2)x3-6/2 =',c:'15',o:['12','9','18']},
  {t:'tec-matematica',q:'8/2(2+2) =',c:'16',o:['1','8','4']},
  {t:'tec-matematica',q:'La razon 3:5 equivale a fraccion:',c:'3/5',o:['5/3','3/8','5/8']},
  {t:'tec-matematica',q:'Si a:b = 2:3 y b:c = 4:5, entonces a:c =',c:'8:15',o:['2:5','6:8','4:5']},
  {t:'tec-matematica',q:'Magnitudes inversamente proporcionales: si x=2, y=12. x=4, y=?',c:'6',o:['24','4','3']},

  // === ECUACIONES (20) ===
  {t:'ecuaciones',q:'Resuelve: 5(x+2) = 3(x+4)',tx:'5(x+2)=3(x+4)',c:'x=1',o:['x=2','x=-1','x=3']},
  {t:'ecuaciones',q:'Resuelve: 7x - 12 = 5x + 4',tx:'7x-12=5x+4',c:'x=8',o:['x=4','x=-8','x=2']},
  {t:'ecuaciones',q:'Resuelve: 3x + 5 = 2(2x - 1)',tx:'3x+5=2(2x-1)',c:'x=7',o:['x=-7','x=3','x=1']},
  {t:'ecuaciones',q:'Resuelve: 4(x-3) = 5(x+2)',tx:'4(x-3)=5(x+2)',c:'x=-22',o:['x=22','x=-2','x=2']},
  {t:'ecuaciones',q:'Resuelve: x/3 + x/4 = 7',tx:'x/3+x/4=7',c:'x=12',o:['x=7','x=84','x=1']},
  {t:'ecuaciones',q:'Resuelve: x/2 - 3 = x/5 + 3',tx:'x/2-3=x/5+3',c:'x=20',o:['x=10','x=30','x=-20']},
  {t:'ecuaciones',q:'Resuelve: (2x-1)/3 = (x+2)/4',tx:'(2x-1)/3=(x+2)/4',c:'x=2',o:['x=-2','x=10','x=1']},
  {t:'ecuaciones',q:'Resuelve: x^2 + 8x + 15 = 0',tx:'x^2+8x+15=0',c:'x=-3 o x=-5',o:['x=3 o x=5','x=-3 o x=5','x=3 o x=-5']},
  {t:'ecuaciones',q:'Resuelve: x^2 - 6x + 9 = 0',tx:'x^2-6x+9=0',c:'x=3 (doble)',o:['x=-3 (doble)','x=3 o x=-3','x=9']},
  {t:'ecuaciones',q:'Resuelve: 2x^2 - 8x = 0',tx:'2x^2-8x=0',c:'x=0 o x=4',o:['x=0 o x=-4','x=4 o x=-4','x=0 o x=2']},

  // === FACTORIZACION (10) ===
  {t:'factorizacion',q:'x^2 + 5x + 6 = (x+2)(x+?)',c:'3',o:['-3','2','-2']},
  {t:'factorizacion',q:'x^2 + 8x + 7 = (x+1)(x+?)',c:'7',o:['-7','8','-1']},
  {t:'factorizacion',q:'x^2 - 9x + 14 = (x-2)(x-?)',c:'7',o:['-7','9','-2']},
  {t:'factorizacion',q:'x^2 + 5x - 14 = (x+7)(x-?)',c:'2',o:['-2','7','-7']},
  {t:'factorizacion',q:'x^2 - 5x - 14 = (x-7)(x+?)',c:'2',o:['-2','7','-7']},
  {t:'factorizacion',q:'x^2 + x - 6 = (x+3)(x-?)',c:'2',o:['3','1','-2']},
  {t:'factorizacion',q:'x^2 - x - 6 = (x-3)(x+?)',c:'2',o:['3','1','-2']},
  {t:'factorizacion',q:'Factor comun: 6x + 9 = 3(?)',c:'2x+3',o:['3x+9','2x+9','6x+3']},
  {t:'factorizacion',q:'Factor comun: 8x^2 - 12x = 4x(?)',c:'2x-3',o:['2x+3','8x-12','4x-3']},
  {t:'factorizacion',q:'Factor comun: 10x^3 - 5x^2 + 15x = 5x(?)',c:'2x^2 - x + 3',o:['2x^2 - 5x + 3','2x^3 - x^2 + 3x','10x^2-5x+15']},

  // === EXP-LOG (10) ===
  {t:'exp-log',q:'log_2 8 + log_2 2 =',c:'4',o:['3','5','16']},
  {t:'exp-log',q:'log_3 9 + log_3 3 =',c:'3',o:['2','4','27']},
  {t:'exp-log',q:'log_4 16 - log_4 4 =',c:'1',o:['2','0','12']},
  {t:'exp-log',q:'log_5 125 / log_5 5 =',c:'3',o:['1','5','25']},
  {t:'exp-log',q:'2^(log_2 7) =',c:'7',o:['2','log_2 7','7^2']},
  {t:'exp-log',q:'log_3 (1/9) =',c:'-2',o:['2','-1/2','1/2']},
  {t:'exp-log',q:'log 1000000 =',c:'6',o:['5','10','100']},
  {t:'exp-log',q:'ln(1/e) =',c:'-1',o:['1','0','e']},
  {t:'exp-log',q:'e^(ln 4 + ln 5) =',c:'20',o:['9','4^5','ln 20']},
  {t:'exp-log',q:'log_2 8 + log_2 4 =',c:'5',o:['3','32','2']},

  // === TRIGONOMETRIA (10) ===
  {t:'trigonometria',q:'tan(60°) =',c:'√3',o:['1','√3/3','0']},
  {t:'trigonometria',q:'cot(45°) =',c:'1',o:['0','√3','∞']},
  {t:'trigonometria',q:'sec(60°) =',c:'2',o:['1','√2','1/2']},
  {t:'trigonometria',q:'csc(30°) =',c:'2',o:['1','√2','1/2']},
  {t:'trigonometria',q:'sen(θ) = 1/2, θ agudo:',c:'30°',o:['60°','45°','90°']},
  {t:'trigonometria',q:'cos(θ) = √3/2, θ agudo:',c:'30°',o:['60°','45°','0°']},
  {t:'trigonometria',q:'tan(θ) = 1, θ agudo:',c:'45°',o:['30°','60°','90°']},
  {t:'trigonometria',q:'En que cuadrante sen y cos son negativos?',c:'III',o:['I','II','IV']},
  {t:'trigonometria',q:'En que cuadrante sen es positivo y cos negativo?',c:'II',o:['I','III','IV']},
  {t:'trigonometria',q:'En que cuadrante todas las funciones son positivas?',c:'I',o:['II','III','IV']},

  // === INECUACIONES (10) ===
  {t:'inecuaciones',q:'2x + 3 > 11',c:'x > 4',o:['x < 4','x > 14','x > 8']},
  {t:'inecuaciones',q:'3x - 7 < 2x + 5',c:'x < 12',o:['x > 12','x < -2','x > -2']},
  {t:'inecuaciones',q:'5 - 2x > 1',c:'x < 2',o:['x > 2','x > -2','x < -2']},
  {t:'inecuaciones',q:'x/3 + 1 ≥ 4',c:'x ≥ 9',o:['x > 9','x ≤ 9','x ≥ 15']},
  {t:'inecuaciones',q:'4 - 3x ≥ x - 8',c:'x ≤ 3',o:['x ≥ 3','x ≥ -3','x ≤ -3']},
  {t:'inecuaciones',q:'(x+3)/(x-4) < 0',c:'-3 < x < 4',o:['x < -3 o x > 4','x < -3','x > 4']},
  {t:'inecuaciones',q:'(x+1)(x-5) ≤ 0',c:'-1 ≤ x ≤ 5',o:['x ≤ -1 o x ≥ 5','x ≤ -1','x ≥ 5']},

  // === CALCULO (10) ===
  {t:'calculo',q:'d/dx (5x^4 - 3x^2 + 2x - 1)',c:'20x^3 - 6x + 2',o:['20x^3 - 3x + 2','5x^3 - 3x + 2','20x^4 - 6x^2 + 2x']},
  {t:'calculo',q:'d/dx (√(3x)) =',c:'√3/(2√x)',o:['1/(2√(3x))','3/(2√(3x))','√3/√x']},
  {t:'calculo',q:'∫ (2x + 5) dx =',c:'x^2 + 5x + C',o:['2x^2+5x+C','x^2+5+C','x^2+5x']},
  {t:'calculo',q:'∫_1^3 2x dx =',c:'8',o:['4','6','12']},
  {t:'calculo',q:'∫_0^π/2 cos x dx =',c:'1',o:['0','π/2','2']},
  {t:'calculo',q:'Area limitada por y=x^2, x=0, x=2, y=0:',c:'8/3',o:['4/3','2','4']},
  {t:'calculo',q:'d/dx (sen x cos x) =',c:'cos^2 x - sen^2 x',o:['sen^2 x - cos^2 x','-cos^2 x + sen^2 x','cos 2x']},
  {t:'calculo',q:'d/dx (ln(x^2+1)) =',c:'2x/(x^2+1)',o:['1/(x^2+1)','2x/(x^2+1)^2','x/(x^2+1)']},

  // === FRACCIONES-ALG (5) ===
  {t:'fracciones-alg',q:'(x^2+5x)/(x) =',c:'x+5',o:['x+5x','x^2+5','x^2+5x']},
  {t:'fracciones-alg',q:'(4x^2-8x)/(2x) =',c:'2x-4',o:['2x-8x','4x-4','2x^2-4']},
  {t:'fracciones-alg',q:'(x^3+27)/(x+3) =',c:'x^2-3x+9',o:['x^2+3x+9','x^3+9','(x+3)^2']},
  {t:'fracciones-alg',q:'(2x^3-18x)/(2x) =',c:'x^2-9',o:['x^2-18','2x^2-9','x^3-9x']},
  {t:'fracciones-alg',q:'(x/2 + x/3)/(x/6) =',c:'5',o:['5x','x/5','x^2/5']},
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
