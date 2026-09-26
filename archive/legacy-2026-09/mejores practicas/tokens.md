# Design Tokens — Entrelampistas

## Paleta de color

### Fondos y superficies
| Token     | Hex       | CSS Variable        | Uso                          |
|-----------|-----------|---------------------|------------------------------|
| paper     | `#FAFAF8` | `--color-paper`     | Fondo principal de página    |
| surface   | `#F3F2EF` | `--color-surface`   | Áreas, fills de zonas, cards |

### Acentos
| Token       | Hex       | CSS Variable          | Significado semántico           |
|-------------|-----------|-----------------------|---------------------------------|
| accent      | `#3D5A80` | `--color-accent`      | Sistema, estructura, lo digital |
| accent-warm | `#B87333` | `--color-accent-warm` | Lo humano, atención, individuo  |

### Escala de opacidad (accent #3D5A80)
| Variante | Opacidad | rgba                        | Uso típico                    |
|----------|----------|-----------------------------|-------------------------------|
| accent-8 | 0.08     | `rgba(61, 90, 128, 0.08)`  | Halos de nodos, fills sutiles |
| accent-15| 0.15     | `rgba(61, 90, 128, 0.15)`  | Conectores genealógicos       |
| accent-30| 0.30     | `rgba(61, 90, 128, 0.30)`  | Bordes de nodos sutiles       |
| accent-60| 0.60     | `rgba(61, 90, 128, 0.60)`  | Líneas conectoras principales |
| accent   | 1.00     | `#3D5A80`                   | Nodos sólidos, texto accent   |

### Escala de opacidad (accent-warm #B87333)
| Variante | Opacidad | rgba                         | Uso típico                  |
|----------|----------|------------------------------|-----------------------------|
| warm-8   | 0.08     | `rgba(184, 115, 51, 0.08)`  | Halos cobre                 |
| warm-15  | 0.15     | `rgba(184, 115, 51, 0.15)`  | Conectores sutiles          |
| warm-30  | 0.30     | `rgba(184, 115, 51, 0.30)`  | Bordes sutiles              |
| warm-60  | 0.60     | `rgba(184, 115, 51, 0.60)`  | Líneas conectoras           |
| warm     | 1.00     | `#B87333`                    | Nodos cobre sólidos         |

### Tintas (texto y trazos)
| Token     | Hex       | CSS Variable        | Uso                                     |
|-----------|-----------|---------------------|-----------------------------------------|
| ink       | `#1A1A18` | `--color-ink`       | Texto principal, headings, trazos fuertes |
| ink-mid   | `#4A4A46` | `--color-ink-mid`   | Texto secundario, etiquetas SVG         |
| ink-light | `#8A8A85` | `--color-ink-light` | Texto terciario, pies, datos            |
| rule      | `#DDDDD8` | `--color-rule`      | Líneas, separadores, bordes sutiles     |

---

## Tipografía

### Familia
DM Sans — única fuente del proyecto. Se carga via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

### Escala tipográfica
| Nivel           | Size  | Weight | Line-height | Letter-spacing | Color      |
|-----------------|-------|--------|-------------|----------------|------------|
| h1 (ensayo)     | 36px  | 700    | 44px        | -0.02em        | ink        |
| h2 (sección)    | 28px  | 700    | 36px        | -0.01em        | ink        |
| h3 (subsección) | 22px  | 600    | 30px        | 0              | ink        |
| body            | 17px  | 400    | 28px        | 0              | ink        |
| body-small      | 15px  | 400    | 24px        | 0              | ink-mid    |
| label-svg       | 13px  | 500    | 18px        | 0.01em         | ink-mid    |
| caption-svg     | 12px  | 400    | 16px        | 0.01em         | ink-light  |
| data            | 12px  | 500    | 16px        | 0.02em         | ink-light  |

### Reglas tipográficas
- Todo en sentence case. Nunca ALL CAPS.
- Dentro de SVGs: `font-family="DM Sans, sans-serif"`.
- Los textos en SVG usan `label-svg` (13px/500) para etiquetas y `caption-svg` (12px/400) para pies.
- En SVG, alinear texto con `text-anchor="start"` por defecto. Usar `"middle"` solo cuando el centrado sea semánticamente correcto (ej: etiqueta centrada sobre un eje).

---

## Espaciado

### Escala base: 4px
| Token    | Valor | Uso típico                                |
|----------|-------|-------------------------------------------|
| space-1  | 4px   | Separación mínima entre elementos inline  |
| space-2  | 8px   | Padding interno en badges, tags           |
| space-3  | 12px  | Separación texto-forma en SVG (MÍNIMO)    |
| space-4  | 16px  | Padding en cards, gap entre elementos     |
| space-6  | 24px  | Separación entre secciones dentro de card |
| space-8  | 32px  | Margen entre componentes                  |
| space-10 | 40px  | Separación entre secciones de contenido   |
| space-12 | 48px  | Margen vertical de diagramas SVG          |
| space-16 | 64px  | Separación entre grandes secciones        |
| space-20 | 80px  | Padding vertical de hero/header           |

### Reglas de espaciado
- En SVGs: mínimo `space-3` (12px) entre texto y cualquier forma.
- Margin vertical de diagramas: `space-12` (48px) arriba y abajo.
- Padding interno de rectángulos SVG: mínimo `space-4` (16px) desde el borde al contenido.

---

## Dimensiones

### Layout de ensayo
| Propiedad            | Valor   |
|----------------------|---------|
| Ancho contenido      | 680px   |
| Ancho máximo página  | 100%    |
| Padding horizontal   | 24px (mobile) / 0 (desktop centrado) |

### SVG
| Propiedad         | Valor                              |
|-------------------|------------------------------------|
| viewBox width     | 680                                |
| viewBox height    | Proporcional al contenido          |
| width attr        | `"100%"`                           |
| Ancho mínimo útil | 320px (mobile)                     |

### Nodos
| Tipo           | Radio | Halo radio | Halo opacidad |
|----------------|-------|------------|---------------|
| Estándar       | 4px   | —          | —             |
| Con halo       | 4px   | 12px       | 0.08          |
| Pequeño        | 3px   | 9px        | 0.08          |
| Grande/enfasis | 5px   | 15px       | 0.08          |

### Rectángulos
| Tipo        | rx     | Stroke width | Fill opacity | Stroke opacity |
|-------------|--------|--------------|--------------|----------------|
| Pequeño     | 6-8    | 0.5px        | 0.06-0.08    | 0.3-0.4        |
| Mediano     | 8-12   | 0.75px       | 0.06-0.10    | 0.4            |
| Grande      | 12-16  | 0.75-1px     | 0.06-0.12    | 0.4-0.5        |
| Punteado    | 12-16  | 0.75px       | 0 (sin fill) | 0.4            |

### Líneas conectoras
| Propiedad      | Valor              |
|----------------|--------------------|
| Tipo           | Cubic bezier (C)   |
| Grosor         | 0.5-1px            |
| Color          | Color del nodo origen |
| Opacidad       | 0.4-0.6            |

---

## CSS Variables (para componentes de página)

```css
:root {
  /* Colores */
  --color-paper: #FAFAF8;
  --color-surface: #F3F2EF;
  --color-accent: #3D5A80;
  --color-accent-warm: #B87333;
  --color-ink: #1A1A18;
  --color-ink-mid: #4A4A46;
  --color-ink-light: #8A8A85;
  --color-rule: #DDDDD8;

  /* Tipografía */
  --font-family: 'DM Sans', sans-serif;

  /* Espaciado */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* Border radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Ancho contenido */
  --content-width: 680px;
}
```
