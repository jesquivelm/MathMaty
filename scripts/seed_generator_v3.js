const{Pool}=require('pg');
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

const S='gen-prog-v3';
const A='generacion-programatica';
const N='10-11';

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rnd(0,a.length-1)];}

function mkOpts(correct,alts){
  let all=shuffle([correct,...alts]);
  return{o:all,ci:all.indexOf(correct),ans:correct};
}

function genLinearEq(){
  for(let t=0;t<30;t++){
    const a=rnd(2,8),b=rnd(-8,8),c=rnd(1,20);
    const x=(c-b)/a;
    if(x!==Math.floor(x)||x<-15||x>15||c===b)continue;
    const ans=String(x);
    const res=mkOpts(ans,[String(x+rnd(2,5)),String(x-rnd(2,5)),String(-x)]);
    const q=a+'x'+(b>=0?'+'+b:'-'+Math.abs(b))+'='+c;
    return{t:'ecuaciones',q:'$'+q+'$',tx:'Resolver: '+q,o:res.o,d:'facil',ci:res.ci};
  }
  return null;
}

function genQuadEq(){
  for(let t=0;t<30;t++){
    const r1=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]),r2=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    if(r1===r2||Math.abs(r1*r2)>15)continue;
    const a=1,b=-(r1+r2),c=r1*r2;
    const correct=String(Math.min(r1,r2))+' y '+String(Math.max(r1,r2));
    const res=mkOpts(correct,[String(-Math.min(r1,r2))+' y '+String(-Math.max(r1,r2)),String(Math.min(r1,r2)+1)+' y '+String(Math.max(r1,r2)-1),String(Math.min(r1,r2)-1)+' y '+String(Math.max(r1,r2)+1)]);
    const q='x^2'+(b>0?'+'+b:''+b)+'x'+(c>0?'+'+c:''+c)+'=0';
    return{t:'ecuaciones',q:'$'+q+'$',tx:'Soluciones de '+q,o:res.o,d:r1*r2===0?'facil':'media',ci:res.ci};
  }
  return null;
}

function genFactorDiffSq(){
  for(let t=0;t<20;t++){
    const a=rnd(2,8),b=rnd(2,7);
    const correct='$('+a+'x+'+b+')('+a+'x-'+b+')$';
    const res=mkOpts(correct,['$('+a+'x+'+b+')^2$','$('+a+'x-'+b+')^2$','$('+a+'x+'+2*b+')('+a+'x-'+2*b+')$']);
    return{t:'factorizacion',q:'$'+a*a+'x^2-'+b*b+'$',tx:'Factorizar: '+a*a+'x^2-'+b*b,o:res.o,d:'media',ci:res.ci};
  }
  return null;
}

function genFactorTrinomial(){
  for(let t=0;t<20;t++){
    const r1=pick([2,3,4,5,6]),r2=pick([1,2,3,4,5]);
    const a=1,b=-(r1+r2),c=r1*r2;
    const correct='$(x'+(r1>0?'-'+r1:'+'+(-r1))+')'+(r2>0?'(x-'+r2:'(x+'+(-r2))+')$';
    const res=mkOpts(correct,['$(x'+(r2>0?'-'+r2:'+'+(-r2))+')'+(r1>0?'(x-'+r1:'(x+'+(-r1))+')$','$(x'+(r1>0?'-'+r1:'+'+(-r1))+')^2$','$(x'+(r2>0?'-'+r2:'+'+(-r2))+')^2$']);
    const q='x^2'+(b>0?'-'+b:'+'+(-b))+'x'+(c>0?'+'+c:'-'+(-c));
    return{t:'factorizacion',q:'$'+q+'$',tx:'Factorizar: '+q,o:res.o,d:'media',ci:res.ci};
  }
  return null;
}

function genExp(){
  for(let t=0;t<20;t++){
    const a=rnd(2,5),b=rnd(2,5),m=rnd(2,4),n=rnd(1,3);
    const val=Math.pow(a,m)*Math.pow(b,n);
    if(val>500||val!==Math.floor(val))continue;
    const ans=String(val);
    const res=mkOpts(ans,[String(val+rnd(3,10)),String(val-rnd(3,10)),String(Math.pow(a,m+n)*Math.pow(b,m))]);
    return{t:'exp-log',q:'$'+a+'^{'+m+'}\\cdot '+b+'^{'+n+'}$',tx:'Simplificar: '+a+'^'+m+' * '+b+'^'+n,o:res.o,d:'facil',ci:res.ci};
  }
  return null;
}

function genLog(){
  for(let t=0;t<20;t++){
    const b=pick([2,3,4,5,10]),pwr=rnd(1,4);
    const a=Math.pow(b,pwr);
    const ans=String(pwr);
    const res=mkOpts(ans,[String(pwr+pick([1,2])),String(pwr-pick([1,2])),String(pwr+pick([-1,1])*3)]);
    return{t:'exp-log',q:'$\\log_{'+b+'}'+a+'$',tx:'log base '+b+' de '+a,o:res.o,d:'media',ci:res.ci};
  }
  return null;
}

function genTrig(){return[
  mkOpts('$0$',['$1$','$-1$','$\\frac{1}{2}$']),mkOpts('$\\frac{1}{2}$',['$0$','$\\frac{\\sqrt{2}}{2}$','$1$']),
  mkOpts('$\\frac{\\sqrt{2}}{2}$',['$0$','$\\frac{1}{2}$','$\\frac{\\sqrt{3}}{2}$']),mkOpts('$\\frac{\\sqrt{3}}{2}$',['$0$','$\\frac{1}{2}$','$1$']),
  mkOpts('$1$',['$0$','$\\frac{1}{2}$','$-1$']),mkOpts('$-1$',['$0$','$1$','$\\frac{1}{2}$']),
  mkOpts('$\\frac{\\sqrt{3}}{3}$',['$\\sqrt{3}$','$1$','$0$']),mkOpts('$\\sqrt{3}$',['$\\frac{\\sqrt{3}}{3}$','$1$','$0$']),
];}

function genSystem(){
  for(let t=0;t<30;t++){
    const x=rnd(-5,5),y=rnd(-5,5);
    if(x===0||y===0)continue;
    const a1=rnd(1,4),b1=rnd(1,4),c1=a1*x+b1*y;
    const a2=rnd(1,4),b2=rnd(1,4),c2=a2*x+b2*y;
    if(a1===a2||b1===b2||c1===c2)continue;
    const correct='$x='+x+', y='+y+'$';
    const res=mkOpts(correct,['$x='+(x+1)+', y='+(y-1)+'$','$x='+(x-1)+', y='+(y+1)+'$','$x='+(-x)+', y='+(-y)+'$']);
    return{t:'ecuaciones',q:'$\\begin{cases}'+a1+'x'+(b1>0?'+'+b1:''+b1)+'y='+c1+'\\\\'+a2+'x'+(b2>0?'+'+b2:''+b2)+'y='+c2+'\\end{cases}$',tx:'Sistema',o:res.o,d:'media',ci:res.ci};
  }
  return null;
}

function genIneq(){
  for(let t=0;t<30;t++){
    const a=rnd(1,5),b=rnd(-8,8),c=rnd(1,15);
    const x=(c-b)/a;
    if(x!==Math.floor(x)||Math.abs(x)>15||x===0)continue;
    const dir=pick(['<','<=','>','>=']);
    const correct='$x'+dir+x+'$';
    const res=mkOpts(correct,['$x'+(dir==='<'?'>=':dir==='<='?'>':dir==='>'?'<=':'<')+String(x+rnd(-2,2))+'$','$x'+dir+String(x+rnd(1,3)*(pick([-1,1])))+'$','$x'+(dir==='<'?'<=':dir==='<='?'<':dir==='>'?'>=':'>')+x+'$']);
    return{t:'inecuaciones',q:'$'+a+'x'+(b>0?'+'+b:''+b)+dir+c+'$',tx:'Resolver: '+a+'x'+(b>0?'+'+b:''+b)+dir+c,o:res.o,d:'media',ci:res.ci};
  }
  return null;
}

function genFuncEval(){
  const fns=[
    {f:'2x+3',e:x=>2*x+3,easy:true},{f:'3x-5',e:x=>3*x-5,easy:true},{f:'4x+1',e:x=>4*x+1,easy:true},{f:'x^2+1',e:x=>x*x+1,easy:true},
    {f:'x^2-2x',e:x=>x*x-2*x,easy:false},{f:'-x^2+4',e:x=>-x*x+4,easy:false},{f:'x^2-3x+2',e:x=>x*x-3*x+2,easy:false},{f:'2x^2-3',e:x=>2*x*x-3,easy:false}
  ];
  const results=[];
  for(const fn of fns){
    for(let xi=-3;xi<=4;xi++){
      if(results.length>=40)break;
      const ans=String(fn.e(xi));
      const res=mkOpts(ans,[String(rnd(-10,10)),String(rnd(-10,10)),String(rnd(-10,10))]);
      results.push({t:'tec-matematica',q:'Si $f(x)='+fn.f+'$, entonces $f('+xi+')$ es:',tx:'f(x)='+fn.f+', f('+xi+')=',o:res.o,d:'facil',ci:res.ci});
    }
  }
  return results;
}

function genSeq(){
  for(let t=0;t<30;t++){
    const diff=rnd(2,7)*pick([-1,1]);
    const start=rnd(-5,10);
    const next=start+4*diff;
    const ans=String(next);
    const res=mkOpts(ans,[String(next+diff),String(next-diff),String(next+rnd(3,6)*pick([-1,1]))]);
    const seq=[start,start+diff,start+2*diff,start+3*diff];
    return{t:'tec-matematica',q:'Que numero continua: '+seq.join(', ')+', __?',tx:'Sucesion: '+seq.join(', '),o:res.o,d:'facil',ci:res.ci};
  }
  return null;
}

(async()=>{
  let ins=0,skp=0;
  
  async function insert(ex,prefix,n){
    const src=S+'|'+prefix+'|'+n;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;return false;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.t,ex.tx,'',JSON.stringify({o:ex.o,ci:ex.ci}),JSON.stringify([{math:ex.q,expl:''}]),null,ex.d,'tec_paa',2024,src,A,null,N]);
    ins++;return true;
  }
  
  let cnt=0,pi='';
  for(pi='lineq';cnt<60;){const e=genLinearEq();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('linear_eq:',cnt);
  
  cnt=0;
  for(pi='quadeq';cnt<50;){const e=genQuadEq();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('quad_eq:',cnt);
  
  cnt=0;
  for(pi='factordiff';cnt<30;){const e=genFactorDiffSq();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('factor_diff:',cnt);
  
  cnt=0;
  for(pi='factortri';cnt<30;){const e=genFactorTrinomial();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('factor_trinomial:',cnt);
  
  cnt=0;
  for(pi='exp';cnt<25;){const e=genExp();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('exp:',cnt);
  
  cnt=0;
  for(pi='log';cnt<20;){const e=genLog();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('log:',cnt);
  
  const trigs=genTrig();
  cnt=0;
  const trigLabels=[{f:'sin',v:'0'},{f:'sin',v:'\\pi/6'},{f:'sin',v:'\\pi/4'},{f:'sin',v:'\\pi/3'},{f:'sin',v:'\\pi/2'},{f:'cos',v:'\\pi'},{f:'tan',v:'\\pi/6'},{f:'tan',v:'\\pi/4'}];
  for(let i=0;i<trigs.length;i++){
    const e={t:'trigonometria',q:'$\\'+trigLabels[i].f+'('+trigLabels[i].v+')$',tx:trigLabels[i].f+'('+trigLabels[i].v+')',o:trigs[i].o,d:'facil',ci:trigs[i].ci};
    if(await insert(e,'trig',i))cnt++;
  }
  console.log('trig:',cnt);
  
  cnt=0;
  for(pi='system';cnt<25;){const e=genSystem();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('system:',cnt);
  
  cnt=0;
  for(pi='ineq';cnt<40;){const e=genIneq();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('ineq:',cnt);
  
  const funs=genFuncEval();
  cnt=0;
  for(let i=0;i<funs.length;i++){if(await insert(funs[i],'func',i))cnt++;}
  console.log('func_eval:',cnt);
  
  cnt=0;
  for(pi='seq';cnt<20;){const e=genSeq();if(e&&await insert(e,pi,cnt))cnt++;}
  console.log('seq:',cnt);
  
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total inserted:',ins,', DB count:',r.rows[0].c);
  await p.end();
})();
