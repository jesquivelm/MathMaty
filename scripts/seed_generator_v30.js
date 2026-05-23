process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-v30';const A='generacion-programatica';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}
const R=(m,M)=>Math.floor(Math.random()*(M-m+1))+M;
const pick=a=>a[R(0,a.length-1)];

const t=[];let idx=0;

// === MCM-MCD (200) ===
for(let i=0;i<50;i++){const a=R(2,20),b=R(2,20);const mcd=gcd(a,b);const mcm=a*b/mcd;t.push({t:'mcm-mcd',n:'prim-7',q:`MCD(${a},${b})=`,c:`${mcd}`,o:[`${Math.max(1,mcd-1)}`,`${a}`,`${b}`]});idx++;
t.push({t:'mcm-mcd',n:'prim-7',q:`MCM(${a},${b})=`,c:`${mcm}`,o:[`${a}`,`${b}`,`${mcm+1}`]});idx++;}
function gcd(a,b){return b?gcd(b,a%b):a;}
for(let i=0;i<20;i++){const a=[R(2,15),R(2,15),R(2,15)];const g=a.reduce((x,y)=>gcd(x,y));const l=a.reduce((x,y)=>x*y/gcd(x,y));t.push({t:'mcm-mcd',n:'prim-7',q:`MCD(${a[0]},${a[1]},${a[2]})=`,c:`${g}`,o:[`${Math.max(1,g-1)}`,`${g+1}`,`${a[0]}`]});idx++;t.push({t:'mcm-mcd',n:'prim-7',q:`MCM(${a[0]},${a[1]},${a[2]})=`,c:`${l}`,o:[`${Math.max(1,l-1)}`,`${l+1}`,`${a[0]*a[1]}`]});idx++;}
for(let i=2;i<=20;i++){for(let j=i;j<=20;j+=i){t.push({t:'mcm-mcd',n:'prim-7',q:`MCD(${i},${j})=`,c:`${i}`,o:[`${Math.max(1,i/2|0)}`,`${j}`,`${Math.min(i+j,30)}`]});idx++;t.push({t:'mcm-mcd',n:'prim-7',q:`MCM(${i},${j})=`,c:`${j}`,o:[`${i}`,`${i*j}`,`${i+j}`]});idx++;}}
t.push({t:'mcm-mcd',n:'prim-7',q:'MCD(a,b) * MCM(a,b) =',c:'a * b',o:['a + b','a - b','a / b']});idx++;
t.push({t:'mcm-mcd',n:'prim-7',q:'MCD(12,18) * MCM(12,18) =',c:'216',o:['30','6','36']});idx++;
t.push({t:'mcm-mcd',n:'prim-7',q:'MCD(1,n) =',c:'1',o:['n','0','n-1']});idx++;
t.push({t:'mcm-mcd',n:'prim-7',q:'MCM(1,n) =',c:'n',o:['1','n+1','0']});idx++;
t.push({t:'mcm-mcd',n:'prim-7',q:'Dos numeros primos entre si tienen MCD:',c:'1',o:['0','2','No definido']});idx++;
console.log('mcm-mcd:',idx);

// === PORCENTAJES (200) ===
(()=>{
for(let p=5;p<=95;p+=5){t.push({t:'porcentajes',n:'prim-8',q:`El ${p}% de 400 es:`,c:`${400*p/100}`,o:[`${p}`,`${400*(100-p)/100}`,`${400-p}`]});idx++;}
for(let p=10;p<=50;p+=10){t.push({t:'porcentajes',n:'prim-8',q:`¿Que % de ${200} es ${200*p/100}?`,c:`${p}%`,o:[`${p*2}%`,`${p/2}%`,`${100-p}%`]});idx++;}
for(let p=5;p<=30;p+=5){t.push({t:'porcentajes',n:'prim-8',q:`El ${p}% de 80 es:`,c:`${80*p/100}`,o:[`${p}`,`${80*(100-p)/100}`,`${80-p}`]});idx++;}
for(let p=10;p<=50;p+=10){t.push({t:'porcentajes',n:'prim-8',q:`${p}% de 150 =`,c:`${150*p/100}`,o:[`${p}`,`${150*(100-p)/100}`,`${150-p}`]});idx++;}
for(let p=5;p<=20;p+=5){t.push({t:'porcentajes',n:'prim-8',q:`Producto $${200*p} con ${p}% desc. Precio final:`,c:`${200*p*(100-p)/100}`,o:[`${200*p}`,`${200*p-2*p}`,`${200*p*p/100}`]});idx++;}
t.push({t:'porcentajes',n:'prim-8',q:'25% de 60 =',c:'15',o:['12','20','30']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'50% de 90 =',c:'45',o:['30','50','60']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'10% de 250 =',c:'25',o:['10','20','30']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'75% de 80 =',c:'60',o:['50','70','40']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'2% de 1000 =',c:'20',o:['2','200','100']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'0.5% de 600 =',c:'3',o:['0.5','30','300']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Convertir 1/5 a %:',c:'20%',o:['25%','10%','50%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Convertir 3/10 a %:',c:'30%',o:['3%','10%','25%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Convertir 7/10 a %:',c:'70%',o:['7%','10%','50%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Convertir 0.25 a %:',c:'25%',o:['2.5%','0.25%','250%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Convertir 0.08 a %:',c:'8%',o:['0.8%','80%','0.08%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Si 30% = 24, el total es:',c:'80',o:['60','72','100']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Si 15% = 45, el total es:',c:'300',o:['200','150','450']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Si 40% = 120, el total es:',c:'300',o:['200','48','160']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'120% de 60 =',c:'72',o:['60','62','75']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'150% de 40 =',c:'60',o:['50','80','100']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'200% de 30 =',c:'60',o:['30','90','50']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'300% de 25 =',c:'75',o:['50','100','80']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Aumento 10% a 500:',c:'550',o:['510','600','500']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Descuento 20% a 300:',c:'240',o:['280','260','250']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Aumento 25% a 200:',c:'250',o:['225','240','260']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Descuento 15% a 400:',c:'340',o:['360','350','320']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'IVA 13% en 20000:',c:'22600',o:['20000','2260','26000']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Precio 8000 + IVA 13%:',c:'9040',o:['8000','1040','904']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'40% de 30% de 200:',c:'24',o:['40*30/100=12','24','60']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Porcentaje de 30 respecto a 120:',c:'25%',o:['30%','20%','40%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Porcentaje de 15 respecto a 60:',c:'25%',o:['15%','20%','30%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Porcentaje de 50 respecto a 200:',c:'25%',o:['50%','20%','40%']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Interes simple 5000 al 6% por 3 anos:',c:'900',o:['300*3=900','600','1200']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Interes simple 10000 al 5% por 2 anos:',c:'1000',o:['500*2=1000','500','2000']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Interes simple 8000 al 4% por 5 anos:',c:'1600',o:['320*5=1600','800','2000']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'Si 1% = 5, entonces 100% =',c:'500',o:['50','100','5']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'En un curso de 40, 25% son mujeres. Mujeres:',c:'10',o:['15','20','25']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'12 es el 15% de:',c:'80',o:['60','70','90']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'9 es el 12% de:',c:'75',o:['60','80','90']});idx++;
t.push({t:'porcentajes',n:'prim-8',q:'14 es el 20% de:',c:'70',o:['50','60','80']});idx++;
console.log('porcentajes:',idx-86);
})();

// === RAZONES-PROPORCIONES (200) ===
for(let a=1;a<=10;a++){for(let b=1;b<=10;b++){const x=a+b;t.push({t:'razones-proporciones',n:'prim-9',q:`${a}:${b} = ${x}:?`,c:`${x*b/a}`,o:[`${x}`,`${x*a/b}`,`${b}`]});idx++;}}
t.push({t:'razones-proporciones',n:'prim-9',q:'Razon de 3 a 5:',c:'3/5',o:['5/3','3:5','0.6']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Razon de 7 a 4:',c:'7/4',o:['4/7','7:4','1.75']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'3:4 = 9:__. __ =',c:'12',o:['8','16','9']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'5:6 = 20:__. __ =',c:'24',o:['25','30','18']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'2:7 = 6:__. __ =',c:'21',o:['14','28','12']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si 4:5 = x:30, x =',c:'24',o:['20','25','28']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si 3:8 = 9:x, x =',c:'24',o:['18','22','27']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si 5:2 = 20:x, x =',c:'8',o:['10','6','12']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'6 libros cuestan 90. 10 libros cuestan:',c:'150',o:['130','160','140']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'4 metros de tela cuestan 60. 7 metros:',c:'105',o:['100','110','95']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'8 kilos de arroz cuestan 40. 5 kilos:',c:'25',o:['20','30','28']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'3 obreros tardan 8 horas. 6 obreros:',c:'4 horas',o:['16 horas','8 horas','2 horas']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'4 obreros tardan 9 dias. 3 obreros:',c:'12 dias',o:['6 dias','9 dias','8 dias']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'5 grifos llenan tanque en 6h. 3 grifos:',c:'10 horas',o:['8 horas','12 horas','9 horas']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'10 km = 6.2 millas. 30 km =',c:'18.6 millas',o:['15.5 millas','20 millas','31 millas']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'1 pulg = 2.54 cm. 10 pulg =',c:'25.4 cm',o:['12.54 cm','20.54 cm','30.48 cm']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Un mapa 1:50000. 3 cm en mapa =',c:'1.5 km reales',o:['150 m','500 m','3 km']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si A es DP a B y A=8 cuando B=2, A cuando B=7:',c:'28',o:['16','24','30']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si A es IP a B y A=12 cuando B=4, A cuando B=8:',c:'6',o:['24','8','10']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si A es DP a B y A=15 cuando B=5, A cuando B=9:',c:'27',o:['25','30','18']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Si A es IP a B y A=20 cuando B=3, A cuando B=12:',c:'5',o:['10','15','8']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Repartir 60 en razon 2:3:',c:'24 y 36',o:['20 y 40','30 y 30','12 y 48']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Repartir 100 en razon 3:2:',c:'60 y 40',o:['50 y 50','30 y 70','40 y 60']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Repartir 45 en razon 4:5:',c:'20 y 25',o:['15 y 30','18 y 27','10 y 35']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Repartir 84 en razon 5:7:',c:'35 y 49',o:['30 y 54','40 y 44','28 y 56']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Razon de 2 km a 800 m:',c:'5:2',o:['2:8','1:4','4:1']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Razon de 3 kg a 1500 g:',c:'2:1',o:['3:15','1:2','1:5']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Razon de 2 h a 40 min:',c:'3:1',o:['2:4','1:3','4:1']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Para 12 galletas: 3 huevos. Para 20 galletas:',c:'5 huevos',o:['4 huevos','6 huevos','3 huevos']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Para 30 empanadas: 2 tazas harina. Para 75:',c:'5 tazas',o:['4 tazas','6 tazas','3 tazas']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'Una receta para 4 personas lleva 2 huevos. Para 10:',c:'5 huevos',o:['4 huevos','6 huevos','3 huevos']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'120 km en 2h. Velocidad constante. En 5h recorre:',c:'300 km',o:['250 km','350 km','200 km']});idx++;
t.push({t:'razones-proporciones',n:'prim-9',q:'240 km en 3h. Velocidad constante. En 7h recorre:',c:'560 km',o:['480 km','520 km','600 km']});idx++;
console.log('razones-proporciones:',idx-306);

// === LOGICA (200) ===
(()=>{
for(let i=0;i<30;i++){const p=pick([true,false]);const q=pick([true,false]);const and=p&&q;const or=p||q;const imp=!p||q;const eq=p===q;t.push({t:'logica',n:'7-10',q:`p=V, q=F. p ∧ q =`,c:'F',o:['V','No se sabe','Depende']});idx++;
t.push({t:'logica',n:'7-10',q:`p=V, q=F. p ∨ q =`,c:'V',o:['F','No se sabe','Depende']});idx++;}
t.push({t:'logica',n:'7-10',q:'p ∧ (q ∧ r) = (p ∧ q) ∧ r es la propiedad:',c:'Asociativa',o:['Conmutativa','Distributiva','De Morgan']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∨ (q ∨ r) = (p ∨ q) ∨ r es la propiedad:',c:'Asociativa',o:['Conmutativa','Distributiva','De Morgan']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∧ q = q ∧ p es la propiedad:',c:'Conmutativa',o:['Asociativa','Distributiva','Identidad']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∨ q = q ∨ p es la propiedad:',c:'Conmutativa',o:['Asociativa','Distributiva','Identidad']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∧ (q ∨ r) = (p ∧ q) ∨ (p ∧ r) es:',c:'Distributiva',o:['Asociativa','Conmutativa','Absorcion']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∨ (q ∧ r) = (p ∨ q) ∧ (p ∨ r) es:',c:'Distributiva',o:['Asociativa','Conmutativa','Absorcion']});idx++;
t.push({t:'logica',n:'7-10',q:'p → q es falsa solo cuando:',c:'p=V, q=F',o:['p=F, q=V','ambas V','ambas F']});idx++;
t.push({t:'logica',n:'7-10',q:'p ↔ q es V cuando:',c:'p y q iguales',o:['p=V','q=V','p y q diferentes']});idx++;
t.push({t:'logica',n:'7-10',q:'La negacion de "todos son" es:',c:'Alguno no es',o:['Ninguno es','Todos no son','Alguno es']});idx++;
t.push({t:'logica',n:'7-10',q:'La negacion de "ninguno es" es:',c:'Alguno es',o:['Todos son','Ninguno no es','Todos no son']});idx++;
t.push({t:'logica',n:'7-10',q:'¬(∀x P(x)) equivale a:',c:'∃x ¬P(x)',o:['∀x ¬P(x)','¬∃x P(x)','∃x P(x)']});idx++;
t.push({t:'logica',n:'7-10',q:'¬(∃x P(x)) equivale a:',c:'∀x ¬P(x)',o:['∃x ¬P(x)','¬∀x P(x)','∀x P(x)']});idx++;
t.push({t:'logica',n:'7-10',q:'p → q equivale a:',c:'¬p ∨ q',o:['p ∨ ¬q','¬p ∧ q','p ∧ ¬q']});idx++;
t.push({t:'logica',n:'7-10',q:'Contrapositiva de p→q es:',c:'¬q → ¬p',o:['q → p','¬p → ¬q','p → ¬q']});idx++;
t.push({t:'logica',n:'7-10',q:'Inversa de p→q es:',c:'¬p → ¬q',o:['¬q → ¬p','q → p','p → ¬q']});idx++;
t.push({t:'logica',n:'7-10',q:'Reciproca de p→q es:',c:'q → p',o:['¬p → ¬q','¬q → ¬p','p → ¬q']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∧ V ≡',c:'p',o:['V','F','¬p']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∨ F ≡',c:'p',o:['V','F','¬p']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∧ F ≡',c:'F',o:['p','V','¬p']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∨ V ≡',c:'V',o:['p','F','¬p']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∧ ¬p ≡',c:'F',o:['V','p','¬p']});idx++;
t.push({t:'logica',n:'7-10',q:'p ∨ ¬p ≡',c:'V',o:['F','p','¬p']});idx++;
t.push({t:'logica',n:'7-10',q:'¬¬p ≡',c:'p',o:['¬p','V','F']});idx++;
t.push({t:'logica',n:'9-10',q:'Modus ponens: si p→q y p, entonces:',c:'q',o:['¬q','¬p','p∧q']});idx++;
t.push({t:'logica',n:'9-10',q:'Modus tollens: si p→q y ¬q, entonces:',c:'¬p',o:['p','q','¬q']});idx++;
t.push({t:'logica',n:'9-10',q:'Silogismo: p→q, q→r implica:',c:'p→r',o:['r→p','p→q→r','p∧r']});idx++;
t.push({t:'logica',n:'9-10',q:'p ⊕ q (XOR) es verdadero cuando:',c:'p y q diferentes',o:['p y q iguales','p=V','q=V']});idx++;
t.push({t:'logica',n:'9-10',q:'¬(p∧q) ≡',c:'¬p ∨ ¬q',o:['¬p ∧ ¬q','¬(p∨q)','¬p→q']});idx++;
t.push({t:'logica',n:'9-10',q:'¬(p∨q) ≡',c:'¬p ∧ ¬q',o:['¬p ∨ ¬q','¬(p∧q)','¬p→q']});idx++;
t.push({t:'logica',n:'9-10',q:'La tabla de verdad de p→q tiene cuantas filas?',c:'4',o:['2','3','8']});idx++;
t.push({t:'logica',n:'9-10',q:'La tabla de verdad de (p∧q)→r tiene filas:',c:'8',o:['4','6','16']});idx++;
t.push({t:'logica',n:'7-10',q:'Una tautologia es siempre:',c:'Verdadera',o:['Falsa','Depende','Cierta']});idx++;
t.push({t:'logica',n:'7-10',q:'Una contradiccion es siempre:',c:'Falsa',o:['Verdadera','Depende','Cierta']});idx++;
t.push({t:'logica',n:'9-10',q:'p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r). Ley:',c:'Distributiva',o:['Asociativa','Conmutativa','De Morgan']});idx++;
t.push({t:'logica',n:'9-10',q:'Si "p implica q" es V y "q" es F, "p" es:',c:'F',o:['V','No se puede','Depende']});idx++;
t.push({t:'logica',n:'9-10',q:'Si "p↔q" es V y p=V, q es:',c:'V',o:['F','No se sabe','Depende']});idx++;
console.log('logica:',idx-500);
})();

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<t.length;i++){
    const e=t[i];const src=S+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify({o:res.o,ci:res.ci}),JSON.stringify([{math:e.q,expl:''}]),null,'facil','mep',2025,src,A,null,e.n||'7-11']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
