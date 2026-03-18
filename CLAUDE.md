# CLAUDE.md — Entrelampistas
# Sistema operativo editorial · SEO · AEO · GEO
# Versión 2.0 · Marzo 2026
#
# Este archivo es el contexto permanente del proyecto.
# Claude Code lo lee en cada sesión antes de tocar cualquier archivo.
# No contiene tareas puntuales. Contiene decisiones estratégicas duraderas.

---

## 1. QUÉ ES ESTE PROYECTO Y POR QUÉ IMPORTA LA ESTRATEGIA

Entrelampistas es una editorial digital de pensamiento estructural en español, desde Barcelona. No es un blog ni un medio de noticias. Es una publicación de durabilidad cultural: cada pieza se escribe para seguir siendo relevante en cinco años.

Tres ejes editoriales inseparables:
- **Filosofía aplicada a lo cotidiano** — preguntas profundas que viven en decisiones ordinarias
- **Psicología cognitiva como herramienta** — sesgos, modelos mentales, mecanismos de decisión. Con rigor, sin autoayuda
- **Tecnología como entorno habitable** — análisis de infraestructuras digitales que nos configuran sin que lo veamos

El tono es claro sin simplificar, crítico sin militancia, cercano sin condescendencia. El lector que Entrelampistas asume es inteligente y ocupado. No se le explica de más.

**URL producción**: https://www.entrelampistas.com
**Stack**: HTML estático · CSS modular · JS vanilla
**Idioma**: español · es-ES · Barcelona

---

## 2. HIPÓTESIS ESTRATÉGICA

El problema no es el contenido. Los dos artículos publicados tienen calidad editorial real — referencias académicas verificables, conceptos propios defendibles, profundidad que los LLMs buscan para citar. El problema es que Google no sabe que el sitio existe, y los LLMs no pueden atribuir autoría a nadie porque no hay ninguna persona identificada.

La estrategia se construye en tres capas en orden estricto:

**Capa 1 · Infraestructura técnica** — robots.txt, sitemap, schema, og:image, autoría. Sin esto, todo lo demás es invisible. Se construye una vez y se mantiene.

**Capa 2 · Autoridad temática** — clústers hub + spokes interconectados. Google y los LLMs asignan autoridad por tema, no por artículo individual. Un artículo es interesante. Ocho artículos interconectados sobre el mismo tema hacen de Entrelampistas la fuente de referencia en español.

**Capa 3 · Citabilidad por IA** — schema Person verificable, sameAs a fuentes externas, estructura extraíble, ángulo original. En 2026 el tráfico no viene solo de Google — viene de ser citado por ChatGPT, Perplexity y AI Overviews.

El orden importa. No hay razón para optimizar para IA si Google no rastrea el sitio.

---

## 3. ESTRUCTURA DE ARCHIVOS DEL PROYECTO

```
/
├── CLAUDE.md
├── index.html
├── sobre.html
├── archivo.html
├── newsletter.html
├── contacto.html
├── habitabilidad-digital.html
├── mapa-de-tu-mente.html
├── robots.txt
├── sitemap.xml
├── public/
│   ├── favicon.svg
│   ├── og-default.png                    ← 1200×630px
│   ├── og-habitabilidad-digital.png      ← 1200×630px por artículo
│   ├── og-mapa-de-tu-mente.png
│   └── fonts/
│       └── SpaceGrotesk-Regular.woff2    ← nunca TTF
├── brand_assets/
│   └── entrelampistas-logo.webp          ← siempre con width + height
└── styles/
    ├── tokens.css
    ├── base.css
    ├── components.css
    └── main.css
```

---

## 4. REGLAS PERMANENTES DE DESARROLLO

Estas reglas aplican a cada archivo que Claude Code cree o edite. Sin excepciones.

### 4.1 Meta tags obligatorios en toda página

```html
<!-- Title: ≤60 chars. Keyword al inicio. Marca al final. -->
<title>[Keyword principal] — Entrelampistas</title>

<!-- Description: 140-160 chars. Keyword + beneficio. -->
<meta name="description" content="...">

<!-- Canonical: siempre https://www. con barra final -->
<link rel="canonical" href="https://www.entrelampistas.com/[slug]/">

<!-- Fuente: WOFF2 únicamente. TTF nunca en producción. -->
<link rel="preload" href="/public/fonts/SpaceGrotesk-Regular.woff2"
      as="font" type="font/woff2" crossorigin>

<!-- Preconnect para PostHog -->
<link rel="preconnect" href="https://eu.i.posthog.com">
```

### 4.2 Imágenes — regla absoluta

Toda imagen tiene `width`, `height` y `alt` descriptivo. Sin excepciones.
Un `<img>` sin dimensiones causa CLS que penaliza Core Web Vitals directamente.

```html
<!-- Correcto -->
<img src="/brand_assets/entrelampistas-logo.webp"
     alt="Entrelampistas" width="160" height="40" loading="eager">

<!-- Nunca — nombre Figma, sin dimensiones, formato incorrecto -->
<img src="brand_assets/Group 290.png" alt="Entrelampistas">
```

El logo siempre: `/brand_assets/entrelampistas-logo.webp` · ruta absoluta · width+height definidos.

### 4.3 Performance

- CSS: tokens → base → components → main (este orden)
- JS: al final del `<body>` con `defer`
- Imágenes: WebP · `loading="lazy"` en todas salvo imagen principal del artículo (`loading="eager"`)
- Fuentes: solo WOFF2
- analytics.js: siempre con `defer`

### 4.4 Accesibilidad — nivel alto, no negociable

Este proyecto tiene un nivel de accesibilidad inusualmente bueno. Se mantiene:
- Elementos interactivos: `aria-label` descriptivo
- SVGs decorativos: `aria-hidden="true"`
- SVGs de contenido: `role="img"` + `<title>` + `aria-label`
- Acordeones y toggles: `aria-expanded`
- Botones de modo/vista: `aria-pressed`
- Navegación principal: `aria-label="Principal"`

### 4.5 Schema JSON-LD por tipo de página

| Página | Schema requerido |
|--------|-----------------|
| Homepage | Organization + WebSite + WebPage |
| /sobre | Organization + WebPage + **Person** |
| Artículo | Article + FAQPage + BreadcrumbList |
| /archivo | WebPage + BreadcrumbList |
| /newsletter | WebPage |

Schema siempre en `<head>` como `<script type="application/ld+json">`.

---

## 5. SCHEMA PERSON Y AUTORÍA — POR QUÉ ES LA PALANCA MÁS IMPORTANTE

Esta sección merece explicación extendida porque es la más mal comprendida.

### El problema sin autoría

Los LLMs cuando deciden si citar una fuente no evalúan solo la calidad del contenido — evalúan si pueden **verificar** quién está detrás. Un artículo sin autor identificable es, para un LLM, como una fuente anónima: potencialmente válida pero no citable con confianza. Investigación de 2026 muestra que artículos con schema Person completo se citan en respuestas de IA un 67% más que los que no lo tienen.

### Cómo funciona el mecanismo

El schema `Person` con `sameAs` crea lo que se llama un "círculo de verdad": el sitio declara que el autor es X, y ese X tiene un perfil en LinkedIn (o Wikidata) que confirma que X escribe sobre estos temas. El LLM puede cruzar ambas fuentes y **resolver la entidad** con certeza. Sin ese cruce, el LLM hace una estimación probabilística sobre si la fuente es confiable. Con él, tiene confirmación.

### Implementación en /sobre y en artículos

```html
<!-- En el <head> de /sobre — schema Person del autor principal -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.entrelampistas.com/sobre/#[nombre-slug]",
  "name": "[Nombre completo]",
  "url": "https://www.entrelampistas.com/sobre/",
  "jobTitle": "[Cargo o descripción: ej. Director editorial]",
  "worksFor": {
    "@id": "https://www.entrelampistas.com/#organization"
  },
  "knowsAbout": [
    "Sesgos cognitivos",
    "Filosofía aplicada",
    "Habitabilidad digital",
    "Psicología cognitiva",
    "Tecnología y sociedad"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/[perfil]/",
    "https://www.instagram.com/entrelampistas/"
  ]
}
</script>
```

`knowsAbout` es el campo que los LLMs usan para determinar de qué temas es experto el autor. Debe coincidir con las temáticas reales de Entrelampistas. Cuanto más específico y verificable, mejor.

### sameAs — la red de verificación externa

`sameAs` es el mecanismo por el que un LLM cruza la identidad declarada en el sitio con fuentes externas que conoce de su entrenamiento. Cada URL en `sameAs` es un nodo de la red de verificación:

- **LinkedIn** — perfil profesional verificable, el más importante disponible ahora
- **Wikidata** — si se crea una entrada, es el ancla más potente (no es necesaria pero es el techo)
- **Instagram** — ya presente en Organization, añadir también en Person si es la misma persona
- **Publicaciones externas** — si el autor tiene artículos en otros medios, añadir esas URLs

No hace falta Wikidata para empezar. LinkedIn más el @id interno ya marca la diferencia.

### Cómo añadir el autor en cada artículo

```html
<!-- En el schema Article de cada artículo -->
"author": {
  "@type": "Person",
  "@id": "https://www.entrelampistas.com/sobre/#[nombre-slug]",
  "name": "[Nombre]",
  "url": "https://www.entrelampistas.com/sobre/",
  "sameAs": "https://www.linkedin.com/in/[perfil]/"
}

<!-- En el HTML visible del artículo -->
<footer class="article-meta">
  <span>Por <a href="/sobre/" rel="author">[Nombre]</a></span>
  <time datetime="[YYYY-MM-DD]">[DD de mes de YYYY]</time>
</footer>
```

El `@id` del autor en el schema Article debe ser idéntico al `@id` del schema Person en /sobre. Eso es lo que crea la conexión de entidad persistente a través del sitio — Google y los LLMs la leen como "todos estos artículos son del mismo autor verificado".

---

## 6. SCHEMA ORGANIZATION — VERSIÓN COMPLETA CON sameAs

El schema Organization actual en index.html solo tiene Instagram en sameAs. Versión completa a implementar cuando se tengan los perfiles:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.entrelampistas.com/#organization",
  "name": "Entrelampistas",
  "url": "https://www.entrelampistas.com",
  "description": "Editorial digital de pensamiento estructural en español. Filosofía aplicada, psicología cognitiva y tecnología como entorno habitable.",
  "foundingDate": "2025",
  "inLanguage": "es",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.entrelampistas.com/brand_assets/entrelampistas-logo.webp",
    "width": 160,
    "height": 40
  },
  "knowsAbout": [
    "Sesgos cognitivos",
    "Habitabilidad digital",
    "Psicología cognitiva",
    "Filosofía de lo cotidiano",
    "Tecnología y sociedad",
    "Pensamiento crítico"
  ],
  "sameAs": [
    "https://www.instagram.com/entrelampistas/",
    "https://www.linkedin.com/company/entrelampistas/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "editorial",
    "email": "entrelampistas@protonmail.com"
  }
}
```

`knowsAbout` en Organization tiene el mismo efecto que en Person: le dice a los LLMs de qué temas es autoridad esta fuente. Es la declaración explícita de expertise que antes dependía de que el LLM infiriera del contenido.

---

## 7. NEWSLETTER — ARQUITECTURA SEO

El newsletter es contenido SEO, no solo email marketing. Cada número publicado como página web es una URL indexable que construye autoridad temática. Arquitectura recomendada:

### Estructura de URLs

```
/newsletter/                          ← índice de todos los números
/newsletter/numero-01-[slug]/         ← cada número como página propia
/newsletter/numero-02-[slug]/
```

### Por qué cada número debe ser una página web indexable

Un número de newsletter enviado solo por email no existe para Google. El mismo contenido publicado como página web con schema `Article` es una pieza de contenido indexable que refuerza el clúster temático, puede recibir backlinks directos, y puede aparecer en búsquedas relacionadas.

### Schema para páginas de newsletter

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Entrelampistas #[N]: [título del número]",
  "description": "[resumen del número — 140-160 chars]",
  "datePublished": "[YYYY-MM-DD]T00:00:00+01:00",
  "author": {
    "@type": "Person",
    "@id": "https://www.entrelampistas.com/sobre/#[nombre-slug]"
  },
  "publisher": {
    "@id": "https://www.entrelampistas.com/#organization"
  },
  "isPartOf": {
    "@type": "Periodical",
    "name": "Newsletter de Entrelampistas",
    "url": "https://www.entrelampistas.com/newsletter/"
  }
}
```

`isPartOf` con tipo `Periodical` es el schema que indica que este artículo es parte de una publicación periódica — señal de consistencia editorial que Google valora para autoridad.

### Índice /newsletter/ con schema Periodical

```json
{
  "@context": "https://schema.org",
  "@type": "Periodical",
  "name": "Newsletter de Entrelampistas",
  "description": "Publicación periódica de pensamiento estructural. Filosofía aplicada, sesgos cognitivos y tecnología habitable.",
  "url": "https://www.entrelampistas.com/newsletter/",
  "inLanguage": "es",
  "publisher": {
    "@id": "https://www.entrelampistas.com/#organization"
  }
}
```

---

## 8. MONITOREO DE CITACIONES EN LLMs

Esta es la métrica nueva que importa en 2026 y que casi nadie está midiendo todavía.

### Qué buscar y dónde

**Perplexity** (el más transparente en citar fuentes):
- Buscar: `habitabilidad digital`
- Buscar: `enshittification en español`
- Buscar: `sesgos cognitivos vida cotidiana`
- Buscar: `economía de la atención tecnología`
- Si Entrelampistas aparece en las fuentes listadas → el sitio está siendo citado

**ChatGPT** (busca en modo con búsqueda web activada):
- Mismas queries que en Perplexity
- ChatGPT no siempre muestra las fuentes — buscar si el texto generado menciona "Entrelampistas" o cita conceptos propios como "habitabilidad digital"

**Google AI Overviews**:
- Buscar las mismas queries en Google desde España
- Si aparece un panel de AI Overview en los resultados, revisar si Entrelampistas está entre las fuentes citadas debajo

**Bing Webmaster Tools → AI Performance**:
- Una vez verificado el sitio en Bing Webmaster Tools, esta sección muestra cuántas veces el contenido se usa en respuestas de Copilot
- Es el único panel con datos cuantitativos de citación por IA disponible actualmente

### Cadencia recomendada

Revisar semanalmente las cuatro plataformas para las 5-6 keywords principales. Llevar un registro simple de si aparece o no. El objetivo no es un número — es saber si el trabajo de schema y contenido está produciendo citaciones.

### Señal de que el schema Person está funcionando

Si al buscar el nombre del autor en Google aparece un panel de conocimiento (Knowledge Panel) pequeño con su cargo y el enlace a Entrelampistas — el schema Person con sameAs está funcionando y el autor está siendo reconocido como entidad en el Knowledge Graph de Google.

---

## 9. ESTRUCTURA DE ARTÍCULOS — ESTÁNDAR COMPLETO

Las skills editoriales de Claude Code manejan el texto. Esta sección define la arquitectura HTML y semántica que lo contiene.

### 9.1 Orden obligatorio de elementos

```
1. <head> con todos los schemas (Article + FAQPage + BreadcrumbList)
2. .article-summary — resumen AEO 60-80 palabras
3. Apertura narrativa (estilo Entrelampistas)
4. <h1> con keyword buscable
5. Cuerpo con <h2> descriptivos
6. <section class="faq"> con mínimo 5 preguntas
7. <section class="referencias"> con fuentes citadas
8. <footer class="article-meta"> con autor, fecha, enlace siguiente
```

### 9.2 El resumen AEO — obligatorio antes de cualquier apertura narrativa

```html
<div class="article-summary" aria-label="Resumen del artículo">
  <p>
    [60-80 palabras. Responde directamente: qué es el tema,
    por qué importa, qué encontrará el lector.
    Sin narrativa. Sin rodeos. Este bloque es lo que extrae
    Google AI Overviews y lo que Perplexity usa para citar.]
  </p>
</div>
```

### 9.3 H1 — keyword + tono Entrelampistas

```
✓ "Habitabilidad digital: ¿qué tipo de entorno es internet para la vida humana?"
✓ "Sesgos cognitivos: los mapas invisibles que guían tus decisiones"
✗ "A más de tres décadas de la web, ¿dónde estamos?"
✗ "Decidimos antes de decidir. ¿Desde dónde?"
```

### 9.4 H2 — descriptivos y buscables

```
✓ "Qué son los sesgos cognitivos y por qué afectan tus decisiones"
✓ "Cómo el diseño de plataformas captura tu atención"
✗ "Empezar a mirar distinto"
✗ "Algo ya está pensando"
```

### 9.5 Autoría visible en HTML

```html
<footer class="article-meta">
  <span class="article-author">
    Por <a href="/sobre/" rel="author">[Nombre]</a>
  </span>
  <time class="article-date" datetime="[YYYY-MM-DD]">
    [DD de mes de YYYY]
  </time>
  <span class="article-reading-time">[X] min de lectura</span>
</footer>
```

### 9.6 Sección FAQ — HTML visible + schema

La sección FAQ debe ser visible en el HTML (no solo en el schema). Los usuarios la leen, y Google la usa para featured snippets.

```html
<section class="faq" aria-labelledby="faq-title">
  <h2 id="faq-title">Preguntas frecuentes sobre [tema]</h2>

  <div class="faq-item" itemscope itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿[Pregunta real del lector]?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p itemprop="text">[Respuesta directa. 2-4 frases.]</p>
    </div>
  </div>

  <!-- Repetir para cada pregunta. Mínimo 5. -->
</section>
```

---

## 10. ROBOTS.TXT Y SITEMAP — ESTÁNDAR

### robots.txt

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Disallow: /node_modules/
Disallow: /archive/
Disallow: /referenciasa/
Disallow: /.claude/

Sitemap: https://www.entrelampistas.com/sitemap.xml
```

### sitemap.xml — actualizar `<lastmod>` en cada publicación

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.entrelampistas.com/</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.entrelampistas.com/sobre/</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.entrelampistas.com/newsletter/</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.entrelampistas.com/habitabilidad-digital/</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.entrelampistas.com/mapa-de-tu-mente/</loc>
    <lastmod>[YYYY-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

Al publicar un artículo nuevo o un número de newsletter: añadir `<url>` con `<priority>0.9</priority>` y enviar sitemap actualizado en Google Search Console.

---

## 11. ARQUITECTURA DE CONTENIDO

### Clústers temáticos

```
HUB: Habitabilidad digital (/habitabilidad-digital/)
├── /enshittification/
├── /economia-de-la-atencion/
├── /burbuja-de-filtros/
├── /autonomia-cognitiva/
└── /como-usar-internet-sin-que-te-use/

HUB: Sesgos cognitivos (/sesgos-cognitivos/)
├── /sesgo-de-confirmacion/
├── /sistema-1-sistema-2/         ← /mapa-de-tu-mente/ como spoke
├── /sesgos-cognitivos-tecnologia/
└── /como-tomar-mejores-decisiones/

HUB: Relación con la tecnología (/relacion-con-la-tecnologia/)
├── /notificaciones-y-atencion/
├── /dieta-de-informacion/
└── /plataformas-vs-protocolos/

HUB: Pensamiento crítico cotidiano (/pensamiento-critico/)
├── /modelos-mentales/
├── /como-leer-noticias/
└── /preguntas-antes-de-compartir/
```

### Reglas de enlazado interno

- Cada artículo enlaza a su hub **en el cuerpo del texto**, no solo en el footer
- Cada hub enlaza a todos sus spokes
- Mínimo 3 enlaces internos contextuales por artículo de +800 palabras
- Anchor text descriptivo: nunca "haz clic aquí" ni "ver más"
- Al publicar un artículo nuevo: actualizar el hub para añadir el enlace nuevo

---

## 12. CHECKLIST DE PUBLICACIÓN

Claude Code ejecuta este checklist antes de cada commit con páginas HTML.

### Infraestructura (verificar una vez por sesión de trabajo)
- [ ] robots.txt accesible en /robots.txt
- [ ] sitemap.xml actualizado con nuevas URLs
- [ ] Nuevo artículo añadido al hub correspondiente

### Por página
- [ ] Title ≤60 chars con keyword al inicio
- [ ] Meta description 140-160 chars
- [ ] Canonical https://www.entrelampistas.com/[slug]/
- [ ] og:image declarada y archivo existe en /public/
- [ ] Todas las imágenes con width, height y alt
- [ ] Schema JSON-LD sin errores de sintaxis

### Por artículo nuevo (adicional)
- [ ] Resumen AEO 60-80 palabras antes de la apertura
- [ ] H1 contiene keyword buscable
- [ ] H2 descriptivos
- [ ] Schema Article con datePublished, dateModified, author con @id
- [ ] @id del author coincide con @id del schema Person en /sobre
- [ ] Schema FAQPage con mínimo 5 preguntas
- [ ] Schema BreadcrumbList
- [ ] Fecha completa visible en HTML
- [ ] Autor identificado con enlace a /sobre/ y rel="author"
- [ ] Sección FAQ visible al final del artículo
- [ ] Mínimo 3 enlaces internos en el cuerpo

---

## 13. HOJA DE RUTA — FASES

Esta sección evoluciona con el proyecto. Actualizarla cuando se completa una fase.

### Fase 1 — Infraestructura (ejecutar antes que cualquier cosa)
Objetivo: que Google sepa que el sitio existe y pueda rastrearlo correctamente.
1. Verificar Google Search Console y solicitar indexación manual de todas las URLs
2. Confirmar robots.txt y sitemap.xml accesibles públicamente
3. Añadir resumen AEO a los artículos existentes
4. Añadir schema Article + FAQPage a los artículos existentes
5. Añadir schema Person con sameAs en /sobre y en artículos
6. Confirmar og-default.png existe en 1200×630px

### Fase 2 — Newsletter como contenido SEO
Objetivo: convertir cada número en una URL indexable que construya autoridad temática.
1. Crear /newsletter/ como índice con schema Periodical
2. Publicar los números existentes como páginas web con schema Article + isPartOf
3. Cada número futuro se publica primero como página web, luego se envía por email

### Fase 3 — Autoridad externa
Esta fase la gestiona el equipo editorial, no Claude Code.
El código que respalda esta fase: mantener schema Organization con sameAs actualizado a medida que se consiguen menciones externas. Cada nueva mención verificable añadirla al array sameAs.

### Fase 4 — Escala editorial
Objetivo: completar los cuatro clústers con hubs y spokes interconectados.
15-20 artículos bien enlazados es el corpus mínimo para autoridad temática consolidada.

### Indicadores de éxito
- Semana 2: site:entrelampistas.com devuelve resultados
- Mes 1: "habitabilidad digital" aparece en los primeros 30 resultados de Google
- Mes 2: citación en Perplexity para al menos una keyword propia
- Mes 3: Knowledge Panel del autor en Google al buscar su nombre
- Mes 6: tráfico orgánico mensual medible desde Google Search Console

---

*CLAUDE.md — Entrelampistas. Versión 2.0. Marzo 2026.*
*Se actualiza cuando cambia la estrategia o se completa una fase.*
*No cuando se corrige un bug. No cuando se publica un artículo.*
