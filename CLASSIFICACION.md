# Guía de Clasificación de Ejercicios por Nivel MEP

## Valores del campo `nivel`

| ID | Nombre | Descripción |
|----|--------|-------------|
| `primaria` | Primaria (I-II Ciclo) | 1° a 6° año. Operaciones básicas, fracciones, geometría elemental, medidas. |
| `7mo` | 7° año / Ujarrás | Números enteros, geometría plana, introducción al álgebra, estadística básica. |
| `8vo` | 8° año / Térraba | Racionales, cuadriláteros, semejanza, polinomios, productos notables, funciones. |
| `9no` | 9° año / Zapandí | Reales, Pitágoras, trigonometría, factorización, ecuaciones cuadráticas, funciones lineal y cuadrática. |
| `10-11` | 10°-11° / Bachillerato | Circunferencia analítica, funciones exponencial/logarítmica, composición, inversa, probabilidad axiomática. |
| `tec-paa` | TEC / PAA (Admisión) | Razonamiento lógico, matemático y verbal para pruebas de admisión al TEC. |

## Reglas para clasificar ejercicios nuevos

### 1. Identificar el origen del PDF
- **Folletos TEC / PAA / UNA / UCR** → `nivel = tec-paa`
- **Temarios MEP de III Ciclo o Educación Abierta** → clasificar por contenido según tabla abajo
- **Libros de texto de secundaria** → clasificar por tema

### 2. Mapeo rápido por área temática

#### `primaria` (I-II Ciclo)
- Suma, resta, multiplicación, división básica
- Fracciones simples (propias, impropias, mixtas)
- Decimales básicos
- Perímetros y áreas de figuras simples
- Monedas, tiempo, calendario
- Gráficos de barras y circulares simples
- MCM y MCD básico
- Porcentajes simples

#### `7mo` (Ujarrás)
- Números enteros (negativos, valor absoluto, operaciones)
- Números racionales (concepto básico)
- Recta numérica, relaciones de orden
- Geometría: punto, recta, plano, ángulos, paralelas y transversales
- Triángulos (suma de ángulos internos, desigualdad triangular)
- Plano cartesiano básico
- Variables, expresiones algebraicas, valor numérico
- Ecuaciones lineales simples (`ax + b = c`)
- Estadística: población, muestra, variables, media, moda, mediana

#### `8vo` (Térraba)
- Números racionales (operaciones combinadas, decimales periódicos)
- Cuadriláteros (propiedades, áreas)
- Teorema de Tales
- Semejanza de triángulos (criterios LAL, LLL, AAA)
- Homotecias
- Prismas y pirámides (área lateral y total)
- Polinomios (suma, resta, multiplicación)
- Productos notables: `(a+b)²`, `(a-b)²`, `(a+b)(a-b)`
- Funciones (dominio, ámbito, representaciones)
- Ecuaciones de 1er grado avanzadas
- Espacios muestrales, diagramas de árbol

#### `9no` (Zapandí)
- Números irracionales y reales
- Radicales (simplificación, operaciones)
- Racionalización de denominadores
- Teorema de Pitágoras
- Trigonometría (seno, coseno, tangente, ángulos de elevación/depresión)
- Cilindros y esferas (secciones planas)
- Factorización (6 métodos: factor común, agrupación, diferencia de cuadrados, TCP, tanteo, combinados)
- Fracciones algebraicas
- Ecuaciones cuadráticas (discriminante, fórmula general)
- Función lineal (pendiente, intersecciones, paralelas, perpendiculares)
- Función cuadrática (vértice, concavidad, intersecciones)
- Cuartiles, diagramas de cajas
- Probabilidad condicional

#### `10-11` (Bachillerato)
- Circunferencia (ecuación canónica, posiciones relativa de punto/recta)
- Polígonos en el plano cartesiano (distancia, perímetro, área por determinantes)
- Transformaciones isométricas (reflexión, rotación, traslación, homotecia)
- Secciones cónicas
- Intervalos (unión, intersección, diferencia, complemento)
- Composición de funciones
- Función inversa
- Función raíz cuadrada
- Función exponencial y logarítmica
- Ecuaciones exponenciales y logarítmicas
- Sistemas de ecuaciones 2×2
- Varianza, desviación estándar, coeficiente de variación
- Puntuaciones Z
- Probabilidad axiomática (adición, complemento, eventos independientes)

#### `tec-paa` (Admisión TEC)
- Razonamiento lógico (silogismos, tablas de verdad, patrones)
- Razonamiento matemático (conteo, proporciones, secuencias, figuras)
- Razonamiento verbal (vocabulario en contexto, inferencias, coherencia textual)
- Ejercicios sin calculadora
- Problemas de admisión TEC, PAA, UNA, UCR

### 3. Casos especiales
- **Ejercicios de lógica pura** (tablas de verdad, proposiciones): si son estilo admisión → `tec-paa`; si son curriculares → `9no`
- **Ejercicios de probabilidad básica** (dados, monedas): `8vo`
- **Ejercicios de probabilidad avanzada** (condicional, eventos independientes): `9no` o `10-11`
- **Ejercicios de estadística** con cuartiles/boxplot: `9no`; con varianza/CV/Z: `10-11`
- **Ejercicios TEC con figuras geométricas** → `tec-paa` (son de admisión, no curriculares)

## Notas
- Los ejercicios de `primaria` hasta `10-11` siguen el programa del MEP de Costa Rica.
- Los ejercicios `tec-paa` son para pruebas de admisión universitaria (TEC, UNA, UCR).
- Un ejercicio puede tener múltiples niveles si aplica, pero se asigna el más alto.
- Si hay duda, priorizar el nivel más específico que cubra el contenido.
