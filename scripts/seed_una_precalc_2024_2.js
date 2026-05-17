const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='UNA MATEM2024_Precálculo_II Parcial.pdf';

const EXS=[
{num:1,topic:'tec-matematica',diff:'facil',q:'Si el gráfico de una función f corresponde a {(3,0),(4,1),(5,2)}, entonces el rango de f corresponde a:',opts:['[0,2]','[3,5]','{3,4,5}','{0,1,2}'],ans:3},
{num:2,topic:'tec-matematica',diff:'facil',q:'Sea a una constante. Para h(x)=2-x², la imagen de a-1 corresponde a:',opts:['3-a','1-a²','1+2a-a²','3+2a-a²'],ans:2},
{num:3,topic:'tec-matematica',diff:'media',q:'(Requiere gráfica) Considere la gráfica de f. Proposiciones: I. Cero tiene dos preimágenes. II. Uno pertenece al ámbito de f.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:-1},
{num:4,topic:'tec-matematica',diff:'media',q:'(Requiere gráfica) Un intervalo en el que f es estrictamente creciente es:',opts:[']0,1[',']0,2[',']-2,0[',']-1,2['],ans:-1},
{num:5,topic:'tec-matematica',diff:'facil',q:'(Requiere gráfica) La preimagen de -2 corresponde a:',opts:['2','0','-1','-2'],ans:-1},
{num:6,topic:'tec-matematica',diff:'media',q:'El dominio real de g(x)=(3x+1)/(1-7/(x+4)) corresponde a:',opts:['R','R-{-4}','R-{-4,3}','R-{-4,0,3}'],ans:2},
{num:7,topic:'tec-matematica',diff:'media',q:'El dominio real de h(x)=√(6-3x)/(x²-2x-3) corresponde a:',opts:['[2,+∞[',']-∞,2]','[2,+∞[-{3}',']-∞,2]-{-1}'],ans:3},
{num:8,topic:'tec-matematica',diff:'media',q:'(Requiere gráfica) El criterio de la función h representada es:',opts:['h(x)=1-√(x-5)','h(x)=1+√(x+5)','h(x)=1+√(5-x)','h(x)=1-√(5-x)'],ans:-1},
{num:9,topic:'exp-log',diff:'facil',q:'Si (-1,5) pertenece a f(x)=mx-2, entonces f es:',opts:['Cóncava','Creciente','Constante','Decreciente'],ans:3},
{num:10,topic:'tec-matematica',diff:'media',q:'Función cuadrática con vértice (2,9) e intercepto y en (0,3). Proposiciones: I. Cóncava hacia abajo. II. Decreciente en ]3,+∞[.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:11,topic:'exp-log',diff:'media',q:'h(x)=-2x²+36x. Proposiciones: I. h(x)>0 para x∈]0,18[. II. La gráfica interseca en un único punto al eje X.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:2},
{num:12,topic:'exp-log',diff:'facil',q:'f(x)=x², g(x)=√(x+2). (f∘g)(x) corresponde a:',opts:['x+2','√(x+2)+2','x+2√x+4','x+4√x+4'],ans:0},
{num:13,topic:'tec-matematica',diff:'media',q:'Función biyectiva f. Proposiciones: I. Codominio y ámbito son iguales. II. Si dominio tiene 2 elementos, codominio también.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:14,topic:'tec-matematica',diff:'media',q:'Puntos (-1,2) y (3,1) en gráfica de función lineal f. El criterio de f⁻¹ es:',opts:['f⁻¹(x)=4x-1','f⁻¹(x)=-4x+7','f⁻¹(x)=-4x-1','f⁻¹(x)=(-x+13)/4'],ans:1},
{num:15,topic:'tec-matematica',diff:'media',q:'f:[6,12[→[6,10[, f(x)=2(x/3+1). El criterio de f⁻¹ es:',opts:['3x/2-1','(3x+2)/2','(3x-1)/2','3(x/2-1)'],ans:3},
{num:16,topic:'tec-matematica',diff:'media',q:'Tarifa internet: ₡12000 por ≤6h, ₡100 c/hora adicional. Proposiciones: I. 3h → ₡12000. II. C(x)=6x+12000.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:2},
{num:17,topic:'tec-matematica',diff:'facil',q:'U(x)=1000x-2x². ¿Cuántos artículos para utilidad máxima?',opts:['250','500','125000','250000'],ans:0},
{num:18,topic:'exp-log',diff:'media',q:'h:R→]1,+∞[, h(x)=(3/4)^(-x)+1. Proposiciones: I. Estrictamente decreciente. II. y=1 es asíntota horizontal.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:3},
{num:19,topic:'tec-matematica',diff:'facil',q:'f:R→R, f(x)=-3x+4. El rango de f es:',opts:['R',']-∞,4[',']4,+∞[',']-∞,-4['],ans:0},
{num:20,topic:'exp-log',diff:'media',q:'g:R→]-5/2,+∞[, g(x)=e^x-5/2. Interseca al eje Y en:',opts:['(-2,0)','(0,-5/2)','(0,-2)','(ln5,0)'],ans:-1},
{num:21,topic:'exp-log',diff:'facil',q:'El dominio real de f(x)=log₇(2x-6) es:',opts:['[3,+∞[',']3,+∞[',']-∞,-3[',']-∞,-3]'],ans:1},
{num:22,topic:'exp-log',diff:'facil',q:'f(x)=ln(x). ¿Cuál es VERDADERO?',opts:['Si x∈]0,1[ entonces f(x)<0','Si x∈]0,1[ entonces f(x)>0','Si x∈]1,+∞[ entonces f(x)≥0','Si x∈]1,+∞[ entonces f(x)≤0'],ans:0},
{num:23,topic:'exp-log',diff:'media',q:'f(x)=log_{1/4}(x). Si 1<x<2 entonces:',opts:['-1/2<f(x)<0','-1/4<f(x)<0','1/16<f(x)<1/4','1/16<f(x)<1/8'],ans:0},
{num:24,topic:'exp-log',diff:'media',q:'El conjunto solución de 3^(2x+1)=81/27^(x+2) tiene:',opts:['Cero soluciones reales','Una única solución real','Dos soluciones reales','Tres soluciones reales'],ans:1},
{num:25,topic:'exp-log',diff:'media',q:'El conjunto solución de 36^x-6^(x+1)-7=0 es:',opts:['∅','{-1,7}','{log₆(7)}','{0,log₆(7)}'],ans:2},
{num:26,topic:'exp-log',diff:'media',q:'log(3x-2)+log(x-3)=1. Solución:',opts:['{4}','{-1/3}','{1/3,-4}','{-1/3,4}'],ans:0},
{num:27,topic:'exp-log',diff:'dificil',q:'1/3[1/5 ln(8)-3ln(x)] es equivalente a:',opts:['x⁵√2','ln(⁵√2/x)','ln(x/⁵√2)','ln(x⁵√2)'],ans:1},
{num:28,topic:'exp-log',diff:'dificil',q:'Expresión equivalente a log(100(x²+1)/(3x²)):',opts:['log(x²+1)-2logx+2-log3','log(x²+1)-2logx-log(100/3)','log(x²+1)-2logx+2+log3','log(100(x²+1))-log3+2logx'],ans:0},
{num:29,topic:'exp-log',diff:'facil',q:'p(h)=29e^(-0.000034h). Si p=14.5, la altura es:',opts:['ln(0.5)/0.000034 pies','ln(2)/0.000034 pies','29e^(-0.000493) pies','0.000034ln(2) pies'],ans:1},
{num:30,topic:'exp-log',diff:'media',q:'f(t)=3(1.15)^t. ¿Personas informadas 1 hora después?',opts:['3.45','16250','13152','53207'],ans:2},
];

(async()=>{
  let ins=0,skp=0;
  for(const ex of EXS){
    if(ex.ans<0){console.log('  Q'+ex.num+': needs graph/manual');continue;}
    const src=A+' | ej '+ex.num;
    const exists=await p.query('SELECT id FROM exercises WHERE source=$1',[src]);
    if(exists.rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.topic,ex.q,'',JSON.stringify(ex.opts),JSON.stringify([{math:'',expl:'Respuesta: '+ex.opts[ex.ans]}]),null,ex.diff,'tec_paa',2024,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,',Skipped:',skp);
  const r=await p.query('SELECT COUNT(*)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
