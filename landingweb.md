Agent Instructions — Entrelampistas
Estás trabajando dentro del framework WAT (Workflows, Agents, Tools) adaptado al proyecto Entrelampistas: una plataforma editorial de pensamiento estructural.
Objetivo del proyecto: Rediseñar la web de Entrelampistas (actualmente en WordPress) como sitio estático, desarrollar el frontend completo y desplegarlo en GitHub + Vercel/Netlify.

## LECTURA OBLIGATORIA antes de cualquier cambio visual o de frontend

Leer en este orden, sin excepción:

1. `.claude/skills/entrelampistas-design-system-SKILL.md` — Design system v3: tokens de color, tipografía, layout, componentes, reglas absolutas de uso (NUNCA serif, NUNCA italic, paleta Klein + rojo)
2. `entrelampistas-SKILL.md` — Identidad del proyecto, público objetivo, tono editorial, posicionamiento
3. `brand_assets/Group 290.png` — Logo wordmark (se carga como img con filter: brightness(0) invert(1) sobre fondos klein-deep)

La relación entre los skills:
- `entrelampistas-design-system-SKILL.md` = QUÉ visual aplicar (tokens, componentes, layout específico)
- `entrelampistas-SKILL.md` = QUÉ comunicar (tono, público, posicionamiento)
- El skill de frontend-design instalado = CÓMO ejecutarlo con calidad (craft, microinteracciones, nivel de detalle)


La Arquitectura WAT
Capa 1: Workflows (Las Instrucciones)

Archivos Markdown en workflows/
Cada workflow define: objetivo, inputs necesarios, qué tools usar, output esperado y cómo manejar errores
Escritos en lenguaje claro, como si briefearas a alguien de tu equipo

Workflows del proyecto:
WorkflowDescripciónworkflows/design-system.mdSistema de diseño: tipografía, paleta, espaciado, componentes baseworkflows/landing-page.mdEstructura, secciones y contenido de la landing principalworkflows/article-template.mdTemplate para páginas de artículos/ensayosworkflows/static-pages.mdPáginas estáticas (sobre, contacto, archivo)workflows/build-deploy.mdBuild del sitio estático y deploy a Vercel/Netlifyworkflows/migrate-content.mdExtraer contenido de WordPress y adaptarlo al nuevo formato
Capa 2: Agents (El Decisor)

Este es tu rol. Coordinas de forma inteligente.
Lee el workflow correspondiente, ejecuta las tools en orden, maneja fallos y pregunta cuando necesites claridad
Conectas intención con ejecución sin intentar hacerlo todo tú directamente

Ejemplo: Si necesitas crear un componente de navegación, no lo escribas de cero improvisando. Lee workflows/design-system.md, consulta entrelampistas-SKILL.md y brand_assets/logo.png para la identidad, revisa si ya existe un componente en src/components/, y entonces genera o modifica lo necesario.
Capa 3: Tools (La Ejecución)

Scripts y archivos en tools/ que hacen el trabajo determinista
Builds, procesamiento de imágenes, exportación de contenido, optimización
Las credenciales y API keys van en .env

Tools del proyecto:
ToolFuncióntools/export-wp-content.pyExportar posts y páginas de WordPress (vía WP REST API o XML)tools/markdown-converter.pyConvertir HTML de WordPress a Markdown limpiotools/image-optimizer.shOptimizar imágenes para web (WebP, compresión, resize)tools/build.shBuild del sitio estáticotools/deploy.shDeploy a Vercel/Netlify via CLI
Por qué importa: Cuando la IA intenta hacer cada paso directamente, la precisión cae rápido. Si cada paso tiene 90% de acierto, tras cinco pasos estás en 59%. Delegando la ejecución a scripts deterministas, tú te centras en orquestar y decidir, donde realmente aportas.

Cómo Operar
1. Busca tools existentes primero
Antes de crear algo nuevo, revisa tools/ y components/. Solo crea nuevos scripts o componentes cuando no exista nada para esa tarea.
2. Respeta la identidad de Entrelampistas
Antes de generar cualquier pieza visual o de contenido:

Lee entrelampistas-SKILL.md (resumen del proyecto, tono, público)
Consulta brand_assets/logo.png (brand guidelines)
Aplica el concepto de serenidad estructural
Verifica contra el checklist editorial antes de entregar

3. Aprende y adapta cuando algo falle
Cuando encuentres un error:

Lee el mensaje de error completo y el trace
Arregla el script y re-testea (si usa API calls de pago, confirma conmigo antes de ejecutar de nuevo)
Documenta lo aprendido en el workflow (rate limits, quirks, comportamiento inesperado)

4. Mantén los workflows actualizados
Los workflows deben evolucionar conforme aprendes. Cuando descubras mejores métodos o restricciones, actualiza el workflow. Pero no crees ni sobreescribas workflows sin preguntar a menos que te lo diga explícitamente.

El Loop de Mejora Continua
Cada fallo hace el sistema más robusto:

Identifica qué se rompió
Arregla la tool
Verifica que funciona
Actualiza el workflow con el nuevo enfoque
Sigue adelante con un sistema más sólido


Screenshot Workflow
Usa Puppeteer para tomar screenshots del diseño como feedback loop visual. Esto te permite verificar y corregir espacios, colores, tipografía, alineación y cualquier detalle visual sin depender de que yo revise manualmente.
Setup:

Puppeteer está instalado en el proyecto
El script screenshot.mjs vive en la raíz del proyecto. Úsalo tal cual.

Cómo usarlo:

Siempre toma screenshots desde localhost: node screenshot.mjs http://localhost:3000
Las screenshots se guardan automáticamente en ./temporary screenshots/screenshot-N.png (auto-incrementadas, nunca se sobreescriben)
Label opcional: node screenshot.mjs http://localhost:3000 label → guarda como screenshot-N-label.png

Después de cada screenshot:

Lee el PNG desde temporary screenshots/ con la herramienta Read para que puedas analizar la imagen directamente
Compara contra las referencias visuales en temporary screenshots/ref/ (si existen)
Sé específico al comparar: "el heading mide ~24px pero en la referencia son 32px", "el gap entre cards es 16px pero debería ser 24px"
Verifica: spacing/padding, font size/weight/line-height, colores (hex exacto), alineación, border-radius, sombras, tamaño de imágenes

El loop de diseño visual:

Haz un cambio en el código
Toma screenshot → node screenshot.mjs http://localhost:3000
Lee la screenshot y analiza
Compara contra la referencia
Identifica discrepancias → corrige → vuelve al paso 1
Cuando el resultado coincida con la referencia o esté aprobado, sigue adelante

Regla importante: No me pidas que valide visualmente si puedes tomar un screenshot y verificarlo tú mismo. Usa este loop para iterar rápido. Solo pregúntame si hay una decisión de diseño subjetiva que no puedas resolver comparando contra la referencia.

Estructura de Archivos
LANDING/
├── .claude/
│   └── skills/
│       ├── entrelampistas-design-system-SKILL.md  # Design system v3 (tokens, layout, componentes)
│       └── entrelampistas-SKILL.md                # Identidad editorial, público, tono
├── brand_assets/
│   └── Group 290.png       # Logo wordmark — usar con filter: brightness(0) invert(1) sobre fondo klein-deep
├── public/
│   └── fonts/              # Fuentes locales — cargar desde aquí con @font-face
│       ├── Fontspring-DEMO-neogrotesksc-regular.otf   # Neo Grotesque weight 400 (SC variant)
│       ├── Fontspring-DEMO-neogroteskess-light.otf    # Neo Grotesque weight 300
│       └── Fontspring-DEMO-neogroteskess-bold.otf     # Neo Grotesque weight 700
├── styles/
│   └── main.css            # CSS completo — Design system v3 aplicado
├── index.html              # Landing page principal
├── entrelampistas-SKILL.md # Copia raíz (referencia rápida)
├── landingweb.md           # ← ESTE ARCHIVO. Instrucciones del agente (framework WAT)
├── screenshot.mjs          # Script de Puppeteer para tomar screenshots
├── temporary screenshots/  # Screenshots del diseño (auto-generadas, descartables)
│   └── ref/                # Screenshots de referencia para comparar
│
│   — A crear conforme avance el proyecto —
│
├── src/                    # Código fuente del sitio
│   ├── pages/              # Páginas del sitio (sobre, archivo, etc.)
│   ├── components/         # Componentes reutilizables (nav, footer, card, etc.)
│   ├── layouts/            # Layouts base (article, page, landing)
│   └── content/            # Artículos y contenido en Markdown
├── workflows/              # Markdown SOPs — instrucciones de cada proceso
├── tools/                  # Scripts para ejecución determinista
├── .env                    # API keys y variables de entorno
└── package.json            # Dependencias del proyecto
Principio clave: Los archivos locales son para procesamiento. Lo que necesito ver o usar vive en el repo de GitHub y se despliega automáticamente.

## Design System v3 — Resumen operativo

### Paleta (variables CSS)
- `--klein-deep` `hsl(230,65%,28%)` → backdrop, header, footer, botón primario, headlines
- `--klein-vibrant` `hsl(230,75%,48%)` → section labels, hover links, acento interactivo
- `--rojo` `hsl(355,70%,48%)` → acento editorial, left-bar hover, definition border, highlight border, list dashes
- `--paper` `hsl(40,25%,96%)` → fondo del card principal (main)
- `--paper-warm` `hsl(38,30%,93%)` → fondo de definition-block
- `--ink` → texto principal · `--ink-mid` → texto secundario · `--ink-light` → meta, placeholder

### Tipografía — Neo Grotesque (único family)
- `font-weight: 400` → SC regular (small caps variant) — section labels, nav, meta, artículo titles
- `font-weight: 300` → Light — cuerpo de texto, hero intro, prosa de secciones
- `font-weight: 700` → Bold — statements, cierre-final, verticales titles
- **NUNCA** `font-style: italic` en ningún elemento
- **NUNCA** tipografía serif (sin Playfair Display ni Georgia)

### Layout base
```
body { background: var(--klein-deep) }  ← backdrop visible 0.25rem en lados
main {
  display: grid;
  grid-template-columns: 1fr min(48rem, 100%) 1fr;
  background: var(--paper);
  margin: 0 var(--space-xs);          ← sliver of klein-deep visible on sides
  border-radius: 0 0 0.5rem 0.5rem;
}
main > * { grid-column: 2; padding: 0 var(--space-md); }
```

### Componentes implementados
| Componente | Clase CSS | Descripción |
|---|---|---|
| Definition block | `.definition-block` | paper-warm bg, rojo left-border, palabra + fonética + texto |
| Highlight block | `.highlight-block` | rojo-bg tint, rojo left-border, texto con `.accent-rojo` |
| Section label | `.section-label` | uppercase, 0.7rem, 0.12em letter-spacing, klein-vibrant |
| Content list | `.content-list` | dashes rojos (`—`), items compactos |
| Statement | `.statement` | weight 700, cierre de sección fuerte |
| Featured article | `.featured-article` | hover: rojo left-bar crece, gradient overlay rojo-bg |
| Article list item | `.article-item` | hover: rojo left-bar crece, gradient overlay, title shifts right |
| Newsletter form | `.newsletter-form` | input surface blanco + botón klein-deep |
| Verticales list | `.verticales-list` | items separados por border, title bold + descripción ink-mid |

### UX patterns (microinteracciones)
- **Article hover**: `::before` bar (border → rojo, 1.25rem → 2.25rem), `::after` gradient rojo-bg, title `translateX(0.35rem)` + color klein-deep
- **Featured hover**: bar crece más (1.75rem → 3.5rem), mismo gradient
- **Nav links**: `rgba(255,255,255,0.55)` → `var(--paper)` on hover
- **Links inline**: underline con `text-decoration-color: var(--border)` → klein-vibrant on hover

Stack Técnico
CapaTecnologíaRazónFrameworkHTML/CSS/JS estático o AstroSimplicidad, velocidad, control total del diseñoEstilosCSS custom o TailwindCoherencia con el design system de EntrelampistasContenidoMarkdownPortable, limpio, fácil de migrarHostingGitHub Pages o Vercel/NetlifyDeploy automático desde GitHubDominioDominio actual de EntrelampistasRedirigir cuando el nuevo sitio esté listo

Nota: La decisión final de framework (HTML puro, Astro, Next.js estático, etc.) se tomará en workflows/build-deploy.md. Empieza con lo más simple que cumpla los requisitos.


Fases del Proyecto
Fase 1 — Design System

Definir tipografía, paleta, espaciado, componentes base
Documentar en workflows/design-system.md
Crear tokens CSS

Fase 2 — Landing Page

Diseñar y desarrollar la página principal
Seguir workflows/landing-page.md

Fase 3 — Templates de Contenido

Template de artículo/ensayo
Template de páginas estáticas
Seguir workflows/article-template.md y workflows/static-pages.md

Fase 4 — Migración de Contenido

Exportar contenido de WordPress
Convertir a Markdown
Seguir workflows/migrate-content.md

Fase 5 — Build y Deploy

Configurar build pipeline
Deploy a Vercel/Netlify
Seguir workflows/build-deploy.md


Bottom Line
Te sientas entre lo que quiero (workflows) y lo que se ejecuta (tools). Tu trabajo es leer instrucciones, tomar decisiones inteligentes, llamar las tools correctas, recuperarte de errores y mejorar el sistema continuamente.
Todo lo que generes debe respirar serenidad estructural.
Sé pragmático. Sé fiable. Sigue aprendiendo.