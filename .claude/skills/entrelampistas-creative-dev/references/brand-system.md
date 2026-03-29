# Entrelampistas — Brand System Reference

Complete design tokens and component specifications for entrelampistas.com.
This is the single source of truth. When in doubt, this file decides.

---

## 1. Color system

### Foundation (always present, never change)

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `--color-klein` | Klein | #3D5BA9 | Institutional. Definition cards, section numbers, nav accents. NEVER inside diagrams. |
| `--color-papel` | Papel | #F5F0E8 | Background. Warm off-white. The ground everything sits on. Never pure #FFF. |
| `--color-tinta` | Tinta | #2C2C2A | Text. Warm lamp black. Never pure #000. |
| `--color-gris` | Gris medio | #888780 | Secondary text. Metadata, captions, phonetic transcription. |
| `--color-gris-light` | Gris claro | #D3D1C7 | Borders, dividers, subtle lines. |

### Tintas de trabajo (work inks — for diagrams, editorial, illustration)

Each ink has 5 stops: 50 (lightest fill), 300 (light), 600 (reference/primary), 800 (dark/text on light), 900 (darkest).

#### Vermellón — tension, capture, urgency, what breaks
Origin: Constructivist poster pigment. Red-orange of ink on paper.
```css
--vermellon-50: #F5D5CF;
--vermellon-300: #E8947E;
--vermellon-600: #C23B22;
--vermellon-800: #8B2215;
--vermellon-900: #4A110B;
```

#### Ocre — attention, process, illumination, discovery
Origin: Bauhaus earth. Kandinsky's warmth. Oldest human pigment.
```css
--ocre-50: #F7EDCE;
--ocre-300: #E8C95E;
--ocre-600: #C49B2A;
--ocre-800: #7A5F15;
--ocre-900: #3D2F0A;
```

#### Prusiano — what sustains, solutions, habitability, deliberation
Origin: Prussian blue ink. Blueprints, Neurath technical diagrams.
```css
--prusiano-50: #D4E4E9;
--prusiano-300: #7AACBA;
--prusiano-600: #1B6B7A;
--prusiano-800: #0F404A;
--prusiano-900: #072228;
```

#### Terracota — architecture, the physical, urbanism, the tangible
Origin: Fired clay. Barcelona, Eixample, urban concrete.
```css
--terracota-50: #F2E0D5;
--terracota-300: #D4997A;
--terracota-600: #A0522D;
--terracota-800: #6B351C;
--terracota-900: #381B0E;
```

#### Oliva — the organic, ecosystems, growth, what endures
Origin: Topographic map green. Nature in the city. Moss between tiles.
```css
--oliva-50: #E8ECDA;
--oliva-300: #A8B87A;
--oliva-600: #5B6F2F;
--oliva-800: #3A4A1E;
--oliva-900: #1E260F;
```

#### Pizarra — infrastructure, protocols, context, the invisible base
Origin: School slate, reinforced concrete, lead type.
```css
--pizarra-50: #E6E7EA;
--pizarra-300: #A4A8B0;
--pizarra-600: #5A6068;
--pizarra-800: #3A3E44;
--pizarra-900: #1E2124;
```

#### Siena — the human, experience, the personal, warmth
Origin: Burnt sienna earth. Fresco pigment, skin, old wood.
```css
--siena-50: #F0DDD0;
--siena-300: #D4A07A;
--siena-600: #A66332;
--siena-800: #6E3F1E;
--siena-900: #38200F;
```

#### Índigo — cognition, mental autonomy, interiority, depth
Origin: Night ink blue-violet. Introspection. Deeper than Klein.
```css
--indigo-50: #DDDEED;
--indigo-300: #9A9DC8;
--indigo-600: #3E4580;
--indigo-800: #272B52;
--indigo-900: #141729;
```

### Color rules

1. **Max 3 inks per piece** + Pizarra as neutral. More dilutes meaning.
2. **Color encodes meaning**, not sequence. Vermellón always = tension. Prusiano always = sustain.
3. **Klein is institutional**, not informative. Never inside a diagram.
4. **Everything on Papel.** Inks are designed to work on this warm background.
5. **Text on colored backgrounds:** Use 800 or 900 stop from same ink family. Never generic black.
6. **Essay color pairs are prescriptive:**
   - Habitabilidad Digital → Prusiano + Vermellón
   - El mapa de nuestras decisiones → Índigo + Ocre
   - Economía de lo cotidiano → Pizarra + Siena
   - (Future) La ciudad como interfaz → Terracota + Oliva
   - (Future) El precio de lo gratuito → Vermellón + Ocre
   - (Future) Habitar entre algoritmos → Prusiano + Índigo

### CSS custom properties block

```css
:root {
  /* Foundation */
  --color-klein: #3D5BA9;
  --color-papel: #F5F0E8;
  --color-tinta: #2C2C2A;
  --color-gris: #888780;
  --color-gris-light: #D3D1C7;

  /* Vermellón */
  --vermellon-50: #F5D5CF;
  --vermellon-300: #E8947E;
  --vermellon-600: #C23B22;
  --vermellon-800: #8B2215;
  --vermellon-900: #4A110B;

  /* Ocre */
  --ocre-50: #F7EDCE;
  --ocre-300: #E8C95E;
  --ocre-600: #C49B2A;
  --ocre-800: #7A5F15;
  --ocre-900: #3D2F0A;

  /* Prusiano */
  --prusiano-50: #D4E4E9;
  --prusiano-300: #7AACBA;
  --prusiano-600: #1B6B7A;
  --prusiano-800: #0F404A;
  --prusiano-900: #072228;

  /* Terracota */
  --terracota-50: #F2E0D5;
  --terracota-300: #D4997A;
  --terracota-600: #A0522D;
  --terracota-800: #6B351C;
  --terracota-900: #381B0E;

  /* Oliva */
  --oliva-50: #E8ECDA;
  --oliva-300: #A8B87A;
  --oliva-600: #5B6F2F;
  --oliva-800: #3A4A1E;
  --oliva-900: #1E260F;

  /* Pizarra */
  --pizarra-50: #E6E7EA;
  --pizarra-300: #A4A8B0;
  --pizarra-600: #5A6068;
  --pizarra-800: #3A3E44;
  --pizarra-900: #1E2124;

  /* Siena */
  --siena-50: #F0DDD0;
  --siena-300: #D4A07A;
  --siena-600: #A66332;
  --siena-800: #6E3F1E;
  --siena-900: #38200F;

  /* Índigo */
  --indigo-50: #DDDEED;
  --indigo-300: #9A9DC8;
  --indigo-600: #3E4580;
  --indigo-800: #272B52;
  --indigo-900: #141729;

  /* Typography */
  --font-voice: 'Newsreader', Georgia, serif;
  --font-structure: 'Space Grotesk', system-ui, sans-serif;

  /* Spacing */
  --content-width: 680px;
  --spacing-section: 120px;
  --spacing-block: 48px;
  --spacing-element: 24px;
}
```

---

## 2. Typography system

### Families

| Family | Token | Role | Weights |
|--------|-------|------|---------|
| Newsreader | `--font-voice` | The voice. Body text, quotes, definitions, phonetic transcription. | Regular 400, Italic 400 |
| Space Grotesk | `--font-structure` | The structure. Titles, nav, UI, diagram labels, metadata. | Light 300, Medium 500, Bold 700 |

### Hierarchy table

| Element | Family | Weight | Size (desktop) | Size (mobile) | Color | Notes |
|---------|--------|--------|----------------|---------------|-------|-------|
| Essay title | Space Grotesk | Bold 700 | 36–48px | 28–32px | Tinta | Largest element. Strong. |
| Section number | Space Grotesk | Light 300 | 48–72px | 36–48px | Klein | Inside circle. Brand signature. |
| Section subtitle | Space Grotesk | Medium 500 | 22–24px | 18–20px | Tinta | Below the number. |
| Body text | Newsreader | Regular 400 | 18–20px | 16–18px | Tinta | line-height: 1.6–1.7. Max 680px. |
| Blockquote | Newsreader | Italic 400 | 20–22px | 18–20px | Pizarra 600 | Left border Klein. Extra breathing room. |
| Transition question | Newsreader | Italic 400 | 22–24px | 18–20px | Pizarra 600 | Centered. Max emphasis through space. |
| Concept key (tag) | Space Grotesk | Medium 500 | 12–14px | 11–12px | essay color pair | Uppercase, letter-spacing: 0.05em |
| Phonetic transcription | Newsreader | Italic 400 | 16–18px | 14–16px | Gris | Always the same everywhere. |
| Metadata (date, time) | Space Grotesk | Regular 400 | 14px | 12px | Gris | Never competes. |
| Navigation | Space Grotesk | Medium 500 | 14–16px | 14px | Tinta | Letter-spacing: 0.03em |
| SVG diagram label | Space Grotesk | Medium 500 | 12–14px | — | Depends on context | Inside SVG viewBox |
| SVG diagram annotation | Newsreader | Italic 400 | 12px | — | Gris/Pizarra | Interpretive notes in diagrams |

### Rules
- Never use any font besides these two families.
- Body text line length: 60–75 characters (enforced by max-width: 680px).
- Heading spacing: always more space above than below (anchors the eye to what follows).
- The phonetic transcription `[ɛ̃tɾə·lamˈpistas]` is always Newsreader italic, always the same size, everywhere.

---

## 3. Component specifications

### 3.1 Section number circle

The signature brand element. A number inside a circle that anchors each essay section.

```html
<div class="section-anchor">
  <span class="section-number">01</span>
  <span class="section-label">ENTORNO</span>
</div>
```

```css
.section-anchor {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin: var(--spacing-section) 0 var(--spacing-block);
}
.section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1.5px solid var(--color-klein);
  font-family: var(--font-structure);
  font-weight: 300;
  font-size: 22px;
  color: var(--color-klein);
}
.section-label {
  font-family: var(--font-structure);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gris);
}
```

### 3.2 Blockquote

```css
blockquote {
  font-family: var(--font-voice);
  font-style: italic;
  font-size: 20px;
  line-height: 1.6;
  color: var(--pizarra-600);
  border-left: 2px solid var(--color-klein);
  padding-left: 24px;
  margin: var(--spacing-block) 0;
}
```

### 3.3 Transition question

Questions between essay sections. Centered, generous breathing room.

```css
.transition-question {
  font-family: var(--font-voice);
  font-style: italic;
  font-size: 22px;
  line-height: 1.5;
  color: var(--pizarra-600);
  text-align: center;
  margin: 80px auto;
  max-width: 520px;
}
```

### 3.4 Concept definition card

The blue Klein card with phonetic transcription and numbered definitions. THE strongest brand piece.

```css
.definition-card {
  background: var(--color-klein);
  color: #E8EBF5;
  padding: 40px 36px;
  border-radius: 8px;
  margin: var(--spacing-block) 0;
}
.definition-card .word {
  font-family: var(--font-voice);
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 4px;
}
.definition-card .phonetic {
  font-family: var(--font-voice);
  font-style: italic;
  font-size: 16px;
  opacity: 0.7;
  margin-bottom: 24px;
}
.definition-card .meaning {
  font-family: var(--font-voice);
  font-style: italic;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 12px;
}
.definition-card .meaning-number {
  color: rgba(255,255,255,0.5);
  font-style: normal;
  margin-right: 8px;
}
```

### 3.5 Open questions block (end of essay)

```css
.open-questions {
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.open-question {
  font-family: var(--font-voice);
  font-style: italic;
  font-size: 20px;
  line-height: 1.5;
  color: var(--color-tinta);
  padding-left: 24px;
  border-left: 2px solid var(--color-klein);
}
```

### 3.6 Essay card (for home page, archive)

Each essay card shows its assigned color pair as a subtle accent.

```css
.essay-card {
  padding: 24px 0;
  border-bottom: 1px solid var(--color-gris-light);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.essay-card .color-accent {
  width: 4px;
  height: 100%;
  min-height: 60px;
  border-radius: 2px;
  /* Set per-essay: background: var(--prusiano-600); */
}
.essay-card .number {
  font-family: var(--font-structure);
  font-weight: 300;
  font-size: 18px;
  color: var(--color-klein);
  min-width: 28px;
}
.essay-card .title {
  font-family: var(--font-structure);
  font-weight: 700;
  font-size: 20px;
  color: var(--color-tinta);
  margin-bottom: 4px;
}
.essay-card .excerpt {
  font-family: var(--font-voice);
  font-size: 16px;
  color: var(--color-gris);
  line-height: 1.5;
}
.essay-card .meta {
  font-family: var(--font-structure);
  font-size: 13px;
  color: var(--color-gris);
  margin-top: 8px;
}
```

### 3.7 Concept index card

```css
.concept-card {
  padding: 16px 0 16px 16px;
  border-left: 3px solid; /* color from semantic ink */
  margin-bottom: 16px;
}
.concept-card .name {
  font-family: var(--font-structure);
  font-weight: 500;
  font-size: 18px;
  color: var(--color-tinta);
}
.concept-card .definition {
  font-family: var(--font-voice);
  font-size: 16px;
  color: var(--color-gris);
  margin-top: 4px;
}
.concept-card .related {
  font-family: var(--font-structure);
  font-size: 12px;
  color: var(--color-gris);
  margin-top: 8px;
}
```

Semantic ink mapping for concepts:
- Economía de la atención → Vermellón
- Sistema 1 y Sistema 2 → Índigo
- Enshittification → Vermellón
- Habitabilidad digital → Prusiano
- Autonomía cognitiva → Índigo
- Pensamiento de mantenimiento → Prusiano
- Ruido económico → Ocre

### 3.8 Footer (unified across all pages)

```html
<footer class="site-footer">
  <div class="footer-cta">
    <p class="footer-cta-text">Pensamiento de mantenimiento en tu correo.</p>
    <a href="/newsletter" class="footer-cta-link">Suscribirme</a>
  </div>
  <div class="footer-divider"></div>
  <div class="footer-brand">
    <span class="footer-name">entrelampistas</span>
    <span class="footer-phonetic">[ɛ̃tɾə·lamˈpistas]</span>
  </div>
  <nav class="footer-nav">
    <a href="/sobre">Sobre</a>
    <a href="/archivo">Archivo</a>
    <a href="/conceptos">Conceptos</a>
    <a href="/newsletter">Newsletter</a>
    <a href="mailto:entrelampistas@protonmail.com">Contacto</a>
  </nav>
  <p class="footer-tagline">Pensamiento de mantenimiento · Barcelona · 2026</p>
</footer>
```

### 3.9 OG card template (1200x630px)

- Background: Klein (#3D5BA9)
- Title: Space Grotesk Bold, white, max 2 lines
- Subtitle: Newsreader Italic, white at 70% opacity
- Bottom left: "entrelampistas" wordmark + phonetic
- Bottom right: essay color pair as two small squares (20x20px each)
- No images, no decorations. Typography only.

### 3.10 Reference / bibliography item

```css
.reference-item {
  margin-bottom: 20px;
}
.reference-item .author {
  font-family: var(--font-structure);
  font-weight: 500;
  font-size: 15px;
  color: var(--color-tinta);
}
.reference-item .work {
  font-family: var(--font-voice);
  font-style: italic;
  font-size: 15px;
  color: var(--color-tinta);
}
.reference-item .description {
  font-family: var(--font-voice);
  font-size: 14px;
  color: var(--color-gris);
  margin-top: 2px;
}
```

---

## 4. SVG diagram standards

### Setup for all diagrams
- ViewBox width: 680 (matches content width 1:1)
- Height: tight to content + 40px buffer
- Background: transparent (Papel comes from page)
- Font families embedded: Space Grotesk for labels, Newsreader for annotations
- Max 3 ink colors per diagram + Pizarra as neutral
- Interactive elements: cursor pointer, subtle opacity change on hover

### Text rules in SVG
- Labels: Space Grotesk Medium 500, 14px
- Subtitles/descriptions: Space Grotesk Regular 400, 12px
- Annotations: Newsreader Italic, 12px
- All text must have explicit fill color (never inherit)
- text-anchor="middle" + dominant-baseline="central" for centered text

### Stroke rules
- 0.5px for borders and edges (refined, not heavy)
- 1.5px for arrow connectors
- Arrow marker: open chevron, context-stroke

### Diagram types
1. **Argument strata** — horizontal layers showing essay structure
2. **Tension map** — opposing forces with directional arrows
3. **Concept timeline** — evolution of an idea
4. **Relationship web** — non-linear connections between concepts
5. **Spectrum/scale** — gradients between extremes

---

## 5. Page-specific rules

### Essay page
- Sticky section nav on left (desktop) with circled numbers
- Reading progress indicator (subtle top bar)
- Layer selector (Tesis / Mapa / Ensayo) at the top
- SVG diagrams inline between text sections
- Transition questions centered between sections
- Open questions block before references
- FAQ section with schema markup at the end

### Concept page
- Definition as Klein card at the top
- Body text below
- Related concepts as tag pills
- Final question as highlighted component
- Links to related essays

### Home page
- Strong typographic hero (not image-based)
- 3 latest essays as cards with color pair accents
- Definition block
- Newsletter CTA

### Archive page (TO BUILD)
- Chronological list of all essays + notes
- Filterable by thematic axis (4 axes)
- Each entry shows its color pair

### Newsletter page (TO REBUILD)
- Value proposition clear: what you get, how often
- Example of a past newsletter
- The definition block as emotional anchor
- Single email input + subscribe
