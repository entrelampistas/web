# Brief — Producción de Contenido Web

> Antes de empezar: lee `00-vision.md` y
> `.claude/skills/editor-lampista/SKILL.md`
> Todo el contenido pasa por el test de voz antes de publicarse.

---

## El archivo como jardín, no como lista

Los ensayos de Entrelampistas no son artículos de blog.
Son piezas de un sistema de ideas que se construye de forma acumulativa.

**Jardín vs. biblioteca:**
- Biblioteca: artículos ordenados por fecha, cada uno independiente
- Jardín: ideas ordenadas por territorio y madurez, cada pieza enriquece las anteriores

**Cada ensayo nuevo debe:**
1. Pertenecer claramente a uno o más territorios
2. Referenciar activamente al menos una pieza anterior (dentro del texto, no al final)
3. Dejar al menos una pregunta abierta para la siguiente pieza
4. Actualizar `src/content/mapa-de-ideas.md` al publicarse

---

## El flujo de producción de un ensayo

### Paso 1 — El brief interno

Antes de escribir una línea, responder:
```
Territorio: ¿cuál de los 5?
Pregunta central: ¿qué pregunta incomoda responde (o abre) esta pieza?
Conexión: ¿qué pieza anterior referencia?
Frase de lanzamiento: ¿cómo lo resumirías en 1 frase para decírselo a Clara?
Lector después: ¿qué hará Clara diferente después de leer esto?
```

Si no puedes responder estas 5 preguntas, el ensayo no está listo para empezar.

### Paso 2 — La estructura del ensayo

```
APERTURA (nunca "En este ensayo vamos a...")
→ Una escena, una paradoja, o una frase que ya incomoda
→ Máximo 2 párrafos

DESARROLLO (la inspección)
→ Capas. No soluciones todavía.
→ Cada párrafo gana su lugar — si se puede cortar sin perder nada, cortar

GIRO (el momento donde algo se complica en lugar de resolverse)
→ El lector esperaba ir en una dirección, va en otra

CIERRE (apertura, no resolución)
→ Una herramienta o lente para seguir viendo
→ Una pregunta que queda
→ NUNCA: "Espero que este artículo te haya ayudado..."
```

### Paso 3 — Test de voz (los 4 filtros)

```
1. ¿Lo leería en voz alta sin sonar a TED Talk ni a WhatsApp?
2. ¿Hay al menos una frase que incomode o sorprenda?
3. ¿El texto asume que el lector es inteligente?
4. ¿Se nombra la incertidumbre cuando existe?
```

Si alguno es NO — reescribir esa parte antes de continuar.

### Paso 4 — Verificación de palabras prohibidas

Buscar en el texto:
```
poderoso · transformador · despertar · autenticidad · vibra
disruptivo · potenciar · empoderar · viaje interior · narrativa propia
romper esquemas · pensamiento mágico · next level · inspirador
```
Si aparece alguna — reemplazar con vocabulario del lampista.

### Paso 5 — El titular

```
NUNCA: "Cómo [verbo] tu [sustantivo]" (suena a blog 2015)
NUNCA: "X razones para..." (siempre)
NUNCA: superlativo de cualquier tipo

SÍ: paradoja / vocabulario del oficio / pregunta que incomoda / diagnóstico
Máximo 10 palabras. Debe funcionar sin subtítulo.
```

### Paso 6 — Los metadatos del ensayo

Cada ensayo necesita:
```yaml
---
titulo: "..."
subtitulo: "..."
territorio: [interpretacion-entorno | entrenamiento-cognitivo | relacion-tecnologia | filosofia-cotidiano | sistemas-invisibles]
fecha: YYYY-MM-DD
tiempo_lectura: X min
ensayos_relacionados: [slug-1, slug-2]
og_description: "..." # Máximo 160 caracteres, voz del lampista
---
```

### Paso 7 — Actualizar el mapa de ideas

Después de publicar, actualizar `src/content/mapa-de-ideas.md`:
- Añadir la pieza al territorio
- Marcar las preguntas que responde (✓)
- Abrir las nuevas preguntas que deja
- Actualizar conexiones entre territorios si emergen nuevas

---

## Criterios editoriales de largo plazo

### Cadencia de publicación

**Ensayos:** 1 por mes mínimo. Mejor uno bueno que dos mediocres.
Los ensayos duran — no tienen fecha de caducidad. Un ensayo de hace 6 meses
debe ser tan relevante como uno de hoy.

**Territorios:** rotar. No publicar 3 ensayos seguidos del mismo territorio.
El mapa de ideas en `src/content/mapa-de-ideas.md` dice qué territorio
tiene más preguntas abiertas — esa es la guía para decidir qué escribir next.

### La profundidad como estándar

Entrelampistas no hace artículos de 500 palabras.
Mínimo 800 palabras. Sin máximo — lo que el tema necesite.
El lector de Entrelampistas hace un contrato de atención cuando hace clic.
Respetar ese contrato.

### Las referencias bibliográficas

Cada ensayo termina con 4-8 referencias reales, en el estilo actual del sitio:
```
Autor — Título del libro/artículo — descripción en 1 línea de por qué importa
```

No son notas al pie — son una extensión del ensayo.
Son la forma de decirle a Clara: "si esto te resonó, por aquí hay más."

---

## El archivo HTML de un ensayo

El template vive en `workflows/article-template.md`.
Estructura semántica obligatoria:

```html
<article class="essay">
  <header class="essay-header">
    <span class="section-label">[TERRITORIO]</span>
    <h1>[TÍTULO]</h1>
    <p class="essay-deck">[SUBTÍTULO]</p>
    <div class="essay-meta">
      <span>entrelampistas · [AÑO] · [X] min. de lectura</span>
    </div>
  </header>

  <nav class="essay-toc"> <!-- Solo si >1500 palabras -->
    ...
  </nav>

  <div class="essay-body">
    <!-- El ensayo. Párrafos cortos. Air entre ellos. -->
    <!-- Usar .definition-block para términos clave -->
    <!-- Usar .highlight-block para insights -->
    <!-- Usar blockquote para citas externas -->
  </div>

  <footer class="essay-footer">
    <section class="essay-references">
      <h2>Referencias y lecturas</h2>
      ...
    </section>
    <section class="essay-next">
      <h2>Sigue leyendo</h2>
      [Siguiente ensayo relacionado]
    </section>
  </footer>
</article>
```
