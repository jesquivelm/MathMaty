const { Pool } = require('pg');
const fetch = require('node-fetch'); // Make sure to npm install node-fetch if not present

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathmaty',
  password: 'Calg.1984',
  port: 5432,
});

const TOPICS = [
    { name: 'Factorización', id: 'factorizacion' },
    { name: 'Fracciones Algebraicas', id: 'fracciones-alg' },
    { name: 'Ecuaciones', id: 'ecuaciones' },
    { name: 'Inecuaciones', id: 'inecuaciones' },
    { name: 'Exponenciales y Logaritmos', id: 'exp-log' },
    { name: 'Trigonometría', id: 'trigonometria' }
];

async function generateAndInsert(topic, apiKey) {
    console.log(`Generando ejercicios para ${topic.name}...`);
    for (let i = 0; i < 50; i++) {
        try {
            const systemPrompt = `Eres un tutor de matemáticas del TEC. Genera un ejercicio de ${topic.name}. 
            Responde SOLO con un JSON: {
                "pregunta": "texto",
                "latex": "formula",
                "opciones": ["correcta", "d1", "d2", "d3"],
                "pasos": [{"math": "...", "expl": "..."}]
            }`;
            
            const resp = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: 'Genera un ejercicio desafiante.' }]
                })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error.message);
            
            const exercise = JSON.parse(data.choices[0].message.content);

            await pool.query(
                'INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps) VALUES ($1, $2, $3, $4, $5)',
                [topic.id, exercise.pregunta, exercise.latex, JSON.stringify(exercise.opciones), JSON.stringify(exercise.pasos)]
            );
            console.log(`[${i+1}/50] Insertado.`);
        } catch (e) {
            console.error(`Error en iteración ${i}:`, e.message);
        }
    }
}

async function main() {
    const apiKey = process.argv[2];
    if (!apiKey) {
        console.error('Por favor, proporciona una API Key: node populate_db.js TU_API_KEY');
        process.exit(1);
    }

    for (const topic of TOPICS) {
        await generateAndInsert(topic, apiKey);
    }
    console.log('¡Base de datos poblada!');
    process.exit(0);
}

main();
