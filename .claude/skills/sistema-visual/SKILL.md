---
name: sistema-visual
description: Sistema visual de la web de entrelampistas (iteración 2, septiembre 2026). Úsalo SIEMPRE antes de tocar HTML, CSS o cualquier pieza visual del proyecto — pantallas, componentes, fotos, tipografía, color, marca, tarjetas para compartir o imágenes de enlace — y cuando se pida un ajuste de diseño. Resume las reglas y dice dónde vive cada valor; para interacción (hover, transiciones, foco) usa también frontend-craft.
---

# Sistema visual · entrelampistas

Describe la web tal como está construida hoy. Nada de versiones anteriores sigue vigente: si algo no está aquí, en el brief o en el código, no existe.

## Orden de autoridad

1. `design/docs/design-brief.md` — límites duros y componentes. Manda sobre todo lo demás.
2. `CLAUDE.md` › «Decisiones posteriores al handoff» — cambios acordados después del brief; mandan sobre brief y mocks.
3. `styles/tokens.css` — **los valores**. Este skill nombra tokens; nunca copies un hex, un tamaño o una duración desde aquí.
4. `styles/base.css`, `styles/components.css`, `styles/tema.css` — clases ya hechas. Reutiliza antes de crear.
5. `design/mocks/*.dc.html` — donde el brief calla.

Si un cambio contradice el brief, se anota como decisión nueva en `CLAUDE.md` con fecha; no se deja implícito en el CSS.

## Límites que no se negocian

- `border-radius: 0` y `box-shadow: none` en todo.
- Un solo color de acento, `--acento` (verde): lo propio del lector (guardado, leído, su respuesta) y la acción de herramienta. Nunca decorativo, nunca en hover.
- Solo Archivo y Space Mono, autohospedadas. Sin serifa. Cursiva solo en `.cita-autora`.
- Color solo por variable de `tokens.css`. Ningún hex en otro archivo (la tarjeta en canvas de `js/compartir.js` es la única excepción).
- Filetes de 1px `--linea`. Filete de 2px `--acento` solo en pestaña activa y barra de progreso de lectura.
- Transiciones solo de opacidad, transformación y color, con `--dur-*` y `--ease-out`. `prefers-reduced-motion` respetado.
- Áreas táctiles ≥ `--tactil`. Contraste ≥ 4.5:1. Sin desbordamiento horizontal entre 320 y 390.
- Único degradado permitido: el velo sobre foto (`--velo-foto`).

`npm run check` vigila estos límites; si falla, el cambio no está terminado.

## Marca

**Logo: la cara dibujada** (`assets/img/logo-cara.webp`): trazo negro con toques verdes sobre fondo transparente.

- Vive en la cabecera de sitio, a la izquierda, a 40px de alto, sobre papel, y enlaza a inicio.
- No se recolorea, no se recorta, no se invierte, no va sobre foto ni sobre tinta, no se anima.
- En texto corrido la marca se escribe **entrelampistas**, en minúscula. En contextos mono (meta, pie de tarjeta, imagen de enlace) va en mayúsculas por la propia clase `.mono`.
- El dominio se escribe `entrelampistas.com`.

## Color

Roles de los tokens (valores en `tokens.css`):

| Token | Uso |
|---|---|
| `--papel` | fondo general |
| `--papel-2` | hundido: hover de fila, celda, chip, botón hueco |
| `--tinta` | texto, fondo inverso (T3, bloque de pregunta, tarjeta), botón principal |
| `--tinta-2` | cuerpo secundario |
| `--tinta-3` | meta, estados neutros |
| `--linea` | filete estructural |
| `--gris-pista`, `--gris-paso` | pista de barras, paso pendiente |
| `--acento` | lo del lector y la acción de herramienta |
| `--velo`, `--velo-foto`, `--velo-tesis` | hoja/diálogo, foto con texto, tesis desplegada del feed |
| `--sombra-texto-foto` | única sombra: la del texto sobre foto |

Los colores de las fotos (amarillos, rojos, verdes de follaje) nunca pasan a la interfaz.

## Tipografía

Archivo para display y cuerpo; Space Mono para meta, números y botones. Clases de `base.css`:

| Clase | Para |
|---|---|
| `.display-m`, `.display-s` | títulos de pantalla y de pieza |
| `.titulo`, `.titulo-s` | título de fila, celda, pregunta |
| `.lectura` | texto de ensayo |
| `.cuerpo` | texto de interfaz y descripciones |
| `.cita` | pullquote |
| `.mono`, `.mono-num`, `.mono-fon` | meta en mayúsculas, folios y números, fonética |
| `.meta`, `.secundario` | color `--tinta-3` / `--tinta-2` |

## Copy de interfaz

- Frases en minúscula; meta en mono (mayúsculas por la clase, no en el texto).
- Sin exclamaciones ni verbos de marketing.
- Sin etiquetas que clasifiquen la pieza (definición, término, tesis, ensayo, herramienta, eje) ni tiempos de lectura. Las etiquetas de bloque, solo para lectores de pantalla (`.visually-hidden`).
- Textos de la autora verbatim desde `content/` o el mock. Nunca se reescriben para que quepan.

## Espacio y retícula

- Escala `--s-1` … `--s-16`; margen lateral `--margen`.
- `--cabecera` 56 en todas las pantallas; `--pestanas` 84 solo en raíz (inicio, mapas).
- Referencia 390, fluido de 320 a 1023. En ≥1024 la columna móvil se centra a `--columna-max` sobre `--papel-2`.

## Formas de eje

■ **criterio** · ○ **entornos** (`.forma--criterio`, `.forma--entornos`, 10×10). Es la única codificación de eje: sin color. □ queda reservado.

## Componentes

Todos en `components.css` salvo los marcados (tema) en `tema.css`. Antes de crear uno nuevo, comprueba que no sirve uno de estos.

| Componente | Clase | Nota |
|---|---|---|
| Cabecera de sitio / de pieza | `.cabecera`, `.cabecera--pieza` | sitio: logo + filtros; pieza: volver, ruta mono, meta **o** acciones, nunca ambas; progreso 2px |
| Pestañas | `.pestanas` | solo raíz; activa con forma rellena de acento |
| Botones | `.btn` + `--tinta` / `--acento` / `--hueco` / `--texto` | mono; alto inline 40, estándar 44, CTA 48 a ancho completo |
| Fila de lista | `.lista` + `.fila` | filete arriba en el contenedor y abajo en cada fila |
| Celda de mapa | `.reticula` + `.celda` | retícula de 2 con filetes compartidos; la actual en tinta |
| Filtros | `.filtros` + `.filtro` | activo con filete inferior 2px acento |
| Chip de concepto | `.chip` | filete, sin color, sin icono |
| Término y ficha | `.term`, `.term-ficha` | subrayado; ficha con filetes arriba y abajo |
| Pullquote | `.pullquote` | trazo corto de acento arriba |
| **Foto con texto** | `.foto` + `__capa`, `__folio`, `__titulo`, `__sub` | único patrón de imagen con texto encima; ver Fotografía |
| Bloque de pregunta (índice) | `.q-bloque`, `.opciones` | fondo tinta; «no lo sé» siempre presente |
| Pasos y barras | `.pasos`, `.barra` | segmentos; estados del índice solo en el resultado |
| Hoja / diálogo | `.hoja` | desde abajo; `Esc` cierra; foco atrapado |
| Tarjeta compartible | `.tarjeta` + canvas | ver Piezas para compartir |
| Correo | `.correo`, `.correo--compacto` | completo en feed y proyecto; compacto en cierres con FAQ; tres estados, error nunca en rojo |
| Definición | `.definicion` | feed y proyecto |
| Estados y avisos | `.vacio`, `.aviso`, `.aviso-flotante` | aviso con filete izquierdo de tinta; nunca rojo |
| Consentimiento | `.consentimiento` | aviso al pie; aceptar / rechazar |
| Tema (tema) | `.tema-t0__*`, `.tema-tesis__*`, `.paradas`, `.tema-preguntas` | T0 puerta, T1 tesis, T2 mapa, T3 preguntas en tinta |
| Ensayo (tema) | `.ensayo-*`, `.cifras`, `.ensayo-filas`, `.ensayo-reticula`, `.faq` | cifra grande, filas de dos columnas, retícula de cuatro preguntas + guardar, FAQ en acordeón |

## Pantallas

- **Temas** (`/habitabilidad`, `/criterio`, `/decisiones`): una sola página con T0 → T1 → T2 → T3 → ensayo E1–E7, generada por `src/render/tema.mjs` desde `content/ensayo-<slug>.md` (texto) y `.json` (presentación). Un tema nuevo es contenido, no código: sigue el skill `publicar-contenido`.
- **Feed** (`/`): definición, tarjetas de tema con tesis dentro de la foto, definición, primera pregunta del índice, correo.
- **Mapas** (`/mapas`): retícula de temas por eje.
- **Índice** (`/indice`): portada, diez preguntas, resultado, compartir.

## Fotografía

- **Cada tema tiene su propia serie y las series son distintas entre sí** (copas de árbol a luz natural en Criterio, botánica de estudio sobre negro en Decisiones). No se buscan rasgos comunes.
- En el ensayo, a todo lo ancho, proporción natural y sin recorte. Con recorte solo la portada del tema (4:3), la del ensayo y la tarjeta del feed (4:5).
- Texto encima de una foto: **solo** con `.foto` y `--velo-foto`. Folio, título y subtítulo abajo a la izquierda, dentro de la foto.
- Asignación foto → pantalla, alt y crédito en `design/docs/fotos.md`. Foto con texto encima o de pausa: `alt=""`. Foto de sección: alt breve.
- Archivos en `assets/img/`: jpg a 1000px (q82) y `-w1600` para pantallas densas, sin metadatos EXIF ni ubicación. `srcset` lo añade el renderer.

## Ilustración y diagramas

- Los garabatos (`assets/img/garabato-*.webp`, `il-*.webp`) se eligen caso a caso con la autora. Este skill no fija reglas para ellos.
- No hay diagramas en la web. Si hacen falta, se diseñan en su momento.

## Piezas para compartir

- **Tarjeta compartible**: 4:5, PNG 1080×1350 dibujado en canvas (`js/compartir.js`). Fondo tinta, texto papel, acento solo en rombos y barras propias. Cabecera y pie en mono con el nombre y el dominio. Nunca respuestas individuales ni datos personales. Los datos de cada tarjeta viven en un `<script type="application/json">` junto al botón que la abre.
- **Imagen de enlace** (`og:image`): 1200×630, jpg, una por tema (`assets/img/og-<tema>.jpg`), recortada de la portada. Se declara con `"og"` en la cabecera JSON de la página; sin ella se usa `og-default.png`.

## Escritorio · fase 2 (no implementar todavía)

El brief ya fija el escritorio; no se construye ahora, pero nada de lo que se haga en móvil debe contradecirlo:

- Breakpoints: `<768` móvil · `768–1023` móvil con margen 24 · `≥1024` escritorio.
- Referencia 1280, 12 columnas, margen 64, canal 32, repartos 3|9 o 4|8. Cabecera 64 con navegación mono.
- Lectura de ensayo en columna de 620px con número de sección fijo.
- Tamaños de escritorio del brief: `display-xl`, `display-l`, `titulo-l`, `lectura-xl`.

## Cómo hacer un cambio visual

1. Lee la sección del brief que toca y las decisiones de `CLAUDE.md`.
2. Reutiliza un componente; si no vale, amplíalo con un modificador (`--algo`) antes de crear otro.
3. Solo tokens. Si falta un valor, se añade a `tokens.css` con comentario y fecha, no en el componente.
4. `npm run build && npm run check`.
5. Capturas a 390, 375 y 320 con Playwright (`/opt/pw-browsers/chromium`); compara con el mock; `scrollWidth` ≤ ancho; foco visible.
6. Si cambia una regla, anótala en `CLAUDE.md` › «Decisiones posteriores al handoff».

## Pendientes ◆

- El favicon (`favicon.svg`) es un cuadrado de tinta, no la cara.
- La tarjeta compartible pone el nombre en mono; el brief pedía el logo invertido, que hoy no existe.
- `og-default.png` es de Habitabilidad y lleva etiquetas «ensayo · herramienta · conceptos»; debería ser una imagen de marca genérica.
