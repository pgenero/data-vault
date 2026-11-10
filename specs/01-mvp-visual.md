# SPEC 01 — MVP visual de Data Vault

> **Estado:** Implementado
> **Depende de:** Ninguna
> **Fecha:** 2026-11-09
> **Objetivo:** Adaptar las cinco pantallas de `references/templates/` a un catálogo navegable de paneles de datos con contenido inventado, sin reportes ni modelos reales.

## Por qué existe esta spec

Los templates describen un portal de juegos y Data Vault es un portal de datos. La traducción no es 1:1, así que esta spec fija qué se convierte en qué.

`app/globals.css` invierte a propósito las reglas arcade: el glow solo marca foco, nada se dibuja sobre los datos y el neón no se usa en series. Los templates son la referencia de estructura. Cuando contradigan al tema, manda el tema.

## Alcance

**Dentro:**

| Template | Pantalla en Data Vault | Ruta |
| ---------------- | -------------------------------- | -------------------- |
| `biblioteca.jsx` | Biblioteca de paneles | `/` |
| `detalle.jsx` | Detalle del panel | `/paneles/[id]` |
| `reproductor.jsx` | Visor del panel con placeholder | `/paneles/[id]/ver` |
| `salon.jsx` | Ranking de paneles más consultados | `/ranking` |
| `auth.jsx` | Acceso con sesión simulada | `/acceso` |
| `nav.jsx`, `app.jsx` | Barra de navegación, menú móvil y pie | `app/layout.tsx` |

- **Biblioteca:** hero actual, búsqueda por nombre, chips de categoría, cuadrícula de tarjetas y estado sin resultados.
- **Tarjeta:** miniatura por tipo de gráfico, categoría, título, descripción, consultas y la indicación "Abrir panel". Toda la tarjeta es un único enlace al detalle.
- **Detalle:** etiquetas, título, descripción, tres cifras, `TrafficChart` como vista previa y columna de consultas recientes. Acciones: "Abrir panel" y "Volver a la biblioteca".
- **Visor:** barra superior con panel, categoría, última actualización y usuario. Debajo, un marco con el mensaje "Reporte no disponible". Barra inferior con estado y fuente. Única acción: "Salir", que vuelve al detalle.
- **Ranking:** chips "Todos" y una por categoría, podio del top 3, tabla completa y botón de vuelta. Con sesión, una fila destacada "Tu panel más consultado".
- **Acceso:** pestañas "Iniciar sesión" y "Crear cuenta", el campo de correo solo en "Crear cuenta", "Continuar como invitado" y los botones de Google y GitHub deshabilitados.
- **Sesión simulada:** cualquier dato entra sin validar y solo se guarda el nombre en `localStorage`. La barra muestra el usuario y permite salir.
- **Página 404 con el tema**, también para un `id` de panel inexistente.
- Diseño adaptable desde 360 px de ancho.

**Fuera (para futuras specs):**

- Reportes reales, modelos semánticos, conexión o incrustación de Power BI.
- Autenticación real, validación de formularios, OAuth y protección de rutas.
- Registro real de consultas. Todas las cifras son inventadas.
- Crear, editar o borrar paneles.
- Tests automatizados. El proyecto no tiene framework de pruebas.
- Metadatos SEO por página.

## Modelo de datos

Archivo nuevo: `app/_data/panels.ts`.

```ts
type PanelCategory = "Ventas" | "Marketing" | "Operaciones" | "Finanzas";
type ChartKind = "lineas" | "barras" | "calor" | "donut";

type Panel = {
  id: string;           // slug, usado en la URL
  title: string;
  short: string;        // descripción de la tarjeta
  long: string;         // descripción del detalle
  category: PanelCategory;
  chartKind: ChartKind; // decide la miniatura
  views: number;        // total de consultas inventado
  viewers: number;      // usuarios distintos inventado
  updatedAt: string;    // texto fijo "dd/mm/aaaa"
  frequency: string;    // "Diaria", "Semanal" o "Mensual"
  source: string;       // nombre ficticio de la fuente
};

type RecentView = { user: string; date: string };
```

Catálogo: 12 paneles, 3 por categoría.

| Categoría | `id` | `chartKind` |
| ----------- | ------------------------- | ----------- |
| Ventas | `ventas-por-region` | `barras` |
| Ventas | `margen-por-producto` | `barras` |
| Ventas | `tendencia-de-ingresos` | `lineas` |
| Marketing | `trafico-web` | `lineas` |
| Marketing | `embudo-de-conversion` | `barras` |
| Marketing | `cuota-por-canal` | `donut` |
| Operaciones | `tiempos-de-entrega` | `lineas` |
| Operaciones | `ocupacion-de-almacen` | `calor` |
| Operaciones | `incidencias-por-turno` | `calor` |
| Finanzas | `flujo-de-caja` | `lineas` |
| Finanzas | `gastos-por-area` | `donut` |
| Finanzas | `rentabilidad-por-cliente` | `calor` |

Exportaciones del módulo:

- `PANELS` y `CATEGORIES`.
- `getPanel(id)`: devuelve `Panel | undefined`.
- `getRanking(category?)`: paneles ordenados por `views` de mayor a menor.
- `getRecentViews(panelId, count)`: lista determinista generada con el `id` como semilla.
- `getYourTopPanel(category?)`: panel y consultas de la fila "Tu panel más consultado".

Sesión simulada en `app/_lib/session.ts`:

```ts
// Clave en localStorage: "dv_user"
type SessionUser = { name: string };
```

Convenciones:

- `name` es el usuario en mayúsculas, con 10 caracteres como máximo. Si está vacío, es `ANALISTA`.
- La contraseña y el correo nunca se guardan.
- El hook `useSession()` usa `useSyncExternalStore`. En servidor y en la hidratación devuelve "sin sesión".
- Todos los datos son deterministas: sin `Math.random()` ni `Date.now()` durante el render.

`app/_data/sample-traffic.ts` se mantiene para `TrafficChart`.

## Plan de implementación

Las pantallas se construyen con `/frontend-design`, como exige `CLAUDE.md`. Las clases nuevas se añaden a `app/globals.css` con prefijo `dv-`, sin importar `references/templates/styles.css`.

1. Crear `app/_data/panels.ts` con el catálogo y las funciones. Comprobar con el type check.
2. Crear `app/_components/site-nav.tsx` con el logo y el enlace "Biblioteca", con `aria-current` según la ruta. Moverla a `app/layout.tsx`, añadir el pie y quitar la cabecera de `app/page.tsx`. Pie: `© 2026 Data Vault · Datos de ejemplo`.
3. Crear `app/not-found.tsx` con el tema y un enlace a la biblioteca.
4. Crear `app/paneles/[id]/page.tsx` con `generateStaticParams`, `notFound()`, etiquetas, cifras y `TrafficChart` con la nota "Vista previa con datos de ejemplo". Probar por URL.
5. Añadir al detalle la columna de consultas recientes con `getRecentViews`.
6. Crear `app/paneles/[id]/ver/page.tsx` con el visor y su placeholder. Añadir al detalle el botón "Abrir panel".
7. Crear `app/_components/panel-thumb.tsx` con una miniatura SVG decorativa por cada `ChartKind`, usando solo `--series-*` y `--seq-*`.
8. Crear `app/_components/panel-card.tsx` y `app/_components/panel-library.tsx` con búsqueda, chips y estado vacío.
9. Reescribir `app/page.tsx`: hero sin el botón "Ver panel de ejemplo", seguido de la biblioteca.
10. Crear `app/ranking/page.tsx` y `app/_components/panel-ranking.tsx` con chips, podio y tabla. Añadir el enlace "Ranking" a la barra.
11. Crear `app/_lib/session.ts` con `useSession`, inicio y cierre de sesión, y con `localStorage` protegido por `try/catch`.
12. Crear `app/acceso/page.tsx` y `app/_components/auth-form.tsx`. Añadir a la barra "Iniciar sesión" o el usuario con la acción de salir.
13. Conectar la sesión a la fila "Tu panel más consultado" y al usuario del visor, que muestra "Invitado" sin sesión.
14. Añadir el menú móvil a `site-nav.tsx` con panel lateral, fondo y cierre con `Esc`, por debajo de 840 px.
15. Eliminar `getSummary` y las exportaciones de `sample-traffic.ts` que queden sin uso. Actualizar la sección "Project" de `CLAUDE.md`, que dice que la home es la única página.

## Criterios de aceptación

**Calidad**

- [ ] `npm run lint` termina sin errores.
- [ ] `npx next typegen && npx tsc --noEmit` termina sin errores.
- [ ] `npm run build` termina sin errores.
- [ ] Recorrer las cinco rutas en `npm run start` no produce errores en consola, incluidos los de hidratación.

**Biblioteca**

- [ ] `/` muestra los 12 paneles.
- [ ] Escribir "flujo" en la búsqueda deja solo "Flujo de caja".
- [ ] El chip "Ventas" deja exactamente 3 tarjetas.
- [ ] Una búsqueda sin coincidencias muestra el estado vacío.
- [ ] Cada tarjeta lleva a `/paneles/[id]` y es accesible con teclado.

**Detalle y visor**

- [ ] `/paneles/flujo-de-caja` muestra sus datos, `TrafficChart` con la nota de datos de ejemplo y las consultas recientes.
- [ ] `/paneles/no-existe` y `/paneles/no-existe/ver` muestran la página 404 con el tema.
- [ ] "Abrir panel" lleva al visor, que muestra "Reporte no disponible" y ningún gráfico.
- [ ] "Salir" vuelve al detalle del mismo panel.

**Ranking**

- [ ] `/ranking` muestra los 12 paneles ordenados por consultas de mayor a menor.
- [ ] Al elegir una categoría, el podio y la tabla muestran sus 3 paneles.
- [ ] La fila "Tu panel más consultado" aparece solo con sesión.

**Sesión**

- [ ] Enviar el formulario con "ana" lleva a `/` y la barra muestra `ANA`.
- [ ] Enviarlo vacío muestra `ANALISTA`.
- [ ] Al recargar la página, la sesión se conserva.
- [ ] Salir elimina `dv_user` de `localStorage` y la barra vuelve a "Iniciar sesión".
- [ ] `dv_user` contiene únicamente el nombre.
- [ ] El campo de correo aparece solo en "Crear cuenta".
- [ ] Los botones de Google y GitHub están deshabilitados.

**Tema y adaptabilidad**

- [ ] Ningún texto visible contiene "juego", "jugar", "jugador", "partida", "crédito" o "Arcade".
- [ ] No existen en `app/` scanlines, ruido, efecto tilt, `flicker`, `blink` ni `pulse`.
- [ ] Ningún color de `app/` usa variantes `dark:`.
- [ ] Las miniaturas usan solo tokens `--series-*` y `--seq-*`.
- [ ] A 360 px de ancho ninguna pantalla tiene scroll horizontal, salvo dentro de `.dv-table-wrap`.
- [ ] Por debajo de 840 px el menú móvil abre, navega y se cierra con `Esc`.

## Decisiones

**Correspondencias del template**

- **Sí:** visor con placeholder. Fue elegido frente a mostrar KPIs y gráficos de muestra, porque aún no existen reportes.
- **Sí:** ranking de paneles por consultas. Es la traducción directa de la puntuación.
- **No:** ranking de analistas. Introduciría un concepto de autores que el MVP no tiene.
- **Sí:** `TrafficChart` como vista previa en el detalle. El mismo gráfico aparece en todos los paneles, y una nota lo identifica como ejemplo.
- **Sí:** miniaturas por tipo de gráfico en lugar de portadas de juego.
- **No:** patrón por categoría o tarjetas sin imagen. Comunican menos y se pierde identidad.
- **Sí:** consultas recientes en la columna lateral del detalle. Conserva la estructura de la tabla de puntuaciones.
- **Sí:** eliminar lo que no tiene equivalente. Se retiran créditos, vidas, nivel, pausa, fin, modal de fin, guardar puntuación, el efecto tilt y las animaciones decorativas de la interfaz.
- **Sí:** se elimina también "Al entrar aceptas los términos". No existen términos que aceptar.

**Arquitectura**

- **Sí:** rutas reales del App Router en lugar de navegación por hash. Es la convención del proyecto.
- **Sí:** `/` pasa a ser la biblioteca, y se conserva el hero con `.dv-horizon`.
- **No:** landing más `/paneles`. Añade una pantalla sin contenido propio.
- **Sí:** `generateStaticParams` en las rutas con `[id]`. El catálogo se conoce de antemano y así `params` no exige un límite `<Suspense>` con `cacheComponents`.
- **Sí:** sesión simulada en `localStorage`. Permite ver los estados con y sin sesión.
- **No:** login solo visual. Dejaría sin ver el estado con sesión.

**Decisiones propuestas al redactar (revisar antes de aprobar)**

- **Sí:** 12 paneles, 3 por categoría. El podio necesita al menos 3 elementos en cada filtro.
- **Sí:** categorías Ventas, Marketing, Operaciones y Finanzas. Son temas genéricos y reemplazables.
- **Sí:** botones de Google y GitHub deshabilitados. Un botón activo sin efecto parece un fallo.
- **Sí:** visor sin "Actualizar" ni "Pantalla completa". Sin reporte, no tendrían efecto.
- **Sí:** textos en mayúscula normal, no en mayúsculas sostenidas. La tipografía pixel queda para logo, título y cifras clave, según la regla 4 del tema.
- **Sí:** podio sin colores oro, plata y bronce. Esos tokens no existen en el tema, y el amarillo se reserva para la cifra del primer puesto.

## Riesgos

| Riesgo | Mitigación |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Error de hidratación por leer `localStorage` | `useSyncExternalStore` con snapshot de servidor "sin sesión". La sesión aparece tras la hidratación. |
| Bucle de render por un snapshot inestable | `getSnapshot` devuelve la cadena cruda de `localStorage`, y se parsea fuera de él. |
| Cambios de sesión no reflejados en la misma pestaña | `session.ts` notifica a sus suscriptores al entrar y al salir, porque el evento `storage` no se dispara en la pestaña actual. |
| `localStorage` bloqueado | `try/catch` en lecturas y escrituras. La app sigue funcionando como invitado. |
| Datos no deterministas rompen el prerender | Valores fijos y `getRecentViews` con semilla. |
| API de Next.js 16 distinta a la conocida | Leer la guía correspondiente en `node_modules/next/dist/docs/` antes de cada ruta, como pide `AGENTS.md`. |

## Lo que **no** está en esta spec

- Reportes, modelos semánticos o integración con Power BI.
- Autenticación real o protección de rutas.
- Datos reales o registro real de consultas.
- Gestión de paneles.
- Tests automatizados.
- Metadatos SEO por página.

Cada uno de estos puntos, si llega, irá en su propia spec.
