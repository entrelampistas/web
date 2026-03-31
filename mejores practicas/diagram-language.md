# Lenguaje Visual de Diagramas — Entrelampistas

## Tabla de contenidos
1. Principio rector
2. Los cinco elementos
3. Composición
4. Estructura SVG
5. Ejemplos completos de patrones
6. Checklist de calidad

---

## 1. Principio rector

Cada diagrama narra una idea que el texto solo no puede comunicar con la misma
inmediatez. Si un diagrama no añade comprensión — si solo "decora" — no pertenece
al ensayo.

La pregunta antes de empezar cualquier diagrama:
> "¿Qué entenderá el lector al ver esto que NO entendería solo leyendo?"

Si la respuesta es "nada nuevo", el diagrama no debe existir.

---

## 2. Los cinco elementos

El lenguaje visual se compone exclusivamente de estos cinco tipos de elemento.
No añadir otros (no iconos, no ilustraciones, no emojis, no imágenes).

### 2.1 Nodos

Representan entidades, conceptos o puntos de anclaje.

**Nodo estándar (sin halo):**
```svg
<circle cx="100" cy="100" r="4" fill="#3D5A80"/>
```

**Nodo con borde sutil:**
```svg
<g>
  <circle cx="100" cy="100" r="4" fill="#3D5A80"/>
  <circle cx="100" cy="100" r="4.5" fill="none" stroke="#3D5A80"
          stroke-width="0.5" opacity="0.3"/>
</g>
```

**Nodo con halo (para nodos principales o de énfasis):**
```svg
<g>
  <!-- Halo: 3x el radio del nodo, opacidad 0.08 -->
  <circle cx="100" cy="100" r="12" fill="#3D5A80" opacity="0.08"/>
  <!-- Nodo sólido -->
  <circle cx="100" cy="100" r="4" fill="#3D5A80"/>
  <!-- Borde sutil opcional -->
  <circle cx="100" cy="100" r="4.5" fill="none" stroke="#3D5A80"
          stroke-width="0.5" opacity="0.3"/>
</g>
```

**Semántica de color en nodos:**
- `#3D5A80` (accent) → sistema, estructura, plataformas, algoritmos, lo digital
- `#B87333` (accent-warm) → lo humano, la atención, el individuo, lo orgánico
- `#8A8A85` (ink-light) → fuerzas difusas, contexto, elementos secundarios
- `#1A1A18` (ink) → conceptos neutros, puntos en líneas de tiempo

**Radios permitidos:**
- 3px: nodos pequeños, secundarios, decorativos
- 4px: nodo estándar (usar por defecto)
- 5px: nodos grandes, puntos de énfasis principal

### 2.2 Rectángulos

Representan capas, zonas, contenedores o áreas conceptuales.

**Rectángulo con fill translúcido:**
```svg
<rect x="60" y="40" width="300" height="200" rx="12"
      fill="#3D5A80" fill-opacity="0.07"
      stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.4"/>
```

**Rectángulo sin fill (contorno punteado):**
```svg
<rect x="40" y="20" width="340" height="240" rx="14"
      fill="none"
      stroke="#8A8A85" stroke-width="0.75" stroke-opacity="0.5"
      stroke-dasharray="6 4"/>
```

**Rectángulo de superficie (zona sin borde visible):**
```svg
<rect x="40" y="180" width="600" height="120" rx="8"
      fill="#F3F2EF" fill-opacity="0.5"
      stroke="none"/>
```

**Superposición de rectángulos (crea profundidad):**
Los rectángulos se dibujan del más grande al más pequeño. El SVG no tiene z-index;
el orden de aparición en el código define la capa visual. Dibujar primero el
rectángulo más exterior (fondo) y último el más interior (frente).

```svg
<!-- Capa exterior (fondo) -->
<rect x="40" y="40" width="360" height="260" rx="16"
      fill="none" stroke="#8A8A85" stroke-width="0.75"
      stroke-dasharray="6 4" stroke-opacity="0.4"/>

<!-- Capa intermedia -->
<rect x="80" y="70" width="280" height="200" rx="12"
      fill="#3D5A80" fill-opacity="0.06"
      stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.4"/>

<!-- Capa interior (frente) -->
<rect x="140" y="110" width="160" height="120" rx="8"
      fill="#F3F2EF"
      stroke="#1A1A18" stroke-width="0.75" stroke-opacity="0.3"/>
```

### 2.3 Líneas conectoras

Representan relaciones, flujos, conexiones entre nodos.

**Siempre curvas.** Usar cubic bezier (C) o quadratic (Q). Nunca <line> para conectores.

**Conectora entre dos nodos:**
```svg
<!-- De nodo en (100,200) a nodo en (300,180) -->
<path d="M 100,200 C 160,170 240,210 300,180"
      stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.5"
      fill="none"/>
```

**Conectora que se difumina:**
```svg
<defs>
  <linearGradient id="fade-connector" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#3D5A80" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#3D5A80" stop-opacity="0"/>
  </linearGradient>
</defs>
<path d="M 100,200 C 160,185 220,210 280,195"
      stroke="url(#fade-connector)" stroke-width="0.75"
      fill="none"/>
```

**Reglas para curvas:**
- Los control points definen la "suavidad" de la curva. La distancia entre un
  control point y su ancla suele ser 1/3 de la distancia total del segmento.
- Las curvas deben sentirse orgánicas, no geométricas ni rígidas.
- No cruzar curvas a menos que sea semánticamente relevante.
- Cuando una conectora pasa por detrás de un rectángulo, dibujarla ANTES del
  rectángulo en el orden SVG.

### 2.4 Etiquetas

Texto que nombra un elemento. Siempre vinculada a algo visual.

**Etiqueta estándar:**
```svg
<text x="100" y="280"
      font-family="DM Sans, sans-serif"
      font-size="13" font-weight="500"
      fill="#4A4A46">
  Nombre del concepto
</text>
```

**Pie de diagrama:**
```svg
<text x="40" y="380"
      font-family="DM Sans, sans-serif"
      font-size="12" font-weight="400"
      fill="#8A8A85">
  Una frase que ancla la interpretación del diagrama
</text>
```

**Dato secundario (año, autor):**
```svg
<text x="100" y="120"
      font-family="DM Sans, sans-serif"
      font-size="11" font-weight="400"
      fill="#8A8A85">
  2023 · Doctorow
</text>
```

**Reglas:**
- Mínimo 12px de separación entre texto y cualquier forma.
- Alinear visualmente con el elemento que describe. No centrar arbitrariamente.
- `text-anchor="start"` por defecto. Usar `"middle"` solo con justificación.
- Sentence case siempre. Nunca ALL CAPS.
- No hacer texto más grande que 14px dentro de SVGs (excepto si funciona como
  título del diagrama, en cuyo caso hasta 16px con weight 600).

### 2.5 Líneas de referencia

Ejes, separadores, líneas de tiempo. Siempre horizontales o verticales.

**Línea horizontal (eje, timeline):**
```svg
<line x1="40" y1="200" x2="640" y2="200"
      stroke="#DDDDD8" stroke-width="0.75"/>
```

**Línea vertical (separador de paneles):**
```svg
<line x1="340" y1="40" x2="340" y2="360"
      stroke="#DDDDD8" stroke-width="0.5"/>
```

**Líneas horizontales dispersas (representan caos, desorden, ideas sin forma):**
```svg
<line x1="80" y1="280" x2="160" y2="280" stroke="#DDDDD8" stroke-width="0.5" opacity="0.4"/>
<line x1="200" y1="295" x2="310" y2="295" stroke="#DDDDD8" stroke-width="0.5" opacity="0.3"/>
<line x1="120" y1="310" x2="250" y2="310" stroke="#DDDDD8" stroke-width="0.5" opacity="0.5"/>
```

---

## 3. Composición

### Asimetría equilibrada
Los diagramas no se centran rígidamente. Los elementos se posicionan con
intención: ligeramente a la izquierda, o con más peso visual arriba que abajo.
El equilibrio se logra distribuyendo masa visual, no midiendo pixeles.

### Aire generoso
El espacio vacío es un elemento activo. Un diagrama no necesita llenar todo el
viewBox. El aire crea jerarquía y permite al ojo respirar.

### Composición para 680px
- Margen horizontal interno: mínimo 40px a cada lado (zona segura: x=40 a x=640).
- Centrar la composición en el viewBox, pero los elementos internos pueden estar
  descentrados.
- Para diagramas con dos paneles: dividir en x≈340 con una línea vertical sutil.

### Jerarquía visual
1. Los nodos con halo y los textos de etiqueta más grandes atraen primero.
2. Los rectángulos crean zonas que el ojo agrupa.
3. Las líneas conectoras guían el recorrido del ojo.
4. Los pies de diagrama se leen al final.

---

## 4. Estructura SVG

Todo diagrama sigue esta estructura de capas, en este orden:

```svg
<svg viewBox="0 0 680 [altura]" width="100%"
     xmlns="http://www.w3.org/2000/svg">

  <!-- CAPA 1: Áreas de fondo (rectángulos surface sin borde) -->

  <!-- CAPA 2: Líneas de referencia (ejes, separadores, timelines) -->

  <!-- CAPA 3: Rectángulos con fill (del más grande al más pequeño) -->

  <!-- CAPA 4: Líneas conectoras (pasan por detrás de capas superiores) -->

  <!-- CAPA 5: Halos de nodos -->

  <!-- CAPA 6: Nodos sólidos y sus bordes sutiles -->

  <!-- CAPA 7: Textos (etiquetas, pies, datos) — siempre encima de todo -->

</svg>
```

El orden es crucial: SVG renderiza de arriba a abajo, y el último elemento
dibujado queda encima visualmente.

---

## 5. Ejemplos completos de patrones

### Patrón: Capas anidadas (represente jerarquía o contención)
Útil para conceptos de tipo "vives dentro de X que está dentro de Y".

```svg
<svg viewBox="0 0 680 400" width="100%" xmlns="http://www.w3.org/2000/svg">
  <!-- Capa exterior: contexto difuso -->
  <rect x="60" y="40" width="400" height="300" rx="16"
        fill="none" stroke="#8A8A85" stroke-width="0.75"
        stroke-dasharray="6 4" stroke-opacity="0.4"/>
  <text x="72" y="64" font-family="DM Sans, sans-serif"
        font-size="12" fill="#8A8A85">Contexto exterior</text>

  <!-- Capa intermedia: sistema -->
  <rect x="100" y="80" width="320" height="220" rx="12"
        fill="#3D5A80" fill-opacity="0.06"
        stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.4"/>
  <text x="112" y="104" font-family="DM Sans, sans-serif"
        font-size="13" font-weight="500" fill="#3D5A80">Sistema</text>

  <!-- Conectoras entre nodos en capa intermedia -->
  <path d="M 160,180 C 200,160 260,200 300,175"
        stroke="#3D5A80" stroke-width="0.75" stroke-opacity="0.4" fill="none"/>

  <!-- Nodos intermedios -->
  <circle cx="160" cy="180" r="4" fill="#3D5A80"/>
  <circle cx="300" cy="175" r="4" fill="#3D5A80"/>

  <!-- Capa interior: individuo -->
  <rect x="180" y="140" width="160" height="120" rx="8"
        fill="#F3F2EF" stroke="#1A1A18" stroke-width="0.5" stroke-opacity="0.3"/>

  <!-- Nodo central con halo -->
  <circle cx="260" cy="200" r="12" fill="#B87333" opacity="0.08"/>
  <circle cx="260" cy="200" r="4" fill="#B87333"/>

  <text x="245" y="230" font-family="DM Sans, sans-serif"
        font-size="13" font-weight="500" fill="#4A4A46"
        text-anchor="middle">Individuo</text>
</svg>
```

### Patrón: Línea de tiempo con emergencias
Útil para conceptos que surgen en momentos diferentes.

```svg
<svg viewBox="0 0 680 280" width="100%" xmlns="http://www.w3.org/2000/svg">
  <!-- Zona inferior (sin nombre) -->
  <rect x="40" y="160" width="600" height="80" rx="4"
        fill="#F3F2EF" fill-opacity="0.5"/>
  <text x="52" y="210" font-family="DM Sans, sans-serif"
        font-size="12" fill="#8A8A85">Sin nombre</text>

  <!-- Línea de tiempo -->
  <line x1="40" y1="160" x2="640" y2="160"
        stroke="#DDDDD8" stroke-width="0.75"/>

  <!-- Punto 1: línea vertical de emergencia + nodo + etiqueta -->
  <line x1="140" y1="160" x2="140" y2="80"
        stroke="#1A1A18" stroke-width="0.5" stroke-opacity="0.5"/>
  <circle cx="140" cy="160" r="3" fill="#1A1A18"/>
  <text x="140" y="72" font-family="DM Sans, sans-serif"
        font-size="13" font-weight="500" fill="#4A4A46"
        text-anchor="middle">Concepto A</text>
  <text x="140" y="58" font-family="DM Sans, sans-serif"
        font-size="11" fill="#8A8A85" text-anchor="middle">2011 · Autor</text>

  <!-- Zona superior -->
  <text x="52" y="48" font-family="DM Sans, sans-serif"
        font-size="12" font-weight="500" fill="#3D5A80">Visible</text>
</svg>
```

### Patrón: Dos paneles comparativos
Útil para contrastar dos estados o modos.

```svg
<svg viewBox="0 0 680 300" width="100%" xmlns="http://www.w3.org/2000/svg">
  <!-- Separador central -->
  <line x1="340" y1="40" x2="340" y2="260"
        stroke="#DDDDD8" stroke-width="0.5"/>

  <!-- Panel izquierdo: título -->
  <text x="40" y="60" font-family="DM Sans, sans-serif"
        font-size="14" font-weight="600" fill="#3D5A80">Estado A</text>

  <!-- Panel izquierdo: contenido visual -->
  <!-- ... nodos, líneas, etc. -->

  <!-- Panel derecho: título -->
  <text x="370" y="60" font-family="DM Sans, sans-serif"
        font-size="14" font-weight="600" fill="#B87333">Estado B</text>

  <!-- Panel derecho: contenido visual -->
  <!-- ... nodos, líneas, etc. -->

  <!-- Pies -->
  <text x="40" y="280" font-family="DM Sans, sans-serif"
        font-size="12" fill="#8A8A85">Pie panel izquierdo</text>
  <text x="370" y="280" font-family="DM Sans, sans-serif"
        font-size="12" fill="#8A8A85">Pie panel derecho</text>
</svg>
```

---

## 6. Checklist de calidad

Antes de entregar un diagrama, verificar cada punto:

### Colores
- [ ] Solo colores de la paleta (paper, surface, accent, accent-warm, ink, ink-mid, ink-light, rule)
- [ ] Las opacidades son de la escala definida (0.08, 0.15, 0.3, 0.6, 1.0)
- [ ] No hay ningún color fuera de paleta

### Nodos
- [ ] Radio entre 3-5px (4px estándar)
- [ ] Los nodos principales tienen halo (3x radio, opacidad 0.08)
- [ ] Color semánticamente correcto (azul=sistema, cobre=humano, gris=contexto)

### Líneas
- [ ] Todas las conectoras son curvas bezier (no <line>)
- [ ] Grosor 0.5-1px
- [ ] Opacidad 0.4-0.6

### Rectángulos
- [ ] Fill opacity 0.06-0.12
- [ ] Border radius apropiado (6-16px según tamaño)
- [ ] Orden de dibujo correcto (grande primero, pequeño después)

### Texto
- [ ] Font family: DM Sans, sans-serif
- [ ] Sentence case (no ALL CAPS)
- [ ] Mínimo 12px de separación con formas
- [ ] Tamaño máximo 14px (16px solo títulos de diagrama)
- [ ] Alineación visual con el elemento que describe

### Composición
- [ ] viewBox="0 0 680 [altura]" con width="100%"
- [ ] Asimétrica pero equilibrada
- [ ] Aire generoso (no todo comprimido)
- [ ] El diagrama COMUNICA algo conceptual

### Prohibiciones
- [ ] No hay gradientes
- [ ] No hay sombras (drop-shadow, box-shadow)
- [ ] No hay blur ni filtros SVG
- [ ] No hay interactividad
- [ ] No hay animaciones
- [ ] No hay imágenes, iconos ni ilustraciones
