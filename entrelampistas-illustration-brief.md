# BRIEF PARA CLAUDE CODE — Entrelampistas
## Ilustraciones SVG + Animaciones CSS para landing page

---

## CONTEXTO DEL PROYECTO

**Entrelampistas** es una publicación editorial independiente en español sobre pensamiento estructural, filosofía de lo cotidiano, psicología cognitiva y relación con la tecnología. El lenguaje es preciso, cuidado y sin grandilocuencia. El sitio existe en HTML/CSS puro (sin frameworks).

**Concepto ilustrativo central:** *Los sistemas invisibles que habitan los espacios cotidianos.* Inspirado en Chris Ware (isometría, sección transversal, sistemas dentro de sistemas), The New Yorker y The New Atlantis. Ilustraciones que parecen planos técnicos habitados.

---

## PALETA Y TOKENS VISUALES

Entrelampistas utiliza una paleta editorial contenida. Las ilustraciones deben respetar y ampliar estas variables:

```css
/* Paleta de ilustración — usar exclusivamente estas */
--il-paper:     #F5F0E8;   /* fondo cálido, como papel offset */
--il-ink:       #1A1A18;   /* línea principal, casi negro */
--il-accent-1:  #2B4EFF;   /* azul eléctrico — acento fuerte */
--il-accent-2:  #E8341A;   /* rojo ladrillo — acento secundario */
--il-accent-3:  #F2C94C;   /* ámbar — detalle cálido */
--il-mid:       #8C8C87;   /* gris medio — sombras, secundarios */
--il-light:     #D4CFC4;   /* gris claro — fondos internos */
```

**Ratio de uso:** 70% papel/ink (blanco y negro), 20% accent-1 (azul), 10% accent-2 o accent-3. Nunca los tres acentos juntos en una misma pieza.

---

## ESTILO TÉCNICO DE ILUSTRACIÓN

### Línea y forma
- **Stroke uniforme:** `stroke-width="1"` o `stroke-width="1.5"` para líneas secundarias. NUNCA variable dentro de una misma ilustración sin intención clara.
- **Esquinas:** Mezcla deliberada — `rx="0"` para elementos arquitectónicos, `rx="2"` para elementos humanos o orgánicos.
- **Sin rellenos degradados.** Únicamente colores planos (`fill` sólido). Las sombras se hacen con formas geométricas semitransparentes (`fill-opacity="0.12"`).
- **Crosshatching como textura:** Para sombras profundas, usar líneas paralelas a 45° con `stroke-opacity="0.3"`, no sombras difusas.

### Perspectiva isométrica (estilo Chris Ware)
- Ángulo fijo: **30° isométrico** — todos los planos horizontales proyectan a ±30° del eje horizontal.
- Los edificios, muebles y objetos se representan como **secciones transversales o cortes en planta**.
- Las personas (si aparecen) son **siluetas esquemáticas**, nunca realistas — trazo simple, proporciones ligeramente exageradas.
- Los espacios revelan su **estructura interna**: paredes como líneas dobles con grosor, tuberías, cables, estanterías con libros como rectángulos de colores.

### Escala y densidad
- Cada ilustración debe poder leerse a **3 niveles de zoom**:
  1. Vista global: composición y silueta reconocible
  2. Vista media: sistemas y relaciones visibles
  3. Vista cercana: detalles y micro-narrativas

---

## ILUSTRACIONES REQUERIDAS — ESPECIFICACIONES

### IL-01: Hero Background — "La Ciudad que Piensa"
**Posición en HTML:** Fondo decorativo de `<section class="hero">`, alineado a la derecha, 40% del ancho, altura completa.

**Descripción:** Vista isométrica en corte de un bloque urbano contemporáneo. Se ven: una biblioteca con estanterías visibles a través de ventanas, un café con personas trabajando, una red de metro subterránea, líneas eléctricas y de datos conectando edificios. Todo conectado por líneas visibles — la infraestructura invisible hecha visible.

**Especificaciones SVG:**
```
viewBox="0 0 480 640"
Paleta: --il-paper, --il-ink, --il-accent-1 (cables/red)
Estilo: isométrico a 30°, corte transversal, stroke-width=1
Personas: máximo 5, siluetas esquemáticas
```

**Comportamiento:** Estática. Sin animación en mobile. En desktop: aparición con `opacity: 0 → 1` en 800ms con `animation-delay: 400ms` sincronizada con `.page-enter`.

---

### IL-02: Sección "Qué Es" — "El Lampista"
**Posición:** Decorativa, flotante a la derecha del bloque de texto `.que-es`.

**Descripción:** Una sola figura de lampista en perspectiva casi frontal, ligeramente isométrica. Sostiene una herramienta. Su silueta es sencilla — construida con rectángulos y círculos, como un pictograma de señalética pero con carácter. Alrededor, pequeñas líneas irradiantes sugieren el trabajo: cables, conexiones, un símbolo de bombilla integrado en el trazo sin ser literal.

**Especificaciones SVG:**
```
viewBox="0 0 200 280"
Paleta: --il-ink, --il-accent-1, --il-accent-3
Sin fondo. Transparente.
stroke-width: 1.5 figura principal, 0.75 detalles
```

**Comportamiento:** `transform: translateY(0px)` con `animation: float 6s ease-in-out infinite` — flotación suave de ±6px vertical.

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
```

---

### IL-03: Cards de Publicaciones — Iconos de Sección
**Posición:** Reemplaza los SVG inline actuales en `.pub-card-icon` — pero ahora son ilustraciones completas de `60×60`.

Tres variantes:

**IL-03a — Psicología cognitiva:** Un cerebro esquemático visto desde arriba como plano arquitectónico. Sus "habitaciones" son zonas etiquetadas con líneas y puntos.

**IL-03b — Tecnología y entorno:** Una pantalla de monitor en corte isométrico mostrando su interior — cables, circuitos como calles urbanas.

**IL-03c — Atención y método:** Un ojo construido con círculos concéntricos y líneas radiales. Como un diagrama de precisión óptica.

```
viewBox="0 0 60 60" para todos
stroke-width: 1 (uniforme)
Paleta: --il-ink + un solo acento por pieza
```

---

### IL-04: Footer — "Mapa de Madrid y Barcelona"
**Posición:** Decorativa sutil en footer, centrada, ancho máximo 320px, opacidad 0.15.

**Descripción:** Mapa esquemático abstracto — no realista — que sugiere dos ciudades conectadas. Retícula de calles como líneas finas, dos nodos principales marcados con círculos, línea de conexión entre ellos como ferrocarril o cable.

```
viewBox="0 0 320 120"
stroke-opacity: 0.4
fill: none (solo líneas)
Paleta: solo --il-ink
```

---

## ANIMACIONES CSS REQUERIDAS

### ANIM-01: "Sistema Conectado" — Hero
Para la IL-01 en desktop, añadir sobre el SVG hero una capa de animación:

```css
/* Los cables/líneas de la ilustración se "dibujan" al cargar */
.hero-illustration path.network-line {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw-line 1.2s ease-out forwards;
  animation-delay: calc(var(--line-index) * 0.15s);
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}
```

Cada línea de red (cable, metro, conexión) debe tener `data-line-index="0"`, `"1"`, `"2"`... para escalonar.

### ANIM-02: Hover en Explore Cards
Cuando se expande una `.explore-card`, la ilustración correspondiente (si existe) hace:

```css
.explore-card.is-open .card-illustration {
  transform: scale(1.04) rotate(-1deg);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### ANIM-03: Stack de Cards — Transición con Ilustración
Al hacer swipe/drag en `.pub-cards`, la ilustración de la card activa:

```css
.pub-card[data-stack="0"] .pub-card-icon {
  transition: transform 0.3s ease;
}
.pub-card.is-dragging .pub-card-icon {
  transform: rotate(calc(var(--drag-deg, 0) * 0.5deg));
}
```

(Requires setting `--drag-deg` via JS inline style during drag.)

---

## INSTRUCCIONES DE IMPLEMENTACIÓN PARA CLAUDE CODE

### Paso 1 — Generar ilustraciones como SVG inline
Cada ilustración se entrega como **SVG inline** dentro del HTML (no como archivo externo), para:
- Control total de CSS y animaciones
- Sin peticiones HTTP adicionales
- Acceso a variables CSS del sitio

Estructura de cada SVG:
```html
<svg class="il il-[nombre]" viewBox="..." xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="[descripción accesible]">
  <title>[título accesible]</title>
  <!-- grupos lógicos con clases semánticas -->
  <g class="il-buildings"> ... </g>
  <g class="il-network-lines"> ... </g>
  <g class="il-figures"> ... </g>
</svg>
```

### Paso 2 — Añadir al CSS (en components.css o main.css)
```css
/* ── Ilustraciones ── */
.il { overflow: visible; }
.il-hero    { position: absolute; right: 0; top: 0; width: 42%; opacity: 0;
              animation: il-appear 0.8s ease-out 0.4s forwards; }
.il-lampist { width: 160px; float: right; margin: 0 0 1rem 2rem;
              animation: float 6s ease-in-out infinite; }
.il-footer  { display: block; margin: 2rem auto 0; opacity: 0.15; }

@keyframes il-appear { to { opacity: 1; } }
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-6px); }
}

/* Mobile: sin ilustración hero, lampista más pequeño */
@media (max-width: 768px) {
  .il-hero    { display: none; }
  .il-lampist { width: 100px; }
}
```

### Paso 3 — Integrar en HTML
- IL-01: Dentro de `<section class="hero">`, antes del `<h1>`, envuelto en `<div class="hero-illustration-wrap" aria-hidden="true">`
- IL-02: Dentro de `<section class="que-es">`, antes del `<a>` CTA
- IL-03a/b/c: Reemplazar el contenido de cada `.pub-card-icon`
- IL-04: Dentro de `<footer class="site-footer">`, al final, antes del último `<p>`

---

## CRITERIOS DE CALIDAD

Antes de entregar, verificar:

- [ ] **Coherencia de línea:** Todos los SVG usan `stroke-linecap="round"` y `stroke-linejoin="round"` consistentemente
- [ ] **Sin texto en SVG** (excepto si es parte deliberada del diseño, como etiquetas de mapa)
- [ ] **Paleta respetada:** Solo los 7 tokens definidos arriba
- [ ] **Legibilidad a escala:** Cada ilustración funciona a 50%, 100% y 200%
- [ ] **Performance:** Ningún SVG supera 8KB minificado
- [ ] **Accesibilidad:** `role="img"`, `aria-label`, `<title>` en cada SVG
- [ ] **Sin animaciones en `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  .il, .il * { animation: none !important; transition: none !important; }
}
```

---

## REFERENCIA DE ESTILO — VOCABULARIO FORMAL

Para que Claude Code entienda el registro visual sin ver las referencias:

**Chris Ware en SVG significa:**
- Edificios como rectángulos dobles (pared exterior + interior)
- Plantas de piso visibles a través de techos "quitados"
- Personas como `<circle>` (cabeza) + `<rect>` (cuerpo), sin detalles faciales
- Mobiliario como formas geométricas básicas con proporciones deliberadamente incorrectas
- Texto (si aparece) en `font-family: monospace`, `font-size: 5px`, como etiquetas técnicas

**The New Yorker en SVG significa:**
- Escenas de vida urbana con densidad humana
- Humor sutil en los detalles
- Calidad de línea consistente — ni rough ni demasiado pulida

**The New Atlantis en SVG significa:**
- Sistemas y mecanismos visibles
- La infraestructura como protagonista, no el individuo
- Color funcional, no decorativo

---

*Brief preparado para Claude Code — Entrelampistas 2026*
