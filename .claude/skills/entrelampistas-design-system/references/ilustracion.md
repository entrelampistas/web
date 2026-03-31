# Sistema de Ilustración — Especificaciones SVG

## Principio general

Las ilustraciones de Entrelampistas no son decorativas. Son argumentativas.
Cada una hace un argumento visual sobre los sistemas invisibles que habitan
los espacios cotidianos. El estilo mezcla tres referencias:

- **Chris Ware** → isometría, sección transversal, planos técnicos habitados
- **The New Yorker** → línea de ilustración limpia, humor en el detalle
- **The New Atlantis** → infraestructura como protagonista, sistemas visibles

El resultado: planos técnicos que revelan vida interior.

---

## Reglas técnicas SVG — todas las ilustraciones

```svg
<!-- Setup base — siempre así -->
<svg
  class="il il-[nombre]"
  viewBox="0 0 W H"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="[descripción accesible]"
>
  <title>[título accesible]</title>
  <!-- grupos lógicos con clases semánticas -->
  <g class="il-buildings"> ... </g>
  <g class="il-network-lines"> ... </g>
  <g class="il-figures"> ... </g>
</svg>
```

### Propiedades globales de trazo

```
stroke-linecap="round"     — siempre
stroke-linejoin="round"    — siempre
stroke-width="1"           — líneas secundarias
stroke-width="1.5"         — líneas principales
stroke-width="2"           — elementos de primer plano
```

### Lo que NUNCA aparece en las ilustraciones

- Degradados (excepto un único linearGradient para temperatura/energía)
- Sombras de caja o drop-shadow
- Texto en las ilustraciones (excepto etiquetas técnicas en monospace 5px)
- Más de 2 colores de acento en la misma pieza
- Proporciones "correctas" de personas — siempre ligeramente exageradas
- Caras con detalles — solo siluetas esquemáticas

---

## IL-01 — La Ciudad que Piensa

**Propósito:** Hero background. Fondo decorativo del hero de la landing.

```
viewBox="0 0 480 640"
Posición HTML: dentro de <section class="hero">, antes del <h1>
Wrapper: <div class="hero-illustration-wrap" aria-hidden="true">
Tamaño: 40% del ancho en desktop, hidden en mobile
```

**Descripción visual:**
Vista isométrica en corte de un bloque urbano contemporáneo.
Corte que revela el interior de tres edificios:
- Biblioteca: estanterías visibles como rectángulos de colores, personas como formas geométricas
- Café: mesas, figuras trabajando, vapor de café como curvas finas
- Metro subterráneo: vía, vagones esquemáticos, pasajeros como siluetas

Todo conectado por líneas visibles (accent-1, azul) que representan:
datos, electricidad, tuberías, conexiones humanas.

**Grupos de elementos:**
```svg
<g class="il-buildings">   <!-- 3 edificios con corte isométrico -->
<g class="il-metro">       <!-- red subterránea -->
<g class="il-network-lines" class="network-line" data-line-index="0..N">
<g class="il-figures">     <!-- max 5 figuras humanas esquemáticas -->
```

**Personas en Chris Ware style:**
```svg
<!-- Cabeza: circle, cuerpo: rect, sin detalles faciales -->
<circle cx="X" cy="Y" r="4" fill="var(--il-ink)"/>
<rect x="X-3" y="Y+4" width="6" height="10" rx="1" fill="var(--il-ink)"/>
```

**Animación de cables al cargar (desktop only):**
```css
.network-line {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw-line 1.2s ease-out forwards;
  animation-delay: calc(var(--line-index) * 0.15s);
}
@keyframes draw-line { to { stroke-dashoffset: 0; } }
```

---

## IL-02 — El Lampista

**Propósito:** Figura decorativa flotante en sección Sobre y páginas interiores.

```
viewBox="0 0 200 280"
Sin fondo (transparente)
Posición: float right, margin: 0 0 1rem 2rem
Tamaño desktop: 160px, mobile: 100px
```

**Descripción visual:**
Figura única del lampista en perspectiva casi frontal, ligeramente isométrica.
Construida con geometría básica — no realista, sino como pictograma con carácter.

Elementos:
- Cuerpo: rectángulos y círculos, proporciones deliberadamente no realistas
- Herramienta: llave inglesa o destornillador en mano, forma simple
- Líneas irradiantes alrededor: cables, conexiones, símbolo de bombilla integrado en el trazo
- NO: detalles faciales, texturas, degradados

```
stroke-width: 1.5 figura principal
stroke-width: 0.75 detalles y líneas irradiantes
Colores: --il-ink (figura), --il-accent-1 (cables), --il-accent-3 (detalle de luz, esparso)
```

**Animación:**
```css
.il-lampist {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
```

---

## IL-03 — Icons de publicaciones (60×60)

Tres variantes. Una por territorio principal. Misma lógica visual que IL-01
y IL-02 pero en formato reducido: todo debe leerse perfectamente a 60px.

**Regla de icons:**
- stroke-width="1" — uniforme en todos
- Un solo color de acento por pieza
- Sin relleno sólido en el elemento principal — solo líneas

### IL-03a — Cognición (Entrenamiento cognitivo)

```
viewBox="0 0 60 60"
Concepto: cerebro visto desde arriba como plano de planta
```

Un rectángulo suavizado dividido en "habitaciones" por líneas internas.
Cada habitación etiquetada con puntos — no texto.
Una línea de circuito (accent-2, rojo) atraviesa el plano como hilo conductor.

```svg
<!-- Silueta exterior del cerebro-plano -->
<rect x="8" y="10" width="44" height="40" rx="8" fill="none"
      stroke="var(--il-ink)" stroke-width="1"/>
<!-- Divisiones internas -->
<line x1="8" y1="25" x2="52" y2="25" stroke="var(--il-ink)" stroke-width="0.75"/>
<line x1="30" y1="10" x2="30" y2="50" stroke="var(--il-ink)" stroke-width="0.75"/>
<!-- Hilo conductor rojo -->
<path d="M15 20 Q22 15 30 20 Q38 25 45 20"
      fill="none" stroke="var(--il-accent-2)" stroke-width="1"/>
<!-- Nodos -->
<circle cx="15" cy="35" r="2.5" fill="var(--il-ink)"/>
<circle cx="30" cy="30" r="2" fill="none" stroke="var(--il-accent-2)" stroke-width="1"/>
<circle cx="45" cy="38" r="2.5" fill="var(--il-ink)"/>
```

### IL-03b — Tecnología (Relación con la tecnología)

```
viewBox="0 0 60 60"
Concepto: monitor en corte isométrico mostrando su interior
```

Marco del monitor como rectángulo con grosor (doble línea).
Interior: circuitos como calles urbanas (líneas horizontales y verticales).
Cable de alimentación saliendo desde abajo.

```svg
<!-- Marco exterior del monitor (doble línea = grosor de pared) -->
<rect x="6" y="8" width="48" height="34" rx="3" fill="none"
      stroke="var(--il-ink)" stroke-width="1.5"/>
<rect x="9" y="11" width="42" height="28" rx="2" fill="none"
      stroke="var(--il-ink)" stroke-width="0.5"/>
<!-- Circuitos interiores -->
<line x1="9" y1="20" x2="51" y2="20" stroke="var(--il-accent-1)" stroke-width="0.75"/>
<line x1="9" y1="28" x2="51" y2="28" stroke="var(--il-accent-1)" stroke-width="0.75"/>
<line x1="22" y1="11" x2="22" y2="39" stroke="var(--il-accent-1)" stroke-width="0.75"/>
<line x1="38" y1="11" x2="38" y2="39" stroke="var(--il-accent-1)" stroke-width="0.75"/>
<!-- Nodo activo -->
<circle cx="30" cy="25" r="3" fill="none" stroke="var(--il-accent-2)" stroke-width="1"/>
<circle cx="30" cy="25" r="1" fill="var(--il-accent-2)"/>
<!-- Pie + cable -->
<rect x="24" y="42" width="12" height="4" rx="1" fill="none"
      stroke="var(--il-ink)" stroke-width="1"/>
<line x1="30" y1="46" x2="30" y2="52" stroke="var(--il-ink)" stroke-width="1"/>
```

### IL-03c — Atención (Filosofía de lo cotidiano)

```
viewBox="0 0 60 60"
Concepto: ojo construido con círculos concéntricos y líneas radiales
```

Diagrama de precisión óptica. Iris como círculos concéntricos.
Líneas radiales como rayos de luz / atención dirigida.
Una línea radial en rojo: el foco activo.

```svg
<!-- Círculos concéntricos del iris -->
<circle cx="30" cy="30" r="20" fill="none" stroke="var(--il-ink)" stroke-width="1"/>
<circle cx="30" cy="30" r="13" fill="none" stroke="var(--il-ink)" stroke-width="0.75"/>
<circle cx="30" cy="30" r="6" fill="none" stroke="var(--il-ink)" stroke-width="1"/>
<circle cx="30" cy="30" r="2" fill="var(--il-ink)"/>
<!-- Líneas radiales — atención -->
<line x1="30" y1="10" x2="30" y2="4" stroke="var(--il-ink)" stroke-width="0.75"/>
<line x1="44" y1="16" x2="49" y2="11" stroke="var(--il-ink)" stroke-width="0.75"/>
<line x1="50" y1="30" x2="56" y2="30" stroke="var(--il-ink)" stroke-width="0.75"/>
<line x1="44" y1="44" x2="49" y2="49" stroke="var(--il-ink)" stroke-width="0.75"/>
<line x1="30" y1="50" x2="30" y2="56" stroke="var(--il-ink)" stroke-width="0.75"/>
<!-- Rayo activo en rojo -->
<line x1="10" y1="16" x2="3" y2="10" stroke="var(--il-accent-2)" stroke-width="1.5"/>
```

---

## IL-04 — Mapa BCN-MAD

**Propósito:** Decorativa sutil en el footer.

```
viewBox="0 0 320 120"
Tamaño máximo: 320px de ancho
Opacidad: 0.15 sobre fondo Klein deep
Solo líneas — fill: none en todo
Paleta: solo --il-ink, sin acentos
```

**Descripción visual:**
Mapa esquemático abstracto — NO realista, NO reconocible literalmente.
Sugiere dos ciudades conectadas mediante:
- Retícula irregular de líneas finas (calles esquemáticas)
- Dos nodos principales: círculos a la izquierda (BCN) y derecha (MAD)
- Línea de conexión entre ellos (ferrocarril o fibra óptica)
- Algunos puntos dispersos alrededor de los nodos (barrios, satélites)

```svg
<svg viewBox="0 0 320 120" class="il il-footer" aria-hidden="true">
  <!-- Retícula izquierda (BCN) -->
  <line x1="20" y1="40" x2="80" y2="40" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="20" y1="60" x2="90" y2="60" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="20" y1="80" x2="75" y2="80" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="35" y1="30" x2="35" y2="90" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="55" y1="35" x2="55" y2="85" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="75" y1="40" x2="75" y2="80" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <!-- Nodo BCN -->
  <circle cx="55" cy="60" r="8" fill="none" stroke="var(--il-ink)" stroke-width="1"/>
  <circle cx="55" cy="60" r="2" fill="var(--il-ink)"/>
  <!-- Línea de conexión -->
  <line x1="63" y1="60" x2="257" y2="60" stroke="var(--il-ink)" stroke-width="0.75" stroke-dasharray="4 3"/>
  <!-- Retícula derecha (MAD) -->
  <line x1="240" y1="40" x2="300" y2="40" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="235" y1="60" x2="300" y2="60" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="240" y1="80" x2="295" y2="80" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="250" y1="35" x2="250" y2="85" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="270" y1="35" x2="270" y2="85" stroke="var(--il-ink)" stroke-width="0.5" stroke-opacity="0.4"/>
  <!-- Nodo MAD -->
  <circle cx="265" cy="60" r="8" fill="none" stroke="var(--il-ink)" stroke-width="1"/>
  <circle cx="265" cy="60" r="2" fill="var(--il-ink)"/>
</svg>
```

---

## CSS de posicionamiento de las 4 ilustraciones

```css
/* ── Ilustraciones ── */
.il { overflow: visible; }

.il-hero {
  position: absolute;
  right: 0; top: 0;
  width: 42%;
  opacity: 0;
  animation: il-appear 0.8s ease-out 0.4s forwards;
}

.il-lampist {
  width: 160px;
  float: right;
  margin: 0 0 var(--space-md) var(--space-lg);
  animation: float 6s ease-in-out infinite;
}

.il-pub-icon {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.il-footer {
  display: block;
  margin: var(--space-lg) auto 0;
  opacity: 0.15;
  max-width: 320px;
}

/* Animaciones */
@keyframes il-appear { to { opacity: 1; } }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

/* Mobile */
@media (max-width: 768px) {
  .il-hero    { display: none; }
  .il-lampist { width: 100px; float: none; margin: 0 auto var(--space-md); display: block; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .il, .il * { animation: none !important; }
}
```
