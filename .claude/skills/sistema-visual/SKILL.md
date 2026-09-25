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

**Logo: la cara dibujada, negro y verde** (`assets/img/logo-cara.webp`, fondo transparente). Es la única versión: no se recolorea, no se invierte, no se recorta, no se anima. Siempre sobre papel; donde el fondo es tinta o foto, va dentro de una placa cuadrada de papel.

| Dónde | Cómo |
|---|---|
| Cabecera de sitio | a la izquierda, 40px de alto, sobre papel, enlaza a inicio (`logo-cara-240.webp`; el original grande solo para generar iconos) |
| Icono del navegador | `favicon.ico` (16/32/48) y `icono-32.png`: la cara entera centrada en un cuadrado de papel |
| Pantalla de inicio del móvil | `icono-180.png` (iOS), `icono-192.png` y `icono-512.png` vía `site.webmanifest` |
| Tarjeta compartible | placa de papel de 128px arriba a la izquierda, sobre la tinta de la tarjeta |
| Imagen de enlace genérica | `og-default.png`: papel, la cara a la izquierda y la definición del feed |

- Los iconos se generan desde `logo-cara.webp` (recorte de márgenes transparentes, cara entera, sin deformar). Si el logo cambia, se regeneran todos a la vez.
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
| Editorial suiza (tema) | `.ensayo--suizo`, `.ensayo-apertura`, `.ensayo-imagen`, `.ensayo-lista`, `.ensayo-entradilla`, `.destacado`, `.ensayo--pregunta-forma` / `--tinta` | se activa por mapa con `json › editorial`; ver CLAUDE.md 25-09-2026 |

## Pantallas

- **Mapa** (`/habitabilidad`, `/criterio`, `/decisiones`): pantalla de visión general con principio y final. Portada 4:3 con título y pregunta, «leer el ensayo» (o «seguir leyendo · 0N»), tesis, recorrido de cinco paradas en acordeón, preguntas en tinta y cierre con el botón otra vez, herramienta, conceptos, relación y otros mapas. Generada por `src/render/tema.mjs` con `parte="mapa"`.
- **Ensayo** (`/x/ensayo`): E1–E7 con cabecera viva y progreso. Solo se llega por enlace: botón del mapa, parada, feed. Cierre: volver al mapa, preguntas, siguiente mapa, FAQ, correo. `parte="ensayo"`.
- Un mapa nuevo es contenido, no código: sigue el skill `publicar-contenido` y crea `src/pages/<slug>.html` y `src/pages/<slug>/ensayo.html`.
- **Feed** (`/`): definición, tarjetas de mapa (foto → tesis; «ir al mapa», «leer el ensayo», compartir, guardar), definición, primera pregunta del índice, correo.
- **Mapas** (`/mapas`): listado generado desde el contenido (`src/render/mapas.mjs`), filtrable por eje, sin preselección; Pensamiento de mantenimiento como fila aparte.
- **Índice** (`/indice`): portada, diez preguntas, resultado, compartir.

## Fotografía

- **Cada tema tiene su propia serie y las series son distintas entre sí** (copas de árbol a luz natural en Criterio, botánica de estudio sobre negro en Decisiones). No se buscan rasgos comunes.
- En el ensayo, proporción natural y sin recorte: a todo lo ancho con el título dentro (presentación de siempre) o, en la editorial suiza, sin texto ni velo y dentro del margen, con el título de sección encima sobre papel. Con recorte solo la portada del tema (4:3), la del ensayo y la tarjeta del feed (4:5).
- Texto encima de una foto: **solo** con `.foto` y `--velo-foto`. Folio, título y subtítulo abajo a la izquierda, dentro de la foto.
- Asignación foto → pantalla, alt y crédito en `design/docs/fotos.md`. Foto con texto encima o de pausa: `alt=""`. Foto de sección: alt breve.
- Archivos en `assets/img/`: a 1000, 1200 (`-w1200`) y 1600 px (`-w1600`), en JPG q82 y AVIF q55, sin metadatos EXIF ni ubicación. `<picture>` con AVIF y JPG de respaldo y el `srcset` los escribe `src/render/lib/imagen.mjs`; en páginas escritas a mano se copia esa estructura.
- Series por tema: Criterio, copas de árbol a luz natural; Decisiones, botánica de estudio sobre negro; Habitabilidad, fachadas de viviendas y oficinas con árboles delante.

## Ilustración y diagramas

- Los garabatos (`assets/img/garabato-*.webp`, `il-*.webp`) se eligen caso a caso con la autora. Este skill no fija reglas para ellos.
- No hay diagramas en la web. Si hacen falta, se diseñan en su momento.

## Piezas para compartir

- **Tarjeta compartible**: 4:5, PNG 1080×1350 dibujado en canvas (`js/compartir.js`). Fondo tinta, texto papel, acento solo en rombos y barras propias. Arriba, el logo en su placa de papel y, a la derecha, el nombre de la pieza en mono. Abajo, dominio y fecha en mono. Nunca respuestas individuales ni datos personales. Los datos de cada tarjeta viven en un `<script type="application/json">` junto al botón que la abre.
- **Imagen de enlace** (`og:image`): 1200×630. Cada tema tiene la suya en jpg, recortada de su portada (`assets/img/og-<tema>.jpg`), declarada con `"og"` en la cabecera JSON de la página. Las demás páginas usan `og-default.png`: la imagen de marca, sin nombres de piezas ni etiquetas, válida aunque cambien los temas.

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
