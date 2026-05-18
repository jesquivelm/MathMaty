process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v21';const A='generacion-programatica';const N='10-11';

const temas=[
  {t:'fracciones-alg',q:'(x^2+3x-10)/(x^2-4) =',c:'(x+5)/(x+2)',o:['(x-5)/(x-2)','(x+5)/(x-2)','(x-2)/(x+5)']},
  {t:'fracciones-alg',q:'(x^2+4x-5)/(x^2+10x+25) =',c:'(x-1)/(x+5)',o:['(x+1)/(x-5)','(x+1)/(x+5)','(x-5)/(x-1)']},
  {t:'fracciones-alg',q:'(2x^2+9x+9)/(x^2+5x+6) =',c:'(2x+3)/(x+2)',o:['(2x+3)/(x+3)','(x+3)/(x+2)','(2x+9)/(x+6)']},
  {t:'fracciones-alg',q:'(3x^2+5x-2)/(x^2+4x+4) =',c:'(3x-1)/(x+2)',o:['(3x+1)/(x+2)','(x+2)/(3x-1)','(3x-1)/(x-2)']},
  {t:'fracciones-alg',q:'(4x^2+8x+3)/(2x^2+5x+3) =',c:'(2x+1)/(x+1)',o:['(2x+3)/(x+3)','(2x+1)/(2x+3)','(4x+3)/(2x+3)']},
  {t:'fracciones-alg',q:'(x^2+9x+20)/(x^2+4x-5) =',c:'(x+4)/(x-1)',o:['(x+5)/(x-1)','(x+4)/(x+5)','(x+5)/(x-5)']},
  {t:'fracciones-alg',q:'(x^2-7x+12)/(x^2+2x-15) =',c:'(x-4)/(x+5)',o:['(x-3)/(x-5)','(x-4)/(x-3)','(x-3)/(x+5)']},
  {t:'fracciones-alg',q:'(x^2+2x-8)/(x^2-3x+2) =',c:'(x+4)/(x-1)',o:['(x-4)/(x-1)','(x+4)/(x+1)','(x-2)/(x-1)']},
  {t:'fracciones-alg',q:'(3x^2-10x-8)/(x^2-6x+8) =',c:'(3x+2)/(x-2)',o:['(3x-2)/(x-2)','(3x+2)/(x-4)','(3x-4)/(x-2)']},
  {t:'fracciones-alg',q:'(a^2-12a+36)/(a^2-36) =',c:'(a-6)/(a+6)',o:['(a+6)/(a-6)','(a-6)/6','(a-6)^2/(a^2-36)']},
  {t:'fracciones-alg',q:'1/(x-2) + 2/(x+2) =',c:'(3x-2)/((x-2)(x+2))',o:['(3x+2)/(x^2-4)','(2x+3)/(x^2-4)','3/(2x)']},
  {t:'fracciones-alg',q:'3/(x+3) - 1/(x-2) =',c:'(2x-9)/((x+3)(x-2))',o:['(3x-6-x-3)/((x+3)(x-2))','(2x-3)/(x^2+x-6)','(3x-6-x+3)/((x+3)(x-2))']},
  {t:'fracciones-alg',q:'(x+2)/x + (x-3)/(x+1) =',c:'(2x^2-1)/(x(x+1))',o:['(x+2+x-3)/(x(x+1))','(x^2+3x+2+x^2-3x)/(x(x+1))','(x+2)/(x(x+1))']},
  {t:'fracciones-alg',q:'(x+1)/(x-2) + (x+3)/(x+1) =',c:'(2x^2+3x+7)/((x-2)(x+1))',o:['(2x^2+3x-5)/((x-2)(x+1))','(x+1+x+3)/((x-2)(x+1))','(x^2+2x+1+x^2+x-6)/((x-2)(x+1))']},
  {t:'fracciones-alg',q:'2x/(x-3) - x/(x+1) =',c:'(x^2+5x)/((x-3)(x+1))',o:['(x^2+3x)/((x-3)(x+1))','(x^2-5x)/((x-3)(x+1))','(x^2+ x)/((x-3)(x+1))']},
  {t:'fracciones-alg',q:'1/(1+1/x) =',c:'x/(x+1)',o:['1/(x+1)','x/(x-1)','(x+1)/x']},
  {t:'fracciones-alg',q:'(x-1/x)/(1-1/x) =',c:'x+1',o:['x-1','(x+1)(x-1)/x','(x^2-1)/(x-1)']},
  {t:'fracciones-alg',q:'(1 + 1/(x-1)) / (1 - 1/(x-1)) =',c:'x/(x-2)',o:['(x-1)/(x-3)','(x+1)/(x-1)','(x-1)/x']},
  {t:'fracciones-alg',q:'(x/(x+1) - 1) / (1 + x/(x+1)) =',c:'-1/(2x+1)',o:['1/(2x+1)','-1/(x+1)','1/(x+1)']},
  {t:'fracciones-alg',q:'(a/b + b/a) / (1/a + 1/b) =',c:'(a^2 + b^2)/(a+b)',o:['(a+b)/(ab)','(a+b)^2/(ab(a+b))','(a^2+b^2)/(ab(a+b))']},
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
