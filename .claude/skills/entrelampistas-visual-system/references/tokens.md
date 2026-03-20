# Design Tokens — Entrelampistas Visual System

## Paleta de color (CSS Variables del DS v3)

### Fondos y superficies
| Token   | CSS Variable     | Uso                          |
|---------|------------------|------------------------------|
| paper   | `var(--paper)`   | Fondo principal de pagina    |
| surface | `var(--surface)` | Areas, fills de zonas, cards |

### Acentos
| Token         | CSS Variable           | Significado semantico           |
|---------------|------------------------|---------------------------------|
| klein-deep    | `var(--klein-deep)`    | Sistema, estructura, lo digital |
| klein-vibrant | `var(--klein-vibrant)` | Nodos primarios, labels activos |
| rojo          | `var(--rojo)`          | Lo humano, atencion, individuo  |

### Escala de opacidad (klein-deep para sistema)
| Opacidad | Uso tipico                    |
|----------|-------------------------------|
| 0.08     | Halos de nodos, fills sutiles |
| 0.15     | Conectores genealogicos       |
| 0.30     | Bordes de nodos sutiles       |
| 0.60     | Lineas conectoras principales |
| 1.00     | Nodos solidos, texto accent   |

### Escala de opacidad (rojo para lo humano)
| Opacidad | Uso tipico                  |
|----------|-----------------------------|
| 0.08     | Halos rojo                  |
| 0.15     | Conectores sutiles          |
| 0.30     | Bordes sutiles              |
| 0.60     | Lineas conectoras           |
| 1.00     | Nodos rojo solidos          |

### Tintas (texto y trazos)
| Token     | CSS Variable       | Uso                               |
|-----------|--------------------|------------------------------------|
| ink       | `var(--ink)`       | Texto principal, trazos fuertes    |
| ink-mid   | `var(--ink-mid)`   | Texto secundario, etiquetas SVG    |
| ink-light | `var(--ink-light)` | Texto terciario, pies, datos       |
| border    | `var(--border)`    | Lineas, separadores                |

---

## Tipografia

### Familia
Space Grotesk — fuente del proyecto. Cargada como WOFF2 local.
Dentro de SVGs: `font-family="var(--font, 'Space Grotesk'), sans-serif"`.

### Escala en SVGs
| Nivel       | Size  | Weight | Color            |
|-------------|-------|--------|------------------|
| titulo-svg  | 14px  | 600    | var(--klein-deep)|
| label-svg   | 13px  | 500    | var(--ink-mid)   |
| caption-svg | 11px  | 400    | var(--ink-light) |
| data-svg    | 10px  | 500    | var(--ink-light) |

Todo en sentence case. NUNCA ALL CAPS.

---

## Espaciado

| Token    | Valor | Uso tipico                                |
|----------|-------|-------------------------------------------|
| space-3  | 12px  | Separacion texto-forma en SVG (MINIMO)    |
| space-4  | 16px  | Padding en cards, gap entre elementos     |
| space-6  | 24px  | Separacion entre secciones dentro de card |
| space-8  | 32px  | Margen entre componentes                  |
| space-12 | 48px  | Margen vertical de diagramas SVG          |

---

## Dimensiones de elementos SVG

### Nodos
| Tipo           | Radio | Halo radio | Halo opacidad |
|----------------|-------|------------|---------------|
| Estandar       | 4px   | —          | —             |
| Con halo       | 4px   | 12px       | 0.08          |
| Pequeno        | 3px   | 9px        | 0.08          |
| Grande/enfasis | 5px   | 15px       | 0.08          |

### Rectangulos
| Tipo        | rx     | Stroke width | Fill opacity | Stroke opacity |
|-------------|--------|--------------|--------------|----------------|
| Pequeno     | 6-8    | 0.5px        | 0.06-0.08    | 0.3-0.4        |
| Mediano     | 8-12   | 0.75px       | 0.06-0.10    | 0.4            |
| Grande      | 12-16  | 0.75-1px     | 0.06-0.12    | 0.4-0.5        |

### viewBox estandar
Ancho: 680px. Altura: variable segun contenido.
Zona segura horizontal: x=40 a x=640 (40px margen a cada lado).
