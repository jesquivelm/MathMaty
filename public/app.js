// MathMaty v2.0 - Engine Completo
const API = '';
const state = {
  user: null, hp: 100, xp: 0, streak: 0, nivel: 1,
  currentTopic: null, currentDiff: 'basico', currentExercise: null,
  correctCount: 0, view: 'auth',
  token: localStorage.getItem('mathmaty_token'),
  missionState: null, examTimer: null, activeEvent: null,
  whiteboardColor: '#3b82f6', whiteboardSize: 3, whiteboardMode: 'pen',
  eraserSize: 20,
  nivel_educativo: null, selected_topics: null
};

// DoomGuy video slots: 12 videos + 1 PNG
// Format: { threshold, label, idleKey, hitKey, img, isStatic }
const DOOM_HP_RANGES = [
  { threshold: 100, label: '100% HP — Reposo',      idleKey: 'idle_100',     hitKey: null,        img: '1.png',  isStatic: false },
  { threshold: 75,  label: '75% HP — Transición',   idleKey: null,           hitKey: 'hit_75',    img: null,     isStatic: false, isTransition: true },
  { threshold: 75,  label: '75% HP — Reposo',       idleKey: 'idle_75',      hitKey: null,        img: '4.png',  isStatic: false },
  { threshold: 50,  label: '50% HP — Transición',   idleKey: null,           hitKey: 'hit_50',    img: null,     isStatic: false, isTransition: true },
  { threshold: 50,  label: '50% HP — Reposo',       idleKey: 'idle_50',      hitKey: null,        img: '6.png',  isStatic: false },
  { threshold: 25,  label: '25% HP — Transición',   idleKey: null,           hitKey: 'hit_25',    img: null,     isStatic: false, isTransition: true },
  { threshold: 25,  label: '25% HP — Reposo',       idleKey: 'idle_25',      hitKey: null,        img: '9.png',  isStatic: false },
  { threshold: 10,  label: '10% HP — Transición',   idleKey: null,           hitKey: 'hit_10',    img: null,     isStatic: false, isTransition: true },
  { threshold: 10,  label: '10% HP — Reposo',       idleKey: 'idle_10',      hitKey: null,        img: '11.png', isStatic: false },
  { threshold: 0,   label: 'Muerte — Balazo final', idleKey: null,           hitKey: 'hit_0',     img: null,     isStatic: false, isTransition: true },
  { threshold: 0,   label: 'Muerte — Reposo',       idleKey: null,           hitKey: null,        img: '14.png', isStatic: true },
];

// HP thresholds for states: each slot covers (next_lower, threshold]
const DOOM_HIT_THRESHOLDS = [100, 75, 50, 25, 10, 0];
let _doomVideos = {};

async function loadDoomVideos() {
  try {
    const r = await fetch('/api/doom-videos');
    _doomVideos = await r.json();
    window._doomVideos = _doomVideos;
  } catch(e) { _doomVideos = {}; window._doomVideos = {}; }
}

async function reloadDoomVideos() {
  await loadDoomVideos();
}

function getDoomThreshold(hp) {
  for (let i = 1; i < DOOM_HIT_THRESHOLDS.length; i++) {
    const upper = DOOM_HIT_THRESHOLDS[i - 1];
    const lower = DOOM_HIT_THRESHOLDS[i];
    if (hp > lower && hp <= upper) return upper;
  }
  return 0; // dead or edge
}

let _prevHp = 100;
let _doomPlayingHit = false;
let _doomDeathPlayed = false;

const TOPICS = [
  { id:'conjuntos', name:'Teor&iacute;a de Conjuntos', icon:'ti-circle', parcial:1, teoria:'Conceptos de conjuntos, uni&oacute;n, intersecci&oacute;n, diferencia y complemento. Base para entender l&oacute;gica matem&aacute;tica.' },
  { id:'numeros-reales', name:'N&uacute;meros Reales', icon:'ti-number', parcial:1, teoria:'Clasificaci&oacute;n de n&uacute;meros (naturales, enteros, racionales, irracionales), propiedades y operaciones en la recta num&eacute;rica.' },
  { id:'radicales', name:'Radicales y Potencias', icon:'ti-square-root', parcial:1, teoria:'Ra&iacute;ces, propiedades de radicales, racionalizaci&oacute;n y exponentes fraccionarios. Operaciones inversas de potencias.' },
  { id:'polinomios', name:'Polinomios', icon:'ti-variable', parcial:1, teoria:'Operaciones con polinomios: suma, resta, multiplicaci&oacute;n, divisi&oacute;n. T&eacute;rminos semejantes y grado del polinomio.' },
  { id:'factorizacion', name:'Factorizaci&oacute;n', icon:'ti-math-function', parcial:1, teoria:'Descomponer expresiones en factores. M&eacute;todos: factor com&uacute;n, diferencia de cuadrados, trinomio cuadrado perfecto, cubos.' },
  { id:'fracciones-alg', name:'Fracciones Algebraicas', icon:'ti-divide', parcial:1, teoria:'Fracciones con polinomios: simplificar, sumar (MCM), restar, multiplicar y dividir. Dominio de la fracci&oacute;n.' },
  { id:'ecuaciones', name:'Ecuaciones', icon:'ti-equal', parcial:1, teoria:'Igualdades con inc&oacute;gnitas. Ecuaciones lineales y cuadr&aacute;ticas. F&oacute;rmula general y discriminante.' },
  { id:'sistemas-ecuaciones', name:'Sistemas de Ecuaciones', icon:'ti-columns', parcial:1, teoria:'Sistemas 2×2 y 3×3. M&eacute;todos de sustituci&oacute;n, eliminaci&oacute;n e igualaci&oacute;n. Soluci&oacute;n &uacute;nica, infinitas o ninguna.' },
  { id:'inecuaciones', name:'Inecuaciones', icon:'ti-math-greater', parcial:2, teoria:'Desigualdades con inc&oacute;gnitas. M&eacute;todo de puntos cr&iacute;ticos. Soluci&oacute;n por intervalos. Inversi&oacute;n del signo.' },
  { id:'plano-cartesiano', name:'Plano Cartesiano y Funciones', icon:'ti-layout-grid', parcial:2, teoria:'Sistema de coordenadas, distancia entre puntos, concepto de funci&oacute;n, dominio, rango y prueba de la recta vertical.' },
  { id:'exp-log', name:'Exp. y Logaritmos', icon:'ti-trending-up', parcial:2, teoria:'Funciones exponenciales y logar&iacute;tmicas. Propiedades de logaritmos, cambio de base. Crecimiento exponencial.' },
  { id:'geometria', name:'Geometr&iacute;a', icon:'ti-shape', parcial:2, teoria:'&Aacute;reas, per&iacute;metros, vol&uacute;menes. Teorema de Pit&aacute;goras. Figuras: tri&aacute;ngulos, c&iacute;rculos, cubos, esferas.' },
  { id:'trigonometria', name:'Trigonometr&iacute;a', icon:'ti-circle-half', parcial:2, teoria:'Razones trigonom&eacute;tricas, identidad fundamental, c&iacute;rculo unitario. Ley de senos y cosenos.' },
  { id:'calculo', name:'C&aacute;lculo', icon:'ti-variable', parcial:3, teoria:'L&iacute;mites, derivadas e integrales. Reglas de derivaci&oacute;n, integraci&oacute;n y teorema fundamental del c&aacute;lculo.' },
  { id:'mcm-mcd', name:'MCM y MCD', icon:'ti-numbers', parcial:1, teoria:'M&aacute;ximo Com&uacute;n M&uacute;ltiplo y M&iacute;nimo Com&uacute;n Divisor. Relaci&oacute;n fundamental entre ellos.' },
  { id:'porcentajes', name:'Porcentajes', icon:'ti-percentage', parcial:1, teoria:'C&aacute;lculo de porcentajes, descuentos, aumentos e inter&eacute;s simple.' },
  { id:'razones-proporciones', name:'Razones y Proporciones', icon:'ti-report-analytics', parcial:1, teoria:'Razones, proporciones, regla de tres directa e inversa, proporcionalidad.' },
  { id:'estadistica', name:'Estad&iacute;stica', icon:'ti-chart-bar', parcial:2, teoria:'Estad&iacute;stica descriptiva: media, mediana, moda, varianza y gr&aacute;ficos.' },
  { id:'probabilidad', name:'Probabilidad', icon:'ti-dice', parcial:2, teoria:'Probabilidad simple, compuesta, condicional. Eventos independientes.' },
  { id:'logica', name:'L&oacute;gica', icon:'ti-brain', parcial:1, teoria:'Proposiciones, tablas de verdad, cuantificadores y conjuntos.' },
  { id:'tec-logica', name:'TEC/PAA L&oacute;gica', icon:'ti-brain', parcial:1, teoria:'Razonamiento deductivo e inductivo para admisi&oacute;n TEC: premisas, conclusiones, casos posibles, patrones y certeza.' },
  { id:'tec-matematica', name:'TEC/PAA Matem&aacute;tica', icon:'ti-calculator', parcial:1, teoria:'Problemas tipo admisi&oacute;n TEC: conteo, n&uacute;meros racionales, proporciones, secuencias, figuras y estrategia sin calculadora.' },
  { id:'tec-verbal', name:'TEC/PAA Verbal', icon:'ti-message-language', parcial:1, teoria:'Razonamiento verbal para admisi&oacute;n TEC: vocabulario en contexto, inferencias, coherencia textual, ordenamiento y s&iacute;ntesis.' },
  { id:'matrices', name:'Matrices', icon:'ti-grid', parcial:3, teoria:'Suma, multiplicaci&oacute;n, determinantes e inversa de matrices.' },
  { id:'vectores', name:'Vectores', icon:'ti-arrow-up', parcial:3, teoria:'Vectores, magnitud, direcci&oacute;n, producto punto y producto cruz.' },
  { id:'sucesiones', name:'Sucesiones y Series', icon:'ti-list', parcial:3, teoria:'Sucesiones aritm&eacute;ticas, geom&eacute;tricas y sumatorias.' },
  { id:'geo-analitica', name:'Geom. Anal&iacute;tica', icon:'ti-layout-grid', parcial:2, teoria:'Rectas, pendiente, distancia entre puntos, paralelas y perpendiculares.' }
];

const TOPIC_NAMES = Object.fromEntries(TOPICS.map(t => [t.id, t.name]));

document.addEventListener('DOMContentLoaded', async () => {
  if (state.token) { await fetchProfile(); loadGlossary(); }
  else showAuth();
  loadDoomVideos();
  initDoomWidget();
  initDraggableWhiteboard();
});

// ============================================================
// GLOSARIO
// ============================================================
let glossary = [];
async function loadGlossary() {
  try { const r = await fetch('glossary.json'); glossary = await r.json(); }
  catch(e) { console.warn('Glosario no disponible'); }
}

function highlightTerms(text) {
  let h = text;
  glossary.forEach(g => {
    const re = new RegExp(`\\b(${g.term})\\b`, 'gi');
    h = h.replace(re, `<span class="glossary-link" onclick="openGlossary('$1')">$1</span>`);
  });
  return h;
}

function openGlossary(termName) {
  const item = glossary.find(g => g.term.toLowerCase() === termName.toLowerCase());
  if (!item) return;
  document.getElementById('glossary-title').textContent = item.term;
  document.getElementById('glossary-def').textContent = item.definition;
  document.getElementById('glossary-example').textContent = item.example;
  document.getElementById('glossary-mana').textContent = item.ma&ntilde;a;
  document.getElementById('glossary-modal').classList.remove('hidden');
}

function closeGlossary() { document.getElementById('glossary-modal').classList.add('hidden'); }

// ============================================================
// AUTENTICACI&Oacute;N
// ============================================================
async function fetchProfile() {
  try {
    const r = await fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${state.token}` } });
    if (!r.ok) throw new Error('No autorizado');
    state.user = await r.json();
    state.hp = state.user.hp || 100;
    state.xp = state.user.xp || 0;
    state.streak = state.user.racha_actual || 0;
    state.nivel = state.user.nivel || 1;
    state.nivel_educativo = state.user.nivel_educativo || null;
    state.selected_topics = state.user.selected_topics || null;
    if (state.user.rol === 'padre') {
      document.getElementById('parent-btn')?.classList.remove('hidden');
      document.getElementById('game-catalog-btn')?.classList.remove('hidden');
    }
    await checkBadges();
    showView('home');
    updateUI();
  } catch(e) { logout(); }
}

function showAuth() {
  document.getElementById('auth-container').innerHTML = `
    <div class="card" style="max-width:400px;margin:4rem auto;">
      <div style="text-align:center;margin-bottom:1.5rem;">
        <h2>MathMaty</h2>
        <p style="color:var(--color-text-muted);font-size:.85rem;">Tutor de Prec&aacute;lculo TEC</p>
      </div>
      <div id="auth-error" style="color:var(--color-error);font-size:.85rem;margin-bottom:1rem;text-align:center;"></div>
      <form onsubmit="handleLogin(event)">
        <input type="text" id="username" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:.75rem;" placeholder="Usuario" required>
        <input type="password" id="password" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:1.5rem;" placeholder="Contrase&ntilde;a" required>
        <button type="submit" class="btn btn-primary" style="width:100%;">Iniciar Sesi&oacute;n</button>
      </form>
      <p style="text-align:center;margin-top:1.5rem;font-size:.85rem;color:var(--color-text-secondary);">
        &iquest;No tienes cuenta? <a href="#" onclick="showRegister()" style="color:var(--color-primary);">Reg&iacute;strate</a>
      </p>
    </div>`;
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('doom-widget').classList.add('hidden');
}

function showRegister() {
  document.getElementById('auth-container').innerHTML = `
    <div class="card" style="max-width:400px;margin:4rem auto;">
      <h2 style="text-align:center;margin-bottom:1.5rem;">Crear Cuenta</h2>
      <div id="auth-error" style="color:var(--color-error);font-size:.85rem;margin-bottom:1rem;text-align:center;"></div>
      <form onsubmit="handleRegister(event)">
        <input type="text" id="reg-username" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:.75rem;" placeholder="Usuario" required>
        <input type="text" id="reg-nombre" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:.75rem;" placeholder="Nombre Completo" required>
        <select id="reg-rol" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:.75rem;">
          <option value="estudiante">Estudiante</option>
          <option value="padre">Padre</option>
        </select>
        <select id="reg-nivel" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:.75rem;">
          <option value="primaria-1-3">Primaria (1° - 3°)</option>
          <option value="primaria-4-6">Primaria (4° - 6°)</option>
          <option value="secundaria-7-9">Secundaria (7° - 9°)</option>
          <option value="secundaria-10-11" selected>Secundaria (10° - 11°)</option>
          <option value="universitario">Universitario (Inicio)</option>
          <option value="calculo">Cálculo Avanzado</option>
        </select>
        <input type="password" id="reg-password" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:1.5rem;" placeholder="Contrase&ntilde;a" required>
        <button type="submit" class="btn btn-primary" style="width:100%;">Registrarse</button>
      </form>
      <p style="text-align:center;margin-top:1.5rem;font-size:.85rem;color:var(--color-text-secondary);">
        &iquest;Ya tienes cuenta? <a href="#" onclick="showAuth()" style="color:var(--color-primary);">Inicia sesi&oacute;n</a>
      </p>
    </div>`;
}

async function handleRegister(e) {
  e.preventDefault();
  const body = {
    username: document.getElementById('reg-username').value,
    nombre: document.getElementById('reg-nombre').value,
    rol: document.getElementById('reg-rol').value,
    password: document.getElementById('reg-password').value,
    nivel_educativo: document.getElementById('reg-nivel').value
  };
  const r = await fetch(`${API}/api/auth/register`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
  });
  if (r.ok) { alert('Registro exitoso!'); showAuth(); }
  else { const d = await r.json(); document.getElementById('auth-error').textContent = d.error; }
}

async function handleLogin(e) {
  e.preventDefault();
  const r = await fetch(`${API}/api/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ username: document.getElementById('username').value, password: document.getElementById('password').value })
  });
  const data = await r.json();
  if (r.ok) {
    localStorage.setItem('mathmaty_token', data.token);
    state.token = data.token;
    await fetchProfile();
  } else { document.getElementById('auth-error').textContent = data.error; }
}

function logout() { localStorage.removeItem('mathmaty_token'); state.token = null; window.location.reload(); }

// ============================================================
// NAVEGACI&Oacute;N
// ============================================================
function showView(view) {
  state.view = view;
  document.getElementById('auth-container')?.classList.add('hidden');
  document.getElementById('app-container')?.classList.remove('hidden');
  const dw = document.getElementById('doom-widget');
  if (dw) {
    dw.classList.remove('hidden');
    dw.style.display = 'flex';
  }
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  
  const main = document.getElementById('main-content');
  const views = {
    home: renderHome, topics: renderTopics, exercise: renderExercise,
    leaderboard: renderLeaderboard, reports: renderReports, config: renderConfig,
    'parent-dashboard': renderParentDashboard, missions: renderMissions,
    exams: renderExams, admin: renderAdmin, 'mission-run': renderMissionRun,
    events: renderEvents, badges: renderBadges, shop: renderShop,
    knowledge: renderKnowledge, 'game-catalog': renderGameCatalog
  };
  if (views[view]) views[view](main);
  else renderHome(main);
}

function toggleMobileMenu() {
  document.getElementById('sidebar')?.classList.toggle('mobile-open');
}

// ============================================================
// HOME / DASHBOARD
// ============================================================
async function renderHome(main) {
  // Obtener nivelaci&oacute;n
  let nivelData = { nivel: state.nivel, progreso_porcentaje: 0, xp_actual: state.xp, xp_proximo_nivel: (state.nivel+1)*1000, precision: 0, horas_practica: 0, racha_maxima: state.streak };
  try {
    const r = await fetch(`${API}/api/nivelacion/calcular`, { headers: { Authorization: `Bearer ${state.token}` } });
    if (r.ok) nivelData = await r.json();
  } catch(e) {}
  
  // Eventos activos
  let eventos = [];
  try {
    const r = await fetch(`${API}/api/events/activos`, { headers: { Authorization: `Bearer ${state.token}` } });
    if (r.ok) eventos = await r.json();
  } catch(e) {}
  
  const nivel = nivelData.nivel || state.nivel;
  const progreso = Math.min(100, Math.max(0, nivelData.progreso_porcentaje || 0));
  
  main.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1.5rem;">
      <div class="card hero-card">
        <div class="hero-content">
          <h2>&iexcl;Hola, ${state.user?.nombre || 'Matem&aacute;tico'}!</h2>
          <p style="color:var(--color-text-secondary);">Prec&aacute;lculo TEC — ${state.user?.rol === 'padre' ? 'Panel de Padre' : 'Tu viaje matem&aacute;tico'}</p>
          <div class="hero-actions">
            <button class="btn btn-primary" onclick="showView('topics')">
              <i class="ti ti-player-play"></i> Practicar
            </button>
            <button class="btn btn-outline" onclick="openSolver()">
              <i class="ti ti-robot"></i> Resolver
            </button>
            <button class="btn btn-outline" onclick="showView('knowledge')">
              <i class="ti ti-library"></i> Biblioteca
            </button>
            <button class="btn btn-outline" onclick="showProfilePanel()">
              <i class="ti ti-user"></i> Perfil
            </button>
          </div>
        </div>
      </div>
      
      <!-- Nivel y Progreso -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">
          <h3>Nivel ${nivel}</h3>
          <span style="color:var(--color-text-muted);font-size:.85rem;">${nivelData.xp_actual || state.xp} / ${nivelData.xp_proximo_nivel || (nivel+1)*1000} XP</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${progreso}%"></div></div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-top:1rem;">
          <div class="stat-mini"><span class="stat-value" style="color:var(--color-warning);">${state.xp}</span><span class="stat-label">XP</span></div>
          <div class="stat-mini"><span class="stat-value" style="color:var(--color-primary);">${nivel}</span><span class="stat-label">Nivel</span></div>
          <div class="stat-mini"><span class="stat-value" style="color:var(--color-error);">${nivelData.precision || 0}%</span><span class="stat-label">Precisi&oacute;n</span></div>
          <div class="stat-mini"><span class="stat-value" style="color:var(--color-success);">${nivelData.racha_maxima || 0}🔥</span><span class="stat-label">Mejor Racha</span></div>
        </div>
      </div>
      
      <!-- Eventos Activos -->
      ${eventos.length > 0 ? `
      <div class="card">
        <h3 style="margin-bottom:.75rem;"><i class="ti ti-flame" style="color:var(--color-warning);"></i> Eventos Activos</h3>
        <div class="event-carousel">
          ${eventos.map(ev => `
            <div class="event-card" onclick="showEventDetail(${ev.id})">
              <div style="display:flex;justify-content:space-between;">
                <strong>${ev.titulo}</strong>
                <span class="badge ${ev.tipo}">${ev.tipo}</span>
              </div>
              <p style="font-size:.8rem;color:var(--color-text-muted);margin:.5rem 0;">${ev.descripcion?.substring(0,80)||''}...</p>
              <span style="font-size:.75rem;color:var(--color-warning);">+${ev.xp_recompensa} XP ${ev.ya_participa ? '✓ Participando' : ''}</span>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
      
      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.75rem;">
        <div class="card stat-card"><i class="ti ti-clock"></i><p class="stat-number">${nivelData.horas_practica || 0}h</p><p class="stat-label">Pr&aacute;ctica</p></div>
        <div class="card stat-card"><i class="ti ti-medal"></i><p class="stat-number">${state.streak || 0}</p><p class="stat-label">Racha Actual</p></div>
        <div class="card stat-card"><i class="ti ti-heart"></i><p class="stat-number">${state.hp}/100</p><p class="stat-label">HP</p></div>
        <div class="card stat-card" onclick="showView('badges')" style="cursor:pointer;"><i class="ti ti-award"></i><p class="stat-number">Logros</p><p class="stat-label">Ver todos</p></div>
      </div>
    </div>`;
}

// ============================================================
// TEMAS / TOPICS
// ============================================================
function renderTopics(main) {
  const activeTopics = Array.isArray(state.selected_topics) && state.selected_topics.length > 0 ? state.selected_topics : TOPICS.map(t => t.id);
  const filtered = TOPICS.filter(t => activeTopics.includes(t.id));
  const hiddenCount = TOPICS.length - filtered.length;
  main.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:.5rem;">
      <div>
        <h2>Temas de Prec&aacute;lculo</h2>
        ${hiddenCount > 0 ? `<p style="font-size:.8rem;color:var(--color-text-muted);">${hiddenCount} temas ocultos seg&uacute;n tu nivel — <a href="#" onclick="showProfilePanel();return false;" style="color:var(--color-primary);">ajustar</a></p>` : ''}
      </div>
      <button class="btn btn-outline btn-sm" onclick="openSolver()"><i class="ti ti-robot"></i> Resolver</button>
    </div>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Selecciona un tema para practicar. Cada tema tiene teor&iacute;a, ejemplos y ejercicios.</p>
    ${filtered.length === 0 ? '<div class="card" style="text-align:center;padding:2rem;"><p style="color:var(--color-text-muted);">No hay temas activos. <a href="#" onclick="showProfilePanel();return false;" style="color:var(--color-primary);">Configura tus temas en el perfil</a></p></div>' : `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.25rem;">
    ${filtered.map(t => `
      <div class="card topic-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <i class="ti ${t.icon}" style="font-size:2rem;color:var(--color-primary);margin-bottom:.5rem;"></i>
            <h3>${t.name}</h3>
            <span class="badge parcial">Parcial ${t.parcial}</span>
          </div>
        </div>
        <p style="font-size:.85rem;color:var(--color-text-secondary);margin:.75rem 0;line-height:1.6;">${t.teoria}</p>
        <div class="topic-actions">
          <button class="btn btn-primary btn-sm" onclick="startExercise('${t.id}')"><i class="ti ti-player-play"></i> Practicar</button>
          <button class="btn btn-outline btn-sm" onclick="openKnowledgeTopic('${t.id}')"><i class="ti ti-book"></i> Teor&iacute;a</button>
          <button class="btn btn-outline btn-sm" onclick="showView('exams')"><i class="ti ti-clipboard-list"></i> Examen</button>
        </div>
      </div>
    `).join('')}
    </div>`}
`;
}

// ============================================================
// EJERCICIOS
// ============================================================
function startExercise(topicId) {
  state.currentTopic = TOPICS.find(t => t.id === topicId);
  _doomDeathPlayed = false;
  _prevHp = 100;
  showView('exercise');
}

async function renderExercise(main) {
  main.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;">
        <h2>${state.currentTopic.name}</h2>
        <div style="display:flex;gap:.35rem;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" onclick="toggleWhiteboard()"><i class="ti ti-pencil"></i> Pizarra</button>
          <button class="btn btn-outline btn-sm" onclick="openKnowledgeTopic('${state.currentTopic.id}')"><i class="ti ti-info-circle"></i> Teor&iacute;a</button>
          <button class="btn btn-outline btn-sm" onclick="openSolver()"><i class="ti ti-robot"></i> Resolver</button>
        </div>
      </div>
      <div id="exercise-split" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start;">
        <div class="card" id="ex-card">
          <div id="ex-loading">
            <p style="color:var(--color-text-muted);">Generando ejercicio...</p>
          </div>
          <div id="ex-content" class="hidden">
            <div style="display:flex;justify-content:space-between;margin-bottom:1rem;">
              <span class="badge active">EJERCICIO</span>
              <div style="display:flex;gap:.35rem;">
                <button class="btn btn-outline btn-sm" onclick="showExerciseTheory()"><i class="ti ti-info-circle"></i> Ayuda</button>
                ${['trigonometria','exp-log','calculo','plano-cartesiano'].includes(state.currentTopic.id) ? `<button class="btn btn-outline btn-sm" onclick="showExerciseGraph()"><i class="ti ti-chart-line"></i> Gr&aacute;fica</button>` : ''}
              </div>
            </div>
            <p id="ex-text" style="font-size:1.1rem;margin-bottom:1.5rem;"></p>
            <div id="ex-source" style="display:none;color:var(--color-text-muted);font-size:.78rem;margin-top:-.75rem;margin-bottom:1rem;"></div>
            <div id="ex-math" style="background:#000;padding:1.5rem;border-radius:var(--radius-md);text-align:center;margin-bottom:1.5rem;"></div>
            <div id="ex-image-container" style="display:none;margin-bottom:1.5rem;text-align:center;"></div>
            <div id="ex-graph-container" class="hidden" style="width:100%;height:250px;margin-bottom:1rem;background:var(--color-bg);border-radius:var(--radius-md);overflow:hidden;"></div>
            <div id="choice-area" class="choice-grid"></div>
            <div id="report-area" style="margin-top:.75rem;text-align:right;"><button class="btn btn-outline btn-xs" id="report-btn" style="display:none;" onclick="reportThis(this)"><i class="ti ti-flag"></i> Reportar error</button></div>
          </div>
        </div>
        <div id="resolution-area" class="hidden">
          <div class="card" style="height:100%;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;border-bottom:1px solid var(--color-border);padding-bottom:.5rem;">
              <h3 style="font-size:.95rem;"><i class="ti ti-code"></i> Resoluci&oacute;n</h3>
              <div style="display:flex;gap:.25rem;">
                <button class="btn btn-outline btn-xs" onclick="searchGoogleExercise()" title="Buscar en Google"><i class="ti ti-brand-google"></i></button>
                <button class="btn btn-outline btn-xs" onclick="openSolver()" title="Resolver con IA"><i class="ti ti-robot"></i></button>
              </div>
            </div>
            <div id="steps-container" class="step-container"></div>
            <div id="resolution-footer" class="hidden" style="margin-top:1rem;padding-top:.75rem;border-top:1px solid var(--color-border);">
              <button class="btn btn-primary btn-sm" style="width:100%;" onclick="document.getElementById('exercise-split').style.display='grid'; document.getElementById('resolution-area').classList.add('hidden'); document.getElementById('action-bar').classList.add('hidden'); generateNewExercise();">
                Siguiente Ejercicio <i class="ti ti-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="action-bar" class="hidden" style="margin-top:1rem;text-align:center;">
        <button class="btn btn-primary" onclick="document.getElementById('exercise-split').style.display='grid'; document.getElementById('resolution-area').classList.add('hidden'); document.getElementById('action-bar').classList.add('hidden'); generateNewExercise();">
          Siguiente Ejercicio <i class="ti ti-arrow-right"></i>
        </button>
      </div>
    </div>`;
  await generateNewExercise();
}

function formatExerciseSource(data) {
  if (!data?.source && !data?.exam_year) return '';
  const parts = [];
  if (data.source) parts.push(data.source);
  if (data.exam_year) parts.push(`año ${data.exam_year}`);
  return `Fuente: ${parts.join(' | ')}`;
}

async function generateNewExercise() {
  try {
    const r = await fetch(`${API}/api/ai/generate-exercise`, {
      method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
      body:JSON.stringify({ topic: state.currentTopic.id, difficulty: state.currentDiff })
    });
    const data = await r.json();
    if (data.error) throw new Error(data.error);
    
    state.currentExercise = data;
    document.getElementById('ex-loading').classList.add('hidden');
    document.getElementById('ex-content').classList.remove('hidden');
    document.getElementById('ex-text').innerHTML = data.pregunta;
    const sourceEl = document.getElementById('ex-source');
    const sourceText = formatExerciseSource(data);
    sourceEl.textContent = sourceText;
    sourceEl.style.display = sourceText ? 'block' : 'none';
    const mathEl = document.getElementById('ex-math');
    mathEl.innerHTML = '';
    mathEl.style.display = data.latex ? 'block' : 'none';
    if (data.latex) {
      try { katex.render(data.latex, mathEl, { displayMode: true, throwOnError: false }); } catch(e) {}
    }
    
    const imgEl = document.getElementById('ex-image-container');
    if (data.image) {
      imgEl.innerHTML = `<img src="${data.image}" alt="Gráfico del ejercicio" style="max-width:100%;max-height:280px;border-radius:8px;background:#fff;padding:8px;">`;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
    }
    
    const area = document.getElementById('choice-area');
    area.innerHTML = '';
    const shuffled = [...data.opciones].sort(() => Math.random() - 0.5);
    shuffled.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = c;
      btn.onclick = () => checkChoice(c, btn);
      area.appendChild(btn);
    });
    const repBtn = document.getElementById('report-btn');
    if (repBtn) { repBtn.dataset.id = data.id; repBtn.style.display = ''; }
  } catch(e) {
    document.getElementById('ex-loading').innerHTML =
      `<div style="text-align:center;padding:1.5rem;">
        <p style="color:var(--color-warning);font-size:1.05rem;">⚠️ No se pudo cargar el ejercicio</p>
        <p style="color:var(--color-text-muted);font-size:.85rem;margin:.5rem 0;">${e.message}</p>
        <div style="display:flex;gap:.5rem;justify-content:center;margin-top:1rem;flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="generateNewExercise()"><i class="ti ti-reload"></i> Reintentar</button>
          <button class="btn btn-outline btn-sm" onclick="showView('knowledge')"><i class="ti ti-library"></i> Biblioteca</button>
        </div>
        <p style="font-size:.7rem;color:var(--color-text-muted);margin-top:.75rem;">Configura una API Key en Ajustes para generar ejercicios nuevos, o usa los ejercicios de la base de datos.</p>
      </div>`;
  }
}

function checkChoice(choice, btn) {
  const c = state.currentExercise.correcta || state.currentExercise.opciones[0];
  const isCorrect = choice === c;
  document.querySelectorAll('.choice-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === c) b.classList.add('correct');
  });
  
  let xpGanada = 100;
  if (isCorrect) {
    btn.classList.add('correct');
    state.xp += xpGanada;
    state.streak++;
    state.correctCount++;
    state.hp = Math.min(100, state.hp + 5);
    // Check badge por racha
    if (state.streak === 5 || state.streak === 10 || state.streak === 25) checkBadges();
  } else {
    btn.classList.add('wrong');
    state.streak = 0;
    state.hp = Math.max(0, state.hp - 20);
    xpGanada = 10;
    state.xp += xpGanada;
  }
  
  showExerciseResolution();
  updateUI();
  document.getElementById('action-bar').classList.remove('hidden');
  saveExerciseToHistory(isCorrect);
  
  if (state.correctCount % 10 === 0 && isCorrect) setTimeout(triggerGame, 1000);
  if (state.hp <= 0 && isCorrect) state.hp = 5;
}

function showReportOption() {
  const id = state.currentExercise.id;
  if (!id || id < 0) return;
  const repBtn = document.getElementById('report-btn');
  if (repBtn) { repBtn.dataset.id = id; repBtn.style.display = ''; }
}

function reportThis(btn) {
  const id = btn?.dataset?.id;
  if (!id) return;
  btn.disabled = true;
  btn.innerHTML = '<i class="ti ti-loader"></i> Enviando...';
  fetch(`${API}/api/exercises/${id}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token}` },
    body: '{}'
  }).then(r => r.json()).then(data => {
    if (data.ok) {
      btn.style.cssText = 'color:var(--color-success);border-color:var(--color-success);background:rgba(16,185,129,.1);font-size:.78rem;padding:.2rem .5rem;border-radius:var(--radius-md);';
      btn.innerHTML = '<i class="ti ti-check"></i> Reportado';
      btn.disabled = true;
    } else {
      btn.disabled = false;
      btn.innerHTML = '<i class="ti ti-flag"></i> Reportar error';
      alert('Error: ' + (data.error || 'desconocido'));
    }
  }).catch(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="ti ti-flag"></i> Reportar error';
    alert('Error al enviar reporte');
  });
}

function showExerciseResolution() {
  document.getElementById('resolution-area').classList.remove('hidden');
  document.getElementById('resolution-footer').classList.remove('hidden');
  const container = document.getElementById('steps-container');
  
  if (state.currentExercise.pasos && state.currentExercise.pasos.length > 0) {
    container.innerHTML = state.currentExercise.pasos.map((p, i) => {
      const stepNum = i + 1;
      const explLines = (p.expl || '').split('. ').filter(l => l.trim());
      return `
      <div class="step-item">
        <div class="step-number">${stepNum}</div>
        <div class="step-content">
          <div class="step-math" id="step-math-${i}"></div>
          <ul style="margin:.25rem 0 0 1.2rem;font-size:.82rem;color:var(--color-text-secondary);line-height:1.7;">
            ${explLines.map(l => `<li style="list-style:disc;">${highlightTerms(l)}</li>`).join('')}
          </ul>
        </div>
      </div>`;
    }).join('');
    state.currentExercise.pasos.forEach((p, i) => {
      try { katex.render(p.math, document.getElementById(`step-math-${i}`), { throwOnError: false }); } catch(e) {}
    });
    // Show theory if available
    if (state.currentExercise.theory) {
      const theoryDiv = document.createElement('div');
      theoryDiv.style.cssText = 'margin-top:1rem;padding:.75rem;background:rgba(59,130,246,0.06);border-left:3px solid var(--color-primary);border-radius:0 var(--radius-md) var(--radius-md) 0;font-size:.8rem;line-height:1.6;';
      theoryDiv.innerHTML = '<strong style="color:var(--color-primary);">📚 Teoría:</strong> ' + highlightTerms(state.currentExercise.theory);
      container.appendChild(theoryDiv);
    }
  } else {
    container.innerHTML = `<p style="color:var(--color-text-muted);font-size:.85rem;">Usa el <button class="btn btn-outline btn-sm" onclick="openSolver()">Resolvedor Paso a Paso</button> para ver la soluci&oacute;n detallada.</p>`;
  }
}

function searchGoogleExercise() {
  const topic = state.currentTopic?.name || state.currentExercise?.pregunta || '';
  const query = encodeURIComponent(topic.substring(0, 100));
  window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

function showExerciseGraph() {
  const container = document.getElementById('ex-graph-container');
  if (!container) return;
  container.classList.remove('hidden');
  container.innerHTML = '';
  
  const expr = state.currentExercise?.latex || '';
  if (!expr) { container.innerHTML = '<p style="color:var(--color-text-muted);padding:1rem;text-align:center;">Sin expresi&oacute;n para graficar</p>'; return; }
  
  const graphEl = document.createElement('div');
  graphEl.style.width = '100%';
  graphEl.style.height = '100%';
  container.appendChild(graphEl);
  
  setTimeout(() => {
    showGraph(graphEl, expr, { height: 230 });
  }, 50);
}

function showExerciseTheory() {
  if (state.currentExercise?.theory) {
    document.getElementById('glossary-title').textContent = 'Ayuda - Conceptos Clave';
    document.getElementById('glossary-def').innerHTML = state.currentExercise.theory.replace(/\n/g, '<br>');
  } else {
    document.getElementById('glossary-title').textContent = state.currentTopic.name;
    document.getElementById('glossary-def').textContent = state.currentTopic.teoria;
  }
  document.getElementById('glossary-example').innerHTML = 'Revisa la Biblioteca de Conocimiento para ampliar este tema.';
  document.getElementById('glossary-mana').innerHTML = `<button class="btn btn-outline btn-sm" onclick="closeGlossary(); openKnowledgeTopic('${state.currentTopic.id}')"><i class="ti ti-library"></i> Abrir biblioteca</button>`;
  document.getElementById('glossary-modal').classList.remove('hidden');
}

async function saveExerciseToHistory(correct) {
  try {
    await fetch(`${API}/api/reporte/registrar-ejercicio`, {
      method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
      body:JSON.stringify({ topic_id:state.currentTopic.id, correcto:correct, tiempo_segundos:30, hp_antes:state.hp, hp_despues:state.hp, dificultad:state.currentDiff })
    });
    // Registrar XP
    await fetch(`${API}/api/leaderboard/actualizar`, {
      method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
      body:JSON.stringify({ xp_ganada: correct ? 100 : 10, correcto: correct })
    });
    // Si est&aacute; en evento, enviar resultado
    if (state.activeEvent) {
      await fetch(`${API}/api/events/${state.activeEvent.id}/submit`, {
        method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
        body:JSON.stringify({ correcto: correct, tiempo_segundos: 30 })
      });
    }
  } catch(e) {}
}

// ============================================================
// MISIONES
// ============================================================
const MISSIONS = [
  // === MISIONES TEM&Aacute;TICAS (basadas en juegos) ===
  { id:'doom-horde', name:'DOOM: Horda Infernal', desc:'Enfrenta 10 ejercicios de Factorizaci&oacute;n. Pierde HP con cada fallo. &iexcl;Sobrevive!', topics:['factorizacion','polinomios','radicales'], count:10, hpPenalty:15, xpReward:600, icon:'👹', game:'doom' },
  { id:'fifa-champ', name:'FIFA: Campeonato de Ecuaciones', desc:'Golea 8 ecuaciones lineales y cuadr&aacute;ticas seguidas. Racha = goles.', topics:['ecuaciones','sistemas-ecuaciones'], count:8, hpPenalty:10, xpReward:500, icon:'⚽', game:'fifa' },
  { id:'pokemon-gym', name:'Pok&eacute;mon: Gimnasio Algebraico', desc:'Atrapa 12 ejercicios de todos los tipos. Cada acierto es una medalla.', topics:['factorizacion','fracciones-alg','ecuaciones','inecuaciones'], count:12, hpPenalty:12, xpReward:800, icon:'🔴', game:'pokemon' },
  { id:'cod-ops', name:'Call of Duty: Operaci&oacute;n Matem&aacute;tica', desc:'Misi&oacute;n sigilosa: 15 ejercicios de alto nivel. Bajo HP = alerta m&aacute;xima.', topics:['ecuaciones','inecuaciones','exp-log','trigonometria'], count:15, hpPenalty:20, xpReward:1200, icon:'🎯', game:'cod' },
  { id:'nfs-street', name:'Need for Speed: Derrape Num&eacute;rico', desc:'Carrera contrarreloj: resuelve 10 ejercicios R&Aacute;PIDO. Tiempo = velocidad.', topics:['numeros-reales','radicales','exp-log'], count:10, hpPenalty:18, xpReward:700, icon:'🏎️', game:'nfs' },
  { id:'lastofus', name:'The Last of Us: Supervivencia', desc:'Sobrevive 10 rondas de geometr&iacute;a y trigonometr&iacute;a. Cada acierto es un recurso.', topics:['geometria','trigonometria','plano-cartesiano'], count:10, hpPenalty:25, xpReward:900, icon:'🧟', game:'tlou' },
  { id:'clash-math', name:'Clash of Clans: Batalla Algebraica', desc:'Construye tu aldea: 15 ejercicios mezclados. Sin perder m&aacute;s de 50 HP.', topics:['factorizacion','ecuaciones','inecuaciones','exp-log','trigonometria','calculo'], count:15, hpPenalty:10, xpReward:1200, icon:'🏰', game:'coc' },
  { id:'horizon-math', name:'Horizon: Aventura Matem&aacute;tica', desc:'Explora 12 ejercicios de trigonometr&iacute;a y geometr&iacute;a. Precisi&oacute;n = supervivencia.', topics:['trigonometria','geometria','plano-cartesiano'], count:12, hpPenalty:15, xpReward:900, icon:'🤖', game:'horizon' },
  { id:'bomberman', name:'Bomberman: Explosi&oacute;n Algebraica', desc:'15 ejercicios explosivos de polinomios y fracciones. &iexcl;No te dejes alcanzar!', topics:['polinomios','fracciones-alg','conjuntos'], count:15, hpPenalty:18, xpReward:1000, icon:'💣', game:'bomberman' },
  { id:'password-math', name:'Password: La Clave Matem&aacute;tica', desc:'Adivina la soluci&oacute;n de 8 ejercicios desafiantes. 3 vidas, &uacute;salas bien.', topics:['ecuaciones','inecuaciones','sistemas-ecuaciones'], count:8, hpPenalty:30, xpReward:700, icon:'🔑', game:'password' },
  { id:'btd6', name:'Bloons TD6: Defensa Matem&aacute;tica', desc:'Defiende 20 rondas de ejercicios de todos los temas. Sin errores fatales.', topics:['factorizacion','ecuaciones','inecuaciones','exp-log','trigonometria','calculo','conjuntos'], count:20, hpPenalty:8, xpReward:2000, icon:'🎈', game:'btd6' },
  // === MISIONES CL&Aacute;SICAS ===
  { id:'recruta', name:'El Recruta', desc:'Supera 5 ejercicios b&aacute;sicos de Factorizaci&oacute;n', topics:['factorizacion'], count:5, hpPenalty:20, xpReward:300, icon:'⚔️' },
  { id:'soldado', name:'El Soldado', desc:'8 ejercicios de Ecuaciones e Inecuaciones. Disciplina total.', topics:['ecuaciones','inecuaciones'], count:8, hpPenalty:20, xpReward:500, icon:'🎖️' },
  { id:'veterano', name:'El Veterano', desc:'12 ejercicios de resistencia. Todos los temas del parcial I y II.', topics:['factorizacion','fracciones-alg','ecuaciones','inecuaciones','exp-log','trigonometria'], count:12, hpPenalty:15, xpReward:800, icon:'🏆' },
  { id:'maestro', name:'El Gran Maestro', desc:'20 ejercicios de TODOS los temas. Solo para los m&aacute;s valientes.', topics:['factorizacion','fracciones-alg','ecuaciones','inecuaciones','exp-log','trigonometria','calculo','conjuntos','numeros-reales','radicales','polinomios','geometria','plano-cartesiano'], count:20, hpPenalty:12, xpReward:2500, icon:'👑' },
  // === EX&Aacute;MENES ===
  { id:'examen-parcial1', name:'Parcial I (Completo)', desc:'30 preguntas - Temas: Conjuntos, N&uacute;meros, Radicales, Polinomios, Factorizaci&oacute;n, Ecuaciones, Sistemas', topics:['conjuntos','numeros-reales','radicales','polinomios','factorizacion','fracciones-alg','ecuaciones','sistemas-ecuaciones'], count:30, hpPenalty:10, xpReward:3000, isExam:true, icon:'📋' },
  { id:'examen-parcial2', name:'Parcial II (Completo)', desc:'30 preguntas - Temas: Inecuaciones, Plano Cartesiano, Exp/Log, Geometr&iacute;a, Trigonometr&iacute;a', topics:['inecuaciones','plano-cartesiano','exp-log','geometria','trigonometria'], count:30, hpPenalty:10, xpReward:3000, isExam:true, icon:'📋' },
  { id:'examen-parcial3', name:'Parcial III (Completo)', desc:'30 preguntas - C&aacute;lculo diferencial e integral', topics:['calculo','exp-log','trigonometria'], count:30, hpPenalty:10, xpReward:3000, isExam:true, icon:'📋' },
  { id:'examen-simulacro', name:'Simulacro Global', desc:'40 preguntas de TODOS los temas. &iexcl;Como el examen real!', topics:['factorizacion','fracciones-alg','ecuaciones','inecuaciones','exp-log','trigonometria','calculo','conjuntos','numeros-reales','radicales','polinomios','geometria','plano-cartesiano'], count:40, hpPenalty:8, xpReward:5000, isExam:true, icon:'🏅' },
  { id:'examen-tec-mixto', name:'TEC/PAA Mixto', desc:'15 preguntas variables - L&oacute;gica, Matem&aacute;tica y Verbal para admisi&oacute;n', topics:['tec-logica','tec-matematica','tec-verbal'], count:15, hpPenalty:8, xpReward:1800, isExam:true, icon:'🎓' },
  { id:'examen-tec-matematica', name:'TEC/PAA Matem&aacute;tica', desc:'10 preguntas variables de razonamiento matem&aacute;tico y l&oacute;gico', topics:['tec-matematica','tec-logica'], count:10, hpPenalty:10, xpReward:1400, isExam:true, icon:'🎓' },
  { id:'examen-tec-verbal', name:'TEC/PAA Verbal', desc:'8 preguntas variables de vocabulario, inferencia y coherencia textual', topics:['tec-verbal'], count:8, hpPenalty:10, xpReward:1000, isExam:true, icon:'🎓' },
  { id:'examen-rapido1', name:'Mini-Test: &Aacute;lgebra', desc:'10 preguntas r&aacute;pidas de &aacute;lgebra b&aacute;sica', topics:['factorizacion','polinomios','ecuaciones'], count:10, hpPenalty:20, xpReward:500, isExam:true, icon:'⚡' },
  { id:'examen-rapido2', name:'Mini-Test: Funciones', desc:'10 preguntas r&aacute;pidas de funciones y gr&aacute;ficas', topics:['plano-cartesiano','exp-log','trigonometria'], count:10, hpPenalty:20, xpReward:500, isExam:true, icon:'⚡' }
];

function renderMissions(main) {
  const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
  main.innerHTML = `
    <h2>Misiones de Resistencia</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Cada misi&oacute;n tiene reglas distintas. Pierde HP, gana XP. &iquest;Aguantar&aacute;s?</p>
    <div class="mission-grid">
    ${MISSIONS.filter(m => !m.isExam).map(m => {
      const done = saved[m.id];
      return `<div class="card mission-card ${done ? 'completed' : ''}">
        <div class="mission-header">
          <span style="font-size:2rem;">${m.icon}</span>
          <div>
            <h3>${m.name}</h3>
            <p style="font-size:.85rem;color:var(--color-text-secondary);">${m.desc}</p>
          </div>
        </div>
        <div class="mission-meta">
          <span>${m.count} ejercicios</span>
          <span style="color:var(--color-warning);">+${m.xpReward} XP</span>
          ${done ? `<span style="color:var(--color-success);">✓ ${done.score}%</span>` : ''}
        </div>
        <button class="btn ${done ? 'btn-outline' : 'btn-primary'}" onclick="startMission('${m.id}')">
          ${done ? 'Repetir' : 'Iniciar'}
        </button>
      </div>`;
    }).join('')}
    </div>`;
}

function renderExams(main) {
  const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
  main.innerHTML = `
    <h2>Pruebas y Ex&aacute;menes</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Simulaciones de parciales del TEC. Mismo formato que el examen real.</p>
    <div class="mission-grid">
    ${MISSIONS.filter(m => m.isExam).map(m => {
      const done = saved[m.id];
      return `<div class="card mission-card exam-card ${done ? 'completed' : ''}">
        <div class="mission-header">
          <span style="font-size:2rem;">${m.icon}</span>
          <div>
            <h3>${m.name}</h3>
            <p style="font-size:.85rem;color:var(--color-text-secondary);">${m.desc}</p>
          </div>
        </div>
        <div class="mission-meta">
          <span>${m.count} preguntas</span>
          <span style="color:var(--color-warning);">+${m.xpReward} XP</span>
          ${done ? `<span style="color:var(--color-success);">✓ ${done.score}%</span>` : ''}
        </div>
        <button class="btn ${done ? 'btn-outline' : 'btn-primary'}" onclick="startMission('${m.id}')">
          ${done ? 'Repetir' : 'Comenzar Examen'}
        </button>
      </div>`;
    }).join('')}
    </div>`;
}

function startMission(missionId) {
  const mission = MISSIONS.find(m => m.id === missionId);
  if (!mission) return;
  state.missionState = { mission, current:0, correct:0, hp:100, exercises:[], startTime: Date.now() };
  _doomDeathPlayed = false;
  _prevHp = 100;
  showView('mission-run');
}

async function renderMissionRun(main) {
  const m = state.missionState.mission;
  const topicId = m.topics[Math.floor(Math.random() * m.topics.length)];
  main.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;">
        <h2>${m.icon} ${m.name}</h2>
        <span style="color:var(--color-text-secondary);">${state.missionState.current}/${m.count}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(state.missionState.current/m.count)*100}%"></div></div>
      <div class="hp-bar-container" style="width:100%;height:20px;">
        <div id="mission-hp-fill" class="hp-bar-fill" style="width:${state.missionState.hp}%;background:linear-gradient(90deg,#ef4444,#10b981);"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.85rem;">
        <span>HP: <span id="mission-hp-num">${state.missionState.hp}</span>/100</span>
        <span>Correctas: ${state.missionState.correct}</span>
      </div>
      ${m.isExam ? `<div style="text-align:center;"><span class="badge exam-timer" id="exam-timer">⏱️ 00:00</span></div>` : ''}
      <div class="card" id="mission-ex-card">
        <div id="mission-loading"><p style="color:var(--color-text-muted);">Cargando...</p></div>
        <div id="mission-content" class="hidden">
          <p id="mission-text" style="font-size:1.1rem;margin-bottom:1.5rem;"></p>
          <div id="mission-source" style="display:none;color:var(--color-text-muted);font-size:.78rem;margin-top:-.75rem;margin-bottom:1rem;"></div>
          <div id="mission-math" style="background:#000;padding:1.5rem;border-radius:8px;text-align:center;margin-bottom:1.5rem;"></div>
          <div id="mission-image-container" style="display:none;margin-bottom:1.5rem;text-align:center;"></div>
          <div style="display:flex;gap:.5rem;margin-bottom:1rem;">
            <button class="btn btn-outline btn-sm" onclick="showMissionTheory()" id="mission-theory-btn" style="display:none;"><i class="ti ti-info-circle"></i> Teoría</button>
          </div>
          <div id="mission-choices" class="choice-grid"></div>
          <div id="mission-report-area" style="margin-top:.5rem;text-align:right;"><button class="btn btn-outline btn-xs" id="mission-report-btn" style="display:none;" onclick="reportThis(this)"><i class="ti ti-flag"></i> Reportar error</button></div>
        </div>
      </div>
      <div id="mission-action" class="hidden">
        <div id="mission-feedback" style="margin-bottom:1rem;"></div>
        <div id="mission-steps" style="margin-bottom:1rem;"></div>
        <button class="btn btn-primary" onclick="missionNext()">Siguiente</button>
      </div>
    </div>`;
  
  if (m.isExam && !state.missionState.examStarted) {
    state.missionState.examStarted = true;
    state.missionState.examStartTime = Date.now();
    startExamTimer();
  }
  
  await loadMissionExercise(topicId);
}

function startExamTimer() {
  if (state.examTimer) clearInterval(state.examTimer);
  state.examTimer = setInterval(() => {
    const el = document.getElementById('exam-timer');
    if (!el) { clearInterval(state.examTimer); return; }
    const elapsed = Math.floor((Date.now() - state.missionState.examStartTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mins}:${secs}`;
  }, 1000);
}

async function loadMissionExercise(topicId) {
  try {
    const seenKey = 'mm_seen_' + state.missionState.mission.id;
    const seen = JSON.parse(localStorage.getItem(seenKey) || '[]');
    const excludeAll = [...new Set([...(state.missionState.exercises || []), ...seen])];
    const r = await fetch(`${API}/api/ai/generate-exercise`, {
      method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
      body:JSON.stringify({ topic: topicId, difficulty: 'any', excludeIds: excludeAll })
    });
    const data = await r.json();
    if (data.error) throw new Error(data.error);
    
    state.currentExercise = data;
    if (data.id && data.id > 0 && !state.missionState.exercises.includes(data.id)) state.missionState.exercises.push(data.id);
    if (data.id > 0 && !seen.includes(data.id)) { seen.push(data.id); localStorage.setItem(seenKey, JSON.stringify(seen)); }
    document.getElementById('mission-loading').classList.add('hidden');
    document.getElementById('mission-content').classList.remove('hidden');
    document.getElementById('mission-text').innerHTML = data.pregunta;
    const sourceEl = document.getElementById('mission-source');
    const sourceText = formatExerciseSource(data);
    sourceEl.textContent = sourceText;
    sourceEl.style.display = sourceText ? 'block' : 'none';
    const mathEl = document.getElementById('mission-math');
    mathEl.innerHTML = '';
    mathEl.style.display = data.latex ? 'block' : 'none';
    if (data.latex) {
      try { katex.render(data.latex, mathEl, { displayMode: true, throwOnError: false }); } catch(e) {}
    }
    
    const imgEl = document.getElementById('mission-image-container');
    if (data.image) {
      imgEl.innerHTML = `<img src="${data.image}" alt="Gráfico" style="max-width:100%;max-height:280px;border-radius:8px;background:#fff;padding:8px;">`;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
    }
    
    const theoryBtn = document.getElementById('mission-theory-btn');
    if (data.theory) {
      theoryBtn.style.display = 'inline-flex';
      theoryBtn.dataset.theory = data.theory;
    } else {
      theoryBtn.style.display = 'none';
    }
    
    const area = document.getElementById('mission-choices');
    area.innerHTML = '';
    [...data.opciones].sort(() => Math.random() - 0.5).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = c;
      btn.onclick = () => checkMissionChoice(c, btn);
      area.appendChild(btn);
    });
    const mRepBtn = document.getElementById('mission-report-btn');
    if (mRepBtn) { mRepBtn.dataset.id = data.id; mRepBtn.style.display = ''; }
  } catch(e) {
    document.getElementById('mission-loading').innerHTML = `<p style="color:var(--color-error);">${e.message}</p>`;
  }
}

function checkMissionChoice(choice, btn) {
  const c = state.currentExercise.correcta || state.currentExercise.opciones[0];
  const isCorrect = choice === c;
  document.querySelectorAll('#mission-choices .choice-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === c) b.classList.add('correct');
  });
  
  const penalty = state.missionState.mission.hpPenalty;
  if (isCorrect) {
    btn.classList.add('correct');
    state.missionState.correct++;
  } else {
    btn.classList.add('wrong');
    state.missionState.hp = Math.max(0, state.missionState.hp - penalty);
  }
  
  document.getElementById('mission-hp-fill').style.width = state.missionState.hp + '%';
  document.getElementById('mission-hp-num').textContent = state.missionState.hp;
  
  const fb = document.getElementById('mission-feedback');
  fb.innerHTML = isCorrect
    ? `<p style="color:var(--color-success);">✅ Correcto! +XP</p>`
    : `<p style="color:var(--color-error);">❌ Incorrecto. HP -${penalty}</p>`;
  
  const stepsEl = document.getElementById('mission-steps');
  if (state.currentExercise.pasos) {
    stepsEl.innerHTML = state.currentExercise.pasos.map((p, i) => `
      <div class="step-item">
        <div class="step-number">${i+1}</div>
        <div class="step-content">
          <div class="step-math" id="mission-step-math-${i}"></div>
          <div class="step-explanation">${highlightTerms(p.expl)}</div>
        </div>
      </div>
    `).join('');
    state.currentExercise.pasos.forEach((p, i) => {
      try { katex.render(p.math, document.getElementById(`mission-step-math-${i}`), { throwOnError: false }); } catch(e) {}
    });
  }
  document.getElementById('mission-action').classList.remove('hidden');
}

function missionNext() {
  state.missionState.current++;
  if (state.missionState.hp <= 0) { endMission('Sin HP'); return; }
  if (state.missionState.current >= state.missionState.mission.count) { endMission('Completada'); return; }
  const topicId = state.missionState.mission.topics[Math.floor(Math.random() * state.missionState.mission.topics.length)];
  renderMissionRun(document.getElementById('main-content'));
}

function showMissionTheory() {
  const btn = document.getElementById('mission-theory-btn');
  const theory = btn?.dataset?.theory;
  if (!theory) return;
  alert(theory); // For now simple modal - improvement: reuse knowledge modal
}

function endMission(reason) {
  if (state.examTimer) { clearInterval(state.examTimer); state.examTimer = null; }
  const m = state.missionState.mission;
  const score = Math.round((state.missionState.correct / m.count) * 100);
  let xpEarned = reason === 'Completada' ? m.xpReward : Math.round(m.xpReward * score / 100);
  let aliveBonus = 0;
  if (reason === 'Completada' && state.hp > 0) {
    aliveBonus = Math.round(m.xpReward * 0.15);
    xpEarned += aliveBonus;
  }
  state.xp += xpEarned;
  // Revive after mission
  if (state.hp <= 0) state.hp = 30;
  
  localStorage.removeItem('mm_seen_' + m.id);
  const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
  saved[m.id] = { score, xpEarned, date: new Date().toISOString() };
  localStorage.setItem('mm_missions', JSON.stringify(saved));
  
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="card result-card ${reason === 'Completada' ? 'success' : 'fail'}">
      <div style="text-align:center;padding:2rem;">
        <span style="font-size:4rem;">${reason === 'Completada' ? '🏆' : '💀'}</span>
        <h2 style="margin:1rem 0;">${reason === 'Completada' ? 'Misi&oacute;n Completada!' : 'Misi&oacute;n Fallida'}</h2>
        <p class="score-big" style="color:${score>=70?'var(--color-success)':'var(--color-error)'}">${score}%</p>
        <p>${state.missionState.correct}/${m.count} respuestas correctas</p>
        <p style="color:var(--color-warning);font-size:1.2rem;margin:.5rem 0;">+${xpEarned} XP</p>
        ${aliveBonus > 0 ? `<p style="color:var(--color-success);font-size:.9rem;">+${aliveBonus} XP por completar con vida</p>` : ''}
        ${state.hp <= 0 ? `<p style="color:var(--color-error);font-size:.85rem;">DoomGuy ha caído... pero revive con 30 HP</p>` : ''}
        ${m.isExam ? `<p style="color:var(--color-text-muted);font-size:.85rem;">Tiempo total: ${document.getElementById('exam-timer')?.textContent || '--:--'}</p>` : ''}
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;">
          <button class="btn btn-primary" onclick="startMission('${m.id}')">Repetir</button>
          <button class="btn btn-outline" onclick="showView('${m.isExam ? 'exams' : 'missions'}')">Volver</button>
        </div>
      </div>
    </div>`;
  updateUI();
  checkBadges();
}

// ============================================================
// EVENTOS
// ============================================================
async function renderEvents(main) {
  main.innerHTML = `
    <h2><i class="ti ti-flame" style="color:var(--color-warning);"></i> Eventos y Competiciones</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Participa en eventos en vivo, compite con otros estudiantes y gana recompensas exclusivas.</p>
    <div id="events-container"><p style="color:var(--color-text-muted);">Cargando eventos...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/events/activos`, { headers: { Authorization: `Bearer ${state.token}` } });
    const eventos = await r.json();
    
    if (eventos.length === 0) {
      document.getElementById('events-container').innerHTML = `
        <div class="card" style="text-align:center;padding:3rem;">
          <span style="font-size:3rem;">📅</span>
          <h3 style="margin:1rem 0;">No hay eventos activos</h3>
          <p style="color:var(--color-text-muted);">Vuelve pronto para nuevas competiciones.</p>
        </div>`;
      return;
    }
    
    document.getElementById('events-container').innerHTML = eventos.map(ev => `
      <div class="card event-detail-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem;">
          <div>
            <div style="display:flex;align-items:center;gap:.5rem;">
              <span class="badge ${ev.tipo}">${ev.tipo}</span>
              <h3>${ev.titulo}</h3>
            </div>
            <p style="color:var(--color-text-secondary);margin:.5rem 0;">${ev.descripcion}</p>
            <div style="display:flex;gap:1rem;font-size:.85rem;color:var(--color-text-muted);">
              <span><i class="ti ti-star"></i> +${ev.xp_recompensa} XP</span>
              <span><i class="ti ti-certificate"></i> Nivel ${ev.requisito_nivel}+</span>
              ${ev.tema_id ? `<span><i class="ti ti-book"></i> ${TOPIC_NAMES[ev.tema_id] || ev.tema_id}</span>` : ''}
            </div>
          </div>
          <button class="btn ${ev.ya_participa ? 'btn-outline' : 'btn-primary'}" onclick="joinEvent(${ev.id})">
            ${ev.ya_participa ? 'Participando' : 'Unirse'}
          </button>
        </div>
        ${ev.ya_participa ? `
        <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--color-border);">
          <p style="font-size:.85rem;">Tu puntuaci&oacute;n: <strong>${ev.mi_puntuacion}</strong></p>
          <button class="btn btn-primary btn-sm" onclick="startEventPractice(${ev.id})" style="margin-top:.5rem;">
            <i class="ti ti-player-play"></i> Empezar a Competir
          </button>
          <button class="btn btn-outline btn-sm" onclick="showEventLeaderboard(${ev.id})" style="margin-top:.5rem;margin-left:.5rem;">
            <i class="ti ti-trophy"></i> Ver Ranking
          </button>
        </div>` : ''}
      </div>
    `).join('');
  } catch(e) {
    document.getElementById('events-container').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

async function joinEvent(eventId) {
  try {
    const r = await fetch(`${API}/api/events/${eventId}/join`, {
      method:'POST', headers:{ Authorization: `Bearer ${state.token}` }
    });
    const data = await r.json();
    if (r.ok) { alert('Te has unido al evento!'); renderEvents(document.getElementById('main-content')); }
    else alert(data.error);
  } catch(e) { alert('Error al unirse'); }
}

function startEventPractice(eventId) {
  state.activeEvent = { id: eventId };
  // Usar el primer tema disponible o general
  const topic = TOPICS.find(t => !state.activeEvent.tema_id || t.id === state.activeEvent.tema_id) || TOPICS[0];
  state.currentTopic = topic;
  showView('exercise');
}

async function showEventLeaderboard(eventId) {
  try {
    const r = await fetch(`${API}/api/events/${eventId}/leaderboard`);
    const data = await r.json();
    document.getElementById('event-modal-content').innerHTML = `
      <h2>Ranking del Evento</h2>
      <div style="margin-top:1rem;">
        ${data.length === 0 ? '<p style="color:var(--color-text-muted);">Sin participantes a&uacute;n</p>' :
          data.map((p, i) => `
            <div class="lb-row ${i < 3 ? 'top-three' : ''}">
              <span class="lb-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':p.posicion}</span>
              <span class="lb-name">${p.nombre}</span>
              <span class="lb-score">${p.puntuacion} pts</span>
              <span class="lb-success">${Math.round((p.ejercicios_correctos/Math.max(1,p.ejercicios_completados))*100)}%</span>
            </div>
          `).join('')
        }
      </div>
      <button class="btn btn-outline" style="width:100%;margin-top:1rem;" onclick="closeEventModal()">Cerrar</button>`;
    document.getElementById('event-modal').classList.remove('hidden');
  } catch(e) { alert('Error: '+e.message); }
}

function showEventDetail(eventId) { showEventLeaderboard(eventId); }
function closeEventModal() { document.getElementById('event-modal').classList.add('hidden'); }

// ============================================================
// BADGES / LOGROS
// ============================================================
async function renderBadges(main) {
  main.innerHTML = `
    <h2><i class="ti ti-medal"></i> Logros y Badges</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Completa desaf&iacute;os para desbloquear logros y ganar XP extra.</p>
    <div id="badges-container"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/badges`, { headers: { Authorization: `Bearer ${state.token}` } });
    const badges = await r.json();
    
    const obtenidos = badges.filter(b => b.obtenido);
    const pendientes = badges.filter(b => !b.obtenido);
    
    document.getElementById('badges-container').innerHTML = `
      <div style="margin-bottom:1.5rem;">
        <h3 style="margin-bottom:.75rem;">Obtenidos (${obtenidos.length}/${badges.length})</h3>
        ${obtenidos.length === 0 ? '<p style="color:var(--color-text-muted);">A&uacute;n no has obtenido badges. &iexcl;Sigue practicando!</p>' :
          `<div class="badges-grid">${obtenidos.map(b => `
            <div class="badge-card obtained">
              <div class="badge-icon">🎖️</div>
              <strong>${b.nombre}</strong>
              <p style="font-size:.75rem;color:var(--color-text-muted);">${b.descripcion}</p>
              ${b.xp_bonus > 0 ? `<span style="font-size:.75rem;color:var(--color-warning);">+${b.xp_bonus} XP</span>` : ''}
            </div>`).join('')}
          </div>`
        }
      </div>
      <div>
        <h3 style="margin-bottom:.75rem;">Por Descubrir</h3>
        <div class="badges-grid">${pendientes.map(b => `
          <div class="badge-card locked">
            <div class="badge-icon">🔒</div>
            <strong>???</strong>
            <p style="font-size:.75rem;color:var(--color-text-muted);">${b.descripcion}</p>
          </div>`).join('')}
        </div>
      </div>`;
  } catch(e) {
    document.getElementById('badges-container').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

async function checkBadges() {
  try {
    await fetch(`${API}/api/badges/check`, {
      method:'POST', headers:{ Authorization: `Bearer ${state.token}` }
    });
  } catch(e) {}
}

// ============================================================
// TIENDA
// ============================================================
async function renderShop(main) {
  main.innerHTML = `
    <h2><i class="ti ti-shopping-bag"></i> Tienda MathMaty</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Gasta tu XP en power-ups, avatares y m&aacute;s.</p>
    <div style="display:flex;gap:.75rem;margin-bottom:1.5rem;">
      <button class="btn btn-outline btn-sm" onclick="renderInventory(document.getElementById('main-content'))">
        <i class="ti ti-backpack"></i> Mi Inventario
      </button>
    </div>
    <div id="shop-container"><p style="color:var(--color-text-muted);">Cargando tienda...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/shop`, { headers: { Authorization: `Bearer ${state.token}` } });
    const items = await r.json();
    
    document.getElementById('shop-container').innerHTML = `
      <div style="display:flex;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;">
        <div class="card" style="flex:1;text-align:center;padding:0.75rem;">
          <span style="font-size:1.5rem;font-weight:700;color:var(--color-warning);">${state.xp}</span>
          <p style="font-size:0.75rem;color:var(--color-text-muted);">XP Disponible</p>
        </div>
        ${state.user?.rol === 'padre' ? '' : `
        <button class="btn btn-outline" onclick="showView('badges')" style="flex:1;">
          <i class="ti ti-medal"></i> Mis Logros
        </button>`}
      </div>
      <div class="shop-grid" id="shop-grid"></div>`;
    
    const grid = document.getElementById('shop-grid');
    const tipos = [...new Set(items.map(i => i.tipo))];
    let html = '';
    
    tipos.forEach(tipo => {
      const tipoItems = items.filter(i => i.tipo === tipo);
      const tipoNombres = { powerup: '⚡ Power-Ups', avatar: '👤 Avatares', tema: '🎨 Temas', especial: '🎁 Especiales' };
      
      html += `<h3 style="margin:1rem 0 0.5rem;color:var(--color-primary);">${tipoNombres[tipo] || tipo}</h3>`;
      html += `<div class="shop-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.6rem;">`;
      
      tipoItems.forEach(item => {
        const puedeComprar = state.xp >= item.precio_xp;
        html += `
          <div class="card shop-item ${!puedeComprar ? 'locked' : ''}" style="display:flex;flex-direction:column;gap:0.35rem;text-align:center;padding:0.6rem;">
            <div style="font-size:1.8rem;line-height:1;">${item.icono || '📦'}</div>
            <h3 style="font-size:.85rem;line-height:1.2;">${item.nombre}</h3>
            <p style="font-size:.7rem;color:var(--color-text-secondary);line-height:1.3;">${item.descripcion}</p>
            <div style="font-size:.8rem;font-weight:600;color:var(--color-warning);">
              <i class="ti ti-star"></i> ${item.precio_xp} XP
            </div>
            <button class="btn ${puedeComprar ? 'btn-primary' : 'btn-outline'} btn-xs" style="font-size:.65rem;padding:0.2rem 0.3rem;"
                    onclick="buyItem(${item.id})" ${!puedeComprar ? 'disabled' : ''}>
              ${!puedeComprar ? '❌ XP Insuf.' : '🛒 Comprar'}
            </button>
          </div>`;
      });
      html += '</div>';
    });
    
    grid.innerHTML = html;
  } catch(e) {
    document.getElementById('shop-container').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

async function buyItem(itemId) {
  try {
    if (!confirm('¿Comprar este artículo?')) return;
    const r = await fetch(`${API}/api/shop/buy/${itemId}`, {
      method:'POST', headers:{ Authorization: `Bearer ${state.token}` }
    });
    const data = await r.json();
    if (r.ok) {
      // Recargar perfil para obtener XP actualizado
      const pr = await fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${state.token}` } });
      if (pr.ok) {
        const pu = await pr.json();
        state.xp = pu.xp || 0;
      }
      alert(data.message);
      renderShop(document.getElementById('main-content'));
      updateUI();
    } else {
      alert(data.error);
    }
  } catch(e) { alert('Error: '+e.message); }
}

async function renderInventory(main) {
  main.innerHTML = `
    <h2><i class="ti ti-backpack"></i> Mi Inventario</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Tus &iacute;tems comprados. &Uacute;salos durante las misiones.</p>
    <button class="btn btn-outline btn-sm" style="margin-bottom:1rem;" onclick="showView('shop')">← Volver a Tienda</button>
    <div id="inventory-container"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/inventory`, { headers: { Authorization: `Bearer ${state.token}` } });
    const items = await r.json();
    
    document.getElementById('inventory-container').innerHTML = items.length === 0
      ? '<p style="color:var(--color-text-muted);">No tienes &iacute;tems. Compra algunos en la tienda.</p>'
      : `<div class="shop-grid">${items.map(inv => `
        <div class="card shop-item">
          <div class="shop-icon">${inv.icono || '📦'}</div>
          <h3>${inv.nombre}</h3>
          <p style="font-size:.85rem;color:var(--color-text-secondary);">${inv.descripcion}</p>
          <p style="font-size:.85rem;color:var(--color-warning);">x${inv.cantidad}</p>
          <button class="btn btn-primary btn-sm" onclick="useItem(${inv.item_id})">Usar</button>
        </div>`).join('')}
      </div>`;
  } catch(e) {
    document.getElementById('inventory-container').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

async function useItem(itemId) {
  try {
    const r = await fetch(`${API}/api/inventory/use/${itemId}`, {
      method:'POST', headers:{ Authorization: `Bearer ${state.token}` }
    });
    const data = await r.json();
    if (r.ok) {
      alert(data.message);
      if (data.efecto?.tipo === 'hp_boost') {
        state.hp = Math.min(100, state.hp + (data.efecto.valor || 0));
        updateUI();
      }
      renderInventory(document.getElementById('main-content'));
    } else {
      alert(data.error);
    }
  } catch(e) { alert('Error: '+e.message); }
}

// ============================================================
// BIBLIOTECA DE CONOCIMIENTO
// ============================================================
async function renderKnowledge(main) {
  main.innerHTML = `
    <h2><i class="ti ti-library"></i> Biblioteca de Conocimiento</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Explicaciones detalladas, ejemplos y ma&ntilde;as para cada tema de Prec&aacute;lculo.</p>
    <div id="knowledge-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem;">
      ${TOPICS.map(t => `
        <div class="card topic-card" onclick="openKnowledgeTopic('${t.id}')" style="cursor:pointer;">
          <i class="ti ${t.icon}" style="font-size:2rem;color:var(--color-primary);margin-bottom:.5rem;"></i>
          <h3>${t.name}</h3>
          <p style="font-size:.85rem;color:var(--color-text-secondary);margin:.5rem 0;line-height:1.5;">${t.teoria.substring(0,100)}...</p>
          <span style="font-size:.75rem;color:var(--color-primary);">Ver gu&iacute;a completa →</span>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:2rem;">
      <h3 style="margin-bottom:1rem;">Buscador de T&eacute;rminos</h3>
      <input type="text" id="glossary-search" class="btn btn-outline" style="width:100%;background:var(--color-bg);text-align:left;margin-bottom:1rem;" placeholder="Buscar en el glosario..." oninput="searchGlossary()">
      <div id="glossary-results" style="display:flex;flex-direction:column;gap:.5rem;"></div>
    </div>`;
  
  searchGlossary(); // Carga inicial
}

function searchGlossary() {
  const q = (document.getElementById('glossary-search')?.value || '').toLowerCase();
  const results = glossary.filter(g => 
    g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
  );
  document.getElementById('glossary-results').innerHTML = results.length === 0
    ? '<p style="color:var(--color-text-muted);">No se encontraron t&eacute;rminos</p>'
    : results.slice(0, 10).map(g => `
      <div class="card glossary-item" onclick="openGlossary('${g.term}')" style="cursor:pointer;padding:.75rem 1rem;">
        <strong style="color:var(--color-primary);">${g.term}</strong>
        <p style="font-size:.85rem;color:var(--color-text-secondary);">${g.definition.substring(0,120)}...</p>
      </div>
    `).join('');
}

async function openKnowledgeTopic(topicId) {
  try {
    const r = await fetch(`${API}/api/knowledge?topic=${topicId}`);
    const entries = await r.json();
    state._knowledgeTopic = topicId;
    const topic = TOPICS.find(t => t.id === topicId);
    
    if (entries.length === 0) {
      document.getElementById('kmodal-title').textContent = topic?.name || topicId;
      document.getElementById('kmodal-content').innerHTML = `<div class="kb-article"><p>${topic?.teoria || 'Contenido en preparaci&oacute;n...'}</p></div>`;
      document.getElementById('kmodal-ejemplos').innerHTML = '';
      document.getElementById('kmodal-manas').innerHTML = '';
    } else {
      const entry = entries[0];
      document.getElementById('kmodal-title').textContent = entry.titulo;
      document.getElementById('kmodal-content').innerHTML = entry.contenido || `<div class="kb-article"><p>${topic?.teoria || ''}</p></div>`;
      
      if (entry.ejemplos) {
        const ejemplos = typeof entry.ejemplos === 'string' ? JSON.parse(entry.ejemplos) : entry.ejemplos;
        document.getElementById('kmodal-ejemplos').innerHTML = `
          <h3 style="margin:1.5rem 0 0.75rem;color:var(--color-success);border-bottom:1px solid var(--color-border);padding-bottom:0.4rem;">📝 Ejemplos Resueltos</h3>
          ${Array.isArray(ejemplos) ? ejemplos.map((ex, i) => `
            <div class="kb-ejemplo">
              <p><strong>Problema ${i+1}:</strong> ${ex.problema}</p>
              <p style="color:var(--color-success);margin-top:0.5rem;"><strong>Soluci&oacute;n:</strong> ${ex.solucion}</p>
            </div>`).join('') : '<p>No hay ejemplos disponibles</p>'}
        `;
      }
      
      if (entry.manas) {
        document.getElementById('kmodal-manas').innerHTML = `
          <div style="margin-top:1.5rem;border-left:3px solid var(--color-warning);padding:0.75rem 1rem;background:rgba(245,158,11,0.06);border-radius:0 var(--radius-md) var(--radius-md) 0;">
            <strong style="color:var(--color-warning);display:block;margin-bottom:0.3rem;">💡 Ma&ntilde;as y Consejos Clave</strong>
            <p style="font-style:italic;color:var(--color-text-secondary);">${entry.manas}</p>
          </div>`;
      }
    }
    
    document.getElementById('knowledge-modal').classList.remove('hidden');
  } catch(e) {
    alert('Error cargando contenido');
  }
}

function closeKnowledgeModal() { document.getElementById('knowledge-modal').classList.add('hidden'); }
function startExerciseFromKnowledge() {
  closeKnowledgeModal();
  if (state._knowledgeTopic) startExercise(state._knowledgeTopic);
}

// ============================================================
// GENERADOR DE GR&Aacute;FICOS SVG
// ============================================================
function showGraph(containerId, expression, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  
  try {
    const size = container.getBoundingClientRect();
    const graph = new MathGraph(container, {
      width: Math.max(200, Math.min(500, size.width || 400)),
      height: options.height || 280,
      xRange: options.xRange || [-10, 10],
      yRange: options.yRange || [-10, 10],
      padding: options.padding || 45,
      ...options
    });
    
    if (expression) {
      graph.plotFunction(expression, { label: `f(x) = ${expression}`, color: '#10b981' });
    }
    
    // Add points if provided
    if (options.points) {
      options.points.forEach(p => graph.addPoint(p.x, p.y, p.options || {}));
    }
    
    // Add shapes if provided
    if (options.shapes) {
      options.shapes.forEach(s => graph.addShape(s.type, s.points, s.options || {}));
    }
    
    // Shade area if provided
    if (options.shadeArea) {
      graph.shadeArea(options.shadeArea.fn1, options.shadeArea.fn2, options.shadeArea.xFrom, options.shadeArea.xTo, options.shadeArea.options);
    }
    
    graph.render();
    return graph;
  } catch(e) {
    container.innerHTML = `<p style="color:var(--color-error);font-size:0.85rem;">Error al generar gr&aacute;fica: ${e.message}</p>`;
    return null;
  }
}

// Preset graphs for common topics
function showQuadraticGraph(containerId, a, b, c) {
  return showGraph(containerId, `${a}*x^2 + ${b}*x + ${c}`, {
    xRange: [-8, 8], yRange: [-8, 8]
  });
}

function showTrigGraph(containerId, func, label) {
  return showGraph(containerId, func, {
    xRange: [-6.28, 6.28], yRange: [-2, 2], label
  });
}

function showRightTriangleGraph(containerId, a, b) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  try {
    const graph = new MathGraph(container, {
      width: 400, height: 300,
      xRange: [-1, a + 2],
      yRange: [-1, b + 2],
      padding: 50
    });
    graph.drawRightTriangle(a, b, { labels: ['A', 'B', 'C'], rightAngle: 0 });
    graph.render();
    return graph;
  } catch(e) {
    container.innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

// ============================================================
// RESOLVEDOR PASO A PASO
// ============================================================
function openSolver() {
  hideMathKeyboard();
  document.getElementById('solver-modal').classList.remove('hidden');
  document.getElementById('solver-results').classList.add('hidden');
  document.getElementById('solver-loading').classList.add('hidden');
  document.getElementById('solver-input').value = '';
  var kb = document.getElementById('math-kb-container');
  if (kb) kb.remove();
}

function setSolverExample(expr) {
  document.getElementById('solver-input').value = expr;
  solveExpression();
}

function closeSolver() { hideMathKeyboard(); document.getElementById('solver-modal').classList.add('hidden'); }

function setSolverExample(expr) {
  document.getElementById('solver-input').value = expr;
  solveExpression();
}

async function solveExpression() {
  const expr = document.getElementById('solver-input').value.trim();
  if (!expr) return;
  
  document.getElementById('solver-loading').classList.remove('hidden');
  document.getElementById('solver-results').classList.add('hidden');
  
  // Detectar tema basado en la expresi&oacute;n
  let topic = 'general';
  if (expr.includes('^2') && (expr.includes('-') || expr.includes('+'))) topic = 'factorizacion';
  else if (expr.includes('=')) topic = 'ecuaciones';
  else if (expr.includes('>') || expr.includes('<')) topic = 'inecuaciones';
  else if (expr.includes('log') || expr.includes('ln')) topic = 'exp-log';
  else if (expr.includes('^')) topic = 'exp-log';
  else if (expr.includes('sin') || expr.includes('cos') || expr.includes('tan')) topic = 'trigonometria';
  
  try {
    const r = await fetch(`${API}/api/resolver/paso-a-paso`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ expression: expr, topic })
    });
    const data = await r.json();
    
    document.getElementById('solver-loading').classList.add('hidden');
    document.getElementById('solver-results').classList.remove('hidden');
    
    if (data.pasos && data.pasos.length > 0) {
      document.getElementById('solver-steps').innerHTML = data.pasos.map((p, i) => `
        <div class="step-item">
          <div class="step-number">${i+1}</div>
          <div class="step-content">
            <div class="step-math" id="sstep-math-${i}"></div>
            <div class="step-explanation">${highlightTerms(p.expl)}</div>
          </div>
        </div>
      `).join('');
      
      data.pasos.forEach((p, i) => {
        try { katex.render(p.math, document.getElementById(`sstep-math-${i}`), { displayMode: true, throwOnError: false }); } catch(e) {}
      });
    } else {
      document.getElementById('solver-steps').innerHTML = `<p style="color:var(--color-text-muted);">No se pudieron generar pasos. Prueba con el teclado matem&aacute;tico para escribir la expresi&oacute;n correctamente.</p>`;
    }
    
    // Show answer
    const answerEl = document.getElementById('solver-answer');
    if (data.respuesta_final) {
      answerEl.innerHTML = `<strong>✅ Respuesta:</strong> ${data.respuesta_final}`;
      answerEl.classList.remove('hidden');
    } else if (data.pasos?.length > 0) {
      answerEl.innerHTML = `<strong>Resultado:</strong> ${data.pasos[data.pasos.length-1].math}`;
      answerEl.classList.remove('hidden');
    } else {
      answerEl.classList.add('hidden');
    }
    
    // Show graph if applicable (functions, trig, etc.)
    const graphContainer = document.getElementById('solver-graph-container');
    graphContainer.innerHTML = '';
    const graphableTopics = ['exp-log', 'trigonometria', 'calculo', 'plano-cartesiano'];
    if (graphableTopics.includes(topic) || expr.includes('sin') || expr.includes('cos') || expr.includes('tan') || expr.includes('^')) {
      try {
        const cleanExpr = expr.replace(/=.*$/, '').trim();
        const graphEl = document.createElement('div');
        graphEl.style.width = '100%';
        graphEl.style.height = '100%';
        graphContainer.appendChild(graphEl);
        
        setTimeout(() => {
          showGraph(graphEl.id || (graphEl.id = 'solver-graph-' + Date.now()), cleanExpr, {
            height: 230, xRange: [-8, 8], yRange: [-6, 6]
          });
        }, 50);
      } catch(e) { /* ignore graph errors */ }
    }
  } catch(e) {
    document.getElementById('solver-loading').classList.add('hidden');
    document.getElementById('solver-results').classList.remove('hidden');
    document.getElementById('solver-steps').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

// ============================================================
// LEADERBOARD
// ============================================================
async function renderLeaderboard(main) {
  main.innerHTML = `
    <h2><i class="ti ti-trophy"></i> Clasificaci&oacute;n General</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Estudiantes rankeados por XP, precisi&oacute;n y nivel.</p>
    <div class="card" id="lb-card"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/leaderboard`);
    const data = await r.json();
    
    document.getElementById('lb-card').innerHTML = data.length === 0
      ? '<p style="text-align:center;padding:2rem;">A&uacute;n no hay jugadores. &iexcl;S&eacute; el primero!</p>'
      : `<div class="lb-table">
          ${data.map((u, i) => `
            <div class="lb-row ${i < 3 ? 'top-three' : ''} ${state.user && u.id === state.user.id ? 'current-user' : ''}">
              <span class="lb-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':u.posicion}</span>
              <span class="lb-name">${u.nombre} ${state.user && u.id === state.user.id ? '<span class="badge you">T&uacute;</span>' : ''}</span>
              <span class="lb-score">${u.xp || 0} XP</span>
              <span class="lb-success">${u.tasa_exito || 0}%</span>
              <span class="lb-level">Lv ${u.nivel || 1}</span>
            </div>`).join('')}
        </div>`;
  } catch(e) {
    document.getElementById('lb-card').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

// ============================================================
// REPORTES
// ============================================================
async function renderReports(main) {
  main.innerHTML = `
    <h2>Mi Reporte de Progreso</h2>
    <div id="report-stats" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem;margin-bottom:1.5rem;"><p>Cargando...</p></div>
    <div id="report-nivel"></div>
    <div id="report-topics"></div>
    <div id="report-xp-history"></div>
    <div id="report-weak"></div>`;
  
  try {
    const r = await fetch(`${API}/api/reporte/mi-progreso`, { headers: { Authorization: `Bearer ${state.token}` } });
    const data = await r.json();
    if (data.error) throw new Error(data.error);
    
    // Stats
    const st = data.estadisticas_generales;
    const rank = st.total_ejercicios == 0 ? 'Novato' : st.tasa_exito_global >= 80 ? 'Experto' : st.tasa_exito_global >= 60 ? 'Intermedio' : 'En Entrenamiento';
    
    document.getElementById('report-stats').innerHTML = [
      ['Ejercicios', st.total_ejercicios || 0, 'var(--color-primary)'],
      ['Correctas', st.correctos || 0, 'var(--color-success)'],
      ['Tasa de &Eacute;xito', (st.tasa_exito_global || 0)+'%', 'var(--color-warning)'],
      ['Rango', rank, 'var(--color-error)'],
      ['Nivel', 'Lv ' + state.nivel, 'var(--color-primary)'],
      ['XP Total', state.xp || 0, 'var(--color-warning)']
    ].map(([lbl, val, col]) => `
      <div class="card" style="text-align:center;padding:1rem;">
        <p style="font-size:.75rem;color:var(--color-text-muted);margin-bottom:.25rem;">${lbl}</p>
        <p style="font-size:1.5rem;font-weight:bold;color:${col};">${val}</p>
      </div>`).join('');
    
    // Nivelaci&oacute;n
    try {
      const nr = await fetch(`${API}/api/nivelacion/calcular`, { headers: { Authorization: `Bearer ${state.token}` } });
      if (nr.ok) {
        const nd = await nr.json();
        document.getElementById('report-nivel').innerHTML = `
          <div class="card" style="margin-bottom:1.5rem;">
            <h3>Nivelaci&oacute;n Avanzada</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.75rem;margin-top:1rem;">
              <div class="stat-mini"><span class="stat-value">${nd.nivel}</span><span class="stat-label">Nivel Calculado</span></div>
              <div class="stat-mini"><span class="stat-value">${nd.horas_practica}h</span><span class="stat-label">Pr&aacute;ctica</span></div>
              <div class="stat-mini"><span class="stat-value">${nd.precision}%</span><span class="stat-label">Precisi&oacute;n</span></div>
              <div class="stat-mini"><span class="stat-value">${nd.racha_maxima}🔥</span><span class="stat-label">Racha M&aacute;xima</span></div>
            </div>
            <div style="margin-top:.75rem;">
              <p style="font-size:.8rem;color:var(--color-text-muted);">Desglose: XP: ${nd.desglose.xp_component} | Tiempo: ${nd.desglose.time_component} | Precisi&oacute;n: ${nd.desglose.precision_component} | Racha: ${nd.desglose.streak_bonus}</p>
            </div>
          </div>`;
      }
    } catch(e) {}
    
    // Progreso por tema
    if (data.progreso_por_tema?.length > 0) {
      document.getElementById('report-topics').innerHTML = `
        <h3 style="margin:1rem 0;">Progreso por Tema</h3>
        <div style="display:flex;flex-direction:column;gap:.75rem;">
        ${data.progreso_por_tema.map(t => `
          <div class="card" style="padding:.75rem 1rem;">
            <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
              <span>${TOPIC_NAMES[t.topic_id] || t.topic_id}</span>
              <span style="color:${t.tasa>=70?'var(--color-success)':t.tasa>=50?'var(--color-warning)':'var(--color-error)'}">${t.tasa||0}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${t.tasa||0}%;background:${t.tasa>=70?'var(--color-success)':t.tasa>=50?'var(--color-warning)':'var(--color-error)'};"></div></div>
            <p style="font-size:.75rem;color:var(--color-text-muted);margin-top:.25rem;">${t.correctos} correctas / ${t.fallos} fallos</p>
          </div>`).join('')}
        </div>`;
    }
    
    // Historial XP
    try {
      const xr = await fetch(`${API}/api/xp-history`, { headers: { Authorization: `Bearer ${state.token}` } });
      if (xr.ok) {
        const xh = await xr.json();
        document.getElementById('report-xp-history').innerHTML = `
          <h3 style="margin:1rem 0;">Historial de XP (&uacute;ltimos)</h3>
          <div class="card" style="max-height:300px;overflow-y:auto;">
            ${xh.map(x => `
              <div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--color-border);">
                <span style="font-size:.85rem;">${x.fuente_nombre || x.fuente}</span>
                <span style="color:${x.cantidad >= 0 ? 'var(--color-success)' : 'var(--color-error)'};font-weight:bold;">${x.cantidad >= 0 ? '+' : ''}${x.cantidad}</span>
              </div>`).join('')}
          </div>`;
      }
    } catch(e) {}
    
    // &Aacute;reas d&eacute;biles
    if (data.areas_debil?.length > 0) {
      document.getElementById('report-weak').innerHTML = `
        <h3 style="margin:1rem 0;">🔴 &Aacute;reas a Reforzar</h3>
        ${data.areas_debil.map(t => `
          <div class="card" style="display:flex;justify-content:space-between;align-items:center;border-left:4px solid var(--color-error);margin-bottom:.5rem;">
            <div>
              <strong>${TOPIC_NAMES[t.topic_id] || t.topic_id}</strong>
              <p style="font-size:.8rem;color:var(--color-text-muted);">${t.fallos} fallos — ${t.tasa||0}%</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="startExercise('${t.topic_id}')">Practicar</button>
          </div>`).join('')}
      `;
    }
  } catch(e) {
    document.getElementById('report-stats').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
  }
}

// ============================================================
// CONFIGURACI&Oacute;N
// ============================================================
const CONFIG_TABS = ['ia', 'doom', 'cuenta'];
let currentConfigTab = 'ia';

function renderConfig(main) {
  main.innerHTML = `
    <h2>Configuraci&oacute;n</h2>
    <div class="config-tabs">
      <button class="config-tab ${currentConfigTab === 'ia' ? 'active' : ''}" onclick="switchConfigTab('ia')"><i class="ti ti-robot"></i> IA</button>
      <button class="config-tab ${currentConfigTab === 'doom' ? 'active' : ''}" onclick="switchConfigTab('doom')"><i class="ti ti-video"></i> DoomGuy</button>
      <button class="config-tab ${currentConfigTab === 'cuenta' ? 'active' : ''}" onclick="switchConfigTab('cuenta')"><i class="ti ti-user"></i> Cuenta</button>
    </div>
    <div id="config-content"></div>`;
  switchConfigTab(currentConfigTab);
}

function switchConfigTab(tab) {
  currentConfigTab = tab;
  document.querySelectorAll('.config-tab').forEach(t => t.classList.toggle('active', t.textContent.includes(tab === 'ia' ? 'IA' : tab === 'doom' ? 'Doom' : 'Cuenta')));
  const container = document.getElementById('config-content');
  if (!container) return;
  
  if (tab === 'ia') renderConfigIA(container);
  else if (tab === 'doom') renderConfigDoom(container);
  else if (tab === 'cuenta') renderConfigCuenta(container);
}

function renderConfigIA(container) {
  container.innerHTML = `
    <div class="card" style="margin-top:1rem;">
      <h3><i class="ti ti-robot"></i> Proveedores de IA</h3>
      <p style="color:var(--color-text-secondary);margin-bottom:1rem;">Configura APIs para generar ejercicios, resolver paso a paso y crear variantes.</p>
      
      <div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:var(--radius-md);padding:0.75rem;margin-bottom:1rem;">
        <strong style="color:var(--color-primary);display:block;margin-bottom:0.5rem;">📌 ¿Dónde conseguir una API Key?</strong>
        <ul style="font-size:0.85rem;color:var(--color-text-secondary);margin-left:1rem;">
          <li><strong>Anthropic (Claude):</strong> <span class="glossary-link" onclick="navigator.clipboard.writeText('https://console.anthropic.com/');alert('Link copiado!')">console.anthropic.com</span></li>
          <li><strong>OpenAI (GPT-4):</strong> <span class="glossary-link" onclick="navigator.clipboard.writeText('https://platform.openai.com/api-keys');alert('Link copiado!')">platform.openai.com</span></li>
          <li><strong>Grok (xAI):</strong> <span class="glossary-link" onclick="navigator.clipboard.writeText('https://console.x.ai');alert('Link copiado!')">console.x.ai</span></li>
        </ul>
      </div>
      
      <div id="api-list" style="margin-bottom:1rem;"></div>
      <form onsubmit="saveAPI(event)">
        <div style="display:flex;gap:0.5rem;margin-bottom:0.75rem;">
          <select id="api-provider" class="btn btn-outline" style="background:var(--color-bg);flex:1;">
            <option value="anthropic">Anthropic (Claude)</option>
            <option value="openai">OpenAI (GPT-4)</option>
            <option value="grok">Grok (xAI)</option>
          </select>
          <input type="password" id="api-key" class="btn btn-outline" style="background:var(--color-bg);text-align:left;flex:2;" placeholder="sk-... (tu API key)">
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;"><i class="ti ti-device-floppy"></i> Guardar API Key</button>
      </form>
    </div>`;
  loadAPIList();
}

function renderConfigDoom(container) {
  const doomVideos = _doomVideos;
  
  // 12 video slots exactly as the user described
  const slots = [
    { key: 'idle_100', label: '🎬 100% HP — Reposo (loop)', desc: 'Doom con vida completa, en reposo. Se reproduce en ciclo.' },
    { key: 'hit_75',   label: '⚡ 100 → 75% — Transición (1 vez)', desc: 'Le disparan, baja a 75%. Video corto, se reproduce UNA vez.' },
    { key: 'idle_75',  label: '🎬 75% HP — Reposo (loop)', desc: 'Doom con 75% de vida, herido leve. Se reproduce en ciclo.' },
    { key: 'hit_50',   label: '⚡ 75 → 50% — Transición (1 vez)', desc: 'Le disparan, baja a 50%. Video corto, UNA vez.' },
    { key: 'idle_50',  label: '🎬 50% HP — Reposo (loop)', desc: 'Doom con la mitad de vida. Se reproduce en ciclo.' },
    { key: 'hit_25',   label: '⚡ 50 → 25% — Transición (1 vez)', desc: 'Le disparan, baja a 25%. Video corto, UNA vez.' },
    { key: 'idle_25',  label: '🎬 25% HP — Reposo (loop)', desc: 'Doom con 25% de vida, mal herido. Se reproduce en ciclo.' },
    { key: 'hit_10',   label: '⚡ 25 → 10% — Transición (1 vez)', desc: 'Le disparan, baja a 10%. Video corto, UNA vez.' },
    { key: 'idle_10',  label: '🎬 10% HP — Reposo (loop)', desc: 'Doom con 10% de vida, al borde de la muerte. Se reproduce en ciclo.' },
    { key: 'hit_0',    label: '💀 10 → 0% — Balazo final (1 vez)', desc: 'El disparo mortal. Video corto, se reproduce UNA SOLA VEZ.' },
    { key: 'dead_png', label: '🖼️ 0% HP — PNG Estático', desc: 'Doom muerto. Imagen PNG estática, no video. Se muestra al morir.', isPng: true },
  ];
  
  let html = `<div class="card" style="margin-top:1rem;">
    <h3><i class="ti ti-video"></i> DoomGuy — Videos por HP</h3>
    <p style="color:var(--color-text-secondary);margin-bottom:1rem;">
      Son <strong>11 slots</strong>: 5 videos de reposo (loop), 5 videos de transición (1 vez) y 1 imagen PNG para muerte.<br>
      <span style="color:var(--color-warning);">⚠️ Los videos de transición se reproducen UNA SOLA VEZ cuando bajas de nivel.</span><br>
      <span style="color:var(--color-primary);">💡 El ciclo normal: reposo → (recibe daño) → transición → vuelve al reposo del nuevo nivel.</span>
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:.75rem;">`;
  
  slots.forEach(s => {
    const isPng = s.isPng;
    const acceptType = isPng ? 'image/png,image/jpeg' : 'video/mp4,video/webm';
    const currentSrc = doomVideos[s.key] || '';
    const fileName = currentSrc ? currentSrc.split('/').pop() : 'Ninguno';
    
    html += `
      <div class="card doom-video-card" style="padding:.75rem;border-left:3px solid ${s.key.startsWith('hit_') ? 'var(--color-warning)' : s.key.startsWith('idle_') ? 'var(--color-primary)' : 'var(--color-error)'};">
        <div style="margin-bottom:.5rem;">
          <strong style="font-size:.85rem;">${s.label}</strong>
          <p style="font-size:.75rem;color:var(--color-text-muted);margin-top:.15rem;">${s.desc}</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;">
          <span style="font-size:.75rem;color:var(--color-text-muted);">Archivo: <span id="doom-label-${s.key}">${fileName}</span></span>
        </div>
        <div style="display:flex;gap:.35rem;">
          <input type="file" accept="${acceptType}" style="display:none" id="doom-input-${s.key}" onchange="uploadDoomVideo('${s.key}', this, ${isPng})">
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="document.getElementById('doom-input-${s.key}').click()"><i class="ti ti-upload"></i> ${isPng ? 'Subir PNG' : 'Subir video'}</button>
          ${currentSrc ? `<button class="btn btn-outline btn-sm" style="color:var(--color-error);" onclick="removeDoomVideo('${s.key}')"><i class="ti ti-trash"></i></button>` : ''}
        </div>
        ${currentSrc && !isPng ? `<div style="margin-top:.5rem;"><video src="${currentSrc}" muted playsinline style="width:100%;max-height:70px;border-radius:4px;background:#000;" onmouseover="this.play()" onmouseout="this.pause();this.load()"></video></div>` : ''}
        ${currentSrc && isPng ? `<div style="margin-top:.5rem;"><img src="${currentSrc}" style="max-height:60px;border-radius:4px;"></div>` : ''}
      </div>`;
  });
  
  html += `</div></div>`;
  container.innerHTML = html;
}

function renderConfigCuenta(container) {
  container.innerHTML = `
    <div class="card" style="margin-top:1rem;">
      <h3>Estadísticas de Cuenta</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:1rem;">
        <div><strong>Usuario:</strong> ${state.user?.username || '-'}</div>
        <div><strong>Rol:</strong> ${state.user?.rol || '-'}</div>
        <div><strong>Nombre:</strong> ${state.user?.nombre || '-'}</div>
        <div><strong>Email:</strong> ${state.user?.email || '-'}</div>
        <div style="grid-column:1/-1;"><strong>Miembro desde:</strong> ${state.user?.fecha_registro ? new Date(state.user.fecha_registro).toLocaleDateString() : '-'}</div>
      </div>
    </div>
    <div class="card" style="margin-top:1rem;">
      <h3>Estadísticas de Juego</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:1rem;">
        <div><strong>Nivel:</strong> ${state.nivel}</div>
        <div><strong>XP Total:</strong> ${state.xp}</div>
        <div><strong>HP Actual:</strong> ${state.hp}/100</div>
        <div><strong>Racha Máxima:</strong> ${state.user?.racha_maxima || 0}</div>
      </div>
    </div>`;
}

// ============================================================
// PERFIL — Nivel educativo + selecci&oacute;n de temas
// ============================================================
let _profileNivelEducativo = null;
let _profileSelectedTopics = null;

function showProfilePanel() {
  _profileNivelEducativo = state.nivel_educativo || 'secundaria-10-11';
  _profileSelectedTopics = Array.isArray(state.selected_topics) ? [...state.selected_topics] : [];
  if (_profileSelectedTopics.length === 0) {
    _profileSelectedTopics = [...getTopicsForNivelLocal(_profileNivelEducativo)];
  }
  renderProfilePanel();
  document.getElementById('profile-modal')?.classList.remove('hidden');
}

function hideProfilePanel() {
  document.getElementById('profile-modal')?.classList.add('hidden');
}

function getTopicsForNivelLocal(nivelId) {
  const MAP = {
    'primaria-1-3':      ['mcm-mcd','porcentajes','razones-proporciones','numeros-reales','logica'],
    'primaria-4-6':      ['mcm-mcd','porcentajes','razones-proporciones','numeros-reales','logica','estadistica','geometria','plano-cartesiano'],
    'secundaria-7-9':    ['conjuntos','numeros-reales','mcm-mcd','porcentajes','razones-proporciones','estadistica','probabilidad','logica','ecuaciones','plano-cartesiano','geometria','inecuaciones'],
    'secundaria-10-11':  ['conjuntos','numeros-reales','radicales','polinomios','factorizacion','fracciones-alg','ecuaciones','sistemas-ecuaciones','inecuaciones','plano-cartesiano','exp-log','geometria','trigonometria','mcm-mcd','porcentajes','razones-proporciones','estadistica','probabilidad','logica','sucesiones','geo-analitica','tec-logica','tec-matematica','tec-verbal'],
    'universitario':     ['conjuntos','numeros-reales','radicales','polinomios','factorizacion','fracciones-alg','ecuaciones','sistemas-ecuaciones','inecuaciones','plano-cartesiano','exp-log','geometria','trigonometria','calculo','mcm-mcd','porcentajes','razones-proporciones','estadistica','probabilidad','logica','matrices','vectores','sucesiones','geo-analitica','tec-logica','tec-matematica','tec-verbal'],
    'calculo':           ['calculo','exp-log','trigonometria','matrices','vectores','sucesiones','geo-analitica','inecuaciones','polinomios','factorizacion']
  };
  return MAP[nivelId] || MAP['secundaria-10-11'];
}

function renderProfilePanel() {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;
  const nivel = _profileNivelEducativo;
  const availableTopics = getTopicsForNivelLocal(nivel);
  const selected = _profileSelectedTopics;

  modal.innerHTML = `
    <div class="modal-overlay" onclick="hideProfilePanel()">
      <div class="card" style="max-width:560px;max-height:90vh;overflow-y:auto;" onclick="event.stopPropagation()">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h2><i class="ti ti-user"></i> Mi Perfil</h2>
          <button class="btn btn-outline btn-sm" onclick="hideProfilePanel()"><i class="ti ti-x"></i></button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem;padding:.75rem;background:var(--color-bg);border-radius:var(--radius-md);">
          <div><strong>Usuario:</strong> ${state.user?.username||'-'}</div>
          <div><strong>Rol:</strong> ${state.user?.rol||'-'}</div>
          <div><strong>Nombre:</strong> ${state.user?.nombre||'-'}</div>
          <div><strong>Email:</strong> ${state.user?.email||'-'}</div>
        </div>

        <label style="font-weight:600;font-size:.9rem;display:block;margin-bottom:.5rem;">Nivel Educativo</label>
        <select id="profile-nivel" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:1.25rem;" onchange="onProfileNivelChange(this.value)">
          <option value="primaria-1-3" ${nivel==='primaria-1-3'?'selected':''}>Primaria (1° - 3°)</option>
          <option value="primaria-4-6" ${nivel==='primaria-4-6'?'selected':''}>Primaria (4° - 6°)</option>
          <option value="secundaria-7-9" ${nivel==='secundaria-7-9'?'selected':''}>Secundaria (7° - 9°)</option>
          <option value="secundaria-10-11" ${nivel==='secundaria-10-11'?'selected':''}>Secundaria (10° - 11°)</option>
          <option value="universitario" ${nivel==='universitario'?'selected':''}>Universitario (Inicio)</option>
          <option value="calculo" ${nivel==='calculo'?'selected':''}>Cálculo Avanzado</option>
        </select>

        <label style="font-weight:600;font-size:.9rem;display:block;margin-bottom:.5rem;">Temas disponibles</label>
        <p style="font-size:.8rem;color:var(--color-text-muted);margin-bottom:.75rem;">Marca los temas que quieres practicar. Solo estos aparecer&aacute;n en la lista de temas.</p>
        <div style="display:flex;flex-direction:column;gap:.35rem;" id="profile-topics-list">
          ${TOPICS.map(t => {
            const disabled = !availableTopics.includes(t.id);
            const checked = selected.includes(t.id);
            return `<label class="profile-topic-row" style="display:flex;align-items:center;gap:.5rem;padding:.35rem .5rem;border-radius:var(--radius-sm);background:${disabled?'var(--color-bg)':'transparent'};opacity:${disabled?0.5:1};cursor:${disabled?'not-allowed':'pointer'};">
              <input type="checkbox" ${checked?'checked':''} ${disabled?'disabled':''} onchange="onProfileTopicToggle('${t.id}', this.checked)" style="accent-color:var(--color-primary);">
              <i class="ti ${t.icon}" style="font-size:1.1rem;color:var(--color-primary);"></i>
              <span>${t.name}</span>
              ${disabled?'<span style="font-size:.7rem;color:var(--color-text-muted);margin-left:auto;">No disponible en este nivel</span>':''}
            </label>`;
          }).join('')}
        </div>

        <div style="display:flex;gap:.5rem;margin-top:1.5rem;">
          <button class="btn btn-primary" style="flex:1;" onclick="saveProfilePreferences()"><i class="ti ti-device-floppy"></i> Guardar</button>
          <button class="btn btn-outline" onclick="hideProfilePanel()">Cancelar</button>
        </div>
      </div>
    </div>`;
}

function onProfileNivelChange(newNivel) {
  _profileNivelEducativo = newNivel;
  // Resetear temas a los disponibles por defecto
  _profileSelectedTopics = [...getTopicsForNivelLocal(newNivel)];
  renderProfilePanel();
}

function onProfileTopicToggle(topicId, checked) {
  if (checked) {
    if (!_profileSelectedTopics.includes(topicId)) _profileSelectedTopics.push(topicId);
  } else {
    _profileSelectedTopics = _profileSelectedTopics.filter(t => t !== topicId);
  }
}

async function saveProfilePreferences() {
  try {
    const r = await fetch(`${API}/api/auth/preferences`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token}` },
      body: JSON.stringify({
        nivel_educativo: _profileNivelEducativo,
        selected_topics: _profileSelectedTopics
      })
    });
    if (!r.ok) { const d = await r.json(); alert(d.error || 'Error al guardar'); return; }
    const data = await r.json();
    state.nivel_educativo = data.user.nivel_educativo;
    state.selected_topics = data.user.selected_topics;
    state.user.nivel_educativo = data.user.nivel_educativo;
    state.user.selected_topics = data.user.selected_topics;
    hideProfilePanel();
  } catch(e) { alert('Error de conexi&oacute;n'); }
}

function uploadDoomVideo(key, input, isPng) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function(e) {
    const dataUrl = e.target.result;
    try {
      await fetch('/api/doom-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token}` },
        body: JSON.stringify({ key, image: dataUrl })
      });
      document.getElementById(`doom-label-${key}`).textContent = file.name;
    } catch(e) {}
    loadDoomVideos();
    switchConfigTab('doom');
  };
  reader.readAsDataURL(file);
}

function removeDoomVideo(key) {
  if (!confirm('Eliminar este video?')) return;
  fetch(`/api/doom-videos/${key}`, { method: 'DELETE', headers: { Authorization: `Bearer ${state.token}` } }).catch(() => {});
  loadDoomVideos();
  switchConfigTab('doom');
}

async function loadAPIList() {
  try {
    const r = await fetch(`${API}/api/config/apis`, { headers: { Authorization: `Bearer ${state.token}` } });
    const apis = await r.json();
    document.getElementById('api-list').innerHTML = apis.map(a => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem;background:var(--color-surface-hover);border-radius:var(--radius-md);margin-bottom:.5rem;">
        <span>${a.proveedor.toUpperCase()}</span>
        <button class="btn btn-outline btn-sm" onclick="deleteAPI(${a.id})"><i class="ti ti-trash"></i></button>
      </div>`).join('') || '<p style="color:var(--color-text-muted);font-size:.85rem;">Sin APIs configuradas</p>';
  } catch(e) {}
}

async function deleteAPI(id) {
  if (!confirm('¿Eliminar?')) return;
  await fetch(`${API}/api/config/apis/${id}`, { method:'DELETE', headers:{ Authorization: `Bearer ${state.token}` } });
  loadAPIList();
}

async function saveAPI(e) {
  e.preventDefault();
  await fetch(`${API}/api/config/apis`, {
    method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
    body:JSON.stringify({ proveedor: document.getElementById('api-provider').value, api_key: document.getElementById('api-key').value, prioridad: 0 })
  });
  renderConfig(document.getElementById('main-content'));
}

// ============================================================
// PANEL PADRE
// ============================================================
async function renderParentDashboard(main) {
  main.innerHTML = `
    <h2>Panel Parental</h2>
    <h3 style="margin:1rem 0;">Mis Hijos</h3>
    <div id="children-list" style="margin-bottom:1.5rem;"><p>Cargando...</p></div>
    <div class="card">
      <h3>Vincular Nuevo Hijo</h3>
      <p style="font-size:.85rem;color:var(--color-text-muted);margin:.5rem 0;">Ingresa el username del estudiante.</p>
      <div style="display:flex;gap:.5rem;">
        <input type="text" id="child-username" class="btn btn-outline" style="flex:1;background:var(--color-bg);text-align:left;" placeholder="username">
        <button class="btn btn-primary" onclick="linkChild()">Vincular</button>
      </div>
    </div>`;
  loadChildren();
}

async function loadChildren() {
  try {
    const r = await fetch(`${API}/api/auth/children`, { headers: { Authorization: `Bearer ${state.token}` } });
    const children = await r.json();
    document.getElementById('children-list').innerHTML = children.length === 0
      ? '<p style="color:var(--color-text-muted);">Sin hijos vinculados</p>'
      : children.map(c => `
        <div class="card" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;">
          <div>
            <strong>${c.nombre}</strong>
            <p style="font-size:.85rem;color:var(--color-text-muted);">@${c.username} — Lv ${c.nivel||1} — ${c.xp||0} XP</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="showChildReport(${c.id})">Ver Reporte</button>
        </div>`).join('');
  } catch(e) { document.getElementById('children-list').innerHTML = `<p style="color:var(--color-error);">${e.message}</p>`; }
}

async function linkChild() {
  await fetch(`${API}/api/auth/parent-child`, {
    method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
    body:JSON.stringify({ child_username: document.getElementById('child-username').value })
  });
  renderParentDashboard(document.getElementById('main-content'));
}

function switchToChildView(childId) {
  if (!childId) {
    showView(state.view);
    return;
  }
  showChildReport(parseInt(childId));
}

async function showChildReport(childId) {
  const main = document.getElementById('main-content');
  main.innerHTML = `<h2>Reporte del Hijo</h2><div id="report-container"><p>Cargando...</p></div>`;
  try {
    const r = await fetch(`${API}/api/reporte/hijo/${childId}`, { headers: { Authorization: `Bearer ${state.token}` } });
    const data = await r.json();
    const container = document.getElementById('report-container');
    if (data.informacion_hijo) {
      container.innerHTML = `
        <div class="card" style="margin-bottom:1rem;">
          <h3>${data.informacion_hijo.nombre}</h3>
          <p>Nivel ${data.informacion_hijo.nivel} — ${data.informacion_hijo.xp} XP — HP ${data.informacion_hijo.hp}</p>
        </div>`;
    }
  } catch(e) {
    document.getElementById('report-container').innerHTML = `<p style="color:var(--color-error);">${e.message}</p>`;
  }
}

// ============================================================
// ADMIN
// ============================================================
function renderAdmin(main) {
  main.innerHTML = `
    <h2>Banco de Ejercicios</h2>
    <div style="display:flex;gap:.75rem;align-items:center;margin:1rem 0;flex-wrap:wrap;">
      <select id="admin-filter" class="btn btn-outline" onchange="loadAdminList()" style="background:var(--color-bg);">
        <option value="">Todos</option>
        ${TOPICS.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}
      </select>
      <button class="btn btn-primary" onclick="showAddExercise()"><i class="ti ti-plus"></i> Nuevo</button>
      <span id="admin-count" style="color:var(--color-text-muted);font-size:.85rem;"></span>
    </div>
    <div id="admin-list"></div>
    ${renderAddExerciseForm()}`;
  loadAdminList();
}

function renderAddExerciseForm() {
  return `
  <div id="add-exercise-overlay" class="modal hidden" style="position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:2000;display:flex;align-items:center;justify-content:center;">
    <div class="card" style="max-width:550px;width:92%;max-height:90vh;overflow-y:auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h3><i class="ti ti-plus"></i> Nuevo Ejercicio</h3>
        <button class="btn btn-outline btn-sm" onclick="hideAddExercise()">✕</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:.6rem;">
        <select id="new-topic" class="btn btn-outline" style="background:var(--color-bg);">${TOPICS.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select>
        
        <div style="display:flex;gap:.35rem;align-items:center;">
          <textarea id="new-question" class="btn btn-outline" style="flex:1;background:var(--color-bg);text-align:left;height:60px;resize:vertical;" placeholder="Enunciado del ejercicio"></textarea>
        </div>
        
        <div style="display:flex;gap:.35rem;align-items:center;">
          <input id="new-latex" class="btn btn-outline" style="flex:1;background:var(--color-bg);text-align:left;" placeholder="F&oacute;rmula / expresi&oacute;n matem&aacute;tica" onclick="toggleMathKeyboard('new-latex')">
          <button class="btn btn-outline btn-sm" onclick="toggleMathKeyboard('new-latex')" title="Teclado"><i class="ti ti-keyboard"></i></button>

          <input id="new-correct" class="btn btn-outline" style="flex:1;background:var(--color-bg);text-align:left;" placeholder="✅ Respuesta CORRECTA" onclick="toggleMathKeyboard('new-correct')">
          <button class="btn btn-outline btn-sm" onclick="toggleMathKeyboard('new-correct')"><i class="ti ti-keyboard"></i></button>
        </div>

        <input id="new-d1" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="❌ Distractor 1">
        <input id="new-d2" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="❌ Distractor 2">
        <input id="new-d3" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="❌ Distractor 3">
        
        <!-- Image upload -->
        <div style="display:flex;gap:.5rem;align-items:center;padding:.5rem;background:var(--color-surface-hover);border-radius:var(--radius-md);">
          <i class="ti ti-photo" style="color:var(--color-primary);"></i>
          <input type="text" id="new-image" class="btn btn-outline" style="flex:1;background:var(--color-bg);text-align:left;" placeholder="URL de imagen (opcional)">
          <input type="file" id="new-image-file" accept="image/*" style="display:none" onchange="handleImageUpload(event)">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('new-image-file').click()"><i class="ti ti-upload"></i></button>
        </div>
        <div id="new-image-preview" style="display:none;margin-top:.25rem;text-align:center;">
          <img id="new-image-preview-img" style="max-width:100%;max-height:150px;border-radius:var(--radius-md);">
        </div>
        
        <textarea id="new-theory" class="btn btn-outline" style="background:var(--color-bg);text-align:left;height:60px;resize:vertical;" placeholder="Teor&iacute;a de respaldo (opcional)"></textarea>
        
        <div style="display:flex;gap:.5rem;">
          <button class="btn btn-primary" style="flex:1;" onclick="submitNewExercise()"><i class="ti ti-device-floppy"></i> Guardar</button>
          <button class="btn btn-outline" onclick="hideAddExercise()">Cancelar</button>
        </div>
      </div>
    </div>
  </div>`;
}

function showAddExercise() {
  document.getElementById('add-exercise-overlay')?.classList.remove('hidden');
}

function hideAddExercise() {
  document.getElementById('add-exercise-overlay')?.classList.add('hidden');
}

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function(e) {
    const dataUrl = e.target.result;
    document.getElementById('new-image-preview').style.display = 'block';
    document.getElementById('new-image-preview-img').src = dataUrl;
    try {
      const r = await fetch('/api/upload/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl })
      });
      const result = await r.json();
      if (result.url) {
        document.getElementById('new-image').value = result.url;
        document.getElementById('new-image-preview-img').src = result.url;
      }
    } catch(e) {
      document.getElementById('new-image').value = dataUrl;
    }
  };
  reader.readAsDataURL(file);
}

async function loadAdminList() {
  const topic = document.getElementById('admin-filter')?.value || '';
  const url = topic ? `${API}/api/admin/exercises?topic=${topic}` : `${API}/api/admin/exercises`;
  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${state.token}` } });
    const list = await r.json();
    document.getElementById('admin-count').textContent = `${list.length} ejercicio(s)`;
    document.getElementById('admin-list').innerHTML = list.map(ex => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem .75rem;background:var(--color-surface-hover);border-radius:var(--radius-md);margin-bottom:.25rem;">
        <div style="flex:1;font-size:.85rem;">
          <span class="badge" style="background:var(--color-primary);">${ex.topic_id}</span>
          <span style="margin-left:.5rem;">${ex.question?.substring(0,70)}${ex.question?.length>70?'...':''}</span>
        </div>
        <button class="btn btn-outline btn-sm" style="color:var(--color-error);" onclick="deleteExercise(${ex.id})"><i class="ti ti-trash"></i></button>
      </div>`).join('') || '<p style="color:var(--color-text-muted);margin-top:1rem;">Vac&iacute;o</p>';
  } catch(e) { document.getElementById('admin-list').innerHTML = `<p style="color:var(--color-error);">${e.message}</p>`; }
}

async function submitNewExercise() {
  const correctAns = document.getElementById('new-correct').value;
  const latexExpr = document.getElementById('new-latex').value;
  const imageUrl = document.getElementById('new-image').value;
  
  const body = {
    topic_id: document.getElementById('new-topic').value,
    question: document.getElementById('new-question').value + (imageUrl ? `\n<img src="${imageUrl}" alt="Gr&aacute;fico del ejercicio" style="max-width:100%;margin:1rem 0;border-radius:8px;">` : ''),
    latex: latexExpr,
    options: [correctAns, document.getElementById('new-d1').value, document.getElementById('new-d2').value, document.getElementById('new-d3').value],
    steps: [{math: latexExpr, expl: 'Resultado correcto: ' + correctAns}],
    theory: document.getElementById('new-theory').value
  };
  await fetch(`${API}/api/admin/exercises`, { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`}, body:JSON.stringify(body) });
  hideAddExercise();
  loadAdminList();
}

async function deleteExercise(id) {
  if (!confirm('¿Eliminar?')) return;
  await fetch(`${API}/api/admin/exercises/${id}`, { method:'DELETE', headers:{ Authorization: `Bearer ${state.token}` } });
  loadAdminList();
}

// ============================================================
// UI / HP / DOOM WIDGET
// ============================================================
async function updateUI() {
  if (!state.user) return;
  document.getElementById('user-xp').innerHTML = `<i class="ti ti-star"></i> ${state.xp} XP`;
  document.getElementById('user-level').innerHTML = `<i class="ti ti-certificate"></i> Lv ${state.nivel}`;
  
  // Parent view switcher
  if (state.user.rol === 'padre' && !document.getElementById('child-switcher')) {
    try {
      const r = await fetch(`${API}/api/auth/children`, { headers: { Authorization: `Bearer ${state.token}` } });
      const children = await r.json();
      if (children.length > 0) {
        const headerRight = document.querySelector('.header-right');
        const switcher = document.createElement('div');
        switcher.id = 'child-switcher';
        switcher.style.cssText = 'position:relative;';
        switcher.innerHTML = `
          <select class="btn btn-outline btn-sm" style="font-size:0.75rem;background:var(--color-surface-hover);" onchange="switchToChildView(this.value)">
            <option value="">👤 Mi Vista</option>
            ${children.map(c => `<option value="${c.id}">👦 ${c.nombre}</option>`).join('')}
          </select>`;
        headerRight?.insertBefore(switcher, headerRight.firstChild);
      }
    } catch(e) {}
  }

  
  const hp = Math.max(0, Math.min(100, state.hp));
  const hpDisplay = document.getElementById('doom-hp-display');
  if (hpDisplay) {
    const prevHpVal = parseInt(hpDisplay.textContent) || 100;
    hpDisplay.textContent = hp;
    hpDisplay.className = 'doom-hp-display';
    if (hp <= 0) {
      hpDisplay.classList.add('dying');
    } else if (hp < prevHpVal) {
      hpDisplay.classList.add('bleeding');
    }
  }
  
  document.getElementById('break-progress').style.width = `${(state.correctCount % 10) * 10}%`;
  document.getElementById('break-text').textContent = `${state.correctCount % 10}/10 ejercicios para juego`;
  
  // Show level-up indicator if nivel changed
  if (state._lastNivel && state._lastNivel < state.nivel) {
    // Could show a level-up animation here
  }
  state._lastNivel = state.nivel;

  const faceEl = document.getElementById('doom-face');
  const video = document.getElementById('doom-video');
  const doomVideos = _doomVideos;
  
  faceEl.className = 'doom-face';
  if (hp <= 0) faceEl.classList.add('dead');
  
  // Check if HP dropped past a threshold → play transition video
  let playedTransition = false;
  if (hp > 0 && hp < _prevHp) {
    for (let i = 1; i < DOOM_HIT_THRESHOLDS.length; i++) {
      const upper = DOOM_HIT_THRESHOLDS[i - 1];
      const lower = DOOM_HIT_THRESHOLDS[i];
      if (_prevHp > lower && hp <= lower) {
        const hitKey = `hit_${upper}`;
        const hitSrc = doomVideos[hitKey];
        if (hitSrc) {
          _doomPlayingHit = true;
          video.style.display = 'block';
          faceEl.style.backgroundImage = 'none';
          video.src = hitSrc;
          video.loop = false;
          video.load();
          video.play().catch(() => {});
          video.onended = () => { _doomPlayingHit = false; updateDoomDisplay(hp); };
          playedTransition = true;
          break;
        }
      }
    }
  }
  _prevHp = hp;
  
  // Death blow
  if (!playedTransition && hp <= 0 && !_doomDeathPlayed) {
    _doomDeathPlayed = true;
    const deathSrc = doomVideos['hit_0'];
    if (deathSrc) {
      _doomPlayingHit = true;
      video.style.display = 'block';
      faceEl.style.backgroundImage = 'none';
      video.src = deathSrc;
      video.loop = false;
      video.load();
      video.play().catch(() => {});
      video.onended = () => { _doomPlayingHit = false; updateDoomDisplay(0); };
      playedTransition = true;
    }
  }
  
  if (!playedTransition && !_doomPlayingHit) {
    updateDoomDisplay(hp);
  }
}

function updateDoomDisplay(hp) {
  const faceEl = document.getElementById('doom-face');
  const video = document.getElementById('doom-video');
  const doomVideos = _doomVideos;
  
  if (hp <= 0) {
    if (video) video.style.display = 'none';
    faceEl.style.backgroundImage = `url('img/doom/14.png')`;
    return;
  }
  
  const th = getDoomThreshold(hp);
  const idleKey = `idle_${th}`;
  const fallback = { 100: '1.png', 75: '4.png', 50: '6.png', 25: '9.png', 10: '11.png' };
  const fallbackImg = fallback[th] || '1.png';
  
  const idleSrc = doomVideos[idleKey];
  if (video && idleSrc) {
    video.style.display = 'block';
    faceEl.style.backgroundImage = 'none';
    if (video.src !== idleSrc || video.loop === false) {
      video.src = idleSrc;
      video.loop = true;
      video.load();
      video.play().catch(() => {});
    }
  } else {
    if (video) video.style.display = 'none';
    faceEl.style.backgroundImage = `url('img/doom/${fallbackImg}')`;
  }
}

// ============================================================
// PIZARRA
// ============================================================
let isDrawing = false, lastX = 0, lastY = 0;

function toggleWhiteboard() {
  const modal = document.getElementById('whiteboard-modal');
  modal.classList.toggle('hidden');
  if (!modal.classList.contains('hidden')) initWhiteboard();
}

function toggleInventory() {
  const existing = document.getElementById('inventory-modal-overlay');
  if (existing) { existing.remove(); return; }
  const overlay = document.createElement('div');
  overlay.id = 'inventory-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:2000;display:flex;align-items:center;justify-content:center;';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  
  const card = document.createElement('div');
  card.className = 'card';
  card.style.cssText = 'max-width:450px;width:92%;max-height:80vh;overflow-y:auto;padding:1.25rem;';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-outline btn-sm';
  closeBtn.style.cssText = 'float:right;';
  closeBtn.innerHTML = '✕';
  closeBtn.onclick = () => overlay.remove();
  card.appendChild(closeBtn);
  
  const title = document.createElement('h3');
  title.innerHTML = '<i class="ti ti-backpack"></i> Inventario';
  title.style.marginBottom = '1rem';
  card.appendChild(title);
  
  const container = document.createElement('div');
  container.id = 'inventory-quick-list';
  card.appendChild(container);
  
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  
  // Load inventory
  (async () => {
    try {
      const r = await fetch(`${API}/api/inventory`, { headers: { Authorization: `Bearer ${state.token}` } });
      const items = await r.json();
      if (items.length === 0) {
        container.innerHTML = '<p style="color:var(--color-text-muted);font-size:.85rem;">Vacío — compra ítems en la Tienda</p>';
        return;
      }
      container.innerHTML = items.map(item => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem;background:var(--color-surface-hover);border-radius:var(--radius-md);margin-bottom:.35rem;font-size:.85rem;cursor:pointer;" onclick="useInventoryItem(${item.id}, '${item.nombre}')">
          <span>${item.icono || '📦'} ${item.nombre} x${item.cantidad}</span>
          <span style="color:var(--color-text-muted);font-size:.7rem;">Usar</span>
        </div>
      `).join('');
    } catch(e) {
      container.innerHTML = `<p style="color:var(--color-error);font-size:.85rem;">Error: ${e.message}</p>`;
    }
  })();
}

async function useInventoryItem(itemId, name) {
  if (!confirm(`¿Usar ${name}?`)) return;
  try {
    const r = await fetch(`${API}/api/inventory/use/${itemId}`, { method:'POST', headers:{ Authorization: `Bearer ${state.token}` } });
    const result = await r.json();
    if (result.ok) {
      state.hp = Math.min(100, (state.hp || 0) + (result.hp_recuperado || 0));
      updateUI();
      document.getElementById('inventory-modal-overlay')?.remove();
    }
  } catch(e) { alert('Error: ' + e.message); }
}

function initWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  const wbBody = document.querySelector('.wb-body');
  canvas.width = wbBody ? wbBody.clientWidth : 600;
  canvas.height = wbBody ? wbBody.clientHeight : 400;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = state.whiteboardColor;
  ctx.lineWidth = state.whiteboardSize;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  // Remove old listeners
  const newCanvas = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(newCanvas, canvas);
  
  newCanvas.addEventListener('mousedown', e => { 
    isDrawing = true; 
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
    if (state.whiteboardMode === 'eraser') {
      eraseArea(newCanvas, e.offsetX, e.offsetY);
    }
  });
  newCanvas.addEventListener('mousemove', e => {
    if (!isDrawing) return;
    const ctx2 = newCanvas.getContext('2d');
    if (state.whiteboardMode === 'eraser') {
      eraseArea(newCanvas, e.offsetX, e.offsetY);
      [lastX, lastY] = [e.offsetX, e.offsetY];
      return;
    }
    ctx2.strokeStyle = state.whiteboardColor;
    ctx2.lineWidth = state.whiteboardSize;
    ctx2.lineJoin = 'round';
    ctx2.lineCap = 'round';
    ctx2.beginPath(); ctx2.moveTo(lastX, lastY); ctx2.lineTo(e.offsetX, e.offsetY); ctx2.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  newCanvas.addEventListener('mouseup', () => { isDrawing = false; });
  newCanvas.addEventListener('mouseout', () => { isDrawing = false; });
  
  newCanvas.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    isDrawing = true;
    [lastX, lastY] = [touch.clientX - newCanvas.getBoundingClientRect().left, touch.clientY - newCanvas.getBoundingClientRect().top];
    if (state.whiteboardMode === 'eraser') eraseArea(newCanvas, lastX, lastY);
  });
  newCanvas.addEventListener('touchmove', e => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    const x = touch.clientX - newCanvas.getBoundingClientRect().left;
    const y = touch.clientY - newCanvas.getBoundingClientRect().top;
    const ctx2 = newCanvas.getContext('2d');
    if (state.whiteboardMode === 'eraser') {
      eraseArea(newCanvas, x, y);
      [lastX, lastY] = [x, y];
      e.preventDefault();
      return;
    }
    ctx2.strokeStyle = state.whiteboardColor;
    ctx2.lineWidth = state.whiteboardSize;
    ctx2.lineJoin = 'round';
    ctx2.lineCap = 'round';
    ctx2.beginPath(); ctx2.moveTo(lastX, lastY); ctx2.lineTo(x, y); ctx2.stroke();
    [lastX, lastY] = [x, y];
    e.preventDefault();
  }, { passive: false });
}

function eraseArea(canvas, x, y) {
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, state.eraserSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function clearWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setWhiteboardMode(mode) {
  state.whiteboardMode = mode;
  document.querySelectorAll('.wb-tool-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  const canvas = document.getElementById('whiteboard-canvas');
  canvas.style.cursor = mode === 'eraser' ? 'cell' : 'crosshair';
}

function changeWhiteboardColor(color) {
  if (color) {
    state.whiteboardColor = color;
  } else {
    const picker = document.getElementById('wb-color-picker');
    if (picker) state.whiteboardColor = picker.value;
  }
  updateWhiteboardUI();
}

function setWhiteboardSize(size) {
  state.whiteboardSize = parseInt(size);
  document.getElementById('wb-size-value').textContent = state.whiteboardSize;
}

function updateWhiteboardUI() {
  document.getElementById('wb-color-picker').value = state.whiteboardColor;
  document.querySelectorAll('.wb-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.color === state.whiteboardColor);
  });
}

function saveWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  const link = document.createElement('a');
  link.download = `pizarra_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// ============================================================
// CATALOGO DE JUEGOS (SOLO PADRES)
// ============================================================
var GAME_CATEGORIES = {
  accion: { label: 'Accion', color: '#ef4444' },
  arcade: { label: 'Arcade', color: '#f59e0b' },
  puzzle: { label: 'Puzzle', color: '#10b981' },
  clasico: { label: 'Clasico NES', color: '#3b82f6' },
  habilidad: { label: 'Habilidad', color: '#a855f7' },
  deporte: { label: 'Deporte', color: '#06b6d4' }
};

var GAME_META = {
  snake: { cat: 'arcade', bg: '#065f46' },
  pong: { cat: 'deporte', bg: '#1e3a5f' },
  tictac: { cat: 'puzzle', bg: '#3b0764' },
  dino: { cat: 'habilidad', bg: '#1e3a5f' },
  breakout: { cat: 'arcade', bg: '#1e3a5f' },
  invaders: { cat: 'arcade', bg: '#1a1a2e' },
  flappy: { cat: 'habilidad', bg: '#0c4a6e' },
  memory: { cat: 'puzzle', bg: '#14532d' },
  tetris: { cat: 'puzzle', bg: '#1e1b4b' },
  asteroids: { cat: 'arcade', bg: '#0f172a' },
  pacman: { cat: 'clasico', bg: '#1a1a2e' },
  mines: { cat: 'puzzle', bg: '#1e293b' },
  simon: { cat: 'puzzle', bg: '#2d1b69' },
  mole: { cat: 'habilidad', bg: '#14532d' },
  '2048': { cat: 'puzzle', bg: '#1e293b' },
  snake2: { cat: 'arcade', bg: '#064e3b' },
  connect4: { cat: 'puzzle', bg: '#1e3a5f' },
  race: { cat: 'accion', bg: '#1e1b4b' },
  heli: { cat: 'habilidad', bg: '#0c4a6e' },
  jumper: { cat: 'habilidad', bg: '#1e293b' },
  colormatch: { cat: 'puzzle', bg: '#2d1b69' },
  aim: { cat: 'habilidad', bg: '#1e3a5f' },
  reaction: { cat: 'habilidad', bg: '#3b0764' },
  typing: { cat: 'puzzle', bg: '#14532d' },
  match3: { cat: 'puzzle', bg: '#1e1b4b' },
  falling: { cat: 'habilidad', bg: '#1a1a2e' },
  catch: { cat: 'arcade', bg: '#065f46' },
  pongsolo: { cat: 'deporte', bg: '#1e3a5f' },
  ninja: { cat: 'puzzle', bg: '#1e293b' },
  drum: { cat: 'accion', bg: '#2d1b69' },
  machrider: { cat: 'accion', bg: '#1e1b4b' },
  duckhunt: { cat: 'clasico', bg: '#0c4a6e' },
  iceclimber: { cat: 'clasico', bg: '#0c4a6e' },
  balloon: { cat: 'clasico', bg: '#0c4a6e' },
  excitebike: { cat: 'clasico', bg: '#1e1b4b' },
  bomberman: { cat: 'clasico', bg: '#1a1a2e' },
  kungfu: { cat: 'clasico', bg: '#3b0764' },
  galaxian: { cat: 'clasico', bg: '#1a1a2e' },
  popeye: { cat: 'clasico', bg: '#0c4a6e' },
  battlecity: { cat: 'clasico', bg: '#1e293b' },
  roadfighter: { cat: 'accion', bg: '#2d2d2d' }
};

function renderGameCatalog(main) {
  if (typeof MathGames === 'undefined' || !MathGames.games) {
    main.innerHTML = '<div class="card" style="text-align:center;padding:2rem;"><p style="color:var(--color-error);">Biblioteca de juegos no disponible.</p></div>';
    return;
  }
  var gameList = MathGames.games;
  var ids = Object.keys(gameList);
  if (ids.length === 0) {
    main.innerHTML = '<div class="card" style="text-align:center;padding:2rem;"><p style="color:var(--color-warning);">No hay juegos registrados. Verifica la consola para m&aacute;s detalles.</p></div>';
    return;
  }
  
  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;flex-wrap:wrap;gap:.5rem;">' +
    '<h2><i class="ti ti-device-gamepad-2"></i> Catalogo de Juegos</h2>' +
    '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;">' +
    '<span style="font-size:.85rem;color:var(--color-text-muted);">' + ids.length + ' juegos</span>' +
    '<select id="gc-filter" class="btn btn-outline btn-sm" style="background:var(--color-bg);font-size:.75rem;" onchange="filterGameCatalog()">' +
    '<option value="">Todas las categorias</option>';
  var cats = Object.entries(GAME_CATEGORIES);
  for (var ci = 0; ci < cats.length; ci++) {
    html += '<option value="' + cats[ci][0] + '" style="color:' + cats[ci][1].color + '">' + cats[ci][1].label + '</option>';
  }
  html += '</select></div></div>' +
    '<p style="color:var(--color-text-secondary);margin-bottom:1rem;font-size:.85rem;">Panel de auditoria para padres. Haz clic en cualquier juego para probarlo.</p>' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem;" id="game-catalog-grid"></div>' +
    '<div id="game-catalog-preview" class="hidden card" style="margin-top:1.5rem;"></div>';
  main.innerHTML = html;
  renderGameCatalogGrid();
}

function filterGameCatalog() {
  renderGameCatalogGrid();
}

function renderGameCatalogGrid() {
  var grid = document.getElementById('game-catalog-grid');
  if (!grid) return;
  grid.innerHTML = '';
  if (typeof MathGames === 'undefined' || !MathGames.games) return;
  var gameList = MathGames.games;
  var ids = Object.keys(gameList);
  var filter = document.getElementById('gc-filter')?.value || '';
  
  ids.sort().forEach(function(id) {
    var g = gameList[id];
    var meta = GAME_META[id] || {};
    var cat = GAME_CATEGORIES[meta.cat] || GAME_CATEGORIES['arcade'];
    if (filter && filter !== meta.cat) return;
    
    var card = document.createElement('div');
    card.style.cssText = 'cursor:pointer;border-radius:12px;overflow:hidden;border:2px solid ' + (cat.color || '#333') + ';transition:all .2s;background:var(--color-surface);';
    
    // Header banner with category color
    var banner = document.createElement('div');
    banner.style.cssText = 'height:48px;background:linear-gradient(135deg,' + (meta.bg || '#1a1a2e') + ',' + (cat.color || '#333') + ');display:flex;align-items:center;justify-content:center;';
    banner.innerHTML = '<span style="font-size:2rem;">' + (g.icon || '🎮') + '</span>';
    card.appendChild(banner);
    
    // Category badge
    var badge = document.createElement('div');
    badge.style.cssText = 'display:inline-block;margin:.5rem .75rem 0;padding:.1rem .5rem;border-radius:99px;font-size:.65rem;font-weight:600;background:' + (cat.color || '#333') + ';color:#fff;text-transform:uppercase;';
    badge.textContent = cat.label || 'Arcade';
    card.appendChild(badge);
    
    // Info
    var info = document.createElement('div');
    info.style.cssText = 'padding:0 .75rem .75rem;';
    info.innerHTML = '<div style="font-weight:600;font-size:.9rem;margin-top:.25rem;">' + g.name + '</div>' +
      '<div style="font-size:.75rem;color:var(--color-text-muted);margin-top:.2rem;line-height:1.3;">' + (g.desc || '') + '</div>' +
      '<div style="font-size:.65rem;color:var(--color-primary);margin-top:.4rem;">' + (g.config.controls || '') + '</div>';
    card.appendChild(info);
    
    card.onclick = function() { launchGame(id); };
    card.onmouseenter = function() { this.style.transform = 'translateY(-3px)'; this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)'; };
    card.onmouseleave = function() { this.style.transform = ''; this.style.boxShadow = ''; };
    
    grid.appendChild(card);
  });
  
  if (grid.children.length === 0) {
    grid.innerHTML = '<p style="color:var(--color-text-muted);text-align:center;padding:2rem;grid-column:1/-1;">No hay juegos en esta categor&iacute;a.</p>';
  }
}

function previewGame(gameId) {
  var container = document.getElementById('game-catalog-preview');
  container.classList.remove('hidden');
  container.innerHTML = '';
  
  var meta = GAME_META[gameId] || {};
  var cat = GAME_CATEGORIES[meta.cat] || GAME_CATEGORIES['arcade'];
  
  var header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;';
  header.innerHTML = '<h3><span style="font-size:1.5rem;">' + (MathGames.games[gameId]?.icon || '🎮') + '</span> ' + MathGames.games[gameId]?.name + ' <span style="font-size:.7rem;background:' + (cat.color||'#333') + ';color:#fff;padding:.1rem .5rem;border-radius:99px;vertical-align:middle;">' + (cat.label||'') + '</span></h3>' +
    '<button class="btn btn-outline btn-sm" onclick="document.getElementById(\'game-catalog-preview\').classList.add(\'hidden\'); MathGames.stop();">✕ Cerrar</button>';
  container.appendChild(header);
  
  var controls = document.createElement('div');
  controls.style.cssText = 'font-size:.75rem;color:var(--color-text-muted);margin-bottom:.5rem;background:var(--color-surface-hover);padding:.35rem .75rem;border-radius:var(--radius-md);';
  controls.textContent = MathGames.games[gameId]?.config?.controls || 'Usa teclado/raton para jugar';
  container.appendChild(controls);
  
  var gameArea = document.createElement('div');
  gameArea.id = 'game-catalog-area';
  gameArea.style.cssText = 'width:100%;min-height:280px;background:#000;border-radius:var(--radius-md);overflow:hidden;';
  container.appendChild(gameArea);
  
  setTimeout(function() { MathGames.launch(gameId, 'game-catalog-area'); }, 100);
}

// ============================================================
// JUEGOS (Game Library Integration)
// ============================================================
function triggerGame() {
  document.getElementById('game-modal').classList.remove('hidden');
  launchRandomGame();
}

function closeGame() {
  var finalScore = 0;
  if (window._gameScore) finalScore = window._gameScore;
  MathGames.stop();
  document.getElementById('game-modal').classList.add('hidden');
  if (finalScore > 0) {
    var xpGanada = Math.min(200, Math.floor(finalScore / 10) * 5 + 10);
    state.xp += xpGanada;
    updateUI();
  }
}

function restartGame() {
  var gameId = window._currentGameId || 'snake';
  MathGames.stop();
  launchGame(gameId);
}

function nextGame() {
  MathGames.stop();
  launchRandomGame();
}

let _lastGameId = null;

function launchRandomGame() {
  var game = MathGames.getRandom();
  if (game && game.id === _lastGameId) game = MathGames.getRandom();
  _lastGameId = game ? game.id : null;
  launchGame(game ? game.id : 'snake');
}

function launchGame(gameId) {
  window._currentGameId = gameId;
  window._gameScore = 0;
  document.getElementById('game-modal').classList.remove('hidden');
  
  var titleEl = document.getElementById('game-modal-title');
  var descEl = document.getElementById('game-modal-desc');
  var scoreEl = document.getElementById('game-score-display');
  var gameInfo = MathGames.games[gameId];
  if (gameInfo) {
    if (titleEl) titleEl.textContent = (gameInfo.icon || '🎮') + ' ' + gameInfo.name;
    if (descEl) descEl.textContent = gameInfo.desc || '';
    if (scoreEl) scoreEl.textContent = 'XP: 0';
  }
  
  MathGames.launch(gameId, 'game-container', function(score) {
    window._gameScore = score || 0;
    var xp = Math.min(200, Math.floor((score || 0) / 10) * 5 + 10);
    if (scoreEl) scoreEl.textContent = 'XP: ' + xp;
    state.xp += xp;
    updateUI();
  });
}

// ============================================================
// DOOM WIDGET - Draggable + Animations
// ============================================================
function initDoomWidget() {
  const widget = document.getElementById('doom-widget');
  if (!widget) return;
  
  let isDragging = false, startX, startY, origX, origY;
  let dragStarted = false;
  
  const onStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    isDragging = true;
    dragStarted = false;
    startX = touch.clientX;
    startY = touch.clientY;
    const rect = widget.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    widget.classList.add('dragging');
    e.preventDefault();
  };
  
  const onMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches ? e.touches[0] : e;
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (!dragStarted && Math.abs(dx) + Math.abs(dy) > 5) dragStarted = true;
    if (dragStarted) {
      widget.style.left = (origX + dx) + 'px';
      widget.style.top = (origY + dy) + 'px';
      widget.style.bottom = 'auto';
      widget.style.right = 'auto';
      e.preventDefault();
    }
  };
  
  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove('dragging');
    // Save position
    localStorage.setItem('doom_pos', JSON.stringify({
      left: widget.style.left,
      top: widget.style.top,
      bottom: widget.style.bottom,
      right: widget.style.right
    }));
  };
  
  widget.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  widget.addEventListener('touchstart', onStart, { passive: false });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
  
  // Restore saved position
  try {
    const saved = JSON.parse(localStorage.getItem('doom_pos'));
    if (saved && saved.left) {
      widget.style.left = saved.left;
      widget.style.top = saved.top;
      widget.style.bottom = 'auto';
      widget.style.right = 'auto';
    }
  } catch(e) {}
}

// ============================================================
// WHITEBOARD - Draggable Window
// ============================================================
function initDraggableWhiteboard() {
  const win = document.getElementById('whiteboard-window');
  const header = document.getElementById('wb-header');
  if (!win || !header) return;
  
  let isDragging = false, startX, startY, origLeft, origTop;
  
  const onStart = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('.wb-controls')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origLeft = win.offsetLeft;
    origTop = win.offsetTop;
    win.style.transition = 'none';
    e.preventDefault();
  };
  
  const onMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    win.style.left = (origLeft + dx) + 'px';
    win.style.top = (origTop + dy) + 'px';
    win.style.margin = '0';
  };
  
  const onEnd = () => {
    isDragging = false;
    win.style.transition = '';
  };
  
  header.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
}

// ============================================================
// WHITEBOARD - Resize canvas when window resizes
// ============================================================
function initWhiteboardCanvas() {
  const canvas = document.getElementById('whiteboard-canvas');
  const wbBody = document.querySelector('.wb-body');
  if (!canvas || !wbBody) return;
  
  const resizeCanvas = () => {
    canvas.width = wbBody.clientWidth;
    canvas.height = wbBody.clientHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Observe for resize handle
  const observer = new ResizeObserver(resizeCanvas);
  observer.observe(wbBody);
}
