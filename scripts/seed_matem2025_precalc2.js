const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='UNA MATEM 2025_Precálculo_II Parcial.pdf';
const KEY={1:'B',2:'B',3:'C',4:'B',5:'B',6:'A',7:'C',8:'A',9:'C',10:'D',11:'A',12:'D',13:'C',14:'B',15:'B',16:'B',17:'A',18:'D',19:'B',20:'C',21:'D',22:'A',23:'C',24:'A',25:'D',26:'C',27:'B',28:'A',29:'D',30:'D'};
const L={A:0,B:1,C:2,D:3};
const EXS=[
{num:1,topic:'tec-matematica',q:'f:R→R, f(x)=(1-x)/x. Preimagen de -1/2:',opts:['1','2','-1','-3']},
{num:2,topic:'tec-matematica',q:'g:Z⁻→Z, g(x)=x³. I. Ámbito=Z⁺. II. 8 está en ámbito.',opts:['Ambas','Ninguna','Solamente I','Solamente II']},
{num:3,topic:'tec-matematica',q:'f(x)=2/((3x-6)(x+5)). Dominio:',opts:['R-{5}','R-{2}','R-{2,-5}','R-{-2,-5}']},
{num:4,topic:'tec-matematica',q:'h(x)=√(-1+x)/x. Dominio:',opts:[']0,1]','[1,+∞[',']-∞,1]','R-{0,1}']},
{num:5,topic:'tec-matematica',q:'(Requiere gráfica) Dominio de f:',opts:['[-2,2]','[-2,3]','[-3,2]','[-3,3]']},
{num:6,topic:'tec-matematica',q:'(Requiere gráfica) Intervalo donde f es estrictamente decreciente:',opts:[']-1,0[',']-1,2[',']-2,1[',']-2,2[']},
{num:7,topic:'tec-matematica',q:'(Requiere gráfica) Cantidad de preimágenes de -2:',opts:['0','1','2','3']},
{num:8,topic:'tec-matematica',q:'(Requiere gráfica) g:R→R, criterio:',opts:['g(x)=1-|x+2|','g(x)=1-|x-2|','g(x)=1+|x+2|','g(x)=1+|x-2|']},
{num:9,topic:'tec-matematica',q:'f:R→R, f(x)=(1-2x)/3. I. Estrictamente decreciente. II. Interseca X en (0,1/3).',opts:['Ambas','Ninguna','Solamente I','Solamente II']},
{num:10,topic:'tec-matematica',q:'f(x)=ax²+bx+c, a>0, c<0. Con certeza:',opts:['No interseca eje Y','No interseca eje X','Interseca X en 1 punto','Interseca X en 2 puntos']},
{num:11,topic:'tec-matematica',q:'g(x)=x²-2x+5. Ámbito:',opts:['[4,+∞[',']1,+∞[',']-∞,1]',']-∞,4[']},
{num:12,topic:'tec-matematica',q:'f(x)=x/(x+1), g(x)=(x-1)/x. (f∘g)(x):',opts:['-x','-1/x','(2x-1)/(x-1)','(x-1)/(2x-1)']},
{num:13,topic:'tec-matematica',q:'f(1)=-2, f(2)=0, f(3)=1. f es:',opts:['Biyectiva','Ni inyectiva ni sobreyectiva','Inyectiva pero no sobreyectiva','Sobreyectiva pero no inyectiva']},
{num:14,topic:'tec-matematica',q:'f(x)=(4-2x)/3 biyectiva. f⁻¹(1/2)=:',opts:['1','5/4','1/3','5/2']},
{num:15,topic:'tec-matematica',q:'(Requiere gráficas) ¿Cuál representa función y su inversa?',opts:['Ambas','Ninguna','Solamente I','Solamente II']},
{num:16,topic:'tec-matematica',q:'I(x)=-750x²+15000x. Precio para ingreso máximo:',opts:['5','10','20','80']},
{num:17,topic:'tec-matematica',q:'S(h)=4500h. I. S(h)=4500h. II. 80h → >₡350000.',opts:['Ambas','Ninguna','Solamente I','Solamente II']},
{num:18,topic:'exp-log',q:'f(x)=a^x, 0<a<1. I. f(a)<0. II. f(1/a)<f(a).',opts:['Ambas','Ninguna','Solamente I','Solamente II']},
{num:19,topic:'exp-log',q:'h(x)=(5/3)^(-x)+1. Cumple:',opts:['Ámbito=R','Estrictamente decreciente','(-1,3/5) pertenece','Interseca X en (1,0)']},
{num:20,topic:'exp-log',q:'f(x)=(1/4)^x-1, dominio=]-2,+∞[. Ámbito:',opts:['R',']1,15[',']-1,15[',']-1,+∞[']},
{num:21,topic:'exp-log',q:'f(x)=log_a(x), 0<a<1. Cumple:',opts:['f(x)=1 para x=0','f(x)>0 para x>1','f(x)<0 para 0<x<1','f(x)>0 para 0<x<1']},
{num:22,topic:'exp-log',q:'h(x)=-log_{1/2}(x+1), dominio [0,7[. Rango:',opts:['[0,3[',']0,3]','[-3,0[',']-3,0]']},
{num:23,topic:'exp-log',q:'g(x)=log_{3/2}(-x)+2. Cumple:',opts:['Ámbito=]0,+∞[','Dominio=]0,+∞[','Estrictamente decreciente','Interseca eje Y']},
{num:24,topic:'exp-log',q:'log₂x=3m, log₂y=-m. log₂(³√(x²y⁴))=:',opts:['2m/3','10m/3','-2m','(m+4)/3']},
{num:25,topic:'exp-log',q:'I. log₅5=0. II. log₇n=0 → n=1. III. log_a2=1 → a=2.',opts:['Todas','I y II','I y III','II y III']},
{num:26,topic:'exp-log',q:'4·8^(2x-1)=0.25^(x+3). Solución:',opts:['0','1/4','-5/8','-1/12']},
{num:27,topic:'exp-log',q:'25^x-5^(x+1)=14 tiene:',opts:['0 soluciones reales','1 solución real','2 soluciones reales','3 soluciones reales']},
{num:28,topic:'exp-log',q:'log₂(x+2)+log₂(x-1)=2. Solución:',opts:['{2}','{1}','{-2,1}','{-3,2}']},
{num:29,topic:'exp-log',q:'C(t)=600·3^(0.5t). ¿Horas para 1800 bacterias?',opts:['0.5','1.0','1.5','2.0']},
{num:30,topic:'exp-log',q:'m(x)=4^x mensajes. ₡2.5 c/u. Dinero a los 10 min:',opts:['100','320','419430','2621440']},
];
(async()=>{
  let ins=0,skp=0;
  for(const ex of EXS){
    const idx=L[KEY[ex.num]];
    const src=A+' | ej '+ex.num;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.topic,ex.q,'',JSON.stringify(ex.opts),JSON.stringify([{math:'',expl:'Respuesta: '+ex.opts[idx]}]),null,'media','tec_paa',2025,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,',Skipped:',skp);
  const r=await p.query('SELECT COUNT(*)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
