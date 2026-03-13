---
name: frontend-craft
description: Craft frontend con CSS moderno para plataforma editorial. Usa cuando generes o modifiques HTML, CSS o JS, incluyendo hover states, transiciones, animaciones, focus states, responsive design, o accesibilidad. Tambien cuando el usuario mencione craft, polish, hover, transicion, animacion, o accesibilidad. Lee references/tokens.css para variables exactas y references/components.css para patrones de componentes.
---

# Frontend Craft — Entrelampistas

Principios de Emil Kowalski, Jakub Krehel, Sara Soueidan, Val Head, Temani Afif. Filtrados para plataforma editorial estática CSS/JS puro. Lee references/ para los valores exactos — no improvises.

## Patrones de timing y easing

```css
/* SIEMPRE usa estas variables. Nunca valores literales. */
transition: background-color var(--duration-fast) var(--ease-out);   /* hover, focus */
transition: box-shadow var(--duration-normal) var(--ease-out);        /* cards */
transition: opacity var(--duration-slow) var(--ease-out-expo);        /* entradas */
```

Escala: fast=120ms (hover/focus) · normal=200ms (UI) · slow=350ms (entradas) · page=500ms.
Ease-out para entradas. Ease-in para salidas. Nunca `ease` genérico. Nunca `linear`.

## Patron hover — links

```css
a {
  text-decoration: underline;
  text-decoration-color: var(--border);
  text-underline-offset: 0.2em;
  transition: color var(--duration-fast) var(--ease-out),
              text-decoration-color var(--duration-fast) var(--ease-out);
}
a:hover {
  color: var(--klein-vibrant);
  text-decoration-color: var(--klein-vibrant);
}
/* El underline NUNCA desaparece. Cambia de color. */
```

## Patron hover — cards

```css
.card {
  transition: box-shadow var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out);
  will-change: transform, box-shadow;
}
.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px); /* maximo -2px. mas es error. */
}
```

## Patron hover — botones

```css
.btn {
  transition: background-color var(--duration-fast) var(--ease-out),
              transform 80ms var(--ease-spring);
}
.btn:hover { background-color: var(--klein-vibrant); }
.btn:active { transform: scale(0.98); } /* scale en :active, no en :hover */
```

## Patron entrada de elementos

```css
.page-enter {
  opacity: 0;
  transform: translateY(8px); /* 4-12px maximo. Nunca 30px+. */
  filter: blur(2px);
}
.page-enter.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
  transition:
    opacity var(--duration-page) var(--ease-out-expo),
    transform var(--duration-page) var(--ease-out-expo),
    filter var(--duration-page) var(--ease-out-expo);
}
```

## Accesibilidad (obligatorio siempre)

```css
:focus-visible {
  outline: 2px solid var(--klein-vibrant);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
:focus:not(:focus-visible) { outline: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Alineacion optica

- Iconos junto a texto: `transform: translateY(-1px)` para centrado óptico real.
- Botones: `padding: 0.65rem 1.25rem 0.75rem` (top < bottom → texto centrado visualmente).
- Headlines grandes: `letter-spacing: -0.02em`.
- Labels uppercase pequeños: `letter-spacing: 0.12em`.
- Sombras: Y positivo, opacidad < 0.1. Nunca `box-shadow: 0 0 20px`.

## Que animar / que NO

✅ opacity, transform, filter, box-shadow, border-color, background-color
❌ width, height, top, left, right, bottom, margin, padding, font-size → causan reflow

## Errores comunes

| Error | Correcto |
|---|---|
| `transition: all 0.3s ease` | `transition: background-color var(--duration-fast) var(--ease-out)` |
| `color: #2a3eb1` | `color: var(--klein-deep)` |
| `transform: translateY(-6px)` en hover | `transform: translateY(-2px)` máximo |
| Outline eliminado | `:focus-visible` siempre presente |
| `will-change: transform` en todo | Solo en elementos que se animan |

## Cuando necesites mas detalle

- `references/tokens.css` → todas las variables CSS exactas
- `references/components.css` → componentes con craft aplicado, copia estos patrones
- `references/seed-components.html` → HTML semilla con clases correctas

**Importante:** Los archivos en `references/` son copias de `styles/tokens.css`, `styles/components.css` y `src/components/seed-components.html`. Si se actualizan los originales, sincroniza las copias.

## Principio final

Si el resultado se siente como "una web con animaciones", fallaste.
Si se siente como "un espacio bien cuidado donde da gusto estar", acertaste.
