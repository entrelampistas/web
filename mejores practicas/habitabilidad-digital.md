# Diagramas: Ensayo "Habitabilidad Digital"

Este documento contiene las especificaciones exactas de los tres diagramas del
ensayo "Habitabilidad digital". Leer antes de implementar cualquiera de ellos.

Orden de implementación recomendado:
1. "Entorno construido" — primer diagrama del lector
2. "Atención profunda vs. capturada" — más expresivo, mejor contraste visual
3. "Vocabulario como herramienta" — más rico en información, conecta con marca

---

## Diagrama 1: "Entorno construido"

### Ubicación
Después de la introducción del ensayo.

### Idea que comunica
Vives dentro de capas de sistemas que no elegiste. El entorno digital no es
neutro — es arquitectura con incentivos. Las capas van de lo difuso (mercado)
a lo concreto (tu atención), y tú estás en el centro de algo que no diseñaste.

### Patrón visual
Capas anidadas (ver `diagram-language.md`, sección "Patrón: Capas anidadas").

### Composición exacta

**viewBox:** `"0 0 680 420"`

**Capa exterior — "Incentivos económicos":**
- Rectángulo: borde punteado en `#8A8A85` (ink-light), opacidad 0.4.
  stroke-dasharray="6 4". Sin fill (fill="none").
- Posición: descentrado ligeramente a la izquierda del viewBox.
  Aproximadamente x=50, y=40, width=420, height=320, rx=16.
- Etiqueta "Incentivos económicos" en 12px, ink-light, cerca del borde
  superior-izquierdo (x≈62, y≈62).
- 4-6 nodos grises (#8A8A85) dispersos por esta capa, radio 3px.
  Representan fuerzas difusas del mercado. Distribuidos de forma irregular,
  no en grid.

**Capa intermedia — "Algoritmos y plataformas":**
- Rectángulo: borde sólido en `#3D5A80` (accent), stroke-width 0.75,
  stroke-opacity 0.4. Fill `#3D5A80` a opacidad 0.06.
- Posición: dentro de la capa exterior, también ligeramente descentrado.
  Aproximadamente x=100, y=80, width=330, height=240, rx=12.
- Etiqueta "Algoritmos y plataformas" en 13px, weight 500, color accent.
  Posición: cerca del borde superior-izquierdo del rectángulo.
- 3-4 nodos azules (#3D5A80) radio 4px, distribuidos en la zona de esta capa
  (fuera de la capa interior). Conectados entre sí con líneas curvas bezier
  (stroke accent, opacidad 0.4, width 0.75).
- Las conectoras entre nodos pasan POR DETRÁS de la capa interior
  (dibujarse antes en el SVG).

**Capa interior — "Tu atención":**
- Rectángulo: borde sólido en `#1A1A18` (ink), stroke-width 0.5,
  stroke-opacity 0.3. Fill `#F3F2EF` (surface).
- Posición: dentro de la capa intermedia.
  Aproximadamente x=180, y=140, width=180, height=130, rx=8.
- Etiqueta "Tu atención" en 13px, weight 500, color ink.
- Un nodo cobre (#B87333) de radio 4px en el centro del rectángulo,
  CON HALO (radio 12px, fill cobre opacidad 0.08).

**Pie del diagrama:**
- Texto: "El entorno que nadie diseñó para ser habitado"
- Posición: debajo de todo, x=50, y≈395.
- Estilo: 12px, weight 400, color ink-light.

### Notas de composición
- La composición tiene más peso visual a la izquierda. La zona derecha del
  viewBox tiene aire.
- Los nodos grises de la capa exterior están dispersos irregularmente — no
  alineados ni equidistantes.
- Las conectoras curvas entre nodos azules crean una sensación de red.

---

## Diagrama 2: "Vocabulario como herramienta"

### Ubicación
Sección 02 del ensayo.

### Idea que comunica
Nombrar algo lo hace visible y discutible. Cada término nuevo abre un campo
de discusión que antes no existía. La genealogía de conceptos muestra cómo
el vocabulario se construye sobre lo anterior.

### Patrón visual
Línea de tiempo con emergencias (ver `diagram-language.md`, sección
"Patrón: Línea de tiempo con emergencias").

### Composición exacta

**viewBox:** `"0 0 680 340"`

**Zona inferior — "Sin nombre":**
- Rectángulo: x=40, y=190, width=600, height=100, rx=4.
  Fill `#F3F2EF` opacidad 0.5. Sin borde.
- Etiqueta "Sin nombre" en 12px, ink-light. Posición: x=52, y=250.
- 5-7 líneas horizontales dispersas en `#DDDDD8`, stroke-width 0.5,
  opacidades variadas (0.3-0.5). Longitudes variadas (60-130px).
  Representan ideas sin forma, confusas. Distribuidas irregularmente
  dentro de esta zona.

**Zona superior — "Visible":**
- Sin fill. Limpia.
- Etiqueta "Visible" en 12px, weight 500, color accent. Posición: x=52, y=50.

**Línea de tiempo:**
- Línea horizontal en `#DDDDD8`, stroke-width 0.75.
  De x=40 a x=640, y=190.

**Los cuatro puntos (de izquierda a derecha):**

Punto 1 — Burbuja de filtros:
- Posición x: ≈140.
- Nodo: radio 3px, fill `#1A1A18` (ink), sobre la línea de tiempo.
- Línea vertical: de (140, 190) a (140, 90). Stroke ink, width 0.5, opacity 0.5.
- Etiqueta: "Burbuja de filtros" en 13px, weight 500, ink-mid.
  text-anchor="middle", y≈80.
- Dato: "2011 · Pariser" en 11px, ink-light. text-anchor="middle", y≈68.

Punto 2 — Economía de la atención:
- Posición x: ≈290.
- Nodo: radio 3px, fill ink.
- Línea vertical: de (290, 190) a (290, 90). Mismos estilos.
- Etiqueta: "Economía de la atención".
- Dato: "2014 · Harris".

Punto 3 — Enshittification:
- Posición x: ≈440.
- Nodo: radio 3px, fill ink.
- Línea vertical: mismos estilos.
- Etiqueta: "Enshittification".
- Dato: "2023 · Doctorow".

Punto 4 — Habitabilidad digital (el nuestro):
- Posición x: ≈580.
- Nodo: radio 4px, fill `#3D5A80` (accent), CON HALO.
- Línea vertical: PUNTEADA (stroke-dasharray="4 3"), stroke accent,
  width 0.5, opacity 0.6. Representa un término aún en formación.
- Etiqueta: "Habitabilidad digital" en 13px, weight 500, color accent.
- Dato: "2025 · Entrelampistas".

**Conectoras genealógicas:**
- Líneas curvas sutiles (opacidad 0.15, accent) conectando los cuatro nodos
  sobre la línea de tiempo. Son curvas muy suaves y bajas, pasando justo por
  debajo de las etiquetas. Muestran que forman una genealogía conceptual.

**Pie del diagrama:**
- Texto: "Nombrar vuelve visible. Lo visible puede discutirse."
- Posición: x=40, y≈325.
- Estilo: 12px, weight 400, ink-light.

### Notas de composición
- Los cuatro puntos NO están equidistantes — la separación refleja
  aproximadamente la distancia temporal (3 años, 9 años, 2 años).
- El cuarto punto (Entrelampistas) tiene tratamiento diferente: color accent,
  línea punteada, nodo con halo. Es visualmente distinto = es el punto nuevo.
- La zona inferior con líneas dispersas crea una textura sutil de "ruido"
  que contrasta con la limpieza de la zona superior.

---

## Diagrama 3: "Atención profunda vs. capturada"

### Ubicación
Sección 04 del ensayo.

### Idea que comunica
La atención continua se degrada cuando el entorno la fragmenta. No es un fallo
personal — es diseño del entorno. La comparación visual hace evidente la
degradación progresiva.

### Patrón visual
Dos paneles comparativos (ver `diagram-language.md`, sección
"Patrón: Dos paneles comparativos").

### Composición exacta

**viewBox:** `"0 0 680 320"`

**Separador central:**
- Línea vertical: x=340, de y=30 a y=270.
  Stroke `#DDDDD8`, width 0.5.

### Panel izquierdo — "Atención continua"

**Título:**
- "Atención continua" en 14px, weight 600, color accent.
  Posición: x=40, y=50.

**Línea curva continua:**
- Un path suave en accent (#3D5A80), stroke-width 1, opacity 0.7.
- Va de izquierda a derecha (x≈60 a x≈310) con ondulaciones suaves.
- La línea fluye sin interrupciones, mantiene su amplitud constante.
- Ejemplo de path: `M 60,160 C 100,140 140,180 180,155 S 260,170 310,160`
  (ajustar para que la curva sea orgánica y suave).

**Nodos sobre la línea:**
- 4-5 nodos de radio 3px en accent, equidistantes sobre la curva.
- Cada nodo tiene halo (radio 9px, accent opacidad 0.08).
- Los nodos representan momentos de atención sostenida.

**Etiqueta inferior:**
- "Continuidad" en 12px, ink-light. Posición: x=40, y=240.

**Pie:**
- "Un hilo de pensamiento sostenido" en 12px, ink-light.
  Posición: x=40, y=290.

### Panel derecho — "Atención capturada"

**Título:**
- "Atención capturada" en 14px, weight 600, color accent-warm.
  Posición: x=370, y=50.

**Línea curva interrumpida:**
- La misma forma general que el panel izquierdo, pero en accent-warm (#B87333).
- La línea está INTERRUMPIDA por 5-6 pequeños rectángulos que representan
  notificaciones/interrupciones.
- Rectángulos de interrupción:
  - Fill `#B87333` opacidad 0.15. Stroke `#B87333` width 0.5 opacity 0.3.
  - Tamaños CRECIENTES de izquierda a derecha: 8px, 9px, 10px, 12px, 13px, 14px.
    (Las interrupciones se acumulan y crecen.)
  - rx=2 (bordes apenas redondeados).
  - Posicionados centrados verticalmente sobre la línea.

**Degradación progresiva:**
- Después de cada interrupción (rectángulo), la línea se desvía ligeramente
  hacia abajo y pierde amplitud.
- La primera sección de la línea está a y≈160. La última sección cae a y≈190.
- La opacidad de la línea decrece gradualmente: empieza a 0.7 y termina a 0.3.
- El nodo final tiene opacidad 0.4 (la señal se ha perdido). Sin halo.

**Nodos sobre la línea:**
- 4-5 nodos de radio 3px en accent-warm.
- Los primeros tienen halo. Los últimos NO (el halo se pierde con la señal).
- El último nodo tiene opacidad 0.4.

**Etiqueta inferior:**
- "Fragmentación" en 12px, ink-light. Posición: x=370, y=240.

**Pie:**
- "Cada interrupción degrada la señal" en 12px, ink-light.
  Posición: x=370, y=290.

### Notas de composición
- El contraste entre los dos paneles es la historia: izquierda = fluido y
  estable; derecha = cada vez más roto.
- La degradación del panel derecho debe ser PROGRESIVA y VISIBLE — no sutil.
  El lector debe ver inmediatamente que la línea se rompe y cae.
- Los rectángulos de interrupción crecen en tamaño: esto visualiza la
  acumulación. Las primeras interrupciones son pequeñas. Las últimas dominan.
- Ambos paneles arrancan a la misma altura (y≈160) para que la caída del
  panel derecho sea evidente por comparación.
