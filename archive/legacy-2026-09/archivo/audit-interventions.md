# Entrelampistas — Audit Interventions

10 interventions ordered by impact/effort. Execute in this order.
Each intervention includes: what exists now, what it should become, and specific implementation notes.

---

## Intervention 01: Redesign 3 inline SVGs in "Habitabilidad Digital"

**Priority:** Maximum impact, medium effort
**Color pair:** Prusiano (#1B6B7A) + Vermellón (#C23B22)

### Current state
Three SVG diagrams exist inline in the essay HTML:
1. "El entorno construido" — concentric layers (economic incentives → algorithms → your attention)
2. "Vocabulario como herramienta" — timeline of concepts (filter bubble 2011 → enshittification 2023 → habitabilidad digital 2025)
3. "Atención continua vs capturada" — spectrum/gradient from continuity to fragmentation

All three are gray, schematic, without semantic color or interactivity.

### Target state
Each SVG becomes a **visual thesis** — readable without the surrounding text.

**SVG 1 — "El entorno construido":**
- Structural diagram with 3 nested layers
- Outermost layer: Vermellón-50 fill, "Incentivos económicos" label in Vermellón-800
- Middle layer: Pizarra-50 fill, "Algoritmos y plataformas"
- Inner core: Prusiano-50 fill, "Tu atención" — this is what's being captured
- Arrows pointing inward (from outside to core) in Vermellón-600
- The visual metaphor: layers of capture closing in on the human

**SVG 2 — "Vocabulario como herramienta":**
- Concept timeline from left to right
- X-axis: time (2011 → 2025)
- Each concept as a node with its year
- Below the timeline: a gradient bar from Pizarra-300 ("sin nombre") to Prusiano-600 ("visible")
- The metaphor: naming makes things visible

**SVG 3 — "Atención continua vs capturada":**
- Horizontal spectrum
- Left side: Prusiano ("atención continua") — calm, deliberate
- Right side: Vermellón ("atención capturada") — fragmented, reactive
- A marker or slider showing where "current design" sits (far right)
- The metaphor: the asymmetry between what sustains and what captures

### Implementation notes
- ViewBox: 680 x [height calculated per diagram]
- All text uses the SVG text classes from brand-system.md
- Interactive: nodes clickable where meaningful
- Test in light and dark mode

---

## Intervention 02: Create /archivo page (currently 404)

**Priority:** High impact, low effort — fixes a broken link in main nav

### Target state
A page listing all published content (essays + notes) in reverse chronological order.

**Structure:**
```
ARCHIVO

[Filter pills: Todos | Infraestructura social | Tecnología y poder | Habitabilidad urbana | Autonomía mental]

01  Habitabilidad digital                    10 min · 2025
    [Prusiano accent bar]
    A más de tres décadas de la web...
    
02  El mapa de nuestras decisiones           12 min · 2025
    [Índigo accent bar]
    Cómo funciona la mente cuando decide...

03  Economía de lo cotidiano                 14 min · 2025
    [Pizarra accent bar]
    La economía no es un destino...
```

**Design:**
- Filter pills: Space Grotesk Medium, 13px, border style (not filled)
- Active filter: filled with the axis color
- Each entry uses the `.essay-card` component from brand-system.md
- Color accent bar (4px wide) on the left, using the essay's assigned ink
- Number in Klein, title in Space Grotesk Bold, excerpt in Newsreader

---

## Intervention 03: Redesign /newsletter page

**Priority:** High impact, low effort — conversion page currently almost empty

### Current state
Only a title "Newsletter" + "Pensamiento de mantenimiento en tu correo" + subscribe form.

### Target state

```
NEWSLETTER

# Pensamiento de mantenimiento en tu correo

Para quienes prefieren pensar despacio.

[Definition card — Klein background]
entrelampistas
[ɛ̃tɾə·lamˈpistas] : sustantivo colectivo
1. Nombre prestado del oficio de quienes cuidan...
2. Un trabajo silencioso...
[/Definition card]

## Qué recibes

Un ensayo largo cada mes o dos meses — con el sistema de capas 
(Tesis, Mapa, Ensayo) para que elijas tu profundidad de lectura.

Notas breves de mantenimiento entre ensayos — reflexiones cortas 
sobre un solo concepto.

Tres enlaces a cosas que hemos leído y que conectan.

Una pregunta abierta al final.

## Temas que exploramos

Infraestructura social · Tecnología y poder · 
Habitabilidad urbana · Autonomía mental

[Email input] [Suscribirme]

Sin spam. Sin patrocinios. Sin urgencia artificial.
```

---

## Intervention 04: Apply ink palette to /conceptos index

**Priority:** High impact, low effort

### Current state
Flat list of concepts with description and link to related essay. No visual differentiation.

### Target state
Each concept becomes a `.concept-card` with a left border in its semantic ink color.

**Ink mapping:**
- Economía de la atención → `border-left: 3px solid var(--vermellon-600)`
- Sistema 1 y Sistema 2 → `border-left: 3px solid var(--indigo-600)`
- Enshittification → `border-left: 3px solid var(--vermellon-600)`
- Habitabilidad digital → `border-left: 3px solid var(--prusiano-600)`
- Autonomía cognitiva → `border-left: 3px solid var(--indigo-600)`
- Pensamiento de mantenimiento → `border-left: 3px solid var(--prusiano-600)`
- Ruido económico → `border-left: 3px solid var(--ocre-600)`

The "→ related essay" link should be more visible: Space Grotesk Medium, with an arrow.

---

## Intervention 05: Strengthen typographic moments in essays

**Priority:** High impact, low effort — pure CSS changes

### Changes needed

**Blockquotes:**
- Currently: default styling, gets lost in text flow
- Target: Newsreader italic 20px, color Pizarra-600, `border-left: 2px solid var(--color-klein)`, padding-left 24px, margin 48px 0

**Transition questions (between sections):**
- Currently: styled but not differentiated enough
- Target: Newsreader italic 22px, centered, color Pizarra-600, margin 80px auto, max-width 520px

**Final open questions (end of essay):**
- Currently: look like normal text with em-dash
- Target: Own component with border-left Klein, Newsreader italic 20px, each question separated with 24px gap

**References:**
- Currently: flat list
- Target: Author in Space Grotesk Medium, title in Newsreader italic, description in Gris. 20px margin between each.

**Tables:**
- Currently: generic styling
- Target: Headers in Klein background white text. Borders in Pizarra-50. Text in the table using font-size 15px.

---

## Intervention 06: Create OG card template

**Priority:** Medium impact, low effort

### Specification
- Size: 1200x630px
- Background: Klein (#3D5BA9)
- Title: Space Grotesk Bold, white, 48px, max 2 lines, left-aligned
- Subtitle/excerpt: Newsreader Italic, white at 70% opacity, 22px, max 2 lines
- Bottom left: "entrelampistas" in Space Grotesk Medium 16px + phonetic transcription below in 13px
- Bottom right: two 20x20px squares showing the essay's color pair
- Padding: 60px all sides

**Can be implemented as:**
- HTML template rendered to image via Puppeteer/Playwright
- Or SVG template converted to PNG
- Needs to be generatable per-essay with variables: title, excerpt, color1, color2

---

## Intervention 07: Systematize section number circles

**Priority:** Medium impact, low effort

### Current state
Section numbers exist but vary in size, stroke, and positioning across essays.

### Target state
One reusable component with fixed specs:
- Circle: 56px diameter, 1.5px stroke, Klein color
- Number: Space Grotesk Light 300, 22px, Klein color, centered
- Section label: Space Grotesk Medium 500, 11px, uppercase, letter-spacing 0.08em, Gris
- Vertical spacing: 120px above, 48px below
- On scroll: current section highlighted in nav (if sticky nav exists)

---

## Intervention 08: Unify footer across all pages

**Priority:** Medium impact, low effort

### Current state
Footer on essay pages differs from footer on home/about pages. Some have double newsletter CTAs.

### Target state
Single footer component used everywhere. See brand-system.md section 3.8 for full spec.

Key elements:
- One newsletter CTA (not duplicated)
- Phonetic transcription as brand signature
- "Pensamiento de mantenimiento · Barcelona · 2026"
- Nav links: Sobre, Archivo, Conceptos, Newsletter, Contacto
- Divider line: 0.5px Gris-light

---

## Intervention 09: Redesign concept individual page

**Priority:** Medium impact, medium effort

### Current state
Good structure (definition, context, analogy, related concepts, FAQ, question). But all in plain text without visual moments.

### Target state
- Opening definition as Klein definition card (same component as the brand definition)
- Body text in Newsreader with standard essay styling
- Related concepts as tag pills with their semantic ink color
- The "analogía cotidiana" section in a subtle Papel-tinted box
- Final question as `.open-question` component (border-left Klein)
- FAQ section styled consistently with essay FAQ

---

## Intervention 10: Redesign Home hero

**Priority:** High impact, medium effort

### Current state
"Pensamiento práctico sobre la vida contemporánea" + subtitle + 3 essay links. Text only, no visual moment.

### Target state
- Stronger headline. Consider: just the word "entrelampistas" very large (Space Grotesk Bold 64px) + phonetic transcription below + the tagline "Pensamiento de mantenimiento" in Newsreader italic
- The 3 essay cards using `.essay-card` component with their color pair accent bars
- The definition block below
- Newsletter CTA

The hero should feel like arriving at a place, not at a newsletter landing page.

---

## Execution sequence

For maximum velocity, group by dependency:

**Sprint 1 (CSS foundation):**
- Set up all CSS custom properties (the `:root` block from brand-system.md)
- Intervention 05 (typography moments — pure CSS)
- Intervention 08 (unify footer)
- Intervention 07 (section numbers)

**Sprint 2 (New pages):**
- Intervention 02 (create /archivo)
- Intervention 03 (redesign /newsletter)

**Sprint 3 (Visual system):**
- Intervention 01 (redesign SVGs)
- Intervention 04 (concept index inks)
- Intervention 09 (concept individual page)

**Sprint 4 (Polish):**
- Intervention 06 (OG cards)
- Intervention 10 (home hero)
