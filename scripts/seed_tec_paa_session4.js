const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathmaty',
  password: 'Calg.1984',
  port: 5432,
});

const category = 'tec_paa';
const year = 2021;

const exercises = [
  // ===================================================================
  // FOLLETO GUÍA - Remaining text-based items
  // ===================================================================
  {
    topic: 'tec-matematica',
    question: 'Considere la siguiente tabla numérica donde cada cuadro tiene un patrón. Cuadro A: 1,2,4,3,5,7. Cuadro B: 11,9,12,15. Cuadro C: 21,18,22,25. Cuadro D: 31,28,?,?. ¿Cuál cuadro no pertenece a la secuencia?',
    latex: '',
    options: ['A', 'B', 'C', 'D'],
    steps: [
      { math: '\\text{Cuadro A: }1,2,4,3,5,7', expl: 'El cuadro A tiene 6 números organizados en 3 columnas.' },
      { math: '\\text{Cuadros B, C, D: }4\\text{ números c/u en 2 columnas}', expl: 'Los cuadros B, C y D tienen estructura diferente al A.' },
      { math: '\\text{Cuadro A no pertenece}', expl: 'El cuadro A tiene un formato distinto a los demás.' },
    ],
    theory: 'Conceptos: patrones visuales, formato de tabla, identificación de anomalías. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | p. 19 | ítem 6',
    year: 2021,
  },
  {
    topic: 'tec-logica',
    question: 'Cada uno de los símbolos ○, ∗, □ representa un dígito. Considere las secuencias: ○, ∗, □. □, ∗, 8. 1, ○, 5, 7, □. ¿Cuáles dígitos representan respectivamente ○, ∗, □?',
    latex: '',
    options: ['3, 6, 8', '2, 3, 9', '4, 7, 8', '3, 6, 9'],
    steps: [
      { math: '\\text{Secuencia 3: }1, ○, 5, 7, □', expl: 'Los dígitos 1,5,7 están presentes, y ○, □ son otros.' },
      { math: '\\text{Secuencia 2: }□, ∗, 8', expl: '□ y ∗ son dígitos diferentes de 8.' },
      { math: '\\text{Comparando: }○=3, ∗=6, □=9', expl: 'Probando opciones: 3,6,9 cumplen con todas las secuencias.' },
    ],
    theory: 'Conceptos: correspondencia símbolo-dígito, deducción. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'folleto_guia_2021_final.pdf | p. 19 | ítem 8',
    year: 2021,
  },
  // ===================================================================
  // DIGITAL-LIBRO - More math items (figures described as text)
  // ===================================================================
  {
    topic: 'tec-matematica',
    question: 'Considere una secuencia de figuras donde la Figura 1 tiene 1 cuadrado, la Figura 2 tiene 4 cuadrados formando un cuadrado mayor, la Figura 3 tiene 9 cuadrados. ¿Cuántos cuadrados tendrá la Figura 6?',
    latex: '',
    options: ['25', '36', '49', '64'],
    steps: [
      { math: '\\text{Figura 1: }1^2=1,\\text{ Figura 2: }2^2=4,\\text{ Figura 3: }3^2=9', expl: 'Cada figura tiene n² cuadrados.' },
      { math: '\\text{Figura 6: }6^2=36', expl: 'La sexta figura tendrá 36 cuadrados.' },
    ],
    theory: 'Conceptos: secuencias de figuras, patrones cuadráticos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 1',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'En una secuencia de figuras, la Figura 1 tiene 3 triángulos, la Figura 2 tiene 6 triángulos, la Figura 3 tiene 10 triángulos. Si el patrón continúa, ¿cuántos triángulos tendrá la Figura 5?',
    latex: '',
    options: ['15', '18', '21', '24'],
    steps: [
      { math: '\\text{Diferencias: }3,6,10,\\ldots', expl: 'Diferencias: +3, +4, +5, +6.' },
      { math: '\\text{Figura 4: }10+5=15', expl: 'Se suma 5 a la Figura 3.' },
      { math: '\\text{Figura 5: }15+6=21', expl: 'Se suma 6 a la Figura 4.' },
    ],
    theory: 'Conceptos: secuencias figurativas, diferencias sucesivas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 2',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Considere la secuencia de figuras: Figura 1: un círculo con una línea vertical. Figura 2: un cuadrado con una línea horizontal. Figura 3: un triángulo con una línea diagonal. Figura 4: un círculo con una línea horizontal. ¿Cuál es la Figura 5?',
    latex: '',
    options: ['Cuadrado con línea vertical', 'Triángulo con línea vertical', 'Círculo con línea diagonal', 'Cuadrado con línea diagonal'],
    steps: [
      { math: '\\text{Figuras: }\\circ,\\square,\\triangle,\\circ,\\ldots', expl: 'Las figuras se repiten cada 3: círculo, cuadrado, triángulo.' },
      { math: '\\text{Figura 5: cuadrado (vuelta al segundo)}', expl: 'Después de círculo, sigue cuadrado.' },
      { math: '\\text{Líneas: vertical, horizontal, diagonal, horizontal,...}', expl: 'El patrón de líneas alterna.' },
      { math: '\\text{Figura 5: cuadrado con línea vertical}', expl: 'Combinando ambos patrones.' },
    ],
    theory: 'Conceptos: secuencia de figuras, patrones múltiples simultáneos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 3',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Se muestra un rectángulo dividido en 4 cuadrantes. El cuadrante superior izquierdo tiene un círculo negro. El superior derecho tiene dos círculos negros. El inferior izquierdo tiene tres círculos negros. ¿Cuántos círculos hay en el cuadrante inferior derecho?',
    latex: '',
    options: ['3', '4', '5', '6'],
    steps: [
      { math: '\\text{Superior izq: }1,\\text{ Superior der: }2,\\text{ Inferior izq: }3', expl: 'Los cuadrantes tienen 1, 2 y 3 círculos respectivamente.' },
      { math: '\\text{El patrón suma 1 en cada cuadrante en sentido horario}', expl: 'El número de círculos aumenta en 1 siguiendo el sentido de las manecillas.' },
      { math: '\\text{Inferior der: }4\\text{ círculos}', expl: 'Siguiendo el patrón, el cuarto cuadrante tiene 4 círculos.' },
    ],
    theory: 'Conceptos: patrones visuales, simetría, conteo. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 4',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Una secuencia de figuras muestra triángulos equiláteros. Figura 1: 1 triángulo de lado 1. Figura 2: 4 triángulos de lado 1 formando un triángulo de lado 2. Figura 3: 9 triángulos formando un triángulo de lado 3. ¿Cuántos triángulos pequeños tiene la Figura 5?',
    latex: '',
    options: ['16', '25', '30', '36'],
    steps: [
      { math: '\\text{Figura 1: }1=1^2,\\text{ Figura 2: }4=2^2,\\text{ Figura 3: }9=3^2', expl: 'Cada figura tiene n² triángulos pequeños.' },
      { math: '\\text{Figura 5: }5^2=25', expl: 'La quinta figura tiene 25 triángulos.' },
    ],
    theory: 'Conceptos: patrones geométricos, cuadrados perfectos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 5',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'En una secuencia, la Figura 1 tiene 4 palillos formando un cuadrado. La Figura 2 tiene 7 palillos (cuadrado con una línea interior). La Figura 3 tiene 10 palillos. ¿Cuántos palillos tiene la Figura 6?',
    latex: '',
    options: ['16', '19', '21', '22'],
    steps: [
      { math: '\\text{Fig 1: }4,\\text{ Fig 2: }7,\\text{ Fig 3: }10', expl: 'La diferencia entre figuras consecutivas es 3.' },
      { math: '4,7,10,13,16,19', expl: 'Secuencia aritmética con d=3.' },
      { math: '\\text{Figura 6: }4+5(3)=19', expl: 'Usando fórmula: a_n = a_1 + (n-1)d.' },
    ],
    theory: 'Conceptos: progresión aritmética, secuencia figurativa. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 6',
    year: 2024,
  },
  // ===================================================================
  // MORE VERBAL - From digital-libro (items 14-26)
  // ===================================================================
  {
    topic: 'tec-verbal',
    question: 'Según un texto sobre las redes sociales: "Las redes sociales nos conectan con personas lejanas, pero paradójicamente pueden desconectarnos de quienes tenemos cerca." ¿Cuál es la contradicción que presenta el texto?',
    latex: '',
    options: ['Conectan a distancia pero desconectan localmente', 'Son gratuitas pero tienen costos ocultos', 'Son modernas pero usan tecnología antigua', 'Conectan personas pero aíslan familias'],
    steps: [
      { math: '\\text{conectan con lejanos, desconectan de cercanos}', expl: 'La paradoja es conectar a distancia y desconectar localmente.' },
      { math: '\\text{Conectan a distancia pero desconectan localmente}', expl: 'Esta es la contradicción señalada.' },
    ],
    theory: 'Conceptos: contradicción textual, paradoja, identificación de ideas opuestas. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 14',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'En un texto sobre el hábito de la lectura se afirma: "Leer no es pasar los ojos sobre las palabras, sino construir significado con la mente." De esta afirmación se infiere que la lectura es un proceso',
    latex: '',
    options: ['Pasivo de recepción de información', 'Activo de construcción de significado', 'Mecánico de reconocimiento visual', 'Automático de decodificación'],
    steps: [
      { math: '\\text{construir significado con la mente}', expl: 'El texto enfatiza que leer es un proceso constructivo activo.' },
      { math: '\\text{Activo de construcción de significado}', expl: 'Leer implica construir activamente, no recibir pasivamente.' },
    ],
    theory: 'Conceptos: inferencia, definición, proceso activo vs pasivo. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 15',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Según un texto: "El pesimista se queja del viento; el optimista espera que cambie; el realista ajusta las velas." ¿Cuál de las siguientes ideas resume mejor el mensaje?',
    latex: '',
    options: ['La actitud determina cómo enfrentamos los problemas', 'Siempre hay que esperar tiempos mejores', 'Quejarse es una pérdida de tiempo', 'La realidad es dura e implacable'],
    steps: [
      { math: '\\text{quejarse, esperar, ajustar = diferentes actitudes}', expl: 'Cada persona reacciona distinto ante la misma adversidad.' },
      { math: '\\text{La actitud determina cómo enfrentamos los problemas}', expl: 'La idea central es que la actitud define nuestra respuesta.' },
    ],
    theory: 'Conceptos: síntesis textual, moraleja, idea principal. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 16',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Un texto sobre el éxito dice: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." Según el texto, ¿cuál es la relación entre éxito y felicidad?',
    latex: '',
    options: ['El éxito produce felicidad', 'La felicidad conduce al éxito', 'Son independientes entre sí', 'El éxito es más importante'],
    steps: [
      { math: '\\text{La felicidad es la clave del éxito}', expl: 'El texto invierte la relación común: la felicidad lleva al éxito.' },
      { math: '\\text{La felicidad conduce al éxito}', expl: 'Amar lo que haces genera éxito.' },
    ],
    theory: 'Conceptos: relación causal, inversión de idea común, interpretación. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 17',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'En un texto se dice: "No tropezamos con las montañas, sino con las pequeñas piedras." ¿Qué significa esta metáfora?',
    latex: '',
    options: ['Los grandes problemas son más peligrosos', 'Son los pequeños detalles los que suelen causarnos problemas', 'Hay que evitar las montañas', 'Las piedras son más duras que las montañas'],
    steps: [
      { math: '\\text{no con montañas, sino con pequeñas piedras}', expl: 'Las metáfora contrasta lo grande con lo pequeño.' },
      { math: '\\text{Los pequeños detalles causan problemas cotidianos}', expl: 'Son las cosas pequeñas las que más nos afectan.' },
    ],
    theory: 'Conceptos: interpretación metafórica, lenguaje figurado, contraste. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 18',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Según un texto sobre la paciencia: "La paciencia no es la capacidad de esperar, sino la capacidad de mantener una buena actitud mientras esperas." De esto se infiere que la paciencia implica',
    latex: '',
    options: ['Soportar la espera pasivamente', 'Mantener una actitud positiva en la espera', 'Evitar toda situación de espera', 'Aceptar cualquier demora sin quejarse'],
    steps: [
      { math: '\\text{mantener buena actitud mientras esperas}', expl: 'La paciencia es activa: mantener una buena actitud.' },
      { math: '\\text{Mantener una actitud positiva en la espera}', expl: 'La clave no es esperar, sino cómo esperas.' },
    ],
    theory: 'Conceptos: definición, matiz semántico, inferencia. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 19',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: '"El único modo de hacer un gran trabajo es amar lo que haces." (Steve Jobs) De esta frase se puede concluir que la pasión por el trabajo',
    latex: '',
    options: ['Es necesaria para lograr excelencia', 'Garantiza el éxito económico', 'Es más importante que la habilidad', 'Solo aplica a ciertas profesiones'],
    steps: [
      { math: '\\text{único modo de hacer un gran trabajo = amar lo que haces}', expl: 'La pasión es condición necesaria para la excelencia.' },
      { math: '\\text{Es necesaria para lograr excelencia}', expl: 'Amar tu trabajo es indispensable para hacerlo bien.' },
    ],
    theory: 'Conceptos: condición necesaria, inferencia, frase célebre. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 20',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Un texto sobre el cambio dice: "No puedes cambiar el viento, pero puedes ajustar las velas." ¿Cuál es la enseñanza principal?',
    latex: '',
    options: ['Debemos controlar la naturaleza', 'Podemos adaptarnos a las circunstancias', 'Hay que esperar a que el viento cambie', 'Las velas son más importantes que el viento'],
    steps: [
      { math: '\\text{no cambiar el viento, pero ajustar velas}', expl: 'No controlamos todo, pero podemos adaptarnos.' },
      { math: '\\text{Podemos adaptarnos a las circunstancias}', expl: 'La enseñanza es la adaptación a lo que no podemos cambiar.' },
    ],
    theory: 'Conceptos: metáfora, enseñanza moral, adaptación. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 21',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Según un texto: "La mente es como un paracaídas: solo funciona si se abre." (Albert Einstein) ¿Qué significa esta analogía?',
    latex: '',
    options: ['La mente es peligrosa si no se usa', 'La mente requiere apertura para funcionar correctamente', 'Hay que cerrar la mente a lo negativo', 'La mente es frágil como un paracaídas'],
    steps: [
      { math: '\\text{solo funciona si se abre}', expl: 'La analogía compara la mente abierta con un paracaídas abierto.' },
      { math: '\\text{La mente requiere apertura para funcionar}', expl: 'Una mente abierta es receptiva y funcional.' },
    ],
    theory: 'Conceptos: analogía, interpretación, símil. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 22',
    year: 2024,
  },
  // ===================================================================
  // MORE LOGIC - Syllogism variants
  // ===================================================================
  {
    topic: 'tec-logica',
    question: 'Premisa 1: Todos los mamíferos son animales de sangre caliente. Premisa 2: Algunos animales marinos son mamíferos. ¿Qué se concluye?',
    latex: '',
    options: ['Algunos animales marinos son de sangre caliente', 'Todos los animales marinos son mamíferos', 'Ningún animal marino es de sangre caliente', 'Todos los mamíferos son animales marinos'],
    steps: [
      { math: '\\text{Mamíferos} \\Rightarrow \\text{sangre caliente}', expl: 'La premisa 1 garantiza que los mamíferos son de sangre caliente.' },
      { math: '\\text{Algunos marinos} \\Rightarrow \\text{mamíferos}', expl: 'La premisa 2 une algunos marinos con mamíferos.' },
      { math: '\\text{Algunos marinos} \\Rightarrow \\text{sangre caliente}', expl: 'Por transitividad, algunos animales marinos son de sangre caliente.' },
    ],
    theory: 'Conceptos: silogismo, transitividad, cuantificadores. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'variante-silogismo | ítem adicional 1',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    question: 'Premisa 1: Toda fruta contiene vitaminas. Premisa 2: Ningún dulce contiene vitaminas. Premisa 3: Algunos postres son dulces. ¿Qué se concluye?',
    latex: '',
    options: ['Ningún postre es fruta', 'Algunos postres no contienen vitaminas', 'Todo dulce es postre', 'Algunas frutas son postres'],
    steps: [
      { math: '\\text{Dulces} \\cap \\text{Vitaminas} = \\varnothing', expl: 'Ningún dulce contiene vitaminas.' },
      { math: '\\text{Algunos postres} \\in \\text{Dulces}', expl: 'Hay postres que son dulces.' },
      { math: '\\text{Algunos postres} \\notin \\text{Vitaminas}', expl: 'Esos postres (que son dulces) no contienen vitaminas.' },
    ],
    theory: 'Conceptos: silogismo con tres premisas, conjuntos disjuntos. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'variante-silogismo | ítem adicional 2',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    question: 'Cuatro amigos: Alex, Ben, Carla y Dana se sientan en una fila de 4 asientos. Se sabe que: Alex está a la izquierda de Ben. Carla está a la derecha de Dana. Ben está a la izquierda de Carla. ¿Quién está en el extremo izquierdo?',
    latex: '',
    options: ['Alex', 'Ben', 'Carla', 'Dana'],
    steps: [
      { math: '\\text{Alex < Ben}', expl: 'Alex está a la izquierda de Ben.' },
      { math: '\\text{Ben < Carla}', expl: 'Ben está a la izquierda de Carla.' },
      { math: '\\text{Dana < Carla}', expl: 'Carla está a la derecha de Dana, o sea Dana < Carla.' },
      { math: '\\text{Dana < (Alex < Ben < Carla) ??}', expl: 'Falta determinar la posición de Dana.' },
      { math: '\\text{Dana < Alex < Ben < Carla}', expl: 'Dana debe estar en el extremo izquierdo.' },
    ],
    theory: 'Conceptos: ordenamiento lineal, relaciones posicionales, deducción. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'variante-ordenamiento | ítem adicional 3',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    question: 'Seis estudiantes: Ana, Luis, María, Pedro, Sofía y Tomás van a presentar un examen. Se sabe que: Ana obtiene mayor nota que Luis. María obtiene menor nota que Pedro pero mayor que Tomás. Sofía obtiene la nota más alta. Luis obtiene mayor nota que María. ¿Quién obtiene la nota más baja?',
    latex: '',
    options: ['Tomás', 'María', 'Luis', 'Pedro'],
    steps: [
      { math: '\\text{Ana > Luis > María}', expl: 'Ana > Luis, y Luis > María.' },
      { math: '\\text{Pedro > María > Tomás}', expl: 'María es menor que Pedro pero mayor que Tomás.' },
      { math: '\\text{Sofía > todos}', expl: 'Sofía tiene la nota más alta.' },
      { math: '\\text{Sofía > (Ana > Luis > María) y (Pedro > María > Tomás)}', expl: 'María está entre Luis y Pedro, pero Tomás está debajo de María.' },
      { math: '\\text{Tomás tiene la nota más baja}', expl: 'Tomás es el de menor nota.' },
    ],
    theory: 'Conceptos: ordenamiento, comparación múltiple, deducción. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'variante-ordenamiento | ítem adicional 4',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'En una bolsa hay 3 bolas rojas, 2 azules y 4 verdes. ¿Cuál es la probabilidad de sacar una bola azul?',
    latex: 'P(azul)=\\frac{2}{3+2+4}',
    options: ['2/9', '1/3', '2/7', '1/2'],
    steps: [
      { math: '\\text{Total: }3+2+4=9', expl: 'Sumamos todas las bolas en la bolsa.' },
      { math: 'P=\\frac{2}{9}', expl: 'Casos favorables (2 azules) entre casos posibles (9 total).' },
    ],
    theory: 'Conceptos: probabilidad simple, casos favorables entre casos posibles. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'variante-probabilidad | ítem adicional',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Un agricultor tiene 120 metros de cerca para rodear un terreno rectangular. Si el largo es el doble del ancho, ¿cuál es el área del terreno?',
    latex: '2l+2a=120,\\ l=2a',
    options: ['600 m²', '800 m²', '900 m²', '1200 m²'],
    steps: [
      { math: '2(2a)+2a=120 \\Rightarrow 6a=120 \\Rightarrow a=20', expl: 'Sustituimos l=2a en la fórmula del perímetro.' },
      { math: 'l=2(20)=40', expl: 'El largo mide 40 metros.' },
      { math: 'A=40\\times20=800\\text{ m}^2', expl: 'Área del rectángulo.' },
    ],
    theory: 'Conceptos: perímetro y área de rectángulo, ecuaciones. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'variante-geometría | ítem adicional',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Si 3 kilos de manzanas cuestan ¢2,400, ¿cuánto cuestan 7 kilos?',
    latex: '\\frac{3}{2400} = \\frac{7}{x}',
    options: ['¢5,600', '¢4,800', '¢6,000', '¢5,200'],
    steps: [
      { math: 'x = \\frac{7 \\times 2400}{3}', expl: 'Regla de tres directa.' },
      { math: 'x = \\frac{16800}{3} = 5600', expl: '7 kilos cuestan ¢5,600.' },
    ],
    theory: 'Conceptos: proporcionalidad directa, regla de tres. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'variante-proporción | ítem adicional',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Un número se multiplica por 3, luego se le suma 8, y el resultado es 29. ¿Cuál es el número?',
    latex: '3x+8=29',
    options: ['5', '6', '7', '8'],
    steps: [
      { math: '3x+8=29', expl: 'Traducimos el enunciado a ecuación.' },
      { math: '3x=21', expl: 'Restamos 8 en ambos lados.' },
      { math: 'x=7', expl: 'Dividimos entre 3.' },
    ],
    theory: 'Conceptos: ecuaciones lineales, traducción de enunciados. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'variante-ecuaciones | ítem adicional',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    question: 'En un edificio de 4 pisos vive una familia por piso. Los Pérez viven arriba de los García. Los López viven abajo de los Martínez. Los García viven arriba de los Martínez. ¿Quiénes viven en el primer piso?',
    latex: '',
    options: ['Martínez', 'García', 'López', 'Pérez'],
    steps: [
      { math: '\\text{Pérez > García}', expl: 'Pérez arriba de García.' },
      { math: '\\text{García > Martínez}', expl: 'García arriba de Martínez.' },
      { math: '\\text{López < Martínez}', expl: 'López abajo de Martínez.' },
      { math: '\\text{Pérez > García > Martínez > López}', expl: 'Orden: Pérez (4º), García (3º), Martínez (2º), López (1º).' },
      { math: '\\text{López vive en el primer piso}', expl: 'Los López viven en el primer piso.' },
    ],
    theory: 'Conceptos: ordenamiento vertical, transitividad, relaciones. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'variante-ordenamiento | ítem adicional 5',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    question: 'Considere la secuencia: 2, 5, 10, 17, 26, ... ¿Cuál es el siguiente término?',
    latex: '2,5,10,17,26,\\ldots',
    options: ['35', '37', '39', '41'],
    steps: [
      { math: '\\text{Diferencias: }3,5,7,9,\\ldots', expl: 'Las diferencias aumentan de 2 en 2.' },
      { math: '\\text{Siguiente diferencia: }11', expl: '9+2 = 11.' },
      { math: '26+11=37', expl: 'El siguiente término es 37.' },
    ],
    theory: 'Conceptos: secuencias numéricas, segundas diferencias. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'variante-secuencia | ítem adicional',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'En un texto se afirma: "La cultura es lo que queda después de haber olvidado todo lo que se aprendió." De esta frase se infiere que la cultura',
    latex: '',
    options: ['Se olvida fácilmente', 'Es más que conocimientos memorizados', 'Requiere estudio constante', 'Es menos importante que el aprendizaje'],
    steps: [
      { math: '\\text{lo que queda después de haber olvidado}', expl: 'La cultura es lo que perdura más allá de los datos.' },
      { math: '\\text{Es más que conocimientos memorizados}', expl: 'La cultura trasciende la memorización.' },
    ],
    theory: 'Conceptos: inferencia, definición, interpretación filosófica. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'variante-verbal | ítem adicional 1',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Según un texto: "El progreso es imposible sin cambio, y aquellos que no pueden cambiar sus mentes no pueden cambiar nada." (George Bernard Shaw) ¿Cuál es la idea principal?',
    latex: '',
    options: ['El cambio de mentalidad es necesario para el progreso', 'El cambio siempre es positivo', 'El progreso ocurre sin esfuerzo', 'Cambiar de opinión es una debilidad'],
    steps: [
      { math: '\\text{progreso} \\Rightarrow \\text{cambio} \\Rightarrow \\text{cambiar mentes}', expl: 'El cambio mental es requisito para el progreso.' },
      { math: '\\text{El cambio de mentalidad es necesario para el progreso}', expl: 'Sin flexibilidad mental no hay progreso posible.' },
    ],
    theory: 'Conceptos: cadena causal, condición necesaria, interpretación. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'variante-verbal | ítem adicional 2',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    question: 'Se tienen tres cajas: una contiene solo manzanas, otra solo naranjas, y otra ambas. Todas las cajas están etiquetadas incorrectamente. La caja etiquetada "Manzanas" contiene en realidad... Si de una caja sacamos una naranja, ¿qué caja contiene ambas?',
    latex: '',
    options: ['La etiquetada Naranjas', 'La etiquetada Manzanas', 'La etiquetada Ambas', 'No se puede determinar'],
    steps: [
      { math: '\\text{Todas las etiquetas son incorrectas}', expl: 'Ninguna caja tiene su contenido real.' },
      { math: '\\text{Si "Ambas" etiqueta incorrecta} \\Rightarrow \\text{contiene solo un tipo}', expl: 'La caja Ambas no puede tener ambas frutas.' },
      { math: '\\text{Sacamos naranja de "Manzanas" \\Rightarrow "Manzanas" tiene naranjas}', expl: 'Entonces "Manzanas" tiene solo naranjas (porque la etiqueta es incorrecta).' },
      { math: '\\text{"Naranjas" no puede tener naranjas, ni manzanas (ya usadas)}', expl: 'Por descarte, "Naranjas" tiene ambas.' },
    ],
    theory: 'Conceptos: lógica de etiquetas, descarte, deducción. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'variante-lógica | ítem adicional 6',
    year: 2024,
  },
];

// Image-based exercises (figure items from folleto items 37-50)
const figureExercises = [
  {
    topic: 'tec-matematica',
    question: 'Considere un cuadrado dividido en 4 partes iguales por una línea vertical y una horizontal. Las partes superior izquierda e inferior derecha están sombreadas. ¿Qué fracción del cuadrado está sombreada?',
    latex: '',
    options: ['1/4', '1/2', '2/3', '3/4'],
    steps: [
      { math: '\\text{Cuadrado dividido en 4 partes iguales}', expl: 'Las líneas dividen el cuadrado en 4 cuadrantes iguales.' },
      { math: '\\text{2 de 4 cuadrantes están sombreados}', expl: 'El superior izquierdo y el inferior derecho.' },
      { math: '\\frac{2}{4} = \\frac{1}{2}', expl: 'La fracción sombreada es 1/2.' },
    ],
    theory: 'Conceptos: fracciones, figuras geométricas, áreas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'variante-figuras | ítem figura adicional 1',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Un cuadrado de lado 4 cm se divide en cuadrados de lado 1 cm. ¿Cuántos cuadrados pequeños se forman?',
    latex: '',
    options: ['8', '12', '16', '20'],
    steps: [
      { math: '\\text{Área total: }4^2=16\\text{ cm}^2', expl: 'Área del cuadrado grande.' },
      { math: '\\text{Área de cada pequeño: }1^2=1\\text{ cm}^2', expl: 'Área de cada cuadrado pequeño.' },
      { math: '16\\div1=16\\text{ cuadrados pequeños}', expl: 'Se forman 16 cuadrados pequeños.' },
    ],
    theory: 'Conceptos: áreas, división de figuras, cuadrículas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem figura adicional',
    year: 2021,
  },
];

exercises.push(...figureExercises);

async function insertExercise(item) {
  const existing = await pool.query(
    'SELECT id FROM exercises WHERE topic_id = $1 AND source = $2 AND question = $3 LIMIT 1',
    [item.topic, item.source, item.question]
  );
  if (existing.rows.length) return 'skipped';

  await pool.query(
    `INSERT INTO exercises(topic_id, question, latex_content, options, solution_steps, theory, difficulty, category, exam_year, source)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      item.topic,
      item.question,
      item.latex || null,
      JSON.stringify(item.options),
      JSON.stringify(item.steps),
      item.theory,
      'basico',
      category,
      item.year || null,
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
