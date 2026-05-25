const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { Pool } = require('pg');

const DEFAULT_XLSX = 'C:/Users/jesqu/Downloads/ejercicios_fase3.xlsx';
const APPLY = process.argv.includes('--apply');
const DELETE_EXISTING = process.argv.includes('--delete-existing');
const INPUT_FILE = process.argv.find(arg => arg.endsWith('.xlsx')) || DEFAULT_XLSX;
const SOURCE_FILE = path.basename(INPUT_FILE);
const CATEGORY = 'fase3_mep';
const OMIT_IDS = new Set(['399']);

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const serverText = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');
  const match = serverText.match(/const DEFAULT_DATABASE_URL = '([^']+)'/);
  if (!match) throw new Error('No se encontró DEFAULT_DATABASE_URL en server.js');
  return match[1];
}

function normalizeDatabaseUrl(rawUrl) {
  const parsed = new URL(rawUrl);
  if (parsed.hostname.includes('aivencloud.com') && parsed.searchParams.get('sslmode') === 'require') {
    parsed.searchParams.set('sslmode', 'no-verify');
  }
  return parsed.toString();
}

function gradeFromMep(value) {
  const match = String(value || '').match(/(\d+)\s*°/);
  return match ? Number(match[1]) : null;
}

function parseJsonCell(row, field) {
  try {
    return JSON.parse(row[field] || '[]');
  } catch (err) {
    throw new Error(`ID ${row.ID}: ${field} no es JSON válido: ${err.message}`);
  }
}

function uniqueOptions(options) {
  const seen = new Set();
  return options
    .map(value => String(value ?? '').trim())
    .filter(value => value && !/ver opciones completas en pdf/i.test(value))
    .filter(value => {
      const key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function buildOptions(row, stats) {
  const originalOptions = parseJsonCell(row, 'Opciones');
  const correct = String(row['Respuesta correcta'] || '').trim();
  let options = uniqueOptions(originalOptions);
  let correctIndex = options.findIndex(option => option === correct);
  let repaired = false;

  if (correctIndex < 0) {
    options = uniqueOptions([correct, ...options]);
    correctIndex = options.findIndex(option => option === correct);
    repaired = true;
    stats.repairedCorrectOptions++;
  }

  if (correctIndex < 0 || options.length < 2) {
    throw new Error(`ID ${row.ID}: no se pudo construir opciones funcionales`);
  }

  return {
    value: { o: options, ci: correctIndex },
    repaired,
    originalOptions
  };
}

function buildExercise(row, stats) {
  const id = String(row.ID || '').trim();
  if (OMIT_IDS.has(id)) {
    stats.omitted.push({ id, reason: 'Respuesta y opciones incompatibles con el enunciado revisado' });
    return null;
  }

  const grade = gradeFromMep(row['Grado MEP']);
  if (!grade) throw new Error(`ID ${id}: no tiene grado MEP reconocible`);

  const options = buildOptions(row, stats);
  const steps = parseJsonCell(row, 'Pasos solución');
  if (!Array.isArray(steps)) throw new Error(`ID ${id}: Pasos solución debe ser un array`);

  return {
    topic_id: String(row['Topic (original)'] || '').trim(),
    question: String(row.Pregunta || '').trim(),
    latex_content: String(row.LaTeX || '').trim() || null,
    options: options.value,
    solution_steps: steps,
    theory: null,
    difficulty: String(row.Dificultad || 'basico').trim() || 'basico',
    category: CATEGORY,
    exam_year: null,
    source: String(row.Fuente || '').trim() || `${SOURCE_FILE}#ID:${id}`,
    imagen: null,
    nivel: String(grade),
    archivo_origen: SOURCE_FILE,
    metadata: {
      id_original: id,
      grado_mep: String(row['Grado MEP'] || '').trim(),
      grado_mep_num: grade,
      area_mep: String(row['Área MEP'] || '').trim(),
      tema_mep: String(row['Tema MEP'] || '').trim(),
      nivel_original: String(row.Nivel || '').trim(),
      respuesta_correcta: String(row['Respuesta correcta'] || '').trim(),
      opciones_reparadas: options.repaired,
      opciones_originales: options.repaired ? options.originalOptions : undefined
    }
  };
}

function loadExercises() {
  const workbook = XLSX.readFile(INPUT_FILE, { raw: false });
  const sheet = workbook.Sheets.Sheet1 || workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
  const stats = { repairedCorrectOptions: 0, omitted: [], duplicates: [] };
  const seen = new Set();
  const exercises = [];

  for (const row of rows) {
    const exercise = buildExercise(row, stats);
    if (!exercise) continue;
    const duplicateKey = [exercise.topic_id, exercise.question, exercise.latex_content || ''].join('\u0001');
    if (seen.has(duplicateKey)) {
      stats.duplicates.push({ id: exercise.metadata.id_original, question: exercise.question.slice(0, 120) });
      continue;
    }
    seen.add(duplicateKey);
    exercises.push(exercise);
  }

  return { totalRows: rows.length, exercises, stats };
}

async function main() {
  const { totalRows, exercises, stats } = loadExercises();
  const byGrade = {};
  const byTopic = {};
  const byDifficulty = {};
  for (const exercise of exercises) {
    byGrade[exercise.nivel] = (byGrade[exercise.nivel] || 0) + 1;
    byTopic[exercise.topic_id] = (byTopic[exercise.topic_id] || 0) + 1;
    byDifficulty[exercise.difficulty] = (byDifficulty[exercise.difficulty] || 0) + 1;
  }

  console.log(JSON.stringify({
    mode: APPLY ? 'apply' : 'dry-run',
    input: INPUT_FILE,
    totalRows,
    prepared: exercises.length,
    omitted: stats.omitted,
    duplicateRowsSkipped: stats.duplicates.length,
    repairedCorrectOptions: stats.repairedCorrectOptions,
    byGrade,
    byDifficulty,
    topics: Object.keys(byTopic).length
  }, null, 2));

  if (!APPLY) return;
  if (!DELETE_EXISTING) throw new Error('Para cargar en vivo use también --delete-existing');

  const pool = new Pool({
    connectionString: normalizeDatabaseUrl(getDatabaseUrl()),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000
  });

  try {
    await pool.query('BEGIN');
    await pool.query("ALTER TABLE exercises ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb");
    const before = await pool.query('SELECT COUNT(*)::int AS total FROM exercises');
    await pool.query('DELETE FROM exercises');
    const cols = '(topic_id, question, latex_content, options, solution_steps, theory, difficulty, category, exam_year, source, imagen, nivel, archivo_origen, metadata)';
    const batchSize = 200;
    for (let start = 0; start < exercises.length; start += batchSize) {
      const batch = exercises.slice(start, start + batchSize);
      const params = [];
      const values = batch.map((exercise, rowIndex) => {
        const base = rowIndex * 14;
        params.push(
          exercise.topic_id,
          exercise.question,
          exercise.latex_content,
          JSON.stringify(exercise.options),
          JSON.stringify(exercise.solution_steps),
          exercise.theory,
          exercise.difficulty,
          exercise.category,
          exercise.exam_year,
          exercise.source,
          exercise.imagen,
          exercise.nivel,
          exercise.archivo_origen,
          JSON.stringify(exercise.metadata)
        );
        return `($${base + 1},$${base + 2},$${base + 3},$${base + 4}::jsonb,$${base + 5}::jsonb,$${base + 6},$${base + 7},$${base + 8},$${base + 9},$${base + 10},$${base + 11},$${base + 12},$${base + 13},$${base + 14}::jsonb)`;
      }).join(',');
      await pool.query(`INSERT INTO exercises ${cols} VALUES ${values}`, params);
    }
    await pool.query('COMMIT');

    const after = await pool.query('SELECT COUNT(*)::int AS total FROM exercises');
    const gradeRows = await pool.query("SELECT nivel, COUNT(*)::int total FROM exercises GROUP BY nivel ORDER BY nivel::int");
    const topicRows = await pool.query('SELECT COUNT(DISTINCT topic_id)::int total FROM exercises');
    console.log(JSON.stringify({
      deletedExisting: before.rows[0].total,
      inserted: after.rows[0].total,
      distinctTopics: topicRows.rows[0].total,
      grades: gradeRows.rows
    }, null, 2));
  } catch (err) {
    await pool.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
