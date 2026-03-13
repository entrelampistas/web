# Componentes — Entre Lampistas

## Principio

Antes de crear un componente nuevo, busca aquí si ya existe uno equivalente.
Un componente nuevo se crea solo si: (a) no existe nada equivalente y (b) se va a usar en más de un lugar.
Tras crearlo, documéntalo aquí.

---

## Estado actual

> Este índice se construye progresivamente. Añadir componentes aquí según se vayan creando en cada proyecto.

---

## Componentes base (por definir en cada proyecto)

### Layout
- `PageLayout` — wrapper principal. Incluye nav y footer. Props: `theme` (dark|light)
- `ContentColumn` — columna de texto de lectura. Max-width: `var(--max-width-content)`. Centrada.
- `WideSection` — sección de ancho completo con padding lateral estándar
- `ArticleLayout` — layout específico para ensayos. Gestiona tipografía de lectura larga.

### Tipografía
- `Headline` — titulares H1-H4. Usa `var(--font-display)`. Props: `level`, `size`
- `BodyText` — texto de cuerpo. Usa `var(--font-body)`, `var(--leading-relaxed)`. Para lectura larga.
- `Label` — etiquetas pequeñas, categorías, metadatos. Tracking amplio, peso medium.
- `Caption` — pies de imagen, notas al margen. Tamaño `var(--text-sm)`.

### Navegación
- `Nav` — navegación principal. Versiones dark y light.
- `ChapterNav` — navegación de capítulos para ensayos digitales

### Contenido
- `EssayCard` — tarjeta de ensayo/artículo. Props: título, descripción, imagen, categoría
- `ChapterIntro` — portada de capítulo dentro de un ensayo
- `Callout` — cita destacada o fragmento importante dentro de un ensayo
- `ExerciseBlock` — bloque de ejercicio o reflexión práctica

### UI
- `Button` — Props: `variant` (primary|secondary|ghost|text), `size` (sm|md|lg)
- `Tag` — etiqueta temática. Fondo sutil, texto en acento
- `Divider` — separador editorial con opciones de grosor y margen
- `ProgressIndicator` — para ensayos digitales largos

---

## Convenciones de código

**Naming:** PascalCase para componentes, camelCase para props, kebab-case para clases CSS.

**Estilos:** Siempre usar variables de `brand/tokens.css`. Nunca valores hardcoded.

**Props:** Definir siempre valores por defecto. Documentar props no obvias con comentario.

**Accesibilidad:** Todos los componentes interactivos deben tener estados focus visibles. Usar elementos semánticos HTML correctos (article, nav, main, section...).

**Responsive:** Mobile-first. Breakpoints estándar: 640px (sm), 768px (md), 1024px (lg).

---

## Cuándo NO crear un componente

- Si es un elemento que solo aparece una vez en todo el proyecto
- Si es simplemente un div con padding — usar clases de utilidad
- Si añade abstracción sin añadir valor reutilizable
