# Entrelampistas — Design System v3.0
## Sistema visual, editorial y de componentes
### Actualizado: 18 marzo 2026

> Este documento es la fuente de verdad del proyecto.
> Leerlo completo al inicio de cualquier sesión de Claude Code.
> Si algo no está aquí, preguntar antes de inventar.

---

## 00 — La filosofía que lo gobierna todo

Entrelampistas no es un blog ni una revista digital. Es una **publicación editorial independiente** que construye infraestructura mental. Esa distinción no es de marketing — es operativa.

Significa: cada decisión de diseño, cada componente, cada ilustración responde a una sola pregunta: **¿esto ayuda a Clara a pensar con más claridad, o le distrae de hacerlo?**

El diseño de Entrelampistas no compite por atención. La cuida.

**La síntesis en una frase:** Serenidad estructural con tensión técnica.

**Las referencias activas:**
- **A4Kids / die neue linie (1931)** — fotografía de archivo + intervención geométrica mínima = autenticidad editorial. Tensión entre la imperfección de la foto y la precisión de la geometría.
- **The Syllabus** — márgenes generosos, confianza en el texto, la interfaz se retira.
- **Future London Academy** — grid Bauhaus, gap de 3px como firma visual, tipografía como estructura.
- **Gaîté Lyrique** — secciones monocromáticas de alto contraste. Fondo sólido de color como declaración, no como decoración.
- **The New Yorker** — espacio blanco como lujo. Ilustración de línea como firma institucional.
- **Linear** — precisión, jerarquía sin ruido, espacio como decisión activa.

**Lo que nunca somos:**
- Blog de bienestar o crecimiento personal
- Magazine de tendencias
- Newsletter de productividad
- Nada que parezca salido de un template de Webflow o Squarespace

---

## 01 — Identidad y símbolo

### El símbolo — La L del Lampista

**Variante B** (elegida y definitiva). Dos elementos exactos, sin más.

```svg
<svg viewBox="0 0 40 40" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="4" fill="var(--klein-deep)"/>
  <path d="M13 7 L13 27 L29 27"
        stroke="var(--paper)"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"/>
  <circle cx="13" cy="27" r="2.5" fill="var(--rojo)"/>
</svg>
```

**Uso en nav:** 28×28px. Siempre con fondo klein (#1A3499), L en paper, punto en rojo.
**Uso en footer:** 24×24px. Sin el rect de fondo — solo la L en paper y el punto rojo sobre fondo del footer.

**Regla de reducción:**
- A 24px: símbolo completo (L + punto)
- A 16px: cuadrado klein sólido sin detalles

**El símbolo en los ensayos:** En páginas de ensayo, el nav usa la L sin rect (línea blanca sobre fondo del header transparente). La L tiene el punto rojo en la esquina inferior izquierda — no en la superior.

### El wordmark

"Entrelampistas" en Space Grotesk Medium, 14px, letter-spacing 0.01em.
Sin versalitas. Sin serifas. Sin tracking exagerado.
No se modifica. No se separa del símbolo en el nav.

---

## 02 — Tokens de color

```css
:root {
  /* ── Estructurales ── */
  --klein-deep:    #1A3499;   /* Fondo de header, footer, secciones monocromáticas */
  --rojo:          #C0321A;   /* CTAs primarios, hilo rojo, intervenciones geométricas */
  --paper:         #F5F0E8;   /* Fondo de lectura. Siempre. */

  /* ── Tipográficos ── */
  --ink:           #1A1A1A;   /* Texto body, headlines */
  --ink-mid:       #5A5650;   /* Texto secundario, descripciones */
  --ink-light:     #8A8478;   /* Metadata, labels, notas al margen */

  /* ── Superficies ── */
  --surface:       #EFEBE2;   /* Cards, callouts, secciones de fondo suave */
  --border:        #D4CFC0;   /* Bordes de componentes */
  --border-light:  #E8E4D8;   /* Separadores internos */

  /* ── Tintes funcionales ── */
  --klein-tint:    rgba(26, 52, 153, 0.04);   /* Fondo del bloque de definición */
  --rojo-tint:     rgba(192, 50, 26, 0.07);    /* Fondo del newsletter-cta */
}
```

**Regla de proporción — obligatoria:**
- Neutros (paper, surface, ink) → ≥72% de la superficie
- Klein → ≤20% de la superficie
- Rojo → ≤8% de la superficie

**Regla de modo oscuro:** No existe modo oscuro en Entrelampistas. El fondo es siempre `--paper`. La decisión es editorial, no técnica.

---

## 03 — Tipografía

**Familia:** Space Grotesk (Google Fonts)
**Solo esta familia. Sin excepciones.**

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap');

:root {
  --font-base: 'Space Grotesk', sans-serif;
}
```

**Escala tipográfica:**

| Uso | Size | Weight | Line-height | Letter-spacing |
|-----|------|--------|-------------|----------------|
| Hero title | clamp(2.5rem, 5vw, 3.75rem) | 700 | 1.05 | -0.02em |
| Essay title | clamp(2.4rem, 6vw, 3.8rem) | 700 | 0.97 | -0.03em |
| Section title | clamp(1.8rem, 5vw, 2.8rem) | 700 | 1.0 | -0.03em |
| Body | 1.05rem | 300 | 1.85 | 0 |
| Hero dek | 1rem | 300 | 1.65 | 0 |
| Pull quote | clamp(1.15rem, 3vw, 1.6rem) | 700 | 1.3 | -0.01em |
| Label | 0.6rem | 500 | — | 0.12–0.15em |
| Meta | 0.6rem | 400 | — | 0.1em |
| Definition word | 1rem | 700 | — | 0 |
| Definition phonetic | 0.68rem | 400 | — | 0.04em |
| Ghost number | clamp(5rem, 18vw, 10rem) | 700 | 1.0 | -0.05em |

**Reglas absolutas:**
- `font-style: italic` — **PROHIBIDO** en cualquier elemento
- `font-family: serif` — **PROHIBIDO** en cualquier lugar
- Labels y metadata: `text-transform: uppercase`
- Los `section-label` siempre en uppercase, letter-spacing ≥0.1em, color `--ink-light`

---

## 04 — Grid y espaciado

### El grid Bauhaus — firma visual del sitio

El gap de **3px exactos** entre celdas es la firma visual de Entrelampistas. No 4px. No 2px. 3px.

```css
.hero-grid,
.pub-cards,
.pub-cards-bauhaus {
  display: grid;
  gap: 3px;
}

.hero-grid { grid-template-columns: 1fr 1fr; }
.pub-cards  { grid-template-columns: 1fr 1fr; }

@media (max-width: 48rem) {
  .hero-grid,
  .pub-cards { grid-template-columns: 1fr; }
}
```

### Tokens de espacio

```css
:root {
  --space-xs:   0.25rem;   /*  4px */
  --space-sm:   0.5rem;    /*  8px */
  --space-md:   1rem;      /* 16px */
  --space-lg:   1.5rem;    /* 24px */
  --space-xl:   2rem;      /* 32px */
  --space-2xl:  3rem;      /* 48px */
  --space-3xl:  4rem;      /* 64px */
  --space-4xl:  5rem;      /* 80px */

  --content-width: 44rem;
  --radius-sm:  2px;
  --radius-md:  6px;
  --radius-lg:  8px;
}
```

**Regla de contenido:** Los ensayos tienen `max-width: 44rem` centrado. La landing tiene márgenes generosos — `padding: 0 var(--space-xl)` en desktop. El texto nunca toca los bordes del viewport.

---

## 05 — Sistema de botones

Exactamente **dos tipos**. Sin variantes, sin outline, sin ghost.

### Tipo A — Primario (rojo)
Para acciones: suscribirse, enviar formulario.

```css
.btn-primary {
  background: var(--rojo);
  color: var(--paper);
  padding: 0.7rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
.btn-primary:hover { opacity: 0.88; }
```

### Tipo B — Secundario (klein)
Para navegación: "Conocer el proyecto", "Ver archivo", links editoriales.

```css
.btn-secondary {
  background: var(--klein-deep);
  color: var(--paper);
  padding: 0.7rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
.btn-secondary:hover { opacity: 0.88; }
```

### Excepciones por contexto
- **Botón sobre fondo rojo** (newsletter-cta): `background: var(--paper); color: var(--rojo)`
- **Botón sobre fondo klein** (footer): rojo estándar — contrasta sobre klein

**Regla que no cambia nunca:** Si el botón navega a otra página → secundario (klein). Si el botón ejecuta una acción → primario (rojo).

---

## 06 — Componentes clave

### 6.1 — Bloque de definición

El componente más reconocible del sitio. Borde izquierdo klein + tinte muy sutil.

```css
.definition {
  border-left: 2px solid var(--klein-deep);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--klein-tint);
  padding: 1.25rem 1.5rem;
}
.definition-word     { font-size: 1rem; font-weight: 700; color: var(--klein-deep); }
.definition-phonetic { font-size: 0.68rem; color: var(--ink-light); letter-spacing: 0.04em; margin-bottom: 1rem; }
.definition-text     { font-size: 0.875rem; color: var(--ink-mid); font-weight: 300; line-height: 1.7; }
```

**Contenido definitivo:**
```
entrelampistas
[ɛ̃tɾə·lamˈpistas] · sustantivo colectivo, adj. ocasional, verbo.

1. Nombre prestado del oficio de quienes cuidan, arreglan
   y mantienen los espacios donde vivimos.

2. Mezclamos filosofía, psicología cognitiva y sociología
   para entender e involucrarnos con nuestro entorno. Un trabajo
   silencioso y constante que ayuda a construir un pensamiento
   más autónomo y consciente.
```

Debajo del bloque, separado por `margin-top: 2rem`, el botón `.btn-secondary` "Conocer el proyecto".

### 6.2 — Newsletter CTA

Borde izquierdo rojo + tinte rojo muy sutil. Mismo lenguaje visual que el bloque de definición, en rojo.

```css
.newsletter-cta {
  border-left: 3px solid var(--rojo);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--rojo-tint);
  padding: var(--space-xl);
  margin-top: var(--space-4xl);
}
```

**Copy definitivo del headline:**
> "Cada número es una visita del lampista. Viene, mira algo con atención, te lo muestra, y se va sin hacer ruido."

Formulario inline: input email + `.btn-primary` "Suscribirme". Sin pasos, sin columnas, sin numeración. Limpio.

### 6.3 — Section label

Presente en todas las secciones. Siempre igual.

```css
.section-label {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-light);
  font-weight: 500;
  display: block;
  margin-bottom: var(--space-md);
}
.section-label::before {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1px;
  background: var(--rojo);
  margin-right: 0.5rem;
  vertical-align: middle;
}
```

### 6.4 — Pub-cards (cards de ensayo)

Sistema con borde lateral de color del territorio. Sin foto en la versión actual — cuando hay foto, ver sección 06.5.

```css
.pub-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  margin: 0 calc(var(--space-lg) * -1);
}

.pub-card {
  border-radius: 0;
  border-left: 3px solid var(--territory-color, var(--border));
  padding: var(--space-xl) var(--space-lg);
  background: var(--surface);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  text-decoration: none;
  transition: border-left-width 0.2s;
}

.pub-card:hover { border-left-width: 5px; }

[data-territory="entorno"]   { --territory-color: var(--klein-deep); }
[data-territory="cognitivo"] { --territory-color: #2A7A4B; }
[data-territory="tecnologia"]{ --territory-color: #6B3FA0; }
[data-territory="cotidiano"] { --territory-color: #B87820; }
[data-territory="sistemas"]  { --territory-color: var(--rojo); }
```

### 6.5 — Bauhaus cards con foto (versión collage)

Para cuando hay fotografía Unsplash disponible. Ver sección 07 para el sistema de collage completo.

### 6.6 — Pull quote

```css
.pull-quote {
  font-size: clamp(1.15rem, 3vw, 1.6rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: var(--space-xl) 0;
  padding-left: var(--space-lg);
  border-left: 3px solid var(--rojo);
}
```

### 6.7 — Callout

```css
.callout {
  border: 0.5px solid var(--border);
  padding: var(--space-lg);
  margin: var(--space-xl) 0;
  border-radius: var(--radius-md);
  background: var(--surface);
}
.callout p {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--ink-mid);
  font-weight: 300;
  margin: 0;
}
```

### 6.8 — Ghost number (secciones de ensayo)

```css
.ghost-number {
  font-size: clamp(5rem, 18vw, 10rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--klein-deep);
  opacity: 0.04;
  display: block;
  margin-bottom: -2.5rem;
  user-select: none;
  pointer-events: none;
}
```

### 6.9 — Sección monocromática (Posición / Por qué estamos aquí)

```css
.posicion {
  background: var(--klein-deep);
  color: var(--paper);
  padding: var(--space-3xl) var(--space-xl);
  margin-left: calc(var(--space-lg) * -1);
  margin-right: calc(var(--space-lg) * -1);
}
.posicion .section-label  { color: rgba(245,240,232,0.45); }
.posicion .section-label::before { background: rgba(245,240,232,0.3); }
.posicion p {
  color: #F5F0E8;       /* Color sólido — NUNCA rgba con opacidad parcial */
  font-weight: 300;
  line-height: 1.75;
  font-size: 1rem;
}
.posicion p:first-of-type {
  font-size: 1.15rem;
  font-weight: 400;
}
```

### 6.10 — Reading progress bar (ensayos)

```css
.reading-progress {
  position: fixed;
  top: 0; left: 0;
  width: 0%;
  height: 2px;
  background: var(--rojo);
  z-index: 200;
  transition: width 100ms linear;
}
```

### 6.11 — TOC lateral (ensayos)

Puntos rojos que se activan al entrar en cada sección. Se revelan al hacer hover sobre el TOC. En móvil se convierte en barra de puntos en la parte inferior.

---

## 07 — Sistema de collage fotográfico

### La filosofía

El collage no es decoración. Es la tensión editorial que diferencia a Entrelampistas de cualquier blog de ideas. El mecanismo es preciso: la fotografía aporta humanidad y tiempo acumulado; la geometría aporta precisión y criterio; el fragmento de papel aporta el gesto editorial de alguien que recortó y pegó algo con intención.

Ninguna de las tres capas puede faltar. Ninguna puede dominar.

**Lo que hace que funcione:** La foto tiene imperfección (grano, asimetría, vida). La geometría tiene precisión (líneas exactas, proporciones). La tensión entre las dos *es* el diseño.

### Las tres capas

**Capa 1 — Fotografía**
- Siempre B&N: `filter: grayscale(100%) contrast(1.1)` en CSS
- El filtro va en CSS, nunca procesado en el archivo
- Composición asimétrica, con zona oscura donde pueda ir texto blanco
- Fotógrafos compatibles: Jez Timms, Pawel Czerwinski, Alexander Andrews, Félix Mittermeier
- Keywords Unsplash por territorio:
  - Hero / infraestructura: `city infrastructure night`, `building facade detail`, `metro tunnel light`
  - Habitabilidad digital: `city window night`, `computer screen reflection`
  - Cognición / decisiones: `hands writing notebook`, `paper desk work`
  - Sistemas invisibles: `pipe system infrastructure`, `cable wire detail`, `staircase architecture`

**Capa 2 — Intervención geométrica SVG**

Exactamente 3 elementos:
1. Una línea de circuito en `#C0321A`, stroke-width 1.5, stroke-linecap round
2. Un rectángulo de borde (sin fill), stroke `#C0321A` opacity 0.65
3. Un nodo terminal: `circle r="4"` (activo: fill) o `r="3.5"` (abierto: solo stroke)

**Regla de composición:** Dividir el viewBox en tercios. El rectángulo ocupa principalmente el tercio central. El circuito parte desde un borde del rectángulo y sale hacia el exterior de la foto. El nodo terminal queda en el tercio inferior o derecho. **Nunca centrado exacto. Nunca simétrico.**

**Ejemplo canónico** (hero con foto de calle urbana):
```svg
<svg class="hero-geo" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Línea que corta la foto en el tercio inferior -->
  <line x1="0" y1="280" x2="220" y2="280"
        stroke="#C0321A" stroke-width="1.5"
        stroke-linecap="round" opacity="0.75"/>
  <!-- Rectángulo que enmarca zona de interés -->
  <rect x="120" y="140" width="140" height="160"
        fill="none" stroke="#C0321A"
        stroke-width="1.5" opacity="0.5"/>
  <!-- Nodo activo donde línea toca rectángulo -->
  <circle cx="120" cy="280" r="4" fill="#C0321A" opacity="0.9"/>
  <!-- Circuito que sale hacia el exterior -->
  <path d="M260 300 L260 360 L200 360"
        stroke="#C0321A" stroke-width="1"
        fill="none" stroke-linecap="round" opacity="0.55"/>
  <!-- Nodo terminal abierto -->
  <circle cx="200" cy="360" r="3.5"
          fill="none" stroke="#C0321A"
          stroke-width="1.5" opacity="0.7"/>
</svg>
```

**Capa 3 — Fragmento de papel**

El gesto editorial central. Un recorte tipografiado sobre fondo paper, ligeramente rotado. Siempre parece haber sido puesto por alguien con intención.

```css
.hero-fragment,
.pbc-fragment {
  position: absolute;
  background: #F5F0E8;
  padding: 10px 14px;
  max-width: 58%;
  transform: rotate(1.2deg);   /* Alternar ±1.5deg entre elementos */
  z-index: 4;
}

.hero-fragment p,
.pbc-fragment p {
  font-size: 0.72rem;
  line-height: 1.5;
  color: #1A1A1A;
  font-weight: 300;
  margin: 0;
}
.hero-fragment strong,
.pbc-fragment strong { font-weight: 600; }
```

**Reglas del fragmento:**
- Máximo 2 líneas de texto
- Una palabra en `font-weight: 600`, el resto en 300
- Posicionado en el tercio donde la foto tiene más espacio vacío
- Nunca centrado. Nunca alineado perfectamente al borde
- Rotación alterna entre elementos: +1.2deg, -1deg, +1.5deg, -1.2deg

**Ejemplos de copy para fragmentos:**
- Hero: "No solo estamos usando internet. **Estamos existiendo en él.**"
- Card Habitabilidad: "¿Qué tipo de lugar queremos que **sea internet?**"
- Card Decisiones: "Decidimos antes de decidir. **¿Desde dónde?**"

---

## 08 — Sistema de ilustración SVG (ensayos)

### La filosofía

Las ilustraciones de los ensayos no decoran el texto — lo piensan visualmente. Cada una tiene una función argumentativa: mostrar un mecanismo, una tensión, una estructura. Si la ilustración solo "ambientan", no va.

**Lo que no son:** infografías, iconos decorativos, imágenes de banco de ideas.
**Lo que sí son:** diagramas esquemáticos de mecanismos abstractos, planos técnicos de sistemas conceptuales.

### Reglas técnicas absolutas

```
PERMITIDO: rect, circle, line, path (máx. 6 puntos), polyline, polygon, ellipse
PROHIBIDO: figuras humanas, animales, objetos orgánicos complejos
PROHIBIDO: más de 3 elementos narrativos por ilustración
PROHIBIDO: path con más de 6 puntos de control (M, L, C, Z únicamente)
PROHIBIDO: text dentro de SVG excepto labels pequeños (font-size 6-7px)
```

### Colores en ilustraciones

```
Líneas estructurales: var(--ink) con opacity 0.1–0.25
Elementos klein: var(--klein-vibrant, #1A3499) o var(--klein-deep)
Elemento de acento: #C0321A (rojo) — solo el elemento más importante
Nodos de datos: fill opacity 0.6–0.85
```

**Regla de color:** Un solo elemento rojo por ilustración. El rojo señala la cosa más importante. Si todo es rojo, nada lo es.

### Las ilustraciones publicadas (referencia canónica)

Las ilustraciones en `habitabilidad-digital.html` y `mapa-de-tu-mente.html` son la referencia de calidad. Antes de crear cualquier ilustración nueva, revisar:

- **IL-habdigital-01:** Plano arquitectónico de plataformas (bloques de rect + dots de personas + curvas de flujo)
- **IL-habdigital-02:** Vocabulario como lente (ruido sin nombre → lens → términos nombrados)
- **IL-habdigital-03:** Atención fragmentada vs. profunda (zigzag rojo vs. escalera klein)
- **IL-mente-01:** Mapa topográfico de decisiones (elipses concéntricas + nodos + conexiones)
- **IL-mente-02:** Estímulo → pausa → reacción (tres bloques con zona roja central)
- **IL-mente-03:** Sistema 1 vs. Sistema 2 (zigzag rojo vs. escalera deliberada)
- **IL-mente-04:** Heurística (curva tortuosa vs. línea directa roja)
- **IL-mente-05:** Modelos mentales como estratos geológicos (capas isométricas)
- **IL-mente-06:** Cuidado como estructura protectora (arcos concéntricos klein)

### Dimensiones estándar

```css
.il-essay {
  display: block;
  margin: var(--space-2xl) auto;
  max-width: 440px;
  width: 100%;
}

/* ViewBox estándar: 280×140 (horizontal) o 280×200 (vertical) */
/* Máximo 360px de ancho para ilustraciones complejas */
```

---

## 09 — El footer (referencia de calidad)

El footer está bien ejecutado y es el componente de referencia para el nivel de ejecución que busca el proyecto. **No modificar estructura, colores ni tipografía del footer.**

**Elementos del footer:**
1. Símbolo V2 (24px, sin rect de fondo)
2. Tagline "Pensamiento estructural"
3. Ciudad "Barcelona"
4. Reading Pulse — la línea ECG con punto rojo animado + "Última revisión · mes año"
5. Columna de navegación editorial
6. Columna de newsletter + iconos sociales (LinkedIn, Instagram)
7. Legal "© 2026 Entrelampistas"

**La ilustración del Eixample de Barcelona** al final del footer de los ensayos es parte de la firma del proyecto. No eliminar.

---

## 10 — Sistema de ensayo — estructura de página

Todos los ensayos siguen esta estructura exacta:

```
1. <header class="site-header"> — Nav con símbolo V2
2. .reading-progress — barra de progreso fija en top:0
3. .share-dock — botones LinkedIn, X, Email (posición fija lateral)
4. .essay-toc — TOC con puntos (posición fija lateral opuesto)
5. <article>
   a. .essay-header — tag + título + subtitle + meta
   b. .article-summary — resumen AEO (para búsqueda, no visible)
   c. .essay-body — cuerpo del texto
      - Secciones con .ghost-number + .section-num + .essay-section-title
      - Body text en párrafos
      - Pull quotes con borde izquierdo rojo
      - Callouts con fondo surface
      - Two-col, three-lang, hab-grid según estructura del argumento
      - Ilustraciones SVG (.il-essay) intercaladas
   d. .refs — referencias al final
   e. .essay-byline
   f. .questions-block — preguntas de cierre (4 máximo)
   g. .next-essay — link al siguiente ensayo
6. <section class="faq"> — preguntas frecuentes (para SEO)
7. <footer class="site-footer"> — footer completo
```

**Elementos obligatorios en cada ensayo:**
- Barra de lectura (2px roja fija en top)
- TOC lateral con puntos activos
- Share dock (LinkedIn, X, email)
- Preguntas de cierre (el tornillo suelto)
- Link al siguiente ensayo
- Sección FAQ para SEO

---

## 11 — Navegación y header

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 150;
  background: var(--klein-deep);
  border-bottom: 1px solid rgba(245,240,232,0.1);
  transition: backdrop-filter 0.3s;
}

.site-header.is-scrolled {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(26, 52, 153, 0.92);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  padding: 0.85rem var(--space-lg);
  max-width: var(--content-width);
  margin: 0 auto;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-wordmark {
  color: var(--paper);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}
```

**Regla del nav:** Solo símbolo + wordmark + links de navegación. La fonética `[ɛ̃tɾə·lamˈpistas]` NO va en el nav — va en el bloque de definición. Esta decisión no cambia.

---

## 12 — Animaciones

### Entrada de página

```css
.page-enter { opacity: 0; transform: translateY(12px); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.page-enter.visible { opacity: 1; transform: translateY(0); }
```

### Reveal en scroll (sección posición)

```css
.posicion p { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.posicion p.is-visible { opacity: 1; transform: translateY(0); }
.posicion p:nth-child(2) { transition-delay: 0.1s; }
.posicion p:nth-child(3) { transition-delay: 0.2s; }
.posicion p:nth-child(4) { transition-delay: 0.3s; }
```

### Reglas absolutas de animación

```
PERMITIDO: opacity, transform (translate, scale)
PROHIBIDO: transition: all
PROHIBIDO: animation en elementos de texto del body
DURACIÓN: 0.2s para micro-interacciones, 0.5–0.6s para entradas
SIEMPRE: @media (prefers-reduced-motion: reduce) { /* desactivar */ }
```

---

## 13 — Copy y voz editorial

### La voz de Entrelampistas

No es un profesor. No es un activista. No es un consultor.

Es alguien que descubrió algo hace cinco años y todavía le parece increíble que nadie se lo hubiera dicho antes. **No indignación — sorpresa genuina.** El lector no necesita que le convenzan — necesita que le den el lenguaje para nombrar algo que ya siente.

### Las 4 partes de cada ensayo (método lampista)

1. **La fuga** — Una tensión cotidiana reconocible. La escena que Clara ha vivido o podría vivir. Sin academicismo.
2. **El diagnóstico** — Qué está pasando exactamente. Los argumentos con sus fuentes, integrados en la narración.
3. **La herramienta** — Algo para usar. No una receta — una pregunta o marco que el lector puede aplicar por su cuenta.
4. **El tornillo suelto** — Lo que el ensayo deja abierto deliberadamente. La incertidumbre honesta que invita a seguir pensando.

### Palabras prohibidas (nunca en textos publicados)

`poderoso` · `transformador` · `despertar` · `autenticidad` · `vibra` · `disruptivo` · `potenciar` · `empoderar` · `viaje interior` · `next level` · `tomar conciencia` · `el mundo necesita` · `cambiar el paradigma`

### Frases prohibidas (nunca en la web)

- "Entrelampistas toma prestado el oficio..."
- "Únete a quienes cuidan como piensan"
- "Una publicación sobre..."
- "El proyecto nace como..."
- Cualquier oración que describa Entrelampistas desde afuera en tercera persona en hero

### Prueba de tono

Si una frase puede aparecer en un manifiesto político → reescribirla como observación periodística.
Si una frase puede aparecer en una app de mindfulness → eliminarla.
Si la frase requiere que el lector ya esté convencido → reescribirla para quien no lo está.

---

## 14 — Protocolo de Claude Code

### Al inicio de cada sesión

```
1. Leer CLAUDE.md
2. Leer .claude/skills/entrelampistas-design-system/SKILL.md (este archivo)
3. Leer .claude/skills/editor-lampista/SKILL.md
4. Confirmar en el chat el estado del design system antes de ejecutar
```

### Regla de propuesta

Para estas categorías, **proponer antes de implementar** y esperar confirmación:
- Cualquier SVG nuevo (símbolo, ilustración, intervención geométrica)
- Cualquier cambio al layout de la landing
- Cualquier nuevo componente sin precedente en el sistema
- Cualquier cambio al copy visible

### Regla de verificación

Al final de cada bloque de trabajo, grep de seguridad:
```bash
grep -r "muscat\|MUSCAT\|past-\|2aff00" ~/Desktop/landing/
# Debe devolver 0 resultados
```

### Lo que no se toca sin instrucción explícita

- El footer completo (estructura, colores, reading pulse)
- Las ilustraciones SVG en los ensayos publicados
- El bloque de definición (contenido y CSS)
- El TOC lateral de ensayos
- El símbolo V2 en nav y footer

---

## 15 — Estado del sitio · 18 marzo 2026

### Archivos del proyecto
```
~/Desktop/landing/
├── index.html           ← Landing page
├── sobre.html           ← Página de proyecto
├── habitabilidad-digital.html  ← Ensayo 1
├── mapa-de-tu-mente.html       ← Ensayo 2
├── archivo.html         ← En construcción
├── newsletter.html      ← En construcción
├── styles/
│   ├── tokens.css       ← Variables del design system
│   ├── base.css         ← Reset y tipografía base
│   ├── components.css   ← Componentes reutilizables
│   └── main.css         ← Estilos específicos de secciones
├── public/
│   ├── images/
│   │   └── archivo/     ← Fotos Unsplash en B&N
│   ├── fonts/           ← Space Grotesk local
│   └── favicon.svg
└── .claude/
    ├── CLAUDE.md
    └── skills/
        ├── entrelampistas-design-system/SKILL.md  ← este archivo
        ├── editor-lampista/SKILL.md
        └── references/
            └── collage-referencia.png
```

### Ensayos publicados
- `habitabilidad-digital` → Territorio 1 (Interpretación del entorno)
- `mapa-de-tu-mente` → Territorio 2 (Entrenamiento cognitivo)

### Pendiente aprobado esta sesión
- [ ] Fotos Unsplash en hero y cards
- [ ] OG images para los 2 ensayos
- [ ] Página /sobre con newsletter-cta correcto
- [ ] Deploy con correcciones de hoy

### Próximos ensayos
- "La economía no te explica el mundo. Te enseña a aceptarlo." → Territorio 5 (Sistemas invisibles)
- Ensayo posible: La economía del tiempo → Territorio 5

---

## 16 — Checklist de calidad

Antes de cualquier deploy, verificar:

**Visual**
- [ ] Fondo es siempre paper (#F5F0E8) — nunca blanco puro
- [ ] Klein ≤20% de superficie visible
- [ ] Rojo ≤8% de superficie visible
- [ ] No hay `font-style: italic` en ningún elemento
- [ ] No hay tipografía serif
- [ ] No hay hex sueltos en CSS (solo variables)
- [ ] No hay `transition: all`
- [ ] Botones primarios son rojos sólidos, secundarios son klein sólidos
- [ ] Ningún botón outline

**Contenido**
- [ ] No hay ninguna frase prohibida visible
- [ ] No hay rastros de Muscat Group, código japonés ni verde neón
- [ ] La fonética no aparece en el nav
- [ ] El bloque de definición tiene el texto correcto

**Técnico**
- [ ] `grep -r "muscat\|past-\|2aff00"` devuelve 0 resultados
- [ ] Sitio funciona en 375px sin overflow horizontal
- [ ] Imágenes tienen `alt` descriptivo
- [ ] Reading progress funciona en ensayos

---

*Entrelampistas Design System v3.0 · Barcelona · 18 marzo 2026*
*Actualizar este documento cada vez que se tome una decisión de diseño permanente.*
