# entrelampistas · web

Web editorial de entrelampistas. Fase 1 móvil (390 de referencia, fluido de 320 a 1023; en ≥1024 la columna móvil se centra). Escritorio queda para la fase 2. Tres **mapas** (`/habitabilidad`, `/criterio`, `/decisiones`). Desde el 24-09-2026 cada mapa son dos páginas: la **pantalla de mapa** en `/x` (visión general: portada, tesis, recorrido de cinco paradas, preguntas, cierre con otros mapas) y el **ensayo** en `/x/ensayo` (E1–E7), al que solo se llega por enlace.

## Fuente única de verdad

1. `design/README.md` — qué es el handoff y en qué orden leerlo.
2. `design/docs/design-brief.md` — límites duros, tokens, tipografía, componentes, copy de interfaz, checklist por commit. **Ante conflicto con cualquier otro documento, skill o CSS, manda este.**
3. `design/docs/mapa-pantallas.md` — rutas, pantallas, enlaces, comportamiento del ensayo y reglas de cálculo del índice.
4. `design/mocks/*.dc.html` — mocks canónicos (ábrelos con `support.js` y `assets/` al lado); en iteración 2 mandan `Criterio recorrido`, `Mapa de nuestras decisiones recorrido A v2`, `Feed de inicio v4`, `Mapas` y `Habitabilidad recorrido final` (T0). Donde el mock y el brief difieran, manda el brief; donde el brief calle, manda el mock. `design/docs/fotos.md` fija alt, crédito y pantalla de cada foto.
5. `content/ensayo-*.md` — texto íntegro de cada ensayo, verbatim de la autora: Habitabilidad y El mapa de tu mente con el texto final del 25-09-2026 (originales en `content/fuentes/2026-09-25/`, erratas y pendientes en la cabecera de cada .md); Criterio aún extraído del mock (◆).

Todo lo anterior a este handoff es obsoleto y vive en `archive/legacy-2026-09/` (no se despliega), incluidos los prompts antiguos (`prompts/`) y el material editorial rescatado de los skills viejos (`skills-editorial/`).

**Skills visuales vigentes**: `sistema-visual` (marca, color, tipografía, componentes, fotos, piezas para compartir, escritorio fase 2) y `frontend-craft` (interacción). Describen solo esta iteración. `npm run check` falla si un skill vuelve a describir el estilo anterior; los editoriales (`editor-lampista`, `editorial-voice`, `project`) están exentos hasta que se rehagan.

## Stack

HTML estático generado sin dependencias. `node build.mjs` ensambla `src/pages/*.html` (cabecera JSON + cuerpo), los parciales de `src/partials/`, cada tema desde `content/` (`src/render/tema.mjs`: T0–T3 + ensayo a partir de `ensayo-<slug>.md` verbatim y `ensayo-<slug>.json` de presentación) y escribe `dist/`, que es lo único que Vercel sirve. JS vanilla por página en `js/`. Una función serverless en `api/subscribe.js` para el correo.

```
build.mjs                 ← generador · {{> parcial}} · {{var}} · {{?cond}}…{{/cond}} · {{@tema slug=""}} · {{@json nombre}}
src/layout.html           ← plantilla de página
src/pages/                ← una página por ruta (index, mapas, proyecto, pensamiento-de-mantenimiento, indice, conceptos/enshittification, 404) · por mapa: <slug>.html (pantalla de mapa) y <slug>/ensayo.html
src/partials/             ← cabecera-sitio, cabecera-pieza, pestanas, correo, correo-compacto, pie
src/render/tema.mjs       ← md + json → parte="mapa" (portada, tesis, recorrido, preguntas, cierre con otros mapas) o parte="ensayo" (foto, cifras, filas, retícula + guardar, pullquote, pausa, terms, FAQ, correo compacto, créditos, siguiente mapa, tarjetas, FAQPage)
src/render/mapas.mjs      ← listado de /mapas desde content/ensayo-*.json (orden, eje, «nuevo», estado propio)
src/render/tarjeta-mapa.mjs ← datos de la tarjeta compartible de cada mapa en el feed
src/render/lib/imagen.mjs ← <img>/<picture> con AVIF + JPG y srcset 1000/1200/1600 para las fotos de iteración 2
src/render/correo-previa.mjs ← vista previa en /correo de los correos de content/newsletter/ (noindex)
content/                  ← ensayo-<slug>.md (verbatim; `CIERRE` y `PREGUNTAS FRECUENTES` como marcas) + ensayo-<slug>.json (presentación: t0/t1/t2/t3, editorial, terms, secciones[].bloques/destacados, cierre), indice.json, fuentes/ (originales de la autora, no se despliegan)
styles/tokens.css         ← variables del brief §2. Solo estas. Ningún hex fuera de aquí.
styles/base.css           ← fuentes autohospedadas, reset, tipografía, foco, reduced-motion, columna
styles/components.css     ← componentes del brief §4
styles/tema.css           ← T0–T3 y ensayo, común a los tres temas
styles/<pagina>.css       ← estilos propios de cada ruta
js/comun.js               ← localStorage, guardar, estado de lectura (`[data-lectura][data-slug]`, clave `ela_lectura_<slug>`), avisos, copiar
js/ensayo.js              ← pantalla de mapa (paradas, «seguir leyendo · 03», enlaces viejos #seccion → /x/ensayo) y ensayo (cabecera viva, progreso, secciones leídas, term, FAQ)
js/consent.js             ← PostHog solo tras «aceptar» y solo en producción (gate por dominio)
js/analitica.js           ← ela.track(nombre, props): taxonomía + props comunes (tema, eje); catálogo en design/docs/analitica.md
js/compartir.js           ← hoja con tarjeta 4:5 → PNG 1080×1350, copiar enlace
js/indice.js              ← herramienta: hash routing, cálculo, resultados, historial (6)
assets/fonts, assets/img  ← Archivo 400/500/700/800, Space Mono 400/700; assets del handoff 1; fotos de iteración 2 (`cri-*`, `dec-*`, `hab-*`) a 1000 px + `-w1200` + `-w1600`, en JPG y AVIF, sin EXIF (design/docs/fotos.md manda en la asignación)
api/subscribe.js          ← POST /api/subscribe, proveedor por variable de entorno
```

Comandos: `npm run build` · `npm run dev` (sirve `dist/` en :3000) · `npm run check` (checklist del brief).

## Reglas que romper es un error (brief §1)

- `border-radius: 0` y `box-shadow: none` en todo.
- Un solo acento `--acento`; verde solo para lo propio del lector y la acción de herramienta.
- Solo Archivo y Space Mono. Sin serifa. Cursiva solo en `.cita-autora` (proyecto).
- Colores solo por variable de `tokens.css`. Filetes 1px `--linea`; 2px `--acento` solo en pestaña activa y progreso.
- Transiciones solo `opacity`/`transform`/color con `--dur-*` y `--ease-out`; nunca `transition: all`; `prefers-reduced-motion` respetado.
- Botones y áreas táctiles ≥ 44px. Contraste ≥ 4.5:1. Sin overflow a 375px.
- Copy en minúscula en frases, mono en mayúsculas para meta. Sin exclamaciones ni verbos de marketing. Textos desde `content/` o del mock, verbatim.
- Marcar en código con `// ◆` lo pendiente de validar (brief §8).

## Verificación tras cada cambio visual

1. `npm run build && npm run check`
2. Captura a 390 y 375 (Playwright con `/opt/pw-browsers/chromium`) y compara con el mock.
3. Sin `scrollWidth` > ancho de viewport. Foco visible. Hover con transición.

## Correo

`api/subscribe.js` lee `NEWSLETTER_PROVIDER` (`buttondown` | `resend` | `mailchimp`) y su clave. Sin proveedor responde 503 y el formulario muestra «no pudimos guardarlo, prueba otra vez», nunca finge un alta. `GET /api/subscribe` dice qué proveedor hay y si le falta alguna clave (sin enseñarla).

Proveedor elegido: **Buttondown, con confirmación por correo** (doble opt-in). El alta queda pendiente, Buttondown manda la confirmación y, al confirmar, la bienvenida; el formulario dice «casi está · revisa tu correo y confirma». Textos en `content/newsletter/` (`confirmacion.md`, `bienvenida.md`, `entrega-NN.md`), vista previa en `/correo` (noindex) y pasos de configuración en `design/docs/newsletter.md`.

## Analítica

PostHog (host EU) se carga solo tras consentimiento explícito (`ela_consent`) y **solo en producción** (`consent.js` comprueba que el dominio termine en `entrelampistas.com`; preview y localhost no miden). `js/analitica.js` expone `window.ela.track(nombre, props)`, que añade `tema`/`eje` y centraliza la taxonomía; es no-op sin consentimiento. Config: `autocapture:false`, `capture_pageview:true`, `capture_pageleave:true`. Catálogo de eventos y embudos en `design/docs/analitica.md` (manda). Nuevos eventos: `ela.track` + fila en ese doc.

## Decisiones posteriores al handoff (mandan sobre brief y mocks)

- 21-09-2026 · Cabecera sin buscador; logo a 40px.
- 21-09-2026 · Sin etiquetas mono que clasifiquen la pieza (definición, término, tesis, ensayo, herramienta, eje) ni tiempos de lectura. Las etiquetas estructurales de bloque quedan solo para lectores de pantalla (`visually-hidden`). Las rutas de cabecera se mantienen.
- 21-09-2026 · Índice: sin pregunta marco ni nombre de dimensión repetido en las pantallas de pregunta. El feed conserva la primera pregunta y lleva debajo un botón verde («calcular mi índice» → al responder «seguir con la pregunta 2 →»).
- 21-09-2026 · Feed: filtros todos / ensayos / herramientas (sin «habitabilidad») dentro de la cabecera junto al logo, cabecera sin filete.
- 21-09-2026 · Sin cierre «esto es todo por ahora» en el feed.
- 21-09-2026 · Iteración 2: los tres temas comparten recorrido y renderer. T0 sustituye a `/mapas/habitabilidad` (redirige a `/habitabilidad`); los conceptos y «se relaciona con» de M2 viven al pie de T0. Sin fila «herramienta · pronto»: la fila 4 solo existe cuando hay herramienta (Habitabilidad). Sin metas de eje ni tiempos en portadas, filas de T0, T2 ni cierre (regla de tanda 1).
- 21-09-2026 · T2: las paradas de Criterio y Decisiones se derivan del primer párrafo de cada sección (recorte a 3 líneas) con botón de texto «ir a la sección ›» (brief §4b); Habitabilidad conserva frase e intro propias del mock 1.
- 21-09-2026 · T3: folio en acento (01–05) con las preguntas de cierre de cada sección; Habitabilidad conserva rombos y sus cuatro preguntas. Criterio 03 no cierra con pregunta: toma «Camino».
- 21-09-2026 · Feed: tarjetas de los tres ensayos con botón «ir al tema» → T0; sin lámpara en las tarjetas de ensayo (la lámpara solo queda en la tarjeta del índice). Tesis in-card de Criterio: primer párrafo + pregunta; de Decisiones: los dos párrafos de T1.
- 21-09-2026 · Mapas M1: cuatro celdas (Habitabilidad, Pensamiento, Decisiones, Criterio); «nuevo» en gris; sin líneas «ensayo · mapa · conceptos».
- 21-09-2026 · Cifra grande: 44px en retícula de dos y 56px a solas (el 56 del brief no cabe a dos columnas con «2.495.300» entre 320 y 390); línea inferior mono `--tinta-3` como pide el brief.
- 21-09-2026 · Fichas de término de Criterio (zona gris, verificación) y Decisiones (heurísticas) con el texto de la FAQ hasta recibir el definitivo; «encuadres» sin ficha. Correo compacto solo en los cierres con FAQ; Habitabilidad conserva el correo completo.
- 21-09-2026 · Redirects: `/mapa-de-tu-mente` → `/decisiones`; `/criterio` deja de redirigir a `/mapas`.
- 22-09-2026 · Fotos con `srcset` 1000/1600 y `sizes` (480px en escritorio, 100vw en móvil); `og:image` por tema (portada a 1600). Página 404 propia (`src/pages/404.html` → `dist/404.html`).
- 22-09-2026 · Analítica production-only con gate por dominio y taxonomía centralizada (`ela.track`, `design/docs/analitica.md`): eventos de recorrido del tema, hitos de lectura 25/50/75, cada paso del índice, correo intento/alta/error, compartir. Sin PostHog en preview ni local.
- 23-09-2026 · Skills visuales rehechos: `sistema-visual` nuevo (logo = la cara dibujada, definido desde la web; fotos distintas por tema; garabatos sin reglas, se deciden caso a caso; sin diagramas ni plantillas de redes por ahora) y `frontend-craft` reescrito. Retirados `design-system`, `entrelampistas-design-system`, `entrelampistas-visual-system` y `entrelampistas-creative-dev`; `.claude/prompts/` y su material editorial, a `archive/legacy-2026-09/`.
- 23-09-2026 · **Marca cerrada**: el logo es la cara dibujada negro y verde, en una sola versión (nunca invertida ni recoloreada; sobre tinta o foto va en placa de papel). Icono del navegador y de pantalla de inicio generados desde el logo (`favicon.ico`, `icono-32/180/192/512.png`, `site.webmanifest`; retirado el `favicon.svg` cuadrado). La tarjeta compartible lleva el logo en placa de papel en lugar del «logo invertido» del brief. `og-default.png` pasa a ser la imagen de marca genérica (logo + definición del feed). Detalle en el skill `sistema-visual`.
- 24-09-2026 · **Mapa y ensayo, dos páginas.** Vocabulario: «mapa» es el conjunto; la pantalla de mapa es su vista general y las cinco paradas son el «recorrido». Desde feed y Mapas se llega a la pantalla de mapa (`/x`), que tiene principio y final: portada con «leer el ensayo» (o «seguir leyendo · 0N» si hay lectura), tesis, recorrido (cada parada abre su sección en `/x/ensayo#seccion-0N`), preguntas en tinta, y cierre con el botón otra vez, herramienta, conceptos, relación y otros mapas. El ensayo vive en `/x/ensayo` y solo se abre por enlace; su cierre ofrece volver al mapa, las preguntas, el siguiente mapa del mismo eje, FAQ y correo. Se retiran T0–T3 como pantallas de scroll y la cabecera viva del mapa. Enlaces antiguos `/x#seccion-0N` y `/x#ensayo` redirigen en cliente al ensayo.
- 24-09-2026 · Feed: la tarjeta es la del mapa. Foto → tesis; debajo «ir al mapa» (principal), «leer el ensayo» (texto), compartir y guardar. A 320 los iconos bajan a una segunda línea.
- 24-09-2026 · Mapas: sin preselección (nada en tinta); cada mapa muestra «nuevo» en gris o el estado de lectura propio en verde. Listado generado desde el contenido (`src/render/mapas.mjs`); con número impar de mapas el último va a lo ancho. Pensamiento de mantenimiento sale de la retícula y queda como fila debajo.
- 24-09-2026 · ◆ **Variantes en exploración** (temporal): una página puede traer varias versiones de un bloque en `<div data-solo-v="a" data-nombre="…">` (o `"c d"` si vale para varias); `js/variantes.js` elige con `?v=` (recordado en la sesión) y pinta un selector arriba del `main` **solo fuera de producción**; en entrelampistas.com siempre se ve la `a`. Hoy solo `/mapas?v=a|b|c` (retícula · lista con foto pequeña · tarjetas con foto grande). Cuando la autora elija, se deja solo la elegida y se retira `variantes.js`. Las variantes del ensayo (24-09) se retiraron el 25-09 al llegar la editorial suiza.
- 25-09-2026 · **Textos finales** de Habitabilidad y de Decisiones, que pasa a llamarse **El mapa de tu mente** (ruta `/decisiones` sin cambios; `/mapa-de-tu-mente` ya redirige ahí). El .md manda también en el párrafo de cierre (`CIERRE`) y la FAQ (`PREGUNTAS FRECUENTES`); `json › cierre.faq` queda como respaldo para Criterio. Las cuatro preguntas de Habitabilidad son ya Atención, Agencia, Relación y Valor, como el índice. Tesis del mapa = resumen de la autora + extracto verbatim; las paradas de Habitabilidad derivan su texto de la sección (conservan las frases del mock). Retícula de preguntas: folio en `--tinta-3` (brief §4b), no en verde. El ensayo tiene `h1` (título de portada).
- 25-09-2026 · **Editorial suiza** del ensayo (`json › editorial: { estilo: "suizo", pregunta: "forma" | "tinta" }`, CSS al final de `styles/tema.css`), en Habitabilidad y El mapa de tu mente; Criterio sigue con la presentación anterior hasta tener su texto final. Una columna en bandera; resumen como entradilla grande sin caja; las fotos siguen la regla del 23-09 (ver 26-09) y solo la sección sin foto abre sobre papel (filete, folio `01 / 05`, título 36); primer párrafo de sección a 19/500; frases destacadas en 700 (◆ `secciones[].destacados`, el build falla si no están en el texto); cita grande sin caja (24 si es larga); listas con filetes y folio colgado (`tipo: "lista"`); cifra de un dato del párrafo (`tipo: "cifras", tras, cifras`). Carácter por mapa: Habitabilidad cuelga ○ ante la pregunta de cierre; El mapa de tu mente saca la pregunta a un bloque de tinta a todo lo ancho. Cierre con el párrafo final de la autora en 21/500.
- 25-09-2026 · **Fotos de Habitabilidad** de la autora en todo el tema (asignación en `design/docs/fotos.md`): portada del ensayo, cinco secciones y una pausa, pantalla de mapa, tarjeta del feed, portada del índice y la ficha de enshittification (su enlace «aparece en» apunta ya a la sección 02). Se retiran las fotos del handoff 1 que sustituyen.
- 25-09-2026 · **Rendimiento** (medido con Playwright a 390 y 3×, 4G lenta y CPU 4×): fotos `cri-/dec-/hab-` en AVIF con JPG de respaldo (`<picture>`, `src/render/lib/imagen.mjs`, `picture { display: contents }` en base.css) y tamaño intermedio `-w1200`; portada del ensayo y del índice `eager` + `fetchpriority="high"`; tarjetas del feed fuera de pantalla en `lazy`; logo de cabecera `logo-cara-240.webp` (10 KB en vez de 52) y la tarjeta compartible lo carga al abrir la hoja reutilizando el de la cabecera. Feed: LCP 6,2 → 3,6 s y 1,6 MB → 0,8 MB al cargar. CLS 0 en todas las rutas.
- 26-09-2026 · **Regla de fotos sin excepciones** (corrige la editorial suiza del 25-09, que sacaba el título de la foto y quitaba el velo): toda foto de los mapas va en `.foto`, a todo lo ancho, con `--velo-foto`, folio pequeño y título dentro; la única foto sin texto es la de pausa (brief §4b). Vale para las cinco secciones de cada ensayo, portadas, feed, índice y conceptos (la ficha de enshittification abre con su foto y el título dentro). `npm run check` falla si una foto `cri-/dec-/hab-` del HTML generado no está en una `.foto` con título (excepción ◆ temporal: miniaturas de `/mapas?v=b`).
- 26-09-2026 · **Portada única de Habitabilidad**: el archivo «Portada» de la autora va en la tarjeta del feed, la pantalla de mapa, la portada del ensayo, Mapas y `og-habitabilidad.jpg`. Se retiran IMG_3700 e IMG_3728, que ocupaban feed y mapa.
- 26-09-2026 · **Newsletter en Buttondown con confirmación**: `api/subscribe.js` deja de mandar `type: "regular"` (saltaba la confirmación), etiqueta `web` y página de origen en `metadata`, sin IP. Correos de confirmación, bienvenida y entrega 01 en `content/newsletter/` con vista previa en `/correo`; enlaces con `utm_source=newsletter&utm_campaign=<pieza>` para PostHog.
- 25-09-2026 · Índice: sin «herramienta» en la cabecera (regla del 21-09 de no clasificar la pieza).
- 22-09-2026 · Rásters pesados (`pm-*`, `tex-*`, `il-*`, `garabato-*`, `logo-cara`, `indice-farola-h`) convertidos a WebP (−8.7 MB); los `.png/.jpeg` originales se retiran de `assets/img`. Los `og-*` y las fotos `cri-*/dec-*` siguen en JPG (scrapers y ganancia WebP marginal en follaje). `og-<tema>.jpg` a 1200×630 (1.91:1) para tarjetas sociales.

- 23-09-2026 · **Una sola foto con texto**: `.foto` (`components.css`) es el único patrón para imagen con texto encima, en feed, T0, E1, secciones E2–E6, Índice y Pensamiento. Estructura fija dentro de la foto, abajo-izquierda: `.foto__folio` (mono, solo si aplica) · `.foto__titulo` · `.foto__sub`. Velo único `--velo-foto` sobre **toda** la foto, degradado .22 arriba → .45 medio → .8 bajo el texto (23-09 tarde: la banda inferior sola dejaba ilegibles los subtítulos sobre cielo claro); `--velo-tesis` para la tesis desplegada del feed. Para más o menos velo se tocan solo las tres paradas del token. Retirados `.foto-velo`, `.ensayo-portada__capa`, `.ensayo-seccion__velo`, el folio 96 y `folio: "tinta"`; `media` en JSON pasa a `foto` (`recorte: "4x3" | "corta"` opcional). `npm run check` falla ante velos/degradados fuera de `tokens.css` o clases retiradas. En `tema.mjs`, `foto()` y `partesTitulo()` (parte «Título: ¿pregunta?» en título + subtítulo).

## Pendientes ◆ del handoff

- Umbrales del índice: validar con datos reales (`content/indice.json`, `js/indice.js`).
- Lecturas y gestos que el mock no muestra están marcados `◆` en `content/indice.json`: propuesta a validar por la autora.
- Newsletter: validar los textos de `content/newsletter/` (◆ lista en `design/docs/newsletter.md`), fijar reply-to y dominio de envío en Buttondown.
- Textos finales (25-09): erratas corregidas y marcas de la autora («Poner orto ejemplo», «¿?», «◆ 01») anotadas en la cabecera de `ensayo-habitabilidad.md` y `ensayo-decisiones.md`; falta el ejemplo de «representatividad» y aclarar tres frases de Decisiones. Frases destacadas y citas elegidas por nosotros, a validar. Criterio sigue extraído del mock, a la espera del .md de la autora. Fotos por sección según fotos.md; la pausa de Decisiones va antes de las preguntas de cierre de 05 (el mock la ponía en 01).
