const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathmaty',
  password: 'Calg.1984',
  port: 5432,
});

const category = 'tec_paa';
const year = 2022;

const exercises = [
  {
    topic: 'tec-logica',
    q: 'Premisa 1: Toda conferencia es discurso. Premisa 2: Algunas conferencias no son lecciones. ¿Qué se sigue?',
    l: '',
    o: ['Algunos discursos no son lecciones', 'Ninguna lección es discurso', 'Todas las lecciones son discursos', 'Todos los discursos son conferencias'],
    s: [
      { math: '\\text{Conferencias} \\subset \\text{discursos}', expl: 'La primera premisa garantiza que toda conferencia pertenece al grupo de discursos.' },
      { math: '\\text{Algunas conferencias} \\notin \\text{lecciones}', expl: 'La segunda premisa ubica una parte de las conferencias fuera de las lecciones.' },
      { math: '\\text{Algunos discursos} \\notin \\text{lecciones}', expl: 'Como esas conferencias también son discursos, se concluye que algunos discursos no son lecciones.' },
    ],
    th: 'Conceptos: inclusión de conjuntos, cuantificadores y conclusión necesaria. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 12 | ítem 7',
  },
  {
    topic: 'tec-matematica',
    q: 'En un patrón triangular, las sumas de las filas son 1, 3, 6, 12, 24, 48, 96, ... ¿En cuál fila la suma sobrepasa por primera vez 96?',
    l: '1,3,6,12,24,48,96,\\ldots',
    o: ['Octava', 'Sétima', 'Novena', 'Décima'],
    s: [
      { math: '1,3,6,12,24,48,96', expl: 'Se construyen las filas usando que cada término interior es suma de dos superiores.' },
      { math: '96\\text{ no sobrepasa }96', expl: 'La sétima fila suma exactamente 96; la pregunta pide sobrepasar, no igualar.' },
      { math: '192>96', expl: 'La octava fila suma 192, que es la primera suma mayor que 96.' },
    ],
    th: 'Conceptos: patrón recursivo, suma de filas y lectura precisa de desigualdades. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 13 | ítem 8',
  },
  {
    topic: 'tec-matematica',
    q: 'Considere la secuencia -1, 1, 0, 1, 1, 2, 3, 5, p. ¿Cuál es el valor de p?',
    l: '-1,1,0,1,1,2,3,5,p',
    o: ['8', '5', '6', '7'],
    s: [
      { math: '-1+1=0', expl: 'El tercer término se obtiene sumando los dos anteriores.' },
      { math: '1+0=1,\\ 0+1=1,\\ 1+1=2', expl: 'El mismo patrón se mantiene como una sucesión tipo Fibonacci desplazada.' },
      { math: 'p=3+5=8', expl: 'Se suman los dos últimos términos conocidos. Por tanto, p = 8.' },
    ],
    th: 'Conceptos: sucesiones recursivas y suma de términos consecutivos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 14 | ítem 9',
  },
  {
    topic: 'tec-logica',
    q: 'Premisas: Si A es muchacho, entonces A es más joven que J. Si A no tiene 14 años, entonces A no es más joven que J. A no tiene 14 años. ¿Qué se sigue?',
    l: '',
    o: ['A no es un muchacho', 'A es menor que J', 'J es menor que A', 'J es un muchacho'],
    s: [
      { math: '\\neg 14(A) \\Rightarrow \\neg joven(A,J)', expl: 'Por la premisa 2 y la premisa 3, se concluye que A no es más joven que J.' },
      { math: 'muchacho(A) \\Rightarrow joven(A,J)', expl: 'La premisa 1 dice que si A fuera muchacho, tendría que ser más joven que J.' },
      { math: '\\neg joven(A,J) \\Rightarrow \\neg muchacho(A)', expl: 'Por contraposición, si A no es más joven que J, A no es muchacho.' },
    ],
    th: 'Conceptos: condicional, contraposición y encadenamiento de premisas. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 15 | ítem 10',
  },
  {
    topic: 'tec-matematica',
    q: 'Considere la secuencia 1, 5, 14, 30, 55, ... ¿Cuál es el sétimo término?',
    l: '1,5,14,30,55,\\ldots',
    o: ['140', '79', '91', '104'],
    s: [
      { math: '5-1=4=2^2', expl: 'La primera diferencia es 4, que equivale a 2².' },
      { math: '14-5=9=3^2,\\ 30-14=16=4^2', expl: 'Las diferencias siguen cuadrados consecutivos.' },
      { math: '55+6^2=91', expl: 'El sexto término es 91 porque se suma 36.' },
      { math: '91+7^2=140', expl: 'El sétimo término se obtiene sumando 49. Resultado: 140.' },
    ],
    th: 'Conceptos: diferencias sucesivas y cuadrados perfectos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 16 | ítem 11',
  },
  {
    topic: 'tec-matematica',
    q: '¿Cuál es el último dígito del número 25^45 · 5^117 + 1?',
    l: '25^{45}\\cdot5^{117}+1',
    o: ['6', '0', '1', '5'],
    s: [
      { math: '5^n\\text{ termina en }5', expl: 'Toda potencia positiva de 5 termina en 5.' },
      { math: '25^{45}\\text{ también termina en }5', expl: '25 termina en 5, y sus potencias conservan último dígito 5.' },
      { math: '5\\cdot5\\text{ termina en }5', expl: 'El producto de dos números terminados en 5 termina en 5.' },
      { math: '5+1=6', expl: 'Al sumar 1, el último dígito pasa a 6.' },
    ],
    th: 'Conceptos: último dígito, patrones de potencias y aritmética modular básica. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 17 | ítem 12',
  },
  {
    topic: 'tec-logica',
    q: 'Premisas: Todo C es S. Ningún E es T. Todo S es T. ¿Qué se concluye?',
    l: '',
    o: ['Todo C no es E', 'Todo S es E', 'Algunos S son E', 'Algunos T son E'],
    s: [
      { math: 'C \\Rightarrow S', expl: 'La primera premisa ubica a todo C dentro de S.' },
      { math: 'S \\Rightarrow T', expl: 'La tercera premisa ubica a todo S dentro de T; por tanto, todo C también es T.' },
      { math: 'E \\cap T=\\varnothing', expl: 'La segunda premisa dice que ningún E pertenece a T.' },
      { math: 'C\\subset T\\Rightarrow C\\cap E=\\varnothing', expl: 'Si todo C es T y ningún E es T, entonces ningún C es E.' },
    ],
    th: 'Conceptos: silogismo, inclusión transitiva y conjuntos disjuntos. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 18 | ítem 13',
  },
  {
    topic: 'tec-matematica',
    q: 'Si 10 tazas de agua equivalen a 2000 ml y 16 cucharadas equivalen a 200 ml, ¿cuántas tazas se obtienen de 240 cucharadas?',
    l: '10\\text{ tazas}=2000\\text{ ml},\\quad16\\text{ cucharadas}=200\\text{ ml}',
    o: ['15', '24', '30', '48'],
    s: [
      { math: '1\\text{ taza}=200\\text{ ml}', expl: 'De 10 tazas = 2000 ml se divide entre 10.' },
      { math: '16\\text{ cucharadas}=200\\text{ ml}', expl: 'La segunda equivalencia muestra que 16 cucharadas equivalen a una taza.' },
      { math: '240\\div16=15', expl: 'Se divide el total de cucharadas entre las cucharadas por taza. Resultado: 15 tazas.' },
    ],
    th: 'Conceptos: equivalencias, unidades de medida y proporción directa. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 19 | ítem 14',
  },
  {
    topic: 'tec-matematica',
    q: 'Si k es un número natural, ¿cuáles expresiones representan dos números naturales impares consecutivos?',
    l: 'k\\in\\mathbb{N}',
    o: ['2k + 1 y 2k + 3', '2k - 1 y 2k', '2k - 1 y 2k + 3', '2k + 1 y 2k + 2'],
    s: [
      { math: '2k\\text{ es par}', expl: 'Todo número de la forma 2k es par.' },
      { math: '2k+1\\text{ y }2k+3\\text{ son impares}', expl: 'Al sumar un impar a un par se obtiene un impar.' },
      { math: '(2k+3)-(2k+1)=2', expl: 'Dos impares consecutivos se diferencian en 2. Por eso la pareja correcta es 2k+1 y 2k+3.' },
    ],
    th: 'Conceptos: paridad, números impares y consecutivos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 20 | ítem 15',
  },
  {
    topic: 'tec-matematica',
    q: '¿Cuántos ordenamientos de cuatro letras se pueden hacer con M, S, R, A, O si cada uno comienza en S y termina en A, permitiendo repetir letras?',
    l: '',
    o: ['25', '9', '10', '20'],
    s: [
      { math: 'S\\_\\_A', expl: 'La primera y la última posición están fijas.' },
      { math: '5\\text{ opciones para la segunda posición}', expl: 'Puede elegirse cualquiera de M, S, R, A, O porque no se prohíbe repetir.' },
      { math: '5\\text{ opciones para la tercera posición}', expl: 'La tercera posición también tiene las mismas 5 posibilidades.' },
      { math: '5\\cdot5=25', expl: 'Por el principio multiplicativo, hay 25 ordenamientos.' },
    ],
    th: 'Conceptos: conteo con repetición y posiciones fijas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 21 | ítem 16',
  },
  {
    topic: 'tec-matematica',
    q: '¿Cuántos productos distintos se pueden obtener multiplicando dos números sin repetirlos entre 3, 5, 6, 7 y 9?',
    l: '\\{3,5,6,7,9\\}',
    o: ['10', '9', '20', '25'],
    s: [
      { math: '\\binom{5}{2}', expl: 'Se eligen dos números distintos de un conjunto de 5.' },
      { math: '\\frac{5\\cdot4}{2}=10', expl: 'Se divide entre 2 porque 3·5 y 5·3 representan el mismo producto.' },
      { math: '10', expl: 'Hay 10 parejas no repetidas, por tanto 10 productos posibles según el conteo del ítem.' },
    ],
    th: 'Conceptos: combinaciones, conteo sin orden y productos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 22 | ítem 17',
  },
  {
    topic: 'tec-logica',
    q: 'En una encuesta hay 425 mujeres y 325 hombres. La tabla muestra 225 escolares, 175 colegiales, 250 adultos menores de 65 y 100 adultos mayores. ¿Qué afirmación se cumple con certeza?',
    l: '\\frac{175}{225}=\\frac{7}{9}',
    o: ['Solo B', 'Solo C', 'A y B', 'B y C'],
    s: [
      { math: '\\frac{425}{750}=\\frac{17}{30},\\quad \\frac{325}{750}=\\frac{13}{30}', expl: 'Estas son proporciones globales de mujeres y hombres, pero no garantizan proporciones dentro de cada subgrupo.' },
      { math: '\\text{A y C no son seguras}', expl: 'No se sabe cómo se distribuye el género dentro de adultos mayores o escolares.' },
      { math: '\\frac{175}{225}=\\frac{7}{9}', expl: 'Sí se puede comparar colegiales con escolares usando los totales dados.' },
      { math: '\\text{Solo B}', expl: 'Por cada 7 colegiales hay 9 escolares; esa es la única afirmación garantizada.' },
    ],
    th: 'Conceptos: proporción, certeza con datos agregados y límites de inferencia. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | pp. 23-24 | ítem 18',
  },
  {
    topic: 'tec-matematica',
    q: 'Tres contenedores tienen capacidad de 90 kg, 180 kg y 150 kg. Se llenan con sacos del mayor peso posible e igual peso en los tres. ¿Cuánto pesa cada saco?',
    l: '\\operatorname{MCD}(90,180,150)',
    o: ['30 kg', '15 kg', '45 kg', '90 kg'],
    s: [
      { math: '90=2\\cdot3^2\\cdot5', expl: 'Se factoriza 90 para encontrar divisores comunes.' },
      { math: '180=2^2\\cdot3^2\\cdot5', expl: 'Se factoriza 180.' },
      { math: '150=2\\cdot3\\cdot5^2', expl: 'Se factoriza 150.' },
      { math: 'MCD=2\\cdot3\\cdot5=30', expl: 'Tomamos los factores comunes con menor exponente. El mayor peso posible es 30 kg.' },
    ],
    th: 'Conceptos: máximo común divisor y reparto en partes iguales máximas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 25 | ítem 19',
  },
  {
    topic: 'tec-matematica',
    q: 'En un sistema de numeración: | = 1, || = 2, ||| = 3, |||| = 4, Γ = 5, Δ = 10, H = 100. ¿Cuál es la diferencia entre ΓH H ΔΓ y HH ΓΔ ΔΔ ||?',
    l: '',
    o: ['343', '272', '615', '887'],
    s: [
      { math: '\\Gamma H+H+\\Delta+\\Gamma=5\\cdot100+100+10+5=615', expl: 'El símbolo Γ antes de H indica 5 veces 100, y los demás símbolos se suman.' },
      { math: 'H+H+\\Gamma\\Delta+\\Delta+\\Delta+||=100+100+5\\cdot10+10+10+2=272', expl: 'Se traduce cada bloque del segundo número al sistema decimal.' },
      { math: '615-272=343', expl: 'La diferencia pedida es 343.' },
    ],
    th: 'Conceptos: traducción de sistemas simbólicos y resta. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 26 | ítem 20',
  },
  {
    topic: 'tec-matematica',
    q: 'Se sabe que el producto de dos números naturales A y B es S. ¿Qué expresión representa A aumentado en 2 unidades multiplicado por B?',
    l: 'A\\cdot B=S',
    o: ['S + 2B', 'S + 2', 'S + B', 'S + 2A'],
    s: [
      { math: 'A\\cdot B=S', expl: 'Este es el dato inicial.' },
      { math: 'A\\text{ aumentado en }2=A+2', expl: 'Aumentar A en 2 unidades se escribe A + 2.' },
      { math: '(A+2)B=AB+2B', expl: 'Aplicamos la propiedad distributiva.' },
      { math: 'AB+2B=S+2B', expl: 'Como AB = S, la expresión queda S + 2B.' },
    ],
    th: 'Conceptos: simbolización algebraica y propiedad distributiva. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 27 | ítem 21',
  },
  {
    topic: 'tec-matematica',
    q: 'Tres timbres suenan cada 75, 80 y 90 minutos. Si suenan juntos a las 10 a. m. del domingo, ¿cuándo volverán a sonar juntos?',
    l: '\\operatorname{MCM}(75,80,90)',
    o: ['A las 10 de la noche del martes', 'A las 10 de la noche del lunes', 'A las 10 de la mañana del jueves', 'A las 10 de la mañana del miércoles'],
    s: [
      { math: '75=3\\cdot5^2,\\ 80=2^4\\cdot5,\\ 90=2\\cdot3^2\\cdot5', expl: 'Convertimos los intervalos a minutos y los factorizamos.' },
      { math: 'MCM=2^4\\cdot3^2\\cdot5^2=3600', expl: 'El mínimo común múltiplo indica cuándo coinciden de nuevo.' },
      { math: '3600\\text{ min}=60\\text{ h}', expl: '3600 minutos equivalen a 60 horas.' },
      { math: '\\text{domingo 10 a. m.}+60\\text{ h}=\\text{martes 10 p. m.}', expl: 'Dos días son 48 horas; faltan 12 horas más. Resultado: martes a las 10 p. m.' },
    ],
    th: 'Conceptos: mínimo común múltiplo, unidades de tiempo y ciclos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 28 | ítem 22',
  },
  {
    topic: 'tec-logica',
    q: 'Se requiere que n^p siempre sea impar, con n y p naturales distintos de cero. ¿Cuáles afirmaciones son verdaderas? C: p tiene que ser impar y n impar. D: p puede ser cualquier natural si n es impar.',
    l: 'n^p\\text{ impar}',
    o: ['C y D', 'Solo B', 'Solo C', 'A y B'],
    s: [
      { math: '\\text{Si }n\\text{ es par, }n^p\\text{ es par}', expl: 'Una base par elevada a cualquier natural positivo sigue siendo par.' },
      { math: '\\text{Si }n\\text{ es impar, }n^p\\text{ es impar}', expl: 'Una base impar elevada a cualquier exponente natural positivo permanece impar.' },
      { math: 'C\\text{ es verdadera}', expl: 'Si n es impar y p es impar, el resultado es impar.' },
      { math: 'D\\text{ es verdadera}', expl: 'Incluso no hace falta que p sea impar: basta con que n sea impar. Por eso C y D son verdaderas.' },
    ],
    th: 'Conceptos: paridad, potencias y condiciones suficientes/necesarias. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 29 | ítem 23',
  },
  {
    topic: 'tec-matematica',
    q: '¿Cuántos números de cuatro cifras se pueden formar si la unidad es 0 y los otros tres dígitos se eligen del 1 al 7, sin repetir?',
    l: '',
    o: ['210', '18', '120', '216'],
    s: [
      { math: '\\_\\_\\_0', expl: 'La unidad está fija en 0.' },
      { math: '7\\text{ opciones}', expl: 'Para la primera cifra se puede elegir cualquiera del 1 al 7.' },
      { math: '6\\text{ opciones}', expl: 'Para la segunda cifra queda una opción menos porque no se permite repetir.' },
      { math: '5\\text{ opciones}', expl: 'Para la tercera cifra quedan cinco opciones.' },
      { math: '7\\cdot6\\cdot5=210', expl: 'Por el principio multiplicativo, se forman 210 números.' },
    ],
    th: 'Conceptos: conteo sin repetición, posiciones fijas y principio multiplicativo. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | pp. 30-31 | ítem 24',
  },
  {
    topic: 'tec-matematica',
    q: '¿Cuántos números de tres cifras se pueden formar utilizando solamente los dígitos 1 y 7, permitiendo repetición?',
    l: '',
    o: ['8', '5', '6', '7'],
    s: [
      { math: '2\\text{ opciones para centenas}', expl: 'La primera cifra puede ser 1 o 7.' },
      { math: '2\\text{ opciones para decenas}', expl: 'También puede ser 1 o 7 porque no hay restricción de repetición.' },
      { math: '2\\text{ opciones para unidades}', expl: 'La tercera posición tiene las mismas dos opciones.' },
      { math: '2\\cdot2\\cdot2=8', expl: 'Se forman 8 números de tres cifras.' },
    ],
    th: 'Conceptos: conteo con repetición y principio multiplicativo. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 32 | ítem 25',
  },
  {
    topic: 'tec-matematica',
    q: 'Hace 5 años P tenía el cuádruplo de la edad de Z y dentro de 5 años tendrá el doble de la edad de Z. ¿Cuántos años tiene P?',
    l: '',
    o: ['25', '15', '20', '30'],
    s: [
      { math: 'x-5=4(y-5)', expl: 'Sea x la edad actual de P y y la edad actual de Z. La primera condición se traduce así.' },
      { math: 'x=4y-15', expl: 'Se despeja la primera ecuación.' },
      { math: 'x+5=2(y+5)', expl: 'La segunda condición describe las edades dentro de 5 años.' },
      { math: 'x=2y+5', expl: 'Se despeja la segunda ecuación.' },
      { math: '4y-15=2y+5\\Rightarrow y=10', expl: 'Igualamos ambas expresiones de x.' },
      { math: 'x=2(10)+5=25', expl: 'La edad actual de P es 25 años.' },
    ],
    th: 'Conceptos: edades, ecuaciones simultáneas y traducción algebraica. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 33 | ítem 26',
  },
  {
    topic: 'tec-logica',
    q: 'En un torneo de 6 jugadores, con 3 puntos por gane y 1 por empate, se completa la tabla final. De las afirmaciones A, B y C, ¿cuáles se cumplen con certeza?',
    l: '',
    o: ['Solo B', 'Solo A', 'A y C', 'B y C'],
    s: [
      { math: '\\text{Cada jugador disputa }5\\text{ partidos}', expl: 'Con 6 jugadores, cada uno enfrenta a los otros 5.' },
      { math: '\\text{Puntos}=3G+E', expl: 'Se completa la tabla usando partidos ganados, empatados, perdidos y puntos.' },
      { math: 'X=7,\\ D=7', expl: 'Al completar la tabla, X y D empatan en puntaje.' },
      { math: '\\text{A no es segura y C es imposible}', expl: 'No se puede asegurar que D perdió contra X; además F no puede ganar un partido más porque ya jugó sus 5 partidos.' },
      { math: '\\text{Solo B}', expl: 'La única afirmación que se cumple con certeza es que hay dos jugadores empatados en puntaje.' },
    ],
    th: 'Conceptos: tabla de datos incompleta, puntuación, certeza y descarte de afirmaciones. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | pp. 34-35 | ítem 27',
  },
];

async function insertExercise(item) {
  const existing = await pool.query(
    'SELECT id FROM exercises WHERE topic_id = $1 AND source = $2 AND question = $3 LIMIT 1',
    [item.topic, item.source, item.q]
  );
  if (existing.rows.length) return 'skipped';

  await pool.query(
    `INSERT INTO exercises(topic_id, question, latex_content, options, solution_steps, theory, difficulty, category, exam_year, source)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      item.topic,
      item.q,
      item.l || null,
      JSON.stringify(item.o),
      JSON.stringify(item.s),
      item.th,
      'basico',
      category,
      year,
      item.source,
    ]
  );
  return 'inserted';
}

async function main() {
  const summary = { inserted: 0, skipped: 0 };
  for (const item of exercises) {
    const result = await insertExercise(item);
    if (result === 'inserted') summary.inserted++;
    if (result === 'skipped') summary.skipped++;
  }
  console.log(JSON.stringify(summary, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
