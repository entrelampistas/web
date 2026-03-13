# ILLUSTRATIONS.md — Entrelampistas
> Memoria viva del sistema ilustrativo. Separado de CLAUDE.md (contexto general del proyecto).
> Claude Code lee este archivo al inicio de cualquier tarea de ilustración o animación.
> Al terminar cada sesión, Claude Code propone actualizaciones en bloque — tú apruebas antes del merge.

---

## CÓMO USAR ESTE ARCHIVO

### Al iniciar una tarea de ilustración
Incluye esta instrucción en tu prompt a Claude Code:
```
Lee ILLUSTRATIONS.md antes de empezar. Sigue exactamente la gramática visual,
usa los patrones de código ya probados, y respeta el registro de lo que no funcionó.
Al terminar, genera un bloque "PROPUESTA DE ACTUALIZACIÓN" con los cambios
que deberían añadirse a este archivo — no los apliques tú directamente.
```

### Al terminar una sesión
Claude Code genera al final de su respuesta un bloque como este:
```
── PROPUESTA DE ACTUALIZACIÓN PARA ILLUSTRATIONS.md ──────────────
[sección a modificar]
[cambio propuesto con justificación]
───────────────────────────────────────────────────────────────────
```
Tú revisas, editas si hace falta, y haces el merge manualmente.

---

## 1. GRAMÁTICA VISUAL

> Esta sección define el estilo canónico. Evoluciona solo cuando hay una razón visual clara,
> no por conveniencia técnica. Cada cambio debe estar justificado en el registro (sección 5).

### Referentes activos
- **Chris Ware** — isometría, sección transversal, sistemas dentro de sistemas, planos habitados
- **The New Atlantis** — infraestructura como protagonista, color funcional no decorativo
- **The New Yorker** — densidad humana, línea consistente, humor en los detalles
- **Constructivismo soviético** — geometría intencional, tipografía como elemento visual

### Concepto central
*Los sistemas invisibles que habitan los espacios cotidianos. La infraestructura oculta hecha visible.*
Las ilustraciones parecen planos técnicos habitados — no decoración, sino argumento visual.

### Perspectiva
- Isométrica a **30° fijo** en todos los elementos arquitectónicos
- Edificios y espacios como **secciones transversales**: paredes = líneas dobles con grosor interior visible
- Personas: `<circle>` (cabeza) + `<rect>` (cuerpo). Sin detalles faciales. Silueta pura.
- Mobiliario: formas geométricas básicas con proporciones deliberadamente incorrectas (no fotorrealismo)
- Texto dentro de SVG: `font-family: monospace`, `font-size: 5px`, solo como etiquetas técnicas

### Paleta
```
--il-paper:    #F5F0E8   papel offset cálido — fondo base
--il-ink:      #1A1A18   casi negro — línea principal
--il-accent-1: #2B4EFF   azul eléctrico — acento fuerte (cables, red, conexiones)
--il-accent-2: #E8341A   rojo ladrillo — acento secundario (alertas, énfasis)
--il-accent-3: #F2C94C   ámbar — detalle cálido (luz, calor, atención)
--il-mid:      #8C8C87   gris medio — sombras, elementos secundarios
--il-light:    #D4CFC4   gris claro — fondos internos, planos de fondo
```

**Ratio:** 70% papel/ink · 20% accent-1 · 10% accent-2 ó accent-3.
Nunca los tres acentos juntos en una misma pieza.

### Línea y forma
- `stroke-linecap="round"` y `stroke-linejoin="round"` en todos los SVGs sin excepción
- `stroke-width="1"` líneas secundarias / `stroke-width="1.5"` elemento principal
- Sin degradados. Rellenos sólidos únicamente.
- Sombras = formas geométricas semitransparentes (`fill-opacity="0.12"`)
- Crosshatching para texturas profundas: líneas a 45°, `stroke-opacity="0.3"`

### Escala de lectura
Cada ilustración debe funcionar a tres niveles:
1. **Vista global** — composición y silueta reconocible
2. **Vista media** — sistemas y relaciones visibles
3. **Vista cercana** — detalles y micro-narrativas

---

## 2. CATÁLOGO DE ILUSTRACIONES

| ID | Nombre | Estado | Archivo | Fecha |
|----|--------|--------|---------|-------|
| IL-01 | Hero — La Ciudad que Piensa | ⬜ pendiente | — | — |
| IL-02 | El Lampista | ⬜ pendiente | — | — |
| IL-03a | Ícono — Psicología cognitiva | ⬜ pendiente | — | — |
| IL-03b | Ícono — Tecnología y entorno | ⬜ pendiente | — | — |
| IL-03c | Ícono — Atención y método | ⬜ pendiente | — | — |
| IL-04 | Footer — Mapa esquemático | ⬜ pendiente | — | — |

**Estados:** ⬜ pendiente · 🔄 en progreso · 👁 en revisión · ✅ aprobado · 🔁 revisado

### Especificaciones

#### IL-01 — Hero "La Ciudad que Piensa"
```
viewBox="0 0 480 640"
Posición: fondo decorativo section.hero, derecha, 40% ancho, altura completa
Paleta: --il-paper, --il-ink, --il-accent-1
Escena: bloque urbano en corte isométrico — biblioteca con estanterías visibles,
        café con personas, metro subterráneo, líneas eléctricas y de datos
        conectando edificios. Infraestructura invisible hecha visible.
Personas: máximo 5, siluetas esquemáticas
Mobile: display none
```

#### IL-02 — El Lampista
```
viewBox="0 0 200 280"
Posición: flotante derecha, section.que-es, antes del CTA
Paleta: --il-ink, --il-accent-1, --il-accent-3
Fondo: transparente
Figura: lampista de cuerpo completo, perspectiva casi frontal, ligeramente
        isométrica. Herramienta en mano. Rectángulos y círculos, no detalles
        faciales. Líneas irradiantes: cables, conexiones, bombilla integrada
        en el trazo sin ser literal.
stroke-width: 1.5 figura principal / 0.75 detalles
```

#### IL-03a/b/c — Íconos de publicaciones
```
viewBox="0 0 60 60" (los tres)
stroke-width: 1 uniforme
Un solo acento por pieza:

IL-03a Psicología cognitiva:
  Cerebro visto desde arriba como plano arquitectónico.
  Zonas delimitadas con líneas y puntos. Acento: --il-accent-1

IL-03b Tecnología y entorno:
  Monitor en corte isométrico mostrando interior.
  Cables, circuitos como calles urbanas. Acento: --il-accent-2

IL-03c Atención y método:
  Ojo construido con círculos concéntricos y líneas radiales.
  Diagrama de precisión óptica. Acento: --il-accent-3
```

#### IL-04 — Footer Mapa esquemático
```
viewBox="0 0 320 120"
Posición: footer.site-footer, centrado, max-width 320px, opacity 0.15
Paleta: solo --il-ink, stroke-opacity: 0.4, fill: none
Escena: dos ciudades conectadas, abstracto. Retícula de calles como líneas finas,
        dos nodos como círculos, línea de conexión como ferrocarril o cable.
```

---

## 3. PATRONES DE CÓDIGO SVG PROBADOS

> Solo entran aquí patrones que han pasado por revisión y están aprobados.
> Cada uno tiene notas de por qué funciona y qué evitar.

### Estructura base de todo SVG ilustrativo
```html
<svg class="il il-[nombre]"
     viewBox="[x y w h]"
     xmlns="http://www.w3.org/2000/svg"
     role="img"
     aria-label="[descripción accesible en español]">
  <title>[título accesible]</title>

  <!-- Grupos semánticos, siempre en este orden: -->
  <g class="il-bg">         <!-- fondo, planos base --></g>
  <g class="il-structures"> <!-- arquitectura, edificios --></g>
  <g class="il-network">    <!-- cables, líneas de conexión --></g>
  <g class="il-figures">    <!-- personas, siluetas --></g>
  <g class="il-details">    <!-- micro-narrativas, detalles --></g>
</svg>
```
**Por qué funciona:** La separación en grupos semánticos permite animar capas
independientemente y hace el SVG mantenible. Siempre en este orden de z-index.

### Persona esquemática (estilo Chris Ware)
```svg
<g class="il-person">
  <!-- cabeza -->
  <circle cx="0" cy="0" r="4" fill="#1A1A18"/>
  <!-- cuerpo -->
  <rect x="-3" y="5" width="6" height="9" rx="1" fill="#1A1A18"/>
  <!-- piernas -->
  <rect x="-3" y="14" width="2.5" height="6" rx="0.5" fill="#1A1A18"/>
  <rect x="0.5" y="14" width="2.5" height="6" rx="0.5" fill="#1A1A18"/>
</g>
```
**Uso:** Envolver en `<g transform="translate(x, y)">` para posicionar.
**Evitar:** No agregar detalles faciales. No usar `<path>` complejo para la figura.

### Pared isométrica con interior visible
```svg
<!-- Pared exterior -->
<rect x="10" y="10" width="80" height="60" rx="0"
      fill="#F5F0E8" stroke="#1A1A18" stroke-width="1.5"/>
<!-- Pared interior (grosor visual) -->
<rect x="13" y="13" width="74" height="54" rx="0"
      fill="none" stroke="#1A1A18" stroke-width="0.5" stroke-opacity="0.4"/>
```
**Por qué funciona:** El doble rect simula el grosor de pared del estilo Chris Ware
sin necesidad de path complejo. El inner rect con opacity baja sugiere profundidad.

### Línea de red/cable animable
```svg
<path class="network-line"
      style="--path-length: 180; --line-index: 0"
      d="M x1 y1 L x2 y2"
      fill="none"
      stroke="#2B4EFF"
      stroke-width="0.75"
      stroke-dasharray="180"
      stroke-dashoffset="180"/>
```
**CSS necesario:**
```css
.network-line {
  animation: draw-line 1.2s ease-out forwards;
  animation-delay: calc(var(--line-index) * 0.15s);
}
@keyframes draw-line { to { stroke-dashoffset: 0; } }
```
**Evitar:** No calcular `--path-length` a ojo — usar la longitud real del path
o un valor generoso que garantice que el dash cubra toda la línea.

### Sombra geométrica (sin drop-shadow)
```svg
<!-- Sombra como forma desplazada -->
<rect x="12" y="12" width="80" height="60"
      fill="#1A1A18" fill-opacity="0.08" rx="0"/>
<!-- Elemento encima -->
<rect x="10" y="10" width="80" height="60"
      fill="#F5F0E8" stroke="#1A1A18" stroke-width="1"/>
```
**Por qué:** Drop-shadow via filter tiene mal rendimiento y no respeta
`prefers-reduced-motion`. La sombra geométrica es más fiel al estilo editorial.

---

## 4. ANIMACIONES PROBADAS

> Solo entran aquí animaciones que han sido revisadas y aprobadas.
> Incluyen el CSS exacto y notas de rendimiento.

### il-appear — aparición suave general
```css
.il { opacity: 0; }
.il.visible, .page-enter.visible .il {
  animation: il-appear 0.8s ease-out 0.4s forwards;
}
@keyframes il-appear { to { opacity: 1; } }
```
**Cuándo usar:** Todas las ilustraciones al cargar la página.
**Sincronizar con:** `.page-enter` ya existente en el JS del proyecto.

### float — flotación suave (El Lampista)
```css
.il-lampist {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
```
**Parámetros:** 6s es el tempo correcto — más rápido se siente ansioso,
más lento pasa desapercibido. ±6px es el rango de movimiento calibrado.

### draw-line — dibujo de líneas de red (IL-01)
```css
.network-line {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw-line 1.2s ease-out forwards;
  animation-delay: calc(var(--line-index) * 0.15s);
}
@keyframes draw-line { to { stroke-dashoffset: 0; } }
```
**Notas:** Cada línea necesita `--path-length` e `--line-index` como custom properties
inline en el elemento SVG. El escalonado de 0.15s por línea crea sensación de sistema
que se activa progresivamente.

### card-hover — ilustración en explore cards
```css
.explore-card.is-open .card-illustration {
  transform: scale(1.04) rotate(-1deg);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```
**Notas:** El cubic-bezier con overshoot (1.56) da sensación de vida sin ser caricaturesco.

### Reducción de movimiento — siempre incluir
```css
@media (prefers-reduced-motion: reduce) {
  .il, .il * {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
  }
}
```
**Crítico:** Sin esto, las ilustraciones que aparecen con `opacity: 0` + animación
quedan invisibles para usuarios con movimiento reducido.

---

## 5. REGISTRO DE APRENDIZAJE

> Lo que funcionó, lo que no funcionó, y por qué.
> Cada entrada tiene fecha, contexto y conclusión.
> Este es el conocimiento más valioso del documento — no borrar entradas antiguas.

### 2026-03-13 — Setup del sistema
**Contexto:** Primera sesión de trabajo. Definición del estilo y la arquitectura.
**Decisiones:**
- SVG inline (no archivos externos) para control total de CSS y sin HTTP requests adicionales
- Perspectiva isométrica 30° como gramática unificada — evita que cada ilustración
  parezca de un proyecto diferente
- Paleta de 7 tokens `--il-*` separada de los tokens generales del proyecto —
  las ilustraciones tienen su propio espacio cromático
- Chris Ware como referente principal por su coincidencia conceptual con el tema
  del proyecto: sistemas visibles, infraestructura, cuidado

**Pendiente de probar:** Rendimiento de múltiples SVGs inline en mobile.
Si hay problema, se puede lazy-load IL-01 (hero) ya que está fuera del viewport inicial.

---

## PLANTILLA PARA PROPUESTA DE ACTUALIZACIÓN

Al terminar una sesión, Claude Code genera este bloque para revisión:

```
── PROPUESTA DE ACTUALIZACIÓN PARA ILLUSTRATIONS.md ──────────────
Fecha: [fecha]
Sesión: [qué se trabajó]

CATÁLOGO — cambios de estado:
  IL-0X: ⬜ → ✅  (o el estado que corresponda)

PATRONES — nuevo patrón a agregar (si aplica):
  Nombre: [nombre del patrón]
  Código: [bloque de código]
  Por qué funciona: [justificación]
  Evitar: [qué no hacer]

ANIMACIONES — nueva animación a agregar (si aplica):
  [mismo formato que sección 4]

REGISTRO — entrada a agregar en sección 5:
  Fecha: [fecha]
  Contexto: [qué se intentó]
  Resultado: [qué funcionó / qué no]
  Conclusión: [qué aprendemos para la próxima vez]

GRAMÁTICA — cambio de estilo propuesto (si aplica):
  Sección: [qué sección cambiaría]
  Cambio: [qué cambiaría y por qué]
  ⚠ Este tipo de cambio requiere aprobación explícita antes del merge.
───────────────────────────────────────────────────────────────────
```
