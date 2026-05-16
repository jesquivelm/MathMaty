--
-- PostgreSQL database dump
--

\restrict HDUVKF0gjm1tTbedlXaOOsO2hi4fl8SD7gqbiNKnefddl685IB3fFGmWF6wVrJL

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: api_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api_config (
    id integer NOT NULL,
    user_id integer,
    proveedor character varying(50) NOT NULL,
    api_key_encrypted text,
    activa boolean DEFAULT true,
    prioridad integer DEFAULT 0,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.api_config OWNER TO postgres;

--
-- Name: api_config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.api_config_id_seq OWNER TO postgres;

--
-- Name: api_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_config_id_seq OWNED BY public.api_config.id;


--
-- Name: badges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badges (
    id integer NOT NULL,
    codigo character varying(50) NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    icono character varying(200),
    tipo character varying(30) NOT NULL,
    criterio jsonb NOT NULL,
    xp_bonus integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT badges_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['racha'::character varying, 'precision'::character varying, 'velocidad'::character varying, 'volumen'::character varying, 'evento'::character varying, 'nivel'::character varying, 'especial'::character varying])::text[])))
);


ALTER TABLE public.badges OWNER TO postgres;

--
-- Name: badges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.badges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.badges_id_seq OWNER TO postgres;

--
-- Name: badges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.badges_id_seq OWNED BY public.badges.id;


--
-- Name: event_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_participants (
    id integer NOT NULL,
    event_id integer,
    user_id integer,
    puntuacion integer DEFAULT 0,
    ejercicios_completados integer DEFAULT 0,
    ejercicios_correctos integer DEFAULT 0,
    tiempo_total_seg integer DEFAULT 0,
    posicion_final integer,
    participo boolean DEFAULT false
);


ALTER TABLE public.event_participants OWNER TO postgres;

--
-- Name: event_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_participants_id_seq OWNER TO postgres;

--
-- Name: event_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_participants_id_seq OWNED BY public.event_participants.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    descripcion text,
    tipo character varying(30) NOT NULL,
    tema_id character varying(50),
    fecha_inicio timestamp without time zone NOT NULL,
    fecha_fin timestamp without time zone NOT NULL,
    xp_recompensa integer DEFAULT 0,
    badge_recompensa character varying(100),
    requisito_nivel integer DEFAULT 1,
    activo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT events_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['maraton'::character varying, 'duelo'::character varying, 'diario'::character varying, 'semanal'::character varying, 'especial'::character varying, 'boss'::character varying])::text[])))
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: exercise_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_history (
    id integer NOT NULL,
    user_id integer,
    exercise_id integer,
    topic_id character varying(50) NOT NULL,
    correcto boolean NOT NULL,
    tiempo_segundos integer,
    hp_antes integer,
    hp_despues integer,
    dificultad character varying(20),
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.exercise_history OWNER TO postgres;

--
-- Name: exercise_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercise_history_id_seq OWNER TO postgres;

--
-- Name: exercise_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercise_history_id_seq OWNED BY public.exercise_history.id;


--
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    id integer NOT NULL,
    topic_id character varying(50) NOT NULL,
    question text NOT NULL,
    latex_content text,
    options jsonb NOT NULL,
    solution_steps jsonb NOT NULL,
    difficulty character varying(20) DEFAULT 'basico'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    theory text,
    category character varying(50) DEFAULT 'ejercicio'::character varying,
    exam_year integer,
    source character varying(100)
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- Name: exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercises_id_seq OWNER TO postgres;

--
-- Name: exercises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercises_id_seq OWNED BY public.exercises.id;


--
-- Name: game_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_sessions (
    id integer NOT NULL,
    user_id integer,
    inicio timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fin timestamp without time zone,
    ejercicios_completados integer DEFAULT 0,
    ejercicios_correctos integer DEFAULT 0,
    xp_ganada integer DEFAULT 0,
    juego_descanso boolean DEFAULT false
);


ALTER TABLE public.game_sessions OWNER TO postgres;

--
-- Name: game_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_sessions_id_seq OWNER TO postgres;

--
-- Name: game_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_sessions_id_seq OWNED BY public.game_sessions.id;


--
-- Name: knowledge_library; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knowledge_library (
    id integer NOT NULL,
    topic_id character varying(50) NOT NULL,
    titulo character varying(200) NOT NULL,
    contenido text NOT NULL,
    ejemplos jsonb,
    manas text,
    nivel_desde integer DEFAULT 1,
    nivel_hasta integer DEFAULT 10,
    orden integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.knowledge_library OWNER TO postgres;

--
-- Name: knowledge_library_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knowledge_library_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knowledge_library_id_seq OWNER TO postgres;

--
-- Name: knowledge_library_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knowledge_library_id_seq OWNED BY public.knowledge_library.id;


--
-- Name: leaderboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leaderboard (
    id integer NOT NULL,
    user_id integer,
    xp_total integer DEFAULT 0,
    ejercicios_resueltos integer DEFAULT 0,
    tasa_exito numeric(5,2) DEFAULT 0,
    racha_maxima integer DEFAULT 0,
    posicion_global integer,
    ultima_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.leaderboard OWNER TO postgres;

--
-- Name: leaderboard_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leaderboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leaderboard_id_seq OWNER TO postgres;

--
-- Name: leaderboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leaderboard_id_seq OWNED BY public.leaderboard.id;


--
-- Name: missions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missions (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    topic_ids text[],
    exercise_count integer DEFAULT 10,
    time_limit_min integer,
    hp_reward integer DEFAULT 20,
    xp_reward integer DEFAULT 500,
    difficulty character varying(20) DEFAULT 'basico'::character varying,
    category character varying(50) DEFAULT 'mision'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.missions OWNER TO postgres;

--
-- Name: missions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.missions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.missions_id_seq OWNER TO postgres;

--
-- Name: missions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.missions_id_seq OWNED BY public.missions.id;


--
-- Name: parent_child_relations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parent_child_relations (
    id integer NOT NULL,
    parent_id integer,
    child_id integer
);


ALTER TABLE public.parent_child_relations OWNER TO postgres;

--
-- Name: parent_child_relations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parent_child_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parent_child_relations_id_seq OWNER TO postgres;

--
-- Name: parent_child_relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parent_child_relations_id_seq OWNED BY public.parent_child_relations.id;


--
-- Name: shop_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_items (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    tipo character varying(30) NOT NULL,
    precio_xp integer NOT NULL,
    icono character varying(200),
    efecto jsonb,
    stock integer DEFAULT '-1'::integer,
    nivel_requerido integer DEFAULT 1,
    activo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT shop_items_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['avatar'::character varying, 'tema'::character varying, 'powerup'::character varying, 'bonus'::character varying, 'especial'::character varying])::text[])))
);


ALTER TABLE public.shop_items OWNER TO postgres;

--
-- Name: shop_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shop_items_id_seq OWNER TO postgres;

--
-- Name: shop_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_items_id_seq OWNED BY public.shop_items.id;


--
-- Name: topic_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topic_content (
    id integer NOT NULL,
    topic_id character varying(50) NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    theory_html text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.topic_content OWNER TO postgres;

--
-- Name: topic_content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topic_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topic_content_id_seq OWNER TO postgres;

--
-- Name: topic_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topic_content_id_seq OWNED BY public.topic_content.id;


--
-- Name: topic_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topic_progress (
    id integer NOT NULL,
    user_id integer,
    topic_id character varying(50) NOT NULL,
    ejercicios_completados integer DEFAULT 0,
    ejercicios_correctos integer DEFAULT 0,
    fallos_acumulados integer DEFAULT 0,
    ultima_practica timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.topic_progress OWNER TO postgres;

--
-- Name: topic_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topic_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topic_progress_id_seq OWNER TO postgres;

--
-- Name: topic_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topic_progress_id_seq OWNED BY public.topic_progress.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    parcial_num integer NOT NULL,
    description text
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: user_badges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_badges (
    id integer NOT NULL,
    user_id integer,
    badge_id integer,
    fecha_obtenido timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_badges OWNER TO postgres;

--
-- Name: user_badges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_badges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_badges_id_seq OWNER TO postgres;

--
-- Name: user_badges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_badges_id_seq OWNED BY public.user_badges.id;


--
-- Name: user_inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_inventory (
    id integer NOT NULL,
    user_id integer,
    item_id integer,
    cantidad integer DEFAULT 1,
    fecha_adquisicion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_inventory OWNER TO postgres;

--
-- Name: user_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_inventory_id_seq OWNER TO postgres;

--
-- Name: user_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_inventory_id_seq OWNED BY public.user_inventory.id;


--
-- Name: user_missions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_missions (
    id integer NOT NULL,
    user_id integer,
    mission_id integer,
    status character varying(20) DEFAULT 'pendiente'::character varying,
    score integer DEFAULT 0,
    hp_remaining integer,
    completed_at timestamp without time zone,
    started_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_missions OWNER TO postgres;

--
-- Name: user_missions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_missions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_missions_id_seq OWNER TO postgres;

--
-- Name: user_missions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_missions_id_seq OWNED BY public.user_missions.id;


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_progress (
    id integer NOT NULL,
    user_id integer,
    exercise_id integer,
    is_correct boolean,
    xp_earned integer DEFAULT 0,
    attempt_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_progress OWNER TO postgres;

--
-- Name: user_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_progress_id_seq OWNER TO postgres;

--
-- Name: user_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_progress_id_seq OWNED BY public.user_progress.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100),
    rol character varying(20) NOT NULL,
    xp integer DEFAULT 0,
    nivel integer DEFAULT 1,
    hp integer DEFAULT 100,
    racha_actual integer DEFAULT 0,
    racha_maxima integer DEFAULT 0,
    tiempo_practica integer DEFAULT 0,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true,
    CONSTRAINT users_rol_check CHECK (((rol)::text = ANY ((ARRAY['estudiante'::character varying, 'padre'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: xp_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.xp_history (
    id integer NOT NULL,
    user_id integer,
    cantidad integer NOT NULL,
    fuente character varying(50) NOT NULL,
    referencia_id integer,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.xp_history OWNER TO postgres;

--
-- Name: xp_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.xp_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.xp_history_id_seq OWNER TO postgres;

--
-- Name: xp_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.xp_history_id_seq OWNED BY public.xp_history.id;


--
-- Name: api_config id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_config ALTER COLUMN id SET DEFAULT nextval('public.api_config_id_seq'::regclass);


--
-- Name: badges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges ALTER COLUMN id SET DEFAULT nextval('public.badges_id_seq'::regclass);


--
-- Name: event_participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants ALTER COLUMN id SET DEFAULT nextval('public.event_participants_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: exercise_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history ALTER COLUMN id SET DEFAULT nextval('public.exercise_history_id_seq'::regclass);


--
-- Name: exercises id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises ALTER COLUMN id SET DEFAULT nextval('public.exercises_id_seq'::regclass);


--
-- Name: game_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_sessions ALTER COLUMN id SET DEFAULT nextval('public.game_sessions_id_seq'::regclass);


--
-- Name: knowledge_library id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knowledge_library ALTER COLUMN id SET DEFAULT nextval('public.knowledge_library_id_seq'::regclass);


--
-- Name: leaderboard id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaderboard ALTER COLUMN id SET DEFAULT nextval('public.leaderboard_id_seq'::regclass);


--
-- Name: missions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions ALTER COLUMN id SET DEFAULT nextval('public.missions_id_seq'::regclass);


--
-- Name: parent_child_relations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_child_relations ALTER COLUMN id SET DEFAULT nextval('public.parent_child_relations_id_seq'::regclass);


--
-- Name: shop_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_items ALTER COLUMN id SET DEFAULT nextval('public.shop_items_id_seq'::regclass);


--
-- Name: topic_content id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_content ALTER COLUMN id SET DEFAULT nextval('public.topic_content_id_seq'::regclass);


--
-- Name: topic_progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_progress ALTER COLUMN id SET DEFAULT nextval('public.topic_progress_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: user_badges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges ALTER COLUMN id SET DEFAULT nextval('public.user_badges_id_seq'::regclass);


--
-- Name: user_inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory ALTER COLUMN id SET DEFAULT nextval('public.user_inventory_id_seq'::regclass);


--
-- Name: user_missions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_missions ALTER COLUMN id SET DEFAULT nextval('public.user_missions_id_seq'::regclass);


--
-- Name: user_progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress ALTER COLUMN id SET DEFAULT nextval('public.user_progress_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: xp_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.xp_history ALTER COLUMN id SET DEFAULT nextval('public.xp_history_id_seq'::regclass);


--
-- Data for Name: api_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api_config (id, user_id, proveedor, api_key_encrypted, activa, prioridad, fecha_creacion) FROM stdin;
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badges (id, codigo, nombre, descripcion, icono, tipo, criterio, xp_bonus, created_at) FROM stdin;
1	racha_5	Racha de Fuego	Completa 5 ejercicios seguidos correctamente	\N	racha	{"tipo": "racha", "cantidad": 5}	100	2026-05-14 11:14:06.433127
2	racha_10	Imparable	Completa 10 ejercicios seguidos correctamente	\N	racha	{"tipo": "racha", "cantidad": 10}	300	2026-05-14 11:14:06.433127
3	racha_25	Leyenda Viva	Completa 25 ejercicios seguidos correctamente	\N	racha	{"tipo": "racha", "cantidad": 25}	1000	2026-05-14 11:14:06.433127
4	precision_100	Perfecto	Obtén 100% de precisión en una sesión de 10+ ejercicios	\N	precision	{"tipo": "precision", "minimo": 10, "porcentaje": 100}	500	2026-05-14 11:14:06.433127
5	volumen_50	Dedicación	Resuelve 50 ejercicios en total	\N	volumen	{"tipo": "volumen", "cantidad": 50}	200	2026-05-14 11:14:06.433127
6	volumen_100	Math Warrior	Resuelve 100 ejercicios en total	\N	volumen	{"tipo": "volumen", "cantidad": 100}	500	2026-05-14 11:14:06.433127
7	volumen_500	Math Legend	Resuelve 500 ejercicios en total	\N	volumen	{"tipo": "volumen", "cantidad": 500}	2500	2026-05-14 11:14:06.433127
8	velocidad_rapido	Rayo Matemático	Resuelve un ejercicio en menos de 10 segundos	\N	velocidad	{"tipo": "velocidad", "segundos": 10}	150	2026-05-14 11:14:06.433127
9	nivel_5	Ascenso	Alcanza el nivel 5	\N	nivel	{"tipo": "nivel", "nivel": 5}	300	2026-05-14 11:14:06.433127
10	nivel_10	Maestro	Alcanza el nivel 10	\N	nivel	{"tipo": "nivel", "nivel": 10}	1000	2026-05-14 11:14:06.433127
11	nivel_20	Gran Maestro	Alcanza el nivel 20	\N	nivel	{"tipo": "nivel", "nivel": 20}	5000	2026-05-14 11:14:06.433127
12	evento_first	Competidor	Participa en tu primer evento	\N	evento	{"tipo": "evento", "eventos": 1}	100	2026-05-14 11:14:06.433127
13	evento_win	Campeón	Gana un evento (quedar en top 3)	\N	evento	{"tipo": "evento_win", "eventos": 1}	1000	2026-05-14 11:14:06.433127
\.


--
-- Data for Name: event_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_participants (id, event_id, user_id, puntuacion, ejercicios_completados, ejercicios_correctos, tiempo_total_seg, posicion_final, participo) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, titulo, descripcion, tipo, tema_id, fecha_inicio, fecha_fin, xp_recompensa, badge_recompensa, requisito_nivel, activo, created_at) FROM stdin;
\.


--
-- Data for Name: exercise_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_history (id, user_id, exercise_id, topic_id, correcto, tiempo_segundos, hp_antes, hp_despues, dificultad, "timestamp") FROM stdin;
1	4	\N	factorizacion	t	30	100	100	basico	2026-05-13 18:44:17.375532
2	4	\N	factorizacion	t	30	100	100	basico	2026-05-13 18:44:31.074423
3	4	\N	factorizacion	f	30	80	80	basico	2026-05-13 18:44:35.102319
4	4	\N	factorizacion	f	30	60	60	basico	2026-05-13 18:45:24.213205
5	4	\N	factorizacion	f	30	40	40	basico	2026-05-13 18:45:29.229665
6	4	\N	factorizacion	f	30	20	20	basico	2026-05-13 18:45:32.373726
7	4	\N	factorizacion	f	30	0	0	basico	2026-05-13 18:45:35.089174
8	4	\N	factorizacion	t	30	5	5	basico	2026-05-13 18:45:38.992262
9	4	\N	factorizacion	t	30	10	10	basico	2026-05-13 18:45:43.104623
10	4	\N	factorizacion	f	30	0	0	basico	2026-05-13 18:45:45.738632
\.


--
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercises (id, topic_id, question, latex_content, options, solution_steps, difficulty, created_at, theory, category, exam_year, source) FROM stdin;
122	factorizacion	Factorice: x² - 16	x^2 - 16	["(x+4)(x-4)", "(x+2)(x-8)", "(x-4)²", "x(x-16)"]	[{"expl": "Diferencia de cuadrados: a=x, b=4", "math": "a^2-b^2=(a+b)(a-b)"}, {"expl": "Resultado final", "math": "(x+4)(x-4)"}]	basico	2026-05-13 18:19:18.067996	Diferencia de cuadrados: a²-b²=(a+b)(a-b)	ejercicio	\N	\N
123	factorizacion	Factorice: x² + 6x + 9	x^2+6x+9	["(x+3)²", "(x+9)(x+1)", "(x+6)(x+3)", "(x-3)²"]	[{"expl": "Cuadrado perfecto: a=x, b=3", "math": "x^2+2(3)x+3^2"}, {"expl": "Aplicar fórmula (a+b)²", "math": "(x+3)^2"}]	basico	2026-05-13 18:19:18.085346	Trinomio cuadrado perfecto: a²+2ab+b²=(a+b)²	ejercicio	\N	\N
124	factorizacion	Factorice completamente: 2x² - 8	2x^2-8	["2(x+2)(x-2)", "2(x-2)²", "(2x+4)(x-2)", "2(x²-4)"]	[{"expl": "Factor común 2", "math": "2(x^2-4)"}, {"expl": "Diferencia de cuadrados", "math": "2(x+2)(x-2)"}]	basico	2026-05-13 18:19:18.086171	Primero factor común, luego diferencia de cuadrados	ejercicio	\N	\N
125	factorizacion	Factorice: x² - 5x + 6	x^2-5x+6	["(x-2)(x-3)", "(x+2)(x+3)", "(x-6)(x+1)", "(x-1)(x-6)"]	[{"expl": "Factores de 6 que sumen -5: -2 y -3", "math": "\\\\text{Buscar: }a+b=-5, ab=6"}, {"expl": "Resultado", "math": "(x-2)(x-3)"}]	basico	2026-05-13 18:19:18.086709	Para trinomio x²+bx+c buscar dos números que sumen b y multipliquen c	ejercicio	\N	\N
126	factorizacion	Factorice: 3x² + 9x	3x^2+9x	["3x(x+3)", "3(x²+3x)", "x(3x+9)", "3x²(1+3)"]	[{"expl": "Factor común: 3x", "math": "3x(x+3)"}]	basico	2026-05-13 18:19:18.087161	Factor común: sacar el máximo factor común de todos los términos	ejercicio	\N	\N
127	factorizacion	Factorice: 4x² - 12x + 9	4x^2-12x+9	["(2x-3)²", "(4x-9)(x-1)", "(2x+3)²", "(2x-3)(2x+3)"]	[{"expl": "Reconocer cuadrado perfecto a=2x, b=3", "math": "(2x)^2 - 2(2x)(3) + 3^2"}, {"expl": "Resultado", "math": "(2x-3)^2"}]	basico	2026-05-13 18:19:18.087551	Trinomio cuadrado perfecto: a²-2ab+b²=(a-b)²	ejercicio	\N	\N
128	factorizacion	Factorice: x³ - 8	x^3-8	["(x-2)(x²+2x+4)", "(x-2)³", "(x-8)(x²+1)", "(x-2)(x²-4)"]	[{"expl": "Diferencia de cubos: a=x, b=2", "math": "a^3-b^3=(a-b)(a^2+ab+b^2)"}, {"expl": "Resultado", "math": "(x-2)(x^2+2x+4)"}]	basico	2026-05-13 18:19:18.087936	Diferencia de cubos: a³-b³=(a-b)(a²+ab+b²)	ejercicio	\N	\N
129	factorizacion	Factorice: x² + 8x + 16	x^2+8x+16	["(x+4)²", "(x+2)(x+8)", "(x+16)(x+1)", "(x+4)(x-4)"]	[{"expl": "Cuadrado perfecto con b=4", "math": "(x+4)^2"}]	basico	2026-05-13 18:19:18.088338	Reconocer (a+b)²=a²+2ab+b²	ejercicio	\N	\N
130	factorizacion	Factorice: 9x² - 25	9x^2-25	["(3x+5)(3x-5)", "(9x+5)(x-5)", "(3x-5)²", "3(3x²-25)"]	[{"expl": "Diferencia de cuadrados: a=3x, b=5", "math": "(3x)^2 - 5^2"}, {"expl": "Resultado", "math": "(3x+5)(3x-5)"}]	basico	2026-05-13 18:19:18.088768	Diferencia de cuadrados	ejercicio	\N	\N
131	factorizacion	Factorice: 6x² + 7x + 2	6x^2+7x+2	["(2x+1)(3x+2)", "(6x+1)(x+2)", "(2x+2)(3x+1)", "(3x-1)(2x-2)"]	[{"expl": "Método ac: 3+4=7, 3·4=12", "math": "ac=12, b=7: \\\\text{ buscar }3\\\\cdot4"}, {"expl": "Agrupar", "math": "6x^2+3x+4x+2 = 3x(2x+1)+2(2x+1)"}, {"expl": "Factor común (2x+1)", "math": "(3x+2)(2x+1)"}]	basico	2026-05-13 18:19:18.089255	Factorización por agrupación (método ac)	ejercicio	\N	\N
132	factorizacion	Factorice: x⁴ - 1	x^4-1	["(x²+1)(x+1)(x-1)", "(x²-1)²", "(x²+1)²", "(x-1)(x+1)(x²-1)"]	[{"expl": "Diferencia de cuadrados", "math": "(x^2+1)(x^2-1)"}, {"expl": "Factorizar x²-1 de nuevo", "math": "(x^2+1)(x+1)(x-1)"}]	basico	2026-05-13 18:19:18.089633	Aplicar diferencia de cuadrados en cascada	ejercicio	\N	\N
133	factorizacion	Factorice: 2x³ + 6x² - 8x	2x^3+6x^2-8x	["2x(x+4)(x-1)", "2x(x-4)(x+1)", "2(x³+3x²-4x)", "x(2x²+6x-8)"]	[{"expl": "Factor común 2x", "math": "2x(x^2+3x-4)"}, {"expl": "Factorizar trinomio: buscar 4 y -1", "math": "2x(x+4)(x-1)"}]	basico	2026-05-13 18:19:18.089981	Siempre extraer el factor común antes de otros métodos	ejercicio	\N	\N
134	factorizacion	Factorice: 8x³ + 27	8x^3+27	["(2x+3)(4x²-6x+9)", "(2x+3)³", "(2x-3)(4x²+6x+9)", "(8x+27)(x-1)"]	[{"expl": "Suma de cubos: a=2x, b=3", "math": "(2x)^3+3^3"}, {"expl": "a³+b³=(a+b)(a²-ab+b²)", "math": "(2x+3)(4x^2-6x+9)"}]	basico	2026-05-13 18:19:18.090297	Suma de cubos: a³+b³=(a+b)(a²-ab+b²)	ejercicio	\N	\N
135	factorizacion	Simplifique: (x²-4)/(x+2)	\\frac{x^2-4}{x+2}	["x-2", "x+2", "x²-2", "(x-2)(x+2)"]	[{"expl": "Factorizar numerador", "math": "\\\\frac{(x+2)(x-2)}{x+2}"}, {"expl": "Cancelar (x+2), con x≠-2", "math": "x-2"}]	basico	2026-05-13 18:19:18.090636	Simplificación de fracciones algebraicas	ejercicio	\N	\N
136	factorizacion	Factorice: ax + ay - bx - by	ax+ay-bx-by	["(a-b)(x+y)", "(a+b)(x-y)", "a(x+y)-b(x+y)", "(ax+ay)(bx+by)"]	[{"expl": "Agrupar y sacar factor común", "math": "a(x+y) - b(x+y)"}, {"expl": "Factor común (x+y)", "math": "(a-b)(x+y)"}]	basico	2026-05-13 18:19:18.090978	Factorización por agrupación de términos	ejercicio	\N	\N
137	ecuaciones	Resuelva: 2x + 3 = 11	2x+3=11	["x=4", "x=7", "x=3", "x=5"]	[{"expl": "Restar 3 a ambos lados", "math": "2x=8"}, {"expl": "Dividir por 2", "math": "x=4"}]	basico	2026-05-13 18:19:18.091307	Propiedad de igualdad: lo que se hace a un lado se hace al otro	ejercicio	\N	\N
138	ecuaciones	Resuelva: x/3 + 2 = 5	\\frac{x}{3}+2=5	["x=9", "x=3", "x=21", "x=1"]	[{"expl": "Restar 2", "math": "x/3=3"}, {"expl": "Multiplicar por 3", "math": "x=9"}]	basico	2026-05-13 18:19:18.091649	Despejar la variable paso a paso	ejercicio	\N	\N
139	ecuaciones	Resuelva: 3(x-2) = 9	3(x-2)=9	["x=5", "x=3", "x=7", "x=1"]	[{"expl": "Distributiva", "math": "3x-6=9"}, {"expl": "Suma 6, divide por 3", "math": "x=5"}]	basico	2026-05-13 18:19:18.091996	Primero aplicar distributiva, luego despejar	ejercicio	\N	\N
140	ecuaciones	Resuelva: x² = 25	x^2=25	["x=±5", "x=5", "x=25", "x=12.5"]	[{"expl": "Raíz cuadrada de ambos lados", "math": "x=\\\\pm\\\\sqrt{25}"}, {"expl": "Dos soluciones", "math": "x=5 \\\\text{ o } x=-5"}]	basico	2026-05-13 18:19:18.092343	Ecuación cuadrática simple: recordar las dos soluciones	ejercicio	\N	\N
141	ecuaciones	Resuelva: 2x² - 8 = 0	2x^2-8=0	["x=±2", "x=2", "x=4", "x=±4"]	[{"expl": "Sumar 8, dividir por 2", "math": "x^2=4"}, {"expl": "Raíz cuadrada", "math": "x=\\\\pm 2"}]	basico	2026-05-13 18:19:18.092646	Aislar x² antes de aplicar raíz	ejercicio	\N	\N
142	ecuaciones	Resuelva por fórmula cuadrática: x² - 5x + 6 = 0	x^2-5x+6=0	["x=2 o x=3", "x=1 o x=6", "x=-2 o x=-3", "x=5 o x=1"]	[{"expl": "Fórmula: x=(-b±√(b²-4ac))/2a con a=1,b=-5,c=6", "math": "x=\\\\frac{5\\\\pm\\\\sqrt{25-24}}{2}"}, {"expl": "Soluciones", "math": "x=3 \\\\text{ o } x=2"}]	basico	2026-05-13 18:19:18.093023	Fórmula cuadrática: x=(-b±√(b²-4ac))/2a	ejercicio	\N	\N
143	ecuaciones	Resuelva: |x - 3| = 5	|x-3|=5	["x=8 o x=-2", "x=8", "x=2 o x=-8", "x=-2"]	[{"expl": "Caso positivo", "math": "x-3=5 \\\\Rightarrow x=8"}, {"expl": "Caso negativo", "math": "x-3=-5 \\\\Rightarrow x=-2"}]	basico	2026-05-13 18:19:18.093379	Valor absoluto genera dos ecuaciones	ejercicio	\N	\N
144	ecuaciones	Resuelva: log(x) = 2	\\log(x)=2	["x=100", "x=20", "x=10²", "x=1000"]	[{"expl": "Definición de logaritmo base 10", "math": "x=10^2"}, {"expl": "Resultado", "math": "x=100"}]	basico	2026-05-13 18:19:18.093798	log(x)=n significa x=10ⁿ	ejercicio	\N	\N
145	ecuaciones	Resuelva: e^x = 7	e^x=7	["x=ln(7)", "x=log(7)", "x=7/e", "x=e^7"]	[{"expl": "Aplicar ln a ambos lados", "math": "x=\\\\ln(7)"}]	basico	2026-05-13 18:19:18.09418	Para despejar e^x aplicar logaritmo natural	ejercicio	\N	\N
146	ecuaciones	Resuelva el sistema: x+y=5, x-y=1	x+y=5, \\quad x-y=1	["x=3, y=2", "x=4, y=1", "x=2, y=3", "x=5, y=0"]	[{"expl": "Sumar las ecuaciones", "math": "2x=6 \\\\Rightarrow x=3"}, {"expl": "Sustituir x=3", "math": "y=5-3=2"}]	basico	2026-05-13 18:19:18.094601	Método de eliminación: sumar/restar ecuaciones para eliminar una variable	ejercicio	\N	\N
147	inecuaciones	Resuelva: 2x - 3 > 5	2x-3>5	["x>4", "x<4", "x>1", "x>8"]	[{"expl": "Sumar 3", "math": "2x>8"}, {"expl": "Dividir por 2 (positivo, no cambia signo)", "math": "x>4"}]	basico	2026-05-13 18:19:18.094962	Al dividir por negativo el signo de la inecuación se invierte	ejercicio	\N	\N
148	inecuaciones	Resuelva: -3x ≤ 9	-3x \\leq 9	["x≥-3", "x≤-3", "x≤3", "x≥3"]	[{"expl": "Dividir por -3: el signo ≤ se convierte en ≥", "math": "x \\\\geq -3"}]	basico	2026-05-13 18:19:18.095335	Al dividir por un número negativo, el signo de desigualdad se invierte	ejercicio	\N	\N
149	inecuaciones	Resuelva: x² < 9	x^2<9	["-3<x<3", "x>3", "x<-3", "x>-3"]	[{"expl": "Raíz cuadrada de la inecuación", "math": "|x|<3"}, {"expl": "Solución intervalo", "math": "-3<x<3"}]	basico	2026-05-13 18:19:18.095767	x²<a² equivale a |x|<a, es decir -a<x<a	ejercicio	\N	\N
150	inecuaciones	Resuelva: (x-1)(x+3) > 0	(x-1)(x+3)>0	["x<-3 o x>1", "x>1", "−3<x<1", "x<1"]	[{"expl": "Igualar cada factor a cero", "math": "\\\\text{Puntos críticos: }x=1, x=-3"}, {"expl": "Analizar signos del producto en cada intervalo", "math": "x<-3 \\\\text{ o } x>1"}]	basico	2026-05-13 18:19:18.096197	Para inecuaciones con producto, analizar el signo en cada intervalo	ejercicio	\N	\N
151	inecuaciones	Resuelva: |2x + 1| ≤ 5	|2x+1|\\leq 5	["-3≤x≤2", "x≤2", "x≥-3", "|x|≤2"]	[{"expl": "Definición de valor absoluto", "math": "-5 \\\\leq 2x+1 \\\\leq 5"}, {"expl": "Restar 1 y dividir por 2", "math": "-3 \\\\leq x \\\\leq 2"}]	basico	2026-05-13 18:19:18.096604	|f(x)|≤a equivale a -a≤f(x)≤a	ejercicio	\N	\N
152	exp-log	Simplifique: 2³ × 2⁴	2^3 \\times 2^4	["2⁷", "2¹²", "4⁷", "2⁷⁴"]	[{"expl": "Propiedad: aᵐ×aⁿ=aᵐ⁺ⁿ", "math": "2^{3+4}=2^7"}]	basico	2026-05-13 18:19:18.096954	Producto de potencias con igual base: sumar exponentes	ejercicio	\N	\N
153	exp-log	Simplifique: (3²)³	(3^2)^3	["3⁶", "3⁵", "9³", "3²³"]	[{"expl": "Potencia de potencia: multiplicar exponentes", "math": "3^{2 \\\\times 3}=3^6"}]	basico	2026-05-13 18:19:18.0973	Potencia de potencia: (aᵐ)ⁿ=aᵐⁿ	ejercicio	\N	\N
154	exp-log	Evalúe: log₂(32)	\\log_2(32)	["5", "4", "6", "16"]	[{"expl": "Buscar x tal que 2^x=32", "math": "2^x=32=2^5"}, {"expl": "Resultado", "math": "x=5"}]	basico	2026-05-13 18:19:18.097691	Definición de logaritmo: log_b(x)=n ↔ bⁿ=x	ejercicio	\N	\N
28	factorizacion	Sume los polinomios: (4x - 3 + 8y) + (3x - y + 1)	(4x - 3 + 8y) + (3x - y + 1)	["7x + 7y - 2", "7x + 9y - 4", "x + 7y - 2", "7x + 7y + 2"]	[{"expl": "Agrupar semejantes.", "math": "(4x + 3x) + (8y - y) + (-3 + 1)"}, {"expl": "Sumar coeficientes.", "math": "7x + 7y - 2"}]	basico	2026-05-13 17:27:15.950914	Agrupación de términos semejantes.	ejercicio	\N	\N
29	ecuaciones	Resuelva: 3x + 5 = 17	3x + 5 = 17	["x = 4", "x = 3", "x = 6", "x = 2"]	[{"expl": "Restar 5.", "math": "3x = 12"}, {"expl": "Dividir por 3.", "math": "x = 4"}]	basico	2026-05-13 17:27:15.961271	Despeje de ecuaciones lineales.	ejercicio	\N	\N
30	calculo	Calcule el límite: lim_{x->0} (8x + sen(7x)) / (4x - sen(x))	\\lim_{x \to 0} \frac{8x + sin(7x)}{4x - sin(x)}	["5", "3", "7", "1"]	[{"expl": "Aplicar regla de LHôpital.", "math": "\\text{LHopital}: lim \\frac{8+7cos(7x)}{4-cos(x)}"}, {"expl": "Evaluar en x=0.", "math": "\\frac{8+7}{4-1} = 5"}]	basico	2026-05-13 17:27:15.962131	Regla de LHôpital para límites indeterminados 0/0.	ejercicio	\N	\N
31	calculo	Determine la derivada de f(x) = sqrt(x^2 + 5)	f(x) = sqrt{x^2 + 5}	["x / sqrt{x^2+5}", "1 / sqrt{x^2+5}", "2x / sqrt{x^2+5}", "x"]	[{"expl": "Regla de la cadena.", "math": "f'(x) = \\frac{1}{2sqrt{x^2+5}} cdot 2x"}, {"expl": "Simplificar.", "math": "\\frac{x}{sqrt{x^2+5}}"}]	basico	2026-05-13 17:27:15.962802	Derivada de una función compuesta.	ejercicio	\N	\N
155	exp-log	Expanda: log(xy/z)	\\log\\left(\\frac{xy}{z}\\right)	["log x+log y-log z", "log x·log y/log z", "log(x+y-z)", "log x-log y+log z"]	[{"expl": "Propiedad producto y cociente", "math": "\\\\log x + \\\\log y - \\\\log z"}]	basico	2026-05-13 18:19:18.098091	log(xy)=log x+log y; log(x/y)=log x-log y	ejercicio	\N	\N
156	exp-log	Resuelva: 2^(x+1) = 16	2^{x+1}=16	["x=3", "x=4", "x=2", "x=5"]	[{"expl": "16=2⁴", "math": "2^{x+1}=2^4"}, {"expl": "Igualar exponentes", "math": "x+1=4 \\\\Rightarrow x=3"}]	basico	2026-05-13 18:19:18.098427	Cuando las bases son iguales, igualar los exponentes	ejercicio	\N	\N
157	exp-log	Simplifique: log(100) + log(10)	\\log(100)+\\log(10)	["3", "4", "10", "2.1"]	[{"expl": "log(100)=2, log(10)=1", "math": "2+1=3"}]	basico	2026-05-13 18:19:18.098747	Logaritmos en base 10 de potencias de 10	ejercicio	\N	\N
158	trigonometria	¿Cuánto vale sen(30°)?	\\sin(30°)	["1/2", "√2/2", "√3/2", "1"]	[{"expl": "Valor exacto: ángulo 30° en el triángulo especial 30-60-90", "math": "\\\\sin(30°)=\\\\frac{1}{2}"}]	basico	2026-05-13 18:19:18.099076	Ángulos especiales: sen(30°)=1/2, cos(30°)=√3/2	ejercicio	\N	\N
159	trigonometria	¿Cuánto vale cos(60°)?	\\cos(60°)	["1/2", "√3/2", "√2/2", "0"]	[{"expl": "Ángulo especial 60°", "math": "\\\\cos(60°)=\\\\frac{1}{2}"}]	basico	2026-05-13 18:19:18.099388	cos(60°)=1/2, comparte valor con sen(30°)	ejercicio	\N	\N
160	trigonometria	Simplifique: sen²(x) + cos²(x)	\\sin^2(x)+\\cos^2(x)	["1", "0", "2", "sen(2x)"]	[{"expl": "Identidad pitagórica fundamental", "math": "=1"}]	basico	2026-05-13 18:19:18.099698	Identidad pitagórica: sen²(x)+cos²(x)=1 siempre	ejercicio	\N	\N
161	trigonometria	Si sen(x)=3/5, ¿cuánto vale cos(x) en el primer cuadrante?	\\sin(x)=\\frac{3}{5}	["4/5", "5/3", "3/4", "2/5"]	[{"expl": "Identidad pitagórica", "math": "\\\\cos^2(x)=1-9/25=16/25"}, {"expl": "Raíz positiva (1er cuadrante)", "math": "\\\\cos(x)=4/5"}]	basico	2026-05-13 18:19:18.100068	Usar identidad pitagórica para encontrar la función complementaria	ejercicio	\N	\N
162	trigonometria	¿Cuánto vale tan(45°)?	\\tan(45°)	["1", "√2", "√3/2", "0"]	[{"expl": "Definición de tangente", "math": "\\\\tan(45°)=\\\\frac{\\\\sin(45°)}{\\\\cos(45°)}=\\\\frac{\\\\sqrt{2}/2}{\\\\sqrt{2}/2}=1"}]	basico	2026-05-13 18:19:18.100422	tan(x)=sen(x)/cos(x). Para 45°, sen=cos=√2/2	ejercicio	\N	\N
163	calculo	Calcule: lim_{x→2} (x² - 4)/(x - 2)	\\lim_{x \\to 2} \\frac{x^2-4}{x-2}	["4", "0", "2", "indefinido"]	[{"expl": "Factorizar numerador", "math": "\\\\lim_{x\\\\to 2}\\\\frac{(x+2)(x-2)}{x-2}"}, {"expl": "Cancelar (x-2) y evaluar", "math": "\\\\lim_{x\\\\to 2}(x+2)=4"}]	basico	2026-05-13 18:19:18.100764	Límite indeterminado 0/0: factorizar y cancelar	ejercicio	\N	\N
164	calculo	Derive: f(x) = x³ + 2x	f(x)=x^3+2x	["f'(x)=3x²+2", "f'(x)=3x+2", "f'(x)=x²+2", "f'(x)=3x²"]	[{"expl": "Regla de la potencia: d/dx(xⁿ)=nxⁿ⁻¹", "math": "f'(x)=3x^2+2"}]	basico	2026-05-13 18:19:18.10135	Regla de la potencia y derivada de suma	ejercicio	\N	\N
165	calculo	Derive: f(x) = sen(x)	f(x)=\\sin(x)	["f'(x)=cos(x)", "f'(x)=-cos(x)", "f'(x)=-sen(x)", "f'(x)=1"]	[{"expl": "Derivada del seno es el coseno", "math": "f'(x)=\\\\cos(x)"}]	basico	2026-05-13 18:19:18.101759	Derivadas trigonométricas: d/dx(sen x)=cos x	ejercicio	\N	\N
166	calculo	Calcule la integral: ∫2x dx	\\int 2x\\,dx	["x²+C", "2x²+C", "x+C", "2+C"]	[{"expl": "Regla de la potencia inversa", "math": "\\\\int 2x\\\\,dx = \\\\frac{2x^2}{2}+C"}, {"expl": "Simplificar", "math": "x^2+C"}]	basico	2026-05-13 18:19:18.102199	∫xⁿdx = xⁿ⁺¹/(n+1)+C	ejercicio	\N	\N
167	calculo	Calcule: lim_{x→∞} 1/x	\\lim_{x \\to \\infty} \\frac{1}{x}	["0", "1", "∞", "indefinido"]	[{"expl": "El denominador crece sin límite, el cociente se acerca a 0", "math": "\\\\lim_{x\\\\to\\\\infty}\\\\frac{1}{x}=0"}]	basico	2026-05-13 18:19:18.102576	Límites al infinito: 1/x→0 cuando x→∞	ejercicio	\N	\N
168	calculo	Calcule la integral: ∫cos(x) dx	\\int \\cos(x)\\,dx	["sen(x)+C", "-sen(x)+C", "cos(x)+C", "tan(x)+C"]	[{"expl": "Integral del coseno es el seno", "math": "\\\\int \\\\cos(x)\\\\,dx = \\\\sin(x)+C"}]	basico	2026-05-13 18:19:18.102928	Integrales trigonométricas básicas: ∫cos(x)dx=sen(x)+C	ejercicio	\N	\N
169	fracciones-alg	Simplifique: (x²-1)/(x-1)	\\frac{x^2-1}{x-1}	["x+1", "x-1", "x²+1", "1"]	[{"expl": "Factorizar diferencia de cuadrados y cancelar", "math": "\\\\frac{(x+1)(x-1)}{x-1}=x+1"}]	basico	2026-05-13 18:19:18.103246	Simplificación: factorizar y cancelar factores comunes	ejercicio	\N	\N
170	fracciones-alg	Sume: 1/x + 1/y	\\frac{1}{x}+\\frac{1}{y}	["(x+y)/(xy)", "2/(x+y)", "(x+y)/x", "1/(xy)"]	[{"expl": "MCM = xy, equivalente a (x+y)/xy", "math": "\\\\frac{y+x}{xy}"}]	basico	2026-05-13 18:19:18.103546	Para sumar fracciones, encontrar el MCM de los denominadores	ejercicio	\N	\N
171	fracciones-alg	Simplifique: (x²-9)/(x+3)	\\frac{x^2-9}{x+3}	["x-3", "x+3", "x²-3", "3-x"]	[{"expl": "Diferencia de cuadrados y cancelación", "math": "\\\\frac{(x+3)(x-3)}{x+3}=x-3"}]	basico	2026-05-13 18:19:18.103897	Factorizar numerador para simplificar	ejercicio	\N	\N
172	fracciones-alg	Multiplique: (x/2) × (4/x)	\\frac{x}{2} \\times \\frac{4}{x}	["2", "2x", "4/x", "x/2"]	[{"expl": "Multiplicar numeradores y denominadores, cancelar x", "math": "\\\\frac{x \\\\cdot 4}{2 \\\\cdot x}=\\\\frac{4}{2}=2"}]	basico	2026-05-13 18:19:18.104256	Multiplicación de fracciones: multiplicar cruzado y simplificar	ejercicio	\N	\N
173	fracciones-alg	Divida: (x/3) ÷ (x²/6)	\\frac{x}{3} \\div \\frac{x^2}{6}	["2/x", "x/2", "2x", "1/x"]	[{"expl": "Multiplicar por el recíproco", "math": "\\\\frac{x}{3} \\\\times \\\\frac{6}{x^2}=\\\\frac{6x}{3x^2}=\\\\frac{2}{x}"}]	basico	2026-05-13 18:19:18.104537	División de fracciones: multiplicar por el recíproco del divisor	ejercicio	\N	\N
174	factorizacion	Factorice: x² - 25	x^2-25	["(x+5)(x-5)", "(x-5)^2", "x(x-25)", "(x+5)^2"]	[{"expl": "Identificar la forma a²-b² con a=x y b=5. Esta es una DIFERENCIA DE CUADRADOS.", "math": "x^2 - 5^2"}, {"expl": "Aplicar la fórmula: a²-b²=(a+b)(a-b). Verificar: (x+5)(x-5)=x²-5x+5x-25=x²-25 ✓", "math": "(x+5)(x-5)"}]	basico	2026-05-13 19:01:53.157063	Diferencia de cuadrados a²-b²=(a+b)(a-b). Reconócela cuando tienes DOS términos cuadrados con signo NEGATIVO entre ellos.	ejercicio	\N	\N
175	factorizacion	Factorice: 4x² - 36	4x^2-36	["4(x+3)(x-3)", "(2x+6)(2x-6)", "4(x²-9)", "2(2x²-18)"]	[{"expl": "Paso 1: Extraer el FACTOR COMÚN 4 (siempre hazlo primero). 4x²÷4=x², 36÷4=9", "math": "4(x^2 - 9)"}, {"expl": "Paso 2: Factorizar x²-9 como diferencia de cuadrados con a=x, b=3", "math": "4(x+3)(x-3)"}]	basico	2026-05-13 19:01:53.171065	REGLA DE ORO: Siempre extrae el factor común monomio ANTES de aplicar cualquier otra fórmula.	ejercicio	\N	\N
176	factorizacion	Factorice: x² + 10x + 25	x^2+10x+25	["(x+5)²", "(x+5)(x-5)", "(x+10)(x+25)", "(x+25)(x+1)"]	[{"expl": "Verificar que es cuadrado perfecto: el término del medio debe ser 2ab. Aquí b=5 porque 25=5²", "math": "a=x, \\\\; b=5: \\\\quad 2ab=2\\\\cdot x\\\\cdot 5=10x \\\\checkmark"}, {"expl": "Trinomio cuadrado perfecto: a²+2ab+b²=(a+b)². Aplicar con a=x, b=5", "math": "(x+5)^2"}]	basico	2026-05-13 19:01:53.171905	Trinomio cuadrado perfecto a²+2ab+b²=(a+b)². TRUCO: Toma raíz cuadrada del primer y último término. ¿El medio es el doble del producto? Entonces es cuadrado perfecto.	ejercicio	\N	\N
177	factorizacion	Factorice por agrupación: ax + ay + bx + by	ax+ay+bx+by	["(a+b)(x+y)", "(ax+b)(y+1)", "a(x+y)+b", "xy(a+b)"]	[{"expl": "Agrupar: (ax+ay)+(bx+by). Del primer grupo sacar a, del segundo sacar b", "math": "a(x+y) + b(x+y)"}, {"expl": "El binomio (x+y) es el FACTOR COMÚN de los dos grupos. Sacarlo da (a+b)(x+y)", "math": "(a+b)(x+y)"}]	basico	2026-05-13 19:01:53.172631	Factorización por agrupación: 1) Agrupar en pares, 2) Extraer factor de cada par, 3) El factor común resultante es el factor final.	ejercicio	\N	\N
178	factorizacion	Factorice: x³ + 27	x^3+27	["(x+3)(x²-3x+9)", "(x+3)³", "(x+3)(x²+9)", "(x+27)(x²-1)"]	[{"expl": "Identificar la forma suma de cubos: a³+b³", "math": "a=x, \\\\; b=3, \\\\; \\\\text{ya que } 27=3^3"}, {"expl": "Fórmula: a³+b³=(a+b)(a²-ab+b²). Con a=x, b=3: (x+3)(x²-3x+9). TRUCO: el signo del trinomio SIEMPRE sigue el patrón -,+", "math": "(x+3)(x^2-3x+9)"}]	basico	2026-05-13 19:01:53.173383	Suma de cubos: a³+b³=(a+b)(a²-ab+b²). Regla mnemotécnica SOAP: Same sign, Opposite sign, Always Positive.	ejercicio	\N	\N
179	ecuaciones	Resuelva: 5(x-2) = 3(x+4)	5(x-2)=3(x+4)	["x=11", "x=7", "x=1", "x=-11"]	[{"expl": "Aplicar propiedad distributiva en ambos lados", "math": "5x - 10 = 3x + 12"}, {"expl": "Agrupar: términos con x a la izquierda, constantes a la derecha", "math": "5x - 3x = 12 + 10"}, {"expl": "Simplificar y dividir por 2. VERIFICAR: 5(11-2)=45 y 3(11+4)=45 ✓", "math": "2x = 22 \\\\Rightarrow x = 11"}]	basico	2026-05-13 19:01:53.174163	Ecuaciones con paréntesis: 1) Distribuir, 2) Agrupar semejantes, 3) Despejar x, 4) Verificar sustituyendo en la ecuación original.	ejercicio	\N	\N
180	ecuaciones	Resuelva: x² + x - 6 = 0	x^2+x-6=0	["x=2 o x=-3", "x=-2 o x=3", "x=6 o x=-1", "x=2 o x=3"]	[{"expl": "Para factorizar x²+bx+c, buscar dos números que sumen 1 (coef. de x) y multipliquen -6 (término independiente)", "math": "\\\\text{Buscar: } a+b=1 \\\\text{ y } ab=-6"}, {"expl": "Los números son 3 y -2", "math": "a=3, b=-2: \\\\quad 3+(-2)=1 \\\\checkmark, \\\\quad 3\\\\cdot(-2)=-6 \\\\checkmark"}, {"expl": "Factorizar y aplicar propiedad del producto cero: si ab=0, entonces a=0 o b=0", "math": "(x+3)(x-2)=0 \\\\Rightarrow x=-3 \\\\text{ o } x=2"}]	basico	2026-05-13 19:01:53.174762	Ecuación cuadrática por factorización: busca dos números cuyo PRODUCTO sea el término independiente y cuya SUMA sea el coeficiente de x.	ejercicio	\N	\N
181	ecuaciones	Resuelva con la fórmula: 2x² - 3x - 2 = 0	2x^2-3x-2=0	["x=2 o x=-1/2", "x=-2 o x=1/2", "x=3 o x=-2", "x=1 o x=-1"]	[{"expl": "Fórmula cuadrática: x=(-b±√(b²-4ac))/2a. Con a=2, b=-3, c=-2: discriminante=9+16=25", "math": "x=\\\\frac{3\\\\pm\\\\sqrt{9+16}}{4}=\\\\frac{3\\\\pm\\\\sqrt{25}}{4}"}, {"expl": "Dos soluciones. Verificar ambas en la ecuación original.", "math": "x=\\\\frac{3+5}{4}=2 \\\\quad \\\\text{o} \\\\quad x=\\\\frac{3-5}{4}=-\\\\frac{1}{2}"}]	basico	2026-05-13 19:01:53.175262	Fórmula cuadrática x=(-b±√(b²-4ac))/2a. El DISCRIMINANTE (b²-4ac): positivo=2 soluciones, cero=1 solución, negativo=sin solución real.	ejercicio	\N	\N
182	inecuaciones	Resuelva: x² - 4 < 0	x^2 - 4 < 0	["-2 < x < 2", "x > 2 o x < -2", "x > 2", "x < -2"]	[{"expl": "Factorizar: x²-4=(x+2)(x-2). Puntos críticos: x=-2 y x=2", "math": "(x+2)(x-2) < 0"}, {"expl": "Analizar cada intervalo: x<-2 → (+)(-)<0 NO... espera: (x+2)<0 y (x-2)<0, producto positivo. Para -2<x<2: (x+2)>0 y (x-2)<0, producto NEGATIVO ✓", "math": "\\\\text{Tabla de signos: para } -2<x<2, \\\\text{ el producto es negativo}"}, {"expl": "Solución es el intervalo donde el producto es negativo", "math": "-2 < x < 2 \\\\quad \\\\text{(intervalo abierto)}"}]	basico	2026-05-13 19:01:53.176139	Inecuaciones cuadráticas: factorizar, encontrar puntos críticos, y analizar el SIGNO del producto en cada intervalo con tabla de signos.	ejercicio	\N	\N
183	inecuaciones	Resuelva: |3x - 6| > 9	|3x-6|>9	["x > 5 o x < -1", "x > 5", "-1 < x < 5", "x < -1"]	[{"expl": "Cuando |f(x)|>a: el contenido es MAYOR que a O MENOR que -a (dos condiciones separadas por \\"o\\")", "math": "3x-6 > 9 \\\\quad \\\\text{o} \\\\quad 3x-6 < -9"}, {"expl": "Resolver cada inecuación por separado", "math": "3x > 15 \\\\Rightarrow x > 5 \\\\quad \\\\text{o} \\\\quad 3x < -3 \\\\Rightarrow x < -1"}]	basico	2026-05-13 19:01:53.176724	|f(x)|>a → f(x)>a o f(x)<-a (unión). |f(x)|<a → -a<f(x)<a (intersección). TRUCO: el signo > da "o"; el signo < da "y".	ejercicio	\N	\N
184	exp-log	Resuelva: log₂(x+3) + log₂(x-1) = 3	\\log_2(x+3)+\\log_2(x-1)=3	["x=3", "x=1", "x=5", "x=-5"]	[{"expl": "Propiedad: log(a)+log(b)=log(ab). Combinar los dos logaritmos en uno", "math": "\\\\log_2[(x+3)(x-1)] = 3"}, {"expl": "Convertir de forma logarítmica a exponencial: log_b(x)=n ↔ x=b^n", "math": "(x+3)(x-1) = 2^3 = 8"}, {"expl": "(3+3)(3-1)=6·2=12... revisar. (x+3)(x-1)=x²+2x-3=8 → x²+2x-11=0 → x=3 ✓ (descartamos x negativo pues haría log negativo)", "math": "x^2+2x-3=8 \\\\Rightarrow x^2+2x-11=0... \\\\text{ verificar } x=3"}]	basico	2026-05-13 19:01:53.177232	Ecuaciones logarítmicas: usar propiedades para combinar logs, luego convertir a forma exponencial. SIEMPRE verificar que el argumento quede positivo.	ejercicio	\N	\N
185	exp-log	Encuentre log₃(81) sin calculadora	\\log_3(81)	["4", "3", "27", "9"]	[{"expl": "Preguntar: ¿a qué potencia hay que elevar 3 para obtener 81?", "math": "3^? = 81"}, {"expl": "Calcular potencias de 3 hasta llegar a 81", "math": "3^1=3, 3^2=9, 3^3=27, 3^4=81"}, {"expl": "El exponente es 4. Respuesta: 4", "math": "\\\\log_3(81) = 4"}]	basico	2026-05-13 19:01:53.177694	Para evaluar log_b(x) sin calculadora: calcular potencias sucesivas de b hasta alcanzar x. El resultado es el exponente usado.	ejercicio	\N	\N
186	trigonometria	Verifique la identidad: tan²(x) + 1 = sec²(x)	\\tan^2(x)+1=\\sec^2(x)	["Verdadera, es identidad pitagórica", "Falsa para todo x", "Solo válida para x=45°", "Solo cuando tan(x)=1"]	[{"expl": "Sustituir tan(x)=sin(x)/cos(x)", "math": "\\\\tan^2(x)+1 = \\\\frac{\\\\sin^2(x)}{\\\\cos^2(x)}+1"}, {"expl": "Numerador: usar identidad fundamental sen²+cos²=1", "math": "= \\\\frac{\\\\sin^2(x)+\\\\cos^2(x)}{\\\\cos^2(x)} = \\\\frac{1}{\\\\cos^2(x)}"}, {"expl": "Definición de secante: sec(x)=1/cos(x). Identidad verificada.", "math": "= \\\\sec^2(x) \\\\checkmark"}]	basico	2026-05-13 19:01:53.178115	Identidades pitagóricas derivadas: tan²x+1=sec²x y cot²x+1=csc²x. Se derivan dividiendo sen²x+cos²x=1 por cos²x y sen²x respectivamente.	ejercicio	\N	\N
187	trigonometria	Exprese cos(75°) usando la suma de ángulos	\\cos(75°)=\\cos(45°+30°)	["(√6-√2)/4", "(√6+√2)/4", "√3/2", "√2/2"]	[{"expl": "Fórmula de suma: cos(A+B)=cosA·cosB-sinA·sinB", "math": "\\\\cos(45°+30°)=\\\\cos45°\\\\cos30°-\\\\sin45°\\\\sin30°"}, {"expl": "Sustituir valores exactos: cos45°=√2/2, cos30°=√3/2, sin45°=√2/2, sin30°=1/2", "math": "=\\\\frac{\\\\sqrt{2}}{2}\\\\cdot\\\\frac{\\\\sqrt{3}}{2}-\\\\frac{\\\\sqrt{2}}{2}\\\\cdot\\\\frac{1}{2}"}, {"expl": "Multiplicar y combinar fracciones", "math": "=\\\\frac{\\\\sqrt{6}-\\\\sqrt{2}}{4}"}]	basico	2026-05-13 19:01:53.178547	Fórmulas de adición: cos(A+B)=cosAcosB-sinAsinB. Útiles para calcular ángulos exactos que no son ángulos especiales estándar.	ejercicio	\N	\N
188	calculo	Use regla de la cadena: f(x) = (3x² + 1)⁵	f(x)=(3x^2+1)^5	["f'(x)=5(3x²+1)⁴·6x", "f'(x)=5(3x²+1)⁴", "f'(x)=30x(3x²+1)⁴", "f'(x)=6x(3x²+1)⁵"]	[{"expl": "Regla de la cadena: d/dx[u^n] = n·u^(n-1)·u'. Aquí u=3x²+1, n=5", "math": "f'(x)=5(3x^2+1)^4 \\\\cdot \\\\frac{d}{dx}(3x^2+1)"}, {"expl": "Derivar la función interior: d/dx(3x²+1)=6x+0=6x", "math": "\\\\frac{d}{dx}(3x^2+1) = 6x"}, {"expl": "Multiplicar. Nota: AMBAS respuestas a y c son equivalentes; la forma simplificada es 30x(3x²+1)⁴", "math": "f'(x)=5(3x^2+1)^4 \\\\cdot 6x = 30x(3x^2+1)^4"}]	basico	2026-05-13 19:01:53.178932	Regla de la cadena: d/dx[f(g(x))]=f'(g(x))·g'(x). TRUCO: "derivada del exterior dejando el interior igual, multiplicado por derivada del interior".	ejercicio	\N	\N
189	calculo	Evalúe la integral definida: ∫₀² x² dx	\\int_0^2 x^2\\,dx	["8/3", "4", "2", "3"]	[{"expl": "Antiderivada de x² es x³/3 (regla de la potencia inversa: ∫xⁿdx=xⁿ⁺¹/(n+1))", "math": "\\\\left[\\\\frac{x^3}{3}\\\\right]_0^2"}, {"expl": "Teorema fundamental del cálculo: evaluar la antiderivada en los límites y restar", "math": "\\\\frac{2^3}{3} - \\\\frac{0^3}{3} = \\\\frac{8}{3} - 0"}, {"expl": "Resultado. Representa el área bajo la parábola y=x² entre x=0 y x=2", "math": "\\\\frac{8}{3}"}]	basico	2026-05-13 19:01:53.179324	Integral definida ∫ₐᵇf(x)dx=[F(x)]ₐᵇ=F(b)-F(a). Antiderivada de xⁿ es xⁿ⁺¹/(n+1). Siempre evaluar en límite superior MENOS límite inferior.	ejercicio	\N	\N
190	fracciones-alg	Divide: (x²-4)/(x+3) ÷ (x-2)/(x+3)	\\frac{x^2-4}{x+3} \\div \\frac{x-2}{x+3}	["x+2", "x-2", "1", "(x+2)(x-2)"]	[{"expl": "División = multiplicar por el recíproco: invertir la segunda fracción y cambiar ÷ por ×", "math": "\\\\frac{x^2-4}{x+3} \\\\cdot \\\\frac{x+3}{x-2}"}, {"expl": "Factorizar x²-4=(x+2)(x-2) en el numerador", "math": "\\\\frac{(x+2)(x-2)}{x+3} \\\\cdot \\\\frac{x+3}{x-2}"}, {"expl": "Cancelar factores comunes (x+3) y (x-2). Resultado: x+2, con x≠2 y x≠-3", "math": "\\\\frac{(x+2)\\\\cancel{(x-2)}}{\\\\cancel{x+3}} \\\\cdot \\\\frac{\\\\cancel{x+3}}{\\\\cancel{x-2}} = x+2"}]	basico	2026-05-13 19:01:53.179785	División de fracciones algebraicas: multiplicar por el recíproco, factorizar numeradores y denominadores, cancelar factores comunes.	ejercicio	\N	\N
203	inecuaciones	Resuelva: |3x - 6| > 9	|3x-6|>9	["x > 5 o x < -1", "x > 5", "-1 < x < 5", "x < -1"]	[{"expl": "Cuando |f(x)|>a: el contenido es MAYOR que a O MENOR que -a (dos condiciones separadas por \\"o\\")", "math": "3x-6 > 9 \\\\quad \\\\text{o} \\\\quad 3x-6 < -9"}, {"expl": "Resolver cada inecuación por separado", "math": "3x > 15 \\\\Rightarrow x > 5 \\\\quad \\\\text{o} \\\\quad 3x < -3 \\\\Rightarrow x < -1"}]	basico	2026-05-14 10:59:44.449939	|f(x)|>a → f(x)>a o f(x)<-a (unión). |f(x)|<a → -a<f(x)<a (intersección). TRUCO: el signo > da "o"; el signo < da "y".	ejercicio	\N	\N
191	fracciones-alg	Reste: 3/(x²-1) - 1/(x+1)	\\frac{3}{x^2-1}-\\frac{1}{x+1}	["(4-x)/((x+1)(x-1))", "2/(x-1)", "(3-x)/(x²-1)", "2/(x²-1)"]	[{"expl": "Factorizar x²-1=(x+1)(x-1). El MCM es (x+1)(x-1)", "math": "\\\\frac{3}{(x+1)(x-1)} - \\\\frac{1}{x+1}"}, {"expl": "Convertir la segunda fracción: multiplicar por (x-1)/(x-1). OJO: el signo negativo afecta a TODA la expresión", "math": "\\\\frac{3 - (x-1)}{(x+1)(x-1)} = \\\\frac{3-x+1}{(x+1)(x-1)}"}, {"expl": "3-x+1=4-x. Resultado final.", "math": "\\\\frac{4-x}{(x+1)(x-1)}"}]	basico	2026-05-13 19:01:53.180182	Resta de fracciones con denominadores relacionados: factorizar, encontrar MCM, llevar al mismo denominador, y CUIDAR el signo de la resta.	ejercicio	\N	\N
192	factorizacion	Factorice: 2x² + 5x + 3	2x^2+5x+3	["(2x+3)(x+1)", "(2x+1)(x+3)", "(x+3)(x+1)", "2(x+3)(x+1)"]	[{"expl": "Método ac: multiplicar a=2 por c=3 para obtener 6. Buscar dos números que sumen 5 y multipliquen 6", "math": "a\\\\cdot c = 2\\\\cdot 3 = 6, \\\\quad b = 5"}, {"expl": "Los números son 2 y 3. Reescribir 5x = 2x + 3x", "math": "2+3=5 \\\\checkmark \\\\quad 2\\\\cdot 3=6 \\\\checkmark"}, {"expl": "Agrupar y factorizar por grupos", "math": "2x^2+2x+3x+3 = 2x(x+1)+3(x+1) = (2x+3)(x+1)"}]	basico	2026-05-13 19:01:53.180669	Factorización de trinomio ax²+bx+c (a≠1): método AC. Multiplica a·c, busca dos factores de ese producto que sumen b, luego factoriza por agrupación.	ejercicio	\N	\N
193	ecuaciones	Resuelva el sistema: 2x + 3y = 12, x - y = 1	2x+3y=12, \\; x-y=1	["x=3, y=2", "x=4, y=3", "x=2, y=1", "x=5, y=4"]	[{"expl": "Método de sustitución: despejar x de la ecuación más simple", "math": "x = y + 1 \\\\text{ (de la segunda ecuación)}"}, {"expl": "Sustituir x=y+1 en la primera ecuación y resolver para y", "math": "2(y+1) + 3y = 12 \\\\Rightarrow 5y = 10 \\\\Rightarrow y = 2"}, {"expl": "Sustituir y=2 para encontrar x. VERIFICAR: 2(3)+3(2)=12 ✓ y 3-2=1 ✓", "math": "x = 2 + 1 = 3"}]	basico	2026-05-13 19:01:53.180987	Sistema de ecuaciones por sustitución: 1) Despejar una variable, 2) Sustituir en la otra ecuación, 3) Resolver, 4) Encontrar la segunda variable, 5) Verificar.	ejercicio	\N	\N
194	factorizacion	Factorice: x² - 25	x^2-25	["(x+5)(x-5)", "(x-5)^2", "x(x-25)", "(x+5)^2"]	[{"expl": "Identificar la forma a²-b² con a=x y b=5. Esta es una DIFERENCIA DE CUADRADOS.", "math": "x^2 - 5^2"}, {"expl": "Aplicar la fórmula: a²-b²=(a+b)(a-b). Verificar: (x+5)(x-5)=x²-5x+5x-25=x²-25 ✓", "math": "(x+5)(x-5)"}]	basico	2026-05-14 10:59:44.401233	Diferencia de cuadrados a²-b²=(a+b)(a-b). Reconócela cuando tienes DOS términos cuadrados con signo NEGATIVO entre ellos.	ejercicio	\N	\N
195	factorizacion	Factorice: 4x² - 36	4x^2-36	["4(x+3)(x-3)", "(2x+6)(2x-6)", "4(x²-9)", "2(2x²-18)"]	[{"expl": "Paso 1: Extraer el FACTOR COMÚN 4 (siempre hazlo primero). 4x²÷4=x², 36÷4=9", "math": "4(x^2 - 9)"}, {"expl": "Paso 2: Factorizar x²-9 como diferencia de cuadrados con a=x, b=3", "math": "4(x+3)(x-3)"}]	basico	2026-05-14 10:59:44.446241	REGLA DE ORO: Siempre extrae el factor común monomio ANTES de aplicar cualquier otra fórmula.	ejercicio	\N	\N
196	factorizacion	Factorice: x² + 10x + 25	x^2+10x+25	["(x+5)²", "(x+5)(x-5)", "(x+10)(x+25)", "(x+25)(x+1)"]	[{"expl": "Verificar que es cuadrado perfecto: el término del medio debe ser 2ab. Aquí b=5 porque 25=5²", "math": "a=x, \\\\; b=5: \\\\quad 2ab=2\\\\cdot x\\\\cdot 5=10x \\\\checkmark"}, {"expl": "Trinomio cuadrado perfecto: a²+2ab+b²=(a+b)². Aplicar con a=x, b=5", "math": "(x+5)^2"}]	basico	2026-05-14 10:59:44.447135	Trinomio cuadrado perfecto a²+2ab+b²=(a+b)². TRUCO: Toma raíz cuadrada del primer y último término. ¿El medio es el doble del producto? Entonces es cuadrado perfecto.	ejercicio	\N	\N
197	factorizacion	Factorice por agrupación: ax + ay + bx + by	ax+ay+bx+by	["(a+b)(x+y)", "(ax+b)(y+1)", "a(x+y)+b", "xy(a+b)"]	[{"expl": "Agrupar: (ax+ay)+(bx+by). Del primer grupo sacar a, del segundo sacar b", "math": "a(x+y) + b(x+y)"}, {"expl": "El binomio (x+y) es el FACTOR COMÚN de los dos grupos. Sacarlo da (a+b)(x+y)", "math": "(a+b)(x+y)"}]	basico	2026-05-14 10:59:44.447611	Factorización por agrupación: 1) Agrupar en pares, 2) Extraer factor de cada par, 3) El factor común resultante es el factor final.	ejercicio	\N	\N
198	factorizacion	Factorice: x³ + 27	x^3+27	["(x+3)(x²-3x+9)", "(x+3)³", "(x+3)(x²+9)", "(x+27)(x²-1)"]	[{"expl": "Identificar la forma suma de cubos: a³+b³", "math": "a=x, \\\\; b=3, \\\\; \\\\text{ya que } 27=3^3"}, {"expl": "Fórmula: a³+b³=(a+b)(a²-ab+b²). Con a=x, b=3: (x+3)(x²-3x+9). TRUCO: el signo del trinomio SIEMPRE sigue el patrón -,+", "math": "(x+3)(x^2-3x+9)"}]	basico	2026-05-14 10:59:44.447988	Suma de cubos: a³+b³=(a+b)(a²-ab+b²). Regla mnemotécnica SOAP: Same sign, Opposite sign, Always Positive.	ejercicio	\N	\N
199	ecuaciones	Resuelva: 5(x-2) = 3(x+4)	5(x-2)=3(x+4)	["x=11", "x=7", "x=1", "x=-11"]	[{"expl": "Aplicar propiedad distributiva en ambos lados", "math": "5x - 10 = 3x + 12"}, {"expl": "Agrupar: términos con x a la izquierda, constantes a la derecha", "math": "5x - 3x = 12 + 10"}, {"expl": "Simplificar y dividir por 2. VERIFICAR: 5(11-2)=45 y 3(11+4)=45 ✓", "math": "2x = 22 \\\\Rightarrow x = 11"}]	basico	2026-05-14 10:59:44.448358	Ecuaciones con paréntesis: 1) Distribuir, 2) Agrupar semejantes, 3) Despejar x, 4) Verificar sustituyendo en la ecuación original.	ejercicio	\N	\N
200	ecuaciones	Resuelva: x² + x - 6 = 0	x^2+x-6=0	["x=2 o x=-3", "x=-2 o x=3", "x=6 o x=-1", "x=2 o x=3"]	[{"expl": "Para factorizar x²+bx+c, buscar dos números que sumen 1 (coef. de x) y multipliquen -6 (término independiente)", "math": "\\\\text{Buscar: } a+b=1 \\\\text{ y } ab=-6"}, {"expl": "Los números son 3 y -2", "math": "a=3, b=-2: \\\\quad 3+(-2)=1 \\\\checkmark, \\\\quad 3\\\\cdot(-2)=-6 \\\\checkmark"}, {"expl": "Factorizar y aplicar propiedad del producto cero: si ab=0, entonces a=0 o b=0", "math": "(x+3)(x-2)=0 \\\\Rightarrow x=-3 \\\\text{ o } x=2"}]	basico	2026-05-14 10:59:44.448714	Ecuación cuadrática por factorización: busca dos números cuyo PRODUCTO sea el término independiente y cuya SUMA sea el coeficiente de x.	ejercicio	\N	\N
201	ecuaciones	Resuelva con la fórmula: 2x² - 3x - 2 = 0	2x^2-3x-2=0	["x=2 o x=-1/2", "x=-2 o x=1/2", "x=3 o x=-2", "x=1 o x=-1"]	[{"expl": "Fórmula cuadrática: x=(-b±√(b²-4ac))/2a. Con a=2, b=-3, c=-2: discriminante=9+16=25", "math": "x=\\\\frac{3\\\\pm\\\\sqrt{9+16}}{4}=\\\\frac{3\\\\pm\\\\sqrt{25}}{4}"}, {"expl": "Dos soluciones. Verificar ambas en la ecuación original.", "math": "x=\\\\frac{3+5}{4}=2 \\\\quad \\\\text{o} \\\\quad x=\\\\frac{3-5}{4}=-\\\\frac{1}{2}"}]	basico	2026-05-14 10:59:44.449147	Fórmula cuadrática x=(-b±√(b²-4ac))/2a. El DISCRIMINANTE (b²-4ac): positivo=2 soluciones, cero=1 solución, negativo=sin solución real.	ejercicio	\N	\N
202	inecuaciones	Resuelva: x² - 4 < 0	x^2 - 4 < 0	["-2 < x < 2", "x > 2 o x < -2", "x > 2", "x < -2"]	[{"expl": "Factorizar: x²-4=(x+2)(x-2). Puntos críticos: x=-2 y x=2", "math": "(x+2)(x-2) < 0"}, {"expl": "Analizar cada intervalo: x<-2 → (+)(-)<0 NO... espera: (x+2)<0 y (x-2)<0, producto positivo. Para -2<x<2: (x+2)>0 y (x-2)<0, producto NEGATIVO ✓", "math": "\\\\text{Tabla de signos: para } -2<x<2, \\\\text{ el producto es negativo}"}, {"expl": "Solución es el intervalo donde el producto es negativo", "math": "-2 < x < 2 \\\\quad \\\\text{(intervalo abierto)}"}]	basico	2026-05-14 10:59:44.449514	Inecuaciones cuadráticas: factorizar, encontrar puntos críticos, y analizar el SIGNO del producto en cada intervalo con tabla de signos.	ejercicio	\N	\N
204	exp-log	Resuelva: log₂(x+3) + log₂(x-1) = 3	\\log_2(x+3)+\\log_2(x-1)=3	["x=3", "x=1", "x=5", "x=-5"]	[{"expl": "Propiedad: log(a)+log(b)=log(ab). Combinar los dos logaritmos en uno", "math": "\\\\log_2[(x+3)(x-1)] = 3"}, {"expl": "Convertir de forma logarítmica a exponencial: log_b(x)=n ↔ x=b^n", "math": "(x+3)(x-1) = 2^3 = 8"}, {"expl": "(3+3)(3-1)=6·2=12... revisar. (x+3)(x-1)=x²+2x-3=8 → x²+2x-11=0 → x=3 ✓ (descartamos x negativo pues haría log negativo)", "math": "x^2+2x-3=8 \\\\Rightarrow x^2+2x-11=0... \\\\text{ verificar } x=3"}]	basico	2026-05-14 10:59:44.450684	Ecuaciones logarítmicas: usar propiedades para combinar logs, luego convertir a forma exponencial. SIEMPRE verificar que el argumento quede positivo.	ejercicio	\N	\N
205	exp-log	Encuentre log₃(81) sin calculadora	\\log_3(81)	["4", "3", "27", "9"]	[{"expl": "Preguntar: ¿a qué potencia hay que elevar 3 para obtener 81?", "math": "3^? = 81"}, {"expl": "Calcular potencias de 3 hasta llegar a 81", "math": "3^1=3, 3^2=9, 3^3=27, 3^4=81"}, {"expl": "El exponente es 4. Respuesta: 4", "math": "\\\\log_3(81) = 4"}]	basico	2026-05-14 10:59:44.451306	Para evaluar log_b(x) sin calculadora: calcular potencias sucesivas de b hasta alcanzar x. El resultado es el exponente usado.	ejercicio	\N	\N
206	trigonometria	Verifique la identidad: tan²(x) + 1 = sec²(x)	\\tan^2(x)+1=\\sec^2(x)	["Verdadera, es identidad pitagórica", "Falsa para todo x", "Solo válida para x=45°", "Solo cuando tan(x)=1"]	[{"expl": "Sustituir tan(x)=sin(x)/cos(x)", "math": "\\\\tan^2(x)+1 = \\\\frac{\\\\sin^2(x)}{\\\\cos^2(x)}+1"}, {"expl": "Numerador: usar identidad fundamental sen²+cos²=1", "math": "= \\\\frac{\\\\sin^2(x)+\\\\cos^2(x)}{\\\\cos^2(x)} = \\\\frac{1}{\\\\cos^2(x)}"}, {"expl": "Definición de secante: sec(x)=1/cos(x). Identidad verificada.", "math": "= \\\\sec^2(x) \\\\checkmark"}]	basico	2026-05-14 10:59:44.451591	Identidades pitagóricas derivadas: tan²x+1=sec²x y cot²x+1=csc²x. Se derivan dividiendo sen²x+cos²x=1 por cos²x y sen²x respectivamente.	ejercicio	\N	\N
207	trigonometria	Exprese cos(75°) usando la suma de ángulos	\\cos(75°)=\\cos(45°+30°)	["(√6-√2)/4", "(√6+√2)/4", "√3/2", "√2/2"]	[{"expl": "Fórmula de suma: cos(A+B)=cosA·cosB-sinA·sinB", "math": "\\\\cos(45°+30°)=\\\\cos45°\\\\cos30°-\\\\sin45°\\\\sin30°"}, {"expl": "Sustituir valores exactos: cos45°=√2/2, cos30°=√3/2, sin45°=√2/2, sin30°=1/2", "math": "=\\\\frac{\\\\sqrt{2}}{2}\\\\cdot\\\\frac{\\\\sqrt{3}}{2}-\\\\frac{\\\\sqrt{2}}{2}\\\\cdot\\\\frac{1}{2}"}, {"expl": "Multiplicar y combinar fracciones", "math": "=\\\\frac{\\\\sqrt{6}-\\\\sqrt{2}}{4}"}]	basico	2026-05-14 10:59:44.451907	Fórmulas de adición: cos(A+B)=cosAcosB-sinAsinB. Útiles para calcular ángulos exactos que no son ángulos especiales estándar.	ejercicio	\N	\N
208	calculo	Use regla de la cadena: f(x) = (3x² + 1)⁵	f(x)=(3x^2+1)^5	["f'(x)=5(3x²+1)⁴·6x", "f'(x)=5(3x²+1)⁴", "f'(x)=30x(3x²+1)⁴", "f'(x)=6x(3x²+1)⁵"]	[{"expl": "Regla de la cadena: d/dx[u^n] = n·u^(n-1)·u'. Aquí u=3x²+1, n=5", "math": "f'(x)=5(3x^2+1)^4 \\\\cdot \\\\frac{d}{dx}(3x^2+1)"}, {"expl": "Derivar la función interior: d/dx(3x²+1)=6x+0=6x", "math": "\\\\frac{d}{dx}(3x^2+1) = 6x"}, {"expl": "Multiplicar. Nota: AMBAS respuestas a y c son equivalentes; la forma simplificada es 30x(3x²+1)⁴", "math": "f'(x)=5(3x^2+1)^4 \\\\cdot 6x = 30x(3x^2+1)^4"}]	basico	2026-05-14 10:59:44.452205	Regla de la cadena: d/dx[f(g(x))]=f'(g(x))·g'(x). TRUCO: "derivada del exterior dejando el interior igual, multiplicado por derivada del interior".	ejercicio	\N	\N
209	calculo	Evalúe la integral definida: ∫₀² x² dx	\\int_0^2 x^2\\,dx	["8/3", "4", "2", "3"]	[{"expl": "Antiderivada de x² es x³/3 (regla de la potencia inversa: ∫xⁿdx=xⁿ⁺¹/(n+1))", "math": "\\\\left[\\\\frac{x^3}{3}\\\\right]_0^2"}, {"expl": "Teorema fundamental del cálculo: evaluar la antiderivada en los límites y restar", "math": "\\\\frac{2^3}{3} - \\\\frac{0^3}{3} = \\\\frac{8}{3} - 0"}, {"expl": "Resultado. Representa el área bajo la parábola y=x² entre x=0 y x=2", "math": "\\\\frac{8}{3}"}]	basico	2026-05-14 10:59:44.452589	Integral definida ∫ₐᵇf(x)dx=[F(x)]ₐᵇ=F(b)-F(a). Antiderivada de xⁿ es xⁿ⁺¹/(n+1). Siempre evaluar en límite superior MENOS límite inferior.	ejercicio	\N	\N
210	fracciones-alg	Divide: (x²-4)/(x+3) ÷ (x-2)/(x+3)	\\frac{x^2-4}{x+3} \\div \\frac{x-2}{x+3}	["x+2", "x-2", "1", "(x+2)(x-2)"]	[{"expl": "División = multiplicar por el recíproco: invertir la segunda fracción y cambiar ÷ por ×", "math": "\\\\frac{x^2-4}{x+3} \\\\cdot \\\\frac{x+3}{x-2}"}, {"expl": "Factorizar x²-4=(x+2)(x-2) en el numerador", "math": "\\\\frac{(x+2)(x-2)}{x+3} \\\\cdot \\\\frac{x+3}{x-2}"}, {"expl": "Cancelar factores comunes (x+3) y (x-2). Resultado: x+2, con x≠2 y x≠-3", "math": "\\\\frac{(x+2)\\\\cancel{(x-2)}}{\\\\cancel{x+3}} \\\\cdot \\\\frac{\\\\cancel{x+3}}{\\\\cancel{x-2}} = x+2"}]	basico	2026-05-14 10:59:44.452974	División de fracciones algebraicas: multiplicar por el recíproco, factorizar numeradores y denominadores, cancelar factores comunes.	ejercicio	\N	\N
211	fracciones-alg	Reste: 3/(x²-1) - 1/(x+1)	\\frac{3}{x^2-1}-\\frac{1}{x+1}	["(4-x)/((x+1)(x-1))", "2/(x-1)", "(3-x)/(x²-1)", "2/(x²-1)"]	[{"expl": "Factorizar x²-1=(x+1)(x-1). El MCM es (x+1)(x-1)", "math": "\\\\frac{3}{(x+1)(x-1)} - \\\\frac{1}{x+1}"}, {"expl": "Convertir la segunda fracción: multiplicar por (x-1)/(x-1). OJO: el signo negativo afecta a TODA la expresión", "math": "\\\\frac{3 - (x-1)}{(x+1)(x-1)} = \\\\frac{3-x+1}{(x+1)(x-1)}"}, {"expl": "3-x+1=4-x. Resultado final.", "math": "\\\\frac{4-x}{(x+1)(x-1)}"}]	basico	2026-05-14 10:59:44.453309	Resta de fracciones con denominadores relacionados: factorizar, encontrar MCM, llevar al mismo denominador, y CUIDAR el signo de la resta.	ejercicio	\N	\N
212	factorizacion	Factorice: 2x² + 5x + 3	2x^2+5x+3	["(2x+3)(x+1)", "(2x+1)(x+3)", "(x+3)(x+1)", "2(x+3)(x+1)"]	[{"expl": "Método ac: multiplicar a=2 por c=3 para obtener 6. Buscar dos números que sumen 5 y multipliquen 6", "math": "a\\\\cdot c = 2\\\\cdot 3 = 6, \\\\quad b = 5"}, {"expl": "Los números son 2 y 3. Reescribir 5x = 2x + 3x", "math": "2+3=5 \\\\checkmark \\\\quad 2\\\\cdot 3=6 \\\\checkmark"}, {"expl": "Agrupar y factorizar por grupos", "math": "2x^2+2x+3x+3 = 2x(x+1)+3(x+1) = (2x+3)(x+1)"}]	basico	2026-05-14 10:59:44.453681	Factorización de trinomio ax²+bx+c (a≠1): método AC. Multiplica a·c, busca dos factores de ese producto que sumen b, luego factoriza por agrupación.	ejercicio	\N	\N
213	ecuaciones	Resuelva el sistema: 2x + 3y = 12, x - y = 1	2x+3y=12, \\; x-y=1	["x=3, y=2", "x=4, y=3", "x=2, y=1", "x=5, y=4"]	[{"expl": "Método de sustitución: despejar x de la ecuación más simple", "math": "x = y + 1 \\\\text{ (de la segunda ecuación)}"}, {"expl": "Sustituir x=y+1 en la primera ecuación y resolver para y", "math": "2(y+1) + 3y = 12 \\\\Rightarrow 5y = 10 \\\\Rightarrow y = 2"}, {"expl": "Sustituir y=2 para encontrar x. VERIFICAR: 2(3)+3(2)=12 ✓ y 3-2=1 ✓", "math": "x = 2 + 1 = 3"}]	basico	2026-05-14 10:59:44.453958	Sistema de ecuaciones por sustitución: 1) Despejar una variable, 2) Sustituir en la otra ecuación, 3) Resolver, 4) Encontrar la segunda variable, 5) Verificar.	ejercicio	\N	\N
\.


--
-- Data for Name: game_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game_sessions (id, user_id, inicio, fin, ejercicios_completados, ejercicios_correctos, xp_ganada, juego_descanso) FROM stdin;
\.


--
-- Data for Name: knowledge_library; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knowledge_library (id, topic_id, titulo, contenido, ejemplos, manas, nivel_desde, nivel_hasta, orden, created_at) FROM stdin;
36	conjuntos	Teoria de Conjuntos: La Base de Todo	\n<div class="kb-article">\n\n<h2>Que es un conjunto?</h2>\n<p>Un <strong>conjunto</strong> es una coleccion de objetos llamados <strong>elementos</strong>. Los conjuntos son la base de toda la matematica moderna.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> Un conjunto se define por sus elementos. Dos conjuntos son iguales si tienen exactamente los mismos elementos, sin importar el orden.\n</div>\n\n<p>Los conjuntos se denotan con <strong>llaves {}</strong> y los elementos se separan por comas.</p>\n\n<div class="kb-ejemplo">\n<strong>Ejemplo 1:</strong> A = {1, 2, 3, 4, 5} es el conjunto de los primeros cinco numeros naturales.<br>\n<strong>Ejemplo 2:</strong> B = {x | x es una vocal} significa "el conjunto de todas las x tales que x es una vocal".<br>\n<strong>Ejemplo 3:</strong> C = {a, e, i, o, u} es el mismo conjunto que B, escrito por extension.\n</div>\n\n<h3>Pertinencia: Pertenece o no pertenece</h3>\n<p>Usamos el simbolo <strong>&isin;</strong> para decir que un elemento pertenece a un conjunto, y <strong>&notin;</strong> para decir que NO pertenece.</p>\n\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> Si A = {1, 2, 3, 4, 5}, entonces:<br>\n3 &isin; A (3 pertenece a A)<br>\n7 &notin; A (7 no pertenece a A)\n</div>\n\n<h3>Tipos de conjuntos importantes</h3>\n<p>En Prec�lculo del TEC, estos son los conjuntos numericos que debes conocer:</p>\n\n<div class="kb-table">\n<table>\n<tr><th>Simbolo</th><th>Nombre</th><th>Elementos</th><th>Ejemplo</th></tr>\n<tr><td>&#8469;</td><td>Naturales</td><td>{1, 2, 3, 4, ...}</td><td>5 &isin; &#8469;, -3 &notin; &#8469;</td></tr>\n<tr><td>&#8484;</td><td>Enteros</td><td>{..., -2, -1, 0, 1, 2, ...}</td><td>-5 &isin; &#8484;, 1/2 &notin; &#8484;</td></tr>\n<tr><td>&#8474;</td><td>Racionales</td><td>Fracciones p/q</td><td>1/2 &isin; &#8474;, &pi; &notin; &#8474;</td></tr>\n<tr><td>&#120120;</td><td>Irracionales</td><td>Decimales no periodicos</td><td>&pi; &isin; &#120120;, &radic;2 &isin; &#120120;</td></tr>\n<tr><td>&#8477;</td><td>Reales</td><td>&#8474; &cup; &#120120;</td><td>Todos los anteriores &isin; &#8477;</td></tr>\n</table>\n</div>\n\n<h3>Operaciones con conjuntos</h3>\n\n<h4>1. Union (&cup;)</h4>\n<p>La union de A y B son TODOS los elementos que estan en A, en B o en ambos.</p>\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> A = {1, 2, 3}, B = {3, 4, 5}<br>\nA &cup; B = {1, 2, 3, 4, 5}\n</div>\n\n<h4>2. Interseccion (&cap;)</h4>\n<p>La interseccion de A y B son SOLO los elementos que estan en AMBOS conjuntos.</p>\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> A = {1, 2, 3}, B = {3, 4, 5}<br>\nA &cap; B = {3}\n</div>\n\n<h4>3. Diferencia (A - B)</h4>\n<p>La diferencia A - B son los elementos que estan en A pero NO en B.</p>\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> A = {1, 2, 3, 4}, B = {3, 4, 5}<br>\nA - B = {1, 2}<br>\nB - A = {5}\n</div>\n\n<h4>4. Complemento (A')</h4>\n<p>El complemento de A son todos los elementos del conjunto universal que NO estan en A.</p>\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> Si U = {1, 2, 3, 4, 5, 6} y A = {1, 2, 3}<br>\nA' = {4, 5, 6}\n</div>\n\n<h3>Propiedades de las operaciones</h3>\n<ul>\n<li><strong>Conmutativa:</strong> A &cup; B = B &cup; A, A &cap; B = B &cap; A</li>\n<li><strong>Asociativa:</strong> (A &cup; B) &cup; C = A &cup; (B &cup; C)</li>\n<li><strong>Distributiva:</strong> A &cap; (B &cup; C) = (A &cap; B) &cup; (A &cap; C)</li>\n<li><strong>Leyes de Morgan:</strong> (A &cup; B)' = A' &cap; B', (A &cap; B)' = A' &cup; B'</li>\n</ul>\n\n<div class="kb-box-warn">\n<strong>Error comun:</strong> Confundir &isin; (pertenencia) con &sube; (subconjunto).<br>\n&isin; relaciona un ELEMENTO con un CONJUNTO.<br>\n&sube; relaciona un CONJUNTO con otro CONJUNTO.\n</div>\n\n</div>\n	[{"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A ∪ B", "solucion": "A ∪ B = {1,2,3,4,5,6}"}, {"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A ∩ B", "solucion": "A ∩ B = {3,4}"}, {"problema": "Dados A={1,2,3,4}, B={3,4,5,6}. Halla A - B", "solucion": "A - B = {1,2}"}, {"problema": "Si U={1,2,3,4,5,6,7,8}, A={2,4,6,8}, halla A'", "solucion": "A' = {1,3,5,7}"}]	El conjunto vacio es subconjunto de TODO conjunto. Para las leyes de Morgan: el complemento de la union es la interseccion de los complementos. La union es como sumar conjuntos, la interseccion como lo comun.	1	10	1	2026-05-14 14:34:19.176541
37	numeros-reales	Numeros Reales: La Recta Numerica	\n<div class="kb-article">\n\n<h2>Que son los numeros reales?</h2>\n<p>Los <strong>numeros reales</strong> (&#8477;) son TODOS los numeros que puedes imaginar en la recta numerica. Si puedes ubicarlo en una recta, es un numero real.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> Los numeros reales son cualquier numero que tenga sentido en el mundo real. Desde -infinito hasta +infinito, pasando por todos los decimales, fracciones y raices.\n</div>\n\n<h3>Clasificacion de los numeros reales</h3>\n\n<div class="kb-table">\n<table>\n<tr><th>Categoria</th><th>Simbolo</th><th>Ejemplos</th><th>Que son?</th></tr>\n<tr><td>Naturales</td><td>&#8469;</td><td>1, 2, 3, 4, 5...</td><td>Los que usas para contar</td></tr>\n<tr><td>Enteros</td><td>&#8484;</td><td>..., -3, -2, -1, 0, 1, 2, 3...</td><td>Naturales + negativos + cero</td></tr>\n<tr><td>Racionales</td><td>&#8474;</td><td>1/2, -3/4, 0.5, 2.333...</td><td>Fracciones (decimales exactos o periodicos)</td></tr>\n<tr><td>Irracionales</td><td>&#120120;</td><td>&pi;, &radic;2, e, &radic;3</td><td>Decimales infinitos NO periodicos</td></tr>\n</table>\n</div>\n\n<div class="kb-box-warn">\n<strong>Atencion:</strong> Un numero decimal puede ser:<br>\n&bull; <strong>Exacto:</strong> 0.5, 2.75, 3.1416 (termina)<br>\n&bull; <strong>Periodico:</strong> 0.3333..., 0.142857142857... (se repite)<br>\n&bull; <strong>No periodico:</strong> 3.1415926535..., 1.41421356... (nunca se repite)<br>\nLos primeros dos son RACIONALES. El ultimo es IRRACIONAL.\n</div>\n\n<h3>Propiedades fundamentales</h3>\n\n<h4>1. Propiedad Conmutativa</h4>\n<p>El orden no afecta el resultado.</p>\n<div class="kb-ejemplo">\na + b = b + a &rarr; 3 + 5 = 5 + 3 = 8<br>\na &middot; b = b &middot; a &rarr; 3 &middot; 5 = 5 &middot; 3 = 15\n</div>\n\n<h4>2. Propiedad Asociativa</h4>\n<p>La forma de agrupar no afecta el resultado.</p>\n<div class="kb-ejemplo">\n(a + b) + c = a + (b + c) &rarr; (2+3)+4 = 2+(3+4) = 9<br>\n(a &middot; b) &middot; c = a &middot; (b &middot; c) &rarr; (2&middot;3)&middot;4 = 2&middot;(3&middot;4) = 24\n</div>\n\n<h4>3. Propiedad Distributiva (LA MAS IMPORTANTE)</h4>\n<p>Multiplicas cada termino dentro del parentesis.</p>\n<div class="kb-ejemplo">\na(b + c) = ab + ac<br>\n3(x + 2) = 3x + 6<br>\n-2(3x - 1) = -6x + 2 (cuidado con los signos!)<br>\n(x + 2)(x + 3) = x&middot;x + x&middot;3 + 2&middot;x + 2&middot;3 = x&sup2; + 5x + 6\n</div>\n\n<h4>Jerarquia de operaciones (PEMDAS)</h4>\n<ol>\n<li><strong>P</strong>arentesis</li>\n<li><strong>E</strong>xponentes y raices</li>\n<li><strong>M</strong>ultiplicacion y <strong>D</strong>ivision</li>\n<li><strong>A</strong>dicion y <strong>S</strong>ustraccion</li>\n</ol>\n\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> 3 + 2 &times; 5&sup2;<br>\nPrimero exponente: 5&sup2; = 25<br>\nLuego multiplicacion: 2 &times; 25 = 50<br>\nFinal: 3 + 50 = <strong>53</strong>\n</div>\n\n</div>\n	[{"problema": "Clasifica: 5, -3, 1/2, √2, π", "solucion": "5 ∈ ℕ,ℤ,ℚ,ℝ | -3 ∈ ℤ,ℚ,ℝ | 1/2 ∈ ℚ,ℝ | √2 ∈ 𝕀,ℝ | π ∈ 𝕀,ℝ"}, {"problema": "Calcula: 4 + 6 ÷ 2 × 3", "solucion": "6÷2=3, 3×3=9, 4+9=13"}, {"problema": "Calcula: −3² + (4−1)²", "solucion": "−9 + (3)² = −9 + 9 = 0"}]	PEMDAS: primero Parentesis, luego Exponentes, luego Multiplicacion/Division, luego Adicion/Sustraccion. Nunca sumes antes de multiplicar! Cuidado con -3² vs (-3)²: el primero es -9, el segundo es 9.	1	10	2	2026-05-14 14:34:19.176541
38	radicales	Radicales y Potencias: Domina las Raices	\n<div class="kb-article">\n\n<h2>Que es un radical?</h2>\n<p>Un <strong>radical</strong> (o raiz) es la operacion inversa de la potenciacion.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> &supn;&radic;a = b &nbsp;significa&nbsp; b&supn; = a<br>\n&radic;16 = 4 porque 4&sup2; = 16<br>\n&sup3;&radic;27 = 3 porque 3&sup3; = 27<br>\n&sup4;&radic;16 = 2 porque 2&sup4; = 16\n</div>\n\n<h3>Partes de un radical</h3>\n<ul>\n<li><strong>Indice (n):</strong> El numero pequeno arriba a la izquierda. Si no hay, es 2 (raiz cuadrada).</li>\n<li><strong>Radicando (a):</strong> Lo que esta dentro de la raiz.</li>\n<li><strong>Raiz (b):</strong> El resultado.</li>\n</ul>\n\n<h3>Propiedades de los radicales</h3>\n\n<h4>Raiz de un producto</h4>\n<div class="kb-ejemplo">\n<strong>&supn;&radic;(a &middot; b) = &supn;&radic;a &middot; &supn;&radic;b</strong><br>\n&radic;(4 &middot; 9) = &radic;4 &middot; &radic;9 = 2 &middot; 3 = 6\n</div>\n\n<h4>Raiz de un cociente</h4>\n<div class="kb-ejemplo">\n<strong>&supn;&radic;(a/b) = &supn;&radic;a / &supn;&radic;b</strong><br>\n&radic;(16/4) = &radic;16 / &radic;4 = 4/2 = 2\n</div>\n\n<div class="kb-box-warn">\n<strong>CUIDADO! Error mortal en examenes:</strong><br>\n&radic;(a + b) <strong>NO</strong> es igual a &radic;a + &radic;b<br>\n&radic;(9 + 16) = &radic;25 = 5 pero &radic;9 + &radic;16 = 3 + 4 = 7. 5 &ne; 7!\n</div>\n\n<h3>Exponentes fraccionarios</h3>\n<div class="kb-table">\n<table>\n<tr><th>Radical</th><th>Exponente fraccionario</th></tr>\n<tr><td>&radic;a</td><td>a&sup1;/&sup2;</td></tr>\n<tr><td>&sup3;&radic;a</td><td>a&sup1;/&sup3;</td></tr>\n<tr><td>&sup4;&radic;a</td><td>a&sup1;/&sup4;</td></tr>\n<tr><td>&supn;&radic;a&supm;</td><td>a&supm;/&supn;</td></tr>\n</table>\n</div>\n\n<h3>Simplificacion de radicales</h3>\n<div class="kb-ejemplo">\n<strong>Simplifica &radic;(72):</strong><br>\nPaso 1: 72 = 36 &times; 2<br>\nPaso 2: &radic;72 = &radic;36 &times; &radic;2 = 6&radic;2\n</div>\n\n<h3>Racionalizacion</h3>\n<p><strong>Racionalizar</strong> es eliminar los radicales del denominador.</p>\n\n<h4>Caso 1: Denominador con una sola raiz</h4>\n<div class="kb-ejemplo">\n1/&radic;2 = (1&middot;&radic;2)/(&radic;2&middot;&radic;2) = &radic;2/2\n</div>\n\n<h4>Caso 2: Denominador con suma/resta de raices</h4>\n<p>Multiplica por el <strong>conjugado</strong>.</p>\n<div class="kb-ejemplo">\n1/(&radic;3 + 1) = (&radic;3-1)/((&radic;3+1)(&radic;3-1)) = (&radic;3-1)/(3-1) = (&radic;3-1)/2\n</div>\n\n</div>\n	[{"problema": "Simplifica: √(50)", "solucion": "√(25×2) = 5√2"}, {"problema": "Simplifica: ∛(24)", "solucion": "∛(8×3) = 2∛3"}, {"problema": "Racionaliza: 3/√5", "solucion": "3√5/5"}, {"problema": "Racionaliza: 1/(√2 - 1)", "solucion": "(√2+1)/(2-1) = √2+1"}]	Cuando racionalices, multiplica SIEMPRE numerador y denominador por lo mismo. Para el conjugado: (a+b)(a-b) = a²-b². Recuerda: √(a²) = |a| (valor absoluto). Exponente fraccionario: a^(m/n) = ⁿ√(aᵐ).	1	10	3	2026-05-14 14:34:19.176541
39	polinomios	Polinomios: Operaciones y Propiedades	\n<div class="kb-article">\n\n<h2>Que es un polinomio?</h2>\n<p>Un <strong>polinomio</strong> es una expresion algebraica formada por la suma de terminos llamados <strong>monomios</strong>.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> Asi como 3x&sup2; + 2x - 1 es una expresion, cada parte (3x&sup2;, 2x, -1) es un termino. Los numeros que multiplican a las variables se llaman <strong>coeficientes</strong>.\n</div>\n\n<h3>Vocabulario de polinomios</h3>\n<ul>\n<li><strong>Monomio:</strong> Un solo termino (5x&sup2;, -3y, 7)</li>\n<li><strong>Binomio:</strong> Dos terminos (x + 3, 2x&sup2; - 5x)</li>\n<li><strong>Trinomio:</strong> Tres terminos (x&sup2; + 5x + 6)</li>\n<li><strong>Grado:</strong> El mayor exponente de la variable</li>\n<li><strong>Termino independiente:</strong> El termino sin variable</li>\n</ul>\n\n<div class="kb-ejemplo">\n<strong>Ejemplo:</strong> En 4x&sup3; - 2x&sup2; + 5x - 7:<br>\nCoeficientes: 4, -2, 5, -7<br>\nGrado: 3<br>\nTermino independiente: -7\n</div>\n\n<h3>Suma y resta de polinomios</h3>\n<p>Solo puedes sumar o restar terminos <strong>semejantes</strong> (misma variable con el mismo exponente).</p>\n<div class="kb-ejemplo">\n(3x&sup2; + 2x - 1) + (x&sup2; - 4x + 5)<br>\n= (3x&sup2; + x&sup2;) + (2x - 4x) + (-1 + 5)<br>\n= 4x&sup2; - 2x + 4\n</div>\n\n<h3>Multiplicacion de polinomios (FOIL)</h3>\n<div class="kb-ejemplo">\n<strong>FOIL:</strong> (2x + 1)(x - 3)<br>\n<strong>F</strong>irst: 2x&middot;x = 2x&sup2;<br>\n<strong>O</strong>uter: 2x&middot;(-3) = -6x<br>\n<strong>I</strong>nner: 1&middot;x = x<br>\n<strong>L</strong>ast: 1&middot;(-3) = -3<br>\nTotal: 2x&sup2; - 5x - 3\n</div>\n\n<h3>Productos notables (MEMORIZA!)</h3>\n<div class="kb-table">\n<table>\n<tr><th>Nombre</th><th>Formula</th><th>Ejemplo</th></tr>\n<tr><td>Cuadrado de suma</td><td>(a + b)² = a² + 2ab + b²</td><td>(x+3)² = x²+6x+9</td></tr>\n<tr><td>Cuadrado de dif.</td><td>(a - b)² = a² - 2ab + b²</td><td>(x-3)² = x²-6x+9</td></tr>\n<tr><td>Dif. de cuadrados</td><td>(a+b)(a-b) = a²-b²</td><td>(x+3)(x-3)=x²-9</td></tr>\n<tr><td>Cubo de suma</td><td>(a+b)³ = a³+3a²b+3ab²+b³</td><td>(x+1)³ = x³+3x²+3x+1</td></tr>\n</table>\n</div>\n\n</div>\n	[{"problema": "Suma: (4x³+2x-1) + (x³-3x+5)", "solucion": "5x³ - x + 4"}, {"problema": "Multiplica: (x+2)(x-5)", "solucion": "x² - 3x - 10"}, {"problema": "Desarrolla: (x+4)²", "solucion": "x² + 8x + 16"}, {"problema": "Multiplica: (2x-1)(x²+3x-2)", "solucion": "2x³ + 5x² - 7x + 2"}]	FOIL: First, Outer, Inner, Last. Para el cuadrado de un binomio: cuadrado del primero, mas/menos el doble producto, mas cuadrado del segundo. (a+b)² NO es a²+b². Error comun en examenes del TEC.	1	10	4	2026-05-14 14:34:19.176541
40	factorizacion	Factorizacion: Todos los Metodos	\n<div class="kb-article">\n\n<h2>Que es la factorizacion?</h2>\n<p>La <strong>factorizacion</strong> descompone una expresion algebraica en un producto de factores mas simples.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> Asi como 12 = 3 &times; 4, x&sup2; - 9 = (x + 3)(x - 3). Sirve para resolver ecuaciones y simplificar fracciones.\n</div>\n\n<h3>Metodo 1: Factor Comun (siempre el primero)</h3>\n<div class="kb-ejemplo">\n6x&sup2; + 4x = 2x(3x + 2)<br>\nMCD de 6 y 4 = 2. Variable con menor exponente: x&sup1;. Factor comun = 2x.\n</div>\n\n<h3>Metodo 2: Diferencia de Cuadrados</h3>\n<p><strong>a&sup2; - b&sup2; = (a + b)(a - b)</strong></p>\n<div class="kb-ejemplo">\nx&sup2; - 9 = (x + 3)(x - 3)<br>\nVerifica: (x+3)(x-3) = x&sup2; - 3x + 3x - 9 = x&sup2; - 9\n</div>\n\n<h3>Metodo 3: Trinomio Cuadrado Perfecto</h3>\n<p><strong>a&sup2; + 2ab + b&sup2; = (a + b)&sup2;</strong></p>\n<div class="kb-ejemplo">\nx&sup2; + 6x + 9 = (x + 3)&sup2;<br>\nVerifica: 2ab = 2&middot;x&middot;3 = 6x (coincide con el termino del medio)\n</div>\n\n<h3>Metodo 4: Trinomio General (ax&sup2; + bx + c)</h3>\n<p>Se buscan DOS numeros que <strong>multipliquen</strong> a&middot;c y <strong>sumen</strong> b.</p>\n<div class="kb-ejemplo">\nx&sup2; + 5x + 6<br>\na&middot;c = 1&middot;6 = 6. Dos numeros que multipliquen 6 y sumen 5: 2 y 3.<br>\n= (x + 2)(x + 3)\n</div>\n\n<h3>Metodo 5: Suma y Diferencia de Cubos</h3>\n<div class="kb-ejemplo">\na&sup3; + b&sup3; = (a + b)(a&sup2; - ab + b&sup2;)<br>\na&sup3; - b&sup3; = (a - b)(a&sup2; + ab + b&sup2;)<br><br>\nx&sup3; + 8 = (x + 2)(x&sup2; - 2x + 4)\n</div>\n\n<h3>Orden de factorizacion (JERARQUIA)</h3>\n<ol>\n<li><strong>Factor comun</strong></li>\n<li><strong>Diferencia de cuadrados</strong></li>\n<li><strong>Trinomio cuadrado perfecto</strong></li>\n<li><strong>Trinomio general</strong></li>\n<li><strong>Suma/diferencia de cubos</strong></li>\n</ol>\n\n</div>\n	[{"problema": "Factoriza: 12x³ - 8x² + 4x", "solucion": "Factor comun: 4x(3x² - 2x + 1)"}, {"problema": "Factoriza: x⁴ - 16", "solucion": "(x²+4)(x²-4) = (x²+4)(x+2)(x-2)"}, {"problema": "Factoriza: x² + 10x + 25", "solucion": "TCP: (x + 5)²"}, {"problema": "Factoriza: x² + 7x + 12", "solucion": "(x + 3)(x + 4)"}, {"problema": "Factoriza: 27 - x³", "solucion": "(3 - x)(9 + 3x + x²)"}]	Siempre intenta factor comun PRIMERO. Si no hay, revisa diferencia de cuadrados. Luego trinomio. Jerarquia: 1) FC 2) Formulas notables 3) TG. Verifica multiplicando los factores. a²+b² NO se factoriza en reales.	1	10	5	2026-05-14 14:34:19.176541
41	fracciones-alg	Fracciones Algebraicas: Dominalas	\n<div class="kb-article">\n\n<h2>Que es una fraccion algebraica?</h2>\n<p>Es una fraccion donde el <strong>numerador</strong> y/o <strong>denominador</strong> son polinomios. Las mismas reglas de las fracciones numericas aplican.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> (x+1)/(x-2) es una fraccion algebraica. El denominador NUNCA puede ser cero: x &ne; 2.\n</div>\n\n<h3>Dominio</h3>\n<p>El <strong>dominio</strong> son los valores que puede tomar la variable. El denominador nunca puede ser cero.</p>\n\n<h3>Simplificacion</h3>\n<p>Factoriza numerador y denominador. Cancela factores comunes.</p>\n<div class="kb-ejemplo">\n(x&sup2; - 1)/(x + 1) = (x+1)(x-1)/(x+1) = x - 1, x &ne; -1\n</div>\n\n<h3>Suma y resta</h3>\n<p>MCM de los denominadores. Convierte cada fraccion. Suma/resta numeradores.</p>\n<div class="kb-ejemplo">\n1/(x+1) + 1/(x-1)<br>\nMCM = (x+1)(x-1)<br>\n= (x-1+x+1)/((x+1)(x-1)) = 2x/(x&sup2;-1)\n</div>\n\n<h3>Multiplicacion y division</h3>\n<div class="kb-ejemplo">\n<strong>Multiplicacion:</strong> (x+1)/(x-2) &middot; (x-2)/(x+3) = (x+1)/(x+3), x&ne;2, x&ne;-3<br>\n<strong>Division:</strong> (x/2) &divide; (x/4) = (x/2) &times; (4/x) = 2, x&ne;0\n</div>\n\n</div>\n	[{"problema": "Simplifica: (x² - 4)/(x - 2)", "solucion": "x + 2, x ≠ 2"}, {"problema": "Suma: 1/(x+2) + 1/(x-2)", "solucion": "2x/(x²-4), x ≠ 2, x ≠ -2"}, {"problema": "Multiplica: (x+3)/(x-1) · (x-1)/(x+4)", "solucion": "(x+3)/(x+4), x ≠ 1, x ≠ -4"}]	Siempre indica el dominio: valores que hacen cero el denominador ORIGINAL. Para sumar, el MCM es el producto de todos los factores distintos con su mayor exponente. Factorizar es tu mejor herramienta.	1	10	6	2026-05-14 14:34:19.176541
42	ecuaciones	Ecuaciones: Guia Completa	\n<div class="kb-article">\n\n<h2>Que es una ecuacion?</h2>\n<p>Una <strong>ecuacion</strong> es una igualdad matematica con una o mas <strong>incognitas</strong>.</p>\n\n<div class="kb-box">\n<strong>Regla de Oro:</strong> Todo lo que hagas de un lado del signo =, hazlo EXACTAMENTE IGUAL del otro lado.\n</div>\n\n<h3>Ecuaciones lineales</h3>\n<p>Forma: ax + b = c. La variable tiene exponente 1.</p>\n<div class="kb-ejemplo">\n3x + 7 = 22<br>\n3x = 22 - 7 = 15<br>\nx = 5<br>\nVerifica: 3(5)+7 = 22\n</div>\n\n<h3>Ecuaciones cuadraticas</h3>\n<p>Forma: ax&sup2; + bx + c = 0</p>\n<p><strong>Formula cuadratica:</strong> x = (-b &plusmn; &radic;(b&sup2; - 4ac)) / (2a)</p>\n\n<h4>El discriminante (&Delta; = b&sup2; - 4ac)</h4>\n<div class="kb-table">\n<table>\n<tr><th>&Delta;</th><th>Soluciones</th></tr>\n<tr><td>&Delta; &gt; 0</td><td>Dos soluciones reales</td></tr>\n<tr><td>&Delta; = 0</td><td>Una solucion (raiz doble)</td></tr>\n<tr><td>&Delta; &lt; 0</td><td>Sin soluciones reales</td></tr>\n</table>\n</div>\n\n<div class="kb-ejemplo">\nx&sup2; - 5x + 6 = 0<br>\na=1, b=-5, c=6<br>\nDiscriminante: 25-24 = 1<br>\nx = (5 &plusmn; 1)/2<br>\nx&sub1; = 3, x&sub2; = 2\n</div>\n\n</div>\n	[{"problema": "Resuelve: 3x + 7 = 22", "solucion": "3x = 15 → x = 5"}, {"problema": "Resuelve: x² - 5x + 6 = 0", "solucion": "(x-2)(x-3)=0 → x=2, x=3"}, {"problema": "Resuelve: x² + 4x + 4 = 0", "solucion": "(x+2)²=0 → x=-2 (raiz doble)"}, {"problema": "Resuelve: 2x² - 4x - 6 = 0", "solucion": "x = (4±√64)/4 → x₁=3, x₂=-1"}]	Para ecuaciones de 2do grado: primero FACTORIZA (mas rapido). Si no puedes en 10 segundos, usa la formula cuadratica. MEMORIZA: x = (-b ± √(b²-4ac))/(2a). Siempre verifica tus soluciones.	1	10	7	2026-05-14 14:34:19.176541
43	sistemas-ecuaciones	Sistemas de Ecuaciones	\n<div class="kb-article">\n\n<h2>Que es un sistema de ecuaciones?</h2>\n<p>Conjunto de dos o mas ecuaciones con dos o mas incognitas que se resuelven <strong>simultaneamente</strong>.</p>\n\n<div class="kb-box">\n<strong>Idea clave:</strong> La solucion debe satisfacer TODAS las ecuaciones. Graficamente, es el punto donde se cruzan las rectas.\n</div>\n\n<h3>Metodo 1: Sustitucion</h3>\n<p>Despeja una variable y sustitoye en la otra ecuacion.</p>\n<div class="kb-ejemplo">\n{x + y = 5, x - y = 1}<br>\nx = 5 - y<br>\n(5-y) - y = 1 &rarr; -2y = -4 &rarr; y = 2<br>\nx = 5 - 2 = 3<br>\nSolucion: (3, 2)\n</div>\n\n<h3>Metodo 2: Eliminacion</h3>\n<p>Suma o resta las ecuaciones para eliminar una variable.</p>\n<div class="kb-ejemplo">\n{2x + y = 7, x - y = 2}<br>\nSumando: 3x = 9 &rarr; x = 3<br>\n2(3)+y=7 &rarr; y=1<br>\nSolucion: (3, 1)\n</div>\n\n<h3>Tipos de soluciones</h3>\n<div class="kb-table">\n<table>\n<tr><th>Tipo</th><th>Grafica</th><th>Significado</th></tr>\n<tr><td>Unica solucion</td><td>Rectas que se cruzan</td><td>Ecuaciones independientes</td></tr>\n<tr><td>Infinitas</td><td>Rectas coincidentes</td><td>Ecuaciones equivalentes</td></tr>\n<tr><td>Sin solucion</td><td>Rectas paralelas</td><td>Ecuaciones contradictorias</td></tr>\n</table>\n</div>\n\n</div>\n	[{"problema": "Resuelve: {x+y=5, x-y=1}", "solucion": "Por sustitucion: x=3, y=2"}, {"problema": "Resuelve: {2x+y=7, x-y=2}", "solucion": "Por eliminacion: x=3, y=1"}, {"problema": "Resuelve: {y=2x+1, y=-x+7}", "solucion": "Por igualacion: x=2, y=5"}]	Si una variable ya esta despejada, usa SUSTITUCION. Si los coeficientes son iguales/opuestos, usa ELIMINACION. Si ambas estan despejadas, usa IGUALACION. Siempre verifica en AMBAS ecuaciones.	1	10	8	2026-05-14 14:34:19.176541
44	inecuaciones	Inecuaciones: Desigualdades	\n<div class="kb-article">\n\n<h2>Que es una inecuacion?</h2>\n<p>Una <strong>inecuacion</strong> es una desigualdad (&gt;, &lt;, &ge;, &le;) con incognitas. La solucion son <strong>intervalos</strong>.</p>\n\n<div class="kb-box-warn">\n<strong>Regla CRITICA:</strong> Si multiplicas o divides por un numero <strong>NEGATIVO</strong>, la desigualdad se <strong>INVIERTE</strong>.<br>\n-2x &gt; 6 &rarr; x &lt; -3\n</div>\n\n<h3>Inecuaciones lineales</h3>\n<div class="kb-ejemplo">\n2x - 4 &gt; 6<br>\n2x &gt; 10 &rarr; x &gt; 5<br>\nSolucion: (5, &infin;)\n</div>\n\n<div class="kb-ejemplo">\n-3x + 9 &ge; 0<br>\n-3x &ge; -9 &rarr; x &le; 3 (se invirtio)<br>\nSolucion: (-&infin;, 3]\n</div>\n\n<h3>Metodo de puntos criticos</h3>\n<div class="kb-pasos">\n<ol>\n<li>Despeja hasta tener CERO de un lado</li>\n<li>Encuentra los puntos criticos (raices del numerador y denominador)</li>\n<li>Ubicalos en la recta numerica</li>\n<li>Prueba un valor en cada intervalo</li>\n<li>Escribe la solucion como intervalos</li>\n</ol>\n</div>\n\n<div class="kb-ejemplo">\n(x - 3)/(x + 2) &le; 0<br>\nPuntos criticos: x=3, x=-2<br>\nIntervalos: (-&infin;,-2), (-2,3], [3,&infin;)<br>\nProbando x=0: (0-3)/(0+2) = -1.5 &le; 0 &rarr; SI<br>\nSolucion: (-2, 3]<br>\n-2 es ABIERTO porque el denominador se hace cero.\n</div>\n\n</div>\n	[{"problema": "Resuelve: 2x - 4 > 6", "solucion": "x > 5 → (5, ∞)"}, {"problema": "Resuelve: -3x + 9 ≥ 0", "solucion": "x ≤ 3 → (-∞, 3]"}, {"problema": "Resuelve: (x-3)/(x+2) ≤ 0", "solucion": "Puntos criticos: x=3, x=-2. Solucion: (-2, 3]"}]	REPITE: Si multiplico o divido por negativo, el signo se invierte. Los puntos del denominador son SIEMPRE abiertos. Verifica con un valor de cada intervalo en la desigualdad ORIGINAL.	1	10	9	2026-05-14 14:34:19.176541
45	plano-cartesiano	Plano Cartesiano y Funciones	\n<div class="kb-article">\n\n<h2>El Plano Cartesiano</h2>\n<p>Dos ejes perpendiculares: <strong>eje X</strong> (horizontal) y <strong>eje Y</strong> (vertical). Cada punto es (x, y).</p>\n\n<h3>Distancia entre dos puntos</h3>\n<div class="kb-box">\n<strong>d = &radic;[(x&sub2; - x&sub1;)&sup2; + (y&sub2; - y&sub1;)&sup2;]</strong>\n</div>\n<div class="kb-ejemplo">\nDistancia entre A(1, 2) y B(4, 6)<br>\nd = &radic;[9+16] = &radic;25 = 5\n</div>\n\n<h3>Punto medio</h3>\n<div class="kb-box">\n<strong>M = ((x&sub1;+x&sub2;)/2, (y&sub1;+y&sub2;)/2)</strong>\n</div>\n\n<h3>Concepto de funcion</h3>\n<p>Cada elemento del dominio (x) tiene <strong>EXACTAMENTE UNA</strong> imagen en el codominio (y).</p>\n\n<div class="kb-box">\n<strong>Prueba de la recta vertical:</strong> Si una vertical corta la grafica en MAS DE UN punto, NO es funcion.\n</div>\n\n<h3>Dominio y Rango</h3>\n<ul>\n<li><strong>Dominio:</strong> Valores que puede tomar x</li>\n<li><strong>Rango:</strong> Valores que puede tomar y = f(x)</li>\n</ul>\n\n<div class="kb-ejemplo">\nf(x) = &radic;(x - 2)<br>\nDominio: x - 2 &ge; 0 &rarr; x &ge; 2 &rarr; [2, &infin;)<br>\nRango: [0, &infin;)\n</div>\n\n</div>\n	[{"problema": "Distancia entre A(1,1) y B(4,5)", "solucion": "d = √(9+16) = 5"}, {"problema": "Punto medio entre (2,4) y (6,8)", "solucion": "((2+6)/2, (4+8)/2) = (4,6)"}, {"problema": "Halla el dominio de f(x) = 1/(x-3)", "solucion": "Dominio: ℝ - {3} = (-∞,3) ∪ (3,∞)"}]	Prueba de la recta vertical: infalible. Dominio = que x puedo meter. Rango = que y puede salir. Para raices: radicando ≥ 0. Para fracciones: denominador ≠ 0. En el TEC, dominio y rango son preguntas seguras.	1	10	10	2026-05-14 14:34:19.176541
46	exp-log	Exponenciales y Logaritmos	\n<div class="kb-article">\n\n<h2>Funcion Exponencial</h2>\n<p>Forma: <strong>f(x) = a &middot; b&supx;</strong>, b &gt; 0, b &ne; 1.</p>\n\n<h3>Propiedades de exponentes</h3>\n<div class="kb-table">\n<table>\n<tr><th>Propiedad</th><th>Formula</th></tr>\n<tr><td>Producto</td><td>bᵐ·bⁿ = bᵐ⁺ⁿ</td></tr>\n<tr><td>Cociente</td><td>bᵐ/bⁿ = bᵐ⁻ⁿ</td></tr>\n<tr><td>Potencia de potencia</td><td>(bᵐ)ⁿ = bᵐⁿ</td></tr>\n<tr><td>Exp negativo</td><td>b⁻ⁿ = 1/bⁿ</td></tr>\n<tr><td>Exp cero</td><td>b⁰ = 1</td></tr>\n</table>\n</div>\n\n<h2>Funcion Logaritmica</h2>\n<p>El logaritmo es la funcion inversa de la exponencial.</p>\n\n<div class="kb-box">\n<strong>Definicion:</strong> log_b(x) = n &nbsp;significa&nbsp; bⁿ = x<br>\nlog&sub2;(8) = 3 porque 2&sup3; = 8\n</div>\n\n<h3>Propiedades de Logaritmos</h3>\n<div class="kb-table">\n<table>\n<tr><th>Propiedad</th><th>Formula</th></tr>\n<tr><td>Log de producto</td><td>log_b(x·y) = log_b(x) + log_b(y)</td></tr>\n<tr><td>Log de cociente</td><td>log_b(x/y) = log_b(x) - log_b(y)</td></tr>\n<tr><td>Log de potencia</td><td>log_b(xⁿ) = n·log_b(x)</td></tr>\n<tr><td>Log de 1</td><td>log_b(1) = 0</td></tr>\n<tr><td>Log de la base</td><td>log_b(b) = 1</td></tr>\n<tr><td>Cambio de base</td><td>log_b(x) = log_c(x)/log_c(b)</td></tr>\n</table>\n</div>\n\n<div class="kb-box-warn">\n<strong>Dominio:</strong> El argumento de un logaritmo SIEMPRE debe ser &gt; 0. log(0) no existe, log(negativo) no existe.\n</div>\n\n</div>\n	[{"problema": "Simplifica: log₂(8) + log₂(4)", "solucion": "3 + 2 = 5"}, {"problema": "Resuelve: 2ˣ = 32", "solucion": "2ˣ = 2⁵ → x = 5"}, {"problema": "Resuelve: log₃(x) = 4", "solucion": "x = 3⁴ = 81"}, {"problema": "Resuelve: eˣ = 10", "solucion": "x = ln(10) ≈ 2.303"}]	Log y exp son funciones INVERSAS: se cancelan. log_b(bˣ)=x y b^(log_b(x))=x. Para resolver exponenciales, iguala las bases. Para logs, usa la definicion. NUNCA olvides: argumento del log debe ser > 0.	1	10	11	2026-05-14 14:34:19.176541
47	geometria	Geometria: Areas, Volumenes y Pitagoras	\n<div class="kb-article">\n\n<h2>Triangulos</h2>\n<div class="kb-box">\n<strong>Area:</strong> A = (base &times; altura) / 2\n</div>\n\n<h3>Teorema de Pitagoras</h3>\n<div class="kb-box">\n<strong>a&sup2; + b&sup2; = c&sup2;</strong>\n</div>\n<div class="kb-ejemplo">\nCatetos 3 y 4: c&sup2; = 9+16 = 25 &rarr; c = 5\n</div>\n\n<h3>Circulo</h3>\n<div class="kb-box">\n<strong>Area:</strong> A = &pi;r&sup2;<br>\n<strong>Circunferencia:</strong> C = 2&pi;r\n</div>\n\n<h3>Volumenes</h3>\n<div class="kb-table">\n<table>\n<tr><th>Solido</th><th>Volumen</th></tr>\n<tr><td>Cubo</td><td>V = a³</td></tr>\n<tr><td>Esfera</td><td>V = (4/3)πr³</td></tr>\n<tr><td>Cilindro</td><td>V = πr²h</td></tr>\n<tr><td>Cono</td><td>V = (1/3)πr²h</td></tr>\n</table>\n</div>\n\n</div>\n	[{"problema": "Area de triangulo con base 10 y altura 6", "solucion": "A = (10×6)/2 = 30"}, {"problema": "Hipotenusa si catetos son 5 y 12", "solucion": "c = √(25+144) = √169 = 13"}, {"problema": "Volumen de cubo de lado 4", "solucion": "V = 4³ = 64"}, {"problema": "Area de circulo de radio 7", "solucion": "A = 49π ≈ 153.94"}]	Pitagoras SOLO funciona en triangulos RECTANGULOS. Para figuras compuestas, divide en figuras simples y suma. El volumen siempre es area de la base × altura (con 1/3 para conos y piramides).	1	10	12	2026-05-14 14:34:19.176541
48	trigonometria	Trigonometria: Seno, Coseno y Tangente	\n<div class="kb-article">\n\n<h2>Razones Trigonometricas</h2>\n\n<div class="kb-box">\n<strong>SOH-CAH-TOA:</strong><br>\n<strong>S</strong>en = <strong>O</strong>puesto / <strong>H</strong>ipotenusa<br>\n<strong>C</strong>os = <strong>A</strong>dyacente / <strong>H</strong>ipotenusa<br>\n<strong>T</strong>an = <strong>O</strong>puesto / <strong>A</strong>dyacente = sen/ cos\n</div>\n\n<h3>Valores Exactos</h3>\n<div class="kb-table">\n<table>\n<tr><th>&theta;</th><th>0&deg;</th><th>30&deg;</th><th>45&deg;</th><th>60&deg;</th><th>90&deg;</th></tr>\n<tr><td>sen &theta;</td><td>0</td><td>1/2</td><td>&radic;2/2</td><td>&radic;3/2</td><td>1</td></tr>\n<tr><td>cos &theta;</td><td>1</td><td>&radic;3/2</td><td>&radic;2/2</td><td>1/2</td><td>0</td></tr>\n<tr><td>tan &theta;</td><td>0</td><td>1/&radic;3</td><td>1</td><td>&radic;3</td><td>&infin;</td></tr>\n</table>\n</div>\n\n<h3>Identidad Fundamental</h3>\n<div class="kb-box">\n<strong>sen&sup2;(&theta;) + cos&sup2;(&theta;) = 1</strong>\n</div>\n\n<h3>Ley de Senos</h3>\n<div class="kb-box">\n<strong>a/sen(A) = b/sen(B) = c/sen(C)</strong>\n</div>\n\n<h3>Ley de Cosenos</h3>\n<div class="kb-box">\n<strong>a&sup2; = b&sup2; + c&sup2; - 2bc&middot;cos(A)</strong>\n</div>\n<p>Cuando A=90&deg;, cos(90&deg;)=0 y se reduce a Pitagoras.</p>\n\n</div>\n	[{"problema": "Calcula sen(30°) + cos(60°)", "solucion": "1/2 + 1/2 = 1"}, {"problema": "En un triangulo rectangulo, opuesto=3, hip=5. Halla sen(θ).", "solucion": "sen(θ)=3/5=0.6"}, {"problema": "Ley de senos: A=30°, B=45°, a=10. Halla b.", "solucion": "b = 10·sen(45°)/sen(30°) ≈ 14.14"}]	SOH-CAH-TOA es tu mejor amigo. sen CRECE: 0, 1/2, √2/2, √3/2, 1. cos DECRECE: 1, √3/2, √2/2, 1/2, 0. sen²+cos²=1 siempre funciona. Usa ley de senos/cosenos para triangulos NO rectangulos.	1	10	13	2026-05-14 14:34:19.176541
49	calculo	Calculo Diferencial e Integral	\n<div class="kb-article">\n\n<h2>Limites</h2>\n<p>El <strong>limite</strong> de f(x) cuando x se acerca a a es el valor al que se aproxima f(x).</p>\n<div class="kb-box">\n<strong>lim_{x&rarr;a} f(x) = L</strong>\n</div>\n\n<p><strong>Paso 1:</strong> Siempre intenta sustitucion directa.</p>\n<div class="kb-ejemplo">\nlim_{x&rarr;2} (3x+1) = 3(2)+1 = 7\n</div>\n\n<p><strong>Paso 2:</strong> Si obtienes 0/0, factoriza.</p>\n<div class="kb-ejemplo">\nlim_{x&rarr;2} (x&sup2;-4)/(x-2) = lim_{x&rarr;2} (x+2) = 4\n</div>\n\n<h2>Derivadas</h2>\n<p>Mide la tasa de cambio instantanea. Es la pendiente de la recta tangente.</p>\n\n<div class="kb-table">\n<table>\n<tr><th>f(x)</th><th>f'(x)</th></tr>\n<tr><td>c (constante)</td><td>0</td></tr>\n<tr><td>xⁿ</td><td>n&middot;xⁿ⁻¹</td></tr>\n<tr><td>eˣ</td><td>eˣ</td></tr>\n<tr><td>ln(x)</td><td>1/x</td></tr>\n<tr><td>sen(x)</td><td>cos(x)</td></tr>\n<tr><td>cos(x)</td><td>-sen(x)</td></tr>\n</table>\n</div>\n\n<div class="kb-ejemplo">\nf(x) = 3x&sup2; + 2x + 1<br>\nf'(x) = 6x + 2\n</div>\n\n<h2>Integrales</h2>\n<p>Operacion inversa de la derivada. Representa el area bajo la curva.</p>\n\n<div class="kb-table">\n<table>\n<tr><th>Integral</th><th>Resultado</th></tr>\n<tr><td>∫xⁿ dx</td><td>xⁿ⁺¹/(n+1) + C, n &ne; -1</td></tr>\n<tr><td>∫1/x dx</td><td>ln|x| + C</td></tr>\n<tr><td>∫eˣ dx</td><td>eˣ + C</td></tr>\n<tr><td>∫cos(x) dx</td><td>sen(x) + C</td></tr>\n<tr><td>∫sen(x) dx</td><td>-cos(x) + C</td></tr>\n</table>\n</div>\n\n<div class="kb-box-warn">\n<strong>NUNCA OLVIDES:</strong> En integrales indefinidas, suma la constante <strong>C</strong>.\n</div>\n\n</div>\n	[{"problema": "Deriva: f(x)=3x²+2x+1", "solucion": "f'(x)=6x+2"}, {"problema": "Integra: ∫2x dx", "solucion": "x² + C"}, {"problema": "Calcula: lim_{x→3}(x²-9)/(x-3)", "solucion": "= lim_{x→3}(x+3)=6"}, {"problema": "Integra: ∫(3x²+2x)dx", "solucion": "x³ + x² + C"}, {"problema": "Calcula: ∫₀¹ x² dx", "solucion": "[x³/3]₀¹ = 1/3"}]	Regla de la cadena: deriva afuera, deja adentro, multiplica por derivada adentro. Nunca olvides la constante C en integrales. Para limites 0/0: factoriza o racionaliza.	5	10	14	2026-05-14 14:34:19.176541
\.


--
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaderboard (id, user_id, xp_total, ejercicios_resueltos, tasa_exito, racha_maxima, posicion_global, ultima_actualizacion) FROM stdin;
1	4	0	0	0.00	0	\N	2026-05-13 15:41:33.203571
\.


--
-- Data for Name: missions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missions (id, name, description, topic_ids, exercise_count, time_limit_min, hp_reward, xp_reward, difficulty, category, created_at) FROM stdin;
\.


--
-- Data for Name: parent_child_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parent_child_relations (id, parent_id, child_id) FROM stdin;
1	3	2
\.


--
-- Data for Name: shop_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_items (id, nombre, descripcion, tipo, precio_xp, icono, efecto, stock, nivel_requerido, activo, created_at) FROM stdin;
1	Poción de HP	Recupera 50 HP al instante	powerup	200	❤️	{"tipo": "hp_boost", "valor": 50}	-1	1	t	2026-05-14 11:14:06.433127
2	Elixir de HP	Recupera 100 HP al instante	powerup	500	💖	{"tipo": "hp_boost", "valor": 100}	-1	3	t	2026-05-14 11:14:06.433127
3	Escudo de Precisión	Las próximas 3 fallas no restan HP	powerup	800	🛡️	{"tipo": "shield", "cargos": 3}	-1	5	t	2026-05-14 11:14:06.433127
4	Multiplicador de XP x2	Gana el doble de XP por 10 minutos	powerup	1000	⚡	{"tipo": "xp_mult", "duracion_min": 10, "multiplicador": 2}	-1	5	t	2026-05-14 11:14:06.433127
5	Tema Oscuro Élite	Desbloquea el tema visual oscuro especial	tema	1500	🌙	{"tipo": "skin", "skin_id": "dark_elite"}	-1	8	t	2026-05-14 11:14:06.433127
6	Avatar DOOM Clásico	Desbloquea el avatar clásico de DOOM	avatar	2000	👹	{"tipo": "avatar", "avatar_id": "doom_classic"}	-1	10	t	2026-05-14 11:14:06.433127
\.


--
-- Data for Name: topic_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic_content (id, topic_id, title, description, theory_html, created_at) FROM stdin;
\.


--
-- Data for Name: topic_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic_progress (id, user_id, topic_id, ejercicios_completados, ejercicios_correctos, fallos_acumulados, ultima_practica) FROM stdin;
1	4	factorizacion	10	4	6	2026-05-13 18:45:45.740226
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, name, parcial_num, description) FROM stdin;
1	Factorización Profunda	1	\N
2	Inecuaciones Racionales	2	\N
3	Valor Absoluto y Propiedades	1	Despejes con distancias y análisis geométrico inicial
\.


--
-- Data for Name: user_badges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_badges (id, user_id, badge_id, fecha_obtenido) FROM stdin;
\.


--
-- Data for Name: user_inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_inventory (id, user_id, item_id, cantidad, fecha_adquisicion) FROM stdin;
\.


--
-- Data for Name: user_missions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_missions (id, user_id, mission_id, status, score, hp_remaining, completed_at, started_at) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_progress (id, user_id, exercise_id, is_correct, xp_earned, attempt_date) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password_hash, nombre, email, rol, xp, nivel, hp, racha_actual, racha_maxima, tiempo_practica, fecha_registro, ultimo_acceso, activo) FROM stdin;
1	admin	$2b$10$YourHashedPasswordHere	Administrador	admin@mathmaty.com	admin	0	1	100	0	0	0	2026-05-13 15:13:00.114248	2026-05-13 15:13:00.114248	t
2	matias	$2b$10$YourHashedPasswordHere	Matías	matias@example.com	estudiante	0	1	100	0	0	0	2026-05-13 15:13:00.117509	2026-05-13 15:13:00.117509	t
3	padre	$2b$10$YourHashedPasswordHere	Padre de Matías	padre@example.com	padre	0	1	100	0	0	0	2026-05-13 15:13:00.117824	2026-05-13 15:13:00.117824	t
4	jesquiv	$2b$10$pLalhyqVXe2wc6L7LKnzUeSwruwNNdJhjFQsh9VB6lJhrL4ijE7De	Jorge Esquivel	\N	padre	0	1	100	0	0	0	2026-05-13 15:41:33.200942	2026-05-14 19:37:32.232307	t
\.


--
-- Data for Name: xp_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.xp_history (id, user_id, cantidad, fuente, referencia_id, "timestamp") FROM stdin;
\.


--
-- Name: api_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_config_id_seq', 2, true);


--
-- Name: badges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.badges_id_seq', 39, true);


--
-- Name: event_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_participants_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: exercise_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_history_id_seq', 10, true);


--
-- Name: exercises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_id_seq', 213, true);


--
-- Name: game_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_sessions_id_seq', 1, false);


--
-- Name: knowledge_library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knowledge_library_id_seq', 49, true);


--
-- Name: leaderboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leaderboard_id_seq', 1, true);


--
-- Name: missions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.missions_id_seq', 1, false);


--
-- Name: parent_child_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parent_child_relations_id_seq', 4, true);


--
-- Name: shop_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_items_id_seq', 22, true);


--
-- Name: topic_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_content_id_seq', 1, false);


--
-- Name: topic_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_progress_id_seq', 1, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 2, true);


--
-- Name: user_badges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_badges_id_seq', 1, false);


--
-- Name: user_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_inventory_id_seq', 1, false);


--
-- Name: user_missions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_missions_id_seq', 1, false);


--
-- Name: user_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_progress_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: xp_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.xp_history_id_seq', 1, false);


--
-- Name: api_config api_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_config
    ADD CONSTRAINT api_config_pkey PRIMARY KEY (id);


--
-- Name: api_config api_config_user_id_proveedor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_config
    ADD CONSTRAINT api_config_user_id_proveedor_key UNIQUE (user_id, proveedor);


--
-- Name: badges badges_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_codigo_key UNIQUE (codigo);


--
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (id);


--
-- Name: event_participants event_participants_event_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_event_id_user_id_key UNIQUE (event_id, user_id);


--
-- Name: event_participants event_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: exercise_history exercise_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT exercise_history_pkey PRIMARY KEY (id);


--
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);


--
-- Name: game_sessions game_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_sessions
    ADD CONSTRAINT game_sessions_pkey PRIMARY KEY (id);


--
-- Name: knowledge_library knowledge_library_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knowledge_library
    ADD CONSTRAINT knowledge_library_pkey PRIMARY KEY (id);


--
-- Name: leaderboard leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_pkey PRIMARY KEY (id);


--
-- Name: leaderboard leaderboard_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_user_id_key UNIQUE (user_id);


--
-- Name: missions missions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id);


--
-- Name: parent_child_relations parent_child_relations_parent_id_child_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_child_relations
    ADD CONSTRAINT parent_child_relations_parent_id_child_id_key UNIQUE (parent_id, child_id);


--
-- Name: parent_child_relations parent_child_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_child_relations
    ADD CONSTRAINT parent_child_relations_pkey PRIMARY KEY (id);


--
-- Name: shop_items shop_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_items
    ADD CONSTRAINT shop_items_pkey PRIMARY KEY (id);


--
-- Name: topic_content topic_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_content
    ADD CONSTRAINT topic_content_pkey PRIMARY KEY (id);


--
-- Name: topic_content topic_content_topic_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_content
    ADD CONSTRAINT topic_content_topic_id_key UNIQUE (topic_id);


--
-- Name: topic_progress topic_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_progress
    ADD CONSTRAINT topic_progress_pkey PRIMARY KEY (id);


--
-- Name: topic_progress topic_progress_user_id_topic_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_progress
    ADD CONSTRAINT topic_progress_user_id_topic_id_key UNIQUE (user_id, topic_id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: user_badges user_badges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_pkey PRIMARY KEY (id);


--
-- Name: user_badges user_badges_user_id_badge_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_badge_id_key UNIQUE (user_id, badge_id);


--
-- Name: user_inventory user_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_pkey PRIMARY KEY (id);


--
-- Name: user_inventory user_inventory_user_id_item_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_user_id_item_id_key UNIQUE (user_id, item_id);


--
-- Name: user_missions user_missions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_missions
    ADD CONSTRAINT user_missions_pkey PRIMARY KEY (id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: xp_history xp_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.xp_history
    ADD CONSTRAINT xp_history_pkey PRIMARY KEY (id);


--
-- Name: idx_event_participants_event; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_participants_event ON public.event_participants USING btree (event_id);


--
-- Name: idx_event_participants_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_participants_user ON public.event_participants USING btree (user_id);


--
-- Name: idx_events_fechas; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_events_fechas ON public.events USING btree (fecha_inicio, fecha_fin);


--
-- Name: idx_exercise_history_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_exercise_history_timestamp ON public.exercise_history USING btree ("timestamp");


--
-- Name: idx_exercise_history_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_exercise_history_user ON public.exercise_history USING btree (user_id);


--
-- Name: idx_knowledge_topic; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_knowledge_topic ON public.knowledge_library USING btree (topic_id);


--
-- Name: idx_leaderboard_xp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_leaderboard_xp ON public.leaderboard USING btree (xp_total DESC);


--
-- Name: idx_topic_progress_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_topic_progress_user ON public.topic_progress USING btree (user_id);


--
-- Name: idx_users_rol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_rol ON public.users USING btree (rol);


--
-- Name: idx_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_username ON public.users USING btree (username);


--
-- Name: idx_xp_history_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_xp_history_timestamp ON public.xp_history USING btree ("timestamp");


--
-- Name: idx_xp_history_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_xp_history_user ON public.xp_history USING btree (user_id);


--
-- Name: api_config api_config_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_config
    ADD CONSTRAINT api_config_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: event_participants event_participants_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_participants event_participants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: exercise_history exercise_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT exercise_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: game_sessions game_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_sessions
    ADD CONSTRAINT game_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: leaderboard leaderboard_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: parent_child_relations parent_child_relations_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_child_relations
    ADD CONSTRAINT parent_child_relations_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: parent_child_relations parent_child_relations_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_child_relations
    ADD CONSTRAINT parent_child_relations_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: topic_progress topic_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic_progress
    ADD CONSTRAINT topic_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_badges user_badges_badge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_badge_id_fkey FOREIGN KEY (badge_id) REFERENCES public.badges(id) ON DELETE CASCADE;


--
-- Name: user_badges user_badges_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_inventory user_inventory_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.shop_items(id) ON DELETE CASCADE;


--
-- Name: user_inventory user_inventory_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_missions user_missions_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_missions
    ADD CONSTRAINT user_missions_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id);


--
-- Name: user_missions user_missions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_missions
    ADD CONSTRAINT user_missions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: xp_history xp_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.xp_history
    ADD CONSTRAINT xp_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict HDUVKF0gjm1tTbedlXaOOsO2hi4fl8SD7gqbiNKnefddl685IB3fFGmWF6wVrJL

