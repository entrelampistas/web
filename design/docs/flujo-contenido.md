# Flujo de contenido · publicar sin tocar código

Cómo pasa una pieza de **mock** (tú) a **web publicada** (Claude), siempre igual, sin
improvisar HTML ni romper el brief. Tú diseñas la pantalla y me la das; yo sigo este
documento paso a paso. No sustituye a `design-brief.md` (manda él ante cualquier duda
visual): lo complementa con el *procedimiento* de publicación.

> Regla base: **todo el copy visible sale del mock o de `content/`, verbatim.** Yo no
> invento texto editorial. Si falta una pieza de copy, te la pido antes de publicar.

---

## 1 · Qué me tienes que dar por cada pieza

Mínimo imprescindible para que yo publique sin volver a preguntarte:

1. **El mock** — el `.dc.html` en `design/mocks/`, o una captura, o el enlace. Si es una
   pantalla nueva, dime a qué **ruta** va (`/mapas/<slug>`, `/conceptos/<slug>`…).
2. **El texto final**, verbatim. Ensayos largos → un `.md` en `design/content/`. Piezas
   cortas → puede ir en el propio mock.
3. **Las imágenes** que use la pieza, recortadas a ≤1000px de ancho, con el **alt** de cada
   una (o «decorativa» si va vacío). Las dejo en `assets/img/` con su nombre final.

Con eso me basta. Si algo falta, lo marco `◆` y te lo listo al final; no lo relleno yo.

---

## 2 · Los cuatro tipos de pieza

Cada tipo tiene un patrón fijo. Elige el que aplique; el «qué toco» dice exactamente qué
archivos creo o edito.

### A · Ensayo (pieza larga, tipo «Habitabilidad digital»)

Es el tipo **más data-driven** que ya existe. Un ensayo = dos archivos de contenido + una
página mínima que solo los invoca.

**Qué toco**
- `content/ensayo-<slug>.md` — el texto **verbatim** de la autora. Estructura obligatoria:
  una línea `ENSAYO`, luego el título, luego la intro, y cada sección abre con `0N · Título`
  (ver `content/ensayo-habitabilidad.md` como plantilla exacta).
- `content/ensayo-<slug>.json` — la *presentación* (portada, subtítulo, resumen, término
  desplegable, media por sección, retícula, pullquote, cierre). Copiar el de habitabilidad y
  cambiar valores.
- `src/pages/<slug>.html` — cabecera JSON + `{{@ensayo slug="<slug>"}}` + navegación. Es la
  única línea de «código» y se copia de `src/pages/habitabilidad.html`.
- Alta en el **feed** y en el **mapa del tema** (ver tipos C y D).

**Cómo lo arma el build:** `src/render/ensayo.mjs` lee los dos `content/…` y genera todas las
secciones (portada, term, filas, retícula, pullquote, herramienta, cierre). No escribo el
cuerpo del ensayo a mano.

### B · Concepto (ficha de glosario, tipo `/conceptos/enshittification`)

Ficha de campos fijos: palabra, fuente, fonética, definición, uso, «aparece en», «cerca».

**Qué toco**
- `src/pages/conceptos/<slug>.html` — copiar `enshittification.html` y rellenar los campos.
  Es corto y regular; hoy va en HTML pero **todo el texto sale del mock**.
- Enlazar el chip del concepto desde el mapa del tema que lo usa (tipo D).

### C · Definición del feed (bloque de inicio)

Los bloques `definicion` del feed (`entrelampistas`, `pensamiento de mantenimiento`…): una
ilustración, la palabra, acepciones numeradas y un enlace.

**Qué toco**
- `src/pages/index.html` — añadir un `<section class="feed-bloque" data-tipo="definicion">`
  copiando uno existente. Respetar `data-tipo` (para los filtros del feed) y el orden.
- Si la definición apunta a una pieza nueva, crear también esa pieza (tipo A o su página).

### D · Tema / mapa (`/mapas` y `/mapas/<slug>`)

Un tema tiene dos caras: la **celda** en el índice de temas (`/mapas`) y su **página de tema**
(`/mapas/<slug>`) con las paradas (ensayo, índice), los conceptos y las relaciones.

**Qué toco**
- `src/pages/mapas.html` — añadir la `<a class="celda">` del tema nuevo (o convertir una
  `celda--proxima` en activa). Respetar el `data-eje` (`criterio` | `entornos`) y la leyenda.
- `src/pages/mapas/<slug>.html` — copiar `habitabilidad.html`: la lista de paradas, los chips
  de conceptos y el bloque «se relaciona con».

---

## 3 · Checklist de publicación (lo corro yo en cada pieza)

Antes de dar por publicada una pieza:

1. **Copy verbatim.** Cada texto sale del mock o de `content/`. Nada inventado. Copy en
   minúscula, mono en mayúsculas para meta, sin exclamaciones ni verbos de marketing.
2. **Brief §1** (romperlo es un error): `border-radius: 0`, `box-shadow: none`, solo Archivo y
   Space Mono, colores solo por variable de `tokens.css`, filetes 1px `--linea`, transiciones
   solo `opacity`/`transform`/color, áreas táctiles ≥44px, contraste ≥4.5:1.
3. **Assets** en `assets/img/` con nombre final, ≤1000px, `width`/`height` y `alt` correctos
   (vacío si es decorativa). `loading="eager"` solo en la primera imagen visible.
4. **`npm run build`** — sin errores; la ruta nueva aparece en la lista.
5. **`npm run check`** — checklist del brief limpio (sin radios, sombras, `transition: all`,
   cursivas fuera de `.cita-autora`, hex sueltos ni fuentes ajenas).
6. **Capturas 390 y 375** (Playwright con `/opt/pw-browsers/chromium`) y comparación con el
   mock. Sin `scrollWidth` > ancho de viewport. Foco visible. Hover con transición.
7. **Enlaces cruzados**: la pieza aparece donde debe (feed, mapa, «aparece en», «ve también»)
   y sus enlaces salientes existen.
8. **`◆`**: marco en código lo pendiente de validar por ti y te lo listo en la respuesta.
9. **Commit** en la rama de trabajo con mensaje claro; **push** solo cuando me lo pidas.

---

## 4 · Nomenclatura y convenciones

- **slug**: minúsculas, sin acentos ni espacios (`habitabilidad`, `enshittification`).
- **rutas**: ensayo en `/<slug>`, tema en `/mapas/<slug>`, concepto en `/conceptos/<slug>`.
- **assets**: `assets/img/<nombre-descriptivo>-w<ancho>.<ext>` (ej. `pm-gato-valla-w800.png`);
  ilustraciones `il-…`, texturas `tex-…`, garabatos `garabato-…`.
- **css/js por ruta**: si la pieza necesita estilos propios, `styles/<slug>.css` y declararlo
  en la cabecera JSON de la página (`"css": ["…"]`). Reutilizar `piezas.css` cuando encaje.

---

## 5 · Lo que hoy es «tocar una plantilla» y lo que sería «no-code total»

Hoy publicar un **ensayo** o un **concepto** es casi solo datos; **temas** y **definiciones**
son una entrada en su página. Todo cabe en «dame el mock y yo lo publico».

Si en el futuro quieres que sea **cero plantillas** (dejas un archivo y la ruta aparece sola,
y el feed y el mapa se generan solos), el paso siguiente es un refactor acotado de `build.mjs`:
auto-descubrir `content/ensayos/*` y `content/conceptos/*`, y leer `content/temas.json` y
`content/feed.json` como manifiestos. No hace falta para el flujo actual; queda anotado como
mejora, no como requisito.
