// MathMaty v2.0 - Engine Completo
const API = '';
const state = {
  user: null, hp: 100, xp: 0, streak: 0, nivel: 1,
  currentTopic: null, currentDiff: 'basico', currentExercise: null,
  correctCount: 0, view: 'auth',
  token: localStorage.getItem('mathmaty_token'),
  missionState: null, examTimer: null, activeEvent: null,
  whiteboardColor: '#3b82f6', whiteboardSize: 3
};

const DOOM_STATES = [
  { hp: [100,100], img:'1.png' }, { hp:[90,99], img:'2.png' },
  { hp:[80,89], img:'3.png' }, { hp:[70,79], img:'4.png' },
  { hp:[60,69], img:'5.png' }, { hp:[50,59], img:'6.png' },
  { hp:[40,49], img:'7.png' }, { hp:[30,39], img:'8.png' },
  { hp:[20,29], img:'9.png' }, { hp:[15,19], img:'10.png' },
  { hp:[10,14], img:'11.png' }, { hp:[5,9], img:'12.png' },
  { hp:[1,4], img:'13.png' }, { hp:[0,0], img:'14.png' }
];

const TOPICS = [
  { id:'factorizacion', name:'Factorización', icon:'ti-math-function', parcial:1, teoria:'La factorización descompone una expresión en factores más simples. Métodos: factor común, diferencia de cuadrados, cuadrado perfecto, suma/diferencia de cubos.' },
  { id:'fracciones-alg', name:'Fracciones Algebraicas', icon:'ti-divide', parcial:1, teoria:'Fracciones donde numerador y/o denominador son polinomios. Operaciones: simplificar (factorizar y cancelar), suma (MCM), producto.' },
  { id:'ecuaciones', name:'Ecuaciones', icon:'ti-equal', parcial:1, teoria:'Una ecuación es una igualdad con incógnitas. Para resolverla: despejar la variable aplicando operaciones inversas en ambos lados.' },
  { id:'inecuaciones', name:'Inecuaciones', icon:'ti-math-greater', parcial:2, teoria:'Desigualdades con incógnitas. Regla clave: al multiplicar/dividir por negativo, el signo se invierte. La solución es un intervalo.' },
  { id:'exp-log', name:'Exponenciales y Logaritmos', icon:'ti-trending-up', parcial:2, teoria:'Exponenciales: aᵐ×aⁿ=aᵐ⁺ⁿ. Logaritmos: log_b(x)=n ↔ bⁿ=x. Propiedades: log(xy)=log x+log y.' },
  { id:'trigonometria', name:'Trigonometría', icon:'ti-circle-half', parcial:2, teoria:'Funciones del triángulo rectángulo. Identidad: sen²x+cos²x=1. Valores exactos: sen30°=1/2, cos60°=1/2.' },
  { id:'calculo', name:'Cálculo', icon:'ti-variable', parcial:3, teoria:'Límites, derivadas e integrales. d/dx(xⁿ)=nxⁿ⁻¹. ∫xⁿdx=xⁿ⁺¹/(n+1)+C.' }
];

const TOPIC_NAMES = Object.fromEntries(TOPICS.map(t => [t.id, t.name]));

document.addEventListener('DOMContentLoaded', async () => {
  if (state.token) { await fetchProfile(); loadGlossary(); }
  else showAuth();
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
  document.getElementById('glossary-mana').textContent = item.maña;
  document.getElementById('glossary-modal').classList.remove('hidden');
}

function closeGlossary() { document.getElementById('glossary-modal').classList.add('hidden'); }

// ============================================================
// AUTENTICACIÓN
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
    if (state.user.rol === 'padre') document.getElementById('parent-btn')?.classList.remove('hidden');
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
        <p style="color:var(--color-text-muted);font-size:.85rem;">Tutor de Precálculo TEC</p>
      </div>
      <div id="auth-error" style="color:var(--color-error);font-size:.85rem;margin-bottom:1rem;text-align:center;"></div>
      <form onsubmit="handleLogin(event)">
        <input type="text" id="username" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:.75rem;" placeholder="Usuario" required>
        <input type="password" id="password" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:1.5rem;" placeholder="Contraseña" required>
        <button type="submit" class="btn btn-primary" style="width:100%;">Iniciar Sesión</button>
      </form>
      <p style="text-align:center;margin-top:1.5rem;font-size:.85rem;color:var(--color-text-secondary);">
        ¿No tienes cuenta? <a href="#" onclick="showRegister()" style="color:var(--color-primary);">Regístrate</a>
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
        <input type="password" id="reg-password" class="btn btn-outline" style="width:100%;text-align:left;background:var(--color-bg);margin-bottom:1.5rem;" placeholder="Contraseña" required>
        <button type="submit" class="btn btn-primary" style="width:100%;">Registrarse</button>
      </form>
      <p style="text-align:center;margin-top:1.5rem;font-size:.85rem;color:var(--color-text-secondary);">
        ¿Ya tienes cuenta? <a href="#" onclick="showAuth()" style="color:var(--color-primary);">Inicia sesión</a>
      </p>
    </div>`;
}

async function handleRegister(e) {
  e.preventDefault();
  const body = {
    username: document.getElementById('reg-username').value,
    nombre: document.getElementById('reg-nombre').value,
    rol: document.getElementById('reg-rol').value,
    password: document.getElementById('reg-password').value
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

function logout() { localStorage.removeItem('mathmaty_token'); state.token = null; showAuth(); }

// ============================================================
// NAVEGACIÓN
// ============================================================
function showView(view) {
  state.view = view;
  document.getElementById('auth-container')?.classList.add('hidden');
  document.getElementById('app-container')?.classList.remove('hidden');
  document.getElementById('doom-widget')?.classList.remove('hidden');
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  
  const main = document.getElementById('main-content');
  const views = {
    home: renderHome, topics: renderTopics, exercise: renderExercise,
    leaderboard: renderLeaderboard, reports: renderReports, config: renderConfig,
    'parent-dashboard': renderParentDashboard, missions: renderMissions,
    exams: renderExams, admin: renderAdmin, 'mission-run': renderMissionRun,
    events: renderEvents, badges: renderBadges, shop: renderShop,
    knowledge: renderKnowledge
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
  // Obtener nivelación
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
          <h2>¡Hola, ${state.user?.nombre || 'Matemático'}!</h2>
          <p style="color:var(--color-text-secondary);">Precálculo TEC — ${state.user?.rol === 'padre' ? 'Panel de Padre' : 'Tu viaje matemático'}</p>
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
          <div class="stat-mini"><span class="stat-value" style="color:var(--color-error);">${nivelData.precision || 0}%</span><span class="stat-label">Precisión</span></div>
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
        <div class="card stat-card"><i class="ti ti-clock"></i><p class="stat-number">${nivelData.horas_practica || 0}h</p><p class="stat-label">Práctica</p></div>
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
  main.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
      <h2>Temas de Precálculo</h2>
      <button class="btn btn-outline btn-sm" onclick="openSolver()"><i class="ti ti-robot"></i> Resolver</button>
    </div>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Selecciona un tema para practicar. Cada tema tiene teoría, ejemplos y ejercicios.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.25rem;">
    ${TOPICS.map(t => `
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
          <button class="btn btn-outline btn-sm" onclick="openKnowledgeTopic('${t.id}')"><i class="ti ti-book"></i> Teoría</button>
          <button class="btn btn-outline btn-sm" onclick="showView('exams')"><i class="ti ti-clipboard-list"></i> Examen</button>
        </div>
      </div>
    `).join('')}
    </div>`;
}

// ============================================================
// EJERCICIOS
// ============================================================
function startExercise(topicId) {
  state.currentTopic = TOPICS.find(t => t.id === topicId);
  showView('exercise');
}

async function renderExercise(main) {
  main.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;">
        <h2>${state.currentTopic.name}</h2>
        <div style="display:flex;gap:.5rem;">
          <button class="btn btn-outline btn-sm" onclick="toggleWhiteboard()"><i class="ti ti-pencil"></i> Pizarra</button>
          <button class="btn btn-outline btn-sm" onclick="openKnowledgeTopic('${state.currentTopic.id}')"><i class="ti ti-info-circle"></i> Teoría</button>
          <button class="btn btn-outline btn-sm" onclick="openSolver()"><i class="ti ti-robot"></i> Resolver</button>
        </div>
      </div>
      <div class="card" id="ex-card">
        <div id="ex-loading">
          <p style="color:var(--color-text-muted);">Generando ejercicio...</p>
        </div>
        <div id="ex-content" class="hidden">
          <div style="display:flex;justify-content:space-between;margin-bottom:1rem;">
            <span class="badge active">EJERCICIO</span>
            <button class="btn btn-outline btn-sm" onclick="showExerciseTheory()"><i class="ti ti-info-circle"></i> Ayuda</button>
          </div>
          <p id="ex-text" style="font-size:1.1rem;margin-bottom:1.5rem;"></p>
          <div id="ex-math" style="background:#000;padding:1.5rem;border-radius:var(--radius-md);text-align:center;margin-bottom:1.5rem;"></div>
          <div id="choice-area" class="choice-grid"></div>
        </div>
      </div>
      <div id="resolution-area" class="hidden">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3>Resolución Paso a Paso</h3>
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('resolution-area').classList.add('hidden'); document.getElementById('action-bar').classList.add('hidden'); generateNewExercise();">
              Siguiente <i class="ti ti-arrow-right"></i>
            </button>
          </div>
          <div id="steps-container" class="step-container"></div>
        </div>
      </div>
      <div id="action-bar" class="hidden" style="margin-top:1rem;">
        <button class="btn btn-primary" onclick="document.getElementById('resolution-area').classList.add('hidden'); document.getElementById('action-bar').classList.add('hidden'); generateNewExercise();">
          Siguiente Ejercicio <i class="ti ti-arrow-right"></i>
        </button>
      </div>
    </div>`;
  await generateNewExercise();
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
    document.getElementById('ex-text').textContent = data.pregunta;
    if (data.latex) {
      try { katex.render(data.latex, document.getElementById('ex-math'), { displayMode: true, throwOnError: false }); } catch(e) {}
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
  } catch(e) {
    document.getElementById('ex-loading').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}. <br>${e.message.includes('API Key') ? 'Configura una API Key en Ajustes.' : 'Intenta de nuevo.'}</p>
    <button class="btn btn-primary" style="margin-top:1rem;" onclick="generateNewExercise()">Reintentar</button>`;
  }
}

function checkChoice(choice, btn) {
  const isCorrect = choice === state.currentExercise.opciones[0];
  document.querySelectorAll('.choice-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === state.currentExercise.opciones[0]) b.classList.add('correct');
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
}

function showExerciseResolution() {
  document.getElementById('resolution-area').classList.remove('hidden');
  const container = document.getElementById('steps-container');
  
  if (state.currentExercise.pasos && state.currentExercise.pasos.length > 0) {
    container.innerHTML = state.currentExercise.pasos.map((p, i) => `
      <div class="step-item">
        <div class="step-number">${i+1}</div>
        <div class="step-content">
          <div class="step-math" id="step-math-${i}"></div>
          <div class="step-explanation">${highlightTerms(p.expl)}</div>
        </div>
      </div>
    `).join('');
    state.currentExercise.pasos.forEach((p, i) => {
      try { katex.render(p.math, document.getElementById(`step-math-${i}`), { throwOnError: false }); } catch(e) {}
    });
  } else {
    container.innerHTML = `<p style="color:var(--color-text-muted);">Usa el <button class="btn btn-outline btn-sm" onclick="openSolver()">Resolvedor Paso a Paso</button> para ver la solución detallada.</p>`;
  }
}

function showExerciseTheory() {
  if (state.currentExercise?.theory) {
    document.getElementById('glossary-title').textContent = 'Ayuda - Conceptos Clave';
    document.getElementById('glossary-def').innerHTML = state.currentExercise.theory.replace(/\n/g, '<br>');
  } else {
    document.getElementById('glossary-title').textContent = state.currentTopic.name;
    document.getElementById('glossary-def').textContent = state.currentTopic.teoria;
  }
  document.getElementById('glossary-example').textContent = 'Revisa la Biblioteca de Conocimiento para más detalles.';
  document.getElementById('glossary-mana').textContent = 'Practica con constancia. ¡Cada error es una oportunidad de aprender!';
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
    // Si está en evento, enviar resultado
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
  { id:'mision-1', name:'Recruta', desc:'Supera 5 ejercicios de Factorización sin perder más de 40 HP', topics:['factorizacion'], count:5, hpPenalty:20, xpReward:300, icon:'⚔️' },
  { id:'mision-2', name:'Soldado', desc:'Resuelve 8 ejercicios mezclados de Ecuaciones e Inecuaciones', topics:['ecuaciones','inecuaciones'], count:8, hpPenalty:20, xpReward:500, icon:'🎖️' },
  { id:'mision-3', name:'Veterano', desc:'12 ejercicios de todos los temas. Resistencia máxima.', topics:['factorizacion','ecuaciones','inecuaciones','exp-log','trigonometria'], count:12, hpPenalty:15, xpReward:800, icon:'🏆' },
  { id:'mision-4', name:'Élite', desc:'15 ejercicios de todos los temas con penalización severa', topics:['factorizacion','fracciones-alg','ecuaciones','inecuaciones','exp-log','trigonometria'], count:15, hpPenalty:25, xpReward:1200, icon:'💀' },
  { id:'examen-1', name:'Parcial I', desc:'Simulación del Primer Parcial TEC — 10 preguntas', topics:['factorizacion','fracciones-alg','ecuaciones'], count:10, hpPenalty:25, xpReward:1000, isExam:true, icon:'📋' },
  { id:'examen-2', name:'Parcial II', desc:'Simulación del Segundo Parcial TEC — 10 preguntas', topics:['inecuaciones','exp-log','trigonometria'], count:10, hpPenalty:25, xpReward:1000, isExam:true, icon:'📋' },
  { id:'examen-3', name:'Parcial III', desc:'Simulación del Tercer Parcial TEC — 10 preguntas', topics:['calculo'], count:10, hpPenalty:25, xpReward:1000, isExam:true, icon:'📋' }
];

function renderMissions(main) {
  const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
  main.innerHTML = `
    <h2>Misiones de Resistencia</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Cada misión tiene reglas distintas. Pierde HP, gana XP. ¿Aguantarás?</p>
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
    <h2>Pruebas y Exámenes</h2>
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
          <div id="mission-math" style="background:#000;padding:1.5rem;border-radius:8px;text-align:center;margin-bottom:1.5rem;"></div>
          <div id="mission-choices" class="choice-grid"></div>
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
    const r = await fetch(`${API}/api/ai/generate-exercise`, {
      method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`},
      body:JSON.stringify({ topic: topicId, difficulty: 'basico' })
    });
    const data = await r.json();
    if (data.error) throw new Error(data.error);
    
    state.currentExercise = data;
    document.getElementById('mission-loading').classList.add('hidden');
    document.getElementById('mission-content').classList.remove('hidden');
    document.getElementById('mission-text').textContent = data.pregunta;
    if (data.latex) {
      try { katex.render(data.latex, document.getElementById('mission-math'), { displayMode: true, throwOnError: false }); } catch(e) {}
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
  } catch(e) {
    document.getElementById('mission-loading').innerHTML = `<p style="color:var(--color-error);">${e.message}</p>`;
  }
}

function checkMissionChoice(choice, btn) {
  const isCorrect = choice === state.currentExercise.opciones[0];
  document.querySelectorAll('#mission-choices .choice-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === state.currentExercise.opciones[0]) b.classList.add('correct');
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
    stepsEl.innerHTML = state.currentExercise.pasos.map(p =>
      `<p style="font-size:.85rem;margin-top:.25rem;border-left:2px solid var(--color-primary);padding-left:.75rem;"><em>${p.expl}</em></p>`
    ).join('');
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

function endMission(reason) {
  if (state.examTimer) { clearInterval(state.examTimer); state.examTimer = null; }
  const m = state.missionState.mission;
  const score = Math.round((state.missionState.correct / m.count) * 100);
  const xpEarned = reason === 'Completada' ? m.xpReward : Math.round(m.xpReward * score / 100);
  state.xp += xpEarned;
  
  const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
  saved[m.id] = { score, xpEarned, date: new Date().toISOString() };
  localStorage.setItem('mm_missions', JSON.stringify(saved));
  
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="card result-card ${reason === 'Completada' ? 'success' : 'fail'}">
      <div style="text-align:center;padding:2rem;">
        <span style="font-size:4rem;">${reason === 'Completada' ? '🏆' : '💀'}</span>
        <h2 style="margin:1rem 0;">${reason === 'Completada' ? 'Misión Completada!' : 'Misión Fallida'}</h2>
        <p class="score-big" style="color:${score>=70?'var(--color-success)':'var(--color-error)'}">${score}%</p>
        <p>${state.missionState.correct}/${m.count} respuestas correctas</p>
        <p style="color:var(--color-warning);font-size:1.2rem;margin:.5rem 0;">+${xpEarned} XP</p>
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
          <p style="font-size:.85rem;">Tu puntuación: <strong>${ev.mi_puntuacion}</strong></p>
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
        ${data.length === 0 ? '<p style="color:var(--color-text-muted);">Sin participantes aún</p>' :
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
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Completa desafíos para desbloquear logros y ganar XP extra.</p>
    <div id="badges-container"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/badges`, { headers: { Authorization: `Bearer ${state.token}` } });
    const badges = await r.json();
    
    const obtenidos = badges.filter(b => b.obtenido);
    const pendientes = badges.filter(b => !b.obtenido);
    
    document.getElementById('badges-container').innerHTML = `
      <div style="margin-bottom:1.5rem;">
        <h3 style="margin-bottom:.75rem;">Obtenidos (${obtenidos.length}/${badges.length})</h3>
        ${obtenidos.length === 0 ? '<p style="color:var(--color-text-muted);">Aún no has obtenido badges. ¡Sigue practicando!</p>' :
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
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Gasta tu XP en power-ups, avatares y más.</p>
    <div style="display:flex;gap:.75rem;margin-bottom:1.5rem;">
      <button class="btn btn-outline btn-sm" onclick="renderInventory(document.getElementById('main-content'))">
        <i class="ti ti-backpack"></i> Mi Inventario
      </button>
    </div>
    <div id="shop-container"><p style="color:var(--color-text-muted);">Cargando tienda...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/shop`, { headers: { Authorization: `Bearer ${state.token}` } });
    const items = await r.json();
    
    document.getElementById('shop-container').innerHTML = `<div class="shop-grid">${items.map(item => `
      <div class="card shop-item ${state.nivel < item.nivel_requerido ? 'locked' : ''}">
        <div class="shop-icon">${item.icono || '📦'}</div>
        <h3>${item.nombre}</h3>
        <p style="font-size:.85rem;color:var(--color-text-secondary);">${item.descripcion}</p>
        <div class="shop-meta">
          <span class="price"><i class="ti ti-star"></i> ${item.precio_xp} XP</span>
          <span class="level-req">Nv. ${item.nivel_requerido}</span>
        </div>
        <button class="btn ${state.xp >= item.precio_xp && state.nivel >= item.nivel_requerido ? 'btn-primary' : 'btn-outline'}" 
                onclick="buyItem(${item.id})" ${state.xp < item.precio_xp || state.nivel < item.nivel_requerido ? 'disabled' : ''}>
          ${state.nivel < item.nivel_requerido ? '🔒 Nivel insuficiente' : state.xp < item.precio_xp ? 'XP insuficiente' : 'Comprar'}
        </button>
      </div>`).join('')}
    </div>`;
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
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Tus ítems comprados. Úsalos durante las misiones.</p>
    <button class="btn btn-outline btn-sm" style="margin-bottom:1rem;" onclick="showView('shop')">← Volver a Tienda</button>
    <div id="inventory-container"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/inventory`, { headers: { Authorization: `Bearer ${state.token}` } });
    const items = await r.json();
    
    document.getElementById('inventory-container').innerHTML = items.length === 0
      ? '<p style="color:var(--color-text-muted);">No tienes ítems. Compra algunos en la tienda.</p>'
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
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Explicaciones detalladas, ejemplos y mañas para cada tema de Precálculo.</p>
    <div id="knowledge-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem;">
      ${TOPICS.map(t => `
        <div class="card topic-card" onclick="openKnowledgeTopic('${t.id}')" style="cursor:pointer;">
          <i class="ti ${t.icon}" style="font-size:2rem;color:var(--color-primary);margin-bottom:.5rem;"></i>
          <h3>${t.name}</h3>
          <p style="font-size:.85rem;color:var(--color-text-secondary);margin:.5rem 0;line-height:1.5;">${t.teoria.substring(0,100)}...</p>
          <span style="font-size:.75rem;color:var(--color-primary);">Ver guía completa →</span>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:2rem;">
      <h3 style="margin-bottom:1rem;">Buscador de Términos</h3>
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
    ? '<p style="color:var(--color-text-muted);">No se encontraron términos</p>'
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
    
    if (entries.length === 0) {
      const topic = TOPICS.find(t => t.id === topicId);
      document.getElementById('kmodal-title').textContent = topic?.name || topicId;
      document.getElementById('kmodal-content').innerHTML = `<p>${topic?.teoria || 'Contenido en preparación...'}</p>`;
      document.getElementById('kmodal-ejemplos').innerHTML = '';
      document.getElementById('kmodal-manas').innerHTML = '';
    } else {
      const entry = entries[0];
      document.getElementById('kmodal-title').textContent = entry.titulo;
      document.getElementById('kmodal-content').innerHTML = entry.contenido;
      
      if (entry.ejemplos) {
        const ejemplos = typeof entry.ejemplos === 'string' ? JSON.parse(entry.ejemplos) : entry.ejemplos;
        document.getElementById('kmodal-ejemplos').innerHTML = `
          <h3 style="margin-bottom:.75rem;color:var(--color-success);">Ejemplos</h3>
          ${Array.isArray(ejemplos) ? ejemplos.map((ex, i) => `
            <div style="background:var(--color-surface-hover);padding:.75rem;border-radius:var(--radius-md);margin-bottom:.5rem;">
              <p style="font-weight:600;">${i+1}. ${ex.problema}</p>
              <p style="color:var(--color-text-secondary);">${ex.solucion}</p>
            </div>`).join('') : '<p>No hay ejemplos disponibles</p>'}
        `;
      }
      
      if (entry.manas) {
        document.getElementById('kmodal-manas').innerHTML = `
          <strong style="color:var(--color-warning);">💡 Mañas y Consejos</strong>
          <p style="font-style:italic;margin-top:.25rem;">${entry.manas}</p>`;
      }
    }
    
    state._knowledgeTopic = topicId;
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
// RESOLVEDOR PASO A PASO
// ============================================================
function openSolver() {
  document.getElementById('solver-modal').classList.remove('hidden');
  document.getElementById('solver-results').classList.add('hidden');
  document.getElementById('solver-loading').classList.add('hidden');
  document.getElementById('solver-input').value = '';
  document.getElementById('solver-input').focus();
}

function closeSolver() { document.getElementById('solver-modal').classList.add('hidden'); }

function setSolverExample(expr) {
  document.getElementById('solver-input').value = expr;
  solveExpression();
}

async function solveExpression() {
  const expr = document.getElementById('solver-input').value.trim();
  if (!expr) return;
  
  document.getElementById('solver-loading').classList.remove('hidden');
  document.getElementById('solver-results').classList.add('hidden');
  
  // Detectar tema basado en la expresión
  let topic = 'general';
  if (expr.includes('^2') && (expr.includes('-') || expr.includes('+'))) topic = 'factorizacion';
  else if (expr.includes('=')) topic = 'ecuaciones';
  else if (expr.includes('>') || expr.includes('<')) topic = 'inecuaciones';
  else if (expr.includes('log') || expr.includes('^')) topic = 'exp-log';
  else if (expr.includes('sen') || expr.includes('cos') || expr.includes('tan')) topic = 'trigonometria';
  
  try {
    const r = await fetch(`${API}/api/resolver/paso-a-paso`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ expression: expr, topic })
    });
    const data = await r.json();
    
    document.getElementById('solver-loading').classList.add('hidden');
    document.getElementById('solver-results').classList.remove('hidden');
    
    if (data.pasos) {
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
    }
    
    const answerEl = document.getElementById('solver-answer');
    if (data.respuesta_final) {
      answerEl.innerHTML = `<strong>Respuesta:</strong> ${data.respuesta_final}`;
      answerEl.classList.remove('hidden');
    } else if (data.pasos?.length > 0) {
      answerEl.innerHTML = `<strong>Último paso:</strong> ${data.pasos[data.pasos.length-1].math}`;
      answerEl.classList.remove('hidden');
    } else {
      answerEl.classList.add('hidden');
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
    <h2><i class="ti ti-trophy"></i> Clasificación General</h2>
    <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Estudiantes rankeados por XP, precisión y nivel.</p>
    <div class="card" id="lb-card"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
  
  try {
    const r = await fetch(`${API}/api/leaderboard`);
    const data = await r.json();
    
    document.getElementById('lb-card').innerHTML = data.length === 0
      ? '<p style="text-align:center;padding:2rem;">Aún no hay jugadores. ¡Sé el primero!</p>'
      : `<div class="lb-table">
          ${data.map((u, i) => `
            <div class="lb-row ${i < 3 ? 'top-three' : ''} ${state.user && u.id === state.user.id ? 'current-user' : ''}">
              <span class="lb-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':u.posicion}</span>
              <span class="lb-name">${u.nombre} ${state.user && u.id === state.user.id ? '<span class="badge you">Tú</span>' : ''}</span>
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
      ['Tasa de Éxito', (st.tasa_exito_global || 0)+'%', 'var(--color-warning)'],
      ['Rango', rank, 'var(--color-error)'],
      ['Nivel', 'Lv ' + state.nivel, 'var(--color-primary)'],
      ['XP Total', state.xp || 0, 'var(--color-warning)']
    ].map(([lbl, val, col]) => `
      <div class="card" style="text-align:center;padding:1rem;">
        <p style="font-size:.75rem;color:var(--color-text-muted);margin-bottom:.25rem;">${lbl}</p>
        <p style="font-size:1.5rem;font-weight:bold;color:${col};">${val}</p>
      </div>`).join('');
    
    // Nivelación
    try {
      const nr = await fetch(`${API}/api/nivelacion/calcular`, { headers: { Authorization: `Bearer ${state.token}` } });
      if (nr.ok) {
        const nd = await nr.json();
        document.getElementById('report-nivel').innerHTML = `
          <div class="card" style="margin-bottom:1.5rem;">
            <h3>Nivelación Avanzada</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.75rem;margin-top:1rem;">
              <div class="stat-mini"><span class="stat-value">${nd.nivel}</span><span class="stat-label">Nivel Calculado</span></div>
              <div class="stat-mini"><span class="stat-value">${nd.horas_practica}h</span><span class="stat-label">Práctica</span></div>
              <div class="stat-mini"><span class="stat-value">${nd.precision}%</span><span class="stat-label">Precisión</span></div>
              <div class="stat-mini"><span class="stat-value">${nd.racha_maxima}🔥</span><span class="stat-label">Racha Máxima</span></div>
            </div>
            <div style="margin-top:.75rem;">
              <p style="font-size:.8rem;color:var(--color-text-muted);">Desglose: XP: ${nd.desglose.xp_component} | Tiempo: ${nd.desglose.time_component} | Precisión: ${nd.desglose.precision_component} | Racha: ${nd.desglose.streak_bonus}</p>
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
          <h3 style="margin:1rem 0;">Historial de XP (últimos)</h3>
          <div class="card" style="max-height:300px;overflow-y:auto;">
            ${xh.map(x => `
              <div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--color-border);">
                <span style="font-size:.85rem;">${x.fuente_nombre || x.fuente}</span>
                <span style="color:${x.cantidad >= 0 ? 'var(--color-success)' : 'var(--color-error)'};font-weight:bold;">${x.cantidad >= 0 ? '+' : ''}${x.cantidad}</span>
              </div>`).join('')}
          </div>`;
      }
    } catch(e) {}
    
    // Áreas débiles
    if (data.areas_debil?.length > 0) {
      document.getElementById('report-weak').innerHTML = `
        <h3 style="margin:1rem 0;">🔴 Áreas a Reforzar</h3>
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
// CONFIGURACIÓN
// ============================================================
function renderConfig(main) {
  main.innerHTML = `
    <h2>Configuración</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;margin-top:1.5rem;">
      <div class="card">
        <h3>Proveedores de IA</h3>
        <p style="color:var(--color-text-secondary);margin-bottom:1rem;">Configura APIs para generar ejercicios y resolver paso a paso.</p>
        <div id="api-list" style="margin-bottom:1rem;"></div>
        <form onsubmit="saveAPI(event)">
          <select id="api-provider" class="btn btn-outline" style="width:100%;margin-bottom:.75rem;background:var(--color-bg);">
            <option value="anthropic">Anthropic (Claude)</option>
            <option value="openai">OpenAI (GPT-4)</option>
            <option value="grok">Grok (xAI)</option>
          </select>
          <input type="password" id="api-key" class="btn btn-outline" style="width:100%;margin-bottom:.75rem;background:var(--color-bg);text-align:left;" placeholder="API Key">
          <button type="submit" class="btn btn-primary" style="width:100%;">Guardar</button>
        </form>
      </div>
      <div class="card">
        <h3>Estadísticas de Cuenta</h3>
        <div style="margin-top:1rem;">
          <p><strong>Usuario:</strong> ${state.user?.username || '-'}</p>
          <p><strong>Rol:</strong> ${state.user?.rol || '-'}</p>
          <p><strong>Nombre:</strong> ${state.user?.nombre || '-'}</p>
          <p><strong>Email:</strong> ${state.user?.email || '-'}</p>
          <p><strong>Miembro desde:</strong> ${state.user?.fecha_registro ? new Date(state.user.fecha_registro).toLocaleDateString() : '-'}</p>
        </div>
      </div>
    </div>`;
  loadAPIList();
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
    <div id="add-exercise-form" class="hidden card" style="margin-top:1rem;">
      <h3>Nuevo Ejercicio</h3>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;">
        <select id="new-topic" class="btn btn-outline" style="background:var(--color-bg);">${TOPICS.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select>
        <input id="new-question" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Enunciado">
        <input id="new-latex" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Fórmula LaTeX">
        <input id="new-correct" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Respuesta correcta">
        <input id="new-d1" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Distractor 1">
        <input id="new-d2" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Distractor 2">
        <input id="new-d3" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Distractor 3">
        <textarea id="new-theory" class="btn btn-outline" style="background:var(--color-bg);text-align:left;height:60px;" placeholder="Teoría (opcional)"></textarea>
        <button class="btn btn-primary" onclick="submitNewExercise()">Guardar</button>
      </div>
    </div>`;
  loadAdminList();
}

function showAddExercise() { document.getElementById('add-exercise-form')?.classList.toggle('hidden'); }

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
      </div>`).join('') || '<p style="color:var(--color-text-muted);margin-top:1rem;">Vacío</p>';
  } catch(e) { document.getElementById('admin-list').innerHTML = `<p style="color:var(--color-error);">${e.message}</p>`; }
}

async function submitNewExercise() {
  const body = {
    topic_id: document.getElementById('new-topic').value,
    question: document.getElementById('new-question').value,
    latex: document.getElementById('new-latex').value,
    options: [document.getElementById('new-correct').value, document.getElementById('new-d1').value, document.getElementById('new-d2').value, document.getElementById('new-d3').value],
    steps: [{math: document.getElementById('new-latex').value, expl: 'Resultado'}],
    theory: document.getElementById('new-theory').value
  };
  await fetch(`${API}/api/admin/exercises`, { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${state.token}`}, body:JSON.stringify(body) });
  document.getElementById('add-exercise-form')?.classList.add('hidden');
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
function updateUI() {
  if (!state.user) return;
  document.getElementById('user-xp').innerHTML = `<i class="ti ti-star"></i> ${state.xp} XP`;
  document.getElementById('user-level').innerHTML = `<i class="ti ti-certificate"></i> Lv ${state.nivel}`;
  
  const hp = Math.max(0, Math.min(100, state.hp));
  document.getElementById('hp-fill').style.width = `${hp}%`;
  document.getElementById('hp-fill').style.background = hp > 60 ? 'var(--color-success)' : hp > 30 ? 'var(--color-warning)' : 'var(--color-error)';
  document.getElementById('hp-text').textContent = `${hp}/100`;
  
  document.getElementById('break-progress').style.width = `${(state.correctCount % 10) * 10}%`;
  document.getElementById('break-text').textContent = `${state.correctCount % 10}/10 ejercicios para juego`;
  
  const faceEl = document.getElementById('doom-face');
  const doomState = DOOM_STATES.find(s => hp >= s.hp[0] && hp <= s.hp[1]) || DOOM_STATES[DOOM_STATES.length-1];
  faceEl.style.backgroundImage = `url('img/doom/${doomState.img}')`;
  faceEl.style.animation = hp < 30 ? 'pulse 1s infinite' : '';
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

function initWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 80;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = state.whiteboardColor;
  ctx.lineWidth = state.whiteboardSize;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  // Remove old listeners
  const newCanvas = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(newCanvas, canvas);
  
  newCanvas.addEventListener('mousedown', e => { isDrawing = true; [lastX, lastY] = [e.offsetX, e.offsetY]; });
  newCanvas.addEventListener('mousemove', e => {
    if (!isDrawing) return;
    const ctx2 = newCanvas.getContext('2d');
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
    [lastX, lastY] = [touch.clientX, touch.clientY - 80];
  });
  newCanvas.addEventListener('touchmove', e => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    const ctx2 = newCanvas.getContext('2d');
    ctx2.strokeStyle = state.whiteboardColor;
    ctx2.lineWidth = state.whiteboardSize;
    ctx2.lineJoin = 'round';
    ctx2.lineCap = 'round';
    ctx2.beginPath(); ctx2.moveTo(lastX, lastY); ctx2.lineTo(touch.clientX, touch.clientY - 80); ctx2.stroke();
    [lastX, lastY] = [touch.clientX, touch.clientY - 80];
    e.preventDefault();
  }, { passive: false });
}

function clearWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeWhiteboardColor() {
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#a855f7', '#ffffff'];
  const current = colors.indexOf(state.whiteboardColor);
  state.whiteboardColor = colors[(current + 1) % colors.length];
}

function saveWhiteboard() {
  const canvas = document.getElementById('whiteboard-canvas');
  const link = document.createElement('a');
  link.download = `pizarra_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// ============================================================
// JUEGO (SNAKE)
// ============================================================
function triggerGame() { document.getElementById('game-modal').classList.remove('hidden'); startSnake(); }
function closeGame() { document.getElementById('game-modal').classList.add('hidden'); }

function startSnake() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth || 400;
  canvas.height = canvas.clientHeight || 300;
  let snake = [{x:10,y:10}], food = {x:5,y:5}, dx=1, dy=0, size=20, score=0;
  
  function draw() {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#00ff41'; snake.forEach(p => ctx.fillRect(p.x*size, p.y*size, size-2, size-2));
    ctx.fillStyle = '#ff0040'; ctx.fillRect(food.x*size, food.y*size, size-2, size-2);
    ctx.fillStyle = '#00ff41'; ctx.font = '14px monospace'; ctx.fillText(`Score: ${score}`, 10, 20);
    
    let head = {x:snake[0].x+dx, y:snake[0].y+dy};
    if (head.x < 0 || head.x >= canvas.width/size || head.y < 0 || head.y >= canvas.height/size) {
      snake = [{x:10,y:10}]; score = 0; dx=1; dy=0; return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      food = {x:Math.floor(Math.random()*(canvas.width/size)), y:Math.floor(Math.random()*(canvas.height/size))};
    } else snake.pop();
  }
  
  document.onkeydown = e => {
    if (e.key==='ArrowUp' && dy===0) { dx=0; dy=-1; }
    if (e.key==='ArrowDown' && dy===0) { dx=0; dy=1; }
    if (e.key==='ArrowLeft' && dx===0) { dx=-1; dy=0; }
    if (e.key==='ArrowRight' && dx===0) { dx=1; dy=0; }
  };
  
  if (window._snakeInterval) clearInterval(window._snakeInterval);
  window._snakeInterval = setInterval(draw, 120);
}
