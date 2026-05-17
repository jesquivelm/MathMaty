process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v7';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rnd(0,a.length-1)];}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === TEC-VERBAL (40) ===
  {t:'tec-verbal',q:'Sinonimo de "evaluar":',c:'Valorar',o:['Ignorar','Eliminar','Crear']},
  {t:'tec-verbal',q:'Antonimo de "abstracto":',c:'Concreto',o:['Complejo','Teorico','Ideal']},
  {t:'tec-verbal',q:'Sinonimo de "subterfugio":',c:'Escape',o:['Enfrentamiento','Solucion','Camino']},
  {t:'tec-verbal',q:'Sinonimo de "conjetura":',c:'Hipotesis',o:['Cereteza','Prueba','Resultado']},
  {t:'tec-verbal',q:'Antonimo de "beligerante":',c:'Pacfico',o:['Agresivo','Guerrero','Fuerte']},
  {t:'tec-verbal',q:'Sinonimo de "paradoja":',c:'Contradiccion',o:['Logica','Evidencia','Claridad']},
  {t:'tec-verbal',q:'"Petreo" significa relativo a:',c:'Piedra',o:['Agua','Fuego','Aire']},
  {t:'tec-verbal',q:'"Acuatico" significa relativo a:',c:'Agua',o:['Aire','Tierra','Fuego']},
  {t:'tec-verbal',q:'Sinonimo de "frugal":',c:'Moderado',o:['Derrochador','Excesivo','Abundante']},
  {t:'tec-verbal',q:'Antonimo de "clarividencia":',c:'Ceguera',o:['Vision','Percepcion','Intuicion']},
  {t:'tec-verbal',q:'"Omnipotente" significa:',c:'Que todo lo puede',o:['Que todo lo sabe','Que todo lo ve','Que todo lo oye']},
  {t:'tec-verbal',q:'"Omnisciente" significa:',c:'Que todo lo sabe',o:['Que todo lo puede','Que todo lo ve','Que todo lo oye']},
  {t:'tec-verbal',q:'Sinonimo de "efimero":',c:'Transitorio',o:['Eterno','Duradero','Perenne']},
  {t:'tec-verbal',q:'Antonimo de "prologo":',c:'Epilogo',o:['Capitulo','Introduccion','Indice']},
  {t:'tec-verbal',q:'"Filantropo" es alguien que:',c:'Ama a la humanidad',o:['Odia a la humanidad','Ama la filosofia','Estudia el lenguaje']},
  {t:'tec-verbal',q:'"Misantropo" es alguien que:',c:'Odia a la humanidad',o:['Ama a la humanidad','Ama la soledad','Estudia los mitos']},
  {t:'tec-verbal',q:'Sinonimo de "vehemente":',c:'Apasionado',o:['Apatio','Tibio','Lento']},
  {t:'tec-verbal',q:'Antonimo de "lucidez":',c:'Confusion',o:['Claridad','Inteligencia','Razon']},
  {t:'tec-verbal',q:'"Ubicuo" significa:',c:'Que esta en todas partes',o:['Que no esta en ninguna','Que esta en un lugar','Que viaja mucho']},
  {t:'tec-verbal',q:'Sinonimo de "candor":',c:'Inocencia',o:['Maldad','Astucia','Sospecha']},
  {t:'tec-verbal',q:'Sinonimo de "parco":',c:'Sobrio',o:['Hablar','Exagerado','Abundante']},
  {t:'tec-verbal',q:'Antonimo de "vanagloria":',c:'Humildad',o:['Orgullo','Soberbia','Prestigio']},
  {t:'tec-verbal',q:'"Letargo" significa:',c:'Sopr profundo',o:['Despertar','Actividad','Energia']},
  {t:'tec-verbal',q:'Sinonimo de "perenne":',c:'Eterno',o:['Temporal','Momentaneo','Fugaz']},
  {t:'tec-verbal',q:'Antonimo de "bonanza":',c:'Catastrofe',o:['Prosperidad','Riqueza','Fortuna']},
  {t:'tec-verbal',q:'"Congenito" significa:',c:'Nacido con uno',o:['Adquirido','Aprendido','Desarrollado']},
  {t:'tec-verbal',q:'Sinonimo de "inherente":',c:'Intrnseco',o:['Externo','Ajeno','Adquirido']},
  {t:'tec-verbal',q:'"Ecléctico" se refiere a alguien que:',c:'Combina diferentes estilos',o:['Sigue una sola corriente','Rechaza todo','Es tradicional']},
  {t:'tec-verbal',q:'Sinonimo de "vejar":',c:'Humillar',o:['Elogiar','Premiar','Proteger']},
  {t:'tec-verbal',q:'Antonimo de "cortedad":',c:'Amplitud',o:['Brevedad','Limitacion','Pequeñez']},
  {t:'tec-verbal',q:'"Paroxismo" significa:',c:'Maximo grado de intensidad',o:['Estado de paz','Minimo esfuerzo','Indiferencia']},
  {t:'tec-verbal',q:'Sinonimo de "indole":',c:'Naturaleza',o:['Indiferencia','Pereza','Tristeza']},
  {t:'tec-verbal',q:'Antonimo de "candidez":',c:'Astucia',o:['Inocencia','Pureza','Sencillez']},
  {t:'tec-verbal',q:'"Yermo" significa:',c:'Terreno baldio',o:['Terreno fertil','Terreno humedo','Bosque']},
  {t:'tec-verbal',q:'Sinonimo de "usufructo":',c:'Beneficio',o:['Peiida','Gasto','Impuesto']},
  {t:'tec-verbal',q:'"Inmarcesible" significa:',c:'Que no se marchita',o:['Que se marchita','Que crece rapido','Que florece']},
  {t:'tec-verbal',q:'Antonimo de "prosapia":',c:'Plebeyo',o:['Linaje','Nobleza','Estirpe']},
  {t:'tec-verbal',q:'Sinonimo de "escrupulo":',c:'Duda moral',o:['Certeza','Seguridad','Conviccion']},
  {t:'tec-verbal',q:'"Pusilanime" significa:',c:'Falto de nimo',o:['Valiente','Audaz','Decidido']},
  {t:'tec-verbal',q:'Antonimo de "loable":',c:'Repudiable',o:['Elogiable','Admirable','Meritorio']},

  // === TEC-LOGICA extra (20) ===
  {t:'tec-logica',q:'p→q y p, entonces:',c:'q',o:['¬q','¬p','p→q']},
  {t:'tec-logica',q:'p→q y ¬q, entonces:',c:'¬p',o:['p','q','¬q']},
  {t:'tec-logica',q:'¬(p→q) es equivalente a:',c:'p ∧ ¬q',o:['¬p ∨ q','p ∨ ¬q','¬p ∧ q']},
  {t:'tec-logica',q:'En probabilidad, P(A|B) =',c:'P(A∩B)/P(B)',o:['P(A)/P(B)','P(A∪B)/P(B)','P(A)P(B)']},
  {t:'tec-logica',q:'Si P(A)=0.3, P(B)=0.4, P(A∩B)=0, P(A∪B)=',c:'0.7',o:['0.12','0.58','0']},
  {t:'tec-logica',q:'Cuantos resultados posibles al lanzar 3 monedas?',c:'8',o:['6','4','12']},
  {t:'tec-logica',q:'Cuantos resultados posibles al lanzar 2 dados?',c:'36',o:['12','24','6']},
  {t:'tec-logica',q:'Probabilidad de suma 7 con 2 dados:',c:'1/6',o:['1/12','1/36','1/18']},
  {t:'tec-logica',q:'Probabilidad de que al lanzar 2 monedas salga al menos una cara:',c:'3/4',o:['1/4','1/2','1']},
  {t:'tec-logica',q:'De {1,2,3,4,5,6}, P(mayor que 4)=',c:'1/3',o:['1/2','1/6','2/3']},
  {t:'tec-logica',q:'Cuantos numeros de 3 cifras sin repetir usando {1,2,3,4}?',c:'24',o:['12','64','4']},
  {t:'tec-logica',q:'C(A,B,C) en logica significa:',c:'A y B y C',o:['A o B o C','A o (B y C)','(A o B) y C']},
  {t:'tec-logica',q:'La tabla de verdad de p→q tiene cuantas filas?',c:'4',o:['2','8','3']},
  {t:'tec-logica',q:'p ⊕ q (XOR) es verdadero cuando:',c:'p y q son diferentes',o:['p y q son iguales','p es verdadero','q es verdadero']},
  {t:'tec-logica',q:'En un diagrama de Venn, A∩B∩C representa:',c:'Elementos comunes a los 3',o:['Elementos de A o B o C','Solo elementos de A','Elementos de exactamente 2']},

  // === TEC-MATEMATICA extra (30) ===
  {t:'tec-matematica',q:'La ecuacion de recta con pendiente 2 que pasa por (1,3) es:',c:'y=2x+1',o:['y=2x+3','y=2x-1','y=x+2']},
  {t:'tec-matematica',q:'La ecuacion de recta vertical que pasa por (3,5) es:',c:'x=3',o:['y=5','x=5','y=3']},
  {t:'tec-matematica',q:'La ecuacion de recta horizontal que pasa por (3,5) es:',c:'y=5',o:['x=3','x=5','y=3']},
  {t:'tec-matematica',q:'f(x)=x^2-2x-3. Las intersecciones con x son:',c:'x=3 y x=-1',o:['x=1 y x=-3','x=3 y x=1','x=-3 y x=-1']},
  {t:'tec-matematica',q:'f(x)=x^2-6x+13 escrito como cuadrado perfecto es:',c:'(x-3)^2+4',o:['(x-3)^2-4','(x+3)^2+4','(x-6)^2+13']},
  {t:'tec-matematica',q:'Si f(x)=2x-1 y g(x)=x^2, f(g(2)) es:',c:'7',o:['6','3','9']},
  {t:'tec-matematica',q:'Si f(x)=x+3 y g(x)=2x, g(f(1)) es:',c:'8',o:['5','4','6']},
  {t:'tec-matematica',q:'El dominio de f(x)=√(9-x^2) es:',c:'-3 ≤ x ≤ 3',o:['x ≤ 3','x ≥ -3','x < 3']},
  {t:'tec-matematica',q:'f(x)=2(x+1)^2-3. Su vertice es:',c:'(-1,-3)',o:['(1,-3)','(-1,3)','(1,3)']},
  {t:'tec-matematica',q:'Si f(x)=3x-1, la inversa f^(-1)(x) es:',c:'(x+1)/3',o:['(x-1)/3','3x+1','x/3-1']},
  {t:'tec-matematica',q:'Si f(x)=x^3, la inversa f^(-1)(x) es:',c:'∛x',o:['x^(1/2)','1/x^3','x^(-3)']},
  {t:'tec-matematica',q:'f(x)=|x|, f(-5) + f(3) es:',c:'8',o:['2','-2','-8']},
  {t:'tec-matematica',q:'f(x)=x^2+2x-8. Suma de sus raices:',c:'-2',o:['2','-8','8']},
  {t:'tec-matematica',q:'f(x)=x^2+2x-8. Producto de sus raices:',c:'-8',o:['2','-2','16']},
  {t:'tec-matematica',q:'La recta que pasa por (2,5) y (2,-3) es:',c:'Vertical x=2',o:['Horizontal y=5','y=2x+1','y=-4x+13']},
  {t:'tec-matematica',q:'Solucion de x-2y=4, 3x+y=5:',c:'(2,-1)',o:['(1,2)','(0,-2)','(3,1)']},
  {t:'tec-matematica',q:'Solucion de x+y=5, x-y=1:',c:'(3,2)',o:['(2,3)','(4,1)','(5,0)']},
  {t:'tec-matematica',q:'Si f(x)=3x-7 y f(a)=5, entonces a es:',c:'4',o:['12','-2','4/3']},

  // === ECUACIONES extra (15) ===
  {t:'ecuaciones',q:'x+7=15',tx:'x+7=15',c:'8',o:['22','7','-8']},
  {t:'ecuaciones',q:'x-9=4',tx:'x-9=4',c:'13',o:['5','-5','36']},
  {t:'ecuaciones',q:'3x-7=14',tx:'3x-7=14',c:'7',o:['21/3','-7','-21/3']},
  {t:'ecuaciones',q:'2(x-5)=3(x+1)',tx:'2(x-5)=3(x+1)',c:'-13',o:['13','-7','7']},
  {t:'ecuaciones',q:'x/4 + x/6 = 5',tx:'x/4+x/6=5',c:'12',o:['10','6','15']},
  {t:'ecuaciones',q:'0.2x + 0.3x = 10',tx:'Ecuacion decimal',c:'20',o:['2','50','100']},
  {t:'ecuaciones',q:'x^2 - 10x + 25 = 0',tx:'x^2-10x+25=0',c:'x=5 (doble)',o:['x=5 o x=-5','x=-5','x=25']},
  {t:'ecuaciones',q:'x^2 + 49 = 0',tx:'x^2+49=0',c:'No tiene solucion real',o:['x=7','x=-7','x=+-7']},
  {t:'ecuaciones',q:'√x = 6',tx:'Raiz cuadrada',c:'36',o:['3','12','18']},
  {t:'ecuaciones',q:'3√x + 1 = 10',tx:'Ecuacion radical',c:'9',o:['3','81','27']},
  {t:'ecuaciones',q:'log_3(x) = 4',tx:'log3(x)=4',c:'81',o:['12','64','3^4']},
  {t:'ecuaciones',q:'2^(x+1) = 8',tx:'2^(x+1)=8',c:'2',o:['3','4','1']},
  {t:'ecuaciones',q:'x/2 - x/5 = 3',tx:'x/2 - x/5 = 3',c:'10',o:['5','15','30']},
  {t:'ecuaciones',q:'x^2 + x - 12 = 0',tx:'x^2+x-12=0',c:'x=3 o x=-4',o:['x=-3 o x=4','x=3 o x=4','x=-3 o x=-4']},

  // === FACTORIZACION extra (15) ===
  {t:'factorizacion',q:'x^2 - 2x - 24 = (x-6)(x+?)',c:'4',o:['-4','6','-6']},
  {t:'factorizacion',q:'x^2 + 4x - 21 = (x+7)(x-?)',c:'3',o:['-3','7','-7']},
  {t:'factorizacion',q:'x^2 - 12x + 36 =',c:'(x-6)^2',o:['(x+6)^2','(x-6)(x+6)','(x-12)^2']},
  {t:'factorizacion',q:'x^2 + 10x + 25 =',c:'(x+5)^2',o:['(x-5)^2','(x+5)(x-5)','(x+10)^2']},
  {t:'factorizacion',q:'x^2 - 16 =',c:'(x-4)(x+4)',o:['(x-4)^2','(x+4)^2','(x-2)(x+2)']},
  {t:'factorizacion',q:'x^2 - 81 =',c:'(x-9)(x+9)',o:['(x-9)^2','(x+9)^2','(x-3)(x+3)']},
  {t:'factorizacion',q:'x^2 + 9x + 20 =',c:'(x+4)(x+5)',o:['(x+4)(x-5)','(x-4)(x-5)','(x+2)(x+10)']},
  {t:'factorizacion',q:'x^2 - 9x + 18 =',c:'(x-3)(x-6)',o:['(x+3)(x+6)','(x-3)(x+6)','(x+3)(x-6)']},
  {t:'factorizacion',q:'x^2 + 3x - 10 =',c:'(x+5)(x-2)',o:['(x-5)(x+2)','(x+5)(x+2)','(x-5)(x-2)']},
  {t:'factorizacion',q:'x^2 - 5x - 14 =',c:'(x-7)(x+2)',o:['(x+7)(x-2)','(x-7)(x-2)','(x+7)(x+2)']},
  {t:'factorizacion',q:'x^2 + 5x + 6 =',c:'(x+2)(x+3)',o:['(x-2)(x-3)','(x+2)(x-3)','(x-2)(x+3)']},
  {t:'factorizacion',q:'x^2 - 5x + 6 =',c:'(x-2)(x-3)',o:['(x+2)(x+3)','(x-2)(x+3)','(x+2)(x-3)']},

  // === INECUACIONES extra (10) ===
  {t:'inecuaciones',q:'x + 3 < 7',tx:'x+3<7',c:'x < 4',o:['x > 4','x <= 4','x < 10']},
  {t:'inecuaciones',q:'2x - 5 > 3',tx:'2x-5>3',c:'x > 4',o:['x < 4','x > 1','x > -4']},
  {t:'inecuaciones',q:'3x + 7 ≤ 2x - 1',tx:'3x+7 <= 2x-1',c:'x ≤ -8',o:['x ≥ -8','x < -8','x < 8']},
  {t:'inecuaciones',q:'x/2 + 1 > 3',tx:'x/2+1>3',c:'x > 4',o:['x > 2','x > 8','x < 4']},
  {t:'inecuaciones',q:'-2x < 8',tx:'-2x<8',c:'x > -4',o:['x < -4','x > 4','x < 4']},
  {t:'inecuaciones',q:'5 - 3x ≥ 11',tx:'5-3x >= 11',c:'x ≤ -2',o:['x ≥ -2','x < -2','x ≤ 2']},
  {t:'inecuaciones',q:'(x-3)(x+1) > 0',tx:'Inecuacion cuadratica',c:'x < -1 o x > 3',o:['-1 < x < 3','x > 3','x < -1']},
  {t:'inecuaciones',q:'(x+4)(x-2) ≤ 0',tx:'Inecuacion cuadratica 2',c:'-4 ≤ x ≤ 2',o:['x ≤ -4 o x ≥ 2','x ≤ -4','x ≥ 2']},

  // === TRIGONOMETRIA extra (10) ===
  {t:'trigonometria',q:'Convertir 30° a radianes:',c:'π/6',o:['π/3','π/4','π/2']},
  {t:'trigonometria',q:'Convertir 90° a radianes:',c:'π/2',o:['π','π/3','π/4']},
  {t:'trigonometria',q:'Convertir π radianes a grados:',c:'180°',o:['90°','360°','270°']},
  {t:'trigonometria',q:'Convertir π/3 radianes a grados:',c:'60°',o:['30°','45°','90°']},
  {t:'trigonometria',q:'sen(π/3) =',tx:'sen pi/3',c:'√3/2',o:['1/2','√2/2','1']},
  {t:'trigonometria',q:'cos(π/6) =',tx:'cos pi/6',c:'√3/2',o:['1/2','√2/2','1']},
  {t:'trigonometria',q:'tan(π/4) =',tx:'tan pi/4',c:'1',o:['√3','√3/3','0']},
  {t:'trigonometria',q:'El perodo de f(x)=cos(3x) es:',tx:'Periodo cos(3x)',c:'2π/3',o:['2π','π/3','6π']},
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
