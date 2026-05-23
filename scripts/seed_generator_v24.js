process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='bxm-practica-2025';const A='BXM-PRACTICA.pdf';

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function opts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}

const answerMap={1:'C',2:'B',3:'A',4:'A',5:'B',6:'C',7:'C',8:'A',9:'D',10:'B',11:'A',12:'C',13:'B',14:'C',15:'A',16:'D',17:'B',18:'A',19:'B',20:'C',21:'C',22:'B',23:'A',24:'C',25:'A',26:'B',27:'C',28:'A',29:'C',30:'B',31:'B',32:'A',33:'B',34:'C',35:'A',36:'B',37:'B',38:'A',39:'D',40:'A',41:'D',42:'B',43:'B',44:'D',45:'C',46:'A',47:'A',48:'A',49:'B',50:'C',51:'A',52:'B',53:'C',54:'A',55:'B',56:'D',57:'A',58:'B',59:'A',60:'C'};

const items=[
{id:1,topic:'geo-analitica',n:'10-11',q:'Circunferencia c con centro O(0,2) que pasa por (5,2) y (0,-1). Su ecuacion es:',a:'x^2+(y-2)^2=9',A:'x^2+(y+2)^2=6',B:'x^2+(y-2)^2=6',C:'x^2+(y-2)^2=9',D:'x^2+(y+2)^2=9'},
{id:2,topic:'geo-analitica',n:'10-11',q:'c: (x+2)^2+(y-2)^2=8. Cual es un punto EXTERIOR a c?',a:'(0,0)',A:'(0,0)',B:'(1,1)',C:'(-4,2)',D:'(-2,4)'},
{id:3,topic:'geo-analitica',n:'10-11',q:'Ecuacion de circunferencia con centro (-3,2) y radio 4:',a:'(x+3)^2+(y-2)^2=16',A:'(x+3)^2+(y-2)^2=16',B:'(x-3)^2+(y+2)^2=16',C:'(x-3)^2+(y+2)^2=8',D:'(x+3)^2+(y-2)^2=8'},
{id:4,topic:'geo-analitica',n:'10-11',q:'Circunferencia c con centro P(-3,1) y radio 6. Recta tangente a c:',a:'y=7',A:'y=7',B:'y=2',C:'x=-4',D:'x=-10'},
{id:5,topic:'geo-analitica',n:'10-11',q:'Circunferencia c con puntos en x=-4 y x=-7. Recta secante a c:',a:'x=-1',A:'x=-1',B:'x=-5',C:'y=-4',D:'y=-3'},
{id:6,topic:'geo-analitica',n:'10-11',q:'Circunferencia c y recta r con un unico punto en comun D. r es perpendicular a la recta que contiene los puntos:',a:'D y O',A:'D y B',B:'D y M',C:'D y O',D:'D y E'},
{id:7,topic:'geo-analitica',n:'10-11',q:'Circunferencia d centro O(-3,4) con punto en (3,4). Se traslada 5 izq, 3 abajo. Nuevo centro:',a:'(-1,-3)',A:'(1,3)',B:'(3,1)',C:'(-1,-3)',D:'(-3,-1)'},
{id:8,topic:'geo-analitica',n:'10-11',q:'c:(x-2)^2+(y-3)^2=4 se traslada 2 izq, 3 arriba. d resultante tiene centro en:',a:'(0,6)',A:'(0,6)',B:'(4,0)',C:'(-2,2)',D:'(2,2)'},
{id:9,topic:'geometria',n:'10-11',q:'Poligono ABCDE con A(1,1), B(7,1), C(8,5)?, D(3,10)?, E(0,5)?. Perimetro:',a:'19+√10+√53',A:'19+√63',B:'14+√63',C:'14+√10+√53',D:'19+√10+√53'},
{id:10,topic:'geometria',n:'10-11',q:'Apotema de hexagono regular es 2√3. Su area es:',a:'24√3',A:'18√3',B:'24√3',C:'20√3',D:'12√3'},
{id:11,topic:'geometria',n:'10-11',q:'Diagonal de poligono regular = 3√2 y angulo externo = 90°. Su area:',a:'9',A:'9',B:'6',C:'18',D:'12'},
{id:12,topic:'geometria',n:'10-11',q:'Lado de poligono regular = 4 y angulo central = 72°. Perimetro:',a:'20',A:'16',B:'18',C:'20',D:'22'},
{id:13,topic:'geometria',n:'10-11',q:'Figuras #1 y #2 son simetricas respecto a la recta:',a:'y=-1',A:'y=0',B:'y=-1',C:'x=-3',D:'x=-1'},
{id:14,topic:'geometria',n:'10-11',q:'Punto homologo de G respecto al eje y:',a:'M',A:'D',B:'K',C:'M',D:'B'},
{id:15,topic:'geometria',n:'10-11',q:'Cuadrilatero ADCB con A(-7,4), B(-2,4), C(-4,8), D(-7,8)? CB es homologo con AB respecto a:',a:'x=-4',A:'x=-4',B:'y=4',C:'y=-4',D:'x=4'},
{id:16,topic:'geometria',n:'10-11',q:'Homotecia centrada en (0,0) aplicada a poligono #2 para obtener #4. Razon de homotecia:',a:'-1',A:'0',B:'1',C:'2',D:'-1'},
{id:17,topic:'geometria',n:'10-11',q:'Para obtener poligono #3 desde #1, la traslacion es:',a:'(x+5,y-4)',A:'(x-5,y+4)',B:'(x+5,y-4)',C:'(x+5,y+4)',D:'(x-5,y-4)'},
{id:18,topic:'geometria',n:'10-11',q:'Rotacion 270° horario centro (0,0) al punto (-1,3). Punto imagen:',a:'(-3,-1)',A:'(-3,-1)',B:'(-3,1)',C:'(3,-1)',D:'(3,1)'},
{id:19,topic:'geometria',n:'10-11',q:'Seccion plana al cortar cono circular recto con plano oblicuo paralelo a generatriz sin pasar por vertice:',a:'Parabola',A:'Elipse',B:'Parabola',C:'Hiperbola',D:'Circunferencia'},
{id:20,topic:'geometria',n:'10-11',q:'Diametro de esfera = 20. Corte a 6 unid del centro. Longitud de seccion:',a:'16π',A:'12π',B:'14π',C:'16π',D:'18π'},
{id:21,topic:'geometria',n:'10-11',q:'Cilindro circular recto, corte perpendicular a bases pasando por centro. Radio=20pulg (1/3 de altura). Area del corte:',a:'2400',A:'1200',B:'1257',C:'2400',D:'3600'},
{id:22,topic:'geometria',n:'10-11',q:'Cono circular recto altura=12, diametro base=18. Corte con plano paralelo a base a 4 unid del vertice. Radio de seccion:',a:'3',A:'2',B:'3',C:'6',D:'9'},
{id:23,topic:'plano-cartesiano',n:'10-11',q:'Cual relacion corresponde a una funcion? (prueba recta vertical):',a:'Grafica A (pasa prueba vertical)',A:'Grafica A',B:'Grafica B',C:'Grafica C',D:'Grafica D'},
{id:24,topic:'plano-cartesiano',n:'10-11',q:'Cual relacion corresponde a una funcion? (tablas):',a:'Tabla C (x=0,1,2,3; y=2,2,2,2)',A:'x:-1,1,2,2; y:0,1,2,3',B:'x:1,1,1,1; y:-1,0,1,2',C:'x:0,1,2,3; y:2,2,2,2',D:'x:-1,1,2,2; y:0,1,2,3'},
{id:25,topic:'plano-cartesiano',n:'10-11',q:'Funcion f con grafica que pasa por (-1,0),(0,?),(2,2),(3,?),(4,?). Dominio para que m (subfuncion) tenga inversa:',a:'[-1,0]',A:'[-1,0]',B:'[-1,2]',C:'[-1,3]',D:'[-1,4]'},
{id:26,topic:'plano-cartesiano',n:'10-11',q:'(f ◦ h)(-1) con h(x)=x+1 y f dada por grafica. f(0)=? en grafica:',a:'2',A:'0',B:'2',C:'3',D:'-1'},
{id:27,topic:'plano-cartesiano',n:'10-11',q:'(k ◦ ___)(x) con k:[-4,0]->[0,4], k(x)=x+4. Cual funcion permite composicion?',a:'g([-2,2]->[-4,0], g(x)=x^2-4)',A:'h([-2,3]->[-1,4], h(x)=x+1)',B:'f(dom[-1,4], grafica)',C:'g([-2,2]->[-4,0], g(x)=x^2-4)',D:'r([-1,4]->[-2,3], r(x)=x-1)'},
{id:28,topic:'plano-cartesiano',n:'10-11',q:'g(x)=√x. Para obtener f(x)=√(x-5) se aplica a g:',a:'Traslacion horizontal',A:'Traslacion horizontal',B:'Traslacion vertical',C:'Homotecia',D:'Rotacion'},
{id:29,topic:'plano-cartesiano',n:'10-11',q:'h:[5,∞[->P, h(x)=3√(x-5)+1. Ambito de inversa de h:',a:'[1,∞[',A:'[1,∞[',B:'[4,∞[',C:'[5,∞[',D:'[3,∞['},
{id:30,topic:'plano-cartesiano',n:'10-11',q:'f(x)=(-2k+4)x+3. Valor de k para que f sea creciente:',a:'0',A:'3',B:'0',C:'4',D:'2'},
{id:31,topic:'plano-cartesiano',n:'10-11',q:'f(x)=ax^2+bx+c, parabola abre hacia abajo con vertice sobre eje y. Afirmacion verdadera:',a:'c<0',A:'a<0',B:'c<0',C:'c=0',D:'(0,0) es elemento de f'},
{id:32,topic:'plano-cartesiano',n:'10-11',q:'Intervalo donde f (parabola) es negativa (raices p<0 y h>0):',a:']p,h[',A:']p,h[',B:']p,0[',C:']-∞,p[',D:']h,∞['},
{id:33,topic:'exp-log',n:'10-11',q:'Inversa de f(x)=2^x:',a:'k(x)=log2(x)',A:'g(x)=(1/2)^x',B:'k(x)=log2(x)',C:'h(x)=log_{1/2}(x)',D:'r(x)=2log(x)'},
{id:34,topic:'exp-log',n:'10-11',q:'f(x)=log_a(x) con 0<a<1. Si x>1, entonces:',a:'f(x)<0',A:'0<f(x)<1',B:'f(x)>1',C:'f(x)<0',D:'f(x)=0'},
{id:35,topic:'plano-cartesiano',n:'10-11',q:'41°F a Celsius usando F(C)=9C/5+32:',a:'5',A:'5',B:'9',C:'-5',D:'-9'},
{id:36,topic:'sistemas-ecuaciones',n:'10-11',q:'Roy: 5kg zanah+3kg broc=4650. Judy: 3kg zanah+5kg broc=5350. kg brocoli:',a:'800',A:'700',B:'800',C:'625',D:'900'},
{id:37,topic:'exp-log',n:'10-11',q:'p(x)=2000·2^(x/5). Anios para que poblacion=8000:',a:'10',A:'15',B:'10',C:'4',D:'5'},
{id:38,topic:'exp-log',n:'10-11',q:'f(x)=log_a(x^20)-log_a(x^2). f(a^5)=',a:'90',A:'90',B:'75',C:'18',D:'10'},
{id:39,topic:'exp-log',n:'10-11',q:'Bacterias se triplican cada hora. Modelo matematico:',a:'Exponencial',A:'Lineal',B:'Cuadratica',C:'Logaritmica',D:'Exponencial'},
{id:40,topic:'exp-log',n:'10-11',q:'Tabla: x=1,2,4,8,64; f(x)=0,-1/2,-1,-3/2,k (funcion logaritmica). k=',a:'-3',A:'-3',B:'-2',C:'-5/2',D:'-4'},
{id:41,topic:'plano-cartesiano',n:'10-11',q:'Tabla I: x=0..4, p(x)=1,3,5,7,9. Tabla II: x=0,4,9,16,25; k(x)=0,4,6,8,10. Modelos:',a:'I lineal, II raiz cuadrada',A:'I raiz cuadrada, II lineal',B:'I cuadratica, II lineal',C:'I lineal, II cuadratica',D:'I lineal, II raiz cuadrada'},
{id:42,topic:'plano-cartesiano',n:'10-11',q:'Tabla I: x=0..4, r(x)=-1,0,3,8,15. Tabla II: x=1,2,4,8,16; t(x)=-1,0,1,2,3. Modelos:',a:'I cuadratica, II logaritmica',A:'I lineal, II cuadratica',B:'I cuadratica, II logaritmica',C:'I logaritmica, II cuadratica',D:'I cuadratica, II lineal'},
{id:43,topic:'estadistica',n:'10-11',q:'Km recorridos: [0,10[=50, [10,20[=30, [20,30]=20. Promedio:',a:'12',A:'8',B:'12',C:'15',D:'20'},
{id:44,topic:'estadistica',n:'10-11',q:'Edades 70 empleados: Min=18, Q1=23, Me=27, Q3=35, Max=57. Afirmacion verdadera:',a:'>=50% tienen entre 23 y 35',A:'>=75% tienen >=27',B:'>=25% tienen <=18',C:'>=50% tienen exactamente 27',D:'>=50% tienen entre 23 y 35'},
{id:45,topic:'estadistica',n:'10-11',q:'Distribucion salarios con asimetria negativa, promedio=$2000. Esto significa:',a:'Mas de la mitad ganan mas de $2000',A:'Mitad gana $2000',B:'Mayoria gana <$2000',C:'Mas de mitad ganan >$2000',D:'Menos de mitad ganan >$2000'},
{id:46,topic:'estadistica',n:'10-11',q:'Tiempos 4 medicos (Min,Q1,Me,Q3,Max). Mayor variabilidad:',a:'Medico 1',A:'Medico 1',B:'Medico 2',C:'Medico 3',D:'Medico 4'},
{id:47,topic:'estadistica',n:'10-11',q:'Entrevistadores R(15,20,23,35,40) y P(19,23,27,38,44). I: igualmente variables. II: RIQR=15. Cuales verdaderas?',a:'Ambas',A:'Ambas',B:'Ninguna',C:'Solo I',D:'Solo II'},
{id:48,topic:'estadistica',n:'10-11',q:'Atletas: Yeri(x=26,σ=0.71), Nora(24,1.0), Iris(25,0.68), Luz(23,0.85). Menor variabilidad:',a:'Iris',A:'Iris',B:'Yeri',C:'Luz',D:'Nora'},
{id:49,topic:'estadistica',n:'10-11',q:'Diagrama cajas: EmpA(19,23,33,38,45), EmpB(19,23,29,33,40). Afirmacion verdadera:',a:'En ambas empresas >=50% tienen 33+',A:'Menor edad es EmpA',B:'En ambas >=50% tienen 33+',C:'EmpB >=25% entre 19-23',D:'Con certeza ambas tienen empleado de 23'},
{id:50,topic:'estadistica',n:'10-11',q:'Diagrama cajas: EmpA vs EmpB. Afirmacion verdadera:',a:'A tiene menor variabilidad que B',A:'Igualmente variables',B:'A mayor variabilidad que B',C:'A menor variabilidad que B',D:'Promedio igual a 33 en ambas'},
{id:51,topic:'estadistica',n:'10-11',q:'Andrea 5km. Comp1:24m, x=23, σ=5. Comp2:23,22,4. Comp3:25,23,4. Comp4:26,22,5. Mejor posicion relativa:',a:'Competencia 1',A:'1',B:'2',C:'3',D:'4'},
{id:52,topic:'estadistica',n:'10-11',q:'Grupos H(x=15,σ=4.4), Q(16,4.5), S(18,5.3), P(17,5.0). Menor variabilidad relativa:',a:'Q',A:'H',B:'Q',C:'S',D:'P'},
{id:53,topic:'estadistica',n:'10-11',q:'Grupos: H(15,4.4), Q(16,4.5), S(18,5.3), P(17,5.0). Personas: Sofia(H,15h), Maria(Q,17h), Andres(S,19h), Rosa(P,16h). Mejor posicion relativa:',a:'Maria',A:'Andres',B:'Sofia',C:'Maria',D:'Rosa'},
{id:54,topic:'probabilidad',n:'10-11',q:'Tarjetas 1-12. A=par, B=impar. P(A∪B)=',a:'1',A:'1',B:'0',C:'1/2',D:'1/3'},
{id:55,topic:'probabilidad',n:'10-11',q:'Complemento de evento C:',a:'1-P(C)',A:'P(C)',B:'1-P(C)',C:'1+P(C)',D:'P(C∪D)'},
{id:56,topic:'probabilidad',n:'10-11',q:'B=impar, D=divisible por 3. P(B∩D)=',a:'2/12',A:'1',B:'0',C:'1/12',D:'2/12'},
{id:57,topic:'probabilidad',n:'10-11',q:'Urnas con bolitas: judo, futbol, tenis. Para practicar judo O futbol conviene urna:',a:'1 (7+19=26 de 33)',A:'1',B:'2',C:'3',D:'4'},
{id:58,topic:'probabilidad',n:'10-11',q:'Para NO practicar futbol conviene urna:',a:'4 (9+6=15 de 23=65.2%)',A:'1',B:'2',C:'3',D:'4'},
{id:59,topic:'probabilidad',n:'10-11',q:'Academia: musica(8+4+3+11=26?), pintura(17+4+3+?=?), ballet(11+3+?+?=?). P(matriculado en 2 disciplinas):',a:'7/43',A:'7/43',B:'14/43',C:'15/43',D:'20/43'},
{id:60,topic:'probabilidad',n:'10-11',q:'P(matriculado en las 3 disciplinas):',a:'0',A:'36/43',B:'18/43',C:'0',D:'1'},
];

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<items.length;i++){
    const e=items[i];const src='bxm-'+e.id;
    const optsList=[e.A,e.B,e.C,e.D];
    const letter=answerMap[e.id];const m={A:e.A,B:e.B,C:e.C,D:e.D};const correct=m[letter];
    const res=opts(correct,optsList.filter(x=>x!==correct));
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.topic,e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:'Respuesta segun solucionario BXM 2025'}]),null,'media','mep',2025,src,A,null,e.n||'10-11']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
