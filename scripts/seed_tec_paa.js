const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathmaty',
  password: 'Calg.1984',
  port: 5432,
});

const category = 'tec_paa';

const knowledge = [
  {
    topic: 'tec-logica',
    title: 'TEC/PAA Lógica: Premisas, Certeza y Patrones',
    order: 30,
    content: `<div class="kb-article">
<h2>Cómo leer una pregunta de lógica PAA</h2>
<p>Una pregunta de lógica no se resuelve por intuición, sino por lo que se puede afirmar con certeza a partir de los datos.</p>
<h3>Pasos base</h3>
<div class="kb-pasos"><ol><li>Identifica las premisas.</li><li>Separa hechos, condiciones y restricciones.</li><li>Construye casos posibles si hay combinaciones.</li><li>Descarta opciones que agregan información no garantizada.</li><li>Marca solo lo que se cumple en todos los escenarios válidos.</li></ol></div>
<div class="kb-box"><strong>Idea clave:</strong> en admisión TEC, "se sigue que" significa "se puede concluir necesariamente".</div>
<h3>Patrones</h3>
<p>En secuencias, analiza por separado numeradores, denominadores, posiciones, figuras o relaciones. No mezcles patrones antes de confirmar qué cambia y qué permanece.</p>
</div>`,
    examples: [
      { problema: 'Todos los A son B. Algunos C son A. ¿Qué se concluye?', solucion: 'Algunos C son B. Es lo único garantizado.' },
      { problema: 'Dos objetos son verdes y uno rojo; X y Y son distintos.', solucion: 'Z debe ser verde, porque el rojo está entre X y Y.' },
    ],
    tips: 'No elijas una opción porque "podría pasar"; elige la que debe pasar. Si una opción falla en un solo escenario válido, no es conclusión.',
  },
  {
    topic: 'tec-matematica',
    title: 'TEC/PAA Matemática: Estrategia sin Calculadora',
    order: 31,
    content: `<div class="kb-article">
<h2>Razonamiento matemático de admisión</h2>
<p>La PAA mide estrategia: convertir datos, detectar patrones, contar casos y operar con números básicos sin calculadora.</p>
<h3>Herramientas frecuentes</h3>
<ul><li>Conteo por etapas: multiplica decisiones independientes.</li><li>Sumas de referencia: 1+2+...+n = n(n+1)/2.</li><li>Proporciones: razón parte-total y regla de tres.</li><li>Redondeo: mira el primer dígito eliminado.</li><li>Fracciones y decimales: convierte al formato que facilite comparar.</li></ul>
<div class="kb-box"><strong>Rutina recomendada:</strong> escribe lo dado, transforma a una forma común, resuelve y verifica contra las opciones.</div>
</div>`,
    examples: [
      { problema: 'Redondea 0,428571 a milésima.', solucion: 'La cuarta cifra decimal es 5, entonces 0,428 sube a 0,429.' },
      { problema: '¿Cuántos números pares de tres cifras se forman con 5, 2 y 4 permitiendo repetición?', solucion: 'Unidad: 2 opciones. Centena y decena: 3 opciones cada una. Total 3·3·2 = 18.' },
    ],
    tips: 'Si hay opciones, úsalas como verificación, no como sustituto del razonamiento. En conteo, define primero si se permite repetir.',
  },
  {
    topic: 'tec-verbal',
    title: 'TEC/PAA Verbal: Contexto, Inferencia y Coherencia',
    order: 32,
    content: `<div class="kb-article">
<h2>Cómo resolver verbal</h2>
<p>El área verbal exige leer pistas internas del texto. La respuesta correcta debe encajar con el contexto, no solo sonar parecida.</p>
<h3>Tipos comunes</h3>
<ul><li>Sinónimos en contexto: cambia la palabra y revisa si conserva el sentido.</li><li>Inferencias: concluye solo lo que el texto permite.</li><li>Completar párrafos: revisa coherencia gramatical y semántica.</li><li>Síntesis: busca la idea que engloba todas las pistas.</li></ul>
<div class="kb-box"><strong>Idea clave:</strong> primero define la intención del texto; luego compara opciones.</div>
</div>`,
    examples: [
      { problema: 'Si el texto habla de algo que cautiva y atrapa, ¿qué palabra resume mejor?', solucion: 'Seductora, porque integra atracción y cautiverio.' },
      { problema: 'Si una frase indica que la vida ocurre solo una vez, ¿qué se infiere?', solucion: 'Que la vida humana es una experiencia irrepetible.' },
    ],
    tips: 'Evita respuestas extremas si el texto es moderado. Una sola palabra fuera de contexto puede volver falsa una opción.',
  },
];

const exercises = [
  {
    topic: 'tec-logica',
    question: 'Si mi prima es hija de la hermana de mi madre, ¿qué relación tiene conmigo la abuelita materna de la hija de mi prima?',
    latex: '',
    options: ['Tía', 'Prima', 'Madre', 'Abuela'],
    steps: [
      { math: '\\text{Prima = hija de la hermana de mi madre}', expl: 'La hermana de mi madre es mi tía; por tanto, mi prima es hija de mi tía.' },
      { math: '\\text{Hija de mi prima}', expl: 'La abuelita materna de esa hija es la madre de mi prima.' },
      { math: '\\text{Madre de mi prima = mi tía}', expl: 'La madre de mi prima es la hermana de mi madre. La respuesta correcta es tía.' },
    ],
    theory: 'Conceptos: árbol familiar, relación materna, sustitución de relaciones. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 5 | ítem 1',
    year: 2022,
  },
  {
    topic: 'tec-matematica',
    question: 'Considere la secuencia: 1/(n² + 1), 3/(n⁴ + 2), 5/(n⁶ + 3). ¿Cuál expresión continúa?',
    latex: '\\frac{1}{n^2+1},\\ \\frac{3}{n^4+2},\\ \\frac{5}{n^6+3}',
    options: ['7/(n⁸ + 4)', '7/(n⁸ + 3)', '6/(n⁸ + 3)', '7/(n⁸ + 5)'],
    steps: [
      { math: '1,3,5,\\ldots', expl: 'El numerador aumenta de 2 en 2: 1, 3, 5; el siguiente es 7.' },
      { math: 'n^2,n^4,n^6,\\ldots', expl: 'El exponente de n aumenta de 2 en 2: 2, 4, 6; el siguiente es 8.' },
      { math: '1,2,3,\\ldots', expl: 'El término sumado al denominador aumenta de 1 en 1; el siguiente es 4.' },
      { math: '\\frac{7}{n^8+4}', expl: 'Se combinan los tres patrones. La expresión que continúa es 7/(n⁸ + 4).' },
    ],
    theory: 'Conceptos: secuencias, patrones independientes, numerador y denominador. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 6 | ítem 2',
    year: 2022,
  },
  {
    topic: 'tec-logica',
    question: 'Premisa 1: Todos los ciervos tienen cuernos. Premisa 2: Algunos rumiantes son ciervos. ¿Qué se sigue?',
    latex: '',
    options: ['Algunos rumiantes tienen cuernos', 'Algunos ciervos no son rumiantes', 'Todos los rumiantes tienen cuernos', 'Algunos rumiantes no tienen cuernos'],
    steps: [
      { math: '\\text{Ciervos} \\Rightarrow \\text{cuernos}', expl: 'La primera premisa garantiza que cada ciervo pertenece al grupo de animales con cuernos.' },
      { math: '\\text{Algunos rumiantes son ciervos}', expl: 'La segunda premisa une una parte de los rumiantes con los ciervos.' },
      { math: '\\text{Algunos rumiantes} \\Rightarrow \\text{cuernos}', expl: 'Solo esa parte de rumiantes que son ciervos queda garantizada con cuernos.' },
    ],
    theory: 'Conceptos: silogismos, cuantificadores, algunos/todos, conclusión necesaria. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 7 | ítem 3',
    year: 2022,
  },
  {
    topic: 'tec-logica',
    question: 'Premisas: Si V lee, entonces L dibuja o J salta. Si L dibuja, entonces P no corre. L no dibuja y J no salta. ¿Qué se concluye?',
    latex: '',
    options: ['V no lee', 'V lee', 'P corre', 'P no corre'],
    steps: [
      { math: 'V \\Rightarrow (L \\lor J)', expl: 'La primera premisa dice que leer obliga a que ocurra al menos una de dos cosas: L dibuja o J salta.' },
      { math: '\\neg L \\land \\neg J', expl: 'La tercera premisa niega ambas posibilidades del consecuente.' },
      { math: '\\neg(L \\lor J) \\Rightarrow \\neg V', expl: 'Por contraposición, si no ocurre L ni J, entonces V no lee.' },
      { math: '\\text{P no queda determinado}', expl: 'La premisa sobre P depende de que L dibuje; como L no dibuja, no permite concluir si P corre o no.' },
    ],
    theory: 'Conceptos: condicional, disyunción, negación, contraposición. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 8 | ítem 4',
    year: 2022,
  },
  {
    topic: 'tec-logica',
    question: 'En el patrón tipo triángulo de Pascal, se analizan las afirmaciones A, B y C. ¿Cuáles se cumplen con certeza?',
    latex: '',
    options: ['B y C', 'A y B', 'Solo B', 'Solo C'],
    steps: [
      { math: '\\text{A es falsa}', expl: 'En una fila del triángulo no aparecen necesariamente el número de fila y su consecutivo como afirma A.' },
      { math: '\\text{B es verdadera}', expl: 'El número 2 puede estar rodeado por números impares en el arreglo mostrado.' },
      { math: '\\text{C es verdadera}', expl: 'Al extender filas se verifica que 28 aparece dentro del grupo que rodea al 7.' },
      { math: '\\text{Conclusión: B y C}', expl: 'Solo B y C quedan comprobadas con certeza.' },
    ],
    theory: 'Conceptos: patrón numérico, verificación de afirmaciones, certeza. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | pp. 9-10 | ítem 5',
    year: 2022,
  },
  {
    topic: 'tec-logica',
    question: 'Tres lapiceros X, Y y Z: dos son verdes y uno es rojo. Además, X y Y son de diferente color. ¿Qué proposición se cumple con certeza?',
    latex: '',
    options: ['Z es verde', 'Y es verde', 'X es verde', 'Y y X son verdes'],
    steps: [
      { math: '\\text{Hay dos verdes y un rojo}', expl: 'Solo uno de los tres lapiceros puede ser rojo.' },
      { math: 'X \\neq Y', expl: 'Como X y Y son de diferente color, uno de ellos es rojo y el otro verde.' },
      { math: '\\text{Z no puede ser rojo}', expl: 'El rojo ya está entre X y Y. Por eso Z necesariamente es verde.' },
    ],
    theory: 'Conceptos: casos posibles, certeza, descarte por restricción. Biblioteca sugerida: TEC/PAA Lógica.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 11 | ítem 6',
    year: 2022,
  },
  {
    topic: 'tec-matematica',
    question: 'Aproxime 0,428571 a la milésima.',
    latex: '0.428571',
    options: ['0,429', '0,428', '0,430', '0,42'],
    steps: [
      { math: '0,428\\,571', expl: 'La milésima es la tercera cifra decimal: 8 en 0,428.' },
      { math: '\\text{Siguiente cifra}=5', expl: 'Para redondear se mira la cuarta cifra decimal. Es 5, entonces se aumenta la milésima.' },
      { math: '0,428 \\to 0,429', expl: 'El 8 sube a 9. Resultado: 0,429.' },
    ],
    theory: 'Conceptos: valor posicional, redondeo decimal, milésima. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Prueba Racionalización Parte 1.pdf | p. 1 y p. 4 | ejercicio 1.1',
  },
  {
    topic: 'tec-matematica',
    question: 'Aproxime -3,141592 a la diezmilésima.',
    latex: '-3.141592',
    options: ['-3,1416', '-3,1415', '-3,1420', '-3,1410'],
    steps: [
      { math: '-3,1415\\,92', expl: 'La diezmilésima es la cuarta cifra decimal: 5 en -3,1415.' },
      { math: '\\text{Siguiente cifra}=9', expl: 'La quinta cifra decimal es 9, así que se redondea hacia la centésima de diezmilésima siguiente.' },
      { math: '-3,1415 \\to -3,1416', expl: 'En redondeo usual, la magnitud queda -3,1416.' },
    ],
    theory: 'Conceptos: redondeo con números negativos, valor posicional. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Prueba Racionalización Parte 1.pdf | p. 1 y p. 4 | ejercicio 1.2',
  },
  {
    topic: 'tec-matematica',
    question: 'Clasifique 0,875 como expansión decimal exacta o periódica.',
    latex: '0.875',
    options: ['Exacta', 'Periódica', 'Mixta', 'Irracional'],
    steps: [
      { math: '0,875', expl: 'El número tiene una cantidad finita de cifras decimales.' },
      { math: '\\frac{875}{1000}=\\frac{7}{8}', expl: 'Puede escribirse como fracción con denominador potencia de 10 y simplificarse.' },
      { math: '\\text{Decimal exacta}', expl: 'Como termina, no repite un bloque infinito. Es decimal exacta.' },
    ],
    theory: 'Conceptos: decimal exacto, decimal periódico, fracción decimal. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Prueba Racionalización Parte 1.pdf | p. 1 y p. 4 | ejercicio 2.1',
  },
  {
    topic: 'tec-matematica',
    question: 'Convierta 5/8 a decimal.',
    latex: '\\frac{5}{8}',
    options: ['0,625', '0,58', '0,825', '1,6'],
    steps: [
      { math: '5 \\div 8', expl: 'Para convertir una fracción a decimal, se divide el numerador entre el denominador.' },
      { math: '5 \\div 8 = 0,625', expl: 'Como 8 divide a 1000 exactamente, el decimal termina.' },
      { math: '\\frac{5}{8}=0,625', expl: 'Resultado final: 0,625.' },
    ],
    theory: 'Conceptos: fracción a decimal, división, decimal exacto. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Prueba Racionalización Parte 1.pdf | p. 2 y p. 4 | ejercicio 3.1',
  },
  {
    topic: 'tec-matematica',
    question: 'Convierta -2,75 a fracción impropia y número mixto.',
    latex: '-2.75',
    options: ['-11/4 y -2 3/4', '-9/4 y -2 1/4', '-7/5 y -2 3/5', '-275/10 y -27 5/10'],
    steps: [
      { math: '-2,75=-\\frac{275}{100}', expl: 'Se escribe el decimal sobre 100 porque tiene dos cifras decimales.' },
      { math: '-\\frac{275}{100}=-\\frac{11}{4}', expl: 'Se simplifica dividiendo numerador y denominador entre 25.' },
      { math: '-\\frac{11}{4}= -2\\frac{3}{4}', expl: '11 ÷ 4 da 2 y sobran 3. Como el número es negativo, queda -2 3/4.' },
    ],
    theory: 'Conceptos: decimal a fracción, simplificación, número mixto. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Prueba Racionalización Parte 1.pdf | p. 2 y p. 4 | ejercicio 3.2',
  },
  {
    topic: 'tec-matematica',
    question: '¿Cuántos números pares distintos de tres cifras se pueden formar usando los dígitos 5, 2 y 4, permitiendo repetir dígitos?',
    latex: '',
    options: ['18', '27', '12', '6'],
    steps: [
      { math: '\\text{Unidad par: }2\\text{ opciones}', expl: 'Para que el número sea par, la última cifra debe ser 2 o 4.' },
      { math: '\\text{Centena: }3\\text{ opciones}', expl: 'La primera cifra puede ser 5, 2 o 4.' },
      { math: '\\text{Decena: }3\\text{ opciones}', expl: 'La cifra del medio también puede ser cualquiera de las tres.' },
      { math: '3\\cdot3\\cdot2=18', expl: 'Multiplicamos las decisiones independientes. Se pueden formar 18 números.' },
    ],
    theory: 'Conceptos: conteo por etapas, números pares, principio multiplicativo. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Practica_PAA_2024_2025.pdf | p. 9 y p. 45 | ítem 2',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'Un hombre enumera 12 cajas del 1 al 12. En una caja puso 1 en lugar del número correcto y la suma resultó 71. ¿En cuál caja se equivocó?',
    latex: '1+2+\\cdots+12=78',
    options: ['8', '12', '10', '7'],
    steps: [
      { math: '\\frac{12\\cdot13}{2}=78', expl: 'La suma correcta de 1 a 12 es 78.' },
      { math: '78-71=7', expl: 'La suma bajó 7 unidades por cambiar un número por 1.' },
      { math: 'x-1=7', expl: 'Si el número correcto era x y se escribió 1, la pérdida fue x - 1.' },
      { math: 'x=8', expl: 'La caja correcta era la número 8.' },
    ],
    theory: 'Conceptos: suma consecutiva, diferencia, ecuación simple. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Practica_PAA_2024_2025.pdf | p. 10 y p. 45 | ítem 3',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'En 5 partidos de fútbol un equipo tiene 2 goles en contra. Si ganó los 5 partidos, ¿cuántos goles a favor debe tener como mínimo?',
    latex: '',
    options: ['7', '5', '6', '8'],
    steps: [
      { math: '\\text{Cada victoria exige ventaja mínima de 1}', expl: 'Para ganar un partido, los goles a favor deben superar los goles en contra de ese partido.' },
      { math: '\\text{Tres partidos sin goles en contra} \\Rightarrow 3\\text{ goles}', expl: 'En partidos 1-0 se necesita al menos un gol por victoria.' },
      { math: '\\text{Dos goles en contra repartidos} \\Rightarrow 4\\text{ goles}', expl: 'Si en dos partidos recibe un gol, gana mínimo 2-1 cada uno: dos goles a favor por partido.' },
      { math: '3+4=7', expl: 'El mínimo total de goles a favor es 7.' },
    ],
    theory: 'Conceptos: mínimo, desigualdad por caso, interpretación deportiva. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Practica_PAA_2024_2025.pdf | p. 10 y p. 45 | ítem 4',
    year: 2024,
  },
  {
    topic: 'tec-matematica',
    question: 'En un pueblo hay una mujer por cada dos hombres y tres niños por cada hombre. Si hay 50 hombres, ¿cuántas personas hay en total?',
    latex: '',
    options: ['225', '125', '175', '250'],
    steps: [
      { math: '50\\text{ hombres}', expl: 'Tomamos los 50 hombres como dato base.' },
      { math: '\\frac{1\\text{ mujer}}{2\\text{ hombres}}\\Rightarrow 25\\text{ mujeres}', expl: 'Una mujer por cada dos hombres: 50 ÷ 2 = 25.' },
      { math: '3\\text{ niños por hombre}\\Rightarrow150\\text{ niños}', expl: 'Tres niños por cada hombre: 3 · 50 = 150.' },
      { math: '50+25+150=225', expl: 'Total de personas: hombres + mujeres + niños = 225.' },
    ],
    theory: 'Conceptos: razón, proporción, total por categorías. Biblioteca sugerida: TEC/PAA Matemática.',
    source: 'Practica_PAA_2024_2025.pdf | p. 10 y p. 45 | ítem 5',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'Según el texto, ¿cuáles palabras son equivalentes a “paradójico” y “trascendencia”?',
    latex: '',
    options: ['absurdo - importancia', 'controversial - eficacia', 'incomprensible - necesidad', 'cuestionable - consecuencia'],
    steps: [
      { math: '\\text{paradójico}', expl: 'En el contexto, algo paradójico parece contradictorio o sin sentido; por eso se aproxima a absurdo.' },
      { math: '\\text{trascendencia}', expl: 'La palabra trascendencia apunta a relevancia o importancia.' },
      { math: '\\text{absurdo - importancia}', expl: 'Es la única pareja que conserva el sentido de ambas palabras dentro del texto.' },
    ],
    theory: 'Conceptos: sinonimia contextual, vocabulario, pistas semánticas. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 58 | verbal ítem 1',
    year: 2022,
  },
  {
    topic: 'tec-verbal',
    question: 'Según el texto sobre la televisión, ¿cuál palabra resume mejor su efecto?',
    latex: '',
    options: ['Seductora', 'Nociva', 'Ilusoria', 'Atractiva'],
    steps: [
      { math: '\\text{Pistas: tantaliza, prendados, mágico}', expl: 'El texto presenta un efecto de atracción intensa, casi hipnótica.' },
      { math: '\\text{seducir = cautivar}', expl: 'Seductora resume la idea de atraer y atrapar.' },
      { math: '\\text{Respuesta: Seductora}', expl: 'Nociva o ilusoria agregan ideas que el texto no necesita; atractiva es más débil.' },
    ],
    theory: 'Conceptos: síntesis semántica, palabra que engloba, lectura contextual. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 59 | verbal ítem 2',
    year: 2022,
  },
  {
    topic: 'tec-verbal',
    question: 'En el texto sobre el latín y Roma, ¿cuáles palabras completan el párrafo con sentido lógico?',
    latex: '',
    options: ['rústica - expandirse', 'antigua - dividirse', 'exótica - distribuirse', 'arcaica - transmitirse'],
    steps: [
      { math: '\\text{pastores, campesinos, soldados rudos}', expl: 'Esas pistas describen un habla sencilla o poco refinada: rústica.' },
      { math: '\\text{victoria tras victoria}', expl: 'Las conquistas permiten que el idioma se extienda fuera de su lugar inicial.' },
      { math: '\\text{rústica - expandirse}', expl: 'Ambas palabras mantienen coherencia con el contexto completo.' },
    ],
    theory: 'Conceptos: coherencia textual, completar párrafo, campo semántico. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 60 | verbal ítem 3',
    year: 2022,
  },
  {
    topic: 'tec-verbal',
    question: 'Según el texto “Disculpen esta impericia... No soy escritor”, ¿cuál palabra equivale a “impericia”?',
    latex: '',
    options: ['Incompetencia', 'Desorden', 'Accidente', 'Negligencia'],
    steps: [
      { math: '\\text{No soy escritor}', expl: 'La pista indica falta de habilidad para escribir.' },
      { math: '\\text{impericia = falta de destreza}', expl: 'Impericia se relaciona con no dominar una actividad.' },
      { math: '\\text{Respuesta: Incompetencia}', expl: 'Incompetencia es la opción más cercana al sentido contextual.' },
    ],
    theory: 'Conceptos: vocabulario en contexto, sinónimo, pista textual. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'cuaderno_de_ejercicios_para_la_paa.pdf | p. 64 | verbal ítem 7',
    year: 2022,
  },
  {
    topic: 'tec-verbal',
    question: '“La vida humana acontece solo una vez...” En esta frase se evidencia que la vida humana...',
    latex: '',
    options: ['es una experiencia irrepetible', 'es frágil e imperfecta', 'consiste en tomar decisiones sabias', 'nos dicta cómo debe ser nuestro actuar'],
    steps: [
      { math: '\\text{solo una vez}', expl: 'La frase central indica que la vida no se repite.' },
      { math: '\\text{no podremos averiguar todas las decisiones}', expl: 'La imposibilidad de comparar viene de que no hay segunda oportunidad idéntica.' },
      { math: '\\text{experiencia irrepetible}', expl: 'Esa opción sintetiza la inferencia autorizada por el texto.' },
    ],
    theory: 'Conceptos: inferencia, idea implícita, lectura de frase. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'Practica_PAA_2024_2025.pdf | p. 37 y p. 46 | ítem 67',
    year: 2024,
  },
  {
    topic: 'tec-verbal',
    question: 'En el texto sobre Facebook, ¿cuál contradicción aparece?',
    latex: '',
    options: ['Facebook es una red social; sin embargo, podría separarte del mundo', 'En Facebook se intercambian fotos, pero no videos', 'Facebook permite conversar en realidades tangibles', 'Se intercambian comentarios, pero ninguno es valioso'],
    steps: [
      { math: '\\text{red social}', expl: 'El texto reconoce que Facebook permite conversar y compartir.' },
      { math: '\\text{desconecta del mundo tangible}', expl: 'Luego advierte que puede absorber tiempo y alejar de la convivencia real.' },
      { math: '\\text{contradicción}', expl: 'La tensión es que una red social puede terminar separando del mundo social real.' },
    ],
    theory: 'Conceptos: contradicción textual, idea explícita e implícita, intención del autor. Biblioteca sugerida: TEC/PAA Verbal.',
    source: 'Practica_PAA_2024_2025.pdf | pp. 42-43 y p. 46 | ítem 77',
    year: 2024,
  },
];

async function upsertKnowledge(item) {
  const existing = await pool.query(
    'SELECT id FROM knowledge_library WHERE topic_id = $1 AND titulo = $2 LIMIT 1',
    [item.topic, item.title]
  );
  if (existing.rows.length) {
    await pool.query(
      'UPDATE knowledge_library SET contenido=$1, ejemplos=$2, manas=$3, nivel_desde=$4, nivel_hasta=$5, orden=$6 WHERE id=$7',
      [item.content, JSON.stringify(item.examples), item.tips, 1, 10, item.order, existing.rows[0].id]
    );
    return 'updated';
  }
  await pool.query(
    'INSERT INTO knowledge_library(topic_id,titulo,contenido,ejemplos,manas,nivel_desde,nivel_hasta,orden) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [item.topic, item.title, item.content, JSON.stringify(item.examples), item.tips, 1, 10, item.order]
  );
  return 'inserted';
}

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
      item.difficulty || 'basico',
      category,
      item.year || null,
      item.source,
    ]
  );
  return 'inserted';
}

async function main() {
  const summary = {
    knowledgeInserted: 0,
    knowledgeUpdated: 0,
    exercisesInserted: 0,
    exercisesSkipped: 0,
  };

  for (const item of knowledge) {
    const result = await upsertKnowledge(item);
    if (result === 'inserted') summary.knowledgeInserted++;
    if (result === 'updated') summary.knowledgeUpdated++;
  }

  for (const item of exercises) {
    const result = await insertExercise(item);
    if (result === 'inserted') summary.exercisesInserted++;
    if (result === 'skipped') summary.exercisesSkipped++;
  }

  console.log(JSON.stringify(summary, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
