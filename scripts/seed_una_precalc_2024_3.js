const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='UNA MATEM2024_Precálculo_III Parcial.pdf';
const EXS=[
{num:1,topic:'tec-matematica',diff:'facil',q:'Radios 8cm y 6cm, distancia entre centros 2cm. Las circunferencias son:',opts:['Exteriores','Secantes','Tangentes interiormente','Tangentes exteriormente'],ans:2},
{num:2,topic:'tec-matematica',diff:'media',q:'(Requiere figura) O es centro, arco BC=116°. m∠ABC es:',opts:['32°','56°','64°','116°'],ans:-1},
{num:3,topic:'tec-matematica',diff:'facil',q:'Cada ángulo interno de un polígono regular mide 156°. Es un:',opts:['Pentágono','Heptágono','Endecágono','Pentadecágono'],ans:3},
{num:4,topic:'tec-matematica',diff:'media',q:'Polígonos regulares: I. Endecágono → 8 diagonales desde un vértice. II. 7 lados → 14 diagonales totales.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:5,topic:'tec-matematica',diff:'media',q:'(Requiere figura) AB tangente en A, AB=16, CB=8. Radio = ?',opts:['8','12','16','20'],ans:-1},
{num:6,topic:'tec-matematica',diff:'media',q:'Polígono regular con 9 diagonales, lado=4cm. Área = ?',opts:['24 cm²','48√3 cm²','12√3 cm²','24√3 cm²'],ans:3},
{num:7,topic:'tec-matematica',diff:'media',q:'Hexágono regular con circunferencia inscrita de radio 6√3. Perímetro = ?',opts:['24','24√3','72','72√3'],ans:2},
{num:8,topic:'tec-matematica',diff:'facil',q:'Diámetro=122cm, cuerda a 11cm del centro. Medida de la cuerda = ?',opts:['22cm','60cm','61cm','120cm'],ans:3},
{num:9,topic:'tec-matematica',diff:'media',q:'Cono: radio base=7m, área lateral=175π m². Altura = ?',opts:['14m','24m','25m','49m'],ans:1},
{num:10,topic:'tec-matematica',diff:'media',q:'Caja sin tapa, prisma base cuadrada, V=539cm³, h=11cm. Área total = ?',opts:['605','406','308','357'],ans:3},
{num:11,topic:'tec-matematica',diff:'media',q:'Cilindro: área total=60π m², radio=3m. Volumen = ?',opts:['21π m³','42π m³','63π m³','90π m³'],ans:2},
{num:12,topic:'tec-matematica',diff:'media',q:'Esfera r=6cm inscrita en cilindro. Diferencia de volúmenes = ?',opts:['288π cm³','144π cm³','72π cm³','18π cm³'],ans:1},
{num:13,topic:'trigonometria',diff:'facil',q:'α=-11π/4 rad. Ángulo coterminal con α:',opts:['-5π/4','π/4','-π/4','5π/4'],ans:3},
{num:14,topic:'trigonometria',diff:'facil',q:'Ángulo 1360°: lado terminal en cuadrante:',opts:['I','II','III','IV'],ans:3},
{num:15,topic:'trigonometria',diff:'dificil',q:'cot(90°-θ)=143/24. csc(θ) = ?',opts:['145/24','143/145','145/143','24/145'],ans:2},
{num:16,topic:'trigonometria',diff:'facil',q:'Terminal en (-√3/2,-1/2). β = ?',opts:['240°','210°','150°','330°'],ans:1},
{num:17,topic:'trigonometria',diff:'facil',q:'¿Cuál par ordenado pertenece al círculo trigonométrico?',opts:['(1/2,-1/2)','(√2/2,√2/3)','(-2/3,√5/3)','(-√3/2,√3/2)'],ans:2},
{num:18,topic:'trigonometria',diff:'facil',q:'Dominio de f(x)=tan(x):',opts:['R','R-{kπ/2,k∈Z}','R-{kπ,k∈Z}','R-{π/2(2k+1),k∈Z}'],ans:3},
{num:19,topic:'trigonometria',diff:'facil',q:'Ámbito de f:[-π/2,π/2]→R, f(x)=cos(x):',opts:['R','[-1,1]','[0,1]','[-π/2,π/2]'],ans:2},
{num:20,topic:'trigonometria',diff:'media',q:'Función seno (dom max): I. Positiva en (3π/4,5π/4). II. Es impar.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:3},
{num:21,topic:'trigonometria',diff:'media',q:'Función coseno (dom max): I. Negativa en (π/2,3π/2). II. Creciente en (3π/2,2π).',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:0},
{num:22,topic:'trigonometria',diff:'dificil',q:'π<x<3π/2, cos(x)=-2√10/7. I. cot(x)=3/(2√10). II. csc(x)=-7/3.',opts:['Ambas','Ninguna','Solamente I','Solamente II'],ans:3},
{num:23,topic:'trigonometria',diff:'facil',q:'Terminal en (1/2,√3/2). Valores de β:',opts:['π/3 y -5π/3','-π/3 y 5π/3','2π/3 y 5π/3','π/3 y -2π/3'],ans:0},
{num:24,topic:'trigonometria',diff:'media',q:'cos(α+5π/2) es equivalente a:',opts:['sen(α)','cos(α)','-sen(α)','-cos(α)'],ans:2},
{num:25,topic:'trigonometria',diff:'media',q:'Edificio 20m, observador se aleja 10m, ángulo 45° a 50m. Altura edificio frente = ?',opts:['130m','80m','60m','50m'],ans:1},
{num:26,topic:'trigonometria',diff:'dificil',q:'(2sec²x-9secx-5)/(A-1)=2secx es identidad. A = ?',opts:['-5+secx','5+secx','1-2secx','1+2secx'],ans:-1},
{num:27,topic:'tec-matematica',diff:'dificil',q:'(Requiere figura) m∠BCA=45°, EC=2√2, AD=6. BE = ?',opts:['2','8','2√2','4√2'],ans:-1},
{num:28,topic:'trigonometria',diff:'dificil',q:'Procedimientos para (1-cot(x))/csc(x): I. Usa conjugado. II. Simplifica a senx-cosx.',opts:['Ambos','Ninguno','Solamente I','Solamente II'],ans:3},
{num:29,topic:'trigonometria',diff:'media',q:'cos(x)tan(x)-cos(x)=0 en [0,2π[ tiene:',opts:['1 solución','2 soluciones','3 soluciones','4 soluciones'],ans:3},
{num:30,topic:'trigonometria',diff:'media',q:'Suma de soluciones de sen(x)cos(x)+2cos(x)-(sen(x)+2)=0 en [0,2π]:',opts:['0','2π','π/2','3π/2'],ans:1},
];
(async()=>{
  let ins=0,skp=0;
  for(const ex of EXS){
    if(ex.ans<0){console.log('  Q'+ex.num+': needs figure/manual');continue;}
    const src=A+' | ej '+ex.num;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.topic,ex.q,'',JSON.stringify(ex.opts),JSON.stringify([{math:'',expl:'Respuesta: '+ex.opts[ex.ans]}]),null,ex.diff,'tec_paa',2024,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,',Skipped:',skp);
  const r=await p.query('SELECT COUNT(*)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
