# Análisis Vizzuality → Brief de Dirección Creativa para Entrelampistas

---

## PARTE 1: ANÁLISIS DE 4 PROYECTOS

### Proyecto 1: Half-Earth
**Qué hace:** Visualiza patrones globales de biodiversidad en un globo 3D interactivo para guiar decisiones de conservación.

**Decisiones de diseño observadas:**
- Abre con un GLOBO interactivo — lo visual es lo primero, no el texto
- El dato central ("proteger 50% de la Tierra salva 85% de las especies") aparece grande y aislado antes de cualquier explicación
- Diseño que busca "joy, surprise, and delight" — cada detalle está pensado para provocar curiosidad
- Paleta vibrante y custom creada específicamente para el proyecto (no genérica)
- Descripciones dinámicas que cambian según lo que el usuario explora
- La complejidad científica se traduce en experiencia sensorial

**Patrón clave:** Emoción primero, datos después. No empieza explicando qué es la biodiversidad — te pone un planeta vivo delante y te deja explorarlo. La comprensión viene de la experiencia, no de la lectura.

---

### Proyecto 2: Natural Capital Primer
**Qué hace:** Plataforma educativa interactiva que explica qué es el "capital natural" a profesionales de gobierno, empresas y academia.

**Decisiones de diseño observadas:**
- Estructura modular: conceptos clave → rol del capital natural → casos de uso por industria
- Combina diseño visual, audio y elementos en movimiento (no es solo texto con imágenes)
- Simplifica conceptos complejos manteniendo integridad científica
- El objetivo explícito es que el usuario "se vaya sintiéndose empoderado para actuar"
- Usa casos de uso concretos (manufactura, turismo, retail) para anclar lo abstracto
- Progresión: primero fundamentos, después aplicación, después acción

**Patrón clave:** Aprender haciendo, no leyendo. No es un PDF bonito — es una experiencia donde entiendes un concepto interactuando con él. Cada pantalla tiene un solo concepto. La profundidad se revela con la exploración, no con el scroll.

---

### Proyecto 3: Climate Inequality
**Qué hace:** Microsite de data storytelling que muestra cómo el cambio climático profundiza la desigualdad social.

**Decisiones de diseño observadas:**
- Abre con datos que provocan tensión emocional: "3.3 a 3.6 mil millones de personas viven en áreas altamente vulnerables pero son las menos responsables"
- Mapas interactivos que muestran vulnerabilidad vs preparación
- Incluye un QUIZ interactivo para que el usuario testee su conocimiento
- Los datos de Oxfam, World Bank, IPCC se presentan como historia, no como tabla
- La narrativa va de lo global a lo personal: del mapa mundial al impacto en tu vida
- La paleta y el mood cambian entre secciones para marcar transiciones temáticas

**Patrón clave:** Confrontar al lector con un dato incómodo, después darle contexto para entenderlo. La interacción (quiz, mapas) no es decorativa — transforma al lector de observador a participante. El lector sale sabiendo algo que no sabía.

---

### Proyecto 4: ESA GDA Comms (Impact Sphere)
**Qué hace:** Plataforma de comunicación que transforma datos de observación terrestre por satélite en historias de impacto comprensibles.

**Decisiones de diseño observadas:**
- Globo 3D interactivo como punto de entrada (igual que Half-Earth — patrón recurrente)
- Scrollytelling para cada caso de estudio: el scroll avanza la narrativa
- Multimedia integrado: texto, mapas, imágenes satelitales, visualización de datos
- Cada historia sigue la estructura: problema → dato → intervención → impacto
- Diseñado para audiencias no técnicas (financieros, policy-makers) que necesitan entender sin ser expertos
- La complejidad técnica (satélites, APIs, datos geoespaciales) es invisible para el usuario

**Patrón clave:** Scrollytelling con estructura narrativa clara. Cada historia tiene principio (problema), medio (evidencia) y final (impacto). Lo técnico se vuelve humano. El scroll es el motor narrativo — no decoras con scroll, cuentas con scroll.

---

## PARTE 2: PATRONES TRANSVERSALES

De los 4 proyectos emergen 7 patrones que definen el approach Vizzuality:

### PATRÓN 1: Visual primero, texto después
En los 4 proyectos, lo primero que ves es una imagen, un mapa, un globo, un dato grande. Nunca un párrafo de texto. El cerebro procesa la imagen, genera curiosidad, y ENTONCES busca el texto para confirmar lo que vio.

### PATRÓN 2: Un concepto por escena
Nunca apilan 3 ideas en el mismo viewport. Cada pantalla (o cada "escena" del scroll) comunica UNA cosa. La profundidad viene de la secuencia, no de la densidad.

### PATRÓN 3: Lo abstracto se ancla en lo concreto
"Capital natural" es abstracto. "El turismo en Costa Rica depende del 5% de su territorio que es selva" es concreto. Siempre van de lo concreto a lo abstracto, nunca al revés.

### PATRÓN 4: El color tiene función, no decoración
El cambio de paleta entre secciones SEÑALA cambio de tema. El color codifica información (verde = naturaleza, rojo = alerta, azul = datos). Nunca hay un color "porque queda bonito".

### PATRÓN 5: Interacción como comprensión
Los quizzes, mapas interactivos y globos no son features — son herramientas pedagógicas. La interacción hace que el lector ENTIENDA algo que no entendería solo leyendo.

### PATRÓN 6: Estructura narrativa de 4 actos
Problema → Evidencia → Perspectiva → Acción posible.
Esto se repite en cada proyecto. Abre con tensión, muestra datos, ofrece contexto, cierra con posibilidad.

### PATRÓN 7: La complejidad es invisible
El usuario nunca ve la complejidad técnica. No sabe que hay APIs, datasets, satélites. Solo ve una historia que entiende. Todo el trabajo pesado está debajo.

---

## PARTE 3: TRADUCCIÓN A ENTRELAMPISTAS

### Lo que Vizzuality hace con datos ambientales, Entrelampistas lo hace con sistemas de pensamiento

| Vizzuality | Entrelampistas |
|---|---|
| Mapa de deforestación | Diagrama de cómo una decisión se forma |
| Dato: "3.6 mil millones de personas vulnerables" | Dato: "4h 37min diarios dentro de plataformas digitales" |
| Globo interactivo de biodiversidad | Mapa visual de los sistemas que influyen en tu vida |
| Quiz sobre cambio climático | Ejercicio interactivo de auto-observación cognitiva |
| Color verde = naturaleza, rojo = pérdida | Klein blue = estructura, rojo = punto de atención |
| Scrollytelling sobre impacto de satélites | Scrollytelling sobre cómo una narrativa cultural te moldea |

---

## PARTE 4: BRIEF DE DIRECCIÓN CREATIVA

Este es el documento que le das a Claude Code junto con el skill de frontend.
Pégalo al inicio de cualquier prompt de ensayo digital.

---

### BRIEF: Dirección creativa para ensayos digitales de Entrelampistas
### Inspirado en el approach de data storytelling de Vizzuality

```
Lee CLAUDE.md, tokens.css, components.css, seed-components.html.
Lee la guia de ensayo digital scroll-animations (ensayo-scroll-effects).

Este ensayo digital sigue los principios de dirección creativa
del data storytelling editorial. Estas son las decisiones de diseño:


## PRINCIPIO 1 — VISUAL PRIMERO, TEXTO DESPUÉS

Cada escena del ensayo abre con un elemento visual:
una ilustración, un dato grande, una frase aislada, un diagrama.
El texto explicativo viene DESPUÉS del visual.

Implementación:
- La ilustración o dato principal ocupa min-height: 60vh centrado
- Font-size del dato: 2.5rem en desktop, 1.8rem en mobile
- Color del dato: var(--rojo) o var(--klein-vibrant) según contexto
- El párrafo explicativo está debajo con font-size 1rem normal
- Spacing entre visual y texto: var(--space-xl)


## PRINCIPIO 2 — UN CONCEPTO POR ESCENA

Cada sección del ensayo ocupa entre 80vh y 100vh.
No apiles ideas en el mismo viewport.
El lector procesa UNA idea, scrollea, procesa la siguiente.

Implementación:
- Cada <section> tiene min-height: 80vh
- Dentro de cada section: un visual + máximo 2-3 párrafos
- Si hay más texto, se distribuye en la sección siguiente
- padding vertical generoso: var(--space-3xl) arriba y abajo


## PRINCIPIO 3 — LO ABSTRACTO SE ANCLA EN LO CONCRETO

Nunca abras una escena con una idea abstracta.
Abre con algo que el lector pueda ver: una situación, un dato, 
una imagen, una pregunta concreta.
La abstracción viene después como reflexión.

Implementación:
- Primera línea de cada sección: observable, tangible, específica
- Después: la reflexión que conecta con el sistema más amplio
- Si el texto necesita un dato, preséntalo como .stat-reveal grande
  antes del párrafo que lo contextualiza


## PRINCIPIO 4 — EL COLOR SEÑALA CAMBIO DE CONTEXTO

Cuando cambia el tema dentro del ensayo, cambia el fondo.
No uses separadores hr — usa el color como separador temático.

Implementación:
- Escenas de planteamiento: background var(--paper)
- Escenas de dato/evidencia: background var(--paper-warm)
- Escena central (la idea más importante): background var(--klein-deep), 
  color var(--paper), texto claro sobre fondo oscuro
- Escena de cierre: vuelve a var(--paper)
- Transición entre fondos: suave, sin corte brusco
  (usar gradient sutil o cambio con animation-timeline: view())


## PRINCIPIO 5 — WHITESPACE COMO RITMO EDITORIAL

El espacio vacío no es espacio desperdiciado. Es pausa.
Es lo que le da al lector tiempo para procesar lo que acaba de leer.

Implementación:
- Entre párrafos dentro de una escena: var(--space-md)
- Entre escenas: var(--space-3xl) mínimo
- Después de un dato grande o frase central: var(--space-2xl) de silencio
- La ilustración tiene margin generoso alrededor: var(--space-xl)
- NUNCA llenes el espacio vacío con decoración


## PRINCIPIO 6 — JERARQUÍA VISUAL AGRESIVA

Tres niveles de lectura que funcionan a tres distancias:
- A 3 metros: la frase central y el dato grande (2.5rem, color fuerte)
- A distancia de lectura: los párrafos de desarrollo (1rem)
- De reojo: metadata y notas (0.7rem, ink-light)

Implementación:
- La frase central del ensayo (la idea que resume todo):
  font-size: 1.8rem, line-height: 1.3, color var(--rojo), centrada,
  con var(--space-2xl) arriba y abajo
- Los párrafos normales: font-size 1rem, line-height 1.8, var(--ink)
- Metadata (fecha, categoría, tiempo de lectura):
  font-size 0.7rem, letter-spacing 0.1em, uppercase, var(--ink-light)


## PRINCIPIO 7 — ESTRUCTURA DE 4 ACTOS

Todo ensayo sigue esta progresión narrativa:

ACTO 1 — APERTURA (1-2 escenas)
Hook visual + frase provocadora. El lector se pregunta "qué es esto"
y quiere seguir. No expliques nada todavía.

ACTO 2 — EVIDENCIA (2-3 escenas)
Datos, ejemplos, situaciones concretas. Aquí va la carne del ensayo.
Cada escena aporta una pieza del argumento. Usa .stat-reveal para
datos, .reveal para párrafos, cambios de fondo para separar subtemas.

ACTO 3 — PERSPECTIVA (1-2 escenas)
El giro. La idea central. La frase sticky que se queda fija mientras
el contexto scrollea. Este es el momento donde el lector entiende
algo que no entendía antes.

ACTO 4 — RESONANCIA (1 escena)
No cierra con moraleja. Cierra con una imagen, una pregunta, o una
frase que el lector se lleva. La última pantalla tiene mucho
whitespace y poca información.


## REGLAS TÉCNICAS

- Usa SOLO los 7 efectos del vocabulario de scroll-driven animations
- NO inventes efectos nuevos
- Todos los colores son variables de tokens.css
- Todas las transiciones usan --duration-* y --ease-*
- prefers-reduced-motion desactiva TODAS las animaciones
- Fallback con IntersectionObserver para Firefox
- Reading progress bar (2px, var(--rojo), animation-timeline: scroll())
- Responsive: en mobile (< 48rem) las escenas son más cortas,
  sticky se convierte en reveal, font-sizes se ajustan
- El ensayo carga rápido: imágenes en WebP, lazy loading,
  sin librerías externas


## LO QUE NO DEBE PASAR

- NO debe sentirse como un blog con fade-ins
- NO debe tener animaciones que el lector tenga que esperar
- NO debe tener más de un elemento animándose al mismo tiempo
- NO debe usar parallax agresivo (más de 30px)
- NO debe tener texto sobre imagen sin contraste suficiente
- NO debe tener escenas con más de 3 párrafos visibles al mismo tiempo
- NO debe cerrar con un CTA tipo "suscríbete"
  (cierra con resonancia, después el CTA viene naturalmente abajo)

## RESULTADO ESPERADO

Un ensayo que se siente como entrar en un espacio diseñado
para pensar. Cada scroll revela algo nuevo sin abrumar.
Los datos no se leen — se experimentan.
Las ideas no se explican — se muestran y después se contextualizan.
Al cerrar la página, el lector se queda pensando en algo concreto.

Si se siente como un artículo de blog con animaciones, fallaste.
Si se siente como una experiencia editorial donde cada pixel
tiene propósito, acertaste.
```

---

## CÓMO USAR ESTE BRIEF

1. Copia el brief de la PARTE 4 a un archivo: `.claude/skills/frontend-craft/references/brief-ensayo-digital.md`

2. Cuando vayas a crear un ensayo, pégale a Claude Code:

```
Lee CLAUDE.md.
Lee .claude/skills/frontend-craft/references/brief-ensayo-digital.md
Lee styles/tokens.css, styles/components.css.

Ahora crea ensayo-01.html siguiendo el brief de dirección creativa.

Aquí está el guion de dirección del ensayo:

[PEGA TU GUION ESCENA POR ESCENA]

Y aquí está el texto completo:

[PEGA EL TEXTO DEL ENSAYO]

Muestra el HTML completo antes de aplicar.
```

3. El guion de dirección lo haces TÚ. Es donde decides qué efecto va en cada escena. El brief le dice a Claude Code CÓMO ejecutar. El guion le dice QUÉ ejecutar.
