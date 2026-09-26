# Componentes de Página — Entrelampistas

Guía para construir componentes de interfaz del sitio (headers, cards, secciones,
navegación). Para diagramas SVG de ensayos, consultar `diagram-language.md`.

---

## Principios de componentes

Los componentes de página siguen la misma filosofía que los diagramas: geometría
suave, aire generoso, profundidad con opacidad (no con sombras). DM Sans como
única fuente. La paleta de tokens es la misma.

---

## Contenedor de ensayo

```css
.essay-container {
  max-width: var(--content-width); /* 680px */
  margin: 0 auto;
  padding: 0 var(--space-6); /* 24px en mobile */
  font-family: var(--font-family);
  color: var(--color-ink);
  background: var(--color-paper);
}

@media (min-width: 728px) {
  .essay-container {
    padding: 0;
  }
}
```

---

## Contenedor de diagrama SVG

```css
.diagram-container {
  width: 100%;
  margin: var(--space-12) 0; /* 48px arriba y abajo */
}

.diagram-container svg {
  width: 100%;
  height: auto;
  display: block;
}
```

---

## Card

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-lg); /* 12px */
  padding: var(--space-6); /* 24px */
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: var(--space-3); /* 12px */
}

.card-body {
  font-size: 16px;
  line-height: 26px;
  color: var(--color-ink-mid);
}
```

No usar `box-shadow`. Si necesitas distinción visual, usar `border` o
diferencia de `background`.

---

## Sección del ensayo

```html
<section class="essay-section">
  <span class="section-number">02</span>
  <h2 class="section-title">Título de sección</h2>
  <div class="section-body">
    <p>Contenido...</p>
  </div>
</section>
```

```css
.essay-section {
  margin-top: var(--space-16); /* 64px */
}

.section-number {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: var(--space-2); /* 8px */
  letter-spacing: 0.05em;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  color: var(--color-ink);
  margin-bottom: var(--space-6); /* 24px */
  letter-spacing: -0.01em;
}

.section-body p {
  font-size: 17px;
  line-height: 28px;
  color: var(--color-ink);
  margin-bottom: var(--space-4); /* 16px */
}
```

---

## Enlace / texto accent

```css
a, .accent-text {
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(61, 90, 128, 0.3);
  transition: border-color 0.2s;
}

a:hover, .accent-text:hover {
  border-bottom-color: var(--color-accent);
}
```

---

## Separador

```css
.divider {
  border: none;
  border-top: 1px solid var(--color-rule);
  margin: var(--space-10) 0; /* 40px */
}
```

No usar `<table>` ni rectángulos SVG como separadores.

---

## Cita / blockquote

```css
blockquote {
  border-left: 2px solid var(--color-accent);
  padding-left: var(--space-4); /* 16px */
  margin: var(--space-6) 0;
  color: var(--color-ink-mid);
  font-style: italic;
}
```

---

## Tag / badge

```css
.tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: var(--space-1) var(--space-2); /* 4px 8px */
  border-radius: var(--radius-sm); /* 6px */
  background: rgba(61, 90, 128, 0.08);
  color: var(--color-accent);
}

.tag--warm {
  background: rgba(184, 115, 51, 0.08);
  color: var(--color-accent-warm);
}
```

---

## Reglas generales para componentes

- No usar `box-shadow` en ningún componente.
- No usar `border-radius` mayor de 16px (no `rounded-full` excepto en nodos/avatares).
- Transitions: solo `color`, `border-color`, `opacity`. Duración 0.2s.
- No usar transforms para hover states (no `scale`, no `translateY`).
- Background siempre `paper` o `surface`. Nunca otros colores como fondo de sección.
- Los componentes son contenedores para texto DM Sans. No hay decoraciones
  adicionales (no ornamentos, no iconos decorativos, no líneas diagonales).
