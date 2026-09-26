# Analítica · PostHog

Objetivo: medir el embudo editorial (descubrir → leer → usar la herramienta → suscribirse → compartir) sin ruido ni datos personales innecesarios.

## Cómo está montada

- **PostHog Cloud EU** (`https://eu.i.posthog.com`). Se carga con `js/consent.js`, autohospedado en `array.js`.
- **Consentimiento previo (RGPD).** No se carga nada hasta que la persona pulsa «aceptar»; la decisión se guarda en `localStorage.ela_consent` (`granted` | `denied`). Sin consentimiento, `window.ela.capture` es no-op.
- **Solo en producción.** `consent.js` comprueba que el dominio termine en `entrelampistas.com`. En la preview de Vercel y en localhost PostHog **no** se inicializa ni encola eventos: los datos de producción quedan limpios. Para QA del tracking, usar el dominio real.
- **Config**: `person_profiles: 'identified_only'` (anónimo salvo identificación explícita, que aquí no hacemos), `autocapture: false` (solo eventos definidos a mano), `capture_pageview: true`, `capture_pageleave: true` (tiempo de permanencia y profundidad de scroll).
- **Taxonomía**: `js/analitica.js` expone `window.ela.track(nombre, props)`, que añade a cada evento `tema` y `eje` cuando la página es un ensayo. PostHog añade por su cuenta URL, referente, dispositivo y campaña (utm).

## Catálogo de eventos

| Evento | Cuándo | Propiedades |
|---|---|---|
| `$pageview` / `$pageleave` | PostHog, cada carga y salida | (automáticas) |
| `mapa_visto` | carga de la pantalla de mapa (`/x`) | `tema`, `eje` |
| `mapa_parada` | abre una parada del recorrido | `tema`, `eje`, `parada` |
| `ensayo_abierto` | carga del ensayo (`/x/ensayo`) | `tema`, `eje`, `desde` (mapa · parada · seguir · feed · otra · directo), `seccion` si entra por una |
| `ensayo_progreso` | cruza el 25 / 50 / 75 % del ensayo | `tema`, `eje`, `hito` |
| `ensayo_leido` | llega al 100 % | `tema`, `eje` |
| `indice_empezado` | arranca el test | `desde` (portada/continuar) |
| `indice_paso` | pinta cada pregunta (1..10) | `paso`, `dimension`, `pregunta`, `respondida` |
| `indice_terminado` | ve el resultado | `indice`, `titulo` |
| `indice_q1_feed` | responde la primera pregunta en el feed | — |
| `feed_filtro` | cambia el filtro del feed | `filtro` |
| `feed_mapa` | pulsa «ir al mapa» o «leer el ensayo» en una tarjeta | `tema`, `destino` (mapa · ensayo) |
| `feed_tesis` | abre la tesis dentro de la foto | `tema` |
| `correo_intento` | envía el formulario con un correo válido | `origen` |
| `correo_alta` | el proveedor acepta el alta (queda pendiente de que la persona confirme desde su correo; la confirmación se ve en Buttondown) | `origen` |
| `correo_error` | el alta falla | `origen`, `motivo` |
| `compartir_png` | descarga la tarjeta PNG | `formato`, `pieza`, `tema` |
| `compartir_enlace` | copia el enlace | `formato`, `pieza`, `tema` |

## Embudos a crear en PostHog

Se crean en el panel (Product analytics → Funnels) con estos pasos. Segmentar por `tema` o `eje` cuando interese.

1. **Descubrimiento → lectura**: `$pageview` (feed) → `feed_mapa` → `mapa_visto` → `ensayo_abierto` → `ensayo_progreso` (hito 50) → `ensayo_leido`. Desglosar `ensayo_abierto` por `desde` para ver qué salida del mapa convierte más (botón, parada o «seguir leyendo»).
2. **Herramienta (índice)**: `indice_empezado` → `indice_paso` (paso 5) → `indice_paso` (paso 10) → `indice_terminado`. Ver el abandono pregunta a pregunta con un funnel de los diez `indice_paso`.
3. **Captación de correo**: `$pageview` → `correo_intento` → `correo_alta`. Vigilar `correo_error` como métrica de salud del endpoint. La tasa de confirmación (altas que pulsan el enlace) se mira en Buttondown, no en PostHog; las entregas llevan `utm_source=newsletter&utm_campaign=<entrega>` para ver en PostHog qué lectura trae cada correo.
4. **Difusión**: `ensayo_leido` (o `indice_terminado`) → `compartir_png` / `compartir_enlace`.

## Notas

- Las cifras de tráfico solo cuentan a quien acepta la analítica: es un sesgo conocido y coherente con la postura de privacidad. No se identifica por correo ni se cruza identidad con navegación.
- Añadir los dominios de preview a los *internal filters* de PostHog es innecesario porque nunca envían datos; aun así no molesta hacerlo.
- Nuevos eventos: usar siempre `ela.track` (no `ela.capture` directo) y añadir la fila al catálogo de arriba.
