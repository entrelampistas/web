---
name: entrelampistas-visual-system
description: >
  Sistema visual y de diagramas SVG para Entrelampistas. USAR SIEMPRE que se trabaje en
  cualquier diagrama, ilustracion SVG, componente visual, o elemento de interfaz del
  proyecto. Activar cuando se mencione: diagrama, SVG, visual, nodos, ensayo,
  ilustracion, componente, layout, card, o cualquier trabajo frontend visual.
  NO SALTARSE para ningun trabajo visual del proyecto.
---

# Sistema Visual Entrelampistas

Entrelampistas es un producto digital premium. El lenguaje visual combina rigor
geometrico con calidez organica: nodos, lineas curvas, rectangulos superpuestos
con fills translucidos, composicion asimetrica con aire generoso.

## Antes de escribir codigo

1. Leer `references/tokens.md` para la paleta, tipografia y espaciado exactos.
2. Si el trabajo es un diagrama SVG -> leer `references/diagram-language.md`.
3. Si el trabajo es un componente de pagina -> leer `references/components.md`.
4. Revisar `references/anti-patterns.md` para errores que NUNCA cometer.
5. Si hay diagramas especificos de un ensayo -> leer `references/ensayos/[nombre].md`.

Seguir siempre este orden. No improvisar tokens ni inventar colores.

---

## Filosofia de diseno

### Estetica
Geometrica, suave, con aire. Ni fria ni decorativa: cada forma cuenta algo.
El diagrama no repite el texto — lo extiende. La geometria narra.

### Principios

**La forma comunica.** Un diagrama que no anade comprension al texto es decoracion.
Cada rectangulo, nodo y linea existe porque representa algo conceptual. Si no puedes
nombrar que representa un elemento, eliminalo.

**Profundidad sin efectos.** La profundidad se crea con superposicion de capas y
opacidad, no con sombras, blur o gradientes. Los rectangulos se solapan. El orden z
importa. Las opacidades bajas (0.06-0.12) crean la sensacion de capas sin peso.

**Precision artesanal.** Los detalles micro son lo que separa premium de generico:
halos en nodos (3x diametro, opacidad 0.08), curvas bezier en conectores (nunca
lineas rectas), minimo 12px de separacion entre texto y formas, etiquetas alineadas
visualmente con lo que describen.

**Asimetria equilibrada.** La composicion no se centra rigidamente. Los elementos se
distribuyen con generosidad espacial, creando equilibrio visual sin simetria perfecta.

---

## Paleta (mapeada al DS v3 del sitio)

IMPORTANTE: Usar siempre CSS variables del proyecto, no hex directos.
Esto mantiene coherencia con el DS v3 (Klein + Space Grotesk + rojo).

| Funcion             | CSS Variable           | Equivalente hex | Uso                         |
|---------------------|------------------------|-----------------|-----------------------------|
| Fondo principal     | `var(--paper)`         | ~#FAFAF8        | Fondo SVG, fills claros     |
| Superficies         | `var(--surface)`       | ~#EFEBE2        | Areas, fills de zonas       |
| Acento estructura   | `var(--klein-deep)`    | ~#3D5A80        | Sistema, estructura, digital|
| Acento vibrant      | `var(--klein-vibrant)` | ~#3D6DFF        | Nodos primarios, labels     |
| Acento humano       | `var(--rojo)`          | ~#B5482A        | Lo humano, atencion, tu     |
| Texto principal     | `var(--ink)`           | ~#1A1A18        | Trazos fuertes, headings    |
| Texto secundario    | `var(--ink-mid)`       | ~#4A4A46        | Etiquetas SVG               |
| Texto terciario     | `var(--ink-light)`     | ~#8A8A85        | Pies de diagrama, datos     |
| Lineas/separadores  | `var(--border)`        | ~#DDDDD8        | Lineas de referencia        |

Opacidades estandar: 0.08, 0.15, 0.30, 0.60, 1.0.

---

## Tipografia en SVGs

Font: `font-family="var(--font, 'Space Grotesk'), sans-serif"`

| Uso              | Peso  | Tamano  | Color              |
|------------------|-------|---------|--------------------|
| Etiquetas SVG    | 500   | 12-14px | var(--ink-mid)     |
| Pies diagrama    | 400   | 11-12px | var(--ink-light)   |
| Titulos diagrama | 600   | 14px    | var(--klein-deep)  |

Todo texto en sentence case. NUNCA ALL CAPS en SVGs.

---

## Los cinco elementos del lenguaje visual

### 1. Nodos
```svg
<!-- Nodo basico -->
<circle cx="100" cy="100" r="4" fill="var(--klein-deep)"/>

<!-- Nodo con halo (principales) -->
<circle cx="100" cy="100" r="12" fill="var(--klein-deep)" opacity="0.08"/>
<circle cx="100" cy="100" r="4" fill="var(--klein-deep)"/>
```

- Radio: 3-5px. Halo: 3x radio, opacidad 0.08.
- `var(--klein-deep)` o `var(--klein-vibrant)` = sistema, estructura.
- `var(--rojo)` = lo humano, atencion, individuo.
- `var(--ink-light)` = fuerzas difusas, contexto.

### 2. Rectangulos
```svg
<rect x="40" y="60" width="280" height="180" rx="12"
      fill="var(--klein-deep)" fill-opacity="0.06"
      stroke="var(--klein-deep)" stroke-width="0.75" stroke-opacity="0.4"/>
```

- Fill: opacidad 0.06-0.12. Borde: 0.5-1px. rx: 8-16.
- Los rectangulos se solapan para crear profundidad.

### 3. Lineas conectoras (siempre curvas bezier)
```svg
<path d="M 100,200 C 140,180 180,220 220,200"
      stroke="var(--klein-deep)" stroke-width="0.75" stroke-opacity="0.5"
      fill="none"/>
```

### 4. Etiquetas
```svg
<text x="100" y="260" font-family="var(--font, 'Space Grotesk'), sans-serif"
      font-size="13" font-weight="500" fill="var(--ink-mid)">
  Etiqueta
</text>
```
- Minimo 12px de separacion con la forma que describen.

### 5. Lineas de referencia
```svg
<line x1="40" y1="200" x2="640" y2="200"
      stroke="var(--border)" stroke-width="0.75"/>
```

---

## Especificaciones tecnicas SVG

- viewBox: `"0 0 680 [altura]"` con `width="100%"`.
- Clase CSS: `class="il-essay"` para diagramas de ensayo.
- Atributos accesibilidad: `role="img"` + `aria-label` + `<title>`.
- SVG inline en el HTML del ensayo.
- Sin interactividad, sin animaciones, sin gradientes, sin sombras, sin blur.
- Orden de capas: 1.Fondos -> 2.Lineas referencia -> 3.Rectangulos -> 4.Conectoras -> 5.Halos -> 6.Nodos -> 7.Textos.

## Checklist de calidad

- [ ] Todos los colores son CSS variables del DS (no hex sueltos)
- [ ] Nodos radio 3-5px con halo si son principales
- [ ] Lineas conectoras son curvas bezier (no rectas)
- [ ] Rectangulos con fill opacidad 0.06-0.12
- [ ] Texto en sentence case con var(--font)
- [ ] Minimo 12px entre texto y formas
- [ ] Composicion asimetrica pero equilibrada
- [ ] El diagrama COMUNICA algo que el texto solo no dice
- [ ] viewBox 680 de ancho
- [ ] No hay gradientes, sombras, blur ni efectos
- [ ] role="img" + aria-label + <title> presentes
