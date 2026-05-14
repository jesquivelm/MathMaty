const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathmaty',
  password: 'Calg.1984',
  port: 5432,
});

const EXERCISES = [
  {
    "topic": "factorizacion",
    "question": "Sume los siguientes polinomios: (4x - 3 + 8y) + (3x - y + 1)",
    "latex": "(4x - 3 + 8y) + (3x - y + 1)",
    "options": ["7x + 7y - 2", "7x + 9y - 4", "x + 7y - 2", "7x + 7y + 2"],
    "steps": [
      {"math": "(4x + 3x) + (8y - y) + (-3 + 1)", "expl": "Agrupar términos semejantes (x, y, y constantes)."},
      {"math": "7x + 7y - 2", "expl": "Realizar las sumas y restas correspondientes."}
    ],
    "theory": "La suma de polinomios consiste en agrupar términos que tienen la misma parte literal (mismas letras con mismos exponentes) y sumar sus coeficientes."
  },
  {
    "topic": "factorizacion",
    "question": "Sume los polinomios: (4m^3 + n^6) + (n^6 + 3m^3) + (-n^6 + 2m^3)",
    "latex": "(4m^3 + n^6) + (n^6 + 3m^3) + (-n^6 + 2m^3)",
    "options": ["9m^3 + n^6", "7m^3 + 2n^6", "9m^3 + 3n^6", "7m^3 + n^6"],
    "steps": [
      {"math": "(4m^3 + 3m^3 + 2m^3) + (n^6 + n^6 - n^6)", "expl": "Agrupar términos semejantes de m^3 y n^6."},
      {"math": "9m^3 + n^6", "expl": "Sumar los coeficientes de cada grupo."}
    ],
    "theory": "Al sumar términos semejantes, solo se modifican los coeficientes numéricos; los exponentes permanecen iguales."
  },
  {
    "topic": "factorizacion",
    "question": "Reste los polinomios: (5xy^2 + 4x^2y + 5xy - 2) - (4 - yx^2 + y^2x + xy)",
    "latex": "(5xy^2 + 4x^2y + 5xy - 2) - (4 - yx^2 + y^2x + xy)",
    "options": ["4xy^2 + 5x^2y + 4xy - 6", "6xy^2 + 3x^2y + 4xy - 6", "4xy^2 + 5x^2y + 6xy + 2", "5xy^2 + 4x^2y + 4xy - 6"],
    "steps": [
      {"math": "5xy^2 + 4x^2y + 5xy - 2 - 4 + yx^2 - y^2x - xy", "expl": "Cambiar los signos del segundo polinomio debido al signo negativo exterior."},
      {"math": "(5xy^2 - y^2x) + (4x^2y + yx^2) + (5xy - xy) + (-2 - 4)", "expl": "Agrupar términos semejantes (notar que xy^2 = y^2x y x^2y = yx^2)."},
      {"math": "4xy^2 + 5x^2y + 4xy - 6", "expl": "Simplificar cada grupo."}
    ],
    "theory": "La resta de polinomios requiere cambiar el signo de todos los términos del sustraendo (el polinomio que está después del signo menos) y luego proceder como una suma normal."
  },
  {
    "topic": "factorizacion",
    "question": "Multiplique el monomio por el polinomio: -3a^2(5a^2 - a^2)",
    "latex": "-3a^2(5a^2 - a^2)",
    "options": ["-12a^4", "-15a^4 + 3a^4", "12a^4", "-18a^4"],
    "steps": [
      {"math": "-3a^2(4a^2)", "expl": "Primero simplificar dentro del paréntesis: 5a^2 - a^2 = 4a^2."},
      {"math": "(-3 \\times 4)(a^2 \\times a^2)", "expl": "Multiplicar los coeficientes y sumar los exponentes de las letras iguales."},
      {"math": "-12a^4", "expl": "Resultado final."}
    ]
  },
  {
    "topic": "factorizacion",
    "question": "Multiplique el monomio por el polinomio: 7z(-3z^9 + 4z - 5)",
    "latex": "7z(-3z^9 + 4z - 5)",
    "options": ["-21z^{10} + 28z^2 - 35z", "-21z^9 + 28z - 35", "-21z^{10} + 11z^2 - 12z", "21z^{10} - 28z^2 + 35z"],
    "steps": [
      {"math": "7z(-3z^9) + 7z(4z) + 7z(-5)", "expl": "Aplicar la propiedad distributiva: el monomio multiplica a cada término del polinomio."},
      {"math": "-21z^{1 + 9} + 28z^{1 + 1} - 35z", "expl": "Multiplicar coeficientes y sumar exponentes de z."},
      {"math": "-21z^{10} + 28z^2 - 35z", "expl": "Resultado simplificado."}
    ]
  },
  {
    "topic": "factorizacion",
    "question": "Multiplique los binomios: (3x + 4y)(5x - 6y)",
    "latex": "(3x + 4y)(5x - 6y)",
    "options": ["15x^2 + 2xy - 24y^2", "15x^2 - 2xy - 24y^2", "15x^2 + 38xy - 24y^2", "8x^2 + 2xy - 2y^2"],
    "steps": [
      {"math": "3x(5x) + 3x(-6y) + 4y(5x) + 4y(-6y)", "expl": "Aplicar la propiedad distributiva (cada término del primero por cada término del segundo)."},
      {"math": "15x^2 - 18xy + 20xy - 24y^2", "expl": "Realizar las multiplicaciones individuales."},
      {"math": "15x^2 + 2xy - 24y^2", "expl": "Reducir los términos semejantes (-18xy + 20xy = 2xy)."}
    ]
  },
  {
    "topic": "factorizacion",
    "question": "Multiplique el binomio por el trinomio: (a - 3)(a^2 - a + 4)",
    "latex": "(a - 3)(a^2 - a + 4)",
    "options": ["a^3 - 4a^2 + 7a - 12", "a^3 - a^2 + 4a - 12", "a^3 - 4a^2 + a - 12", "a^3 + 4a^2 - 7a + 12"],
    "steps": [
      {"math": "a(a^2 - a + 4) - 3(a^2 - a + 4)", "expl": "Distribuir cada término del binomio sobre el trinomio."},
      {"math": "(a^3 - a^2 + 4a) + (-3a^2 + 3a - 12)", "expl": "Realizar las multiplicaciones."},
      {"math": "a^3 + (-a^2 - 3a^2) + (4a + 3a) - 12", "expl": "Agrupar términos semejantes."},
      {"math": "a^3 - 4a^2 + 7a - 12", "expl": "Resultado final."}
    ]
  },
  {
    "topic": "ecuaciones",
    "question": "Calcule el valor numérico de 3x^2 + 5xy si x = 2/3 e y = 5.",
    "latex": "3x^2 + 5xy, \\quad x = 2/3, \\quad y = 5",
    "options": ["18", "16", "20", "22"],
    "steps": [
      {"math": "3(2/3)^2 + 5(2/3)(5)", "expl": "Sustituir los valores de x y y en la expresión."},
      {"math": "3(4/9) + (50/3)", "expl": "Elevar al cuadrado (2/3)^2 = 4/9 y multiplicar 5*2/3*5 = 50/3."},
      {"math": "4/3 + 50/3", "expl": "Simplificar 3 * 4/9 = 4/3."},
      {"math": "54/3 = 18", "expl": "Sumar las fracciones con igual denominador."}
    ]
  },
  {
    "topic": "ecuaciones",
    "question": "Calcule el valor numérico de 1/2x^2 - xy si x = 3 e y = -2.",
    "latex": "1/2x^2 - xy, \\quad x = 3, \\quad y = -2",
    "options": ["10.5", "7.5", "1.5", "13.5"],
    "steps": [
      {"math": "1/2(3)^2 - (3)(-2)", "expl": "Sustituir x=3 y y=-2 en la expresión."},
      {"math": "1/2(9) - (-6)", "expl": "Calcular la potencia (3^2=9) y el producto (3*-2=-6)."},
      {"math": "4.5 + 6", "expl": "Multiplicar 1/2*9 = 4.5 y aplicar ley de signos -(-6) = +6."},
      {"math": "10.5", "expl": "Resultado final."}
    ]
  },
  {
    "topic": "factorizacion",
    "question": "¿Son semejantes los monomios 5xy^3 y 6y^3x?",
    "latex": "5xy^3, \\quad 6y^3x",
    "options": ["Sí, son semejantes", "No, los coeficientes son diferentes", "No, el orden de las letras es diferente", "No, falta una variable"],
    "steps": [
      {"math": "xy^3 \\text{ vs } y^3x", "expl": "Identificar el factor literal (letras y exponentes) de ambos monomios."},
      {"math": "y^3x = xy^3", "expl": "Aplicar la propiedad conmutativa del producto: el orden de los factores no altera el producto."},
      {"math": "xy^3 = xy^3", "expl": "Comparar: los factores literales son idénticos."},
      {"math": "\\text{Sí}", "expl": "Concluir que son semejantes porque tienen las mismas letras con los mismos exponentes."}
    ]
  }
];

async function main() {
    console.log('Ingestando ejercicios desde PDF...');
    for (const ex of EXERCISES) {
        await pool.query(
            'INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps) VALUES ($1, $2, $3, $4, $5)',
            [ex.topic, ex.question, ex.latex, JSON.stringify(ex.options), JSON.stringify(ex.steps)]
        );
    }
    console.log('¡10 Ejercicios del material cargados exitosamente!');
    process.exit(0);
}

main();
