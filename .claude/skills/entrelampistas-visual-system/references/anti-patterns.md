# Anti-Patterns — Lo que NUNCA Hacer

## Color
- NO inventar colores fuera de paleta. No usar hex sueltos (#333, #666, etc.)
- NO gradientes decorativos (linearGradient, radialGradient).
- NO sombras, blur o filtros SVG (filter, feGaussianBlur, drop-shadow).
- NO negro puro #000000. El negro es var(--ink).
- NO blanco puro #FFFFFF. El fondo es var(--paper).
- SIEMPRE usar CSS variables: var(--klein-deep), var(--rojo), var(--ink), etc.

## Tipografia
- NO ALL CAPS. Todo sentence case.
- NO otra fuente que Space Grotesk (var(--font)) en SVGs.
- NO texto mayor de 14px dentro de SVG.
- NO texto tocando formas. Minimo 12px de separacion.
- NO centrar texto arbitrariamente. Alinear con el elemento que describe.

## Geometria
- NO lineas rectas como conectores. SIEMPRE curvas bezier (C o Q en path).
- NO nodos mayores de r=5px. Los nodos son puntos discretos.
- NO rectangulos sin fill translucido (excepto punteados que representan bordes difusos).
- NO composicion centrada rigidamente. Siempre asimetrica equilibrada.
- NO todo comprimido sin aire. Aumentar viewBox si hace falta.

## Estructura
- NO orden de capas incorrecto. Fondos primero, textos ultimo.
- NO viewBox distinto de 680 de ancho.
- NO width fijo en px. Siempre width="100%".
- NO halos encima de nodos (deben ir debajo en el codigo SVG).
- NO SVGs sin role="img", aria-label y <title>.

## Concepto
- NO diagramas decorativos que no comunican nada.
- NO simplificar a wireframe (solo lineas y texto, sin nodos ni fills).
- NO interactividad (los diagramas de ensayos son estaticos).
- NO iconos, emojis, ilustraciones figurativas, flechas con punta, imagenes.

## Resumen rapido
| Correcto                                 | Incorrecto                              |
|------------------------------------------|-----------------------------------------|
| CSS variables del DS                     | Hex sueltos                             |
| Space Grotesk via var(--font)            | Inter, Roboto, DM Sans, Arial          |
| Sentence case                            | ALL CAPS                                |
| Curvas bezier como conectoras            | Lineas rectas entre nodos               |
| Nodos r=3-5px con halo opcional          | Circulos grandes r>5px                  |
| Rectangulos con fill opacity 0.06-0.12   | Rectangulos solo con borde              |
| Composicion asimetrica con aire          | Todo centrado y comprimido              |
| viewBox="0 0 680 h" width="100%"         | Otros viewBox o width fijo              |
| Diagrama que comunica una idea           | Diagrama decorativo                     |
| 12px minimo entre texto y formas         | Texto pegado a formas                   |
| Profundidad con capas y opacidad         | Sombras, blur, gradientes               |
