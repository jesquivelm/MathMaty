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

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_rol ON users(rol);
CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_user ON exercise_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_timestamp ON exercise_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp ON leaderboard(xp_total DESC);

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
