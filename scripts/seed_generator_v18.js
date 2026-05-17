process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v18';const A='generacion-programatica';const N='10-11';

const temas=[
  // === CALCULO (35) ===
  {t:'calculo',q:'lim_(x→4) (x^2-16)/(x-4)',c:'8',o:['4','0','∞']},
  {t:'calculo',q:'lim_(x→-2) (x^2+3x+2)/(x+2)',c:'-1',o:['1','0','2']},
  {t:'calculo',q:'lim_(x→3) (x^3-27)/(x-3)',c:'27',o:['9','3','18']},
  {t:'calculo',q:'lim_(x→0) tan x/x',c:'1',o:['0','∞','-1']},
  {t:'calculo',q:'lim_(x→∞) (3x+1)/(2x-5)',c:'3/2',o:['1','∞','0']},
  {t:'calculo',q:'lim_(x→∞) (5x^2-3)/(2x^2+7)',c:'5/2',o:['2/5','5','2']},
  {t:'calculo',q:'lim_(x→∞) (x+2)/(x^2+1)',c:'0',o:['1','∞','2']},
  {t:'calculo',q:'lim_(x→∞) (2x^3)/(x^2+1)',c:'∞',o:['0','2','No existe']},
  {t:'calculo',q:'d/dx (2x^5-4x^3+6x-1)',c:'10x^4-12x^2+6',o:['10x^4-12x^2','2x^4-4x^2+6','10x^5-12x^3+6x']},
  {t:'calculo',q:'d/dx (√x)',c:'1/(2√x)',o:['1/√x','2√x','1/x']},
  {t:'calculo',q:'d/dx (1/x)',c:'-1/x^2',o:['1/x^2','-1/x','ln x']},
  {t:'calculo',q:'d/dx (x^3+1)^5',c:'15x^2(x^3+1)^4',o:['5(x^3+1)^4','15x^2(x^3+1)^5','5x^2(x^3+1)^4']},
  {t:'calculo',q:'d/dx (e^x cos x)',c:'e^x(cos x - sen x)',o:['e^x cos x','-e^x sen x','e^x(cos x + sen x)']},
  {t:'calculo',q:'f(x)=ln(x^4+1), f\'(x)=',c:'4x^3/(x^4+1)',o:['1/(x^4+1)','4x^3 ln(x^4+1)','(4x^3)/(x^4+1)^2']},
  {t:'calculo',q:'f(x)=x^3-6x^2+9x+1, el maximo local ocurre en x=',c:'1',o:['3','2','0']},
  {t:'calculo',q:'f(x)=x^3-6x^2+9x+1, el minimo local ocurre en x=',c:'3',o:['1','2','4']},
  {t:'calculo',q:'f(x)=x^2-4x+5 tiene un minimo en x=',c:'2',o:['1','3','4']},
  {t:'calculo',q:'f(x)=x^2-4x+5, el valor minimo es:',c:'1',o:['-1','2','5']},
  {t:'calculo',q:'∫ (10x^4-6x^2+5) dx',c:'2x^5-2x^3+5x+C',o:['10x^5-6x^3+5x+C','2x^5-6x^2+C','10x^5-2x^3+5x+C']},
  {t:'calculo',q:'∫ (2/x^2) dx',c:'-2/x+C',o:['2 ln x+C','-1/x+C','2/x+C']},
  {t:'calculo',q:'∫ csc^2 x dx',c:'-cot x+C',o:['tan x+C','-tan x+C','cot x+C']},
  {t:'calculo',q:'∫ sec x tan x dx',c:'sec x+C',o:['tan x+C','csc x+C','-sec x+C']},
  {t:'calculo',q:'∫_0^2 (x^2+1) dx',c:'14/3',o:['4','5','6']},
  {t:'calculo',q:'∫_1^e (1/x) dx',c:'1',o:['e','ln e','0']},
  {t:'calculo',q:'∫_0^π/2 cos x dx',c:'1',o:['0','π/2','√2/2']},
  {t:'calculo',q:'El area bajo y=9-x^2 de x=-3 a x=3',c:'36',o:['18','27','54']},
  {t:'calculo',q:'El area entre y=x^2 y y=x de x=0 a x=1',c:'1/6',o:['1/3','1/2','1']},
  {t:'calculo',q:'d/dx (ln(cos x))',c:'-tan x',o:['tan x','-cot x','cot x']},
  {t:'calculo',q:'d/dx (x e^x)',c:'e^x(x+1)',o:['e^x','x e^x','e^x(x-1)']},
  {t:'calculo',q:'La derivada segunda de x^3-3x^2+2x',c:'6x-6',o:['3x^2-6x+2','6','6x']},
  {t:'calculo',q:'∫ x^2/(1+x^3) dx',c:'(1/3)ln|1+x^3|+C',o:['ln|1+x^3|+C','(1/3)(1+x^3)+C','3 ln|1+x^3|+C']},
  {t:'calculo',q:'∫ tan x dx',c:'ln|sec x|+C',o:['ln|cos x|+C','ln|tan x|+C','sec^2 x+C']},
  {t:'calculo',q:'lim_(x→0) (sen 5x)/(3x)',c:'5/3',o:['1','0','5']},
  {t:'calculo',q:'lim_(x→0) (1 - cos 2x)/(x^2)',c:'2',o:['1','0','4']},
  {t:'calculo',q:'Si f\'(x)=12x^2-4x y f(1)=5, entonces f(x)=',c:'4x^3-2x^2+3',o:['12x^3-4x^2+5','4x^3-2x^2+5','4x^3-4x^2+3']},

  // === TEC-LOGICA (30) ===
  {t:'tec-logica',q:'p → q, con p=V, q=V da:',c:'Verdadero',o:['Falso','No se sabe','Depende']},
  {t:'tec-logica',q:'p → q, con p=F, q=V da:',c:'Verdadero',o:['Falso','V y F','No se sabe']},
  {t:'tec-logica',q:'¬p → ¬q es la:',c:'Inversa de p→q',o:['Contrapositiva de p→q','Reciproca de p→q','Negacion de p→q']},
  {t:'tec-logica',q:'q → p es la:',c:'Reciproca de p→q',o:['Inversa de p→q','Contrapositiva de p→q','Negacion de p→q']},
  {t:'tec-logica',q:'La proposicion "p y q" se representa:',c:'p ∧ q',o:['p ∨ q','p → q','p ↔ q']},
  {t:'tec-logica',q:'La proposicion "p o q" se representa:',c:'p ∨ q',o:['p ∧ q','p → q','p ↔ q']},
  {t:'tec-logica',q:'¬(p ∧ q) es equivalente a:',c:'¬p ∨ ¬q',o:['¬p ∧ ¬q','¬p → ¬q','¬(p ∨ q)']},
  {t:'tec-logica',q:'¬(p ∨ q) es equivalente a:',c:'¬p ∧ ¬q',o:['¬p ∨ ¬q','¬p → ¬q','¬(p ∧ q)']},
  {t:'tec-logica',q:'La tabla de verdad de p∧(q∨r) tiene cuantas filas?',c:'8',o:['4','6','16']},
  {t:'tec-logica',q:'La tabla de verdad de (p→q)∧(q→r) tiene cuantas filas?',c:'8',o:['4','12','16']},
  {t:'tec-logica',q:'Cuantas formas diferentes de elegir 2 estudiantes de un grupo de 5?',c:'10',o:['5','20','25']},
  {t:'tec-logica',q:'Cuantas formas de ordenar 3 libros en un estante?',c:'6',o:['3','9','12']},
  {t:'tec-logica',q:'Cuantos numeros de 3 digitos se pueden formar con {1,2,3,4} sin repeticion?',c:'24',o:['64','12','81']},
  {t:'tec-logica',q:'Probabilidad de obtener exactamente 2 caras en 3 lanzamientos de una moneda:',c:'3/8',o:['1/8','1/2','3/4']},
  {t:'tec-logica',q:'Probabilidad de obtener al menos 1 cara en 2 lanzamientos:',c:'3/4',o:['1/4','1/2','1']},
  {t:'tec-logica',q:'El promedio de {12,15,18,21,24} es:',c:'18',o:['15','21','90']},
  {t:'tec-logica',q:'La mediana de {2,5,8,11,14,17} es:',c:'9.5',o:['8','11','9']},
  {t:'tec-logica',q:'La desviacion tipica es positiva excepto cuando:',c:'Todos los datos son iguales',o:['La media es 0','Los datos son negativos','n=1']},
  {t:'tec-logica',q:'La varianza de {10,10,10,10,10} es:',c:'0',o:['10','1','100']},
  {t:'tec-logica',q:'Si se lanza un dado 600 veces, el numero esperado de veces que sale 4:',c:'100',o:['150','50','600']},
  {t:'tec-logica',q:'La probabilidad de que al lanzar dos dados la suma sea 5:',c:'1/9',o:['1/6','5/36','1/12']},
  {t:'tec-logica',q:'En una caja hay 3 rojas, 2 azules, 5 verdes. Probabilidad de sacar una azul:',c:'1/5',o:['2/5','1/10','3/10']},
  {t:'tec-logica',q:'P(A)=0.6, P(B)=0.5, P(A∪B)=0.8, P(A∩B)=',c:'0.3',o:['0.1','0.4','0.2']},
  {t:'tec-logica',q:'Si dos eventos son independientes, P(A∩B)=P(A)P(B). Esto es la definicion de:',c:'Independencia',o:['Mutua exclusion','Complemento','Dependencia']},
  {t:'tec-logica',q:'Si A y B son mutuamente excluyentes, P(A∩B)=',c:'0',o:['1','P(A)+P(B)','P(A)P(B)']},
  {t:'tec-logica',q:'Simbolicamente, "todos los gatos tienen cola" se escribe:',c:'∀x (Gato(x) → TieneCola(x))',o:['∀x (Gato(x) ∧ TieneCola(x))','∃x (Gato(x) → TieneCola(x))','∃x (Gato(x) ∧ TieneCola(x))']},
  {t:'tec-logica',q:'Simbolicamente, "algun ave vuela" se escribe:',c:'∃x (Ave(x) ∧ Vuela(x))',o:['∀x (Ave(x) → Vuela(x))','∀x (Ave(x) ∧ Vuela(x))','∃x (Ave(x) → Vuela(x))']},
  {t:'tec-logica',q:'La negacion de ∀x P(x) es:',c:'∃x ¬P(x)',o:['∃x P(x)','∀x ¬P(x)','¬∀x P(x)']},
  {t:'tec-logica',q:'La negacion de ∃x P(x) es:',c:'∀x ¬P(x)',o:['∃x ¬P(x)','∀x P(x)','¬∃x P(x)']},
  {t:'tec-logica',q:'Un argumento valido es cuando las premisas verdaderas implican:',c:'Conclusion verdadera',o:['Conclusion falsa','Premisas falsas','Premisas verdaderas']},

  // === FACTORIZACION (25) ===
  {t:'factorizacion',q:'x^2 + 6x + 9 =',c:'(x+3)^2',o:['(x-3)^2','(x+3)(x-3)','(x+9)^2']},
  {t:'factorizacion',q:'x^2 - 10x + 25 =',c:'(x-5)^2',o:['(x+5)^2','(x-5)(x+5)','(x-10)^2']},
  {t:'factorizacion',q:'x^2 - 8x + 16 =',c:'(x-4)^2',o:['(x+4)^2','(x-8)^2','(x-4)(x+4)']},
  {t:'factorizacion',q:'x^2 + 2x + 1 =',c:'(x+1)^2',o:['(x-1)^2','(x+1)(x-1)','(x^2+1)']},
  {t:'factorizacion',q:'4x^2 - 12x + 9 =',c:'(2x-3)^2',o:['(2x+3)^2','(4x-9)^2','(x-3)^2']},
  {t:'factorizacion',q:'x^2 + 9x + 20 =',c:'(x+4)(x+5)',o:['(x+4)(x-5)','(x-4)(x-5)','(x+10)(x-1)']},
  {t:'factorizacion',q:'x^2 - 5x - 24 =',c:'(x-8)(x+3)',o:['(x+8)(x-3)','(x-6)(x+4)','(x-12)(x+2)']},
  {t:'factorizacion',q:'x^2 + 5x - 24 =',c:'(x+8)(x-3)',o:['(x-8)(x+3)','(x+6)(x-4)','(x+12)(x-2)']},
  {t:'factorizacion',q:'x^2 - 6x + 8 =',c:'(x-4)(x-2)',o:['(x-4)(x+2)','(x+4)(x+2)','(x-8)(x+1)']},
  {t:'factorizacion',q:'x^2 + 7x + 12 =',c:'(x+3)(x+4)',o:['(x+3)(x-4)','(x-3)(x-4)','(x+2)(x+6)']},
  {t:'factorizacion',q:'x^2 - 3x - 10 =',c:'(x-5)(x+2)',o:['(x+5)(x-2)','(x-10)(x+1)','(x-5)(x-2)']},
  {t:'factorizacion',q:'x^2 + 2x - 15 =',c:'(x+5)(x-3)',o:['(x-5)(x+3)','(x+5)(x+3)','(x-5)(x-3)']},
  {t:'factorizacion',q:'6x^2 + 7x + 2 =',c:'(2x+1)(3x+2)',o:['(3x+1)(2x+2)','(6x+1)(x+2)','(2x+2)(3x+1)']},
  {t:'factorizacion',q:'6x^2 - 5x - 6 =',c:'(2x-3)(3x+2)',o:['(2x+3)(3x-2)','(3x-2)(2x+3)','(6x+1)(x-6)']},
  {t:'factorizacion',q:'6x^2 + 13x + 6 =',c:'(2x+3)(3x+2)',o:['(2x-3)(3x-2)','(3x+2)(2x-3)','(6x+1)(x+6)']},
  {t:'factorizacion',q:'x^3 - 8 =',c:'(x-2)(x^2+2x+4)',o:['(x-2)(x^2-2x+4)','(x+2)(x^2-2x+4)','(x-2)^3']},
  {t:'factorizacion',q:'x^3 + 27 =',c:'(x+3)(x^2-3x+9)',o:['(x+3)(x^2+3x+9)','(x-3)(x^2+3x+9)','(x+3)^3']},
  {t:'factorizacion',q:'8x^3 - 1 =',c:'(2x-1)(4x^2+2x+1)',o:['(2x-1)(4x^2-2x+1)','(2x+1)(4x^2-2x+1)','(2x-1)^3']},
  {t:'factorizacion',q:'x^3 - 64 =',c:'(x-4)(x^2+4x+16)',o:['(x-4)(x^2-4x+16)','(x+4)(x^2-4x+16)','(x-4)^3']},
  {t:'factorizacion',q:'x^2 + 4x - 21 =',c:'(x+7)(x-3)',o:['(x-7)(x+3)','(x+7)(x+3)','(x-21)(x+1)']},
  {t:'factorizacion',q:'x^2 - 8x + 15 =',c:'(x-5)(x-3)',o:['(x+5)(x+3)','(x-5)(x+3)','(x-3)(x+5)']},
  {t:'factorizacion',q:'3x^2 + 8x + 4 =',c:'(3x+2)(x+2)',o:['(3x-2)(x-2)','(3x+4)(x+1)','(x+2)(3x+2)']},
  {t:'factorizacion',q:'2x^2 - 5x - 3 =',c:'(2x+1)(x-3)',o:['(2x-1)(x+3)','(2x+3)(x-1)','(2x-3)(x+1)']},
  {t:'factorizacion',q:'x^4 - 16 =',c:'(x^2+4)(x+2)(x-2)',o:['(x^2-4)(x^2+4)','(x^2+4)^2','(x-2)^4']},
  {t:'factorizacion',q:'x^2 - x - 12 =',c:'(x-4)(x+3)',o:['(x+4)(x-3)','(x-6)(x+2)','(x-12)(x+1)']},

  // === INECUACIONES (20) ===
  {t:'inecuaciones',q:'Resolver: 4x - 8 > 0',c:'x > 2',o:['x < 2','x > -2','x > 8']},
  {t:'inecuaciones',q:'Resolver: 9 - 3x ≤ 0',c:'x ≥ 3',o:['x ≤ 3','x ≥ -3','x > 3']},
  {t:'inecuaciones',q:'Resolver: 5x + 1 < 4x - 3',c:'x < -4',o:['x < 4','x < -2','x > -4']},
  {t:'inecuaciones',q:'Resolver: 7 - 2x > 5 - 3x',c:'x > -2',o:['x < -2','x > 2','x < 2']},
  {t:'inecuaciones',q:'Resolver: 6x - 4 ≤ 2x + 12',c:'x ≤ 4',o:['x ≥ 4','x ≤ 2','x ≥ 2']},
  {t:'inecuaciones',q:'Resolver: 3(2-x) > 6-x',c:'x < 0',o:['x > 0','x < -3','x > 3']},
  {t:'inecuaciones',q:'Resolver: (x+1)(x-4) ≤ 0',c:'-1 ≤ x ≤ 4',o:['x ≤ -1 o x ≥ 4','-4 ≤ x ≤ 1','x ≤ -4 o x ≥ 1']},
  {t:'inecuaciones',q:'Resolver: (x-5)(x+2) ≥ 0',c:'x ≤ -2 o x ≥ 5',o:['-2 ≤ x ≤ 5','x ≤ -5 o x ≥ 2','x ≤ 2 o x ≥ 5']},
  {t:'inecuaciones',q:'Resolver: x^2 - 2x - 3 < 0',c:'-1 < x < 3',o:['x < -1 o x > 3','-3 < x < 1','x < -3 o x > 1']},
  {t:'inecuaciones',q:'Resolver: x^2 + 3x - 4 > 0',c:'x < -4 o x > 1',o:['-4 < x < 1','x < -1 o x > 4','-1 < x < 4']},
  {t:'inecuaciones',q:'Resolver: |x-1| ≤ 4',c:'-3 ≤ x ≤ 5',o:['x ≤ -3 o x ≥ 5','-5 ≤ x ≤ 3','x ≤ -5 o x ≥ 3']},
  {t:'inecuaciones',q:'Resolver: |x+3| > 1',c:'x < -4 o x > -2',o:['-4 < x < -2','x < -2 o x > 4','x < -4 o x > 2']},
  {t:'inecuaciones',q:'Resolver: |2x-3| ≤ 1',c:'1 ≤ x ≤ 2',o:['-1 ≤ x ≤ 2','1 ≤ x ≤ 4','x ≤ 1 o x ≥ 2']},
  {t:'inecuaciones',q:'Resolver: |3x+2| > 4',c:'x < -2 o x > 2/3',o:['-2 < x < 2/3','x < -2/3 o x > 2','x < -2 o x > -2/3']},
  {t:'inecuaciones',q:'Resolver: (x+1)/(x-1) > 0',c:'x < -1 o x > 1',o:['-1 < x < 1','x < -1','x > 1']},
  {t:'inecuaciones',q:'Resolver: (x-3)/(x+2) < 0',c:'-2 < x < 3',o:['x < -2 o x > 3','x < 3','x > -2']},
  {t:'inecuaciones',q:'Resolver: 3/(x-1) ≤ 0',c:'x < 1',o:['x ≤ 1','x > 1','x ≥ 1']},
  {t:'inecuaciones',q:'Resolver: x^2 + 1 > 0',c:'Todos los reales',o:['x > 0','x < 0','Ningun real']},
  {t:'inecuaciones',q:'Resolver: (x-1)(x-2)(x-3) > 0',c:'1 < x < 2 o x > 3',o:['x < 1 o 2 < x < 3','x < 1 o x > 3','1 < x < 3']},
  {t:'inecuaciones',q:'Resolver: 2/x > 1',c:'0 < x < 2',o:['x < 0 o x > 2','x < 2','x > 0']},
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
