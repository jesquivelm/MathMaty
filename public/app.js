// MathMaty - Core Logic
let state = {
    user: null,
    hp: 100,
    xp: 0,
    streak: 0,
    currentTopic: null,
    currentDiff: 'basico',
    currentExercise: null,
    correctCount: 0,
    history: [],
    view: 'auth',
    token: localStorage.getItem('mathmaty_token')
};

const DOMAIN = ''; 

const DOOM_STATES = [
    { hp: [100, 100], img: '1.png' },
    { hp: [90, 99], img: '2.png' },
    { hp: [80, 89], img: '3.png' },
    { hp: [70, 79], img: '4.png' },
    { hp: [60, 69], img: '5.png' },
    { hp: [50, 59], img: '6.png' },
    { hp: [40, 49], img: '7.png' },
    { hp: [30, 39], img: '8.png' },
    { hp: [20, 29], img: '9.png' },
    { hp: [15, 19], img: '10.png' },
    { hp: [10, 14], img: '11.png' },
    { hp: [5, 9], img: '12.png' },
    { hp: [1, 4], img: '13.png' },
    { hp: [0, 0], img: '14.png' }
];

const TOPICS = [
    { id: 'factorizacion', name: 'Factorización', icon: 'ti-math-function', teoria: 'La factorización descompone una expresión en factores más simples. Métodos: factor común, diferencia de cuadrados, cuadrado perfecto, suma/diferencia de cubos.' },
    { id: 'fracciones-alg', name: 'Fracciones Algebraicas', icon: 'ti-divide', teoria: 'Fracciones donde numerador y/o denominador son polinomios. Operaciones: simplificación (factorizar y cancelar), suma (MCM), producto (multiplicar directamente).' },
    { id: 'ecuaciones', name: 'Ecuaciones', icon: 'ti-equal', teoria: 'Una ecuación es una igualdad con incógnitas. Para resolverla: despejar la variable aplicando operaciones inversas en ambos lados.' },
    { id: 'inecuaciones', name: 'Inecuaciones', icon: 'ti-math-greater', teoria: 'Desigualdades con incógnitas. Regla clave: al multiplicar/dividir por negativo, el signo de desigualdad se invierte. La solución es un intervalo.' },
    { id: 'exp-log', name: 'Exponenciales y Logaritmos', icon: 'ti-trending-up', teoria: 'Exponenciales: aᵐ×aⁿ=aᵐ⁺ⁿ, (aᵐ)ⁿ=aᵐⁿ. Logaritmos: log_b(x)=n ↔ bⁿ=x. Propiedades: log(xy)=log x+log y.' },
    { id: 'trigonometria', name: 'Trigonometría', icon: 'ti-circle-half', teoria: 'Funciones del ángulo en triángulo rectángulo. Identidad fundamental: sen²x+cos²x=1. Valores exactos: sen30°=1/2, cos60°=1/2, tan45°=1.' },
    { id: 'calculo', name: 'Cálculo', icon: 'ti-variable', teoria: 'Límites: valor al que se acerca f(x). Derivada: tasa de cambio, regla de la potencia d/dx(xⁿ)=nxⁿ⁻¹. Integral: área bajo la curva, ∫xⁿdx=xⁿ⁺¹/(n+1)+C.' }
];

const MISSIONS = [
    { id: 'mision-1', name: '⚔️ Misión 1: Recruta', desc: 'Supera 5 ejercicios de Factorización sin perder más de 40 HP', topics: ['factorizacion'], count: 5, hpPenalty: 20, xpReward: 300 },
    { id: 'mision-2', name: '🎖️ Misión 2: Soldado', desc: 'Resuelve 8 ejercicios mezclados de Ecuaciones e Inecuaciones', topics: ['ecuaciones','inecuaciones'], count: 8, hpPenalty: 20, xpReward: 500 },
    { id: 'mision-3', name: '🏆 Misión 3: Veterano', desc: 'Resistencia total: 12 ejercicios de todos los temas', topics: ['factorizacion','ecuaciones','inecuaciones','exp-log','trigonometria'], count: 12, hpPenalty: 15, xpReward: 800 },
    { id: 'examen-1', name: '📋 Prueba: Parcial I', desc: 'Simulación del Primer Parcial TEC — 10 preguntas, tiempo libre', topics: ['factorizacion','fracciones-alg','ecuaciones'], count: 10, hpPenalty: 25, xpReward: 1000, isExam: true }
];

document.addEventListener('DOMContentLoaded', async () => {
    if (state.token) {
        await fetchProfile();
        loadGlossary();
    } else {
        showAuth();
    }
});

let glossary = [];
async function loadGlossary() {
    const resp = await fetch('glossary.json');
    glossary = await resp.json();
}

function highlightTerms(text) {
    let highlighted = text;
    glossary.forEach(g => {
        const regex = new RegExp(`\\b(${g.term})\\b`, 'gi');
        highlighted = highlighted.replace(regex, `<span class="glossary-link" onclick="openGlossary('$1')">$1</span>`);
    });
    return highlighted;
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

function closeGlossary() {
    document.getElementById('glossary-modal').classList.add('hidden');
}

async function fetchProfile() {
    try {
        const resp = await fetch(`${DOMAIN}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (resp.ok) {
            state.user = await resp.json();
            state.hp = state.user.hp || 100;
            state.xp = state.user.xp || 0;
            state.streak = state.user.racha_actual || 0;
            if (state.user.rol === 'padre') {
                document.getElementById('parent-btn').classList.remove('hidden');
            }
            showView('home');
            updateUI();
        } else {
            logout();
        }
    } catch (e) {
        logout();
    }
}

function showAuth() {
    const container = document.getElementById('auth-container');
    container.innerHTML = `
        <div class="card" style="max-width: 400px; margin: 4rem auto;">
            <h2 style="text-align: center; margin-bottom: 1.5rem;">MathMaty</h2>
            <div id="auth-error" style="color: var(--color-error); font-size: 0.8rem; margin-bottom: 1rem; text-align: center;"></div>
            <form onsubmit="handleLogin(event)">
                <input type="text" id="username" class="btn btn-outline" style="width: 100%; text-align: left; background: var(--color-bg); margin-bottom: 1rem;" placeholder="Usuario" required>
                <input type="password" id="password" class="btn btn-outline" style="width: 100%; text-align: left; background: var(--color-bg); margin-bottom: 1.5rem;" placeholder="Contraseña" required>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Iniciar Sesión</button>
            </form>
            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--color-text-secondary);">
                ¿No tienes cuenta? <a href="#" onclick="showRegister()" style="color: var(--color-primary);">Regístrate</a>
            </p>
        </div>
    `;
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('doom-widget').classList.add('hidden');
}

function showRegister() {
    const container = document.getElementById('auth-container');
    container.innerHTML = `
        <div class="card" style="max-width: 400px; margin: 4rem auto;">
            <h2 style="text-align: center; margin-bottom: 1.5rem;">Crear Cuenta</h2>
            <div id="auth-error" style="color: var(--color-error); font-size: 0.8rem; margin-bottom: 1rem; text-align: center;"></div>
            <form onsubmit="handleRegister(event)">
                <input type="text" id="reg-username" class="btn btn-outline" style="width: 100%; text-align: left; background: var(--color-bg); margin-bottom: 1rem;" placeholder="Usuario" required>
                <input type="text" id="reg-nombre" class="btn btn-outline" style="width: 100%; text-align: left; background: var(--color-bg); margin-bottom: 1rem;" placeholder="Nombre Completo" required>
                <select id="reg-rol" class="btn btn-outline" style="width: 100%; text-align: left; background: var(--color-bg); margin-bottom: 1rem;">
                    <option value="estudiante">Estudiante</option>
                    <option value="padre">Padre</option>
                </select>
                <input type="password" id="reg-password" class="btn btn-outline" style="width: 100%; text-align: left; background: var(--color-bg); margin-bottom: 1.5rem;" placeholder="Contraseña" required>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Registrarse</button>
            </form>
            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--color-text-secondary);">
                ¿Ya tienes cuenta? <a href="#" onclick="showAuth()" style="color: var(--color-primary);">Inicia sesión</a>
            </p>
        </div>
    `;
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const nombre = document.getElementById('reg-nombre').value;
    const rol = document.getElementById('reg-rol').value;
    const password = document.getElementById('reg-password').value;
    const resp = await fetch(`${DOMAIN}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, nombre, rol, password })
    });
    if (resp.ok) { alert('¡Registro exitoso!'); showAuth(); }
    else { const d = await resp.json(); document.getElementById('auth-error').textContent = d.error; }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resp = await fetch(`${DOMAIN}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await resp.json();
    if (resp.ok) {
        localStorage.setItem('mathmaty_token', data.token);
        state.token = data.token;
        await fetchProfile();
    } else { document.getElementById('auth-error').textContent = data.error; }
}

function logout() { localStorage.removeItem('mathmaty_token'); state.token = null; showAuth(); }

function showView(view) {
    state.view = view;
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('doom-widget').classList.remove('hidden');
    const main = document.getElementById('main-content');
    if (view === 'home') renderHome(main);
    else if (view === 'topics') renderTopics(main);
    else if (view === 'exercise') renderExercise(main);
    else if (view === 'leaderboard') renderLeaderboard(main);
    else if (view === 'reports') renderReports(main);
    else if (view === 'config') renderConfig(main);
    else if (view === 'parent-dashboard') renderParentDashboard(main);
    else if (view === 'missions') renderMissions(main);
    else if (view === 'exams') renderExams(main);
    else if (view === 'admin') renderAdmin(main);
    else if (view === 'mission-run') renderMissionRun(main);
}

function renderHome(main) {
    main.innerHTML = `
        <div class="card" style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-color: #312e81;">
            <h2>¡Hola, ${state.user.nombre}!</h2>
            <p style="color: var(--color-text-secondary);">Estás en el curso de Precálculo del TEC.</p>
            <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                <button class="btn btn-primary" onclick="showView('topics')">Empezar Práctica</button>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem;">
            <div class="card"><h4>Racha</h4><p style="font-size: 2rem; font-weight: bold; color: var(--color-warning);">${state.streak}🔥</p></div>
            <div class="card"><h4>Nivel</h4><p style="font-size: 2rem; font-weight: bold; color: var(--color-primary);">Lvl ${state.user.nivel}</p></div>
            <div class="card"><h4>XP</h4><p style="font-size: 2rem; font-weight: bold;">${state.xp}</p></div>
        </div>
    `;
}

function renderTopics(main) {
    main.innerHTML = `
        <h2 style="margin-bottom:1.5rem;">Temas y Materia</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;">
        ${TOPICS.map(t => `
            <div class="card" style="cursor:pointer;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                    <div>
                        <i class="ti ${t.icon}" style="font-size:2rem;color:var(--color-primary);margin-bottom:.75rem;"></i>
                        <h3>${t.name}</h3>
                    </div>
                </div>
                <p style="font-size:.85rem;color:var(--color-text-secondary);margin:.75rem 0;line-height:1.6;">${t.teoria}</p>
                <div style="display:flex;gap:.5rem;margin-top:1rem;">
                    <button class="btn btn-primary" style="flex:1;" onclick="startExercise('${t.id}')">Practicar</button>
                    <button class="btn btn-outline" onclick="openGlossary('${t.id}')" title="Ver materia"><i class="ti ti-info-circle"></i></button>
                </div>
            </div>
        `).join('')}
        </div>`;
}

function renderMissions(main) {
    const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
    main.innerHTML = `
        <h2 style="margin-bottom:.5rem;">Misiones de Resistencia</h2>
        <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Cada misión tiene reglas distintas. Perder HP es parte del juego. ¡Sin rendirse!</p>
        <div style="display:flex;flex-direction:column;gap:1rem;">
        ${MISSIONS.map(m => {
            const done = saved[m.id];
            return `<div class="card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
                <div>
                    <h3 style="margin-bottom:.25rem;">${m.name}</h3>
                    <p style="font-size:.85rem;color:var(--color-text-secondary);">${m.desc}</p>
                    <span style="font-size:.75rem;color:var(--color-warning);">+${m.xpReward} XP</span>
                    ${done ? `<span style="margin-left:1rem;color:var(--color-success);font-size:.75rem;">✓ Completada — ${done.score}% de éxito</span>` : ''}
                </div>
                <button class="btn ${done ? 'btn-outline' : 'btn-primary'}" onclick="startMission('${m.id}')">
                    ${done ? 'Repetir' : 'Iniciar'}
                </button>
            </div>`;
        }).join('')}
        </div>`;
}

function renderExams(main) {
    const exams = MISSIONS.filter(m => m.isExam);
    const regular = MISSIONS.filter(m => !m.isExam);
    main.innerHTML = `
        <h2 style="margin-bottom:.5rem;">Pruebas y Exámenes</h2>
        <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Simulaciones del parcial del TEC. Formato idéntico al examen real.</p>
        <div style="display:flex;flex-direction:column;gap:1rem;">
        ${exams.map(m => `
            <div class="card" style="border-left:4px solid var(--color-warning);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <h3>${m.name}</h3>
                        <p style="font-size:.85rem;color:var(--color-text-secondary);margin:.25rem 0;">${m.desc}</p>
                        <span style="font-size:.75rem;color:var(--color-primary);">${m.count} preguntas &nbsp;|&nbsp; +${m.xpReward} XP</span>
                    </div>
                    <button class="btn btn-primary" onclick="startMission('${m.id}')">Iniciar Prueba</button>
                </div>
            </div>`).join('')}
        </div>`;
}

async function renderAdmin(main) {
    main.innerHTML = `
        <h2 style="margin-bottom:.5rem;">Banco de Ejercicios</h2>
        <div style="display:flex;gap:1rem;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;">
            <select id="admin-filter" class="btn btn-outline" onchange="loadAdminList()" style="background:var(--color-bg);">
                <option value="">Todos los temas</option>
                ${TOPICS.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
            <button class="btn btn-primary" onclick="showAddExercise()"><i class="ti ti-plus"></i> Agregar Ejercicio</button>
            <span id="admin-count" style="color:var(--color-text-secondary);font-size:.85rem;"></span>
        </div>
        <div id="admin-list"></div>
        <div id="add-exercise-form" class="hidden card" style="margin-top:1.5rem;">
            <h3>Agregar Nuevo Ejercicio</h3>
            <div style="display:flex;flex-direction:column;gap:.75rem;margin-top:1rem;">
                <select id="new-topic" class="btn btn-outline" style="background:var(--color-bg);">${TOPICS.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select>
                <input id="new-question" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Enunciado del ejercicio">
                <input id="new-latex" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Fórmula LaTeX (sin $)">
                <input id="new-correct" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Respuesta CORRECTA">
                <input id="new-d1" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Distractor 1">
                <input id="new-d2" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Distractor 2">
                <input id="new-d3" class="btn btn-outline" style="background:var(--color-bg);text-align:left;" placeholder="Distractor 3">
                <textarea id="new-theory" class="btn btn-outline" style="background:var(--color-bg);text-align:left;height:80px;" placeholder="Teoría de respaldo (opcional)"></textarea>
                <button class="btn btn-primary" onclick="submitNewExercise()">Guardar Ejercicio</button>
            </div>
        </div>`;
    loadAdminList();
}

function showAddExercise() {
    document.getElementById('add-exercise-form').classList.toggle('hidden');
}

async function loadAdminList() {
    const topic = document.getElementById('admin-filter')?.value || '';
    const url = topic ? `/api/admin/exercises?topic=${topic}` : '/api/admin/exercises';
    const resp = await fetch(url, {headers:{Authorization:`Bearer ${state.token}`}});
    const list = await resp.json();
    document.getElementById('admin-count').textContent = `${list.length} ejercicio(s)`;
    document.getElementById('admin-list').innerHTML = list.map(ex => `
        <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;margin-bottom:.5rem;gap:1rem;">
            <div style="flex:1;">
                <span style="font-size:.7rem;background:var(--color-primary);color:#fff;padding:.1rem .4rem;border-radius:4px;margin-right:.5rem;">${ex.topic_id}</span>
                <span style="font-size:.9rem;">${ex.question?.substring(0,80)}${ex.question?.length>80?'...':''}</span>
            </div>
            <button class="btn btn-outline" style="padding:.25rem .5rem;font-size:.75rem;color:var(--color-error);" onclick="deleteExercise(${ex.id})"><i class="ti ti-trash"></i></button>
        </div>`).join('') || '<p style="color:var(--color-text-muted);">No hay ejercicios para este tema.</p>';
}

async function submitNewExercise() {
    const correct = document.getElementById('new-correct').value;
    const body = {
        topic_id: document.getElementById('new-topic').value,
        question: document.getElementById('new-question').value,
        latex: document.getElementById('new-latex').value,
        options: [correct, document.getElementById('new-d1').value, document.getElementById('new-d2').value, document.getElementById('new-d3').value],
        steps: [{math: document.getElementById('new-latex').value, expl: 'Resultado correcto.'}],
        theory: document.getElementById('new-theory').value
    };
    await fetch('/api/admin/exercises', {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${state.token}`}, body:JSON.stringify(body)});
    document.getElementById('add-exercise-form').classList.add('hidden');
    loadAdminList();
}

async function deleteExercise(id) {
    if (!confirm('¿Eliminar este ejercicio?')) return;
    await fetch(`/api/admin/exercises/${id}`, {method:'DELETE', headers:{Authorization:`Bearer ${state.token}`}});
    loadAdminList();
}

let missionState = null;
async function startMission(missionId) {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission) return;
    missionState = { mission, current: 0, correct: 0, hp: 100, exercises: [] };
    showView('mission-run');
}

async function renderMissionRun(main) {
    const m = missionState.mission;
    const topicId = m.topics[Math.floor(Math.random() * m.topics.length)];
    main.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h2>${m.name}</h2>
            <span style="color:var(--color-text-secondary);">${missionState.current}/${m.count} completados</span>
        </div>
        <div style="background:var(--color-surface-hover);border-radius:8px;height:8px;margin-bottom:1.5rem;">
            <div style="height:100%;background:var(--color-primary);border-radius:8px;width:${(missionState.current/m.count)*100}%;transition:width .3s;"></div>
        </div>
        <div id="mission-hp-bar" style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;margin-bottom:.25rem;"><span>HP del Combate</span><span id="mission-hp-num">${missionState.hp}/100</span></div>
            <div style="background:var(--color-surface-hover);border-radius:6px;height:12px;">
                <div id="mission-hp-fill" style="height:100%;background:linear-gradient(90deg,#ef4444,#10b981);border-radius:6px;width:${missionState.hp}%;transition:width .3s;"></div>
            </div>
        </div>
        <div class="card" id="mission-ex-card">
            <div id="mission-loading"><p style="color:var(--color-text-muted);">Cargando ejercicio...</p></div>
            <div id="mission-content" class="hidden">
                <p id="mission-text" style="font-size:1.1rem;margin-bottom:1.5rem;"></p>
                <div id="mission-math" style="background:#000;padding:1.5rem;border-radius:8px;text-align:center;margin-bottom:1.5rem;"></div>
                <div id="mission-choices" class="choice-grid"></div>
            </div>
        </div>
        <div id="mission-action" class="hidden" style="margin-top:1rem;">
            <div id="mission-feedback" style="margin-bottom:1rem;"></div>
            <button class="btn btn-primary" onclick="missionNext()">Siguiente</button>
        </div>`;
    await loadMissionExercise(topicId);
}

async function loadMissionExercise(topicId) {
    try {
        const resp = await fetch('/api/ai/generate-exercise', {
            method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${state.token}`},
            body: JSON.stringify({topic: topicId, difficulty: 'basico'})
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        state.currentExercise = data;
        document.getElementById('mission-loading').classList.add('hidden');
        document.getElementById('mission-content').classList.remove('hidden');
        document.getElementById('mission-text').textContent = data.pregunta;
        if (data.latex) katex.render(data.latex, document.getElementById('mission-math'), {displayMode:true, throwOnError:false});
        const area = document.getElementById('mission-choices');
        area.innerHTML = '';
        [...data.opciones].sort(()=>Math.random()-.5).forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = c;
            btn.onclick = () => checkMissionChoice(c, btn, missionState.mission.hpPenalty);
            area.appendChild(btn);
        });
    } catch(e) {
        document.getElementById('mission-loading').innerHTML = `<p style="color:var(--color-error);">Error al cargar ejercicio: ${e.message}</p>`;
    }
}

function checkMissionChoice(choice, btn, penalty) {
    const isCorrect = choice === state.currentExercise.opciones[0];
    document.querySelectorAll('#mission-choices .choice-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === state.currentExercise.opciones[0]) b.classList.add('correct');
    });
    if (isCorrect) { btn.classList.add('correct'); missionState.correct++; }
    else { btn.classList.add('wrong'); missionState.hp = Math.max(0, missionState.hp - penalty); }
    document.getElementById('mission-hp-fill').style.width = missionState.hp + '%';
    document.getElementById('mission-hp-num').textContent = missionState.hp + '/100';
    const fb = document.getElementById('mission-feedback');
    fb.innerHTML = isCorrect
        ? `<p style="color:var(--color-success);">✅ ¡Correcto! +XP</p>`
        : `<p style="color:var(--color-error);">❌ Incorrecto. HP -${penalty}</p>`;
    if (state.currentExercise.pasos) {
        fb.innerHTML += state.currentExercise.pasos.map(p=>`<p style="font-size:.85rem;margin-top:.25rem;"><em>${p.expl}</em></p>`).join('');
    }
    document.getElementById('mission-action').classList.remove('hidden');
}

function missionNext() {
    missionState.current++;
    if (missionState.hp <= 0) { endMission('Sin HP'); return; }
    if (missionState.current >= missionState.mission.count) { endMission('Completada'); return; }
    const topicId = missionState.mission.topics[Math.floor(Math.random() * missionState.mission.topics.length)];
    renderMissionRun(document.getElementById('main-content'));
}

function endMission(reason) {
    const m = missionState.mission;
    const score = Math.round((missionState.correct / m.count) * 100);
    const xpEarned = reason === 'Completada' ? m.xpReward : Math.round(m.xpReward * score / 100);
    state.xp += xpEarned;
    const saved = JSON.parse(localStorage.getItem('mm_missions') || '{}');
    saved[m.id] = { score, xpEarned };
    localStorage.setItem('mm_missions', JSON.stringify(saved));
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="card" style="text-align:center;padding:3rem;">
            <h2 style="margin-bottom:1rem;">${reason === 'Completada' ? '🏆 Misión Completada' : '💀 Misión Fallida'}</h2>
            <p style="font-size:3rem;font-weight:bold;color:${score>=70?'var(--color-success)':'var(--color-error)'}">${score}%</p>
            <p style="margin:1rem 0;">${missionState.correct}/${m.count} respuestas correctas</p>
            <p style="color:var(--color-warning);">+${xpEarned} XP ganados</p>
            <p style="color:var(--color-text-secondary);margin-top:.5rem;">HP restante: ${missionState.hp}/100</p>
            <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;">
                <button class="btn btn-primary" onclick="startMission('${m.id}')">Repetir</button>
                <button class="btn btn-outline" onclick="showView('missions')">Ver Misiones</button>
            </div>
        </div>`;
    updateUI();
}

async function startExercise(topicId) { state.currentTopic = TOPICS.find(t => t.id === topicId); showView('exercise'); }

async function renderExercise(main) {
    main.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>${state.currentTopic.name}</h2>
                <div class="btn btn-outline btn-sm" onclick="toggleWhiteboard()"><i class="ti ti-pencil"></i> Usar Pizarra</div>
            </div>
            <div class="card" id="ex-card">
                <div id="ex-loading" class="skeleton-text">
                    <p>Conectando con el Sector de Operaciones...</p>
                    <div style="height: 100px; background: var(--color-surface-hover); margin: 1rem 0; border-radius: 8px;"></div>
                </div>
                <div id="ex-content" class="hidden">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <span class="badge" style="background: var(--color-primary); color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: bold;">MISIÓN ACTIVA</span>
                        <button class="btn btn-outline btn-sm" onclick="showTheory()" id="theory-btn"><i class="ti ti-info-circle"></i> Repasar Teoría</button>
                    </div>
                    <p id="ex-text" style="font-size: 1.1rem; margin-bottom: 1.5rem;"></p>
                    <div id="ex-math" style="background: #000; padding: 1.5rem; border-radius: var(--radius-md); text-align: center; margin-bottom: 1.5rem;"></div>
                    <div id="choice-area" class="choice-grid"></div>
                </div>
            </div>
            <div id="resolution-area" class="hidden"><h3 style="margin-bottom: 1rem;">Resolución Paso a Paso</h3><div id="steps-container" class="step-container"></div></div>
            <div id="action-bar" class="hidden" style="margin-top: 1rem;"><button class="btn btn-primary" onclick="newExercise()">Siguiente Misión</button></div>
        </div>
    `;
    await generateNewExercise();
}

async function generateNewExercise() {
    try {
        const resp = await fetch(`${DOMAIN}/api/ai/generate-exercise`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
            body: JSON.stringify({ topic: state.currentTopic.id, difficulty: state.currentDiff })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        
        state.currentExercise = data;
        document.getElementById('ex-loading').classList.add('hidden');
        document.getElementById('ex-content').classList.remove('hidden');
        document.getElementById('ex-text').textContent = data.pregunta;
        katex.render(data.latex, document.getElementById('ex-math'), { displayMode: true });
        
        const area = document.getElementById('choice-area');
        area.innerHTML = '';
        [...data.opciones].sort(() => Math.random() - 0.5).forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = c;
            btn.onclick = () => checkChoice(c, btn);
            area.appendChild(btn);
        });
    } catch (e) {
        console.error(e);
        document.getElementById('ex-loading').innerHTML = `<p style="color:var(--color-error)">⚠️ Error de conexión con el sector de IA. Revisa tu API Key en Configuración.</p>`;
    }
}

function checkChoice(choice, btn) {
    const isCorrect = choice === state.currentExercise.opciones[0];
    document.querySelectorAll('.choice-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === state.currentExercise.opciones[0]) b.classList.add('correct');
    });
    if (isCorrect) { btn.classList.add('correct'); state.xp += 100; state.streak++; state.correctCount++; state.hp = Math.min(100, state.hp + 5); }
    else { btn.classList.add('wrong'); state.streak = 0; state.hp = Math.max(0, state.hp - 20); }
    showResolution();
    updateUI();
    document.getElementById('action-bar').classList.remove('hidden');
    saveProgress(isCorrect);
    if (state.correctCount % 10 === 0 && isCorrect) setTimeout(triggerGame, 1000);
}

function showResolution() {
    document.getElementById('resolution-area').classList.remove('hidden');
    const container = document.getElementById('steps-container');
    container.innerHTML = state.currentExercise.pasos.map((p, i) => `
        <div class="step-item">
            <div class="step-math" id="step-math-${i}"></div>
            <div class="step-explanation">${highlightTerms(p.expl)}</div>
        </div>
    `).join('');
    state.currentExercise.pasos.forEach((p, i) => katex.render(p.math, document.getElementById(`step-math-${i}`)));
}

function showTheory() {
    if (!state.currentExercise || !state.currentExercise.theory) {
        alert('No hay teoría específica para este ejercicio.');
        return;
    }
    document.getElementById('glossary-title').textContent = 'Conceptos Necesarios';
    document.getElementById('glossary-def').innerHTML = state.currentExercise.theory.replace(/\n/g, '<br>');
    document.getElementById('glossary-example').textContent = 'Recuerda aplicar las mañas mencionadas en los pasos.';
    document.getElementById('glossary-mana').textContent = '¡Tú puedes, Jorge!';
    document.getElementById('glossary-modal').classList.remove('hidden');
}

async function saveProgress(correct) {
    await fetch(`${DOMAIN}/api/reporte/registrar-ejercicio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
        body: JSON.stringify({ topic_id: state.currentTopic.id, correcto: correct, tiempo_segundos: 30, hp_antes: state.hp, hp_despues: state.hp, dificultad: state.currentDiff })
    });
}

function updateUI() {
    if (!state.user) return;
    document.getElementById('user-xp').innerHTML = `<i class="ti ti-star"></i> ${state.xp} XP`;
    const hp = Math.max(0, Math.min(100, state.hp));
    document.getElementById('hp-fill').style.width = `${hp}%`;
    document.getElementById('hp-fill').style.background = hp > 60 ? 'var(--color-success)' : hp > 30 ? 'var(--color-warning)' : 'var(--color-error)';
    document.getElementById('hp-text').textContent = `${hp}/100`;
    document.getElementById('break-progress').style.width = `${(state.correctCount % 10) * 10}%`;
    const faceEl = document.getElementById('doom-face');
    const stateObj = DOOM_STATES.find(s => hp >= s.hp[0] && hp <= s.hp[1]) || DOOM_STATES[DOOM_STATES.length-1];
    faceEl.style.backgroundImage = `url('img/doom/${stateObj.img}')`;
    // Animación: pulso cuando HP bajo
    if (hp < 30) {
        faceEl.style.animation = 'pulse 1s infinite';
    } else {
        faceEl.style.animation = '';
    }
}

function newExercise() { document.getElementById('resolution-area').classList.add('hidden'); document.getElementById('action-bar').classList.add('hidden'); generateNewExercise(); }

function triggerGame() { document.getElementById('game-modal').classList.remove('hidden'); startSnake(); }
function closeGame() { document.getElementById('game-modal').classList.add('hidden'); }

function startSnake() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400; canvas.height = 300;
    let snake = [{x: 10, y: 10}], food = {x: 5, y: 5}, dx = 1, dy = 0, size = 20;
    function draw() {
        ctx.fillStyle = 'black'; ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = 'lime'; snake.forEach(p => ctx.fillRect(p.x * size, p.y * size, size-1, size-1));
        ctx.fillStyle = 'red'; ctx.fillRect(food.x * size, food.y * size, size-1, size-1);
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) food = {x: Math.floor(Math.random() * (canvas.width/size)), y: Math.floor(Math.random() * (canvas.height/size))};
        else snake.pop();
        if (head.x < 0 || head.x >= canvas.width/size || head.y < 0 || head.y >= canvas.height/size) snake = [{x: 10, y: 10}];
    }
    document.onkeydown = e => {
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
    };
    setInterval(draw, 100);
}

async function renderLeaderboard(main) {
    main.innerHTML = `
        <h2 style="margin-bottom:.5rem;">Tabla de Clasificación</h2>
        <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">Los mejores estudiantes de MathMaty TEC.</p>
        <div class="card" id="lb-card"><p style="color:var(--color-text-muted);">Cargando...</p></div>`;
    try {
        const resp = await fetch(`${DOMAIN}/api/leaderboard`);
        const data = await resp.json();
        document.getElementById('lb-card').innerHTML = data.length === 0
            ? '<p>Aún no hay jugadores. ¡Sé el primero!</p>'
            : `<table style="width:100%;border-collapse:collapse;">
                <thead><tr style="border-bottom:2px solid var(--color-border);">
                    <th style="text-align:left;padding:.5rem;color:var(--color-text-muted);font-size:.8rem;">#</th>
                    <th style="text-align:left;padding:.5rem;color:var(--color-text-muted);font-size:.8rem;">Jugador</th>
                    <th style="text-align:right;padding:.5rem;color:var(--color-text-muted);font-size:.8rem;">XP</th>
                    <th style="text-align:right;padding:.5rem;color:var(--color-text-muted);font-size:.8rem;">Éxito</th>
                    <th style="text-align:right;padding:.5rem;color:var(--color-text-muted);font-size:.8rem;">Nivel</th>
                </tr></thead>
                <tbody>${data.map((u,i) => `<tr style="border-bottom:1px solid var(--color-border);${state.user && u.id===state.user.id ? 'background:rgba(99,102,241,.1);font-weight:bold;' : ''}">
                    <td style="padding:.6rem .5rem;">${i===0?'🥇':i===1?'🥈':i===2?'🥉':u.posicion}</td>
                    <td style="padding:.6rem .5rem;">${u.nombre} ${state.user && u.id===state.user.id ? '<span style="color:var(--color-primary);font-size:.7rem;">(Tú)</span>' : ''}</td>
                    <td style="text-align:right;padding:.6rem .5rem;color:var(--color-warning);">${u.xp || 0}</td>
                    <td style="text-align:right;padding:.6rem .5rem;">${u.tasa_exito || 0}%</td>
                    <td style="text-align:right;padding:.6rem .5rem;">Lv ${u.nivel || 1}</td>
                </tr>`).join('')}</tbody>
               </table>`;
    } catch(e) {
        document.getElementById('lb-card').innerHTML = `<p style="color:var(--color-error);">Error cargando clasificación: ${e.message}</p>`;
    }
}

async function renderReports(main) {
    const TOPIC_NAMES = { factorizacion:'Factorización', 'fracciones-alg':'Fracciones Algebraicas', ecuaciones:'Ecuaciones', inecuaciones:'Inecuaciones', 'exp-log':'Exponenciales y Logaritmos', trigonometria:'Trigonometría', calculo:'Cálculo' };
    main.innerHTML = `
        <h2 style="margin-bottom:.5rem;">Mi Reporte de Progreso</h2>
        <div id="report-stats" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem;margin-bottom:1.5rem;"><p>Cargando...</p></div>
        <div id="report-topics"></div>
        <div id="report-weak"></div>`;
    try {
        const resp = await fetch(`${DOMAIN}/api/reporte/mi-progreso`, { headers: { 'Authorization': `Bearer ${state.token}` } });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        const st = data.estadisticas_generales;
        const userLevel = Math.max(1, Math.floor((state.xp || 0) / 1000) + 1);
        const rank = st.total_ejercicios == 0 ? 'Novato' : st.tasa_exito_global >= 80 ? '🏆 Experto' : st.tasa_exito_global >= 60 ? '🎧 Intermedio' : '💡 En Entrenamiento';
        document.getElementById('report-stats').innerHTML = [
            ['Ejercicios Totales', st.total_ejercicios || 0, 'var(--color-primary)'],
            ['Respuestas Correctas', st.correctos || 0, 'var(--color-success)'],
            ['Tasa de Éxito', (st.tasa_exito_global || 0) + '%', 'var(--color-warning)'],
            ['Rango', rank, 'var(--color-error)'],
            ['Nivel', 'Lv ' + userLevel, 'var(--color-primary)'],
            ['XP Total', state.xp || 0, 'var(--color-warning)']
        ].map(([lbl,val,col]) => `<div class="card" style="text-align:center;padding:1rem;">
            <p style="font-size:.75rem;color:var(--color-text-muted);margin-bottom:.25rem;">${lbl}</p>
            <p style="font-size:1.5rem;font-weight:bold;color:${col};">${val}</p>
        </div>`).join('');
        if (data.progreso_por_tema && data.progreso_por_tema.length > 0) {
            document.getElementById('report-topics').innerHTML = `
                <h3 style="margin:1.5rem 0 1rem;">Progreso por Tema</h3>
                <div style="display:flex;flex-direction:column;gap:.75rem;">
                ${data.progreso_por_tema.map(t => `
                    <div class="card" style="padding:.75rem 1rem;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
                            <span>${TOPIC_NAMES[t.topic_id] || t.topic_id}</span>
                            <span style="color:${t.tasa>=70?'var(--color-success)':t.tasa>=50?'var(--color-warning)':'var(--color-error)'}">${t.tasa || 0}%</span>
                        </div>
                        <div style="background:var(--color-surface-hover);border-radius:4px;height:6px;">
                            <div style="height:100%;border-radius:4px;width:${t.tasa||0}%;background:${t.tasa>=70?'var(--color-success)':t.tasa>=50?'var(--color-warning)':'var(--color-error)'};"></div>
                        </div>
                        <p style="font-size:.75rem;color:var(--color-text-muted);margin-top:.25rem;">${t.correctos} correctas / ${t.fallos} fallos de ${t.total} intentos</p>
                    </div>`).join('')}
                </div>`;
        } else {
            document.getElementById('report-topics').innerHTML = `<div class="card" style="text-align:center;padding:2rem;"><p>¡Aún no has practicado ningún tema!</p><button class="btn btn-primary" style="margin-top:1rem;" onclick="showView('topics')">Ir a Temas</button></div>`;
        }
        if (data.areas_debil && data.areas_debil.length > 0) {
            document.getElementById('report-weak').innerHTML = `
                <h3 style="margin:1.5rem 0 1rem;🔴 Áreas a Reforzar</h3>
                <div style="display:flex;flex-direction:column;gap:.5rem;">
                ${data.areas_debil.map(t => `
                    <div class="card" style="display:flex;justify-content:space-between;align-items:center;border-left:4px solid var(--color-error);">
                        <div>
                            <strong>${TOPIC_NAMES[t.topic_id] || t.topic_id}</strong>
                            <p style="font-size:.8rem;color:var(--color-text-muted);margin:.25rem 0;">${t.fallos} fallos — Tasa: ${t.tasa||0}%</p>
                            <p style="font-size:.8rem;color:var(--color-text-secondary);">${TOPICS.find(x=>x.id===t.topic_id)?.teoria?.substring(0,100)||''}...</p>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="startExercise('${t.topic_id}')">Practicar</button>
                    </div>`).join('')}
                </div>`;
        }
    } catch(e) {
        document.getElementById('report-stats').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
    }
}

async function renderConfig(main) {
    main.innerHTML = `
        <h2 style="margin-bottom:1.5rem;">Configuración de IA</h2>
        <div class="card">
            <h3>Proveedores de LLM</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem;">El sistema usará la activa con mayor prioridad.</p>
            <div id="api-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;"></div>
            <hr style="margin-bottom: 1.5rem;">
            <form onsubmit="saveAPI(event)">
                <select id="api-provider" class="btn btn-outline" style="width:100%;margin-bottom:1rem;">
                    <option value="anthropic">Anthropic</option>
                    <option value="openai">OpenAI</option>
                    <option value="grok">Grok</option>
                </select>
                <input type="password" id="api-key" class="btn btn-outline" style="width:100%;margin-bottom:1rem;" placeholder="API Key">
                <button type="submit" class="btn btn-primary" style="width: 100%;">Guardar Configuración</button>
            </form>
        </div>`;
    loadAPIList();
}

async function loadAPIList() {
    const resp = await fetch(`${DOMAIN}/api/config/apis`, { headers: { 'Authorization': `Bearer ${state.token}` } });
    const apis = await resp.json();
    document.getElementById('api-list').innerHTML = apis.map(api => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--color-surface-hover);">
            <span>${api.proveedor.toUpperCase()}</span>
            <button class="btn btn-outline btn-sm" onclick="deleteAPI(${api.id})"><i class="ti ti-trash"></i></button>
        </div>
    `).join('') || '<p style="color: var(--color-text-muted);">No hay APIs configuradas.</p>';
}

async function deleteAPI(apiId) {
    if (!confirm('¿Seguro que quieres eliminar esta configuración?')) return;
    await fetch(`${DOMAIN}/api/config/apis/${apiId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${state.token}` }
    });
    loadAPIList();
}

async function testAPI(apiId) {
    alert('Probando conexión... (Simulado por ahora)');
}

async function saveAPI(e) {
    e.preventDefault();
    await fetch(`${DOMAIN}/api/config/apis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
        body: JSON.stringify({ proveedor: document.getElementById('api-provider').value, api_key: document.getElementById('api-key').value, prioridad: 0 })
    });
    renderConfig(document.getElementById('main-content'));
}

async function renderParentDashboard(main) {
    main.innerHTML = `
        <h2 style="margin-bottom:1.5rem;">Panel Parental</h2>
        <h3 style="margin-bottom:1rem;">Mis Hijos Vinculados</h3>
        <div id="children-list" style="margin-bottom:2rem;"><p>Cargando...</p></div>
        <div class="card">
            <h3>Vincular Nuevo Hijo</h3>
            <p style="font-size:.85rem;color:var(--color-text-muted);margin:.5rem 0 1rem;">Ingresa el nombre de usuario del estudiante para vincularlo.</p>
            <div style="display:flex;gap:.5rem;">
                <input type="text" id="child-username" class="btn btn-outline" style="flex:1;background:var(--color-bg);text-align:left;" placeholder="usuario del estudiante">
                <button class="btn btn-primary" onclick="linkChild()">Vincular</button>
            </div>
        </div>`;
    loadChildren();
}

async function loadChildren() {
    try {
        const resp = await fetch(`${DOMAIN}/api/auth/children`, { headers: { 'Authorization': `Bearer ${state.token}` } });
        const children = await resp.json();
        const el = document.getElementById('children-list');
        if (!children.length) {
            el.innerHTML = `<div class="card" style="text-align:center;padding:2rem;"><p style="color:var(--color-text-muted);">No hay hijos vinculados aún.</p></div>`;
        } else {
            el.innerHTML = children.map(c => `
                <div class="card" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">
                    <div>
                        <strong>${c.nombre}</strong>
                        <p style="font-size:.8rem;color:var(--color-text-muted);">@${c.username} — Nivel ${c.nivel||1} — ${c.xp||0} XP</p>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="showChildReport(${c.id})">Ver Reporte</button>
                </div>`).join('');
        }
    } catch(e) {
        document.getElementById('children-list').innerHTML = `<p style="color:var(--color-error);">Error: ${e.message}</p>`;
    }
}

async function linkChild() {
    await fetch(`${DOMAIN}/api/auth/parent-child`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
        body: JSON.stringify({ child_username: document.getElementById('child-username').value })
    });
    renderParentDashboard(document.getElementById('main-content'));
}

async function showChildReport(childId) {
    const main = document.getElementById('main-content');
    main.innerHTML = `<h2>Reporte</h2><div id="report-container"></div>`;
    const resp = await fetch(`${DOMAIN}/api/reporte/hijo/${childId}`, { headers: { 'Authorization': `Bearer ${state.token}` } });
    const data = await resp.json();
    renderReportsContent(data, document.getElementById('report-container'));
}

function renderReportsContent(data, container) {
    // Mantener por compatibilidad
    renderReports(container.closest('#main-content') || document.getElementById('main-content'));
}

// Whiteboard Logic
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function toggleWhiteboard() {
    const modal = document.getElementById('whiteboard-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        initWhiteboard();
    }
}

function initWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrawing({ offsetX: touch.clientX, offsetY: touch.clientY - 80 });
    });
    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        draw({ offsetX: touch.clientX, offsetY: touch.clientY - 80 });
        e.preventDefault();
    }, { passive: false });
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() { isDrawing = false; }
function clearWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    const link = document.createElement('a');
    link.download = `pizarra_${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Additional Gamification
function getLevelProgress() {
    const levelXP = state.user.nivel * 1000;
    const currentXP = state.xp % levelXP;
    return (currentXP / levelXP) * 100;
}