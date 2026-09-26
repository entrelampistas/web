---
name: entrelampistas-visual-system
description: >
  Sistema visual y de diseño para Entrelampistas. USAR SIEMPRE que se trabaje en
  cualquier componente visual, diagrama, SVG, ilustración, página, layout, ensayo,
  artifact, o elemento de interfaz del proyecto Entrelampistas. Activar cuando se
  mencione: diagrama, SVG, visual, nodos, ensayo, habitabilidad, Entrelampistas,
  componente, página, layout, card, header, hero, sección, tipografía, colores de
  marca, o cualquier trabajo frontend del proyecto. También activar cuando se pida
  "hazlo bonito", "aplica el estilo", "mejora visualmente" o se adjunte un diseño
  de referencia de Entrelampistas. NO SALTARSE para ningún trabajo visual del
  proyecto — ni siquiera para un botón suelto.
---

# Sistema Visual Entrelampistas

Entrelampistas es un producto digital premium. Cada elemento visual debe sentirse
como algo que una diseñadora de 30 años pondría en su moodboard. El lenguaje visual
combina rigor geométrico con calidez orgánica: nodos, líneas curvas, rectángulos
superpuestos con fills translúcidos, composición asimétrica con aire generoso.

## Antes de escribir código

1. Leer `references/tokens.md` para la paleta, tipografía y espaciado exactos.
2. Si el trabajo es un diagrama SVG → leer `references/diagram-language.md`.
3. Si el trabajo es un componente de página → leer `references/components.md`.
4. Revisar `references/anti-patterns.md` para errores que NUNCA cometer.
5. Si hay diagramas específicos de un ensayo → leer `references/ensayos/[nombre].md`.

Seguir siempre este orden. No improvisar tokens ni inventar colores.

---

## Filosofía de diseño

### Estética
Geométrica, suave, con aire. Ni fría ni decorativa: cada forma cuenta algo.
El diagrama no repite el texto — lo extiende. La geometría narra.

### Principios

**La forma comunica.** Un diagrama que no añade comprensión al texto es decoración.
Cada rectángulo, nodo y línea existe porque representa algo conceptual. Si no puedes
nombrar qué representa un elemento, elimínalo.

**Profundidad sin efectos.** La profundidad se crea con superposición de capas y
opacidad, no con sombras, blur o gradientes. Los rectángulos se solapan. El orden z
importa. Las opacidades bajas (0.06-0.12) crean la sensación de capas sin peso.

**Precisión artesanal.** Los detalles micro son lo que separa premium de genérico:
halos en nodos (3x diámetro, opacidad 0.08), curvas bezier en conectores (nunca
líneas rectas), mínimo 12px de separación entre texto y formas, etiquetas alineadas
visualmente con lo que describen (no centradas arbitrariamente).

**Asimetría equilibrada.** La composición no se centra rígidamente. Los elementos se
distribuyen con generosidad espacial, creando equilibrio visual sin simetría perfecta.

---

## La paleta (inmutable)

Estos son los colores exactos. No modificar, no aproximar, no añadir.

| Token             | Hex       | Uso                                     |
|-------------------|-----------|-----------------------------------------|
| `paper`           | `#FAFAF8` | Fondo principal                         |
| `surface`         | `#F3F2EF` | Superficies, fills de áreas             |
| `accent`          | `#3D5A80` | Azul principal — estructura, sistema    |
| `accent-warm`     | `#B87333` | Cobre — lo humano, lo orgánico, tú      |
| `ink`             | `#1A1A18` | Texto principal, trazos fuertes         |
| `ink-mid`         | `#4A4A46` | Texto secundario                        |
| `ink-light`       | `#8A8A85` | Texto terciario, pies de diagrama       |
| `rule`            | `#DDDDD8` | Líneas divisorias, separadores          |

Las variantes de opacidad de `accent` y `accent-warm` son: 0.08, 0.15, 0.3, 0.6, 1.0.
Usar la escala completa — los diagramas viven en estas opacidades.

---

## Tipografía

| Uso              | Fuente      | Peso  | Tamaño  | Color        |
|------------------|-------------|-------|---------|--------------|
| Títulos ensayo   | DM Sans     | 700   | 28-36px | `ink`        |
| Subtítulos       | DM Sans     | 600   | 20-24px | `ink`        |
| Cuerpo           | DM Sans     | 400   | 16-18px | `ink`        |
| Etiquetas SVG    | DM Sans     | 500   | 12-14px | varía        |
| Pies diagrama    | DM Sans     | 400   | 12-13px | `ink-light`  |
| Datos/cifras     | DM Sans     | 500   | 12px    | `ink-light`  |

DM Sans se carga via Google Fonts y ya está disponible en el sitio.
Dentro de SVGs, declarar siempre `font-family="DM Sans, sans-serif"`.
Todo texto en sentence case. NUNCA ALL CAPS.

---

## Elementos visuales fundamentales

Estos cinco elementos componen TODO el lenguaje visual. No añadir otros.

### 1. Nodos
Puntos circulares sólidos. Son los átomos del sistema.

```svg
<!-- Nodo básico -->
<circle cx="100" cy="100" r="4" fill="#3D5A80"/>

<!-- Nodo con halo (para nodos importantes) -->
<circle cx="100" cy="100" r="12" fill="#3D5A80" opacity="0.08"/>
<circle cx="100" cy="100" r="4" fill="#3D5A80"/>
<circle cx="100" cy="100" r="4.5" fill="none" stroke="#3D5A80" stroke-width="0.5" opacity="0.3"/>
```

- Radio: 3-5px (el radio estándar es 4px).
- Azul (`accent`) para sistema, estructura, conceptos.
- Cobre (`accent-warm`) para lo humano, la atención, el individuo.
- Gris (`ink-light`) para fuerzas difusas, contexto.
- El halo es un círculo concéntrico a 3x el radio, fill del mismo color a opacidad 0.08.
- Borde sutil opcional: 0.5px, mismo color a opacidad 0.3.

### 2. Rectángulos
Contenedores con fill translúcido. Son las capas y zonas.

```svg
<!-- Rectángulo contenedor -->
<rect x="40" y="60" width="280" height="180" rx="12"
      fill="#3D5A80" fill-opacity="0.06"
      stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.4"/>
```

- Fill: opacidad 0.06-0.12 del color de borde.
- Borde: 0.5-1px. Color según función (azul = sistema, cobre = humano).
- Border radius: `rx="8"` para medianos, `rx="12"-"16"` para grandes.
- Los rectángulos se solapan para crear profundidad. El de arriba en z-order es el más "interior" conceptualmente.

### 3. Líneas conectoras
Siempre curvas. Nunca rectas. Son relaciones.

```svg
<!-- Línea conectora curva -->
<path d="M 100,200 C 140,180 180,220 220,200"
      stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.5"
      fill="none"/>
```

- Usar cubic bezier (C) o quadratic (Q) para curvas suaves.
- Grosor: 0.5-1px.
- Color: el del nodo de origen, a opacidad 0.4-0.6.
- Algunas terminan en nodos. Otras se difuminan con opacidad decreciente.

### 4. Etiquetas
Texto que nombra elementos. Alineado, nunca flotando.

```svg
<text x="100" y="260" font-family="DM Sans, sans-serif"
      font-size="13" font-weight="500" fill="#4A4A46">
  Etiqueta
</text>
```

- Siempre DM Sans. Tamaño 12-14px. Sentence case.
- Mínimo 12px de separación con la forma que describen.
- Alineadas visualmente con el elemento, no centradas en el viewBox.

### 5. Líneas de referencia
Horizontales o verticales. Son ejes, separadores, líneas de tiempo.

```svg
<!-- Línea de referencia -->
<line x1="40" y1="200" x2="640" y2="200"
      stroke="#DDDDD8" stroke-width="0.75"/>

<!-- Línea punteada -->
<line x1="40" y1="200" x2="640" y2="200"
      stroke="#8A8A85" stroke-width="0.75"
      stroke-dasharray="4 4"/>
```

---

## Especificaciones técnicas SVG

### Dimensiones
- viewBox: `"0 0 680 [altura]"` con `width="100%"`.
- 680px es el ancho del contenido del ensayo. La altura es proporcional al contenido.
- Margin vertical: 48px arriba y abajo de cada diagrama.
- Deben escalar bien en móvil (proporcional).

### Rendering
- SVG inline en el HTML del ensayo.
- Sin interactividad (estáticos).
- Sin animaciones.
- Sin gradientes, sombras, blur ni filtros SVG.
- Todos los colores de la paleta exacta. Sin variaciones.

### Estructura del SVG
```svg
<svg viewBox="0 0 680 [altura]" width="100%" xmlns="http://www.w3.org/2000/svg">
  <!-- Capa 1: Fondo y áreas -->
  <!-- Capa 2: Líneas de referencia -->
  <!-- Capa 3: Rectángulos (de mayor a menor) -->
  <!-- Capa 4: Líneas conectoras -->
  <!-- Capa 5: Halos de nodos -->
  <!-- Capa 6: Nodos -->
  <!-- Capa 7: Textos y etiquetas -->
</svg>
```

Respetar este orden de capas. Los halos van DEBAJO de los nodos. Los textos siempre
encima de todo. Las líneas conectoras pasan por detrás de los rectángulos cuando
cruzan capas (usar orden de dibujo SVG para esto).

---

## Checklist de calidad (verificar ANTES de entregar)

Ejecutar mentalmente esta lista para cada diagrama antes de mostrarlo:

- [ ] ¿Todos los colores son de la paleta exacta? (No hay #333, no hay #blue)
- [ ] ¿Los nodos tienen el radio correcto (3-5px)?
- [ ] ¿Los nodos importantes tienen halo (3x radio, opacidad 0.08)?
- [ ] ¿Las líneas conectoras son curvas bezier (no rectas)?
- [ ] ¿Los rectángulos tienen fill con opacidad 0.06-0.12?
- [ ] ¿El texto está en sentence case (no ALL CAPS)?
- [ ] ¿La fuente es DM Sans en todos los textos?
- [ ] ¿Hay mínimo 12px entre texto y formas?
- [ ] ¿La composición es asimétrica pero equilibrada?
- [ ] ¿El diagrama COMUNICA algo que el texto solo no dice?
- [ ] ¿El viewBox es 680 de ancho?
- [ ] ¿Los SVG layers están en el orden correcto?
- [ ] ¿No hay gradientes, sombras, blur ni efectos?

Si algún punto falla, corregir antes de entregar.

---

## Referencias adicionales

Para especificaciones detalladas, leer los archivos en `references/`:

- `references/tokens.md` — Paleta completa con variantes de opacidad, espaciados, escala tipográfica
- `references/diagram-language.md` — Guía profunda del lenguaje visual con ejemplos SVG de cada elemento
- `references/anti-patterns.md` — Lo que NUNCA hacer, con ejemplos concretos de errores
- `references/components.md` — Componentes de página (headers, cards, secciones)
- `references/ensayos/habitabilidad-digital.md` — Specs de los 3 diagramas del ensayo "Habitabilidad digital"
