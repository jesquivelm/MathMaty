process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v10';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === TEC-MATEMATICA (25) ===
  {t:'tec-matematica',q:'Si f(x)=2x-3 y g(x)=x+1, f(g(2))=',c:'3',o:['5','2','7']},
  {t:'tec-matematica',q:'Si f(x)=x^2, g(x)=x+2, g(f(3))=',c:'11',o:['9','13','7']},
  {t:'tec-matematica',q:'f(x)=2x^2-3x+1, f(2)=',c:'3',o:['1','5','7']},
  {t:'tec-matematica',q:'f(x)=x^2+4x+4 escrito canonico:',c:'(x+2)^2',o:['(x-2)^2','(x+4)^2','x(x+4)+4']},
  {t:'tec-matematica',q:'f(x)=x^2-8x+7, f(1)=',c:'0',o:['-2','8','7']},
  {t:'tec-matematica',q:'La recta y=3x+2 y y=3x-4 son:',c:'Paralelas',o:['Perpendiculares','Iguales','Secantes']},
  {t:'tec-matematica',q:'La recta y=2x+3 y y=-x/2+5 son:',c:'Perpendiculares',o:['Paralelas','Iguales','Oblicuas']},
  {t:'tec-matematica',q:'Punto medio entre (-3,5) y (7,-1):',c:'(2,2)',o:['(5,3)','(4,4)','(-2,2)']},
  {t:'tec-matematica',q:'Distancia entre (-1,-1) y (2,3):',c:'5',o:['4','7','3']},
  {t:'tec-matematica',q:'Ecuacion de recta que pasa por (4,-2) y (-1,3):',c:'y=-x+2',o:['y=x-6','y=-x-2','y=2x-10']},
  {t:'tec-matematica',q:'Dominio de f(x)=√(x+3):',c:'x ≥ -3',o:['x > -3','x ≠ -3','x ≤ -3']},
  {t:'tec-matematica',q:'Dominio de f(x)=1/(x-5):',c:'x ≠ 5',o:['x > 5','x < 5','x = 5']},
  {t:'tec-matematica',q:'f(x)=x^2-6x+10 minimo en:',c:'x=3, y=1',o:['x=-3, y=1','x=3, y=10','x=6, y=10']},
  {t:'tec-matematica',q:'La funcion f(x)=ax^2+bx+c abre hacia arriba si:',c:'a > 0',o:['a < 0','b > 0','c > 0']},

  // === ECUACIONES (20) ===
  {t:'ecuaciones',q:'7x - 5 = 3x + 15',tx:'Ecuacion lineal',c:'x=5',o:['x=10','x=-5','x=3']},
  {t:'ecuaciones',q:'5x + 2 = 3x - 8',tx:'Ecuacion lineal',c:'x=-5',o:['x=5','x=3','x=-3']},
  {t:'ecuaciones',q:'x^2 + x - 2 = 0',tx:'Ecuacion cuadratica',c:'x=1 o x=-2',o:['x=-1 o x=2','x=1 o x=2','x=-1 o x=-2']},
  {t:'ecuaciones',q:'x^2 - 1 = 0',tx:'Ecuacion cuadratica',c:'x=1 o x=-1',o:['x=1','x=-1','x=0']},
  {t:'ecuaciones',q:'x^2 - 4 = 0',tx:'x^2-4=0',c:'x=2 o x=-2',o:['x=2','x=-2','x=4 o x=-4']},
  {t:'ecuaciones',q:'x^2 + 2x = 0',tx:'Factor comun x',c:'x=0 o x=-2',o:['x=0 o x=2','x=2 o x=-2','x=0']},
  {t:'ecuaciones',q:'x^2 - 3x = 0',tx:'Factor comun x 2',c:'x=0 o x=3',o:['x=0 o x=-3','x=3','x=-3']},
  {t:'ecuaciones',q:'3x^2 - 12 = 0',tx:'Ecuacion cuadratica factor',c:'x=2 o x=-2',o:['x=2','x=-2','x=4 o x=-4']},

  // === FACTORIZACION (15) ===
  {t:'factorizacion',q:'x^2 - 7x + 10 =',c:'(x-2)(x-5)',o:['(x+2)(x+5)','(x-2)(x+5)','(x+2)(x-5)']},
  {t:'factorizacion',q:'x^2 - 8x + 12 =',c:'(x-2)(x-6)',o:['(x+2)(x+6)','(x-2)(x+6)','(x+2)(x-6)']},
  {t:'factorizacion',q:'x^2 - 3x - 18 =',c:'(x-6)(x+3)',o:['(x+6)(x-3)','(x-6)(x-3)','(x+6)(x+3)']},
  {t:'factorizacion',q:'x^2 + 6x + 9 =',c:'(x+3)^2',o:['(x-3)^2','(x+3)(x-3)','(x+9)^2']},
  {t:'factorizacion',q:'x^2 - 2x - 3 =',c:'(x-3)(x+1)',o:['(x+3)(x-1)','(x-3)(x-1)','(x+3)(x+1)']},
  {t:'factorizacion',q:'4x^2 - 1 =',c:'(2x-1)(2x+1)',o:['(4x-1)(4x+1)','(2x-1)^2','(2x+1)^2']},
  {t:'factorizacion',q:'x^2 - 64 =',c:'(x-8)(x+8)',o:['(x-8)^2','(x+8)^2','(x-4)(x+4)']},
  {t:'factorizacion',q:'x^2 + 10x + 25 =',c:'(x+5)^2',o:['(x-5)^2','(x+5)(x-5)','(x+10)^2']},

  // === TRIGONOMETRIA (10) ===
  {t:'trigonometria',q:'Identidad: 1 + cot^2θ =',c:'csc^2θ',o:['sec^2θ','tan^2θ','sin^2θ']},
  {t:'trigonometria',q:'Identidad: 1 - cos^2θ =',c:'sen^2θ',o:['cos^2θ','tan^2θ','sec^2θ']},
  {t:'trigonometria',q:'sen(π - θ) =',c:'sen θ',o:['-sen θ','cos θ','-cos θ']},
  {t:'trigonometria',q:'cos(π - θ) =',c:'-cos θ',o:['cos θ','sen θ','-sen θ']},
  {t:'trigonometria',q:'sen(π/2 + θ) =',c:'cos θ',o:['-cos θ','sen θ','-sen θ']},
  {t:'trigonometria',q:'cos(π/2 + θ) =',c:'-sen θ',o:['sen θ','cos θ','-cos θ']},
  {t:'trigonometria',q:'sen(2θ) identidad alternativa:',c:'2tanθ/(1+tan^2θ)',o:['(1-tan^2θ)/(1+tan^2θ)','2cos^2θ-1','1-2sen^2θ']},
  {t:'trigonometria',q:'Un angulo de 1 radian equivale a:',c:'≈57.3°',o:['≈90°','≈60°','≈45°']},

  // === EXP-LOG (10) ===
  {t:'exp-log',q:'(a^m)/(a^n) =',c:'a^(m-n)',o:['a^(m/n)','a^(m+n)','a^(mn)']},
  {t:'exp-log',q:'(ab)^n =',c:'a^n b^n',o:['a^n + b^n','a^n / b^n','a b^n']},
  {t:'exp-log',q:'(a/b)^n =',c:'a^n / b^n',o:['a^n b^n','(a-b)^n','a^n - b^n']},
  {t:'exp-log',q:'a^(1/n) =',c:'∛a',o:['a^n','1/a^n','a^n/2']},
  {t:'exp-log',q:'log(1) =',c:'0',o:['1','-∞','10']},
  {t:'exp-log',q:'log(10) =',c:'1',o:['10','0','e']},
  {t:'exp-log',q:'ln(e^2) =',c:'2',o:['e^2','2e','ln 2']},
  {t:'exp-log',q:'e^(ln 3) =',c:'3',o:['e^3','ln 3','3e']},

  // === INECUACIONES (10) ===
  {t:'inecuaciones',q:'10 - x > 0',c:'x < 10',o:['x > 10','x ≤ 10','x = 10']},
  {t:'inecuaciones',q:'-5x < 25',c:'x > -5',o:['x < -5','x > 5','x < 5']},
  {t:'inecuaciones',q:'(x-1)(x-4) > 0',c:'x < 1 o x > 4',o:['1 < x < 4','x > 4','x < 1']},
  {t:'inecuaciones',q:'x^2 - x - 2 ≤ 0',c:'-1 ≤ x ≤ 2',o:['x ≤ -1 o x ≥ 2','x ≤ -1','x ≥ 2']},
  {t:'inecuaciones',q:'3/x > 0',c:'x > 0',o:['x > 3','x < 0','x ≠ 0']},
  {t:'inecuaciones',q:'(x+5)(x-3) < 0',c:'-5 < x < 3',o:['x < -5 o x > 3','x < -5','x > 3']},

  // === CALCULO (15) ===
  {t:'calculo',q:'f(x)=x^3-6x^2+9x, f(1)=',c:'4',o:['16','3','-4']},
  {t:'calculo',q:'d/dx (sen 2x) =',c:'2 cos 2x',o:['cos 2x','-2 cos 2x','2 sen 2x']},
  {t:'calculo',q:'d/dx (cos 3x) =',c:'-3 sen 3x',o:['3 sen 3x','-sen 3x','sen 3x']},
  {t:'calculo',q:'∫ (6x^5) dx =',c:'x^6 + C',o:['6x^6 + C','30x^4 + C','x^5 + C']},
  {t:'calculo',q:'∫ (x^4) dx =',c:'x^5/5 + C',o:['5x^5 + C','x^5 + C','4x^3 + C']},
  {t:'calculo',q:'∫_0^π/2 sen x dx =',c:'1',o:['0','π/2','2']},
  {t:'calculo',q:'lim_(x→0) (sen 2x)/(3x) =',c:'2/3',o:['1','2','3/2']},
  {t:'calculo',q:'lim_(x→0) (tan x)/x =',c:'1',o:['0','∞','-1']},
  {t:'calculo',q:'f(x)=x^3, tasa cambio promedio [1,3]:',c:'13',o:['9','26','3']},
  {t:'calculo',q:'d/dx (x^2+1)(x-1) (regla producto):',c:'3x^2-2x+1',o:['2x(x-1)+(x^2+1)','2x+1','x^2+2x-1']},

  // === FRACCIONES-ALG (5) ===
  {t:'fracciones-alg',q:'(x^2-9)/(3-x) =',c:'-(x+3)',o:['x+3','x-3','(x-3)/(3-x)']},
  {t:'fracciones-alg',q:'(x^3-1)/(x-1) =',c:'x^2+x+1',o:['x^2-1','x^2+1','(x-1)^2']},
  {t:'fracciones-alg',q:'(x^2+2x+1)/(x^2-1) =',c:'(x+1)/(x-1)',o:['(x-1)/(x+1)','1','x+1']},
  {t:'fracciones-alg',q:'(x+4)/(x^2+8x+16) =',c:'1/(x+4)',o:['1/(x-4)','x+4','x-4']},
  {t:'fracciones-alg',q:'(x^2-2x-8)/(x-4) =',c:'x+2',o:['x-2','x+4','x-4']},

  // === TEC-LOGICA (5) ===
  {t:'tec-logica',q:'Contrapositiva de p→q es:',c:'¬q → ¬p',o:['q → p','¬p → ¬q','p → ¬q']},
  {t:'tec-logica',q:'Reciproca de p→q es:',c:'q → p',o:['¬q → ¬p','¬p → ¬q','p → ¬q']},
  {t:'tec-logica',q:'Inversa de p→q es:',c:'¬p → ¬q',o:['¬q → ¬p','q → p','p → ¬q']},
  {t:'tec-logica',q:'Conteo: combinacion de 8 elige 3:',c:'56',o:['24','336','40320']},
  {t:'tec-logica',q:'Conteo: permutacion de 6 elige 3:',c:'120',o:['20','6','360']},
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
