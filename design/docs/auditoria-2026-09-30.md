# Auditoría · valor editorial, UX, UI y marca

30-09-2026 · Estado del sitio en la rama `claude/entrelampistas-mobile-v1-5lvzi7` (build local, 23 páginas, `npm run check` limpio). Dos lentes cruzadas: la de un creativo sénior de IDEO (diseño centrado en la persona, recorrido emocional, coherencia entre lo que la marca dice y lo que hace) y la de un analista de producto de Y Combinator (¿esto es algo que la gente quiere?, activación, retención, bucles de crecimiento, foco).

Qué se miró: handoff completo (`design/`), el contenido íntegro (`content/`), los skills editoriales, el HTML generado y capturas a 390 de todas las rutas, incluidos los estados con índice hecho, la hoja de compartir, la hoja «el recorrido» y el flujo completo del índice. Qué no se pudo mirar: datos de PostHog, entrevistas con lectoras, el sitio en producción. Donde hay una propuesta nuestra y no un hecho, va marcada ◆.

---

## 0 · Veredicto en una página

**Lo que ya es valioso y hay que proteger.**

1. **«Habitabilidad» es una idea de categoría.** Trasladar la cédula de habitabilidad de la vivienda a las plataformas mueve la responsabilidad del hábito personal a las condiciones del entorno. Es el reencuadre más original del sitio y el índice lo convierte en algo que se puede usar y repetir. Es el activo sobre el que construir.
2. **Un sistema visual con carácter y disciplina.** Papel, tinta, un solo verde, Archivo y Space Mono, filetes de 1 px, cifras grandes, bloques de pregunta en tinta. Se reconoce a la primera y no se parece a ninguna newsletter cultural. La regla de fotos y el velo medido por foto son artesanía real.
3. **Una honestidad poco habitual.** Datos con fuente, país y fecha en pantalla; correcciones a la agencia documentadas; índice sin cuenta, sin servidor y sin culpa («una medida del lugar, no de ti»); analítica solo con consentimiento. Todo esto es marca, aunque hoy no se cuenta.
4. **El mapa por paradas** (Entorno digital) es el mejor formato del sitio: titular que afirma, dato ancla, texto corto, ejemplo, concepto, puente, fuentes. Y el enlace índice → paradas («para ti», «estás aquí») es una personalización sin cuenta que pocos productos editoriales tienen.

**Lo que hoy resta más valor del que suma.**

1. **La primera pantalla no dice qué es esto ni qué hacer.** A 390 × 844 se ve el logo, tres filtros, un garabato amarillo y una entrada de diccionario. La primera acción («ir al mapa») está a unos 1.000 px. Una recién llegada no supera la prueba de los cinco segundos.
2. **Tres mapas, tres productos.** Entorno digital es un mapa por paradas con voz en femenino; El mapa de tu mente es un ensayo largo en editorial suiza; Criterio es un ensayo con la presentación anterior. Cada uno tiene su renderer, su recorrido y sus botones. La lectora siente tres sitios.
3. **Los ensayos publican borradores.** La regla «verbatim de la autora» protege el texto, pero hoy salen frases sin resolver, una lista sin ejemplo y notas de trabajo («hay que editar esta referencia»). Para una marca que se define por el cuidado, es el riesgo editorial mayor.
4. **La marca es un fantasma.** No hay quién, ni dónde, ni desde cuándo. Cinco definiciones distintas del proyecto conviven entre el sitio, los skills y los metadatos. Y el sitio está lleno de «pronto» (bitácora, fichas, anterior · siguiente): la promesa incumplida se ve en todas las pantallas.
5. **El índice penaliza la honestidad.** «No lo sé» no puntúa, pero el divisor sigue siendo 24: quien dice «no lo sé» baja de nota. Contradice el copy («una pregunta sin responder no puntúa») y la tesis del proyecto.

**Las cinco jugadas que más mueven** (orden de impacto / esfuerzo): arreglar la primera pantalla del feed · una pasada de edición con la autora sobre los dos ensayos · una sola frase de posicionamiento en todas partes y un bloque «quién» en /proyecto · quitar todos los «pronto» · corregir el cálculo del índice con preguntas sin responder.

---

## 1 · Valor editorial

### Lo que funciona

- **Tesis coherente en tres piezas.** Dónde pensamos (Entorno digital), cómo nos llega lo que sabemos (Criterio), desde dónde decidimos (El mapa de tu mente). Las tres responden a una misma idea, el pensamiento de mantenimiento, y se enlazan de verdad (puentes de cada parada a una sección real de Criterio).
- **La pregunta como unidad editorial.** Cada sección cierra con una pregunta, cada mapa tiene una, el correo lleva «una pregunta para esta semana». Es una forma propia y compartible. «¿Quién eligió lo que has leído hoy?» y «¿Estás pensando o estás reaccionando?» son frases que Clara puede repetir en una conversación, justo lo que pide el skill.
- **Voz sin marketing.** Sin exclamaciones, sin «descubre», sin promesas. Se nombra la incertidumbre («No sabemos cómo será internet en cinco años»). Los ejemplos son domésticos y precisos (mirar la hora y quedarse en otra app; buscar una receta y tener el feed lleno de cocina).
- **Rigor visible.** Fuente, país y fecha en cada dato; «según el Gobierno» cuando no hay estudio; «en trámite · no aprobada» en la ley de menores. Esto es raro en español y merece contarse como parte de la propuesta.

### Lo que hay que corregir

**1.1 · Los ensayos salen sin editar.** Ejemplos concretos en `content/ensayo-decisiones.md`: «Cuando fallamos muchas veces en la misma dirección hablamos de sesgo, cuando aplicamos contextos, deducciones, marcos o ideas a decisiones en donde te afectan tener una lectura más objetiva de la situación» (no se entiende); «La representatividad. Clasificamos por parecido.» (falta el ejemplo que sí tienen los otros dos atajos); «el problema como con los atajos estos están cuando los usamos en el lugar equivocado». En Criterio: la entrada es una frase de 32 palabras con comas encadenadas, y dos referencias llevan la nota «hay que editar». La cabecera de cada `.md` ya lista todo esto. Lo que falta es la sesión de dos horas con la autora para cerrarlo. Hasta entonces, el sitio contradice su propia definición («un trabajo silencioso y constante») en el texto que más se lee.

**1.2 · Repetición por capas.** La definición de criterio informativo («la costumbre de revisar cómo nos llega la información, desde dónde la miramos y qué se queda fuera») aparece cinco veces en el recorrido: subtítulo de la tarjeta, intro del mapa, intro de las paradas, sección 03 y FAQ. La tesis de El mapa de tu mente se lee tres veces antes de la sección 01 (tarjeta desplegada, mapa, resumen del ensayo). En un producto que promete densidad, la repetición se lee como relleno. Regla ◆: cada frase de la autora aparece una vez en el recorrido; el resumen del mapa y el del ensayo no pueden ser el mismo texto.

**1.3 · Tres formatos, tres voces.** Entorno digital habla en femenino («nosotras», «usuaria», «ir directa») y en frases de menos de 25 palabras; los ensayos hablan en masculino genérico y en frases largas. El doc lo deja como «decisión aparte». Es una decisión de marca, no de una pieza: el público es 70 % mujeres y el femenino como genérico es una postura reconocible. Hay que elegir y aplicar a todo, incluidos correo, índice y /proyecto.

**1.4 · Tiempos de lectura que la regla prohíbe y que además no se cumplen.** «Ocho paradas, unos quince minutos en total. Cada una se lee sola en un minuto.» La parada 05 tiene 468 palabras en pantalla y tres gráficas; no es un minuto. Quitar los tiempos (regla del 21-09) o hacerlos verdad.

**1.5 · Fuentes secundarias en un mapa sobre criterio.** Benzinga para la cita de Zuckerberg, Onda Aragonesa y The Objective para el Digital News Report y la ley de menores, un PDF de El Notario para el decreto catalán. Una lectora que aplique la pregunta «Camino» del propio sitio lo verá. Sustituir por la fuente primaria (transcripción de resultados de Meta, PDF del DNR, BOE, diario de sesiones) es una tarde de trabajo y protege la credibilidad del argumento entero.

**1.6 · La quinta dimensión es un parche.** El mapa nombra cuatro criterios y el índice mide cinco; la línea «Hay una quinta, la estructura» y la exigencia de Valor son propuesta nuestra. Editorialmente, o la estructura es una dimensión con su parada (hoy es la 02, que va de enshittification) o es una condición y el índice deja de contarla entre las cinco en el copy («cinco dimensiones» en portada, tarjeta y correo). Ahora dice ambas cosas.

**1.7 · /pensamiento-de-mantenimiento y /proyecto son las únicas páginas que suenan a genérico.** «Un intento de responder con optimismo y actitud activa para mejorar nuestra autonomía, calidad de vida y relación con nuestro entorno» es la frase más cercana al vocabulario que el skill prohíbe. Y «pensamiento más autónomo y consciente» aparece en la definición, en la cita de la autora y en la meta description. Son las páginas que explican la marca y son las que menos suenan a ella.

**1.8 · Las FAQ existen para buscadores.** Nadie ha hecho esas preguntas. Es una decisión legítima, pero conviene que las respuestas no repitan literalmente el texto de arriba (hoy la FAQ de Criterio repite la definición y la de Entorno repite la ficha de enshittification).

---

## 2 · UX

### Recorrido de una recién llegada (Clara, desde un enlace de WhatsApp o LinkedIn)

| Paso | Qué ve | Qué siente | Problema |
|---|---|---|---|
| Aterriza en `/` | Logo pequeño, filtros, garabato amarillo, «entrelampistas [ɛ̃tɾə·lamˈpistas] sustantivo colectivo…» | Curiosidad, pero no sabe qué es esto ni para qué | Ninguna acción ni promesa en la primera pantalla |
| Baja | Foto de árboles y fachada, «Entorno digital · ¿Cómo habitamos internet? · toca para leer →», debajo «ir al mapa» y «empezar» | Tres formas de entrar a lo mismo | «toca para leer» abre dos párrafos, no el texto; «mapa» es vocabulario interno |
| Sigue | 300 px de garabato, otra foto de árboles (Criterio), el índice con la primera pregunta, otra definición, el correo, otra foto (El mapa de tu mente) | El índice es lo primero que entiende sin explicación | Las tres fotos de mapa se parecen; el índice llega a 2.000 px |
| Entra en un mapa | Pantalla de mapa: foto, tesis, botón «leer el ensayo», paradas plegadas, cinco preguntas, otro «leer el ensayo», otros mapas | Una tabla de contenidos larga antes del texto | En Criterio y Mente el mapa es una capa de indirección entre el feed y el ensayo |
| Lee | Ensayo o paradas; estado guardado; «has terminado · guardado» | Lo mejor del sitio | Bien |
| Hace el índice | Diez preguntas, resultado con número, barras, «por dónde empezar» con un gesto | Se siente vista y no juzgada | El gesto y la parada «para ti» están un toque más abajo de lo que deberían |
| Quiere volver | Correo «Únete · Te compartimos novedades y nuevos contenidos» | Nada la convence de dejar el correo | Copy genérico, sin cadencia ni promesa |

### Hallazgos

**2.1 · Primera pantalla (crítico).** La definición de diccionario es un gran dispositivo de marca, pero no es una portada. Propuesta ◆: en el primer viewport, una línea de posicionamiento (ver §4) y el objeto más fuerte del sitio con su acción, sea el índice («¿Es habitable tu vida digital? · calcular mi índice») o Entorno digital; la definición baja a segundo bloque o se compacta a dos líneas con «sobre el proyecto». Se conserva la decisión de la autora de que entrelampistas «abra» el feed si la palabra y la fonética van en la cabecera de esa portada.

**2.2 · Mapa como capa intermedia.** Para Criterio y El mapa de tu mente, feed → mapa → ensayo → sección son cuatro pasos hasta el texto. La pantalla de mapa repite la tesis y ofrece dos veces «leer el ensayo». Entorno digital muestra el patrón correcto: su pantalla de mapa tiene contenido propio (parada 00 en tinta, un dato por parada, tramos) y la hoja «el recorrido» vive dentro de las paradas. Propuesta ◆: el destino por defecto desde el feed es el texto; el mapa se convierte en la hoja «el recorrido» del ensayo (índice, leídas, preguntas) y la pantalla de mapa queda solo donde tiene contenido propio.

**2.3 · La palabra «mapa» significa tres cosas.** La pestaña Mapas, la pantalla de mapa de cada pieza y el título «El mapa de tu mente». «ir al mapa» junto a «El mapa de tu mente» es un chiste involuntario. Además, «ensayo» ya no describe Entorno digital, pero el filtro del feed sigue llamándose «ensayos» y su tarjeta lleva `data-tipo="ensayo"`.

**2.4 · Filtros para cuatro piezas.** «todos / ensayos / herramientas» filtra un feed con tres mapas y una herramienta. El filtro «herramientas» deja una tarjeta. Es una interfaz prematura: ocupa la cabecera, empuja el logo a un garabato de 48 px y no resuelve ninguna necesidad hasta que haya diez piezas. Retirar hasta entonces.

**2.5 · «Pronto» por todas partes.** Pestaña «bitácora · pronto» al 35 % en todas las pantallas raíz, tres chips «ficha pronto», «‹ anterior · pronto · siguiente · pronto ›» en la única ficha de concepto, «llega uno a uno» en estados vacíos. Cada «pronto» es una promesa visible que el sitio no cumple. Una barra de dos pestañas es mejor que una de tres con una muerta.

**2.6 · Índice: cálculo con preguntas sin responder.** `js/indice.js` suma los puntos y divide siempre entre 24. Con una pregunta en «No lo sé» el máximo posible es 21/24 y el índice baja. El copy dice «una pregunta sin responder no puntúa» y la lectora lo entiende como «no cuenta». Corregir: dividir entre el máximo alcanzable con las preguntas respondidas (o mostrar «sobre N preguntas») y, si una dimensión tiene las dos sin responder, no asignarle estado.

**2.7 · Índice: orden de opciones siempre igual.** En las diez preguntas la opción A es la buena y la D la mala. A la segunda pregunta la lectora ya conoce el patrón, y un cuestionario sobre sesgos no debería tener uno tan visible. Alternar la dirección en algunas preguntas (y ajustar los puntos) cuesta poco y mejora la señal. ◆ Requiere validar con la autora, porque los umbrales ya están marcados como pendientes.

**2.8 · Índice: lo más útil está un toque más abajo.** El resultado abre con título, texto, número y barras. El gesto concreto («entra en los ajustes de notificaciones y deja solo las que vienen de personas») y la parada «para ti» están tras «ver por dimensión». Ese gesto es el valor real de la herramienta y el motivo para volver: subirlo al primer resultado.

**2.9 · Correo.** «Únete · Te compartimos novedades y nuevos contenidos» es el texto más genérico del sitio y aparece en cinco rutas. No dice cuándo, ni qué, ni por qué. El correo de bienvenida y la «pregunta para esta semana» de la entrega 01 sí lo dicen: el formulario debería vender eso («una pregunta cada dos semanas, sin prisa»; ◆ la cadencia la decide la autora). El skill editorial ya propone «Únete a quienes cuidan cómo piensan».

**2.10 · Tarjetas del feed.** «toca para leer →» promete lectura y da dos párrafos en un velo negro que tapa la foto. Tres entradas por tarjeta (foto, botón tinta, botón texto) para dos destinos. Propuesta ◆: la foto abre el texto; debajo, una sola acción principal y los iconos.

**2.11 · Escritorio.** A ≥ 1024 se centra la columna móvil. Es una decisión de fase, pero el público objetivo lee en el portátil en horario de oficina y llega desde LinkedIn. La primera impresión en escritorio es «web de móvil». Si la fase 2 tarda, al menos la portada del feed y el índice merecen una versión a 720 px de columna.

**2.12 · Sin fecha ni autoría en las piezas.** Solo Entorno digital dice «revisado en septiembre 2026», al pie. En un mapa que promete revisar datos cada año, la fecha es una característica, no un pie. Los ensayos no tienen fecha alguna.

**2.13 · Detalles que están bien y hay que mantener.** Estado de lectura sin cuenta; «seguir leyendo · 0N»; «has terminado · guardado»; la hoja «el recorrido» con «estás aquí» y «para ti»; el aviso de analítica en dos frases; la página 404; sin overflow a 375 ni a 320; foco visible; reduced-motion.

---

## 3 · UI

### Puntuación por pantalla (1 flojo · 5 ejemplar)

| Pantalla | Jerarquía | Legibilidad | Coherencia | Craft | Nota |
|---|---|---|---|---|---|
| Feed | 2 | 4 | 3 | 4 | Primera pantalla sin foco; huecos de 300 px; tres fotos parecidas |
| Mapas | 4 | 4 | 4 | 4 | Retícula clara; «nuevo» en dos celdas y en la primera nada |
| Pantalla de mapa (Criterio, Mente) | 3 | 4 | 4 | 4 | Larga, duplica acciones |
| Entorno digital (mapa) | 5 | 4 | 5 | 5 | La mejor pantalla del sitio |
| Parada 01–07 | 5 | 5 | 5 | 5 | Componente editorial de referencia |
| Ensayo (suizo) | 4 | 5 | 4 | 5 | Tipografía de lectura excelente |
| Índice (preguntas) | 5 | 5 | 5 | 5 | Muy bien |
| Índice (resultado) | 4 | 4 | 5 | 5 | Gesto demasiado abajo |
| /proyecto | 3 | 4 | 3 | 3 | Hueco vacío de 400 px; lista larga; cursiva de la cita bien |
| /pensamiento-de-mantenimiento | 4 | 4 | 4 | 4 | Fotos del handoff 1 conviven con las nuevas |

### Hallazgos

**3.1 · El logo no funciona a 48 px.** La cara dibujada, a ese tamaño y sin nombre, se lee como un garabato. La marca escrita solo aparece en el `h1` del feed y en el pie. En las cabeceras de pieza no hay marca: solo la ruta en mono. Propuesta ◆: cara + nombre en la cabecera de sitio; en cabecera de pieza, al menos la cara con `aria-label` y enlace al inicio (hoy no hay forma de volver al inicio desde una parada sin usar «volver» varias veces).

**3.2 · La navegación principal va en el estilo menos legible.** Mono 11 px, mayúsculas, tracking 0,08 em: «SOBRE EL PROYECTO →», «TOCA PARA LEER →», «IR AL MAPA», «LEER LA IDEA →». Es correcto como meta, pero es el estilo de todos los botones y enlaces de acción. Un botón principal a 11 px en un móvil es pequeño. Subir botones a 12–13 px mono conservando el resto es compatible con el brief (los tokens de tipografía son del brief, pero el tamaño de botón no está fijado).

**3.3 · Las fotos no diferencian los mapas.** Entorno digital: fachada con árboles. Criterio: copas de árbol con cables. El mapa de tu mente: macro botánico. Las dos primeras se confunden en el feed y en Mapas. `fotos.md` fija la asignación; la corrección es de selección, no de código: elegir para Criterio una foto de la serie que no sea follaje, o llevar la serie botánica a un registro más cerrado.

**3.4 · Texto sobre foto en el límite.** El velo medido garantiza 4,5:1 en el percentil 80, pero el subtítulo de Criterio en el feed (tres líneas sobre hojas) sigue siendo ruidoso. La regla «toda foto con título dentro» es coherente; la excepción razonable es limitar el subtítulo sobre foto a una línea y dejar la frase larga fuera, en papel.

**3.5 · Huecos por carga diferida.** Los garabatos `loading="lazy"` dejan 300–400 px en blanco en feed y en /proyecto hasta que cargan (se ve en las capturas). Pasar los garabatos a `eager` (pesan 52 KB) o reservar el alto con el tamaño real y un fondo `--papel-2` mientras cargan.

**3.6 · Gráficas de la parada 05.** «Más de la mitad» se dibuja como exactamente la mitad (50/50); y las barras de 15 % frente a 8 % con etiquetas mono de 11 px en 390 px son difíciles de leer. Para «más de la mitad» usar una barra sola con la etiqueta, sin reparto. Las cifras grandes de la misma parada (60 %, 19 %) funcionan mejor que las barras.

**3.7 · Filtros de la cabecera a ras del borde derecho** a 390 («HERRAMIENTAS» toca el margen). No hay overflow, pero visualmente el margen de 16 desaparece. Si los filtros se retiran (§2.4) desaparece el problema.

**3.8 · Mapas: «nuevo».** Dos celdas dicen «nuevo» y la primera no dice nada. Sin lectura guardada, las tres deberían decir lo mismo; `listaMapas()` marca «nuevo» por dato de contenido, no por estado. Decidir una regla: «nuevo» = publicado en los últimos 30 días, o quitarlo.

**3.9 · Lo que es ejemplar.** La parada (folio en foto o apertura sobre papel, dato ancla en 56/800, «lo reconocerás si…», concepto en chip, «sigue en Criterio informativo», fuentes plegadas, anterior · siguiente en tinta). La pregunta del mapa en bloque de tinta con ○ colgado. El resultado del índice con estructura en línea discontinua. La entradilla del ensayo a 21/500. Las cifras del INE (9,87 % y 2.495.300) apiladas. Todo eso es sistema, no decoración.

---

## 4 · Marca

### Activos

- **El nombre y el relato.** «entrelampistas», el oficio de quien cuida los espacios, la fonética, la entrada de diccionario, el verde y la cara dibujada. Es raro, es memorable y tiene historia.
- **Una categoría propia: pensamiento de mantenimiento.** Nadie más la usa. Un proyecto que se convierte en la definición de una cosa nueva tiene una ventaja que no depende del presupuesto.
- **Un concepto exportable: habitabilidad digital**, con una herramienta que lo mide.
- **Un sistema visual que ya es identidad**: cualquier pantalla del sitio se reconoce sin logo.

### Problemas

**4.1 · Cinco autodefiniciones.** «Web editorial» (CLAUDE.md), «editorial digital de pensamiento de mantenimiento» (JSON-LD), «espacio de aprendizaje editorial: ensayos y herramientas…» (/proyecto), «plataforma editorial de pensamiento estructural / laboratorio de infraestructura mental / serenidad estructural» (skills), «mapas, ensayos y herramientas para un pensamiento más autónomo» (meta description del feed). Los skills editoriales describen un proyecto («infraestructura mental», «serenidad estructural») que el sitio nunca nombra. Hace falta una frase, la misma en el `<title>`, el `og:description`, /proyecto, la bienvenida y el pie de la tarjeta compartible. Propuesta ◆ para discutir con la autora: «entrelampistas · mapas y herramientas para revisar cómo pensamos».

**4.2 · «Habitabilidad» acaba de perder el título.** La mejor idea del proyecto vive en la ruta `/habitabilidad`, en el «Índice de habitabilidad digital», en la tarjeta «índice · habitabilidad» y en la parada 04, pero el mapa se llama «Entorno digital». Es una decisión de la autora y es defendible (el entorno es el tema, la habitabilidad es el criterio). Lo que hay que evitar es que el concepto quede como palabra técnica del índice: conviene que la pantalla de mapa lo nombre en la tesis y que el índice, el mapa y la parada 04 se llamen igual.

**4.3 · Nadie firma.** No hay quién, ni ciudad, ni fecha de inicio, ni forma de contacto que no sea responder a un correo que todavía no has recibido. Para un lector que aplica «¿quién decidió que lo viera?» a lo que lee, un sitio anónimo es una contradicción. «Plataforma, no marca personal» no exige anonimato: un bloque «quién hace esto» de tres líneas en /proyecto, con nombre, ciudad y desde cuándo, es suficiente. Las fotos de la autora ya están; la autora no.

**4.4 · Voz y género.** Ver §1.3. Elegir el femenino como genérico en todo el sitio sería una decisión de marca coherente con el público y con la agencia; mantener el masculino en los ensayos y el femenino en un mapa es lo único que no vale.

**4.5 · La marca de lo inacabado.** «bitácora · pronto», «ficha pronto», «anterior · pronto», «llega uno a uno», «las herramientas llegan una a una», «todavía». Un sitio de cuatro piezas puede ser pequeño con dignidad; lo que no puede es anunciar lo que no tiene en cada pantalla.

**4.6 · El correo no suena a la marca.** «Únete», «suscribirme», «novedades y nuevos contenidos». Es el único componente que podría estar en cualquier sitio. La bienvenida, en cambio, es de las mejores piezas del proyecto. Traer una frase de la bienvenida al formulario resuelve UX y marca a la vez.

**4.7 · Sin presencia fuera del sitio.** No hay enlaces a redes ni a ningún otro lugar donde exista entrelampistas. Puede ser una postura (coherente con el mapa), pero hay que enunciarla: «no estamos en redes; estamos aquí y en tu correo» dice más de la marca que un icono de Instagram.

---

## 5 · Lente de producto (YC)

**¿Es algo que la gente quiere?** El trabajo que resuelve el sitio para Clara es concreto: entender por qué su vida digital se siente mal sin culparse, y tener lenguaje para decirlo. El índice lo hace en tres minutos. Los mapas lo argumentan. Es una propuesta real y estrecha, que es lo que se quiere al principio.

**¿Qué medir?** Con la analítica actual (solo tras consentimiento, sesgo asumido) propongo ◆:

| Métrica | Qué es | Por qué |
|---|---|---|
| Activación | `indice_terminado` o dos `parada_leida` en la primera sesión | Es el momento en que la persona «lo entiende» |
| Retorno | segunda sesión en 30 días (PostHog, retención por `$pageview`) | Un proyecto editorial vive del retorno, no del tráfico |
| Estrella polar | índices terminados por semana + `parada_leida` de la parada 07 | Herramienta usada + mapa completado |
| Conversión a correo | `correo_alta` / sesiones | Único canal de retorno que controla el proyecto |
| Difusión | `compartir_enlace` + `compartir_png` / `indice_terminado` | El único bucle de crecimiento hoy |

Sin cifras objetivo no hay aprendizaje: fijar un punto de partida en cuatro semanas y decidir con él, no con opiniones.

**Bucles de retención y crecimiento.**

- El único bucle de retorno es «repetir mi índice» («para comparar cuando lo repitas»). Nadie recordará hacerlo. La bienvenida puede proponer «repítelo dentro de un mes» y la entrega mensual puede pedirlo. Es la forma de que el índice sea un hábito y no un test.
- El único bucle de difusión es compartir un enlace o la tarjeta del índice. La tarjeta lleva número y barras; el enlace lleva la pregunta del mapa. Bien. Lo que falta es un motivo para compartir en el momento del resultado: «¿y tu entorno?» ◆ como línea bajo «compartir».
- La «pregunta para esta semana» del correo es el mejor formato de retención del proyecto y no existe en el sitio. Una pregunta viva en la portada (la del mapa más reciente) une feed, correo y compartir.

**Foco y velocidad.** El sitio tiene cuatro piezas y tres formatos con tres renderers, un generador propio, un medidor de velos y una docena de documentos. Cada pieza nueva exige código. Es una fábrica grande para una producción de cuatro. La agencia dejó reglas editoriales claras para el formato por paradas; conviene decidir que **todo mapa nuevo es por paradas** y que Criterio y El mapa de tu mente se pasen a ese formato cuando la autora entregue el texto (o conserven el ensayo como «versión para leer seguido», sin pantalla de mapa). Mantener tres formatos multiplica el trabajo y divide la marca.

**Riesgos.**

- Datos con fecha de caducidad (ley de menores, Francia): el mapa promete revisión anual y ya hay un hito «en trámite». Necesita un dueño y una fecha de revisión visible.
- Sin escritorio, la mitad probable de las visitas desde LinkedIn ve una columna estrecha.
- Alta de correo sin confirmación: legal en España, pero sin prueba de consentimiento y con riesgo de altas ajenas (la bienvenida ya lo cubre con la línea de baja).
- La atribución «fotos · Rodrig Moss / Unsplash» al pie del ensayo de Decisiones es correcta; hay que mantenerla si se reutilizan las fotos en la tarjeta compartible.

---

## 6 · Plan priorizado

### Esta semana (poco esfuerzo, mucho impacto)

1. Primera pantalla del feed: línea de posicionamiento + objeto principal con acción en el primer viewport (§2.1). Requiere ◆ la frase de la autora.
2. Quitar todos los «pronto»: pestaña bitácora, chips, anterior · siguiente, estados vacíos (§2.5, §4.5).
3. Índice: dividir entre el máximo alcanzable con las preguntas respondidas; no asignar estado a una dimensión sin respuestas (§2.6).
4. Resultado del índice: gesto y parada «para ti» en la primera vista (§2.8).
5. Correo: copy con promesa y cadencia (§2.9, §4.6). ◆ cadencia de la autora.
6. Garabatos `eager` o alto reservado (§3.5).
7. Fuentes primarias en Entorno digital (§1.5).

### Próxima iteración

8. Sesión de edición con la autora sobre los dos ensayos: frases sin resolver, ejemplo de representatividad, referencias de la BBC y Meta (§1.1).
9. Una frase de posicionamiento en `<title>`, metadatos, /proyecto, bienvenida y tarjeta; bloque «quién» en /proyecto (§4.1, §4.3).
10. Decidir la voz (femenino genérico o no) y aplicarla a todo (§1.3, §4.4).
11. Feed sin filtros; tarjeta con una acción principal; «mapa» solo con un significado (§2.3, §2.4, §2.10).
12. Cabecera con marca (cara + nombre) y botones a 12–13 px (§3.1, §3.2).
13. Foto de Criterio que no se confunda con la de Entorno digital (§3.3).
14. Regla de «nuevo» en Mapas (§3.8). Gráficas de la parada 05 (§3.6).

### Estratégico (decidir con la autora)

15. Un solo formato para los mapas: paradas. Qué pasa con los ensayos existentes (§5, §2.2).
16. Habitabilidad como concepto visible: nombre común para índice, parada 04 y tesis del mapa (§4.2).
17. Escritorio para portada e índice antes de la fase 2 completa (§2.11).
18. Estructura: ¿dimensión o condición? Y cerrar la exigencia de Valor (§1.6).
19. Cuatro semanas de medición con las métricas de §5 y una revisión con datos.

---

## Anexo · Heurísticas aplicadas

- IDEO: deseabilidad (¿Clara lo quiere?), recorrido emocional (curiosidad → reconocimiento → alivio de la culpa → gesto), coherencia entre promesa y comportamiento de la marca, prueba de los cinco segundos, «pronto» como deuda visible, humanidad (garabatos, fotos de la autora, honestidad) como ventaja a proteger.
- YC: hacer algo que un grupo pequeño quiera mucho; una métrica que importe; activación y retorno antes que tráfico; bucles, no campañas; no construir para diez piezas cuando hay cuatro; hablar con las lectoras (no hay ninguna entrevista en el handoff: es la primera cosa que faltaría por hacer).
- Nielsen (visibilidad del estado, correspondencia con el mundo real, consistencia, reconocimiento sobre recuerdo, estética mínima) y WCAG 2 AA (auditoría previa limpia; se mantiene).
