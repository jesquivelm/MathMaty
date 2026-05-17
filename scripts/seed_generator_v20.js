process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v20';const A='generacion-programatica';const N='10-11';

const temas=[
  // === INECUACIONES (20) ===
  {t:'inecuaciones',q:'Resolver: 8 - 4x < 0',c:'x > 2',o:['x < 2','x > -2','x > 1/2']},
  {t:'inecuaciones',q:'Resolver: 12x + 3 > 10x - 5',c:'x > -4',o:['x < -4','x > 4','x < 4']},
  {t:'inecuaciones',q:'Resolver: 5x - 4 ≤ 2x + 8',c:'x ≤ 4',o:['x ≥ 4','x ≤ 2','x ≥ 2']},
  {t:'inecuaciones',q:'Resolver: x/3 + 5 > 7',c:'x > 6',o:['x < 6','x > -6','x > 36']},
  {t:'inecuaciones',q:'Resolver: (x+1)(x-5) > 0',c:'x < -1 o x > 5',o:['-1 < x < 5','x < -5 o x > 1','x < 1 o x > 5']},
  {t:'inecuaciones',q:'Resolver: (x-2)(x+3) ≤ 0',c:'-3 ≤ x ≤ 2',o:['x ≤ -3 o x ≥ 2','x ≤ -2 o x ≥ 3','-2 ≤ x ≤ 3']},
  {t:'inecuaciones',q:'Resolver: x^2 - 6x + 8 > 0',c:'x < 2 o x > 4',o:['2 < x < 4','x < -2 o x > 4','x < -4 o x > -2']},
  {t:'inecuaciones',q:'Resolver: x^2 + 2x - 15 ≤ 0',c:'-5 ≤ x ≤ 3',o:['x ≤ -5 o x ≥ 3','-3 ≤ x ≤ 5','x ≤ -3 o x ≥ 5']},
  {t:'inecuaciones',q:'Resolver: x^2 + 4x + 4 > 0',c:'x ≠ -2',o:['x < -2 o x > 2','Todos los reales','x > -2']},
  {t:'inecuaciones',q:'Resolver: x^2 - 25 < 0',c:'-5 < x < 5',o:['x < -5 o x > 5','x < 5','x > -5']},
  {t:'inecuaciones',q:'Resolver: |x+1| < 2',c:'-3 < x < 1',o:['-1 < x < 3','x < -3 o x > 1','x < -1 o x > 3']},
  {t:'inecuaciones',q:'Resolver: |2x-1| > 5',c:'x < -2 o x > 3',o:['-2 < x < 3','x < -3 o x > 2','x < -3 o x > 1']},
  {t:'inecuaciones',q:'Resolver: |3 - x| ≤ 2',c:'1 ≤ x ≤ 5',o:['-5 ≤ x ≤ -1','x ≤ 1 o x ≥ 5','-1 ≤ x ≤ 5']},
  {t:'inecuaciones',q:'Resolver: |4x+1| ≥ 9',c:'x ≤ -5/2 o x ≥ 2',o:['-5/2 ≤ x ≤ 2','x ≤ -2 o x ≥ 5/2','x ≤ -2 o x ≥ 2']},
  {t:'inecuaciones',q:'Resolver: (x+2)/(x-3) > 0',c:'x < -2 o x > 3',o:['-2 < x < 3','x > 3','x < -2']},
  {t:'inecuaciones',q:'Resolver: (x-1)/(x+4) ≤ 0',c:'-4 < x ≤ 1',o:['-4 ≤ x ≤ 1','x < -4 o x ≥ 1','x ≤ -4 o x ≥ 1']},
  {t:'inecuaciones',q:'Resolver: 1/(x+2) > 0',c:'x > -2',o:['x < -2','x > 0','x < 0']},
  {t:'inecuaciones',q:'Resolver: 2/(x-3) < 0',c:'x < 3',o:['x > 3','x < 0','x < -3']},
  {t:'inecuaciones',q:'Resolver: x^3 - x > 0',c:'-1 < x < 0 o x > 1',o:['x < -1 o 0 < x < 1','x < -1 o x > 1','-1 < x < 1']},
  {t:'inecuaciones',q:'Resolver: x^2 - 2x + 1 < 0',c:'Ninguna solucion',o:['x < 1','x > 1','Todos los reales']},

  // === CALCULO (15) ===
  {t:'calculo',q:'lim_(x→-∞) (3x^2+2x-1)/(5x^2-x+4)',c:'3/5',o:['0','-3/5','∞']},
  {t:'calculo',q:'lim_(x→0) (sen 2x)/(sen 3x)',c:'2/3',o:['3/2','1','0']},
  {t:'calculo',q:'lim_(x→1) (√x - 1)/(x-1)',c:'1/2',o:['1','0','2']},
  {t:'calculo',q:'d/dx (cos(ln x))',c:'-sen(ln x)/x',o:['-sen(ln x)','sen(ln x)/x','sen(ln x)']},
  {t:'calculo',q:'d/dx (ln(e^x+1))',c:'e^x/(e^x+1)',o:['1/(e^x+1)','e^x/(e^x)','e^x']},
  {t:'calculo',q:'d/dx (x^2 e^(2x))',c:'2x e^(2x)(x+1)',o:['2x e^(2x)+x^2 e^(2x)','2x e^(2x)','x^2 e^(2x)+2x e^(2x)']},
  {t:'calculo',q:'La recta tangente a f(x)=x^3-2x en x=1 tiene pendiente:',c:'1',o:['-1','0','2']},
  {t:'calculo',q:'f(x)=x^3-3x^2+1, el punto de inflexion esta en x=',c:'1',o:['0','2','3']},
  {t:'calculo',q:'∫ (3x^2 + 5)^4 * 6x dx',c:'(3x^2+5)^5/5 + C',o:['(3x^2+5)^5 + C','6(3x^2+5)^4 + C','(3x^2+5)^5/10 + C']},
  {t:'calculo',q:'∫_0^π/4 sec^2 x dx',c:'1',o:['0','√2','π/4']},
  {t:'calculo',q:'∫_0^1 x/(x^2+1) dx',c:'(ln 2)/2',o:['ln 2','1','1/2']},
  {t:'calculo',q:'∫_1^3 (2x-4) dx',c:'0',o:['4','-4','2']},
  {t:'calculo',q:'El area entre y=x^2 y y=x^3 de x=0 a x=1',c:'1/12',o:['1/4','1/6','1/3']},
  {t:'calculo',q:'d/dx (x^3 √x)',c:'(7/2)x^(5/2)',o:['3x^2 √x','(7/2)x^(3/2)','(5/2)x^(3/2)']},
  {t:'calculo',q:'Si f(x)=x^4-2x^3+1, f"(x)=',c:'12x^2-12x',o:['4x^3-6x^2','12x-12','12x^2-6']},

  // === TEC-LOGICA (15) ===
  {t:'tec-logica',q:'p⊕q (OR exclusivo) es verdadero cuando:',c:'p y q son diferentes',o:['p y q son verdaderos','p y q son falsos','p es verdadero']},
  {t:'tec-logica',q:'p⊕q (OR exclusivo) es falso cuando:',c:'p y q son iguales',o:['p y q son diferentes','p es falso','q es falso']},
  {t:'tec-logica',q:'p → q ≡ ¬p ∨ q se llama:',c:'Ley de la implicacion',o:['Ley de De Morgan','Ley de la doble negacion','Ley de absorcion']},
  {t:'tec-logica',q:'¬(p ∨ q) ≡ ¬p ∧ ¬q se llama:',c:'Ley de De Morgan',o:['Ley de la implicacion','Ley de la doble negacion','Ley conmutativa']},
  {t:'tec-logica',q:'La media aritmetica de 100,200,300,400 es:',c:'250',o:['200','300','350']},
  {t:'tec-logica',q:'La media geometrica de 1,3,9 es:',c:'3',o:['1','9','4.3']},
  {t:'tec-logica',q:'La mediana de {1,3,3,6,7,8,9} es:',c:'6',o:['3','7','5']},
  {t:'tec-logica',q:'La moda de {a,a,b,b,b,c,c} es:',c:'b',o:['a','c','No hay moda']},
  {t:'tec-logica',q:'El primer cuartil Q1 de {1,2,3,4,5,6,7,8} es:',c:'2.5',o:['2','3','4']},
  {t:'tec-logica',q:'El tercer cuartil Q3 de {1,2,3,4,5,6,7,8} es:',c:'6.5',o:['6','7','5.5']},
  {t:'tec-logica',q:'La probabilidad de un evento A es 1 si A es:',c:'Seguro',o:['Imposible','Probable','Posible']},
  {t:'tec-logica',q:'P(A|B) = P(A∩B)/P(B) se llama:',c:'Probabilidad condicional',o:['Probabilidad total','Probabilidad conjunta','Probabilidad marginal']},
  {t:'tec-logica',q:'P(A|B) = P(A) significa que A y B son:',c:'Independientes',o:['Dependientes','Mutualmente excluyentes','Complementarios']},
  {t:'tec-logica',q:'Una funcion logica se puede representar mediante una:',c:'Tabla de verdad',o:['Ecuacion','Derivada','Integral']},
  {t:'tec-logica',q:'El conjunto vacio se denota:',c:'∅',o:['{0}','{∅}','U']},

  // === FACTORIZACION (15) ===
  {t:'factorizacion',q:'x^2 + 10x + 21 =',c:'(x+7)(x+3)',o:['(x-7)(x-3)','(x+7)(x-3)','(x+2)(x+5)']},
  {t:'factorizacion',q:'x^2 - 3x - 18 =',c:'(x-6)(x+3)',o:['(x+6)(x-3)','(x-9)(x+2)','(x-6)(x-3)']},
  {t:'factorizacion',q:'x^2 + x - 12 =',c:'(x+4)(x-3)',o:['(x-4)(x+3)','(x+6)(x-2)','(x+12)(x-1)']},
  {t:'factorizacion',q:'15x^2 + 7x - 2 =',c:'(5x-1)(3x+2)',o:['(5x+1)(3x-2)','(15x-1)(x+2)','(5x-2)(3x+1)']},
  {t:'factorizacion',q:'10x^2 + 11x + 3 =',c:'(5x+3)(2x+1)',o:['(5x+1)(2x+3)','(10x+3)(x+1)','(5x-3)(2x-1)']},
  {t:'factorizacion',q:'8x^2 + 6x - 5 =',c:'(4x+5)(2x-1)',o:['(4x-5)(2x+1)','(8x-5)(x+1)','(2x-1)(4x+5)']},
  {t:'factorizacion',q:'a^2 - 2ab + b^2 =',c:'(a-b)^2',o:['(a+b)^2','(a-b)(a+b)','(a^2-b^2)']},
  {t:'factorizacion',q:'a^2 + 2ab + b^2 =',c:'(a+b)^2',o:['(a-b)^2','(a+b)(a-b)','(a^2+b^2)']},
  {t:'factorizacion',q:'a^2 - b^2 =',c:'(a+b)(a-b)',o:['(a-b)^2','(a+b)^2','a^2 - 2ab + b^2']},
  {t:'factorizacion',q:'x^2 + 8x + 15 =',c:'(x+3)(x+5)',o:['(x+3)(x-5)','(x-3)(x-5)','(x+15)(x+1)']},
  {t:'factorizacion',q:'x^2 - 2x - 15 =',c:'(x-5)(x+3)',o:['(x+5)(x-3)','(x-5)(x-3)','(x-15)(x+1)']},
  {t:'factorizacion',q:'6x^2 - 7x + 2 =',c:'(2x-1)(3x-2)',o:['(2x+1)(3x+2)','(3x-1)(2x-2)','(6x-1)(x-2)']},
  {t:'factorizacion',q:'9x^2 - 16 =',c:'(3x+4)(3x-4)',o:['(9x-4)(x+4)','(3x-4)^2','(3x+4)^2']},
  {t:'factorizacion',q:'4x^2 - 20x + 25 =',c:'(2x-5)^2',o:['(2x+5)^2','(4x-5)(x-5)','(2x-5)(2x+5)']},
  {t:'factorizacion',q:'x^3 - 125 =',c:'(x-5)(x^2+5x+25)',o:['(x-5)(x^2-5x+25)','(x+5)(x^2-5x+25)','(x-5)^3']},

  // === TEC-VERBAL (15) ===
  {t:'tec-verbal',q:'"Onus" significa:',c:'Carga u obligacion',o:['Alivio','Libertad','Placer']},
  {t:'tec-verbal',q:'"Plus ultra" significa:',c:'Mas alla',o:['Mas cerca','Menos que','Igual que']},
  {t:'tec-verbal',q:'"Sine qua non" significa:',c:'Sin la cual no',o:['Con la cual si','Sin excepcion','Siempre']},
  {t:'tec-verbal',q:'"Ad hoc" significa:',c:'Para esto',o:['Contra esto','Sin esto','Sobre esto']},
  {t:'tec-verbal',q:'"Ex professo" significa:',c:'De proposito',o:['Sin querer','Por error','Al azar']},
  {t:'tec-verbal',q:'"Verbigracia" significa:',c:'Por ejemplo',o:['Por cierto','Por tanto','Por que']},
  {t:'tec-verbal',q:'"Idem" significa:',c:'El mismo',o:['Diferente','Otro','Distinto']},
  {t:'tec-verbal',q:'"Mutatis mutandis" significa:',c:'Cambiando lo que se deba cambiar',o:['Sin cambios','Con cambios minimos','Igual']},
  {t:'tec-verbal',q:'"Per se" significa:',c:'Por si mismo',o:['Por otro','Para si','Desde si']},
  {t:'tec-verbal',q:'"A priori" significa:',c:'Antes de la experiencia',o:['Despues de la experiencia','Durante la experiencia','Sin experiencia']},
  {t:'tec-verbal',q:'"A posteriori" significa:',c:'Despues de la experiencia',o:['Antes de la experiencia','Durante la experiencia','Sin experiencia']},
  {t:'tec-verbal',q:'"In situ" significa:',c:'En el lugar',o:['Fuera del lugar','Lejos','Cerca']},
  {t:'tec-verbal',q:'"Ex nihilo" significa:',c:'De la nada',o:['Del todo','De algo','Del vacio']},
  {t:'tec-verbal',q:'"Summum" significa:',c:'El maximo',o:['El minimo','El intermedio','El promedio']},
  {t:'tec-verbal',q:'"Modus operandi" significa:',c:'Modo de operar',o:['Modo de vivir','Modo de pensar','Modo de hablar']},
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
