---
name: design-system
description: Sistema de diseño visual y lenguaje de marca de Entrelampistas. Usa SIEMPRE este skill antes de generar cualquier HTML, CSS, componente, página, landing, artículo, o pieza visual para Entrelampistas. También úsalo cuando el usuario pida ajustes de diseño, cambios de color, tipografía, layout, o cualquier modificación visual del proyecto. Si tocas código frontend de Entrelampistas, lee este skill primero. Sin excepción.
---

# Entrelampistas — Design System Skill

## Identidad

**Entrelampistas** es una plataforma editorial de pensamiento estructural.
Un espacio donde pensar es una práctica de mantenimiento en medio de sistemas que cambian.

**Voz de marca:** Honesta, clara, directa. Sin pretensión, sin urgencia, sin dramatismo. Comunicación que respeta al lector — no lo adoctrina ni lo simplifica.

**Referencia de tono:** The School of Life — transforma ideas complejas en lenguaje accesible sin perder rigor. Cada pieza habla con la misma voz.

---

## REGLAS ABSOLUTAS

1. **NUNCA uses italic.** En ningún elemento, ni headlines, ni subtítulos, ni citas, ni microcopy. Todo recto.
2. **NUNCA uses tipografía serif.** Todo el proyecto usa Neo Grotesque como familia única. Sin excepciones.
3. **NUNCA uses colores fuera de la paleta definida abajo.** Si necesitas un nuevo tono, derívalo de las variables existentes.
4. **NUNCA generes output que se vea como blog genérico.** Si el resultado no tiene nivel editorial, itera hasta que lo tenga.
5. **NUNCA uses fonts genéricas** (Inter, Roboto, Arial, Space Grotesk, system fonts). Solo Neo Grotesque.

---

## Tipografía

### Familia única: Neo Grotesque SC

```css
@font-face {
  font-family: "Neo Grotesque";
  src: url("/fonts/Fontspring-DEMO-neogrotesksc-regular.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  --font: "Neo Grotesque", -apple-system, system-ui, sans-serif;
}
```

### Escala tipográfica

| Rol | Tamaño | Line-height | Letter-spacing | Transform | Uso |
|---|---|---|---|---|---|
| Display | 3.2rem (48px) | 1.05 | -0.02em | ninguno | Headline principal de landing |
| H1 | 2.4rem (36px) | 1.1 | -0.01em | ninguno | Títulos de artículo |
| H2 | 1.6rem (24px) | 1.2 | 0 | ninguno | Subtítulos de sección |
| H3 | 1.2rem (18px) | 1.3 | 0 | ninguno | Subtítulos menores |
| Body | 1rem (15px) | 1.8 | 0 | ninguno | Texto de lectura |
| Small | 0.85rem (13px) | 1.6 | 0.01em | ninguno | Captions, metadata |
| Label | 0.7rem (11px) | 1.5 | 0.12em | uppercase | Section labels, nav, tags |
| Micro | 0.6rem (9px) | 1.4 | 0.08em | uppercase | Footer notes, timestamps |

### Reglas tipográficas

- `font-style: normal` SIEMPRE. Nunca italic.
- `-webkit-font-smoothing: antialiased`
- `text-rendering: optimizeLegibility`
- Headlines: peso normal, sin bold excesivo
- Body: `text-align: justify` en desktop, `text-align: left` en mobile
- Labels/nav: siempre uppercase con letter-spacing generoso
- Links: color de texto + underline sutil, hover cambia a --klein-vibrant

---

## Paleta de color

```css
:root {
  /* === PRIMARIOS: AZUL ENTRE PIZARRA Y KLEIN === */
  --klein-deep:     hsl(230, 65%, 28%);    /* Spot color principal */
  --klein-mid:      hsl(228, 55%, 38%);    /* Secundario */
  --klein-vibrant:  hsl(230, 75%, 48%);    /* Acento / hover / interacción */
  --slate-blue:     hsl(225, 30%, 52%);    /* Terciario / elementos pasivos */

  /* === ACENTO: ROJO COLECTIVO === */
  --rojo:           hsl(355, 70%, 48%);    /* Rojo profundo — acento de energía colectiva */
  --rojo-light:     hsl(355, 65%, 58%);    /* Rojo para hover/estados */
  --rojo-bg:        hsl(355, 70%, 48%, 0.08); /* Rojo como fondo sutil */

  /* === FONDOS === */
  --paper:          hsl(40, 25%, 96%);     /* Fondo principal — papel cálido */
  --paper-warm:     hsl(38, 30%, 93%);     /* Fondo secundario — bloques, cards */
  --paper-cool:     hsl(220, 15%, 95%);    /* Fondo alternativo — frío */
  --surface:        hsl(0, 0%, 100%);      /* Superficie blanca — cards elevadas */

  /* === TEXTO === */
  --ink:            hsl(230, 25%, 12%);    /* Texto principal */
  --ink-mid:        hsl(230, 15%, 40%);    /* Texto secundario */
  --ink-light:      hsl(230, 10%, 65%);    /* Texto terciario / placeholder */

  /* === BORDES Y SEPARADORES === */
  --border:         hsl(230, 10%, 88%);    /* Bordes sutiles */
  --border-light:   hsl(230, 10%, 92%);    /* Separadores mínimos */

  /* === SELECCIÓN === */
  --selection:      hsl(230, 75%, 48%, 0.15);

  /* === CREMA === */
  --cream:          hsl(42, 50%, 88%);     /* Acento cálido, fondos especiales */
}
```

### Uso del color

| Elemento | Color | Variable |
|---|---|---|
| Fondo body/backdrop | Klein profundo | --klein-deep |
| Fondo main/contenido | Papel cálido | --paper |
| Header y footer fondo | Klein profundo | --klein-deep |
| Header y footer texto | Papel | --paper |
| Headlines | Klein profundo | --klein-deep |
| Section labels | Klein vibrante | --klein-vibrant |
| Body text | Tinta | --ink |
| Text secundario | Tinta media | --ink-mid |
| Links (normal) | Tinta | --ink con underline --border |
| Links (hover) | Klein vibrante | --klein-vibrant |
| Botón primario fondo | Klein profundo | --klein-deep |
| Botón primario hover | Klein vibrante | --klein-vibrant |
| Botón secundario/acento | Rojo | --rojo |
| Acento editorial/highlight | Rojo | --rojo |
| Separadores | Border | --border |
| Cards fondo | Superficie | --surface |
| ::selection | Selection | --selection |

### El rojo: cuándo usarlo

El rojo es el acento de energía colectiva. No es el color principal — es el pulso.

- Highlight de texto importante
- Acento en CTAs secundarios
- Indicador de contenido nuevo o destacado
- Elementos que necesitan calidez humana contra el azul frío
- NUNCA como fondo de secciones grandes
- NUNCA como color de texto de cuerpo

---

## Espaciado

```css
:root {
  --space-xs:   0.25rem;   /* 4px */
  --space-sm:   0.5rem;    /* 8px */
  --space-md:   1rem;      /* 16px */
  --space-lg:   1.5rem;    /* 24px */
  --space-xl:   2rem;      /* 32px */
  --space-2xl:  3rem;      /* 48px */
  --space-3xl:  4.5rem;    /* 72px */
  --space-4xl:  6rem;      /* 96px */
}
```

- Entre párrafos: `--space-lg` (1.5rem)
- Entre secciones: `--space-2xl` (3rem)
- Padding de main: `--space-xl` horizontal, `--space-2xl` vertical
- Margin de página lateral: `--space-xs` (0.25rem — para que se vea el backdrop)

---

## Layout

### Estructura base (estilo Robin Sloan)

```css
body {
  background-color: var(--klein-deep);  /* backdrop visible en bordes */
}

main {
  display: grid;
  grid-template-columns: 1fr min(48rem, 100%) 1fr;
  background-color: var(--paper);
  border-radius: 0.5rem;
  margin: 0 var(--space-xs);
  padding: 0 var(--space-md) var(--space-xs);
  min-height: 100vh;
}

main > * {
  grid-column: 2;
}
```

### Header

```css
header {
  background: var(--klein-deep);
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

header nav {
  display: flex;
  gap: var(--space-xl);
}

header a {
  font-family: var(--font);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--paper);
}
```

### Footer

```css
footer {
  background: var(--klein-deep);
  padding: var(--space-xl) var(--space-md);
  text-align: center;
  color: var(--slate-blue);
  font-size: 0.75rem;
  line-height: 1.7;
}
```

---

## Componentes

### Newsletter CTA

```css
.newsletter-form {
  display: flex;
  gap: var(--space-sm);
  max-width: 32rem;
  margin: 0 auto var(--space-xl);
}

.newsletter-form input[type="email"] {
  flex: 2;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  background: var(--surface);
  font-family: var(--font);
  font-size: 0.85rem;
  color: var(--ink);
}

.newsletter-form button {
  /* Usa clase .btn .btn-primary en vez de estilos sueltos.
     Ver components.css para el patron correcto con variables de timing. */
  flex: 1;
}
```

### Section Label

```html
<span class="section-label">Qué es Entrelampistas</span>
```

```css
.section-label {
  display: block;
  font-family: var(--font);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--klein-vibrant);
  margin-bottom: var(--space-md);
}
```

### Card de artículo

```css
.article-card {
  padding: var(--space-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: box-shadow var(--duration-normal) var(--ease-out);
}

.article-card:hover {
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

.article-card .card-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--klein-vibrant);
  margin-bottom: var(--space-sm);
}

.article-card .card-title {
  font-size: 1.2rem;
  line-height: 1.3;
  color: var(--ink);
  margin-bottom: var(--space-sm);
}

.article-card .card-excerpt {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--ink-mid);
}
```

### Separador

```css
hr {
  border: none;
  border-bottom: 1px solid var(--border);
  margin: var(--space-xl) 0;
}
```

### Definición de diccionario (pieza de marca)

```css
.definition-block {
  padding: var(--space-lg);
  background: var(--paper-warm);
  border-left: 3px solid var(--rojo);
  border-radius: 0.35rem;
  margin: var(--space-xl) 0;
}

.definition-word {
  font-family: var(--font);
  font-size: 1.15rem;
  color: var(--ink);
  margin-bottom: var(--space-xs);
}

.definition-phonetic {
  font-size: 0.8rem;
  color: var(--ink-light);
  margin-bottom: var(--space-md);
}

.definition-text {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ink-mid);
}
```

---

## Responsive

```css
@media (min-width: 1600px) { html { font-size: 16px; } }
/* Default: 15px */
@media (max-width: 48rem) {
  html { font-size: 14px; }
  main { margin: 0; border-radius: 0; }
  body p { text-align: left; }
  .newsletter-form { flex-direction: column; }
}
@media (max-width: 400px) { html { font-size: 13px; } }
@media (max-width: 320px) { html { font-size: 11px; } }
```

---

## Microcopy

Para voz y tono completos, lee el skill **editorial-voice**. Aqui solo la tabla rapida de microcopy UI:

| Generico (NO) | Entrelampistas (SI) |
|---|---|
| Suscribete a nuestra newsletter | Recibe pensamiento estructural cada mes |
| Descubre mas | Sigue leyendo |
| Explora nuestros temas | Ejes de pensamiento |
| Sobre nosotros | Que es Entrelampistas |
| Ultimos articulos | Lecturas recientes |
| Contactanos | Escribenos |

---

## Checklist de calidad

Antes de entregar CUALQUIER output, verifica:

- [ ] ¿Toda la tipografía es Neo Grotesque? ¿No hay serif ni italic en ningún lugar?
- [ ] ¿Los colores son exclusivamente de la paleta definida?
- [ ] ¿El rojo se usa como acento, no como protagonista?
- [ ] ¿El layout tiene la estructura body(klein) > main(papel) con border-radius?
- [ ] ¿Los section labels son uppercase con letter-spacing?
- [ ] ¿El espaciado sigue la escala definida?
- [ ] ¿El microcopy evita lenguaje genérico?
- [ ] ¿Se siente como una plataforma editorial, NO como un blog?
- [ ] ¿Tiene el nivel de craft de Amie.so / Jakub.kr?
- [ ] ¿Transmite serenidad estructural?

---

## Referencias de nivel de calidad

Cuando evalúes tu output, compara contra:

- **Robin Sloan** (robinsloan.com) — ritmo editorial, tipografía cuidada
- **Jakub Krehel** (jakub.kr) — craft técnico, microinteracciones
- **Amie** (amie.so) — sharp frontend, calidad premium
- **The Syllabus** (the-syllabus.com) — grid editorial, curación intelectual
- **The School of Life** — tono de marca, nombrado de secciones
- **Barcelona** — diseño público inclusivo, tipografía fuerte

Si tu output no está al nivel de estas referencias, itera.
