---
name: entrelampistas-design-system
description: >
  Sistema de identidad visual completo de Entrelampistas. Usar SIEMPRE antes de
  cualquier cambio visual, creación de componentes, ilustraciones, templates de
  redes sociales, OG images, newsletter, o cualquier entregable visual del proyecto.
  Contiene: símbolo y sistema de logo, paleta completa con tokens CSS, tipografía
  y type scale, sistema de ilustración, principios de diseño editorial, componentes
  UI, reglas absolutas y referencias visuales. Este skill es la constitución visual
  del proyecto — ningún output visual puede existir sin haberlo leído.
---

# Entrelampistas — Design System v4

Este documento es la fuente de verdad visual del proyecto. Antes de escribir
una sola línea de CSS, generar un SVG o diseñar cualquier plantilla, leer
completo. Las reglas aquí no son sugerencias — son invariantes.

Para especificaciones extendidas, consultar los archivos en `references/`:
- `references/ilustracion.md` — sistema de ilustración completo, especificaciones SVG
- `references/componentes.md` — HTML/CSS de cada componente con ejemplos
- `references/aplicaciones.md` — templates Instagram, OG images, newsletter

---

## Identidad y posicionamiento visual

Entrelampistas es una publicación editorial independiente sobre pensamiento
estructural y vida contemporánea. Su registro visual no es ni tech ni cultural
genérico — es **editorial técnico con calor humano**.

### Referencias que informan el lenguaje visual

**Linear (linear.app)** — precisión, jerarquía sin ruido, cada elemento gana
su espacio o desaparece. Densidad informativa sin abigarramiento. El espacio
en blanco como decisión activa, no como relleno. Tipografía funcional con
carácter. Microinteracciones que aportan, no que decoran.

**Monocle** — autoridad editorial sin arrogancia. Grid rígido que libera el
contenido. Serif + sans como tensión productiva (nosotros: un solo family con
pesos como tensión). Sistema que se extiende coherentemente de print a digital
a físico. Cada touchpoint refuerza el mismo mundo.

**The New Yorker** — el espacio blanco como lujo intelectual. Tipografía que
es institución. Ilustración de línea con humor y precisión como firma visual
inconfundible. Jerarquía que guía sin empujar. La página como experiencia de
lectura, no de consumo.

**Are.na** — minimalismo que confía en el contenido. Interfaz que se retira.
Colecciones como pensamiento visible. Estructura sin ornamento.

**Chris Ware / The New Atlantis** — sistemas dentro de sistemas visibles.
Sección transversal como metáfora. La infraestructura como protagonista visual.
Planos técnicos habitados por vida humana.

### La síntesis visual de Entrelampistas

No es ninguna de estas referencias — toma de cada una:
- De Linear: precisión, jerarquía, densidad controlada
- De Monocle: autoridad editorial, sistema cross-canal coherente
- De The New Yorker: espacio blanco como decisión, tipografía como identidad
- De Are.na: confianza en el contenido, interfaz que se retira
- De Chris Ware: la infraestructura visible, el plano técnico habitado

El resultado: **serenidad estructural con tensión técnica**.
Limpio pero no frío. Preciso pero no estéril. Editorial pero no académico.

---

## El símbolo — La L del Lampista

### Anatomía

El símbolo tiene tres elementos que trabajan juntos:

```
1. La L — estructura principal en Klein deep
   Proporciones: vertical × 1u alto, horizontal × 1u ancho
   Grosor: 28% de la unidad base
   Radio de esquina: rx=2–3 (pequeño, técnico, no orgánico)

2. El Nodo rojo — en la esquina interior de la L
   Radio: 11% de la unidad base
   Color: siempre rojo (#C0321A)
   Relleno interior: el color del fondo actual
   El nodo es el punto de conexión — donde el pensamiento se activa

3. El circuito — línea diagonal desde el nodo hacia arriba-derecha
   Termina en un pequeño círculo abierto (terminal de circuito)
   Punto de tensión a mitad del trayecto
   Solo presente a ≥ 24px — desaparece en reducción
```

### Regla de reducción (crítica)

| Tamaño  | Elementos presentes                        |
|---------|--------------------------------------------|
| ≥ 64px  | L + nodo + circuito completo + tapas       |
| 40–63px | L + nodo + circuito (sin tapas)            |
| 24–39px | L + nodo (sin circuito)                    |
| 16–23px | L + punto rojo mínimo                      |
| < 16px  | NUNCA usar el símbolo a esta escala        |

### Variantes de color

```css
/* Principal — sobre Klein deep */
L-structure:   #F5F0E8  (paper)
nodo-stroke:   #C0321A  (rojo)
nodo-fill:     #1A3499  (klein, = fondo)
circuito:      #C0321A  (rojo)

/* Sobre paper o blanco */
L-structure:   #1A3499  (klein deep)
nodo-stroke:   #C0321A  (rojo)
nodo-fill:     fondo actual
circuito:      #C0321A  (rojo)

/* Dark mode */
L-structure:   #F5F0E8  (paper)
nodo-stroke:   #C0321A  (rojo)
nodo-fill:     #111111  (fondo)
circuito:      #C0321A  (rojo)

/* Monocromo (impresión, bordado, grabado) */
L-structure:   #1A1A1A
nodo-stroke:   #1A1A1A
circuito:      #1A1A1A
(el rojo desaparece, el símbolo sigue funcionando)

/* Sobre rojo — uso muy especial */
L-structure:   #F5F0E8
nodo-stroke:   #F5F0E8
circuito:      #F5F0E8
```

### Wordmark combinado

```
Símbolo (36px) + 14px gap + ENTRELAMPISTAS (15px, weight 500, tracking 0.12em)
Subtítulo opcional: Pensamiento estructural (9px, tracking 0.18em, opacity 0.55)

Versión vertical: símbolo centrado encima del texto
Separador entre nombre y subtítulo: línea roja 24px wide, 2px tall

NUNCA: solo wordmark de texto sin el símbolo en comunicaciones externas
SIEMPRE: el símbolo aparece junto al nombre en cualquier punto de contacto
```

### Usos incorrectos — NUNCA hacer

- Rotar el símbolo
- Cambiar las proporciones de la L
- Usar el nodo en otro color que no sea rojo (salvo monocromo)
- Usar sobre fondos que no tengan suficiente contraste
- Añadir sombras, brillos o efectos al símbolo
- Separar el nodo o el circuito de la L
- Usar tipografía serif con el símbolo

---

## Paleta de color

### Nota sobre el azul Klein

El Klein deep (#1A3499) es el color identitario principal. Es intenso por diseño —
es Yves Klein, es una declaración. Sin embargo, como fondo dominante en pantalla
puede resultar pesado. **La regla de uso**: Klein deep es para elementos
estructurales (header, footer, fondo de símbolo, botones primarios, fragmentos
hero). El fondo de lectura y contenido es siempre **paper** (#F5F0E8).
El contraste Klein/paper es la tensión visual central del sistema.

Cuando necesites un azul menos dominante, usa Klein vibrant (#2B4EFF) solo
para acentos interactivos, nunca como fondo de bloques grandes.

### Paleta completa

```css
/* ── KLEIN ── */
--klein-night:    hsl(228, 67%, 21%);   /* #0D1F5C — hover profundo, sombras */
--klein-deep:     hsl(228, 70%, 35%);   /* #1A3499 — identitario principal ★ */
--klein-vibrant:  hsl(228, 100%, 59%);  /* #2B4EFF — acentos interactivos */
--klein-mid:      hsl(228, 100%, 68%);  /* #5B79FF — estados hover en links */
--klein-light:    hsl(228, 100%, 83%);  /* #A8B8FF — tints, backgrounds info */
--klein-tint:     hsl(228, 100%, 95%);  /* #E4E9FF — fondos muy sutiles */

/* ── ROJO ── */
--rojo-dark:      hsl(11, 80%, 27%);    /* #7A1A0A — hover del rojo */
--rojo:           hsl(11, 75%, 42%);    /* #C0321A — acento editorial ★ */
--rojo-vibrant:   hsl(11, 74%, 51%);    /* #E04422 — variante más viva */
--rojo-mid:       hsl(11, 82%, 64%);    /* #F07058 — tint medio */
--rojo-light:     hsl(11, 82%, 84%);    /* #F9C4B8 — tint claro */
--rojo-paper:     hsl(11, 80%, 96%);    /* #FEF0EC — fondo de highlight */

/* ── NEUTROS DE PAPEL ── */
--paper-light:    hsl(40, 50%, 98%);    /* #FDFBF7 — casi blanco, limpio */
--paper:          hsl(40, 25%, 96%);    /* #F5F0E8 — papel principal ★ */
--paper-warm:     hsl(38, 30%, 93%);    /* #EDE6D6 — definition blocks */
--border:         hsl(0, 0%, 80%);      /* #CCCCCC — separadores */
--ink-light:      hsl(0, 0%, 53%);      /* #888888 — meta, fechas */
--ink-mid:        hsl(0, 0%, 33%);      /* #555555 — texto secundario */
--ink:            hsl(0, 0%, 10%);      /* #1A1A1A — texto principal ★ */
--ink-dark:       hsl(0, 0%, 23%);      /* #3A3A3A — ink dark */

/* ── PALETA DE ILUSTRACIÓN ── solo para SVGs editoriales */
--il-paper:       #F5F0E8;
--il-ink:         #1A1A18;
--il-accent-1:    #2B4EFF;   /* azul — cables, datos, conexiones */
--il-accent-2:    #C0321A;   /* rojo — foco, tensión, energía */
--il-accent-3:    #F2C94C;   /* ámbar — detalle cálido, luz */
--il-mid:         #8C8C87;   /* gris — sombras, secundarios */
--il-light:       #D4CFC4;   /* gris claro — fondos internos */
```

### Combinaciones aprobadas

```
Klein deep   + Paper      → principal, máximo contraste
Paper        + Klein deep → editorial, lectura
Paper        + Ink        → lectura larga, ensayos
Ink          + Paper      → dark mode editorial
Rojo         + Paper      → acento, highlight
Paper warm   + Rojo (left border) → definition blocks, citas
Klein deep   + Rojo (accento)     → UI activo, hover states
```

### Ratio de uso (por superficie visible en pantalla)

```
Paper / neutros:  ~65% — el fondo es siempre papel
Klein deep:       ~20% — header, footer, CTAs, fragmentos
Rojo:              ~8% — acentos, hover, nodo del símbolo, left-bars
Tinta / texto:     ~7% — todo el cuerpo textual
```

---

## Tipografía

### La familia única: Neo Grotesque SC

Un solo family. Sin excepciones. Sin serif. Sin italic.
La tensión tipográfica viene de los pesos, el tracking y el tamaño — no de
mezclar familias.

**Por qué Neo Grotesque SC y no otro sans:**
No es Inter (demasiado tech, genérico). No es Helvetica (demasiado corporativo).
Neo Grotesque SC tiene las small caps nativas en el weight 400 — eso le da un
carácter editorial singular que ningún otro sans tiene. Es técnico pero humano.

```
weight 300 — Light     → cuerpo de texto, intro, prosa de secciones
weight 400 SC — Regular → labels, nav, meta, article titles (small caps)
weight 700 — Bold      → statements, CTAs, cierre, headlines muy grandes
```

**REGLAS ABSOLUTAS:**
- `font-style: italic` → NUNCA. En ningún elemento. Sin excepciones.
- Tipografía serif → NUNCA. Ni para citas, ni para pull quotes.
- Otros sans → NUNCA en producción (solo en maquetas de prueba)

### Type scale completo

```css
/* Display — hero headlines */
--type-display: 2.5rem;      /* 40px, weight 700, tracking -0.01em */

/* H1 — título de ensayo/página */
--type-h1:      1.75rem;     /* 28px, weight 700, tracking 0 */

/* H2 — subtítulo de sección */
--type-h2:      1.25rem;     /* 20px, weight 400, tracking 0 */

/* H3 — encabezado de bloque */
--type-h3:      1.1rem;      /* 17.6px, weight 400 SC, tracking 0.04em */

/* Body — prosa de ensayo */
--type-body:    1rem;        /* 16px, weight 300, line-height 1.75 */

/* Lead — intro / deck */
--type-lead:    1.125rem;    /* 18px, weight 300, line-height 1.65 */

/* Label — section tags, nav */
--type-label:   0.7rem;      /* 11.2px, weight 400 SC, tracking 0.12em, UPPERCASE */

/* Meta — fechas, tiempo de lectura */
--type-meta:    0.8rem;      /* 12.8px, weight 400, tracking 0.02em */

/* Statement — cierre, claims fuertes */
--type-statement: 1.1rem;   /* 17.6px, weight 700 */

/* Caption — pies de ilustración */
--type-caption: 0.75rem;    /* 12px, weight 400, tracking 0.04em */
```

### Jerarquía cromática del texto

```
Titulares principales:  var(--ink)       #1A1A1A — máxima presencia
Sobre fondo Klein:      var(--paper)     #F5F0E8 — siempre
Texto secundario:       var(--ink-mid)   #555555 — descripción, lead
Meta / fechas:          var(--ink-light) #888888 — mínima presencia
Section labels:         var(--klein-vibrant) #2B4EFF — color de territorio
Acento editorial:       var(--rojo)      #C0321A — left-bars, nodos
```

---

## Layout y grid

### Principio base

```css
body {
  background: var(--klein-deep);  /* el sliver de azul en los lados */
}

main {
  display: grid;
  grid-template-columns: 1fr min(48rem, 100%) 1fr;
  background: var(--paper);
  margin: 0 var(--space-xs);
  border-radius: 0 0 0.5rem 0.5rem;
}

main > * {
  grid-column: 2;
  padding: 0 var(--space-md);
}
```

El sliver de Klein en los bordes laterales es una firma visual del proyecto —
no un error. Crea la sensación de que el contenido "flota" sobre el color
identitario sin ahogarse en él.

### Tokens de espaciado (escala 8px)

```css
--space-xs:  0.25rem;   /*  4px */
--space-sm:  0.5rem;    /*  8px */
--space-md:  1rem;      /* 16px */
--space-lg:  2rem;      /* 32px */
--space-xl:  4rem;      /* 64px */
--space-2xl: 8rem;      /* 128px */

--content-width: 48rem;  /* 768px — ancho máximo de columna de texto */
--radius-sm: 0.25rem;    /*  4px */
--radius-md: 0.5rem;     /*  8px */
```

### Principios de layout inspirados en las referencias

**Del New Yorker:** el espacio en blanco es generoso alrededor del texto. No
rellenar. Los márgenes grandes son un lujo que comunica calidad editorial.

**De Monocle:** grid rígido que da libertad dentro de él. Las excepciones al
grid (elementos que "rompen" la caja) están planificadas, no son accidentes.

**De Linear:** densidad informativa solo donde importa. El resto: air. No
todos los elementos compiten por atención — hay una jerarquía clara de qué
manda en cada momento.

**De Are.na:** la interfaz se retira. Si el diseño llama más atención que el
contenido, hay algo mal.

---

## Componentes UI

### Reglas de animación y transición

```css
/* Tokens de timing */
--duration-fast:   120ms;
--duration-base:   200ms;
--duration-slow:   400ms;
--ease-out:        cubic-bezier(0.0, 0, 0.2, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);

/* NUNCA animar: width, height, margin, padding, top, left */
/* SIEMPRE: transform, opacity, color, background-color, border-color */
/* Hover states: SIEMPRE con transition */
/* Botones: :active siempre tiene transform: scale(0.98) */
/* Cards: hover lift máximo translateY(-2px) */
/* Links: underline cambia de COLOR en hover, NUNCA desaparece */
```

### Componentes base

**Definition block** — para términos y conceptos clave
```css
.definition-block {
  background: var(--paper-warm);
  border-left: 3px solid var(--rojo);
  padding: var(--space-md) var(--space-lg);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
```

**Highlight block** — cita o insight destacado
```css
.highlight-block {
  background: var(--rojo-paper);
  border-left: 3px solid var(--rojo);
  padding: var(--space-md) var(--space-lg);
}
```

**Section label** — categoría / territorio
```css
.section-label {
  font-size: var(--type-label);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--klein-vibrant);
}
```

**Article hover pattern** — microinteracción de artículo
```css
.article-item {
  position: relative;
  padding-left: var(--space-md);
  transition: padding-left var(--duration-base) var(--ease-out);
}
.article-item::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--border);
  transition:
    width     var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out);
}
.article-item:hover::before {
  width: 5px;
  background: var(--rojo);
}
.article-item:hover .article-title {
  transform: translateX(0.35rem);
  color: var(--klein-deep);
}
```

**Newsletter form**
```css
.newsletter-form input {
  background: white;
  border: 1px solid var(--border);
  padding: var(--space-sm) var(--space-md);
  font-family: inherit;
  font-size: var(--type-body);
}
.newsletter-form button {
  background: var(--klein-deep);
  color: var(--paper);
  padding: var(--space-sm) var(--space-md);
  transition: background var(--duration-fast) var(--ease-out);
}
.newsletter-form button:hover {
  background: var(--klein-night);
}
```

---

## Sistema de ilustración

Las ilustraciones son la firma visual más singular de Entrelampistas.
No son decorativas — son argumentativas. Cada ilustración hace un argumento
visual sobre los sistemas que habita el proyecto.

### Concepto central

**Los sistemas invisibles que habitan los espacios cotidianos.**
Inspirado en Chris Ware (isometría, sección transversal, sistemas dentro de
sistemas) y The New Atlantis (infraestructura como protagonista).
Las ilustraciones parecen planos técnicos habitados por vida.

### Estilo técnico

```
Línea uniforme: stroke-width="1" o "1.5" (nunca variable sin intención)
Esquinas: rx="0" arquitectónico / rx="2" humano/orgánico
Sin degradados — solo colores planos
Sombras con formas geométricas semitransparentes (fill-opacity="0.12")
Crosshatching para texturas (líneas 45°, stroke-opacity="0.3")
Perspectiva isométrica: ángulo fijo 30°
stroke-linecap="round" stroke-linejoin="round" — siempre
```

### Paleta de ilustración (solo estos 7 valores)

```
--il-paper:   #F5F0E8  → 70% — fondos, masa
--il-ink:     #1A1A18  → 15% — líneas, estructura
--il-accent-1:#2B4EFF  → 8%  → cables, datos, redes
--il-accent-2:#C0321A  → 5%  → foco, tensión, punto activo
--il-accent-3:#F2C94C  → 2%  → luz, detalle cálido (uso muy esparso)
--il-mid:     #8C8C87  → sombras, planos secundarios
--il-light:   #D4CFC4  → fondos internos de espacios
```

**Regla de los tres acentos:** nunca los tres juntos en la misma ilustración.

### Las 4 ilustraciones del sistema (del brief)

**IL-01 Hero — "La Ciudad que Piensa"**
Vista isométrica en corte de un bloque urbano: biblioteca, café, metro,
red de datos conectando edificios. Todo conectado por líneas visibles.
`viewBox="0 0 480 640"` — fondo Klein, líneas paper, cables en accent-1

**IL-02 El Lampista** — figura flotante para sección Sobre
Lampista con herramienta, perspectiva casi frontal. Silueta de rectángulos
y círculos. Líneas irradiantes de conexión alrededor.
`viewBox="0 0 200 280"` — transparente, animation: float 6s

**IL-03 Icons** — 3 variantes para cards de publicaciones (60×60 cada una)
- IL-03a Cognición: cerebro como plano arquitectónico con habitaciones
- IL-03b Tecnología: monitor en corte isométrico con circuitos
- IL-03c Atención: ojo construido con círculos concéntricos y radios

**IL-04 Footer — Mapa BCN-MAD**
Mapa esquemático abstracto. Retícula de calles, dos nodos, línea de conexión.
`viewBox="0 0 320 120"` — solo ink, stroke-opacity: 0.4, opacity: 0.15

### Comportamiento en mobile

```css
.il-hero    { display: none; }   /* Hero no en mobile */
.il-lampist { width: 100px; }    /* Lampista más pequeño */
.il-footer  { opacity: 0.1; }    /* Footer más sutil */
```

### Animaciones de ilustración

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
@keyframes il-appear { to { opacity: 1; } }

.il-lampist { animation: float 6s ease-in-out infinite; }
.il-hero    { opacity: 0; animation: il-appear 0.8s ease-out 0.4s forwards; }

/* Cables animados — draw-line */
.network-line {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw-line 1.2s ease-out forwards;
  animation-delay: calc(var(--line-index) * 0.15s);
}
@keyframes draw-line { to { stroke-dashoffset: 0; } }

/* Respeto por reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .il, .il * { animation: none !important; transition: none !important; }
}
```

---

## Accesibilidad — obligatorio en todo output

```css
/* Focus visible en todos los interactivos */
:focus-visible {
  outline: 2px solid var(--klein-vibrant);
  outline-offset: 2px;
}

/* HTML semántico obligatorio */
/* <article>, <nav>, <main>, <section aria-label="">, <header>, <footer> */
/* Alt text en todas las imágenes */
/* Contraste mínimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande */

/* Verificación de contraste de los pares principales: */
/* Klein deep / Paper: ~8.5:1 ✓ */
/* Rojo / Paper: ~4.8:1 ✓ (verificar en producción) */
/* Ink / Paper: ~17:1 ✓ */
```

---

## Checklist antes de entregar cualquier output visual

```
□ ¿Usa solo la paleta definida? (no hex sueltos, solo variables CSS)
□ ¿Tipografía solo Neo Grotesque SC? ¿Sin italic? ¿Sin serif?
□ ¿Transiciones usan variables --duration-* y --ease-*?
□ ¿Hover states tienen transición suave?
□ ¿El símbolo aparece correctamente a la escala usada?
□ ¿El espacio en blanco es generoso? (Linear / New Yorker)
□ ¿La jerarquía es clara sin necesidad de leer? (Monocle)
□ ¿La interfaz se retira del contenido? (Are.na)
□ ¿Las ilustraciones usan solo los 7 tokens de il-*?
□ ¿Hay prefers-reduced-motion en las animaciones?
□ ¿HTML es semántico con roles de accesibilidad?
□ ¿El sliver de Klein en los lados es visible en desktop?
```

---

## Referencias adicionales

- `references/ilustracion.md` → especificaciones SVG completas por ilustración
- `references/componentes.md` → HTML/CSS de componentes con ejemplos live
- `references/aplicaciones.md` → templates Instagram, OG, newsletter
