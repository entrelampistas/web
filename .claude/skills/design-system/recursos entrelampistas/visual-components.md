# Componentes visuales — Entre Lampistas
> Derivados de las referencias: Chris Ware · Ilustración isométrica · Comunicación pública de Barcelona

Este archivo traduce las referencias visuales en componentes concretos que Claude Code puede implementar.
Leer `brand/visual.md` primero para entender el espíritu antes de ver la lista técnica.

---

## Componentes de layout con ADN de Barcelona

### `InformationBlock`
Bloque de información densa al estilo señalética pública. Fondo de color sólido (acento o secundario), tipografía en contraste alto, sin decoración. Usado para datos clave, estadísticas, definiciones.

```
┌─────────────────────────────┐
│  ETIQUETA EN MAYÚSCULAS     │
│                             │
│  Información principal      │
│  con jerarquía clara        │
│                             │
│  nota secundaria →          │
└─────────────────────────────┘
```

Tokens: `--color-bg-secondary`, `--font-ui`, `--tracking-wider` para etiqueta, `--text-2xl` para dato principal.

---

### `GridMap`
Layout tipo mapa de cuadrícula visible. Herencia directa de la comunicación barcelonesa y de Ware. Las celdas del grid son visibles (border sutil) y contienen unidades de información relacionadas. Útil para: índices de capítulos, mapas de conceptos, navegación de ensayo.

```
┌──────┬──────┬──────┐
│  01  │  02  │  03  │
│      │      │      │
├──────┼──────┼──────┤
│  04  │  05  │  06  │
│      │      │      │
└──────┴──────┴──────┘
```

Tokens: `--color-border` para las líneas del grid, numeración con `--font-mono`.

---

### `LayeredSection`
Sección que combina múltiples escalas de información simultáneamente — inspirado en la simultaneidad de Ware. Una columna con el argumento principal, una columna lateral con notas, referencias o preguntas relacionadas. No es barra lateral convencional — es conversación entre dos niveles del mismo texto.

---

### `ChapterMap`
Navegación visual de un ensayo que muestra todos los capítulos como un mapa, no como una lista. El lector ve la estructura completa del ensayo antes de entrar. Inspirado en los planos de ciudad isométricos — sabes dónde estás y adónde puedes ir.

---

## Componentes tipográficos con ADN de señalética

### `PublicHeadline`
Titular al estilo comunicación pública. Tipografía grande, peso alto, puede ser en mayúsculas si el contexto lo justifica. Sin serif dramático — directo y presente como un cartel del Eixample.

Uso: portadas de capítulo, secciones hero, titulares de ensayo.

Tokens: `--font-display`, `--text-4xl` o `--text-5xl`, `--weight-bold`, `--leading-tight`.

---

### `FunctionLabel`
Etiqueta funcional. Herencia directa de la señalética: pequeña, en mayúsculas, con tracking amplio, en un color específico que señala su función (categoría, estado, sección). No es decorativa.

Uso: categorías de artículo, estado de capítulo (Leído / En progreso), tipo de contenido (ENSAYO / HERRAMIENTA / EJERCICIO).

Tokens: `--text-xs`, `--tracking-wider`, `--weight-medium`, color según función semántica.

---

### `DefinitionBlock`
Herencia directa de la imagen fundacional del nombre "entrelampistas". Formato diccionario: término, pronunciación, categoría gramatical, definición numerada. Fondo de color sólido, tipografía en contraste.

Uso: introducir conceptos clave dentro de un ensayo, glosarios, la propia identidad de marca.

---

### `NumberedStatement`
Texto numerado al estilo de los carteles de actuaciones municipales — lista de afirmaciones o pasos con número grande tipográfico, no con bullet point. El número es parte del diseño.

```
01
Una decisión no empieza
cuando crees que empieza.

02
Ya hay algo pensando
antes de que lo notes.
```

Tokens: `--font-mono` o `--font-display` para el número, tamaño grande (`--text-3xl`), color `--color-text-secondary`.

---

## Componentes de ilustración con ADN de Ware + isométrico

### `SystemIllustration`
Ilustración editorial que representa una idea abstracta como sistema visible. Perspectiva isométrica o cenital. Paleta de 3-4 colores planos. Figuras humanas pequeñas dentro del sistema. Sin gradientes.

Casos de uso:
- El sistema de toma de decisiones → ilustración de bifurcaciones en un mapa
- Los sesgos cognitivos → arquitectura que el personaje habita sin verla
- La atención → sistema de tráfico con flujos y bloqueos
- Los modelos mentales → mapas con zonas marcadas

---

### `SequencePanel`
Secuencia de viñetas o paneles al estilo Ware — no cómic narrativo, sino **secuencia conceptual**: una idea que se desarrolla en 3-5 momentos visuales. Cada panel es una escena o estado. El lector lee la secuencia como argumento.

Uso: en ensayos digitales para mostrar el antes/después de un concepto, o la progresión de un argumento.

---

### `ScaleComparison`
Composición que muestra el mismo fenómeno en dos escalas simultáneas: lo macro (el sistema, la ciudad, la estructura) y lo micro (la persona, el momento, el detalle). Herencia directa de Ware. Muestra que lo personal y lo estructural están conectados.

---

### `InfrastructureMap`
Mapa de conceptos con estética de infraestructura pública. No es un diagrama de flujo corporativo — es un mapa con zonas, rutas, puntos de interés. Colores institucionales (azul, verde, ocre). Tipografía funcional. Leyenda visible.

Uso: mapas de contenidos del ensayo, visualización de conceptos relacionados, navegación de la plataforma.

---

## Patrones de composición

### El panel de definición
```
┌────────────────────────────────────┐
│  [término]                         │
│  [pronunciación] · [categoría]     │
│  ─────────────────────────────     │
│  1. Primera acepción               │
│  2. Segunda acepción               │
└────────────────────────────────────┘
```

### El bloque de dato + contexto
```
┌──────────────┐  ┌─────────────────────────┐
│              │  │  ETIQUETA               │
│   DATO       │  │                         │
│   GRANDE     │  │  Contexto que explica   │
│              │  │  el dato anterior       │
└──────────────┘  └─────────────────────────┘
```

### La secuencia de argumento
```
① Premisa          →  ② Complicación     →  ③ Pregunta
[panel visual]        [panel visual]         [panel visual]
Texto breve           Texto breve            Texto breve
```

---

## Colores con función semántica

Derivado de la lógica de señalética barcelonesa, aplicado a los tokens de Entre Lampistas:

| Color | Función | Uso |
|---|---|---|
| Azul oscuro (`--color-bg-primary`) | Base / profundidad | Fondo principal |
| Azul medio (`--color-accent`) | Navegación / enlace | Links, CTAs, indicadores de progreso |
| Verde (`--color-success`) | Avance / confirmación | Capítulo completado, validación |
| Ocre / Amarillo | Atención / pregunta | Callouts de reflexión, ejercicios |
| Rojo (`--color-error`) | Alerta / contraste | Solo para alertas funcionales, nunca decorativo |
| Blanco cálido (`--color-text-primary`) | Contenido principal | Texto sobre fondos oscuros |

> Añadir los valores ocre/amarillo a `tokens.css` si no están presentes.
