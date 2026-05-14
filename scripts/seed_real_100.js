const { Pool } = require('pg');
const pool = new Pool({ user:'postgres', host:'localhost', database:'mathmaty', password:'Calg.1984', port:5432 });

const EX = [
// FACTORIZACION (25)
{t:'factorizacion', q:'Factorice: x² - 16', l:'x^2 - 16', o:['(x+4)(x-4)','(x+2)(x-8)','(x-4)²','x(x-16)'], s:[{math:'a^2-b^2=(a+b)(a-b)',expl:'Diferencia de cuadrados: a=x, b=4'},{math:'(x+4)(x-4)',expl:'Resultado final'}], th:'Diferencia de cuadrados: a²-b²=(a+b)(a-b)'},
{t:'factorizacion', q:'Factorice: x² + 6x + 9', l:'x^2+6x+9', o:['(x+3)²','(x+9)(x+1)','(x+6)(x+3)','(x-3)²'], s:[{math:'x^2+2(3)x+3^2',expl:'Cuadrado perfecto: a=x, b=3'},{math:'(x+3)^2',expl:'Aplicar fórmula (a+b)²'}], th:'Trinomio cuadrado perfecto: a²+2ab+b²=(a+b)²'},
{t:'factorizacion', q:'Factorice completamente: 2x² - 8', l:'2x^2-8', o:['2(x+2)(x-2)','2(x-2)²','(2x+4)(x-2)','2(x²-4)'], s:[{math:'2(x^2-4)',expl:'Factor común 2'},{math:'2(x+2)(x-2)',expl:'Diferencia de cuadrados'}], th:'Primero factor común, luego diferencia de cuadrados'},
{t:'factorizacion', q:'Factorice: x² - 5x + 6', l:'x^2-5x+6', o:['(x-2)(x-3)','(x+2)(x+3)','(x-6)(x+1)','(x-1)(x-6)'], s:[{math:'\\text{Buscar: }a+b=-5, ab=6',expl:'Factores de 6 que sumen -5: -2 y -3'},{math:'(x-2)(x-3)',expl:'Resultado'}], th:'Para trinomio x²+bx+c buscar dos números que sumen b y multipliquen c'},
{t:'factorizacion', q:'Factorice: 3x² + 9x', l:'3x^2+9x', o:['3x(x+3)','3(x²+3x)','x(3x+9)','3x²(1+3)'], s:[{math:'3x(x+3)',expl:'Factor común: 3x'}], th:'Factor común: sacar el máximo factor común de todos los términos'},
{t:'factorizacion', q:'Factorice: 4x² - 12x + 9', l:'4x^2-12x+9', o:['(2x-3)²','(4x-9)(x-1)','(2x+3)²','(2x-3)(2x+3)'], s:[{math:'(2x)^2 - 2(2x)(3) + 3^2',expl:'Reconocer cuadrado perfecto a=2x, b=3'},{math:'(2x-3)^2',expl:'Resultado'}], th:'Trinomio cuadrado perfecto: a²-2ab+b²=(a-b)²'},
{t:'factorizacion', q:'Factorice: x³ - 8', l:'x^3-8', o:['(x-2)(x²+2x+4)','(x-2)³','(x-8)(x²+1)','(x-2)(x²-4)'], s:[{math:'a^3-b^3=(a-b)(a^2+ab+b^2)',expl:'Diferencia de cubos: a=x, b=2'},{math:'(x-2)(x^2+2x+4)',expl:'Resultado'}], th:'Diferencia de cubos: a³-b³=(a-b)(a²+ab+b²)'},
{t:'factorizacion', q:'Factorice: x² + 8x + 16', l:'x^2+8x+16', o:['(x+4)²','(x+2)(x+8)','(x+16)(x+1)','(x+4)(x-4)'], s:[{math:'(x+4)^2',expl:'Cuadrado perfecto con b=4'}], th:'Reconocer (a+b)²=a²+2ab+b²'},
{t:'factorizacion', q:'Factorice: 9x² - 25', l:'9x^2-25', o:['(3x+5)(3x-5)','(9x+5)(x-5)','(3x-5)²','3(3x²-25)'], s:[{math:'(3x)^2 - 5^2',expl:'Diferencia de cuadrados: a=3x, b=5'},{math:'(3x+5)(3x-5)',expl:'Resultado'}], th:'Diferencia de cuadrados'},
{t:'factorizacion', q:'Factorice: 6x² + 7x + 2', l:'6x^2+7x+2', o:['(2x+1)(3x+2)','(6x+1)(x+2)','(2x+2)(3x+1)','(3x-1)(2x-2)'], s:[{math:'ac=12, b=7: \\text{ buscar }3\\cdot4',expl:'Método ac: 3+4=7, 3·4=12'},{math:'6x^2+3x+4x+2 = 3x(2x+1)+2(2x+1)',expl:'Agrupar'},{math:'(3x+2)(2x+1)',expl:'Factor común (2x+1)'}], th:'Factorización por agrupación (método ac)'},
{t:'factorizacion', q:'Factorice: x⁴ - 1', l:'x^4-1', o:['(x²+1)(x+1)(x-1)','(x²-1)²','(x²+1)²','(x-1)(x+1)(x²-1)'], s:[{math:'(x^2+1)(x^2-1)',expl:'Diferencia de cuadrados'},{math:'(x^2+1)(x+1)(x-1)',expl:'Factorizar x²-1 de nuevo'}], th:'Aplicar diferencia de cuadrados en cascada'},
{t:'factorizacion', q:'Factorice: 2x³ + 6x² - 8x', l:'2x^3+6x^2-8x', o:['2x(x+4)(x-1)','2x(x-4)(x+1)','2(x³+3x²-4x)','x(2x²+6x-8)'], s:[{math:'2x(x^2+3x-4)',expl:'Factor común 2x'},{math:'2x(x+4)(x-1)',expl:'Factorizar trinomio: buscar 4 y -1'}], th:'Siempre extraer el factor común antes de otros métodos'},
{t:'factorizacion', q:'Factorice: 8x³ + 27', l:'8x^3+27', o:['(2x+3)(4x²-6x+9)','(2x+3)³','(2x-3)(4x²+6x+9)','(8x+27)(x-1)'], s:[{math:'(2x)^3+3^3',expl:'Suma de cubos: a=2x, b=3'},{math:'(2x+3)(4x^2-6x+9)',expl:'a³+b³=(a+b)(a²-ab+b²)'}], th:'Suma de cubos: a³+b³=(a+b)(a²-ab+b²)'},
{t:'factorizacion', q:'Simplifique: (x²-4)/(x+2)', l:'\\frac{x^2-4}{x+2}', o:['x-2','x+2','x²-2','(x-2)(x+2)'], s:[{math:'\\frac{(x+2)(x-2)}{x+2}',expl:'Factorizar numerador'},{math:'x-2',expl:'Cancelar (x+2), con x≠-2'}], th:'Simplificación de fracciones algebraicas'},
{t:'factorizacion', q:'Factorice: ax + ay - bx - by', l:'ax+ay-bx-by', o:['(a-b)(x+y)','(a+b)(x-y)','a(x+y)-b(x+y)','(ax+ay)(bx+by)'], s:[{math:'a(x+y) - b(x+y)',expl:'Agrupar y sacar factor común'},{math:'(a-b)(x+y)',expl:'Factor común (x+y)'}], th:'Factorización por agrupación de términos'},
// ECUACIONES (20)
{t:'ecuaciones', q:'Resuelva: 2x + 3 = 11', l:'2x+3=11', o:['x=4','x=7','x=3','x=5'], s:[{math:'2x=8',expl:'Restar 3 a ambos lados'},{math:'x=4',expl:'Dividir por 2'}], th:'Propiedad de igualdad: lo que se hace a un lado se hace al otro'},
{t:'ecuaciones', q:'Resuelva: x/3 + 2 = 5', l:'\\frac{x}{3}+2=5', o:['x=9','x=3','x=21','x=1'], s:[{math:'x/3=3',expl:'Restar 2'},{math:'x=9',expl:'Multiplicar por 3'}], th:'Despejar la variable paso a paso'},
{t:'ecuaciones', q:'Resuelva: 3(x-2) = 9', l:'3(x-2)=9', o:['x=5','x=3','x=7','x=1'], s:[{math:'3x-6=9',expl:'Distributiva'},{math:'x=5',expl:'Suma 6, divide por 3'}], th:'Primero aplicar distributiva, luego despejar'},
{t:'ecuaciones', q:'Resuelva: x² = 25', l:'x^2=25', o:['x=±5','x=5','x=25','x=12.5'], s:[{math:'x=\\pm\\sqrt{25}',expl:'Raíz cuadrada de ambos lados'},{math:'x=5 \\text{ o } x=-5',expl:'Dos soluciones'}], th:'Ecuación cuadrática simple: recordar las dos soluciones'},
{t:'ecuaciones', q:'Resuelva: 2x² - 8 = 0', l:'2x^2-8=0', o:['x=±2','x=2','x=4','x=±4'], s:[{math:'x^2=4',expl:'Sumar 8, dividir por 2'},{math:'x=\\pm 2',expl:'Raíz cuadrada'}], th:'Aislar x² antes de aplicar raíz'},
{t:'ecuaciones', q:'Resuelva por fórmula cuadrática: x² - 5x + 6 = 0', l:'x^2-5x+6=0', o:['x=2 o x=3','x=1 o x=6','x=-2 o x=-3','x=5 o x=1'], s:[{math:'x=\\frac{5\\pm\\sqrt{25-24}}{2}',expl:'Fórmula: x=(-b±√(b²-4ac))/2a con a=1,b=-5,c=6'},{math:'x=3 \\text{ o } x=2',expl:'Soluciones'}], th:'Fórmula cuadrática: x=(-b±√(b²-4ac))/2a'},
{t:'ecuaciones', q:'Resuelva: |x - 3| = 5', l:'|x-3|=5', o:['x=8 o x=-2','x=8','x=2 o x=-8','x=-2'], s:[{math:'x-3=5 \\Rightarrow x=8',expl:'Caso positivo'},{math:'x-3=-5 \\Rightarrow x=-2',expl:'Caso negativo'}], th:'Valor absoluto genera dos ecuaciones'},
{t:'ecuaciones', q:'Resuelva: log(x) = 2', l:'\\log(x)=2', o:['x=100','x=20','x=10²','x=1000'], s:[{math:'x=10^2',expl:'Definición de logaritmo base 10'},{math:'x=100',expl:'Resultado'}], th:'log(x)=n significa x=10ⁿ'},
{t:'ecuaciones', q:'Resuelva: e^x = 7', l:'e^x=7', o:['x=ln(7)','x=log(7)','x=7/e','x=e^7'], s:[{math:'x=\\ln(7)',expl:'Aplicar ln a ambos lados'}], th:'Para despejar e^x aplicar logaritmo natural'},
{t:'ecuaciones', q:'Resuelva el sistema: x+y=5, x-y=1', l:'x+y=5, \\quad x-y=1', o:['x=3, y=2','x=4, y=1','x=2, y=3','x=5, y=0'], s:[{math:'2x=6 \\Rightarrow x=3',expl:'Sumar las ecuaciones'},{math:'y=5-3=2',expl:'Sustituir x=3'}], th:'Método de eliminación: sumar/restar ecuaciones para eliminar una variable'},
// INECUACIONES (15)
{t:'inecuaciones', q:'Resuelva: 2x - 3 > 5', l:'2x-3>5', o:['x>4','x<4','x>1','x>8'], s:[{math:'2x>8',expl:'Sumar 3'},{math:'x>4',expl:'Dividir por 2 (positivo, no cambia signo)'}], th:'Al dividir por negativo el signo de la inecuación se invierte'},
{t:'inecuaciones', q:'Resuelva: -3x ≤ 9', l:'-3x \\leq 9', o:['x≥-3','x≤-3','x≤3','x≥3'], s:[{math:'x \\geq -3',expl:'Dividir por -3: el signo ≤ se convierte en ≥'}], th:'Al dividir por un número negativo, el signo de desigualdad se invierte'},
{t:'inecuaciones', q:'Resuelva: x² < 9', l:'x^2<9', o:['-3<x<3','x>3','x<-3','x>-3'], s:[{math:'|x|<3',expl:'Raíz cuadrada de la inecuación'},{math:'-3<x<3',expl:'Solución intervalo'}], th:'x²<a² equivale a |x|<a, es decir -a<x<a'},
{t:'inecuaciones', q:'Resuelva: (x-1)(x+3) > 0', l:'(x-1)(x+3)>0', o:['x<-3 o x>1','x>1','−3<x<1','x<1'], s:[{math:'\\text{Puntos críticos: }x=1, x=-3',expl:'Igualar cada factor a cero'},{math:'x<-3 \\text{ o } x>1',expl:'Analizar signos del producto en cada intervalo'}], th:'Para inecuaciones con producto, analizar el signo en cada intervalo'},
{t:'inecuaciones', q:'Resuelva: |2x + 1| ≤ 5', l:'|2x+1|\\leq 5', o:['-3≤x≤2','x≤2','x≥-3','|x|≤2'], s:[{math:'-5 \\leq 2x+1 \\leq 5',expl:'Definición de valor absoluto'},{math:'-3 \\leq x \\leq 2',expl:'Restar 1 y dividir por 2'}], th:'|f(x)|≤a equivale a -a≤f(x)≤a'},
// EXPONENCIALES Y LOGARITMOS (15)
{t:'exp-log', q:'Simplifique: 2³ × 2⁴', l:'2^3 \\times 2^4', o:['2⁷','2¹²','4⁷','2⁷⁴'], s:[{math:'2^{3+4}=2^7',expl:'Propiedad: aᵐ×aⁿ=aᵐ⁺ⁿ'}], th:'Producto de potencias con igual base: sumar exponentes'},
{t:'exp-log', q:'Simplifique: (3²)³', l:'(3^2)^3', o:['3⁶','3⁵','9³','3²³'], s:[{math:'3^{2 \\times 3}=3^6',expl:'Potencia de potencia: multiplicar exponentes'}], th:'Potencia de potencia: (aᵐ)ⁿ=aᵐⁿ'},
{t:'exp-log', q:'Evalúe: log₂(32)', l:'\\log_2(32)', o:['5','4','6','16'], s:[{math:'2^x=32=2^5',expl:'Buscar x tal que 2^x=32'},{math:'x=5',expl:'Resultado'}], th:'Definición de logaritmo: log_b(x)=n ↔ bⁿ=x'},
{t:'exp-log', q:'Expanda: log(xy/z)', l:'\\log\\left(\\frac{xy}{z}\\right)', o:['log x+log y-log z','log x·log y/log z','log(x+y-z)','log x-log y+log z'], s:[{math:'\\log x + \\log y - \\log z',expl:'Propiedad producto y cociente'}], th:'log(xy)=log x+log y; log(x/y)=log x-log y'},
{t:'exp-log', q:'Resuelva: 2^(x+1) = 16', l:'2^{x+1}=16', o:['x=3','x=4','x=2','x=5'], s:[{math:'2^{x+1}=2^4',expl:'16=2⁴'},{math:'x+1=4 \\Rightarrow x=3',expl:'Igualar exponentes'}], th:'Cuando las bases son iguales, igualar los exponentes'},
{t:'exp-log', q:'Simplifique: log(100) + log(10)', l:'\\log(100)+\\log(10)', o:['3','4','10','2.1'], s:[{math:'2+1=3',expl:'log(100)=2, log(10)=1'}], th:'Logaritmos en base 10 de potencias de 10'},
// TRIGONOMETRÍA (15)
{t:'trigonometria', q:'¿Cuánto vale sen(30°)?', l:'\\sin(30°)', o:['1/2','√2/2','√3/2','1'], s:[{math:'\\sin(30°)=\\frac{1}{2}',expl:'Valor exacto: ángulo 30° en el triángulo especial 30-60-90'}], th:'Ángulos especiales: sen(30°)=1/2, cos(30°)=√3/2'},
{t:'trigonometria', q:'¿Cuánto vale cos(60°)?', l:'\\cos(60°)', o:['1/2','√3/2','√2/2','0'], s:[{math:'\\cos(60°)=\\frac{1}{2}',expl:'Ángulo especial 60°'}], th:'cos(60°)=1/2, comparte valor con sen(30°)'},
{t:'trigonometria', q:'Simplifique: sen²(x) + cos²(x)', l:'\\sin^2(x)+\\cos^2(x)', o:['1','0','2','sen(2x)'], s:[{math:'=1',expl:'Identidad pitagórica fundamental'}], th:'Identidad pitagórica: sen²(x)+cos²(x)=1 siempre'},
{t:'trigonometria', q:'Si sen(x)=3/5, ¿cuánto vale cos(x) en el primer cuadrante?', l:'\\sin(x)=\\frac{3}{5}', o:['4/5','5/3','3/4','2/5'], s:[{math:'\\cos^2(x)=1-9/25=16/25',expl:'Identidad pitagórica'},{math:'\\cos(x)=4/5',expl:'Raíz positiva (1er cuadrante)'}], th:'Usar identidad pitagórica para encontrar la función complementaria'},
{t:'trigonometria', q:'¿Cuánto vale tan(45°)?', l:'\\tan(45°)', o:['1','√2','√3/2','0'], s:[{math:'\\tan(45°)=\\frac{\\sin(45°)}{\\cos(45°)}=\\frac{\\sqrt{2}/2}{\\sqrt{2}/2}=1',expl:'Definición de tangente'}], th:'tan(x)=sen(x)/cos(x). Para 45°, sen=cos=√2/2'},
// CÁLCULO (15)
{t:'calculo', q:'Calcule: lim_{x→2} (x² - 4)/(x - 2)', l:'\\lim_{x \\to 2} \\frac{x^2-4}{x-2}', o:['4','0','2','indefinido'], s:[{math:'\\lim_{x\\to 2}\\frac{(x+2)(x-2)}{x-2}',expl:'Factorizar numerador'},{math:'\\lim_{x\\to 2}(x+2)=4',expl:'Cancelar (x-2) y evaluar'}], th:'Límite indeterminado 0/0: factorizar y cancelar'},
{t:'calculo', q:'Derive: f(x) = x³ + 2x', l:'f(x)=x^3+2x', o:["f'(x)=3x²+2","f'(x)=3x+2","f'(x)=x²+2","f'(x)=3x²"], s:[{math:"f'(x)=3x^2+2",expl:'Regla de la potencia: d/dx(xⁿ)=nxⁿ⁻¹'}], th:'Regla de la potencia y derivada de suma'},
{t:'calculo', q:'Derive: f(x) = sen(x)', l:'f(x)=\\sin(x)', o:["f'(x)=cos(x)","f'(x)=-cos(x)","f'(x)=-sen(x)","f'(x)=1"], s:[{math:"f'(x)=\\cos(x)",expl:'Derivada del seno es el coseno'}], th:'Derivadas trigonométricas: d/dx(sen x)=cos x'},
{t:'calculo', q:'Calcule la integral: ∫2x dx', l:'\\int 2x\\,dx', o:['x²+C','2x²+C','x+C','2+C'], s:[{math:'\\int 2x\\,dx = \\frac{2x^2}{2}+C',expl:'Regla de la potencia inversa'},{math:'x^2+C',expl:'Simplificar'}], th:'∫xⁿdx = xⁿ⁺¹/(n+1)+C'},
{t:'calculo', q:'Calcule: lim_{x→∞} 1/x', l:'\\lim_{x \\to \\infty} \\frac{1}{x}', o:['0','1','∞','indefinido'], s:[{math:'\\lim_{x\\to\\infty}\\frac{1}{x}=0',expl:'El denominador crece sin límite, el cociente se acerca a 0'}], th:'Límites al infinito: 1/x→0 cuando x→∞'},
{t:'calculo', q:'Calcule la integral: ∫cos(x) dx', l:'\\int \\cos(x)\\,dx', o:['sen(x)+C','-sen(x)+C','cos(x)+C','tan(x)+C'], s:[{math:'\\int \\cos(x)\\,dx = \\sin(x)+C',expl:'Integral del coseno es el seno'}], th:'Integrales trigonométricas básicas: ∫cos(x)dx=sen(x)+C'},
// FRACCIONES ALGEBRAICAS (10)
{t:'fracciones-alg', q:'Simplifique: (x²-1)/(x-1)', l:'\\frac{x^2-1}{x-1}', o:['x+1','x-1','x²+1','1'], s:[{math:'\\frac{(x+1)(x-1)}{x-1}=x+1',expl:'Factorizar diferencia de cuadrados y cancelar'}], th:'Simplificación: factorizar y cancelar factores comunes'},
{t:'fracciones-alg', q:'Sume: 1/x + 1/y', l:'\\frac{1}{x}+\\frac{1}{y}', o:['(x+y)/(xy)','2/(x+y)','(x+y)/x','1/(xy)'], s:[{math:'\\frac{y+x}{xy}',expl:'MCM = xy, equivalente a (x+y)/xy'}], th:'Para sumar fracciones, encontrar el MCM de los denominadores'},
{t:'fracciones-alg', q:'Simplifique: (x²-9)/(x+3)', l:'\\frac{x^2-9}{x+3}', o:['x-3','x+3','x²-3','3-x'], s:[{math:'\\frac{(x+3)(x-3)}{x+3}=x-3',expl:'Diferencia de cuadrados y cancelación'}], th:'Factorizar numerador para simplificar'},
{t:'fracciones-alg', q:'Multiplique: (x/2) × (4/x)', l:'\\frac{x}{2} \\times \\frac{4}{x}', o:['2','2x','4/x','x/2'], s:[{math:'\\frac{x \\cdot 4}{2 \\cdot x}=\\frac{4}{2}=2',expl:'Multiplicar numeradores y denominadores, cancelar x'}], th:'Multiplicación de fracciones: multiplicar cruzado y simplificar'},
{t:'fracciones-alg', q:'Divida: (x/3) ÷ (x²/6)', l:'\\frac{x}{3} \\div \\frac{x^2}{6}', o:['2/x','x/2','2x','1/x'], s:[{math:'\\frac{x}{3} \\times \\frac{6}{x^2}=\\frac{6x}{3x^2}=\\frac{2}{x}',expl:'Multiplicar por el recíproco'}], th:'División de fracciones: multiplicar por el recíproco del divisor'},
];

async function main(){
  console.log('Sembrando '+EX.length+' ejercicios reales...');
  for(const e of EX){
    await pool.query(
      'INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty) VALUES($1,$2,$3,$4,$5,$6,$7)',
      [e.t, e.q, e.l, JSON.stringify(e.o), JSON.stringify(e.s), e.th||null, 'basico']
    );
  }
  console.log('LISTO: '+EX.length+' ejercicios insertados.');
  process.exit(0);
}
main().catch(e=>{console.error(e);process.exit(1);});
