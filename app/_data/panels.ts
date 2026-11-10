// Made-up panel catalog. Every figure is invented until real data sources exist.
// Everything here is deterministic so it can be prerendered: no Math.random() or Date.now().

export type PanelCategory = "Ventas" | "Marketing" | "Operaciones" | "Finanzas";
export type ChartKind = "lineas" | "barras" | "calor" | "donut";

export type Panel = {
  id: string; // slug, used in the URL
  title: string;
  short: string; // card description
  long: string; // detail description
  category: PanelCategory;
  chartKind: ChartKind; // decides the thumbnail
  views: number; // invented total of views
  viewers: number; // invented count of distinct users
  updatedAt: string; // fixed "dd/mm/aaaa" text
  frequency: string; // "Diaria", "Semanal" or "Mensual"
  source: string; // fictional source name
};

export type RecentView = { user: string; date: string };

export const CATEGORIES: PanelCategory[] = ["Ventas", "Marketing", "Operaciones", "Finanzas"];

export const PANELS: Panel[] = [
  {
    id: "ventas-por-region",
    title: "Ventas por región",
    short: "Facturación mensual comparada entre las seis regiones comerciales.",
    long: "Compara la facturación de cada región con la del mes anterior y con su objetivo. Sirve para detectar pronto qué zonas se quedan atrás y dónde conviene reforzar al equipo comercial.",
    category: "Ventas",
    chartKind: "barras",
    views: 48210,
    viewers: 1240,
    updatedAt: "08/11/2026",
    frequency: "Diaria",
    source: "CRM Comercial",
  },
  {
    id: "margen-por-producto",
    title: "Margen por producto",
    short: "Margen bruto de cada línea de producto, de mayor a menor.",
    long: "Ordena las líneas de producto por margen bruto y separa el efecto del precio del efecto del coste. Ayuda a decidir qué referencias promocionar y cuáles revisar.",
    category: "Ventas",
    chartKind: "barras",
    views: 21760,
    viewers: 615,
    updatedAt: "02/11/2026",
    frequency: "Semanal",
    source: "ERP Sextante",
  },
  {
    id: "tendencia-de-ingresos",
    title: "Tendencia de ingresos",
    short: "Evolución de los ingresos de los últimos doce meses.",
    long: "Sigue los ingresos mes a mes durante el último año y los compara con el mismo periodo del año anterior. Muestra de un vistazo la estacionalidad y los cambios de ritmo.",
    category: "Ventas",
    chartKind: "lineas",
    views: 33940,
    viewers: 980,
    updatedAt: "01/11/2026",
    frequency: "Mensual",
    source: "ERP Sextante",
  },
  {
    id: "trafico-web",
    title: "Tráfico web",
    short: "Visitas al sitio por canal de adquisición, mes a mes.",
    long: "Reúne las visitas al sitio por canal de adquisición y muestra cuál aporta más crecimiento. Es la primera referencia para valorar el resultado de cada campaña.",
    category: "Marketing",
    chartKind: "lineas",
    views: 57380,
    viewers: 1510,
    updatedAt: "08/11/2026",
    frequency: "Diaria",
    source: "Analítica Faro",
  },
  {
    id: "embudo-de-conversion",
    title: "Embudo de conversión",
    short: "Usuarios que avanzan en cada etapa, de la visita a la compra.",
    long: "Cuenta cuántos usuarios llegan a cada etapa, desde la primera visita hasta la compra. Señala el paso en el que se pierde más gente y permite medir el efecto de cada mejora.",
    category: "Marketing",
    chartKind: "barras",
    views: 15420,
    viewers: 430,
    updatedAt: "02/11/2026",
    frequency: "Semanal",
    source: "Analítica Faro",
  },
  {
    id: "cuota-por-canal",
    title: "Cuota por canal",
    short: "Reparto de los contactos entre los canales de marketing.",
    long: "Reparte los contactos conseguidos entre los canales de marketing y muestra cómo cambia esa proporción cada mes. Resulta útil para equilibrar el presupuesto entre canales.",
    category: "Marketing",
    chartKind: "donut",
    views: 26130,
    viewers: 720,
    updatedAt: "01/11/2026",
    frequency: "Mensual",
    source: "Campañas Brújula",
  },
  {
    id: "tiempos-de-entrega",
    title: "Tiempos de entrega",
    short: "Días entre el pedido y la entrega, con su objetivo de servicio.",
    long: "Mide los días que pasan entre el pedido y la entrega y los compara con el objetivo de servicio. Permite ver si los retrasos son puntuales o una tendencia.",
    category: "Operaciones",
    chartKind: "lineas",
    views: 18690,
    viewers: 505,
    updatedAt: "08/11/2026",
    frequency: "Diaria",
    source: "Logística Meridiano",
  },
  {
    id: "ocupacion-de-almacen",
    title: "Ocupación de almacén",
    short: "Nivel de ocupación por zona y día de la semana.",
    long: "Cruza las zonas del almacén con los días de la semana para mostrar dónde se acumula la mercancía. Facilita planificar las reposiciones y evitar los picos de saturación.",
    category: "Operaciones",
    chartKind: "calor",
    views: 12350,
    viewers: 340,
    updatedAt: "02/11/2026",
    frequency: "Semanal",
    source: "Logística Meridiano",
  },
  {
    id: "incidencias-por-turno",
    title: "Incidencias por turno",
    short: "Incidencias registradas por línea y turno de trabajo.",
    long: "Cruza las líneas de producción con los turnos de trabajo para revelar en qué momentos se concentran las incidencias. Ayuda a priorizar el mantenimiento y a reforzar los turnos más afectados.",
    category: "Operaciones",
    chartKind: "calor",
    views: 29870,
    viewers: 810,
    updatedAt: "08/11/2026",
    frequency: "Diaria",
    source: "Planta Atalaya",
  },
  {
    id: "flujo-de-caja",
    title: "Flujo de caja",
    short: "Cobros, pagos y saldo de tesorería de cada mes.",
    long: "Enfrenta los cobros y los pagos de cada mes y muestra cómo evoluciona el saldo de tesorería. Anticipa los meses con menos liquidez para poder prepararlos con tiempo.",
    category: "Finanzas",
    chartKind: "lineas",
    views: 41050,
    viewers: 1120,
    updatedAt: "02/11/2026",
    frequency: "Semanal",
    source: "Tesorería Central",
  },
  {
    id: "gastos-por-area",
    title: "Gastos por área",
    short: "Reparto del gasto entre las áreas de la empresa.",
    long: "Reparte el gasto del mes entre las áreas de la empresa y lo compara con el presupuesto de cada una. Deja a la vista qué áreas se desvían y en qué proporción.",
    category: "Finanzas",
    chartKind: "donut",
    views: 24480,
    viewers: 660,
    updatedAt: "01/11/2026",
    frequency: "Mensual",
    source: "ERP Sextante",
  },
  {
    id: "rentabilidad-por-cliente",
    title: "Rentabilidad por cliente",
    short: "Rentabilidad cruzada por segmento y tamaño de cliente.",
    long: "Cruza los segmentos de clientes con su tamaño para mostrar dónde se concentra la rentabilidad. Sirve para orientar las condiciones comerciales y la atención a cada grupo.",
    category: "Finanzas",
    chartKind: "calor",
    views: 9730,
    viewers: 275,
    updatedAt: "01/11/2026",
    frequency: "Mensual",
    source: "CRM Comercial",
  },
];

const RECENT_USERS = [
  "MARTA_R",
  "JLOPEZ",
  "ANA_BI",
  "CARLOS_M",
  "LUCIA.G",
  "DIEGO_F",
  "NURIA_T",
  "PABLO_S",
  "ELENA_V",
  "IVAN_C",
  "SARA_P",
  "OSCAR_D",
];

// Recent views count back from this fixed day, never from the current date.
const RECENT_VIEWS_START = Date.UTC(2026, 10, 8);
const DAY_IN_MS = 24 * 60 * 60 * 1000;

// FNV-1a: turns a panel id into a stable numeric seed.
function hashId(id: string) {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash = Math.imul(hash ^ id.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

// Same linear congruential generator as references/templates/data.jsx.
function seededRandom(seed: number) {
  let state = seed % 233280;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getUTCFullYear()}`;
}

export function getPanel(id: string): Panel | undefined {
  return PANELS.find((panel) => panel.id === id);
}

function panelsIn(category?: PanelCategory) {
  return category ? PANELS.filter((panel) => panel.category === category) : PANELS;
}

export function getRanking(category?: PanelCategory): Panel[] {
  return [...panelsIn(category)].sort((a, b) => b.views - a.views);
}

// Most recent first. Users only repeat when count exceeds the list of names.
export function getRecentViews(panelId: string, count: number): RecentView[] {
  const random = seededRandom(hashId(panelId));
  const users = [...RECENT_USERS];
  for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
  }

  let timestamp = RECENT_VIEWS_START;
  return Array.from({ length: count }, (_, i) => {
    timestamp -= Math.floor(random() * 3) * DAY_IN_MS;
    return { user: users[i % users.length], date: formatDate(timestamp) };
  });
}

// The signed-in user's invented favorite. It depends on the panel, not on who is signed in.
export function getYourTopPanel(category?: PanelCategory): { panel: Panel; views: number } {
  const rows = panelsIn(category).map((panel) => ({
    panel,
    views: 12 + (hashId(panel.id) % 240),
  }));
  return rows.reduce((top, row) => (row.views > top.views ? row : top));
}
