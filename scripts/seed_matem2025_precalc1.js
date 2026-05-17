const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='MATEM 2025_Precálculo_I Parcial.pdf';
// Official answer key from PDF page 13
const KEY={1:'D',2:'A',3:'B',4:'D',5:'C',6:'C',7:'D',8:'B',9:'D',10:'A',11:'D',12:'A',13:'C',14:'C',15:'C',16:'B',17:'D',18:'B',19:'A',20:'A',21:'D',22:'C',23:'B',24:'C',25:'B',26:'D',27:'B',28:'B',29:'A',30:'C'};
const L={A:0,B:1,C:2,D:3};

const EXS=[
{num:1,topic:'tec-matematica',diff:'facil',q:'(2a+b)(2a-b)-(a+3b)²+2ab = ?',opts:['3a²+8b²+2ab','3a²+8b²+8ab','3a²-10b²-ab','3a²-10b²-4ab']},
{num:2,topic:'factorizacion',diff:'media',q:'Cantidad de factores cuadráticos irreductibles en 1296-y⁴:',opts:['Uno','Dos','Tres','Cuatro']},
{num:3,topic:'factorizacion',diff:'media',q:'Factorización completa de 6p²t²-24pt³-30t⁴:',opts:['6(p-5)(t+1)','6t²(p-5t)(p+t)','6t²(p+5t)(p-t)','(2p-10t)(3p+3t)']},
{num:4,topic:'factorizacion',diff:'media',q:'Q(x)=x-2 es factor de P(x)=3x³+x²+kx+12. k = ?',opts:['0','4','-2','-20']},
{num:5,topic:'fracciones-alg',diff:'dificil',q:'(2-r/s+3/(rs))/(3/r²-1/r) es equivalente a:',opts:['r+1','(r+1)/s','r(r+1)/s','-r(r+1)/s']},
{num:6,topic:'tec-matematica',diff:'facil',q:'Para racionalizar (2x+y)/³√(x-2), multiplique por:',opts:['³√(x-2)','³√(x+2)','³√(x²)+2³√x+4','³√(x²)-2³√x+4']},
{num:7,topic:'ecuaciones',diff:'facil',q:'¿Cuál ecuación tiene exactamente 2 soluciones reales diferentes?',opts:['9x²-36x+36=0','17x²+6x+19=0','19x²-7x+36=0','36x²+6x-19=0']},
{num:8,topic:'ecuaciones',diff:'facil',q:'Mismo conjunto solución que x³+8x-3x²-24=0:',opts:['(x+3)(x²+8)=0','(x-3)(x²+8)=0','(x+8)(x+√3)(x-√3)=0','(x-8)(x+√3)(x-√3)=0']},
{num:9,topic:'ecuaciones',diff:'media',q:'x²/(1-x)=(x+2)/2. Solución:',opts:['{2/3}','{0,1/2}','{-1,2}','{-1,2/3}']},
{num:10,topic:'ecuaciones',diff:'media',q:'|a-17|=5+a. Soluciones reales:',opts:['Una','Dos','Seis','Ninguna']},
{num:11,topic:'ecuaciones',diff:'media',q:'⁷√(3x-2)=√5. Solución:',opts:['{13/7}','{9/49}','{19/21}','{41/49}']},
{num:12,topic:'ecuaciones',diff:'facil',q:'2(m-1)+23=n y m+n-42=0. m,n = ?',opts:['m=7,n=35','m=-7,n=7','m=7,n=-7','m=-7,n=-35']},
{num:13,topic:'ecuaciones',diff:'media',q:'Problema de blusas y pantalones de Victoria. Proposiciones I, II, III.',opts:['Todas','Solamente I','Solamente III','Solamente I y II']},
{num:14,topic:'inecuaciones',diff:'facil',q:'x-1≤-6<x+3. Se puede asegurar:',opts:['-5≤x','x<-9','-9<x≤-5','no existe tal x']},
{num:15,topic:'inecuaciones',diff:'dificil',q:'P(x)=a(x)·b(x): a(x) grado 1 (+) para x>1. b(x) grado 2 irreductible (-) ∀x. P(x)<0:',opts:['∅','ℝ',']1,+∞[',']-∞,1[']},
{num:16,topic:'inecuaciones',diff:'facil',q:'x/(5-x) ≥ 0. Solución:',opts:['[0,5]','[0,5[',']-∞,5[',']-∞,0]∪]5,+∞[']},
{num:17,topic:'tec-matematica',diff:'facil',q:'a<0<b. Cuadrante de (b-a, a-b):',opts:['I','II','III','IV']},
{num:18,topic:'tec-matematica',diff:'media',q:'A(-5,1), B(3,3), C(4,-1), D(-4,-3). Área rectángulo ABCD:',opts:['20 ul²','34 ul²','6√17 ul²','2√10 ul²']},
{num:19,topic:'tec-matematica',diff:'facil',q:'M(-1,2) punto medio de A(-3,b) y B(a,1). a = ?',opts:['1','3','0','-1']},
{num:20,topic:'tec-matematica',diff:'media',q:'Distancia de (3,-2) a y-3x+9=0:',opts:['√10/5','2√10','(8/5)√10','(11/5)√10']},
{num:21,topic:'tec-matematica',diff:'facil',q:'Recta por (3,-1) y (-2,4):',opts:['y=x-4','y=x+2','y=-x-4','y=-x+2']},
{num:22,topic:'tec-matematica',diff:'media',q:'Proposiciones sobre recta en gráfica: I. b<0. II. m<0. III. -b/m>0.',opts:['Todas','I y II','I y III','II y III']},
{num:23,topic:'tec-matematica',diff:'facil',q:'3y+2x=6 y kx+1=2y son perpendiculares. k = ?',opts:['2','3','-2','-3']},
{num:24,topic:'tec-matematica',diff:'facil',q:'Recta que interseca Y en (0,-1) y es paralela a 2y+6x=4:',opts:['y=3x-2','y=6x-2','y=-3x-1','y=-6x-1']},
{num:25,topic:'tec-matematica',diff:'media',q:'(Requiere gráfica) Ecuación de circunferencia:',opts:['(x+3)²+(y-1)²=4','(x-3)²+(y+1)²=4','(x+3)²+(y-1)²=2','(x-3)²+(y+1)²=2']},
{num:26,topic:'tec-matematica',diff:'media',q:'Diámetro con extremos (4,3) y (-2,-5). h,k,r = ?',opts:['h=-1,k=1,r=√10','h=1,k=-1,r=√10','h=-1,k=1,r=5','h=1,k=-1,r=5']},
{num:27,topic:'tec-matematica',diff:'facil',q:'Intersección de l1:x+5y=4 y l2:-3x+y=-2. b = ?',opts:['7/8','5/8','-3/8','-9/8']},
{num:28,topic:'tec-matematica',diff:'media',q:'Intersección de y=-x-5 y x²+4x+y²-2y-11=0:',opts:['(-2,5)','(-6,1)','(-2,-1)','(-3,-2)']},
{num:29,topic:'tec-matematica',diff:'media',q:'C: x²+(y-3)²=1. I. y=3 secante. II. x=-1 tangente.',opts:['Ambas','Solamente I','Solamente II','Ninguna']},
{num:30,topic:'tec-matematica',diff:'media',q:'(Requiere gráfica) Circunferencia con centro O y secante a C:',opts:['x²+y²=1','x²+y²=4','x²+y²=9','x²+y²=16']},
];

(async()=>{
  let ins=0,skp=0;
  for(const ex of EXS){
    if(!KEY[ex.num]){console.log('  Q'+ex.num+': no key');continue;}
    const idx=L[KEY[ex.num]];
    if(idx===undefined||idx>=ex.opts.length){console.log('  Q'+ex.num+': bad idx');continue;}
    const src=A+' | ej '+ex.num;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.topic,ex.q,'',JSON.stringify(ex.opts),JSON.stringify([{math:'',expl:'Respuesta: '+ex.opts[idx]}]),null,ex.diff,'tec_paa',2025,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,',Skipped:',skp);
  const r=await p.query('SELECT COUNT(*)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
