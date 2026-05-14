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
        topic_id: 'factorizacion',
        question: 'Factorice completamente la siguiente expresión:',
        latex: 'x^2 - 16',
        options: ['(x + 4)(x - 4)', '(x + 2)(x - 8)', '(x - 4)^2', 'x(x - 16)'],
        steps: [
            { math: 'x^2 - 4^2', expl: 'Identificamos que es una diferencia de cuadrados perfectos.' },
            { math: '(x + 4)(x - 4)', expl: 'Aplicamos la fórmula a^2 - b^2 = (a+b)(a-b). ¡Esta es la maña más común en exámenes!' }
        ]
    },
    {
        topic_id: 'ecuaciones',
        question: 'Resuelva la siguiente ecuación lineal:',
        latex: '3x + 5 = 17',
        options: ['x = 4', 'x = 3', 'x = 6', 'x = 2'],
        steps: [
            { math: '3x = 17 - 5', expl: 'Restamos 5 en ambos lados para despejar el término con x.' },
            { math: '3x = 12', expl: 'Simplificamos el lado derecho.' },
            { math: 'x = 12 / 3', expl: 'Dividimos por 3.' },
            { math: 'x = 4', expl: 'Resultado final.' }
        ]
    },
    {
        topic_id: 'inecuaciones',
        question: '¿Cuál es el conjunto solución de la inecuación?',
        latex: '2x - 3 > 5',
        options: ['x > 4', 'x < 4', 'x > 1', 'x < 1'],
        steps: [
            { math: '2x > 5 + 3', expl: 'Pasamos el -3 a sumar.' },
            { math: '2x > 8', expl: 'Sumamos.' },
            { math: 'x > 4', expl: 'Dividimos por 2. Como el 2 es positivo, la desigualdad no cambia.' }
        ]
    },
    {
        topic_id: 'factorizacion',
        question: 'Del siguiente grupo, identifique cuáles son monomios semejantes (Material PAEM 2020):',
        latex: '5xy^3 ; 6y^3x ; 4xy^2',
        options: ['5xy^3 y 6y^3x', '5xy^3 y 4xy^2', '6y^3x y 4xy^2', 'Ninguno es semejante'],
        steps: [
            { math: '5xy^3, 6y^3x', expl: 'Ambos tienen x elevado a 1 y y elevado a 3. El orden no altera el producto.' },
            { math: '4xy^2', expl: 'Este tiene y elevado a 2, por lo que no es semejante a los otros. Recuerda la maña: ¡los exponentes deben ser idénticos!' }
        ]
    }
];

async function main() {
    console.log('Insertando ejercicios de muestra...');
    for (const ex of EXERCISES) {
        await pool.query(
            'INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps) VALUES ($1, $2, $3, $4, $5)',
            [ex.topic_id, ex.question, ex.latex, JSON.stringify(ex.options), JSON.stringify(ex.steps)]
        );
    }
    console.log('Muestras insertadas. ¡Revisa la app!');
    process.exit(0);
}

main();
