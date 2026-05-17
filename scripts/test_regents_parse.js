const{execSync}=require('child_process');
const fs=require('fs');
const path=require('path');
const https=require('https');
const XLSX=require('xlsx');
const D='E:\\Github\\MathMaty';

function dl(u,d){
  return new Promise((res)=>{
    const f=fs.createWriteStream(d);
    https.get(new URL(u),r=>{
      if(r.statusCode!==200){f.close();try{fs.unlinkSync(d);}catch(e2){}res(0);return;}
      r.pipe(f);f.on('finish',()=>{f.close();res(1);});
    }).on('error',()=>{f.close();try{fs.unlinkSync(d);}catch(e2){}res(0);});
  });
}

(async()=>{
  const k=await dl('https://www.nysedregents.org/algebraone/822/algone82022-sk.xlsx',D+'\\temp_regents\\tk.xlsx');
  const e=await dl('https://www.nysedregents.org/algebraone/822/algone82022-exam.pdf',D+'\\temp_regents\\te.pdf');
  if(!k||!e){console.log('dl fail');return;}
  const wb=XLSX.readFile(D+'\\temp_regents\\tk.xlsx');
  const d=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1});
  let ans=null;
  for(const row of d){
    if(String(row[2]||'').trim()==='Question Number'){
      ans=[];const si=d.indexOf(row);
      for(let r=1;r<=24;r++)if(si+r<d.length)ans.push(parseInt(d[si+r][3])-1);
      break;
    }
  }
  console.log('Answers:',ans?ans.join(','):'null');
  let text='';
  try{
    text=execSync('npx pdf-parse text "'+D+'\\temp_regents\\te.pdf" --format text',{encoding:'utf-8',timeout:30000,cwd:D}).replace(/\x1b\[[0-9;]*m/g,'');
  }catch(e){console.log('pdf fail:',e.message);return;}
  const lines=text.split('\n').map(l=>l.trim()).filter(l=>l);
  const qs=[];
  let curNum=0,curQ='',curOpts=[];
  for(const line of lines){
    if(/^-- \d+ of \d+/.test(line))continue;
    if(/^(Algebra I|Use this space|Part |Answer all|Regents|The State|Scoring|DO NOT|This examination|Record your|Write your|credit will|choose the|Note that|For each|All work|Clearly|credit\.|answer\.|indicate)/i.test(line))continue;
    const nm=line.match(/^(\d+)\s+(.+)/);
    if(nm&&parseInt(nm[1])>=1&&parseInt(nm[1])<=24&&line.length<120){
      if(curNum>0&&curQ&&curOpts.length>=2)qs.push({n:curNum,q:curQ.replace(/\s+/g,' ').trim(),o:[...curOpts]});
      curNum=parseInt(nm[1]);curQ=nm[2];curOpts=[];
    }else if(curNum>0){
      const om=line.match(/^\((\d)\)\s*(.*)/);
      if(om)curOpts.push(om[2].trim());
      else if(line.length>5&&!/^\d+$/.test(line))curQ+=' '+line;
    }
  }
  if(curNum>0&&curQ&&curOpts.length>=2)qs.push({n:curNum,q:curQ.replace(/\s+/g,' ').trim(),o:[...curOpts]});
  console.log('Parsed',qs.length,'questions:');
  for(const q of qs)console.log('  Q'+q.n+':',q.q.substring(0,70),'| opts:',q.o.length);
})();
