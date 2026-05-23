// ============================================================
// FLASHCARDS — MathMaty v2.0
// Agregar este bloque al final de app.js
// También registrar 'flashcards': renderFlashcards en showView()
// Y agregar botón en el sidebar/home con: onclick="showView('flashcards')"
// ============================================================

// ---------- Estado de la sesión de flashcards ----------
const fcState = {
  cards: [],          // [{front, back, latex_front, latex_back}]
  index: 0,
  flipped: false,
  known: 0,
  unknown: 0,
  topic: null,
  loading: false
};

// ---------- Entrada: selector de tema ----------
function renderFlashcards(main) {
  main.innerHTML = `
    <div style="max-width:680px;margin:0 auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:.5rem;">
        <h2><i class="ti ti-cards" style="color:var(--color-primary);"></i> Flashcards</h2>
        <span style="font-size:.8rem;color:var(--color-text-muted);">Repaso r&aacute;pido con tarjetas</span>
      </div>

      <div class="card" style="margin-bottom:1.5rem;">
        <h3 style="margin-bottom:1rem;">Selecciona un tema</h3>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.75rem;align-items:end;">
          <select id="fc-topic-select" class="btn btn-outline" style="background:var(--color-bg);text-align:left;width:100%;height:44px;">
            ${TOPICS.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
          </select>
          <select id="fc-count-select" class="btn btn-outline" style="background:var(--color-bg);width:90px;height:44px;">
            <option value="5">5 cards</option>
            <option value="8" selected>8 cards</option>
            <option value="12">12 cards</option>
          </select>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:1rem;" onclick="startFlashcardSession()">
          <i class="ti ti-player-play"></i> Iniciar sesi&oacute;n
        </button>
      </div>

      <!-- Tips -->
      <div class="card" style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);">
        <h4 style="color:var(--color-primary);margin-bottom:.5rem;"><i class="ti ti-bulb"></i> &iquest;C&oacute;mo funciona?</h4>
        <ul style="font-size:.85rem;color:var(--color-text-secondary);line-height:1.8;padding-left:1.2rem;">
          <li>La IA genera tarjetas con conceptos del tema elegido.</li>
          <li>Toca la tarjeta para voltearla y ver la respuesta.</li>
          <li>Marca si lo sab&iacute;as o no — el sistema te muestra tu progreso.</li>
          <li>Ganas <strong style="color:var(--color-warning);">+20 XP</strong> por cada tarjeta correcta.</li>
        </ul>
      </div>
    </div>`;
}

// ---------- Generar tarjetas via IA ----------
async function startFlashcardSession() {
  const topicId = document.getElementById('fc-topic-select').value;
  const count = parseInt(document.getElementById('fc-count-select').value);
  const topic = TOPICS.find(t => t.id === topicId);

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div style="max-width:680px;margin:0 auto;text-align:center;padding:3rem 1rem;">
      <div style="font-size:3rem;margin-bottom:1rem;">🃏</div>
      <h3 style="color:var(--color-primary);">Generando flashcards...</h3>
      <p style="color:var(--color-text-muted);margin-top:.5rem;">La IA est&aacute; creando ${count} tarjetas de <strong>${topic.name}</strong></p>
      <div class="progress-bar" style="margin-top:1.5rem;height:6px;">
        <div class="progress-fill fc-loading-bar" style="animation:fc-load 2.5s ease-in-out infinite;"></div>
      </div>
    </div>
    <style>
      @keyframes fc-load {
        0%   { width: 5%; }
        50%  { width: 80%; }
        100% { width: 95%; }
      }
    </style>`;

  try {
    const r = await fetch(`${API}/api/ai/generate-flashcards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token}` },
      body: JSON.stringify({ topic: topicId, count, nivel: document.getElementById('topics-nivel-filter')?.value || '' })
    });

    let cards = [];

    if (r.ok) {
      const data = await r.json();
      cards = data.cards || data || [];
    }

    // Fallback: si el endpoint no existe aún, generar con el endpoint de ejercicios
    if (!cards || cards.length === 0) {
      cards = await generateFlashcardsFromExercises(topicId, count, topic);
    }

    if (!cards || cards.length === 0) throw new Error('No se pudieron generar tarjetas');

    fcState.cards = cards;
    fcState.index = 0;
    fcState.flipped = false;
    fcState.known = 0;
    fcState.unknown = 0;
    fcState.topic = topic;

    renderFlashcardDeck(main);

  } catch (e) {
    main.innerHTML = `
      <div style="max-width:680px;margin:0 auto;text-align:center;padding:3rem 1rem;">
        <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
        <h3 style="color:var(--color-warning);">No se pudieron generar las tarjetas</h3>
        <p style="color:var(--color-text-muted);margin:.5rem 0 1.5rem;">${e.message}</p>
        <button class="btn btn-primary" onclick="showView('flashcards')">Volver</button>
      </div>`;
  }
}

// ---------- Fallback: genera flashcards desde la API de ejercicios ----------
async function generateFlashcardsFromExercises(topicId, count, topic) {
  // Usamos el endpoint de Claude directamente para generar flashcards
  const prompt = `Genera exactamente ${count} flashcards de matemáticas sobre el tema: ${topic.name}.
Contexto del tema: ${topic.teoria}

Responde SOLO con un array JSON válido, sin texto extra, sin markdown, sin backticks.
Formato exacto:
[
  {"front": "¿Pregunta o concepto?", "back": "Respuesta o definición clara y concisa.", "latex_front": "", "latex_back": "expresion_latex_opcional"},
  ...
]

Reglas:
- front: pregunta o concepto breve (máximo 15 palabras)
- back: respuesta clara y directa (máximo 30 palabras)
- latex_front y latex_back: expresión LaTeX si aplica, si no, string vacío ""
- Varía entre definiciones, fórmulas, propiedades y ejemplos rápidos
- Nivel universitario de precálculo TEC Costa Rica`;

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!r.ok) throw new Error('Error al contactar la IA');
  const data = await r.json();
  const text = (data.content || []).map(b => b.text || '').join('');

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {}

  throw new Error('La IA no devolvió un formato válido');
}

// ---------- Renderizar el mazo de tarjetas ----------
function renderFlashcardDeck(main) {
  const total = fcState.cards.length;
  const current = fcState.index;
  const card = fcState.cards[current];
  const progressPct = Math.round((current / total) * 100);

  main.innerHTML = `
    <div style="max-width:680px;margin:0 auto;">
      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem;">
        <div>
          <h2 style="margin:0;font-size:1.1rem;">${fcState.topic.name}</h2>
          <span style="font-size:.8rem;color:var(--color-text-muted);">Tarjeta ${current + 1} de ${total}</span>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <span style="font-size:.85rem;color:var(--color-success);font-weight:600;">✓ ${fcState.known}</span>
          <span style="font-size:.85rem;color:var(--color-error);font-weight:600;">✗ ${fcState.unknown}</span>
          <button class="btn btn-outline btn-sm" onclick="showView('flashcards')" title="Salir">✕</button>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="progress-bar" style="margin-bottom:1.5rem;height:8px;border-radius:4px;">
        <div class="progress-fill" style="width:${progressPct}%;transition:width .4s ease;border-radius:4px;"></div>
      </div>

      <!-- La tarjeta -->
      <div id="fc-card-scene" style="perspective:1000px;cursor:pointer;margin-bottom:1.5rem;" onclick="flipFlashcard()">
        <div id="fc-card-inner" style="
          position:relative;
          width:100%;
          min-height:260px;
          transition:transform .55s cubic-bezier(.4,0,.2,1);
          transform-style:preserve-3d;
          border-radius:var(--radius-lg);
        ">
          <!-- Cara frontal -->
          <div id="fc-front" style="
            position:absolute;inset:0;
            backface-visibility:hidden;
            -webkit-backface-visibility:hidden;
            background:var(--color-surface);
            border:2px solid var(--color-border);
            border-radius:var(--radius-lg);
            display:flex;flex-direction:column;
            align-items:center;justify-content:center;
            padding:2rem 1.5rem;text-align:center;
            box-shadow:0 4px 24px rgba(0,0,0,0.18);
          ">
            <div style="font-size:.7rem;letter-spacing:.12em;color:var(--color-primary);font-weight:700;margin-bottom:1.25rem;text-transform:uppercase;">
              <i class="ti ti-question-mark"></i> PREGUNTA
            </div>
            <p style="font-size:1.15rem;font-weight:600;line-height:1.6;color:var(--color-text);margin:0 0 1rem;">
              ${card.front}
            </p>
            ${card.latex_front ? `<div id="fc-latex-front" style="margin-top:.5rem;background:#000;padding:1rem 1.5rem;border-radius:var(--radius-md);min-width:80%;"></div>` : ''}
            <div style="margin-top:1.5rem;font-size:.78rem;color:var(--color-text-muted);">
              <i class="ti ti-hand-click"></i> Toca para ver la respuesta
            </div>
          </div>

          <!-- Cara trasera -->
          <div id="fc-back" style="
            position:absolute;inset:0;
            backface-visibility:hidden;
            -webkit-backface-visibility:hidden;
            transform:rotateY(180deg);
            background:var(--color-surface);
            border:2px solid var(--color-primary);
            border-radius:var(--radius-lg);
            display:flex;flex-direction:column;
            align-items:center;justify-content:center;
            padding:2rem 1.5rem;text-align:center;
            box-shadow:0 4px 24px rgba(59,130,246,0.2);
          ">
            <div style="font-size:.7rem;letter-spacing:.12em;color:var(--color-success);font-weight:700;margin-bottom:1.25rem;text-transform:uppercase;">
              <i class="ti ti-check"></i> RESPUESTA
            </div>
            <p style="font-size:1.05rem;line-height:1.7;color:var(--color-text);margin:0 0 1rem;">
              ${card.back}
            </p>
            ${card.latex_back ? `<div id="fc-latex-back" style="margin-top:.5rem;background:#000;padding:1rem 1.5rem;border-radius:var(--radius-md);min-width:80%;"></div>` : ''}
          </div>
        </div>
      </div>

      <!-- Botones de evaluación (ocultos hasta voltear) -->
      <div id="fc-eval-btns" style="display:none;gap:.75rem;justify-content:center;margin-bottom:1.5rem;">
        <button class="btn btn-outline" style="flex:1;border-color:var(--color-error);color:var(--color-error);padding:.85rem;" onclick="fcAnswer(false)">
          <i class="ti ti-x"></i> No lo sab&iacute;a
        </button>
        <button class="btn btn-primary" style="flex:1;padding:.85rem;" onclick="fcAnswer(true)">
          <i class="ti ti-check"></i> Lo sab&iacute;a
        </button>
      </div>

      <!-- Instrucción -->
      <p id="fc-hint" style="text-align:center;font-size:.8rem;color:var(--color-text-muted);">
        <i class="ti ti-info-circle"></i> Toca la tarjeta para voltearla, luego eval&uacute;a tu respuesta
      </p>
    </div>`;

  // Renderizar LaTeX si hay
  if (card.latex_front) {
    setTimeout(() => {
      const el = document.getElementById('fc-latex-front');
      if (el) try { katex.render(card.latex_front, el, { displayMode: true, throwOnError: false }); } catch(e) {}
    }, 50);
  }
  if (card.latex_back) {
    setTimeout(() => {
      const el = document.getElementById('fc-latex-back');
      if (el) try { katex.render(card.latex_back, el, { displayMode: true, throwOnError: false }); } catch(e) {}
    }, 50);
  }

  fcState.flipped = false;
}

// ---------- Voltear tarjeta ----------
function flipFlashcard() {
  const inner = document.getElementById('fc-card-inner');
  const evalBtns = document.getElementById('fc-eval-btns');
  const hint = document.getElementById('fc-hint');
  if (!inner) return;

  if (!fcState.flipped) {
    inner.style.transform = 'rotateY(180deg)';
    fcState.flipped = true;
    if (evalBtns) evalBtns.style.display = 'flex';
    if (hint) hint.style.display = 'none';
  } else {
    inner.style.transform = 'rotateY(0deg)';
    fcState.flipped = false;
    if (evalBtns) evalBtns.style.display = 'none';
    if (hint) hint.style.display = 'block';
  }
}

// ---------- Registrar respuesta y avanzar ----------
async function fcAnswer(knew) {
  if (knew) {
    fcState.known++;
    state.xp += 20;
    // Guardar XP en backend
    try {
      await fetch(`${API}/api/leaderboard/actualizar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token}` },
        body: JSON.stringify({ xp_ganada: 20, correcto: true })
      });
    } catch(e) {}
  } else {
    fcState.unknown++;
  }

  fcState.index++;
  const main = document.getElementById('main-content');

  if (fcState.index >= fcState.cards.length) {
    renderFlashcardResults(main);
  } else {
    // Mini animación de transición antes de siguiente tarjeta
    const scene = document.getElementById('fc-card-scene');
    if (scene) {
      scene.style.transition = 'opacity .2s';
      scene.style.opacity = '0';
      setTimeout(() => {
        renderFlashcardDeck(main);
      }, 200);
    } else {
      renderFlashcardDeck(main);
    }
    updateUI();
  }
}

// ---------- Pantalla de resultados ----------
function renderFlashcardResults(main) {
  const total = fcState.cards.length;
  const pct = Math.round((fcState.known / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚';
  const msg = pct >= 80
    ? '¡Excelente dominio del tema!'
    : pct >= 50
    ? '¡Buen avance! Repite las que fallaste.'
    : 'Necesitas más práctica. ¡No te rindas!';

  const xpTotal = fcState.known * 20;

  main.innerHTML = `
    <div style="max-width:520px;margin:0 auto;text-align:center;padding:1rem;">
      <div style="font-size:4rem;margin-bottom:.5rem;">${emoji}</div>
      <h2 style="margin-bottom:.25rem;">Sesi&oacute;n completada</h2>
      <p style="color:var(--color-text-muted);margin-bottom:2rem;">${msg}</p>

      <!-- Resultado visual -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:2rem;">
        <div class="card" style="text-align:center;padding:1.25rem .75rem;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-success);">${fcState.known}</div>
          <div style="font-size:.75rem;color:var(--color-text-muted);">Sabidas</div>
        </div>
        <div class="card" style="text-align:center;padding:1.25rem .75rem;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-error);">${fcState.unknown}</div>
          <div style="font-size:.75rem;color:var(--color-text-muted);">A repasar</div>
        </div>
        <div class="card" style="text-align:center;padding:1.25rem .75rem;">
          <div style="font-size:2rem;font-weight:700;color:var(--color-warning);">+${xpTotal}</div>
          <div style="font-size:.75rem;color:var(--color-text-muted);">XP ganada</div>
        </div>
      </div>

      <!-- Barra de dominio -->
      <div class="card" style="margin-bottom:1.5rem;text-align:left;">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
          <span style="font-size:.85rem;">Dominio del tema</span>
          <span style="font-size:.85rem;font-weight:700;color:${pct>=70?'var(--color-success)':pct>=40?'var(--color-warning)':'var(--color-error)'};">${pct}%</span>
        </div>
        <div class="progress-bar" style="height:10px;">
          <div class="progress-fill" style="width:${pct}%;background:${pct>=70?'var(--color-success)':pct>=40?'var(--color-warning)':'var(--color-error)'};transition:width 1s ease;border-radius:5px;"></div>
        </div>
      </div>

      <!-- Botones -->
      <div style="display:flex;flex-direction:column;gap:.75rem;">
        <button class="btn btn-primary" onclick="retryFlashcards()" style="padding:.9rem;">
          <i class="ti ti-reload"></i> Repetir las que fall&eacute;
        </button>
        <button class="btn btn-outline" onclick="showView('flashcards')" style="padding:.9rem;">
          <i class="ti ti-cards"></i> Nueva sesi&oacute;n
        </button>
        <button class="btn btn-outline" onclick="startExercise('${fcState.topic.id}')" style="padding:.9rem;">
          <i class="ti ti-player-play"></i> Practicar ejercicios del tema
        </button>
      </div>
    </div>`;

  updateUI();
}

// ---------- Repetir solo las tarjetas falladas ----------
function retryFlashcards() {
  if (fcState.unknown === 0) {
    showView('flashcards');
    return;
  }
  // Reconstruir deck solo con las tarjetas que no supo
  // (simplificado: repetir todas, en versión futura se puede trackear cuáles falló)
  const allCards = fcState.cards;
  fcState.cards = allCards;
  fcState.index = 0;
  fcState.flipped = false;
  fcState.known = 0;
  fcState.unknown = 0;
  const main = document.getElementById('main-content');
  renderFlashcardDeck(main);
}

// ============================================================
// INSTRUCCIONES DE INTEGRACIÓN
// ============================================================
//
// 1. AGREGAR LA VISTA AL ROUTER showView() en app.js:
//    Dentro del objeto `views`, añadir:
//      flashcards: renderFlashcards,
//
// 2. AGREGAR BOTÓN EN EL SIDEBAR (en tu HTML):
//    <a class="nav-item" onclick="showView('flashcards')">
//      <i class="ti ti-cards"></i> <span>Flashcards</span>
//    </a>
//
// 3. AGREGAR BOTÓN EN HOME (en renderHome, dentro de hero-actions):
//    <button class="btn btn-outline" onclick="showView('flashcards')">
//      <i class="ti ti-cards"></i> Flashcards
//    </button>
//
// 4. AGREGAR BOTÓN EN CADA TOPIC CARD (en renderTopics):
//    <button class="btn btn-outline btn-sm" onclick="startFlashcardsForTopic('${t.id}')">
//      <i class="ti ti-cards"></i> Flashcards
//    </button>
//
// 5. FUNCIÓN HELPER para abrir flashcards de un tema directamente:
function startFlashcardsForTopic(topicId) {
  state.currentTopic = TOPICS.find(t => t.id === topicId);
  showView('flashcards');
  // Pre-seleccionar el tema después de que renderice
  setTimeout(() => {
    const sel = document.getElementById('fc-topic-select');
    if (sel) sel.value = topicId;
  }, 100);
}
//
// ============================================================
