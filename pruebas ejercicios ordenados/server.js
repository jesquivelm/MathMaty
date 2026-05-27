const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3456;
const EXCEL_FILE = path.join(__dirname, 'ejercicios_fase3_ordenado.xlsx');
const KATEX_PATH = path.join(__dirname, '..', 'node_modules', 'katex', 'dist');
const FP_PATH = path.join(__dirname, '..', 'node_modules', 'function-plot', 'dist');
const FLAGS_FILE = path.join(__dirname, 'flags.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/katex', express.static(KATEX_PATH));
app.use('/function-plot', express.static(FP_PATH));

// GET /api/sheets — list all sheets with counts
app.get('/api/sheets', (req, res) => {
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    const sheets = wb.SheetNames.map(name => ({
      name,
      count: XLSX.utils.sheet_to_json(wb.Sheets[name]).length
    }));
    res.json(sheets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/sheet/:name — get all rows from a sheet
app.get('/api/sheet/:name', (req, res) => {
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    const name = req.params.name;
    if (!wb.Sheets[name]) return res.status(404).json({ error: 'Sheet not found' });
    const data = XLSX.utils.sheet_to_json(wb.Sheets[name]);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/sheet/:name/:id — update a single row by ID
app.put('/api/sheet/:name/:id', (req, res) => {
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    const name = req.params.name;
    const id = parseInt(req.params.id);
    const updates = req.body;

    if (!wb.Sheets[name]) return res.status(404).json({ error: 'Sheet not found' });

    const data = XLSX.utils.sheet_to_json(wb.Sheets[name]);
    const idx = data.findIndex(r => r.ID === id);
    if (idx === -1) return res.status(404).json({ error: 'Exercise not found' });

    // Apply updates
    Object.assign(data[idx], updates);

    // Write back
    const ws = XLSX.utils.json_to_sheet(data);
    // Preserve column order from original
    const origWs = wb.Sheets[name];
    if (origWs['!ref']) ws['!ref'] = origWs['!ref'];
    if (origWs['!cols']) ws['!cols'] = origWs['!cols'];

    // Preserve column order: start with original keys, append any new keys from updates
    const allKeys = new Set();
    data.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)));
    const keys = Object.keys(data[0]).concat(
      [...allKeys].filter(k => !Object.keys(data[0]).includes(k))
    );
    const orderedData = data.map(row => {
      const ordered = {};
      keys.forEach(k => { ordered[k] = row[k]; });
      return ordered;
    });
    const newWs = XLSX.utils.json_to_sheet(orderedData);
    wb.Sheets[name] = newWs;

    XLSX.writeFile(wb, EXCEL_FILE);
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/sheet/:name/batch — update many rows at once
app.post('/api/sheet/:name/batch', (req, res) => {
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    const name = req.params.name;
    const updates = req.body; // array of { ID, ...fields }

    if (!wb.Sheets[name]) return res.status(404).json({ error: 'Sheet not found' });

    const data = XLSX.utils.sheet_to_json(wb.Sheets[name]);
    let updated = 0;
    for (const upd of updates) {
      const idx = data.findIndex(r => r.ID === upd.ID);
      if (idx >= 0) {
        Object.assign(data[idx], upd);
        updated++;
      }
    }

    const allKeys = new Set();
    data.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)));
    const keys = Object.keys(data[0]).concat(
      [...allKeys].filter(k => !Object.keys(data[0]).includes(k))
    );
    const orderedData = data.map(row => {
      const ordered = {};
      keys.forEach(k => { ordered[k] = row[k]; });
      return ordered;
    });
    wb.Sheets[name] = XLSX.utils.json_to_sheet(orderedData);
    XLSX.writeFile(wb, EXCEL_FILE);
    res.json({ ok: true, updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// === FLAGS API ===
function loadFlags() {
  if (!fs.existsSync(FLAGS_FILE)) fs.writeFileSync(FLAGS_FILE, '{}', 'utf8');
  return JSON.parse(fs.readFileSync(FLAGS_FILE, 'utf8'));
}

// GET /api/flags — get all flags
app.get('/api/flags', (req, res) => {
  try { res.json(loadFlags()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/flags/:name/:id — toggle a flag for one exercise
app.put('/api/flags/:name/:id', (req, res) => {
  try {
    const name = req.params.name;
    const id = parseInt(req.params.id);
    const { category, type, active } = req.body;
    const flags = loadFlags();
    if (!flags[name]) flags[name] = {};
    if (!flags[name][id]) flags[name][id] = {};
    if (active) { flags[name][id][category] = type; }
    else { delete flags[name][id][category]; if (!Object.keys(flags[name][id]).length) delete flags[name][id]; }
    fs.writeFileSync(FLAGS_FILE, JSON.stringify(flags, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// === CLASSIFICATION API ===
const SPANISH_WORD = /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{4,}/;
const LATEX_SLASH = /\\[a-zA-Z]+/;
const LATEX_RAW = /\b(sqrt|frac|sum|int|lim|log|ln|sin|cos|tan|csc|sec|cot|cdot|times|div)\s*\{/i;
const HAS_DOLLAR = /\$/;
const HAS_EXP = /[a-zA-Z0-9]\)?\^[a-zA-Z0-9{]/;
const HAS_SUB = /[a-zA-Z0-9]\)?_[a-zA-Z0-9{]/;
const HAS_BRACES = /[{}]/;
const HAS_OP = /[+\-*/=]/;

function classifyPregunta(p) {
  if (!p) return 'vacio';
  const s = String(p);
  const d = HAS_DOLLAR.test(s), sc = LATEX_SLASH.test(s), rc = LATEX_RAW.test(s);
  const e = HAS_EXP.test(s), sb = HAS_SUB.test(s), sp = SPANISH_WORD.test(s);
  const br = HAS_BRACES.test(s), op = HAS_OP.test(s);
  if (d) return 'con_delimitadores';
  if (sc) return sp ? 'latex_mixto' : 'latex_puro';
  if (rc) return 'falta_backslash';
  if (e || sb) return sp ? 'notacion_mixta' : 'notacion_pura';
  if (sp && (br || op)) return 'texto_con_notacion';
  return sp ? 'solo_texto' : (br || e || sb ? 'notacion_simple' : 'solo_texto');
}

function classifyRespuesta(r) {
  if (!r) return 'vacio';
  const s = String(r);
  if (HAS_DOLLAR.test(s)) return 'con_delimitadores';
  if (LATEX_SLASH.test(s)) return 'latex';
  if (LATEX_RAW.test(s)) return 'falta_backslash';
  if (HAS_EXP.test(s) || HAS_SUB.test(s) || HAS_BRACES.test(s)) return 'notacion';
  return 'texto_plano';
}

function classifyPasos(ps) {
  if (!ps) return 'sin_pasos';
  try {
    const p = JSON.parse(ps);
    if (!Array.isArray(p) || !p.length) return 'sin_pasos';
    let anyExpl = false, anyEmpty = false, mixed = false;
    for (const s of p) {
      if (s.expl && s.expl.trim()) anyExpl = true; else anyEmpty = true;
      if (s.math && SPANISH_WORD.test(s.math)) mixed = true;
    }
    if (!anyExpl && anyEmpty) return 'sin_explicacion';
    if (mixed) return anyExpl ? 'math_mixto_con_expl' : 'math_mixto_sin_expl';
    return 'completos';
  } catch { return 'formato_invalido'; }
}

function needsSep(p) {
  if (!p) return false;
  const s = String(p);
  if (s.includes('\n')) return false;
  const hasMath = HAS_DOLLAR.test(s) || LATEX_SLASH.test(s) || LATEX_RAW.test(s) || HAS_EXP.test(s) || HAS_SUB.test(s) || (HAS_BRACES.test(s) && HAS_OP.test(s));
  return hasMath && SPANISH_WORD.test(s);
}

app.get('/api/classify/:name', (req, res) => {
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    const name = req.params.name;
    if (!wb.Sheets[name]) return res.status(404).json({ error: 'Sheet not found' });
    const data = XLSX.utils.sheet_to_json(wb.Sheets[name]);
    const result = data.map(r => ({
      ID: r.ID,
      pregunta: classifyPregunta(r.Pregunta),
      respuesta: classifyRespuesta(r['Respuesta correcta']),
      pasos: classifyPasos(r['Pasos solución']),
      necesita_separacion: needsSep(r.Pregunta),
    }));
    res.json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => {
  console.log(`Visor de ejercicios: http://localhost:${PORT}`);
  console.log(`Archivo: ${EXCEL_FILE}`);
});
