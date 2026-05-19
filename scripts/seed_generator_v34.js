process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-v34';const A='generacion-programatica';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}
const R=(m,M)=>Math.floor(Math.random()*(M-m+1))+m;
const t=[];

// === PROBABILIDAD (+30 to reach ~159) ===
(()=>{
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 6R 4V. P(roja) =',c:'6/10=3/5',o:['6/10=3/5','4/10=2/5','6/4','6/14']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 6R 4V. P(verde) =',c:'4/10=2/5',o:['6/10=3/5','4/10=2/5','0','6/4']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 8B 3N. P(blanca) =',c:'8/11',o:['8/11','3/11','8/3','5/11']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 8B 3N. P(negra) =',c:'3/11',o:['8/11','3/11','3/8','5/11']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 5A 7R 3V. P(A) =',c:'5/15=1/3',o:['5/15=1/3','7/15','3/15','5+7+3=15']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 5A 7R 3V. P(R) =',c:'7/15',o:['5/15','7/15','3/15','7/12']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 5A 7R 3V. P(V) =',c:'3/15=1/5',o:['5/15','7/15','3/15=1/5','5/12']});
t.push({t:'probabilidad',n:'7-10',q:'Dado 1-6. P(impar) =',c:'3/6=1/2',o:['1,3,5 → 3/6=1/2','2/6','4/6','1/6']});
t.push({t:'probabilidad',n:'7-10',q:'Dado 1-6. P(multiplo 3) =',c:'2/6=1/3',o:['3,6 → 2/6=1/3','1/6','3/6','2/3']});
t.push({t:'probabilidad',n:'7-10',q:'Dado 1-6. P(menor 3) =',c:'2/6=1/3',o:['1,2 → 2/6=1/3','3/6','4/6','1/6']});
t.push({t:'probabilidad',n:'7-10',q:'Dado 1-6. P(≥5) =',c:'2/6=1/3',o:['5,6 → 2/6=1/3','1/6','3/6','1/2']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma=5) =',c:'4/36=1/9',o:['1+4,2+3,3+2,4+1 → 4/36=1/9','5/36','6/36','3/36']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma=6) =',c:'5/36',o:['5/36','6/36=1/6','4/36','7/36']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma=8) =',c:'5/36',o:['5/36','6/36','8/36','4/36']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma=10) =',c:'3/36=1/12',o:['4+6,5+5,6+4 → 3/36=1/12','2/36','4/36','5/36']});
t.push({t:'probabilidad',n:'7-10',q:'Extraer 2 cartas con reposicion. P(ambos ases) =',c:'(4/52)(4/52)=1/169',o:['(4/52)(3/51)','(4/52)(4/52)=1/169','(4/52)+(4/52)=2/13','(4/52)(4/51)']});
t.push({t:'probabilidad',n:'9-10',q:'Extraer 2 cartas sin reposicion. P(ambos ases) =',c:'(4/52)(3/51)=12/2652=1/221',o:['(4/52)(3/51)=1/221','(4/52)(4/52)','(4/52)+(3/51)','(4/52)(4/51)']});
t.push({t:'probabilidad',n:'9-10',q:'Probabilidad de ganar loteria 1/1000. Comprando 5:',c:'5/1000=1/200',o:['5/1000=1/200','1/1000','5/995','(1/1000)^5']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar moneda 3 veces. P(tres caras) =',c:'(1/2)(1/2)(1/2)=1/8',o:['(1/2)³=1/8','3/8','1/4','3/6']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar moneda 3 veces. P(2 caras, 1 sello) =',c:'3/8',o:['CCS,CSC,SCC → 3/8','3/8','1/8','1/4','1/2']});
t.push({t:'probabilidad',n:'7-10',q:'Urna 4B 6N, extraer 1, reemplazar, extraer 1. P(B,B) =',c:'(4/10)(4/10)=16/100=4/25',o:['(4/10)(3/9)','(4/10)(4/10)=4/25','(4/10)(6/9)','(4+4)/(10+10)']});
t.push({t:'probabilidad',n:'7-10',q:'Urna 4B 6N, sin reposicion. P(B,B) =',c:'(4/10)(3/9)=12/90=2/15',o:['(4/10)(3/9)=2/15','(4/10)(4/9)','(4/10)(6/9)','(4/10)(3/10)']});
t.push({t:'probabilidad',n:'7-10',q:'P(A)=0.3, P(B)=0.5, independientes. P(A∩B)=',c:'0.15',o:['0.3*0.5=0.15','0.8','0.15','0.2','0.3']});
t.push({t:'probabilidad',n:'7-10',q:'P(A)=0.4, P(B)=0.6, independientes. P(A∪B)=',c:'0.76',o:['0.4+0.6-0.24=0.76','1','0.24','0.76','0.8']});
t.push({t:'probabilidad',n:'9-10',q:'P(A)=0.2, P(B)=0.3, mutuamente excluyentes. P(A∪B)=',c:'0.5',o:['0.2+0.3=0.5','0.06','0.5','0.6','0.3']});
t.push({t:'probabilidad',n:'9-10',q:'P(A)=0.7, P(B)=0.5, P(A∩B)=0.3. P(A∪B)=',c:'0.9',o:['0.7+0.5-0.3=0.9','1.2','0.9','0.35','0.7']});
t.push({t:'probabilidad',n:'7-10',q:'52 cartas, extraer 1. P(rey o as) =',c:'8/52=2/13',o:['4/52+4/52=8/52=2/13','1/13','4/52','8/50']});
t.push({t:'probabilidad',n:'7-10',q:'52 cartas, extraer 1. P(trebol o diamante) =',c:'26/52=1/2',o:['13/52+13/52=26/52=1/2','13/52','1/4','26/50']});
t.push({t:'probabilidad',n:'7-10',q:'Moneda 2 veces. P(al menos 1 cara) =',c:'3/4',o:['1 - P(SS)=1-1/4=3/4','1/2','1/4','3/4','1']});
t.push({t:'probabilidad',n:'7-10',q:'Dado 2 veces. P(al menos un 6) =',c:'11/36',o:['1-P(no 6,no6)=1-(5/6)(5/6)=1-25/36=11/36','1/6','2/6','5/36']});
console.log('probabilidad:',t.length);
})();

// === SISTEMAS-ECUACIONES (+30 to reach ~162) ===
(()=>{
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 5x+y=17; 2x-y=4 }',c:'x=3, y=2',o:['x=3, y=2','x=2, y=7','x=3, y=1','x=4, y=-3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x-2y=5; x+4y=11 }',c:'x=3, y=2',o:['x=3, y=2','x=2, y=3','x=3, y=1','x=1, y=2.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 4x+5y=41; 3x-2y=2 }',c:'x=4, y=5',o:['x=4, y=5','x=5, y=4','x=4, y=3','x=6, y=2']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x+3y=19; 5x-2y=0 }',c:'x=2, y=5',o:['x=2, y=5','x=3, y=4','x=2, y=4','x=4, y=3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 7x+3y=26; 2x-5y=-5 }',c:'x=2, y=4',o:['x=2, y=4','x=3, y=5/3','x=2, y=3','x=1, y=19/3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 9x-4y=37; 6x+5y=41 }',c:'x=5, y=2',o:['x=5, y=2','x=5, y=4','x=3, y=2.5','x=4, y=3']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ x²+y²=25; x-y=1 }',c:'(4,3) y (-3,-4)',o:['(4,3) y (-3,-4)','(3,4)','(5,0) u (0,5)','(4,3)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ y=x²; x+y=6 }',c:'(2,4) y (-3,9)',o:['(2,4) y (-3,9)','(4,2)','(3,3)','(2,4)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ y=2x+1; y=x²-2 }',c:'(3,7) y (-1,-1)',o:['(3,7) y (-1,-1)','(1,3)','(7,3)','(2,5) y (-1,-1)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ x+y=5; 1/x+1/y=5/6 }',c:'(2,3) y (3,2)',o:['(2,3) y (3,2)','(1,4)','(2,3)','(5,0)']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x-y=1; 3x+4y=29 }',c:'x=3, y=5',o:['x=3, y=5','x=5, y=9','x=3, y=2','x=4, y=7']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 8x-3y=11; 5x+2y=26 }',c:'x=4, y=7',o:['x=4, y=7','x=5, y=29/3','x=4, y=3','x=2, y=5/3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x+5y=22; x-3y=12 }',c:'x=9, y=-1',o:['x=9, y=-1','x=6, y=4/5','x=7, y=1/5','x=9, y=1']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 5x+2y=24; 4x-3y=10 }',c:'x=4, y=2',o:['x=4, y=2','x=4, y=3','x=2, y=7','x=6, y=-3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 7x-4y=20; 3x+8y=28 }',c:'x=4, y=2',o:['x=4, y=2','x=4, y=1','x=2, y=-1.5','x=6, y=5.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 9x+2y=30; x-5y=-11 }',c:'x=2, y=6',o:['x=2, y=6','x=2, y=3.6','x=3, y=1.5','x=4, y=-3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 6x-5y=14; 7x+4y=44 }',c:'x=4, y=2',o:['x=4, y=2','x=4, y=4','x=5, y=2','x=3, y=4']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 11x-7y=15; 8x+3y=46 }',c:'x=5, y=2',o:['x=5, y=2','x=5, y=4','x=3, y=7','x=6, y=2']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ x+2y=10; 2x-y=0 }',c:'x=2, y=4',o:['x=2, y=4','x=4, y=3','x=2, y=5','x=0, y=5']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ xy=12; x+y=8 }',c:'(2,6) y (6,2)',o:['(2,6) y (6,2)','(3,4)','(12,1)','(4,3) y (3,4)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ y=3x-5; y=2x²-8x+7 }',c:'(2,1) y (3,4)',o:['(2,1) y (3,4)','(1,-2)','(3,4)','(2,1)']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x+4y=18; 2x-y=1 } resuelto. y=',c:'y=3',o:['y=3','y=2','y=4','y=1']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x+4y=18; 2x-y=1 } resuelto. x=',c:'x=2',o:['x=2','x=3','x=4','x=1']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 5x-2y=8; 3x+4y=10 }',c:'x=2, y=1',o:['x=2, y=1','x=1, y=2','x=2, y=2','x=3, y=3.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 4x+3y=26; 2x-5y=0 }',c:'x=5, y=2',o:['x=5, y=2','x=5, y=1','x=3, y=14/3','x=4, y=10/3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 8x-2y=14; 5x+3y=22 }',c:'x=2, y=1',o:['x=2.5, y=3','x=2, y=1','x=2, y=3','x=3, y=5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 6x+7y=55; 8x-3y=41 }',c:'x=8, y=1',o:['x=8, y=1','x=7, y=13/7','x=8, y=7','x=7, y=1']});
console.log('sistemas-ecuaciones:',t.length);
})();

// === MATRICES (+25 to reach ~158) ===
(()=>{
t.push({t:'matrices',n:'9-10',q:'A = [1 2; 0 -1]. Traza:',c:'0',o:['1+(-1)=0','1','-1','2']});
t.push({t:'matrices',n:'9-10',q:'A = [3 5; -2 4]. Traza:',c:'7',o:['3+4=7','5','7','3','1']});
t.push({t:'matrices',n:'9-10',q:'A = [0 1; 0 0]. A² =',c:'[0 0; 0 0] (nula)',o:['[0 0; 0 0]','[0 1; 0 0]','[1 0; 0 1]','[0 0; 0 1]']});
t.push({t:'matrices',n:'9-10',q:'A = [1 0; 0 0]. A² =',c:'A (idempotente)',o:['[1 0; 0 0]=A','I','0','[1 0; 0 1]']});
t.push({t:'matrices',n:'10-11',q:'3x3 simetrica tiene elementos iguales:',c:'aij = aji',o:['aij = -aji','aij = 0','aii = 0']});
t.push({t:'matrices',n:'10-11',q:'Det([1 0 0; 0 1 0; 0 0 1]) =',c:'1',o:['1','0','-1','3','I']});
t.push({t:'matrices',n:'10-11',q:'Det([2 0 0; 0 3 0; 0 0 4]) =',c:'24',o:['2*3*4=24','9','24','12','6']});
t.push({t:'matrices',n:'10-11',q:'Regla Sarrus para det 3x3:',c:'Suma productos diagonales - suma productos anti-diagonales',o:['Solo triangulo sup','Solo triangulo inf','Producto diagonal']});
t.push({t:'matrices',n:'10-11',q:'det(AB) =',c:'det(A)*det(B)',o:['det(A)+det(B)','det(A)/det(B)','det(A)-det(B)']});
t.push({t:'matrices',n:'10-11',q:'det(2A) si A 2x2 y det(A)=3:',c:'12',o:['2²*3=12','6','8','12','24']});
t.push({t:'matrices',n:'10-11',q:'det(2A) si A 3x3 y det(A)=2:',c:'16',o:['2³*2=16','4','8','16','32']});
t.push({t:'matrices',n:'10-11',q:'det(3A) si A 2x2 y det(A)=5:',c:'45',o:['3²*5=45','15','45','30','9']});
t.push({t:'matrices',n:'10-11',q:'det(A⁻¹) =',c:'1/det(A)',o:['det(A)','-det(A)','det(A^T)','1']});
t.push({t:'matrices',n:'10-11',q:'Si det(A)=5, det(A⁻¹)=',c:'1/5',o:['5','1/5','-5','25','0.2']});
t.push({t:'matrices',n:'10-11',q:'det(Aᵀ) =',c:'det(A)',o:['-det(A)','1/det(A)','det(A)²','0']});
t.push({t:'matrices',n:'9-10',q:'Potencia de matriz diagonal [a 0; 0 b]ⁿ =',c:'[aⁿ 0; 0 bⁿ]',o:['[aⁿ 0; 0 b]','[a 0; 0 bⁿ]','[na 0; 0 nb]','[aⁿ 0; 0 bⁿ]']});
t.push({t:'matrices',n:'9-10',q:'[2 0; 0 3]² =',c:'[4 0; 0 9]',o:['[4 0; 0 9]','[2² 0; 0 3²] = correcto','[2 0; 0 3]','[6 0; 0 6]']});
t.push({t:'matrices',n:'9-10',q:'A es nilpotente si Aᵏ = 0. Ej: [0 1; 0 0] es:',c:'Nilpotente (A²=0)',o:['Idempotente','Inversible','Diagonal','Nilpotente']});
console.log('matrices:',t.length);
})();

// === GEO-ANALITICA (+25 to reach ~162) ===
(()=>{
t.push({t:'geo-analitica',n:'9-10',q:'Recta: 4x-2y=8. Pendiente:',c:'2',o:['Despejar y=2x-4 → m=2','2','-2','1/2','4']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta: 5x+10y=20. Pendiente:',c:'-0.5',o:['Despejar y=-0.5x+2 → m=-0.5','5','-0.5','10','0.5']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta: -3x+6y=18. Pendiente:',c:'0.5',o:['Despejar y=0.5x+3 → m=0.5','-3','0.5','-0.5','2']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta: 2x+3y=6. Interseccion eje X:',c:'(3,0)',o:['y=0 → 2x=6 → x=3','(3,0)','(0,2)','(6,0)','(2,0)']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta: 2x+3y=6. Interseccion eje Y:',c:'(0,2)',o:['x=0 → 3y=6 → y=2','(0,2)','(3,0)','(0,6)','(0,3)']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta: 3x-4y=12. Interseccion X:',c:'(4,0)',o:['y=0→3x=12→x=4','(4,0)','(0,-3)','(12,0)','(0,3)']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta: 3x-4y=12. Interseccion Y:',c:'(0,-3)',o:['x=0→-4y=12→y=-3','(0,-3)','(4,0)','(0,12)','(0,3)']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta x=3. Que tipo de recta:',c:'Vertical',o:['Vertical','Horizontal','Oblicua','Diagonal','Pasa por origen']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta y=-2. Que tipo:',c:'Horizontal',o:['Vertical','Horizontal','Oblicua','Diagonal']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta que pasa por (1,2) y (3,8). Ecuacion:',c:'y=3x-1',o:['m=(8-2)/(3-1)=3','y-2=3(x-1)','y=3x-1','y=2x','y=3x+1']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta (0,0) y (4,2):',c:'y=x/2',o:['m=2/4=1/2','y=0.5x','y=x/2','y=2x','y=x+2']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta perpendicular a y=2x+1 que pasa por (0,0):',c:'y=-x/2',o:['m_perp=-1/2','y=-x/2','y=-2x','y=x/2','y=2x']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta perpendicular a y=3x-2 en (0,0):',c:'y=-x/3',o:['m_perp=-1/3','y=-x/3','y=-3x','y=3x','y=x-2']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta paralela a y=4x+1 por (0,5):',c:'y=4x+5',o:['misma m=4','y=4x+5','y=4x+1','y=x+5','y=4x']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta paralela a y=-2x+3 por (1,2):',c:'y=-2x+4',o:['m=-2','y-2=-2(x-1)','y=-2x+4','y=-2x+1','y=x+1']});
t.push({t:'geo-analitica',n:'9-10',q:'Distancia entre (1,1) y (4,5):',c:'5',o:['√(3²+4²)=5','√25=5','3','4','7']});
t.push({t:'geo-analitica',n:'9-10',q:'Distancia entre (-2,3) y (2,6):',c:'5',o:['√(4²+3²)=5','√(16+9)=5','5','8','2']});
t.push({t:'geo-analitica',n:'9-10',q:'Circunferencia x²+y²=100. Radio:',c:'10',o:['10','√100=10','100','50','20']});
t.push({t:'geo-analitica',n:'9-10',q:'Circunferencia (x-1)²+(y+2)²=5. Radio:',c:'√5',o:['√5','5','25','(x-1)²+(y+2)²=5']});
t.push({t:'geo-analitica',n:'9-10',q:'Centro de (x+3)²+(y-1)²=4:',c:'(-3,1)',o:['(-3,1)','(3,-1)','(-3,-1)','(3,1)']});
t.push({t:'geo-analitica',n:'9-10',q:'Centro de x²+(y+5)²=16:',c:'(0,-5)',o:['(0,-5)','(0,5)','(0,0)','(5,0)']});
t.push({t:'geo-analitica',n:'9-10',q:'x²+y²-6x+4y-3=0. Completar cuadrados:',c:'(x-3)²+(y+2)²=16',o:['(x-3)²+(y+2)²=16','(x+3)²+(y-2)²=16','(x-3)²+(y-2)²=16','(x+3)²+(y+2)²=16']});
t.push({t:'geo-analitica',n:'9-10',q:'x²+y²+2x-6y+6=0. Centro:',c:'(-1,3)',o:['(-1,3)','(1,-3)','(-1,-3)','(1,3)']});
t.push({t:'geo-analitica',n:'9-10',q:'x²+y²+2x-6y+6=0. Radio:',c:'2',o:['√((-1)²+3²-6)=√4=2','2','4','√10','5']});
console.log('geo-analitica:',t.length);
})();

// === SUCESIONES (+25 to reach ~168) ===
(()=>{
t.push({t:'sucesiones',n:'7-10',q:'PA: a₁=4, d=3. a₆ =',c:'19',o:['4+5*3=19','4+6*3=22','19','4+3*6=22','7']});
t.push({t:'sucesiones',n:'7-10',q:'PA: a₁=7, d=2. a₉ =',c:'23',o:['7+8*2=23','7+9*2=25','23','7+2*9=25']});
t.push({t:'sucesiones',n:'7-10',q:'PA: a₁=-2, d=5. a₇ =',c:'28',o:['-2+6*5=28','-2+7*5=33','28','5*7-2=33']});
t.push({t:'sucesiones',n:'7-10',q:'PA: a₄=10, d=2. a₁ =',c:'4',o:['a₁+3*2=10 → a₁=4','4','2','6','8']});
t.push({t:'sucesiones',n:'7-10',q:'PA: a₃=14, d=3. a₁ =',c:'8',o:['a₁+2*3=14 → a₁=8','8','11','14','5']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a₁=2, r=5. a₄ =',c:'250',o:['2*5³=250','2*5⁴=1250','250','10','32']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a₁=4, r=3. a₅ =',c:'324',o:['4*3⁴=324','4*3⁵=972','324','12','64']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a₁=6, r=(-2). a₄ =',c:'-48',o:['6*(-2)³=-48','6*(-2)⁴=96','-48','-12','48']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a₁=100, r=0.1. a₃ =',c:'1',o:['100*(0.1)²=100*0.01=1','1','0.1','10','1000']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a₁=1, r=2. Suma S₅ =',c:'31',o:['(2⁵-1)/(2-1)=31','16','31','32','15']});
t.push({t:'sucesiones',n:'7-10',q:'PG: a₁=3, r=2. Suma S₆ =',c:'189',o:['3*(2⁶-1)/(2-1)=3*63=189','96','189','192','93']});
t.push({t:'sucesiones',n:'7-10',q:'PA: a₁=5, d=4. Suma S₁₀ =',c:'230',o:['10/2*(2*5+9*4)=5*(10+36)=230','50+180=230','230','45','500']});
t.push({t:'sucesiones',n:'7-10',q:'PA: a₁=3, d=7. Suma S₈ =',c:'220',o:['8/2*(2*3+7*7)=4*(6+49)=220','220','52','220','3*8+7*28=220']});
t.push({t:'sucesiones',n:'7-10',q:'Serie: 1+1/2+1/4+1/8+... Suma:',c:'2',o:['1/(1-1/2)=2','2','1.5','∞','2.5']});
t.push({t:'sucesiones',n:'7-10',q:'Serie: 9+3+1+1/3+... Suma:',c:'13.5',o:['9/(1-1/3)=9/(2/3)=13.5','13.5','12','27/2','9']});
t.push({t:'sucesiones',n:'7-10',q:'Serie: 4+2+1+0.5+... Suma:',c:'8',o:['4/(1-1/2)=8','8','6','∞','12']});
t.push({t:'sucesiones',n:'7-10',q:'Serie: 0.1+0.01+0.001+... Suma:',c:'0.111...=1/9',o:['0.1/(1-0.1)=0.1/0.9=1/9','0.1/0.9=1/9','0.111...=1/9','0.1','0.12']});
t.push({t:'sucesiones',n:'7-10',q:'Termino general: 5,10,15,20,... a_n =',c:'5n',o:['5n','n+5','5n+5','5(n-1)','5+n']});
t.push({t:'sucesiones',n:'7-10',q:'Termino general: 1,4,7,10,... a_n =',c:'3n-2',o:['3n-2','n+3','3n+1','3n-3','n+2']});
t.push({t:'sucesiones',n:'7-10',q:'Termino general: 3,6,11,18,... patron:',c:'n²+2',o:['n²+2','2n+1','n²+1','3n','n²-1']});
t.push({t:'sucesiones',n:'7-10',q:'Termino general: 0,3,8,15,24,... a_n =',c:'n²-1',o:['n²-1','n²+1','2n-1','n²','n(n-1)']});
t.push({t:'sucesiones',n:'10-11',q:'lim n→∞ (2n+1)/(3n-1) =',c:'2/3',o:['Dividir n: (2+1/n)/(3-1/n)→2/3','2/3','0','∞','1']});
t.push({t:'sucesiones',n:'10-11',q:'lim n→∞ (5n²+2)/(n²+1) =',c:'5',o:['5','0','∞','1','5/2']});
t.push({t:'sucesiones',n:'10-11',q:'lim n→∞ (n³+2n)/(2n³-1) =',c:'1/2',o:['1/2','0','∞','1','2']});
t.push({t:'sucesiones',n:'10-11',q:'lim n→∞ 2^n/3^n =',c:'0',o:['(2/3)^n→0','0','2/3','∞','1']});
console.log('sucesiones:',t.length);
})();

// === CONJUNTOS (+25 to reach ~172) ===
(()=>{
t.push({t:'conjuntos',n:'7-9',q:'A={1,2,3,4}, B={3,4,5,6}. A∩B:',c:'{3,4}',o:['{3,4}','{1,2,3,4,5,6}','{1,2,5,6}','{3,4,5}']});
t.push({t:'conjuntos',n:'7-9',q:'A={a,b,c}, B={c,d,e}. A∪B:',c:'{a,b,c,d,e}',o:['{a,b,c,d,e}','{c}','{a,b,c}','{a,b,c,d}']});
t.push({t:'conjuntos',n:'7-9',q:'A={x|x>5}, B={x|x<10}. A∩B:',c:'{x|5<x<10}',o:['{x|5<x<10}','∅','{x|x>5}','{x|x<10}','{x|x cualquier real}']});
t.push({t:'conjuntos',n:'7-9',q:'A={2,4,6,...} pares. B={3,6,9,...} multiplos 3. A∩B:',c:'Multiplos de 6',o:['{6,12,18,...}','Multiplos de 6','∅','{2,3,4,6}','Pares']});
t.push({t:'conjuntos',n:'7-9',q:'Si |A|=8, |B|=5, |A∩B|=2. |A∪B|=',c:'11',o:['8+5-2=11','11','13','10','3']});
t.push({t:'conjuntos',n:'7-9',q:'Si |A|=15, |B|=10, |A∪B|=20. |A∩B|=',c:'5',o:['15+10-20=5','5','25','30','10']});
t.push({t:'conjuntos',n:'7-9',q:'Si |A|=7, |B|=9, |A∩B|=3. |A∪B|=',c:'13',o:['7+9-3=13','13','16','19','6']});
t.push({t:'conjuntos',n:'7-9',q:'|A|=10, |B|=12, |A∩B|=4. |A-B|=',c:'6',o:['|A|-|A∩B|=10-4=6','6','4','8','18']});
t.push({t:'conjuntos',n:'7-9',q:'Si U={1,...,12}, A={1,3,5,7,9,11}. |A\'|=',c:'6',o:['12-6=6','6','5','12-|A|=6','11']});
t.push({t:'conjuntos',n:'7-9',q:'Si U={a,b,c,...,z}, A=a..m. |A\'|=',c:'13',o:['26-13=13','13','13','26','12']});
t.push({t:'conjuntos',n:'7-9',q:'A⊆B y B⊆A implica:',c:'A=B',o:['A=B','A⊂B','B⊂A','A∪B=∅','A∩B=∅']});
t.push({t:'conjuntos',n:'7-9',q:'¿∅ ⊆ {1,2,3}?',c:'Si (siempre)',o:['Si (siempre)','No','Depende','Solo si ∅ definido']});
t.push({t:'conjuntos',n:'7-9',q:'¿{∅} = ∅?',c:'No ({∅} es conjunto con 1 elemento)',o:['No ({∅} tiene 1 elemento)','Si','Depende','∅={} ≠ {∅}']});
t.push({t:'conjuntos',n:'7-9',q:'|P({a})| =',c:'2',o:['2¹=2','2','1','2²=4','0']});
t.push({t:'conjuntos',n:'7-9',q:'|P(∅)| =',c:'1',o:['2⁰=1','1','0','2','∞']});
t.push({t:'conjuntos',n:'7-9',q:'A∪B = B∪A. Propiedad:',c:'Conmutativa',o:['Conmutativa','Asociativa','Distributiva','Identidad']});
t.push({t:'conjuntos',n:'7-9',q:'(A∪B)∪C = A∪(B∪C). Propiedad:',c:'Asociativa',o:['Conmutativa','Asociativa','Distributiva','De Morgan']});
t.push({t:'conjuntos',n:'7-9',q:'A∩(B∪C) = (A∩B)∪(A∩C). Propiedad:',c:'Distributiva',o:['Conmutativa','Asociativa','Distributiva','Absorcion']});
t.push({t:'conjuntos',n:'7-9',q:'A∪(B∩C) = (A∪B)∩(A∪C). Propiedad:',c:'Distributiva',o:['Conmutativa','Asociativa','Distributiva','Absorcion']});
t.push({t:'conjuntos',n:'7-9',q:'A∩(A∪B) = A. Propiedad:',c:'Absorcion',o:['Conmutativa','Asociativa','Distributiva','Absorcion']});
t.push({t:'conjuntos',n:'7-9',q:'A∪(A∩B) = A. Propiedad:',c:'Absorcion',o:['Conmutativa','Asociativa','Distributiva','Absorcion']});
t.push({t:'conjuntos',n:'7-9',q:'A={1,2,3,4,5}, B={3,4,5,6,7}. AΔB =',c:'{1,2,6,7}',o:['{1,2}∪{6,7}={1,2,6,7}','{1,2,6,7}','{1,2,3,4,5,6,7}','{1,2}','{6,7}']});
console.log('conjuntos:',t.length);
})();

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<t.length;i++){
    const e=t[i];const src=S+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify({o:res.o,ci:res.ci}),JSON.stringify([{math:e.q,expl:''}]),null,'facil','mep',2025,src,A,null,e.n||'7-10']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
