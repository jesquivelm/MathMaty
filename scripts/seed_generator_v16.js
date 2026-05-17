process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v16';const A='generacion-programatica';const N='10-11';

const temas=[
  // === FRACCIONES ALGEBRAICAS (15) ===
  {t:'fracciones-alg',q:'(x^2-4x+4)/(x^2-2x) =',c:'(x-2)/x',o:['(x+2)/x','(x-2)/(x+2)','x/(x-2)']},
  {t:'fracciones-alg',q:'(2x^2+7x+3)/(2x+1) =',c:'x+3',o:['2x+3','x-3','2x-3']},
  {t:'fracciones-alg',q:'(3x^2-4x-15)/(x-3) =',c:'3x+5',o:['3x-5','x+5','3x-15']},
  {t:'fracciones-alg',q:'(x^2+6x+5)/(x^2+3x-10) =',c:'(x+1)/(x-2)',o:['(x+5)/(x-5)','(x+1)/(x+5)','(x-1)/(x+2)']},
  {t:'fracciones-alg',q:'(x^2+10x+25)/(x^2+7x+10) =',c:'(x+5)/(x+2)',o:['(x-5)/(x-2)','(x+5)/(x+5)','(x+5)^2/(x+5)']},
  {t:'fracciones-alg',q:'(4x^2-9)/(2x^2+9x+9) =',c:'(2x-3)/(x+3)',o:['(2x+3)/(x+3)','(2x-3)/(2x+3)','(2x-3)/(x-3)']},
  {t:'fracciones-alg',q:'(x^2-3x-28)/(x^2-49) =',c:'(x+4)/(x+7)',o:['(x-4)/(x-7)','(x-7)/(x-4)','(x+4)/(x-7)']},
  {t:'fracciones-alg',q:'(x^3+27)/(x^2+6x+9) =',c:'(x^2-3x+9)/(x+3)',o:['(x^2+3x+9)/(x-3)','(x+3)^2/(x^2-3x+9)','(x^2-9)/(x+3)']},
  {t:'fracciones-alg',q:'(x^2-4x-5)/(x^2-2x-15) / (x+1)/(x-5) =',c:'1',o:['(x-5)/(x-5)','(x+1)/(x+1)','x-5']},
  {t:'fracciones-alg',q:'(a^2+ab)/(b^2+ab) =',c:'a/b',o:['(a+b)/b','a/(b+a)','(a+b)/(a+b)']},
  {t:'fracciones-alg',q:'(x^2+4x-21)/(x^2-2x-15) + (x^2+5x+6)/(x^2-9) =',c:'2',o:['1','3','4']},
  {t:'fracciones-alg',q:'(x^2-3x+2)/(x^2-1) * (x^2+3x+2)/(x^2-4) =',c:'1',o:['(x+1)/(x-1)','(x-2)/(x+2)','(x-1)/(x+1)']},
  {t:'fracciones-alg',q:'(x^2-5x+6)/(x^2-2x-3) / (x-2)/(x+1) =',c:'1',o:['(x-2)/(x-2)','(x-3)/(x+1)','(x+1)/(x-3)']},
  {t:'fracciones-alg',q:'(x^3+8)/(x^2+4x+4) * (x+2)/(x^2-2x+4) =',c:'1',o:['(x+2)/(x+2)','(x-2)/(x-2)','(x^2-2x+4)/(x+2)']},
  {t:'fracciones-alg',q:'((x+1)/3 - (x-1)/2) / (x+5) =',c:'-1/6',o:['1/6','-1/3','1/3']},

  // === CALCULO (20) ===
  {t:'calculo',q:'lim_(x→2) (x^2-4x+4)/(x-2)',c:'0',o:['4','2','∞']},
  {t:'calculo',q:'lim_(x→0) (sen 3x)/x',c:'3',o:['1','0','∞']},
  {t:'calculo',q:'lim_(x→-1) (x+1)/(x^2-1)',c:'-1/2',o:['0','1/2','∞']},
  {t:'calculo',q:'d/dx (x^4 - 3x^2 + 5x - 7) en x=1',c:'3',o:['4','5','2']},
  {t:'calculo',q:'d/dx (x ln x)',c:'ln x + 1',o:['ln x','1/x','1 + 1/x']},
  {t:'calculo',q:'d/dx [ln(x^2+1)]',c:'2x/(x^2+1)',o:['2x ln(x^2+1)','1/(x^2+1)','(ln 2x)/(x^2+1)']},
  {t:'calculo',q:'d/dx (cos^2 x)',c:'-2 sen x cos x',o:['2 cos x','-sen 2x','cos^2 x']},
  {t:'calculo',q:'d/dx (x^3 sen x)',c:'3x^2 sen x + x^3 cos x',o:['3x^2 cos x','x^3 cos x','3x^2 sen x - x^3 cos x']},
  {t:'calculo',q:'∫ (3x^2 + 2x - 5) dx',c:'x^3 + x^2 - 5x + C',o:['3x^3 + 2x^2 - 5x + C','x^3 + x^2 + C','6x + 2 + C']},
  {t:'calculo',q:'∫ (sen x + cos x) dx',c:'-cos x + sen x + C',o:['cos x + sen x + C','cos x - sen x + C','sen x cos x + C']},
  {t:'calculo',q:'∫ x cos(x^2) dx',c:'(1/2) sen(x^2) + C',o:['sen(x^2) + C','(1/2) cos(x^2) + C','-sen(x^2)/2 + C']},
  {t:'calculo',q:'∫_0^1 e^(2x) dx',c:'(e^2 - 1)/2',o:['e^2 - 1','(e^2 + 1)/2','e^2 + 1']},
  {t:'calculo',q:'∫_0^π/2 sen x dx',c:'1',o:['0','π/2','2']},
  {t:'calculo',q:'∫_-1^2 (x^3 + 2) dx',c:'9.75',o:['9','10','8.5']},
  {t:'calculo',q:'El area bajo y = 2x + 1 de x=1 a x=4',c:'12',o:['6','10','14']},
  {t:'calculo',q:'Si f\'(x)=6x^2+2x y f(0)=3, entonces f(1)=',c:'6',o:['5','7','4']},
  {t:'calculo',q:'∫_0^2 √(4-x^2) dx representa:',c:'Un cuarto de circulo',o:['Un medio circulo','Un triangulo','Una parabola']},
  {t:'calculo',q:'d/dx (arcsen 2x)',c:'2/√(1-4x^2)',o:['1/√(1-4x^2)','2/√(1-x^2)','1/√(1-x^2)']},
  {t:'calculo',q:'d/dx (e^(x^2))',c:'2x e^(x^2)',o:['e^(x^2)','x e^(x^2)','2e^(x^2)']},
  {t:'calculo',q:'∫ x e^(x^2) dx',c:'(1/2) e^(x^2) + C',o:['e^(x^2) + C','x^2 e^(x^2)/2 + C','(1/2) e^x + C']},

  // === TEC-LOGICA (20) ===
  {t:'tec-logica',q:'La conjuncion p ∧ q con p=V, q=F da:',c:'Falso',o:['Verdadero','No se sabe','Depende']},
  {t:'tec-logica',q:'La disyuncion p ∨ q con p=F, q=V da:',c:'Verdadero',o:['Falso','No se sabe','Depende']},
  {t:'tec-logica',q:'La implicacion p→q con p=V, q=F da:',c:'Falso',o:['Verdadero','No se sabe','Depende']},
  {t:'tec-logica',q:'La implicacion p→q con p=F, q=F da:',c:'Verdadero',o:['Falso','No se sabe','Depende']},
  {t:'tec-logica',q:'La doble implicacion p↔q con p=V, q=F da:',c:'Falso',o:['Verdadero','No se sabe','Depende']},
  {t:'tec-logica',q:'Cuantas filas tiene la tabla de verdad de 3 proposiciones?',c:'8',o:['4','6','16']},
  {t:'tec-logica',q:'¬(p→q) es logicamente equivalente a:',c:'p ∧ ¬q',o:['¬p ∧ q','p ∨ ¬q','¬p ∨ q']},
  {t:'tec-logica',q:'(p→q) ∧ (p→r) es equivalente a:',c:'p → (q ∧ r)',o:['(p→q) → r','p → (q ∨ r)','p ∧ (q→r)']},
  {t:'tec-logica',q:'La probabilidad de obtener suma 7 al lanzar dos dados:',c:'1/6',o:['1/12','1/36','5/36']},
  {t:'tec-logica',q:'La probabilidad de obtener dos caras al lanzar dos monedas:',c:'1/4',o:['1/2','1/3','2/4']},
  {t:'tec-logica',q:'Se extrae una carta de una baraja de 52. Probabilidad de que sea un As:',c:'1/13',o:['1/52','4/13','1/4']},
  {t:'tec-logica',q:'La mediana del conjunto {3,7,8,12,15,20} es:',c:'10',o:['8','12','9.5']},
  {t:'tec-logica',q:'La desviacion estandar del conjunto {0,0,0,0,0} es:',c:'0',o:['1','5','No se puede calcular']},
  {t:'tec-logica',q:'La media geometrica de 2 y 8 es:',c:'4',o:['5','6','3']},
  {t:'tec-logica',q:'La media armonica de 2,3 y 6 es:',c:'3',o:['2.5','3.5','4']},
  {t:'tec-logica',q:'Si lanzas un dado 120 veces, el numero esperado de veces que sale 6:',c:'20',o:['30','15','10']},
  {t:'tec-logica',q:'P(A) = 0.3, P(B) = 0.4, P(A∩B)=0.1, P(A|B)=',c:'0.25',o:['0.3','0.4','0.75']},
  {t:'tec-logica',q:'P(A) = 0.3, P(B) = 0.4, P(A∩B)=0.1, P(B|A)=',c:'1/3',o:['0.25','0.4','0.1']},
  {t:'tec-logica',q:'Si A y B son independientes, entonces P(A∩B)=',c:'P(A) * P(B)',o:['P(A) + P(B)','P(A) / P(B)','P(A) - P(B)']},
  {t:'tec-logica',q:'Cuantos arreglos de 3 letras se pueden formar con A,B,C,D,E sin repeticion?',c:'60',o:['125','15','10']},
];

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<temas.length;i++){
    const e=temas[i];const src=S+'|'+e.t+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:''}]),null,'media','tec_paa',2024,src,A,null,N]);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
