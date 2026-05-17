process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v14';const A='generacion-programatica';const N='10-11';

const temas=[
  // === FRACCIONES ALGEBRAICAS (30) ===
  {t:'fracciones-alg',q:'Simplificar: (x^2 - 1)/(x - 1)',c:'x + 1',o:['x - 1','(x-1)^2','x^2 + 1']},
  {t:'fracciones-alg',q:'Simplificar: (x^2 - 4)/(x + 2)',c:'x - 2',o:['x + 2','(x+2)^2','x^2 + 4']},
  {t:'fracciones-alg',q:'Simplificar: (x^2 - 9)/(x^2 - 3x)',c:'(x + 3)/x',o:['x + 3','(x-3)/x','(x+3)/(x-3)']},
  {t:'fracciones-alg',q:'Simplificar: (x^2 + 4x)/(x^2 - 16)',c:'x/(x - 4)',o:['x/(x + 4)','(x+4)/(x-4)','(x-4)/x']},
  {t:'fracciones-alg',q:'Simplificar: (x^3 - 8)/(x - 2)',c:'x^2 + 2x + 4',o:['x^2 - 2x + 4','(x+2)^2','x^2 + 4']},
  {t:'fracciones-alg',q:'2/3x + 1/3x =',c:'1/x',o:['3/6x','1/3x','2/6x']},
  {t:'fracciones-alg',q:'1/(x+1) + 2/(x+1) =',c:'3/(x+1)',o:['2x/(x+1)','3x/(x+1)','2/(x+1)']},
  {t:'fracciones-alg',q:'x/(x+1) - 2x/(x+1) =',c:'-x/(x+1)',o:['x/(x+1)','-2x/(x+1)','3x/(x+1)']},
  {t:'fracciones-alg',q:'2/x + 3/x^2 =',c:'(2x+3)/x^2',o:['5/x^2','(2x+3)/(x^3)','5/(2x^2)']},
  {t:'fracciones-alg',q:'1/(x-1) - 1/(x+1) =',c:'2/(x^2-1)',o:['2/(x^2+1)','2x/(x^2-1)','-2/(x^2-1)']},
  {t:'fracciones-alg',q:'Simplificar: (x^2 - 5x + 6)/(x - 2)',c:'x - 3',o:['x + 3','(x-3)(x-2)','x^2 - 5x']},
  {t:'fracciones-alg',q:'(2x)/5 * 10/(4x^2) =',c:'1/x',o:['5/x','1/(2x)','20x/20x^2']},
  {t:'fracciones-alg',q:'(x^2 - 16)/(x+4) * (x+4)/(x-4) =',c:'x+4',o:['x-4','(x+4)^2/(x-4)','(x-4)^2']},
  {t:'fracciones-alg',q:'(x+1)/3x^2 * 6x/(x^2-1) =',c:'2/(x(x-1))',o:['2/(x+1)','6x/(3x^2(x^2-1))','(x+1)/(x-1)']},
  {t:'fracciones-alg',q:'(x^2-9)/(x^2-4) * (x-2)/(x-3) =',c:'(x+3)/(x+2)',o:['(x-3)/(x-2)','(x+3)/(x-2)','(x-3)/(x+2)']},
  {t:'fracciones-alg',q:'(x+2)/(x-3) / (x+2)/(x+3) =',c:'(x+3)/(x-3)',o:['(x-3)/(x+3)','1','(x+2)^2/(x^2-9)']},
  {t:'fracciones-alg',q:'(x^2-1)/(x+1) / (x^2+1)/(x-1) =',c:'(x-1)^2/(x^2+1)',o:['(x+1)^2/(x^2+1)','(x^2-1)^2/(x+1)^2','(x-1)/(x+1)']},
  {t:'fracciones-alg',q:'(a/b) + (c/d) =',c:'(ad+bc)/(bd)',o:['(a+c)/(b+d)','(ac)/(bd)','(a+c)/(bd)']},
  {t:'fracciones-alg',q:'(a/b) * (c/d) =',c:'(ac)/(bd)',o:['(a+c)/(b+d)','(ab)/(cd)','a/(bd)']},
  {t:'fracciones-alg',q:'(a/b) / (c/d) =',c:'(ad)/(bc)',o:['(ac)/(bd)','(a+c)/(b+d)','(ab)/(cd)']},
  {t:'fracciones-alg',q:'1/(x+1) + 1/(x+2) =',c:'(2x+3)/((x+1)(x+2))',o:['2/(2x+3)','1/(x^2+3x+2)','(x+3)/(2x+3)']},
  {t:'fracciones-alg',q:'3/(x-2) - 1/(x+1) =',c:'(2x+5)/((x-2)(x+1))',o:['(2x+5)/((x-2)(x+1))','(3x+1- x+2)/(x-2)(x+1)','(3x+1)/(x-2)(x+1)']},
  {t:'fracciones-alg',q:'Simplificar: (x^3 + x^2)/(x^2 + x)',c:'x',o:['x+1','x^2','1']},
  {t:'fracciones-alg',q:'Simplificar: (2x^2 + 4x)/(2x^2 - 8)',c:'x/(x-2)',o:['(x+2)/(x-2)','2x/(x-2)','(2x^2+4x)/(2x^2-8)']},
  {t:'fracciones-alg',q:'(x+3)/x + (2x-1)/x^2 =',c:'(x^2+5x-1)/x^2',o:['(3x+2)/x^2','(x^2+3x-1)/x^2','(x+1)/x']},
  {t:'fracciones-alg',q:'(x^2 - y^2)/(x+y) =',c:'x - y',o:['x + y','y - x','(x-y)^2']},
  {t:'fracciones-alg',q:'(a+b)^2/(a^2 - b^2) =',c:'(a+b)/(a-b)',o:['(a-b)/(a+b)','(a+b)^2/(a-b)','(a+b)/(a^-b^2)']},
  {t:'fracciones-alg',q:'1/x + 1/y, simplificar:',c:'(x+y)/(xy)',o:['(xy)/(x+y)','2/(x+y)','(x+y)/2']},
  {t:'fracciones-alg',q:'x/y - y/x =',c:'(x^2-y^2)/(xy)',o:['(x-y)/(xy)','(x^2+y^2)/(xy)','(xy)/(x^2-y^2)']},
  {t:'fracciones-alg',q:'(x+1)/(x-1) + (x-1)/(x+1) =',c:'(2x^2+2)/(x^2-1)',o:['(2x)/(x^2-1)','(x^2+1)/(x^2-1)','(2x+2)/(x^2-1)']},

  // === INECUACIONES (35) ===
  {t:'inecuaciones',q:'Resolver: x + 3 > 7',c:'x > 4',o:['x < 4','x > 10','x > -4']},
  {t:'inecuaciones',q:'Resolver: 2x - 5 < 1',c:'x < 3',o:['x > 3','x < -3','x < 6']},
  {t:'inecuaciones',q:'Resolver: -3x < 9',c:'x > -3',o:['x < -3','x < 3','x > 3']},
  {t:'inecuaciones',q:'Resolver: 4 - x ≥ 6',c:'x ≤ -2',o:['x ≥ -2','x ≤ 2','x ≥ 2']},
  {t:'inecuaciones',q:'Resolver: 5x + 2 ≥ 3x + 10',c:'x ≥ 4',o:['x ≥ -4','x ≤ 4','x ≤ -4']},
  {t:'inecuaciones',q:'Resolver: 2x - 7 < 5x + 2',c:'x > -3',o:['x < -3','x > 3','x < 3']},
  {t:'inecuaciones',q:'Resolver: 3(x-2) ≤ x+4',c:'x ≤ 5',o:['x ≥ 5','x ≤ 1','x ≥ 1']},
  {t:'inecuaciones',q:'Resolver: 2(x-1) > 3(x-2)',c:'x < 4',o:['x > 4','x < -4','x > -4']},
  {t:'inecuaciones',q:'Resolver: x^2 - 9 > 0',c:'x < -3 o x > 3',o:['-3 < x < 3','x < 3','x > 3']},
  {t:'inecuaciones',q:'Resolver: x^2 - 4 ≤ 0',c:'-2 ≤ x ≤ 2',o:['x ≤ -2 o x ≥ 2','x ≤ 2','x ≥ -2']},
  {t:'inecuaciones',q:'Resolver: x^2 - x - 6 > 0',c:'x < -2 o x > 3',o:['-2 < x < 3','x < -3 o x > 2','-3 < x < 2']},
  {t:'inecuaciones',q:'Resolver: x^2 - 5x + 6 < 0',c:'2 < x < 3',o:['x < 2 o x > 3','x < 2','x > 3']},
  {t:'inecuaciones',q:'Resolver: (x-3)(x+1) ≥ 0',c:'x ≤ -1 o x ≥ 3',o:['-1 ≤ x ≤ 3','x ≤ 1 o x ≥ 3','-3 ≤ x ≤ 1']},
  {t:'inecuaciones',q:'Resolver: (x+2)(x-4) < 0',c:'-2 < x < 4',o:['x < -2 o x > 4','x < 4','x > -2']},
  {t:'inecuaciones',q:'Resolver: |x| < 5',c:'-5 < x < 5',o:['x < -5 o x > 5','x < 5','x > -5']},
  {t:'inecuaciones',q:'Resolver: |x| ≥ 3',c:'x ≤ -3 o x ≥ 3',o:['-3 ≤ x ≤ 3','x ≤ 3','x ≥ 3']},
  {t:'inecuaciones',q:'Resolver: |2x-1| < 3',c:'-1 < x < 2',o:['-2 < x < 1','x < -1 o x > 2','x < 2']},
  {t:'inecuaciones',q:'Resolver: |x+4| ≥ 2',c:'x ≤ -6 o x ≥ -2',o:['-6 ≤ x ≤ -2','x ≤ -4 o x ≥ 2','-4 ≤ x ≤ 4']},
  {t:'inecuaciones',q:'Resolver: 3x + 7 > 2x + 1',c:'x > -6',o:['x < -6','x > 6','x < 6']},
  {t:'inecuaciones',q:'Resolver: 4(x+2) < 3x + 5',c:'x < -3',o:['x > -3','x < 3','x > 3']},
  {t:'inecuaciones',q:'Resolver: 2x/3 - 1/2 > x/6',c:'x > 1',o:['x < 1','x > -1','x < -1']},
  {t:'inecuaciones',q:'Resolver: 0.5x + 1.2 ≥ 2x - 0.3',c:'x ≤ 1',o:['x ≥ 1','x ≤ 2','x ≥ 2']},
  {t:'inecuaciones',q:'Resolver: x^2 - 16 ≤ 0',c:'-4 ≤ x ≤ 4',o:['x ≤ -4 o x ≥ 4','x ≤ 4','x ≥ -4']},
  {t:'inecuaciones',q:'Resolver: x^2 - 2x - 8 > 0',c:'x < -2 o x > 4',o:['-2 < x < 4','x < -4 o x > 2','-4 < x < 2']},
  {t:'inecuaciones',q:'Resolver: x^2 + 5x + 6 ≤ 0',c:'-3 ≤ x ≤ -2',o:['x ≤ -3 o x ≥ -2','-2 ≤ x ≤ 3','x ≤ -2 o x ≥ 3']},
  {t:'inecuaciones',q:'Resolver: 2/(x-3) > 0',c:'x > 3',o:['x < 3','x > 0','x < 0']},
  {t:'inecuaciones',q:'Resolver: (x+1)/(x-2) < 0',c:'-1 < x < 2',o:['x < -1 o x > 2','x < -1','x > 2']},
  {t:'inecuaciones',q:'Resolver: (x-1)(x+3)(x-5) < 0 usando signos',c:'x < -3 o 1 < x < 5',o:['-3 < x < 1 o x > 5','x < -3 o x > 5','-3 < x < 5']},
  {t:'inecuaciones',q:'Resolver: 3/x ≥ 2',c:'0 < x ≤ 3/2',o:['x ≥ 3/2','x ≤ 3/2','x < 0 o x ≥ 3/2']},
  {t:'inecuaciones',q:'Resolver: 1/(x+1) > 1/(x-1)',c:'-1 < x < 1',o:['x < -1 o x > 1','x > 1','x < -1']},
  {t:'inecuaciones',q:'Resolver: -5 < 2x - 3 < 7',c:'-1 < x < 5',o:['-4 < x < 5','-1 < x < 2','4 < x < 10']},
  {t:'inecuaciones',q:'Resolver: 1 ≤ 3x - 2 ≤ 10',c:'1 ≤ x ≤ 4',o:['1/3 ≤ x ≤ 8/3','3 ≤ x ≤ 12','1 ≤ x ≤ 12/3']},
  {t:'inecuaciones',q:'x + y > 4 y x = 2, entonces:',c:'y > 2',o:['y < 2','y > 6','y < 6']},
  {t:'inecuaciones',q:'2x + 3y < 12 y x = 3, entonces:',c:'y < 2',o:['y > 2','y < 6','y > 6']},
  {t:'inecuaciones',q:'La solucion de x^2 > 25 es:',c:'x < -5 o x > 5',o:['-5 < x < 5','x < 5','x > 5']},

  // === TRIGONOMETRIA (25) ===
  {t:'trigonometria',q:'sen(0°) =',c:'0',o:['1','-1','√2/2']},
  {t:'trigonometria',q:'cos(0°) =',c:'1',o:['0','-1','√2/2']},
  {t:'trigonometria',q:'sen(45°) =',c:'√2/2',o:['1/2','√3/2','1']},
  {t:'trigonometria',q:'cos(60°) =',c:'1/2',o:['0','√2/2','√3/2']},
  {t:'trigonometria',q:'tan(45°) =',c:'1',o:['0','√3','∞']},
  {t:'trigonometria',q:'sen(30°) =',c:'1/2',o:['0','√2/2','√3/2']},
  {t:'trigonometria',q:'cos(180°) =',c:'-1',o:['0','1','√2/2']},
  {t:'trigonometria',q:'tan(90°) =',c:'∞ (indefinido)',o:['0','1','√3']},
  {t:'trigonometria',q:'sen(90°) =',c:'1',o:['0','-1','√2/2']},
  {t:'trigonometria',q:'cos(45°) =',c:'√2/2',o:['1/2','√3/2','1']},
  {t:'trigonometria',q:'sen^2(x) + cos^2(x) =',c:'1',o:['0','-1','sen x cos x']},
  {t:'trigonometria',q:'sen(2x) =',c:'2 sen x cos x',o:['sen^2 x + cos^2 x','1 - cos 2x','2 cos^2 x - 1']},
  {t:'trigonometria',q:'cos(2x) =',c:'cos^2 x - sen^2 x',o:['2 sen x cos x','1 - 2 sen^2 x','sen^2 x + cos^2 x']},
  {t:'trigonometria',q:'tan(x) =',c:'sen x / cos x',o:['cos x / sen x','1 / sen x','1 / cos x']},
  {t:'trigonometria',q:'csc(x) =',c:'1 / sen x',o:['1 / cos x','1 / tan x','sen x / cos x']},
  {t:'trigonometria',q:'sec(x) =',c:'1 / cos x',o:['1 / sen x','1 / tan x','cos x / sen x']},
  {t:'trigonometria',q:'cot(x) =',c:'cos x / sen x',o:['sen x / cos x','1 / sen x','1 / cos x']},
  {t:'trigonometria',q:'En un triangulo rectangulo, sen A = 3/5, entonces cos A =',c:'4/5',o:['3/5','5/3','2/5']},
  {t:'trigonometria',q:'En un triangulo rectangulo, la hipotenusa mide 10 y un cateto 6, el otro cateto mide:',c:'8',o:['7','12','4']},
  {t:'trigonometria',q:'Un angulo de 270° equivale a:',c:'3π/2 rad',o:['π rad','2π rad','π/2 rad']},
  {t:'trigonometria',q:'π radianes equivale a:',c:'180°',o:['90°','360°','270°']},
  {t:'trigonometria',q:'sen(150°) =',c:'1/2',o:['-1/2','√3/2','-√3/2']},
  {t:'trigonometria',q:'cos(120°) =',c:'-1/2',o:['1/2','√3/2','-√3/2']},
  {t:'trigonometria',q:'La amplitud de y = 3 sen x es:',c:'3',o:['1','-3','6']},
  {t:'trigonometria',q:'El periodo de y = sen 2x es:',c:'π',o:['2π','4π','π/2']},
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
