const{Pool}=require('pg');const{execSync}=require('child_process');const path=require('path');

async function main(){
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const ARCHIVO='cuadernillo algebra.pdf';
const ANSWERS={1:'D',2:'C',3:'B',4:'B',5:'C',6:'B',7:'C',8:'D',9:'A',10:'B',11:'A',12:'D',13:'B',14:'B',15:'B',16:'A',17:'B',18:'D',19:'B',20:'C',21:'B',22:'D',23:'A',24:'C',25:'B',26:'A',27:'E',28:'C',29:'D',30:'B',31:'A',32:'B',33:'A',34:'B',35:'A',36:'B',37:'A',38:'A',39:'C',40:'B',41:'B',42:'D',43:'E',44:'B',45:'A',46:'E',47:'A',48:'B',49:'D',50:'B'};
const LETTERS={A:0,B:1,C:2,D:3,E:4};

const text=execSync('npx pdf-parse text "'+path.join(__dirname,'..','material',ARCHIVO)+'" --format text',{encoding:'utf-8',timeout:60000,cwd:path.join(__dirname,'..')}).replace(/\x1b\[[0-9;]*m/g,'');
const lines=text.split('\n');

const blocks=[];
let cn=0,cl=[];
for(let line of lines){
  line=line.trim();if(!line||/^-- \d+ of \d+/.test(line)||/(CUADERNILLO|ESTO NO ES|Heroica|Escuela Naval|SUMA Y RESTA CON|MULTIPLICACI.N CON|DIVISI.N CON|LENGUAJE ALGEBRAICO|EL PLANO EUCLIDIANO|SISTEMA DE ECUACIONES|OPERACIONES CON|SUMA Y RESTA$|IV\.|SURAYE|SUBRAYE|p.gina|^\d+$|RESUELVE LAS SIGUIENTES)/i.test(line))continue;
  const nm=line.match(/^(\d+)\.-\s*(.*)/);
  if(nm&&(n=parseInt(nm[1]))>=1&&n<=50){if(cn>0&&cl.length>0)blocks.push({num:cn,lines:cl});cn=n;cl=[nm[2]];}
  else if(cn>0)cl.push(line);
}
if(cn>0&&cl.length>0)blocks.push({num:cn,lines:cl});

const exercises=[];
for(const blk of blocks){
  let ql=[],opts=[],inOpts=false;
  for(let line of blk.lines){
    const om=line.match(/^\(?([A-Ea-e])\)\s*(.*)/);
    if(om){opts.push(om[2].trim());inOpts=true;}
    else if(!inOpts)ql.push(line);
    else if(opts.length)opts[opts.length-1]+=' '+line;
  }
  const question=ql.join(' ').replace(/\s+/g,' ').trim();
  if(question.length>5&&opts.length>=2)exercises.push({num:blk.num,question,options:opts});
}

console.log('Parsed:',exercises.length);
const missing=[];for(let i=1;i<=50;i++)if(!exercises.find(e=>e.num===i))missing.push(i);
if(missing.length)console.log('Missing:',missing.join(','));

let ins=0,skp=0,unk=0;
for(const ex of exercises){
  const ans=ANSWERS[ex.num];
  if(!ans||LETTERS[ans]===undefined){unk++;continue;}
  const idx=LETTERS[ans];
  if(idx>=ex.options.length){console.log('  Q'+ex.num+': idx '+idx+' out of '+ex.options.length);unk++;continue;}
  const src=ARCHIVO+' | p.gral | ej '+ex.num;
  const exists=await p.query('SELECT id FROM exercises WHERE source=$1',[src]);
  if(exists.rows.length>0){skp++;continue;}
  let nivel='7mo',topic='ecuaciones';
  if(ex.num>=16&&ex.num<=18){nivel='8vo';topic='tec-matematica';}
  else if(ex.num>=19&&ex.num<=23){nivel='7mo';topic='tec-matematica';}
  else if(ex.num>=24&&ex.num<=33){nivel='8vo';topic='ecuaciones';}
  else if(ex.num>=34&&ex.num<=36){nivel='7mo';topic='tec-matematica';}
  else if(ex.num>=37&&ex.num<=40){nivel='8vo';topic='ecuaciones';}
  else if(ex.num>=41){nivel='8vo';topic='tec-matematica';}
  await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
    [topic,ex.question,'',JSON.stringify(ex.options),JSON.stringify([{math:'',expl:'Respuesta correcta: '+ex.options[idx]}]),null,'facil','tec_paa',2020,src,ARCHIVO,null,nivel]);
  ins++;process.stdout.write('.');
}
console.log('\nInserted:',ins,',Skipped:',skp,',Unknown:',unk);
await p.end();
}
main().catch(e=>{console.error(e.message);process.exit(1)});
