const { Pool } = require('pg');
const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : { user: 'postgres', host: 'localhost', database: 'mathmaty', password: 'Calg.1984', port: 5432 }
);
const category = 'tec_paa';

const folletoItems = [
  // folleto_guia_2021_final.pdf — Items 7,9,20,22,25 (figure-based, between loaded items)
  {
    topic: 'tec-logica',
    q: 'Considere el siguiente arreglo de figuras: un círculo, un cuadrado, un triángulo, y luego se repite el patrón. En la posición 15 del arreglo, ¿qué figura aparece?',
    l: '',
    o: ['Círculo', 'Cuadrado', 'Triángulo', 'No se puede determinar'],
    s: [{math:'\\text{Patrón: }\\circ,\\square,\\triangle\\text{ — se repite cada 3}', expl:'El ciclo tiene 3 figuras.'},{math:'15 \\div 3 = 5\\text{ resto }0', expl:'La posición 15 es múltiplo de 3, corresponde a la tercera figura del ciclo.'},{math:'\\text{Triángulo}', expl:'En la posición 15 aparece un triángulo.'}],
    th: 'Conceptos: patrones cíclicos, secuencias de figuras. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'folleto_guia_2021_final.pdf | ítem 7',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Observe la secuencia de figuras: la Figura 1 tiene 1 punto, la Figura 2 tiene 3 puntos formando una L, la Figura 3 tiene 6 puntos formando una L más grande. Si el patrón continúa, ¿cuántos puntos tiene la Figura 5?',
    l: '',
    o: ['12', '15', '18', '21'],
    s: [{math:'1,3,6,\\ldots', expl:'Diferencias: +2, +3, +4, +5.'},{math:'6+4=10,\\ 10+5=15', expl:'Figura 4 tiene 10 puntos, Figura 5 tiene 15.'},{math:'\\text{15 puntos}', expl:'La Figura 5 tiene 15 puntos.'}],
    th: 'Conceptos: secuencias figurativas, números triangulares. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 9',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Considere la figura de un hexágono regular inscrito en un círculo. Si el radio del círculo mide 6 cm, ¿cuál es el perímetro del hexágono?',
    l: 'r=6\\text{ cm}',
    o: ['36 cm', '30 cm', '42 cm', '24 cm'],
    s: [{math:'\\text{Hexágono regular inscrito: lado = radio}', expl:'En un hexágono regular inscrito en un círculo, cada lado mide igual que el radio.'},{math:'\\text{Lado}=6\\text{ cm}', expl:'Cada lado mide 6 cm.'},{math:'P=6\\times6=36\\text{ cm}', expl:'El perímetro es 6 por la medida del lado.'}],
    th: 'Conceptos: hexágono regular, círculo inscrito, perímetro. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 20',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Considere un cuadrado dividido en 9 cuadrados pequeños iguales. Si se sombrean los 4 cuadrados de las esquinas, ¿qué fracción del cuadrado grande está sombreada?',
    l: '',
    o: ['4/9', '1/3', '5/9', '2/3'],
    s: [{math:'\\text{Total: }3\\times3=9\\text{ cuadrados}', expl:'El cuadrado está dividido en 9 partes iguales.'},{math:'\\text{Sombreados: }4\\text{ cuadrados (esquinas)}', expl:'Las 4 esquinas están sombreadas.'},{math:'\\frac{4}{9}', expl:'La fracción sombreada es 4/9.'}],
    th: 'Conceptos: fracciones, áreas de figuras geométricas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 22',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'En el siguiente diagrama de barras: la barra A mide 8 unidades, la barra B mide 5 unidades y la barra C mide 3 unidades. ¿Cuál es la razón entre la barra más larga y la barra más corta?',
    l: 'A=8,\\ B=5,\\ C=3',
    o: ['8:3', '5:3', '8:5', '3:8'],
    s: [{math:'\\text{Más larga: A=8,\\ Más corta: C=3}', expl:'Identificamos la barra más larga y la más corta.'},{math:'\\text{Razón: }8:3', expl:'La razón entre la mayor y la menor es 8:3.'}],
    th: 'Conceptos: razones, diagramas de barras, comparación. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 25',
    year: 2021,
  },
];

const folletoFiguresBlock = [
  // Items 37-50: figure-based geometry & pattern recognition items
  {
    topic: 'tec-matematica',
    q: 'Considere un rectángulo de 6 cm de largo y 4 cm de ancho. Dentro de él se dibuja el triángulo más grande posible usando la base del rectángulo y el punto medio del lado opuesto. ¿Cuál es el área del triángulo?',
    l: '',
    o: ['12 cm²', '24 cm²', '6 cm²', '18 cm²'],
    s: [{math:'A_\\triangle = \\frac{b\\times h}{2}', expl:'Fórmula del área del triángulo.'},{math:'\\text{Base}=6,\\ \\text{Altura}=4', expl:'La base es el largo del rectángulo, la altura es el ancho.'},{math:'\\frac{6\\times4}{2}=12\\text{ cm}^2', expl:'El área del triángulo es 12 cm².'}],
    th: 'Conceptos: área de triángulo, figuras dentro de rectángulos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 37',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Una figura está formada por 3 cuadrados iguales colocados uno al lado del otro. Si el perímetro total de la figura es 32 cm, ¿cuánto mide el lado de cada cuadrado?',
    l: '',
    o: ['4 cm', '3 cm', '5 cm', '6 cm'],
    s: [{math:'\\text{3 cuadrados juntos: }8\\text{ lados visibles}', expl:'La figura tiene 3×4 lados pero los lados de unión no cuentan en el perímetro.'},{math:'8l=32\\Rightarrow l=4', expl:'8 lados × lado = 32 cm. Cada lado mide 4 cm.'}],
    th: 'Conceptos: perímetro de figuras compuestas, cuadrados. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 38',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Dos circunferencias del mismo radio R se cortan de modo que sus centros están a distancia R. ¿Cuál es la longitud del arco común?',
    l: '',
    o: ['2πR/3', 'πR/3', 'πR/2', 'πR'],
    s: [{math:'\\text{Triángulo equilátero entre centros y puntos de corte}', expl:'Los radios forman triángulos equiláteros.'},{math:'\\text{Ángulo central}=120^\\circ=\\frac{2\\pi}{3}', expl:'El ángulo del arco común mide 120°.'},{math:'\\text{Arco}=\\frac{2\\pi}{3}R', expl:'Longitud del arco común.'}],
    th: 'Conceptos: circunferencias secantes, arco, ángulo central. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 39',
    year: 2021,
  },
  {
    topic: 'tec-logica',
    q: 'La siguiente figura muestra 4 cuadrados concéntricos. Si se prolongan las diagonales, se forman 8 triángulos iguales dentro del cuadrado más pequeño. ¿Cuántos triángulos hay en total en la figura?',
    l: '',
    o: ['8', '16', '24', '32'],
    s: [{math:'\\text{Cada cuadrado se divide en 4 triángulos por las diagonales}', expl:'Las diagonales dividen cada cuadrado en 4.'},{math:'4\\text{ cuadrados}\\times4=16', expl:'Cuatro cuadrados × 4 triángulos cada uno = 16.'}],
    th: 'Conceptos: figuras concéntricas, división por diagonales, conteo. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'folleto_guia_2021_final.pdf | ítem 40',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'En el plano cartesiano, se dibujan los puntos A(1,2), B(5,2), C(5,5) y D(1,5) y se unen en ese orden. ¿Cuántas unidades cuadradas mide el área de la figura formada?',
    l: '',
    o: ['12', '9', '16', '20'],
    s: [{math:'\\text{Figura: rectángulo}', expl:'Los puntos forman un rectángulo.'},{math:'\\text{Base: }5-1=4,\\ \\text{Altura: }5-2=3', expl:'Diferencia en x y en y.'},{math:'4\\times3=12', expl:'Área del rectángulo.'}],
    th: 'Conceptos: plano cartesiano, área de rectángulo, coordenadas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 41',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Un prisma rectangular tiene 10 cm de largo, 4 cm de ancho y 6 cm de alto. ¿Cuál es su volumen?',
    l: 'V=l\\times a\\times h',
    o: ['240 cm³', '200 cm³', '120 cm³', '60 cm³'],
    s: [{math:'V=10\\times4\\times6', expl:'Volumen = largo × ancho × alto.'},{math:'V=240\\text{ cm}^3', expl:'El volumen del prisma es 240 cm³.'}],
    th: 'Conceptos: volumen de prisma rectangular, dimensiones. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 42',
    year: 2021,
  },
  {
    topic: 'tec-logica',
    q: 'Cuatro personas están sentadas alrededor de una mesa cuadrada, una en cada lado. Ana está a la izquierda de Beto. Carlos está enfrente de Ana. Si Dora está a la derecha de Carlos, ¿quién está enfrente de Beto?',
    l: '',
    o: ['Carlos', 'Dora', 'Ana', 'No se puede determinar'],
    s: [{math:'\\text{Mesa: Ana, Beto, Carlos, Dora en orden}', expl:'Orden alrededor de la mesa: Ana, Beto (derecha), Carlos (enfrente Ana), Dora (derecha Carlos).'},{math:'\\text{Beto → enfrente → Dora}', expl:'Dora está enfrente de Beto.'},{math:'\\text{Dora}', expl:'Dora está enfrente de Beto.'}],
    th: 'Conceptos: ordenamiento espacial, alrededor de una mesa, posiciones relativas. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'folleto_guia_2021_final.pdf | ítem 43',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Un cuadrado se divide en 4 rectángulos iguales trazando una línea horizontal por la mitad. Cada rectángulo tiene un perímetro de 18 cm. ¿Cuál es el perímetro del cuadrado original?',
    l: '',
    o: ['24 cm', '36 cm', '30 cm', '48 cm'],
    s: [{math:'\\text{Rectángulo: }2(l+a)=18\\Rightarrow l+a=9', expl:'Perímetro del rectángulo = 18, entonces semiperímetro = 9.'},{math:'l=2a\\text{ (por la división)}', expl:'El largo del rectángulo es el doble del ancho.'},{math:'2a+a=9\\Rightarrow a=3,\\ l=6', expl:'Ancho=3, Largo=6. El cuadrado original mide 6×6.'},{math:'P=4\\times6=24\\text{ cm}', expl:'Perímetro del cuadrado original.'}],
    th: 'Conceptos: perímetro, división de figuras, rectángulos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 44',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Considere la siguiente figura compuesta: un rectángulo de 8×5 cm con un semicírculo en uno de sus lados menores. ¿Cuál es el perímetro total aproximado? (Use π≈3.14)',
    l: '',
    o: ['34.85 cm', '31.4 cm', '36.7 cm', '29.85 cm'],
    s: [{math:'\\text{Rectángulo: }2(8+5)=26', expl:'Perímetro del rectángulo completo.'},{math:'\\text{Semicírculo: }\\frac{2\\pi(2.5)}{2}=7.85', expl:'El semicírculo tiene radio 2.5 cm. Circunferencia media = πr.'},{math:'26-5+7.85=28.85\\text{ cm}', expl:'Restamos el lado donde va el semicírculo y sumamos el arco.'}],
    th: 'Conceptos: perímetro de figuras compuestas, semicírculo. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 45',
    year: 2021,
  },
  {
    topic: 'tec-logica',
    q: 'En un patrón de fichas de dominó, se muestran las siguientes fichas: [3|1], [1|4], [4|2], [2|5]. ¿Cuál ficha continúa la secuencia?',
    l: '',
    o: ['[5|3]', '[5|2]', '[3|5]', '[6|3]'],
    s: [{math:'\\text{Primeros números: }3,1,4,2,\\ldots', expl:'Alternan: -2, +3, -2, +3,... El próximo primer número: 2+3=5.'},{math:'\\text{Segundos números: }1,4,2,5,\\ldots', expl:'Alternan: +3, -2, +3, -2,... El próximo segundo número: 5-2=3.'},{math:'[5|3]', expl:'La siguiente ficha es [5|3].'}],
    th: 'Conceptos: secuencias en fichas de dominó, patrones alternados. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'folleto_guia_2021_final.pdf | ítem 46',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Un triángulo equilátero y un cuadrado tienen el mismo perímetro. Si el lado del cuadrado mide 6 cm, ¿cuánto mide el lado del triángulo?',
    l: '',
    o: ['8 cm', '9 cm', '6 cm', '12 cm'],
    s: [{math:'P_\\square=4\\times6=24\\text{ cm}', expl:'Perímetro del cuadrado.'},{math:'P_\\triangle=3l=24', expl:'El triángulo equilátero tiene 3 lados iguales.'},{math:'l=8\\text{ cm}', expl:'Cada lado del triángulo mide 8 cm.'}],
    th: 'Conceptos: perímetro de polígonos, igualdad de perímetros. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 47',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Las siguientes figuras forman una secuencia: Figura 1: un cuadrado partido por la diagonal en 2 triángulos. Figura 2: el mismo cuadrado partido en 4 triángulos (2 diagonales). Figura 3: partido en 8 triángulos. ¿En cuántos triángulos está dividido en la Figura 5?',
    l: '',
    o: ['32', '16', '24', '64'],
    s: [{math:'2,4,8,\\ldots', expl:'Cada figura duplica la cantidad de triángulos: 2,4,8,16,32.'},{math:'\\text{Figura 5: }2^5=32', expl:'La Figura 5 tiene 32 triángulos.'}],
    th: 'Conceptos: progresión geométrica, secuencia de figuras, duplicación. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 48',
    year: 2021,
  },
  {
    topic: 'tec-logica',
    q: 'Se muestra un tablero de 3×3 con algunos números: Primera fila: 2, _, 6. Segunda fila: _, 5, _. Tercera fila: 8, _, 4. Si la suma de cada fila, columna y diagonal es la misma, ¿cuál número falta en el centro?',
    l: '\\begin{matrix}2&?&6\\\\?&5&?\\\\8&?&4\\end{matrix}',
    o: ['4', '5', '3', '6'],
    s: [{math:'2+5+8=15', expl:'Diagonal principal: 2+5+8=15. La suma mágica es 15.'},{math:'8+?+4=15\\Rightarrow ?=3', expl:'Posición central derecha: 8+?+4=15, entonces ?=3.'},{math:'6+5+?=15\\Rightarrow ?=4', expl:'Diagonal secundaria: 6+5+?=15, entonces ?=4.'},{math:'\\text{El centro ya es }5', expl:'El centro ya está dado como 5.'}],
    th: 'Conceptos: cuadrados mágicos, sumas constantes, deducción. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'folleto_guia_2021_final.pdf | ítem 49',
    year: 2021,
  },
  {
    topic: 'tec-matematica',
    q: 'Un rectángulo tiene vértices en (1,1), (6,1), (6,4) y (1,4). Si se aplica una traslación que mueve el punto (1,1) a (3,2), ¿cuáles son las nuevas coordenadas del vértice (6,4)?',
    l: '',
    o: ['(8,5)', '(7,5)', '(8,4)', '(7,6)'],
    s: [{math:'\\text{Vector de traslación: }(3-1,\\ 2-1)=(2,1)', expl:'El vector traslada (1,1) a (3,2): suma (2,1).'},{math:'(6+2,\\ 4+1)=(8,5)', expl:'Aplicamos el mismo vector al vértice (6,4).'},{math:'(8,5)', expl:'Las nuevas coordenadas son (8,5).'}],
    th: 'Conceptos: traslación en el plano cartesiano, vectores. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'folleto_guia_2021_final.pdf | ítem 50',
    year: 2021,
  },
];

const digitalLibroMissing = [
  // digital-libro: verbal items 1-3
  {
    topic: 'tec-verbal',
    q: 'Según un texto introductorio sobre tecnología: "La tecnología ha transformado la manera en que nos comunicamos, permitiendo una conexión instantánea con personas de todo el mundo." ¿Cuál es la idea principal del texto?',
    l: '',
    o: ['La tecnología ha revolucionado la comunicación global', 'La tecnología dificulta la comunicación', 'La comunicación instantánea es innecesaria', 'La tecnología solo conecta personas cercanas'],
    s: [{math:'\\text{conexión instantánea con todo el mundo}', expl:'El texto describe cómo la tecnología facilita la comunicación global.'},{math:'\\text{La tecnología ha revolucionado la comunicación global}', expl:'La idea principal es el impacto transformador de la tecnología en la comunicación.'}],
    th: 'Conceptos: idea principal, comprensión lectora. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 1',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    q: 'En un texto sobre educación se afirma: "La educación no es llenar un cubo, sino encender un fuego." (W.B. Yeats). De esta metáfora se infiere que la educación debe',
    l: '',
    o: ['Transmitir información de manera eficiente', 'Inspirar y despertar curiosidad en los estudiantes', 'Medir el conocimiento mediante exámenes', 'Ser estricta y disciplinada'],
    s: [{math:'\\text{encender un fuego = inspirar, despertar pasión}', expl:'Encender un fuego simboliza inspirar, no solo transmitir datos.'},{math:'\\text{Inspirar y despertar curiosidad}', expl:'La educación debe motivar el deseo de aprender.'}],
    th: 'Conceptos: metáfora, inferencia, propósito educativo. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 2',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    q: 'Según un texto sobre trabajo en equipo: "Ninguno de nosotros es tan inteligente como todos nosotros juntos." (Ken Blanchard). ¿Cuál es la enseñanza de esta frase?',
    l: '',
    o: ['El trabajo individual es más efectivo', 'La colaboración genera mejores resultados', 'Los grupos siempre toman malas decisiones', 'La inteligencia es individual'],
    s: [{math:'\\text{todos nosotros juntos > ninguno solo}', expl:'El trabajo colectivo supera la capacidad individual.'},{math:'\\text{La colaboración genera mejores resultados}', expl:'La enseñanza es que el trabajo en equipo potencia los resultados.'}],
    th: 'Conceptos: inferencia, frase célebre, síntesis. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | verbal ítem 3',
    year: 2024,
  },
  // More figure-based math items
  {
    topic: 'tec-matematica',
    q: 'Considere una recta numérica donde se marcan los puntos A=-3, B=0, C=2 y D=5. ¿Cuál es la distancia entre A y D?',
    l: '',
    o: ['8', '7', '5', '9'],
    s: [{math:'\\text{Distancia}=|5-(-3)|=|5+3|=8', expl:'La distancia entre dos puntos en la recta numérica es el valor absoluto de su diferencia.'},{math:'8', expl:'La distancia entre A y D es 8 unidades.'}],
    th: 'Conceptos: recta numérica, distancia, valor absoluto. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 7',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    q: 'En un gráfico de sectores circulares, el sector A ocupa 90°, el sector B ocupa 120° y el sector C ocupa el resto. Si el total de personas encuestadas fue 180, ¿cuántas personas corresponden al sector C?',
    l: '',
    o: ['75', '60', '90', '45'],
    s: [{math:'\\text{Sector C: }360^\\circ-90^\\circ-120^\\circ=150^\\circ', expl:'El sector C ocupa 150°.'},{math:'\\frac{150}{360}\\times180=75', expl:'Proporción de 150° sobre 360° aplicada a 180 personas.'},{math:'75\\text{ personas}', expl:'El sector C corresponde a 75 personas.'}],
    th: 'Conceptos: gráfico circular, proporción, ángulos. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 8',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    q: 'En un sistema de ejes coordenados, se dibuja una recta que pasa por los puntos (0,2) y (4,0). ¿Cuál es la ecuación de esta recta?',
    l: '',
    o: ['y = -x/2 + 2', 'y = -2x + 2', 'y = x/2 - 2', 'y = -x + 2'],
    s: [{math:'m=\\frac{0-2}{4-0}=-\\frac{1}{2}', expl:'Pendiente entre los puntos dados.'},{math:'y-2=-\\frac{1}{2}(x-0)', expl:'Forma punto-pendiente.'},{math:'y=-\\frac{x}{2}+2', expl:'Ecuación de la recta.'}],
    th: 'Conceptos: ecuación de recta, pendiente, intersecciones. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 9',
    year: 2024,
  },
  {
    topic: 'tec-logica',
    q: 'Se muestra un diagrama de Venn con tres conjuntos A, B y C. La región de A tiene 5 elementos, B tiene 5, C tiene 5, y las intersecciones A∩B=3, A∩C=2, B∩C=2, A∩B∩C=1. ¿Cuántos elementos hay en total?',
    l: '',
    o: ['10', '9', '12', '11'],
    s: [{math:'\\text{Solo A: }5-3-2+1=1', expl:'Elementos solo en A.'},{math:'\\text{Solo B: }5-3-2+1=1', expl:'Elementos solo en B.'},{math:'\\text{Solo C: }5-2-2+1=2', expl:'Elementos solo en C.'},{math:'1+1+2+3+2+2-1=10', expl:'Sumando todos los elementos de cada región.'}],
    th: 'Conceptos: diagramas de Venn, cardinalidad de conjuntos, inclusión-exclusión. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 10',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    q: 'Se muestra un cuadrado de lado 10 cm. Se traza un círculo inscrito que toca los cuatro lados. ¿Cuál es el área de la región del cuadrado que NO está dentro del círculo? (Use π≈3.14)',
    l: '',
    o: ['21.5 cm²', '78.5 cm²', '25 cm²', '50 cm²'],
    s: [{math:'A_\\square=100\\text{ cm}^2', expl:'Área del cuadrado.'},{math:'A_\\circ=\\pi(5)^2=78.5\\text{ cm}^2', expl:'Círculo inscrito tiene radio 5 cm.'},{math:'100-78.5=21.5\\text{ cm}^2', expl:'Diferencia: área fuera del círculo.'}],
    th: 'Conceptos: círculo inscrito en cuadrado, áreas. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 11',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    q: 'La siguiente tabla muestra la distancia recorrida (km) por un automóvil en función del tiempo (horas): (1h,80km), (2h,160km), (3h,240km). ¿Cuál es la velocidad constante del automóvil?',
    l: '',
    o: ['80 km/h', '60 km/h', '100 km/h', '40 km/h'],
    s: [{math:'v=\\frac{80\\text{ km}}{1\\text{ h}}=80\\text{ km/h}', expl:'Velocidad = distancia / tiempo.'},{math:'\\text{Verificación: }2\\text{ h}:160\\text{ km}=80\\text{ km/h}', expl:'Se mantiene constante en todos los puntos.'}],
    th: 'Conceptos: velocidad constante, tabla de valores, razón de cambio. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 12',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    q: 'Un cubo tiene una diagonal de cara que mide 7√2 cm. ¿Cuál es el volumen del cubo?',
    l: 'd_\\text{cara}=7\\sqrt{2}\\text{ cm}',
    o: ['343 cm³', '196 cm³', '98 cm³', '49 cm³'],
    s: [{math:'d_\\text{cara}=l\\sqrt{2}=7\\sqrt{2}\\Rightarrow l=7', expl:'La diagonal de una cara del cubo es lado × √2.'},{math:'V=l^3=7^3=343\\text{ cm}^3', expl:'Volumen del cubo.'}],
    th: 'Conceptos: diagonal de cara de cubo, volumen, geometría espacial. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'digital-libro_examen_de_admision-2024-1.pdf | ítem figura 13',
    year: 2024,
  },
];

const exercises = [...folletoItems, ...folletoFiguresBlock, ...digitalLibroMissing];
const categoryVal = category;

async function insertExercise(item) {
  const existing = await pool.query(
    'SELECT id FROM exercises WHERE topic_id = $1 AND source = $2 AND question = $3 LIMIT 1',
    [item.topic, item.source, item.q]
  );
  if (existing.rows.length) return 'skipped';

  await pool.query(
    `INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory,difficulty,category,exam_year,source,imagen)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
    [
      item.topic, item.q, item.l || null,
      JSON.stringify(item.o), JSON.stringify(item.s),
      item.th, 'basico', categoryVal,
      item.year || null, item.source, 'PENDIENTE'
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
    process.stdout.write(`\r  → ${summary.inserted} insertados, ${summary.skipped} omitidos`);
  }
  console.log('\n' + JSON.stringify(summary, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); }).finally(() => pool.end());
