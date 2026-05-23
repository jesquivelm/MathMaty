process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-v29';const A='generacion-programatica';

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}

const R=(m,M)=>Math.floor(Math.random()*(M-m+1))+m;
const pick=a=>a[R(0,a.length-1)];

const temas=[];let idx=0;

// === CONJUNTOS (150) ===
(()=>{
const niveles=['7-8','7-8','7-8','7-8','8-9','8-9','9-10','9-10'];
const letters=['a','b','c','d','e','f','g','h'];
for(let i=0;i<30;i++){
  const a=R(1,9),b=R(1,9),c=R(1,9),d=R(1,9);
  if(a===b||a===c||a===d||b===c||b===d||c===d)continue;
  const A=[a,b],B=[c,d];
  const Astr=`{${a},${b}}`,Bstr=`{${c},${d}}`;
  const union=JSON.stringify([...new Set([...A,...B])].sort()).replace(/,/g,',');
  const inter=JSON.stringify(A.filter(x=>B.includes(x)).sort()).replace(/,/g,',');
  const Adif=JSON.stringify(A.filter(x=>!B.includes(x)).sort()).replace(/,/g,',');
  const Bdif=JSON.stringify(B.filter(x=>!A.includes(x)).sort()).replace(/,/g,',');
  if(inter!=='[]'){temas.push({t:'conjuntos',n:pick(niveles),q:`A = ${Astr}, B = ${Bstr}. A ∪ B =`,c:union,o:[inter,Adif,Bdif]});idx++;}
  temas.push({t:'conjuntos',n:pick(niveles),q:`A = ${Astr}, B = ${Bstr}. A ∩ B =`,c:inter,o:[union,Adif,Bdif]});idx++;
  temas.push({t:'conjuntos',n:pick(niveles),q:`A = ${Astr}, B = ${Bstr}. A - B =`,c:Adif,o:[union,inter,Bdif]});idx++;
  temas.push({t:'conjuntos',n:pick(niveles),q:`A = ${Astr}, B = ${Bstr}. B - A =`,c:Bdif,o:[union,inter,Adif]});idx++;
}
for(let i=0;i<15;i++){
  const n=R(2,7);
  temas.push({t:'conjuntos',n:'7-8',q:`Un conjunto con ${n} elementos tiene cardinalidad:`,c:`${n}`,o:[`${n+1}`,`${n-1}`,'∞']});idx++;
}
temas.push({t:'conjuntos',n:'7-8',q:'A = {x|x es vocal}. |A| =',c:'5',o:['3','4','6']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'A = {x|x es dia de la semana}. |A| =',c:'7',o:['5','6','8']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'(A ∪ B) ∩ C = A ∪ (B ∩ C) es:',c:'Falso en general',o:['Siempre verdadero','Ley de Morgan','Propiedad conmutativa']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'U = {1,2,3,4,5,6}, A = {1,2,3}, B = {3,4,5}. (A ∩ B)^c =',c:'{1,2,4,5,6}',o:['{3}','{6}','{1,2,4,5}']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'U = {a,b,c,d,e}, A = {a,b,c}. A^c =',c:'{d,e}',o:['{a,b}','{c,d,e}','∅']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'Si |A|=10, |B|=8, |A∪B|=15, entonces |A∩B|=',c:'3',o:['2','5','18']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'Si |A|=12, |B|=7, |A∩B|=4, entonces |A∪B|=',c:'15',o:['19','23','11']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C| es:',c:'Principio de inclusion-exclusion',o:['Regla de la suma','Teorema de Bayes','Ley de Morgan']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'A = {1,2,3,4}, B = {3,4,5,6}. A Δ B = (A-B) ∪ (B-A) =',c:'{1,2,5,6}',o:['{3,4}','{1,2,3,4,5,6}','{1,2,3,4}']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'El conjunto {x ∈ N | x < 0} es:',c:'∅',o:['{0}','N','{1}']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'A = {2,4,6}, B = {1,2,3,4,5}. A ⊆ B es:',c:'Falso (6∉B)',o:['Verdadero','A=B','A⊂B']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'A = {a,b,c}. P(A) (conjunto potencia) tiene:',c:'8 elementos',o:['3 elementos','6 elementos','4 elementos']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'U={1,2,3,4,5},A={1,2,3},B={2,5}. (A ∪ B)^c =',c:'{4}',o:['{1,2,3,5}','{2,5}','∅']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'U={1,2,3,4,5,6,7,8},A={2,4,6,8}. A^c =',c:'{1,3,5,7}',o:['{2,4,6,8}','∅','U']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'|P({1,2,3,4})| (cardinal del conjunto potencia) =',c:'16',o:['8','4','12']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'Si |A|=5, |P(A)| =',c:'32',o:['25','10','5']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'A={x∈Z|-2≤x<3}, B={x∈N|x≤2}. A∩B=',c:'{0,1,2}',o:['{-2,-1,0,1,2}','{-2,-1,0,1,2,3}','{0,1,2,3}']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'Sean A={1,2,3,4,5,6,7,8,9,10}, B={2,4,6,8,10}, C={1,3,5,7,9}. B ∪ C =',c:'A',o:['B','C','U']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'A={x∈R|x^2=4}, B={x∈R||x|=2}. A y B son:',c:'Iguales',o:['Disjuntos','A⊂B','B⊂A']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'A={1,{2,3},4}. |A| =',c:'3',o:['4','2','5']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'Si A={∅,{∅}}. |P(A)| =',c:'4',o:['2','1','8']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'Dos conjuntos con los mismos elementos son:',c:'Iguales',o:['Equivalentes','Subconjuntos','Disjuntos']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'A={1,2,3}, B={a,b,c}. A y B tienen:',c:'Misma cardinalidad',o:['Mismos elementos','A=B','Son iguales']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'A∩B=∅ significa que A y B son:',c:'Disjuntos',o:['Iguales','Complementarios','Subconjuntos']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'La notacion {x: P(x)} se llama:',c:'Notacion por comprension',o:['Notacion por extension','Notacion conjuntista','Notacion de pertenencia']});idx++;
temas.push({t:'conjuntos',n:'7-8',q:'0 pertenece al conjunto de numeros:',c:'Naturales (N) o Enteros (Z)',o:['Solo N','Solo Z','Ninguno']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'U={1,2,3,4,5},A={1,2,3},B={3,4,5}. (A∩B)^c en U es:',c:'{1,2,4,5}',o:['{3}','{1,2,3,4,5}','{1,2,4,5}']});idx++;
temas.push({t:'conjuntos',n:'8-9',q:'U={1,2,3,4,5},A={1,2},B={4,5},C={3}. A,B,C particionan U?',c:'Si',o:['No','Faltan elementos','Sobran elementos']});idx++;
temas.push({t:'conjuntos',n:'9-10',q:'A-B = ∅ significa:',c:'A ⊆ B',o:['B ⊆ A','A = B','A ∩ B = ∅']});idx++;
console.log('conjuntos:',idx);
})();

// === NUMEROS REALES (150) ===
(()=>{
const start=idx;
for(let i=0;i<20;i++){
  const a=R(2,9),b=R(2,9),c=R(2,9),d=R(2,9);
  if(b===0||d===0)continue;
  temas.push({t:'numeros-reales',n:'7-8',q:`${a}/${b} + ${c}/${d} =`,c:`${a*d+b*c}/${b*d}`,o:[`${a+c}/${b+d}`,`${a*d+b*c}/1`,`${a+b}/${c+d}`]});idx++;
}
temas.push({t:'numeros-reales',n:'7-8',q:'-5 + (-3) =',c:'-8',o:['8','-2','2']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'(-4)(-2) =',c:'8',o:['-8','6','-6']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'-2 - (-7) =',c:'5',o:['-9','-5','9']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'(-3)^2 =',c:'9',o:['-9','6','-6']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'3 + (-8) + 5 =',c:'0',o:['16','-16','-6']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'El opuesto de -12 es:',c:'12',o:['0','1/12','-1/12']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'El reciproco de -4 es:',c:'-1/4',o:['4','-4','1/4']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'(-2)^3 =',c:'-8',o:['8','-6','6']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'(-1)^100 =',c:'1',o:['-1','0','100']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'(-1)^99 =',c:'-1',o:['1','0','99']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'|7| =',c:'7',o:['-7','0','±7']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'|-3| =',c:'3',o:['-3','0','±3']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'2^3 =',c:'8',o:['6','5','9']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'3^2 =',c:'9',o:['6','8','5']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'(2/3) ÷ (4/5) =',c:'10/12=5/6',o:['8/15','6/20','10/8=5/4']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'Convertir 0.75 a fraccion:',c:'3/4',o:['1/4','1/2','2/3']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'Convertir 0.333... a fraccion:',c:'1/3',o:['3/10','1/2','2/3']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'√2 + √2 =',c:'2√2',o:['√4','2','4']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(√3)^2 =',c:'3',o:['9','√6','6']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'√12 =',c:'2√3',o:['3√2','√12','4√3']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'√50 =',c:'5√2',o:['2√5','10√2','25√2']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'Racionalizar: 2/√3 =',c:'2√3/3',o:['2/3','√3/3','2√3']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'Racionalizar: 5/√5 =',c:'√5',o:['5√5','1','√5/5']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'3 + 2 * 5 =',c:'13',o:['25','30','10']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'(3+2)*5 =',c:'25',o:['13','10','30']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'2^0 =',c:'1',o:['0','2','∞']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(-2)^-3 =',c:'-1/8',o:['1/8','-8','8']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(3^-2)(3^4) =',c:'9',o:['3','6','81']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(2^3)^2 =',c:'64',o:['12','32','16']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'El valor de pi (π) redondeado es:',c:'3.14',o:['3.41','3.04','3.41']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'0.5 + 1/3 =',c:'5/6',o:['0.833... (correcto)','2/8=1/4','1/5']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'Un numero entero negativo es:',c:'Menor que cero',o:['Mayor que cero','Mayor que los positivos','Igual a cero']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'En la recta numerica, -5 esta:',c:'A la izquierda de 0',o:['A la derecha de 0','En el mismo lugar que 5','A la derecha de -3']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'El producto de dos numeros negativos es:',c:'Positivo',o:['Negativo','Cero','Depende']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'La suma de dos numeros negativos es:',c:'Negativa',o:['Positiva','Cero','Depende']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'2.5 * 10^-3 en decimal:',c:'0.0025',o:['0.025','0.00025','2500']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'0.0006 en notacion cientifica:',c:'6*10^-4',o:['6*10^-3','6*10^4','0.6*10^-3']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'La recta real es densa porque entre dos reales hay:',c:'Infinitos reales',o:['Ninguno','Uno solo','Finitos']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'El conjunto de los reales se denota:',c:'R',o:['Q','Z','N']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'10/2 + 3*4 =',c:'17',o:['22','28','14']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'(10/2 + 3)*4 =',c:'32',o:['17','22','14']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'El maximo comun divisor de 12 y 18 es:',c:'6',o:['3','36','12']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'El minimo comun multiplo de 6 y 8 es:',c:'24',o:['48','12','2']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'3/5 de 100 es:',c:'60',o:['35','50','40']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'Un entero es par si termina en:',c:'0,2,4,6,8',o:['1,3,5,7,9','0,5','0,2,4']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'420 divisible entre?',c:'2,3,5,7',o:['Solo 2','Solo 2 y 5','Solo 3 y 7']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(a+b)^2 =',c:'a^2+2ab+b^2',o:['a^2+b^2','a^2-2ab+b^2','a^2+ab+b^2']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(a-b)^2 =',c:'a^2-2ab+b^2',o:['a^2+b^2','a^2+2ab+b^2','a^2-ab+b^2']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(a+b)(a-b) =',c:'a^2-b^2',o:['a^2+b^2','(a-b)^2','a^2+2ab+b^2']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'2 es un numero:',c:'Primo y par',o:['Solo primo','Solo par','Compuesto']});idx++;
temas.push({t:'numeros-reales',n:'7-8',q:'El opuesto de 7 es:',c:'-7',o:['7','1/7','-1/7']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'Cual es el valor de 3^4?',c:'81',o:['27','12','64']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'Cual es el valor de 5^3?',c:'125',o:['25','15','75']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(x^3)(x^5) =',c:'x^8',o:['x^15','x^2','x^3x^5']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'x^7 / x^2 =',c:'x^5',o:['x^9','x^3.5','x^14']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(x^2)^3 =',c:'x^6',o:['x^5','x^8','x^9']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'0.1 en fraccion:',c:'1/10',o:['1/100','1/5','1/2']});idx++;
temas.push({t:'numeros-reales',n:'8-9',q:'0.01 en fraccion:',c:'1/100',o:['1/10','1/50','1/20']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(0.01)^2 =',c:'0.0001',o:['0.001','0.1','0.02']});idx++;
temas.push({t:'numeros-reales',n:'9-10',q:'(0.1)^3 =',c:'0.001',o:['0.01','0.0001','0.3']});idx++;
console.log('numeros-reales:',idx-start);
})();

// === RADICALES (150) ===
(()=>{
const start=idx;
for(let i=2;i<=10;i++){temas.push({t:'radicales',n:'8-9',q:`√${i*i}=`,c:`${i}`,o:[`${i+1}`,`${i-1}`,`${2*i}`]});idx++;}
for(let i=2;i<=10;i++){temas.push({t:'radicales',n:'8-9',q:`√(${i*i}*${i*i})=`,c:`${i*i}`,o:[`${i}`,`${2*i}`,`${i+i}`]});idx++;}
temas.push({t:'radicales',n:'9-10',q:'√50 + √18 =',c:'8√2',o:['√68','2√17','5√2+3√2=8√2']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√45 - √20 =',c:'√5',o:['√25','2√5','3√5']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√12 + √27 =',c:'5√3',o:['√39','2√3+3√3','3√3']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√8 * √2 =',c:'4',o:['√16=4 (ok)','2','√10']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√18 * √2 =',c:'6',o:['√36=6 (ok)','4','√20']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√32 * √2 =',c:'8',o:['√64=8 (ok)','6','√34']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√72 / √2 =',c:'6',o:['√36=6 (ok)','4','√70']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√48 / √3 =',c:'4',o:['√16=4 (ok)','2','√45']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√54 / √6 =',c:'3',o:['√9=3 (ok)','2','√48']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(-4) es:',c:'No es real',o:['2','-2','±2']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(x^2) =',c:'|x|',o:['x','-x','±x']});idx++;
temas.push({t:'radicales',n:'9-10',q:'⁴√81 =',c:'3',o:['9','±3','27']});idx++;
temas.push({t:'radicales',n:'9-10',q:'⁴√16 =',c:'2',o:['4','±2','8']});idx++;
temas.push({t:'radicales',n:'9-10',q:'³√(-125) =',c:'-5',o:['5','±5','-25']});idx++;
temas.push({t:'radicales',n:'9-10',q:'³√(-64) =',c:'-4',o:['4','±4','-8']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(a^3) =',c:'a√a',o:['a^2√a','a^2','a√a^2']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(a^5) =',c:'a^2√a',o:['a√a','a^5','a^2a^3']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(a^2 b^4) =',c:'a b^2',o:['a b','a^2 b^4','√a b^2']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(4x^2) =',c:'2|x|',o:['2x','±2x','√4x']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(9x^4) =',c:'3x^2',o:['3|x^2|','9x^2','√9x^2']});idx++;
temas.push({t:'radicales',n:'8-9',q:'Racionalizar 4/√2:',c:'2√2',o:['4√2/2=2√2','√2/4','2/√2']});idx++;
temas.push({t:'radicales',n:'8-9',q:'Racionalizar 6/√3:',c:'2√3',o:['6√3/3=2√3','√3/6','6/3']});idx++;
temas.push({t:'radicales',n:'9-10',q:'(√2 + 1)(√2 - 1) =',c:'1',o:['2-1=1','3','√2-1']});idx++;
temas.push({t:'radicales',n:'9-10',q:'(√5 + 2)(√5 - 2) =',c:'1',o:['5-4=1','3','√5-2']});idx++;
temas.push({t:'radicales',n:'9-10',q:'(√3 + √2)(√3 - √2) =',c:'1',o:['3-2=1','5','√6']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(a/b) =',c:'√a/√b',o:['a/b','√a-√b','a/√b']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(25*4) =',c:'10',o:['50','7','20']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(64/4) =',c:'4',o:['8','4','2√2']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(1/9) =',c:'1/3',o:['1/9','±1/3','3']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(4/25) =',c:'2/5',o:['4/5','2/25','4/25']});idx++;
temas.push({t:'radicales',n:'9-10',q:'3√5 - √5 + 2√5 =',c:'4√5',o:['6√5','4√5','√5']});idx++;
temas.push({t:'radicales',n:'9-10',q:'5√3 - 2√3 + √3 =',c:'4√3',o:['4√3','8√3','3√3']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(125) =',c:'5√5',o:['25√5','√5','15√5']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(98) =',c:'7√2',o:['14√7','49√2','√2']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(200) =',c:'10√2',o:['20√5','100√2','√2']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√36 + √64 =',c:'14',o:['6+8=14','10','100']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√100 - √25 =',c:'5',o:['10-5=5','75','50']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√144 + √121 =',c:'23',o:['12+11=23','265','23']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(2^2 * 3^2) =',c:'6',o:['2*3=6','12','36']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√(x^2+2x+1) =',c:'|x+1|',o:['x+1','x-1','x^2+1']});idx++;
temas.push({t:'radicales',n:'9-10',q:'√(x^2-4x+4) =',c:'|x-2|',o:['x-2','x+2','x^2-2']});idx++;
temas.push({t:'radicales',n:'9-10',q:'x^(2/3) en radical:',c:'³√(x^2)',o:['√(x^3)','(³√x)^3','√x']});idx++;
temas.push({t:'radicales',n:'9-10',q:'x^(1/2) * x^(1/3) =',c:'x^(5/6)=⁶√(x^5)',o:['x^(2/5)','x^(1/6)','√x+³√x']});idx++;
temas.push({t:'radicales',n:'8-9',q:'(√a)(√b) =',c:'√(ab)',o:['a√b','√a+√b','√(a+b)']});idx++;
temas.push({t:'radicales',n:'8-9',q:'√a/√b =',c:'√(a/b)',o:['a/b','√a-√b','a/√b']});idx++;
temas.push({t:'radicales',n:'9-10',q:'³√8 * ³√27 =',c:'6',o:['2*3=6','216','9']});idx++;
temas.push({t:'radicales',n:'9-10',q:'³√125 * ³√64 =',c:'20',o:['5*4=20','320','9']});idx++;
temas.push({t:'radicales',n:'9-10',q:'(³√x)^3 =',c:'x',o:['x^3','x^(1/3)','x^9']});idx++;
console.log('radicales:',idx-start);
})();

// === POLINOMIOS (150) ===
(()=>{
const start=idx;
for(let a=1;a<=5;a++){for(let b=1;b<=5;b++){temas.push({t:'polinomios',n:'8-9',q:`(${a}x+${b})(x+${R(1,3)}) =`,c:`${a}x^2+${a*R(1,3)+b}x+${b*R(1,3)}`,o:[`${a}x^2+${b}x+${R(1,5)}`,`${a}x+${b}`,`${a+1}x^2+${b+1}x+${R(1,3)}`]});idx++;}}
temas.push({t:'polinomios',n:'9-10',q:'(2x+5)(3x-2) =',c:'6x^2+11x-10',o:['6x^2+11x-10','6x^2-11x+10','6x^2+19x-10']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x-4)(2x+3) =',c:'2x^2-5x-12',o:['2x^2+5x-12','2x^2-5x+12','x^2-5x-12']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(3x-1)(x+4) =',c:'3x^2+11x-4',o:['3x^2+11x-4','3x^2-11x+4','3x^2+13x-4']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Grado de 5x^3-2x^2+7x-1:',c:'3',o:['5','2','1']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Grado de 9x^7-3x^4+2:',c:'7',o:['9','4','2']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Grado de 12x^2+4x-5:',c:'2',o:['12','1','0']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Grado de (x+1)(x^2-3x+2):',c:'3',o:['2','1','5']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Coeficiente principal de 4x^3-7x+2:',c:'4',o:['3','-7','2']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Termino constante de 6x^2-3x+9:',c:'9',o:['6','-3','2']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(7x^3+2x^2-5x+1)+(3x^3-4x^2+2x-8)=',c:'10x^3-2x^2-3x-7',o:['4x^3+6x^2-3x+9','10x^3-2x^2-3x-7','10x^3-2x^2-7x-7']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(5x^2-3x+4)-(2x^2+6x-1)=',c:'3x^2-9x+5',o:['3x^2+3x+3','7x^2+3x+3','3x^2-9x+5']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(x^2-2x+1)+(2x^2+5x-3)=',c:'3x^2+3x-2',o:['3x^2+3x-2','3x^2-7x+4','x^2+3x-2']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x+5)(x-5)=',c:'x^2-25',o:['x^2+25','x^2-10x+25','x^2+10x+25']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(3x+2)(3x-2)=',c:'9x^2-4',o:['9x^2+4','9x^2-12x+4','9x^2+12x+4']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(2x-1)^2=',c:'4x^2-4x+1',o:['4x^2+4x+1','4x^2-2x+1','2x^2-4x+1']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(3x+1)^2=',c:'9x^2+6x+1',o:['9x^2-6x+1','9x^2+3x+1','6x^2+6x+1']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(6x^3)/(2x)=',c:'3x^2',o:['3x','4x^2','12x^2']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(15x^5)/(3x^2)=',c:'5x^3',o:['5x^7','5x^2','12x^3']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(10x^4-5x^3)/(5x^2)=',c:'2x^2-x',o:['2x^2+x','10x^2-5x','2x^2-1']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(12x^5-8x^4+4x^3)/(4x^2)=',c:'3x^3-2x^2+x',o:['3x^3-2x^2+x','12x^3-8x^2+4x','3x^3+2x^2+x']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x^2-9)/(x+3)=',c:'x-3',o:['x+3','x-9','x^2-3']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x^2-16)/(x-4)=',c:'x+4',o:['x-4','x-16','x^2+4']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x^2-7x+10)/(x-2)=',c:'x-5',o:['x+5','x-2','x-7']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Clasificar: 5x-3 segun su grado:',c:'Lineal',o:['Cuadratico','Cubico','Constante']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Clasificar: 4x^2-8x+1 segun su grado:',c:'Cuadratico',o:['Lineal','Cubico','Constante']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Clasificar: 9x^3-2x+5 segun su grado:',c:'Cubico',o:['Lineal','Cuadratico','Constante']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Si P(x)=3x^2-2x+1, P(2)=',c:'9',o:['12-4+1=9','17','7']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Si P(x)=x^3-4x, P(-1)=',c:'3',o:['-1+4=3','-3','5']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Si P(x)=2x^2+3x-5, P(0)=',c:'-5',o:['0','-5','5']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Terminos semejantes comparten:',c:'Misma variable y exponente',o:['Mismo coeficiente','Misma variable','Mismo exponente']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Reducir: 3a+2b-5a+7b=',c:'-2a+9b',o:['-2a+9b','8a+9b','-2a+5b']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'Reducir: 4x^2-3x+7x^2+5x=',c:'11x^2+2x',o:['11x^2+2x','11x^2+8x','4x^2+2x']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x+2)(x^2-2x+4)=',c:'x^3+8',o:['x^3-8','x^3+2x^2+4x+8','x^3-2x^2+4x-8']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(x-3)(x^2+3x+9)=',c:'x^3-27',o:['x^3+27','x^3-3x^2+9x-27','x^3+3x^2+9x-27']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(2x+1)(x-1)(x+2)=',c:'2x^3+3x^2-3x-2',o:['2x^3+3x^2-3x-2','2x^3-3x^2+3x+2','2x^3+3x^2+3x-2']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'El resto de (x^3-2x+1)/(x-1) es:',c:'0',o:['1-2+1=0','2','-1']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Teorema del resto: P(x)/(x-a) tiene resto:',c:'P(a)',o:['P(0)','P(1)','a']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Factor comun de 6x^3+9x^2:',c:'3x^2(2x+3)',o:['3x(2x^2+3x)','x^2(6x+9)','3(2x^3+3x^2)']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'Factor comun de 8x^4-12x^3+4x^2:',c:'4x^2(2x^2-3x+1)',o:['4x(2x^3-3x^2+x)','x^2(8x^2-12x+4)','2x^2(4x^2-6x+2)']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(3x+2)+(5x-7)=',c:'8x-5',o:['8x+5','15x-14','8x-5']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(6x-3)-(2x+8)=',c:'4x-11',o:['4x-11','4x+5','8x-11']});idx++;
temas.push({t:'polinomios',n:'8-9',q:'(10x^2-4x)+(x^2+7x)=',c:'11x^2+3x',o:['11x^2+3x','11x^2-11x','9x^2+3x']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(a-b)(a^2+ab+b^2)=',c:'a^3-b^3',o:['a^3+b^3','a^3-2ab+b^3','a^3-b^2']});idx++;
temas.push({t:'polinomios',n:'9-10',q:'(a+b)(a^2-ab+b^2)=',c:'a^3+b^3',o:['a^3-b^3','a^3+2ab+b^3','a^3+b^2']});idx++;
console.log('polinomios:',idx-start);
})();

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<temas.length;i++){
    const e=temas[i];const src=S+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify({o:res.o,ci:res.ci}),JSON.stringify([{math:e.q,expl:''}]),null,'facil','mep',2025,src,A,null,e.n||'7-11']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
