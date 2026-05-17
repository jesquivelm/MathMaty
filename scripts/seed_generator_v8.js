process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v8';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === TEC-MATEMATICA (50) ===
  {t:'tec-matematica',q:'Area de rectangulo de base 8 y altura 5:',c:'40',o:['13','26','35']},
  {t:'tec-matematica',q:'Perimetro de cuadrado de lado 6:',c:'24',o:['12','36','30']},
  {t:'tec-matematica',q:'Area de circulo de radio 3 (π≈3.14):',c:'28.26',o:['18.84','9.42','28.26']},
  {t:'tec-matematica',q:'Volumen de cubo de arista 4:',c:'64',o:['16','12','24']},
  {t:'tec-matematica',q:'Area de triangulo de base 10 y altura 6:',c:'30',o:['16','60','20']},
  {t:'tec-matematica',q:'Teorema de Pitagoras: hipotenusa con catetos 3 y 4:',c:'5',o:['7','25','12']},
  {t:'tec-matematica',q:'Cateto faltante con hipotenusa 13 y cateto 5:',c:'12',o:['8','10','18']},
  {t:'tec-matematica',q:'Area de trapecio con bases 6,10 y altura 4:',c:'32',o:['20','40','64']},
  {t:'tec-matematica',q:'Si 3 libros cuestan $45, 7 libros cuestan:',c:'$105',o:['$95','$115','$75']},
  {t:'tec-matematica',q:'Un auto recorre 240 km en 3 horas. Su velocidad es:',c:'80 km/h',o:['60 km/h','70 km/h','90 km/h']},
  {t:'tec-matematica',q:'15% de 200 es:',c:'30',o:['15','20','35']},
  {t:'tec-matematica',q:'Si un articulo cuesta $80 y tiene 25% de descuento, se paga:',c:'$60',o:['$55','$65','$20']},
  {t:'tec-matematica',q:'Interes simple de $500 al 10% por 2 anos:',c:'$100',o:['$50','$200','$150']},
  {t:'tec-matematica',q:'(a+b)^2 =',c:'a^2 + 2ab + b^2',o:['a^2 + b^2','a^2 - 2ab + b^2','2a + 2b']},
  {t:'tec-matematica',q:'(a-b)^2 =',c:'a^2 - 2ab + b^2',o:['a^2 - b^2','a^2 + 2ab + b^2','2a - 2b']},
  {t:'tec-matematica',q:'(a+b)(a-b) =',c:'a^2 - b^2',o:['a^2 + b^2','a^2 - 2ab + b^2','2a - 2b']},
  {t:'tec-matematica',q:'Media aritmetica de 4,8,12,16:',c:'10',o:['9','11','12']},
  {t:'tec-matematica',q:'Si f(x)=x^2+1 y g(x)=x-3, f(g(4)):',c:'2',o:['1','0','5']},
  {t:'tec-matematica',q:'La ecuacion de la recta con pendiente -1 e intersecto y=4:',c:'y=-x+4',o:['y=x+4','y=-x-4','y=x-4']},
  {t:'tec-matematica',q:'Distancia entre (-2,3) y (1,7):',c:'5',o:['4','6','7']},
  {t:'tec-matematica',q:'Dominio de f(x)=x^2+2x-3:',c:'Todos los reales',o:['x≥0','x>0','x≠0']},
  {t:'tec-matematica',q:'Rango de f(x)=x^2+1:',c:'y ≥ 1',o:['y > 1','y real','y ≤ 1']},
  {t:'tec-matematica',q:'Tasa de cambio de f(x)=2x+5 es:',c:'2',o:['5','2x','7']},

  // === ECUACIONES (50) ===
  {t:'ecuaciones',q:'4x - 7 = 2x + 3',tx:'4x-7=2x+3',c:'x=5',o:['x=2','x=-5','x=-2']},
  {t:'ecuaciones',q:'8x + 5 = 3x - 10',tx:'8x+5=3x-10',c:'x=-3',o:['x=3','x=-5','x=5']},
  {t:'ecuaciones',q:'x^2 + 5x + 6 = 0',tx:'x^2+5x+6=0',c:'x=-2 o x=-3',o:['x=2 o x=3','x=-2 o x=3','x=2 o x=-3']},
  {t:'ecuaciones',q:'x^2 - 8x + 15 = 0',tx:'x^2-8x+15=0',c:'x=3 o x=5',o:['x=-3 o x=-5','x=3 o x=-5','x=-3 o x=5']},
  {t:'ecuaciones',q:'x^2 - 4x - 5 = 0',tx:'x^2-4x-5=0',c:'x=5 o x=-1',o:['x=-5 o x=1','x=5 o x=1','x=-5 o x=-1']},
  {t:'ecuaciones',q:'x^2 + 3x - 10 = 0',tx:'x^2+3x-10=0',c:'x=2 o x=-5',o:['x=-2 o x=5','x=2 o x=5','x=-2 o x=-5']},
  {t:'ecuaciones',q:'Si x+y=10 y x-y=2, entonces x=',c:'6',o:['4','8','5']},
  {t:'ecuaciones',q:'Si 2x+3y=13 y x-y=4, entonces y=',c:'1',o:['-1','2','3']},
  {t:'ecuaciones',q:'|x-4| = 3',c:'x=7 o x=1',o:['x=7 o x=-1','x=4 o x=-3','x=7']},
  {t:'ecuaciones',q:'|2x+1| = 11',c:'x=5 o x=-6',o:['x=5 o x=6','x=-5 o x=6','x=5']},
  {t:'ecuaciones',q:'√(x+5) = 4',c:'11',o:['3','9','16']},
  {t:'ecuaciones',q:'√(2x-1) - 3 = 0',c:'5',o:['4','2','8']},

  // === EXP-LOG (30) ===
  {t:'exp-log',q:'log 1000 (base 10) =',c:'3',o:['10','100','1']},
  {t:'exp-log',q:'log 0.001 (base 10) =',c:'-3',o:['3','0.001','-0.001']},
  {t:'exp-log',q:'log_2 32 =',c:'5',o:['4','16','6']},
  {t:'exp-log',q:'log_5 125 =',c:'3',o:['2','4','25']},
  {t:'exp-log',q:'log_10 10^4 =',c:'4',o:['10','40','10^4']},
  {t:'exp-log',q:'Si log x = 2, entonces x =',c:'100',o:['20','200','e^2']},
  {t:'exp-log',q:'2^5 =',c:'32',o:['25','10','64']},
  {t:'exp-log',q:'3^4 =',c:'81',o:['12','64','27']},
  {t:'exp-log',q:'5^0 =',c:'1',o:['0','5','undefined']},
  {t:'exp-log',q:'4^(-1) =',c:'1/4',o:['-4','4','1']},
  {t:'exp-log',q:'√16 =',c:'4',o:['8','2','32']},
  {t:'exp-log',q:'∛27 =',c:'3',o:['9','6','13.5']},
  {t:'exp-log',q:'∛64 =',c:'4',o:['8','16','21.3']},
  {t:'exp-log',q:'√(x^6) =',c:'|x^3|',o:['x^3','x^2','x^12']},

  // === TRIGONOMETRIA (30) ===
  {t:'trigonometria',q:'sen(0°) =',c:'0',o:['1','-1','1/2']},
  {t:'trigonometria',q:'cos(90°) =',c:'0',o:['1','-1','1/2']},
  {t:'trigonometria',q:'tan(0°) =',c:'0',o:['1','∞','-1']},
  {t:'trigonometria',q:'sen(270°) =',c:'-1',o:['0','1','1/2']},
  {t:'trigonometria',q:'cos(270°) =',c:'0',o:['-1','1','1/2']},
  {t:'trigonometria',q:'tan(180°) =',c:'0',o:['1','∞','-1']},
  {t:'trigonometria',q:'sec θ = 1/',c:'cos θ',o:['sen θ','tan θ','csc θ']},
  {t:'trigonometria',q:'csc θ = 1/',c:'sen θ',o:['cos θ','tan θ','sec θ']},
  {t:'trigonometria',q:'cot θ = 1/',c:'tan θ',o:['sen θ','cos θ','sec θ']},
  {t:'trigonometria',q:'La ley de cosenos: c^2 =',c:'a^2+b^2-2ab cos C',o:['a^2+b^2+2ab cos C','a^2-b^2+2ab cos C','(a+b)^2-2ab cos C']},
  {t:'trigonometria',q:'Area de triangulo: (1/2)·a·b·',c:'sen C',o:['cos C','tan C','sec C']},
  {t:'trigonometria',q:'La amplitud de f(x)=5 cos x es:',c:'5',o:['1','π','10']},
  {t:'trigonometria',q:'El periodo de f(x)=sen(4x) es:',c:'π/2',o:['π','4π','2π']},
  {t:'trigonometria',q:'La grafica de sen x empieza en:',c:'(0,0)',o:['(0,1)','(π/2,1)','(π,0)']},

  // === FACTORIZACION (20) ===
  {t:'factorizacion',q:'x^2 - x - 20 =',c:'(x-5)(x+4)',o:['(x+5)(x-4)','(x-5)(x-4)','(x+5)(x+4)']},
  {t:'factorizacion',q:'x^2 + x - 20 =',c:'(x+5)(x-4)',o:['(x-5)(x+4)','(x+5)(x+4)','(x-5)(x-4)']},
  {t:'factorizacion',q:'x^2 - 11x + 28 =',c:'(x-4)(x-7)',o:['(x+4)(x+7)','(x-4)(x+7)','(x+4)(x-7)']},
  {t:'factorizacion',q:'x^2 + 11x + 28 =',c:'(x+4)(x+7)',o:['(x-4)(x-7)','(x+4)(x-7)','(x-4)(x+7)']},
  {t:'factorizacion',q:'x^2 - 36 =',c:'(x-6)(x+6)',o:['(x-6)^2','(x+6)^2','(x-18)(x+18)']},
  {t:'factorizacion',q:'4x^2 - 9 =',c:'(2x-3)(2x+3)',o:['(4x-9)(4x+9)','(2x-3)^2','(2x+3)^2']},
  {t:'factorizacion',q:'9x^2 - 16 =',c:'(3x-4)(3x+4)',o:['(3x-4)^2','(9x-16)(9x+16)','(3x+4)^2']},
  {t:'factorizacion',q:'x^2 + 8x + 16 =',c:'(x+4)^2',o:['(x-4)^2','(x+4)(x-4)','(x+8)^2']},
  {t:'factorizacion',q:'x^2 - 10x + 25 =',c:'(x-5)^2',o:['(x+5)^2','(x-5)(x+5)','(x-10)^2']},
  {t:'factorizacion',q:'x^2 + 14x + 49 =',c:'(x+7)^2',o:['(x-7)^2','(x+7)(x-7)','(x+14)^2']},
  {t:'factorizacion',q:'2x^2 + 5x + 3 =',c:'(2x+3)(x+1)',o:['(2x+1)(x+3)','(x+3)(2x+1)','(2x+3)(x-1)']},
  {t:'factorizacion',q:'3x^2 - 5x - 2 =',c:'(3x+1)(x-2)',o:['(3x-1)(x+2)','(3x-2)(x+1)','(x-2)(3x-1)']},

  // === INECUACIONES (20) ===
  {t:'inecuaciones',q:'x + 8 > 8 + 3',c:'x > 3',o:['x < 3','x > 11','x = 3']},
  {t:'inecuaciones',q:'3(x-2) < 2(x+1)',c:'x < 8',o:['x > 8','x < 4','x > 4']},
  {t:'inecuaciones',q:'(x+2)/(x-3) < 0',c:'-2 < x < 3',o:['x < -2 o x > 3','x < -2','x > 3']},
  {t:'inecuaciones',q:'x^2 + x - 6 < 0',c:'-3 < x < 2',o:['x < -3 o x > 2','x < -3','x > 2']},
  {t:'inecuaciones',q:'x^2 - 3x - 10 > 0',c:'x < -2 o x > 5',o:['-2 < x < 5','x < -2','x > 5']},
  {t:'inecuaciones',q:'|x-2| < 4',c:'-2 < x < 6',o:['x < 6','x > -2','x < -2 o x > 6']},
  {t:'inecuaciones',q:'|x+3| ≥ 2',c:'x ≤ -5 o x ≥ -1',o:['-5 ≤ x ≤ -1','x ≥ -1','x ≤ -5']},
  {t:'inecuaciones',q:'3x + 4 > 2x - 1',c:'x > -5',o:['x < -5','x > 5','x < 5']},

  // === CALCULO (20) ===
  {t:'calculo',q:'∫_-a^a f(x) dx si f es impar =',c:'0',o:['2∫_0^a f(x) dx','∫_0^a f(x) dx','a∫f(x)dx']},
  {t:'calculo',q:'d/dx (x^2+1)^3',c:'6x(x^2+1)^2',o:['3(x^2+1)^2','6x(x^2+1)','(x^2+1)^2']},
  {t:'calculo',q:'∫ 4x^3 dx',c:'x^4 + C',o:['4x^4 + C','12x^2 + C','x^3 + C']},
  {t:'calculo',q:'d/dx (ln(x^2))',c:'2/x',o:['1/x^2','2x/x^2','ln(2x)']},
  {t:'calculo',q:'∫ e^(2x) dx',c:'(1/2)e^(2x) + C',o:['2e^(2x) + C','e^(2x) + C','e^(2x)/2x + C']},
  {t:'calculo',q:'d/dx (x ln x)',c:'ln x + 1',o:['ln x','1/x','x ln x + x']},
  {t:'calculo',q:'∫ cos(2x) dx',c:'(1/2)sen(2x) + C',o:['-2sen(2x)+C','sen(2x)+C','(1/2)cos(2x)+C']},
  {t:'calculo',q:'d/dx (e^x cos x)',c:'e^x(cos x - sen x)',o:['e^x(sen x - cos x)','e^x(cos x + sen x)','-e^x sen x']},
  {t:'calculo',q:'f(x)=3x^2-12x+5, su minimo esta en x=',c:'2',o:['-2','4','-4']},
  {t:'calculo',q:'∫ (2x-3)^3 dx',c:'(2x-3)^4/8 + C',o:['(2x-3)^4/4 + C','3(2x-3)^2 + C','(2x-3)^3/4 + C']},

  // === FRACCIONES-ALG (15) ===
  {t:'fracciones-alg',q:'(a^2+2a+1)/(a+1) =',c:'a+1',o:['a-1','a^2+1','(a+1)^2']},
  {t:'fracciones-alg',q:'(x^2-4x+4)/(x-2) =',c:'x-2',o:['x+2','(x-2)^2','x^2-4']},
  {t:'fracciones-alg',q:'(x+3)/(x^2-9) =',c:'1/(x-3)',o:['1/(x+3)','x-3','x+3']},
  {t:'fracciones-alg',q:'(x^2-4)/(x^2+4x+4) =',c:'(x-2)/(x+2)',o:['(x+2)/(x-2)','1','x-2']},
  {t:'fracciones-alg',q:'(x^2+6x+9)/(x+3) =',c:'x+3',o:['x-3','(x+3)^2','x+9']},
  {t:'fracciones-alg',q:'(x^2-25)/(x^2+5x) =',c:'(x-5)/x',o:['(x+5)/x','(x-5)/(x+5)','(x+5)/(x-5)']},
  {t:'fracciones-alg',q:'(x^2-3x)/(x^2-9) =',c:'x/(x+3)',o:['(x-3)/(x+3)','x/(x-3)','(x+3)/x']},
  {t:'fracciones-alg',q:'(x^2-1)/(x^2-2x-3) =',c:'(x-1)/(x-3)',o:['(x+1)/(x+3)','(x+1)/(x-3)','1']},
];

(async()=>{
  let ins=0,skp=0;
  for(let i=0;i<probs.length;i++){
    const e=probs[i];const src=S+'|'+e.t+'|'+i;const res=mkOpts(e.c,e.o);
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [e.t,e.tx||e.q,'',JSON.stringify(res.o),JSON.stringify([{math:e.q,expl:''}]),null,'media','tec_paa',2024,src,A,null,N]);ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)cnt FROM exercises');
  console.log('TOTAL DB:',r.rows[0].cnt);
  await p.end();
})();
