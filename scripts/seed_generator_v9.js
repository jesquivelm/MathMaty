process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v9';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === ARITMETICA / TEC-MATEMATICA (50) ===
  {t:'tec-matematica',q:'Resultado de 12+8×2:',c:'28',o:['40','20','48']},
  {t:'tec-matematica',q:'Resultado de 20-3×4+2:',c:'10',o:['74','6','14']},
  {t:'tec-matematica',q:'Valor de 2^3+3^2:',c:'17',o:['13','25','72']},
  {t:'tec-matematica',q:'Resultado de √25+√16:',c:'9',o:['41','3','√41']},
  {t:'tec-matematica',q:'4! (4 factorial) es:',c:'24',o:['12','16','8']},
  {t:'tec-matematica',q:'0! es:',c:'1',o:['0','-1','undefined']},
  {t:'tec-matematica',q:'Cuantos minutos hay en 3 horas?',c:'180',o:['300','120','200']},
  {t:'tec-matematica',q:'Cuantos segundos hay en 1 hora?',c:'3600',o:['60','360','6000']},
  {t:'tec-matematica',q:'2/3 + 3/4 =',c:'17/12',o:['5/7','6/12','1']},
  {t:'tec-matematica',q:'3/5 - 1/3 =',c:'4/15',o:['2/2','2/15','1/15']},
  {t:'tec-matematica',q:'2/3 × 3/4 =',c:'1/2',o:['6/12','1/3','1/4']},
  {t:'tec-matematica',q:'(2/3) ÷ (4/5) =',c:'5/6',o:['8/15','1/2','3/2']},
  {t:'tec-matematica',q:'0.25 + 0.75 =',c:'1',o:['0.9','1.1','0.85']},
  {t:'tec-matematica',q:'1/5 escrito como decimal:',c:'0.2',o:['0.5','0.15','0.25']},
  {t:'tec-matematica',q:'3/8 escrito como decimal:',c:'0.375',o:['0.38','0.35','0.4']},
  {t:'tec-matematica',q:'0.6 escrito como fraccion:',c:'3/5',o:['6/10','6/100','2/3']},
  {t:'tec-matematica',q:'0.75 escrito como fraccion:',c:'3/4',o:['75/100','1/2','7/10']},
  {t:'tec-matematica',q:'1.5 escrito como fraccion:',c:'3/2',o:['15/10','2/3','5/2']},
  {t:'tec-matematica',q:'25% de 80 es:',c:'20',o:['25','30','40']},
  {t:'tec-matematica',q:'¿Qué porcentaje es 30 de 120?',c:'25%',o:['30%','20%','40%']},
  {t:'tec-matematica',q:'Si aumento 200 en 15%, obtengo:',c:'230',o:['215','220','240']},
  {t:'tec-matematica',q:'Si descuento 20% a 150, queda:',c:'120',o:['130','110','100']},
  {t:'tec-matematica',q:'La tercera parte de 60 es:',c:'20',o:['30','15','10']},
  {t:'tec-matematica',q:'Los 2/3 de 90 son:',c:'60',o:['45','30','80']},
  {t:'tec-matematica',q:'Un objeto de $120 con IVA 13% cuesta:',c:'$135.60',o:['$133.00','$135.60','$145.60']},
  {t:'tec-matematica',q:'Si 3 camisas cuestan $75, cada camisa cuesta:',c:'$25',o:['$15','$20','$30']},
  {t:'tec-matematica',q:'Un tren viaja 150 km en 2.5 h. Su velocidad media:',c:'60 km/h',o:['50 km/h','75 km/h','80 km/h']},
  {t:'tec-matematica',q:'Si ahorro $5 por dia, en 30 dias ahorro:',c:'$150',o:['$35','$100','$125']},
  {t:'tec-matematica',q:'2^10 es:',c:'1024',o:['512','2048','100']},
  {t:'tec-matematica',q:'√144 es:',c:'12',o:['10','14','16']},
  {t:'tec-matematica',q:'√169 es:',c:'13',o:['11','15','17']},
  {t:'tec-matematica',q:'√225 es:',c:'15',o:['13','17','25']},
  {t:'tec-matematica',q:'∛8 es:',c:'2',o:['4','3','6']},
  {t:'tec-matematica',q:'∛125 es:',c:'5',o:['15','25','35']},
  {t:'tec-matematica',q:'∛216 es:',c:'6',o:['8','4','12']},
  {t:'tec-matematica',q:'77+33 =',c:'110',o:['100','111','120']},
  {t:'tec-matematica',q:'500-123 =',c:'377',o:['423','387','477']},
  {t:'tec-matematica',q:'25×12 =',c:'300',o:['250','325','275']},
  {t:'tec-matematica',q:'144÷12 =',c:'12',o:['10','14','11']},

  // === TEC-MATEMATICA: GEOMETRIA (20) ===
  {t:'tec-matematica',q:'Area de cuadrado de lado 9:',c:'81',o:['18','36','72']},
  {t:'tec-matematica',q:'Perimetro de rectangulo 7×3:',c:'20',o:['21','10','24']},
  {t:'tec-matematica',q:'Area de circulo de radio 5 (π=3.14):',c:'78.5',o:['31.4','15.7','78.5']},
  {t:'tec-matematica',q:'Circunferencia de radio 4:',c:'25.12',o:['12.56','50.24','20']},
  {t:'tec-matematica',q:'Volumen de esfera de radio 3 (π=3.14):',c:'113.04',o:['37.68','84.78','28.26']},
  {t:'tec-matematica',q:'Volumen de cilindro radio 2, altura 5 (π=3.14):',c:'62.8',o:['31.4','20','125.6']},
  {t:'tec-matematica',q:'Hipotenusa de triangulo rectangulo con catetos 5 y 12:',c:'13',o:['17','10','169']},
  {t:'tec-matematica',q:'Cateto con hipotenusa 10 y cateto 6:',c:'8',o:['4','√136','7']},
  {t:'tec-matematica',q:'Area de triangulo equilatero de lado 4 (√3≈1.73):',c:'6.92',o:['8','4','6']},
  {t:'tec-matematica',q:'Un angulo llano mide:',c:'180°',o:['90°','360°','270°']},
  {t:'tec-matematica',q:'Angulos complementarios suman:',c:'90°',o:['180°','360°','270°']},
  {t:'tec-matematica',q:'Angulos suplementarios suman:',c:'180°',o:['90°','360°','270°']},

  // === TEC-VERBAL extra (20) ===
  {t:'tec-verbal',q:'Sinonimo de "acertijo":',c:'Enigma',o:['Solucion','Pregunta','Respuesta']},
  {t:'tec-verbal',q:'Antonimo de "ocioso":',c:'Trabajador',o:['Perezoso','Descansado','Lento']},
  {t:'tec-verbal',q:'"Gesticular" significa:',c:'Hacer gestos',o:['Hablar','Cantar','Gritar']},
  {t:'tec-verbal',q:'Sinonimo de "burdo":',c:'Grosero',o:['Fino','Elegante','Delicado']},
  {t:'tec-verbal',q:'Antonimo de "sintesis":',c:'Analisis',o:['Resumen','Conclusion','Introduccion']},
  {t:'tec-verbal',q:'"Conciso" es lo opuesto de:',c:'Verboso',o:['Breve','Claro','Preciso']},
  {t:'tec-verbal',q:'Sinonimo de "nimio":',c:'Insignificante',o:['Importante','Grande','Necesario']},
  {t:'tec-verbal',q:'Antonimo de "erudito":',c:'Ignorante',o:['Sabio','Instruido','Culto']},
  {t:'tec-verbal',q:'"Vehemente" significa:',c:'Apasionado',o:['Calmado','Tranquilo','Sereno']},
  {t:'tec-verbal',q:'Sinonimo de "zozobra":',c:'Angustia',o:['Calma','Paz','Tranquilidad']},

  // === EXP-LOG extra (10) ===
  {t:'exp-log',q:'log_3 9 =',c:'2',o:['3','9','1']},
  {t:'exp-log',q:'log_2 0.5 =',c:'-1',o:['1','0.5','-0.5']},
  {t:'exp-log',q:'ln(e^5) =',c:'5',o:['e^5','5e','ln 5']},
  {t:'exp-log',q:'e^(ln 7) =',c:'7',o:['e^7','ln 7','7e']},
  {t:'exp-log',q:'log_4 64 =',c:'3',o:['4','16','8']},
  {t:'exp-log',q:'Si log_2 x = 3, entonces x =',c:'8',o:['6','9','4']},
  {t:'exp-log',q:'2^x = 64, x =',c:'6',o:['5','7','8']},
  {t:'exp-log',q:'10^x = 10000, x =',c:'4',o:['3','5','100']},
  {t:'exp-log',q:'log 0.01 =',c:'-2',o:['2','0.01','-0.01']},
  {t:'exp-log',q:'log_a a^n =',c:'n',o:['a','n^a','an']},
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
