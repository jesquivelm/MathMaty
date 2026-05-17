const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east-1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});

const ARCHIVO='cuadernillo algebra.pdf';
const ansKey={1:'D',2:'C',3:'B',4:'B',5:'C',6:'B',7:'C',8:'D',9:'A',10:'B',11:'A',12:'D',13:'B',14:'B',15:'B',16:'A',17:'B',18:'D',19:'B',20:'C',21:'B',22:'D',23:'A',24:'C',25:'B',26:'A',27:'E',28:'C',29:'D',30:'B',31:'E',32:'B',33:'A',34:'B',35:'A',36:'B',37:'A',38:'A',39:'C',40:'B',41:'B',42:'D',43:'E',44:'B',45:'A',46:'E',47:'A',48:'B',49:'D',50:'B'};
const LTR={A:0,B:1,C:2,D:3,E:4};
const topics={1:'ecuaciones',2:'ecuaciones',3:'ecuaciones',4:'ecuaciones',5:'ecuaciones',6:'ecuaciones',7:'ecuaciones',8:'ecuaciones',9:'ecuaciones',10:'ecuaciones',11:'ecuaciones',12:'ecuaciones',13:'ecuaciones',14:'ecuaciones',15:'ecuaciones',16:'fracciones-alg',17:'fracciones-alg',18:'fracciones-alg',19:'tec-matematica',20:'tec-matematica',21:'tec-matematica',22:'tec-matematica',23:'tec-matematica',24:'ecuaciones',25:'ecuaciones',26:'ecuaciones',27:'ecuaciones',28:'ecuaciones',29:'ecuaciones',30:'ecuaciones',31:'ecuaciones',32:'ecuaciones',33:'ecuaciones',34:'tec-matematica',35:'tec-matematica',36:'tec-matematica',37:'ecuaciones',38:'ecuaciones',39:'ecuaciones',40:'ecuaciones',41:'factorizacion',42:'factorizacion',43:'factorizacion',44:'factorizacion',45:'factorizacion',46:'factorizacion',47:'factorizacion',48:'factorizacion',49:'factorizacion',50:'factorizacion'};
const niveles={1:'7mo',2:'7mo',3:'7mo',4:'7mo',5:'7mo',6:'7mo',7:'7mo',8:'7mo',9:'7mo',10:'7mo',11:'7mo',12:'7mo',13:'7mo',14:'7mo',15:'7mo',16:'8vo',17:'8vo',18:'8vo',19:'7mo',20:'7mo',21:'7mo',22:'7mo',23:'7mo',24:'7mo',25:'7mo',26:'7mo',27:'7mo',28:'7mo',29:'8vo',30:'8vo',31:'8vo',32:'8vo',33:'8vo',34:'8vo',35:'8vo',36:'8vo',37:'9no',38:'9no',39:'9no',40:'9no',41:'8vo',42:'8vo',43:'8vo',44:'8vo',45:'8vo',46:'8vo',47:'8vo',48:'8vo',49:'8vo',50:'8vo'};

const exercises=[
{n:1,q:'2 + (-10)',o:['12','-12','8','-8','10'],d:'facil'},
{n:2,q:'7 + (-7)',o:['14','-14','0','-0','13'],d:'facil'},
{n:3,q:'-2 + 2(-2)',o:['6','-6','2','8','4'],d:'facil'},
{n:4,q:'(-8) + 10',o:['-18','2','-2','18','16'],d:'facil'},
{n:5,q:'(-15)+20+(-9)',o:['43','4','-4','14','20'],d:'facil'},
{n:6,q:'(-6)(9)',o:['54','-54','15','-3','54'],d:'facil'},
{n:7,q:'-2(9)(10)',o:['18','-18','-180','180','8'],d:'facil'},
{n:8,q:'-3(-4)(-8)',o:['96','-72','-76','-96','32'],d:'facil'},
{n:9,q:'13-3(8-6)',o:['29','30','65','-29','48'],d:'facil'},
{n:10,q:'15-7(2-11)',o:['-26','78','76','91','36'],d:'facil'},
{n:11,q:'6x2/4',o:['3','6','12','24','18'],d:'facil'},
{n:12,q:'24(-3)/9',o:['18','8','72','-8','26'],d:'facil'},
{n:13,q:'(27-3)/8+4(5-7)',o:['18','-5','36','11','74'],d:'facil'},
{n:14,q:'72/(-8)x2-4/(6-4)',o:['-9','24','9','72','48'],d:'media'},
{n:15,q:'96/(-6)x8',o:['118','-108','138','128','216'],d:'facil'},
{n:16,q:'(12x^3-6x^2+18x)/(6x)',o:['2x^2-x+3','3x^2+x+3','2x^2-x-3','4x^2+x-3','6x^2-x-3'],d:'media'},
{n:17,q:'((3x+a)^2-a(3x+a))/(3x+a)',o:['2x','3x','4x','-2x','5x'],d:'media'},
{n:18,q:'(12a^4+4a^3-32a^2)/(4a^2)-(3a-8)(a+1)',o:['2a','4a','6a','-6','8'],d:'dificil'},
{n:19,q:'La suma de cuatro veces x y siete veces y',o:['x+x+x+x+y+y+y+y+y+y','4x+7y','4(-x)+7(y)','4x-7','4x-7'],d:'facil'},
{n:20,q:'z mas tres veces la suma de x y y',o:['z+3xy','z+3x+3y','z+3(x+y)','z+x+y','z+(xy)'],d:'facil'},
{n:21,q:'Cuatro veces z menos tres veces la suma de x y y',o:['4z-3x+3y','4z-3(x+y)','4z+3xy','4z-3x+y','4z+3xy'],d:'facil'},
{n:22,q:'z mas el producto de x y y',o:['z+1(xxy)','z-(x+y)','z(xy)','z+xy','z+(x)+(y)'],d:'facil'},
{n:23,q:'El perimetro P de un rectangulo es igual al doble de la suma de su longitud L y su anchura W',o:['P=2(L+W)','P=2L+W','P=2L+2W','P=4L+W','P=4L+4W'],d:'facil'},
{n:24,q:'6x=-6',o:['6','1','-1','0','3'],d:'facil'},
{n:25,q:'-64x=16',o:['4','-1/4','80','48','24'],d:'facil'},
{n:26,q:'x/4=8',o:['32','2','12','-32','16'],d:'facil'},
{n:27,q:'2.3x=0.69',o:['-3','13','18','3','0.3'],d:'facil'},
{n:28,q:'(2/6)x=-4',o:['1.23','12','-12','-1.23','18'],d:'facil'},
{n:29,q:'5x+3=4x+9',o:['12','14','24','6','18'],d:'facil'},
{n:30,q:'5x-7=13x+1',o:['1','-1','2','-2','3'],d:'facil'},
{n:31,q:'(1/2)x+(2/3)=(1/4)x-(1/6)',o:['10/3','8.2','3.3','5/3','-10/3'],d:'media'},
{n:32,q:'7x+8+(-2x)=2x-7+(-2x)',o:['1','-3','3','5','2'],d:'media'},
{n:33,q:'(5/x)+3=-2',o:['-1','1','6','3','4'],d:'media'},
{n:34,q:'El par ordenado (-3,5) pertenece al',o:['Primer cuadrante','Segundo cuadrante','Tercer cuadrante','Cuarto cuadrante','Plano de coordenadas'],d:'facil'},
{n:35,q:'Al punto donde se intersectan dos rectas numericas se llama',o:['Punto de origen','Cruzamiento','Corte','Interseccion','Paralelas'],d:'facil'},
{n:36,q:'En una tabla de valores para x o para y se les llama',o:['Dominio y contradominio','Dominio y rango','Dominio y dominado','Codominio y rango','Codominio y rango lineal'],d:'facil'},
{n:37,q:'4x+5y=59.50 cuando x=3y',o:['y=3.5 x=10.50','y=2.5 x=8','y=8 x=2','y=4 x=6','y=7 x=21'],d:'media'},
{n:38,q:'5x+y-3=0 cuando x=3',o:['x=3 y=-12','x=0 y=3','x=3 y=13','x=4 y=6','x=8 y=9'],d:'media'},
{n:39,q:'-3x+2y=7 cuando y=-1',o:['x=-2 y=-1','x=4 y=9','x=2 y=4','x=4 y=5','x=-3 y=-1'],d:'media'},
{n:40,q:'3x+y=15 cuando y=3',o:['y=3 x=-4','y=3 x=4','y=3 x=3','y=2 x=-3','y=5 x=4'],d:'media'},
{n:41,q:'4ab+6ab-3ab',o:['-7ab','7ab','13ab','-13ab','10ab'],d:'facil'},
{n:42,q:'3a^2b+6a^2b+(-8a^2b)+(-5a^2b)',o:['-5a^2b','9ab','-4ab','-4a^2b','-4a^2b^2'],d:'facil'},
{n:43,q:'6a^2+(-8a^2)',o:['-14a^2','14a^2','16a','48a^2','-2a^2'],d:'facil'},
{n:44,q:'(3a-5b)+(-2a-3b)',o:['a+2b','a-8b','a+b','a-b','a+4b'],d:'facil'},
{n:45,q:'(3a-2b+c)+(6a+4b-5c)',o:['9a+2b-4c','-9a+2b-4c','9a-2b-4c','7a+3b+4c','-6a+5b+3c'],d:'facil'},
{n:46,q:'(-8a)-(-3a)',o:['-11a','11a','5a','24a','-5a'],d:'facil'},
{n:47,q:'(8a+6b-2)-(3a-2b+5)',o:['5a+8b-7','-5a+8b-7','5a+8a+7','6a+9b-8','3a-3b+9'],d:'facil'},
{n:48,q:'(4x-3y+10)-(2x-3y-6)',o:['2x-16','2x+16','-2x+16','-2x+16','4x-16'],d:'facil'},
{n:49,q:'(2ab^2)(3a^4bc^2)',o:['6a^5b^2c','6a^5b^3d','6abc','6a^5b^3d','6a^5b^3c^2'],d:'media'},
{n:50,q:'(5a^2b)^3',o:['-125a^6b^3','125a^6b^3','125ab','125a^5b^3','-125a^5a^3'],d:'media'},
];

(async()=>{
  let ins=0,skp=0;
  for(const ex of exercises){
    const ans=ansKey[ex.n], idx=LTR[ans];
    const src=ARCHIVO+' | p.gral | ej '+ex.n;
    const exist=await p.query('SELECT id FROM exercises WHERE source=$1',[src]);
    if(exist.rows.length>0){skp++;continue;}
    await p.query("INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,archivo_origen,imagen,nivel)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [topics[ex.n],ex.q,'',JSON.stringify(ex.o),JSON.stringify([{math:'',expl:'Respuesta: '+ex.o[idx]}]),null,ex.d,'tec_paa',2020,src,ARCHIVO,null,niveles[ex.n]]);
    ins++;
  }
  console.log('Inserted:',ins,', Skipped (exist):',skp);
  const r=await p.query('SELECT COUNT(1)c FROM exercises');
  console.log('Total DB:',r.rows[0].c);
  await p.end();
})();
