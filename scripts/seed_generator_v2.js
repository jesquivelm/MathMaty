const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

const S='gen-programatica-v2';
const A='generacion-programatica';
const N='10-11';

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rnd(0,a.length-1)];}

function genLinearEq(){
  for(let t=0;t<20;t++){
    const a=rnd(2,8),b=rnd(-8,8),c=rnd(1,20);
    const x=(c-b)/a;
    if(x!==Math.floor(x)||x<-15||x>15||c===b)continue;
    const ans=String(x);
    let opts=[ans,String(x+rnd(2,5)),String(x-rnd(2,5)),String(-x)];
    if(new Set(opts).size<4)continue;
    opts=shuffle(opts);
    const q=a+'x'+(b>=0?'+'+b:'-'+Math.abs(b))+'='+c;
    return{t:'ecuaciones',q:'$'+q+'$',tx:'Resolver: '+q,o:opts,d:'facil',ci:opts.indexOf(ans)};
  }
  return null;
}

function genQuadEq(){
  for(let t=0;t<20;t++){
    const r1=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    const r2=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    if(r1===r2||Math.abs(r1*r2)>15)continue;
    const a=1,b=-(r1+r2),c=r1*r2;
    const correct=String(Math.min(r1,r2))+' y '+String(Math.max(r1,r2));
    const opts=[correct,String(-Math.min(r1,r2))+' y '+String(-Math.max(r1,r2)),String(Math.min(r1,r2)+1)+' y '+String(Math.max(r1,r2)-1),String(Math.min(r1,r2)-1)+' y '+String(Math.max(r1,r2)+1)];
    if(new Set(opts).size<4)continue;
    const q='x^2'+(b>0?'+'+b:''+b)+'x'+(c>0?'+'+c:''+c)+'=0';
    return{t:'ecuaciones',q:'$'+q+'$',tx:'Soluciones de '+q,o:shuffle(opts),d:r1*r2===0?'facil':'media',ci:shuffle([...opts]).indexOf(correct)};
  }
  return null;
}

function genFactorDiffSq(){
  for(let t=0;t<20;t++){
    const a=rnd(2,8),b=rnd(2,7);
    const correct='$('+a+'x+'+b+')('+a+'x-'+b+')$';
    const opts=[correct,'$('+a+'x+'+b+')^2$','$('+a+'x-'+b+')^2$','$('+a+'x+'+2*b+')('+a+'x-'+2*b+')$'];
    if(new Set(opts).size<4)continue;
    return{t:'factorizacion',q:'$'+a*a+'x^2-'+b*b+'$',tx:'Factorizar: '+a*a+'x^2-'+b*b,o:shuffle(opts),d:'media',ci:shuffle([...opts]).indexOf(correct)};
  }
  return null;
}

function genFactorTrinomial(){
  for(let t=0;t<20;t++){
    const r1=pick([2,3,4,5,6]),r2=pick([1,2,3,4,5]);
    const a=1,b=-(r1+r2),c=r1*r2;
    const correct='$(x'+(r1>0?'-'+r1:'+'+(-r1))+')'+(r2>0?'(x-'+r2:'(x+'+(-r2))+')$';
    const d1='$(x'+(r2>0?'-'+r2:'+'+(-r2))+')'+(r1>0?'(x-'+r1:'(x+'+(-r1))+')$';
    const d2='$(x'+(r1>0?'-'+r1:'+'+(-r1))+')^2$';
    const d3='$(x'+(r2>0?'-'+r2:'+'+(-r2))+')^2$';
    const opts=[correct,d1,d2,d3];
    if(new Set(opts).size<4)continue;
    const q='x^2'+(b>0?'-'+b:'+'+(-b))+'x'+(c>0?'+'+c:'-'+(-c));
    return{t:'factorizacion',q:'$'+q+'$',tx:'Factorizar: '+q,o:shuffle(opts),d:'media',ci:shuffle([...opts]).indexOf(correct)};
  }
  return null;
}

function genExp(){
  for(let t=0;t<20;t++){
    const a=rnd(2,5),b=rnd(2,5),m=rnd(2,4),n=rnd(1,3);
    const val=Math.pow(a,m)*Math.pow(b,n);
    if(val>500||val!==Math.floor(val))continue;
    const ans=String(val);
    let opts=[ans,String(val+rnd(3,10)),String(val-rnd(3,10)),String(Math.pow(a,m+n)*Math.pow(b,m))];
    if(new Set(opts).size<4)continue;
    return{t:'exp-log',q:'$'+a+'^{'+m+'}\\cdot '+b+'^{'+n+'}$',tx:'Simplificar: '+a+'^'+m+' * '+b+'^'+n,o:shuffle(opts),d:'facil',ci:shuffle([...opts]).indexOf(ans)};
  }
  return null;
}

function genLog(){
  for(let t=0;t<20;t++){
    const b=pick([2,3,4,5,10]),p=rnd(1,4);
    const a=Math.pow(b,p);
    const ans=String(p);
    let opts=[ans,String(p+pick([1,2])),String(p-pick([1,2])),String(p+pick([-1,1])*3)];
    if(new Set(opts).size<4)continue;
    return{t:'exp-log',q:'$\\log_{'+b+'}'+a+'$',tx:'log base '+b+' de '+a,o:shuffle(opts),d:'media',ci:shuffle([...opts]).indexOf(ans)};
  }
  return null;
}

function genTrig(){
  const vals=[
    {a:'0',r:'0',s:'0',c:'1',t:'0'},
    {a:'30',r:'\\frac{\\pi}{6}',s:'\\frac{1}{2}',c:'\\frac{\\sqrt{3}}{2}',t:'\\frac{\\sqrt{3}}{3}'},
    {a:'45',r:'\\frac{\\pi}{4}',s:'\\frac{\\sqrt{2}}{2}',c:'\\frac{\\sqrt{2}}{2}',t:'1'},
    {a:'60',r:'\\frac{\\pi}{3}',s:'\\frac{\\sqrt{3}}{2}',c:'\\frac{1}{2}',t:'\\sqrt{3}'},
    {a:'90',r:'\\frac{\\pi}{2}',s:'1',c:'0',t:'\\infty'},
    {a:'180',r:'\\pi',s:'0',c:'-1',t:'0'},
  ];
  let cnt=0;
  const results=[];
  for(const v of vals){
    const fn=pick(['sin','cos','tan']);
    if(fn==='tan'&&(v.a==='90'||v.a==='270'))continue;
    const ans=fn==='sin'?v.s:fn==='cos'?v.c:v.t;
    if(ans==='\\infty')continue;
    const correct='$'+ans+'$';
    const opts=[correct,'$0$','$1$','$-1$','$\\frac{1}{2}$','$\\frac{\\sqrt{2}}{2}$','$\\frac{\\sqrt{3}}{2}$','$\\sqrt{3}$','$\\frac{\\sqrt{3}}{3}$'];
    const chosen=shuffle(opts.filter(o=>o!==correct)).slice(0,3);
    const all=shuffle([correct,...chosen]);
    results.push({t:'trigonometria',q:'$\\'+fn+'('+v.r+')$',tx:fn+'('+v.r+')',o:all,d:'facil',ci:all.indexOf(correct)});
    cnt++;
  }
  return results;
}

function genSystem(){
  for(let t=0;t<30;t++){
    const x=rnd(-5,5),y=rnd(-5,5);
    if(x===0||y===0)continue;
    const a1=rnd(1,4),b1=rnd(1,4),c1=a1*x+b1*y;
    const a2=rnd(1,4),b2=rnd(1,4),c2=a2*x+b2*y;
    if(a1===a2||b1===b2||c1===c2)continue;
    const correct='$x='+x+', y='+y+'$';
    const opts=[correct,'$x='+(x+1)+', y='+(y-1)+'$','$x='+(x-1)+', y='+(y+1)+'$','$x='+(-x)+', y='+(-y)+'$'];
    if(new Set(opts).size<4)continue;
    return{t:'ecuaciones',q:'$\\begin{cases}'+a1+'x'+(b1>0?'+'+b1:''+b1)+'y='+c1+'\\\\'+a2+'x'+(b2>0?'+'+b2:''+b2)+'y='+c2+'\\end{cases}$',tx:'Sistema: '+a1+'x+'+(b1>0?'+'+b1:''+b1)+'y='+c1+', '+a2+'x+'+(b2>0?'+'+b2:''+b2)+'y='+c2,o:shuffle(opts),d:'media',ci:shuffle([...opts]).indexOf(correct)};
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
    const opts=[correct,'$x'+(dir==='<'?'>=':dir==='<='?'>':dir==='>'?'<=':'<')+String(x+rnd(-2,2))+'$','$x'+dir+String(x+rnd(1,3)*(pick([-1,1])))+'$','$x'+(dir==='<'?'<=':dir==='<='?'<':dir==='>'?'>=':'>')+x+'$'];
    if(new Set(opts).size<4)continue;
    return{t:'inecuaciones',q:'$'+a+'x'+(b>0?'+'+b:''+b)+dir+c+'$',tx:'Resolver: '+a+'x'+(b>0?'+'+b:''+b)+dir+c,o:shuffle(opts),d:'media',ci:shuffle([...opts]).indexOf(correct)};
  }
  return null;
}

function genFuncEval(){
  const fns=[
    {f:'2x+3',e:x=>2*x+3},{f:'3x-5',e:x=>3*x-5},{f:'4x+1',e:x=>4*x+1},{f:'5x-2',e:x=>5*x-2},
    {f:'x^2+1',e:x=>x*x+1},{f:'x^2-2x',e:x=>x*x-2*x},{f:'-x^2+4',e:x=>-x*x+4},{f:'x^2-3x+2',e:x=>x*x-3*x+2},
    {f:'2x^2-3',e:x=>2*x*x-3},{f:'|x|+1',e:x=>Math.abs(x)+1},{f:'3|x|-2',e:x=>3*Math.abs(x)-2},{f:'||x|-1|',e:x=>Math.abs(Math.abs(x)-1)}
  ];
  let cnt=0;
  const results=[];
  for(const fn of fns){
    for(let xi=-2;xi<=4;xi++){
      if(cnt>=40)break;
      const ans=String(fn.e(xi));
      let opts=[ans,String(fn.e(xi)+rnd(2,5)),String(fn.e(xi)-rnd(2,5)),String(-fn.e(xi))];
      if(new Set(opts).size<4){opts=[ans,String(rnd(-10,10)),String(rnd(-10,10)),String(rnd(-10,10))];}
      if(new Set(opts).size<4)continue;
      results.push({t:'tec-matematica',q:'Si $f(x)='+fn.f+'$, entonces $f('+xi+')$ es:',tx:'f(x)='+fn.f+', f('+xi+')=',o:shuffle(opts),d:'facil',ci:shuffle([...opts]).indexOf(ans)});
      cnt++;
    }
  }
  return results;
}

function genSeq(){
  for(let t=0;t<30;t++){
    const diff=rnd(2,7)*pick([-1,1]);
    const start=rnd(-5,10);
    const seq=[start,start+diff,start+2*diff,start+3*diff];
    const next=start+4*diff;
    const ans=String(next);
    let opts=[ans,String(next+diff),String(next-diff),String(next+rnd(3,6)*pick([-1,1]))];
    if(new Set(opts).size<4)continue;
    return{t:'tec-matematica',q:'Que numero continua: '+seq.join(', ')+', __?',tx:'Sucesion: '+seq.join(', '),o:shuffle(opts),d:'facil',ci:shuffle([...opts]).indexOf(ans)};
  }
  return null;
}

(async()=>{
  let ins=0,skp=0;
  const all=[];

  // Linear equations
  let cnt=0,att=0;
  while(cnt<60&&att<300){att++;const e=genLinearEq();if(e){const src=S+'|lineq|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('linear:',cnt);
  
  cnt=0;att=0;
  while(cnt<50&&att<300){att++;const e=genQuadEq();if(e){const src=S+'|quadeq|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('quadratic:',cnt);
  
  cnt=0;att=0;
  while(cnt<30&&att<150){att++;const e=genFactorDiffSq();if(e){const src=S+'|factordiff|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('factor diff:',cnt);
  
  cnt=0;att=0;
  while(cnt<30&&att<150){att++;const e=genFactorTrinomial();if(e){const src=S+'|factortri|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('factor tri:',cnt);
  
  cnt=0;att=0;
  while(cnt<25&&att<150){att++;const e=genExp();if(e){const src=S+'|exp|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('exp:',cnt);
  
  cnt=0;att=0;
  while(cnt<20&&att<100){att++;const e=genLog();if(e){const src=S+'|log|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('log:',cnt);
  
  const trigs=genTrig();
  for(let i=0;i<trigs.length;i++){
    const e=trigs[i];
    const src=S+'|trig|'+i;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){
      await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);ins++;
    }
  }
  console.log('trig:',trigs.length);
  
  cnt=0;att=0;
  while(cnt<25&&att<150){att++;const e=genSystem();if(e){const src=S+'|system|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('system:',cnt);
  
  cnt=0;att=0;
  while(cnt<40&&att<200){att++;const e=genIneq();if(e){const src=S+'|ineq|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('ineq:',cnt);
  
  const funs=genFuncEval();
  for(let i=0;i<funs.length;i++){
    const e=funs[i];
    const src=S+'|func|'+i;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){
      await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);ins++;
    }
  }
  console.log('func eval:',funs.length);
  
  cnt=0;att=0;
  while(cnt<20&&att<100){att++;const e=genSeq();if(e){const src=S+'|seq|'+cnt;if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length===0){await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[e.t,e.tx,'',JSON.stringify(e.o),JSON.stringify([{math:e.q,expl:''}]),null,e.d,'tec_paa',2024,src,A,null,N]);cnt++;ins++;}else skp++;}}
  console.log('seq:',cnt);
  
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total inserted:',ins,', DB count:',r.rows[0].c);
  await p.end();
})();
