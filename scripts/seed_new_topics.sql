-- ============================================================
-- MATHMATY - NUEVOS TEMAS, TEORIA Y EJERCICIOS
-- ============================================================
-- Temas: Aritmetica, Fracciones, Decimales, Porcentajes, 
--        MCM/MCD, Proporciones, Estadistica, Probabilidad,
--        Logica, Matrices, Vectores, Sucesiones, Geo.Analitica
-- ============================================================

-- 1. AGREGAR TOPICS A LA TABLA
INSERT INTO topics (name, parcial_num, description) VALUES
('Aritmetica Basica', 1, 'Operaciones basicas: suma, resta, multiplicacion y division de numeros'),
('Fracciones', 1, 'Fracciones: simplificacion, equivalentes, operaciones y fracciones mixtas'),
('Decimales', 1, 'Numeros decimales: conversion, operaciones y decimales periodicos'),
('Porcentajes', 1, 'Porcentajes: incrementos, descuentos, interes simple y compuesto'),
('MCM y MCD', 1, 'Maximo Comun Multiplo y Minimo Comun Divisor'),
('Razones y Proporciones', 1, 'Razones, proporciones, regla de tres directa e inversa'),
('Estadistica Descriptiva', 2, 'Tablas, frecuencias, graficos, media, mediana, moda, varianza'),
('Probabilidad', 2, 'Eventos, probabilidad simple, compuesta y condicional'),
('Logica Matematica', 1, 'Proposiciones, tablas de verdad, conjuntos, cuantificadores'),
('Matrices', 3, 'Matrices: suma, multiplicacion, determinantes e inversa'),
('Vectores', 3, 'Vectores: magnitud, direccion, producto punto y cruz'),
('Sucesiones y Series', 3, 'Sucesiones aritmeticas, geometricas y sumatorias'),
('Geometria Analitica', 2, 'Plano cartesiano, rectas, pendiente, distancia entre puntos')
ON CONFLICT (name) DO NOTHING;

-- 2. CONTENIDO PARA BIBLIOTECA DE CONOCIMIENTO
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES

-- MCM Y MCD
('mcm-mcd', 'Maximo Comun Multiplo y Minimo Comun Divisor',
$$<div class="kb-article"><h2>Que es el MCM?</h2><p>El <strong>Maximo Comun Multiplo (MCM)</strong> de dos o mas numeros es el menor multiplo comun que comparten. Sirve para sumar fracciones con distinto denominador.</p><div class="kb-box">El MCM se usa para encontrar el denominador comun al sumar o restar fracciones.</div><h3>Como calcular el MCM</h3><p><strong>Metodo 1: Lista de multiplos</strong></p><div class="kb-ejemplo">MCM de 4 y 6:<br>Multiplos de 4: 4, 8, <strong>12</strong>, 16, 20...<br>Multiplos de 6: 6, <strong>12</strong>, 18, 24...<br>El menor multiplo comun es <strong>12</strong>.</div><p><strong>Metodo 2: Factorizacion prima</strong></p><div class="kb-ejemplo">MCM de 12 y 18:<br>12 = 2² x 3<br>18 = 2 x 3²<br>MCM = 2² x 3² = 4 x 9 = <strong>36</strong></div><h2>Que es el MCD?</h2><p>El <strong>Maximo Comun Divisor (MCD)</strong> de dos o mas numeros es el mayor numero que divide exactamente a todos ellos. Sirve para simplificar fracciones.</p><div class="kb-ejemplo">MCD de 12 y 18:<br>Divisores de 12: 1, 2, 3, 4, <strong>6</strong>, 12<br>Divisores de 18: 1, 2, 3, <strong>6</strong>, 9, 18<br>El mayor divisor comun es <strong>6</strong>.</div><div class="kb-box-warn">Dato util: MCM(a,b) x MCD(a,b) = a x b. Siempre.</div></div>$$,
$$[{"problema":"Halla el MCM de 6 y 8","solucion":"Multiplos de 6: 6,12,18,24... de 8: 8,16,24... El MCM es 24"},{"problema":"Halla el MCD de 24 y 36","solucion":"Divisores de 24: 1,2,3,4,6,8,12,24. De 36: 1,2,3,4,6,9,12,18,36. El MCD es 12"},{"problema":"Halla el MCM de 4, 6 y 8","solucion":"Factorizacion: 4=2², 6=2·3, 8=2³. MCM = 2³·3 = 24"},{"problema":"Halla el MCD de 48 y 60","solucion":"48=2⁴·3, 60=2²·3·5. MCD = 2²·3 = 12"},{"problema":"El MCM de dos numeros es 60 y su MCD es 6. Si uno es 12, ¿cual es el otro?","solucion":"MCM·MCD = a·b → 60·6 = 12·b → 360 = 12b → b = 30"}]$$,
'Para fracciones: el denominador comun es el MCM de los denominadores. Para simplificar: divide numerador y denominador por el MCD. Relacion util: MCM(a,b) x MCD(a,b) = a x b.',
1, 15),

-- PORCENTAJES
('porcentajes', 'Porcentajes: Calculos y Aplicaciones',
$$<div class="kb-article"><h2>Que es un porcentaje?</h2><p>Un <strong>porcentaje</strong> representa una parte de 100. El simbolo % significa "de cada 100". 25% = 25 de cada 100 = 25/100 = 1/4.</p><div class="kb-box">Para calcular el porcentaje de una cantidad: multiplica la cantidad por el porcentaje y divide entre 100.</div><div class="kb-ejemplo">El 15% de 200 = (15 x 200) / 100 = 30</div><h3>Descuentos</h3><div class="kb-ejemplo">Un articulo cuesta $80 y tiene 25% de descuento.<br>Descuento = 25% de 80 = (25x80)/100 = $20<br>Precio final = 80 - 20 = <strong>$60</strong></div><h3>Incrementos</h3><div class="kb-ejemplo">Un sueldo de $1000 aumento 10%.<br>Aumento = 10% de 1000 = $100<br>Nuevo sueldo = 1000 + 100 = <strong>$1100</strong></div><h3>Interes Simple</h3><div class="kb-box">I = C x r x t (Capital x tasa x tiempo)</div><div class="kb-ejemplo">$2000 al 5% anual durante 3 años:<br>Interes = 2000 x 0.05 x 3 = $300<br>Total = 2000 + 300 = $2300</div></div>$$,
$$[{"problema":"Calcula el 20% de 350","solucion":"(20x350)/100 = 70"},{"problema":"Un pantalon cuesta $40 con 30% de descuento. ¿Cuanto pagas?","solucion":"Descuento = (30x40)/100 = $12. Precio final = 40-12 = $28"},{"problema":"Un empleado gana $1500 y recibe un aumento del 8%. ¿Nuevo salario?","solucion":"Aumento = (8x1500)/100 = $120. Nuevo = 1500+120 = $1620"},{"problema":"Inviertes $3000 al 4% anual durante 2 años. ¿Interes simple?","solucion":"I = 3000 x 0.04 x 2 = $240"},{"problema":"¿Que porcentaje de 200 es 50?","solucion":"(50/200) x 100 = 25%"}]$$,
'Para descuentos: resta el porcentaje del 100% y multiplica. Ej: 25% descuento → pagas 75% → 0.75 x precio. Para interes simple: I = C·r·t. La tasa siempre en decimal (5% = 0.05).',
1, 16),

-- RAZONES Y PROPORCIONES
('razones-proporciones', 'Razones, Proporciones y Regla de Tres',
$$<div class="kb-article"><h2>Razones</h2><p>Una <strong>razon</strong> es la comparacion entre dos cantidades mediante division. Se escribe a:b o a/b.</p><div class="kb-ejemplo">En un curso hay 15 hombres y 10 mujeres. La razon hombres:mujeres es 15:10 = 3:2</div><h2>Proporciones</h2><p>Una <strong>proporcion</strong> es la igualdad de dos razones: a/b = c/d.</p><div class="kb-box">Propiedad fundamental: a x d = b x c (productos cruzados)</div><div class="kb-ejemplo">2/3 = 4/6 → 2x6 = 3x4 → 12 = 12 ✓</div><h2>Regla de Tres</h2><h3>Directa</h3><p>Cuando mas de una cosa, mas de la otra.</p><div class="kb-ejemplo">Si 3 kilos cuestan $12, ¿cuanto cuestan 5 kilos?<br>3 → 12<br>5 → x<br>x = (5 x 12) / 3 = <strong>$20</strong></div><h3>Inversa</h3><p>Cuando mas de una cosa, menos de la otra.</p><div class="kb-ejemplo">3 obreros tardan 8 horas. ¿Cuanto tardan 6 obreros?<br>3 → 8<br>6 → x<br>x = (3 x 8) / 6 = <strong>4 horas</strong></div></div>$$,
$$[{"problema":"Si 4 libros cuestan $20, ¿cuanto cuestan 7 libros?","solucion":"Regla de tres directa: x = (7x20)/4 = $35"},{"problema":"2 pintores tardan 6 horas. ¿Cuanto tardan 3 pintores?","solucion":"Regla de tres inversa: x = (2x6)/3 = 4 horas"},{"problema":"La razon de niños a niñas es 3:2. Si hay 18 niños, ¿cuantas niñas hay?","solucion":"3/2 = 18/x → 3x = 36 → x = 12 niñas"},{"problema":"Un auto recorre 240 km con 20 litros. ¿Cuantos litros para 360 km?","solucion":"Directa: x = (360x20)/240 = 30 litros"},{"problema":"5 personas tardan 9 dias. ¿Cuanto tardan 3 personas?","solucion":"Inversa: x = (5x9)/3 = 15 dias"}]$$,
'Directa: multiplica en cruz y divide. Inversa: multiplica directo y divide. Identifica: si al aumentar una variable la otra tambien aumenta, es directa. Si disminuye, es inversa.',
1, 17),

-- ESTADISTICA DESCRIPTIVA
('estadistica', 'Estadistica Descriptiva: Datos y Graficos',
$$<div class="kb-article"><h2>Estadistica Descriptiva</h2><p>Rama que recolecta, organiza y describe datos. Las medidas principales son la <strong>media</strong>, <strong>mediana</strong> y <strong>moda</strong>.</p><h3>Media aritmetica</h3><div class="kb-box">Media = Suma de todos los datos / Numero de datos</div><div class="kb-ejemplo">Datos: 4, 6, 8, 10, 12<br>Media = (4+6+8+10+12)/5 = 40/5 = <strong>8</strong></div><h3>Mediana</h3><p>Valor central cuando los datos se ordenan. Si hay un numero par, es el promedio de los dos centrales.</p><div class="kb-ejemplo">Datos ordenados: 4, 6, <strong>8</strong>, 10, 12 → Mediana = 8<br>Datos pares: 4, 6, 8, 10 → Mediana = (6+8)/2 = <strong>7</strong></div><h3>Moda</h3><p>El valor que mas se repite.</p><div class="kb-ejemplo">Datos: 2, 3, 3, 3, 5, 7 → Moda = <strong>3</strong></div><h3>Varianza y Desviacion Estandar</h3><p>Miden la dispersion de los datos. Varianza = promedio de las distancias al cuadrado de la media.</p></div>$$,
$$[{"problema":"Halla la media de: 5, 10, 15, 20, 25","solucion":"Media = (5+10+15+20+25)/5 = 75/5 = 15"},{"problema":"Ordena y halla la mediana: 8, 3, 5, 9, 2","solucion":"Ordenado: 2,3,5,8,9. Mediana = 5"},{"problema":"Halla la moda: 4, 4, 5, 6, 7, 7, 7, 8","solucion":"El 7 aparece 3 veces → Moda = 7"},{"problema":"Calcula la media de: 12, 15, 18, 21","solucion":"Media = (12+15+18+21)/4 = 66/4 = 16.5"},{"problema":"¿Que medida es mejor cuando hay valores atipicos?","solucion":"La mediana, porque no se ve afectada por valores extremos"}]$$,
'La media se ve afectada por valores extremos. La mediana no. La moda sirve para datos cualitativos. Varianza alta = datos dispersos. Varianza baja = datos concentrados.',
2, 18),

-- PROBABILIDAD
('probabilidad', 'Probabilidad: Azar y Eventos',
$$<div class="kb-article"><h2>Probabilidad</h2><p>Mide la posibilidad de que ocurra un evento. Siempre entre 0 (imposible) y 1 (seguro).</p><div class="kb-box">P(Evento) = Casos favorables / Casos posibles</div><div class="kb-ejemplo">Probabilidad de obtener cara al lanzar una moneda:<br>P(cara) = 1/2 = 0.5 = 50%</div><h3>Probabilidad compuesta</h3><p>P(A y B) = P(A) x P(B) (eventos independientes)<br>P(A o B) = P(A) + P(B) - P(A y B)</p><div class="kb-ejemplo">Probabilidad de sacar un 3 y luego un 5 (con reposicion):<br>P(3 y 5) = 1/6 x 1/6 = 1/36</div><h3>Probabilidad condicional</h3><p>P(A|B) = P(A y B) / P(B). Probabilidad de A dado que ocurrio B.</p></div>$$,
$$[{"problema":"Probabilidad de sacar un 4 en un dado","solucion":"P(4) = 1/6 ≈ 0.167"},{"problema":"Probabilidad de sacar una carta roja de una baraja (52 cartas, 26 rojas)","solucion":"P(roja) = 26/52 = 1/2 = 0.5"},{"problema":"Probabilidad de que al lanzar 2 monedas ambas den cara","solucion":"P(2 caras) = 1/2 x 1/2 = 1/4 = 0.25"},{"problema":"En una bolsa hay 3 rojas y 2 azules. Probabilidad de sacar azul","solucion":"P(azul) = 2/5 = 0.4"},{"problema":"Probabilidad de que al lanzar un dado salga par o mayor que 4","solucion":"P(par) = 3/6, P(>4) = 2/6, P(par y >4) = 1/6. P = 3/6+2/6-1/6 = 4/6 = 2/3"}]$$,
'Probabilidad siempre entre 0 y 1. Multiplica para "y", suma para "o" (restando la interseccion). Condicional: P(A|B) = P(A y B)/P(B).',
2, 19),

-- LOGICA MATEMATICA
('logica', 'Logica Matematica: Proposiciones y Tablas de Verdad',
$$<div class="kb-article"><h2>Proposiciones</h2><p>Una <strong>proposicion</strong> es una oracion que puede ser verdadera o falsa, pero no ambas.</p><div class="kb-ejemplo">"5 es mayor que 3" es una proposicion verdadera.<br>"El cielo es morado" es falsa.<br>"¿Que hora es?" NO es proposicion (es pregunta).</div><h3>Conectivos logicos</h3><div class="kb-box">¬ (no): invierte el valor<br>∧ (y): verdadero solo si ambos son verdad<br>∨ (o): verdadero si al menos uno es verdad<br>→ (implica): falso solo si el primero es verdad y el segundo falso</div><h3>Tabla de verdad</h3><div class="kb-ejemplo">p ∧ q (p y q):<br>p=V, q=V → V<br>p=V, q=F → F<br>p=F, q=V → F<br>p=F, q=F → F</div><h3>Cuantificadores</h3><p>∀ (para todo): "todos los elementos cumplen"<br>∃ (existe): "al menos un elemento cumple"</p></div>$$,
$$[{"problema":"¿Es proposicion? '3+5=8'","solucion":"Si, es una proposicion verdadera"},{"problema":"¿Es proposicion? '¿Estudiaste?'","solucion":"No, es una pregunta"},{"problema":"Construye tabla de verdad de p ∨ ¬p","solucion":"Si p=V → V, si p=F → V. Siempre verdad (tautologia)"},{"problema":"Evalua: p=V, q=F. p ∧ q","solucion":"V ∧ F = F"},{"problema":"Traduce: 'Todos los numeros naturales son enteros' con cuantificador","solucion":"∀x(x ∈ ℕ → x ∈ ℤ). Es verdadero."}]$$,
'¬ invierte. ∧ exige ambos verdaderos. ∨ exige al menos uno. → solo es falso cuando V→F. Tautologia = siempre verdad. Contradiccion = siempre falso.',
1, 20),

-- MATRICES
('matrices', 'Matrices: Operaciones y Propiedades',
$$<div class="kb-article"><h2>Matrices</h2><p>Una <strong>matriz</strong> es un arreglo rectangular de numeros organizados en filas y columnas. Se denota como A(m×n) donde m=filas, n=columnas.</p><div class="kb-box">A = [a_ij] donde i es la fila y j es la columna.</div><h3>Suma de matrices</h3><p>Se suman elemento a elemento. Ambas matrices deben tener el mismo tamano.</p><div class="kb-ejemplo">[1 2; 3 4] + [5 6; 7 8] = [6 8; 10 12]</div><h3>Multiplicacion de matrices</h3><p>El numero de columnas de A debe igualar el numero de filas de B.</p><div class="kb-box">(A×B)_ij = suma de (a_ik × b_kj) para k=1..n</div><h3>Determinante (2×2)</h3><div class="kb-box">det([a b; c d]) = ad - bc</div><div class="kb-ejemplo">det([1 2; 3 4]) = 1·4 - 2·3 = 4-6 = -2</div><h3>Matriz inversa (2×2)</h3><div class="kb-box">A⁻¹ = 1/det(A) × [d -b; -c a]</div></div>$$,
$$[{"problema":"Suma: [1,2;3,4] + [4,3;2,1]","solucion":"[5,5;5,5]"},{"problema":"Multiplica: [1,2;3,4] × [1,0;0,1]","solucion":"En cualquier matriz, × Identidad = la misma matriz = [1,2;3,4]"},{"problema":"Halla el determinante de [3,5;2,4]","solucion":"det = 3·4 - 5·2 = 12-10 = 2"},{"problema":"Halla la inversa de [2,0;0,2]","solucion":"det=4. A⁻¹ = 1/4 × [2,0;0,2] = [0.5,0;0,0.5]"},{"problema":"¿Puedo multiplicar A(2×3) × B(3×4)?","solucion":"Si, porque columnas de A(3)=filas de B(3). Resultado: 2×4"}]$$,
'La multiplicacion de matrices NO es conmutativa: A×B ≠ B×A. Identidad × cualquier matriz = la misma matriz. Si det=0, la matriz NO tiene inversa (es singular).',
3, 21),

-- VECTORES
('vectores', 'Vectores: Magnitud, Direccion y Operaciones',
$$<div class="kb-article"><h2>Vectores</h2><p>Un <strong>vector</strong> tiene magnitud y direccion. Se representa como v = (x, y) en 2D o (x, y, z) en 3D.</p><div class="kb-box">v = (3, 4) tiene magnitud |v| = √(3²+4²) = 5</div><h3>Magnitud</h3><div class="kb-box">|v| = √(x² + y²)</div><div class="kb-ejemplo">v = (3,4) → |v| = √(9+16) = √25 = 5</div><h3>Producto Punto (escalar)</h3><div class="kb-box">v·w = x1·x2 + y1·y2 = |v||w|cos(θ)</div><div class="kb-ejemplo">v=(1,2), w=(3,4) → v·w = 1·3+2·4 = 3+8 = 11</div><h3>Producto Cruz (3D)</h3><div class="kb-box">v×w = (v_y·w_z - v_z·w_y, v_z·w_x - v_x·w_z, v_x·w_y - v_y·w_x)</div></div>$$,
$$[{"problema":"Halla la magnitud de v=(6,8)","solucion":"|v| = √(36+64) = √100 = 10"},{"problema":"Producto punto de (2,3) y (4,5)","solucion":"2·4 + 3·5 = 8+15 = 23"},{"problema":"¿Son ortogonales (1,0) y (0,1)?","solucion":"Producto punto = 1·0+0·1 = 0 → Si, son ortogonales"},{"problema":"Halla el angulo entre (1,0) y (1,1)","solucion":"cos(θ) = (1·1+0·1)/(1·√2) = 1/√2 → θ = 45°"},{"problema":"v=(2,-1), w=(1,3). Halla v·w","solucion":"2·1 + (-1)·3 = 2-3 = -1"}]$$,
'Producto punto cero = vectores perpendiculares (ortogonales). Producto punto positivo = angulo agudo. Negativo = angulo obtuso. La magnitud siempre es positiva.',
3, 22),

-- SUCESIONES Y SERIES
('sucesiones', 'Sucesiones y Series: Aritmeticas y Geometricas',
$$<div class="kb-article"><h2>Sucesiones</h2><p>Una <strong>sucesion</strong> es una lista ordenada de numeros. Cada numero se llama termino.</p><h3>Aritmetica</h3><p>Cada termino se obtiene sumando una constante (diferencia d).</p><div class="kb-box">a_n = a_1 + (n-1)·d</div><div class="kb-ejemplo">2, 5, 8, 11... (d=3)<br>a_10 = 2 + (10-1)·3 = 2+27 = <strong>29</strong></div><h3>Geometrica</h3><p>Cada termino se obtiene multiplicando por una constante (razon r).</p><div class="kb-box">a_n = a_1 · r^(n-1)</div><div class="kb-ejemplo">3, 6, 12, 24... (r=2)<br>a_6 = 3 · 2⁵ = 3·32 = <strong>96</strong></div><h3>Sumatoria</h3><div class="kb-box">Suma aritmetica: S_n = n·(a_1 + a_n)/2<br>Suma geometrica: S_n = a_1·(1-rⁿ)/(1-r)</div></div>$$,
$$[{"problema":"Halla el termino 8 de: 3, 7, 11, 15...","solucion":"d=4, a_8 = 3+(8-1)·4 = 3+28 = 31"},{"problema":"Halla el termino 6 de: 2, 6, 18, 54...","solucion":"r=3, a_6 = 2·3⁵ = 2·243 = 486"},{"problema":"Suma los primeros 5 terminos de 1,3,5,7,9","solucion":"S = 5·(1+9)/2 = 5·10/2 = 25"},{"problema":"Suma los primeros 4 terminos de 2,4,8,16","solucion":"S = 2·(1-2⁴)/(1-2) = 2·(1-16)/(-1) = 2·15 = 30"},{"problema":"¿Que tipo de sucesion es: 1, -2, 4, -8?","solucion":"Geometrica con r = -2. a_5 = 1·(-2)⁴ = 16"}]$$,
'En aritmeticas: la diferencia d es constante. En geometricas: la razon r es constante. Para la suma geometrica, si |r|<1 y n→∞, la suma converge a a_1/(1-r).',
3, 23),

-- GEOMETRIA ANALITICA
('geo-analitica', 'Geometria Analitica: Rectas y Distancias',
$$<div class="kb-article"><h2>Geometria Analitica</h2><p>Combina algebra con geometria usando coordenadas en el plano cartesiano.</p><h3>Distancia entre puntos</h3><div class="kb-box">d = √[(x₂-x₁)² + (y₂-y₁)²]</div><div class="kb-ejemplo">A(1,2), B(4,6): d = √[(4-1)²+(6-2)²] = √[9+16] = 5</div><h3>Pendiente de una recta</h3><div class="kb-box">m = (y₂-y₁)/(x₂-x₁) = tan(θ)</div><div class="kb-ejemplo">Recta por (1,2) y (3,6): m = (6-2)/(3-1) = 4/2 = 2</div><h3>Ecuacion de la recta</h3><div class="kb-box">y - y₁ = m(x - x₁) &nbsp;(punto-pendiente)<br>y = mx + b &nbsp;(pendiente-intercepto)</div><h3>Rectas paralelas y perpendiculares</h3><div class="kb-box">Paralelas: misma pendiente m₁=m₂<br>Perpendiculares: m₁·m₂ = -1</div></div>$$,
$$[{"problema":"Distancia entre (-1,2) y (3,5)","solucion":"d = √[(3+1)²+(5-2)²] = √(16+9) = 5"},{"problema":"Halla la pendiente de la recta por (2,3) y (5,9)","solucion":"m = (9-3)/(5-2) = 6/3 = 2"},{"problema":"Ecuacion de recta con m=3 que pasa por (1,4)","solucion":"y-4 = 3(x-1) → y = 3x+1"},{"problema":"¿Son perpendiculares las rectas y=2x+1 e y=-½x+3?","solucion":"m₁=2, m₂=-½ → m₁·m₂ = -1 → Si, perpendiculares"},{"problema":"Punto medio entre (2,4) y (6,8)","solucion":"((2+6)/2, (4+8)/2) = (4,6)"}]$$,
'Pendiente positiva = recta creciente. Negativa = decreciente. Cero = horizontal. Infinita = vertical. Paralelas tienen misma m. Perpendiculares: m₁·m₂ = -1.',
2, 24);

-- 3. EJERCICIOS PARA CADA NUEVO TEMA
-- MCM y MCD
INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps, theory, difficulty) VALUES
('mcm-mcd', 'Halla el MCM de 6 y 8', 'MCM(6,8)', '["24","48","16","12"]', '[{"math":"Multiplos de 6: 6,12,18,24","expl":"Listamos multiplos de 6"},{"math":"Multiplos de 8: 8,16,24","expl":"Listamos multiplos de 8"},{"math":"MCM = 24","expl":"El menor multiplo comun es 24"}]', 'El MCM es el menor multiplo comun entre dos o mas numeros.', 'basico'),
('mcm-mcd', 'Halla el MCD de 36 y 48', 'MCD(36,48)', '["12","6","24","72"]', '[{"math":"36 = 2²·3²","expl":"Factorizamos 36"},{"math":"48 = 2⁴·3","expl":"Factorizamos 48"},{"math":"MCD = 2²·3 = 12","expl":"Factores comunes con menor exponente"}]', 'El MCD es el mayor divisor comun entre dos o mas numeros.', 'basico'),
('mcm-mcd', 'Halla el MCM de 4, 6 y 10', 'MCM(4,6,10)', '["60","120","30","20"]', '[{"math":"4=2², 6=2·3, 10=2·5","expl":"Factorizamos cada numero"},{"math":"MCM = 2²·3·5","expl":"Tomamos factores con mayor exponente"},{"math":"MCM = 60","expl":"4·3·5 = 60"}]', 'Para varios numeros, el MCM incluye todos los factores primos con su mayor exponente.', 'intermedio'),
('mcm-mcd', 'El producto de dos numeros es 360 y su MCD es 6. Halla el MCM', 'MCM si a·b=360 y MCD=6', '["60","216","180","30"]', '[{"math":"MCM·MCD = a·b","expl":"Formula fundamental"},{"math":"MCM·6 = 360","expl":"Sustituimos valores"},{"math":"MCM = 60","expl":"Dividimos 360÷6"}]', 'MCM(a,b) × MCD(a,b) = a × b. Esta relacion siempre se cumple.', 'intermedio'),
('mcm-mcd', 'Halla el MCD de 84 y 126', 'MCD(84,126)', '["42","21","14","63"]', '[{"math":"84 = 2²·3·7","expl":"84 factorizado"},{"math":"126 = 2·3²·7","expl":"126 factorizado"},{"math":"MCD = 2·3·7 = 42","expl":"Factores comunes"}]', 'Factoriza ambos numeros y toma los factores primos comunes con el menor exponente.', 'avanzado');

-- Porcentajes
INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps, theory, difficulty) VALUES
('porcentajes', 'Calcula el 15% de 200', '15% de 200', '["30","20","35","25"]', '[{"math":"15/100 × 200","expl":"Convertimos 15% a fraccion"},{"math":"0.15 × 200","expl":"Multiplicamos"},{"math":"= 30","expl":"Resultado"}]', 'Porcentaje = (porcentaje/100) × cantidad.', 'basico'),
('porcentajes', 'Un articulo de $80 tiene 25% de descuento. ¿Precio final?', '25% descuento de $80', '["$60","$55","$65","$50"]', '[{"math":"Descuento = 25/100 × 80 = $20","expl":"Calculamos el descuento"},{"math":"Precio final = 80-20 = $60","expl":"Restamos el descuento"}]', 'Descuento = % × precio original. Precio final = original - descuento.', 'basico'),
('porcentajes', 'Un sueldo de $1200 aumenta 10%. ¿Nuevo sueldo?', '10% aumento de $1200', '["$1320","$1300","$1220","$1400"]', '[{"math":"Aumento = 10/100 × 1200 = $120","expl":"Calculamos el aumento"},{"math":"Nuevo = 1200+120 = $1320","expl":"Sumamos el aumento"}]', 'Aumento = % × valor original. Nuevo valor = original + aumento.', 'basico'),
('porcentajes', 'Inviertes $5000 al 6% anual durante 3 años (interes simple). ¿Total?', 'I = C·r·t, C=$5000, r=6%, t=3', '["$5900","$5400","$5600","$5000"]', '[{"math":"I = 5000×0.06×3 = $900","expl":"Formula de interes simple"},{"math":"Total = 5000+900 = $5900","expl":"Capital + intereses"}]', 'Interes simple: I = C·r·t. La tasa r en decimal (6% = 0.06).', 'intermedio'),
('porcentajes', '¿Que porcentaje de 150 es 45?', '¿45 es que % de 150?', '["30%","25%","35%","40%"]', '[{"math":"45/150 = 0.3","expl":"Dividimos la parte por el total"},{"math":"0.3×100 = 30%","expl":"Multiplicamos por 100"}]', '% = (parte/total) × 100.', 'intermedio');

-- Razones y proporciones
INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps, theory, difficulty) VALUES
('razones-proporciones', 'Si 5 metros de tela cuestan $15, ¿cuanto cuestan 8 metros?', '5m → $15, 8m → ?', '["$24","$20","$28","$18"]', '[{"math":"5/15 = 8/x","expl":"Planteamos la proporcion"},{"math":"x = (8×15)/5","expl":"Regla de tres: multiplicamos en cruz"},{"math":"x = $24","expl":"Resultado"}]', 'Regla de tres directa: a/b = c/x → x = (c×b)/a.', 'basico'),
('razones-proporciones', '4 obreros tardan 9 dias. ¿Cuanto tardan 6 obreros?', '4 obr → 9d, 6 obr → ?', '["6 dias","7 dias","5 dias","8 dias"]', '[{"math":"4×9 = 6×x","expl":"Inversa: a×b = c×x"},{"math":"36 = 6x","expl":"Multiplicamos"},{"math":"x = 6 dias","expl":"Resultado"}]', 'Regla de tres inversa: a×b = c×x. Mas obreros = menos tiempo.', 'basico'),
('razones-proporciones', 'La razon de hombres a mujeres es 4:5. Si hay 20 hombres, ¿cuantas mujeres?', '4:5 = 20:x', '["25","16","30","20"]', '[{"math":"4/5 = 20/x","expl":"Igualamos razones"},{"math":"4x = 100","expl":"Multiplicamos en cruz"},{"math":"x = 25 mujeres","expl":"Resultado"}]', 'Una razon a:b se lee "a es a b" y equivale a la fraccion a/b.', 'basico');

-- Estadistica
INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps, theory, difficulty) VALUES
('estadistica', 'Halla la media de: 6, 10, 14, 18, 22', 'Media de 6,10,14,18,22', '["14","15","13","16"]', '[{"math":"Suma = 6+10+14+18+22 = 70","expl":"Sumamos todos los datos"},{"math":"Media = 70/5 = 14","expl":"Dividimos entre el numero de datos"}]', 'Media = suma de datos / numero de datos.', 'basico'),
('estadistica', 'Halla la mediana de: 3, 8, 2, 9, 5', 'Mediana de 3,8,2,9,5', '["5","3","8","9"]', '[{"math":"Ordenamos: 2,3,5,8,9","expl":"Ordenamos de menor a mayor"},{"math":"Mediana = 5","expl":"Valor central (tercero de 5)"}]', 'La mediana es el valor central cuando los datos estan ordenados.', 'basico');

-- Probabilidad
INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps, theory, difficulty) VALUES
('probabilidad', 'Probabilidad de sacar un 5 al lanzar un dado', 'P(5) en un dado', '["1/6","1/3","1/2","5/6"]', '[{"math":"Casos favorables: 1 (el 5)","expl":"Solo un 5 en el dado"},{"math":"Casos posibles: 6","expl":"El dado tiene 6 caras"},{"math":"P = 1/6","expl":"Probabilidad"}]', 'Probabilidad = casos favorables / casos posibles. Siempre entre 0 y 1.', 'basico');

SELECT '✅ Nuevos temas, teoria y ejercicios agregados exitosamente.' AS mensaje;
