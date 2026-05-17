process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v19';const A='generacion-programatica';const N='10-11';

const temas=[
  // === TEC-VERBAL (25) ===
  {t:'tec-verbal',q:'Sinonimo de "contemplar":',c:'Observar',o:['Ignorar','Olvidar','Despreciar']},
  {t:'tec-verbal',q:'Antonimo de "beligerante":',c:'Pacífico',o:['Agresivo','Combativo','Guerrero']},
  {t:'tec-verbal',q:'"Efervescencia" significa:',c:'Agitacion',o:['Calma','Tranquilidad','Reposo']},
  {t:'tec-verbal',q:'Sinonimo de "impetu":',c:'Impulso',o:['Frenado','Moderacion','Pausa']},
  {t:'tec-verbal',q:'Antonimo de "lacónico":',c:'Verboso',o:['Breve','Conciso','Resumido']},
  {t:'tec-verbal',q:'"Magnánimo" significa:',c:'Generoso',o:['Egoista','Avido','Pobre']},
  {t:'tec-verbal',q:'Sinonimo de "nimiedad":',c:'Bagatela',o:['Importancia','Trascendencia','Relevancia']},
  {t:'tec-verbal',q:'Antonimo de "obsoleto":',c:'Moderno',o:['Antiguo','Viejo','Arcaico']},
  {t:'tec-verbal',q:'"Paradigma" significa:',c:'Modelo',o:['Error','Excepcion','Copiar']},
  {t:'tec-verbal',q:'Sinonimo de "reticente":',c:'Reservado',o:['Abierto','Franco','Extrovertido']},
  {t:'tec-verbal',q:'Antonimo de "subrepticio":',c:'Abierto',o:['Oculto','Secreto','Cladestino']},
  {t:'tec-verbal',q:'"Terso" significa:',c:'Limpio',o:['Sucio','Rugoso','Opaco']},
  {t:'tec-verbal',q:'"Ufanarse" significa:',c:'Enorgullecerse',o:['Avergonzarse','Humillarse','Ocultarse']},
  {t:'tec-verbal',q:'Antonimo de "venerar":',c:'Despreciar',o:['Adorar','Reverenciar','Honrar']},
  {t:'tec-verbal',q:'Sinonimo de "yermo":',c:'Desierto',o:['Fertil','Verde','Poblado']},
  {t:'tec-verbal',q:'"Zozobra" significa:',c:'Angustia',o:['Tranquilidad','Calma','Seguridad']},
  {t:'tec-verbal',q:'Analogía: "Pez es a acuario como pajaro es a"',c:'Jaula',o:['Arbol','Cielo','Nido']},
  {t:'tec-verbal',q:'Analogía: "Sol es a dia como luna es a"',c:'Noche',o:['Noche','Estrella','Cielo']},
  {t:'tec-verbal',q:'Analogía: "Pincel es a pintor como lapiz es a"',c:'Dibujante',o:['Escritor','Artesano','Carpintero']},
  {t:'tec-verbal',q:'Analogía: "Combustible es a automovil como electricidad es a"',c:'Computadora',o:['Luz','Motor','Bateria']},
  {t:'tec-verbal',q:'"Inerme" significa:',c:'Desarmado',o:['Armado','Fuerte','Valiente']},
  {t:'tec-verbal',q:'"Sublime" significa:',c:'Excelso',o:['Inferior','Mediocre','Comun']},
  {t:'tec-verbal',q:'"Proletario" significa:',c:'Trabajador',o:['Rico','Noble','Empresario']},
  {t:'tec-verbal',q:'"Congenito" significa:',c:'Nato',o:['Adquirido','Aprendido','Artificial']},
  {t:'tec-verbal',q:'"Intrinseco" significa:',c:'Esencial',o:['Externo','Superficial','Accesorio']},

  // === FRACCIONES ALGEBRAICAS (20) ===
  {t:'fracciones-alg',q:'(x^2+4x+4)/(x^2+2x) =',c:'(x+2)/x',o:['(x-2)/x','(x+2)/(x+2)','(x+4)/x']},
  {t:'fracciones-alg',q:'(x^2-4x-12)/(x^2+4x+4) =',c:'(x-6)/(x+2)',o:['(x+6)/(x+2)','(x-6)/(x-2)','(x+2)/(x-6)']},
  {t:'fracciones-alg',q:'(6x^2-13x+6)/(2x^2+3x-9) =',c:'(3x-2)/(x+3)',o:['(2x-3)/(x-3)','(3x+2)/(x-3)','(2x+3)/(x+3)']},
  {t:'fracciones-alg',q:'(x^2+5x+4)/(x^2-16) * (x+4)/(x+1) =',c:'1',o:['(x+4)/(x-4)','(x-4)/(x+4)','(x+1)/(x-4)']},
  {t:'fracciones-alg',q:'(x^2+2x-3)/(x^2+3x-4) / (x-1)/(x+4) =',c:'1',o:['(x-1)/(x-1)','(x+3)/(x-3)','(x+4)/(x+1)']},
  {t:'fracciones-alg',q:'(x^2-6x+9)/(x^2-3x) * (x^2+2x)/(x^2-4) =',c:'(x-3)/(x-2)',o:['(x+3)/(x+2)','(x-3)/(x+2)','(x+3)/(x-2)']},
  {t:'fracciones-alg',q:'(a^3+b^3)/(a^2-b^2) / (a^2-ab+b^2)/(a-b) =',c:'1',o:['(a+b)/(a-b)','(a-b)/(a+b)','(a^2-ab+b^2)/(a+b)']},
  {t:'fracciones-alg',q:'(x^3-8)/(x^2-4) * (x+2)/(x^2+2x+4) =',c:'1',o:['(x-2)/(x+2)','(x+2)/(x-2)','(x^2-2x+4)/(x^2+4)']},
  {t:'fracciones-alg',q:'1/(x-y) + 1/(x+y) =',c:'2x/(x^2-y^2)',o:['2y/(x^2-y^2)','2/(x^2-y^2)','(x+y+x-y)/(x^2-y^2)']},
  {t:'fracciones-alg',q:'1/(x-1) + 1/(x^2-1) =',c:'x/(x^2-1)',o:['1/(x-1)','(x+1)/(x^2-1)','(x+2)/(x^2-1)']},
  {t:'fracciones-alg',q:'(x+1)/(x-1) - (x-1)/(x+1) =',c:'4x/(x^2-1)',o:['2/(x^2-1)','4x/(x^2+1)','(2x+2)/(x^2-1)']},
  {t:'fracciones-alg',q:'(x/y - y/x) / (1/x + 1/y) =',c:'x-y',o:['x+y','(x-y)/(x+y)','(x^2-y^2)/(x+y)']},
  {t:'fracciones-alg',q:'((a+b)/a - a/(a+b)) / b/(a+b) =',c:'(a+b)^2/(ab) - 1',o:['(a+b)/a','(a+2b)/a','b/(a+b)']},
  {t:'fracciones-alg',q:'(1 - 1/(x+1)) / (1 + 1/(x+1)) =',c:'x/(x+2)',o:['(x+1)/(x+2)','(x+2)/(x+1)','x/(x+1)']},
  {t:'fracciones-alg',q:'(x/(x-1) - 1) / (1 + x/(x-1)) =',c:'1/(2x-1)',o:['(x-1)/(2x-1)','1/(x-1)','(x-1)/(x+1)']},
  {t:'fracciones-alg',q:'(3x-1)/(x+2) - (x+1)/(x-1) =',c:'(2x^2-7x-1)/((x+2)(x-1))',o:['(2x^2-7x-4)/((x+2)(x-1))','(3x-1-x-1)/((x+2)(x-1))','(4x^2-8x-3)/((x+2)(x-1))']},
  {t:'fracciones-alg',q:'(x+2)^2/(x-3) / (x+2)/(x^2-9) =',c:'(x+2)(x+3)',o:['(x+2)^2/(x-3)','(x+2)(x-3)','(x+2)/(x+3)']},
  {t:'fracciones-alg',q:'(2x^2+7x+6)/(x^2+5x+6) =',c:'(2x+3)/(x+3)',o:['(2x+3)/(x+2)','(x+2)/(x+3)','(2x+3)/(x-3)']},
  {t:'fracciones-alg',q:'(x^4-81)/(x^3+27) =',c:'(x^2+9)(x-3)/(x^2-3x+9)',o:['(x-3)(x+3)/(x-3)','(x^2-9)/(x+3)','(x^2+9)/(x^2-3x+9)']},
  {t:'fracciones-alg',q:'((2a-2b)/(a+b)) / ((a-b)^2/(a^2-b^2)) =',c:'2(a+b)/(a-b)',o:['2/(a-b)','(a+b)/(a-b)','2(a-b)/(a+b)']},

  // === TRIGONOMETRIA (20) ===
  {t:'trigonometria',q:'sen(210°) =',c:'-1/2',o:['1/2','-√3/2','√3/2']},
  {t:'trigonometria',q:'cos(240°) =',c:'-1/2',o:['1/2','-√3/2','√3/2']},
  {t:'trigonometria',q:'tan(225°) =',c:'1',o:['-1','√3','-√3']},
  {t:'trigonometria',q:'sen(330°) =',c:'-1/2',o:['1/2','-√3/2','√3/2']},
  {t:'trigonometria',q:'cos(330°) =',c:'√3/2',o:['1/2','-√3/2','-1/2']},
  {t:'trigonometria',q:'Un angulo de 2π/3 rad =',c:'120°',o:['60°','180°','240°']},
  {t:'trigonometria',q:'Un angulo de 3π/4 rad =',c:'135°',o:['45°','90°','150°']},
  {t:'trigonometria',q:'Un angulo de 5π/6 rad =',c:'150°',o:['120°','135°','180°']},
  {t:'trigonometria',q:'En un triangulo rectangulo con catetos 3 y 4, sen del angulo menor:',c:'3/5',o:['4/5','3/4','5/3']},
  {t:'trigonometria',q:'En un triangulo rectangulo con catetos 5 y 12, la hipotenusa:',c:'13',o:['17','10','15']},
  {t:'trigonometria',q:'sen(2x) = 2 sen x cos x, si x=30° entonces sen 60° =',c:'√3/2',o:['1/2','√2/2','1']},
  {t:'trigonometria',q:'cos(2x) = 1 - 2 sen^2 x, si x=30° entonces cos 60° =',c:'1/2',o:['0','√3/2','1']},
  {t:'trigonometria',q:'sen(3x) = 3 sen x - 4 sen^3 x, si x=10°, expresion:',c:'sen 30°',o:['sen 10°','sen 20°','sen 40°']},
  {t:'trigonometria',q:'Ley de senos: a/sen A = b/sen B = c/sen C =',c:'2R',o:['R','R^2','R/2']},
  {t:'trigonometria',q:'Ley de cosenos: c^2 =',c:'a^2 + b^2 - 2ab cos C',o:['a^2 + b^2 + 2ab cos C','a^2 - b^2 + 2ab cos C','a^2 + b^2 - 2ab sen C']},
  {t:'trigonometria',q:'El area de un triangulo con lados a,b y angulo C:',c:'(1/2)ab sen C',o:['ab sen C','(1/2)ab cos C','ab cos C']},
  {t:'trigonometria',q:'sen(π + x) =',c:'-sen x',o:['sen x','cos x','-cos x']},
  {t:'trigonometria',q:'cos(π + x) =',c:'-cos x',o:['cos x','sen x','-sen x']},
  {t:'trigonometria',q:'tan(π + x) =',c:'tan x',o:['-tan x','cot x','-cot x']},
  {t:'trigonometria',q:'El rango de f(x)=sen x es:',c:'[-1, 1]',o:['[0, 1]','[-∞, ∞]','[-π, π]']},

  // === EXP-LOG (20) ===
  {t:'exp-log',q:'4^(x-1) = 16, entonces x =',c:'3',o:['2','4','5']},
  {t:'exp-log',q:'2^(x+3) = 1/8, entonces x =',c:'-6',o:['-3','-1','0']},
  {t:'exp-log',q:'e^(2x) = 5, entonces x =',c:'(ln 5)/2',o:['ln 5','2 ln 5','ln(5/2)']},
  {t:'exp-log',q:'10^x = 1000, entonces x =',c:'3',o:['2','10','4']},
  {t:'exp-log',q:'2^(x^2 + 3x) = 1/4, entonces x =',c:'x = -1 o x = -2',o:['x=1 o x=2','x=-1 o x=2','x=1 o x=-2']},
  {t:'exp-log',q:'log_2 (x-1) = 4, entonces x =',c:'17',o:['15','9','5']},
  {t:'exp-log',q:'log_5 (2x+1) = 2, entonces x =',c:'12',o:['5','24/2','124/5']},
  {t:'exp-log',q:'ln(2x) = 0, entonces x =',c:'1/2',o:['1','2','0']},
  {t:'exp-log',q:'log_3 x + log_3 2 = 2, entonces x =',c:'9/2',o:['9','2/9','18']},
  {t:'exp-log',q:'log_2 (x+3) - log_2 x = 2, entonces x =',c:'1',o:['2','3','4']},
  {t:'exp-log',q:'log(x^2) - log(2x) = 1, entonces x =',c:'20',o:['10','2','100']},
  {t:'exp-log',q:'2 ln x = ln 4 + ln 9, entonces x =',c:'6',o:['36','13','2.5']},
  {t:'exp-log',q:'La funcion f(x)=2^(x+1) corta el eje y en:',c:'(0,2)',o:['(0,0)','(0,1)','(1,0)']},
  {t:'exp-log',q:'La asintota de f(x)=3^x + 2 es:',c:'y = 2',o:['y = 0','y = 1','x = 0']},
  {t:'exp-log',q:'La asintota de f(x)=ln(x-1) es:',c:'x = 1',o:['x = 0','y = 0','x = -1']},
  {t:'exp-log',q:'Si f(x)=4^x, entonces f(1/2) =',c:'2',o:['4','1','16']},
  {t:'exp-log',q:'Si f(x)=e^x, entonces f(ln 3) =',c:'3',o:['e^3','ln 3','3e']},
  {t:'exp-log',q:'log_a a^7 =',c:'7',o:['a','a^7','1']},
  {t:'exp-log',q:'a^(log_a 10) =',c:'10',o:['a','1','log_a 10']},
  {t:'exp-log',q:'log_4 16 - log_4 2 =',c:'1',o:['2','4','0.5']},
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
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
