# Propuestas · las cinco jugadas de la auditoría

30-09-2026 · Salen de `auditoria-2026-09-30.md`, una por jugada. Todo lo de aquí es propuesta ◆: **nada está aplicado al sitio** y nada se aplica hasta que se decida.

---

## Jugada 1 · Primera pantalla del feed

### El problema en una frase
A 390 × 844 la primera pantalla enseña el logo, tres filtros, un garabato amarillo y una entrada de diccionario. No dice qué es esto ni ofrece nada que hacer. La primera acción («ir al mapa») está a unos 1.000 px.

### Qué no cambia
La autora decidió el 30-09 que entrelampistas abre el feed. Las tres propuestas lo respetan: la palabra, la fonética y las acepciones siguen siendo lo primero. Lo que cambia es que la primera pantalla además **promete algo y ofrece una acción**.

### Propuesta A · la definición se convierte en portada (recomendada)

Un solo bloque, en papel, dentro del primer viewport:

```
[cara + entrelampistas]                                   ← cabecera con marca (ver jugada 3)

entrelampistas
[ɛ̃tɾə·lamˈpistas] · sustantivo colectivo, adj. ocasional, verbo.

1  Nombre prestado del oficio de quienes cuidan, arreglan
   y mantienen los espacios donde vivimos.
2  Un trabajo silencioso y constante que ayuda a construir
   un pensamiento más autónomo y consciente.

Mapas y herramientas para revisar cómo pensamos.          ← línea de posicionamiento, 19/500 (titulo)

[ ¿es habitable tu vida digital? · calcular mi índice ]   ← botón acento 48, ancho completo
sobre el proyecto →                                        ← mono, como hoy
```

- El garabato de velas baja al bloque siguiente (o se queda a 60 px de alto a la derecha de la palabra). Hoy ocupa 200 px de la primera pantalla.
- El botón lleva a `/indice`. Es la acción con mejor activación posible: tres minutos, sin cuenta, y termina en el mapa («para ti»).
- Si la autora prefiere que la primera acción sea un mapa y no la herramienta: «empezar por Entorno digital →» como botón tinta. No las dos.

Por qué esta: conserva la decisión de la autora, añade una promesa de una línea y una acción, y no introduce ningún componente nuevo (definición + titulo + botón acento ya existen).

### Propuesta B · pregunta viva

La primera pantalla es un bloque de tinta con **la pregunta de la semana** (la del mapa más reciente o la del correo), y debajo la definición:

```
■ esta semana
¿Cuánto de lo que leíste hoy lo elegiste tú?
leer el mapa →           compartir
```

Une feed, correo y compartir en un mismo objeto. Cuesta más: hay que decidir quién cambia la pregunta y cada cuánto (◆ cadencia de la autora). Es la propuesta con más carácter y la que más compromiso pide.

### Propuesta C · mínima

Sin tocar el orden: la definición pierde el garabato grande, y bajo las acepciones aparece la línea de posicionamiento y un solo botón («calcular mi índice»). Es la A sin discusión de jerarquía. Se puede hacer en una hora.

### Lo que hay que retirar en cualquier caso
- Los filtros «todos / ensayos / herramientas» de la cabecera. Hoy filtran cuatro piezas; «ensayos» enseña un mapa sin ensayo. Vuelven cuando haya diez piezas.
- «toca para leer →» en las tarjetas: la foto abre la pieza; la tesis in-card se queda como está pero con la etiqueta «la tesis →».
- Un solo botón principal por tarjeta. Hoy: «ir al mapa» + «empezar» / «leer el ensayo».

---

## Jugada 3 · Una frase de posicionamiento y un «quién»

### El problema
Cinco autodefiniciones conviven: «web editorial», «editorial digital de pensamiento de mantenimiento» (JSON-LD), «espacio de aprendizaje editorial: ensayos y herramientas para construir un pensamiento más autónomo y consciente» (/proyecto y bienvenida), «plataforma editorial de pensamiento estructural / laboratorio de infraestructura mental» (skills), «mapas, ensayos y herramientas para un pensamiento más autónomo» (meta description). Los skills describen un proyecto que el sitio no nombra.

### Criterios para la frase
Una línea, en minúscula como el resto del copy, sin verbos de marketing, que diga **qué hay** (mapas, herramientas) y **para qué** (revisar cómo pensamos), y que use el vocabulario del oficio. Debe caber en un `<title>` con el nombre delante (≤ 60 caracteres en total) y sonar bien leída en voz alta.

### Cinco candidatas

| # | Frase | Caracteres | Notas |
|---|---|---|---|
| 1 | **mapas y herramientas para revisar cómo pensamos** | 47 | Recomendada. Nombra los dos objetos del sitio y el gesto del oficio (revisar). |
| 2 | pensamiento de mantenimiento: revisar lo que pensamos, hacemos y habitamos | 74 | Nombra la categoría. Larga para `<title>`; vale para /proyecto y la bienvenida. |
| 3 | lo que pensamos necesita trabajo | 32 | Ya es la primera frase de /pensamiento-de-mantenimiento. Es un lema, no una descripción: no explica qué hay. |
| 4 | un lugar para revisar cómo pensamos, decidimos y habitamos internet | 66 | Cubre los tres mapas. Demasiado atada al tema digital para los mapas que vengan. |
| 5 | mapas para pensar con más pausa, más contexto y más conversación | 63 | Toma el cierre de Pensamiento de mantenimiento. Bonita, menos concreta. |

Combinación propuesta: **1** como línea de posicionamiento en todas partes y **3** como lema donde quepa una segunda línea (bienvenida, /proyecto, tarjeta compartible).

### Dónde va la misma frase (hoy, cada sitio dice una cosa)

| Lugar | Hoy | Propuesta |
|---|---|---|
| `<title>` del feed | entrelampistas · pensamiento de mantenimiento | entrelampistas · mapas y herramientas para revisar cómo pensamos |
| `meta description` del feed | Mapas, ensayos y herramientas para un pensamiento más autónomo: el entorno digital… | Mapas y herramientas para revisar cómo pensamos: el entorno digital, el criterio informativo y el mapa de tu mente. Sin prisa y sin ruido. |
| JSON-LD `Organization.description` | Editorial digital de pensamiento de mantenimiento en español. | Mapas y herramientas para revisar cómo pensamos. Pensamiento de mantenimiento, en español. |
| /proyecto, cita de la autora | «Entrelampistas es un espacio de aprendizaje editorial: ensayos y herramientas para construir un pensamiento más autónomo y consciente.» | Se mantiene si la autora la firma; si no, la línea 1 en `titulo` y sin comillas. |
| Bienvenida, primer párrafo | «Te escribiremos cuando haya algo nuevo que pensar…» | Igual, más una línea: «entrelampistas: mapas y herramientas para revisar cómo pensamos.» |
| Tarjeta compartible, pie | entrelampistas.com/… | sin cambio (el dominio basta) |
| Skills editoriales | «pensamiento estructural», «serenidad estructural», «infraestructura mental» | Rehacer la identidad de `project` y `editor-lampista` con el vocabulario del sitio (pensamiento de mantenimiento, habitabilidad, revisar). Hoy `npm run check` solo vigila los skills visuales. |

### El bloque «quién» en /proyecto

Va entre la cita de la autora y «véase también». Tres líneas, sin foto, sin biografía. Modelo (◆ los datos los pone la autora):

```
QUIÉN
entrelampistas lo escribe [nombre] desde [ciudad], desde [año].
Las fotos son suyas salvo que se indique. Sin patrocinios ni publicidad.
Escríbenos: responde a cualquier correo de la lista, lo leemos.
```

- Formato: etiqueta mono `--tinta-3` + tres líneas `cuerpo`. Sin componente nuevo.
- Si la autora prefiere no firmar con nombre: «entrelampistas lo escribe una persona desde Madrid, desde 2026» sigue siendo mejor que nada. Lo que no funciona es el sitio sin nadie detrás, en un proyecto que enseña a preguntar «¿quién decidió que lo viera?».
- Añadir «desde cuándo» y «cómo se financia» son las dos preguntas que más confianza dan por menos texto.

Además, en cada pieza: **fecha de publicación o de última revisión** en la cabecera de la portada (mono `--tinta-3`, «revisado · septiembre 2026»). Entorno digital ya la tiene al pie; subirla. Los ensayos no la tienen.

---

## Jugada 2 · Propuesta de edición de los ensayos (para la sesión con la autora)

Regla del proyecto: el texto de la autora es verbatim. Por eso esto **no se aplica**: es la lista de lo que conviene resolver con ella, con una propuesta concreta por punto para que la sesión dure una hora y no una tarde. Se marca lo que ya estaba anotado en la cabecera de cada `.md` y lo nuevo.

### El mapa de tu mente (`content/ensayo-decisiones.md`)

| Dónde | Hoy | Propuesta | Nota |
|---|---|---|---|
| Intro | «con atajos, patrones e historias que vamos armando sin mucha decisión, y éstas no son el problema, sin ellas no podríamos darle sentido a nuestras vidas. Sin ellos nuestras rutinas de la mañana se complicarían mucho.» | «…con atajos, patrones e historias que vamos armando sin mucha decisión. No son el problema: sin ellos no podríamos darle sentido a nuestras vidas, y las rutinas de la mañana se complicarían mucho.» | «éstas» y «ellos» alternan el género del referente; dos frases dicen lo mismo |
| Intro | «A separar dos cosas que solemos mezclar; el mapa es nuestro y que el territorio lo construyen otros.» | «A separar dos cosas que solemos mezclar: que el mapa es nuestro y que el territorio lo construyen otros.» | ya anotado |
| 03 | «La representatividad. Clasificamos por parecido.» | «La representatividad. Clasificamos por parecido. Alguien con gafas y jersey de lana nos parece profesor antes que fontanero, aunque haya muchos más fontaneros.» | ya anotado (falta el ejemplo); el ejemplo es propuesta nuestra, en el tono del de la disponibilidad |
| 03 | «Cuando fallamos muchas veces en la misma dirección hablamos de sesgo, cuando aplicamos contextos, deducciones, marcos o ideas a decisiones en donde te afectan tener una lectura más objetiva de la situación.» | «Cuando fallamos muchas veces en la misma dirección hablamos de sesgo: aplicamos un marco que nos sirvió en otro contexto a una decisión que pedía mirar la situación de nuevo.» | ya anotado (no se entiende); hay que preguntarle qué quería decir |
| 03 | «ése es error de atribución» | «ese es el error de atribución» | ya anotado; «ese» sin tilde por la norma de 2010 |
| 04 | «el problema como con los atajos estos están cuando los usamos en el lugar equivocado» | «el problema, como con los atajos, está en usarlos en el lugar equivocado» | ya anotado |
| 04 | «decir que este mapa ya no me sirve es también decir parte de quien creía ser ya no vale» | «…es también decir que parte de quien creía ser ya no vale» | ya anotado |
| 03 | Lista de sesgos tras las tres heurísticas (atribución, coste hundido, halo, punto ciego) va en párrafos sueltos sin nombre delante | Darles el mismo formato que a las heurísticas: «El error de atribución. Él llega tarde porque…» | nuevo; hoy el lector no sabe que empieza una segunda lista |
| 02 | «Un estudio de la Comisión Europea midió… el 47 % de las veces» | Añadir año y nombre del estudio (Behavioural study on unfair commercial practices in the digital environment, 2022) | nuevo; es el único dato del ensayo y va sin fuente, en un sitio que en Entorno digital pone país y fecha a cada cifra |

### Criterio informativo (`content/ensayo-criterio.md`)

| Dónde | Hoy | Propuesta | Nota |
|---|---|---|---|
| Entrada | «En el grupo alguien reenvía una captura de pantalla, un titular sin fecha, sin enlace y sin medio, en diez minutos hay tres opiniones en donde ninguna aporta un dato.» | «En el grupo alguien reenvía una captura de pantalla: un titular sin fecha, sin enlace y sin medio. En diez minutos hay tres opiniones y ninguna aporta un dato.» | nuevo; es la primera frase del sitio en feed, correo y mapa, y va con comas encadenadas |
| 01 | «…operativos, editores, periodistas, instituciones académicas, bibliotecarios, una cadena de mediación…» | «…operativos: editores, periodistas, instituciones académicas, bibliotecarios. Una cadena de mediación…» | nuevo; puntuación |
| 01 | «Esos filtros siguen ahí pero han perdido el sitio, un reportaje de seis meses…» | «Esos filtros siguen ahí, pero han perdido el sitio: un reportaje de seis meses…» | nuevo |
| 01 | Estudio de la BBC / EBU (45 %, una de cada tres) | La autora pidió editar la referencia. Propuesta: «Un estudio de la Unión Europea de Radiodifusión dirigido por la BBC (octubre de 2025) revisó más de tres mil respuestas…» y destacar la cifra como en los demás ensayos | ya anotado; hasta entonces la cifra no se destaca |
| 02 | Meta y las notas de la comunidad | La autora pidió editar. Propuesta: «Meta cerró en enero de 2025 su programa de verificación con organizaciones independientes en Estados Unidos y lo sustituyó por notas que escriben los propios usuarios.» y quitar «dieciséis países de América Latina» si no hay fuente a mano | ya anotado |
| 03 | «El criterio se parece más a una revisión que se repite más que a un conocimiento que se acumula.» | «El criterio se parece más a una revisión que se repite que a un conocimiento que se acumula.» | ya anotado (doble «más»); la frase es la tesis de la sección y se destaca en 700 |
| 04 | «Hay dos prácticas sencillas que ayudan y las dos van contra la intuición. La primera es la lectura lateral, cuando algo nos genera dudas en lugar de leerlo con más atención salimos de la página…» | «…La primera es la lectura lateral: cuando algo nos genera dudas, en lugar de leerlo con más atención salimos de la página…» | nuevo; el párrafo tiene cuatro frases de más de 40 palabras |
| 05 | «de acuerdo a nuestros parámetros» | «según nuestros propios criterios» | nuevo; «de acuerdo a» es calco y «parámetros» no es palabra del ensayo |
| Subtítulo | «¿cómo orientarse en un entorno que no fue diseñado para que entendamos?» (portadas) frente a «¿Cómo te llega lo que sabes?» (feed, Mapas, correos) | Elegir una. La corta es mejor pregunta de portada; la larga puede ser la entradilla | ya anotado |

### Común a los dos
- **Una regla de repetición**: cada frase aparece una vez en el recorrido. Hoy la definición de criterio informativo sale cinco veces y la tesis de El mapa de tu mente tres veces antes de la sección 01. Decidir qué texto va en la tarjeta, cuál en el mapa y cuál en el resumen del ensayo; que no sean el mismo.
- **Fecha y fuente**: cada dato con año (y fuente en el pie o en fuentes plegadas, como en Entorno digital).
- **Voz**: decidir el femenino genérico para todo el sitio o para nada (Entorno digital lo usa; los ensayos no).

Cómo hacer la sesión: la autora abre este documento y el `.md` a la vez; acepta, cambia o rechaza cada fila; quien edite actualiza el `.md` y retira la nota ◆ de su cabecera. Una hora.

---

## Jugada 4 · Retirar los «pronto»

Inventario de lo que promete y no cumple, con la propuesta para cada uno. Ninguno requiere componente nuevo.

| Dónde | Hoy | Propuesta |
|---|---|---|
| Barra inferior (feed y Mapas) | Tres pestañas; «bitácora · pronto» al 35 %, sin acción | Dos pestañas (inicio, mapas). El brief §4 fija tres columnas: sería una decisión posterior al handoff, como las demás de CLAUDE.md |
| /conceptos/enshittification, «cerca» | Tres chips deshabilitados con `title="ficha pronto"` (captura, coste de salida, lo común) | Retirar el bloque hasta que exista una segunda ficha |
| /conceptos/enshittification, pie | «‹ anterior · pronto · siguiente · pronto ›» | Retirar la navegación hasta que haya un segundo concepto |
| Cierre de la pantalla de mapa (Criterio, Mente) | Chips de concepto sin ficha llevan `title="ficha pronto"` | Chip sin título emergente; sigue sin ser enlace |
| Mapas, subtítulo | «…las herramientas llegan una a una.» | «Tres mapas. Cada uno es una pregunta y un recorrido.» |
| Mapas, estado vacío | «Nada en ese eje todavía. · llega uno a uno» | «Nada en ese eje. · prueba con todos» |
| Feed, estado vacío | «Nada con ese filtro. · todavía» | «Nada con ese filtro. · prueba con todos» (o desaparece si se retiran los filtros, jugada 1) |
| `mapa-pantallas.md` | «Bitácora: pestaña visible al .35 con «pronto»» | Actualizar la línea |

Esfuerzo: una hora, tres archivos de plantilla, una línea de CSS y una de JS de render.

---

## Jugada 5 · Cálculo del índice con preguntas sin responder

### El fallo
En `js/indice.js`, `calcular()` suma los puntos y divide siempre entre 24. «No lo sé» y «saltar esta» guardan `nose`, que vale 0. Quien responde con honestidad baja de nota. El copy dice «Una pregunta sin responder no puntúa y aparece con asterisco» y la lectora lo entiende como «no cuenta». Además, hoy basta una pregunta sin responder para que toda la dimensión quede «sin responder», aunque la otra sí tenga respuesta.

Ejemplo: todo A salvo una pregunta en «No lo sé» da 88 en vez de 100, y esa dimensión aparece sin estado.

### Propuesta de regla (para `mapa-pantallas.md` §Índice)
- Índice = suma de las cuatro dimensiones con margen / **máximo alcanzable con las preguntas respondidas** (3 por pregunta; 24 si se responden las ocho) × 100.
- Dimensión sin ninguna respuesta: sin estado («sin responder», asterisco), como hoy.
- Dimensión con una sola respuesta: estado estimado llevando sus puntos a la escala 0–6, y asterisco.
- Sin ninguna respuesta con margen: no hay lectura posible; el título no puede ser «poco habitable».
- «Por dónde empezar»: la dimensión más baja **entre las que tienen alguna respuesta**, en escala normalizada.
- Barras y tarjeta compartible: porcentaje sobre las preguntas respondidas de cada dimensión.
- Índices ya guardados en el dispositivo (sin el dato de cuántas preguntas se respondieron): se leen como hasta ahora.

### Qué cambia en código (cuando se decida)
`calcular()`, `estadoDe()`, `resultadoDe()`, la barra (`barraHtml`) y `tarjetaDatos()` en `js/indice.js`; cada índice guardado añade `respondidas` y `parciales`. El copy de `content/indice.json` («no puntúa y aparece con asterisco») pasa a ser verdad sin tocarlo. Se probó en local con cuatro recorridos y el resultado era el esperado; el código no está en la rama.

### Relacionado, para la misma decisión
Las diez preguntas tienen siempre la opción A como la mejor y la D como la peor. A la segunda pregunta el patrón se ve. Alternar la dirección en algunas preguntas (ajustando los puntos) mejora la señal; requiere validar los umbrales, que ya están marcados ◆.
