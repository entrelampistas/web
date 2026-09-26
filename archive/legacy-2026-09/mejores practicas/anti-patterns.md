# Anti-Patterns — Lo que NUNCA Hacer

Cada anti-pattern aquí listado ha aparecido en outputs anteriores. Memorizar estos
errores y no repetirlos.

---

## Color

❌ **Inventar colores fuera de paleta**
No usar `#333333`, `#666`, `#0066CC`, `#blue`, `gray`, ni ningún color que no esté
en la tabla de tokens. Si necesitas un tono más claro de azul, usa `#3D5A80` con
menor opacidad — nunca un hex diferente.

❌ **Usar gradientes**
Ningún `linearGradient` decorativo, ningún `radialGradient` para fondos.
(La única excepción permitida: un gradiente de opacidad para difuminar una conectora.)

❌ **Usar sombras, blur o filtros SVG**
No `filter`, no `feGaussianBlur`, no `drop-shadow`. La profundidad se crea con
superposición de capas y opacidad, nunca con efectos.

❌ **Usar negro puro (#000000)**
El negro del sistema es `#1A1A18` (ink). Nunca `#000` ni `#000000`.

❌ **Usar blanco puro (#FFFFFF)**
El fondo es `#FAFAF8` (paper). Si necesitas una superficie clara, usar `#F3F2EF` (surface).

---

## Tipografía

❌ **Usar ALL CAPS**
Nunca. Ni en títulos, ni en etiquetas, ni en botones. Todo es sentence case.
Erróneo: "INCENTIVOS ECONÓMICOS". Correcto: "Incentivos económicos".

❌ **Usar otra fuente que DM Sans**
No Inter, no Roboto, no Arial, no system-ui, no serif. DM Sans es la única fuente.
Dentro de SVG: `font-family="DM Sans, sans-serif"`.

❌ **Texto mayor de 14px dentro de SVG**
Los textos dentro de diagramas van entre 11-14px. Solo el título del diagrama
(si existe como elemento dentro del SVG) puede llegar a 16px. Si necesitas más,
el texto va fuera del SVG, en el HTML del ensayo.

❌ **Texto tocando formas**
Mínimo 12px de separación entre cualquier texto y cualquier forma (rectángulo,
nodo, línea). El aire entre texto y forma es obligatorio.

❌ **Centrar texto arbitrariamente**
Las etiquetas se alinean visualmente con lo que describen. Si la etiqueta describe
un rectángulo, se posiciona junto al borde superior-izquierdo del rectángulo, no
centrada en el viewBox.

---

## Geometría

❌ **Líneas rectas como conectores**
Las conectoras entre nodos son SIEMPRE curvas bezier (`C` o `Q` en path).
Usar `<line>` solo para ejes, separadores o líneas de tiempo.
Erróneo: `<line x1="100" y1="100" x2="300" y2="100"/>` como conector.
Correcto: `<path d="M 100,100 C 150,80 250,120 300,100"/>`.

❌ **Nodos demasiado grandes**
El radio máximo de un nodo es 5px. Si un nodo tiene radio 8, 10 o más,
probablemente estás confundiendo un nodo con un círculo decorativo. Los nodos son
puntos discretos, no círculos prominentes.

❌ **Rectángulos sin fill translúcido**
Los rectángulos del sistema visual tienen fill con opacidad 0.06-0.12. Un rectángulo
con `fill="none"` y solo borde es visualmente pobre y rompe el lenguaje. (Excepción:
rectángulos de contorno punteado que representan bordes difusos.)

❌ **Composición centrada rígidamente**
No centrar todo en el punto medio del viewBox. La composición es asimétrica pero
equilibrada. Desplazar la masa visual ligeramente.

❌ **Comprimir todo sin aire**
El espacio vacío es intencional. Si el diagrama se siente apretado, aumentar la
altura del viewBox y distribuir elementos con más generosidad.

---

## Estructura SVG

❌ **Orden de capas incorrecto**
Las capas deben respetar este orden (de fondo a frente):
1. Áreas de fondo → 2. Líneas referencia → 3. Rectángulos → 4. Conectoras →
5. Halos → 6. Nodos → 7. Textos.

Si un texto queda detrás de un rectángulo, el orden de capas es incorrecto.

❌ **viewBox incorrecto**
El ancho siempre es 680. Erróneo: `viewBox="0 0 800 400"` o `viewBox="0 0 100 100"`.
Correcto: `viewBox="0 0 680 [altura proporcional al contenido]"`.

❌ **Width fijo en px**
El SVG debe tener `width="100%"` para que sea responsive.
Erróneo: `width="680"`. Correcto: `width="100%"`.

❌ **Halos encima de nodos**
El halo (círculo grande semi-transparente) se dibuja ANTES del nodo sólido en el
código SVG, para que el nodo quede encima visualmente.

---

## Concepto

❌ **Diagrama puramente decorativo**
Si el diagrama no comunica una idea que el texto solo no transmite con la misma
inmediatez, no pertenece al ensayo. Un diagrama bonito que no dice nada es
decoración, no comunicación.

❌ **Simplificar a wireframe**
Un diagrama con solo líneas y texto sin nodos, sin fills translúcidos, sin halos,
es un wireframe — no un diagrama Entrelampistas. Los cinco elementos (nodos,
rectángulos, conectoras, etiquetas, líneas de referencia) deben estar presentes
según la necesidad del contenido.

❌ **Añadir interactividad**
Los diagramas de ensayos son estáticos. No hover states, no click, no animaciones,
no transiciones. Si en el futuro se añade interactividad, será una decisión explícita.

❌ **Añadir elementos fuera del lenguaje**
No iconos, no emojis, no ilustraciones, no imágenes incrustadas, no flechas con
punta (usar nodos como terminadores de conectoras), no estrellas, no checks. Solo
los cinco elementos del lenguaje visual.

---

## Resumen rápido

| Haz esto                              | NO esto                                |
|---------------------------------------|----------------------------------------|
| Colores de la paleta exacta           | Hex inventados o aproximados           |
| DM Sans, sans-serif                   | Inter, Roboto, Arial, system-ui        |
| Sentence case                         | ALL CAPS                               |
| Líneas curvas bezier como conectoras  | Líneas rectas entre nodos              |
| Nodos r=3-5px con halo opcional       | Círculos grandes r>5px                 |
| Rectángulos con fill opacity 0.06-0.12| Rectángulos solo con borde             |
| Composición asimétrica con aire       | Todo centrado y comprimido             |
| viewBox="0 0 680 h" width="100%"      | Otros viewBox o width fijo             |
| Diagrama que comunica una idea        | Diagrama decorativo sin propósito      |
| 12px mínimo entre texto y formas      | Texto pegado a bordes de formas        |
| Profundidad con capas y opacidad      | Sombras, blur, gradientes decorativos  |
