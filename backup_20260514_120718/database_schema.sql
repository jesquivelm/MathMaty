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
    tiempo_practica INTEGER DEFAULT 0, -- minutos totales de práctica
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
    options JSONB NOT NULL, -- ["correct", "d1", "d2", "d3"]
    solution_steps JSONB NOT NULL, -- [{"math": "...", "expl": "..."}]
    theory TEXT,
    difficulty VARCHAR(20) DEFAULT 'basico',
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
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Tabla de configuración de APIs
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

-- Participación en eventos
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

-- Biblioteca de conocimiento matemático
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

-- Inventario de usuarios (ítems comprados)
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
('precision_100', 'Perfecto', 'Obtén 100% de precisión en una sesión de 10+ ejercicios', 'precision', '{"tipo": "precision", "porcentaje": 100, "minimo": 10}', 500),
('volumen_50', 'Dedicación', 'Resuelve 50 ejercicios en total', 'volumen', '{"tipo": "volumen", "cantidad": 50}', 200),
('volumen_100', 'Math Warrior', 'Resuelve 100 ejercicios en total', 'volumen', '{"tipo": "volumen", "cantidad": 100}', 500),
('volumen_500', 'Math Legend', 'Resuelve 500 ejercicios en total', 'volumen', '{"tipo": "volumen", "cantidad": 500}', 2500),
('velocidad_rapido', 'Rayo Matemático', 'Resuelve un ejercicio en menos de 10 segundos', 'velocidad', '{"tipo": "velocidad", "segundos": 10}', 150),
('nivel_5', 'Ascenso', 'Alcanza el nivel 5', 'nivel', '{"tipo": "nivel", "nivel": 5}', 300),
('nivel_10', 'Maestro', 'Alcanza el nivel 10', 'nivel', '{"tipo": "nivel", "nivel": 10}', 1000),
('nivel_20', 'Gran Maestro', 'Alcanza el nivel 20', 'nivel', '{"tipo": "nivel", "nivel": 20}', 5000),
('evento_first', 'Competidor', 'Participa en tu primer evento', 'evento', '{"tipo": "evento", "eventos": 1}', 100),
('evento_win', 'Campeón', 'Gana un evento (quedar en top 3)', 'evento', '{"tipo": "evento_win", "eventos": 1}', 1000)
ON CONFLICT (codigo) DO NOTHING;

-- ============================================================
-- Items por defecto en la tienda
-- ============================================================
INSERT INTO shop_items (nombre, descripcion, tipo, precio_xp, icono, efecto, nivel_requerido) VALUES
('Poción de HP', 'Recupera 50 HP al instante', 'powerup', 200, '❤️', '{"tipo": "hp_boost", "valor": 50}', 1),
('Elixir de HP', 'Recupera 100 HP al instante', 'powerup', 500, '💖', '{"tipo": "hp_boost", "valor": 100}', 3),
('Escudo de Precisión', 'Las próximas 3 fallas no restan HP', 'powerup', 800, '🛡️', '{"tipo": "shield", "cargos": 3}', 5),
('Multiplicador de XP x2', 'Gana el doble de XP por 10 minutos', 'powerup', 1000, '⚡', '{"tipo": "xp_mult", "multiplicador": 2, "duracion_min": 10}', 5),
('Tema Oscuro Élite', 'Desbloquea el tema visual oscuro especial', 'tema', 1500, '🌙', '{"tipo": "skin", "skin_id": "dark_elite"}', 8),
('Avatar DOOM Clásico', 'Desbloquea el avatar clásico de DOOM', 'avatar', 2000, '👹', '{"tipo": "avatar", "avatar_id": "doom_classic"}', 10)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Biblioteca de conocimiento por defecto
-- ============================================================
INSERT INTO knowledge_library (topic_id, titulo, contenido, ejemplos, manas, nivel_desde, orden) VALUES
('factorizacion', 'Factorización: Guía Completa', E'<h3>¿Qué es la factorización?</h3><p>La factorización es el proceso de descomponer una expresión algebraica en un producto de factores más simples. Es como "desarmar" una expresión para ver de qué está hecha.</p><h3>Método 1: Factor Común</h3><p>Cuando todos los términos comparten un mismo factor, lo extraemos:</p><p><b>Ejemplo:</b> 6x² + 4x = 2x(3x + 2)</p><h3>Método 2: Diferencia de Cuadrados</h3><p>a² - b² = (a + b)(a - b)</p><p><b>Ejemplo:</b> x² - 9 = (x + 3)(x - 3)</p><h3>Método 3: Trinomio Cuadrado Perfecto</h3><p>a² + 2ab + b² = (a + b)²</p><p><b>Ejemplo:</b> x² + 6x + 9 = (x + 3)²</p><h3>Método 4: Suma y Diferencia de Cubos</h3><p>a³ + b³ = (a + b)(a² - ab + b²)</p><p>a³ - b³ = (a - b)(a² + ab + b²)</p>', '[{"problema": "Factoriza: 12x³ - 8x² + 4x", "solucion": "Factor común: 4x(3x² - 2x + 1)"}, {"problema": "Factoriza: x⁴ - 16", "solucion": "Diferencia de cuadrados: (x² + 4)(x² - 4) = (x² + 4)(x + 2)(x - 2)"}]', 'Siempre intenta factor común PRIMERO. Si no hay, revisa si es diferencia de cuadrados (tiene resta y ambos son cuadrados).', 1, 1),
('ecuaciones', 'Ecuaciones: Paso a Paso', E'<h3>¿Qué es una ecuación?</h3><p>Una ecuación es una igualdad matemática que contiene una o más incógnitas. Resolverla significa encontrar el valor de la incógnita que hace que la igualdad sea cierta.</p><h3>Regla de Oro</h3><p>Todo lo que hagas de un lado del signo =, debes hacerlo del otro lado. La ecuación se mantiene balanceada.</p><h3>Pasos para resolver:</h3><ol><li>Simplifica ambos lados (suma términos semejantes)</li><li>Mueve términos con la variable a un lado, constantes al otro</li><li>Despeja la variable dividiendo</li></ol><h3>Ecuaciones de Segundo Grado</h3><p>Forma: ax² + bx + c = 0</p><p>Fórmula cuadrática: x = (-b ± √(b² - 4ac)) / (2a)</p><p>El discriminante (b² - 4ac) te dice cuántas soluciones hay: >0 (2), =0 (1), <0 (ninguna real).</p>', '[{"problema": "Resuelve: 3x + 7 = 22", "solucion": "3x = 22 - 7 = 15 → x = 5"}, {"problema": "Resuelve: x² - 5x + 6 = 0", "solucion": "(x - 2)(x - 3) = 0 → x = 2, x = 3"}]', 'Para ecuaciones de segundo grado, si no puedes factorizar rápido, usa la fórmula cuadrática directamente.', 1, 2),
('inecuaciones', 'Inecuaciones: Desigualdades Explicadas', E'<h3>¿Qué es una inecuación?</h3><p>Es una desigualdad (>, <, ≥, ≤) que contiene una incógnita. La solución es un conjunto de valores, no solo uno.</p><h3>⚠️ Regla CRÍTICA</h3><p>Si multiplicas o divides AMBOS lados por un número NEGATIVO, el signo de la desigualdad se INVIERTE.</p><h3>Método de los Puntos Críticos</h3><ol><li>Despeja hasta tener cero de un lado</li><li>Encuentra los puntos críticos (raíces del numerador y denominador)</li><li>Ubícalos en la recta numérica</li><li>Prueba un valor en cada intervalo</li><li>Escribe la solución como intervalo(s)</li></ol><p><b>Recuerda:</b> Los puntos del denominador SIEMPRE son abiertos (paréntesis).</p>', '[{"problema": "Resuelve: 2x - 4 > 6", "solucion": "2x > 10 → x > 5 → Solución: (5, ∞)"}, {"problema": "Resuelve: (x - 3)/(x + 2) ≤ 0", "solucion": "Puntos críticos: x=3, x=-2. Intervalos: (-∞,-2), (-2,3], [3,∞). Probando: solución (-2,3]"}]', 'Siempre verifica tu solución probando un valor de cada intervalo en la desigualdad ORIGINAL.', 1, 3),
('exp-log', 'Exponenciales y Logaritmos: La Conexión', E'<h3>Función Exponencial</h3><p>Forma: f(x) = a · bˣ</p><p>Propiedades clave:</p><ul><li>b⁰ = 1</li><li>bᵃ · bᶜ = bᵃ⁺ᶜ</li><li>(bᵃ)ᶜ = bᵃ·ᶜ</li><li>bᵃ / bᶜ = bᵃ⁻ᶜ</li></ul><h3>Función Logarítmica</h3><p>log_b(x) = n  significa  bⁿ = x</p><p>El logaritmo es la función inversa de la exponencial.</p><h3>Propiedades de Logaritmos</h3><ul><li>log_b(x·y) = log_b(x) + log_b(y)</li><li>log_b(x/y) = log_b(x) - log_b(y)</li><li>log_b(xⁿ) = n · log_b(x)</li><li>log_b(1) = 0</li><li>log_b(b) = 1</li></ul>', '[{"problema": "Simplifica: log₂(8) + log₂(4)", "solucion": "log₂(8) = 3, log₂(4) = 2 → resultado = 5"}, {"problema": "Resuelve: 2ˣ = 16", "solucion": "2ˣ = 2⁴ → x = 4"}]', 'El logaritmo natural (ln) usa base e ≈ 2.718. log sin base = base 10. ¡Nunca olvides que el argumento de un log debe ser >0!', 1, 4),
('fracciones-alg', 'Fracciones Algebraicas: Domínalas', E'<h3>Fracción Algebraica</h3><p>Es una fracción donde el numerador y/o denominador son polinomios.</p><h3>Simplificación</h3><p>Factoriza numerador y denominador, luego cancela factores comunes.</p><h3>Suma y Resta</h3><ol><li>Encuentra el MCM (Mínimo Común Múltiplo) de los denominadores</li><li>Convierte cada fracción al MCM</li><li>Suma/resta los numeradores</li><li>Simplifica el resultado</li></ol><h3>Multiplicación</h3><p>Multiplica numerador × numerador, denominador × denominador. Luego simplifica.</p><h3>División</h3><p>Invierte la segunda fracción y multiplica: (a/b) ÷ (c/d) = (a/b) × (d/c)</p>', '[{"problema": "Simplifica: (x² - 1)/(x + 1)", "solucion": "(x - 1)(x + 1)/(x + 1) = x - 1, x ≠ -1"}, {"problema": "Calcula: 1/(x+1) + 1/(x-1)", "solucion": "MCM = (x+1)(x-1). Numerador: (x-1)+(x+1) = 2x. Resultado: 2x/(x²-1)"}]', 'Siempre indica el dominio (valores que hacen cero el denominador) al simplificar fracciones algebraicas.', 1, 5),
('trigonometria', 'Trigonometría: Todo lo que Necesitas', E'<h3>Razones Trigonométricas</h3><p>En un triángulo rectángulo con ángulo θ:</p><ul><li>sen(θ) = cateto opuesto / hipotenusa</li><li>cos(θ) = cateto adyacente / hipotenusa</li><li>tan(θ) = sen(θ) / cos(θ) = cateto opuesto / cateto adyacente</li></ul><h3>Identidad Fundamental</h3><p>sen²(θ) + cos²(θ) = 1</p><h3>Valores Exactos para Recordar</h3><p>sen(30°) = 1/2, sen(45°) = √2/2, sen(60°) = √3/2</p><p>cos(30°) = √3/2, cos(45°) = √2/2, cos(60°) = 1/2</p><h3>Ley de Senos</h3><p>a/sen(A) = b/sen(B) = c/sen(C)</p>', '[{"problema": "Calcula sen(30°) + cos(60°)", "solucion": "1/2 + 1/2 = 1"}, {"problema": "Demuestra: tan(θ) = sen(θ)/cos(θ) dado sen²+cos²=1", "solucion": "tan=op/ady = (op/h)/(ady/h) = sen/cos"}]', 'Construye el círculo unitario mentalmente. Todos los valores se derivan de sen y cos de 30°, 45° y 60°.', 1, 6),
('calculo', 'Cálculo Diferencial e Integral: Fundamentos', E'<h3>Límites</h3><p>El límite de f(x) cuando x se acerca a a es el valor al que se aproxima f(x).</p><p>lim(x→a) f(x) = L</p><h3>Derivadas</h3><p>La derivada mide la tasa de cambio instantánea. Es la pendiente de la recta tangente.</p><p>Reglas básicas:</p><ul><li>d/dx(xⁿ) = n·xⁿ⁻¹</li><li>d/dx(sen x) = cos x</li><li>d/dx(cos x) = -sen x</li><li>d/dx(eˣ) = eˣ</li><li>d/dx(ln x) = 1/x</li></ul><h3>Integrales</h3><p>La integral es el "área bajo la curva". Es la operación inversa de la derivada.</p><p>∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ -1</p><p>∫1/x dx = ln|x| + C</p><p>∫eˣ dx = eˣ + C</p>', '[{"problema": "Deriva: f(x) = 3x² + 2x + 1", "solucion": "f prima (x) = 6x + 2"}, {"problema": "Integra: ∫2x dx", "solucion": "x² + C"}]', 'La regla de la cadena: d/dx[f(g(x))] = f prima (g(x)) · g prima (x). Para integrales, siempre suma la constante C.', 5, 7)
ON CONFLICT DO NOTHING;

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_rol ON users(rol);
CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_user ON exercise_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_timestamp ON exercise_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp ON leaderboard(xp_total DESC);
CREATE INDEX IF NOT EXISTS idx_events_fechas ON events(fecha_inicio, fecha_fin);
CREATE INDEX IF NOT EXISTS idx_event_participants_event ON event_participants(event_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_user ON event_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_user ON xp_history(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_timestamp ON xp_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_knowledge_topic ON knowledge_library(topic_id);

-- Insertar usuario admin por defecto (password: admin123 - cambiar en producción)
INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel)
VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'Administrador', 'admin@mathmaty.com', 'admin', 0, 1)
ON CONFLICT (username) DO NOTHING;

-- Insertar usuario de prueba estudiante
INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel)
VALUES ('matias', '$2b$10$YourHashedPasswordHere', 'Matías', 'matias@example.com', 'estudiante', 0, 1)
ON CONFLICT (username) DO NOTHING;

-- Insertar usuario de prueba padre
INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel)
VALUES ('padre', '$2b$10$YourHashedPasswordHere', 'Padre de Matías', 'padre@example.com', 'padre', 0, 1)
ON CONFLICT (username) DO NOTHING;

-- Relación padre-hijo de prueba
INSERT INTO parent_child_relations (parent_id, child_id)
SELECT p.id, c.id FROM users p, users c 
WHERE p.username = 'padre' AND c.username = 'matias'
ON CONFLICT DO NOTHING;
