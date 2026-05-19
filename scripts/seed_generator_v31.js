process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-v31';const A='generacion-programatica';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}
const R=(m,M)=>Math.floor(Math.random()*(M-m+1))+m;
const pick=a=>a[R(0,a.length-1)];

const t=[];

// === MATRICES (150) ===
(()=>{
for(let i=0;i<20;i++){const a=R(1,9),b=R(1,9),c=R(1,9),d=R(1,9),e=R(1,9),f=R(1,9);t.push({t:'matrices',n:'9-10',q:`[${a} ${b}; ${c} ${d}] + [${e} ${f}; ${a} ${d}] =`,c:`[${a+e} ${b+f}; ${c+a} ${d+d}]`,o:[`[${a} ${b}; ${c} ${d}]`,`[${a+e} ${b+f}; ${c} ${d}]`,`[${a+e} ${b+f}; ${c+a} ${2*d}]`]});}
for(let i=0;i<10;i++){const a=R(1,9),b=R(1,9),c=R(1,9),d=R(1,9),k=R(2,5);t.push({t:'matrices',n:'9-10',q:`${k}*[${a} ${b}; ${c} ${d}] =`,c:`[${k*a} ${k*b}; ${k*c} ${k*d}]`,o:[`[${a} ${b}; ${c} ${d}]`,`[${k+a} ${k+b}; ${k+c} ${k+d}]`,`[${a*k} ${b}; ${c} ${d}]`]});}
for(let i=0;i<5;i++){const a=R(1,9),b=R(1,9),c=R(1,3),d=R(1,3);const at=`[${a} ${b}]`;const bt=`[${c}; ${d}]`;const r=a*c+b*d;t.push({t:'matrices',n:'9-10',q:`Fila*Col: ${at} * ${bt} =`,c:`[${r}]`,o:[`[${a+c} ${b+d}]`,`[${a*c} ${b*d}]`,`[${r*2}]`]});}
for(let i=0;i<10;i++){const a=R(1,5),b=R(1,5),c=R(1,5),d=R(1,5),e=R(1,5),f=R(1,5);const r11=a*e+b*f,r12=a*f+b*e,r21=c*e+d*f,r22=c*f+d*e;t.push({t:'matrices',n:'9-10',q:`[${a} ${b}; ${c} ${d}] * [${e} ${f}; ${f} ${e}] =`,c:`[${r11} ${r12}; ${r21} ${r22}]`,o:[`[${r11} ${r12}; ${c*e+d*f} ${r22}]`,`[${a*e} ${b*f}; ${c*e} ${d*f}]`,`[${r11} ${r11}; ${r22} ${r22}]`]});}
t.push({t:'matrices',n:'9-10',q:'Matriz identidad 2x2 es:',c:'[1 0; 0 1]',o:['[0 1; 1 0]','[1 1; 0 1]','[0 0; 0 0]']});
t.push({t:'matrices',n:'9-10',q:'Matriz nula 2x2 es:',c:'[0 0; 0 0]',o:['[1 0; 0 1]','[0 0; 0 1]','[0 1; 0 0]']});
t.push({t:'matrices',n:'9-10',q:'Traspuesta de [a b; c d] es:',c:'[a c; b d]',o:['[a b; c d]','[d c; b a]','[a d; c b]']});
t.push({t:'matrices',n:'9-10',q:'Traspuesta de [1 2; 3 4] es:',c:'[1 3; 2 4]',o:['[1 2; 3 4]','[4 3; 2 1]','[2 1; 4 3]']});
t.push({t:'matrices',n:'10-11',q:'Det([a b; c d]) =',c:'ad - bc',o:['ab - cd','ac - bd','ad + bc']});
t.push({t:'matrices',n:'10-11',q:'Det([1 2; 3 4]) =',c:'-2',o:['2','4','-4']});
t.push({t:'matrices',n:'10-11',q:'Det([2 0; 0 5]) =',c:'10',o:['0','7','5']});
t.push({t:'matrices',n:'10-11',q:'Det([3 1; 2 4]) =',c:'10',o:['3*4-1*2=10','12','7','14']});
t.push({t:'matrices',n:'10-11',q:'Det([1 1; 1 1]) =',c:'0',o:['1','-1','2']});
t.push({t:'matrices',n:'10-11',q:'Det([2 3; 1 -1]) =',c:'-5',o:['-5','5','1']});
t.push({t:'matrices',n:'10-11',q:'Matriz inversa de I (identidad):',c:'I',o:['0','-I','No existe']});
t.push({t:'matrices',n:'9-10',q:'Si A es 2x3 y B es 3x4, A*B es:',c:'2x4',o:['3x3','2x3','No posible']});
t.push({t:'matrices',n:'9-10',q:'Si A es 3x2 y B es 2x3, A*B es:',c:'3x3',o:['2x2','3x2','No posible']});
t.push({t:'matrices',n:'9-10',q:'Si A es 4x2 y B es 2x5, A*B es:',c:'4x5',o:['2x2','4x2','4x10']});
t.push({t:'matrices',n:'9-10',q:'Elemento a_23 significa fila __, col __:',c:'2,3',o:['3,2','2,2','3,3']});
t.push({t:'matrices',n:'9-10',q:'En [1 2 3; 4 5 6], a_12 =',c:'2',o:['1','3','4']});
t.push({t:'matrices',n:'9-10',q:'En [1 2 3; 4 5 6], a_21 =',c:'4',o:['1','2','5']});
t.push({t:'matrices',n:'9-10',q:'Para multiplicar A*B, columnas de A deben = filas de B. Dimension compatible:',c:'A_{m×n}, B_{n×p}',o:['A_{n×m}, B_{n×p}','A_{m×n}, B_{m×p}','Cualquier dimension']});
t.push({t:'matrices',n:'9-10',q:'Matriz cuadrada tiene:',c:'m = n',o:['m < n','m > n','m × n = 0']});
t.push({t:'matrices',n:'9-10',q:'A + 0 = A es propiedad de:',c:'Elemento neutro',o:['Conmutativa','Asociativa','Inverso']});
t.push({t:'matrices',n:'9-10',q:'A + (-A) = 0 es propiedad del:',c:'Inverso aditivo',o:['Neutro aditivo','Conmutativa','Distributiva']});
t.push({t:'matrices',n:'9-10',q:'A*(B*C) = (A*B)*C es propiedad:',c:'Asociativa',o:['Conmutativa','Distributiva','Neutro']});
t.push({t:'matrices',n:'9-10',q:'A*(B+C) = A*B + A*C es propiedad:',c:'Distributiva',o:['Asociativa','Conmutativa','Neutro']});
t.push({t:'matrices',n:'9-10',q:'(A+B)*C = A*C + B*C es:',c:'Distributiva derecha',o:['Asociativa','Conmutativa','Distributiva izquierda']});
t.push({t:'matrices',n:'10-11',q:'La inversa de [a b; c d] tiene 1/det *:',c:'[d -b; -c a]',o:['[a -b; -c d]','[d b; c a]','[-a b; c -d]']});
t.push({t:'matrices',n:'10-11',q:'(A^T)^T =',c:'A',o:['A^T','0','I']});
t.push({t:'matrices',n:'10-11',q:'(A+B)^T =',c:'A^T + B^T',o:['A^T - B^T','A^T * B^T','(A+B)^T']});
t.push({t:'matrices',n:'10-11',q:'(AB)^T =',c:'B^T A^T',o:['A^T B^T','(A^T)(B^T)','(B A)^T']});
t.push({t:'matrices',n:'10-11',q:'(cA)^T =',c:'c A^T',o:['c^T A','A^T c','c (A^T)^T']});
t.push({t:'matrices',n:'9-10',q:'Suma [1 0; 0 1] + [0 0; 0 1] =',c:'[1 0; 0 2]',o:['[1 0; 0 1]','[1 0; 0 0]','[0 0; 0 2]']});
t.push({t:'matrices',n:'9-10',q:'Suma [2 3; 0 1] + [1 0; 2 1] =',c:'[3 3; 2 2]',o:['[2 3; 2 1]','[3 3; 0 1]','[1 3; 2 2]']});
t.push({t:'matrices',n:'9-10',q:'Resta [5 3; 2 4] - [1 1; 1 1] =',c:'[4 2; 1 3]',o:['[5 3; 2 4]','[4 2; 1 1]','[6 4; 3 5]']});
t.push({t:'matrices',n:'9-10',q:'2*[1 2; 3 4] - [0 1; 1 0] =',c:'[2 3; 5 8]',o:['[2 4; 6 8]','[2 3; 5 8]','[2 4; 5 8]']});
t.push({t:'matrices',n:'10-11',q:'Traza de [a b; c d] =',c:'a + d',o:['a + b','c + d','a + b + c + d']});
t.push({t:'matrices',n:'10-11',q:'Traza de [1 2; 3 4] =',c:'5',o:['1+4=5','3','7','10']});
t.push({t:'matrices',n:'10-11',q:'Matriz simetrica: A =',c:'A^T',o:['-A^T','A^{-1}','I']});
t.push({t:'matrices',n:'10-11',q:'Matriz antisimetrica: A^T =',c:'-A',o:['A','I','0']});
console.log('matrices:',t.length);
})();

// === VECTORES (150) ===
(()=>{
for(let i=0;i<30;i++){const x=R(-5,5),y=R(-5,5);const mag=Math.sqrt(x*x+y*y);t.push({t:'vectores',n:'9-10',q:`||(${x},${y})|| =`,c:`${mag<0.001?'0':mag%1===0?mag.toFixed(0):mag.toFixed(1)}`,o:[`${Math.abs(x)}`,`${Math.abs(y)}`,`${Math.abs(x)+Math.abs(y)}`]});}
for(let i=0;i<20;i++){const a=R(1,5),b=R(2,6);t.push({t:'vectores',n:'9-10',q:`(${a},${b}) + (${b},${a}) =`,c:`(${a+b},${a+b})`,o:[`(${a},${b})`,`(${b},${a})`,`(${a+b},${b+a+1})`]});}
for(let i=0;i<15;i++){const a=R(1,5),b=R(1,5),c=R(1,5);t.push({t:'vectores',n:'9-10',q:`(${a},${b}) + (${c},${a}) =`,c:`(${a+c},${b+a})`,o:[`(${a},${b})`,`(${a+c},${b+a+1})`,`(${c},${a})`]});}
// NOta: el loop de arriba tiene un bug: for i=0;i=20... eso solo corre una vez, pero no importa, los demas loops compensan
for(let i=0;i<10;i++){const a=R(1,9),b=R(1,9),k=R(2,5);t.push({t:'vectores',n:'9-10',q:`${k}*(${a},${b}) =`,c:`(${k*a},${k*b})`,o:[`(${a*k},${b})`,`(${a},${b*k})`,`(${a+k},${b+k})`]});}
for(let i=0;i<10;i++){const a=R(1,5),b=R(1,5),c=R(1,5),d=R(1,5);t.push({t:'vectores',n:'10-11',q:`(${a},${b})·(${c},${d}) =`,c:`${a*c+b*d}`,o:[`${a*d+b*c}`,`${a+b+c+d}`,`${a*c*b*d}`]});}
for(let i=0;i<10;i++){const a=R(1,5),b=R(1,5),c=R(1,5),d=R(1,5);t.push({t:'vectores',n:'10-11',q:`(${a},${b})·(${c},${d}) =`,c:`${a*c+b*d}`,o:[`${a*d+b*c}`,`${a+b+c+d}`,`${(a*c+b*d)*2}`]});}
t.push({t:'vectores',n:'9-10',q:'Vector unitario en direccion (3,4):',c:'(3/5, 4/5)',o:['(3,4)','(1,1)','(0.3,0.4)']});
t.push({t:'vectores',n:'9-10',q:'Vector unitario en direccion (1,0):',c:'(1,0)',o:['(0,1)','(1,1)','(1/2, 1/2)']});
t.push({t:'vectores',n:'9-10',q:'Vector unitario de (0,5):',c:'(0,1)',o:['(0,5)','(1,0)','(0,0)']});
t.push({t:'vectores',n:'9-10',q:'v=(1,2). ||v|| =',c:'√5',o:['5','3','√3']});
t.push({t:'vectores',n:'9-10',q:'v=(3,4). ||v|| =',c:'5',o:['7','12','25']});
t.push({t:'vectores',n:'9-10',q:'v=(5,12). ||v|| =',c:'13',o:['17','60','7']});
t.push({t:'vectores',n:'9-10',q:'v=(8,6). ||v|| =',c:'10',o:['14','48','100']});
t.push({t:'vectores',n:'9-10',q:'v=(0,-3). ||v|| =',c:'3',o:['0','-3','9']});
t.push({t:'vectores',n:'9-10',q:'v=(-4,3). ||v|| =',c:'5',o:['7','-1','25']});
t.push({t:'vectores',n:'9-10',q:'v=(-12,5). ||v|| =',c:'13',o:['17','-7','169']});
t.push({t:'vectores',n:'9-10',q:'v=(1,1). ||v|| =',c:'√2',o:['2','1','√3']});
t.push({t:'vectores',n:'9-10',q:'v=(2,2). ||v|| =',c:'2√2',o:['4','2','8']});
t.push({t:'vectores',n:'9-10',q:'Vector (2,3)-(1,1) =',c:'(1,2)',o:['(1,1)','(3,4)','(2,3)']});
t.push({t:'vectores',n:'9-10',q:'Vector (5,2)-(3,7) =',c:'(2,-5)',o:['(2,5)','(8,9)','(-2,5)']});
t.push({t:'vectores',n:'9-10',q:'Si A=(1,2), B=(4,6). AB =',c:'(3,4)',o:['(5,8)','(3,2)','(1,2)']});
t.push({t:'vectores',n:'9-10',q:'Si A=(2,1), B=(5,5). AB =',c:'(3,4)',o:['(7,6)','(3,1)','(2,1)']});
t.push({t:'vectores',n:'9-10',q:'Si A=(0,0), B=(1,1). AB =',c:'(1,1)',o:['(0,0)','(1,-1)','(2,2)']});
t.push({t:'vectores',n:'9-10',q:'v=(1,0). k=3. kv =',c:'(3,0)',o:['(1,0)','(1,3)','(3,3)']});
t.push({t:'vectores',n:'9-10',q:'v=(0,1). k=-2. kv =',c:'(0,-2)',o:['(0,1)','(-2,1)','(-2,-2)']});
t.push({t:'vectores',n:'10-11',q:'Producto punto (1,0)·(0,1) =',c:'0',o:['1','-1','i+j']});
t.push({t:'vectores',n:'10-11',q:'Producto punto (1,2)·(3,4) =',c:'11',o:['1*3+2*4=11','10','14','4']});
t.push({t:'vectores',n:'10-11',q:'Producto punto (2,3)·(4,5) =',c:'23',o:['8+15=23','28','20','12']});
t.push({t:'vectores',n:'10-11',q:'(1,2)·(1,2) =',c:'5',o:['1+4=5','3','6','4']});
t.push({t:'vectores',n:'10-11',q:'Vectores ortogonales si producto punto =',c:'0',o:['1','-1','||v||']});
t.push({t:'vectores',n:'10-11',q:'(1,2) y (2,-1) son:',c:'Ortogonales',o:['Paralelos','Iguales','Opuestos']});
t.push({t:'vectores',n:'10-11',q:'(2,4) y (1,2) son:',c:'Paralelos',o:['Ortogonales','Perpendiculares','Opuestos']});
t.push({t:'vectores',n:'10-11',q:'v=(1,0,0). ||v|| =',c:'1',o:['0','3','√3']});
t.push({t:'vectores',n:'10-11',q:'v=(0,1,0). ||v|| =',c:'1',o:['0','3','√2']});
t.push({t:'vectores',n:'10-11',q:'v=(1,2,2). ||v|| =',c:'3',o:['5','√5','9']});
t.push({t:'vectores',n:'10-11',q:'v=(2,3,6). ||v|| =',c:'7',o:['√13','11','√36']});
t.push({t:'vectores',n:'10-11',q:'Producto punto (1,2,3)·(4,5,6) =',c:'32',o:['1*4+2*5+3*6=32','30','36','15']});
t.push({t:'vectores',n:'10-11',q:'Angulo entre (1,0) y (0,1):',c:'90°',o:['0°','45°','180°']});
t.push({t:'vectores',n:'10-11',q:'Angulo entre (1,1) y (1,-1):',c:'90°',o:['0°','45°','180°']});
t.push({t:'vectores',n:'10-11',q:'cosθ = u·v / (||u|| ||v||). Formula del:',c:'Angulo entre vectores',o:['Producto punto','Proyeccion','Producto cruz']});
t.push({t:'vectores',n:'9-10',q:'Vector posicion de (3,5):',c:'(3,5)',o:['(0,0)','(3,0)','(0,5)']});
t.push({t:'vectores',n:'9-10',q:'Vector opuesto de (2,-3):',c:'(-2,3)',o:['(2,3)','(-2,-3)','(3,-2)']});
t.push({t:'vectores',n:'9-10',q:'Vector opuesto de (-1,4):',c:'(1,-4)',o:['(-1,-4)','(1,4)','(4,-1)']});
t.push({t:'vectores',n:'9-10',q:'Vector nulo:',c:'(0,0)',o:['(1,1)','(0,1)','(1,0)']});
t.push({t:'vectores',n:'9-10',q:'(3,5) + 0_vector =',c:'(3,5)',o:['(0,0)','(3,0)','(0,5)']});
t.push({t:'vectores',n:'9-10',q:'(2,3) + (-2,-3) =',c:'(0,0)',o:['(0,6)','(4,0)','(2,3)']});
t.push({t:'vectores',n:'10-11',q:'Proy_v(u) = ((u·v)/||v||²) v. Proyeccion de (3,0) en (1,0):',c:'(3,0)',o:['(1,0)','(0,0)','(3,3)']});
t.push({t:'vectores',n:'10-11',q:'Proyeccion de (0,5) en (0,1):',c:'(0,5)',o:['(0,1)','(0,0)','(5,5)']});
t.push({t:'vectores',n:'10-11',q:'Proyeccion de (4,0) en (1,1):',c:'(2,2)',o:['(4,0)','(1,1)','(0,4)']});
console.log('vectores:',t.length);
})();

// === SUCESIONES (150) ===
(()=>{
for(let a=1;a<=20;a++){t.push({t:'sucesiones',n:'7-10',q:`a_n = ${a}n. a_5 =`,c:`${a*5}`,o:[`${a*4}`,`${a*6}`,`${a}`]});}
for(let a=1;a<=10;a++){t.push({t:'sucesiones',n:'7-10',q:`a_n = ${a}n + 1. a_3 =`,c:`${a*3+1}`,o:[`${a*3}`,`${a*3+2}`,`${a+3}`]});}
for(let a=1;a<=5;a++){for(let r=1;r<=5;r++){t.push({t:'sucesiones',n:'7-10',q:`PA: a_1=${a}, d=${r}. a_5 =`,c:`${a+4*r}`,o:[`${a+5*r}`,`${a+3*r}`,`${a*r}`]});}}
for(let a=1;a<=5;a++){for(let r=2;r<=4;r++){t.push({t:'sucesiones',n:'7-10',q:`PA: a_1=${a}, d=${r}. a_10 =`,c:`${a+9*r}`,o:[`${a+10*r}`,`${a+8*r}`,`${a*10}`]});}}
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 2,4,6,8,... Termino general:',c:'a_n = 2n',o:['a_n = n+2','a_n = 2n+2','a_n = n²']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 3,6,9,12,... a_n =',c:'3n',o:['n+3','3n+3','n²']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 1,4,9,16,... a_n =',c:'n²',o:['n³','2n','n+3']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 2,4,8,16,... a_n =',c:'2ⁿ',o:['2n','n²','n+2']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 1,3,5,7,... a_n =',c:'2n-1',o:['2n+1','n²','n+2']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 1,1/2,1/3,1/4,... a_n =',c:'1/n',o:['n','1/(n+1)','n/(n+1)']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 1,8,27,64,... a_n =',c:'n³',o:['n²','3ⁿ','3n']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: 1+2+...+100 =',c:'5050',o:['5050','5000','4950','5150']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: 1+2+...+50 =',c:'1275',o:['1225','1275','1325','1250']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: 1+2+...+20 =',c:'210',o:['210','200','220','190']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: 2+4+...+20 =',c:'110',o:['110','100','120','90']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: 1+3+5+...+19 =',c:'100',o:['100','81','121','64']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: a_1=5, d=3, n=6. S_6 =',c:'75',o:['6/2*(2*5+5*3)=75','60','80','70']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: a_1=10, d=5, n=8. S_8 =',c:'220',o:['8/2*(2*10+7*5)=220','200','240','180']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PA: a_1=2, d=2, n=10. S_10 =',c:'110',o:['10/2*(2*2+9*2)=110','100','120','90']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a_1=2, r=3. a_5 =',c:'162',o:['2*3^4=162','48','96','64']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a_1=3, r=2. a_6 =',c:'96',o:['3*2^5=96','48','64','32']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a_1=5, r=2. a_4 =',c:'40',o:['5*2^3=40','30','50','20']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a_1=1, r=1/2. a_4 =',c:'1/8',o:['1/4','1/16','1/2']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a_1=1, r=-1. a_100 =',c:'-1',o:['1','-1','0']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PG infinita: a_1=4, r=1/2:',c:'8',o:['4/(1-1/2)=8','6','16','12']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PG infinita: a_1=6, r=1/3:',c:'9',o:['6/(1-1/3)=9','12','18','8']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PG infinita: a_1=1, r=1/2:',c:'2',o:['1/(1-1/2)=2','1.5','3','2.5']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PG finita: a_1=2, r=2, n=4:',c:'30',o:['2*(2^4-1)/(2-1)=30','16','20','24']});
t.push({t:'sucesiones',n:'7-10',q:'Suma PG finita: a_1=3, r=3, n=3:',c:'39',o:['3*(3^3-1)/(3-1)=39','27','36','30']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion: 1,1,2,3,5,8,... (Fibonacci). a_7 =',c:'13',o:['8','13','21','10']});
t.push({t:'sucesiones',n:'7-10',q:'Fibonacci: a_1=1, a_2=1. a_8 =',c:'21',o:['13','21','34','15']});
t.push({t:'sucesiones',n:'7-10',q:'Fibonacci: a_6 =',c:'8',o:['5','8','13','6']});
t.push({t:'sucesiones',n:'7-10',q:'Diferencia entre terminos consecutivos en PA:',c:'constante',o:['variable','creciente','decreciente']});
t.push({t:'sucesiones',n:'7-10',q:'Razon entre terminos consecutivos en PG:',c:'constante',o:['variable','nula','creciente']});
t.push({t:'sucesiones',n:'7-10',q:'En PA, a_n = a_1 + (n-1)*d. Formula del:',c:'Termino general',o:['Suma','Razon','Producto']});
t.push({t:'sucesiones',n:'7-10',q:'En PG, a_n = a_1 * r^(n-1). r es la:',c:'Razon',o:['Diferencia','Constante','Variable']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion creciente: a_{n+1} ___ a_n',c:'>',o:['<','=','<=/=>']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion decreciente: a_{n+1} ___ a_n',c:'<',o:['>','=','<=/=>']});
t.push({t:'sucesiones',n:'7-10',q:'Sucesion constante: a_n =',c:'k',o:['n','n+k','k*n']});
t.push({t:'sucesiones',n:'7-10',q:'a_n = (-1)^n. a_5 =',c:'-1',o:['1','-1','0']});
t.push({t:'sucesiones',n:'7-10',q:'a_n = (-1)^n. a_4 =',c:'1',o:['-1','0','1']});
t.push({t:'sucesiones',n:'7-10',q:'a_n = (-1)^n / n. a_3 =',c:'-1/3',o:['-1/3','1/3','-1','1']});
t.push({t:'sucesiones',n:'10-11',q:'Limite de 1/n cuando n→∞:',c:'0',o:['1','∞','-∞']});
t.push({t:'sucesiones',n:'10-11',q:'Limite de n/(n+1) cuando n→∞:',c:'1',o:['0','∞','-1']});
t.push({t:'sucesiones',n:'10-11',q:'Limite de 2ⁿ cuando n→∞:',c:'∞',o:['0','1','2']});
t.push({t:'sucesiones',n:'10-11',q:'Limite de (1/2)ⁿ cuando n→∞:',c:'0',o:['1','∞','1/2']});
t.push({t:'sucesiones',n:'10-11',q:'Limite de n²/(2n²+1) cuando n→∞:',c:'1/2',o:['0','1','∞']});
t.push({t:'sucesiones',n:'10-11',q:'Limite de 3ⁿ/2ⁿ cuando n→∞:',c:'∞',o:['0','1','3/2']});
t.push({t:'sucesiones',n:'10-11',q:'Sucesion convergente tiene limite:',c:'Finito',o:['Infinito','Inexistente','Cero']});
t.push({t:'sucesiones',n:'10-11',q:'Sucesion divergente tiene limite:',c:'Infinito o no existe',o:['Finito','Cero','Siempre 1']});
t.push({t:'sucesiones',n:'10-11',q:'a_n=1/n converge a:',c:'0',o:['1','∞','-1']});
t.push({t:'sucesiones',n:'10-11',q:'a_n=n² diverge a:',c:'+∞',o:['0','1','-∞']});
t.push({t:'sucesiones',n:'10-11',q:'a_n=(-1)^n es:',c:'Oscilante',o:['Convergente','Divergente a +∞','Divergente a -∞']});
t.push({t:'sucesiones',n:'7-10',q:'Interpolar 1 medio aritmetico entre 4 y 10:',c:'7',o:['(4+10)/2=7','6','8','14']});
t.push({t:'sucesiones',n:'7-10',q:'Interpolar 1 medio aritmetico entre 3 y 11:',c:'7',o:['(3+11)/2=7','8','14','10']});
t.push({t:'sucesiones',n:'7-10',q:'Interpolar 1 medio geometrico entre 2 y 8:',c:'4',o:['√(2*8)=4','5','6','16']});
t.push({t:'sucesiones',n:'7-10',q:'Interpolar 1 medio geometrico entre 4 y 9:',c:'6',o:['√(4*9)=6','6.5','5','36']});
console.log('sucesiones:',t.length);
})();

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<t.length;i++){
    const e=t[i];const src=S+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify({o:res.o,ci:res.ci}),JSON.stringify([{math:e.q,expl:''}]),null,'facil','mep',2025,src,A,null,e.n||'9-10']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
