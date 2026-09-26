# Rediseño Entrelampistas v3 — Spec de diseño

**Basado en:** `briefs/entrelampistas-master-brief-v6.html`
**Fecha:** 2026-04-19
**Estado:** Diseño validado — pendiente de plan de implementación

---

## 1 · Qué estamos construyendo

Rediseño integral de Entrelampistas partiendo del Master Brief v6. Cambia el posicionamiento de **"contemplativo / pausa"** a **"conocimiento claro y pragmático con herramientas útiles"**, sin romper la herencia de marca ya construida (Klein blue, bloque diccionario, "Pensamiento de mantenimiento", tres beliefs, modelo de Capas).

La salida final es un sistema visual unificado aplicado a 6 pantallas clave, con ilustraciones doodle sketchy estilo Slite y una biblioteca de componentes reutilizable. Ejecución de alto nivel, polish Slite-comparable.

## 2 · Decisiones tomadas (resolución de ambigüedades)

| Decisión | Resolución |
|---|---|
| **Tipografía** | Inter (cuerpo + UI) + JetBrains Mono (metadata). No Fraunces. No Space Grotesk en v3. |
| **Sistema de color** | Paleta actual del sitio como base (Klein 4-niveles, Rojo 4-niveles). Rojo reemplaza Amber del brief. Sage opcional. Sin amber en UI. |
| **Fondos oscuros** | Klein-deep (`hsl(228, 70%, 35%)`) — nunca negro/ink. |
| **Tres profundidades de lectura** | Nuevo formato **solo para Capas nuevas**. Capas existentes mantienen su estructura actual. |
| **Autoría** | **Anónima siempre**. Sin nombre de autor en meta, footer ni schema. Contradice intencionalmente la sección 5 de CLAUDE.md — decisión editorial firme del proyecto. |
| **Fecha en meta** | Solo "MES AÑO" (e.g. "ENERO 2026"). Sin día. |
| **Logo en nav** | Solo transcripción fonética `[ɛ̃tɾə·lamˈpistas]` en Inter mono italic. La marca "Entrelampistas" ya está en el dominio — no repetir. |
| **Grid de territorios** | 3 (no 4): Infraestructura social · Habitabilidad · Autonomía mental. "Habitabilidad urbana" y "Tecnología y poder" se fusionan en "Habitabilidad" (física + digital). |
| **Diccionario block** | Fondo blanco puro sobre rule border, no beige. Clean tech-savvy. |
| **Ilustraciones** | SVG con filtro `feTurbulence + feDisplacementMap` para carácter hand-drawn sketchy, estilo Slite. |
| **Estrategia de despliegue** | (Paso 1) Foundation invisible merge directo a main → (Paso 2) Big bang del resto en `staging/v3-brief-v6` hasta validación completa → deploy único. |

### Implicación SEO de la autoría anónima

Schema `Person` se reemplaza por `Organization` como único autor. `knowsAbout` en Organization expandido para compensar. CLAUDE.md necesita actualizarse (sección 5) tras el deploy para reflejar esta realidad.

## 3 · Arquitectura del proyecto

### Ramas

```
main                       ← producción (v2 deployada)
└── staging/v3-brief-v6    ← rama maestra del rediseño
```

### Worktree

Se ejecuta en worktree aislado: `../landing-v3-worktree/` (fuera del repo principal) para no mezclar archivos de diseño con publicaciones editoriales en curso.

### Secuencia de despliegue

1. **Fase 1 (Foundation)** — se merge directamente a `main` porque es invisible (variables nuevas no se usan aún).
2. **Fases 2-5** — se desarrollan en `staging/v3-brief-v6` hasta que las 6 pantallas están completas y validadas.
3. **Deploy único** de todas las pantallas a `main` cuando el sistema está probado.

## 4 · Sistema de tokens (Fase 1)

### Colores

**Foundation (heredado del sitio actual)**

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `hsl(40, 25%, 96%)` | Background base |
| `--paper-light` | `hsl(40, 50%, 98%)` | Hover, highlights |
| `--paper-warm` | `hsl(38, 30%, 93%)` | Surfaces, tabs, pill backgrounds |
| `--paper-clean` | `#FFFFFF` | Card elevated, diccionario block |
| `--ink` | `hsl(0, 0%, 10%)` | Texto primario |
| `--ink-mid` | `hsl(0, 0%, 33%)` | Cuerpo de texto |
| `--ink-light` | `hsl(0, 0%, 53%)` | Captions, meta secundaria |
| `--rule` | `hsl(40, 15%, 85%)` | Borders, dividers |

**Klein (4 niveles)**

| Token | Valor | Uso |
|---|---|---|
| `--klein-night` | `hsl(228, 67%, 21%)` | Fondos oscuros profundos |
| `--klein-deep` | `hsl(228, 70%, 35%)` | Footer, newsletter CTA, botones primarios |
| `--klein-vibrant` | `hsl(228, 100%, 59%)` | Énfasis, hover de ghost buttons |
| `--klein-tint` | `hsl(228, 100%, 95%)` | Frames para AEO summary, callout info |

**Rojo (4 niveles — reemplaza Amber del brief)**

| Token | Valor | Uso |
|---|---|---|
| `--rojo-dark` | `hsl(11, 80%, 27%)` | Hover de botones rojo |
| `--rojo` | `hsl(11, 75%, 42%)` | Acento editorial principal — meta labels, énfasis, dashes |
| `--rojo-vibrant` | `hsl(11, 74%, 51%)` | Highlights especiales |
| `--rojo-light` | `hsl(11, 82%, 84%)` | Labels sobre fondos Klein |
| `--rojo-tint` | `hsl(11, 80%, 96%)` | Frames para pullquotes, related Capa, featured essay |

**Sage (opcional)**

| Token | Valor | Uso |
|---|---|---|
| `--sage` | `hsl(105, 16%, 47%)` | Tags de newsletter, variedad visual |
| `--sage-tint` | `hsl(105, 20%, 92%)` | Frame verde opcional |

### Tipografía

```css
--f-sans: 'Inter', -apple-system, system-ui, sans-serif;
--f-mono: 'JetBrains Mono', ui-monospace, monospace;
```

**Fuentes auto-hospedadas en WOFF2 variable** en `public/fonts/`:
- `Inter-Variable.woff2` (un solo archivo, pesos 300-700, italic + roman)
- `JetBrainsMono-Variable.woff2` (un archivo, pesos 400-500)

**Eliminar de `public/fonts/`:**
- Todos los `Fontspring-DEMO-*.otf` (riesgo legal — watermark)
- Todos los `SpaceGrotesk-*.ttf` (reemplazados por Inter)
- Mantener `SpaceGrotesk-Regular.woff2` temporalmente como fallback durante la transición de Fase 1 → Fase 4.

### Escala tipográfica

| Token | Valor | Uso |
|---|---|---|
| `--t-display` | `300 48-56px / 1.05 / -0.025em` | Hero único por pantalla |
| `--t-h1` | `300 36px / 1.1 / -0.02em` | Título de Capa |
| `--t-h2` | `400 26px / 1.15 / -0.018em` | Secciones internas |
| `--t-lead` | `400 20px / 1.5` | Subtítulo / lead |
| `--t-body` | `400 17px / 1.65` | Cuerpo de Capa |
| `--t-ui` | `500 14px / 1.5` | Botones, nav, formularios |
| `--t-mono` | `500 11px / uppercase / 0.18em tracking` | Kicker, metadata, tags |

### Spacing scale

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 · 128` (px)

### Radios, sombras, transitions

| Token | Valor |
|---|---|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-pill` | 100px |
| `--shadow-soft` | `0 1px 3px rgba(0,0,0,0.06)` |
| `--shadow-card` | `0 8px 24px rgba(26, 52, 153, 0.08)` |
| `--ease-out` | `cubic-bezier(0.33, 1, 0.68, 1)` |
| `--duration-fast` | 200ms |
| `--duration-med` | 350ms |
| `--duration-slow` | 500ms |

## 5 · Sistema de ilustración (Fase 2)

### Estrategia de lotes (validación incremental)

- **Lote 1 (8 SVGs)** — establece vocabulario visual.
  - 4 dimensiones Índice de Habitabilidad (Atención · Autonomía · Deliberación · Entorno)
  - 4 conceptos más usados: Habitabilidad · Sesgos cognitivos · Sistema 1/2 · Atención
  - **GATE:** validar el carácter doodle antes de escalar.
- **Lote 2 (10 SVGs)** — conceptos del glosario actual.
- **Lote 3 (7 SVGs)** — recurrentes y extendidos (markers de depth, separadores, herramienta marker).

### Especificación técnica

```
viewBox: 0 0 240 240 (canónico cuadrado)
stroke-width: 1.5–2px
stroke-linecap: round
stroke-linejoin: round
color: currentColor + 1 acento
filter: url(#rough) — feTurbulence + feDisplacementMap para sketchy hand-drawn
optimización: SVGO
peso: < 3KB cada uno
metadata: <title>, <desc>, data-concept, data-territorio
```

### Manifest

`/illustrations/manifest.json`:
```json
{
  "habitabilidad-digital": {
    "svg": "habitabilidad-digital.svg",
    "frame": "rojo-tint",
    "tags": ["entorno", "infraestructura"],
    "territorio": "habitabilidad",
    "appears_in": ["capa-habitabilidad.html"]
  }
}
```

### Anti-patterns explícitos

- No literal: no tubos, no cables, no bombillas (el brief prohíbe metáforas de fontanería/electricidad).
- No flat-icon: no estilo material design.
- No infantil: doodle con carácter, no cartoon.
- No render 3D.

## 6 · Biblioteca de componentes (Fase 3)

### Componentes validados en galería v2

**Estructurales**
- `Nav` — pill container con logo fonético, nav central, CTA pill derecha
- `Footer` — Klein-deep + diccionario mini + columnas + legal mono

**Patrones del brief**
- `VPNumbered` — propuesta de valor 1·2·3 con círculos Klein
- `FeatureGrid` — 3 territorios con iconos doodle en cajas klein-tint
- `DepthTabs` — Tesis · Mapa · Ensayo (pill tabs centradas)
- `InsightMockup` — **reemplaza DarkInsight** — muestra herramienta como UI mockup con barras de progreso en Klein/Rojo, no fondo oscuro
- `FeaturedEssay` — 2 columnas, texto + ilustración en frame rojo-tint

**UI base**
- `Button` — primary (klein), secondary (klein outline), rojo (cta newsletter), ghost (inline arrow)
- `Tag` — mono uppercase, variantes klein/rojo/sage/mute
- `EditorialCard` — hover con barra rojo creciendo desde izquierda
- `Pullquote` — fondo rojo-tint, borde rojo 3px, italic
- `Callout` — 2 variantes (info klein, emphasis rojo). Sin amber.

**Editorial**
- `DictionaryBlock` — fondo blanco puro, rule border, dashes rojo. Clean.
- `ArticleMeta` — **anónimo, sin autor, solo "CAPA · MES AÑO · XX MIN"**
- `AEOSummary` — klein-tint frame con label mono
- `FAQItem` — accordion con schema FAQPage
- `NewsletterCTA` — Klein-deep background, botón rojo, label rojo-light
- `ConceptInline` — link con border-bottom dashed klein
- `RelatedCapa` — frame rojo-tint

Total: **20 componentes** en galería validada.

## 7 · Las 6 pantallas clave (Fase 4)

Orden de producción prioritario:

### 7.1 · Plantilla de Capa `/capa-[slug]/` — PRIORIDAD 1

Composición:
```
Nav
Kicker mono: CAPA · 0X · TERRITORIO
H1 display con énfasis italic en klein o rojo
ArticleMeta (anónimo)
DepthTabs (solo Capas nuevas)
AEOSummary (klein-tint)
Body:
  — Cuerpo Inter 17px, max-width 680px
  — Pullquote cada 3-4 párrafos
  — ConceptInline para términos del glosario
  — Callouts info/emphasis cuando aplique
  — Ilustraciones conceptuales en frames pastel a lo largo del ensayo (estilo Slite — secciones intercaladas claro/oscuro, ilustración al inicio de cada sección mayor)
FAQSection (5+ preguntas)
InsightMockup (si la Capa tiene herramienta asociada)
RelatedCapa (rojo-tint)
NewsletterCTA
Footer
```

Schemas: `Article` + `FAQPage` + `BreadcrumbList`.

### 7.2 · Home `/` — PRIORIDAD 2

```
Nav
Hero (del sitio actual — conservado, no rediseñado)
VPNumbered
FeaturedEssay (Capa más reciente, frame rojo-tint)
FeatureGrid (3 territorios)
InsightMockup (Índice de Habitabilidad como gancho)
3× EditorialCard (últimas Capas del archivo)
NewsletterCTA (Klein-deep)
Footer
```

Schemas: `Organization` + `WebSite` + `WebPage`.

### 7.3 · Herramienta `/herramientas/habitabilidad/` — PRIORIDAD 3

```
Nav minimal (logo + "Salir")
Pantalla intro: título + 4 dimensiones ilustradas + CTA "Empezar"
Flujo narrativo:
  — 1 pregunta por pantalla
  — Micro-ilustración contextual
  — Opciones con hover klein-tint
  — Transición 350ms fade + slide
Transición de dimensión: "Ahora: Atención" con ilustración grande en su frame de color
Resultado:
  — Score global XX/100
  — InsightMockup con 4 barras (Atención rojo, otras klein)
  — Interpretación narrativa
  — Share artifact (SVG descargable con fonética como firma)
  — Links a Capas y conceptos relacionados
Footer minimal
```

Principios de UX (del brief, sección 13):
1. Experiencia narrativa, no formulario
2. Cada dimensión con identidad visual propia
3. Resultado compartible como artefacto
4. Resultado conecta con Capas y conceptos
5. Animaciones discretas, nunca decorativas

### 7.4 · Índice de Capas `/archivo/` — PRIORIDAD 4

```
Nav
Header: título + 2 líneas de intro
Filter pill tabs por territorio (3 opciones + "Todos")
Grid de EditorialCards (cronológico descendente)
Paginación (si >12)
Footer
```

Schemas: `WebPage` + `BreadcrumbList`.

### 7.5 · Página de Concepto `/glosario/[termino]/` — PRIORIDAD 5

```
Nav
Kicker: CONCEPTO · TERRITORIO
H1: el término
Transcripción fonética (si aplica)
Definición corta 22px (2-3 frases)
Ilustración doodle del concepto · frame de color según tipo
Desarrollo · 3-5 párrafos
Tags de conceptos relacionados
"Aparece en estas Capas" · mini EditorialCards
Footer
```

Schemas: `DefinedTerm` + `BreadcrumbList`.

### 7.6 · Newsletter `/newsletter/` — PRIORIDAD 6

Índice:
```
Nav
Header editorial con suscripción inline
Último número · bloque destacado rojo-tint
Lista de números anteriores
Footer
```

Número individual `/newsletter/numero-XX-slug/`:
```
Estructura similar a Capa
Schema: Article + isPartOf: Periodical
```

Cada número = URL indexable. Esto construye autoridad temática per CLAUDE.md sección 7.

## 8 · "Universo Entrelampistas" — cómo se siente Slite-level

El brief define cinco principios de diseño (sección 05). Para alcanzar calidad Slite, cada pantalla debe pasar estos tests:

- **Tipografía como marca** — si quitamos color e ilustraciones, sigue siendo reconocible
- **Claridad antes que espacio, espacio antes que densidad** — jerarquía evidente en <2s
- **Cada pieza cita a las demás** — ≤2 clicks entre piezas relacionadas (concept links, related Capa, herramienta embebida)
- **Interacción legible** — el usuario siempre sabe qué hizo y qué va a pasar
- **Vida sin ruido** — ilustraciones y animaciones aportan, no compiten

Patrones visuales que aportan el "feel Slite" específico:
- **Secciones intercaladas claro/oscuro** dentro de una pantalla (paper → klein-deep → paper)
- **Ilustración doodle cada 400-600px** en scroll, no solo en hero
- **UI mockups integrados en narrativa** (el InsightMockup es el ejemplo canónico)
- **Pill tabs para selectores** (territorios en archivo, profundidad en Capa)
- **Jerarquía numerada** con círculos de color (VPNumbered)
- **Frames de color contenedores** alrededor de ilustraciones (rojo-tint, klein-tint, sage-tint)
- **Hover subtle, nunca gratuito** (translaciones 1-2px, barras crecientes, color shifts)

## 9 · Restricciones técnicas no negociables

Del brief sección 15 + CLAUDE.md:

- **Fuentes auto-hospedadas WOFF2** — cero Google Fonts CDN en producción
- **Cero tracking de terceros** — solo PostHog (respetuoso) ya instalado
- **Cero pop-ups** — newsletter al final del contenido o página propia
- **Sitio estático** — sin build step complejo innecesario
- **Accesibilidad AA mínima, AAA en cuerpo de ensayos**
- **Lighthouse ≥95** accesibilidad en todas las pantallas
- **Core Web Vitals en verde**
- **Mobile first real** — paridad, no mínimo viable
- **Imágenes siempre con `width`, `height`, `alt`** — regla absoluta de CLAUDE.md
- **Schemas JSON-LD por tipo** según CLAUDE.md sección 4.5 (adaptados a autoría anónima)

## 10 · Criterios de éxito por fase

### Fase 1 (Foundation)
- `tokens.css` reescrito con variables v3 + alias v2
- Inter + JetBrains Mono WOFF2 auto-hospedadas
- `Fontspring-DEMO-*` eliminados de `public/fonts/`
- Las 16 páginas existentes renderizan igual que antes (regresión cero)
- Lighthouse igual o mejor

### Fase 2 (Ilustración)
- Lote 1 (8 SVGs) pasa revisión de carácter doodle
- Manifest.json con metadata completa
- Galería de referencia en `/dev/illustrations.html`
- Peso total Lote 1 <30KB

### Fase 3 (Componentes)
- 20 componentes en `/dev/components.html`
- Cada uno funciona en mobile sin reglas extra
- Documentación inline por componente (3 líneas máx)

### Fase 4 (6 pantallas)
- Cada pantalla pasa los 5 tests del brief
- Lighthouse accesibilidad ≥95 en todas
- Schemas validados en rich-results.google.com

### Fase 5 (Deploy)
- Merge único a main con todo el sistema
- Validación manual de las 16 páginas migradas
- Actualizar CLAUDE.md (sección 5 — autoría anónima reflejada)

## 11 · Fuera de alcance (YAGNI)

Explícitamente **no** se entrega en este ciclo:

- Motor de matching concepto → ilustración (Fase 5 del brief) — se prevé post-lanzamiento
- Variantes internacionales (el brief es solo ES)
- Storybook completo — galería HTML es suficiente
- Figma design tokens export — solo CSS/JSON
- Testing unitario de componentes — visual QA es suficiente
- CMS / editor integrado — el workflow editorial sigue siendo archivos HTML estáticos

## 12 · Riesgos identificados

| Riesgo | Mitigación |
|---|---|
| El carácter doodle no se sostiene en 20+ SVGs | Lote 1 valida antes de escalar. Si no convence, iterar lote 1 hasta 8 SVGs sólidos. |
| Inter se siente "frío" comparado con la promesa editorial | Compensar con ilustraciones cálidas, italics editoriales vivos, densidad de contenido tipo Slite. |
| Migrar 16 páginas + cambiar sistema visual se vuelve inabarcable | Entregable mínimo: 6 pantallas nuevas al 100%. El resto de páginas pueden mantener v2 hasta migración incremental post-deploy. |
| Autoría anónima limita el SEO del schema Person | Reforzar Organization con `knowsAbout` extendido, `sameAs` a LinkedIn company, contenido citable directamente sin atribución personal. |
| Regresión SEO en el switch v2→v3 | Fase 1 invisible protege la base. Deploy único permite revertir si hay problema grave. |

---

## Siguiente paso

Este spec queda committed al repo. Cuando lo apruebes, se invoca `superpowers:writing-plans` para convertir este diseño en un plan de implementación detallado con pasos accionables por fase.
