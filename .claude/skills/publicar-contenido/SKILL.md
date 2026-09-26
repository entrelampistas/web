---
name: publicar-contenido
description: Flujo para publicar contenido nuevo en entrelampistas/web a partir de un mock o texto que da la autora, sin que ella toque código. Úsalo SIEMPRE que se pida publicar, subir, añadir o crear una pieza nueva del sitio — un ensayo, un concepto/ficha de glosario, una definición del feed, o un tema/mapa — o cuando se entregue un mock (.dc.html), una captura o texto verbatim para llevar a la web. Sigue design/docs/flujo-contenido.md paso a paso.
---

# Publicar contenido · entrelampistas/web

Convierte un **mock o texto** en una **página publicada**, siempre igual, sin romper el brief.
La guía completa y las plantillas por tipo están en `design/docs/flujo-contenido.md`; este
skill es el procedimiento operativo.

## Antes de tocar nada
1. Lee `design/docs/flujo-contenido.md` (procedimiento) y `design/docs/design-brief.md`
   (manda ante cualquier duda visual). Ante conflicto, gana el brief.
2. Identifica el **tipo** de pieza: A ensayo · B concepto · C definición del feed · D tema/mapa.
3. Reúne los tres mínimos: mock/ruta, texto verbatim, imágenes con alt. Lo que falte se
   marca `◆` y se pide; **no se inventa copy editorial**.

## Regla de discrepancia (parar y preguntar)
Si lo que la autora comparte **no coincide** con lo que ya está en los `.md`/`.json` fuente
(brief, mapa de pantallas, ensayo, CLAUDE.md, este flujo) o los **cambia** —copy distinto,
título, orden de secciones, nombre de una de las cuatro preguntas, renombrar/mover un concepto
o ruta, algo que contradice el brief §1 o una «Decisión posterior al handoff»— **me detengo y
pregunto antes de decidir**. Digo qué difiere, dónde y las opciones; espero confirmación; y
solo entonces actualizo también la fuente (`.md`/`.json`/CLAUDE.md), no solo la página. Nunca
resuelvo el conflicto por mi cuenta ni sobrescribo la fuente en silencio.

## Reglas que romper es un error
- Todo el copy visible sale del mock o de `content/`, **verbatim**. Nada inventado.
- Brief §1: `border-radius: 0`, `box-shadow: none`, solo Archivo y Space Mono, colores solo
  por variable de `tokens.css`, filetes 1px, transiciones solo `opacity`/`transform`/color,
  áreas táctiles ≥44px, contraste ≥4.5:1, sin overflow a 375px.
- Reutiliza patrones existentes copiando la pieza equivalente; no improvises HTML nuevo.

## Pasos por tipo (resumen; detalle en la guía)
- **A · Ensayo** → `content/ensayo-<slug>.md` (verbatim, líneas `ENSAYO`/`0N · Título`) +
  `content/ensayo-<slug>.json` (presentación) + `src/pages/<slug>.html` con
  `{{@ensayo slug="<slug>"}}` + alta en feed y en el mapa del tema.
- **B · Concepto** → `src/pages/conceptos/<slug>.html` copiando `enshittification.html`.
- **C · Definición del feed** → nuevo `feed-bloque data-tipo="definicion"` en `src/pages/index.html`.
- **D · Tema/mapa** → celda en `src/pages/mapas.html` + página `src/pages/mapas/<slug>.html`.

## Verificación (obligatoria antes de dar por publicada la pieza)
1. `npm run build` — sin errores, la ruta nueva aparece.
2. `npm run check` — checklist del brief limpio.
3. Capturas a **390 y 375** con Playwright (`/opt/pw-browsers/chromium`), comparar con el mock,
   sin `scrollWidth` > viewport, foco visible, hover con transición.
4. Enlaces cruzados correctos (feed, mapa, «aparece en», «ve también»).
5. Listar los `◆` pendientes de validar por la autora.
6. Commit en la rama de trabajo; **push solo cuando la autora lo pida**.
