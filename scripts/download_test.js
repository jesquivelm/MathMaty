const https=require('https');
const fs=require('fs');
const path=require('path');

function download(url,dest){
  return new Promise((res,rej)=>{
    const f=fs.createWriteStream(dest);
    https.get(url,r=>{if(r.statusCode!==200){f.close();rej(new Error(r.statusCode));return;}r.pipe(f);f.on('finish',()=>{f.close();res();});}).on('error',rej);
  });
}

const url='https://www.nysedregents.org/algebraone/822/algone82022-sk.xlsx';
const dest=path.join(__dirname,'..','temp_regents','test.xlsx');
download(url,dest).then(()=>{console.log('downloaded');process.exit(0);}).catch(e=>{console.log(e.message);process.exit(1);});
