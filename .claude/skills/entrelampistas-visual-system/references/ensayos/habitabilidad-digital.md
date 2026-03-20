# Diagramas: Ensayo "Habitabilidad Digital"

Orden: 1. Entorno construido -> 2. Vocabulario como herramienta -> 3. Atencion profunda vs. capturada

---

## Diagrama 1: "Entorno construido"

**Ubicacion:** Despues de la introduccion, antes de seccion 01.
**Idea:** Vives dentro de capas de sistemas que no elegiste.
**viewBox:** "0 0 680 420"

**Capa exterior — "Incentivos economicos":**
- Rectangulo punteado en var(--ink-light), sin fill. x~50, y~40, w~420, h~320, rx=16.
- 4-6 nodos var(--ink-light) r=3px dispersos irregularmente.

**Capa intermedia — "Algoritmos y plataformas":**
- Rectangulo var(--klein-deep), fill opacity 0.06. x~100, y~80, w~330, h~240, rx=12.
- 3-4 nodos klein-deep r=4px conectados con curvas bezier (opacity 0.4).

**Capa interior — "Tu atencion":**
- Rectangulo var(--ink), fill var(--surface). x~180, y~140, w~160, h~120, rx=8.
- Nodo var(--rojo) r=4px con halo (r=12, opacity 0.08) en el centro.

**Pie:** "El entorno que nadie diseno para ser habitado" — ink-light, 11px.

**Composicion:** Descentrada a la izquierda. Aire a la derecha.

---

## Diagrama 2: "Vocabulario como herramienta"

**Ubicacion:** Seccion 02 (El problema del lenguaje).
**Idea:** Nombrar algo lo hace visible y discutible.
**viewBox:** "0 0 680 340"

**Zona inferior:** Rectangulo var(--surface) opacity 0.5, x=40, y=190, w=600, h=100.
Etiqueta "Sin nombre" ink-light. 5-7 lineas horizontales dispersas en var(--border).

**Linea de tiempo:** Horizontal en var(--border), y=190, de x=40 a x=640.

**Zona superior:** Limpia. Etiqueta "Visible" en var(--klein-vibrant), x=52, y=50.

**Cuatro puntos en la linea de tiempo:**
1. x~140: "Burbuja de filtros" / 2011 — nodo var(--ink) r=3, linea vertical solida
2. x~290: "Economia de la atencion" / 2014 — nodo var(--ink) r=3, linea solida
3. x~440: "Enshittification" / 2023 — nodo var(--ink) r=3, linea solida
4. x~580: "Habitabilidad digital" / 2025 — nodo var(--klein-vibrant) r=4 CON HALO, linea PUNTEADA

**Conectoras genealogicas:** Curvas sutiles (opacity 0.15) entre los 4 nodos.
**Pie:** "Nombrar vuelve visible. Lo visible puede discutirse." — ink-light.

**Nota:** Los puntos NO equidistantes — reflejan distancia temporal real.

---

## Diagrama 3: "Atencion profunda vs. capturada"

**Ubicacion:** Seccion 04 (El cerebro bajo diseno).
**Idea:** La atencion continua se degrada cuando el entorno la fragmenta.
**viewBox:** "0 0 680 320"

**Separador:** Linea vertical var(--border), x=340, y=30 a y=270.

### Panel izquierdo — "Atencion continua"
- Titulo: 14px, weight 600, var(--klein-deep). x=40, y=50.
- Linea curva suave en var(--klein-deep), stroke-width 1, opacity 0.7.
  Fluye de x~60 a x~310 con ondulaciones constantes.
- 4-5 nodos var(--klein-deep) r=3px con halos, equidistantes sobre la curva.
- "Continuidad" ink-light, x=40, y=240.

### Panel derecho — "Atencion capturada"
- Titulo: 14px, weight 600, var(--rojo). x=370, y=50.
- Misma forma curva pero en var(--rojo), INTERRUMPIDA por 5-6 rectangulos
  crecientes (8->14px) que representan notificaciones.
- Los rectangulos: fill rojo opacity 0.15, stroke rojo 0.5px opacity 0.3, rx=2.
- Despues de cada interrupcion la linea cae y pierde amplitud.
- Opacidad de linea decrece: 0.7 -> 0.3. Nodo final opacity 0.4.
- "Fragmentacion" ink-light, x=370, y=240.

**Nota:** Ambos paneles arrancan a y~160 para que la caida del derecho sea evidente.
