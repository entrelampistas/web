# Componentes de Pagina — Entrelampistas

Para componentes de interfaz del sitio. Para diagramas SVG -> `diagram-language.md`.

## Contenedor de diagrama SVG
```css
.il-essay {
  display: block;
  max-width: 680px;
  width: 100%;
  margin: var(--space-2xl) auto;
}
```

## Contenedor de ensayo
```css
article {
  max-width: 48rem;
  margin: 0 auto;
  font-family: var(--font);
  color: var(--ink);
  background: var(--paper);
}
```

## Card (pub-card)
```css
.pub-card {
  background: var(--surface);
  border-left: 3px solid var(--territory-color);
  padding: var(--space-xl) var(--space-lg);
  transition: border-left-width 0.2s var(--ease-out);
}
.pub-card:hover { border-left-width: 5px; }
```

## Seccion del ensayo
```css
.section-transition {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0 48px;
}
.section-marker {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--klein-deep);
  color: var(--paper);
  font-size: 0.8rem; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}
```

## Pull quote
```css
.pull-quote {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 400;
  line-height: 1.7;
  color: var(--ink);
  margin: 48px 0;
  padding-left: 24px;
  border-left: 3px solid var(--rojo);
}
```

## Callout
```css
.callout {
  border: 0.5px solid var(--border);
  padding: var(--space-lg);
  margin: var(--space-xl) 0;
  border-radius: var(--radius-md);
  background: var(--surface);
}
```

## Data callout
```css
.data-callout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-lg);
  padding: var(--space-lg) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin: var(--space-xl) 0;
}
.data-num {
  font-size: 2.2rem; font-weight: 700;
  color: var(--klein-deep); line-height: 1;
}
```

## Concept tag
```css
.concept-tag {
  font-size: 0.65rem; font-weight: 400;
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 100px;
  color: var(--ink-mid);
  background: var(--paper);
}
.concept-tag:hover {
  border-color: var(--klein-vibrant);
  color: var(--klein-deep);
  background: var(--klein-tint);
}
```

## Essay pause
```css
.essay-pause {
  padding: 48px 0;
  text-align: center;
  max-width: 28rem;
  margin: 0 auto;
}
.essay-pause p {
  font-size: 0.95rem;
  color: var(--ink-light);
  font-weight: 300;
}
```

## Reglas generales
- No box-shadow en componentes (excepto share-dock).
- Transitions: solo color, border-color, opacity, transform. Duracion 0.2s.
- Background siempre paper o surface.
- Border-radius maximo: var(--radius-lg) = 0.75rem.
