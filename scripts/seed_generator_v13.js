process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v13';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const temas=[
  // === TEC-VERBAL (40) ===
  {t:'tec-verbal',q:'Sinonimo de "exacerbar":',c:'Irritar',o:['Calmar','Suavizar','Aliviar']},
  {t:'tec-verbal',q:'Antonimo de "prodigio":',c:'Desastre',o:['Milagro','Maravilla','Portento']},
  {t:'tec-verbal',q:'"Desdén" significa:',c:'Indiferencia',o:['Aprecio','Estima','Admiracion']},
  {t:'tec-verbal',q:'Sinonimo de "premura":',c:'Apuro',o:['Calma','Demora','Lentitud']},
  {t:'tec-verbal',q:'Antonimo de "candoroso":',c:'Malicioso',o:['Ingenuo','Sincero','Inocente']},
  {t:'tec-verbal',q:'"Abyecto" significa:',c:'Despreciable',o:['Admirable','Noble','Digno']},
  {t:'tec-verbal',q:'Sinonimo de "austeridad":',c:'Sobriedad',o:['Lujo','Abundancia','Exceso']},
  {t:'tec-verbal',q:'Antonimo de "eximir":',c:'Obligar',o:['Liberar','Exceptuar','Dispensar']},
  {t:'tec-verbal',q:'"Falacia" significa:',c:'Engaño',o:['Verdad','Cereteza','Realidad']},
  {t:'tec-verbal',q:'Sinonimo de "hesitar":',c:'Vacilar',o:['Decidir','Afirmar','Resolver']},
  {t:'tec-verbal',q:'Antonimo de "proficuo":',c:'Inutil',o:['Beneficioso','Provechoso','Favorable']},
  {t:'tec-verbal',q:'"Igneo" significa relativo a:',c:'Fuego',o:['Agua','Tierra','Aire']},
  {t:'tec-verbal',q:'Sinonimo de "letargo":',c:'Sopon',o:['Actividad','Energía','Despertar']},
  {t:'tec-verbal',q:'Antonimo de "mesura":',c:'Exceso',o:['Moderacion','Prudencia','Templanza']},
  {t:'tec-verbal',q:'"Negligencia" significa:',c:'Descuido',o:['Esmero','Cuidado','Diligencia']},
  {t:'tec-verbal',q:'Sinonimo de "opulencia":',c:'Riqueza',o:['Pobreza','Miseria','Carencia']},
  {t:'tec-verbal',q:'Antonimo de "pugnaz":',c:'Pacífico',o:['Belicoso','Agresivo','Combativo']},
  {t:'tec-verbal',q:'"Recóndito" significa:',c:'Oculto',o:['Visible','Evidente','Claro']},
  {t:'tec-verbal',q:'Sinonimo de "sagaz":',c:'Astuto',o:['Ingenuo','Torpe','Lento']},
  {t:'tec-verbal',q:'Antonimo de "tesón":',c:'Desidia',o:['Perseverancia','Constancia','Firmeza']},
  {t:'tec-verbal',q:'"Unívoco" significa:',c:'De un solo significado',o:['De varios significados','Ambiguo','Indefinido']},
  {t:'tec-verbal',q:'Sinonimo de "vehemencia":',c:'Fervor',o:['Apatía','Indiferencia','Frialdad']},
  {t:'tec-verbal',q:'Antonimo de "yerto":',c:'Flexible',o:['Rigido','Tieso','Inmovil']},
  {t:'tec-verbal',q:'"Zafio" significa:',c:'Grosero',o:['Fino','Educado','Cortés']},
  {t:'tec-verbal',q:'Analogía: "Arbol es a bosque como gota es a"',c:'Mar',o:['Rio','Lluvia','Lago']},
  {t:'tec-verbal',q:'Analogía: "Ojo es a ver como oído es a"',c:'Oír',o:['Escuchar','Oyendo','Audicion']},
  {t:'tec-verbal',q:'Analogía: "Coche es a carretera como tren es a"',c:'Vía',o:['Estacion','Riel','Tunel']},
  {t:'tec-verbal',q:'Analogía: "Médico es a hospital como maestro es a"',c:'Escuela',o:['Libro','Alumno','Pizarron']},
  {t:'tec-verbal',q:'Analogía: "Lápiz es a escribir como tijeras es a"',c:'Cortar',o:['Papel','Dibujar','Pegar']},
  {t:'tec-verbal',q:'La palabra "submarino" contiene el prefijo:',c:'sub- (debajo de)',o:['super- (sobre)','sub- (sobre)','mar- (mar)']},
  {t:'tec-verbal',q:'La palabra "antediluviano" contiene el prefijo:',c:'ante- (antes de)',o:['anti- (contra)','ante- (delante)','an- (sin)']},
  {t:'tec-verbal',q:'"Inaudito" significa:',c:'No oído antes',o:['Que se oye bien','Que no se puede oír','Que se oye mal']},
  {t:'tec-verbal',q:'"Perenne" significa:',c:'Que dura siempre',o:['Que dura un año','Que muere pronto','Que renace cada año']},
  {t:'tec-verbal',q:'"Benevolencia" es:',c:'Buena voluntad',o:['Mala voluntad','Voluntad debil','Falta de voluntad']},
  {t:'tec-verbal',q:'"Maleable" significa que se puede:',c:'Martillar',o:['Romper','Doblar','Fundir']},
  {t:'tec-verbal',q:'"Acérrimo" significa:',c:'Muy firme',o:['Muy ácido','Muy debil','Muy rapido']},
  {t:'tec-verbal',q:'"Adolecer" significa:',c:'Tener un defecto',o:['Llegar a adulto','Sufrir dolor','Crecer']},
  {t:'tec-verbal',q:'"Coacción" significa:',c:'Presion o fuerza',o:['Ayuda','Cooperacion','Colaboracion']},
  {t:'tec-verbal',q:'"Deleznable" significa:',c:'Que se deshace',o:['Que no se rompe','Que es fuerte','Que es durable']},
  {t:'tec-verbal',q:'"Encomiar" significa:',c:'Alabar',o:['Criticar','Ignorar','Despreciar']},

  // === TEC-LOGICA (20) ===
  {t:'tec-logica',q:'Una tautologia es una proposicion que siempre es:',c:'Verdadera',o:['Falsa','Verdadera o falsa','No se sabe']},
  {t:'tec-logica',q:'Una contradiccion es una proposicion que siempre es:',c:'Falsa',o:['Verdadera','Verdadera o falsa','No se sabe']},
  {t:'tec-logica',q:'p ∨ ¬p es una:',c:'Tautologia',o:['Contradiccion','Contingencia','Equivalencia']},
  {t:'tec-logica',q:'p ∧ ¬p es una:',c:'Contradiccion',o:['Tautologia','Contingencia','Equivalencia']},
  {t:'tec-logica',q:'Si p→q es falso, entonces:',c:'p es verdadero y q es falso',o:['p es falso y q verdadero','p y q son verdaderos','p y q son falsos']},
  {t:'tec-logica',q:'La conjuncion p∧q es verdadera cuando:',c:'Ambos son verdaderos',o:['Alguno es verdadero','Ambos son falsos','p es verdadero']},
  {t:'tec-logica',q:'La disyuncion p∨q es falsa cuando:',c:'Ambos son falsos',o:['Alguno es falso','Ambos son verdaderos','p es falso']},
  {t:'tec-logica',q:'Cuantas combinaciones posibles hay para 3 proposiciones?',c:'8',o:['4','6','16']},
  {t:'tec-logica',q:'Cuantas combinaciones posibles hay para 4 proposiciones?',c:'16',o:['8','12','32']},
  {t:'tec-logica',q:'p → q es equivalente a su contrapositiva:',c:'¬q → ¬p',o:['q → p','¬p → ¬q','p ↔ q']},
  {t:'tec-logica',q:'Probabilidad de que al lanzar un dado salga 3 o 4:',c:'1/3',o:['1/6','2/3','1/2']},
  {t:'tec-logica',q:'Probabilidad de que al lanzar un dado salga par o impar:',c:'1',o:['1/2','0','1/6']},
  {t:'tec-logica',q:'Si P(A)=0.4, P(B)=0.3, P(A∩B)=0.1, P(A∪B)=',c:'0.6',o:['0.7','0.5','0.2']},
  {t:'tec-logica',q:'Media aritmetica de 10,20,30:',c:'20',o:['10','30','15']},
  {t:'tec-logica',q:'Media geometrica de 4 y 9:',c:'6',o:['6.5','13','36']},
  {t:'tec-logica',q:'Varianza de {2,4,6,8}:',c:'5',o:['4','6','25']},

  // === CALCULO (15) ===
  {t:'calculo',q:'d/dx (x^3 - 4x^2 + 7x - 2)',c:'3x^2 - 8x + 7',o:['3x^2 - 4x + 7','3x^3 - 8x^2 + 7','3x^2 - 8x']},
  {t:'calculo',q:'d/dx (sen 3x)',c:'3 cos 3x',o:['cos 3x','-3 cos 3x','3 sen 3x']},
  {t:'calculo',q:'∫ cos 3x dx',c:'(1/3) sen 3x + C',o:['3 sen 3x + C','sen 3x + C','(1/3) cos 3x + C']},
  {t:'calculo',q:'∫ (x^3 + 2x) dx',c:'x^4/4 + x^2 + C',o:['3x^2 + 2 + C','x^4 + x^2 + C','x^4/4 + 2x^2 + C']},
  {t:'calculo',q:'lim_(x→2) (x^3 - 8)/(x - 2)',c:'12',o:['4','6','8']},
  {t:'calculo',q:'lim_(x→0) sen x / (2x)',c:'1/2',o:['1','2','0']},
  {t:'calculo',q:'f(x)=x^3-3x+2, f(1)=',c:'0',o:['2','-2','1']},

  // === ECUACIONES (10) ===
  {t:'ecuaciones',q:'Si 2x+3y=12 y x=3, entonces y=',c:'2',o:['6','4','3']},
  {t:'ecuaciones',q:'Si x+y=8 y x-y=4, entonces y=',c:'2',o:['4','6','8']},
  {t:'ecuaciones',q:'Si 3x-y=10 y x=4, entonces y=',c:'2',o:['-2','12','22']},
  {t:'ecuaciones',q:'Si 2x+y=7 y y=1, entonces x=',c:'3',o:['4','2','6']},
  {t:'ecuaciones',q:'x^2 - 7x + 12 = 0',c:'x=3 o x=4',o:['x=2 o x=6','x=1 o x=12','x=3 o x=-4']},
  {t:'ecuaciones',q:'x^2 - 4x + 4 = 0',c:'x=2 (doble)',o:['x=-2 (doble)','x=2 o x=-2','x=4']},
  {t:'ecuaciones',q:'x^2 + 6x = 0',c:'x=0 o x=-6',o:['x=0 o x=6','x=6','x=-6']},
  {t:'ecuaciones',q:'|x-5| = 2',c:'x=7 o x=3',o:['x=7 o x=-3','x=7','x=3']},
  {t:'ecuaciones',q:'3x^2 = 27',c:'x=3 o x=-3',o:['x=3','x=-3','x=9']},
  {t:'ecuaciones',q:'√(2x-1) = 5',c:'x=13',o:['x=12','x=3','x=26']},
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
