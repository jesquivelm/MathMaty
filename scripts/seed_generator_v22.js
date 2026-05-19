process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-flash-v22';const A='generacion-programatica';const N='7-11';

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const temas=[
  // === CONJUNTOS (20) ===
  {t:'conjuntos',n:'7-8',q:'A = {1,2,3}, B = {2,3,4}. A ∪ B =',c:'{1,2,3,4}',o:['{2,3}','{1,4}','{1,2,3}']},
  {t:'conjuntos',n:'7-8',q:'A = {1,2,3}, B = {2,3,4}. A ∩ B =',c:'{2,3}',o:['{1,4}','{1,2,3,4}','{2,3,4}']},
  {t:'conjuntos',n:'7-8',q:'A = {1,2,3,4,5}, B = {3,4,5,6,7}. A - B =',c:'{1,2}',o:['{6,7}','{3,4,5}','{1,2,3,4,5,6,7}']},
  {t:'conjuntos',n:'7-8',q:'A = {1,2,3,4,5}, B = {3,4,5,6,7}. B - A =',c:'{6,7}',o:['{1,2}','{3,4,5}','{1,2,6,7}']},
  {t:'conjuntos',n:'7-8',q:'El conjunto vacio tiene cardinalidad:',c:'0',o:['1','∞','No definido']},
  {t:'conjuntos',n:'7-8',q:'A = {a,b,c}, B = {a,b}. A ⊆ B es:',c:'Falso',o:['Verdadero','Depende','No se sabe']},
  {t:'conjuntos',n:'7-8',q:'A = {a,b}, B = {a,b,c}. A ⊆ B es:',c:'Verdadero',o:['Falso','Depende','No se sabe']},
  {t:'conjuntos',n:'7-8',q:'(A ∩ B) ⊆ (A ∪ B) es siempre:',c:'Verdadero',o:['Falso','Depende','Solo si A=B']},
  {t:'conjuntos',n:'7-8',q:'|A ∪ B| = |A| + |B| - |A ∩ B| se llama:',c:'Principio de inclusion-exclusion',o:['Ley de Morgan','Propiedad conmutativa','Propiedad asociativa']},
  {t:'conjuntos',n:'7-8',q:'(A ∪ B)^c =',c:'A^c ∩ B^c',o:['A^c ∪ B^c','A ∩ B','A ∪ B']},
  {t:'conjuntos',n:'7-8',q:'(A ∩ B)^c =',c:'A^c ∪ B^c',o:['A^c ∩ B^c','A ∪ B','A ∩ B']},
  {t:'conjuntos',n:'7-8',q:'A = {x | x es numero par y x < 10}, A =',c:'{2,4,6,8}',o:['{1,3,5,7,9}','{0,2,4,6,8}','{2,4,6,8,10}']},
  {t:'conjuntos',n:'7-8',q:'Si A ∩ B = ∅, los conjuntos son:',c:'Disjuntos',o:['Iguales','Subconjuntos','Complementarios']},
  {t:'conjuntos',n:'7-8',q:'A = {1,2,3}. |P(A)| (cardinal del conjunto potencia) =',c:'8',o:['4','6','3']},
  {t:'conjuntos',n:'7-8',q:'U = {1,2,3,4,5}, A = {1,2,3}. A^c =',c:'{4,5}',o:['{1,2,3}','{1,2,3,4,5}','∅']},
  {t:'conjuntos',n:'7-8',q:'N (naturales) ∩ Z (enteros negativos) =',c:'∅',o:['N','Z','{0}']},
  {t:'conjuntos',n:'7-8',q:'La notacion {x | x > 3} se lee:',c:'El conjunto de x tal que x es mayor que 3',o:['x es mayor que 3','x > 3','Conjunto x mayor 3']},
  {t:'conjuntos',n:'7-8',q:'Si A ⊆ B y B ⊆ A, entonces:',c:'A = B',o:['A ⊂ B','B ⊂ A','A ∩ B = ∅']},
  {t:'conjuntos',n:'7-8',q:'La diferencia simetrica A Δ B = (A-B) ∪ (B-A). A={1,2,3}, B={2,3,4}, AΔB=',c:'{1,4}',o:['{2,3}','{1,2,3,4}','{1,2,4}']},
  {t:'conjuntos',n:'7-8',q:'Q (racionales) ∪ I (irracionales) =',c:'R (reales)',o:['Q','I','Z']},

  // === NUMEROS REALES (20) ===
  {t:'numeros-reales',n:'7-8',q:'√2 pertenece a:',c:'Irracionales',o:['Naturales','Enteros','Racionales']},
  {t:'numeros-reales',n:'7-8',q:'0.5 pertenece a:',c:'Racionales',o:['Enteros','Irracionales','Naturales']},
  {t:'numeros-reales',n:'7-8',q:'-3 pertenece a:',c:'Enteros',o:['Naturales','Irracionales','Racionales no enteros']},
  {t:'numeros-reales',n:'7-8',q:'La propiedad conmutativa de la suma dice: a + b =',c:'b + a',o:['a - b','b - a','a * b']},
  {t:'numeros-reales',n:'7-8',q:'El elemento neutro de la suma es:',c:'0',o:['1','-1','∞']},
  {t:'numeros-reales',n:'7-8',q:'El elemento neutro del producto es:',c:'1',o:['0','-1','∞']},
  {t:'numeros-reales',n:'7-8',q:'El inverso aditivo de 5 es:',c:'-5',o:['5','1/5','-1/5']},
  {t:'numeros-reales',n:'7-8',q:'El inverso multiplicativo de 3 es:',c:'1/3',o:['3','-3','-1/3']},
  {t:'numeros-reales',n:'7-8',q:'5 + 0 = 5 ejemplifica:',c:'Elemento neutro',o:['Conmutatividad','Asociatividad','Inverso']},
  {t:'numeros-reales',n:'7-8',q:'(2+3)+4 = 2+(3+4) ejemplifica:',c:'Asociatividad',o:['Conmutatividad','Distributividad','Elemento neutro']},
  {t:'numeros-reales',n:'7-8',q:'3(4+5) = 3*4 + 3*5 ejemplifica:',c:'Distributividad',o:['Conmutatividad','Asociatividad','Elemento neutro']},
  {t:'numeros-reales',n:'7-8',q:'π es un numero:',c:'Irracional',o:['Racional','Entero','Natural']},
  {t:'numeros-reales',n:'7-8',q:'La densidad de los reales significa que entre dos reales:',c:'Hay infinitos reales',o:['No hay ninguno','Hay uno','Hay finitos']},
  {t:'numeros-reales',n:'7-8',q:'|-5| =',c:'5',o:['-5','0','±5']},
  {t:'numeros-reales',n:'7-8',q:'|3 - 7| =',c:'4',o:['-4','10','-10']},
  {t:'numeros-reales',n:'7-8',q:'La distancia entre -2 y 3 en la recta real es:',c:'5',o:['1','-1','6']},
  {t:'numeros-reales',n:'7-8',q:'2/3 + 1/2 =',c:'7/6',o:['3/5','3/6','2/5']},
  {t:'numeros-reales',n:'7-8',q:'Los enteros (Z) son un subconjunto de:',c:'Racionales (Q)',o:['Naturales (N)','Irracionales','Complejos']},
  {t:'numeros-reales',n:'7-8',q:'3 + 2 = 2 + 3 ejemplifica:',c:'Conmutatividad',o:['Asociatividad','Distributividad','Elemento neutro']},
  {t:'numeros-reales',n:'7-8',q:'a * (b + c) = a*b + a*c es la propiedad:',c:'Distributiva',o:['Conmutativa','Asociativa','Identidad']},

  // === RADICALES (20) ===
  {t:'radicales',n:'8-9',q:'√9 =',c:'3',o:['±3','-3','9']},
  {t:'radicales',n:'8-9',q:'√25 + √16 =',c:'9',o:['7','41','√41']},
  {t:'radicales',n:'8-9',q:'√(4*9) =',c:'6',o:['36','13','√13']},
  {t:'radicales',n:'8-9',q:'√(4) * √(9) =',c:'6',o:['36','√36','13']},
  {t:'radicales',n:'8-9',q:'√18 simplificado es:',c:'3√2',o:['2√3','9√2','6√3']},
  {t:'radicales',n:'8-9',q:'√72 simplificado es:',c:'6√2',o:['8√9','12√6','2√18']},
  {t:'radicales',n:'8-9',q:'√50 simplificado es:',c:'5√2',o:['2√5','10√5','25√2']},
  {t:'radicales',n:'8-9',q:'√12 simplificado es:',c:'2√3',o:['3√2','4√3','6√2']},
  {t:'radicales',n:'8-9',q:'³√8 =',c:'2',o:['±2','4','√8']},
  {t:'radicales',n:'8-9',q:'³√27 =',c:'3',o:['±3','9','27']},
  {t:'radicales',n:'8-9',q:'√(a^2) =',c:'|a|',o:['a','±a','a^2']},
  {t:'radicales',n:'8-9',q:'√(1/4) =',c:'1/2',o:['±1/2','1/4','2']},
  {t:'radicales',n:'8-9',q:'√2 * √8 =',c:'4',o:['2','16','√10']},
  {t:'radicales',n:'8-9',q:'√(x^2 y) =',c:'x√y',o:['x y','x^2 √y','√(xy)']},
  {t:'radicales',n:'8-9',q:'(√5)^2 =',c:'5',o:['25','√10','5√5']},
  {t:'radicales',n:'8-9',q:'Racionalizar: 1/√2 =',c:'√2/2',o:['1/2','2/√2','√2']},
  {t:'radicales',n:'8-9',q:'Racionalizar: 3/√3 =',c:'√3',o:['3/3','√3/3','3√3']},
  {t:'radicales',n:'8-9',q:'√27 / √3 =',c:'3',o:['√24','9','√9']},
  {t:'radicales',n:'8-9',q:'√(a^2 b^3) =',c:'a b√b',o:['a b^2 √b','a^2 b√b','a b √(ab)']},
  {t:'radicales',n:'8-9',q:'√8 + √2 =',c:'3√2',o:['√10','2√3','4√2']},

  // === POLINOMIOS (20) ===
  {t:'polinomios',n:'8-9',q:'(3x^2 + 2x) + (x^2 - 5x) =',c:'4x^2 - 3x',o:['4x^2 + 7x','3x^4 + 2x^2','4x^2 - 7x']},
  {t:'polinomios',n:'8-9',q:'(5x^3 - 2x) - (3x^3 + x) =',c:'2x^3 - 3x',o:['2x^3 - x','8x^3 - x','2x^3 + x']},
  {t:'polinomios',n:'8-9',q:'(x^2 + 2x + 1) + (3x^2 - x + 4) =',c:'4x^2 + x + 5',o:['4x^2 + x + 5','4x^2 + 3x + 5','3x^2 + x + 5']},
  {t:'polinomios',n:'8-9',q:'El grado de 4x^3 - 2x^2 + 5x - 1 es:',c:'3',o:['4','1','2']},
  {t:'polinomios',n:'8-9',q:'El grado de 7x^5 - 3x^2 + 2 es:',c:'5',o:['7','2','3']},
  {t:'polinomios',n:'8-9',q:'(2x)(3x^2) =',c:'6x^3',o:['6x^2','5x^3','6x']},
  {t:'polinomios',n:'8-9',q:'(3x^2)(-2x^3) =',c:'-6x^5',o:['-6x^6','6x^5','-5x^5']},
  {t:'polinomios',n:'8-9',q:'El coeficiente principal de 3x^4 - 2x^2 + 7 es:',c:'3',o:['4','2','7']},
  {t:'polinomios',n:'8-9',q:'El termino constante de 5x^3 - 3x + 8 es:',c:'8',o:['5','3','-3']},
  {t:'polinomios',n:'8-9',q:'(x+2)(x+3) =',c:'x^2 + 5x + 6',o:['x^2 + 6x + 5','x^2 + 5x + 5','x^2 + 6x + 6']},
  {t:'polinomios',n:'8-9',q:'(x-4)(x+1) =',c:'x^2 - 3x - 4',o:['x^2 + 3x - 4','x^2 - 5x + 4','x^2 - 3x + 4']},
  {t:'polinomios',n:'8-9',q:'(2x+1)(x-3) =',c:'2x^2 - 5x - 3',o:['2x^2 + 5x - 3','2x^2 - 5x + 3','2x^2 - 6x - 3']},
  {t:'polinomios',n:'8-9',q:'(x+3)^2 =',c:'x^2 + 6x + 9',o:['x^2 + 9','x^2 + 3x + 9','x^2 + 6x + 3']},
  {t:'polinomios',n:'8-9',q:'(2x-1)^2 =',c:'4x^2 - 4x + 1',o:['4x^2 + 4x + 1','4x^2 - 2x + 1','2x^2 - 4x + 1']},
  {t:'polinomios',n:'8-9',q:'(2x^2) / (x) =',c:'2x',o:['2x^2','2','x']},
  {t:'polinomios',n:'8-9',q:'(6x^3 + 9x^2) / (3x) =',c:'2x^2 + 3x',o:['2x^3 + 3x^2','6x^2 + 9x','2x^2 + 3']},
  {t:'polinomios',n:'8-9',q:'Un polinomio de grado 2 se llama:',c:'Cuadratico',o:['Lineal','Cubico','Constante']},
  {t:'polinomios',n:'8-9',q:'Un polinomio de grado 1 se llama:',c:'Lineal',o:['Cuadratico','Cubico','Constante']},
  {t:'polinomios',n:'8-9',q:'(12x^4 - 8x^3) / (4x^2) =',c:'3x^2 - 2x',o:['3x^2 + 2x','12x^2 - 8x','3x^2 - 2']},
  {t:'polinomios',n:'8-9',q:'(x^2 - 9) / (x+3) =',c:'x - 3',o:['x + 3','x^2 - 3','x - 9']},
];

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<temas.length;i++){
    const e=temas[i];const src=S+'|'+e.t+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:''}]),null,'facil','mep',2025,src,A,null,e.n||'7-11']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
