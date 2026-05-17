process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const{Pool}=require('pg');
const p=new Pool({connectionString:process.env.DATABASE_URL||'postgresql://neondb_owner:npg_x5NnjheXrb4H@ep-broad-wildflower-aq3he37e-pooler.c-8.us-east.1.aws.neon.tech/mathmaty?sslmode=require',ssl:{rejectUnauthorized:false}});
const S='gen-prog-v6';const A='generacion-programatica';const N='10-11';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rnd(0,a.length-1)];}
function mkOpts(c,a){let all=shuffle([c,...a]);return{o:all,ci:all.indexOf(c)};}

const probs=[
  // === CALCULO (40) ===
  {t:'calculo',q:'lim_(x→1) (x^2-1)/(x-1)',tx:'Limite (x^2-1)/(x-1) en x=1',c:'2',o:['0','1','∞']},
  {t:'calculo',q:'lim_(x→0) (sen x)/x',tx:'Limite (sen x)/x en x=0',c:'1',o:['0','π','∞']},
  {t:'calculo',q:'d/dx (x^5 - 3x^2 + 7)',tx:'Derivada x^5-3x^2+7',c:'5x^4 - 6x',o:['5x^4 - 3x','5x^4 - 6x^2','x^5-3x^2']},
  {t:'calculo',q:'d/dx (sen x)',tx:'Derivada sen x',c:'cos x',o:['-cos x','sen x','-sen x']},
  {t:'calculo',q:'d/dx (cos x)',tx:'Derivada cos x',c:'-sen x',o:['sen x','-cos x','cos x']},
  {t:'calculo',q:'d/dx (e^(2x))',tx:'Derivada e^(2x)',c:'2e^(2x)',o:['e^(2x)','2e^x','e^(2x)/2']},
  {t:'calculo',q:'d/dx (ln(3x))',tx:'Derivada ln(3x)',c:'1/x',o:['1/(3x)','3/x','ln 3']},
  {t:'calculo',q:'∫ (2x) dx',tx:'Integral 2x dx',c:'x^2 + C',o:['2x^2 + C','x^2','x + C']},
  {t:'calculo',q:'∫ (3x^2 + 2x) dx',tx:'Integral 3x^2+2x dx',c:'x^3 + x^2 + C',o:['3x^3+2x^2+C','x^3+x^2','6x+2+C']},
  {t:'calculo',q:'∫_0^1 x^2 dx',tx:'Integral definida 0..1 de x^2',c:'1/3',o:['1','1/2','2/3']},
  {t:'calculo',q:'∫_1^2 (1/x) dx',tx:'Integral definida 1..2 de 1/x',c:'ln 2',o:['ln 1','2 ln 2','ln(1/2)']},
  {t:'calculo',q:'d/dx (x sen x)',tx:'Derivada x sen x (producto)',c:'sen x + x cos x',o:['cos x','x cos x','sen x cos x']},
  {t:'calculo',q:'d/dx (tan x)',tx:'Derivada tan x',c:'sec^2 x',o:['csc^2 x','cot x','sec x tan x']},
  {t:'calculo',q:'lim_(x→∞) 1/x',tx:'Limite 1/x cuando x→∞',c:'0',o:['1','∞','-∞']},
  {t:'calculo',q:'lim_(x→2) (x^2-4)/(x-2)',tx:'Limite (x^2-4)/(x-2) en x=2',c:'4',o:['2','0','∞']},
  {t:'calculo',q:'∫ e^x dx',tx:'Integral e^x dx',c:'e^x + C',o:['e^x','ln x + C','xe^x + C']},
  {t:'calculo',q:'∫ 1/x dx',tx:'Integral 1/x dx',c:'ln|x| + C',o:['1/x^2 + C','x + C','e^x + C']},
  {t:'calculo',q:'d/dx (x^2 e^x)',tx:'Derivada x^2 e^x',c:'2x e^x + x^2 e^x',o:['2x e^x','x^2 e^x','x e^x']},
  {t:'calculo',q:'La derivada de una constante es:',tx:'Derivada constante',c:'0',o:['1','La constante misma','∞']},
  {t:'calculo',q:'∫_0^π sen x dx',tx:'Integral definida 0..pi de sen x',c:'2',o:['0','1','π']},
  {t:'calculo',q:'d/dx (arcsen x)',tx:'Derivada arcoseno',c:'1/√(1-x^2)',o:['1/(1+x^2)','1/√(x^2-1)','-1/√(1-x^2)']},
  {t:'calculo',q:'d/dx (arctan x)',tx:'Derivada arcotangente',c:'1/(1+x^2)',o:['1/(1-x^2)','1/√(1-x^2)','-1/(1+x^2)']},
  {t:'calculo',q:'∫ sec^2 x dx',tx:'Integral sec^2 x',c:'tan x + C',o:['sec x + C','cot x + C','csc x + C']},
  {t:'calculo',q:'∫_1^e 1/x dx',tx:'Integral definida 1..e de 1/x',c:'1',o:['e','ln e','0']},
  {t:'calculo',q:'La pendiente de la recta tangente a f(x)=x^2 en x=3 es:',tx:'Pendiente tangente x^2 en x=3',c:'6',o:['3','9','12']},
  {t:'calculo',q:'f(x)=x^3-3x tiene un punto crtico en x=1 porque:',tx:'Punto critico x^3-3x',c:'f(1)=0',o:['f(1)=3','f(1)=-2','f(1)=1']},
  {t:'calculo',q:'∫ 6x^5 dx',tx:'Integral 6x^5',c:'x^6 + C',o:['6x^6 + C','x^5 + C','30x^4 + C']},
  {t:'calculo',q:'d/dx (√x)',tx:'Derivada raiz cuadrada de x',c:'1/(2√x)',o:['1/√x','1/(2x)','√x/2']},
  {t:'calculo',q:'∫_0^1 2x dx',tx:'Integral definida 0..1 de 2x',c:'1',o:['0','2','1/2']},
  {t:'calculo',q:'La derivada de f(g(x)) por regla de la cadena es:',tx:'Regla cadena',c:'f(g(x))·g(x)',o:['f(x)·g(x)','f(g(x))','f(g)·g(f)']},
  {t:'calculo',q:'d/dx (ln(cos x))',tx:'Derivada ln(cos x)',c:'-tan x',o:['tan x','-cot x','cot x']},
  {t:'calculo',q:'∫ x e^(x^2) dx',tx:'Integral x e^(x^2) dx (sustitucion)',c:'(1/2)e^(x^2) + C',o:['e^(x^2)+C','x^2 e^(x^2)+C','e^(x^2)/x+C']},
  {t:'calculo',q:'lim_(x→0) (1-cos x)/x',tx:'Limite (1-cos x)/x en x=0',c:'0',o:['1','-1','1/2']},
  {t:'calculo',q:'∫ 2 cos x dx',tx:'Integral 2 cos x dx',c:'2 sen x + C',o:['-2 sen x + C','cos 2x + C','sen 2x + C']},
  {t:'calculo',q:'d/dx (cot x)',tx:'Derivada cot x',c:'-csc^2 x',o:['csc^2 x','sec^2 x','-sec^2 x']},

  // === TRIGONOMETRIA (40) ===
  {t:'trigonometria',q:'sen(90°) vale:',tx:'sen 90 grados',c:'1',o:['0','-1','√2/2']},
  {t:'trigonometria',q:'cos(0°) vale:',tx:'cos 0 grados',c:'1',o:['0','-1','1/2']},
  {t:'trigonometria',q:'tan(45°) vale:',tx:'tan 45 grados',c:'1',o:['0','√3','∞']},
  {t:'trigonometria',q:'sen(180°) vale:',tx:'sen 180 grados',c:'0',o:['1','-1','√3/2']},
  {t:'trigonometria',q:'cos(180°) vale:',tx:'cos 180 grados',c:'-1',o:['0','1','√2/2']},
  {t:'trigonometria',q:'sen(60°) vale:',tx:'sen 60 grados',c:'√3/2',o:['1/2','√2/2','1']},
  {t:'trigonometria',q:'cos(60°) vale:',tx:'cos 60 grados',c:'1/2',o:['√3/2','√2/2','0']},
  {t:'trigonometria',q:'tan(30°) vale:',tx:'tan 30 grados',c:'√3/3',o:['√3','1','0']},
  {t:'trigonometria',q:'En un triangulo rectangulo, sen θ = cateto opuesto /',tx:'Definicion seno',c:'hipotenusa',o:['cateto adyacente','adyacente/opuesto','tangente']},
  {t:'trigonometria',q:'En un triangulo rectangulo, cos θ =',tx:'Definicion coseno',c:'cateto adyacente / hipotenusa',o:['cateto opuesto / hipotenusa','cateto opuesto / adyacente','hipotenusa / adyacente']},
  {t:'trigonometria',q:'sen²θ + cos²θ =',tx:'Identidad pitagorica',c:'1',o:['0','-1','senθ+cosθ']},
  {t:'trigonometria',q:'1 + tan²θ =',tx:'Identidad tan',c:'sec²θ',o:['csc²θ','cot²θ','cos²θ']},
  {t:'trigonometria',q:'sen(2θ) =',tx:'Seno angulo doble',c:'2 senθ cosθ',o:['sen²θ-cos²θ','2 cos²θ-1','1-2 sen²θ']},
  {t:'trigonometria',q:'cos(2θ) =',tx:'Coseno angulo doble (version 1)',c:'cos²θ - sen²θ',o:['2 senθ cosθ','sen²θ-cos²θ','1-2 cos²θ']},
  {t:'trigonometria',q:'La amplitud de f(x)=3 sen x es:',tx:'Amplitud 3 sen x',c:'3',o:['1','π','2π']},
  {t:'trigonometria',q:'El periodo de f(x)=sen(2x) es:',tx:'Periodo sen(2x)',c:'π',o:['2π','π/2','4π']},
  {t:'trigonometria',q:'sen(π/6) vale:',tx:'sen pi/6',c:'1/2',o:['√3/2','√2/2','0']},
  {t:'trigonometria',q:'cos(π/4) vale:',tx:'cos pi/4',c:'√2/2',o:['1/2','√3/2','1']},
  {t:'trigonometria',q:'tan(π/6) vale:',tx:'tan pi/6',c:'√3/3',o:['√3','1','0']},
  {t:'trigonometria',q:'Ley de senos: a/sen A =',tx:'Ley senos',c:'b/sen B = c/sen C',o:['b/cos B','2R (circunradio)','a·b/sen C']},
  {t:'trigonometria',q:'sen(θ) · csc(θ) =',tx:'sen * csc',c:'1',o:['0','sen²θ','csc²θ']},
  {t:'trigonometria',q:'cos(θ) · sec(θ) =',tx:'cos * sec',c:'1',o:['0','cos²θ','sec²θ']},
  {t:'trigonometria',q:'tan(θ) = senθ /',tx:'tan = sen/',c:'cosθ',o:['cotθ','secθ','cscθ']},
  {t:'trigonometria',q:'cot(θ) = cosθ /',tx:'cot = cos/',c:'senθ',o:['tanθ','secθ','cscθ']},
  {t:'trigonometria',q:'sen(π/2 - θ) =',tx:'Cofuncion sen(π/2-θ)',c:'cos θ',o:['sen θ','-cos θ','-sen θ']},
  {t:'trigonometria',q:'cos(π/2 - θ) =',tx:'Cofuncion cos(π/2-θ)',c:'sen θ',o:['cos θ','-sen θ','-cos θ']},
  {t:'trigonometria',q:'tan(π - θ) =',tx:'Tangente π-θ',c:'-tan θ',o:['tan θ','cot θ','-cot θ']},
  {t:'trigonometria',q:'sen(π + θ) =',tx:'Seno π+θ',c:'-sen θ',o:['sen θ','cos θ','-cos θ']},
  {t:'trigonometria',q:'El rango de f(x)=sen x es:',tx:'Rango seno',c:'[-1, 1]',o:['[0, 1]','[-∞, ∞]','(-1, 1)']},
  {t:'trigonometria',q:'√(1 - cos²θ) =',tx:'sqrt(1-cos²θ)',c:'|sen θ|',o:['sen θ','cos θ','tan θ']},

  // === FRACCIONES-ALGEBRAICAS (20) ===
  {t:'fracciones-alg',q:'(2x+4)/(x+2) simplificado:',tx:'Simplificar (2x+4)/(x+2)',c:'2',o:['x+2','x+4','2x']},
  {t:'fracciones-alg',q:'(3x-9)/(x-3) simplificado:',tx:'Simplificar (3x-9)/(x-3)',c:'3',o:['x-3','3x','x-9']},
  {t:'fracciones-alg',q:'(x^2+3x+2)/(x+1) simplificado:',tx:'Simplificar (x^2+3x+2)/(x+1)',c:'x+2',o:['x+1','x+3','x-2']},
  {t:'fracciones-alg',q:'(x^2-5x+6)/(x-2) simplificado:',tx:'Simplificar (x^2-5x+6)/(x-2)',c:'x-3',o:['x-2','x+3','x-6']},
  {t:'fracciones-alg',q:'(x^2-2x-3)/(x+1) simplificado:',tx:'Simplificar (x^2-2x-3)/(x+1)',c:'x-3',o:['x+3','x-1','x+1']},
  {t:'fracciones-alg',q:'(x^3-x)/(x-1) simplificado:',tx:'Simplificar (x^3-x)/(x-1)',c:'x(x+1)',o:['x^2-1','x^2+1','x^2-x']},
  {t:'fracciones-alg',q:'x/3 + x/4 =',tx:'Suma x/3+x/4',c:'7x/12',o:['2x/7','x/7','12x/7']},
  {t:'fracciones-alg',q:'x/5 - x/3 =',tx:'Resta x/5-x/3',c:'-2x/15',o:['2x/15','-x/15','x/15']},
  {t:'fracciones-alg',q:'(x+1)/2 + (x-1)/3 =',tx:'Suma (x+1)/2+(x-1)/3',c:'(5x+1)/6',o:['(5x-1)/6','(2x+1)/5','(3x+1)/6']},
  {t:'fracciones-alg',q:'(2/x) / (4/x^2) =',tx:'Division (2/x)/(4/x^2)',c:'x/2',o:['2x','8/x^3','x^2/2']},
  {t:'fracciones-alg',q:'(x^2-1)/(x-1) * (x+1)/(x^2+2x+1) =',tx:'Producto y simplificacion',c:'1',o:['x+1','1/(x+1)','x-1']},
  {t:'fracciones-alg',q:'(3x/4) * (8/x^2) =',tx:'Producto (3x/4)*(8/x^2)',c:'6/x',o:['24x/x^2','3/4','8x']},
  {t:'fracciones-alg',q:'(x^2-9)/(x+3) / (x-3) =',tx:'Division (x^2-9)/(x+3)/(x-3)',c:'1',o:['x+3','x-3','x^2-9']},
  {t:'fracciones-alg',q:'(x+2)/(x^2-4) simplificado:',tx:'Simplificar (x+2)/(x^2-4)',c:'1/(x-2)',o:['1/(x+2)','x-2','x+2']},
  {t:'fracciones-alg',q:'(a^2-b^2)/(a-b) =',tx:'Simplificar (a^2-b^2)/(a-b)',c:'a+b',o:['a-b','(a+b)/(a-b)','a^2+b^2']},
  {t:'fracciones-alg',q:'(x^2+4x+4)/(x+2) =',tx:'Simplificar (x^2+4x+4)/(x+2)',c:'x+2',o:['x-2','x+4','x^2+2']},

  // === TEC-LOGICA (30) ===
  {t:'tec-logica',q:'p → q es equivalente a:',tx:'Equivalencia condicional',c:'¬p ∨ q',o:['p ∨ ¬q','¬p ∧ q','p ∧ ¬q']},
  {t:'tec-logica',q:'La negacion de p ∨ q es:',tx:'Negacion disyuncion',c:'¬p ∧ ¬q',o:['¬p ∨ ¬q','¬(p ∧ q)','p ∧ q']},
  {t:'tec-logica',q:'La negacion de p ∧ q es:',tx:'Negacion conjuncion',c:'¬p ∨ ¬q',o:['¬p ∧ ¬q','¬(p ∨ q)','p ∨ q']},
  {t:'tec-logica',q:'Si p→q y q→r, entonces:',tx:'Silogismo hipotetico',c:'p→r',o:['r→p','p→q→r','q→p']},
  {t:'tec-logica',q:'p ↔ q es verdadero cuando:',tx:'Bicondicional verdad',c:'p y q tienen el mismo valor',o:['p es verdadero','q es verdadero','p y q son falsos']},
  {t:'tec-logica',q:'En probabilidad, P(A∪B) =',tx:'Probabilidad union',c:'P(A)+P(B)-P(A∩B)',o:['P(A)+P(B)','P(A)+P(B)+P(A∩B)','P(A)P(B)']},
  {t:'tec-logica',q:'Si A y B son independientes, P(A∩B) =',tx:'Probabilidad independientes',c:'P(A)·P(B)',o:['P(A)+P(B)','P(A|B)','P(A)']},
  {t:'tec-logica',q:'Cuantos numeros de 2 cifras pueden formarse con {1,2,3,4} si se pueden repetir?',c:'16',o:['12','8','4']},
  {t:'tec-logica',q:'De 10 estudiantes, cuantos grupos de 4 se pueden formar?',c:'210',o:['40','5040','10000']},
  {t:'tec-logica',q:'5! (5 factorial) es:',c:'120',o:['25','60','24']},
  {t:'tec-logica',q:'Cuantas diagonales tiene un pentagono?',c:'5',o:['3','8','10']},
  {t:'tec-logica',q:'Cuantas diagonales tiene un hexagono?',c:'9',o:['6','12','15']},
  {t:'tec-logica',q:'En una caja hay 3 rojas, 2 azules, 5 verdes. P(roja)=',c:'3/10',o:['1/3','2/5','5/10']},
  {t:'tec-logica',q:'De {1,2,3,4,5}, P(par)=',c:'2/5',o:['1/2','3/5','1/5']},
  {t:'tec-logica',q:'La media de {2,4,6,8,10} es:',c:'6',o:['5','7','30']},
  {t:'tec-logica',q:'La mediana de {1,3,5,7,9} es:',c:'5',o:['3','7','25']},
  {t:'tec-logica',q:'La moda de {1,1,2,3,3,3,4} es:',c:'3',o:['1','2','4']},
  {t:'tec-logica',q:'El rango de {5,12,8,20,3} es:',c:'17',o:['12','20','15']},
  {t:'tec-logica',q:'Verdadero o falso: p ∧ V = p, donde V es verdadero',c:'Verdadero',o:['Falso','Depende de p','No se puede']},
  {t:'tec-logica',q:'p ∨ F = p, donde F es falso',c:'Verdadero',o:['Falso','Siempre falso','Siempre verdadero']},

  // === ECUACIONES extra (15) ===
  {t:'ecuaciones',q:'|2x-5| = 9',tx:'Ecuacion valor absoluto 2x-5=9',c:'x=7 o x=-2',o:['x=7 o x=2','x=7','x=-2']},
  {t:'ecuaciones',q:'|x+3| = 7',tx:'Ecuacion valor absoluto x+3=7',c:'x=4 o x=-10',o:['x=4 o x=10','x=-4 o x=10','x=4']},
  {t:'ecuaciones',q:'√(2x+1) = 3',tx:'Ecuacion radical',c:'4',o:['2','8','10']},
  {t:'ecuaciones',q:'2^(x) = 16',tx:'Ecuacion exponencial 2^x=16',c:'x=4',o:['x=2','x=8','x=16']},
  {t:'ecuaciones',q:'log_2(x) = 5',tx:'Ecuacion logaritmica log2(x)=5',c:'x=32',o:['x=10','x=25','x=5']},
  {t:'ecuaciones',q:'x^2 + 6x + 9 = 0',tx:'Ecuacion cuadratica',c:'x=-3 (doble)',o:['x=3','x=3 o x=-3','x=9']},
  {t:'ecuaciones',q:'x^2 + 4x + 4 = 0',tx:'Ecuacion cuadratica',c:'x=-2 (doble)',o:['x=2','x=-2 o x=2','x=4']},
  {t:'ecuaciones',q:'x^2 + 2x - 15 = 0',tx:'Ecuacion cuadratica',c:'x=3 o x=-5',o:['x=-3 o x=5','x=3 o x=5','x=-3 o x=-5']},
  {t:'ecuaciones',q:'3x + 7 = 2x - 1',tx:'Ecuacion lineal',c:'x=-8',o:['x=8','x=6','x=-6']},
  {t:'ecuaciones',q:'5x - 3 = 2x + 9',tx:'Ecuacion lineal',c:'x=4',o:['x=3','x=5','x=2']},

  // === TEC-MATEMATICA extra (20) ===
  {t:'tec-matematica',q:'La pendiente de la recta 2x+3y=6 es:',tx:'Pendiente 2x+3y=6',c:'-2/3',o:['2/3','-3/2','3/2']},
  {t:'tec-matematica',q:'El intersecto x de y=2x-8 es:',tx:'Intersecto x y=2x-8',c:'x=4',o:['x=-4','x=2','x=8']},
  {t:'tec-matematica',q:'f(x)=x^2-4. Sus ceros son:',tx:'Ceros x^2-4',c:'x=2 y x=-2',o:['x=2','x=-2','x=4 y x=-4']},
  {t:'tec-matematica',q:'El vertice de f(x)=x^2-6x+8 es:',tx:'Vertice parabola',c:'(3,-1)',o:['(3,1)','(-3,-1)','(3,8)']},
  {t:'tec-matematica',q:'f(x)=2(x-3)^2+1. Su vertice es:',tx:'Vertice forma canonica',c:'(3,1)',o:['(-3,1)','(3,-1)','(-3,-1)']},
  {t:'tec-matematica',q:'Si f(x)=|-x^2+4|, f(0) es:',tx:'Valor absoluto f(0)',c:'4',o:['0','-4','2']},
  {t:'tec-matematica',q:'El dominio de f(x)=√(x-2) es:',tx:'Dominio raiz cuadrada',c:'x ≥ 2',o:['x > 2','x ≤ 2','x ≠ 2']},
  {t:'tec-matematica',q:'El dominio de f(x)=1/(x^2-4) es:',tx:'Dominio funcion racional',c:'x ≠ 2 y x ≠ -2',o:['x ≠ 2','x > 2','x < -2']},
  {t:'tec-matematica',q:'La composicion f∘g significa:',tx:'Composicion funciones',c:'f(g(x))',o:['g(f(x))','f(x)·g(x)','f(x)+g(x)']},
  {t:'tec-matematica',q:'Si f(x)=x^2 y g(x)=2x, f(g(3)) es:',tx:'Composicion f(g(3))',c:'36',o:['18','12','6']},
  {t:'tec-matematica',q:'La funcion inversa de f(x)=2x+3 es:',tx:'Inversa 2x+3',c:'f^(-1)(x)=(x-3)/2',o:['f^(-1)(x)=(x+3)/2','f^(-1)(x)=2x-3','f^(-1)(x)=x/2-3']},
  {t:'tec-matematica',q:'Para que dos rectas sean paralelas, sus pendientes deben ser:',tx:'Rectas paralelas',c:'Iguales',o:['Opuestas','Reciprocas','Diferentes']},
  {t:'tec-matematica',q:'Para que dos rectas sean perpendiculares, m1·m2 =',tx:'Rectas perpendiculares',c:'-1',o:['1','0','∞']},
  {t:'tec-matematica',q:'Distancia entre (1,2) y (4,6) es:',tx:'Distancia puntos',c:'5',o:['4','3','7']},
  {t:'tec-matematica',q:'Punto medio de (2,4) y (6,8) es:',tx:'Punto medio',c:'(4,6)',o:['(3,5)','(4,4)','(2,4)']},
  {t:'tec-matematica',q:'Si f(x)=x^2, f(a+h) - f(a) =',tx:'Diferencia f(a+h)-f(a)',c:'2ah + h^2',o:['h^2','2ah','(a+h)^2-a^2']},
  {t:'tec-matematica',q:'La tasa de cambio promedio de f(x)=x^2 en [1,3] es:',tx:'Tasa cambio promedio',c:'4',o:['2','6','8']},
  {t:'tec-matematica',q:'f(x)=-x^2+5. Su maximo valor es:',tx:'Maximo parabola',c:'5',o:['0','25','-∞']},

  // === EXP-LOG extra (15) ===
  {t:'exp-log',q:'a^m · a^n =',tx:'Producto potencias misma base',c:'a^(m+n)',o:['a^(mn)','a^(m-n)','a^(m/n)']},
  {t:'exp-log',q:'(a^m)^n =',tx:'Potencia de potencia',c:'a^(mn)',o:['a^(m+n)','a^(m-n)','a^m + a^n']},
  {t:'exp-log',q:'a^0 =',tx:'Potencia cero',c:'1 (a≠0)',o:['0','a','∞']},
  {t:'exp-log',q:'a^(-n) =',tx:'Potencia negativa',c:'1/a^n',o:['-a^n','1/a^(-n)','a^(1/n)']},
  {t:'exp-log',q:'log(AB) =',tx:'Logaritmo producto',c:'log A + log B',o:['log A · log B','log(A+B)','A log B']},
  {t:'exp-log',q:'log(A/B) =',tx:'Logaritmo cociente',c:'log A - log B',o:['log A / log B','log(A-B)','log A + log B']},
  {t:'exp-log',q:'log(A^n) =',tx:'Logaritmo potencia',c:'n log A',o:['(log A)^n','n + log A','log n + log A']},
  {t:'exp-log',q:'log_a(a) =',tx:'Log base a de a',c:'1',o:['0','a','ln a']},
  {t:'exp-log',q:'log_a(1) =',tx:'Log base a de 1',c:'0',o:['1','a','-∞']},
  {t:'exp-log',q:'ln(e) =',tx:'Ln de e',c:'1',o:['0','e','ln e']},
  {t:'exp-log',q:'ln(1) =',tx:'Ln de 1',c:'0',o:['1','e','-∞']},
  {t:'exp-log',q:'3^2 · 3^4 =',tx:'3^2 * 3^4',c:'3^6',o:['3^8','9^6','3^2']},
  {t:'exp-log',q:'(2^3)^2 =',tx:'(2^3)^2',c:'2^6',o:['2^5','2^9','2^1']},
  {t:'exp-log',q:'5^3 / 5^2 =',tx:'5^3/5^2',c:'5',o:['5^5','5^1','25']},

  // === FACTORIZACION extra (15) ===
  {t:'factorizacion',q:'x^2 + 7x + 12 factorizado:',tx:'Factorizar x^2+7x+12',c:'(x+3)(x+4)',o:['(x+2)(x+6)','(x+1)(x+12)','(x+3)(x-4)']},
  {t:'factorizacion',q:'x^2 - 7x + 12 factorizado:',tx:'Factorizar x^2-7x+12',c:'(x-3)(x-4)',o:['(x+3)(x+4)','(x-2)(x-6)','(x-1)(x-12)']},
  {t:'factorizacion',q:'x^2 - 2x - 15 factorizado:',tx:'Factorizar x^2-2x-15',c:'(x-5)(x+3)',o:['(x+5)(x-3)','(x-5)(x-3)','(x+5)(x+3)']},
  {t:'factorizacion',q:'x^2 + 2x - 15 factorizado:',tx:'Factorizar x^2+2x-15',c:'(x+5)(x-3)',o:['(x-5)(x+3)','(x+5)(x+3)','(x-5)(x-3)']},
  {t:'factorizacion',q:'x^2 - 2x - 8 factorizado:',tx:'Factorizar x^2-2x-8',c:'(x-4)(x+2)',o:['(x+4)(x-2)','(x-4)(x-2)','(x+4)(x+2)']},
  {t:'factorizacion',q:'3x^2 + 11x + 6 factorizado:',tx:'Factorizar 3x^2+11x+6',c:'(3x+2)(x+3)',o:['(3x+3)(x+2)','(3x+1)(x+6)','(3x+6)(x+1)']},
  {t:'factorizacion',q:'2x^2 + 7x + 3 factorizado:',tx:'Factorizar 2x^2+7x+3',c:'(2x+1)(x+3)',o:['(2x+3)(x+1)','(2x+2)(x+3)','(x+1)(2x+3)']},
  {t:'factorizacion',q:'8x^3 + 27 factorizado (cubos):',tx:'Suma de cubos 8x^3+27',c:'(2x+3)(4x^2-6x+9)',o:['(2x-3)(4x^2+6x+9)','(2x+3)^3','(2x+3)(4x^2+6x+9)']},
  {t:'factorizacion',q:'x^3 - 64 factorizado (cubos):',tx:'Diferencia cubos x^3-64',c:'(x-4)(x^2+4x+16)',o:['(x+4)(x^2-4x+16)','(x-4)^3','(x-4)(x^2-4x+16)']},
  {t:'factorizacion',q:'x^3 + 125 factorizado:',tx:'Suma cubos x^3+125',c:'(x+5)(x^2-5x+25)',o:['(x-5)(x^2+5x+25)','(x+5)^3','(x+5)(x^2+5x+25)']},
  {t:'factorizacion',q:'x^3 - 27 factorizado:',tx:'Diferencia cubos x^3-27',c:'(x-3)(x^2+3x+9)',o:['(x+3)(x^2-3x+9)','(x-3)^3','(x-3)(x^2-3x+9)']},
  {t:'factorizacion',q:'x^2 - 2x + 1 factorizado:',tx:'Factorizar x^2-2x+1',c:'(x-1)^2',o:['(x+1)^2','(x-1)(x+1)','(x-2)^2']},
  {t:'factorizacion',q:'x^2 + 6x + 9 factorizado:',tx:'Factorizar x^2+6x+9',c:'(x+3)^2',o:['(x-3)^2','(x+3)(x-3)','(x+6)^2']},
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
