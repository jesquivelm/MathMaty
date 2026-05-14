const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3030;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'mathmaty_secret_key_2026';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mathmaty',
  password: 'Calg.1984', 
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// SERVIR KATEX LOCALMENTE DESDE NODE_MODULES (Evita bloqueos de CDN / Tracking Prevention)
app.use('/katex', express.static(path.join(__dirname, 'node_modules/katex/dist')));

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// ENDPOINTS DE AUTENTICACIÓN

// Registro de usuario
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, nombre, email, rol } = req.body;
    
    if (!username || !password || !nombre || !rol) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    if (!['estudiante', 'padre'].includes(rol)) {
      return res.status(400).json({ error: 'Rol inválido' });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }
    
    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Insertar nuevo usuario
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, nombre, email, rol, xp, nivel) VALUES ($1, $2, $3, $4, $5, 0, 1) RETURNING id, username, nombre, email, rol, xp, nivel',
      [username, passwordHash, nombre, email, rol]
    );
    
    // Crear entrada en leaderboard
    await pool.query(
      'INSERT INTO leaderboard (user_id, xp_total, ejercicios_resueltos, tasa_exito, racha_maxima) VALUES ($1, 0, 0, 0, 0)',
      [result.rows[0].id]
    );
    
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan credenciales' });
    }
    
    // Buscar usuario
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND activo = true',
      [username]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const user = result.rows[0];
    
    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Actualizar último acceso
    await pool.query(
      'UPDATE users SET ultimo_acceso = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );
    
    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        xp: user.xp,
        nivel: user.nivel,
        hp: user.hp,
        racha_actual: user.racha_actual
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Obtener perfil del usuario actual
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, nombre, email, rol, xp, nivel, hp, racha_actual, racha_maxima, tiempo_practica FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error obteniendo perfil:', err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Relación padre-hijo
app.post('/api/auth/parent-child', authenticateToken, async (req, res) => {
  try {
    const { child_username } = req.body;
    
    if (req.user.rol !== 'padre') {
      return res.status(403).json({ error: 'Solo padres pueden vincular hijos' });
    }
    
    // Buscar hijo
    const childResult = await pool.query(
      'SELECT id FROM users WHERE username = $1 AND rol = $2',
      [child_username, 'estudiante']
    );
    
    if (childResult.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    
    const childId = childResult.rows[0].id;
    
    // Crear relación
    await pool.query(
      'INSERT INTO parent_child_relations (parent_id, child_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.id, childId]
    );
    
    res.json({ message: 'Relación creada exitosamente' });
  } catch (err) {
    console.error('Error creando relación:', err);
    res.status(500).json({ error: 'Error al crear relación' });
  }
});

// Obtener hijos de un padre
app.get('/api/auth/children', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'padre') {
      return res.status(403).json({ error: 'Solo padres pueden ver hijos' });
    }
    
    const result = await pool.query(
      `SELECT u.id, u.username, u.nombre, u.xp, u.nivel, u.hp, u.racha_actual 
       FROM users u 
       INNER JOIN parent_child_relations pcr ON u.id = pcr.child_id 
       WHERE pcr.parent_id = $1`,
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error obteniendo hijos:', err);
    res.status(500).json({ error: 'Error al obtener hijos' });
  }
});

// 1. Perfil del Jugador
app.get('/api/usuario/:username', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT nombre, xp, nivel FROM users WHERE username = $1',
      [req.params.username]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al cargar usuario:", err);
    res.status(500).send("Error de conexión");
  }
});

// ENDPOINTS DE LEADERBOARD

// Obtener leaderboard global
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Calcular clasificación directo desde users + exercise_history
    const result = await pool.query(
      `SELECT u.id, u.username, u.nombre, u.xp, u.nivel, u.racha_actual,
         COUNT(eh.id) as ejercicios_resueltos,
         ROUND(AVG(CASE WHEN eh.correcto THEN 1.0 ELSE 0 END)*100,1) as tasa_exito
       FROM users u
       LEFT JOIN exercise_history eh ON eh.user_id = u.id
       WHERE u.activo = true AND u.rol = 'estudiante'
       GROUP BY u.id, u.username, u.nombre, u.xp, u.nivel, u.racha_actual
       ORDER BY u.xp DESC, ejercicios_resueltos DESC
       LIMIT 50`
    );
    const rows = result.rows.map((r, i) => ({ ...r, posicion: i + 1 }));
    res.json(rows);
  } catch (err) {
    console.error('Error leaderboard:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener posición del usuario actual en el leaderboard
app.get('/api/leaderboard/mi-posicion', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) + 1 as posicion
       FROM leaderboard l
       INNER JOIN users u ON l.user_id = u.id
       WHERE u.rol = 'estudiante' AND u.activo = true 
       AND l.xp_total > (SELECT xp_total FROM leaderboard WHERE user_id = $1)`,
      [req.user.id]
    );
    
    const totalUsers = await pool.query(
      'SELECT COUNT(*) as total FROM users WHERE rol = $1 AND activo = true',
      ['estudiante']
    );
    
    res.json({
      posicion: result.rows[0].posicion,
      total_jugadores: totalUsers.rows[0].total
    });
  } catch (err) {
    console.error('Error obteniendo posición:', err);
    res.status(500).json({ error: 'Error al obtener posición' });
  }
});

// Actualizar leaderboard del usuario
app.post('/api/leaderboard/actualizar', authenticateToken, async (req, res) => {
  try {
    const { xp_ganada, correcto } = req.body;
    
    // Obtener datos actuales del leaderboard
    const current = await pool.query(
      'SELECT * FROM leaderboard WHERE user_id = $1',
      [req.user.id]
    );
    
    if (current.rows.length === 0) {
      // Crear entrada si no existe
      await pool.query(
        'INSERT INTO leaderboard (user_id, xp_total, ejercicios_resueltos, tasa_exito, racha_maxima) VALUES ($1, $2, 1, $3, $4)',
        [req.user.id, xp_ganada || 0, correcto ? 100 : 0, 0]
      );
    } else {
      const data = current.rows[0];
      const nuevosEjercicios = data.ejercicios_resueltos + 1;
      const nuevoXP = data.xp_total + (xp_ganada || 0);
      
      // Calcular nueva tasa de éxito
      let nuevaTasaExito;
      if (correcto) {
        const ejerciciosCorrectos = (data.tasa_exito * data.ejercicios_resueltos / 100) + 1;
        nuevaTasaExito = (ejerciciosCorrectos / nuevosEjercicios) * 100;
      } else {
        const ejerciciosCorrectos = data.tasa_exito * data.ejercicios_resueltos / 100;
        nuevaTasaExito = (ejerciciosCorrectos / nuevosEjercicios) * 100;
      }
      
      // Obtener racha máxima del usuario
      const userRacha = await pool.query(
        'SELECT racha_maxima FROM users WHERE id = $1',
        [req.user.id]
      );
      
      await pool.query(
        'UPDATE leaderboard SET xp_total = $1, ejercicios_resueltos = $2, tasa_exito = $3, racha_maxima = $4, ultima_actualizacion = CURRENT_TIMESTAMP WHERE user_id = $5',
        [nuevoXP, nuevosEjercicios, nuevaTasaExito, userRacha.rows[0].racha_maxima, req.user.id]
      );
    }
    
    res.json({ message: 'Leaderboard actualizado' });
  } catch (err) {
    console.error('Error actualizando leaderboard:', err);
    res.status(500).json({ error: 'Error al actualizar leaderboard' });
  }
});

// ENDPOINTS DE REPORTERÍA

// Obtener reporte de progreso del estudiante (para el propio estudiante)
app.get('/api/reporte/mi-progreso', authenticateToken, async (req, res) => {
  try {
    // Estadísticas generales desde exercise_history
    const stats = await pool.query(
      `SELECT 
         COUNT(*) as total_ejercicios,
         SUM(CASE WHEN correcto = true THEN 1 ELSE 0 END) as correctos,
         ROUND(AVG(CASE WHEN correcto = true THEN 1.0 ELSE 0 END) * 100, 1) as tasa_exito_global
       FROM exercise_history WHERE user_id = $1`,
      [req.user.id]
    );

    // Progreso por tema (usando topic_id directamente)
    const topicProgress = await pool.query(
      `SELECT topic_id, 
         COUNT(*) as total,
         SUM(CASE WHEN correcto THEN 1 ELSE 0 END) as correctos,
         SUM(CASE WHEN NOT correcto THEN 1 ELSE 0 END) as fallos,
         ROUND(AVG(CASE WHEN correcto THEN 1.0 ELSE 0 END)*100,1) as tasa
       FROM exercise_history WHERE user_id = $1
       GROUP BY topic_id ORDER BY fallos DESC`,
      [req.user.id]
    );

    // Areas debiles (topics con más fallos)
    const weakAreas = topicProgress.rows.filter(r => r.fallos > 0).slice(0, 5);

    // Historial reciente
    const history = await pool.query(
      `SELECT topic_id, correcto, timestamp FROM exercise_history WHERE user_id=$1 ORDER BY timestamp DESC LIMIT 20`,
      [req.user.id]
    );

    res.json({
      estadisticas_generales: stats.rows[0],
      progreso_por_tema: topicProgress.rows,
      areas_debil: weakAreas,
      historial_reciente: history.rows
    });
  } catch (err) {
    console.error('Error reporte:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener reporte de hijo (para padres)
app.get('/api/reporte/hijo/:child_id', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'padre') {
      return res.status(403).json({ error: 'Solo padres pueden ver reportes de hijos' });
    }
    
    const childId = parseInt(req.params.child_id);
    
    // Verificar que el hijo pertenece al padre
    const relation = await pool.query(
      'SELECT * FROM parent_child_relations WHERE parent_id = $1 AND child_id = $2',
      [req.user.id, childId]
    );
    
    if (relation.rows.length === 0) {
      return res.status(403).json({ error: 'No tienes permiso para ver este reporte' });
    }
    
    // Información del hijo
    const childInfo = await pool.query(
      'SELECT id, username, nombre, xp, nivel, hp, racha_actual, racha_maxima, tiempo_practica FROM users WHERE id = $1',
      [childId]
    );
    
    // Progreso por tema
    const topicProgress = await pool.query(
      `SELECT tp.topic_id, t.name as tema_nombre, tp.ejercicios_completados, tp.ejercicios_correctos,
              tp.fallos_acumulados, tp.ultima_practica,
              CASE WHEN tp.ejercicios_completados > 0 
                   THEN ROUND((tp.ejercicios_correctos::float / tp.ejercicios_completados) * 100, 1)
                   ELSE 0 END as tasa_exito_tema
       FROM topic_progress tp
       INNER JOIN topics t ON tp.topic_id = t.id
       WHERE tp.user_id = $1
       ORDER BY tp.ultima_practica DESC`,
      [childId]
    );
    
    // Historial reciente
    const recentHistory = await pool.query(
      `SELECT eh.id, eh.topic_id, eh.correcto, eh.tiempo_segundos, eh.dificultad, eh.timestamp,
              t.name as tema_nombre
       FROM exercise_history eh
       INNER JOIN topics t ON eh.topic_id = t.id
       WHERE eh.user_id = $1
       ORDER BY eh.timestamp DESC
       LIMIT 50`,
      [childId]
    );
    
    // Estadísticas generales
    const stats = await pool.query(
      `SELECT 
         COUNT(*) as total_ejercicios,
         SUM(CASE WHEN correcto = true THEN 1 ELSE 0 END) as correctos,
         ROUND(AVG(CASE WHEN correcto = true THEN 1 ELSE 0 END) * 100, 1) as tasa_exito_global,
         AVG(tiempo_segundos) as tiempo_promedio
       FROM exercise_history
       WHERE user_id = $1`,
      [childId]
    );
    
    // Áreas de fallo
    const weakAreas = await pool.query(
      `SELECT tp.topic_id, t.name as tema_nombre, tp.fallos_acumulados,
              CASE WHEN tp.ejercicios_completados > 0 
                   THEN ROUND((tp.ejercicios_correctos::float / tp.ejercicios_completados) * 100, 1)
                   ELSE 0 END as tasa_exito
       FROM topic_progress tp
       INNER JOIN topics t ON tp.topic_id = t.id
       WHERE tp.user_id = $1 AND tp.ejercicios_completados > 0
       ORDER BY tp.fallos_acumulados DESC, tasa_exito ASC
       LIMIT 5`,
      [childId]
    );
    
    res.json({
      informacion_hijo: childInfo.rows[0],
      progreso_por_tema: topicProgress.rows,
      historial_reciente: recentHistory.rows,
      estadisticas_generales: stats.rows[0],
      areas_debil: weakAreas.rows
    });
  } catch (err) {
    console.error('Error obteniendo reporte de hijo:', err);
    res.status(500).json({ error: 'Error al obtener reporte de hijo' });
  }
});

// ENDPOINTS DE REFUERZO EN ÁREAS DE FALLO

// Obtener ejercicios de refuerzo basados en áreas débiles
app.get('/api/refuerzo/ejercicios', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'estudiante') {
      return res.status(403).json({ error: 'Solo estudiantes pueden obtener ejercicios de refuerzo' });
    }
    
    // Obtener áreas débiles del estudiante
    const weakAreas = await pool.query(
      `SELECT tp.topic_id, t.name as tema_nombre, tp.fallos_acumulados,
              CASE WHEN tp.ejercicios_completados > 0 
                   THEN ROUND((tp.ejercicios_correctos::float / tp.ejercicios_completados) * 100, 1)
                   ELSE 0 END as tasa_exito
       FROM topic_progress tp
       INNER JOIN topics t ON tp.topic_id = t.id
       WHERE tp.user_id = $1 AND tp.ejercicios_completados > 0 AND tp.fallos_acumulados > 0
       ORDER BY tp.fallos_acumulados DESC, tasa_exito ASC
       LIMIT 3`,
      [req.user.id]
    );
    
    if (weakAreas.rows.length === 0) {
      return res.json({ message: 'No hay áreas de mejora identificadas', ejercicios: [] });
    }
    
    // Obtener ejercicios de los temas débiles
    const topicIds = weakAreas.rows.map(row => row.topic_id);
    const exercises = await pool.query(
      `SELECT e.id, e.difficulty, e.question, e.math_expression, e.hint, 
              e.mana_tip, e.correct_solution, t.name as nombre_tema
       FROM exercises e
       INNER JOIN topics t ON e.topic_id = t.id
       WHERE e.topic_id = ANY($1)
       ORDER BY RANDOM()
       LIMIT 10`,
      [topicIds]
    );
    
    res.json({
      areas_debil: weakAreas.rows,
      ejercicios: exercises.rows
    });
  } catch (err) {
    console.error('Error obteniendo ejercicios de refuerzo:', err);
    res.status(500).json({ error: 'Error al obtener ejercicios de refuerzo' });
  }
});

// Sugerir modo de refuerzo
app.get('/api/refuerzo/sugerir', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'estudiante') {
      return res.status(403).json({ error: 'Solo estudiantes pueden recibir sugerencias' });
    }
    
    // Verificar si hay áreas que necesitan refuerzo
    const weakAreas = await pool.query(
      `SELECT COUNT(*) as count
       FROM topic_progress
       WHERE user_id = $1 AND fallos_acumulados > 2 
       AND (ejercicios_correctos::float / ejercicios_completados) < 0.6`,
      [req.user.id]
    );
    
    const necesitaRefuerzo = weakAreas.rows[0].count > 0;
    
    if (necesitaRefuerzo) {
      res.json({
        sugerir_refuerzo: true,
        mensaje: 'Detectamos áreas donde puedes mejorar. ¿Quieres practicar ejercicios de refuerzo?'
      });
    } else {
      res.json({
        sugerir_refuerzo: false,
        mensaje: '¡Vas muy bien! Sigue practicando a tu ritmo.'
      });
    }
  } catch (err) {
    console.error('Error sugiriendo refuerzo:', err);
    res.status(500).json({ error: 'Error al sugerir refuerzo' });
  }
});

// Registrar ejercicio en historial
app.post('/api/reporte/registrar-ejercicio', authenticateToken, async (req, res) => {
  try {
    const { exercise_id, topic_id, correcto, tiempo_segundos, hp_antes, hp_despues, dificultad } = req.body;
    
    await pool.query(
      `INSERT INTO exercise_history (user_id, exercise_id, topic_id, correcto, tiempo_segundos, hp_antes, hp_despues, dificultad)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [req.user.id, exercise_id, topic_id, correcto, tiempo_segundos, hp_antes, hp_despues, dificultad]
    );
    
    // Actualizar progreso por tema
    const topicProgress = await pool.query(
      'SELECT * FROM topic_progress WHERE user_id = $1 AND topic_id = $2',
      [req.user.id, topic_id]
    );
    
    if (topicProgress.rows.length === 0) {
      await pool.query(
        'INSERT INTO topic_progress (user_id, topic_id, ejercicios_completados, ejercicios_correctos, fallos_acumulados) VALUES ($1, $2, 1, $3, $4)',
        [req.user.id, topic_id, correcto ? 1 : 0, correcto ? 0 : 1]
      );
    } else {
      const data = topicProgress.rows[0];
      await pool.query(
        `UPDATE topic_progress 
         SET ejercicios_completados = ejercicios_completados + 1,
             ejercicios_correctos = ejercicios_correctos + $1,
             fallos_acumulados = fallos_acumulados + $2,
             ultima_practica = CURRENT_TIMESTAMP
         WHERE user_id = $3 AND topic_id = $4`,
        [correcto ? 1 : 0, correcto ? 0 : 1, req.user.id, topic_id]
      );
    }
    
    res.json({ message: 'Ejercicio registrado' });
  } catch (err) {
    console.error('Error registrando ejercicio:', err);
    res.status(500).json({ error: 'Error al registrar ejercicio' });
  }
});

// ENDPOINTS DE CONFIGURACIÓN DE APIs

// Obtener configuraciones de APIs del usuario
app.get('/api/config/apis', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, proveedor, activa, prioridad, fecha_creacion FROM api_config WHERE user_id = $1 ORDER BY prioridad ASC',
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error obteniendo configuraciones de APIs:', err);
    res.status(500).json({ error: 'Error al obtener configuraciones de APIs' });
  }
});

// Agregar configuración de API
app.post('/api/config/apis', authenticateToken, async (req, res) => {
  try {
    const { proveedor, api_key, prioridad } = req.body;
    
    if (!proveedor || !api_key) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    const proveedoresValidos = ['openai', 'anthropic', 'grok', 'huggingface', 'ollama'];
    if (!proveedoresValidos.includes(proveedor)) {
      return res.status(400).json({ error: 'Proveedor inválido' });
    }
    
    // Encriptar la API key (usando una simple codificación base64 por ahora, en producción usar bcrypt o crypto)
    const apiKeyEncriptada = Buffer.from(api_key).toString('base64');
    
    await pool.query(
      'INSERT INTO api_config (user_id, proveedor, api_key_encrypted, activa, prioridad) VALUES ($1, $2, $3, true, $4) ON CONFLICT (user_id, proveedor) DO UPDATE SET api_key_encrypted = $3, prioridad = $4',
      [req.user.id, proveedor, apiKeyEncriptada, prioridad || 0]
    );
    
    res.json({ message: 'Configuración de API guardada exitosamente' });
  } catch (err) {
    console.error('Error guardando configuración de API:', err);
    res.status(500).json({ error: 'Error al guardar configuración de API' });
  }
});

// Actualizar configuración de API
app.put('/api/config/apis/:id', authenticateToken, async (req, res) => {
  try {
    const { activa, prioridad } = req.body;
    const configId = parseInt(req.params.id);
    
    // Verificar que la configuración pertenece al usuario
    const existing = await pool.query(
      'SELECT * FROM api_config WHERE id = $1 AND user_id = $2',
      [configId, req.user.id]
    );
    
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    
    await pool.query(
      'UPDATE api_config SET activa = $1, prioridad = $2 WHERE id = $3',
      [activa !== undefined ? activa : existing.rows[0].activa, prioridad !== undefined ? prioridad : existing.rows[0].prioridad, configId]
    );
    
    res.json({ message: 'Configuración de API actualizada' });
  } catch (err) {
    console.error('Error actualizando configuración de API:', err);
    res.status(500).json({ error: 'Error al actualizar configuración de API' });
  }
});

// Eliminar configuración de API
app.delete('/api/config/apis/:id', authenticateToken, async (req, res) => {
  try {
    const configId = parseInt(req.params.id);
    
    // Verificar que la configuración pertenece al usuario
    const existing = await pool.query(
      'SELECT * FROM api_config WHERE id = $1 AND user_id = $2',
      [configId, req.user.id]
    );
    
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    
    await pool.query('DELETE FROM api_config WHERE id = $1', [configId]);
    
    res.json({ message: 'Configuración de API eliminada' });
  } catch (err) {
    console.error('Error eliminando configuración de API:', err);
    res.status(500).json({ error: 'Error al eliminar configuración de API' });
  }
});

// Probar conexión con API
app.post('/api/config/apis/test', authenticateToken, async (req, res) => {
  try {
    const { proveedor, api_key } = req.body;
    
    // Simular prueba de conexión (en producción, hacer una llamada real a la API)
    let resultado = false;
    let mensaje = '';
    
    switch(proveedor) {
      case 'openai':
        mensaje = 'Conexión con OpenAI simulada exitosamente';
        resultado = true;
        break;
      case 'anthropic':
        mensaje = 'Conexión con Anthropic simulada exitosamente';
        resultado = true;
        break;
      case 'grok':
        mensaje = 'Conexión con Grok simulada exitosamente';
        resultado = true;
        break;
      default:
        mensaje = 'Proveedor no soportado para prueba';
        resultado = false;
    }
    
    res.json({ exito: resultado, mensaje });
  } catch (err) {
    console.error('Error probando conexión:', err);
    res.status(500).json({ error: 'Error al probar conexión' });
  }
});

// 2. Endpoint de Misiones
app.get('/api/misiones', async (req, res) => {
    try {
        const consulta = `
            SELECT 
                e.id, 
                e.difficulty, 
                e.question, 
                e.math_expression, 
                e.hint, 
                e.mana_tip AS maña,
                e.correct_solution, 
                t.name AS nombre_tema
            FROM exercises e
            INNER JOIN topics t ON e.topic_id = t.id
            ORDER BY e.id ASC;
        `;
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (err) {
        console.error("Error en misiones:", err);
        res.status(500).json({ error: "Fallo de telemetría de red" });
    }
});


// AI HELPER
async function callLLM(userId, prompt, systemPrompt = '') {
  try {
    const configRes = await pool.query(
      'SELECT proveedor, api_key_encrypted FROM api_config WHERE user_id = $1 AND activa = true ORDER BY prioridad ASC LIMIT 1',
      [userId]
    );

    let apiKey;
    let proveedor = 'anthropic';
    
    if (configRes.rows.length > 0) {
      proveedor = configRes.rows[0].proveedor;
      apiKey = Buffer.from(configRes.rows[0].api_key_encrypted, 'base64').toString();
    } else {
      apiKey = process.env.ANTHROPIC_API_KEY || '';
    }

    if (!apiKey && proveedor !== 'ollama') {
      throw new Error('No hay API Key configurada para ' + proveedor);
    }

    if (proveedor === 'anthropic') {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await resp.json();
      if (!data.content) throw new Error(data.error?.message || 'Error de Anthropic');
      return data.content[0].text;
    } 
    
    if (proveedor === 'openai' || proveedor === 'grok') {
      const url = proveedor === 'openai' 
        ? 'https://api.openai.com/v1/chat/completions' 
        : 'https://api.x.ai/v1/chat/completions';
      
      const model = proveedor === 'openai' ? 'gpt-4-turbo-preview' : 'grok-1';

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });
      const data = await resp.json();
      if (!data.choices) throw new Error(data.error?.message || `Error de ${proveedor}`);
      return data.choices[0].message.content;
    }

    throw new Error('Proveedor no soportado: ' + proveedor);
  } catch (err) {
    console.error('Error llamando al LLM:', err);
    throw err;
  }
}

app.post('/api/ai/generate-exercise', authenticateToken, async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    console.log(`[Exercise Request] Topic: ${topic}, Diff: ${difficulty}`);
    
    // 1. Intentar obtener de la DB
    const dbRes = await pool.query(
      'SELECT * FROM exercises WHERE topic_id = $1 AND (difficulty = $2 OR difficulty IS NULL) ORDER BY RANDOM() LIMIT 1',
      [topic, difficulty || 'basico']
    );

    if (dbRes.rows.length > 0) {
      const ex = dbRes.rows[0];
      return res.json({
        id: ex.id,
        pregunta: ex.question,
        latex: ex.latex_content,
        opciones: ex.options,
        pasos: ex.solution_steps,
        theory: ex.theory
      });
    }

    // 2. Si no hay en la DB, intentar generar con IA solo si hay llaves
    const configRes = await pool.query('SELECT * FROM api_config ORDER BY prioridad DESC LIMIT 1');
    if (configRes.rows.length === 0 && !process.env.ANTHROPIC_API_KEY) {
      return res.status(404).json({ error: 'No hay ejercicios en la base de datos para este tema y no hay API Key configurada para generar uno nuevo.' });
    }
    const systemPrompt = `Eres un tutor de matemáticas experto del TEC de Costa Rica. 
    Tu objetivo es ayudar a estudiantes de Precálculo.
    Genera un ejercicio desafiante pero resoluble de ${topic} nivel ${difficulty}.
    Incluye explicaciones paso a paso de tipo WolframAlpha y trucos ("mañas") para resolverlo más rápido.
    Añade una sección de "theory" que resuma los conceptos necesarios para resolverlo.
    Responde ÚNICAMENTE en formato JSON:
    {
      "pregunta": "enunciado",
      "latex": "expresión principal",
      "opciones": ["correcta", "distractor1", "distractor2", "distractor3"],
      "pasos": [
        {"math": "latex del paso", "expl": "explicación detallada del porqué y mañas"}
      ],
      "theory": "resumen de conceptos clave"
    }`;

    const prompt = `Genera un nuevo ejercicio de ${topic}.`;
    const result = await callLLM(req.user.id, prompt, systemPrompt);
    const cleanJson = result.replace(/```json|```/g, '').trim();
    const generated = JSON.parse(cleanJson);

    // Guardar para futuros usos
    await pool.query(
      'INSERT INTO exercises (topic_id, question, latex_content, options, solution_steps, theory, difficulty) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [topic, generated.pregunta, generated.latex, JSON.stringify(generated.opciones), JSON.stringify(generated.pasos), generated.theory, difficulty || 'basico']
    );

    res.json(generated);
  } catch (err) {
    console.error('Error al generar ejercicio:', err);
    res.status(500).json({ error: 'Error al generar ejercicio con IA' });
  }
});

app.post('/api/ai/chat', authenticateToken, async (req, res) => {
  try {
    const { message, context } = req.body;
    const systemPrompt = `Eres el asistente de MathMaty. Ayudas al estudiante con sus dudas de matemáticas del TEC. 
    Contexto actual: ${JSON.stringify(context)}. Sé conciso, motivador y explica paso a paso.`;
    const result = await callLLM(req.user.id, message, systemPrompt);
    res.json({ response: result });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar chat' });
  }
});

// ADMIN: Banco de Ejercicios
app.get('/api/admin/exercises', authenticateToken, async (req, res) => {
  try {
    const { topic } = req.query;
    const q = topic
      ? 'SELECT id,topic_id,question,difficulty FROM exercises WHERE topic_id=$1 ORDER BY id DESC'
      : 'SELECT id,topic_id,question,difficulty FROM exercises ORDER BY topic_id,id DESC';
    const result = await pool.query(q, topic ? [topic] : []);
    res.json(result.rows);
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.post('/api/admin/exercises', authenticateToken, async (req, res) => {
  try {
    const { topic_id, question, latex, options, steps, theory } = req.body;
    await pool.query(
      'INSERT INTO exercises(topic_id,question,latex_content,options,solution_steps,theory) VALUES($1,$2,$3,$4,$5,$6)',
      [topic_id, question, latex, JSON.stringify(options), JSON.stringify(steps), theory||null]
    );
    res.json({ ok: true });
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.delete('/api/admin/exercises/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM exercises WHERE id=$1', [req.params.id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.listen(port, () => {
  console.log(`====================================================`);
  console.log(`⚔️  MATHMATY ENGINE ACTIVO // PUERTO LOCAL: ${port}  `);
  console.log(`====================================================`);
});