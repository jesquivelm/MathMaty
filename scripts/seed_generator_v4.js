process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v4';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rnd(0,a.length-1)];}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

function genLogic(){
  const types=[
    {q:'Si TODO los A son B, y TODO los B son C, entonces:',c:'TODO los A son C',o:['NADA los A son C','ALGUNOS A son C','TODO los C son A'],ans:'TODO los A son C'},
    {q:'La negacion de "Todos los estudiantes estudian" es:',c:'ALGUN estudiante NO estudia',o:['NINGUN estudiante estudia','TODOS los estudiantes NO estudian','ALGUN estudiante estudia'],ans:'ALGUN estudiante NO estudia'},
    {q:'Si p→q es verdadero y p es verdadero, entonces:',c:'q es verdadero',o:['q es falso','p es falso','q puede ser verdadero o falso'],ans:'q es verdadero'},
    {q:'Cuantos numeros de 3 cifras pueden formarse con {1,2,3,4} sin repetir?',c:'24',o:['12','64','4'],ans:'24'},
    {q:'En un grupo de 10 personas, cuantos comites de 3 pueden formarse?',c:'120',o:['30','720','1000'],ans:'120'},
    {q:'La probabilidad de obtener dos caras al lanzar 2 monedas es:',c:'1/4',o:['1/2','1/8','2/4'],ans:'1/4'},
    {q:'Si llueve→el suelo se moja. No llovio. Concluimos:',c:'No se puede concluir nada',o:['El suelo no se mojo','El suelo esta mojado','Llovio'],ans:'No se puede concluir nada'},
    {q:'Un dado tiene 6 caras. Probabilidad de obtener un numero par:',c:'1/2',o:['1/3','1/6','2/3'],ans:'1/2'},
    {q:'La negacion de p∧q es:',c:'¬p ∨ ¬q',o:['¬p ∧ ¬q','¬(p∨q)','p ∨ ¬q'],ans:'¬p ∨ ¬q'},
    {q:'De 5 libros, cuantas formas de elegir 2 para leer?',c:'10',o:['20','5','7'],ans:'10'},
    {q:'Si A={1,2,3} y B={2,3,4}, A∩B es:',c:'{2,3}',o:['{1,4}','{1,2,3,4}','{ }'],ans:'{2,3}'},
    {q:'En una urna con 3 rojas y 2 azules, P(roja)=',c:'3/5',o:['2/5','1/3','3/2'],ans:'3/5'},
    {q:'p↔q es verdadero cuando p y q:',c:'Ambos iguales',o:['Ambos diferentes','p verdadero','q falso'],ans:'Ambos iguales'},
    {q:'De cuantas formas pueden sentarse 4 personas en 4 sillas?',c:'24',o:['16','12','8'],ans:'24'},
    {q:'Si hoy es lunes, entonces manana es martes. Hoy NO es lunes, entonces:',c:'No se puede concluir',o:['Manana no es martes','Manana es martes','Hoy es martes'],ans:'No se puede concluir'},
  ];
  return types.map(t=>{
    const res=mkOpts(t.c,t.o);
    return{t:'tec-logica',q:t.q,tx:t.q.substring(0,60),o:res.o,d:'media',ci:res.ci};
  });
}

function genVerbal(){
  const types=[
    {q:'Cual palabra NO pertenece al grupo?',c:'Tigre',o:['Leon','Pantera','Gato'],ans:'Gato'},
    {q:'Complete: "Mas vale pajaro en mano que _____"',c:'Cien volando',o:['Dos en el arbol','Tres paseando','Ninguno'],ans:'Cien volando'},
    {q:'Analogia: Mano es a dedo como pie es a:',c:'Dedo del pie',o:['Talon','Pierna','Zapato'],ans:'Dedo del pie'},
    {q:'Cual numero completa? 2, 4, 8, 16, __',c:'32',o:['24','30','20'],ans:'32'},
    {q:'Sinonimo de "efimero":',c:'Pasajero',o:['Eterno','Grande','Solido'],ans:'Pasajero'},
    {q:'Antonimo de "austero":',c:'Lujoso',o:['Sobrio','Severo','Pobre'],ans:'Lujoso'},
    {q:'Cual letra continua? A, C, E, G, __',c:'I',o:['H','J','K'],ans:'I'},
    {q:'Perro es a ladrar como gato es a:',c:'Maullar',o:['Ronronear','Silbar','Graznar'],ans:'Maullar'},
    {q:'Seleccione el sinonimo de "conciso":',c:'Breve',o:['Largo','Confuso','Amplio'],ans:'Breve'},
    {q:'Cual palabra es el antnimo de "belico"?',c:'Pacifico',o:['Guerrero','Agresivo','Feroz'],ans:'Pacifico'},
    {q:'Complete: "A quien madruga, Dios ___"',c:'Le ayuda',o:['Le castiga','Le premia','Le ignora'],ans:'Le ayuda'},
    {q:'Cual palabra NO es un sentimiento?',c:'Mesa',o:['Alegria','Tristeza','Enojo'],ans:'Mesa'},
    {q:'Que es un "veredicto"?',c:'Decision judicial',o:['Libro antiguo','Discurso','Poema'],ans:'Decision judicial'},
    {q:'Cual par es analogo a "calor : termometro"?',c:'Velocidad : velocimetro',o:['Lluvia : paraguas','Frio : abrigo','Sol : lentes'],ans:'Velocidad : velocimetro'},
    {q:'Sinonimo de "prolijo":',c:'Detallista',o:['Desordenado','Desprolijo','Lento'],ans:'Detallista'},
  ];
  return types.map(t=>{
    const res=mkOpts(t.c,t.o);
    return{t:'tec-verbal',q:t.q,tx:t.q,o:res.o,d:'media',ci:res.ci};
  });
}

function genAlgebraicFractions(){
  const exs=[];
  const probs=[
    {q:'$\\frac{2x}{4x}$ simplificado es:',c:'$\\frac{1}{2}$',o:['$\\frac{x}{2}$','$\\frac{2}{4}$','$\\frac{1}{x}$'],ans:'$\\frac{1}{2}$'},
    {q:'$\\frac{x+2}{x^2-4}$ simplificado es:',c:'$\\frac{1}{x-2}$',o:['$\\frac{1}{x+2}$','$\\frac{x+2}{x-2}$','$\\frac{1}{2}$'],ans:'$\\frac{1}{x-2}$'},
    {q:'$\\frac{x^2-9}{x+3}$ es igual a:',c:'$x-3$',o:['$x+3$','$x-9$','$x+9$'],ans:'$x-3$'},
    {q:'$\\frac{3}{x+2} - \\frac{1}{x}$ es:',c:'$\\frac{2x-2}{x(x+2)}$',o:['$\\frac{2}{2}$','$\\frac{3-x}{x+2}$','$\\frac{2}{x(x+2)}$'],ans:'$\\frac{2x-2}{x(x+2)}$'},
    {q:'$\\frac{2x}{3} \\cdot \\frac{9}{4x}$ es:',c:'$\\frac{3}{2}$',o:['$\\frac{18}{12}$','$\\frac{3}{x}$','$\\frac{2}{3}$'],ans:'$\\frac{3}{2}$'},
    {q:'$\\frac{x^2+5x+6}{x+2}$ es:',c:'$x+3$',o:['$x-3$','$x+2$','$x+5$'],ans:'$x+3$'},
    {q:'$\\frac{1}{x-1} - \\frac{1}{x+1}$ es:',c:'$\\frac{2}{x^2-1}$',o:['$\\frac{0}{x}$','$\\frac{2}{x-1}$','$\\frac{1}{x^2-1}$'],ans:'$\\frac{2}{x^2-1}$'},
    {q:'$\\frac{x}{x-1} + \\frac{1}{1-x}$ es:',c:'$1$',o:['$\\frac{x+1}{x-1}$','$\\frac{x+1}{1-x}$','$\\frac{x-1}{x-1}$'],ans:'$1$'},
    {q:'$\\frac{6x^2}{2x}$ simplificado:',c:'$3x$',o:['$3x^2$','$4x$','$3$'],ans:'$3x$'},
    {q:'$\\frac{x^2-1}{x-1}$ simplificado:',c:'$x+1$',o:['$x-1$','$x$','$x^2-1$'],ans:'$x+1$'},
    {q:'$\\frac{2x+4}{x+2}$ es:',c:'$2$',o:['$x+2$','$4$','$2x$'],ans:'$2$'},
    {q:'$\\frac{x}{2} + \\frac{x}{3}$ es:',c:'$\\frac{5x}{6}$',o:['$\\frac{2x}{5}$','$\\frac{x}{5}$','$x$'],ans:'$\\frac{5x}{6}$'},
    {q:'$\\frac{x^2-4}{x-2} \\div \\frac{x+2}{3}$ es:',c:'$3$',o:['$x-2$','$\\frac{3}{x-2}$','$x+2$'],ans:'$3$'},
    {q:'$\\frac{a}{b} \\div \\frac{c}{d}$ es:',c:'$\\frac{ad}{bc}$',o:['$\\frac{ac}{bd}$','$\\frac{a+b}{c+d}$','$\\frac{ab}{cd}$'],ans:'$\\frac{ad}{bc}$'},
    {q:'$\\frac{4x}{6x^2}$ simplificado:',c:'$\\frac{2}{3x}$',o:['$\\frac{2x}{3}$','$\\frac{4}{6}$','$\\frac{2}{3}$'],ans:'$\\frac{2}{3x}$'},
  ];
  return probs.map(t=>{
    const res=mkOpts(t.c,t.o);
    return{t:'fracciones-alg',q:t.q,tx:t.tx||t.q.replace(/\$/g,''),o:res.o,d:'media',ci:res.ci};
  });
}

function genCalc(){
  const probs=[
    {q:'$\\frac{d}{dx}(x^3+2x)$ es:',c:'$3x^2+2$',o:['$3x^2+2x$','$x^2+2$','$x^3+2$'],ans:'$3x^2+2$'},
    {q:'$\\frac{d}{dx}(\\sin x)$ es:',c:'$\\cos x$',o:['$-\\cos x$','$\\sin x$','$-\\sin x$'],ans:'$\\cos x$'},
    {q:'$\\frac{d}{dx}(\\ln x)$ es:',c:'$\\frac{1}{x}$',o:['$\\frac{1}{\\ln x}$','$x$','$e^x$'],ans:'$\\frac{1}{x}$'},
    {q:'$\\frac{d}{dx}(e^x)$ es:',c:'$e^x$',o:['$xe^{x-1}$','$\\ln x$','$e^{x-1}$'],ans:'$e^x$'},
    {q:'$\\int 2x\\,dx$ es:',c:'$x^2+C$',o:['$x^2$','$2x^2+C$','$\\frac{x^2}{2}+C$'],ans:'$x^2+C$'},
    {q:'$\\int \\cos x\\,dx$ es:',c:'$\\sin x+C$',o:['$-\\sin x+C$','$\\cos x+C$','$-\\cos x+C$'],ans:'$\\sin x+C$'},
    {q:'$\\frac{d}{dx}(x^5)$ es:',c:'$5x^4$',o:['$5x^5$','$x^4$','$4x^5$'],ans:'$5x^4$'},
    {q:'$\\frac{d}{dx}(\\cos x)$ es:',c:'$-\\sin x$',o:['$\\sin x$','$-\\cos x$','$\\cos x$'],ans:'$-\\sin x$'},
    {q:'$\\int \\frac{1}{x}\\,dx$ es:',c:'$\\ln|x|+C$',o:['$\\frac{1}{x^2}+C$','$x+C$','$e^x+C$'],ans:'$\\ln|x|+C$'},
    {q:'$\\frac{d}{dx}(2x^3-5x)$ es:',c:'$6x^2-5$',o:['$6x^2-5x$','$2x^2-5$','$2x^3-5$'],ans:'$6x^2-5$'},
  ];
  return probs.map(t=>{
    const res=mkOpts(t.c,t.o);
    return{t:'calculo',q:t.q,tx:t.q.replace(/\$/g,''),o:res.o,d:'dificil',ci:res.ci};
  });
}

function genMore(){
  const probs=[
    {t:'ecuaciones',q:'$|x-3|=5$',tx:'Ecuacion valor absoluto: |x-3|=5',c:'$x=8$ o $x=-2$',o:['$x=8$ o $x=2$','$x=2$ o $x=-8$','$x=8$'],ans:'$x=8$ o $x=-2$'},
    {t:'ecuaciones',q:'$\\sqrt{x+1}=4$',tx:'sqrt(x+1)=4',c:'$15$',o:['$3$','$5$','$17$'],ans:'$15$'},
    {t:'exp-log',q:'$\\log_2 8$ es:',tx:'log_2 8',c:'$3$',o:['$2$','$4$','$16$'],ans:'$3$'},
    {t:'exp-log',q:'$\\log_3 81$ es:',tx:'log_3 81',c:'$4$',o:['$3$','$9$','$27$'],ans:'$4$'},
    {t:'trigonometria',q:'$\\sin^2 x+\\cos^2 x$ es:',tx:'sin^2 x+cos^2 x',c:'$1$',o:['$0$','$-1$','$\\frac{1}{2}$'],ans:'$1$'},
    {t:'trigonometria',q:'$\\tan(\\pi/4)$ es:',tx:'tan(pi/4)',c:'$1$',o:['$0$','$-1$','$\\frac{\\sqrt{3}}{3}$'],ans:'$1$'},
    {t:'trigonometria',q:'$\\sec(0)$ es:',tx:'sec(0)',c:'$1$',o:['$0$','$-1$','$\\infty$'],ans:'$1$'},
    {t:'inecuaciones',q:'$x^2-4<0$',tx:'x^2-4<0',c:'$-2<x<2$',o:['$x<-2$ o $x>2$','$x<2$','$x>-2$'],ans:'$-2<x<2$'},
    {t:'inecuaciones',q:'$|x|>3$',tx:'|x|>3',c:'$x<-3$ o $x>3$',o:['$-3<x<3$','$x>3$','$x<-3$'],ans:'$x<-3$ o $x>3$'},
    {t:'factorizacion',q:'$x^3-8$ factorizado es:',tx:'Factorizar x^3-8',c:'$(x-2)(x^2+2x+4)$',o:['$(x+2)(x^2-2x+4)$','$(x-2)^3$','$(x-2)(x^2+4)$'],ans:'$(x-2)(x^2+2x+4)$'},
    {t:'factorizacion',q:'$27x^3+1$ factorizado es:',tx:'Factorizar 27x^3+1',c:'$(3x+1)(9x^2-3x+1)$',o:['$(3x-1)(9x^2+3x+1)$','$(3x+1)^3$','$(3x+1)(9x^2+3x+1)$'],ans:'$(3x+1)(9x^2-3x+1)$'},
    {t:'tec-matematica',q:'La pendiente de $y=3x-5$ es:',tx:'pendiente y=3x-5',c:'$3$',o:['$-5$','$5$','$\\frac{1}{3}$'],ans:'$3$'},
    {t:'tec-matematica',q:'La pendiente de recta por (1,2) y (3,8) es:',tx:'pendiente (1,2)(3,8)',c:'$3$',o:['$2$','$4$','$6$'],ans:'$3$'},
    {t:'tec-matematica',q:'Dominio de $f(x)=\\frac{1}{x-3}$:',tx:'dominio 1/(x-3)',c:'$x\\neq3$',o:['$x>3$','$x<3$','$x=3$'],ans:'$x\\neq3$'},
    {t:'tec-matematica',q:'Rango de $f(x)=x^2$:',tx:'rango x^2',c:'$y\\geq0$',o:['$y>0$','$y\\leq0$','$y$ real'],ans:'$y\\geq0$'},
  ];
  return probs.map(t=>{
    const res=mkOpts(t.c,t.o);
    return{t:t.t,q:t.q,tx:t.tx,o:res.o,d:'media',ci:res.ci};
  });
}

async function insertAll(label,arr){
  let c=0;
  for(let i=0;i<arr.length;i++){
    const src=S+'|'+label+'|'+i;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0)continue;
    try{
      await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [arr[i].t,arr[i].tx,'',JSON.stringify(arr[i].o),JSON.stringify([{math:arr[i].q,expl:''}]),null,arr[i].d||'media','tec_paa',2024,src,A,null,N]);
      c++;
    }catch(e){}
  }
  console.log(label+':',c);
  return c;
}

(async()=>{
  const l=genLogic();const v=genVerbal();const f=genAlgebraicFractions();const c=genCalc();const m=genMore();
  const r1=await insertAll('logic',l);
  const r2=await insertAll('verbal',v);
  const r3=await insertAll('fracalg',f);
  const r4=await insertAll('calc',c);
  const r5=await insertAll('more',m);
  const total=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',total.rows[0].cnt);
  await p.end();
})();
