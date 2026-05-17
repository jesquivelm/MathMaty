process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v15';const A='generacion-programatica';const N='10-11';

const temas=[
  // === FRACCIONES ALGEBRAICAS (25) ===
  {t:'fracciones-alg',q:'(2x+6)/(x^2-9) =',c:'2/(x-3)',o:['2/(x+3)','(x+3)/2','(2x+6)/(x-3)']},
  {t:'fracciones-alg',q:'(3x^2-27)/(x-3) =',c:'3(x+3)',o:['3(x-3)','(x+3)/3','x+3']},
  {t:'fracciones-alg',q:'(x^2-2x)/(x^2-4) =',c:'x/(x+2)',o:['x/(x-2)','(x-2)/x','(x+2)/x']},
  {t:'fracciones-alg',q:'(4x^2-1)/(2x-1) =',c:'2x+1',o:['2x-1','4x+1','(2x+1)(2x-1)']},
  {t:'fracciones-alg',q:'(x^3+125)/(x+5) =',c:'x^2-5x+25',o:['x^2+5x+25','x^2-25','(x-5)^2']},
  {t:'fracciones-alg',q:'(x^3-27)/(x^2-9) =',c:'(x^2+3x+9)/(x+3)',o:['x+3','(x^2-3x+9)/(x-3)','x-3']},
  {t:'fracciones-alg',q:'2/x + 5/(2x) =',c:'9/(2x)',o:['7/(2x)','7/(3x)','10/(2x^2)']},
  {t:'fracciones-alg',q:'3/(x+2) + 4/(x-2) =',c:'(7x+2)/(x^2-4)',o:['(7x-2)/(x^2-4)','7/(x^2-4)','(3x+4)/(x^2-4)']},
  {t:'fracciones-alg',q:'1/(2x+1) - 1/(2x-1) =',c:'-2/(4x^2-1)',o:['2/(4x^2-1)','-1/(4x^2-1)','1/(4x^2-1)']},
  {t:'fracciones-alg',q:'(x^2+36)/2x\n * 1/(x-6) =',c:'(x^2+36)/(2x(x-6))',o:['(x+6)/2x','(x-6)/2','(x^2-36)/(2x)']},
  {t:'fracciones-alg',q:'(x^2-25)/(x^2-36) * (x+6)/(x-5) =',c:'(x+5)/(x-6)',o:['(x-5)/(x+6)','(x-5)/(x-6)','(x+5)(x+6)/(x^2-36)']},
  {t:'fracciones-alg',q:'(x^2-1)/(x^2-4) / (x+1)/(x+2) =',c:'(x-1)/(x-2)',o:['(x+1)/(x+2)','(x+1)(x-1)/(x^2-4)','(x-1)(x+2)/(x^2-4)']},
  {t:'fracciones-alg',q:'(a^2-b^2)/(a+b)^2 =',c:'(a-b)/(a+b)',o:['(a+b)/(a-b)','(a-b)/(a^2+2ab+b^2)','(a^2-b^2)/(a+b)']},
  {t:'fracciones-alg',q:'(x^2+2x+1)/(x^2+3x+2) =',c:'(x+1)/(x+2)',o:['(x+1)/(x+1)','(x-1)/(x-2)','(x+2)/(x+1)']},
  {t:'fracciones-alg',q:'(x^3+x^2-6x)/(x^2+x-6) =',c:'x',o:['x+1','x-1','x^2']},
  {t:'fracciones-alg',q:'(a^3+b^3)/(a^2-ab+b^2) =',c:'a+b',o:['a-b','(a+b)^2','a^2+b^2']},
  {t:'fracciones-alg',q:'(x^4-1)/(x^2+1) =',c:'x^2-1',o:['x^2+1','(x^2-1)(x+1)','x^4-1']},
  {t:'fracciones-alg',q:'(x^2-3x-10)/(x^2-25) =',c:'(x+2)/(x+5)',o:['(x-2)/(x-5)','(x-5)/(x+2)','(x-2)/(x+5)']},
  {t:'fracciones-alg',q:'(x^2-7x+12)/(x^2-9) =',c:'(x-4)/(x+3)',o:['(x-4)/(x-3)','(x+3)/(x-4)','(x+4)/(x+3)']},
  {t:'fracciones-alg',q:'(x^2+6x+9)/(x^2+4x+3) =',c:'(x+3)/(x+1)',o:['(x+3)/(x+3)','(x+1)/(x+3)','(x-3)/(x-1)']},
  {t:'fracciones-alg',q:'(x^2-2x-8)/(x^2+5x+6) =',c:'(x-4)/(x+3)',o:['(x+4)/(x+3)','(x-4)/(x-3)','(x+4)/(x-3)']},
  {t:'fracciones-alg',q:'(2x^2-18)/(x^2+3x) =',c:'2(x-3)/x',o:['2(x+3)/x','(2x-3)/x','(2(x-3))/(x+3)']},
  {t:'fracciones-alg',q:'(9x^2-4)/(3x^2-5x+2) =',c:'(3x+2)/(x-1)',o:['(3x-2)/(x-1)','(3x+2)/(x-2)','(3x-2)/(x-2)']},
  {t:'fracciones-alg',q:'(x^2-y^2)/(x^2-2xy+y^2) =',c:'(x+y)/(x-y)',o:['(x-y)/(x+y)','(x+y)/(y-x)','(x-y)^2/(x+y)']},
  {t:'fracciones-alg',q:'(x^3-y^3)/(x^2-y^2) =',c:'(x^2+xy+y^2)/(x+y)',o:['(x^2-xy+y^2)/(x-y)','(x+y)/(x^2-xy+y^2)','(x-y)/(x^2+xy+y^2)']},

  // === CALCULO (25) ===
  {t:'calculo',q:'Derivada de f(x)=5x^4 + 3x^2 - 2x + 1',c:'20x^3 + 6x - 2',o:['5x^3 + 3x - 2','20x^4 + 6x^2 - 2x','20x^3 + 3x - 2']},
  {t:'calculo',q:'Derivada de f(x)=e^(2x)',c:'2e^(2x)',o:['e^(2x)','2xe^(2x)','e^2x']},
  {t:'calculo',q:'Derivada de f(x)=ln(3x)',c:'1/x',o:['3/x','1/(3x)','ln 3']},
  {t:'calculo',q:'∫ (6x^5 + 4x^3) dx',c:'x^6 + x^4 + C',o:['6x^6+4x^4+C','x^6+x^4','30x^4+12x^2+C']},
  {t:'calculo',q:'∫ (1/x) dx',c:'ln|x| + C',o:['1/x^2 + C','ln|x^2| + C','x ln x + C']},
  {t:'calculo',q:'∫ e^x dx de 0 a 1',c:'e - 1',o:['e','1','e + 1']},
  {t:'calculo',q:'lim_(x→3) (x^2 - 9)/(x - 3)',c:'6',o:['0','3','9']},
  {t:'calculo',q:'lim_(x→0) (1 - cos x)/x^2',c:'1/2',o:['0','1','∞']},
  {t:'calculo',q:'lim_(x→0) (e^x - 1)/x',c:'1',o:['0','e','∞']},
  {t:'calculo',q:'lim_(x→∞) 1/x',c:'0',o:['1','∞','No existe']},
  {t:'calculo',q:'d/dx (x^2 e^x)',c:'e^x(x^2 + 2x)',o:['2x e^x','e^x(2x)','x^2 e^x + e^x']},
  {t:'calculo',q:'d/dx (sen x cos x)',c:'cos^2 x - sen^2 x',o:['sen^2 x - cos^2 x','-2 sen x cos x','cos^2 x + sen^2 x']},
  {t:'calculo',q:'∫_0^π sen x dx',c:'2',o:['0','1','-2']},
  {t:'calculo',q:'∫_0^1 x^2 dx',c:'1/3',o:['1','1/2','2/3']},
  {t:'calculo',q:'∫ (2x+1)^3 dx',c:'(2x+1)^4/8 + C',o:['(2x+1)^4/4 + C','(2x+1)^4 + C','(2x+1)^4/2 + C']},
  {t:'calculo',q:'∫ x^2 e^x dx usando integracion por partes',c:'x^2 e^x - 2x e^x + 2e^x + C',o:['x^2 e^x + C','e^x(x^2+1) + C','x^2 e^x - 2e^x + C']},
  {t:'calculo',q:'∫ x sen x dx',c:'sen x - x cos x + C',o:['-x cos x sen x + C','x cos x - sen x + C','cos x - x sen x + C']},
  {t:'calculo',q:'Derivada de f(x)=arctan x',c:'1/(1+x^2)',o:['1/(1-x^2)','1/(√(1-x^2))','-1/(1+x^2)']},
  {t:'calculo',q:'Derivada de f(x)=arcsen x',c:'1/√(1-x^2)',o:['1/(1+x^2)','1/√(x^2-1)','-1/√(1-x^2)']},
  {t:'calculo',q:'∫ dx/√(1-x^2)',c:'arcsen x + C',o:['arctan x + C','arccos x + C','ln|x| + C']},
  {t:'calculo',q:'∫ dx/(1+x^2)',c:'arctan x + C',o:['arcsen x + C','ln(1+x^2) + C','1/(1+x^2) + C']},
  {t:'calculo',q:'La pendiente de la recta tangente a f(x)=x^2-3x en x=2',c:'1',o:['-3','4','-1']},
  {t:'calculo',q:'Si f(x)=x^2+4, f(3+h)-f(3) =',c:'6h + h^2',o:['9h + h^2','6h','h^2']},
  {t:'calculo',q:'∫_1^2 (3x^2-2x+1) dx',c:'7',o:['6','8','5']},
  {t:'calculo',q:'El area bajo y=x^2 de x=0 a x=3',c:'9',o:['27','3','6']},

  // === TEC-LOGICA (25) ===
  {t:'tec-logica',q:'p ∧ q es verdadero solo si:',c:'p y q son verdaderos',o:['p o q son verdaderos','p es verdadero','q es verdadero']},
  {t:'tec-logica',q:'p ∨ q es falso solo si:',c:'p y q son falsos',o:['p o q son falsos','p es falso','q es falso']},
  {t:'tec-logica',q:'La negacion de p ∧ q es:',c:'¬p ∨ ¬q',o:['¬p ∧ ¬q','¬p ∨ q','p ∨ ¬q']},
  {t:'tec-logica',q:'La negacion de p ∨ q es:',c:'¬p ∧ ¬q',o:['¬p ∨ ¬q','¬p ∨ q','p ∧ ¬q']},
  {t:'tec-logica',q:'p → q es equivalente a:',c:'¬p ∨ q',o:['p ∨ ¬q','¬q → ¬p','¬p ∧ q']},
  {t:'tec-logica',q:'La contrapositiva de p → q es:',c:'¬q → ¬p',o:['q → p','¬p → ¬q','¬p ∨ q']},
  {t:'tec-logica',q:'La reciproca de p → q es:',c:'q → p',o:['¬q → ¬p','¬p → ¬q','p → ¬q']},
  {t:'tec-logica',q:'La inversa de p → q es:',c:'¬p → ¬q',o:['¬q → ¬p','q → p','¬p ∨ ¬q']},
  {t:'tec-logica',q:'p ↔ q es verdadero cuando:',c:'p y q tienen el mismo valor',o:['p y q son verdaderos','p o q es verdadero','p es verdadero']},
  {t:'tec-logica',q:'(p ∧ q) → p es una:',c:'Tautologia',o:['Contradiccion','Contingencia','Equivalencia']},
  {t:'tec-logica',q:'p → (p ∨ q) es una:',c:'Tautologia',o:['Contradiccion','Contingencia','Equivalencia']},
  {t:'tec-logica',q:'(p → q) ∧ (q → r) → (p → r) es una:',c:'Tautologia',o:['Contradiccion','Contingencia','Equivalencia']},
  {t:'tec-logica',q:'El valor de verdad de p ∧ ¬p es siempre:',c:'Falso',o:['Verdadero','Depende de p','No se sabe']},
  {t:'tec-logica',q:'El valor de verdad de p ∨ ¬p es siempre:',c:'Verdadero',o:['Falso','Depende de p','No se sabe']},
  {t:'tec-logica',q:'En probabilidad, P(A∪B) = P(A) + P(B) - P(_____)',c:'A∩B',o:['A∪B','A-B','B-A']},
  {t:'tec-logica',q:'Si A y B son mutuamente excluyentes, P(A∪B) =',c:'P(A) + P(B)',o:['P(A) * P(B)','P(A) - P(B)','P(A) / P(B)']},
  {t:'tec-logica',q:'La media muestral de {5,7,9,11} es:',c:'8',o:['7','9','10']},
  {t:'tec-logica',q:'La mediana de {4,7,9,12,15} es:',c:'9',o:['7','12','4.7']},
  {t:'tec-logica',q:'La moda de {1,2,2,3,4,4,4,5} es:',c:'4',o:['2','3','1']},
  {t:'tec-logica',q:'El rango de {10, 25, 40, 55, 70} es:',c:'60',o:['40','55','70']},
  {t:'tec-logica',q:'Cuantos subconjuntos tiene un conjunto de 4 elementos?',c:'16',o:['8','4','12']},
  {t:'tec-logica',q:'Cuantos subconjuntos tiene un conjunto de n elementos?',c:'2^n',o:['n^2','n!','n+1']},
  {t:'tec-logica',q:'|A-B| = 0 significa que:',c:'A ⊆ B',o:['B ⊆ A','A = B','A ∩ B = ∅']},
  {t:'tec-logica',q:'Si el 30% de estudiantes usa lentes y el 40% usa reloj, y 15% usa ambos, ¿que porcentaje usa lentes o reloj?',c:'55%',o:['70%','85%','40%']},
  {t:'tec-logica',q:'La desviacion estandar es la raiz cuadrada de la:',c:'Varianza',o:['Media','Mediana','Moda']},

  // === INECUACIONES (25) ===
  {t:'inecuaciones',q:'Resolver: x/2 + 3/4 > x/4 + 1',c:'x > 1',o:['x < 1','x > -1','x < -1']},
  {t:'inecuaciones',q:'Resolver: 3(x-1) < 2(x+4)',c:'x < 11',o:['x > 11','x < 5','x > 5']},
  {t:'inecuaciones',q:'Resolver: 2x/3 - 4 ≥ x/6 + 2',c:'x ≥ 12',o:['x ≤ 12','x ≥ 6','x ≤ 6']},
  {t:'inecuaciones',q:'Resolver: 0.4x - 1.2 ≤ 2x + 0.8',c:'x ≥ -5/4',o:['x ≤ -5/4','x ≥ 5/4','x ≤ 5/4']},
  {t:'inecuaciones',q:'Resolver: x^2 + 2x - 8 ≤ 0',c:'-4 ≤ x ≤ 2',o:['x ≤ -4 o x ≥ 2','-2 ≤ x ≤ 4','x ≤ -2 o x ≥ 4']},
  {t:'inecuaciones',q:'Resolver: x^2 + 4x - 5 > 0',c:'x < -5 o x > 1',o:['-5 < x < 1','x < -1 o x > 5','-1 < x < 5']},
  {t:'inecuaciones',q:'Resolver: x^2 - x - 12 < 0',c:'-3 < x < 4',o:['x < -3 o x > 4','-4 < x < 3','x < -4 o x > 3']},
  {t:'inecuaciones',q:'Resolver: -x^2 + 5x - 6 > 0',c:'2 < x < 3',o:['x < 2 o x > 3','-3 < x < -2','x < -3 o x > -2']},
  {t:'inecuaciones',q:'Resolver: |x-3| < 2',c:'1 < x < 5',o:['-1 < x < 5','x < 1 o x > 5','x < 5']},
  {t:'inecuaciones',q:'Resolver: |x+2| > 3',c:'x < -5 o x > 1',o:['-5 < x < 1','x < -1 o x > 5','x > 1']},
  {t:'inecuaciones',q:'Resolver: |2x+5| ≤ 3',c:'-4 ≤ x ≤ -1',o:['-1 ≤ x ≤ 4','x ≤ -4 o x ≥ -1','x ≤ -1 o x ≥ 4']},
  {t:'inecuaciones',q:'Resolver: |3x-4| ≥ 5',c:'x ≤ -1/3 o x ≥ 3',o:['-1/3 ≤ x ≤ 3','x ≤ -1 o x ≥ 3','-1 ≤ x ≤ 3']},
  {t:'inecuaciones',q:'Resolver: (x-1)(x-3)(x+2) < 0',c:'x < -2 o 1 < x < 3',o:['-2 < x < 1 o x > 3','x < -2 o x > 3','-2 < x < 3']},
  {t:'inecuaciones',q:'Resolver: (x+3)(x-1)(x-4) > 0',c:'-3 < x < 1 o x > 4',o:['x < -3 o 1 < x < 4','x < -3 o x > 4','-3 < x < 4']},
  {t:'inecuaciones',q:'Resolver: x^3 - 4x > 0',c:'-2 < x < 0 o x > 2',o:['x < -2 o 0 < x < 2','x < -2 o x > 2','-2 < x < 2']},
  {t:'inecuaciones',q:'Resolver: x^3 - x ≤ 0',c:'x ≤ -1 o 0 ≤ x ≤ 1',o:['-1 ≤ x ≤ 0 o x ≥ 1','x ≤ -1 o x ≥ 1','-1 ≤ x ≤ 1']},
  {t:'inecuaciones',q:'Resolver: (x+1)/(2-x) > 0',c:'-1 < x < 2',o:['x < -1 o x > 2','x > 2','x < -1']},
  {t:'inecuaciones',q:'Resolver: (x-4)/(x+2) ≤ 0',c:'-2 < x ≤ 4',o:['-2 ≤ x ≤ 4','x < -2 o x ≥ 4','x ≤ -2 o x ≥ 4']},
  {t:'inecuaciones',q:'Resolver: 2/(x+1) ≥ 1',c:'-1 < x ≤ 1',o:['x ≤ 1','x > 1','x < -1 o x ≥ 1']},
  {t:'inecuaciones',q:'Resolver: 1/x < 2',c:'x < 0 o x > 1/2',o:['x > 1/2','x < 1/2','x < 0']},
  {t:'inecuaciones',q:'Si 0 < x < 1, entonces x^2 es:',c:'Menor que x',o:['Mayor que x','Igual a x','No se puede determinar']},
  {t:'inecuaciones',q:'Si x > 1, entonces 1/x es:',c:'Menor que 1',o:['Mayor que 1','Igual a 1','Mayor que x']},
  {t:'inecuaciones',q:'Resolver: -3 < 2x+1 < 5',c:'-2 < x < 2',o:['-1 < x < 3','-3 < x < 2','-4 < x < 4']},
  {t:'inecuaciones',q:'Resolver: 4 ≤ 3x+7 < 13',c:'-1 ≤ x < 2',o:['-1 < x < 2','-4 ≤ x < 2','1 ≤ x < 3']},
  {t:'inecuaciones',q:'La desigualdad triangular establece que |a+b| ≤',c:'|a| + |b|',o:['|a| - |b|','|a| * |b|','||a| - |b||']},
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
