const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

const S='generacion-programatica-v1';
const A='generacion-programatica';
const N='10-11';

function shuffle(a){
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rnd(0,a.length-1)];}

//=========== LINEAR EQUATIONS: ax+b=c ==========
function genLinearEq(){
  const a=rnd(2,8),b=rnd(-8,8),c=rnd(1,20);
  const x=(c-b)/a;
  if(x!==Math.floor(x)||x<-15||x>15)return null;
  const opts=new Set([x]);opts.add(x+rnd(1,4)*(pick([-1,1])));opts.add(x+rnd(2,6)*(pick([-1,1])));opts.add(x+rnd(1,3)*(pick([-1,1])));
  const o=shuffle([...opts].slice(0,4));
  if(o.length<4)return null;
  const ci=o.indexOf(x);
  return{t:'ecuaciones',q:'Resuelve la ecuacion: $'+a+'x'+(b<0?'':'+')+b+'='+c+'$',tx:'Resuelve la ecuacion: '+a+'x'+(b>0?'+':'')+b+'='+c,o,d:'facil',ci};
}

//=========== QUADRATIC EQUATIONS: ax^2+bx+c=0 with integer roots ==========
function genQuadEq(){
  const r1=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]),r2=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  if(r1===r2||Math.abs(r1*r2)>12)return null;
  const a=1,b=-(r1+r2),c=r1*r2;
  const roots=[r1,r2].sort((x,y)=>x-y);
  const opts=[...new Set([String(roots[0])+' y '+String(roots[1]),String(-roots[0])+' y '+String(-roots[1]),String(roots[0]+1)+' y '+String(roots[1]-1),String(roots[0]+2)+' y '+String(roots[1]-2)])];
  if(opts.length<4)return null;
  const correct=opts[0];
  const o=shuffle(opts);
  return{t:'ecuaciones',q:'Las soluciones de $x^2'+(b>0?'+'+b:''+b)+'x'+(c>0?'+'+c:''+c)+'=0$ son:',tx:'Las soluciones de x^2'+(b>0?'+'+b:''+b)+'x'+(c>0?'+'+c:''+c)+'=0',o,d:r1*r2===0?'facil':'media',ci:o.indexOf(correct)};
}

//=========== FACTORING ==========
function genFactor(){
  const t=pick(['diff','trinomio']);
  if(t==='diff'){
    const a=shuffle([1,2,3,4,5,6,7,8,9])[0],bs=pick([1,2,3,4,5,6]);
    const b=bs*sq;
    const term1=Math.pow(b,2);
    // (ax)^2 - b^2
    const a2=a*a,b2=term1;
    const factors='$('+a+'x+'+b+')('+a+'x-'+b+')$';
    const d1='$('+a+'x+'+b+')^2$',d2='$('+a+'x-'+b+')^2$',d3='$('+a+'x+'+b*2+')('+a+'x-'+b*2+')$';
    const opts=[factors,d1,d2,d3];
    return{t:'factorizacion',q:'Factoriza: $'+a2+'x^2-'+b2+'$',tx:'Factoriza: '+a2+'x^2-'+b2,o:d:'media',ci:0};
  }else{
    const r1=pick([2,3,4,5,6]),r2=pick([1,2,3,4,5]);
    const a=1,b=-(r1+r2),c=r1*r2;
    const correct='$(x'+(r1>0?'-'+r1:'+'+(-r1))+')'+(r2>0?'(x-'+r2:''+'(x+'+(-r2))+')$';
    const d1='$(x+'+(r1>0?r1:-r1)+')'+(r2>0?'(x+'+r2:''+'(x'+(-r2))+')$';
    const d2='$(x'+(r1>0?'-'+r1:'+'+(-r1))+')^2$';
    const d3='$(x'+(r2>0?'-'+r2:'+'+(-r2))+')^2$';
    const o=shuffle([correct,d1,d2,d3]);
    return{t:'factorizacion',q:'Factoriza: $x^2'+(b>0?'-'+b:''+b)+'x'+(c>0?'+'+c:''+c)+'$',tx:'Factoriza: x^2'+(b>0?'-'+b:''+b)+'x'+(c>0?'+'+c:''+c),o,d:'media',ci:o.indexOf(correct)};
  }
}

//=========== EXPONENT RULES ==========
function genExp(){
  const a=rnd(2,5),b=rnd(2,5),m=rnd(2,4),n=rnd(1,3);
  const val=Math.pow(a,m)*Math.pow(b,n);
  const opts=new Set([val]);
  opts.add(val+rnd(1,10)*pick([-1,1]));opts.add(val+rnd(5,15)*pick([-1,1]));opts.add(Math.pow(a,m+n)*Math.pow(b,m));
  const o=shuffle([...opts].slice(0,4));
  if(o.length<4)return null;
  return{t:'exp-log',q:'Simplifica: $'+a+'^'+m+'\\cdot '+b+'^'+n+'$',tx:'Simplifica: '+a+'^'+m+'*'+b+'^'+n,o,d:'facil',ci:o.indexOf(val)};
}

//=========== LOGARITHM ==========
function genLog(){
  const b=pick([2,3,4,5,10]),a=Math.pow(b,rnd(1,4));
  const ans=Math.round(Math.log(a)/Math.log(b));
  const opts=new Set([ans]);opts.add(ans+1);opts.add(ans-1);opts.add(ans+rnd(2,3));
  const o=shuffle([...opts].slice(0,4));
  if(o.length<4)return null;
  return{t:'exp-log',q:'Calcula: $\\log_{'+b+'}'+a+'$',tx:'Calcula: log base '+b+' de '+a,o,d:'media',ci:o.indexOf(ans)};
}

//=========== TRIG VALUES ==========
function genTrigVal(){
  const angles=[{d:0,r:0,v:0},{d:30,r:'\\pi/6',v:0.5},{d:45,r:'\\pi/4',v:Math.SQRT1_2},{d:60,r:'\\pi/3',v:Math.sqrt(3)/2},{d:90,r:'\\pi/2',v:1},{d:180,r:'\\pi',v:0},{d:270,r:'3\\pi/2',v:-1}];
  const angle=pick(angles);
  const fn=pick(['sin','cos','tan']);
  if(fn==='tan'&&(angle.d===90||angle.d===270))return null;
  let val=fn==='sin'?angle.v:fn==='cos'?angle.v:angle.v/Math.sqrt(1-angle.v*angle.v)||0;
  val=Math.round(val*100)/100;
  const opts=new Set([String(val)]);
  opts.add(String(val+1));opts.add(String(val-1));opts.add(String(-val));
  const o=shuffle([...opts].slice(0,4));
  if(o.length<4)return null;
  return{t:'trigonometria',q:'$\\'+fn+'('+angle.r+')$ es:',tx:fn+'('+angle.r+')',o,d:'facil',ci:o.indexOf(String(val))};
}

//=========== SYSTEMS OF EQUATIONS ==========
function genSystem(){
  const x=rnd(-5,5),y=rnd(-5,5);
  if(x===0||y===0)return null;
  const a1=rnd(1,4),b1=rnd(1,4),c1=a1*x+b1*y;
  const a2=rnd(1,4),b2=rnd(1,4),c2=a2*x+b2*y;
  if(a1===a2||b1===b2)return null;
  const correct='$x='+x+', y='+y+'$';
  const d1='$x='+(x+1)+', y='+(y-1)+'$';
  const d2='$x='+(x-1)+', y='+(y+1)+'$';
  const d3='$x='+(-x)+', y='+(-y)+'$';
  const o=shuffle([correct,d1,d2,d3]);
  return{t:'ecuaciones',q:'Resuelve el sistema:\n$\\begin{cases}'+a1+'x'+(b1>0?'+'+b1:''+b1)+'y='+c1+'\\\\'+a2+'x'+(b2>0?'+'+b2:''+b2)+'y='+c2+'\\end{cases}$',tx:'Sistema: '+a1+'x+'+(b1>0?'+'+b1:''+b1)+'y='+c1+', '+a2+'x+'+(b2>0?'+'+b2:''+b2)+'y='+c2,o,d:'media',ci:o.indexOf(correct)};
}

//=========== INEQUALITIES ==========
function genIneq(){
  const a=rnd(1,5),b=rnd(-8,8),c=rnd(1,15);
  const x=(c-b)/a;
  if(x!==Math.floor(x)||Math.abs(x)>15)return null;
  const dir=pick(['<','<=','>','>=']);
  const correct='$x'+dir+String(x)+'$';
  const d1='$x'+(dir==='<'?'>=':dir==='<='?'>':dir==='>'?'<=':'<')+String(x+rnd(-2,2))+'$';
  const d2='$x'+dir+String(x+rnd(1,3)*(pick([-1,1])))+'$';
  const d3='$x'+(dir==='<'?'<=':dir==='<='?'<':dir==='>'?'>=':'>')+String(x)+'$';
  const o=shuffle([correct,d1,d2,d3]);
  return{t:'inecuaciones',q:'Resuelve: $'+a+'x'+(b>0?'+'+b:''+b)+dir+c+'$',tx:'Resuelve: '+a+'x'+(b>0?'+'+b:''+b)+dir+c,o,d:'media',ci:o.indexOf(correct)};
}

//=========== FUNCTION EVALUATION ==========
function genFuncEval(){
  const types=[
    {f:'2x+3',e:x=>2*x+3},{f:'3x-5',e:x=>3*x-5},{f:'4x+1',e:x=>4*x+1},{f:'x^2+1',e:x=>x*x+1},{f:'x^2-2x',e:x=>x*x-2*x},{f:'2x^2-3',e:x=>2*x*x-3},{f:'|x|+1',e:x=>Math.abs(x)+1},{f:'3|x|-2',e:x=>3*Math.abs(x)-2}
  ];
  const fn=pick(types);
  const xval=rnd(-3,4);
  const ans=fn.e(xval);
  const opts=new Set([String(ans)]);
  opts.add(String(ans+rnd(1,4)*pick([-1,1])));opts.add(String(ans+rnd(2,6)*pick([-1,1])));opts.add(String(-ans));
  const o=shuffle([...opts].slice(0,4));
  if(o.length<4)return null;
  return{t:'tec-matematica',q:'Si $f(x)='+fn.f+'$, entonces $f('+xval+')$ es:',tx:'f(x)='+fn.f+', f('+xval+')',o,d:'facil',ci:o.indexOf(String(ans))};
}

//=========== WORD PROBLEMS ==========
function genWordProblem(){
  const types=[
    {t:'edad',fn:(a,b)=>{const x=(b-a)/2;if(x<0||x!==Math.floor(x))return null;return{x,text:'Juan tiene '+a+' anos y su hermana tiene '+b+'. Hace cuantos anos la edad de Juan era el doble que la de su hermana?',ans:'$'+x+'$',d:'media'}},
    {t:'numeros',fn:(a)=>{const s=a*2+1;const xs=Math.sqrt(a*4+1);if(xs!==Math.floor(xs))return null;return{xs,text:'La suma de dos numeros enteros consecutivos es '+s+'. Cuales son los numeros?',ans:'$'+Math.floor(s/2)+'$ y $'+(Math.floor(s/2)+1)+'$',d:'facil'}},
  ];
  const t=pick(types);
  return t.fn(rnd(3,12));
}

//=========== SEQUENCES ==========
function genSeq(){
  const diff=rnd(1,5);
  const start=rnd(1,10);
  const seq=[start,start+diff,start+2*diff,start+3*diff,start+4*diff];
  const next=start+5*diff;
  const opts=new Set([String(next)]);
  opts.add(String(next+diff));opts.add(String(next-diff));opts.add(String(next+rnd(2,4)*pick([-1,1])));
  const o=shuffle([...opts].slice(0,4));
  if(o.length<4)return null;
  return{t:'tec-matematica',q:'Que numero continua la sucesion: '+seq.join(', ')+', ...?',tx:'Sucesion: '+seq.join(', '),o,d:'facil',ci:o.indexOf(String(next))};
}

//=========== MAIN GENERATOR LOOP ==========
const GENERATORS=[
  {fn:genLinearEq,cnt:60,},
  {fn:genQuadEq,cnt:50},
  {fn:genFactor,cnt:60},
  {fn:genExp,cnt:30},
  {fn:genLog,cnt:20},
  {fn:genTrigVal,cnt:30},
  {fn:genSystem,cnt:30},
  {fn:genIneq,cnt:50},
  {fn:genFuncEval,cnt:40},
  {fn:genSeq,cnt:20},
];

(async()=>{
  let ins=0,skp=0;
  for(const g of GENERATORS){
    let gcnt=0,attempts=0;
    while(gcnt<g.cnt&&attempts<g.cnt*5){
      attempts++;
      const ex=g.fn();
      if(!ex)continue;
      const src=S+' | '+ex.t+' #'+gcnt;
      if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
      try{
        await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
          [ex.t,ex.tx,'',JSON.stringify(ex.o),JSON.stringify([{math:ex.q,expl:''}]),null,ex.d,'tec_paa',2024,src,A,null,N]);
        gcnt++;ins++;
      }catch(e){skp++;}
    }
    console.log(g.fn.name+': inserted '+gcnt+'/'+g.cnt);
  }
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total inserted:',ins,', DB count:',r.rows[0].c);
  await p.end();
})();
