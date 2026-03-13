# Entrelampistas

Plataforma editorial de pensamiento estructural. Neo Grotesque SC. Azul Klein. Rojo colectivo. Papel calido.

## Antes de escribir codigo

1. Lee `styles/tokens.css` — variables CSS. Usa SOLO estas. No hex sueltos.
2. Lee `styles/components.css` — componentes con craft aplicado. Copia estos patrones.
3. Si necesitas un componente nuevo, mira `src/components/seed-components.html` y replica la estructura.

## Antes de escribir texto

Lee `.claude/skills/editorial-voice/SKILL.md`

## Reglas (romper cualquiera es un error)

- **Tipografia:** solo Neo Grotesque SC. Sin serif. Sin italic. Nunca.
- **Colores:** solo variables de tokens.css. `color: blue` es un error. `color: var(--klein-vibrant)` es correcto.
- **Transiciones:** solo variables de timing/easing. `transition: all 0.3s ease` es un error. `transition: background-color var(--duration-fast) var(--ease-out)` es correcto.
- **Hover states:** todos deben tener transition. Un cambio brusco sin transition es un error.
- **Botones:** :active siempre tiene `transform: scale(0.98)`.
- **Cards:** hover lift maximo `translateY(-2px)`. Mas es un error.
- **Links:** underline cambia de COLOR en hover. Nunca desaparece.
- **Animacion:** nunca animes width, height, margin, padding, top, left.

## Estructura

```
styles/tokens.css           ← Variables (colores, spacing, timing, easing)
styles/base.css             ← Reset, tipografia, accesibilidad, responsive
styles/components.css       ← Componentes con craft aplicado
styles/main.css             ← CSS actual de la landing
src/components/             ← HTML semilla de referencia
src/pages/                  ← Paginas
src/content/                ← Ensayos en Markdown
public/fonts/               ← Neo Grotesque SC
```

## Verificacion

Despues de cada cambio visual:
1. `node screenshot.mjs http://localhost:3000`
2. Verifica: colores son variables? transiciones usan --duration-*? hover states suaves?
3. Si algo no cumple, corrige antes de seguir.

## Accesibilidad (obligatorio)

- `:focus-visible` en todos los interactivos (ya esta en base.css)
- `@media (prefers-reduced-motion)` (ya esta en base.css)
- HTML semantico: `<article>`, `<nav>`, `<main>`, `<section aria-label="">`, `<header>`, `<footer>`
- Alt text en imagenes
