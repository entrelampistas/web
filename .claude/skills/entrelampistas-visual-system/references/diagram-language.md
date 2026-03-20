# Lenguaje Visual de Diagramas — Entrelampistas

## Principio rector

Cada diagrama narra una idea que el texto solo no puede comunicar con la misma
inmediatez. La pregunta antes de empezar:
> "Que entendera el lector al ver esto que NO entenderia solo leyendo?"

Si la respuesta es "nada nuevo", el diagrama no debe existir.

---

## Los cinco elementos

### Nodos

**Nodo con halo completo:**
```svg
<g>
  <circle cx="100" cy="100" r="12" fill="var(--klein-deep)" opacity="0.08"/>
  <circle cx="100" cy="100" r="4" fill="var(--klein-deep)"/>
  <circle cx="100" cy="100" r="4.5" fill="none" stroke="var(--klein-deep)"
          stroke-width="0.5" opacity="0.3"/>
</g>
```

**Semantica de color:**
- `var(--klein-deep)` / `var(--klein-vibrant)` -> sistema, estructura, plataformas
- `var(--rojo)` -> lo humano, la atencion, el individuo
- `var(--ink-light)` -> fuerzas difusas, contexto, secundarios
- `var(--ink)` -> conceptos neutros, puntos en lineas de tiempo

### Rectangulos

**Con fill translucido:**
```svg
<rect x="60" y="40" width="300" height="200" rx="12"
      fill="var(--klein-deep)" fill-opacity="0.07"
      stroke="var(--klein-deep)" stroke-width="0.75" stroke-opacity="0.4"/>
```

**Contorno punteado (bordes difusos):**
```svg
<rect x="40" y="20" width="340" height="240" rx="14"
      fill="none"
      stroke="var(--ink-light)" stroke-width="0.75" stroke-opacity="0.5"
      stroke-dasharray="6 4"/>
```

**Superposicion:** dibujar del mas grande (fondo) al mas pequeno (frente).

### Lineas conectoras

**Siempre curvas bezier. Nunca `<line>` para conectores.**

```svg
<path d="M 100,200 C 160,170 240,210 300,180"
      stroke="var(--klein-deep)" stroke-width="0.75" stroke-opacity="0.5"
      fill="none"/>
```

### Etiquetas

```svg
<text x="100" y="280"
      font-family="var(--font, 'Space Grotesk'), sans-serif"
      font-size="13" font-weight="500"
      fill="var(--ink-mid)">
  Nombre del concepto
</text>
```

- Minimo 12px de separacion con formas.
- Sentence case siempre.

### Lineas de referencia

```svg
<line x1="40" y1="200" x2="640" y2="200"
      stroke="var(--border)" stroke-width="0.75"/>
```

---

## Composicion

- Asimetrica pero equilibrada. No centrar rigidamente.
- Aire generoso. El espacio vacio es un elemento activo.
- Margen horizontal interno SVG: minimo 40px a cada lado (zona segura: x=40 a x=640).
- Para dos paneles: dividir en x~340 con linea vertical sutil.

## Estructura SVG (orden de capas)

```svg
<svg viewBox="0 0 680 [altura]" width="100%"
     class="il-essay" role="img" aria-label="[descripcion]"
     xmlns="http://www.w3.org/2000/svg">
  <title>[titulo del diagrama]</title>
  <!-- CAPA 1: Areas de fondo -->
  <!-- CAPA 2: Lineas de referencia -->
  <!-- CAPA 3: Rectangulos (del mas grande al mas pequeno) -->
  <!-- CAPA 4: Lineas conectoras -->
  <!-- CAPA 5: Halos de nodos -->
  <!-- CAPA 6: Nodos solidos -->
  <!-- CAPA 7: Textos — siempre encima de todo -->
</svg>
```

---

## Patrones reutilizables

### Capas anidadas (jerarquia/contencion)
Rectangulos anidados del exterior al interior. Exterior = contexto difuso (punteado).
Intermedio = sistema (klein-deep fill). Interior = individuo (surface fill, nodo rojo).

### Linea de tiempo con emergencias
Linea horizontal en border. Puntos con nodos + lineas verticales que suben.
Etiquetas arriba. Zona inferior con fill surface = "sin nombre".

### Dos paneles comparativos
Separados por linea vertical en border. Izquierdo en klein-deep, derecho en rojo.
Mismo arranque visual, distinta evolucion.
