process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v5';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const extra=[
  {t:'tec-logica',q:'En un grupo de 6 personas, cuantos apretones de mano hay si cada una saluda a todas?',c:'15',o:['12','30','36']},
  {t:'tec-logica',q:'Si p es F y q es V, entonces pvq es:',c:'V',o:['F','No se puede','p']},
  {t:'tec-logica',q:'La probabilidad de sacar un as de una baraja de 52 cartas es:',c:'1/13',o:['1/52','1/4','4/13']},
  {t:'tec-logica',q:'De cuantas formas se pueden ordenar 3 libros en un estante?',c:'6',o:['3','9','27']},
  {t:'tec-logica',q:'Cual es la moda de {1,2,2,3,4,4,4,5}?',c:'4',o:['2','3','5']},
  {t:'tec-logica',q:'La mediana de {3,5,7,9,11} es:',c:'7',o:['5','9','35']},
  {t:'tec-logica',q:'Si A={a,b,c}, B={c,d,e}, AUB es:',c:'{a,b,c,d,e}',o:['{c}','{a,b}','{d,e}']},
  {t:'tec-logica',q:'Cuantos subconjuntos tiene {1,2,3}?',c:'8',o:['6','3','4']},
  {t:'tec-verbal',q:'Sinonimo de "magnanimidad":',c:'Generosidad',o:['Malicia','Tacanneria','Pobreza']},
  {t:'tec-verbal',q:'Antonimo de "prosperidad":',c:'Adversidad',o:['Riqueza','Exito','Fortuna']},
  {t:'tec-verbal',q:'Sinonimo de "candido":',c:'Ingenuo',o:['Astuto','Sabio','Viejo']},
  {t:'tec-verbal',q:'Complete la serie: 1, 1, 2, 3, 5, 8, __',c:'13',o:['11','12','10']},
  {t:'tec-verbal',q:'Nave es a agua como avion es a:',c:'Aire',o:['Tierra','Mar','Viento']},
  {t:'tec-verbal',q:'Antonimo de "parco":',c:'Hablar',o:['Callado','Sobrio','Reservado']},
  {t:'fracciones-alg',q:'$(3x+6)/(x+2)$ simplificado:',c:'3',o:['x+3','3x','6']},
  {t:'fracciones-alg',q:'$(x^2-16)/(x-4)$ simplificado:',c:'x+4',o:['x-4','x+16','x^2+4']},
  {t:'fracciones-alg',q:'$2/x + 3/x$ es:',c:'5/x',o:['6/x','6/x^2','5/(2x)']},
  {t:'fracciones-alg',q:'$(x/3) * (6/x^2)$ es:',c:'2/x',o:['(6x)/(3x^2)','2/x^2','x/18']},
  {t:'calculo',q:'limite cuando x tiende a 2 de (x+3) es:',c:'5',o:['2','3','0']},
  {t:'calculo',q:'Derivada de x^4 es:',c:'4x^3',o:['4x^4','x^3','x^5/5']},
  {t:'calculo',q:'Integral de 3x^2 dx es:',c:'x^3+C',o:['x^2+C','3x^3+C','(3x^3)/3+C']},
  {t:'calculo',q:'Derivada de tan x es:',c:'sec^2 x',o:['csc^2 x','cot x','sec x tan x']},
  {t:'trigonometria',q:'Valor de sen(pi/2):',c:'1',o:['0','-1','sqrt2/2']},
  {t:'trigonometria',q:'Valor de cos(pi):',c:'-1',o:['0','1','1/2']},
  {t:'trigonometria',q:'Valor de tan(pi/3):',c:'sqrt3',o:['sqrt3/3','1','0']},
  {t:'trigonometria',q:'Valor de sen(30°):',c:'1/2',o:['sqrt3/2','sqrt2/2','1']},
  {t:'inecuaciones',q:'Resolver x+5>12:',c:'x>7',o:['x<7','x>17','x<17']},
  {t:'inecuaciones',q:'Resolver 2x-3<=7:',c:'x<=5',o:['x>=5','x<5','x<=10']},
  {t:'inecuaciones',q:'Resolver x^2-9>0:',c:'x<-3 o x>3',o:['-3<x<3','x>3','x<-3']},
  {t:'inecuaciones',q:'Resolver (x-2)/(x+1)>0:',c:'x<-1 o x>2',o:['-1<x<2','x>2','x<-1']},
  {t:'ecuaciones',q:'Resolver 3(x-4)=2(x+1):',c:'14',o:['-14','10','12']},
  {t:'ecuaciones',q:'Resolver x/2+x/3=5:',c:'6',o:['5','10','1']},
  {t:'ecuaciones',q:'Resolver x^2-5x+6=0:',c:'2 y 3',o:['-2 y -3','1 y 6','2 y 4']},
  {t:'ecuaciones',q:'Resolver 2x^2-8=0:',c:'+-2',o:['+-4','+-sqrt2','+-8']},
  {t:'tec-matematica',q:'Si f(x)=4x-7, f(3) es:',c:'5',o:['12','-7','4']},
  {t:'tec-matematica',q:'El intersecto en y de y=2x-5 es:',c:'-5',o:['2','5','-2']},
  {t:'tec-matematica',q:'Si f(x)=x^2+1, f(-2) es:',c:'5',o:['3','-3','1']},
  {t:'tec-matematica',q:'La raiz de f(x)=3x-12 es:',c:'4',o:['12','3','-4']},
  {t:'exp-log',q:'2^3 * 2^4 =',c:'2^7',o:['2^12','4^7','2^1']},
  {t:'exp-log',q:'(2^3)^2 =',c:'2^6',o:['2^5','2^9','2^1']},
  {t:'exp-log',q:'2^5 / 2^2 =',c:'2^3',o:['2^7','2^10','2^2']},
  {t:'exp-log',q:'ln(e) =',c:'1',o:['0','e','-1']},
  {t:'factorizacion',q:'Factorizar x^2-6x+9:',c:'(x-3)^2',o:['(x+3)^2','(x-9)^2','(x-3)(x+3)']},
  {t:'factorizacion',q:'Factorizar x^2+4x+4:',c:'(x+2)^2',o:['(x-2)^2','(x+4)^2','(x+2)(x-2)']},
];

(async()=>{
  let c=0;
  for(let i=0;i<extra.length;i++){
    const e=extra[i];const src=S+'|'+e.t+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){
      await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [e.t,e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:''}]),null,'media','tec_paa',2024,src,A,null,N]);c++;
    }
  }
  console.log('inserted:',c);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
