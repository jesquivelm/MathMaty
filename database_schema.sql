-- Schema de Base de Datos MathMaty - Sistema de Usuarios Completo

-- Tabla de usuarios con roles
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('estudiante', 'padre', 'admin')),
    xp INTEGER DEFAULT 0,
    nivel INTEGER DEFAULT 1,
    hp INTEGER DEFAULT 100,
    racha_actual INTEGER DEFAULT 0,
    racha_maxima INTEGER DEFAULT 0,
    tiempo_practica INTEGER DEFAULT 0, -- minutos totales de pr&aacute;ctica
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de relaciones padre-hijo
CREATE TABLE IF NOT EXISTS parent_child_relations (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    child_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(parent_id, child_id)
);

CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    latex_content TEXT,
    options JSONB NOT NULL,
    solution_steps JSONB NOT NULL,
    theory TEXT,
    difficulty VARCHAR(20) DEFAULT 'basico',
    category VARCHAR(50),
    exam_year INTEGER,
    source TEXT,
    imagen TEXT,
    nivel VARCHAR(20),
    metadata JSONB DEFAULT '{}'::jsonb,
    quality_status VARCHAR(20) DEFAULT 'active',
    excluded_from_practice BOOLEAN DEFAULT FALSE,
    quality_flags JSONB DEFAULT '[]'::jsonb,
    quality_notes TEXT,
    quality_updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de progreso por tema
CREATE TABLE IF NOT EXISTS topic_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    topic_id VARCHAR(50) NOT NULL,
    ejercicios_completados INTEGER DEFAULT 0,
    ejercicios_correctos INTEGER DEFAULT 0,
    fallos_acumulados INTEGER DEFAULT 0,
    ultima_practica TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, topic_id)
);

-- Tabla de historial de ejercicios
CREATE TABLE IF NOT EXISTS exercise_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exercise_id INTEGER,
    topic_id VARCHAR(50) NOT NULL,
    correcto BOOLEAN NOT NULL,
    tiempo_segundos INTEGER,
    hp_antes INTEGER,
    hp_despues INTEGER,
    dificultad VARCHAR(20),
    excluded_from_scoring BOOLEAN DEFAULT FALSE,
    exclusion_reason TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reportes de calidad de ejercicios
CREATE TABLE IF NOT EXISTS exercise_reports (
    id SERIAL PRIMARY KEY,
    exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    comentario TEXT,
    issue_types JSONB DEFAULT '[]'::jsonb,
    severity VARCHAR(20) DEFAULT 'media',
    report_status VARCHAR(20) DEFAULT 'open',
    invalidates_exercise BOOLEAN DEFAULT FALSE,
    invalidates_attempt BOOLEAN DEFAULT FALSE,
    revisado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exercise_id, user_id)
);

-- Tabla de leaderboard global
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    xp_total INTEGER DEFAULT 0,
    ejercicios_resueltos INTEGER DEFAULT 0,
    tasa_exito DECIMAL(5,2) DEFAULT 0,
    racha_maxima INTEGER DEFAULT 0,
    posicion_global INTEGER,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Tabla de configuraci&oacute;n de APIs
CREATE TABLE IF NOT EXISTS api_config (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    proveedor VARCHAR(50) NOT NULL, -- 'openai', 'anthropic', 'grok', etc.
    api_key_encrypted TEXT,
    activa BOOLEAN DEFAULT TRUE,
    prioridad INTEGER DEFAULT 0, -- orden de preferencia
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, proveedor)
);

-- Tabla de sesiones de juego
CREATE TABLE IF NOT EXISTS game_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fin TIMESTAMP,
    ejercicios_completados INTEGER DEFAULT 0,
    ejercicios_correctos INTEGER DEFAULT 0,
    xp_ganada INTEGER DEFAULT 0,
    juego_descanso BOOLEAN DEFAULT FALSE
);

-- ============================================================
-- TABLAS NUEVAS: Eventos, Competiciones, Logros, Biblioteca, Tienda
-- ============================================================

-- Eventos / Competiciones programadas
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('maraton', 'duelo', 'diario', 'semanal', 'especial', 'boss')),
    tema_id VARCHAR(50),
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    xp_recompensa INTEGER DEFAULT 0,
    badge_recompensa VARCHAR(100),
    requisito_nivel INTEGER DEFAULT 1,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Participaci&oacute;n en eventos
CREATE TABLE IF NOT EXISTS event_participants (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    puntuacion INTEGER DEFAULT 0,
    ejercicios_completados INTEGER DEFAULT 0,
    ejercicios_correctos INTEGER DEFAULT 0,
    tiempo_total_seg INTEGER DEFAULT 0,
    posicion_final INTEGER,
    participo BOOLEAN DEFAULT FALSE,
    UNIQUE(event_id, user_id)
);

-- Logros / Badges
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(200),
    tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('racha', 'precision', 'velocidad', 'volumen', 'evento', 'nivel', 'especial')),
    criterio JSONB NOT NULL, -- {"tipo": "racha", "cantidad": 5} etc.
    xp_bonus INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Badges obtenidos por usuarios
CREATE TABLE IF NOT EXISTS user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
    fecha_obtenido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Biblioteca de conocimiento matem&aacute;tico
CREATE TABLE IF NOT EXISTS knowledge_library (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL, -- HTML/markdown con explicaciones
    ejemplos JSONB, -- [{"problema": "...", "solucion": "..."}]
    manas TEXT, -- trucos y consejos
    nivel_desde INTEGER DEFAULT 1,
    nivel_hasta INTEGER DEFAULT 10,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tienda / Recompensas
CREATE TABLE IF NOT EXISTS shop_items (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('avatar', 'tema', 'powerup', 'bonus', 'especial')),
    precio_xp INTEGER NOT NULL,
    icono VARCHAR(200),
    efecto JSONB, -- {"tipo": "hp_boost", "valor": 50}
    stock INTEGER DEFAULT -1, -- -1 = ilimitado
    nivel_requerido INTEGER DEFAULT 1,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventario de usuarios (&iacute;tems comprados)
CREATE TABLE IF NOT EXISTS user_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES shop_items(id) ON DELETE CASCADE,
    cantidad INTEGER DEFAULT 1,
    fecha_adquisicion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_id)
);

-- Historial de XP (para tracking de time-weighted leveling)
CREATE TABLE IF NOT EXISTS xp_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    fuente VARCHAR(50) NOT NULL, -- 'ejercicio', 'mision', 'evento', 'racha', 'badge', 'compra'
    referencia_id INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Badges por defecto (insert condicional)
-- ============================================================
INSERT INTO badges (codigo, nombre, descripcion, tipo, criterio, xp_bonus) VALUES
('racha_5', 'Racha de Fuego', 'Completa 5 ejercicios seguidos correctamente', 'racha', '{"tipo": "racha", "cantidad": 5}', 100),
('racha_10', 'Imparable', 'Completa 10 ejercicios seguidos correctamente', 'racha', '{"tipo": "racha", "cantidad": 10}', 300),
('racha_25', 'Leyenda Viva', 'Completa 25 ejercicios seguidos correctamente', 'racha', '{"tipo": "racha", "cantidad": 25}', 1000),
('precision_100', 'Perfecto', 'Obt&eacute;n 100% de precisi&oacute;n en una sesi&oacute;n de 10+ ejercicios', 'precision', '{"tipo": "precision", "porcentaje": 100, "minimo": 10}', 500),
('volumen_50', 'Dedicaci&oacute;n', 'Resuelve 50 ejercicios en total', 'volumen', '{"tipo": "volumen", "cantidad": 50}', 200),
('volumen_100', 'Math Warrior', 'Resuelve 100 ejercicios en total', 'volumen', '{"tipo": "volumen", "cantidad": 100}', 500),
('volumen_500', 'Math Legend', 'Resuelve 500 ejercicios en total', 'volumen', '{"tipo": "volumen", "cantidad": 500}', 2500),
('velocidad_rapido', 'Rayo Matem&aacute;tico', 'Resuelve un ejercicio en menos de 10 segundos', 'velocidad', '{"tipo": "velocidad", "segundos": 10}', 150),
('nivel_5', 'Ascenso', 'Alcanza el nivel 5', 'nivel', '{"tipo": "nivel", "nivel": 5}', 300),
('nivel_10', 'Maestro', 'Alcanza el nivel 10', 'nivel', '{"tipo": "nivel", "nivel": 10}', 1000),
('nivel_20', 'Gran Maestro', 'Alcanza el nivel 20', 'nivel', '{"tipo": "nivel", "nivel": 20}', 5000),
('evento_first', 'Competidor', 'Participa en tu primer evento', 'evento', '{"tipo": "evento", "eventos": 1}', 100),
('evento_win', 'Campe&oacute;n', 'Gana un evento (quedar en top 3)', 'evento', '{"tipo": "evento_win", "eventos": 1}', 1000),
('racha_3', 'A Calentar', 'Completa 3 ejercicios seguidos', 'racha', '{"tipo": "racha", "cantidad": 3}', 50),
('speed_demon', 'Demonio de Velocidad', 'Resuelve 5 ejercicios en menos de 15 segundos cada uno', 'velocidad', '{"tipo": "velocidad_serie", "cantidad": 5, "segundos": 15}', 500),
('todos_temas', 'Pol&iacute;mata', 'Completa al menos un ejercicio de CADA tema', 'especial', '{"tipo": "todos_temas"}', 1000),
('perfect_exam', 'Examen Perfecto', 'Obt&eacute;n 100% en un examen de 30+ preguntas', 'precision', '{"tipo": "examen_perfecto", "minimo": 30}', 2000),
('nivel_3', 'En Crecimiento', 'Alcanza el nivel 3', 'nivel', '{"tipo": "nivel", "nivel": 3}', 150),
('nivel_15', 'Leyenda Local', 'Alcanza el nivel 15', 'nivel', '{"tipo": "nivel", "nivel": 15}', 2500),
('nivel_25', 'Inmortal', 'Alcanza el nivel 25', 'nivel', '{"tipo": "nivel", "nivel": 25}', 10000),
('tiempo_5h', 'Dedicado', 'Acumula 5 horas de pr&aacute;ctica', 'especial', '{"tipo": "tiempo", "horas": 5}', 300),
('tiempo_20h', 'Vicio Saludable', 'Acumula 20 horas de pr&aacute;ctica', 'especial', '{"tipo": "tiempo", "horas": 20}', 1500),
('misiones_5', 'Misionero', 'Completa 5 misiones', 'especial', '{"tipo": "misiones", "cantidad": 5}', 500),
('primer_examen', 'Primer Parcial', 'Completa tu primer examen', 'especial', '{"tipo": "primer_examen"}', 200),
('shopaholic', 'Comprador Compulsivo', 'Compra 5 &iacute;tems en la tienda', 'especial', '{"tipo": "compras", "cantidad": 5}', 300),
('no_miss', 'Precisi&oacute;n Letal', 'Completa una misi&oacute;n de 10+ ejercicios con 100% de aciertos', 'precision', '{"tipo": "mision_perfecta", "minimo": 10}', 1000)
ON CONFLICT (codigo) DO NOTHING;

-- ============================================================
-- Items por defecto en la tienda
-- ============================================================
TRUNCATE TABLE shop_items CASCADE;

INSERT INTO shop_items (nombre, descripcion, tipo, precio_xp, icono, efecto, stock, nivel_requerido) VALUES
('Poci&oacute;n de HP Menor', 'Recupera 25 HP al instante', 'powerup', 100, '❤️', '{"tipo": "hp_boost", "valor": 25}', -1, 1),
('Poci&oacute;n de HP', 'Recupera 50 HP al instante', 'powerup', 250, '💖', '{"tipo": "hp_boost", "valor": 50}', -1, 1),
('Elixir de HP Mayor', 'Recupera 100 HP al instante', 'powerup', 500, '💗', '{"tipo": "hp_boost", "valor": 100}', 20, 1),
('Escudo Protector', 'Las pr&oacute;ximas 2 fallas no restan HP', 'powerup', 600, '🛡️', '{"tipo": "shield", "cargos": 2}', 15, 1),
('Multiplicador XP x2', 'Gana el doble de XP por 10 minutos', 'powerup', 800, '⚡', '{"tipo": "xp_mult", "multiplicador": 2, "duracion_min": 10}', 10, 1),
('Comod&iacute;n (Respuesta Correcta)', 'Revela la respuesta correcta en un ejercicio', 'powerup', 400, '👁️', '{"tipo": "reveal_answer", "usos": 1}', 10, 1),
('Segunda Oportunidad', 'Revive con 50 HP si mueres en una misi&oacute;n', 'powerup', 700, '🔄', '{"tipo": "revive", "hp": 50}', 5, 1),
('Caja Misteriosa', 'Contiene un premio aleatorio (XP, HP o &iacute;tem raro)', 'especial', 300, '🎁', '{"tipo": "mystery_box"}', -1, 1),
('Avatar: Doom Slayer', 'Disfr&aacute;zate del Doom Slayer original', 'avatar', 1000, '👹', '{"tipo": "avatar", "avatar_id": "doom_slayer"}', -1, 1),
('Avatar: Pikachu', 'Disfr&aacute;zate del famoso Pok&eacute;mon el&eacute;ctrico', 'avatar', 1200, '⚡', '{"tipo": "avatar", "avatar_id": "pikachu"}', -1, 1),
('Avatar: Mystery Dungeon', 'Avatar tem&aacute;tico de mazmorra', 'avatar', 1500, '🏰', '{"tipo": "avatar", "avatar_id": "dungeon"}', -1, 1),
('Tema: Night City', 'Tema visual oscuro cyberpunk', 'tema', 2000, '🌃', '{"tipo": "skin", "skin_id": "night_city"}', -1, 1),
('Tema: Math Matrix', 'Tema verde estilo Matrix para la app', 'tema', 1800, '💚', '{"tipo": "skin", "skin_id": "matrix"}', -1, 1),
('Tema: Doom Hell', 'Tema rojo infernal del Doom', 'tema', 2500, '🔥', '{"tipo": "skin", "skin_id": "doom_hell"}', -1, 1),
('Bundle: Starter Pack', 'Poci&oacute;n(50HP) + Escudo(2 cargas) + 100 XP bonus', 'especial', 800, '📦', '{"tipo": "bundle", "items": [{"item": "Poci&oacute;n de HP", "cantidad": 1}, {"item": "Escudo Protector", "cantidad": 1}]}', 10, 1),
('Power-Up: Click Feliz', '+5 XP extra por ejercicio durante 15 min', 'powerup', 500, '✨', '{"tipo": "xp_bonus", "xp_extra": 5, "duracion_min": 15}', 20, 1)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Biblioteca de conocimiento por defecto (14+ temas MEP)
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('factorizacion', 'Factorizaci&oacute;n: Gu&iacute;a Completa', $$<div class="kb-article"><h2>&iquest;Qu&eacute; es la factorizaci&oacute;n?</h2><p>La factorizaci&oacute;n es el proceso de descomponer una expresi&oacute;n algebraica en un producto de factores m&aacute;s simples. Es como "desarmar" una expresi&oacute;n para ver de qu&eacute; est&aacute; hecha.</p><div class="kb-box"><strong>📌 Idea clave:</strong> As&iacute; como 12 = 3 × 4, una expresi&oacute;n algebraica como x² - 9 = (x + 3)(x - 3)</div><h3>M&eacute;todo 1: Factor Com&uacute;n</h3><p>Cuando todos los t&eacute;rminos comparten un mismo factor, lo extraemos:</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> 6x² + 4x = <span class="hl">2x(3x + 2)</span><br>El <span class="glossary-link" onclick="openGlossary('Factor Com&uacute;n')">factor com&uacute;n</span> es 2x porque ambos t&eacute;rminos tienen factor 2 y x.</div><h3>M&eacute;todo 2: Diferencia de Cuadrados</h3><p>F&oacute;rmula: <strong>a² - b² = (a + b)(a - b)</strong></p><div class="kb-ejemplo"><strong>Ejemplo:</strong> x² - 9 = (x + 3)(x - 3)<br>Aqu&iacute; a = x, b = 3. Verifica: (x+3)(x-3) = x² - 3x + 3x - 9 = x² - 9 ✓</div><h3>M&eacute;todo 3: Trinomio Cuadrado Perfecto</h3><p>F&oacute;rmula: <strong>a² + 2ab + b² = (a + b)²</strong></p><div class="kb-ejemplo"><strong>Ejemplo:</strong> x² + 6x + 9 = (x + 3)²<br>Verifica: (x+3)² = x² + 2·x·3 + 3² = x² + 6x + 9 ✓</div><h3>M&eacute;todo 4: Suma y Diferencia de Cubos</h3><p>a³ + b³ = (a + b)(a² - ab + b²)<br>a³ - b³ = (a - b)(a² + ab + b²)</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> x³ + 8 = (x + 2)(x² - 2x + 4)<br>Aqu&iacute; a = x, b = 2. El signo del medio en el segundo factor SIEMPRE es el opuesto.</div><h3>M&eacute;todo 5: Trinomio General (ax² + bx + c)</h3><p>Se buscan dos n&uacute;meros que <strong>multipliquen</strong> a·c y <strong>sumen</strong> b.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> x² + 5x + 6<br>Buscamos dos n&uacute;meros que multipliquen 6 y sumen 5: 2 y 3.<br>= (x + 2)(x + 3)</div></div>$$, '[{"problema": "Factoriza: 12x³ - 8x² + 4x", "solucion": "Factor com&uacute;n: 4x(3x² - 2x + 1)"}, {"problema": "Factoriza: x⁴ - 16", "solucion": "Diferencia de cuadrados: (x² + 4)(x² - 4) = (x² + 4)(x + 2)(x - 2)"}, {"problema": "Factoriza: x² + 10x + 25", "solucion": "Trinomio cuadrado perfecto: (x + 5)²"}, {"problema": "Factoriza: 27 - x³", "solucion": "Diferencia de cubos: (3 - x)(9 + 3x + x²)"}]', 'Siempre intenta factor com&uacute;n PRIMERO. Si no hay factor com&uacute;n, revisa si es diferencia de cuadrados. Si no, prueba trinomio. El orden importa: 1) Factor com&uacute;n 2) F&oacute;rmulas notables 3) Trinomio general.', 1, 1),
('ecuaciones', 'Ecuaciones: Paso a Paso', $$<div class="kb-article"><h2>&iquest;Qu&eacute; es una ecuaci&oacute;n?</h2><p>Una ecuaci&oacute;n es una igualdad matem&aacute;tica que contiene una o m&aacute;s inc&oacute;gnitas. Resolverla significa encontrar el valor de la inc&oacute;gnita que hace que la igualdad sea cierta.</p><div class="kb-box"><strong>⚖️ Regla de Oro:</strong> Todo lo que hagas de un lado del signo =, debes hacerlo del otro lado. La ecuaci&oacute;n se mantiene balanceada como una balanza.</div><h3>Ecuaciones Lineales (Primer Grado)</h3><p>Forma general: ax + b = c</p><div class="kb-pasos"><strong>Pasos:</strong><ol><li>Simplifica ambos lados (suma t&eacute;rminos semejantes)</li><li>Mueve t&eacute;rminos con la variable a un lado, constantes al otro</li><li>Despeja la variable dividiendo</li></ol></div><div class="kb-ejemplo"><strong>Ejemplo:</strong> 3x + 7 = 22<br>Paso 1: 3x = 22 - 7 = 15<br>Paso 2: x = 15/3<br>Soluci&oacute;n: <strong>x = 5</strong></div><h3>Ecuaciones de Segundo Grado</h3><p>Forma: <strong>ax² + bx + c = 0</strong></p><p><strong>F&oacute;rmula cuadr&aacute;tica:</strong> x = (-b ± √(b² - 4ac)) / (2a)</p><p>El <span class="glossary-link" onclick="openGlossary('Discriminante')">discriminante</span> (b² - 4ac) te dice cu&aacute;ntas soluciones hay:</p><ul><li><strong>&gt; 0:</strong> Dos soluciones reales diferentes</li><li><strong>= 0:</strong> Una soluci&oacute;n real (ra&iacute;z doble)</li><li><strong>&lt; 0:</strong> No hay soluciones reales</li></ul><div class="kb-ejemplo"><strong>Ejemplo:</strong> x² - 5x + 6 = 0<br>a=1, b=-5, c=6<br>Discriminante: (-5)² - 4(1)(6) = 25 - 24 = 1<br>x = (5 ± √1) / 2 = (5 ± 1) / 2<br><strong>x₁ = 3, x₂ = 2</strong></div></div>$$, '[{"problema": "Resuelve: 3x + 7 = 22", "solucion": "3x = 15 → x = 5"}, {"problema": "Resuelve: x² - 5x + 6 = 0", "solucion": "(x - 2)(x - 3) = 0 → x = 2, x = 3"}, {"problema": "Resuelve: 2(x - 3) + 5 = 3x + 1", "solucion": "2x - 6 + 5 = 3x + 1 → 2x - 1 = 3x + 1 → -2 = x"}, {"problema": "Resuelve: x² + 4x + 4 = 0", "solucion": "(x + 2)² = 0 → x = -2 (ra&iacute;z doble)"}]', 'Para ecuaciones de segundo grado, intenta FACTORIZAR primero. Si no puedes r&aacute;pido, usa la f&oacute;rmula cuadr&aacute;tica. MEMORIZA: x = (-b ± √(b² - 4ac)) / (2a)', 1, 2),
('inecuaciones', 'Inecuaciones: Desigualdades Explicadas', $$<div class="kb-article"><h2>&iquest;Qu&eacute; es una inecuaci&oacute;n?</h2><p>Es una desigualdad (&gt;, &lt;, ≥, ≤) que contiene una inc&oacute;gnita. La soluci&oacute;n es un <span class="glossary-link" onclick="openGlossary('Intervalo')">intervalo</span> o uni&oacute;n de intervalos, no solo un n&uacute;mero.</p><div class="kb-box-warn"><strong>⚠️ Regla CR&Iacute;TICA:</strong> Si multiplicas o divides AMBOS lados por un n&uacute;mero NEGATIVO, el signo de la desigualdad se INVIERTE. <br>Ejemplo: -2x &gt; 6 → x &lt; -3 (se invirti&oacute; &gt; por &lt;)</div><h3>M&eacute;todo de los Puntos Cr&iacute;ticos</h3><div class="kb-pasos"><ol><li>Despeja hasta tener cero de un lado</li><li>Encuentra los puntos cr&iacute;ticos (ra&iacute;ces del numerador y denominador)</li><li>Ub&iacute;calos en la recta num&eacute;rica</li><li>Prueba un valor en cada intervalo</li><li>Escribe la soluci&oacute;n como intervalo(s)</li></ol></div><div class="kb-ejemplo"><strong>Ejemplo:</strong> (x - 3)/(x + 2) ≤ 0<br>Puntos cr&iacute;ticos: x = 3, x = -2<br>Intervalos: (-∞, -2), (-2, 3], [3, ∞)<br>Probando: x=0 da (-3)/(2) = -1.5 ≤ 0 → S&iacute;<br><strong>Soluci&oacute;n: (-2, 3]</strong><br>⚠️ -2 es abierto porque el denominador se hace cero ah&iacute;.</div></div>$$, '[{"problema": "Resuelve: 2x - 4 > 6", "solucion": "2x > 10 → x > 5 → Soluci&oacute;n: (5, ∞)"}, {"problema": "Resuelve: (x - 3)/(x + 2) ≤ 0", "solucion": "Puntos cr&iacute;ticos: x=3, x=-2. Soluci&oacute;n: (-2, 3]"}, {"problema": "Resuelve: -3x + 9 ≥ 0", "solucion": "-3x ≥ -9 → x ≤ 3 (se invirti&oacute; el signo!). Soluci&oacute;n: (-∞, 3]"}]', 'Siempre verifica tu soluci&oacute;n probando un valor de CADA intervalo en la desigualdad ORIGINAL. Los puntos del denominador SIEMPRE son abiertos (par&eacute;ntesis).', 1, 3),
('exp-log', 'Exponenciales y Logaritmos: La Conexi&oacute;n', $$<div class="kb-article"><h2>Funci&oacute;n Exponencial</h2><p>Forma: <strong>f(x) = a · bˣ</strong></p><div class="kb-box"><strong>Propiedades clave:</strong><ul><li>b⁰ = 1 (cualquier n&uacute;mero elevado a 0 da 1)</li><li>bᵃ · bᶜ = bᵃ⁺ᶜ</li><li>(bᵃ)ᶜ = bᵃ·ᶜ</li><li>bᵃ / bᶜ = bᵃ⁻ᶜ</li><li>b⁻ⁿ = 1/bⁿ</li></ul></div><div class="kb-ejemplo"><strong>Ejemplo:</strong> 2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128<br><strong>Ejemplo:</strong> (3²)³ = 3²·³ = 3⁶ = 729</div><h2>Funci&oacute;n Logar&iacute;tmica</h2><p><strong>log_b(x) = n</strong> significa <strong>bⁿ = x</strong></p><p>El logaritmo es la funci&oacute;n inversa de la exponencial. As&iacute; como la suma y la resta son operaciones inversas, el logaritmo y la exponencial tambi&eacute;n lo son.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> log₂(8) = 3 porque 2³ = 8<br><strong>Ejemplo:</strong> log₁₀(100) = 2 porque 10² = 100</div><h3>Propiedades de Logaritmos</h3><ul><li>log_b(x·y) = log_b(x) + log_b(y)</li><li>log_b(x/y) = log_b(x) - log_b(y)</li><li>log_b(xⁿ) = n · log_b(x)</li><li>log_b(1) = 0</li><li>log_b(b) = 1</li></ul><div class="kb-box-warn"><strong>⚠️ Dominio:</strong> El argumento de un logaritmo SIEMPRE debe ser mayor que cero (x > 0). log(0) no existe, log(negativo) no existe.</div></div>$$, '[{"problema": "Simplifica: log₂(8) + log₂(4)", "solucion": "log₂(8) = 3, log₂(4) = 2 → resultado = 5"}, {"problema": "Resuelve: 2ˣ = 16", "solucion": "2ˣ = 2⁴ → x = 4"}, {"problema": "Simplifica: log(100x)", "solucion": "log(100) + log(x) = 2 + log(x)"}, {"problema": "Resuelve: eˣ = 5", "solucion": "x = ln(5) ≈ 1.609"}]', 'El logaritmo natural (ln) usa base e ≈ 2.71828. log sin base = base 10. &iexcl;Nunca olvides: el argumento de un log debe ser > 0! Cambio de base: log_b(x) = log_c(x)/log_c(b).', 1, 4),
('fracciones-alg', 'Fracciones Algebraicas: Dom&iacute;nalas', $$<div class="kb-article"><h2>Fracci&oacute;n Algebraica</h2><p>Es una fracci&oacute;n donde el numerador y/o denominador son polinomios. Ejemplos: (x+1)/(x-2), (x²-4)/(x²+2x+1)</p><div class="kb-box"><strong>📌 Importante:</strong> Las fracciones algebraicas se comportan igual que las fracciones num&eacute;ricas. Las mismas reglas aplican, pero con polinomios.</div><h3>Simplificaci&oacute;n</h3><p>Factoriza numerador y denominador, luego CANCELA factores comunes.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> (x² - 1)/(x + 1)<br>= (x - 1)(x + 1)/(x + 1)<br>= <strong>x - 1</strong>, con x ≠ -1 (el -1 hace cero el denominador original)</div><h3>Suma y Resta</h3><div class="kb-pasos"><ol><li>Encuentra el <span class="glossary-link" onclick="openGlossary('MCM (M&iacute;nimo Com&uacute;n M&uacute;ltiplo)')">MCM</span> de los denominadores</li><li>Convierte cada fracci&oacute;n al MCM</li><li>Suma/resta los numeradores</li><li>Simplifica el resultado</li></ol></div><div class="kb-ejemplo"><strong>Ejemplo:</strong> 1/(x+1) + 1/(x-1)<br>MCM = (x+1)(x-1)<br>= (x-1 + x+1)/((x+1)(x-1))<br>= 2x/(x²-1)</div><h3>Multiplicaci&oacute;n y Divisi&oacute;n</h3><p><strong>Multiplicaci&oacute;n:</strong> Numerador × numerador, denominador × denominador. Luego simplifica.</p><p><strong>Divisi&oacute;n:</strong> Invierte la segunda fracci&oacute;n y multiplica: (a/b) ÷ (c/d) = (a/b) × (d/c)</p></div>$$, '[{"problema": "Simplifica: (x² - 1)/(x + 1)", "solucion": "(x-1)(x+1)/(x+1) = x-1, x ≠ -1"}, {"problema": "Calcula: 1/(x+1) + 1/(x-1)", "solucion": "MCM = (x+1)(x-1). Resultado: 2x/(x²-1)"}, {"problema": "Multiplica: (x+1)/(x-2) · (x-2)/(x+3)", "solucion": "Cancelas (x-2): (x+1)/(x+3)"}, {"problema": "Divide: (x/2) ÷ (x/4)", "solucion": "(x/2) × (4/x) = 4/2 = 2"}]', 'SIEMPRE indica el dominio al simplificar (valores que hacen cero el denominador original). Factorizar es tu mejor amigo para simplificar fracciones algebraicas.', 1, 5),
('trigonometria', 'Trigonometr&iacute;a: Todo lo que Necesitas', $$<div class="kb-article"><h2>Razones Trigonom&eacute;tricas</h2><p>En un tri&aacute;ngulo rect&aacute;ngulo con &aacute;ngulo θ:</p><div class="kb-box"><strong>SOH-CAH-TOA (Regla nemot&eacute;cnica):</strong><ul><li><strong>S</strong>en(θ) = <strong>O</strong>puesto / <strong>H</strong>ipotenusa</li><li><strong>C</strong>os(θ) = <strong>A</strong>dyacente / <strong>H</strong>ipotenusa</li><li><strong>T</strong>an(θ) = <strong>O</strong>puesto / <strong>A</strong>dyacente = sen(θ)/cos(θ)</li></ul></div><h3>Identidad Fundamental</h3><p>La identidad m&aacute;s importante: <strong>sen²(θ) + cos²(θ) = 1</strong></p><p>De esta se derivan casi todas las dem&aacute;s identidades trigonom&eacute;tricas.</p><h3>Valores Exactos para MEMORIZAR</h3><div class="kb-table"><table><tr><th>θ</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr><tr><td>sen θ</td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr><tr><td>cos θ</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr><tr><td>tan θ</td><td>0</td><td>1/√3</td><td>1</td><td>√3</td><td>∞</td></tr></table></div><h3>Ley de Senos</h3><p><strong>a/sen(A) = b/sen(B) = c/sen(C)</strong> (para cualquier tri&aacute;ngulo)</p><h3>Ley de Cosenos</h3><p><strong>a² = b² + c² - 2bc·cos(A)</strong> (generaliza Pit&aacute;goras)</p><p>Cuando el &aacute;ngulo es 90°, cos(90°) = 0 y la f&oacute;rmula se reduce al Teorema de Pit&aacute;goras.</p></div>$$, '[{"problema": "Calcula sen(30°) + cos(60°)", "solucion": "1/2 + 1/2 = 1"}, {"problema": "Resuelve: sen²(θ) = 1/4 para 0°≤θ≤90°", "solucion": "sen(θ) = 1/2 → θ = 30°"}, {"problema": "En un tri&aacute;ngulo rect&aacute;ngulo, cateto opuesto = 3, hipotenusa = 5. Halla sen(θ).", "solucion": "sen(θ) = 3/5 = 0.6"}, {"problema": "Usa ley de senos: A=30°, B=45°, a=10. Halla b.", "solucion": "b = 10·sen(45°)/sen(30°) = 10·0.707/0.5 = 14.14"}]', 'Construye el c&iacute;rculo unitario mental. Todos los valores vienen de sen y cos de 30°, 45° y 60°. Para recordar: sen CRECE (0, 1/2, √2/2, √3/2, 1) y cos DECRECE (1, √3/2, √2/2, 1/2, 0).', 1, 6),
('calculo', 'C&aacute;lculo Diferencial e Integral: Fundamentos', $$<div class="kb-article"><h2>L&iacute;mites</h2><p>El l&iacute;mite de f(x) cuando x se acerca a a es el valor al que se aproxima f(x).</p><p>Se escribe: <strong>lim_{x→a} f(x) = L</strong></p><div class="kb-ejemplo"><strong>Ejemplo:</strong> lim_{x→2} (x²-4)/(x-2) = lim_{x→2} (x+2) = 4<br>Nota: Factorizamos para eliminar la indeterminaci&oacute;n 0/0</div><h3>Derivadas</h3><p>La derivada mide la tasa de cambio instant&aacute;nea. Es la pendiente de la recta tangente a la curva en un punto.</p><p><strong>Reglas b&aacute;sicas:</strong></p><ul><li>d/dx(xⁿ) = n·xⁿ⁻¹ (Regla de la potencia)</li><li>d/dx(sen x) = cos x</li><li>d/dx(cos x) = -sen x</li><li>d/dx(eˣ) = eˣ (&iexcl;se deriva a s&iacute; misma!)</li><li>d/dx(ln x) = 1/x</li></ul><div class="kb-ejemplo"><strong>Ejemplo:</strong> f(x) = 3x² + 2x + 1<br>f�(x) = 2·3x¹ + 1·2x⁰ + 0 = 6x + 2</div><h3>Integrales</h3><p>La integral es el "&aacute;rea bajo la curva". Es la operaci&oacute;n inversa de la derivada.</p><ul><li>∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ -1</li><li>∫1/x dx = ln|x| + C</li><li>∫eˣ dx = eˣ + C</li><li>∫cos x dx = sen x + C</li><li>∫sen x dx = -cos x + C</li></ul><div class="kb-box-warn"><strong>⚠️ Nunca olvides:</strong> En integrales indefinidas, SIEMPRE suma la constante de integraci&oacute;n C.</div></div>$$, '[{"problema": "Deriva: f(x) = 3x² + 2x + 1", "solucion": "f�(x) = 6x + 2"}, {"problema": "Integra: ∫2x dx", "solucion": "x² + C"}, {"problema": "Calcula: lim_{x→3} (x²-9)/(x-3)", "solucion": "= lim_{x→3} (x+3) = 6"}, {"problema": "Deriva: f(x) = sen(2x)", "solucion": "f�(x) = cos(2x) · 2 = 2cos(2x) [Regla de la Cadena]"}]', 'Regla de la cadena: d/dx[f(g(x))] = f�(g(x)) · g�(x). Para integrales, el m&eacute;todo de sustituci&oacute;n es la "regla de la cadena al rev&eacute;s". &iexcl;Siempre suma C!', 5, 7),
('conjuntos', 'Teor&iacute;a de Conjuntos: Fundamentos', $$<div class="kb-article"><h2>&iquest;Qu&eacute; es un conjunto?</h2><p>Un conjunto es una colecci&oacute;n de objetos llamados <strong>elementos</strong>. Se denotan con llaves {}.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> A = {1, 2, 3, 4, 5}<br>B = {x | x es un n&uacute;mero par} (se lee: "el conjunto de x tal que x es par")</div><h3>Operaciones b&aacute;sicas</h3><ul><li><strong>Uni&oacute;n (∪):</strong> Elementos que est&aacute;n en A o en B (o en ambos)</li><li><strong>Intersecci&oacute;n (∩):</strong> Elementos que est&aacute;n en A y en B simult&aacute;neamente</li><li><strong>Diferencia (A - B):</strong> Elementos que est&aacute;n en A pero no en B</li><li><strong>Complemento (A'):</strong> Elementos que NO est&aacute;n en A</li></ul><div class="kb-ejemplo"><strong>Ejemplo:</strong> A={1,2,3}, B={3,4,5}<br>A∪B = {1,2,3,4,5}<br>A∩B = {3}<br>A-B = {1,2}</div></div>$$, '[{"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A∪B", "solucion": "A∪B = {1,2,3,4,5,6}"}, {"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A∩B", "solucion": "A∩B = {3,4}"}]', 'El conjunto vac&iacute;o ∅ es subconjunto de TODO conjunto. La uni&oacute;n es como "sumar" conjuntos, la intersecci&oacute;n como "elementos comunes".', 1, 8),
('numeros-reales', 'N&uacute;meros Reales: La Recta Num&eacute;rica', $$<div class="kb-article"><h2>Los N&uacute;meros Reales</h2><p>Los n&uacute;meros reales (ℝ) incluyen todos los n&uacute;meros que puedes imaginar en la recta num&eacute;rica.</p><h3>Clasificaci&oacute;n</h3><ul><li><strong>Naturales (ℕ):</strong> {1, 2, 3, 4, ...}</li><li><strong>Enteros (ℤ):</strong> {..., -2, -1, 0, 1, 2, ...}</li><li><strong>Racionales (ℚ):</strong> Fracciones, decimales exactos o peri&oacute;dicos</li><li><strong>Irracionales (I):</strong> Decimales no peri&oacute;dicos (π, √2, e)</li></ul><div class="kb-box"><strong>📌 Propiedades importantes:</strong><ul><li>Propiedad conmutativa: a+b = b+a, a·b = b·a</li><li>Propiedad asociativa: (a+b)+c = a+(b+c)</li><li>Propiedad distributiva: a(b+c) = ab + ac</li></ul></div><div class="kb-ejemplo"><strong>Ejemplo:</strong> 3(x+2) = 3x + 6 (distributiva)<br><strong>Ejemplo:</strong> 5 + (3+2) = (5+3) + 2 = 10 (asociativa)</div></div>$$, '[{"problema": "Clasifica los siguientes n&uacute;meros: 5, -3, 1/2, √2, π", "solucion": "5 ∈ ℕ, ℤ, ℚ, ℝ | -3 ∈ ℤ, ℚ, ℝ | 1/2 ∈ ℚ, ℝ | √2 ∈ I, ℝ | π ∈ I, ℝ"}, {"problema": "Aplica distributiva: 4(x - 3)", "solucion": "4x - 12"}]', 'Los n&uacute;meros reales son TODO lo que est&aacute; en la recta num&eacute;rica. Si puedes ubicarlo en la recta, es real. π ≈ 3.1416, e ≈ 2.7183.', 1, 9),
('radicales', 'Radicales y Potencias: Operaciones', $$<div class="kb-article"><h2>Ra&iacute;ces y Radicales</h2><p>Una ra&iacute;z es la operaci&oacute;n inversa de la potenciaci&oacute;n.</p><div class="kb-box"><strong>Definici&oacute;n:</strong> ⁿ√a = b significa bⁿ = a<br>√a es la ra&iacute;z cuadrada (n=2), ∛a es la c&uacute;bica (n=3)</div><h3>Propiedades</h3><ul><li>ⁿ√(a·b) = ⁿ√a · ⁿ√b</li><li>ⁿ√(a/b) = ⁿ√a / ⁿ√b</li><li>√(a²) = |a| (el resultado SIEMPRE es positivo)</li><li>a^(1/n) = ⁿ√a (exponente fraccionario)</li></ul><div class="kb-box-warn"><strong>⚠️ CUIDADO:</strong> √(a+b) NO es igual a √a + √b<br>Ejemplo: √(9+16) = √25 = 5, pero √9+√16 = 3+4 = 7. &iexcl;Son diferentes!</div><h3>Racionalizaci&oacute;n</h3><p>Proceso para eliminar radicales del denominador:</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> 1/√2 = (1·√2)/(√2·√2) = √2/2<br><strong>Ejemplo:</strong> 1/(√3+1) = (√3-1)/((√3+1)(√3-1)) = (√3-1)/(3-1) = (√3-1)/2</div></div>$$, '[{"problema": "Simplifica: √(4·9)", "solucion": "√4 · √9 = 2·3 = 6"}, {"problema": "Racionaliza: 1/√3", "solucion": "√3/3"}, {"problema": "Escribe como potencia: ∛5", "solucion": "5^(1/3)"}, {"problema": "Simplifica: √(x⁶)", "solucion": "|x³|"}]', 'Recuerda: √(a²) = |a| (no a). Para racionalizar, multiplica por el conjugado si hay suma/resta de radicales. Exponente fraccionario: a^(m/n) = ⁿ√(aᵐ).', 1, 10),
('polinomios', 'Polinomios: Operaciones y Propiedades', $$<div class="kb-article"><h2>&iquest;Qu&eacute; es un polinomio?</h2><p>Un polinomio es una expresi&oacute;n algebraica formada por la suma de t&eacute;rminos llamados monomios.</p><p>Forma general: <strong>aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀</strong></p><div class="kb-ejemplo"><strong>Ejemplos:</strong><br>3x² + 2x - 1 (grado 2)<br>x⁵ - 3x³ + 2x (grado 5)<br>2x + 1 (grado 1)</div><h3>Operaciones</h3><p><strong>Suma/Resta:</strong> Solo t&eacute;rminos <span class="glossary-link" onclick="openGlossary('Monomios Semejantes')">semejantes</span> (misma variable y exponente).</p><p><strong>Multiplicaci&oacute;n:</strong> Cada t&eacute;rmino del primero con cada t&eacute;rmino del segundo (ley distributiva).</p><p><strong>Divisi&oacute;n:</strong> Se usa divisi&oacute;n sint&eacute;tica o divisi&oacute;n larga de polinomios.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> (2x+1)(x-3) = 2x·x + 2x·(-3) + 1·x + 1·(-3)<br>= 2x² - 6x + x - 3 = 2x² - 5x - 3</div></div>$$, '[{"problema": "Suma: (3x²+2x-1) + (x²-4x+5)", "solucion": "4x² - 2x + 4"}, {"problema": "Multiplica: (x+2)(x-5)", "solucion": "x² - 3x - 10"}, {"problema": "Resta: (4x³+2x) - (x³-3x)", "solucion": "3x³ + 5x"}]', 'Solo puedes sumar t&eacute;rminos con EXACTAMENTE las mismas variables y exponentes. Para multiplicar, usa el m&eacute;todo FOIL (First, Outer, Inner, Last) o distribuye cada t&eacute;rmino.', 1, 11),
('sistemas-ecuaciones', 'Sistemas de Ecuaciones', $$<div class="kb-article"><h2>&iquest;Qu&eacute; es un sistema de ecuaciones?</h2><p>Es un conjunto de dos o m&aacute;s ecuaciones con dos o m&aacute;s inc&oacute;gnitas que se resuelven simult&aacute;neamente.</p><h3>M&eacute;todo de Sustituci&oacute;n</h3><div class="kb-pasos"><ol><li>Despeja una variable en una ecuaci&oacute;n</li><li>Sustit&uacute;yela en la otra ecuaci&oacute;n</li><li>Resuelve la ecuaci&oacute;n resultante</li><li>Sustituye el valor para hallar la otra variable</li></ol></div><div class="kb-ejemplo"><strong>Ejemplo:</strong> {x + y = 5, x - y = 1}<br>De la primera: x = 5 - y<br>Sustituyo en la segunda: (5-y) - y = 1 → 5 - 2y = 1 → -2y = -4 → y = 2<br>Entonces x = 5 - 2 = 3<br><strong>Soluci&oacute;n: (3, 2)</strong></div><h3>M&eacute;todo de Eliminaci&oacute;n</h3><p>Suma o resta las ecuaciones para eliminar una variable.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> {2x + y = 7, x - y = 2}<br>Sumando: (2x+y)+(x-y) = 7+2 → 3x = 9 → x = 3<br>Entonces 2(3)+y=7 → 6+y=7 → y=1<br><strong>Soluci&oacute;n: (3, 1)</strong></div></div>$$, '[{"problema": "Resuelve: {x+y=5, x-y=1}", "solucion": "Por sustituci&oacute;n: x=3, y=2"}, {"problema": "Resuelve: {2x+y=7, x-y=2}", "solucion": "Por eliminaci&oacute;n: x=3, y=1"}, {"problema": "Resuelve: {3x+2y=12, x-y=1}", "solucion": "Por sustituci&oacute;n: x=2, y=3. Verifica: 3(2)+2(3)=12 ✓"}]', 'Sustituci&oacute;n es mejor cuando una variable ya est&aacute; despejada. Eliminaci&oacute;n es mejor cuando los coeficientes son iguales o se pueden igualar f&aacute;cilmente. Siempre verifica tu soluci&oacute;n en AMBAS ecuaciones originales.', 1, 12),
('plano-cartesiano', 'Plano Cartesiano y Funciones', $$<div class="kb-article"><h2>El Plano Cartesiano</h2><p>El plano cartesiano tiene dos ejes perpendiculares: el eje X (horizontal) y el eje Y (vertical). Cada punto se representa como (x, y).</p><div class="kb-box"><strong>Distancia entre dos puntos:</strong> d = √[(x₂-x₁)² + (y₂-y₁)²]<br><strong>Punto medio:</strong> ((x₁+x₂)/2, (y₁+y₂)/2)</div><div class="kb-ejemplo"><strong>Ejemplo:</strong> Distancia entre A(1,2) y B(4,6)<br>d = √[(4-1)² + (6-2)²] = √[9+16] = √25 = 5</div><h3>Concepto de Funci&oacute;n</h3><p>Una <span class="glossary-link" onclick="openGlossary('Funci&oacute;n')">funci&oacute;n</span> es una relaci&oacute;n donde cada entrada (x) tiene exactamente una salida (y).</p><p>Se escribe: <strong>y = f(x)</strong> (f de x)</p><p><strong>Prueba de la recta vertical:</strong> Si una recta vertical toca la gr&aacute;fica en m&aacute;s de un punto, NO es funci&oacute;n.</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> f(x) = x² es una funci&oacute;n<br>f(2) = 4, f(-2) = 4 (hay dos x dando el mismo y, pero cada x tiene un solo y)</div></div>$$, '[{"problema": "Distancia entre A(1,1) y B(4,5)", "solucion": "d = √(9+16) = 5"}, {"problema": "Punto medio entre (2,4) y (6,8)", "solucion": "((2+6)/2, (4+8)/2) = (4, 6)"}, {"problema": "&iquest;Es f(x)=√x una funci&oacute;n? Eval&uacute;a f(4)", "solucion": "S&iacute;, es funci&oacute;n. f(4) = 2 (la ra&iacute;z principal siempre es positiva)"}]', 'La prueba de la recta vertical es infalible para identificar funciones. Dominio = valores que puede tomar x. Rango = valores que puede tomar y (f(x)).', 1, 13),
('geometria', 'Geometr&iacute;a: Figuras, &Aacute;reas y Vol&uacute;menes', $$<div class="kb-article"><h2>Figuras Geom&eacute;tricas B&aacute;sicas</h2><h3>Tri&aacute;ngulos</h3><p><strong>&Aacute;rea:</strong> A = (base × altura) / 2</p><p><strong>Per&iacute;metro:</strong> Suma de los tres lados</p><p><span class="glossary-link" onclick="openGlossary('Teorema de Pit&aacute;goras')">Teorema de Pit&aacute;goras</span>: a² + b² = c² (tri&aacute;ngulo rect&aacute;ngulo)</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> Tri&aacute;ngulo rect&aacute;ngulo con catetos 3 y 4<br>Hipotenusa: c = √(9+16) = √25 = 5<br>&Aacute;rea: (3×4)/2 = 6</div><h3>C&iacute;rculo</h3><p><strong>&Aacute;rea:</strong> A = πr²</p><p><strong>Circunferencia:</strong> C = 2πr</p><div class="kb-ejemplo"><strong>Ejemplo:</strong> C&iacute;rculo de radio 5<br>&Aacute;rea = 25π ≈ 78.54<br>Circunferencia = 10π ≈ 31.42</div><h3>Vol&uacute;menes</h3><ul><li><strong>Cubo:</strong> V = a³</li><li><strong>Esfera:</strong> V = (4/3)πr³</li><li><strong>Cilindro:</strong> V = πr²h</li><li><strong>Cono:</strong> V = (1/3)πr²h</li></ul></div>$$, '[{"problema": "&Aacute;rea de tri&aacute;ngulo con base 10 y altura 6", "solucion": "A = (10×6)/2 = 30"}, {"problema": "Volumen de cubo de lado 4", "solucion": "V = 4³ = 64"}, {"problema": "&Aacute;rea de c&iacute;rculo de radio 7", "solucion": "A = 49π ≈ 153.94"}]', 'Para figuras compuestas, divide en figuras simples, calcula cada &aacute;rea por separado y suma. El teorema de Pit&aacute;goras solo funciona en tri&aacute;ngulos RECT&Aacute;NGULOS.', 1, 14)
ON CONFLICT DO NOTHING;

-- Insertar m&aacute;s temas MEP a la tabla topics (si no existen)
INSERT INTO topics (name, parcial_num, description) VALUES
('Teor&iacute;a de Conjuntos', 1, 'Conceptos b&aacute;sicos de conjuntos, uni&oacute;n, intersecci&oacute;n, diferencia y complemento'),
('N&uacute;meros Reales', 1, 'Clasificaci&oacute;n de n&uacute;meros, propiedades de los reales, operaciones b&aacute;sicas'),
('Radicales y Potencias', 1, 'Operaciones con radicales, racionalizaci&oacute;n, exponentes fraccionarios'),
('Polinomios', 1, 'Operaciones con polinomios: suma, resta, multiplicaci&oacute;n y divisi&oacute;n'),
('Sistemas de Ecuaciones', 1, 'Sistemas 2x2 y 3x3: m&eacute;todos de sustituci&oacute;n, eliminaci&oacute;n e igualaci&oacute;n'),
('Plano Cartesiano y Funciones', 2, 'Concepto de funci&oacute;n, dominio, rango, gr&aacute;fica de funciones b&aacute;sicas'),
('Geometr&iacute;a', 2, '&Aacute;reas, per&iacute;metros, vol&uacute;menes, teorema de Pit&aacute;goras, figuras geom&eacute;tricas')
ON CONFLICT (name) DO NOTHING;

-- &Iacute;ndices para optimizaci&oacute;n
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_rol ON users(rol);
CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_user ON exercise_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_scoring ON exercise_history(user_id, excluded_from_scoring);
CREATE INDEX IF NOT EXISTS idx_exercise_history_timestamp ON exercise_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_exercises_quality ON exercises(excluded_from_practice, quality_status);
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp ON leaderboard(xp_total DESC);
CREATE INDEX IF NOT EXISTS idx_events_fechas ON events(fecha_inicio, fecha_fin);
CREATE INDEX IF NOT EXISTS idx_event_participants_event ON event_participants(event_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_user ON event_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_user ON xp_history(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_timestamp ON xp_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_knowledge_topic ON knowledge_library(topic_id);

-- Insertar usuario admin por defecto (password: admin123 - cambiar en producci&oacute;n)
INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel)
VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'Administrador', 'admin@mathmaty.com', 'admin', 0, 1)
ON CONFLICT (username) DO NOTHING;

-- Insertar usuario de prueba estudiante
INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel)
VALUES ('matias', '$2b$10$YourHashedPasswordHere', 'Mat&iacute;as', 'matias@example.com', 'estudiante', 0, 1)
ON CONFLICT (username) DO NOTHING;

-- Insertar usuario de prueba padre
INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel)
VALUES ('padre', '$2b$10$YourHashedPasswordHere', 'Padre de Mat&iacute;as', 'padre@example.com', 'padre', 0, 1)
ON CONFLICT (username) DO NOTHING;

-- Relaci&oacute;n padre-hijo de prueba
INSERT INTO parent_child_relations (parent_id, child_id)
SELECT p.id, c.id FROM users p, users c 
WHERE p.username = 'padre' AND c.username = 'matias'
ON CONFLICT DO NOTHING;
