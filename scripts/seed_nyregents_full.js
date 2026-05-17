const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const A='algone82022-examsp.pdf';
const K=[2,0,2,3,3,2,2,0,2,0,3,1,1,1,0,1,2,3,3,0,1,1,0,3];
const EX=[
{n:1,q:'Si f(x)=(3x+4)/2, entonces f(8) es',o:['21','16','14','4'],t:'ecuaciones',d:'facil'},
{n:2,q:'Si x≠0, la razon comun de x,2x^2,4x^3,8x^4,16x^5,... es',o:['2x','2','x','x/2'],t:'ecuaciones',d:'facil'},
{n:3,q:'36x^2-9 es equivalente a',o:['(6x-3)^2','(18x-4.5)^2','(6x+3)(6x-3)','(18x+4.5)(18x-4.5)'],t:'factorizacion',d:'facil'},
{n:4,q:'R={(-4,2),(3,6),(x,8),(-1,4)}. Que x la haria una funcion?',o:['-4','3','-1','0'],t:'tec-matematica',d:'facil'},
{n:5,q:'Punto (k,-5) en 3x+y=7. Valor de k:',o:['-8','-4','-2','4'],t:'ecuaciones',d:'facil'},
{n:6,q:'(1/3)x(6x^2-3x+9) es equivalente a',o:['2x^2-x+3','2x^2+3x+3','2x^3-x^2+3x','2x^3+3x^2+3x'],t:'factorizacion',d:'facil'},
{n:8,q:'Termino constante de 4d+6+3d^2:',o:['6','2','3','4'],t:'factorizacion',d:'facil'},
{n:9,q:'$600 al 2.4% anual por 4 anos. Monto:',o:['600(1+0.24)^4','600(1-0.24)^4','600(1+0.024)^4','600(1-0.024)^4'],t:'tec-matematica',d:'facil'},
{n:11,q:'Ordenar funciones de mas angosta a ancha: f=25x^2, g=0.5x^2, h=3x^2',o:['f,g,h','g,h,f','h,f,g','f,h,g'],t:'tec-matematica',d:'media'},
{n:12,q:'Encuesta: hamburguesas(32M,36H), pizza(44M,30H), perros(24M,34H). % pizza?',o:['30','37','44','74'],t:'tec-matematica',d:'facil'},
{n:13,q:'Que situacion es funcion lineal?',o:['Auto deprecia 7% anual','Gimnasio $50+$30/mes','Bacterias duplican semanal','Cuenta +0.1% mensual'],t:'tec-matematica',d:'facil'},
{n:15,q:'Paso al resolver x^2-10x-13=0 completando cuadrado:',o:['(x-5)^2=38','(x-5)^2=12','(x-10)^2=38','(x-10)^2=12'],t:'ecuaciones',d:'media'},{
n:16,q:'En 3x^2+7x-6+2x^3 (estandar), coeficiente principal:',o:['7','2','3','-6'],t:'factorizacion',d:'facil'},
{n:17,q:'Misma solucion: I.10(x-5)=-15, II.4+2(x-2)=9, III.(x+1)/3=11/6',o:['I y II','I y III','II y III','I,II,III'],t:'ecuaciones',d:'media'},
{n:18,q:'C(d)=120x2^(3d). Equivalente:',o:['240^(3d)','960x2^d','120x6^d','120x8^d'],t:'exp-log',d:'media'},
{n:19,q:'10x^2-12x-16x=6. George: 2(5x^2-14x)=2(3) luego 5x^2-14x=3. Propiedades:',o:['Suma y Conmutativa','Suma y Division','Distributiva y Conmutativa','Distributiva y Division'],t:'tec-matematica',d:'media'},
{n:20,q:'a1=22, an=3a(n-1)+1. a4:',o:['-241','-214','-22','67'],t:'ecuaciones',d:'media'},
{n:21,q:'Nadadora 1500m/15.42min. Convertir a mph. 1m=3.281ft,1mi=5280ft.',o:['1500/15.42 x 60/1 x 1/3.281 x 1/5280','1500/15.42 x 60/1 x 3.281/1 x 1/5280','1500/15.42 x 3.281/1 x 1/5280','1500/15.42 x 60/1 x 1/5280'],t:'tec-matematica',d:'media'},
{n:23,q:'Correlacion: horas disp(3,1,4,0,3,7,5,2) vs notas(85,99,81,98,90,65,78,90):',o:['-0.98','-0.95','0.98','0.95'],t:'tec-matematica',d:'dificil'},
{n:24,q:'V=(1/2)a(b+c)h. Despejar b:',o:['V/(ah)-c','2V/(ah)-c','V/(ah)+c','2V/(ah)+c'],t:'tec-matematica',d:'media'},
];
(async()=>{
  let ins=0,skp=0;
  for(const ex of EX){
    const src=A+' | part I | ej '+ex.n;
    if((await p.query('SELECT id FROM exercises WHERE source=$1',[src])).rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[ex.t,ex.q,'',JSON.stringify(ex.o),JSON.stringify([{math:'',expl:'Respuesta: '+ex.o[K[ex.n-1]]}]),null,ex.d,'tec_paa',2022,src,A,null,'10-11']);
    ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
