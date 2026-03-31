# Aplicaciones — Templates por Canal

## Instagram

### Principios visuales para RRSS

Las piezas de Instagram de Entrelampistas no son "contenido de redes" —
son el proyecto editorial en formato comprimido. Las mismas reglas del sitio
aplican aquí: sin decoración gratuita, sin emojis en el cuerpo, sin tipografía
que no sea Neo Grotesque SC.

El símbolo aparece siempre en la esquina superior izquierda como marca mínima.
El territorio aparece siempre en la parte inferior como etiqueta.

---

### Formato A — Aforismo

**Dimensiones:** 1080×1080px (ratio 1:1)
**Uso:** Frases destiladas del proyecto. Una sola idea. Máxima densidad.

**Estructura:**
```
LOGO (top-left, 16px símbolo + nombre en 8px uppercase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[espacio blanco]

  [barra roja 16px ancha, 2px alta]
  [aforismo — 14-16px, weight 400, line-height 1.45]
  [espacio]
  [segunda línea si la hay — 14px weight 300, 70% opacity]

[espacio blanco]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERRITORIO (bottom-left, 7px uppercase tracking 0.12em)
AÑO (bottom-right, 7px)
```

**Variantes de fondo:**
- Fondo Klein deep → texto en paper (uso principal)
- Fondo paper → texto en ink (variante para alternar)
- Fondo ink dark → texto en paper (uso especial, muy esparso)

**Lo que NUNCA aparece:**
- Emojis en el cuerpo del texto
- Más de 2 bloques de texto
- Fotografías o imágenes
- Gradientes o fondos complejos
- Más de 2 colores de texto

---

### Formato B — Pregunta-gancho

**Dimensiones:** 1080×1080px (ratio 1:1)
**Uso:** Abrir una pregunta que Clara no se había hecho pero que ya sentía.

**Estructura:**
```
LOGO (top-left)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[espacio]

  [pregunta — 16-18px, weight 400, line-height 1.35]
  [espacio 10px]
  [contexto — 11px, weight 300, opacity 0.55, line-height 1.5]

[espacio]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERRITORIO (bottom-left, rojo)  →  (bottom-right)
```

**Fondo preferido:** Ink dark (#1A1A1A) — hace que la pregunta pese más.

---

### Formato C — Micro-ensayo

**Dimensiones:** 1080×1080px, múltiples slides (carrusel)
**Uso:** Versión comprimida de un ensayo. 4-6 slides.

**Slide 1 — Cover:**
```
NÚMERO DE SLIDE: "01 · 05" (top-left, 8px, rojo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[barra klein 20px, 2px]
TÍTULO ENSAYO — 16px weight 500
Subtítulo — 11px weight 300 ink-mid
[espacio]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOGO (bottom-left)
```

**Slides intermedios:**
```
NÚMERO DE SLIDE (top-left)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[párrafo 12-13px, weight 300, line-height 1.55]
[máximo 4 líneas por slide]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERRITORIO (bottom)
```

**Slide final — CTA:**
```
[pregunta abierta o herramienta — mismo estilo]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Ensayo completo en bio →"  (8px, ink-light)
LOGO
```

---

### Highlight Covers (iconos de territorios)

5 covers, uno por territorio. Fondo Klein deep, icono blanco del territorio.
Los iconos son versiones simplificadas de IL-03.

```
60×60px icon (centrado verticalmente)
8px label debajo: nombre del territorio en 7px uppercase
Fondo: Klein deep
```

**Los 5 territorios y sus iconos:**
1. Entorno — retícula de ciudad (plano de planta)
2. Cognición — cerebro como mapa (IL-03a)
3. Tecnología — monitor en corte (IL-03b)
4. Cotidiano — ojo de atención (IL-03c)
5. Sistemas — red de nodos conectados

---

## Stories

**Dimensiones:** 1080×1920px (ratio 9:16)

**Uso principal:** Anuncio de nueva publicación.

```
LOGO + "Entrelampistas" (top, 14px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[espacio grande]

  ETIQUETA DE TERRITORIO (9px, rojo, uppercase)
  TÍTULO (15px, weight 400)
  SUBTÍTULO (10px, weight 300, 0.6 opacity)

[espacio grande]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"VER EN BIO →" (8px, 0.4 opacity)
```

---

## OG Images — Open Graph 1200×630

Aparecen cuando se comparte un enlace en WhatsApp, Twitter, Slack, etc.
Son la "portada" del ensayo en el mundo exterior.
El símbolo y la identidad deben ser inconfundibles.

**Template base:**

```html
<!-- Estructura conceptual — implementar como imagen generada o template HTML/CSS -->

Fondo: Klein deep (#1A3499)
Padding: 48px todos los lados

TOP:
  Símbolo (20px) + "Entrelampistas" (9px, uppercase, tracking 0.15em, paper 50% opacity)

MIDDLE (alineado a la izquierda, verticalmente centrado):
  TERRITORIO (9px, rojo, uppercase, tracking 0.12em, margin-bottom 8px)
  TÍTULO (17-20px, weight 500, paper, line-height 1.25)
  SUBTÍTULO (11px, weight 300, paper 60% opacity)

BOTTOM:
  "entrelampistas.com" (8px, paper 30%, left)
  "X min · AÑO" (8px, paper 25%, right)
  Línea separadora: 0.5px, paper 12% opacity
```

**Variante paper** (para ensayos con tono más reflexivo / filosófico):
```
Fondo: paper (#F5F0E8)
Título: ink (#1A1A1A)
Símbolo: Klein deep
Territorio: rojo
```

**Generación automática:**
Cuando se publique un nuevo ensayo, generar la OG image automáticamente
usando el template HTML/CSS vía Puppeteer o similar:
```
node generate-og.mjs --title "Habitabilidad digital" --territory "Interpretación del entorno" --subtitle "A más de tres décadas de la web" --time 10
```

---

## Newsletter — Template HTML

### Header
```html
<header style="background:#1A3499; padding: 20px 28px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <!-- Símbolo inline SVG + nombre -->
        [SVG símbolo 28px] + ENTRELAMPISTAS + "Pensamiento estructural"
      </td>
      <td align="right" style="font-size:9px; color:rgba(245,240,232,0.4);">
        Número 0X · Mes YYYY
      </td>
    </tr>
  </table>
</header>
```

### Body — Secciones de newsletter
```html
<main style="background:#F5F0E8; padding: 28px 28px;">

  <!-- 01 La Fuga -->
  <p class="section-number">01 · La fuga</p>
  <h2 class="section-title">Título de la fuga</h2>
  <p class="body-text">Texto...</p>

  <hr style="border:none; border-top:0.5px solid rgba(26,26,26,0.12); margin:20px 0;">

  <!-- 02 El Diagnóstico -->
  <p class="section-number">02 · El diagnóstico</p>
  ...

  <!-- CTA -->
  <a href="URL" class="cta-button">Leer número completo</a>

</main>
```

### Estilos inline (email compatible)
```css
/* Section numbers */
.section-number {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #C0321A;
  margin-bottom: 6px;
}

/* Títulos de sección */
.section-title {
  font-size: 13px;
  font-weight: 400;
  color: #1A1A1A;
  line-height: 1.5;
  margin-bottom: 4px;
}

/* Cuerpo */
.body-text {
  font-size: 11px;
  font-weight: 300;
  color: #555555;
  line-height: 1.55;
}

/* CTA */
.cta-button {
  display: inline-block;
  background: #1A3499;
  color: #F5F0E8;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 16px;
}
```

### Footer
```html
<footer style="background:#1A3499; padding:12px 28px;">
  <table width="100%">
    <tr>
      <td style="font-size:8px; color:rgba(245,240,232,0.35); letter-spacing:0.1em;">
        ENTRELAMPISTAS.COM
      </td>
      <td align="right" style="font-size:8px; color:rgba(245,240,232,0.25);">
        <a href="{{unsubscribe}}" style="color:inherit;">Darte de baja</a>
      </td>
    </tr>
  </table>
</footer>
```

---

## Brand Guidelines PDF

Cuando se genere el PDF de brand guidelines, debe incluir:

1. Portada: Klein deep, símbolo grande centrado, wordmark
2. El concepto del lampista: párrafo de posicionamiento visual
3. El símbolo: anatomía, variantes, reglas de reducción, usos incorrectos
4. Paleta: todos los tokens con hex, HSL, nombre y uso
5. Tipografía: type scale con ejemplos reales del proyecto
6. Combinaciones aprobadas: los 8 pares de color
7. Componentes: definition block, highlight, section label, article hover
8. Ilustraciones: estilo, paleta, las 4 piezas descritas
9. Templates: capturas de Instagram, OG, newsletter
10. Cierre: el checklist visual en una página
