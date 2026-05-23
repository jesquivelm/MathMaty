process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

function stripDollarSigns(str){
  if(!str||typeof str!=='string')return str;
  // Remove $ wrapping LaTeX: $...$ or $$...$$ but keep content
  // Handle cases like $\\frac{x}{y}$ -> \\frac{x}{y}
  // Handle cases like $(3x+5)(3x-5)$ -> (3x+5)(3x-5)
  // But PRESERVE $ used as currency ($5, $50, etc.)
  // Strategy: remove $ only when they clearly wrap LaTeX (contain \, ^, _, {, }, \frac etc)
  // First pass: remove $$...$$ 
  str=str.replace(/\$\$([\s\S]*?)\$\$/g,(_,c)=>c);
  // Second pass: remove $...$ that contain LaTeX-like content
  str=str.replace(/\$([^$]*?(?:\\|frac|sqrt|lim|int|sum|prod|cdot|times|circ|infty|alpha|beta|gamma|theta|pi)[^$]*?)\$/g,(_,c)=>c);
  // Third pass: remove leading/trailing $ (wraps entire string)
  let s=str.trim();
  if(s.startsWith('$')&&s.endsWith('$')&&s.length>2)s=s.slice(1,-1);
  return s;
}

(async()=>{
  const exs=(await p.query('SELECT id,question,options FROM exercises ORDER BY id')).rows;
  let qFix=0,oFix=0;
  for(const ex of exs){
    const newQ=stripDollarSigns(ex.question);
    if(newQ!==ex.question){
      await p.query('UPDATE exercises SET question=$1 WHERE id=$2',[newQ,ex.id]);qFix++;
    }
    if(ex.options&&Array.isArray(ex.options)){
      const newOpts=ex.options.map(o=>stripDollarSigns(o));
      const changed=newOpts.some((o,i)=>o!==ex.options[i]);
      if(changed){
        await p.query('UPDATE exercises SET options=$1 WHERE id=$2',[JSON.stringify(newOpts),ex.id]);oFix++;
      }
    }
  }
  console.log('Questions fixed:',qFix,', Options fixed:',oFix);
  await p.end();
})();
