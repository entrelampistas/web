# Brief — OG Images

> Antes de empezar: lee `00-vision.md` y
> `.claude/skills/entrelampistas-design-system/SKILL.md`
> Templates en: `.claude/skills/entrelampistas-design-system/references/aplicaciones.md`

---

## Por qué importan

Cuando Clara comparte un link de Entrelampistas en WhatsApp o LinkedIn,
lo primero que ve el receptor es la OG image. Es la portada del ensayo
en el mundo exterior. Si la imagen es genérica o fea, el ensayo pierde
credibilidad antes de que nadie lo lea.

Cada ensayo publicado necesita su OG image.
Los dos ensayos existentes no tienen — es deuda técnica que resolver.

---

## Especificaciones técnicas

```
Tamaño: 1200 × 630px
Formato: PNG o JPG, máximo 200KB
Meta tags necesarios:
  <meta property="og:image" content="URL">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="URL">
```

---

## El diseño

**Variante principal — fondo Klein deep:**
```
Fondo: #1A3499
Padding: 48px todos los lados

TOP LEFT: símbolo SVG (20px) + "Entrelampistas" (9px uppercase tracking 0.15em, paper 50%)

CENTRO (alineado izquierda, verticalmente centrado):
  TERRITORIO (9px, #C0321A, uppercase, tracking 0.12em, margin-bottom 8px)
  TÍTULO (20px, weight 500, #F5F0E8, line-height 1.25)
  SUBTÍTULO (11px, weight 300, paper 60% opacity)

BOTTOM:
  Separador: 0.5px, paper 12%
  "entrelampistas.com" (8px, paper 30%, left)
  "[X] min · [AÑO]" (8px, paper 25%, right)
```

**Variante secundaria — fondo paper:**
Para ensayos de territorios más filosóficos/cotidianos.
```
Fondo: #F5F0E8
Título: #1A1A1A
Símbolo: Klein deep
Territorio: rojo
Meta: ink-light
```

**La regla de cuál variante usar:**
- Interpretación del entorno → Klein
- Entrenamiento cognitivo → Klein
- Relación con la tecnología → Klein
- Filosofía de lo cotidiano → Paper
- Sistemas invisibles → Klein

---

## Generación automática

La OG image se genera automáticamente cuando se publica un ensayo.
El script vive en `tools/generate-og.mjs`.

```bash
# Generar OG image para un ensayo
node tools/generate-og.mjs \
  --slug "habitabilidad-digital" \
  --title "Habitabilidad digital" \
  --subtitle "A más de tres décadas de la web, ¿dónde estamos?" \
  --territory "Interpretación del entorno" \
  --time 10 \
  --year 2025 \
  --variant klein

# Output: public/og/habitabilidad-digital.png
```

**Si el script no existe todavía:** crear usando Puppeteer para
renderizar un template HTML y tomar screenshot a 1200×630.

---

## Los dos ensayos pendientes

```bash
# Habitabilidad digital
node tools/generate-og.mjs \
  --slug "habitabilidad-digital" \
  --title "Habitabilidad digital" \
  --subtitle "A más de tres décadas de la web, ¿dónde estamos?" \
  --territory "Interpretación del entorno" \
  --time 10 --year 2025 --variant klein

# El mapa de tu mente
node tools/generate-og.mjs \
  --slug "mapa-de-tu-mente" \
  --title "El mapa de tu mente" \
  --subtitle "Decidimos antes de decidir. ¿Desde dónde?" \
  --territory "Entrenamiento cognitivo" \
  --time 8 --year 2025 --variant klein
```

---

## Integración en el HTML de cada ensayo

```html
<head>
  <!-- OG básico -->
  <meta property="og:title" content="[TÍTULO] — Entrelampistas">
  <meta property="og:description" content="[SUBTÍTULO — máx 160 chars]">
  <meta property="og:image" content="https://entrelampistas.com/og/[SLUG].png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://entrelampistas.com/[SLUG]">
  <meta property="og:site_name" content="Entrelampistas">

  <!-- Twitter/X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[TÍTULO] — Entrelampistas">
  <meta name="twitter:description" content="[SUBTÍTULO]">
  <meta name="twitter:image" content="https://entrelampistas.com/og/[SLUG].png">
</head>
```

---

## Checklist

```
□ OG image generada y guardada en public/og/[slug].png
□ Meta tags añadidos en el <head> del ensayo
□ Verificar con opengraph.xyz o similar que se ve correctamente
□ El título no está cortado en la preview (máximo ~60 chars para Twitter)
□ La imagen pesa menos de 200KB
□ Verificar que se ve bien en modo oscuro de WhatsApp
```
