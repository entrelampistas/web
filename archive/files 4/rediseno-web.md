# Brief — Rediseño Web Entrelampistas

> Antes de empezar: lee `00-vision.md` y
> `.claude/skills/entrelampistas-design-system/SKILL.md`
> Toma screenshots después de cada cambio visual significativo.

---

## El objetivo

Llevar el sitio actual al nivel de una publicación editorial digital europea
de primer nivel. La referencia de calidad: si alguien lo ve por primera vez,
en 3 segundos sabe que es algo serio, distinto y con carácter propio.

No es un rediseño from scratch — es una elevación.
Lo que existe ya tiene buenas bases. Lo que falta es precisión, detalle
y las piezas que faltan (ilustraciones, símbolo, sistema completo).

---

## Principios de diseño para este rediseño

**Del playbook escandinavo / Amsterdam:**
- Cada elemento justifica su presencia o desaparece
- El espacio en blanco no es vacío — es estructura
- La tipografía hace el trabajo que la imagen haría en otros proyectos
- Los detalles no son decoración — son los que separan bueno de memorable
- Simple no significa aburrido — significa claro

**Lo que significa "sharp" para Entrelampistas:**
- Alineaciones perfectas, sin píxeles fuera de grid
- Transiciones que se sienten físicas, no animadas
- Jerarquía tipográfica que funciona sin leer el contenido
- Hover states que responden como si el UI tuviera peso

**Lo que significa "casual and fun":**
- El símbolo flotante del lampista anima las páginas sin forzarlo
- Los section labels en klein-vibrant tienen ligero humor técnico
- El sliver de Klein en los bordes da personalidad sin gritar
- Las ilustraciones tienen detalle que descubres al mirar de cerca

---

## Secciones del sitio — estado y brief

### Nav

**Estado actual:** Funcional, tipografía correcta.

**Mejoras:**
- Logo: implementar el nuevo símbolo SVG inline + wordmark
- En desktop: símbolo 28px + nombre. En mobile: solo símbolo 24px
- Links de nav: weight 400, tracking 0.08em, transición a paper en hover
- Sin subrayado en nav — solo cambio de color
- Sticky con `backdrop-filter: blur(8px)` y fondo `rgba(26,52,153, 0.95)`
  cuando hay scroll (efecto glassmorphism sutil, à la Linear)
- Añadir indicador de página activa: barra roja de 2px debajo del link activo

### Hero

**Estado actual:** Texto correcto, falta apoyo visual.

**Mejoras:**
- IL-01 (La Ciudad que Piensa): implementar cuando esté ejecutada
- Mientras tanto: el sliver Klein en los bordes laterales debe ser visible
- El headline principal: máximo 8 palabras, weight 700, 2.5rem
- El subtítulo: weight 300, 1.125rem, line-height 1.65, ink-mid
- CTA principal: fondo klein-deep, texto paper, hover a klein-night
- Añadir la fonética `[ɛ̃tɾə·lamˈpistas]` en meta bajo el título — es una
  firma visual del proyecto que no aparece suficientemente

### Sección "Qué es"

**Estado actual:** Copy bueno. Sin apoyo visual.

**Mejoras:**
- IL-02 (El Lampista): float right cuando esté ejecutada
- El definition block con la palabra "entrelampistas" y su fonética:
  paper-warm bg, borde rojo izquierdo, más prominente
- Verificar que el copy usa vocabulario del lampista (revisar, inspeccionar,
  mantener — no solo describir qué somos)

### Territorios / "Qué exploramos"

**Estado actual:** Grid funcional. Falta diferenciación visual entre territorios.

**Mejoras:**
- Cada territorio con su section label en klein-vibrant (nombre del territorio)
- Hover state: left bar roja crece de 3px a 5px + título translateX(0.35rem)
- Añadir los 5 territorios (actualmente solo hay 4 — falta "Sistemas invisibles")
- IL-03 icons (a, b, c) cuando estén ejecutadas: reemplazar los SVG actuales

### Publicaciones

**Estado actual:** Dos ensayos. Grid funcional.

**Mejoras:**
- OG image de cada ensayo como thumbnail (ver `og-images.md`)
- Mientras no hay OG images: fondo klein-deep + territory label en rojo
  + título en paper, como placeholder elegante
- Añadir: tiempo de lectura, territorio, año — como metadatos bajo el título
- El hover pattern completo (left bar roja + translateX + gradient overlay)

### Posición / Manifiesto

**Estado actual:** Copy excelente. Presentación plana.

**Mejoras:**
- Dividir en párrafos más cortos con más air entre ellos
- El párrafo "El problema contemporáneo no es informativo, es cognitivo" →
  convertir en statement: peso 700, tamaño más grande, separado visualmente
- Añadir una separación visual entre "qué no somos" y "qué proponemos"

### Footer

**Estado actual:** Básico.

**Mejoras:**
- IL-04 (Mapa BCN-MAD): implementar cuando esté ejecutada
- Estructura en 3 columnas: logo+tagline | navegación | newsletter CTA
- Fondo klein-deep, texto paper/paper 40%
- Copyright en 8px, ink-light
- Separador superior: línea roja de 2px (firma visual)
- "Barcelona · Madrid" con IL-04 debajo en opacity 0.15

---

## Páginas pendientes

### /sobre
**Brief:** La página más personal del proyecto. Aquí vive el lampista.
- IL-02 flotante en la parte superior derecha
- Dos columnas en desktop: texto izquierda, símbolo + quote derecha
- El copy de "Por qué Entrelampistas" necesita la voz del lampista —
  revisar con `.claude/skills/editor-lampista/SKILL.md` antes de tocar

### /archivo
**Brief:** El jardín de ideas, no una lista de artículos.
- Filtrado por territorio (tabs o pills en klein-vibrant)
- Cada artículo: territory label en rojo + título + subtítulo + meta
- Sin imágenes de momento — la tipografía es suficiente
- Orden cronológico inverso por defecto

### /newsletter
**Brief:** La página de suscripción.
- Un solo objetivo: que Clara se suscriba
- Copy de la promesa: usar vocabulario del lampista
- Mostrar la estructura del número (las 4 secciones: fuga / diagnóstico /
  herramienta / tornillo suelto) para que sepa qué recibe
- Formulario mínimo: solo email + botón
- CTA: "Únete a quienes cuidan cómo piensan"

---

## Checklist técnico antes de considerar algo terminado

```
□ Screenshot tomado y verificado visualmente
□ Colores: solo variables CSS, sin hex sueltos
□ Tipografía: solo Neo Grotesque SC, sin serif, sin italic
□ Transiciones: usan --duration-* y --ease-*
□ Hover states: todos tienen transition
□ El sliver Klein es visible en desktop
□ Focus-visible en todos los interactivos
□ HTML semántico con roles de accesibilidad
□ Alt text en imágenes
□ Responsive: verificado en 375px, 768px, 1280px
□ prefers-reduced-motion respetado en animaciones
```

---

## Orden de trabajo recomendado

1. Implementar el nuevo símbolo SVG en el nav (desbloquea todo lo demás)
2. Pulir el hero (tipografía, espaciado, placeholder de IL-01)
3. Completar los territorios (añadir el 5to, mejorar hover states)
4. Mejorar sección publicaciones (metadatos, hover pattern completo)
5. Refactor del footer (estructura 3 columnas, separador rojo)
6. Página /sobre
7. Página /archivo con filtros por territorio
8. Página /newsletter
9. Integrar ilustraciones cuando estén ejecutadas (ver `ilustraciones.md`)
10. OG images para los ensayos existentes (ver `og-images.md`)
