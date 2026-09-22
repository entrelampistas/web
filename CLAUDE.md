# entrelampistas · web

Web editorial de entrelampistas. Fase 1 móvil (390 de referencia, fluido de 320 a 1023; en ≥1024 la columna móvil se centra). Escritorio queda para la fase 2. Iteración 2 (21-09-2026): tres temas con el mismo recorrido (T0 puerta · T1 tesis · T2 mapa · T3 preguntas · ensayo E1–E7): `/habitabilidad`, `/criterio`, `/decisiones`.

## Fuente única de verdad

1. `design/README.md` — qué es el handoff y en qué orden leerlo.
2. `design/docs/design-brief.md` — límites duros, tokens, tipografía, componentes, copy de interfaz, checklist por commit. **Ante conflicto con cualquier otro documento, skill o CSS, manda este.**
3. `design/docs/mapa-pantallas.md` — rutas, pantallas, enlaces, comportamiento del ensayo y reglas de cálculo del índice.
4. `design/mocks/*.dc.html` — mocks canónicos (ábrelos con `support.js` y `assets/` al lado); en iteración 2 mandan `Criterio recorrido`, `Mapa de nuestras decisiones recorrido A v2`, `Feed de inicio v4`, `Mapas` y `Habitabilidad recorrido final` (T0). Donde el mock y el brief difieran, manda el brief; donde el brief calle, manda el mock. `design/docs/fotos.md` fija alt, crédito y pantalla de cada foto.
5. `content/ensayo-*.md` — texto íntegro de cada ensayo, verbatim de la autora (Habitabilidad) o extraído del mock a la espera del .md de la autora (Criterio, Decisiones, marcados ◆).

Todo lo anterior a este handoff es obsoleto y vive en `archive/legacy-2026-09/` (no se despliega). Los skills de `.claude/skills/` que describen Klein, rojo, Neo Grotesque o Space Grotesk quedan derogados en su capa visual por el brief.

## Stack

HTML estático generado sin dependencias. `node build.mjs` ensambla `src/pages/*.html` (cabecera JSON + cuerpo), los parciales de `src/partials/`, cada tema desde `content/` (`src/render/tema.mjs`: T0–T3 + ensayo a partir de `ensayo-<slug>.md` verbatim y `ensayo-<slug>.json` de presentación) y escribe `dist/`, que es lo único que Vercel sirve. JS vanilla por página en `js/`. Una función serverless en `api/subscribe.js` para el correo.

```
build.mjs                 ← generador · {{> parcial}} · {{var}} · {{?cond}}…{{/cond}} · {{@tema slug=""}} · {{@json nombre}}
src/layout.html           ← plantilla de página
src/pages/                ← una página por ruta (index, mapas, proyecto, pensamiento-de-mantenimiento, habitabilidad, criterio, decisiones, indice, conceptos/enshittification)
src/partials/             ← cabecera-sitio, cabecera-pieza, pestanas, correo, correo-compacto, pie
src/render/tema.mjs       ← md + json → T0 puerta, T1 tesis, T2 mapa, T3 preguntas, ensayo (foto/media, cifras, filas, retícula + guardar, pullquote, pausa, terms, FAQ, correo compacto, créditos, tarjetas para compartir, FAQPage)
content/                  ← ensayo-<slug>.md (verbatim) + ensayo-<slug>.json (presentación: t0/t1/t2/t3, terms, secciones[].bloques, cierre), indice.json
styles/tokens.css         ← variables del brief §2. Solo estas. Ningún hex fuera de aquí.
styles/base.css           ← fuentes autohospedadas, reset, tipografía, foco, reduced-motion, columna
styles/components.css     ← componentes del brief §4
styles/tema.css           ← T0–T3 y ensayo, común a los tres temas
styles/<pagina>.css       ← estilos propios de cada ruta
js/comun.js               ← localStorage, guardar, estado de lectura (`[data-lectura][data-slug]`, clave `ela_lectura_<slug>`), avisos, copiar
js/ensayo.js              ← tema: paradas, term, FAQ, cabecera viva (ruta/meta/progreso), secciones leídas por slug
js/consent.js             ← PostHog solo tras «aceptar»
js/compartir.js           ← hoja con tarjeta 4:5 → PNG 1080×1350, copiar enlace
js/indice.js              ← herramienta: hash routing, cálculo, resultados, historial (6)
assets/fonts, assets/img  ← Archivo 400/500/700/800, Space Mono 400/700; assets del handoff 1; fotos de iteración 2 (`cri-*`, `dec-*`) a 1000 px + `-w1600` para srcset, sin EXIF (design/docs/fotos.md manda en la asignación)
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

`api/subscribe.js` lee `NEWSLETTER_PROVIDER` (`buttondown` | `resend` | `mailchimp`) y su clave. Sin proveedor responde 503 y el formulario muestra «no pudimos guardarlo, prueba otra vez», nunca finge un alta.

## Analítica

PostHog (host EU) se carga solo tras consentimiento explícito guardado en `ela_consent`. `window.ela.capture(nombre, props)` es no-op sin consentimiento.

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

## Pendientes ◆ del handoff

- Nombres de las cuatro preguntas: ensayo dice Calidad, índice usa Valor. Implementado como en cada fuente.
- Umbrales del índice: validar con datos reales (`content/indice.json`, `js/indice.js`).
- Lecturas y gestos que el mock no muestra están marcados `◆` en `content/indice.json`: propuesta a validar por la autora.
- Endpoint de correo: elegir proveedor y poner la variable en Vercel.
- Iteración 2: resumen de T0 de Habitabilidad = primer párrafo de la tesis; textos de Criterio y Decisiones extraídos del mock a falta del .md de la autora, con cinco erratas evidentes corregidas y anotadas en la cabecera de cada .md (a confirmar). Fotos por sección según fotos.md; la pausa de Decisiones va antes de las preguntas de cierre de 05 (el mock la ponía en 01).
