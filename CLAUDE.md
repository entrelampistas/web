# entrelampistas · web

Web editorial de entrelampistas. Fase 1 móvil (390 de referencia, fluido de 320 a 1023; en ≥1024 la columna móvil se centra). Escritorio queda para la fase 2.

## Fuente única de verdad

1. `design/README.md` — qué es el handoff y en qué orden leerlo.
2. `design/docs/design-brief.md` — límites duros, tokens, tipografía, componentes, copy de interfaz, checklist por commit. **Ante conflicto con cualquier otro documento, skill o CSS, manda este.**
3. `design/docs/mapa-pantallas.md` — rutas, pantallas, enlaces, comportamiento del ensayo y reglas de cálculo del índice.
4. `design/mocks/*.dc.html` — seis mocks canónicos (ábrelos con `support.js` y `assets/` al lado). Donde el mock y el brief difieran, manda el brief; donde el brief calle, manda el mock.
5. `design/content/ensayo-habitabilidad-final.md` — texto íntegro del ensayo, verbatim de la autora.

Todo lo anterior a este handoff es obsoleto y vive en `archive/legacy-2026-09/` (no se despliega). Los skills de `.claude/skills/` que describen Klein, rojo, Neo Grotesque o Space Grotesk quedan derogados en su capa visual por el brief.

## Stack

HTML estático generado sin dependencias. `node build.mjs` ensambla `src/pages/*.html` (cabecera JSON + cuerpo), los parciales de `src/partials/`, el ensayo desde `content/` (`src/render/ensayo.mjs`) y escribe `dist/`, que es lo único que Vercel sirve. JS vanilla por página en `js/`. Una función serverless en `api/subscribe.js` para el correo.

```
build.mjs                 ← generador · {{> parcial}} · {{var}} · {{?cond}}…{{/cond}} · {{@ensayo}} · {{@json nombre}}
src/layout.html           ← plantilla de página
src/pages/                ← una página por ruta (index, mapas, mapas/habitabilidad, proyecto, pensamiento-de-mantenimiento, habitabilidad, indice, conceptos/enshittification)
src/partials/             ← cabecera-sitio, cabecera-pieza, pestanas, correo, pie
src/render/ensayo.mjs     ← markdown del ensayo → secciones con media, term, pullquote, retícula
content/                  ← ensayo (md verbatim + json de presentación), indice.json (preguntas, lecturas, gestos)
styles/tokens.css         ← variables del brief §2. Solo estas. Ningún hex fuera de aquí.
styles/base.css           ← fuentes autohospedadas, reset, tipografía, foco, reduced-motion, columna
styles/components.css     ← componentes del brief §4
styles/<pagina>.css       ← estilos propios de cada ruta
js/comun.js               ← localStorage, guardar, estado de lectura, avisos, copiar
js/consent.js             ← PostHog solo tras «aceptar»
js/compartir.js           ← hoja con tarjeta 4:5 → PNG 1080×1350, copiar enlace
js/indice.js              ← herramienta: hash routing, cálculo, resultados, historial (6)
assets/fonts, assets/img  ← Archivo 400/500/700/800, Space Mono 400/700; los 14 assets del handoff
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

## Pendientes ◆ del handoff

- Nombres de las cuatro preguntas: ensayo dice Calidad, índice usa Valor. Implementado como en cada fuente.
- Umbrales del índice: validar con datos reales (`content/indice.json`, `js/indice.js`).
- Lecturas y gestos que el mock no muestra están marcados `◆` en `content/indice.json`: propuesta a validar por la autora.
- Endpoint de correo: elegir proveedor y poner la variable en Vercel.
