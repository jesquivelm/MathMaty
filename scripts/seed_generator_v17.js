process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v17';const A='generacion-programatica';const N='10-11';

const temas=[
  // === FRACCIONES ALGEBRAICAS (35) ===
  {t:'fracciones-alg',q:'(x^2+8x+15)/(x^2+6x+9) =',c:'(x+5)/(x+3)',o:['(x+3)/(x+5)','(x-5)/(x-3)','(x+5)/(x-3)']},
  {t:'fracciones-alg',q:'(x^2-2x-15)/(x^2+3x-10) =',c:'(x-5)/(x-2)',o:['(x+5)/(x+2)','(x-3)/(x+5)','(x-5)/(x+5)']},
  {t:'fracciones-alg',q:'(2x^2+5x-3)/(x^2+2x-3) =',c:'(2x-1)/(x-1)',o:['(2x+1)/(x+1)','(2x-1)/(x+3)','(2x+3)/(x-1)']},
  {t:'fracciones-alg',q:'(6x^2+5x-6)/(2x^2-3x-2) =',c:'(3x-2)/(x-2)',o:['(2x+3)/(2x+1)','(3x+2)/(x+1)','(6x-1)/(2x+1)']},
  {t:'fracciones-alg',q:'(x^3-64)/(x^2+4x+16) =',c:'x-4',o:['x+4','(x-4)^2','x^2-4x+16']},
  {t:'fracciones-alg',q:'(x^3-1)/(x^3+1) =',c:'(x-1)(x^2+x+1)/((x+1)(x^2-x+1))',o:['(x-1)/(x+1)','(x^2+x+1)/(x^2-x+1)','(x-1)^2/(x+1)^2']},
  {t:'fracciones-alg',q:'(4x^2-25)/(2x^2+3x-20) =',c:'(2x-5)/(x+4)',o:['(2x+5)/(x-4)','(4x-5)/(2x+5)','(2x+5)/(x+4)']},
  {t:'fracciones-alg',q:'(x^2+2x-24)/(x^2+11x+28) =',c:'(x-4)/(x+7)',o:['(x+6)/(x+7)','(x-4)/(x+4)','(x+6)/(x+4)']},
  {t:'fracciones-alg',q:'(x^2-11x+28)/(x^2-5x-14) =',c:'(x-4)/(x+2)',o:['(x-7)/(x+7)','(x-4)/(x-7)','(x-7)/(x+2)']},
  {t:'fracciones-alg',q:'(3x^3-24)/(x^3+2x^2+4x) =',c:'3(x-2)/x',o:['3(x+2)/x','(3x-6)/(x+2)','3/(x+2)']},
  {t:'fracciones-alg',q:'(x^4-16)/(x^3-8) =',c:'(x^2+4)(x+2)/(x^2+2x+4)',o:['(x-2)(x+2)/(x-2)','(x^2+4)/(x+2)','(x-2)^2/(x^2+2x+4)']},
  {t:'fracciones-alg',q:'(2x^2-8)/(3x^2-6x) =',c:'2(x+2)/(3x)',o:['2(x-2)/(3x)','(x+2)/(3x)','(x^2-4)/(3x^2-6x)']},
  {t:'fracciones-alg',q:'(x^3-3x^2)/(x^2-9) =',c:'x^2/(x+3)',o:['x/(x+3)','x^2/(x-3)','(x^2-3x)/(x+3)']},
  {t:'fracciones-alg',q:'(2x^3-8x)/(4x^2-8x) =',c:'(x+2)/2',o:['(x-2)/2','x/2','(2x+4)/(4x)']},
  {t:'fracciones-alg',q:'(9-x^2)/(x^2-6x+9) =',c:'-(x+3)/(x-3)',o:['(x+3)/(x-3)','(3-x)/(x-3)','(9-x^2)/(x-3)^2']},
  {t:'fracciones-alg',q:'(x^4-81)/(x^2+9) =',c:'x^2-9',o:['x^2+9','(x-3)(x+3)','(x^2-9)^2']},
  {t:'fracciones-alg',q:'(x^2+1)/x - (x+1)/x^2 =',c:'(x^3-1)/x^2',o:['(x^3+1)/x^2','(x^2-1)/x^2','(x^3+x-1)/x^2']},
  {t:'fracciones-alg',q:'2/(x-3) + 1/(x+2) =',c:'(3x+1)/((x-3)(x+2))',o:['3/(2x-1)','(2x-1)/((x-3)(x+2))','(3x+1)/((x-3)(x-2))']},
  {t:'fracciones-alg',q:'5/(x+1) - 2/(x-3) =',c:'(3x-17)/((x+1)(x-3))',o:['3/(x^2-2x-3)','(3x+17)/((x+1)(x-3))','(5x+1)/((x+1)(x-3))']},
  {t:'fracciones-alg',q:'(x+2)/4x - (x-1)/6x =',c:'(x+8)/(12x)',o:['(x-8)/(12x)','(x+4)/(12x)','(x+8)/(24x)']},
  {t:'fracciones-alg',q:'1/(x^2-1) + 1/(x+1) =',c:'x/(x^2-1)',o:['1/(x-1)','(x+2)/(x^2-1)','(x+1)/(x^2-1)']},
  {t:'fracciones-alg',q:'(x+1)/(x^2-4) - 1/(x-2) =',c:'-1/(x+2)',o:['(x+1-x-2)/(x^2-4)','1/(x+2)','(x+1-x+2)/(x^2-4)']},
  {t:'fracciones-alg',q:'(x^2+4x+4)/(x^2-4) / (x+2)/(x^2-2x) =',c:'x',o:['x+2','x-2','(x+2)^2/x']},
  {t:'fracciones-alg',q:'(a^2-b^2)/(a^2-2ab+b^2) / (a+b)/(a-b) =',c:'(a+b)/(a-b)',o:['(a-b)/(a+b)','(a+b)^2/(a-b)^2','(a-b)^2/(a+b)^2']},
  {t:'fracciones-alg',q:'(x^2-4)/(x^2-3x) * (x^2-4x+3)/(x^2+4x+4) =',c:'(x-1)(x-3)/(x(x+2))',o:['(x-2)/(x+2)','(x-1)/(x+2)','(x-3)/(x+2)']},
  {t:'fracciones-alg',q:'(x^3+27)/(x+3) / (x^2-3x+9)/(x^3-27) =',c:'(x-3)(x^2+3x+9)',o:['(x+3)(x^2-3x+9)','(x-3)/(x+3)','(x+3)(x-3)']},
  {t:'fracciones-alg',q:'(x-y)^2/(x^2-xy) * (x^2-xy+y^2)/(x^3+y^3) =',c:'(x-y)/(x(x+y))',o:['(x-y)/x','(x+y)/x','(x-y)/(x^2+xy+y^2)']},
  {t:'fracciones-alg',q:'(1/a + 1/b) / (a+b) =',c:'1/(ab)',o:['(a+b)/(ab(a+b))','(a+b)/ab','1/(a+b)']},
  {t:'fracciones-alg',q:'(a/b - b/a) / (1/a + 1/b) =',c:'a-b',o:['a+b','(a-b)/ab','(a^2-b^2)/(2ab)']},
  {t:'fracciones-alg',q:'((x-1)/(x+1)) / (1 - 2/(x+1)) =',c:'1',o:['x-1','(x-1)/(x-1)','x+1']},
  {t:'fracciones-alg',q:'(1/(x+1) - 3/(x+2)) / (1/(x+2) - 1/(x+1)) =',c:'(2x+1)/(x+1)',o:['(2x+3)/(x+2)','(2x-1)/(x+1)','(x-1)/(x+2)']},
  {t:'fracciones-alg',q:'(x+1/x) / (1 + 1/x^2) =',c:'x',o:['1/x','x^2','x+1']},
  {t:'fracciones-alg',q:'(x - 4/x) / (1 - 2/x) =',c:'x+2',o:['x-2','(x^2-4)/(x-2)','(x+2)(x-2)/x']},
  {t:'fracciones-alg',q:'(x/(x+1) + 1) / (1 - x/(x+1)) =',c:'2x+1',o:['(2x+1)/(x+1)','(x+1)/(2x+1)','(2x+1)/1']},

  // === EXP-LOG (30) ===
  {t:'exp-log',q:'log_2 8 =',c:'3',o:['2','4','8']},
  {t:'exp-log',q:'log_3 81 =',c:'4',o:['3','5','2']},
  {t:'exp-log',q:'log_5 125 =',c:'3',o:['2','4','5']},
  {t:'exp-log',q:'log_10 1000 =',c:'3',o:['2','4','10']},
  {t:'exp-log',q:'ln 1 =',c:'0',o:['1','e','-1']},
  {t:'exp-log',q:'ln e =',c:'1',o:['0','e','-1']},
  {t:'exp-log',q:'ln e^5 =',c:'5',o:['e^5','5e','ln 5']},
  {t:'exp-log',q:'log_2 16 + log_2 4 =',c:'6',o:['4','5','8']},
  {t:'exp-log',q:'log_2 32 - log_2 8 =',c:'2',o:['3','4','5']},
  {t:'exp-log',q:'log_3 9 + log_3 27 =',c:'5',o:['3','4','6']},
  {t:'exp-log',q:'log_2 (8 * 4) =',c:'5',o:['4','6','32']},
  {t:'exp-log',q:'log_3 (81 / 9) =',c:'2',o:['3','4','9']},
  {t:'exp-log',q:'log_4 64 =',c:'3',o:['2','4','16']},
  {t:'exp-log',q:'log_x 125 = 3, entonces x =',c:'5',o:['25','15','√125']},
  {t:'exp-log',q:'log_2 x = 5, entonces x =',c:'32',o:['25','10','16']},
  {t:'exp-log',q:'log_3 (x+1) = 2, entonces x =',c:'8',o:['5','9','7']},
  {t:'exp-log',q:'2^x = 32, entonces x =',c:'5',o:['4','6','16']},
  {t:'exp-log',q:'3^(x-1) = 27, entonces x =',c:'4',o:['3','5','28']},
  {t:'exp-log',q:'5^x = 1/25, entonces x =',c:'-2',o:['2','-1','1/5']},
  {t:'exp-log',q:'4^x = 8, entonces x =',c:'3/2',o:['2','1','4/3']},
  {t:'exp-log',q:'9^x = 27, entonces x =',c:'3/2',o:['2','3','9/2']},
  {t:'exp-log',q:'log_2 (x-3) = 3, entonces x =',c:'11',o:['5','9','8']},
  {t:'exp-log',q:'log(x^2) = 2 log x para:',c:'x > 0',o:['x > 0 y x ≠ 1','x ≠ 0','x > 1']},
  {t:'exp-log',q:'ln(ab) =',c:'ln a + ln b',o:['ln a * ln b','ln a / ln b','(ln a)(ln b)']},
  {t:'exp-log',q:'ln(a/b) =',c:'ln a - ln b',o:['ln a / ln b','ln a + ln b','ln a * ln b']},
  {t:'exp-log',q:'ln(a^n) =',c:'n ln a',o:['(ln a)^n','ln(n a)','n + ln a']},
  {t:'exp-log',q:'La funcion exponencial f(x)=a^x con a>1 es:',c:'Creciente',o:['Decreciente','Constante','Periodica']},
  {t:'exp-log',q:'Si f(x)=2^x, entonces f(3) =',c:'8',o:['6','9','5']},
  {t:'exp-log',q:'Si f(x)=3^x, el dominio es:',c:'Todos los reales',o:['x > 0','x ≥ 0','x ≠ 0']},
  {t:'exp-log',q:'Si f(x)=ln x, el dominio es:',c:'x > 0',o:['x ≥ 0','x ≠ 0','Todos los reales']},

  // === TRIGONOMETRIA (25) ===
  {t:'trigonometria',q:'sen(π/6) =',c:'1/2',o:['√3/2','√2/2','0']},
  {t:'trigonometria',q:'sen(π/4) =',c:'√2/2',o:['1/2','√3/2','1']},
  {t:'trigonometria',q:'sen(π/3) =',c:'√3/2',o:['1/2','√2/2','√3']},
  {t:'trigonometria',q:'cos(π/6) =',c:'√3/2',o:['1/2','√2/2','0']},
  {t:'trigonometria',q:'cos(π/3) =',c:'1/2',o:['√3/2','√2/2','1']},
  {t:'trigonometria',q:'tan(π/6) =',c:'√3/3',o:['√3','1','1/2']},
  {t:'trigonometria',q:'tan(π/3) =',c:'√3',o:['√3/2','√3/3','1']},
  {t:'trigonometria',q:'cot(π/4) =',c:'1',o:['0','√3','∞']},
  {t:'trigonometria',q:'sec(π/3) =',c:'2',o:['√3','2/√3','1/2']},
  {t:'trigonometria',q:'csc(π/6) =',c:'2',o:['√2','1/2','2/√3']},
  {t:'trigonometria',q:'sen(2π/3) =',c:'√3/2',o:['-√3/2','1/2','-1/2']},
  {t:'trigonometria',q:'cos(5π/6) =',c:'-√3/2',o:['√3/2','-1/2','1/2']},
  {t:'trigonometria',q:'sen(7π/6) =',c:'-1/2',o:['1/2','-√3/2','√3/2']},
  {t:'trigonometria',q:'cos(4π/3) =',c:'-1/2',o:['1/2','-√3/2','√3/2']},
  {t:'trigonometria',q:'tan(5π/4) =',c:'1',o:['-1','0','∞']},
  {t:'trigonometria',q:'sen(300°) =',c:'-√3/2',o:['√3/2','-1/2','1/2']},
  {t:'trigonometria',q:'cos(315°) =',c:'√2/2',o:['-√2/2','1/2','-1/2']},
  {t:'trigonometria',q:'tan(120°) =',c:'-√3',o:['√3','-√3/3','√3/3']},
  {t:'trigonometria',q:'cos(150°) =',c:'-√3/2',o:['√3/2','-1/2','1/2']},
  {t:'trigonometria',q:'1 + tan^2 x =',c:'sec^2 x',o:['csc^2 x','sen^2 x','cos^2 x']},
  {t:'trigonometria',q:'1 + cot^2 x =',c:'csc^2 x',o:['sec^2 x','sen^2 x','cos^2 x']},
  {t:'trigonometria',q:'cos(π - x) =',c:'-cos x',o:['cos x','sen x','-sen x']},
  {t:'trigonometria',q:'sen(π - x) =',c:'sen x',o:['-sen x','cos x','-cos x']},
  {t:'trigonometria',q:'sen(π/2 - x) =',c:'cos x',o:['sen x','-cos x','-sen x']},
  {t:'trigonometria',q:'El periodo de y = tan x es:',c:'π',o:['2π','π/2','3π/2']},
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
