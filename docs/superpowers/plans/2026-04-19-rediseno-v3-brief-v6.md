# Rediseño Entrelampistas v3 — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseño integral de Entrelampistas alineado con el Master Brief v6, manteniendo la herencia de marca (Klein, diccionario, beliefs) y evolucionando tipografía (Inter), paleta extendida (Rojo reemplaza Amber), ilustraciones sketchy, y las 6 pantallas clave del sistema.

**Architecture:** Sistema estático HTML/CSS/JS, sin build step. Tokens CSS como única fuente de verdad. Fase 1 (foundation) merge invisible a `main`; fases 2-5 en `staging/v3-brief-v6` hasta deploy único. Worktree aislado opcional para fases 2+ (recomendado).

**Tech Stack:** HTML5 estático · CSS3 con custom properties · JavaScript vanilla · SVG inline con filtros · Inter Variable WOFF2 · JetBrains Mono WOFF2 · PostHog (ya instalado) · sin framework.

**Spec:** `docs/superpowers/specs/2026-04-19-rediseno-v3-brief-v6-design.md`

---

## Mapa de archivos

### Se crean
- `styles/tokens-v3.css` — nuevo sistema completo de tokens
- `styles/components-v3.css` — clases para los 20 componentes nuevos
- `public/fonts/Inter-Variable.woff2` — cuerpo + UI
- `public/fonts/Inter-Variable-Italic.woff2` — italics editoriales
- `public/fonts/JetBrainsMono-Variable.woff2` — metadata
- `illustrations/manifest.json` — catálogo semántico de SVGs
- `illustrations/*.svg` — 8 SVGs Lote 1 + lotes siguientes
- `dev/components.html` — galería interna no indexada
- `dev/illustrations.html` — galería de ilustraciones
- `dev/screens/capa.html` — prototipo plantilla Capa
- `docs/superpowers/system/v3-tokens.md` — documentación tokens
- 6 archivos de pantallas reescritas (ver Fase 4)

### Se modifican
- `styles/tokens.css` — añadir alias v2→v3, no romper nada
- `styles/base.css` — declarar Inter como fuente primaria con fallback
- `robots.txt` — asegurar `/dev/` está en Disallow
- `CLAUDE.md` — actualizar sección 5 (autoría anónima) post-deploy

### Se eliminan (Fase 1)
- `public/fonts/Fontspring-DEMO-*.otf` — riesgo legal/watermark
- `public/fonts/SpaceGrotesk-*.ttf` — reemplazadas por Inter (mantener .woff2 como fallback)

### No se tocan en este plan
- `index.html` hero (usuario pidió conservar el actual)
- 16 páginas legacy que no están en las 6 pantallas prioritarias
- PostHog / analytics.js
- Sitemap / feed.xml (se actualizan solo al publicar)

---

## Preflight

### Task 0: Verificar estado del repo y crear rama

**Files:**
- Check: `git status`
- Create: branch `staging/v3-brief-v6`

- [ ] **Step 0.1: Verificar working tree**

Run: `git -C /Users/r/Desktop/landing status`
Expected: hay modificaciones sin commitear (visible en el initial context).

- [ ] **Step 0.2: Preguntar al usuario antes de continuar**

Si hay cambios no comiteados, parar y preguntar al usuario: ¿commitear, stashear, o ignorar? **No tomar decisión destructiva.**

- [ ] **Step 0.3: Crear rama de staging**

Run:
```bash
git -C /Users/r/Desktop/landing checkout -b staging/v3-brief-v6
```
Expected: `Switched to a new branch 'staging/v3-brief-v6'`

- [ ] **Step 0.4: Confirmar commit base**

Run: `git -C /Users/r/Desktop/landing log --oneline -1`
Expected: commit `2458943` (spec committed) como HEAD.

---

## Fase 1 — Foundation invisible

**Objetivo:** instalar el sistema de tokens v3 y fuentes Inter/JetBrains Mono sin cambiar nada visualmente. Merge directo a `main` al final de la fase.

### Task 1: Descargar fuentes Inter Variable WOFF2

**Files:**
- Create: `public/fonts/Inter-Variable.woff2`
- Create: `public/fonts/Inter-Variable-Italic.woff2`
- Create: `public/fonts/JetBrainsMono-Variable.woff2`

- [ ] **Step 1.1: Descargar Inter Variable desde rsms.me/inter**

Run:
```bash
cd /Users/r/Desktop/landing/public/fonts
curl -L -o Inter-Variable.woff2 "https://github.com/rsms/inter/raw/master/docs/font-files/InterVariable.woff2"
curl -L -o Inter-Variable-Italic.woff2 "https://github.com/rsms/inter/raw/master/docs/font-files/InterVariable-Italic.woff2"
```

- [ ] **Step 1.2: Verificar peso razonable (<400KB cada uno)**

Run: `ls -lh /Users/r/Desktop/landing/public/fonts/Inter-Variable*.woff2`
Expected: cada archivo entre 150KB y 400KB.

- [ ] **Step 1.3: Descargar JetBrains Mono Variable**

Run:
```bash
cd /Users/r/Desktop/landing/public/fonts
curl -L -o JetBrainsMono-Variable.woff2 "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/variable/JetBrainsMono%5Bwght%5D.woff2"
```
Expected: archivo en directorio, ~100-200KB.

- [ ] **Step 1.4: Probar carga local**

Crear archivo temporal `public/fonts/_test.html` con `<link rel="preload" href="Inter-Variable.woff2" as="font" crossorigin>` y un `<p>` estilizado con `font-family: 'Inter'`.
Abrir en navegador localmente y verificar que Inter renderiza.
Borrar `_test.html` después.

- [ ] **Step 1.5: Commit fuentes**

```bash
git -C /Users/r/Desktop/landing add public/fonts/Inter-Variable.woff2 public/fonts/Inter-Variable-Italic.woff2 public/fonts/JetBrainsMono-Variable.woff2
git -C /Users/r/Desktop/landing commit -m "feat(v3): añade fuentes Inter Variable + JetBrains Mono WOFF2"
```

### Task 2: Eliminar fuentes DEMO (riesgo legal) y TTFs obsoletas

**Files:**
- Delete: `public/fonts/Fontspring-DEMO-*.otf` (3 archivos)
- Delete: `public/fonts/SpaceGrotesk-Light.ttf`
- Delete: `public/fonts/SpaceGrotesk-Bold.ttf`
- Delete: `public/fonts/SpaceGrotesk-Regular.ttf`
- Mantener: `public/fonts/SpaceGrotesk-Regular.woff2` (fallback transicional)

- [ ] **Step 2.1: Verificar qué se va a borrar**

Run: `ls /Users/r/Desktop/landing/public/fonts/`
Expected: muestra Fontspring-DEMO-*.otf y SpaceGrotesk-*.ttf.

- [ ] **Step 2.2: Grep global para uso de DEMO fonts**

Run: `grep -r "Fontspring-DEMO" /Users/r/Desktop/landing --include="*.css" --include="*.html" --exclude-dir=node_modules --exclude-dir=.superpowers`
Expected: idealmente cero resultados. Si hay referencias, arreglarlas antes de borrar.

- [ ] **Step 2.3: Eliminar archivos DEMO**

```bash
cd /Users/r/Desktop/landing/public/fonts
rm Fontspring-DEMO-neogroteskess-bold.otf
rm Fontspring-DEMO-neogroteskess-light.otf
rm Fontspring-DEMO-neogrotesksc-regular.otf
```

- [ ] **Step 2.4: Grep global para uso de SpaceGrotesk TTF**

Run: `grep -r "SpaceGrotesk.*\.ttf" /Users/r/Desktop/landing --include="*.css" --include="*.html" --exclude-dir=node_modules --exclude-dir=.superpowers`

Si hay referencias: primero arreglarlas (apuntar a `.woff2`) antes de borrar los `.ttf`. Si no hay: proceder.

- [ ] **Step 2.5: Eliminar TTFs (solo si no hay referencias)**

```bash
cd /Users/r/Desktop/landing/public/fonts
rm -f SpaceGrotesk-Light.ttf SpaceGrotesk-Bold.ttf SpaceGrotesk-Regular.ttf
```

- [ ] **Step 2.6: Commit eliminación**

```bash
git -C /Users/r/Desktop/landing add -u public/fonts/
git -C /Users/r/Desktop/landing commit -m "chore(v3): elimina fuentes DEMO (riesgo legal) y TTFs obsoletas"
```

### Task 3: Crear `styles/tokens-v3.css` con todo el sistema

**Files:**
- Create: `styles/tokens-v3.css`

- [ ] **Step 3.1: Escribir el archivo completo**

Contenido exacto:

```css
/* =====================================================
   Entrelampistas · Tokens v3 · Derivados del Brief v6
   Fuente: docs/superpowers/specs/2026-04-19-rediseno-v3-brief-v6-design.md
   ===================================================== */

:root {
  /* ===== FOUNDATION ===== */
  --v3-paper:          hsl(40, 25%, 96%);
  --v3-paper-light:    hsl(40, 50%, 98%);
  --v3-paper-warm:     hsl(38, 30%, 93%);
  --v3-paper-clean:    #FFFFFF;
  --v3-ink:            hsl(0, 0%, 10%);
  --v3-ink-mid:        hsl(0, 0%, 33%);
  --v3-ink-light:      hsl(0, 0%, 53%);
  --v3-rule:           hsl(40, 15%, 85%);

  /* ===== KLEIN ===== */
  --v3-klein-night:    hsl(228, 67%, 21%);
  --v3-klein-deep:     hsl(228, 70%, 35%);
  --v3-klein-vibrant:  hsl(228, 100%, 59%);
  --v3-klein-tint:     hsl(228, 100%, 95%);

  /* ===== ROJO (reemplaza Amber) ===== */
  --v3-rojo-dark:      hsl(11, 80%, 27%);
  --v3-rojo:           hsl(11, 75%, 42%);
  --v3-rojo-vibrant:   hsl(11, 74%, 51%);
  --v3-rojo-light:     hsl(11, 82%, 84%);
  --v3-rojo-tint:      hsl(11, 80%, 96%);

  /* ===== SAGE (opcional) ===== */
  --v3-sage:           hsl(105, 16%, 47%);
  --v3-sage-tint:      hsl(105, 20%, 92%);

  /* ===== TYPOGRAPHY ===== */
  --v3-f-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --v3-f-mono: 'JetBrains Mono', ui-monospace, monospace;

  --v3-t-display: 300 48px/1.05 var(--v3-f-sans);
  --v3-t-h1:      300 36px/1.1  var(--v3-f-sans);
  --v3-t-h2:      400 26px/1.15 var(--v3-f-sans);
  --v3-t-lead:    400 20px/1.5  var(--v3-f-sans);
  --v3-t-body:    400 17px/1.65 var(--v3-f-sans);
  --v3-t-ui:      500 14px/1.5  var(--v3-f-sans);
  --v3-t-mono:    500 11px/1.4  var(--v3-f-mono);

  /* ===== SPACING ===== */
  --v3-sp-1:  4px;
  --v3-sp-2:  8px;
  --v3-sp-3:  12px;
  --v3-sp-4:  16px;
  --v3-sp-5:  20px;
  --v3-sp-6:  24px;
  --v3-sp-7:  32px;
  --v3-sp-8:  48px;
  --v3-sp-9:  64px;
  --v3-sp-10: 96px;
  --v3-sp-11: 128px;

  /* ===== RADIOS ===== */
  --v3-radius-sm:   4px;
  --v3-radius-md:   8px;
  --v3-radius-lg:   12px;
  --v3-radius-xl:   16px;
  --v3-radius-pill: 100px;

  /* ===== SHADOWS ===== */
  --v3-shadow-soft: 0 1px 3px rgba(0,0,0,0.06);
  --v3-shadow-card: 0 8px 24px rgba(26, 52, 153, 0.08);

  /* ===== MOTION ===== */
  --v3-ease-out:      cubic-bezier(0.33, 1, 0.68, 1);
  --v3-duration-fast: 200ms;
  --v3-duration-med:  350ms;
  --v3-duration-slow: 500ms;
}

/* ===== FONT-FACE DECLARATIONS ===== */
@font-face {
  font-family: 'Inter';
  src: url('/public/fonts/Inter-Variable.woff2') format('woff2-variations'),
       url('/public/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/public/fonts/Inter-Variable-Italic.woff2') format('woff2-variations'),
       url('/public/fonts/Inter-Variable-Italic.woff2') format('woff2');
  font-weight: 300 700;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/public/fonts/JetBrainsMono-Variable.woff2') format('woff2-variations'),
       url('/public/fonts/JetBrainsMono-Variable.woff2') format('woff2');
  font-weight: 400 500;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3.2: Validar CSS sintácticamente**

Abrir `styles/tokens-v3.css` en VS Code o validador CSS (csslint online).
Expected: cero errores de sintaxis.

- [ ] **Step 3.3: Commit tokens v3**

```bash
git -C /Users/r/Desktop/landing add styles/tokens-v3.css
git -C /Users/r/Desktop/landing commit -m "feat(v3): sistema de tokens v3 con Inter + paleta extendida"
```

### Task 4: Añadir preload de fuentes v3 en archivos que lo necesitan

**Files:**
- Modify: `index.html` (verificar qué preload hay actualmente)

- [ ] **Step 4.1: Verificar preload actual**

Run: `grep -n "rel=\"preload\"" /Users/r/Desktop/landing/index.html`
Expected: lista de preloads existentes.

- [ ] **Step 4.2: Añadir preloads v3 sin romper los existentes**

Editar `index.html` en el `<head>`, añadir tras los preloads existentes:

```html
<link rel="preload" href="/public/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/public/fonts/JetBrainsMono-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles/tokens-v3.css">
```

**Importante:** no tocar el CSS existente ni el `font-family` actual. Solo cargar los tokens v3 sin aplicarlos todavía.

- [ ] **Step 4.3: Verificar que la página renderiza igual**

Abrir `index.html` en navegador local.
Expected: render idéntico al actual, ningún cambio visible. Si hay cambios, investigar y revertir.

- [ ] **Step 4.4: Commit preloads**

```bash
git -C /Users/r/Desktop/landing add index.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): preload de fuentes v3 en home (invisible)"
```

### Task 5: Documentar sistema de tokens

**Files:**
- Create: `docs/superpowers/system/v3-tokens.md`

- [ ] **Step 5.1: Escribir documentación**

Crear `docs/superpowers/system/v3-tokens.md` con:

```markdown
# Sistema de tokens v3

Derivado del Master Brief v6. Todas las variables llevan prefijo `--v3-` para no colisionar con los tokens v2 actuales durante la transición.

## Uso

1. Importar en `<head>`: `<link rel="stylesheet" href="/styles/tokens-v3.css">`
2. Referenciar con `var(--v3-klein-deep)`, `var(--v3-t-body)`, etc.
3. Una vez completada la Fase 5 y deprecada la v2, se renombran sin prefijo.

## Mapeo v2 → v3

| v2 (actual) | v3 (nuevo) | Notas |
|---|---|---|
| `--klein-deep` | `--v3-klein-deep` | Mismo valor (hsl 228,70%,35%) |
| `--rojo` | `--v3-rojo` | Mismo valor (hsl 11,75%,42%) |
| `--paper` | `--v3-paper` | Mismo valor |
| `--font` (Space Grotesk) | `--v3-f-sans` (Inter) | **Cambio de fuente** |
| `--klein-vibrant` | `--v3-klein-vibrant` | Mismo valor |
| Sin equivalente | `--v3-rojo-light`, `--v3-rojo-tint` | Nuevos niveles |
| Sin equivalente | `--v3-sage` | Nuevo color opcional |
| Sin equivalente | `--v3-radius-*` | Sistema de radios nuevo |

## Fuentes

- `Inter-Variable.woff2` — cuerpo + UI (pesos 300-700)
- `Inter-Variable-Italic.woff2` — italics editoriales
- `JetBrainsMono-Variable.woff2` — metadata, kickers, tags (pesos 400-500)

Todas en `public/fonts/`, auto-hospedadas, sin Google Fonts en producción.

## Qué se eliminó en Fase 1

- `Fontspring-DEMO-*.otf` — riesgo legal, watermark
- `SpaceGrotesk-*.ttf` — reemplazadas por Inter
- `SpaceGrotesk-Regular.woff2` se mantiene temporalmente como fallback.
```

- [ ] **Step 5.2: Commit documentación**

```bash
git -C /Users/r/Desktop/landing add docs/superpowers/system/v3-tokens.md
git -C /Users/r/Desktop/landing commit -m "docs(v3): documentación del sistema de tokens"
```

### Task 6: Fase 1 — cierre y merge a main

- [ ] **Step 6.1: Lighthouse baseline en `main`**

Run (o ejecutar en navegador): `npx lighthouse http://localhost:<puerto>/index.html` y guardar reporte como `v3-phase1-baseline.html`.
Expected: tiene el baseline antes del merge.

- [ ] **Step 6.2: Merge `staging/v3-brief-v6` a `main`**

```bash
git -C /Users/r/Desktop/landing checkout main
git -C /Users/r/Desktop/landing merge staging/v3-brief-v6 --no-ff -m "feat(v3): Fase 1 — foundation (invisible) completa"
```

- [ ] **Step 6.3: Verificar Lighthouse post-merge**

Volver a correr lighthouse. Expected: igual o mejor que baseline.

- [ ] **Step 6.4: Volver a staging para seguir con Fase 2**

```bash
git -C /Users/r/Desktop/landing checkout staging/v3-brief-v6
```

---

## Fase 2 — Sistema de ilustración (Lote 1)

**Objetivo:** 8 SVGs canónicos que establezcan el vocabulario doodle sketchy. Gate de validación antes de producir los siguientes lotes.

### Task 7: Estructura de directorios y filtro SVG base

**Files:**
- Create: `illustrations/`
- Create: `illustrations/_shared/rough-filter.svg`
- Create: `illustrations/manifest.json` (vacío inicial)

- [ ] **Step 7.1: Crear directorio**

```bash
mkdir -p /Users/r/Desktop/landing/illustrations/_shared
```

- [ ] **Step 7.2: Crear filtro compartido**

Crear `illustrations/_shared/rough-filter.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute">
  <defs>
    <filter id="v3-rough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="3" result="turb"/>
      <feDisplacementMap in="SourceGraphic" in2="turb" scale="1.4"/>
    </filter>
  </defs>
</svg>
```

Este filtro se importa una vez en cada HTML y se aplica a SVGs con `filter="url(#v3-rough)"`.

- [ ] **Step 7.3: Crear manifest vacío**

Crear `illustrations/manifest.json`:

```json
{
  "version": "1.0",
  "schema": "https://entrelampistas.com/schemas/illustrations.json",
  "illustrations": {}
}
```

- [ ] **Step 7.4: Commit estructura**

```bash
git -C /Users/r/Desktop/landing add illustrations/
git -C /Users/r/Desktop/landing commit -m "feat(v3): estructura de illustrations + filtro sketchy compartido"
```

### Task 8: Producir SVG 01 — Dimensión Atención (Clay/Rojo)

**Files:**
- Create: `illustrations/atencion.svg`

- [ ] **Step 8.1: Escribir SVG**

Crear `illustrations/atencion.svg`. Concepto: una figura humana mirando múltiples pantallas que le "jalan" con líneas punteadas; expresa interrupción / captura.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Atención · captura sensorial">
  <title>Atención</title>
  <desc>Figura central con flujos de captura desde elementos externos.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <!-- Cabeza central -->
    <circle cx="120" cy="100" r="28"/>
    <!-- Torso -->
    <path d="M 92 128 Q 92 160, 98 180 L 98 210"/>
    <path d="M 148 128 Q 148 160, 142 180 L 142 210"/>
    <!-- Pantallas externas -->
    <rect x="20" y="60" width="44" height="32" rx="3"/>
    <rect x="176" y="60" width="44" height="32" rx="3"/>
    <rect x="100" y="20" width="44" height="28" rx="3"/>
    <!-- Líneas de captura punteadas -->
    <path d="M 64 76 Q 90 82, 96 96" stroke-dasharray="3 3"/>
    <path d="M 176 76 Q 150 82, 144 96" stroke-dasharray="3 3"/>
    <path d="M 122 48 Q 120 60, 120 72" stroke-dasharray="3 3"/>
    <!-- Punto acento en una pantalla -->
    <circle cx="42" cy="76" r="3" fill="currentColor"/>
  </g>
</svg>
```

- [ ] **Step 8.2: Abrir en navegador y verificar carácter sketchy**

Crear un HTML temporal de preview. Si el filtro no está aplicado visiblemente, revisar el import de `rough-filter.svg`.

- [ ] **Step 8.3: Añadir entrada al manifest**

Editar `illustrations/manifest.json`, añadir dentro de `illustrations`:

```json
"atencion": {
  "file": "atencion.svg",
  "concept": "Atención",
  "frame": "rojo-tint",
  "color": "rojo",
  "tags": ["captura", "interrupción", "plataformas"],
  "territorio": "habitabilidad",
  "dimension": "atencion"
}
```

- [ ] **Step 8.4: Commit SVG 01**

```bash
git -C /Users/r/Desktop/landing add illustrations/atencion.svg illustrations/manifest.json
git -C /Users/r/Desktop/landing commit -m "feat(v3): ilustración 01/08 — Atención (dimensión Habitabilidad)"
```

### Task 9: Producir SVGs 02-04 — Autonomía · Deliberación · Entorno

**Files:**
- Create: `illustrations/autonomia.svg` (Klein)
- Create: `illustrations/deliberacion.svg` (Sage)
- Create: `illustrations/entorno.svg` (Rojo vibrante)

- [ ] **Step 9.1: SVG 02 · Autonomía**

Concepto: figura de pie, sola, con un círculo de límite a su alrededor — independencia, espacio propio.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Autonomía cognitiva">
  <title>Autonomía</title>
  <desc>Figura central delimitada por un círculo de espacio propio.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <circle cx="120" cy="120" r="90" stroke-dasharray="4 6"/>
    <circle cx="120" cy="95" r="22"/>
    <path d="M 98 120 Q 98 150, 104 175 L 104 205"/>
    <path d="M 142 120 Q 142 150, 136 175 L 136 205"/>
    <path d="M 120 120 L 120 170"/>
  </g>
</svg>
```

- [ ] **Step 9.2: SVG 03 · Deliberación**

Concepto: mano pausada sobre dos opciones — el momento de decisión.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Deliberación · pausa reflexiva">
  <title>Deliberación</title>
  <desc>Dos opciones visibles, mano pausada en el espacio entre ambas.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <rect x="30" y="80" width="70" height="90" rx="6"/>
    <rect x="140" y="80" width="70" height="90" rx="6"/>
    <path d="M 45 105 L 85 105 M 45 125 L 75 125"/>
    <path d="M 155 105 L 195 105 M 155 125 L 185 125"/>
    <circle cx="120" cy="125" r="12"/>
    <path d="M 120 137 L 120 180"/>
    <line x1="120" y1="45" x2="120" y2="70" stroke-dasharray="3 3"/>
  </g>
</svg>
```

- [ ] **Step 9.3: SVG 04 · Entorno**

Concepto: casa estilizada + silueta digital — habitabilidad física y digital fusionadas.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Entorno · físico y digital">
  <title>Entorno</title>
  <desc>Casa + pantalla digital superpuestos, el entorno es ambas cosas.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <path d="M 40 190 L 40 110 L 100 70 L 160 110 L 160 190 Z"/>
    <rect x="75" y="140" width="50" height="50"/>
    <rect x="135" y="100" width="80" height="60" rx="3"/>
    <line x1="145" y1="115" x2="205" y2="115"/>
    <line x1="145" y1="130" x2="195" y2="130"/>
    <line x1="145" y1="145" x2="185" y2="145"/>
    <circle cx="165" cy="180" r="3" fill="currentColor"/>
  </g>
</svg>
```

- [ ] **Step 9.4: Añadir al manifest**

Añadir 3 entradas a `illustrations/manifest.json` siguiendo el patrón del paso 8.3:

```json
"autonomia": { "file": "autonomia.svg", "concept": "Autonomía cognitiva", "frame": "klein-tint", "color": "klein-deep", "tags": ["independencia","criterio","método"], "territorio": "autonomia-mental", "dimension": "autonomia" },
"deliberacion": { "file": "deliberacion.svg", "concept": "Deliberación", "frame": "sage-tint", "color": "sage", "tags": ["pausa","decisión","sistema-2"], "territorio": "autonomia-mental", "dimension": "deliberacion" },
"entorno": { "file": "entorno.svg", "concept": "Entorno habitable", "frame": "rojo-tint", "color": "rojo-vibrant", "tags": ["habitabilidad","físico","digital"], "territorio": "habitabilidad", "dimension": "entorno" }
```

- [ ] **Step 9.5: Commit lote 02-04**

```bash
git -C /Users/r/Desktop/landing add illustrations/
git -C /Users/r/Desktop/landing commit -m "feat(v3): ilustraciones 02-04/08 — dimensiones Autonomía · Deliberación · Entorno"
```

### Task 10: Producir SVGs 05-08 — conceptos más usados

**Files:**
- Create: `illustrations/habitabilidad-digital.svg`
- Create: `illustrations/sesgos-cognitivos.svg`
- Create: `illustrations/sistema-1-2.svg`
- Create: `illustrations/economia-atencion.svg`

- [ ] **Step 10.1: SVG 05 · Habitabilidad digital**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Habitabilidad digital">
  <title>Habitabilidad digital</title>
  <desc>Figura dentro de un espacio digital que la contiene bien.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <rect x="30" y="40" width="180" height="160" rx="8"/>
    <line x1="30" y1="60" x2="210" y2="60"/>
    <circle cx="42" cy="50" r="2.5" fill="currentColor"/>
    <circle cx="52" cy="50" r="2.5"/>
    <circle cx="62" cy="50" r="2.5"/>
    <circle cx="120" cy="120" r="18"/>
    <path d="M 105 138 Q 105 160, 110 175 L 110 190"/>
    <path d="M 135 138 Q 135 160, 130 175 L 130 190"/>
  </g>
</svg>
```

- [ ] **Step 10.2: SVG 06 · Sesgos cognitivos**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Sesgos cognitivos">
  <title>Sesgos cognitivos</title>
  <desc>Mapa con rutas invisibles preferentes.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <circle cx="120" cy="120" r="85"/>
    <path d="M 60 100 Q 90 80, 120 90 Q 150 100, 180 85" stroke-dasharray="4 4"/>
    <path d="M 55 140 Q 100 150, 140 135 Q 175 120, 190 140" stroke-dasharray="4 4"/>
    <circle cx="85" cy="90" r="4" fill="currentColor"/>
    <circle cx="160" cy="95" r="4" fill="currentColor"/>
    <circle cx="130" cy="145" r="4" fill="currentColor"/>
  </g>
</svg>
```

- [ ] **Step 10.3: SVG 07 · Sistema 1 / Sistema 2**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Sistema 1 y Sistema 2">
  <title>Sistema 1 / Sistema 2</title>
  <desc>Dos modos de procesamiento: rápido intuitivo vs lento deliberado.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <circle cx="75" cy="120" r="40"/>
    <text x="75" y="126" text-anchor="middle" font-family="Inter" font-size="22" font-weight="600" fill="currentColor" stroke="none">1</text>
    <path d="M 115 120 L 165 120" marker-end="url(#arrow)"/>
    <circle cx="195" cy="120" r="40" stroke-dasharray="5 3"/>
    <text x="195" y="126" text-anchor="middle" font-family="Inter" font-size="22" font-weight="600" fill="currentColor" stroke="none">2</text>
  </g>
</svg>
```

- [ ] **Step 10.4: SVG 08 · Economía de la atención**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Economía de la atención">
  <title>Economía de la atención</title>
  <desc>Atención como flujo capturado por múltiples demandantes.</desc>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#v3-rough)">
    <circle cx="120" cy="60" r="16"/>
    <rect x="30" y="140" width="44" height="32" rx="3"/>
    <rect x="96" y="140" width="44" height="32" rx="3"/>
    <rect x="162" y="140" width="44" height="32" rx="3"/>
    <path d="M 120 76 L 52 140" stroke-dasharray="3 3"/>
    <path d="M 120 76 L 120 140" stroke-dasharray="3 3"/>
    <path d="M 120 76 L 184 140" stroke-dasharray="3 3"/>
    <circle cx="52" cy="156" r="3" fill="currentColor"/>
    <circle cx="118" cy="156" r="3" fill="currentColor"/>
    <circle cx="184" cy="156" r="3" fill="currentColor"/>
  </g>
</svg>
```

- [ ] **Step 10.5: Añadir las 4 al manifest**

Patrón:

```json
"habitabilidad-digital": { "file": "habitabilidad-digital.svg", "concept": "Habitabilidad digital", "frame": "rojo-tint", "color": "rojo", "tags": ["entorno","pantalla","plataforma"], "territorio": "habitabilidad" },
"sesgos-cognitivos": { "file": "sesgos-cognitivos.svg", "concept": "Sesgos cognitivos", "frame": "klein-tint", "color": "klein-deep", "tags": ["cognición","decisión","mapas"], "territorio": "autonomia-mental" },
"sistema-1-2": { "file": "sistema-1-2.svg", "concept": "Sistema 1 / Sistema 2", "frame": "klein-tint", "color": "klein-deep", "tags": ["kahneman","procesamiento"], "territorio": "autonomia-mental" },
"economia-atencion": { "file": "economia-atencion.svg", "concept": "Economía de la atención", "frame": "rojo-tint", "color": "rojo", "tags": ["captura","plataformas"], "territorio": "habitabilidad" }
```

- [ ] **Step 10.6: Commit lote 05-08**

```bash
git -C /Users/r/Desktop/landing add illustrations/
git -C /Users/r/Desktop/landing commit -m "feat(v3): ilustraciones 05-08/08 — conceptos base (habitabilidad, sesgos, sistema 1/2, atención)"
```

### Task 11: Galería de ilustraciones · gate de validación

**Files:**
- Create: `dev/illustrations.html`

- [ ] **Step 11.1: Crear galería HTML**

Crear `dev/illustrations.html`. Muestra los 8 SVGs con nombre, frame asignado, tags, territorio. Estructura mínima:

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Entrelampistas · Ilustraciones Lote 1</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/styles/tokens-v3.css">
<style>
body { font-family: var(--v3-f-sans); background: var(--v3-paper); color: var(--v3-ink); padding: 48px; }
h1 { font: var(--v3-t-h1); margin-bottom: 32px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.item { background: var(--v3-paper-clean); border: 1px solid var(--v3-rule); border-radius: var(--v3-radius-lg); padding: 20px; }
.illust-box { aspect-ratio: 1; border-radius: var(--v3-radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.meta { font: var(--v3-t-mono); text-transform: uppercase; letter-spacing: 0.18em; color: var(--v3-ink-light); margin-bottom: 6px; }
.name { font-size: 18px; font-weight: 500; margin-bottom: 4px; }
.tags { font-size: 12px; color: var(--v3-ink-mid); }
</style>
</head>
<body>
<!-- Import del filtro compartido -->
<svg width="0" height="0" style="position:absolute">
  <defs>
    <filter id="v3-rough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="3" result="turb"/>
      <feDisplacementMap in="SourceGraphic" in2="turb" scale="1.4"/>
    </filter>
  </defs>
</svg>

<h1>Ilustraciones · Lote 1 · 8/8</h1>

<div class="grid" id="grid"></div>

<script>
const items = [
  { file: 'atencion', name: 'Atención', frame: 'var(--v3-rojo-tint)', color: 'var(--v3-rojo)', tags: 'captura · interrupción' },
  { file: 'autonomia', name: 'Autonomía', frame: 'var(--v3-klein-tint)', color: 'var(--v3-klein-deep)', tags: 'independencia · método' },
  { file: 'deliberacion', name: 'Deliberación', frame: 'var(--v3-sage-tint)', color: 'var(--v3-sage)', tags: 'pausa · decisión' },
  { file: 'entorno', name: 'Entorno', frame: 'var(--v3-rojo-tint)', color: 'var(--v3-rojo-vibrant)', tags: 'habitabilidad · físico · digital' },
  { file: 'habitabilidad-digital', name: 'Habitabilidad digital', frame: 'var(--v3-rojo-tint)', color: 'var(--v3-rojo)', tags: 'entorno · pantalla' },
  { file: 'sesgos-cognitivos', name: 'Sesgos cognitivos', frame: 'var(--v3-klein-tint)', color: 'var(--v3-klein-deep)', tags: 'cognición · mapas' },
  { file: 'sistema-1-2', name: 'Sistema 1 / 2', frame: 'var(--v3-klein-tint)', color: 'var(--v3-klein-deep)', tags: 'Kahneman · procesamiento' },
  { file: 'economia-atencion', name: 'Economía de la atención', frame: 'var(--v3-rojo-tint)', color: 'var(--v3-rojo)', tags: 'captura · plataformas' }
];
const grid = document.getElementById('grid');
items.forEach(async (it, i) => {
  const resp = await fetch(`/illustrations/${it.file}.svg`);
  const svgText = await resp.text();
  const box = document.createElement('div');
  box.className = 'item';
  box.innerHTML = `
    <div class="illust-box" style="background:${it.frame};color:${it.color}">${svgText}</div>
    <div class="meta">0${i+1} · ${it.file}</div>
    <div class="name">${it.name}</div>
    <div class="tags">${it.tags}</div>
  `;
  grid.appendChild(box);
});
</script>
</body>
</html>
```

- [ ] **Step 11.2: Abrir galería en navegador local**

Arrancar servidor local:
```bash
cd /Users/r/Desktop/landing && python3 -m http.server 8787
```

Abrir `http://localhost:8787/dev/illustrations.html`.

- [ ] **Step 11.3: GATE DE VALIDACIÓN — usuario revisa los 8 SVGs**

**PARAR AQUÍ.** Pedir al usuario que revise la galería. Preguntas:
- ¿El carácter doodle sketchy funciona?
- ¿Algún SVG no transmite su concepto?
- ¿La variación de color entre dimensiones funciona?
- ¿Seguimos con Lote 2 o iteramos Lote 1?

**No continuar a Fase 3 hasta aprobación explícita.**

- [ ] **Step 11.4: Bloquear `/dev/` en robots.txt**

Verificar que `robots.txt` tiene:
```
Disallow: /dev/
```
Si no, añadirlo.

- [ ] **Step 11.5: Commit galería**

```bash
git -C /Users/r/Desktop/landing add dev/illustrations.html robots.txt
git -C /Users/r/Desktop/landing commit -m "feat(v3): galería de ilustraciones Lote 1 (noindex)"
```

---

## Fase 3 — Biblioteca de componentes

**Objetivo:** portar los 20 componentes de la galería v2 (validada en brainstorming) a CSS reutilizable en producción.

### Task 12: Crear `styles/components-v3.css` base

**Files:**
- Create: `styles/components-v3.css`

- [ ] **Step 12.1: Crear archivo con clases estructurales**

Copiar el CSS de componentes desde `.superpowers/brainstorm/17502-1776622422/content/component-gallery-v2.html` — toda la sección `/* ===== COMPONENTS ===== */`. Adaptar nombres:

- Prefijar todas las clases con `v3-` (e.g. `.c-nav` → `.v3-nav`)
- Reemplazar todas las variables CSS por las `--v3-*` definidas en Task 3
- No copiar la parte de `.page-header`, `.section-block`, `.demo-frame`, `.index` — son de la galería, no del sistema

Archivo mínimo esperado: ~400-500 líneas CSS cubriendo los 20 componentes.

- [ ] **Step 12.2: Validar sintaxis**

Abrir archivo, verificar que no hay errores de sintaxis CSS.

- [ ] **Step 12.3: Commit**

```bash
git -C /Users/r/Desktop/landing add styles/components-v3.css
git -C /Users/r/Desktop/landing commit -m "feat(v3): biblioteca de componentes CSS — 20 componentes"
```

### Task 13: Crear galería de componentes en `/dev/components.html`

**Files:**
- Create: `dev/components.html`

- [ ] **Step 13.1: Portar galería v2 a producción**

Copiar el HTML completo de `.superpowers/brainstorm/17502-1776622422/content/component-gallery-v2.html` a `dev/components.html`. Adaptaciones:

- Reemplazar las `<style>` inline del body por `<link rel="stylesheet" href="/styles/tokens-v3.css">` + `<link rel="stylesheet" href="/styles/components-v3.css">`
- Cambiar todas las clases `c-*` por `v3-*` para que matcheen components-v3.css
- Añadir `<meta name="robots" content="noindex">`
- Importar filtro sketchy compartido

- [ ] **Step 13.2: Abrir en navegador y verificar paridad con galería v2**

Expected: render visualmente idéntico a la galería v2 que el usuario aprobó.

- [ ] **Step 13.3: Commit galería**

```bash
git -C /Users/r/Desktop/landing add dev/components.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): galería de componentes en dev/ (paridad con v2 aprobada)"
```

---

## Fase 4 — Las 6 pantallas (prioridad)

**Objetivo:** aplicar el sistema a las 6 pantallas clave. Orden estricto de producción: Capa → Home → Herramienta → Archivo → Concepto → Newsletter.

### Task 14: Prototipo plantilla de Capa (PRIORIDAD 1)

**Files:**
- Create: `dev/screens/capa.html`

- [ ] **Step 14.1: Construir plantilla completa**

Crear `dev/screens/capa.html` con la composición definida en el spec sección 7.1:

- Nav v3
- Kicker mono
- H1 display con italics en acento
- ArticleMeta (anónimo)
- DepthTabs
- AEOSummary
- Body con cuerpo, pullquotes, concept inlines, callouts, ilustraciones intercaladas
- FAQ section (5 preguntas reales sobre habitabilidad digital)
- InsightMockup
- Related Capa
- Newsletter CTA
- Footer

Contenido de muestra: usar el ensayo real `habitabilidad-digital.html` como fuente de texto para no inventar.

- [ ] **Step 14.2: Validar en navegador**

Abrir `http://localhost:8787/dev/screens/capa.html`. Expected: se ve como Capa de alta calidad, estilo Slite.

- [ ] **Step 14.3: Lighthouse**

Run Lighthouse sobre la plantilla. Expected: accesibilidad ≥95.

- [ ] **Step 14.4: GATE DE VALIDACIÓN — usuario revisa la plantilla**

**PARAR.** Pedir al usuario revisión. Preguntas:
- ¿La densidad / ritmo funciona?
- ¿La intercalación de ilustraciones funciona?
- ¿Los pullquotes y callouts están bien ubicados?

- [ ] **Step 14.5: Commit prototipo**

```bash
git -C /Users/r/Desktop/landing add dev/screens/capa.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): prototipo plantilla de Capa"
```

### Task 15: Aplicar plantilla a una Capa real (pilot)

**Files:**
- Modify: `habitabilidad-digital.html` (o crear copia `habitabilidad-digital-v3.html` primero)

- [ ] **Step 15.1: Crear archivo v3 sin tocar el original**

```bash
cp /Users/r/Desktop/landing/habitabilidad-digital.html /Users/r/Desktop/landing/habitabilidad-digital-v3.html
```

- [ ] **Step 15.2: Reescribir header + CSS links**

Reemplazar el `<head>` para usar `tokens-v3.css` + `components-v3.css`. Mantener schemas JSON-LD (Article + FAQPage + BreadcrumbList) — actualizar el `author` a `Organization` solo.

- [ ] **Step 15.3: Reemplazar estructura del body**

Aplicar la plantilla de `dev/screens/capa.html` con el contenido real del ensayo.

- [ ] **Step 15.4: Intercalar 4 ilustraciones relevantes del Lote 1**

- Inicio → `habitabilidad-digital.svg` en frame rojo-tint
- Mid-1 → `atencion.svg` en frame rojo-tint
- Mid-2 → `autonomia.svg` en frame klein-tint
- Near-end → `entorno.svg` en frame rojo-tint

- [ ] **Step 15.5: GATE DE VALIDACIÓN**

**PARAR.** Usuario revisa la Capa real migrada.

- [ ] **Step 15.6: Commit pilot**

```bash
git -C /Users/r/Desktop/landing add habitabilidad-digital-v3.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): pilot — habitabilidad-digital.html migrada a plantilla v3"
```

### Task 16: Home (PRIORIDAD 2)

**Files:**
- Create: `dev/screens/home.html` (prototipo)

- [ ] **Step 16.1: Construir prototipo Home**

Composición según spec sección 7.2:
- Nav v3
- Hero actual (preservar de `index.html`)
- VPNumbered
- FeaturedEssay (Capa más reciente)
- FeatureGrid (3 territorios)
- InsightMockup
- 3× EditorialCard (últimas Capas)
- NewsletterCTA (Klein-deep)
- Footer

- [ ] **Step 16.2: Validación visual + usuario**

**GATE.** Usuario revisa.

- [ ] **Step 16.3: Commit prototipo Home**

```bash
git -C /Users/r/Desktop/landing add dev/screens/home.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): prototipo Home"
```

### Task 17: Herramienta Índice de Habitabilidad (PRIORIDAD 3)

**Files:**
- Modify: `herramientas/habitabilidad/index.html`

- [ ] **Step 17.1: Rediseñar flujo**

Aplicar principios del spec sección 7.3:
- Pantalla intro con las 4 dimensiones ilustradas (usar los 4 SVGs del Lote 1)
- Flujo narrativo 1-pregunta-por-pantalla con micro-ilustraciones
- Transiciones 350ms fade + slide
- Resultado con InsightMockup (4 barras)
- Share artifact SVG descargable con firma fonética `[ɛ̃tɾə·lamˈpistas]`

- [ ] **Step 17.2: Validación + Lighthouse**

**GATE.** Usuario revisa.

- [ ] **Step 17.3: Commit**

```bash
git -C /Users/r/Desktop/landing add herramientas/habitabilidad/index.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): herramienta Índice de Habitabilidad rediseñada"
```

### Task 18: Índice de Capas (PRIORIDAD 4)

**Files:**
- Modify: `archivo.html`

- [ ] **Step 18.1: Rediseñar composición**

- Nav v3
- Header simple (título + 2 líneas)
- Filter pill tabs (3 territorios + "Todos")
- Grid de EditorialCards cronológico
- Footer

- [ ] **Step 18.2: JavaScript filtro simple**

Filtro client-side por `data-territorio` en cada card. Sin framework.

- [ ] **Step 18.3: GATE + commit**

```bash
git -C /Users/r/Desktop/landing add archivo.html
git -C /Users/r/Desktop/landing commit -m "feat(v3): archivo.html con filter por territorio"
```

### Task 19: Página de Concepto (PRIORIDAD 5)

**Files:**
- Create: `dev/screens/concepto.html`
- Modify: `glosario.html` (si aplica) o crear `/conceptos/habitabilidad-digital.html`

- [ ] **Step 19.1: Prototipo concepto**

Según spec sección 7.5:
- Kicker
- H1 + fonética
- Definición 22px
- Ilustración doodle del Lote 1
- Desarrollo 3-5 párrafos
- Tags relacionados
- "Aparece en estas Capas"

- [ ] **Step 19.2: GATE + commit**

### Task 20: Newsletter (PRIORIDAD 6)

**Files:**
- Modify: `newsletter.html`

- [ ] **Step 20.1: Convertir en índice editorial**

Según spec sección 7.6. Schema `Periodical` + lista de números.

- [ ] **Step 20.2: GATE + commit**

---

## Fase 5 — Deploy

### Task 21: Auditoría completa pre-merge

- [ ] **Step 21.1: Lighthouse en las 6 pantallas**

Expected: ≥95 accesibilidad en todas, ≥90 performance.

- [ ] **Step 21.2: Validar schemas JSON-LD**

Usar https://search.google.com/test/rich-results sobre cada URL clave.

- [ ] **Step 21.3: Verificar responsive mobile**

Safari iPhone + Chrome DevTools mobile emulation. Expected: paridad total con desktop.

- [ ] **Step 21.4: Verificar que no queda CSS v2 sin usar**

Run: `grep -r "Space Grotesk" /Users/r/Desktop/landing --include="*.html"`. Esperado: cero resultados visible (solo el fallback en CSS).

- [ ] **Step 21.5: Verificar `noindex` en `/dev/`**

Run: `grep -r "noindex" /Users/r/Desktop/landing/dev/`. Expected: todos los archivos de dev tienen noindex meta tag.

### Task 22: Actualizar CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 22.1: Reemplazar sección 5 (Autoría)**

Actualizar la sección "SCHEMA PERSON Y AUTORÍA" para reflejar que la autoría es anónima. `Organization` asume el rol de `author` en todos los schemas. Mantener `knowsAbout` extendido.

- [ ] **Step 22.2: Actualizar sección 13 (Hoja de ruta) con Fase 1 v3 completada**

- [ ] **Step 22.3: Commit**

```bash
git -C /Users/r/Desktop/landing add CLAUDE.md
git -C /Users/r/Desktop/landing commit -m "docs(v3): actualiza CLAUDE.md — autoría anónima + hoja de ruta v3"
```

### Task 23: Merge a main y deploy

- [ ] **Step 23.1: Checkout main y merge**

```bash
git -C /Users/r/Desktop/landing checkout main
git -C /Users/r/Desktop/landing merge staging/v3-brief-v6 --no-ff -m "feat(v3): rediseño integral brief v6 — deploy"
```

- [ ] **Step 23.2: Push a remoto**

**PARAR. Pedir aprobación explícita antes de push.**

```bash
git -C /Users/r/Desktop/landing push origin main
```

- [ ] **Step 23.3: Verificar deploy en producción**

Abrir https://www.entrelampistas.com y las 6 pantallas clave. Ejecutar Lighthouse desde producción.

- [ ] **Step 23.4: Enviar sitemap actualizado a Google Search Console**

Manual. El sitemap ya está en `sitemap.xml`.

---

## Post-deploy (fuera del scope del plan)

- Lote 2 de ilustraciones (10 SVGs) — se dispara si las 6 pantallas necesitan más variedad
- Lote 3 (recurrentes y extendidos)
- Motor de matching concepto → ilustración (Fase 5 del brief, separada)
- Migración de las Capas existentes restantes al nuevo sistema
- Monitoreo de citaciones en LLMs (per CLAUDE.md sección 8)

---

## Self-review notes (writer)

**Spec coverage:** todas las secciones 1-12 del spec tienen tasks correspondientes excepto la Fase 5 del brief original (motor de matching), explícitamente marcada como post-deploy.

**Tests gate:** este proyecto es primariamente visual. La "prueba" en cada fase es gate de validación humana + Lighthouse. Los tasks de Fase 2 y 4 incluyen gates explícitos.

**Riesgos:**
- El lote 1 de ilustraciones puede no convencer — el gate en Task 11.3 permite iterar antes de escalar.
- La migración de 16 páginas legacy está fuera del scope; post-deploy.
- Si Lighthouse regresa <90 en alguna pantalla, iterar antes de seguir.
