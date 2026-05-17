const https=require('https');
const fs=require('fs');
const path=require('path');
const XLSX=require('xlsx');

const base='https://www.nysedregents.org/algebraone';

// Format: folder/month+year, e.g. folder=822, file prefix=82022 (month=8, year=2022)
const exams=[
  {folder:'822',prefix:'82022',date:'August 2022'},{folder:'622',prefix:'62022',date:'June 2022'},
  {folder:'823',prefix:'82023',date:'August 2023'},{folder:'623',prefix:'62023',date:'June 2023'},{folder:'123',prefix:'12023',date:'January 2023'},
  {folder:'824',prefix:'82024',date:'August 2024'},{folder:'624',prefix:'62024',date:'June 2024'},{folder:'124',prefix:'12024',date:'January 2024'},
  {folder:'825',prefix:'82025',date:'August 2025'},{folder:'625',prefix:'62025',date:'June 2025'},{folder:'125',prefix:'12025',date:'January 2025'},
  {folder:'126',prefix:'12026',date:'January 2026'},
];

const outDir=path.join(__dirname,'..','temp_regents');
if(!fs.existsSync(outDir))fs.mkdirSync(outDir);

function download(url, dest){
  return new Promise((res,rej)=>{
    const f=fs.createWriteStream(dest);
    https.get(url,r=>{
      if(r.statusCode!==200){f.close();try{fs.unlinkSync(dest);}catch(e2){}rej(new Error(r.statusCode+' '+url));return;}
      r.pipe(f);f.on('finish',()=>{f.close();res();});
    }).on('error',e=>{f.close();try{fs.unlinkSync(dest);}catch(e2){}rej(e);});
  });
}

function parseAnswers(file){
  try{
    const wb=XLSX.readFile(file);
    const ws=wb.Sheets[wb.SheetNames[0]];
    const data=XLSX.utils.sheet_to_json(ws,{header:1});
    // Strategy: find 24 consecutive numbers 1-4 in a row
    for(const row of data){
      const ans=[];
      for(let c=0;c<row.length;c++){
        const v=String(row[c]||'').trim();
        if(/^[1-4]$/.test(v))ans.push(parseInt(v)-1);
        else if(ans.length>0&&ans.length<24){ans.length=0;}
      }
      if(ans.length===24)return ans;
    }
    return null;
  }catch(e){return null;}
}

(async()=>{
  const results=[];
  for(const ex of exams){
    const url=`${base}/${ex.folder}/algone${ex.prefix}-sk.xlsx`;
    const dest=path.join(outDir,`algone${ex.prefix}-sk.xlsx`);
    try{
      await download(url,dest);
      const ans=parseAnswers(dest);
      if(ans&&ans.length===24){
        results.push(ex);
        ex.answers=ans;
        console.log(ex.date,':',ans.map(a=>a+1).join(','));
      }else{
        console.log(ex.date,': FAILED to parse answers');
        try{fs.unlinkSync(dest);}catch(e2){}
      }
    }catch(e){
      console.log(ex.date,':',e.message);
    }
  }
  fs.writeFileSync(path.join(outDir,'_results.json'),JSON.stringify(results.map(r=>({folder:r.folder,prefix:r.prefix,date:r.date,answers:r.answers})),null,2));
  console.log('\nTotal parsed:',results.length);
})();
