process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='bxm-2025-practica';const A='Practica-Matematicas-BxM-2025.pdf';

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function opts(c,o){let all=shuffle([c,...o]);return{o:all,ci:all.indexOf(c)};}

const answerMap={1:'C',2:'A',3:'B',4:'B',5:'A',6:'C',7:'C',8:'B',9:'A',10:'A',11:'C',12:'B',13:'B',14:'A',15:'C',16:'B',17:'C',18:'A',19:'B',20:'C',21:'A',22:'A',23:'C',24:'B',25:'A',26:'C',27:'C',28:'B',29:'A',30:'B',31:'C',32:'A',33:'A',34:'C',35:'B',36:'A',37:'B',38:'A',39:'B',40:'A',41:'C',42:'B',43:'B',44:'A',45:'C',46:'C',47:'B',48:'A',49:'A',50:'C',51:'A',52:'B',53:'B',54:'C',55:'A',56:'C',57:'B',58:'B',59:'A',60:'C'};

const items=[
{id:1,topic:'geo-analitica',n:'10-11',q:'Circunferencia c centro P(-2,3) radio 3. Representacion correcta:',a:'C',A:'Grafica A (centro en (-2,3) radio 3)',B:'Grafica B (centro en (2,-3) radio 3)',C:'Grafica C (centro en (-2,3) radio 3)'},
{id:2,topic:'geo-analitica',n:'10-11',q:'Ecuacion de c: centro P(-2,3) radio 3:',a:'A',A:'(x+2)^2+(y-3)^2=9',B:'(x-2)^2+(y+3)^2=9',C:'(x-2)^2+(y+3)^2=6'},
{id:3,topic:'geo-analitica',n:'10-11',q:'c:(x-1)^2+y^2=2. Punto INTERIOR a c:',a:'B',A:'(0,1)',B:'(1,1)',C:'(-1,0)'},
{id:4,topic:'geo-analitica',n:'10-11',q:'Circunferencia c centro P(-3,1) radio 5. Recta tangente:',a:'B',A:'y=5',B:'x=-8',C:'x=-2'},
{id:5,topic:'geo-analitica',n:'10-11',q:'c:(x-2)^2+(y-1)^2=3, rectas I:y=1, II:y=x+5. Relacion:',a:'A',A:'I secante, II exterior',B:'I exterior, II secante',C:'I tangente, II tangente'},
{id:6,topic:'geo-analitica',n:'10-11',q:'Circunferencia c y recta t tangente en A. Recta perpendicular a t contiene:',a:'C',A:'D y O',B:'D y A',C:'O y A'},
{id:7,topic:'geo-analitica',n:'10-11',q:'c centro O(-2,-1) con punto en (2,-1). Trasladada 6 der. Nueva ecuacion:',a:'C',A:'(x-4)^2+(y-3)^2=4',B:'(x+4)^2+(y+3)^2=4',C:'(x-3)^2+(y+4)^2=4'},
{id:8,topic:'geo-analitica',n:'10-11',q:'d:(x+5)^2+(y-4)^2=13, obtenida al trasladar c 7 izq y 3 arriba. Centro de c:',a:'B',A:'(2,3)',B:'(2,1)',C:'(-8,11)'},
{id:9,topic:'geometria',n:'10-11',q:'Poligono regular, angulo central=60°, apotema=3√3. Perimetro:',a:'A',A:'36',B:'18√3',C:'36√3'},
{id:10,topic:'geometria',n:'10-11',q:'Poligono regular, angulo interno=90°. I: radio=3 => area=18. II: diagonal=3√2 => perim=12.',a:'A',A:'Ambas',B:'Solo I',C:'Solo II'},
{id:11,topic:'geometria',n:'10-11',q:'Poligono AFECB con coordenadas. I: area=24. II: perimetro EDC=8+2√2+2√10.',a:'C',A:'Solo I',B:'Solo II',C:'Ambas'},
{id:12,topic:'geometria',n:'10-11',q:'Poligono regular con 7 diagonales desde un vertice, lado=9. Perimetro:',a:'B',A:'63',B:'90',C:'70'},
{id:13,topic:'geometria',n:'10-11',q:'Figuras A y C son simetricas respecto a:',a:'B',A:'y=0',B:'y=-1',C:'x=-1'},
{id:14,topic:'geometria',n:'10-11',q:'I: C y D simetricas eje y. II: A y B simetricas recta x=1.',a:'A',A:'Ambas',B:'Solo I',C:'Solo II'},
{id:15,topic:'geometria',n:'10-11',q:'Afirmacion correcta sobre ejes de simetria:',a:'C',A:'Triangulo equilatero: 2 ejes',B:'Hexagono regular: 5 ejes',C:'Rectangulo (no cuadrado): 2 ejes'},
{id:16,topic:'geometria',n:'10-11',q:'Triangulo ABC reflejado respecto a x=5. Homologo de A(1,1?) es:',a:'B',A:'(8,1)',B:'(9,1)',C:'(9,3)'},
{id:17,topic:'geometria',n:'10-11',q:'Triangulo ABC: T(x+1,y-2) luego rotacion 90° antihorario. Imagen de C:',a:'C',A:'(1,3)',B:'(-3,1)',C:'(-1,3)'},
{id:18,topic:'geometria',n:'10-11',q:'Homotecia k=2 centro origen al triangulo ABC. Imagen de B(3,?):',a:'A',A:'(8,4)',B:'(8,2)',C:'(6,4)'},
{id:19,topic:'geometria',n:'10-11',q:'Seccion de cono circular recto con plano perpendicular a base sin pasar por vertice:',a:'B',A:'Elipse',B:'Hiperbola',C:'Circunferencia'},
{id:20,topic:'geometria',n:'10-11',q:'Cono diametro base=10. Corte paralelo a base: 6 unid desde cupide, 8 unid a base. Radio seccion:',a:'C',A:'15/4',B:'35/3',C:'15/7'},
{id:21,topic:'geometria',n:'10-11',q:'I: cilindro corte oblicuo sin intersecar bases. II: cono corte oblicuo paralelo a generatriz. Secciones:',a:'A',A:'I elipse, II parabola',B:'I elipse, II hiperbola',C:'I parabola, II hiperbola'},
{id:22,topic:'geometria',n:'10-11',q:'Esfera diametro=12, SO=4 (centro a seccion). Radio de seccion:',a:'A',A:'2√5',B:'8√2',C:'4√10'},
{id:23,topic:'plano-cartesiano',n:'10-11',q:'f(x)=√(x^3+x)/(x). Afirmaciones sobre dominio: I:-1∈D, II:{1}⊂D, III:D={-1,0,1}.',a:'C',A:'Solo I',B:'Solo III',C:'I y II'},
{id:24,topic:'plano-cartesiano',n:'10-11',q:'Cual representacion corresponde a una funcion?',a:'B',A:'Grafica (curva vertical)',B:'Tabla x=2,3,4,5; y=2,2,2,2',C:'Relacion J: D=[-5,5], E={0}, y=x^2-25'},
{id:25,topic:'plano-cartesiano',n:'10-11',q:'Interseccion de ambitos de f y g (graficas):',a:'A',A:'{2}U]3,∞[',B:']-∞,-2[U]3,∞[',C:']-∞,-1[U]0,∞['},
{id:26,topic:'plano-cartesiano',n:'10-11',q:'Inversa de f(x)=∛(15x-6) es f^-1(x)=ax+b:',a:'C',A:'a=-5,b=-2',B:'a=5,b=-2',C:'a=-5,b=2'},
{id:27,topic:'plano-cartesiano',n:'10-11',q:'f:[2,∞[->P, f(x)=√(x-5)+1. Dominio de inversa de f:',a:'C',A:'[2,∞[',B:'[8,∞[',C:'[9,∞['},
{id:28,topic:'plano-cartesiano',n:'10-11',q:'Intervalo de dominio de f (grafica) donde tiene inversa:',a:'B',A:']1,3[',B:']-3,1[',C:']-4,1['},
{id:29,topic:'plano-cartesiano',n:'10-11',q:'Funciones f,h,r,m. I:(h◦f)(4)=-1, II:(f◦r) factible, III:(m◦r) factible.',a:'A',A:'Todas',B:'Solo I y II',C:'Solo II y III'},
{id:30,topic:'plano-cartesiano',n:'10-11',q:'Recta y=-2x+b pasa por (1,3). Interseccion con eje y:',a:'B',A:'(0,1)',B:'(0,5)',C:'(0,7)'},
{id:31,topic:'exp-log',n:'10-11',q:'g(x)=log_{1/2}(x). Afirmacion verdadera:',a:'C',A:'g es creciente',B:'(-1,2) pertenece a g',C:'Inversa g^-1(x)=(0.5)^x'},
{id:32,topic:'exp-log',n:'10-11',q:'f(x)=a^x contiene (3,8). I: f decreciente. II: inversa f^-1(x)=log_3(x).',a:'A',A:'Ninguna',B:'Solo I',C:'Solo II'},
{id:33,topic:'plano-cartesiano',n:'10-11',q:'h(x)=ax^2+bx+c, vertice(1,9), raices -2 y 4. I: ceros en -2 y 4. II: negativa en ]6,10[. III: creciente en ]-20,0].',a:'A',A:'Todas',B:'Solo I y II',C:'Solo II y III'},
{id:34,topic:'plano-cartesiano',n:'10-11',q:'h(x)=ax^2+bx+c, vertice(1,9). Afirmacion correcta:',a:'C',A:'a>0',B:'maximo en x=9',C:'Eje simetria x=1'},
{id:35,topic:'plano-cartesiano',n:'10-11',q:'u(x)=-0.05x^2+40x (utilidad). Unidades para maxima utilidad:',a:'B',A:'20',B:'40',C:'80'},
{id:36,topic:'sistemas-ecuaciones',n:'10-11',q:'Plan A: 300 txt+60 min=18000. Plan B: 200 txt+120 min=24000. Costo por mensaje:',a:'A',A:'30',B:'60',C:'84'},
{id:37,topic:'exp-log',n:'10-11',q:'p(x)=2500·2^(x/4). Anios para duplicar poblacion inicial:',a:'B',A:'2',B:'4',C:'6'},
{id:38,topic:'exp-log',n:'10-11',q:'5^x = 125^a. x =',a:'A',A:'3a',B:'2a',C:'4a'},
{id:39,topic:'exp-log',n:'10-11',q:'Ameba duplica cada minuto. p(t)=',a:'B',A:'p0·2^t',B:'p0·2^t',C:'(p0)^(2t)'},
{id:40,topic:'plano-cartesiano',n:'10-11',q:'Tabla modelo logaritmico:',a:'A',A:'f: x=2,4,8,16,32; f(x)=6,12,18,24,30',B:'g: x=0..4; g(x)=3,6,12,24,48',C:'r: x=0..4; r(x)=3,4,5,6,7'},
{id:41,topic:'plano-cartesiano',n:'10-11',q:'Tabla I: x=0..4, p(x)=0,2,8,18,32. II: x=0..4, k(x)=-1,0,3,8,15. Modelos:',a:'C',A:'I lineal, II lineal',B:'I cuadratica, II lineal',C:'I cuadratica, II cuadratica'},
{id:42,topic:'plano-cartesiano',n:'10-11',q:'Tablas I f(x)=1,2,3,4; II g(x)=0,2,4,6,8; III r(x)=2,4,8,16,32. Modelos:',a:'B',A:'I lineal, II exp, III raiz',B:'I lineal, II raiz, III exp',C:'I raiz, II exp, III lineal'},
{id:43,topic:'estadistica',n:'10-11',q:'Horas deportistas: [0,4[=3, [4,8[=5, [8,12]=2. Promedio:',a:'B',A:'6.4',B:'5.6',C:'7.6'},
{id:44,topic:'estadistica',n:'10-11',q:'Puntajes equipo A: 96,102,...,96. B: Min=90,Q1=94,Me=98,Q3=102,Max=106,x=98,Mo=95. I: A promedio 2 mas que B. II: Min igual.',a:'A',A:'Ninguna',B:'Solo I',C:'Solo II'},
{id:45,topic:'estadistica',n:'10-11',q:'I: B distribucion simetrica. II: A asimetria positiva.',a:'C',A:'Solo I',B:'Solo II',C:'Ambas'},
{id:46,topic:'estadistica',n:'10-11',q:'Horas estudio: Min=8,Q1=14,Me=22,Q3=?,Max=30. RIQ=12. I: >=25% estudiaron 26+. II: alguno 26. III: >=50% entre 14-26.',a:'C',A:'Todas',B:'Solo II',C:'Solo I y III'},
{id:47,topic:'estadistica',n:'10-11',q:'Notas quimica: Min=?,Q1=80,Me=88,Q3=?,Max=100. Rango=22, aprueba con 75. I: todos aprobaron. II: hubo nota 78. III: hubo nota 80.',a:'B',A:'Todas',B:'Solo I y II',C:'Solo II y III'},
{id:48,topic:'estadistica',n:'10-11',q:'Notas quimica. I: hubo nota 88. II: RIQ=14 => >=50% entre 80-94. III: >=25% >=94.',a:'A',A:'Solo II y III',B:'Solo I',C:'Todas'},
{id:49,topic:'estadistica',n:'10-11',q:'Grupo A(50,60,70,80,90) y B(50,60,80,90,100), 32 est, aprueba>=80. I: A>=16 aprobaron, B>=24 reprobaron. II: >=25% <=60. III: rango A>B.',a:'A',A:'Todas',B:'Solo I y II',C:'Solo II y III'},
{id:50,topic:'estadistica',n:'10-11',q:'Tiempos ciclismo grupo 1(19,22,30,38,42) grupo 2(15,26,30,40,?). I: peor tiempo grupo 2. II: mejor tiempo grupo 1.',a:'C',A:'Solo I',B:'Solo II',C:'Ninguna'},
{id:51,topic:'estadistica',n:'10-11',q:'Tiempos ciclismo, clasifica <=30min. Afirmacion correcta:',a:'A',A:'Mas clasificados grupo 2',B:'Solo 25% grupo 1 clasifico',C:'Ambos tuvieron alguien con 30min'},
{id:52,topic:'estadistica',n:'10-11',q:'Equipos M(x=174,σ=6), N(170,5), P(175,8). Menor variabilidad relativa:',a:'B',A:'M',B:'N',C:'P'},
{id:53,topic:'estadistica',n:'10-11',q:'Integrantes: M(174,6,174), N(170,5,172), P(175,8,170). Mejor posicion relativa:',a:'B',A:'M',B:'N',C:'P'},
{id:54,topic:'probabilidad',n:'10-11',q:'Dos monedas. A=CC, B=al menos un escudo, D=CE. I: P(A∪B)=1. II: P(A∩B)=0.',a:'C',A:'Solo I',B:'Solo II',C:'Ambas'},
{id:55,topic:'probabilidad',n:'10-11',q:'Dos monedas. I: 0<P(B∪D)<1. II: D^c={EE,CC}.',a:'A',A:'Ambas',B:'Solo I',C:'Solo II'},
{id:56,topic:'probabilidad',n:'10-11',q:'AyB eventos, espacio muestral, con elemento comun. P(A)=0.6, P(B)=0.65. P(A∩B)=',a:'C',A:'0.35',B:'0.40',C:'0.25'},
{id:57,topic:'probabilidad',n:'10-11',q:'Urnas: E(2B,4A,3V), F(3B,5A,4V), G(3B,8A,6V). Menor P(blanca o azul):',a:'B',A:'E',B:'G',C:'F'},
{id:58,topic:'probabilidad',n:'10-11',q:'Mayor P(blanca o verde):',a:'B',A:'E',B:'F',C:'G'},
{id:59,topic:'probabilidad',n:'10-11',q:'Academia idiomas: M(15I,18P,11It=44), H(14I,12P,16It=42). P(hombre ingles o mujer italiano):',a:'A',A:'27/86',B:'56/86',C:'69/86'},
{id:60,topic:'probabilidad',n:'10-11',q:'P(mujer ingles o hombre portugues):',a:'C',A:'71/86',B:'59/86',C:'27/86'},
];

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<items.length;i++){
    const e=items[i];const src='bxm25-'+e.id;
    const letter=answerMap[e.id];const m={A:e.A,B:e.B,C:e.C};const correct=m[letter];
    if(!correct){console.log('MISSING correct for item',e.id,', answer was',letter);continue;}
    const optsList=[e.A,e.B,e.C];
    const res=opts(correct,optsList.filter(x=>x!==correct));
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.topic,e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:'Respuesta segun solucionario BxM 2025'}]),null,'media','mep',2025,src,A,null,e.n||'10-11']);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
