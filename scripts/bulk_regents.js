const{Pool}=require('pg');
const https=require('https');
const fs=require('fs');
const path=require('path');
const {execSync}=require('child_process');
const XLSX=require('xlsx');

const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const TMP=path.join(__dirname,'..','temp_regents');
if(!fs.existsSync(TMP))fs.mkdirSync(TMP);
const BASE='https://www.nysedregents.org/algebraone';

const EXAMS=[
  {f:'822',p:'82022',y:2022,d:'August 2022'},{f:'622',p:'62022',y:2022,d:'June 2022'},
  {f:'821',p:'82021',y:2021,d:'August 2021'},{f:'621',p:'v202',y:2021,d:'June 2021'},
  {f:'120',p:'12020',y:2020,d:'January 2020'},
  {f:'819',p:'82019',y:2019,d:'August 2019'},{f:'619',p:'62019',y:2019,d:'June 2019'},{f:'119',p:'12019',y:2019,d:'January 2019'},
  {f:'818',p:'82018',y:2018,d:'August 2018'},{f:'618',p:'62018',y:2018,d:'June 2018'},{f:'118',p:'12018',y:2018,d:'January 2018'},
  {f:'817',p:'82017',y:2017,d:'August 2017'},{f:'617',p:'62017',y:2017,d:'June 2017'},{f:'117',p:'12017',y:2017,d:'January 2017'},
];

function dl(u,d){
  return new Promise((res,rej)=>{
    const f=fs.createWriteStream(d);
    https.get(r=>new URL(u),r=>{if(r.statusCode!==200){f.close();try{fs.unlinkSync(d);}catch(e2){}res(0);return;}r.pipe(f);f.on('finish',()=>{f.close();res(1);});}).on('error',()=>{f.close();try{fs.unlinkSync(d);}catch(e2){}res(0);});
  });
}

function getAnsKey(file){
  try{
    const wb=XLSX.readFile(file);
    const d=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1});
    for(const row of d){
      if(String(row[2]||'').trim()==='Question Number'){
        const ans=[];
        for(let r=1;r<=24;r++){
          const v=d.indexOf(row)+r;
          if(v<d.length)ans.push(parseInt(d[v][3])-1);
        }
        if(ans.length===24)return ans;
      }
    }
  }catch(e){}
  return null;
}

function parseQuestions(text){
  const lines=text.split('\n').map(l=>l.trim()).filter(l=>l);
  const qs=[];
  let curNum=0,curQ='',curOpts=[];
  for(const line of lines){
    if(/^-- \d+ of \d+/.test(line))continue;
    if(/^Algebra I|^Use this space|^Part I|^Part II|^Answer all|^Regents|The State|Scoring|DO NOT/i.test(line))continue;
    const nm=line.match(/^(\d+)\s+(.+)/);
    if(nm&&parseInt(nm[1])>=1&&parseInt(nm[1])<=24&&line.length<120){
      if(curNum>0&&curQ)qs.push({n:curNum,q:curQ,o:[...curOpts]});
      curNum=parseInt(nm[1]);curQ=nm[2];curOpts=[];
    }else if(curNum>0){
      const om=line.match(/^\((\d)\)\s*(.*)/);
      if(om)curOpts.push(om[2].trim());
      else if(line.length>5)curQ+=' '+line;
    }
  }
  if(curNum>0&&curQ)qs.push({n:curNum,q:curQ,o:[...curOpts]});
  return qs;
}

(async()=>{
  let totalIns=0,totalSkp=0,totalFail=0;
  for(const ex of EXAMS){
    const keyUrl=`${BASE}/${ex.f}/algone${ex.p}-sk.xlsx`;
    const examUrl=`${BASE}/${ex.f}/algone${ex.p}-exam.pdf`;
    const keyFile=path.join(TMP,`${ex.p}-key.xlsx`);
    const examFile=path.join(TMP,`${ex.p}-exam.pdf`);
    
    const gotKey=await dl(keyUrl,keyFile);
    if(!gotKey){console.log(ex.d,': no key');continue;}
    const ans=getAnsKey(keyFile);
    if(!ans){console.log(ex.d,': key unparseable');continue;}
    
    const gotExam=await dl(examUrl,examFile);
    if(!gotExam){console.log(ex.d,': no exam PDF');continue;}
    
    let text='';
    try{
      text=execSync('npx pdf-parse text "'+examFile+'" --format text',{encoding:'utf-8',timeout:30000,cwd:path.join(__dirname,'..')}).replace(/\x1b\[[0-9;]*m/g,'');
    }catch(e){console.log(ex.d,': pdf parse fail');continue;}
    
    const qs=parseQuestions(text);
    let ins=0,skp=0;
    for(const q of qs){
      if(!q.o||q.o.length<4){continue;}
      const src='algone'+ex.p+'-exam.pdf | ej '+q.n;
      if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
      await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        ['tec-matematica',q.q,'',JSON.stringify(q.o),JSON.stringify([{math:'',expl:'Respuesta: '+q.o[ans[q.n-1]]}]),null,'media','tec_paa',ex.y,src,'algone'+ex.p+'-exam.pdf',null,'10-11']);
      ins++;
    }
    console.log(ex.d,':',ins,'inserted,',skp,'skipped,',qs.length,'parsed');
    totalIns+=ins;totalSkp+=skp;
    // cleanup
    try{fs.unlinkSync(keyFile);}catch(e2){}
    try{fs.unlinkSync(examFile);}catch(e2){}
  }
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total inserted:',totalIns,', DB count:',r.rows[0].c);
  await p.end();
})();
