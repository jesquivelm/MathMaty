const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const ARCHIVO='algone82022-examsp.pdf';

const exercises=[
{n:1,q:'Si f(x)=(3x+4)/2, entonces f(8) es',o:['21','16','14','4'],a:2,t:'ecuaciones',d:'facil',lv:'9no'},
{n:2,q:'Si x≠0, la razon comun de la secuencia x, 2x^2, 4x^3, 8x^4, 16x^5,... es',o:['2x','2','x','x/2'],a:0,t:'ecuaciones',d:'facil',lv:'9no'},
{n:3,q:'La expresion 36x^2-9 es equivalente a',o:['(6x-3)^2','(18x-4.5)^2','(6x+3)(6x-3)','(18x+4.5)(18x-4.5)'],a:2,t:'factorizacion',d:'facil',lv:'9no'},
{n:4,q:'Dada la relacion R={(-4,2),(3,6),(x,8),(-1,4)}. Que valor de x la haria una funcion?',o:['-4','3','-1','0'],a:3,t:'tec-matematica',d:'facil',lv:'9no'},
{n:5,q:'Si el punto (k,-5) esta en la recta 3x+y=7, el valor de k es',o:['-8','-4','-2','4'],a:3,t:'ecuaciones',d:'facil',lv:'9no'},
{n:6,q:'(1/3)x(6x^2-3x+9) es equivalente a',o:['2x^2-x+3','2x^2+3x+3','2x^3-x^2+3x','2x^3+3x^2+3x'],a:2,t:'factorizacion',d:'facil',lv:'9no'},
{n:8,q:'Cual es el termino constante del polinomio 4d+6+3d^2?',o:['6','2','3','4'],a:0,t:'factorizacion',d:'facil',lv:'8vo'},
{n:9,q:'Emily invirtio $600 al 2.4% anual por 4 anos. Que expresa el monto?',o:['600(1+0.24)^4','600(1-0.24)^4','600(1+0.024)^4','600(1-0.024)^4'],a:2,t:'tec-matematica',d:'facil',lv:'9no'},
{n:11,q:'Ordene de mas angosta a mas ancha: f(x)=25x^2, g(x)=0.5x^2, h(x)=3x^2',o:['f(x),g(x),h(x)','g(x),h(x),f(x)','h(x),f(x),g(x)','f(x),h(x),g(x)'],a:3,t:'tec-matematica',d:'media',lv:'10-11'},
{n:12,q:'Encuesta: prefieren hamburguesas(32M,36H), pizza(44M,30H) o perros calientes(24M,34H). % que prefiere pizza?',o:['30%','37%','44%','74%'],a:1,t:'tec-matematica',d:'facil',lv:'9no'},
{n:13,q:'Que situacion modela una funcion lineal?',o:['Auto se deprecia 7% anual','Gimnasio cobra $50+$30/mes','Bacterias se duplican semanal','Cuenta aumenta 0.1% mensual'],a:1,t:'tec-matematica',d:'facil',lv:'9no'},
{n:15,q:'Al resolver x^2-10x-13=0 completando el cuadrado, un paso es:',o:['(x-5)^2=38','(x-5)^2=12','(x-10)^2=38','(x-10)^2=12'],a:0,t:'ecuaciones',d:'media',lv:'10-11'},
{n:16,q:'En 3x^2+7x-6+2x^3 (forma estandar), el coeficiente principal es:',o:['7','2','3','-6'],a:1,t:'factorizacion',d:'facil',lv:'9no'},
{n:18,q:'C(d)=120·2^(3d). Expresion equivalente:',o:['C(d)=240^(3d)','C(d)=960·2^d','C(d)=120·6^d','C(d)=120·8^d'],a:3,t:'exp-log',d:'media',lv:'10-11'},
{n:19,q:'10x^2-12x-16x=6, George escribio 2(5x^2-14x)=2(3) luego 5x^2-14x=3. Propiedades:',o:['Suma y Conmutativa','Suma y Division','Distributiva y Conmutativa','Distributiva y Division'],a:3,t:'tec-matematica',d:'media',lv:'10-11'},
{n:23,q:'Tabla: tiempo dispositivos vs nota. Coeficiente correlacion al 0.01 mas cercano:',o:['-0.98','-0.95','0.98','0.95'],a:0,t:'tec-matematica',d:'dificil',lv:'10-11'},
];

(async()=>{
  let ins=0,skp=0;
  for(const ex of exercises){
    const src=ARCHIVO+' | part I | ej '+ex.n;
    const exist=await p.query('SELECT id FROM exercises WHERE source=$1',[src]);
    if(exist.rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [ex.t,ex.q,'',JSON.stringify(ex.o),JSON.stringify([{math:'',expl:'Respuesta: '+ex.o[ex.a]}]),null,ex.d,'tec_paa',2022,src,ARCHIVO,null,ex.lv]);
    ins++;
  }
  console.log('Inserted:',ins,', Skipped:',skp);
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
