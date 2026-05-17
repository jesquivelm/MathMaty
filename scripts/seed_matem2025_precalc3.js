const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='UNA MATEM 2025_Precálculo_III Parcial.pdf';
const EXS=[
{num:1,topic:'tec-matematica',diff:'facil',q:'Radios 9cm y 5cm, distancia centros 4cm. Circunferencias:',opts:['Exteriores','Secantes','Tangentes exteriormente','Tangentes interiormente'],ans:3},
{num:2,topic:'tec-matematica',diff:'media',q:'(Requiere figura) O centro, arco CA=100°. m∠CBA:',opts:['40°','45°','50°','60°'],ans:-1},
{num:3,topic:'tec-matematica',diff:'media',q:'(Requiere figura) AB tangente, AB=15, CB=9. Radio:',opts:['6','7','8','9'],ans:-1},
{num:4,topic:'tec-matematica',diff:'facil',q:'Cada ángulo interno mide 140°. Polígono:',opts:['Octágono','Nonágono','Decágono','Dodecágono'],ans:1},
{num:5,topic:'tec-matematica',diff:'facil',q:'I. Decágono: 7 diagonales desde un vértice. II. Octágono: 20 diagonales totales.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:6,topic:'tec-matematica',diff:'media',q:'Polígono con 5 diagonales, lado=6cm. Área aprox:',opts:['61.9 cm²','32.7 cm²','43.0 cm²','50.8 cm²'],ans:0},
{num:7,topic:'tec-matematica',diff:'media',q:'Hexágono regular circunscrito en circunferencia radio 3√3cm. Perímetro:',opts:['18cm','36cm','24cm','30cm'],ans:1},
{num:8,topic:'tec-matematica',diff:'facil',q:'Diámetro 50cm, cuerda a 12cm del centro. Longitud:',opts:['20.0cm','30.0cm','40.0cm','43.8cm'],ans:3},
{num:9,topic:'tec-matematica',diff:'media',q:'Cono r=5m, área lateral=65π m². Altura:',opts:['10m','11m','12m','13m'],ans:2},
{num:10,topic:'tec-matematica',diff:'media',q:'Caja sin tapa, V=432cm³, h=12cm. Área total:',opts:['324cm²','300cm²','312cm²','336cm²'],ans:0},
{num:11,topic:'tec-matematica',diff:'media',q:'Cilindro área total=80π m², r=4m. Volumen:',opts:['64π m³','80π m³','96π m³','128π m³'],ans:2},
{num:12,topic:'tec-matematica',diff:'dificil',q:'(Requiere figura) Área de región sombreada:',opts:['8π','32π','24-4π','24-16π'],ans:-1},
{num:13,topic:'tec-matematica',diff:'dificil',q:'(Requiere figura) Área de región sombreada:',opts:['9π-18','18π-9','18π-18','18π-36'],ans:-1},
{num:14,topic:'tec-matematica',diff:'dificil',q:'Esfera r=4.5cm inscrita en cilindro. Diferencia de volúmenes:',opts:['81π/2','243π/4','803π/10','100π'],ans:1},
{num:15,topic:'trigonometria',diff:'facil',q:'α=-13π/6 rad. Ángulo coterminal:',opts:['5π/6','7π/6','9π/6','11π/6'],ans:3},
{num:16,topic:'trigonometria',diff:'facil',q:'Ángulo 750°: lado terminal en cuadrante:',opts:['I','II','III','IV'],ans:0},
{num:17,topic:'trigonometria',diff:'dificil',q:'cot(90°-θ)=40/9. csc(θ):',opts:['41/9','40/41','9/41','41/40'],ans:3},
{num:18,topic:'trigonometria',diff:'facil',q:'Terminal en (√3/2,-1/2). β:',opts:['150°','210°','330°','120°'],ans:2},
{num:19,topic:'trigonometria',diff:'facil',q:'¿Cuál par ordenado pertenece al círculo trigonométrico?',opts:['(3/5,4/5)','(4/5,3/6)','(-4/5,3/7)','(√2/3,√3/3)'],ans:0},
{num:20,topic:'trigonometria',diff:'facil',q:'f:[0,π]→R, f(x)=sen(x). Ámbito:',opts:['R','[0,1]','[-1,1]','[-1,0]'],ans:1},
{num:21,topic:'trigonometria',diff:'media',q:'Coseno (dom max): I. Positivo en (-π/2,π/2). II. Es impar.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:2},
{num:22,topic:'trigonometria',diff:'media',q:'Seno (dom real): I. Positivo en (0,π). II. Decreciente en (π/2,3π/2).',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:23,topic:'trigonometria',diff:'facil',q:'cos(x)=5/13, 0<x<π/2. I. tan(x)=12/5. II. sen(x)=12/13.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:24,topic:'trigonometria',diff:'media',q:'sen(α+3π/2) es equivalente a:',opts:['cos(α)','sen(α)','-cos(α)','-sen(α)'],ans:2},
{num:25,topic:'trigonometria',diff:'media',q:'Cable 25m sujeta poste 21m. Ángulo cable-suelo:',opts:['33°','40°','50°','57°'],ans:3},
{num:26,topic:'trigonometria',diff:'dificil',q:'(3csc²x-7cscx-6)/(A-2)=3cscx. A:',opts:['3-cscx','cscx-3','-2+cscx','1+3cscx'],ans:-1},
{num:27,topic:'tec-matematica',diff:'dificil',q:'(Requiere figura) AD en cuadrilátero:',opts:['16.83','19.48','20.53','24.39'],ans:-1},
{num:28,topic:'trigonometria',diff:'dificil',q:'Procedimientos para (secx-cosx)/tanx: I. simplifica a senx. II. usa conjugado.',opts:['Ambos','Ninguno','Solamente I','Solamente II'],ans:2},
{num:29,topic:'trigonometria',diff:'media',q:'4sen(x)cos(x)+2cos(x)=1+2sen(x). Una solución:',opts:['π/4','3π/4','5π/6','11π/6'],ans:3},
{num:30,topic:'trigonometria',diff:'media',q:'(2√3 senx-3)(1+senx)=0 en [0,2π[. Soluciones:',opts:['1','2','3','4'],ans:2},
];
(async()=>{
  let ins=0,skp=0;
  for(const ex of EXS){
    if(ex.ans<0){console.log('  Q'+ex.num+': skip');continue;}
    const src=A+' | ej '+ex.num;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.topic,ex.q,'',JSON.stringify(ex.opts),JSON.stringify([{math:'',expl:'Respuesta: '+ex.opts[ex.ans]}]),null,ex.diff,'tec_paa',2025,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,',Skipped:',skp);
  const r=await p.query('SELECT COUNT(*)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
