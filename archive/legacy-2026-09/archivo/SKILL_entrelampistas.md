---
name: entrelampistas
description: "Design system and article reading format for entrelampistas.com. Use this skill for ANY work on the Entrelampistas website: essay pages, components, navigation, article cards, or any visual element. This skill preserves the existing branding and extends it with a layered reading system for essays."
---

# Entrelampistas — Design System & Article Reading Format

## Brand

Entrelampistas is a Barcelona-based editorial project about structural thinking. The name comes from the Catalan trade of lampistes — professionals who repair plumbing, electrical, and gas systems in buildings. Applied to thought: maintaining the invisible systems of how we think, decide, and live.

**Tagline:** "Pensamiento práctico sobre la vida contemporánea."

**Voice:** Clear but not simplistic. Critical but not militant. Philosophical but grounded in the everyday. Trusts the reader. Does not over-explain. Some questions stay open on purpose. Written to last.

**Categories** (fixed set of 5):
- Interpretación del entorno
- Entrenamiento cognitivo
- Relación con la tecnología
- Filosofía de lo cotidiano
- Sistemas invisibles

---

## Design Tokens

### Colors

```css
:root {
  --paper: #FAFAF8;
  --surface: #F3F2EF;
  --surface-hover: #ECEAE6;
  --ink: #1A1A18;
  --ink-mid: #4A4A46;
  --ink-light: #8A8A85;
  --rule: #DDDDD8;
  --rule-light: #EDEDEA;
  --accent: #3D5A80;        /* structural blue — categories, labels, links */
  --accent-light: #EEF2F6;
  --accent-warm: #B87333;   /* copper — quote borders, emphasis, active states */
  --accent-warm-light: #FFF7ED;
}
```

**Rules:**
- Background: always `--paper`. Never pure white.
- Headings: `--ink`. Body text: `--ink-mid`. Metadata: `--ink-light`.
- `--accent` for UI elements: category labels, section indicators, links.
- `--accent-warm` for editorial emphasis: quote borders, key insight highlights.
- No gradients. No shadows heavier than `0 1px 3px rgba(0,0,0,0.04)`.
- No colored backgrounds for large areas. Use `--surface` for cards and callouts only.

### Typography

```css
:root {
  --serif: 'Newsreader', 'Georgia', serif;
  --sans: 'DM Sans', 'Helvetica Neue', sans-serif;
}
```

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
```

**Type scale:**

| Element | Font | Size | Weight | Line-height | Color |
|---------|------|------|--------|-------------|-------|
| Page title (h1) | --serif | clamp(32px, 5vw, 44px) | 400 | 1.15 | --ink |
| Section title (h2) | --serif | 24px | 500 | 1.3 | --ink |
| Body text | --serif | 17px | 400 | 1.7 | --ink-mid |
| Thesis text (layer 1) | --serif | 22px | 400 | 1.65 | --ink |
| Map summary | --serif | 15px | 400 | 1.6 | --ink-mid |
| Key insight (italic) | --serif italic | 15px | 400 | 1.55 | --ink |
| Category label | --sans | 11px | 500 | 1 | --accent |
| Section number | --sans | 12px | 600 | 1 | varies |
| Metadata | --sans | 12px | 400 | 1 | --ink-light |
| Nav logo | --sans | 14px | 600 | 1 | --ink |
| Concept tags | --sans | 12px | 400 | 1 | --ink-mid |
| Button text | --sans | 13px | 600 | 1 | --paper on dark bg |
| Uppercase labels | --sans | 11px | 500 | 1 | --ink-light |

**Rules:**
- Category labels: ALWAYS uppercase, letter-spacing 0.08em.
- Body text: ALWAYS --serif. Never use --sans for running text.
- Headings: --serif at weight 400-500. Never bold (700).
- Max content width: 680px for text, 720px for components.

### Spacing

- Page padding: 32px (mobile: 20px).
- Max content width: 720px, centered.
- Between major sections: 48px.
- Between paragraphs: 8px (line-height handles the rest).

### Borders & Shapes

- Cards: border-radius 6px, 1px solid var(--rule).
- Tags/pills: border-radius 100px.
- Quote left-border: 3px solid var(--accent-warm).
- No box-shadow except `0 1px 2px rgba(0,0,0,0.03)` on hover.

---

## Article Page Structure

This is the core reading experience. Every essay page follows this layout:

```
[Sticky header]
  logo left — nav right

[Hero]
  Category label (uppercase, --accent)
  Title (h1)
  Subtitle
  Metadata: author · year · read time
  ────────────────────────────────────

[Layer selector]
  "Elige tu profundidad de lectura"
  [ Tesis | Mapa | Ensayo ]

[Active layer content]
  (changes based on selection)

[Sigue leyendo]
  Related article card

[Footer]
```

---

## Layer Selector Component

The core UI innovation. Three tabs that let the reader choose their depth.

```
┌──────────────┬──────────────┬──────────────┐
│ Tesis        │ Mapa         │ Ensayo       │
│ 30s          │ 3 min        │ 10 min       │
│ La idea      │ El argumento │ Lectura      │
│ central      │ completo     │ profunda     │
└──────────────┴──────────────┴──────────────┘
```

**Structure:**
- 3 equal-width buttons in a row, 2px gap between them.
- First: border-radius 6px 0 0 6px. Last: 0 6px 6px 0.
- Each shows: label (bold) + time (light, smaller) + description (smallest).
- Above the selector: label "Elige tu profundidad de lectura" in --sans 11px uppercase --ink-light.

**States:**
- Inactive: transparent bg, 1px solid var(--rule), var(--ink-light) text.
- Active: var(--ink) bg, var(--paper) text.
- Hover (inactive): var(--surface) bg.
- Transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1).

**Behavior:**
- Default: layer 1 (Tesis) active.
- Layer selection stored in URL hash (#capa-2) for shareability.
- Content transitions: fadeUp animation, 0.6s.

---

## Layer 1: Tesis (30 seconds)

One block. The entire argument in one paragraph.

**Layout:**
- Container: var(--surface) bg, 1px solid var(--rule), border-radius 6px.
- 4px left accent bar in var(--accent).
- Padding: 48px 40px.
- Thesis text: --serif 22px/1.65, var(--ink), max-width 580px.

**Below the thesis:**
- Concept tags row: pills with 1px var(--rule) border, border-radius 100px.
- Metadata row: category · read time · year.
- CTA: "↓ Ver el mapa del argumento" in var(--accent), 12px --sans.

---

## Layer 2: Mapa (3 minutes)

A timeline that walks through the essay's argument section by section.

**Layout:**
- Vertical timeline with numbered circles (32px diameter, var(--ink) bg, var(--paper) text, --sans 12px/600).
- Connecting line: 1px solid var(--rule) between circles.

**Each section shows:**
1. Category label: uppercase --sans 11px, var(--accent).
2. Section title: --serif 18px/500.
3. Map summary: --serif 15px/1.6, var(--ink-mid), max-width 520px. 2-3 sentences.
4. Key insight block: var(--surface) bg, 3px left border var(--accent-warm), italic text.
5. Concept tags: pills with 1px border.
6. Author: "vía [Name]" in var(--ink-light).

**Animation:** Each section fades in with 0.08s stagger delay.

**After all sections:** Closing questions block with 2px left border var(--rule).

---

## Layer 3: Ensayo (full reading)

Links to the complete essay with a preview of what's inside.

**Layout:**
- Central card: icon (→ in 48px circle, var(--ink) bg), title, description, CTA button.
- CTA button: var(--ink) bg, var(--paper) text, padding 12px 28px, border-radius 6px, --sans 13px/600.
- Below: 2x2 grid showing essay contents (sections, diagrams, authors, questions).
- Each grid item: 1px solid var(--rule), border-radius 6px, --sans 13px, icon + label.

---

## Navigation Header

- Sticky, top: 0, z-index: 100.
- Before scroll: transparent bg, no border.
- After scroll (>40px): rgba(250, 250, 248, 0.92) bg, backdrop-filter blur(12px), 1px bottom border.
- Left: "entrelampistas" --sans 14px/600.
- Right: nav items --sans 13px/400. Newsletter button: 1px border, border-radius 100px, --sans 12px/500.
- Transition: all 0.3s ease.

---

## Article Card

Used in "Sigue leyendo" and archive.

- 1px solid var(--rule), border-radius 8px, padding 28px 32px.
- Hover: border-color → var(--ink-light).
- No background color (transparent on --paper).
- Category label on top (uppercase --sans 11px --accent).
- Title: --serif 20px/500.
- Description: --serif 14px/1.55 --ink-mid.
- Metadata: --sans 12px --ink-light.

---

## Quote Block

- Left border: 3px solid var(--accent-warm).
- Left padding: 20px from border.
- Text: --serif italic 17px, var(--ink-mid).
- No background. No quotation marks via CSS.

---

## Concept Tag

- --sans 12px, padding 5px 12px.
- 1px solid var(--rule), border-radius 100px.
- Color: var(--ink-mid). Background: var(--paper).

---

## SVG Diagrams

- Monochrome + one accent color. var(--ink) for structure, var(--accent) for highlight.
- Geometric, not illustrative. Architectural, not decorative.
- Text in diagrams: --sans.
- No gradients. Solid fills only.
- Must scale to 320px viewport.

---

## Animations

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- Easing: cubic-bezier(0.16, 1, 0.3, 1).
- UI changes: 0.3s. Content transitions: 0.6s.
- List stagger: 0.08s per item.
- No scale effects. No bounce. Understated always.

---

## Responsive

- Mobile (<480px): padding 20px, h1 28px, body 16px.
- Tablet (481-768px): padding 24px.
- Desktop (>768px): max-width 720px centered.

---

## Content Rules for Layer System

Every essay MUST have:

1. **Thesis** (layer 1): 2-4 sentences. The entire argument. Works standalone.
2. **Map sections** (layer 2): For each section — map summary (2-3 sentences), key insight (1-2 sentences), concepts (2-4 tags), reference author.
3. **Closing questions**: 3-4 open questions.
4. **Concept tags**: all key concepts tagged.

---

## What NOT to do

- No gradients.
- No heavy shadows.
- No emojis in editorial content.
- No bold (700) headings. Use 400-500.
- No colored backgrounds for large areas.
- No decorative illustrations or stock imagery.
- No attention-grabbing animations.
- No border-radius larger than 8px (except pills).
- No more than 2 palette colors at once.
- No text wider than 720px.
- No Inter, Roboto, Arial, or system fonts.
- No loading spinners. fadeUp only.

---

*Single source of truth for entrelampistas.com. Default to restraint. The design feels like the content: clear, quiet, structured.*
