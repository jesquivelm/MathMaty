-- ============================================================
-- MATHMATY - SEMILLA DE CONOCIMIENTO COMPLETA
-- Contenido masivo y detallado para los 14 temas de Prec�lculo
-- ============================================================
-- Para ejecutar: abrir en pgAdmin4 Query Tool y presionar F5
-- ============================================================

-- Limpiar datos existentes
DELETE FROM knowledge_library;

-- ============================================================
-- 1. TEORIA DE CONJUNTOS
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('conjuntos', 'Teoria de Conjuntos: La Base de Todo',
$$
<div class="kb-article">

<h2>Que es un conjunto?</h2>
<p>Un <strong>conjunto</strong> es una coleccion de objetos llamados <strong>elementos</strong>. Los conjuntos son la base de toda la matematica moderna.</p>

<div class="kb-box">
<strong>Idea clave:</strong> Un conjunto se define por sus elementos. Dos conjuntos son iguales si tienen exactamente los mismos elementos, sin importar el orden.
</div>

<p>Los conjuntos se denotan con <strong>llaves {}</strong> y los elementos se separan por comas.</p>

<div class="kb-ejemplo">
<strong>Ejemplo 1:</strong> A = {1, 2, 3, 4, 5} es el conjunto de los primeros cinco numeros naturales.<br>
<strong>Ejemplo 2:</strong> B = {x | x es una vocal} significa "el conjunto de todas las x tales que x es una vocal".<br>
<strong>Ejemplo 3:</strong> C = {a, e, i, o, u} es el mismo conjunto que B, escrito por extension.
</div>

<h3>Pertinencia: Pertenece o no pertenece</h3>
<p>Usamos el simbolo <strong>&isin;</strong> para decir que un elemento pertenece a un conjunto, y <strong>&notin;</strong> para decir que NO pertenece.</p>

<div class="kb-ejemplo">
<strong>Ejemplo:</strong> Si A = {1, 2, 3, 4, 5}, entonces:<br>
3 &isin; A (3 pertenece a A)<br>
7 &notin; A (7 no pertenece a A)
</div>

<h3>Tipos de conjuntos importantes</h3>
<p>En Prec�lculo del TEC, estos son los conjuntos numericos que debes conocer:</p>

<div class="kb-table">
<table>
<tr><th>Simbolo</th><th>Nombre</th><th>Elementos</th><th>Ejemplo</th></tr>
<tr><td>&#8469;</td><td>Naturales</td><td>{1, 2, 3, 4, ...}</td><td>5 &isin; &#8469;, -3 &notin; &#8469;</td></tr>
<tr><td>&#8484;</td><td>Enteros</td><td>{..., -2, -1, 0, 1, 2, ...}</td><td>-5 &isin; &#8484;, 1/2 &notin; &#8484;</td></tr>
<tr><td>&#8474;</td><td>Racionales</td><td>Fracciones p/q</td><td>1/2 &isin; &#8474;, &pi; &notin; &#8474;</td></tr>
<tr><td>&#120120;</td><td>Irracionales</td><td>Decimales no periodicos</td><td>&pi; &isin; &#120120;, &radic;2 &isin; &#120120;</td></tr>
<tr><td>&#8477;</td><td>Reales</td><td>&#8474; &cup; &#120120;</td><td>Todos los anteriores &isin; &#8477;</td></tr>
</table>
</div>

<h3>Operaciones con conjuntos</h3>

<h4>1. Union (&cup;)</h4>
<p>La union de A y B son TODOS los elementos que estan en A, en B o en ambos.</p>
<div class="kb-ejemplo">
<strong>Ejemplo:</strong> A = {1, 2, 3}, B = {3, 4, 5}<br>
A &cup; B = {1, 2, 3, 4, 5}
</div>

<h4>2. Interseccion (&cap;)</h4>
<p>La interseccion de A y B son SOLO los elementos que estan en AMBOS conjuntos.</p>
<div class="kb-ejemplo">
<strong>Ejemplo:</strong> A = {1, 2, 3}, B = {3, 4, 5}<br>
A &cap; B = {3}
</div>

<h4>3. Diferencia (A - B)</h4>
<p>La diferencia A - B son los elementos que estan en A pero NO en B.</p>
<div class="kb-ejemplo">
<strong>Ejemplo:</strong> A = {1, 2, 3, 4}, B = {3, 4, 5}<br>
A - B = {1, 2}<br>
B - A = {5}
</div>

<h4>4. Complemento (A')</h4>
<p>El complemento de A son todos los elementos del conjunto universal que NO estan en A.</p>
<div class="kb-ejemplo">
<strong>Ejemplo:</strong> Si U = {1, 2, 3, 4, 5, 6} y A = {1, 2, 3}<br>
A' = {4, 5, 6}
</div>

<h3>Propiedades de las operaciones</h3>
<ul>
<li><strong>Conmutativa:</strong> A &cup; B = B &cup; A, A &cap; B = B &cap; A</li>
<li><strong>Asociativa:</strong> (A &cup; B) &cup; C = A &cup; (B &cup; C)</li>
<li><strong>Distributiva:</strong> A &cap; (B &cup; C) = (A &cap; B) &cup; (A &cap; C)</li>
<li><strong>Leyes de Morgan:</strong> (A &cup; B)' = A' &cap; B', (A &cap; B)' = A' &cup; B'</li>
</ul>

<div class="kb-box-warn">
<strong>Error comun:</strong> Confundir &isin; (pertenencia) con &sube; (subconjunto).<br>
&isin; relaciona un ELEMENTO con un CONJUNTO.<br>
&sube; relaciona un CONJUNTO con otro CONJUNTO.
</div>

</div>
$$,
$$[
  {"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A ∪ B", "solucion": "A ∪ B = {1,2,3,4,5,6}"},
  {"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A ∩ B", "solucion": "A ∩ B = {3,4}"},
  {"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A - B", "solucion": "A - B = {1,2}"},
  {"problema": "Si U={1,2,3,4,5,6,7,8}, A={2,4,6,8}, halla A'", "solucion": "A' = {1,3,5,7}"}
]$$,
'El conjunto vacio es subconjunto de TODO conjunto. Para las leyes de Morgan: el complemento de la union es la interseccion de los complementos. La union es como sumar conjuntos, la interseccion como lo comun.',
1, 1);

-- ============================================================
-- 2. NUMEROS REALES
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('numeros-reales', 'Numeros Reales: La Recta Numerica',
$$
<div class="kb-article">

<h2>Que son los numeros reales?</h2>
<p>Los <strong>numeros reales</strong> (&#8477;) son TODOS los numeros que puedes imaginar en la recta numerica. Si puedes ubicarlo en una recta, es un numero real.</p>

<div class="kb-box">
<strong>Idea clave:</strong> Los numeros reales son cualquier numero que tenga sentido en el mundo real. Desde -infinito hasta +infinito, pasando por todos los decimales, fracciones y raices.
</div>

<h3>Clasificacion de los numeros reales</h3>

<div class="kb-table">
<table>
<tr><th>Categoria</th><th>Simbolo</th><th>Ejemplos</th><th>Que son?</th></tr>
<tr><td>Naturales</td><td>&#8469;</td><td>1, 2, 3, 4, 5...</td><td>Los que usas para contar</td></tr>
<tr><td>Enteros</td><td>&#8484;</td><td>..., -3, -2, -1, 0, 1, 2, 3...</td><td>Naturales + negativos + cero</td></tr>
<tr><td>Racionales</td><td>&#8474;</td><td>1/2, -3/4, 0.5, 2.333...</td><td>Fracciones (decimales exactos o periodicos)</td></tr>
<tr><td>Irracionales</td><td>&#120120;</td><td>&pi;, &radic;2, e, &radic;3</td><td>Decimales infinitos NO periodicos</td></tr>
</table>
</div>

<div class="kb-box-warn">
<strong>Atencion:</strong> Un numero decimal puede ser:<br>
&bull; <strong>Exacto:</strong> 0.5, 2.75, 3.1416 (termina)<br>
&bull; <strong>Periodico:</strong> 0.3333..., 0.142857142857... (se repite)<br>
&bull; <strong>No periodico:</strong> 3.1415926535..., 1.41421356... (nunca se repite)<br>
Los primeros dos son RACIONALES. El ultimo es IRRACIONAL.
</div>

<h3>Propiedades fundamentales</h3>

<h4>1. Propiedad Conmutativa</h4>
<p>El orden no afecta el resultado.</p>
<div class="kb-ejemplo">
a + b = b + a &rarr; 3 + 5 = 5 + 3 = 8<br>
a &middot; b = b &middot; a &rarr; 3 &middot; 5 = 5 &middot; 3 = 15
</div>

<h4>2. Propiedad Asociativa</h4>
<p>La forma de agrupar no afecta el resultado.</p>
<div class="kb-ejemplo">
(a + b) + c = a + (b + c) &rarr; (2+3)+4 = 2+(3+4) = 9<br>
(a &middot; b) &middot; c = a &middot; (b &middot; c) &rarr; (2&middot;3)&middot;4 = 2&middot;(3&middot;4) = 24
</div>

<h4>3. Propiedad Distributiva (LA MAS IMPORTANTE)</h4>
<p>Multiplicas cada termino dentro del parentesis.</p>
<div class="kb-ejemplo">
a(b + c) = ab + ac<br>
3(x + 2) = 3x + 6<br>
-2(3x - 1) = -6x + 2 (cuidado con los signos!)<br>
(x + 2)(x + 3) = x&middot;x + x&middot;3 + 2&middot;x + 2&middot;3 = x&sup2; + 5x + 6
</div>

<h4>Jerarquia de operaciones (PEMDAS)</h4>
<ol>
<li><strong>P</strong>arentesis</li>
<li><strong>E</strong>xponentes y raices</li>
<li><strong>M</strong>ultiplicacion y <strong>D</strong>ivision</li>
<li><strong>A</strong>dicion y <strong>S</strong>ustraccion</li>
</ol>

<div class="kb-ejemplo">
<strong>Ejemplo:</strong> 3 + 2 &times; 5&sup2;<br>
Primero exponente: 5&sup2; = 25<br>
Luego multiplicacion: 2 &times; 25 = 50<br>
Final: 3 + 50 = <strong>53</strong>
</div>

</div>
$$,
$$[
  {"problema": "Clasifica: 5, -3, 1/2, √2, π", "solucion": "5 ∈ ℕ,ℤ,ℚ,ℝ | -3 ∈ ℤ,ℚ,ℝ | 1/2 ∈ ℚ,ℝ | √2 ∈ 𝕀,ℝ | π ∈ 𝕀,ℝ"},
  {"problema": "Calcula: 4 + 6 ÷ 2 × 3", "solucion": "6÷2=3, 3×3=9, 4+9=13"},
  {"problema": "Calcula: −3² + (4−1)²", "solucion": "−9 + (3)² = −9 + 9 = 0"}
]$$,
'PEMDAS: primero Parentesis, luego Exponentes, luego Multiplicacion/Division, luego Adicion/Sustraccion. Nunca sumes antes de multiplicar! Cuidado con -3² vs (-3)²: el primero es -9, el segundo es 9.',
1, 2);

-- ============================================================
-- 3. RADICALES Y POTENCIAS
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('radicales', 'Radicales y Potencias: Domina las Raices',
$$
<div class="kb-article">

<h2>Que es un radical?</h2>
<p>Un <strong>radical</strong> (o raiz) es la operacion inversa de la potenciacion.</p>

<div class="kb-box">
<strong>Idea clave:</strong> &supn;&radic;a = b &nbsp;significa&nbsp; b&supn; = a<br>
&radic;16 = 4 porque 4&sup2; = 16<br>
&sup3;&radic;27 = 3 porque 3&sup3; = 27<br>
&sup4;&radic;16 = 2 porque 2&sup4; = 16
</div>

<h3>Partes de un radical</h3>
<ul>
<li><strong>Indice (n):</strong> El numero pequeno arriba a la izquierda. Si no hay, es 2 (raiz cuadrada).</li>
<li><strong>Radicando (a):</strong> Lo que esta dentro de la raiz.</li>
<li><strong>Raiz (b):</strong> El resultado.</li>
</ul>

<h3>Propiedades de los radicales</h3>

<h4>Raiz de un producto</h4>
<div class="kb-ejemplo">
<strong>&supn;&radic;(a &middot; b) = &supn;&radic;a &middot; &supn;&radic;b</strong><br>
&radic;(4 &middot; 9) = &radic;4 &middot; &radic;9 = 2 &middot; 3 = 6
</div>

<h4>Raiz de un cociente</h4>
<div class="kb-ejemplo">
<strong>&supn;&radic;(a/b) = &supn;&radic;a / &supn;&radic;b</strong><br>
&radic;(16/4) = &radic;16 / &radic;4 = 4/2 = 2
</div>

<div class="kb-box-warn">
<strong>CUIDADO! Error mortal en examenes:</strong><br>
&radic;(a + b) <strong>NO</strong> es igual a &radic;a + &radic;b<br>
&radic;(9 + 16) = &radic;25 = 5 pero &radic;9 + &radic;16 = 3 + 4 = 7. 5 &ne; 7!
</div>

<h3>Exponentes fraccionarios</h3>
<div class="kb-table">
<table>
<tr><th>Radical</th><th>Exponente fraccionario</th></tr>
<tr><td>&radic;a</td><td>a&sup1;/&sup2;</td></tr>
<tr><td>&sup3;&radic;a</td><td>a&sup1;/&sup3;</td></tr>
<tr><td>&sup4;&radic;a</td><td>a&sup1;/&sup4;</td></tr>
<tr><td>&supn;&radic;a&supm;</td><td>a&supm;/&supn;</td></tr>
</table>
</div>

<h3>Simplificacion de radicales</h3>
<div class="kb-ejemplo">
<strong>Simplifica &radic;(72):</strong><br>
Paso 1: 72 = 36 &times; 2<br>
Paso 2: &radic;72 = &radic;36 &times; &radic;2 = 6&radic;2
</div>

<h3>Racionalizacion</h3>
<p><strong>Racionalizar</strong> es eliminar los radicales del denominador.</p>

<h4>Caso 1: Denominador con una sola raiz</h4>
<div class="kb-ejemplo">
1/&radic;2 = (1&middot;&radic;2)/(&radic;2&middot;&radic;2) = &radic;2/2
</div>

<h4>Caso 2: Denominador con suma/resta de raices</h4>
<p>Multiplica por el <strong>conjugado</strong>.</p>
<div class="kb-ejemplo">
1/(&radic;3 + 1) = (&radic;3-1)/((&radic;3+1)(&radic;3-1)) = (&radic;3-1)/(3-1) = (&radic;3-1)/2
</div>

</div>
$$,
$$[
  {"problema": "Simplifica: √(50)", "solucion": "√(25×2) = 5√2"},
  {"problema": "Simplifica: ∛(24)", "solucion": "∛(8×3) = 2∛3"},
  {"problema": "Racionaliza: 3/√5", "solucion": "3√5/5"},
  {"problema": "Racionaliza: 1/(√2 - 1)", "solucion": "(√2+1)/(2-1) = √2+1"}
]$$,
'Cuando racionalices, multiplica SIEMPRE numerador y denominador por lo mismo. Para el conjugado: (a+b)(a-b) = a²-b². Recuerda: √(a²) = |a| (valor absoluto). Exponente fraccionario: a^(m/n) = ⁿ√(aᵐ).',
1, 3);

-- ============================================================
-- 4. POLINOMIOS
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('polinomios', 'Polinomios: Operaciones y Propiedades',
$$
<div class="kb-article">

<h2>Que es un polinomio?</h2>
<p>Un <strong>polinomio</strong> es una expresion algebraica formada por la suma de terminos llamados <strong>monomios</strong>.</p>

<div class="kb-box">
<strong>Idea clave:</strong> Asi como 3x&sup2; + 2x - 1 es una expresion, cada parte (3x&sup2;, 2x, -1) es un termino. Los numeros que multiplican a las variables se llaman <strong>coeficientes</strong>.
</div>

<h3>Vocabulario de polinomios</h3>
<ul>
<li><strong>Monomio:</strong> Un solo termino (5x&sup2;, -3y, 7)</li>
<li><strong>Binomio:</strong> Dos terminos (x + 3, 2x&sup2; - 5x)</li>
<li><strong>Trinomio:</strong> Tres terminos (x&sup2; + 5x + 6)</li>
<li><strong>Grado:</strong> El mayor exponente de la variable</li>
<li><strong>Termino independiente:</strong> El termino sin variable</li>
</ul>

<div class="kb-ejemplo">
<strong>Ejemplo:</strong> En 4x&sup3; - 2x&sup2; + 5x - 7:<br>
Coeficientes: 4, -2, 5, -7<br>
Grado: 3<br>
Termino independiente: -7
</div>

<h3>Suma y resta de polinomios</h3>
<p>Solo puedes sumar o restar terminos <strong>semejantes</strong> (misma variable con el mismo exponente).</p>
<div class="kb-ejemplo">
(3x&sup2; + 2x - 1) + (x&sup2; - 4x + 5)<br>
= (3x&sup2; + x&sup2;) + (2x - 4x) + (-1 + 5)<br>
= 4x&sup2; - 2x + 4
</div>

<h3>Multiplicacion de polinomios (FOIL)</h3>
<div class="kb-ejemplo">
<strong>FOIL:</strong> (2x + 1)(x - 3)<br>
<strong>F</strong>irst: 2x&middot;x = 2x&sup2;<br>
<strong>O</strong>uter: 2x&middot;(-3) = -6x<br>
<strong>I</strong>nner: 1&middot;x = x<br>
<strong>L</strong>ast: 1&middot;(-3) = -3<br>
Total: 2x&sup2; - 5x - 3
</div>

<h3>Productos notables (MEMORIZA!)</h3>
<div class="kb-table">
<table>
<tr><th>Nombre</th><th>Formula</th><th>Ejemplo</th></tr>
<tr><td>Cuadrado de suma</td><td>(a + b)² = a² + 2ab + b²</td><td>(x+3)² = x²+6x+9</td></tr>
<tr><td>Cuadrado de dif.</td><td>(a - b)² = a² - 2ab + b²</td><td>(x-3)² = x²-6x+9</td></tr>
<tr><td>Dif. de cuadrados</td><td>(a+b)(a-b) = a²-b²</td><td>(x+3)(x-3)=x²-9</td></tr>
<tr><td>Cubo de suma</td><td>(a+b)³ = a³+3a²b+3ab²+b³</td><td>(x+1)³ = x³+3x²+3x+1</td></tr>
</table>
</div>

</div>
$$,
$$[
  {"problema": "Suma: (4x³+2x-1) + (x³-3x+5)", "solucion": "5x³ - x + 4"},
  {"problema": "Multiplica: (x+2)(x-5)", "solucion": "x² - 3x - 10"},
  {"problema": "Desarrolla: (x+4)²", "solucion": "x² + 8x + 16"},
  {"problema": "Multiplica: (2x-1)(x²+3x-2)", "solucion": "2x³ + 5x² - 7x + 2"}
]$$,
'FOIL: First, Outer, Inner, Last. Para el cuadrado de un binomio: cuadrado del primero, mas/menos el doble producto, mas cuadrado del segundo. (a+b)² NO es a²+b². Error comun en examenes del TEC.',
1, 4);

-- ============================================================
-- 5. FACTORIZACION
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('factorizacion', 'Factorizacion: Todos los Metodos',
$$
<div class="kb-article">

<h2>Que es la factorizacion?</h2>
<p>La <strong>factorizacion</strong> descompone una expresion algebraica en un producto de factores mas simples.</p>

<div class="kb-box">
<strong>Idea clave:</strong> Asi como 12 = 3 &times; 4, x&sup2; - 9 = (x + 3)(x - 3). Sirve para resolver ecuaciones y simplificar fracciones.
</div>

<h3>Metodo 1: Factor Comun (siempre el primero)</h3>
<div class="kb-ejemplo">
6x&sup2; + 4x = 2x(3x + 2)<br>
MCD de 6 y 4 = 2. Variable con menor exponente: x&sup1;. Factor comun = 2x.
</div>

<h3>Metodo 2: Diferencia de Cuadrados</h3>
<p><strong>a&sup2; - b&sup2; = (a + b)(a - b)</strong></p>
<div class="kb-ejemplo">
x&sup2; - 9 = (x + 3)(x - 3)<br>
Verifica: (x+3)(x-3) = x&sup2; - 3x + 3x - 9 = x&sup2; - 9
</div>

<h3>Metodo 3: Trinomio Cuadrado Perfecto</h3>
<p><strong>a&sup2; + 2ab + b&sup2; = (a + b)&sup2;</strong></p>
<div class="kb-ejemplo">
x&sup2; + 6x + 9 = (x + 3)&sup2;<br>
Verifica: 2ab = 2&middot;x&middot;3 = 6x (coincide con el termino del medio)
</div>

<h3>Metodo 4: Trinomio General (ax&sup2; + bx + c)</h3>
<p>Se buscan DOS numeros que <strong>multipliquen</strong> a&middot;c y <strong>sumen</strong> b.</p>
<div class="kb-ejemplo">
x&sup2; + 5x + 6<br>
a&middot;c = 1&middot;6 = 6. Dos numeros que multipliquen 6 y sumen 5: 2 y 3.<br>
= (x + 2)(x + 3)
</div>

<h3>Metodo 5: Suma y Diferencia de Cubos</h3>
<div class="kb-ejemplo">
a&sup3; + b&sup3; = (a + b)(a&sup2; - ab + b&sup2;)<br>
a&sup3; - b&sup3; = (a - b)(a&sup2; + ab + b&sup2;)<br><br>
x&sup3; + 8 = (x + 2)(x&sup2; - 2x + 4)
</div>

<h3>Orden de factorizacion (JERARQUIA)</h3>
<ol>
<li><strong>Factor comun</strong></li>
<li><strong>Diferencia de cuadrados</strong></li>
<li><strong>Trinomio cuadrado perfecto</strong></li>
<li><strong>Trinomio general</strong></li>
<li><strong>Suma/diferencia de cubos</strong></li>
</ol>

</div>
$$,
$$[
  {"problema": "Factoriza: 12x³ - 8x² + 4x", "solucion": "Factor comun: 4x(3x² - 2x + 1)"},
  {"problema": "Factoriza: x⁴ - 16", "solucion": "(x²+4)(x²-4) = (x²+4)(x+2)(x-2)"},
  {"problema": "Factoriza: x² + 10x + 25", "solucion": "TCP: (x + 5)²"},
  {"problema": "Factoriza: x² + 7x + 12", "solucion": "(x + 3)(x + 4)"},
  {"problema": "Factoriza: 27 - x³", "solucion": "(3 - x)(9 + 3x + x²)"}
]$$,
'Siempre intenta factor comun PRIMERO. Si no hay, revisa diferencia de cuadrados. Luego trinomio. Jerarquia: 1) FC 2) Formulas notables 3) TG. Verifica multiplicando los factores. a²+b² NO se factoriza en reales.',
1, 5);

-- ============================================================
-- 6. FRACCIONES ALGEBRAICAS
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('fracciones-alg', 'Fracciones Algebraicas: Dominalas',
$$
<div class="kb-article">

<h2>Que es una fraccion algebraica?</h2>
<p>Es una fraccion donde el <strong>numerador</strong> y/o <strong>denominador</strong> son polinomios. Las mismas reglas de las fracciones numericas aplican.</p>

<div class="kb-box">
<strong>Idea clave:</strong> (x+1)/(x-2) es una fraccion algebraica. El denominador NUNCA puede ser cero: x &ne; 2.
</div>

<h3>Dominio</h3>
<p>El <strong>dominio</strong> son los valores que puede tomar la variable. El denominador nunca puede ser cero.</p>

<h3>Simplificacion</h3>
<p>Factoriza numerador y denominador. Cancela factores comunes.</p>
<div class="kb-ejemplo">
(x&sup2; - 1)/(x + 1) = (x+1)(x-1)/(x+1) = x - 1, x &ne; -1
</div>

<h3>Suma y resta</h3>
<p>MCM de los denominadores. Convierte cada fraccion. Suma/resta numeradores.</p>
<div class="kb-ejemplo">
1/(x+1) + 1/(x-1)<br>
MCM = (x+1)(x-1)<br>
= (x-1+x+1)/((x+1)(x-1)) = 2x/(x&sup2;-1)
</div>

<h3>Multiplicacion y division</h3>
<div class="kb-ejemplo">
<strong>Multiplicacion:</strong> (x+1)/(x-2) &middot; (x-2)/(x+3) = (x+1)/(x+3), x&ne;2, x&ne;-3<br>
<strong>Division:</strong> (x/2) &divide; (x/4) = (x/2) &times; (4/x) = 2, x&ne;0
</div>

</div>
$$,
$$[
  {"problema": "Simplifica: (x² - 4)/(x - 2)", "solucion": "x + 2, x ≠ 2"},
  {"problema": "Suma: 1/(x+2) + 1/(x-2)", "solucion": "2x/(x²-4), x ≠ 2, x ≠ -2"},
  {"problema": "Multiplica: (x+3)/(x-1) · (x-1)/(x+4)", "solucion": "(x+3)/(x+4), x ≠ 1, x ≠ -4"}
]$$,
'Siempre indica el dominio: valores que hacen cero el denominador ORIGINAL. Para sumar, el MCM es el producto de todos los factores distintos con su mayor exponente. Factorizar es tu mejor herramienta.',
1, 6);

-- ============================================================
-- 7. ECUACIONES
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('ecuaciones', 'Ecuaciones: Guia Completa',
$$
<div class="kb-article">

<h2>Que es una ecuacion?</h2>
<p>Una <strong>ecuacion</strong> es una igualdad matematica con una o mas <strong>incognitas</strong>.</p>

<div class="kb-box">
<strong>Regla de Oro:</strong> Todo lo que hagas de un lado del signo =, hazlo EXACTAMENTE IGUAL del otro lado.
</div>

<h3>Ecuaciones lineales</h3>
<p>Forma: ax + b = c. La variable tiene exponente 1.</p>
<div class="kb-ejemplo">
3x + 7 = 22<br>
3x = 22 - 7 = 15<br>
x = 5<br>
Verifica: 3(5)+7 = 22
</div>

<h3>Ecuaciones cuadraticas</h3>
<p>Forma: ax&sup2; + bx + c = 0</p>
<p><strong>Formula cuadratica:</strong> x = (-b &plusmn; &radic;(b&sup2; - 4ac)) / (2a)</p>

<h4>El discriminante (&Delta; = b&sup2; - 4ac)</h4>
<div class="kb-table">
<table>
<tr><th>&Delta;</th><th>Soluciones</th></tr>
<tr><td>&Delta; &gt; 0</td><td>Dos soluciones reales</td></tr>
<tr><td>&Delta; = 0</td><td>Una solucion (raiz doble)</td></tr>
<tr><td>&Delta; &lt; 0</td><td>Sin soluciones reales</td></tr>
</table>
</div>

<div class="kb-ejemplo">
x&sup2; - 5x + 6 = 0<br>
a=1, b=-5, c=6<br>
Discriminante: 25-24 = 1<br>
x = (5 &plusmn; 1)/2<br>
x&sub1; = 3, x&sub2; = 2
</div>

</div>
$$,
$$[
  {"problema": "Resuelve: 3x + 7 = 22", "solucion": "3x = 15 → x = 5"},
  {"problema": "Resuelve: x² - 5x + 6 = 0", "solucion": "(x-2)(x-3)=0 → x=2, x=3"},
  {"problema": "Resuelve: x² + 4x + 4 = 0", "solucion": "(x+2)²=0 → x=-2 (raiz doble)"},
  {"problema": "Resuelve: 2x² - 4x - 6 = 0", "solucion": "x = (4±√64)/4 → x₁=3, x₂=-1"}
]$$,
'Para ecuaciones de 2do grado: primero FACTORIZA (mas rapido). Si no puedes en 10 segundos, usa la formula cuadratica. MEMORIZA: x = (-b ± √(b²-4ac))/(2a). Siempre verifica tus soluciones.',
1, 7);

-- ============================================================
-- 8. SISTEMAS DE ECUACIONES
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('sistemas-ecuaciones', 'Sistemas de Ecuaciones',
$$
<div class="kb-article">

<h2>Que es un sistema de ecuaciones?</h2>
<p>Conjunto de dos o mas ecuaciones con dos o mas incognitas que se resuelven <strong>simultaneamente</strong>.</p>

<div class="kb-box">
<strong>Idea clave:</strong> La solucion debe satisfacer TODAS las ecuaciones. Graficamente, es el punto donde se cruzan las rectas.
</div>

<h3>Metodo 1: Sustitucion</h3>
<p>Despeja una variable y sustitoye en la otra ecuacion.</p>
<div class="kb-ejemplo">
{x + y = 5, x - y = 1}<br>
x = 5 - y<br>
(5-y) - y = 1 &rarr; -2y = -4 &rarr; y = 2<br>
x = 5 - 2 = 3<br>
Solucion: (3, 2)
</div>

<h3>Metodo 2: Eliminacion</h3>
<p>Suma o resta las ecuaciones para eliminar una variable.</p>
<div class="kb-ejemplo">
{2x + y = 7, x - y = 2}<br>
Sumando: 3x = 9 &rarr; x = 3<br>
2(3)+y=7 &rarr; y=1<br>
Solucion: (3, 1)
</div>

<h3>Tipos de soluciones</h3>
<div class="kb-table">
<table>
<tr><th>Tipo</th><th>Grafica</th><th>Significado</th></tr>
<tr><td>Unica solucion</td><td>Rectas que se cruzan</td><td>Ecuaciones independientes</td></tr>
<tr><td>Infinitas</td><td>Rectas coincidentes</td><td>Ecuaciones equivalentes</td></tr>
<tr><td>Sin solucion</td><td>Rectas paralelas</td><td>Ecuaciones contradictorias</td></tr>
</table>
</div>

</div>
$$,
$$[
  {"problema": "Resuelve: {x+y=5, x-y=1}", "solucion": "Por sustitucion: x=3, y=2"},
  {"problema": "Resuelve: {2x+y=7, x-y=2}", "solucion": "Por eliminacion: x=3, y=1"},
  {"problema": "Resuelve: {y=2x+1, y=-x+7}", "solucion": "Por igualacion: x=2, y=5"}
]$$,
'Si una variable ya esta despejada, usa SUSTITUCION. Si los coeficientes son iguales/opuestos, usa ELIMINACION. Si ambas estan despejadas, usa IGUALACION. Siempre verifica en AMBAS ecuaciones.',
1, 8);

-- ============================================================
-- 9. INECUACIONES
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('inecuaciones', 'Inecuaciones: Desigualdades',
$$
<div class="kb-article">

<h2>Que es una inecuacion?</h2>
<p>Una <strong>inecuacion</strong> es una desigualdad (&gt;, &lt;, &ge;, &le;) con incognitas. La solucion son <strong>intervalos</strong>.</p>

<div class="kb-box-warn">
<strong>Regla CRITICA:</strong> Si multiplicas o divides por un numero <strong>NEGATIVO</strong>, la desigualdad se <strong>INVIERTE</strong>.<br>
-2x &gt; 6 &rarr; x &lt; -3
</div>

<h3>Inecuaciones lineales</h3>
<div class="kb-ejemplo">
2x - 4 &gt; 6<br>
2x &gt; 10 &rarr; x &gt; 5<br>
Solucion: (5, &infin;)
</div>

<div class="kb-ejemplo">
-3x + 9 &ge; 0<br>
-3x &ge; -9 &rarr; x &le; 3 (se invirtio)<br>
Solucion: (-&infin;, 3]
</div>

<h3>Metodo de puntos criticos</h3>
<div class="kb-pasos">
<ol>
<li>Despeja hasta tener CERO de un lado</li>
<li>Encuentra los puntos criticos (raices del numerador y denominador)</li>
<li>Ubicalos en la recta numerica</li>
<li>Prueba un valor en cada intervalo</li>
<li>Escribe la solucion como intervalos</li>
</ol>
</div>

<div class="kb-ejemplo">
(x - 3)/(x + 2) &le; 0<br>
Puntos criticos: x=3, x=-2<br>
Intervalos: (-&infin;,-2), (-2,3], [3,&infin;)<br>
Probando x=0: (0-3)/(0+2) = -1.5 &le; 0 &rarr; SI<br>
Solucion: (-2, 3]<br>
-2 es ABIERTO porque el denominador se hace cero.
</div>

</div>
$$,
$$[
  {"problema": "Resuelve: 2x - 4 > 6", "solucion": "x > 5 → (5, ∞)"},
  {"problema": "Resuelve: -3x + 9 ≥ 0", "solucion": "x ≤ 3 → (-∞, 3]"},
  {"problema": "Resuelve: (x-3)/(x+2) ≤ 0", "solucion": "Puntos criticos: x=3, x=-2. Solucion: (-2, 3]"}
]$$,
'REPITE: Si multiplico o divido por negativo, el signo se invierte. Los puntos del denominador son SIEMPRE abiertos. Verifica con un valor de cada intervalo en la desigualdad ORIGINAL.',
1, 9);

-- ============================================================
-- 10. PLANO CARTESIANO Y FUNCIONES
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('plano-cartesiano', 'Plano Cartesiano y Funciones',
$$
<div class="kb-article">

<h2>El Plano Cartesiano</h2>
<p>Dos ejes perpendiculares: <strong>eje X</strong> (horizontal) y <strong>eje Y</strong> (vertical). Cada punto es (x, y).</p>

<h3>Distancia entre dos puntos</h3>
<div class="kb-box">
<strong>d = &radic;[(x&sub2; - x&sub1;)&sup2; + (y&sub2; - y&sub1;)&sup2;]</strong>
</div>
<div class="kb-ejemplo">
Distancia entre A(1, 2) y B(4, 6)<br>
d = &radic;[9+16] = &radic;25 = 5
</div>

<h3>Punto medio</h3>
<div class="kb-box">
<strong>M = ((x&sub1;+x&sub2;)/2, (y&sub1;+y&sub2;)/2)</strong>
</div>

<h3>Concepto de funcion</h3>
<p>Cada elemento del dominio (x) tiene <strong>EXACTAMENTE UNA</strong> imagen en el codominio (y).</p>

<div class="kb-box">
<strong>Prueba de la recta vertical:</strong> Si una vertical corta la grafica en MAS DE UN punto, NO es funcion.
</div>

<h3>Dominio y Rango</h3>
<ul>
<li><strong>Dominio:</strong> Valores que puede tomar x</li>
<li><strong>Rango:</strong> Valores que puede tomar y = f(x)</li>
</ul>

<div class="kb-ejemplo">
f(x) = &radic;(x - 2)<br>
Dominio: x - 2 &ge; 0 &rarr; x &ge; 2 &rarr; [2, &infin;)<br>
Rango: [0, &infin;)
</div>

</div>
$$,
$$[
  {"problema": "Distancia entre A(1,1) y B(4,5)", "solucion": "d = √(9+16) = 5"},
  {"problema": "Punto medio entre (2,4) y (6,8)", "solucion": "((2+6)/2, (4+8)/2) = (4,6)"},
  {"problema": "Halla el dominio de f(x) = 1/(x-3)", "solucion": "Dominio: ℝ - {3} = (-∞,3) ∪ (3,∞)"}
]$$,
'Prueba de la recta vertical: infalible. Dominio = que x puedo meter. Rango = que y puede salir. Para raices: radicando ≥ 0. Para fracciones: denominador ≠ 0. En el TEC, dominio y rango son preguntas seguras.',
1, 10);

-- ============================================================
-- 11. EXPONENCIALES Y LOGARITMOS
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('exp-log', 'Exponenciales y Logaritmos',
$$
<div class="kb-article">

<h2>Funcion Exponencial</h2>
<p>Forma: <strong>f(x) = a &middot; b&supx;</strong>, b &gt; 0, b &ne; 1.</p>

<h3>Propiedades de exponentes</h3>
<div class="kb-table">
<table>
<tr><th>Propiedad</th><th>Formula</th></tr>
<tr><td>Producto</td><td>bᵐ·bⁿ = bᵐ⁺ⁿ</td></tr>
<tr><td>Cociente</td><td>bᵐ/bⁿ = bᵐ⁻ⁿ</td></tr>
<tr><td>Potencia de potencia</td><td>(bᵐ)ⁿ = bᵐⁿ</td></tr>
<tr><td>Exp negativo</td><td>b⁻ⁿ = 1/bⁿ</td></tr>
<tr><td>Exp cero</td><td>b⁰ = 1</td></tr>
</table>
</div>

<h2>Funcion Logaritmica</h2>
<p>El logaritmo es la funcion inversa de la exponencial.</p>

<div class="kb-box">
<strong>Definicion:</strong> log_b(x) = n &nbsp;significa&nbsp; bⁿ = x<br>
log&sub2;(8) = 3 porque 2&sup3; = 8
</div>

<h3>Propiedades de Logaritmos</h3>
<div class="kb-table">
<table>
<tr><th>Propiedad</th><th>Formula</th></tr>
<tr><td>Log de producto</td><td>log_b(x·y) = log_b(x) + log_b(y)</td></tr>
<tr><td>Log de cociente</td><td>log_b(x/y) = log_b(x) - log_b(y)</td></tr>
<tr><td>Log de potencia</td><td>log_b(xⁿ) = n·log_b(x)</td></tr>
<tr><td>Log de 1</td><td>log_b(1) = 0</td></tr>
<tr><td>Log de la base</td><td>log_b(b) = 1</td></tr>
<tr><td>Cambio de base</td><td>log_b(x) = log_c(x)/log_c(b)</td></tr>
</table>
</div>

<div class="kb-box-warn">
<strong>Dominio:</strong> El argumento de un logaritmo SIEMPRE debe ser &gt; 0. log(0) no existe, log(negativo) no existe.
</div>

</div>
$$,
$$[
  {"problema": "Simplifica: log₂(8) + log₂(4)", "solucion": "3 + 2 = 5"},
  {"problema": "Resuelve: 2ˣ = 32", "solucion": "2ˣ = 2⁵ → x = 5"},
  {"problema": "Resuelve: log₃(x) = 4", "solucion": "x = 3⁴ = 81"},
  {"problema": "Resuelve: eˣ = 10", "solucion": "x = ln(10) ≈ 2.303"}
]$$,
'Log y exp son funciones INVERSAS: se cancelan. log_b(bˣ)=x y b^(log_b(x))=x. Para resolver exponenciales, iguala las bases. Para logs, usa la definicion. NUNCA olvides: argumento del log debe ser > 0.',
1, 11);

-- ============================================================
-- 12. GEOMETRIA
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('geometria', 'Geometria: Areas, Volumenes y Pitagoras',
$$
<div class="kb-article">

<h2>Triangulos</h2>
<div class="kb-box">
<strong>Area:</strong> A = (base &times; altura) / 2
</div>

<h3>Teorema de Pitagoras</h3>
<div class="kb-box">
<strong>a&sup2; + b&sup2; = c&sup2;</strong>
</div>
<div class="kb-ejemplo">
Catetos 3 y 4: c&sup2; = 9+16 = 25 &rarr; c = 5
</div>

<h3>Circulo</h3>
<div class="kb-box">
<strong>Area:</strong> A = &pi;r&sup2;<br>
<strong>Circunferencia:</strong> C = 2&pi;r
</div>

<h3>Volumenes</h3>
<div class="kb-table">
<table>
<tr><th>Solido</th><th>Volumen</th></tr>
<tr><td>Cubo</td><td>V = a³</td></tr>
<tr><td>Esfera</td><td>V = (4/3)πr³</td></tr>
<tr><td>Cilindro</td><td>V = πr²h</td></tr>
<tr><td>Cono</td><td>V = (1/3)πr²h</td></tr>
</table>
</div>

</div>
$$,
$$[
  {"problema": "Area de triangulo con base 10 y altura 6", "solucion": "A = (10×6)/2 = 30"},
  {"problema": "Hipotenusa si catetos son 5 y 12", "solucion": "c = √(25+144) = √169 = 13"},
  {"problema": "Volumen de cubo de lado 4", "solucion": "V = 4³ = 64"},
  {"problema": "Area de circulo de radio 7", "solucion": "A = 49π ≈ 153.94"}
]$$,
'Pitagoras SOLO funciona en triangulos RECTANGULOS. Para figuras compuestas, divide en figuras simples y suma. El volumen siempre es area de la base × altura (con 1/3 para conos y piramides).',
1, 12);

-- ============================================================
-- 13. TRIGONOMETRIA
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('trigonometria', 'Trigonometria: Seno, Coseno y Tangente',
$$
<div class="kb-article">

<h2>Razones Trigonometricas</h2>

<div class="kb-box">
<strong>SOH-CAH-TOA:</strong><br>
<strong>S</strong>en = <strong>O</strong>puesto / <strong>H</strong>ipotenusa<br>
<strong>C</strong>os = <strong>A</strong>dyacente / <strong>H</strong>ipotenusa<br>
<strong>T</strong>an = <strong>O</strong>puesto / <strong>A</strong>dyacente = sen/ cos
</div>

<h3>Valores Exactos</h3>
<div class="kb-table">
<table>
<tr><th>&theta;</th><th>0&deg;</th><th>30&deg;</th><th>45&deg;</th><th>60&deg;</th><th>90&deg;</th></tr>
<tr><td>sen &theta;</td><td>0</td><td>1/2</td><td>&radic;2/2</td><td>&radic;3/2</td><td>1</td></tr>
<tr><td>cos &theta;</td><td>1</td><td>&radic;3/2</td><td>&radic;2/2</td><td>1/2</td><td>0</td></tr>
<tr><td>tan &theta;</td><td>0</td><td>1/&radic;3</td><td>1</td><td>&radic;3</td><td>&infin;</td></tr>
</table>
</div>

<h3>Identidad Fundamental</h3>
<div class="kb-box">
<strong>sen&sup2;(&theta;) + cos&sup2;(&theta;) = 1</strong>
</div>

<h3>Ley de Senos</h3>
<div class="kb-box">
<strong>a/sen(A) = b/sen(B) = c/sen(C)</strong>
</div>

<h3>Ley de Cosenos</h3>
<div class="kb-box">
<strong>a&sup2; = b&sup2; + c&sup2; - 2bc&middot;cos(A)</strong>
</div>
<p>Cuando A=90&deg;, cos(90&deg;)=0 y se reduce a Pitagoras.</p>

</div>
$$,
$$[
  {"problema": "Calcula sen(30°) + cos(60°)", "solucion": "1/2 + 1/2 = 1"},
  {"problema": "En un triangulo rectangulo, opuesto=3, hip=5. Halla sen(θ).", "solucion": "sen(θ)=3/5=0.6"},
  {"problema": "Ley de senos: A=30°, B=45°, a=10. Halla b.", "solucion": "b = 10·sen(45°)/sen(30°) ≈ 14.14"}
]$$,
'SOH-CAH-TOA es tu mejor amigo. sen CRECE: 0, 1/2, √2/2, √3/2, 1. cos DECRECE: 1, √3/2, √2/2, 1/2, 0. sen²+cos²=1 siempre funciona. Usa ley de senos/cosenos para triangulos NO rectangulos.',
1, 13);

-- ============================================================
-- 14. CALCULO
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('calculo', 'Calculo Diferencial e Integral',
$$
<div class="kb-article">

<h2>Limites</h2>
<p>El <strong>limite</strong> de f(x) cuando x se acerca a a es el valor al que se aproxima f(x).</p>
<div class="kb-box">
<strong>lim_{x&rarr;a} f(x) = L</strong>
</div>

<p><strong>Paso 1:</strong> Siempre intenta sustitucion directa.</p>
<div class="kb-ejemplo">
lim_{x&rarr;2} (3x+1) = 3(2)+1 = 7
</div>

<p><strong>Paso 2:</strong> Si obtienes 0/0, factoriza.</p>
<div class="kb-ejemplo">
lim_{x&rarr;2} (x&sup2;-4)/(x-2) = lim_{x&rarr;2} (x+2) = 4
</div>

<h2>Derivadas</h2>
<p>Mide la tasa de cambio instantanea. Es la pendiente de la recta tangente.</p>

<div class="kb-table">
<table>
<tr><th>f(x)</th><th>f'(x)</th></tr>
<tr><td>c (constante)</td><td>0</td></tr>
<tr><td>xⁿ</td><td>n&middot;xⁿ⁻¹</td></tr>
<tr><td>eˣ</td><td>eˣ</td></tr>
<tr><td>ln(x)</td><td>1/x</td></tr>
<tr><td>sen(x)</td><td>cos(x)</td></tr>
<tr><td>cos(x)</td><td>-sen(x)</td></tr>
</table>
</div>

<div class="kb-ejemplo">
f(x) = 3x&sup2; + 2x + 1<br>
f'(x) = 6x + 2
</div>

<h2>Integrales</h2>
<p>Operacion inversa de la derivada. Representa el area bajo la curva.</p>

<div class="kb-table">
<table>
<tr><th>Integral</th><th>Resultado</th></tr>
<tr><td>∫xⁿ dx</td><td>xⁿ⁺¹/(n+1) + C, n &ne; -1</td></tr>
<tr><td>∫1/x dx</td><td>ln|x| + C</td></tr>
<tr><td>∫eˣ dx</td><td>eˣ + C</td></tr>
<tr><td>∫cos(x) dx</td><td>sen(x) + C</td></tr>
<tr><td>∫sen(x) dx</td><td>-cos(x) + C</td></tr>
</table>
</div>

<div class="kb-box-warn">
<strong>NUNCA OLVIDES:</strong> En integrales indefinidas, suma la constante <strong>C</strong>.
</div>

</div>
$$,
$$[
  {"problema": "Deriva: f(x)=3x²+2x+1", "solucion": "f'(x)=6x+2"},
  {"problema": "Integra: ∫2x dx", "solucion": "x² + C"},
  {"problema": "Calcula: lim_{x→3}(x²-9)/(x-3)", "solucion": "= lim_{x→3}(x+3)=6"},
  {"problema": "Integra: ∫(3x²+2x)dx", "solucion": "x³ + x² + C"},
  {"problema": "Calcula: ∫₀¹ x² dx", "solucion": "[x³/3]₀¹ = 1/3"}
]$$,
'Regla de la cadena: deriva afuera, deja adentro, multiplica por derivada adentro. Nunca olvides la constante C en integrales. Para limites 0/0: factoriza o racionaliza.',
5, 14);

-- ============================================================
-- MENSAJE DE EXITO
-- ============================================================
SELECT 'Biblioteca de conocimiento poblada exitosamente con ' || COUNT(*) || ' temas.' AS mensaje FROM knowledge_library;
