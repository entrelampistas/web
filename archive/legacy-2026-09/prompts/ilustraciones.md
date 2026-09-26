# Brief — Ilustraciones SVG (IL-01 a IL-04)

> Antes de empezar: lee `00-vision.md` y
> `.claude/skills/entrelampistas-design-system/references/ilustracion.md`
> Las especificaciones técnicas completas están en ese archivo.

---

## El espíritu

Las ilustraciones de Entrelampistas no son decoración.
Son argumentos visuales sobre los sistemas invisibles que habitan los espacios cotidianos.

Estilo: **planos técnicos habitados por vida**.
Referencia principal: Chris Ware + The New Atlantis + señalética suiza.
Resultado: diagramas que parecen técnicos hasta que ves las personas dentro.

---

## Orden de ejecución recomendado

Empezar por IL-02 (más rápida de ejecutar, más impacto inmediato en el sitio).
Luego IL-03 (desbloquea las cards de publicaciones).
Luego IL-04 (footer). IL-01 es la más compleja — dejarla para el final.

---

## IL-02 — El Lampista (PRIORIDAD 1)

**Dónde vive:** Float right en sección /sobre y en la sección "Qué es" del home.
**Tamaño:** 160px desktop, 100px mobile.
**Animación:** float 6s ease-in-out infinite (±6px vertical).

**Lo que debe comunicar:**
Una figura que trabaja en silencio. Que cuida sin pedir atención.
No heroica — cotidiana. El humor está en los detalles técnicos alrededor.

**Especificación visual:**
```
viewBox="0 0 200 280"
Fondo: transparente
Figura: construida con rectángulos y círculos — NO realista
Herramienta en mano: llave o destornillador, forma geométrica simple
Alrededor: 3-4 líneas irradiantes (cables, conexiones) en il-accent-1
Un símbolo de bombilla integrado en el trazo — sutil, no literal
stroke-width: 1.5 figura / 0.75 detalles
Colores: il-ink (figura), il-accent-1 (cables), il-accent-3 (toque de luz)
```

**Personas en Chris Ware style:**
```svg
<circle r="8"/> <!-- cabeza — sin cara -->
<rect width="14" height="22" rx="2"/> <!-- cuerpo -->
<rect width="6" height="14" rx="1"/> <!-- brazo con herramienta -->
<!-- Sin detalles faciales. Sin texturas. Sin degradados. -->
```

---

## IL-03 — Icons de publicaciones (PRIORIDAD 2)

**Dónde viven:** Dentro de cada `.pub-card-icon` (60×60px).
**Tres variantes — una por territorio principal.**

**IL-03a — Cognición:** cerebro visto desde arriba como plano arquitectónico.
Habitaciones internas, hilo conductor rojo. Acento: il-accent-2 (rojo).

**IL-03b — Tecnología:** monitor en corte isométrico con circuitos interiores.
Calles de datos, nodo activo rojo. Acento: il-accent-1 (azul).

**IL-03c — Atención:** ojo construido con círculos concéntricos y radios.
Un solo rayo activo en rojo. Acento: il-accent-2 (rojo).

Código SVG base en: `.claude/skills/entrelampistas-design-system/references/ilustracion.md`

---

## IL-04 — Mapa BCN-MAD (PRIORIDAD 3)

**Dónde vive:** Footer, centrado, después del contenido de footer.
**Opacidad:** 0.15 sobre fondo Klein deep.
**Tamaño máximo:** 320px ancho.

**Lo que debe comunicar:**
Dos ciudades conectadas. Infraestructura invisible hecha visible.
Abstracto — no un mapa real. Solo sugiere la idea.

Código SVG base en: `.claude/skills/entrelampistas-design-system/references/ilustracion.md`

---

## IL-01 — La Ciudad que Piensa (PRIORIDAD 4)

**Dónde vive:** Background decorativo del hero, alineado a la derecha, 40% del ancho.
**Animación:** cables se dibujan al cargar con draw-line escalonado.
**Mobile:** display: none.

Esta es la más compleja. Requiere:
- Vista isométrica en corte a 30°
- Al menos 3 edificios con interior visible
- Red de metro subterránea
- Máximo 5 figuras humanas (solo siluetas)
- Cables/conexiones como clase `.network-line` con `data-line-index`

**No empezar sin haber hecho IL-02 y IL-03 primero.**
El estilo debe ser completamente consistente entre todas las piezas.

---

## Integración en el HTML

Todas las ilustraciones se integran como SVG inline:

```html
<!-- IL-02 en sección sobre -->
<div class="il-wrap" aria-hidden="true">
  [SVG inline aquí]
</div>

<!-- IL-03 en cards de publicaciones -->
<div class="pub-card-icon">
  [SVG inline aquí]
</div>

<!-- IL-04 en footer -->
<div class="footer-map" aria-hidden="true">
  [SVG inline aquí]
</div>
```

---

## Criterios de calidad — verificar antes de dar por buena cada ilustración

```
□ stroke-linecap="round" stroke-linejoin="round" en todos los paths
□ Solo los 7 tokens de paleta de ilustración (no hex sueltos)
□ Máximo 2 acentos por pieza (no los 3 juntos)
□ Sin texto en SVG (excepto etiquetas monospace 5px si son parte del diseño)
□ Funciona a 50%, 100% y 200% de escala
□ Menos de 8KB minificado
□ role="img" aria-label aria-hidden según uso
□ Animaciones respetan prefers-reduced-motion
□ Consistencia de línea con las otras ilustraciones del sistema
```
