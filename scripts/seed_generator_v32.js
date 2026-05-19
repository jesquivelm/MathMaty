process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-v32';const A='generacion-programatica';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}
const R=(m,M)=>Math.floor(Math.random()*(M-m+1))+m;
const pick=a=>a[R(0,a.length-1)];

const t=[];

// === SISTEMAS-ECUACIONES (+80 to reach ~134) ===
(()=>{
for(let i=0;i<20;i++){const x=R(1,9),y=R(1,9);const a=R(1,5),b=R(1,5),c=R(1,5),d=R(1,5);t.push({t:'sistemas-ecuaciones',n:'8-9',q:`{ ${a}x + ${b}y = ${a*x+b*y}; ${c}x + ${d}y = ${c*x+d*y} }`,c:`x=${x}, y=${y}`,o:[`x=${y}, y=${x}`,`x=${x+1}, y=${y}`,`x=${x}, y=${y+1}`]});}
for(let i=0;i<10;i++){const x=R(1,5),y=R(2,8);t.push({t:'sistemas-ecuaciones',n:'8-9',q:`{ x + y = ${x+y}; x - y = ${x-y} }`,c:`x=${x}, y=${y}`,o:[`x=${y}, y=${x}`,`x=${x+1}, y=${y-1}`,`x=${x-1}, y=${y+1}`]});}
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=10; x-y=2 }',c:'x=6, y=4',o:['x=4, y=6','x=5, y=5','x=6, y=2']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=7; x-y=3 }',c:'x=5, y=2',o:['x=2, y=5','x=5, y=3','x=3, y=4']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=12; x-y=4 }',c:'x=8, y=4',o:['x=4, y=8','x=6, y=6','x=8, y=2']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=9; x-y=1 }',c:'x=5, y=4',o:['x=4, y=5','x=5, y=3','x=6, y=3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x+y=10; x-y=2 }',c:'x=4, y=2',o:['x=3, y=4','x=4, y=3','x=5, y=0']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+2y=8; x-y=2 }',c:'x=4, y=2',o:['x=2, y=3','x=4, y=1','x=3, y=2.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x-y=5; x+y=3 }',c:'x=2, y=1',o:['x=1, y=2','x=2, y=2','x=3, y=4']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+3y=7; 2x-y=0 }',c:'x=1, y=2',o:['x=2, y=1','x=1, y=3','x=2, y=4']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x+3y=13; 4x-y=5 }',c:'x=2, y=3',o:['x=3, y=2','x=2, y=4','x=3, y=1']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x+2y=12; 5x-2y=4 }',c:'x=2, y=3',o:['x=3, y=2','x=2, y=4','x=4, y=0']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 4x+y=9; 2x-3y=1 }',c:'x=2, y=1',o:['x=1, y=5','x=2, y=2','x=3, y=-3']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+2y=5; 3x-y=1 }',c:'x=1, y=2',o:['x=2, y=1.5','x=1, y=3','x=2, y=1']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 5x+3y=28; 2x-3y=-2 }',c:'x=4, y=2',o:['x=2, y=4','x=4, y=3','x=5, y=1']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x+y=7; 3x-2y=0 }',c:'x=2, y=3',o:['x=3, y=1','x=2, y=2','x=1, y=5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=5; 2x+3y=12 }',c:'x=3, y=2',o:['x=2, y=3','x=3, y=1','x=1, y=4']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ x²+y²=25; x+y=7 }',c:'(3,4) o (4,3)',o:['(5,0) o (0,5)','(3,4)','(2,5) o (5,2)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ y=x²; y=4 }',c:'x=2 o x=-2',o:['x=2','x=-2','x=4']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ y=2x; y=x² }',c:'(0,0) y (2,4)',o:['(1,2)','(0,0)','(2,4)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ x+y=6; xy=8 }',c:'(2,4) y (4,2)',o:['(3,3)','(1,5)','(2,4)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ x²+y²=10; xy=3 }',c:'(1,3) y (3,1)',o:['(3,1)','(2,5)','(5,2)']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'Metodo de sustitucion: despejar y reemplazar. Resolver {x+y=5; x-y=1}',c:'x=3, y=2',o:['x=2, y=3','x=3, y=1','x=2.5, y=2.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'Metodo de eliminacion: sumar ecuaciones. {x+y=5; x-y=1} sumando:',c:'2x=6, x=3',o:['2y=6, y=3','2x=4, x=2','x+y=6']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'Sistema incompatible (sin solucion) ocurre cuando:',c:'Rectas paralelas',o:['Rectas iguales','Rectas perpendiculares','Rectas secantes']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'Sistema compatible indeterminado:',c:'Infinitas soluciones',o:['Sin solucion','Solucion unica','Dos soluciones']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=5; 2x+2y=10 } tiene:',c:'Infinitas soluciones',o:['Solucion unica','Sin solucion','x=5, y=0']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+y=5; x+y=7 } tiene:',c:'Sin solucion',o:['Solucion unica','Infinitas soluciones','x=0, y=5']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'Regla de Cramer: det de coeficientes. {ax+by=e; cx+dy=f}. x =',c:'(ed-bf)/(ad-bc)',o:['(af-ce)/(ad-bc)','(ed+bf)/(ad-bc)','(ed-bf)/(ad+bc)']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 3x+4y=18; 2x-y=1 }. 3x+4y=18, 2x-y=1. x =',c:'2',o:['3','4','1']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 2x+5y=16; 3x-2y=5 }. x =',c:'3',o:['2','3','4']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 2x+5y=16; 3x-2y=5 }. y =',c:'2',o:['1','3','-2']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'3x=12, x=',c:'4',o:['3','6','9']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'5y=20, y=',c:'4',o:['5','10','15']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'x+3=7, x=',c:'4',o:['3','5','10']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'x-5=12, x=',c:'17',o:['7','12','15']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'2x+3=9, x=',c:'3',o:['2','4','6']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'3x-1=14, x=',c:'5',o:['4','6','15']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'x/2=8, x=',c:'16',o:['4','8','10']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'(x+1)/3=5, x=',c:'14',o:['4','14','15']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x+y=12; x-y=3 }',c:'x=5, y=2',o:['x=4, y=4','x=5, y=3','x=6, y=0']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 3x+2y=16; x-2y=0 }',c:'x=4, y=2',o:['x=2, y=4','x=4, y=3','x=5, y=0.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 2x+4y=20; 3x-y=2 }',c:'x=2, y=4',o:['x=4, y=3','x=2, y=5','x=3, y=3.5']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ x+5y=17; 2x-y=1 }',c:'x=2, y=3',o:['x=3, y=2.8','x=2, y=4','x=3, y=2']});
t.push({t:'sistemas-ecuaciones',n:'8-9',q:'{ 4x+3y=25; 5x-2y=14 }',c:'x=4, y=3',o:['x=3, y=4','x=4, y=2','x=5, y=1.66']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 3x+5y=31; 2x+3y=20 }',c:'x=7, y=2',o:['x=2, y=5','x=7, y=3','x=6, y=2.6']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 5x+2y=26; 3x-4y=-18 }',c:'x=2, y=8',o:['x=4, y=3','x=2, y=8','x=3, y=5.5']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 2x+7y=23; 5x-3y=-4 }',c:'x=1, y=3',o:['x=3, y=1','x=1, y=4','x=2, y=3']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 6x+5y=38; 7x-2y=1 }',c:'x=3, y=4',o:['x=4, y=2.8','x=3, y=5','x=2, y=5.2']});
t.push({t:'sistemas-ecuaciones',n:'9-10',q:'{ 4x+3y=24; 7x-5y=-1 }',c:'x=3, y=4',o:['x=4, y=3','x=3, y=2','x=2, y=5.33']});
console.log('sistemas:',t.length);
})();

// === ESTADISTICA (+60 to reach ~149) ===
(()=>{
for(let i=0;i<15;i++){const a=R(1,10),b=R(1,10),c=R(1,10),d=R(1,10),e=R(1,10);t.push({t:'estadistica',n:'7-9',q:`Datos: ${a},${b},${c},${d},${e}. Media =`,c:`${((a+b+c+d+e)/5).toFixed(1)}`,o:[`${a}`,`${c}`,`${(a+b+c+d+e)/5+1}`]});}
for(let i=0;i<10;i++){const a=R(1,10),b=R(1,10),c=R(1,10),d=R(1,10),e=R(1,10),f=R(1,10);t.push({t:'estadistica',n:'7-9',q:`Datos: ${a},${b},${c},${d},${e},${f}. Media =`,c:`${((a+b+c+d+e+f)/6).toFixed(1)}`,o:[`${(a+b+c+d+e)/5}`,`${(a+b+c+d+e+f)/6+1}`,`${a+b+c+d+e+f}`]});}
t.push({t:'estadistica',n:'7-9',q:'Datos: 1,2,3,4,5. Media =',c:'3',o:['2.5','3.5','4']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 2,4,6,8,10. Media =',c:'6',o:['5','7','4']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 1,2,3,4,5. Mediana =',c:'3',o:['2','4','3.5']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 1,2,3,4,5,6. Mediana =',c:'3.5',o:['3','4','3']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 1,5,3,2,4. Mediana =',c:'3',o:['3','2','4']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 7,3,5,1,9,5. Moda =',c:'5',o:['7','3','1']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 2,2,3,4,4,4,5. Moda =',c:'4',o:['2','3','5']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 1,1,2,3,3,3,4. Moda =',c:'3',o:['1','2','4']});
t.push({t:'estadistica',n:'7-9',q:'Rango de 3,7,2,9,5:',c:'7',o:['9-2=7','6','5','4']});
t.push({t:'estadistica',n:'7-9',q:'Rango de 1,8,4,12,3:',c:'11',o:['12-1=11','10','9','8']});
t.push({t:'estadistica',n:'7-9',q:'Rango de 20,15,30,25:',c:'15',o:['30-15=15','10','20','5']});
t.push({t:'estadistica',n:'7-9',q:'Si media=5 y n=4, suma total:',c:'20',o:['5*4=20','9','10','15']});
t.push({t:'estadistica',n:'7-9',q:'Si suma=45 y n=5, media:',c:'9',o:['45/5=9','8','10','7']});
t.push({t:'estadistica',n:'7-9',q:'Si suma=120 y n=8, media:',c:'15',o:['120/8=15','12','14','16']});
t.push({t:'estadistica',n:'7-9',q:'5,5,5,5,5. Varianza =',c:'0',o:['1','5','25']});
t.push({t:'estadistica',n:'9-10',q:'Varianza de 1,3,5: media=3. Var =',c:'8/3',o:['(4+0+4)/3=8/3','2','4','8']});
t.push({t:'estadistica',n:'9-10',q:'Desviacion estandar = √varianza. Si var=9, DE:',c:'3',o:['9','81','4.5']});
t.push({t:'estadistica',n:'9-10',q:'Si var=16, DE:',c:'4',o:['8','256','2']});
t.push({t:'estadistica',n:'9-10',q:'Si var=25, DE:',c:'5',o:['10','625','2.5']});
t.push({t:'estadistica',n:'9-10',q:'Si var=4, DE:',c:'2',o:['4','8','1']});
t.push({t:'estadistica',n:'9-10',q:'Coef. variacion = DE/media * 100%. Si DE=2, media=10:',c:'20%',o:['2/10*100=20%','10%','5%','2%']});
t.push({t:'estadistica',n:'9-10',q:'Coef. variacion = DE/media * 100%. Si DE=3, media=15:',c:'20%',o:['3/15*100=20%','15%','10%','30%']});
t.push({t:'estadistica',n:'9-10',q:'Coef. variacion DE=5, media=25:',c:'20%',o:['25%','15%','10%']});
t.push({t:'estadistica',n:'9-10',q:'Cuartil Q1: 25% datos ___ que el:',c:'Menores',o:['Mayores','Iguales','Diferentes']});
t.push({t:'estadistica',n:'9-10',q:'Cuartil Q2 =',c:'Mediana',o:['Moda','Media','Rango']});
t.push({t:'estadistica',n:'9-10',q:'Cuartil Q3: 75% datos:',c:'menores que Q3',o:['mayores que Q3','igual a Q3','menores a media']});
t.push({t:'estadistica',n:'9-10',q:'Rango intercuartil IQR =',c:'Q3 - Q1',o:['Q2 - Q1','Q3 - Q2','Max - Min']});
t.push({t:'estadistica',n:'9-10',q:'Datos agrupados. Marca de clase =',c:'(Li + Ls)/2',o:['Ls - Li','Li * Ls','(Ls-Li)/2']});
t.push({t:'estadistica',n:'9-10',q:'Histograma se usa para datos:',c:'Cuantitativos continuos',o:['Cualitativos','Cuantitativos discretos','Categoricos']});
t.push({t:'estadistica',n:'7-9',q:'Grafico de barras para datos:',c:'Categoricos',o:['Continuos','Numericos','Agrupados']});
t.push({t:'estadistica',n:'7-9',q:'Grafico circular (pastel) para:',c:'Porcentajes',o:['Series temporales','Datos continuos','Frecuencias acumuladas']});
t.push({t:'estadistica',n:'7-9',q:'Frecuencia absoluta: numero de veces que un dato:',c:'aparece',o:['se acumula','se repite en %','se ordena']});
t.push({t:'estadistica',n:'7-9',q:'Frecuencia relativa:',c:'frec_abs / total',o:['frec_abs * total','total / frec_abs','frec_abs - total']});
t.push({t:'estadistica',n:'7-9',q:'Frecuencia acumulada:',c:'Suma de frecuencias hasta ese dato',o:['Multiplicacion','Resta','Division']});
t.push({t:'estadistica',n:'7-9',q:'Datos: 1,1,2,3. Frec. abs. de 1:',c:'2',o:['1','3','4']});
t.push({t:'estadistica',n:'7-9',q:'5 estudiantes: notas 70,80,80,90,100. Moda:',c:'80',o:['70','90','100']});
t.push({t:'estadistica',n:'7-9',q:'Notas: 60,60,70,80,80,80. Moda:',c:'80',o:['60','70','80']});
t.push({t:'estadistica',n:'9-10',q:'Asimetria positiva: media ___ mediana:',c:'mayor que',o:['menor que','igual','opuesta a']});
t.push({t:'estadistica',n:'9-10',q:'Asimetria negativa: media ___ mediana:',c:'menor que',o:['mayor que','igual','opuesta a']});
t.push({t:'estadistica',n:'9-10',q:'Distribucion simetrica: media =',c:'mediana',o:['moda','varianza','rango']});
t.push({t:'estadistica',n:'9-10',q:'Probabilidad no es:',c:'Mayor que 1',o:['Igual a 0','Igual a 1','Entre 0 y 1']});
t.push({t:'estadistica',n:'9-10',q:'La media es sensible a:',c:'Valores extremos (outliers)',o:['La moda','La mediana','La frecuencia']});
t.push({t:'estadistica',n:'9-10',q:'La mediana NO es afectada por:',c:'Valores extremos',o:['Orden','Cantidad de datos','Frecuencia']});
t.push({t:'estadistica',n:'7-9',q:'Datos: {1,4,6,8,10,10}. Rango:',c:'9',o:['10-1=9','9','8','6']});
t.push({t:'estadistica',n:'7-9',q:'Datos: {2,5,7,9,12,15,20}. Rango:',c:'18',o:['20-2=18','15','13','10']});
t.push({t:'estadistica',n:'9-10',q:'Datos agrupados: la media se estima con:',c:'Σ(marca_clase*frec) / n',o:['Σ(frec)/n','Σ(marca_clase)/n','n/Σ(marca_clase)']});
t.push({t:'estadistica',n:'7-9',q:'Tabla de frecuencias: frecuencia total =',c:'n (total datos)',o:['∑ frec_rel = 1','∑ frec_rel = 100','n-1']});
t.push({t:'estadistica',n:'7-9',q:'3,3,4,5,6,6. Rango:',c:'3',o:['6-3=3','4','5','2']});
t.push({t:'estadistica',n:'7-9',q:'Ojiva grafica:',c:'Frecuencia acumulada',o:['Frecuencia absoluta','Frecuencia relativa','Datos originales']});
t.push({t:'estadistica',n:'7-9',q:'Poligono de frecuencias:',c:'Linea que une puntos medios',o:['Barras','Circulo','Histograma']});
console.log('estadistica:',t.length);
})();

// === PROBABILIDAD (+70 to reach ~145) ===
(()=>{
t.push({t:'probabilidad',n:'7-10',q:'Lanzar moneda. P(cara) =',c:'1/2',o:['1','0','1/4']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar dado. P(3) =',c:'1/6',o:['1/3','1/2','1']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar dado. P(par) =',c:'1/2',o:['1/3','1/6','2/3']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar dado. P(>4) =',c:'1/3',o:['1/2','1/6','2/3']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar dado. P(primo) =',c:'1/2',o:['2,3,5 → 3/6=1/2','2/3','1/3','5/6']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 3 rojas, 2 azules. P(roja) =',c:'3/5',o:['2/5','1/2','3/2']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 3 rojas, 2 azules. P(azul) =',c:'2/5',o:['3/5','1/2','2/3']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 5 verdes, 3 amarillas. P(verde) =',c:'5/8',o:['3/8','1/2','5/3']});
t.push({t:'probabilidad',n:'7-10',q:'Bolsa 5 verdes, 3 amarillas. P(amarilla) =',c:'3/8',o:['5/8','1/2','3/5']});
t.push({t:'probabilidad',n:'7-10',q:'Mazo 52 cartas. P(as) =',c:'4/52=1/13',o:['1/52','4/50','13/52']});
t.push({t:'probabilidad',n:'7-10',q:'Mazo 52 cartas. P(corazon) =',c:'13/52=1/4',o:['1/52','4/52','1/2']});
t.push({t:'probabilidad',n:'7-10',q:'Mazo 52 cartas. P(as de corazones) =',c:'1/52',o:['1/13','1/4','4/52']});
t.push({t:'probabilidad',n:'7-10',q:'Mazo 52 cartas. P(rey o reina) =',c:'8/52=2/13',o:['4/52','12/52','16/52']});
t.push({t:'probabilidad',n:'7-10',q:'Mazo 52 cartas. P(no es as) =',c:'48/52=12/13',o:['4/52','1/13','44/52']});
t.push({t:'probabilidad',n:'7-10',q:'Probabilidad siempre entre:',c:'0 y 1',o:['-1 y 1','0 y 100','1 y 10']});
t.push({t:'probabilidad',n:'7-10',q:'Evento seguro: P =',c:'1',o:['0','0.5','Imposible']});
t.push({t:'probabilidad',n:'7-10',q:'Evento imposible: P =',c:'0',o:['1','0.5','Depende']});
t.push({t:'probabilidad',n:'7-10',q:'P(A) + P(no A) =',c:'1',o:['0','0.5','P(A)*P(no A)']});
t.push({t:'probabilidad',n:'7-10',q:'Dos monedas. P(dos caras) =',c:'1/4',o:['1/2','1/3','1/8']});
t.push({t:'probabilidad',n:'7-10',q:'Dos monedas. P(una cara, un sello) =',c:'1/2',o:['1/4','3/4','1/3']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma 7) =',c:'6/36=1/6',o:['5/36','7/36','1/12']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma 2) =',c:'1/36',o:['2/36','1/18','1/12']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(suma 12) =',c:'1/36',o:['2/36','1/18','1/6']});
t.push({t:'probabilidad',n:'7-10',q:'Dos dados. P(mismo numero) =',c:'6/36=1/6',o:['1/36','2/36','12/36']});
t.push({t:'probabilidad',n:'9-10',q:'P(A∪B) = P(A) + P(B) - P(A∩B). Formula:',c:'Union',o:['Interseccion','Diferencia','Complemento']});
t.push({t:'probabilidad',n:'9-10',q:'Sucesos independientes: P(A∩B) =',c:'P(A)*P(B)',o:['P(A)+P(B)','P(A|B)','0']});
t.push({t:'probabilidad',n:'9-10',q:'Sucesos mutuamente excluyentes: P(A∩B)=',c:'0',o:['P(A)*P(B)','P(A)+P(B)','1']});
t.push({t:'probabilidad',n:'9-10',q:'Si A y B mutuamente excluyentes: P(A∪B)=',c:'P(A)+P(B)',o:['P(A)*P(B)','P(A)+P(B)-P(A∩B)','1']});
t.push({t:'probabilidad',n:'9-10',q:'P(A|B) = P(A∩B)/P(B). Probabilidad:',c:'Condicional',o:['Total','Conjunta','Marginal']});
t.push({t:'probabilidad',n:'9-10',q:'P(A|B) = P(A) si A y B son:',c:'Independientes',o:['Mut. excluyentes','Dependientes','Complementarios']});
t.push({t:'probabilidad',n:'9-10',q:'En urna 3R 2A, sacar 2 sin reposicion. P(R,R) =',c:'(3/5)*(2/4)=6/20=3/10',o:['(3/5)*(3/5)=9/25','(3/5)*(2/5)=6/25','(3/5)*(1/4)=3/20']});
t.push({t:'probabilidad',n:'9-10',q:'En urna 3R 2A, reposicion. P(R,R) =',c:'(3/5)*(3/5)=9/25',o:['9/25','3/5','3/10','6/25']});
t.push({t:'probabilidad',n:'9-10',q:'En urna 4R 3V, 2 extracciones sin reposicion. P(R,V) =',c:'(4/7)*(3/6)=12/42=2/7',o:['2/7','(4/7)*(3/7)=12/49','(4/7)*(4/7)=16/49','(4/7)*(2/6)=8/42']});
t.push({t:'probabilidad',n:'9-10',q:'P(A) = 0.3, P(B) = 0.4, independientes. P(A∩B)=',c:'0.12',o:['0.7','0.12','0','0.1']});
t.push({t:'probabilidad',n:'9-10',q:'P(A)=0.3, P(B)=0.4, mut. excluyentes. P(A∪B)=',c:'0.7',o:['0.12','0.7','1','0.58']});
t.push({t:'probabilidad',n:'9-10',q:'P(A)=0.5, P(B)=0.3, independientes. P(A∪B)=',c:'0.65',o:['0.5+0.3-0.15=0.65','0.8','0.15','0.5']});
t.push({t:'probabilidad',n:'9-10',q:'Teorema de Bayes: P(A|B) =',c:'P(B|A)P(A)/P(B)',o:['P(A)P(B)/P(B|A)','P(A∪B)/P(B)','P(A∩B)P(B)']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar 2 monedas. Espacio muestral #:',c:'4',o:['{CC,CS,SC,SS} → 4','2','6','8']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar 3 monedas. Espacio muestral #:',c:'8',o:['2^3=8','6','4','16']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar 2 dados. Espacio muestral #:',c:'36',o:['6^2=36','12','18','24']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar 3 dados. Espacio muestral #:',c:'216',o:['6^3=216','18','36','72']});
t.push({t:'probabilidad',n:'7-10',q:'Combinacion: C(n,r) =',c:'n!/(r!(n-r)!)',o:['n!/(n-r)!','n!*r!/(n-r)!','n!/(r!*(n+r)!)']});
t.push({t:'probabilidad',n:'7-10',q:'Permutacion: P(n,r) =',c:'n!/(n-r)!',o:['n!/r!','n!/(r!(n-r)!)','(n-r)!/n!']});
t.push({t:'probabilidad',n:'7-10',q:'C(5,2) =',c:'10',o:['5!/(2!3!)=10','20','5','7']});
t.push({t:'probabilidad',n:'7-10',q:'C(6,3) =',c:'20',o:['6!/(3!3!)=20','30','10','120']});
t.push({t:'probabilidad',n:'7-10',q:'C(4,2) =',c:'6',o:['4!/(2!2!)=6','8','12','4']});
t.push({t:'probabilidad',n:'7-10',q:'P(5,2) =',c:'20',o:['5!/(3!)=20','10','60','25']});
t.push({t:'probabilidad',n:'7-10',q:'P(4,3) =',c:'24',o:['4!/(1!)=24','12','64','7']});
t.push({t:'probabilidad',n:'7-10',q:'Lanzar un dado 2 veces. P(ambos >4) =',c:'(2/6)*(2/6)=4/36=1/9',o:['(2/6)+(2/6)=4/6','(2/6)*(1/6)','(4/6)*(4/6)']});
t.push({t:'probabilidad',n:'7-10',q:'Baraja 52, extraer 1. P(rey o corazon) =',c:'16/52=4/13',o:['13/52+4/52-1/52=16/52','17/52','13/52','4/52']});
t.push({t:'probabilidad',n:'7-10',q:'Familia 2 hijos. P(ambos niños) =',c:'1/4',o:['HH, HM, MH, MM → 1/4','1/3','1/2','1']});
t.push({t:'probabilidad',n:'7-10',q:'Familia 2 hijos. P(un niño, una niña) =',c:'1/2',o:['HM+MH=2/4=1/2','1/4','3/4','2/3']});
t.push({t:'probabilidad',n:'9-10',q:'P(A)=0.6, P(B)=0.7, P(A∩B)=0.4. P(A∪B)=',c:'0.9',o:['0.6+0.7-0.4=0.9','1.3','0.3','0.6']});
t.push({t:'probabilidad',n:'9-10',q:'P(A)=0.4, P(B)=0.5, P(A∪B)=0.7. P(A∩B)=',c:'0.2',o:['0.4+0.5-0.7=0.2','0.9','0.1','0.3']});
console.log('probabilidad:',t.length);
})();

// === GEO-ANALITICA (+70 to reach ~145) ===
(()=>{
for(let i=0;i<10;i++){const m=R(1,5),b=R(1,10);t.push({t:'geo-analitica',n:'9-10',q:`Recta: y=${m}x+${b}. Pendiente:`,c:`${m}`,o:[`${b}`,`-${m}`,`${m+1}`]});}
for(let i=0;i<10;i++){const x1=R(-3,3),y1=R(-3,3),x2=R(4,8),y2=R(4,8);const dx=x2-x1,dy=y2-y1;t.push({t:'geo-analitica',n:'9-10',q:`P(${x1},${y1}), Q(${x2},${y2}). Pendiente:`,c:`${(dy/dx).toFixed(1)}`,o:[`${(dx/dy).toFixed(1)}`,`${((dy+1)/dx).toFixed(1)}`,`${(dy/(dx+1)).toFixed(1)}`]});}
t.push({t:'geo-analitica',n:'9-10',q:'P(1,2), Q(3,6). Pendiente:',c:'2',o:['(6-2)/(3-1)=2','4','1','3']});
t.push({t:'geo-analitica',n:'9-10',q:'P(0,0), Q(4,4). Pendiente:',c:'1',o:['(4-0)/(4-0)=1','0','-1','4']});
t.push({t:'geo-analitica',n:'9-10',q:'P(2,3), Q(5,7). Pendiente:',c:'4/3',o:['(7-3)/(5-2)=4/3','1','3/4','2']});
t.push({t:'geo-analitica',n:'9-10',q:'P(1,5), Q(4,5). Pendiente:',c:'0',o:['(5-5)/(4-1)=0','5','1','∞']});
t.push({t:'geo-analitica',n:'9-10',q:'P(2,1), Q(2,6). Pendiente:',c:'∞ (indefinida)',o:['0','1','5']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta y=2x+3. Pendiente:',c:'2',o:['3','-2','1/2']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta y=-3x+1. Pendiente:',c:'-3',o:['3','1','-1/3']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta x=4. Pendiente:',c:'Indefinida',o:['0','4','1']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta y=5. Pendiente:',c:'0',o:['5','1','Infinito']});
t.push({t:'geo-analitica',n:'9-10',q:'2x+3y=6. Pendiente:',c:'-2/3',o:['-2/3','2/3','-3/2','2']});
t.push({t:'geo-analitica',n:'9-10',q:'3x-4y=12. Pendiente:',c:'3/4',o:['-3/4','4/3','3','-4']});
t.push({t:'geo-analitica',n:'9-10',q:'Rectas paralelas tienen pendientes:',c:'Iguales',o:['Opuestas','Reciproca','Negativa']});
t.push({t:'geo-analitica',n:'9-10',q:'Rectas perpendiculares: m1 * m2 =',c:'-1',o:['1','0','m1=m2']});
t.push({t:'geo-analitica',n:'9-10',q:'y=2x+3 y y=2x-1 son:',c:'Paralelas',o:['Perpendiculares','Iguales','Secantes']});
t.push({t:'geo-analitica',n:'9-10',q:'y=2x+1 y y=(-1/2)x+3 son:',c:'Perpendiculares',o:['Paralelas','Iguales','Ninguna']});
t.push({t:'geo-analitica',n:'9-10',q:'Distancia P(1,2) a Q(4,6) =',c:'5',o:['√((4-1)²+(6-2)²)=5','√13','7','25']});
t.push({t:'geo-analitica',n:'9-10',q:'Distancia P(0,0) a Q(3,4) =',c:'5',o:['√(3²+4²)=5','7','1','25']});
t.push({t:'geo-analitica',n:'9-10',q:'Distancia P(2,1) a Q(6,4) =',c:'5',o:['√(4²+3²)=5','√20','5','√41']});
t.push({t:'geo-analitica',n:'9-10',q:'Punto medio de (1,2) y (5,6):',c:'(3,4)',o:['(1+5)/2=3, (2+6)/2=4','(3,4)','(2,3)','(6,8)']});
t.push({t:'geo-analitica',n:'9-10',q:'Punto medio de (0,0) y (8,10):',c:'(4,5)',o:['(0,10)','(4,5)','(8,10)','(2,2.5)']});
t.push({t:'geo-analitica',n:'9-10',q:'Punto medio de (-2,4) y (6,2):',c:'(2,3)',o:['(2,3)','(4,6)','(-2,2)','(0,0)']});
t.push({t:'geo-analitica',n:'9-10',q:'Ecuacion punto-pendiente: y - y1 = m(x - x1). m=2, P(3,1):',c:'y-1=2(x-3)',o:['y=2x+1','y-3=2(x-1)','y+1=2(x+3)']});
t.push({t:'geo-analitica',n:'9-10',q:'m=3, P(2,4). Ecuacion:',c:'y-4=3(x-2)',o:['y=3x+4','y-2=3(x-4)','y+4=3(x+2)']});
t.push({t:'geo-analitica',n:'9-10',q:'m=-1, P(0,5). Ecuacion:',c:'y-5=-1(x-0)',o:['y=-x','y=-x+5','y-0=-1(x-5)']});
t.push({t:'geo-analitica',n:'9-10',q:'Circunferencia centro (h,k) radio r:',c:'(x-h)²+(y-k)²=r²',o:['x²+y²=r²','(x+h)²+(y+k)²=r²','(x-h)+(y-k)=r']});
t.push({t:'geo-analitica',n:'9-10',q:'C(0,0), r=5. Ecuacion:',c:'x²+y²=25',o:['x²+y²=5','(x-5)²+(y-5)²=5','x+y=25']});
t.push({t:'geo-analitica',n:'9-10',q:'C(2,3), r=4. Ecuacion:',c:'(x-2)²+(y-3)²=16',o:['(x+2)²+(y+3)²=16','(x-2)+(y-3)=4','x²+y²=16']});
t.push({t:'geo-analitica',n:'9-10',q:'x²+y²=36. Radio:',c:'6',o:['36','18','6√6','12']});
t.push({t:'geo-analitica',n:'9-10',q:'Parametro elipse:',c:'a² = b² + c²',o:['a² + b² = c²','a = b + c','a² - b² = c²']});
t.push({t:'geo-analitica',n:'9-10',q:'Parabola y²=4px. Foco:',c:'(p,0)',o:['(0,p)','(p,p)','(-p,0)']});
t.push({t:'geo-analitica',n:'9-10',q:'Parabola x²=4py. Foco:',c:'(0,p)',o:['(p,0)','(0,-p)','(p,p)']});
t.push({t:'geo-analitica',n:'9-10',q:'y²=8x. p =',c:'2',o:['8','4','2','16']});
t.push({t:'geo-analitica',n:'9-10',q:'x²=12y. p =',c:'3',o:['12','6','3','24']});
t.push({t:'geo-analitica',n:'9-10',q:'Elipse: x²/a² + y²/b² = 1. a es:',c:'Semieje mayor',o:['Semieje menor','Distancia focal','Excentricidad']});
t.push({t:'geo-analitica',n:'9-10',q:'Hiperbola: x²/a² - y²/b² = 1. Pendiente asintotas:',c:'±b/a',o:['±a/b','±b²/a²','±a²/b²']});
t.push({t:'geo-analitica',n:'9-10',q:'Elipse x²/25 + y²/16 = 1. a =',c:'5',o:['25','4','16','3']});
t.push({t:'geo-analitica',n:'9-10',q:'Elipse x²/25 + y²/16 = 1. b =',c:'4',o:['5','16','25','3']});
t.push({t:'geo-analitica',n:'9-10',q:'Distancia focal: c² =',c:'a² - b² (elipse)',o:['a² + b²','2a - 2b','a² * b²']});
t.push({t:'geo-analitica',n:'9-10',q:'Excentricidad e = c/a. Elipse e:',c:'0 < e < 1',o:['e=0','e=1','e>1']});
t.push({t:'geo-analitica',n:'9-10',q:'Hiperbola: c² =',c:'a² + b²',o:['a² - b²','2a + 2b','a² * b²']});
t.push({t:'geo-analitica',n:'9-10',q:'Recta en forma general:',c:'Ax + By + C = 0',o:['y=mx+b','Ax+By=C','y=m(x-h)+k']});
t.push({t:'geo-analitica',n:'9-10',q:'Forma simetrica: x/a + y/b = 1. a:',c:'Interseccion en x',o:['Pendiente','Interseccion en y','Origen']});
console.log('geo-analitica:',t.length);
})();

// === RADICALES (+60 to reach ~146) ===
(()=>{
for(let i=2;i<=20;i++){t.push({t:'radicales',n:'7-9',q:`√${i*i} =`,c:`${i}`,o:[`${i-1}`,`${i+1}`,`${i*i}`]});}
for(let i=2;i<=15;i++){t.push({t:'radicales',n:'8-9',q:`√${i*i*4} =`,c:`${2*i}`,o:[`${i}`,`${4*i}`,`${i*2+1}`]});}
for(let i=2;i<=10;i++){t.push({t:'radicales',n:'9-10',q:`∛${i*i*i} =`,c:`${i}`,o:[`${i*i}`,`${i+1}`,`${3*i}`]});}
t.push({t:'radicales',n:'7-9',q:'√4 =',c:'2',o:['-2','±2','4']});
t.push({t:'radicales',n:'7-9',q:'√9 =',c:'3',o:['±3','9','81']});
t.push({t:'radicales',n:'7-9',q:'√16 =',c:'4',o:['±4','8','256']});
t.push({t:'radicales',n:'7-9',q:'√25 =',c:'5',o:['±5','25','125']});
t.push({t:'radicales',n:'7-9',q:'√36 =',c:'6',o:['±6','18','216']});
t.push({t:'radicales',n:'7-9',q:'√49 =',c:'7',o:['±7','14','343']});
t.push({t:'radicales',n:'7-9',q:'√64 =',c:'8',o:['±8','32','128']});
t.push({t:'radicales',n:'7-9',q:'√81 =',c:'9',o:['±9','27','162']});
t.push({t:'radicales',n:'7-9',q:'√100 =',c:'10',o:['±10','50','1000']});
t.push({t:'radicales',n:'7-9',q:'√121 =',c:'11',o:['±11','22','1331']});
t.push({t:'radicales',n:'7-9',q:'√144 =',c:'12',o:['±12','24','1728']});
t.push({t:'radicales',n:'8-9',q:'√8 =',c:'2√2',o:['4√2','2√4','√(4*2)=2√2','8']});
t.push({t:'radicales',n:'8-9',q:'√12 =',c:'2√3',o:['3√2','2√3','√(4*3)=2√3','6']});
t.push({t:'radicales',n:'8-9',q:'√18 =',c:'3√2',o:['2√3','√(9*2)=3√2','6','2√6']});
t.push({t:'radicales',n:'8-9',q:'√20 =',c:'2√5',o:['4√5','2√5','√(4*5)=2√5','10']});
t.push({t:'radicales',n:'8-9',q:'√27 =',c:'3√3',o:['√(9*3)=3√3','9','3','√81']});
t.push({t:'radicales',n:'8-9',q:'√32 =',c:'4√2',o:['√(16*2)=4√2','8','16','2√4']});
t.push({t:'radicales',n:'8-9',q:'√45 =',c:'3√5',o:['√(9*5)=3√5','15','5√3','9']});
t.push({t:'radicales',n:'8-9',q:'√48 =',c:'4√3',o:['√(16*3)=4√3','12','6√2','24']});
t.push({t:'radicales',n:'8-9',q:'√50 =',c:'5√2',o:['√(25*2)=5√2','10','25','2√5']});
t.push({t:'radicales',n:'8-9',q:'√72 =',c:'6√2',o:['√(36*2)=6√2','12','36','8√3']});
t.push({t:'radicales',n:'8-9',q:'√75 =',c:'5√3',o:['√(25*3)=5√3','15','25','3√5']});
t.push({t:'radicales',n:'8-9',q:'√98 =',c:'7√2',o:['√(49*2)=7√2','14','49','2√7']});
t.push({t:'radicales',n:'9-10',q:'√2 * √8 =',c:'4',o:['√(2*8)=√16=4','2√2','8','√10']});
t.push({t:'radicales',n:'9-10',q:'√3 * √12 =',c:'6',o:['√(3*12)=√36=6','3√3','12','√15']});
t.push({t:'radicales',n:'9-10',q:'√5 * √20 =',c:'10',o:['√(5*20)=√100=10','5√5','20','√25']});
t.push({t:'radicales',n:'9-10',q:'√2 * √32 =',c:'8',o:['√64=8','2√2','4','16']});
t.push({t:'radicales',n:'9-10',q:'√18 / √2 =',c:'3',o:['√(18/2)=√9=3','3√2','2','9']});
t.push({t:'radicales',n:'9-10',q:'√50 / √2 =',c:'5',o:['√(50/2)=√25=5','5√2','2','25']});
t.push({t:'radicales',n:'9-10',q:'√32 / √8 =',c:'2',o:['√(32/8)=√4=2','4','2√2','8']});
t.push({t:'radicales',n:'9-10',q:'Racionalizar 1/√2:',c:'√2/2',o:['√2','2/√2','(√2)/2','1/√2 ya esta']});
t.push({t:'radicales',n:'9-10',q:'Racionalizar 1/√3:',c:'√3/3',o:['√3','3/√3','(√3)/3','1/3']});
t.push({t:'radicales',n:'9-10',q:'Racionalizar 2/√5:',c:'(2√5)/5',o:['√5/2','2/5','(2√5)/5','2√5']});
t.push({t:'radicales',n:'9-10',q:'Racionalizar 3/√6:',c:'(3√6)/6 = √6/2',o:['√6','3/6','(3√6)/6 = √6/2','3√6']});
t.push({t:'radicales',n:'9-10',q:'Racionalizar 1/(√2+1):',c:'√2-1',o:['(√2-1)/(2-1)=√2-1','√2+1','1-√2','2-√2']});
t.push({t:'radicales',n:'9-10',q:'Racionalizar 1/(√3-1):',c:'(√3+1)/2',o:['(√3+1)/(3-1)=(√3+1)/2','√3+1','(√3-1)/2','1-√3']});
t.push({t:'radicales',n:'9-10',q:'(√2+√3)² =',c:'5 + 2√6',o:['2+2√6+3=5+2√6','5','5+√6','(√2)²+(√3)²=5']});
t.push({t:'radicales',n:'9-10',q:'(√5-√2)² =',c:'7 - 2√10',o:['5-2√10+2=7-2√10','3','7-√10','5-2=3']});
t.push({t:'radicales',n:'9-10',q:'(√3+√2)(√3-√2) =',c:'1',o:['(3-2)=1','√3+√2','√6','5']});
t.push({t:'radicales',n:'9-10',q:'(√7+√3)(√7-√3) =',c:'4',o:['(7-3)=4','7+3=10','√4=2','√21']});
t.push({t:'radicales',n:'9-10',q:'√(-4) es:',c:'No real (imaginario)',o:['-2','±2','2i']});
t.push({t:'radicales',n:'7-9',q:'∛8 =',c:'2',o:['4','8','2√2']});
t.push({t:'radicales',n:'7-9',q:'∛27 =',c:'3',o:['9','27','√27']});
t.push({t:'radicales',n:'7-9',q:'∛64 =',c:'4',o:['8','16','32']});
t.push({t:'radicales',n:'7-9',q:'∛125 =',c:'5',o:['25','15','√125']});
t.push({t:'radicales',n:'7-9',q:'√(x²) =',c:'|x|',o:['x','±x','x²']});
t.push({t:'radicales',n:'9-10',q:'√(a²b) =',c:'a√b',o:['b√a','√a * √b','a²√b']});
console.log('radicales:',t.length);
})();

// === POLINOMIOS (+60 to reach ~149) ===
(()=>{
for(let i=0;i<15;i++){const a=R(1,5),b=R(1,5);t.push({t:'polinomios',n:'7-9',q:`(${a}x + ${b}) + (${b}x + ${a}) =`,c:`${a+b}x + ${b+a}`,o:[`${a}x + ${b}`,`${a+b}x + ${a}`,`${a}x + ${b+a}`]});}
for(let i=0;i<10;i++){const a=R(1,5),b=R(1,5),c=R(1,5);t.push({t:'polinomios',n:'7-9',q:`(${a}x² + ${b}x) + (${c}x + ${a}) =`,c:`${a}x² + ${b+c}x + ${a}`,o:[`${a}x² + ${b}x + ${a}`,`${a}x² + ${c}x`,`${a+c}x² + ${b}x`]});}
for(let i=0;i<10;i++){const a=R(1,5),b=R(1,5);t.push({t:'polinomios',n:'7-9',q:`(${a}x + ${b}) - (${b}x + ${a}) =`,c:`${a-b}x + ${b-a}`,o:[`${a+b}x + ${a+b}`,`${a-b}x + ${a-b}`,`${b-a}x + ${a-b}`]});}
for(let i=0;i<10;i++){const a=R(1,5),b=R(1,5),c=R(2,4);t.push({t:'polinomios',n:'7-9',q:`${c}(${a}x + ${b}) =`,c:`${c*a}x + ${c*b}`,o:[`${c*a}x + ${b}`,`${a}x + ${c*b}`,`${c*a}x + ${c*b+1}`]});}
t.push({t:'polinomios',n:'7-9',q:'Grado de 3x^5 + 2x^3 + x:',c:'5',o:['3','2','1']});
t.push({t:'polinomios',n:'7-9',q:'Grado de 4x^8 - 2x^4 + 7:',c:'8',o:['4','2','7']});
t.push({t:'polinomios',n:'7-9',q:'Grado de 5x^3 - 2x + 1:',c:'3',o:['5','1','0']});
t.push({t:'polinomios',n:'7-9',q:'Grado de 7 (constante):',c:'0',o:['7','1','-1']});
t.push({t:'polinomios',n:'7-9',q:'Grado de x + x² + x³:',c:'3',o:['1','2','x']});
t.push({t:'polinomios',n:'7-9',q:'(x+2)(x+3) =',c:'x²+5x+6',o:['x²+6x+5','x²+5x+5','x²+6x+6']});
t.push({t:'polinomios',n:'7-9',q:'(x-2)(x+2) =',c:'x²-4',o:['x²+4','x²-4x+4','x²-4x-4']});
t.push({t:'polinomios',n:'7-9',q:'(x+1)² =',c:'x²+2x+1',o:['x²+1','x²+2x+2','(x+1)(x+1)=x²+2x+1']});
t.push({t:'polinomios',n:'7-9',q:'(x-3)² =',c:'x²-6x+9',o:['x²-6x-9','(x-3)(x-3)=x²-6x+9','x²+6x+9','x²-9']});
t.push({t:'polinomios',n:'7-9',q:'(2x+1)² =',c:'4x²+4x+1',o:['4x²+2x+1','4x²+4x+2','2x²+4x+1']});
t.push({t:'polinomios',n:'8-9',q:'(x+2)(x²-2x+4) =',c:'x³+8',o:['x³+8','x³-8','x³-2x²+4x+2','x²+2']});
t.push({t:'polinomios',n:'8-9',q:'(x-2)(x²+2x+4) =',c:'x³-8',o:['(x-2)(x²+2x+4)=x³-8','x³+8','x³-2x²+4x-8','x²-8']});
t.push({t:'polinomios',n:'8-9',q:'Dividir (x²+5x+6)/(x+2) =',c:'x+3',o:['x+2','x+4','x+3']});
t.push({t:'polinomios',n:'8-9',q:'Dividir (x²-3x+2)/(x-1) =',c:'x-2',o:['x-1','x-2','x+1']});
t.push({t:'polinomios',n:'8-9',q:'Dividir (x²-9)/(x-3) =',c:'x+3',o:['x-3','x+3','x-1']});
t.push({t:'polinomios',n:'8-9',q:'Dividir (x³-8)/(x-2) =',c:'x²+2x+4',o:['(x³-8)/(x-2)=x²+2x+4','x²-2x+4','x²+2x-4','x²+4']});
t.push({t:'polinomios',n:'8-9',q:'Dividir (x³+27)/(x+3) =',c:'x²-3x+9',o:['x²+3x+9','x²-3x+9','x²-3x-9','x²+9']});
t.push({t:'polinomios',n:'7-9',q:'Coeficiente de x² en 3x²+2x+1:',c:'3',o:['2','1','3']});
t.push({t:'polinomios',n:'7-9',q:'Termino independiente de 5x³-3x+7:',c:'7',o:['5','-3','1']});
t.push({t:'polinomios',n:'7-9',q:'Polinomio ordenado: 3-2x+x²+x³. En orden descendente:',c:'x³+x²-2x+3',o:['3-2x+x²+x³','-2x+3+x²+x³','x³+x²-2x-3']});
t.push({t:'polinomios',n:'7-9',q:'Polinomio completo en x: x³+0x²+2x-1. Falta termino:',c:'x²',o:['x³','x','constante']});
t.push({t:'polinomios',n:'8-9',q:'Teorema del residuo: P(a) es residuo de P(x)/(x-a). P(2) en x²-3x+2:',c:'0',o:['2²-3*2+2=0','1','-1','2']});
t.push({t:'polinomios',n:'8-9',q:'(x-a) es factor si P(a)=',c:'0',o:['1','-1','a']});
t.push({t:'polinomios',n:'8-9',q:'x-2 es factor de x²-5x+6. P(2)=',c:'0',o:['4-10+6=0','2','-2','1']});
t.push({t:'polinomios',n:'8-9',q:'x+1 es factor de x³+1. P(-1)=',c:'0',o:['-1+1=0','2','1','-2']});
t.push({t:'polinomios',n:'8-9',q:'Raiz de polinomio: P(x)=0. Raiz de x²-4:',c:'±2',o:['x=±2','2','4','-4']});
t.push({t:'polinomios',n:'8-9',q:'Raiz de x²-5x+6:',c:'2 y 3',o:['(x-2)(x-3)=0 → 2 y 3','2','3','5']});
t.push({t:'polinomios',n:'8-9',q:'Raiz de x²+4x+3:',c:'-1 y -3',o:['(x+1)(x+3)=0 → -1 y -3','1 y 3','-1 y 3','1 y -3']});
t.push({t:'polinomios',n:'9-10',q:'Identidad: (a+b)² =',c:'a² + 2ab + b²',o:['a² + b²','a²-2ab+b²','(a+b)(a-b)']});
t.push({t:'polinomios',n:'9-10',q:'Identidad: (a-b)² =',c:'a² - 2ab + b²',o:['a² + 2ab + b²','a² - b²','(a-b)(a+b)']});
t.push({t:'polinomios',n:'9-10',q:'Identidad: (a+b)(a-b) =',c:'a² - b²',o:['a² + b²','(a-b)²','a² + 2ab + b²']});
t.push({t:'polinomios',n:'9-10',q:'(a+b)³ =',c:'a³+3a²b+3ab²+b³',o:['a³+b³','a³+3ab+b³','a³+2a²b+2ab²+b³']});
t.push({t:'polinomios',n:'9-10',q:'a³+b³ =',c:'(a+b)(a²-ab+b²)',o:['(a+b)³','(a+b)(a²+ab+b²)','(a+b)(a²-2ab+b²)']});
t.push({t:'polinomios',n:'9-10',q:'a³-b³ =',c:'(a-b)(a²+ab+b²)',o:['(a-b)³','(a-b)(a²-ab+b²)','(a+b)(a²-ab+b²)']});
t.push({t:'polinomios',n:'7-9',q:'(x+y)+(2x-3y) =',c:'3x-2y',o:['(x+y)+(2x-3y)=3x-2y','3x+2y','x-2y','2x-y']});
t.push({t:'polinomios',n:'7-9',q:'(3x²+2x-1)+(x²-3x+4) =',c:'4x²-x+3',o:['(3x²+2x-1)+(x²-3x+4)=4x²-x+3','4x²+5x+5','4x²-x+5','3x²-x+3']});
t.push({t:'polinomios',n:'7-9',q:'(5x³-2x²+3x)-(2x³+x²-x) =',c:'3x³-3x²+4x',o:['5x³-2x²+3x-2x³-x²+x=3x³-3x²+4x','3x³-3x²+2x','3x³-2x²+2x','7x³-3x²+2x']});
console.log('polinomios:',t.length);
})();

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<t.length;i++){
    const e=t[i];const src=S+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.q,'',JSON.stringify({o:res.o,ci:res.ci}),JSON.stringify([{math:e.q,expl:''}]),null,'facil','mep',2025,src,A,null,e.n||'8-9']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
