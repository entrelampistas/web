---
name: frontend-craft
description: Craft de interacción (transiciones, hover, pulsación, foco, reduced-motion, alineación óptica) para la web de entrelampistas. Usa cuando generes o modifiques HTML, CSS o JS, o cuando se mencione craft, pulido, hover, transición, animación o accesibilidad. La capa visual (marca, color, tipografía, componentes, fotos) vive en el skill sistema-visual; léelo primero.
---

# Frontend craft · entrelampistas

Principios de Emil Kowalski, Jakub Krehel, Sara Soueidan, Val Head y Temani Afif, filtrados para una web editorial estática en CSS y JS puro. Describe la web de la iteración 2; nada de versiones anteriores sigue vigente. Para marca, color, tipografía, componentes y fotos, usa el skill `sistema-visual`.

## Fuente de verdad, en este orden

1. `design/docs/design-brief.md` → límites duros y componentes. Ante conflicto con este skill, manda el brief.
2. `CLAUDE.md` → decisiones posteriores al handoff.
3. `styles/tokens.css` → los únicos tokens. No inventes variables ni valores literales.
4. `styles/components.css` → los componentes ya hechos; copia sus patrones.
5. Skill `sistema-visual` → el mapa de todo lo anterior.

Este skill no copia valores: lee los archivos reales.

## Límites que no se negocian (brief §1)

- `border-radius: 0` y `box-shadow: none` en todo. Nada flota, nada se eleva.
- Un solo acento, `--acento` (verde): solo para lo propio del lector y la acción de herramienta. El hover **no** usa el acento.
- Filetes 1px `--linea`; 2px `--acento` solo en pestaña activa y barra de progreso.
- Solo Archivo y Space Mono. Cursiva solo en `.cita-autora`.
- Transiciones solo de `opacity`, `transform` y color (fondo, texto, filete). Nunca `transition: all`. Nunca `filter`, `blur`, `box-shadow` ni propiedades de layout.
- Áreas táctiles ≥ 44px. Contraste ≥ 4.5:1. Sin overflow a 320–390.

## Timing y easing (tokens reales)

```css
/* Escala: --dur-fast 120ms (hover, foco) · --dur-normal 200ms (UI) · --dur-slow 350ms (entradas) · --ease-out */
transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
transition: opacity var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out);
```

Ease-out para todo lo que aparece. Nunca `ease` genérico, nunca `linear`, nunca un número suelto.

## Hover

```css
/* fila, celda, chip, botón hueco: el fondo pasa a --papel-2 · el filete no cambia */
.fila, .celda, .chip, .btn--hueco { transition: background-color var(--dur-fast) var(--ease-out); }
a.fila:hover, a.celda:hover:not(.celda--actual), .chip:hover, .btn--hueco:hover { background: var(--papel-2); }

/* botón tinta / acento: baja un punto de opacidad, no cambia de color */
.btn--tinta:hover, .btn--acento:hover { opacity: .88; }

/* enlace en texto: el subrayado nunca desaparece; cambia de color */
.term { text-decoration: underline; text-underline-offset: 3px; transition: text-decoration-color var(--dur-fast) var(--ease-out); }
.term:hover { text-decoration-color: var(--tinta-3); }
```

Sin `translateY` en hover, sin sombra que aparezca, sin cambio de tamaño.

## Pulsación

```css
.btn:active, .icono-btn:active, .chip:active, .pestana:active { transform: scale(.98); }  /* solo en :active, nunca en :hover */
```

## Aparición de elementos (fichas, hoja, aviso)

```css
/* solo opacity + transform, distancia corta */
.aviso-flotante { opacity: 0; transform: translate(-50%, 8px); transition: opacity var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out); }
.aviso-flotante.es-visible { opacity: 1; transform: translate(-50%, 0); }
```

Desplazamiento máximo 8px. Nada de `blur`, nada de escalas grandes. Un elemento que se muestra u oculta cambia `hidden`, no anima su altura (acordeón FAQ, paradas, fichas).

## Foco y movimiento reducido (obligatorio)

```css
:focus-visible { outline: 2px solid var(--tinta); outline-offset: 2px; }   /* radio 0, siempre visible */
.sobre-tinta :focus-visible, .foto__capa:focus-visible { outline-color: var(--papel); }
:focus:not(:focus-visible) { outline: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

## Alineación óptica

- Icono junto a texto: `transform: translateY(-1px)`.
- Mono en mayúsculas (`.mono`): `letter-spacing: .08em`, 11px. Titulares grandes: `letter-spacing` negativo según `base.css`.
- Botón: texto centrado con `display: inline-flex; align-items: center`, altura fija (40 / 44 / 48), no padding asimétrico.
- Flecha `›` y `→` en mono; separan con `·`, nunca con `|`.

## Qué animar y qué no

| Sí | No |
|---|---|
| `opacity`, `transform`, `background-color`, `color`, `border-color`, `text-decoration-color` | `width`, `height`, `top/left`, `margin`, `padding`, `font-size`, `filter`, `box-shadow` |

## Errores frecuentes → correcto

| Error | Correcto |
|---|---|
| `transition: all .3s ease` | `transition: background-color var(--dur-fast) var(--ease-out)` |
| `color: #2EBD5E` o cualquier hex fuera de `tokens.css` | `color: var(--acento)` |
| `box-shadow: 0 4px 20px …` en hover | fondo `--papel-2` o `opacity: .88` |
| `border-radius: 4px` | `border-radius: 0` |
| `translateY(-2px)` en hover | nada en hover; `scale(.98)` en `:active` |
| Outline eliminado | `:focus-visible` siempre presente |
| Velo o degradado suelto sobre una foto | componente `.foto` y token `--velo-foto` |

## Verificación antes de dar por hecho un cambio visual

`npm run build && npm run check` (falla ante radios, sombras, `transition: all`, cursiva, hex sueltos y velos fuera de tokens), captura a 390 y 375 con Playwright, `scrollWidth` ≤ viewport, foco visible, hover con transición.

## Principio final

Si se siente como «una web con animaciones», fallaste. Si se siente como un espacio quieto y bien cuidado donde da gusto leer, acertaste.
