# Entorno digital · mapa por paradas (30-09-2026)

Sustituye al ensayo de Habitabilidad. Origen: documentos de la agencia en `content/fuentes/2026-09-30/` (contenido y diseño). Se aplicaron su lógica, su estructura y sus textos con el sistema de entrelampistas. El contenido publicado vive en `content/mapa-habitabilidad.json`; cada cambio respecto a la agencia lleva allí una marca `◆` junto al campo. La ruta sigue siendo `/habitabilidad`.

## Qué es

- **Mapa** (`/habitabilidad`): portada «Entorno digital · ¿Cómo habitamos internet?», tesis y «cómo leer este mapa», parada 00 (el índice como puerta, en tinta), recorrido por tramos (cómo llegamos · dónde estamos · qué viene · qué exigir), conceptos con ficha, preguntas frecuentes, siguiente mapa (Criterio) y fuentes.
- **Paradas** (`/habitabilidad/01`–`07`). Estructura fija:
  - titular que afirma, dentro de la foto o en una apertura sobre papel;
  - dato ancla con fuente, país y fecha;
  - texto;
  - bloques propios de la parada:
    - 04: criterios + índice;
    - 05: señales con gráficas;
    - 06: la factura y la reacción;
    - 07: exigencias, gesto y la única pregunta del mapa;
  - ejemplo reconocible;
  - conceptos;
  - puente a Criterio;
  - fuentes plegadas;
  - anterior · siguiente.
- La cabecera lleva guardar, compartir el enlace y **el recorrido** (hoja con las ocho paradas, leídas, «estás aquí» y «para ti»).
- **Índice ↔ mapa**:
  - al terminar el índice, el mapa marca con «para ti · dimensión» las paradas de las dimensiones que no salen habitables;
  - «por dónde empezar» enlaza a la parada de tu dimensión más baja.
  - Qué parada marca cada dimensión (`content/indice.json › dimensiones[].parada`): atención → 03 · agencia → 05 · relación → 06 · valor → 04 · estructura → 02.
- **Lectura**: una parada cuenta como leída al llegar a su navegación final (`ela_lectura_habitabilidad.paradas`). La lectura del ensayo antiguo se traslada sola (secciones 01, 02, 03, 04 y 05 → paradas 01, 02, 04, 03 y 07).
- **Enlaces viejos**: `/habitabilidad/ensayo` redirige al mapa, y `#seccion-0N` abre su parada.

## Decisiones de la autora (30-09-2026)

- Título «Entorno digital» y subtítulo «¿Cómo habitamos internet?» (la agencia proponía «El entorno digital · Internet ya no se usa: se habita»).
- El ensayo desaparece. El texto original de la autora sigue en `content/fuentes/2026-09-25/`.
- Textos de la agencia con nuestras correcciones marcadas; definiciones nuevas para los conceptos que faltaban.
- Puentes a las secciones reales de Criterio; datos verificados, con referencias.
- Revisión en la preview antes de producción.

## Nuestras correcciones al texto de la agencia (◆ a validar)

| Dónde | Agencia | Publicado | Por qué |
|---|---|---|---|
| Porcentajes | «96,4%» | «96,4 %» | Norma del español y de Criterio: espacio antes del % |
| Recorrido 01 | «96,4% de España está conectada» | «96,4 % de la población de España usa internet» | Lo que mide el dato |
| 03 · dato | «+50%» | «más del 50 %» | «+50 %» se lee como «subió un 50 %» |
| 04 · criterios | cuatro criterios | cuatro + «Hay una quinta, la estructura…» | Respondía a su pregunta abierta: el índice mide cinco dimensiones y la quinta (Estructura) se muestra aparte |
| 07 · exigencias | «cuatro cosas, una por criterio»; «Valor: que salir sea tan fácil como entrar» | cinco, una por dimensión; «Estructura: que salir sea tan fácil como entrar…»; **Valor (nuevo): «que sepas qué se lleva la plataforma de tu tiempo y tus datos, y qué te da a cambio»** | Salir con tus datos es Estructura en el índice; la de Valor es propuesta nuestra |
| 06 · entradilla y título | «la otra cara del backlash: la reacción» | «termina con la reacción» · título «La reacción» | Anglicismo y repetición |
| Puentes | Destinos que no existen en Criterio | La sección real más cercana (tabla abajo), con la pregunta de la agencia | Evitar callejones sin salida |
| Tiempos | «1 min» por parada, «15 min» | Solo en la frase de la tesis | Regla del 21-09: sin tiempos de lectura |
| Etiquetas | «MAPA · ENTORNO», «EL DATO», «ENTENDER · 1 MIN» | Solo para lectores de pantalla | Regla del 21-09: sin etiquetas que clasifiquen la pieza |
| Parada 00 | «Mide tu entorno» | Se mantiene; si ya hay índice en el dispositivo, enseña el número y «El recorrido marca las paradas que más tienen que ver con tu resultado» (◆ texto nuestro) | — |
| Feed | «leer el ensayo» | «empezar», a la parada 01 (◆ texto nuestro) | Ya no hay ensayo |
| Voz | «nosotras», «usuaria», «ir directa» | Se mantiene en este mapa | Texto aprobado; si se adopta para todo el sitio, es decisión aparte |

**Puentes a Criterio**

| Parada | Pregunta (agencia) | Destino en Criterio |
|---|---|---|
| 01 | ¿quién decide qué te llega? | 01 Los filtros que perdieron su sitio |
| 02 | ¿cómo sabes cuándo dejar de confiar en ella? | 04 Ni creérselo todo ni no creer nada |
| 03 | ¿cómo recuperas tus propias preguntas? | 03 Qué significa criterio informativo |
| 04 | Los mismos criterios sirven para evaluar un medio o una newsletter | 05 Lo que depende de ti y lo que no |
| 05 | Si recibes síntesis, ¿cómo la verificas? | 01 Los filtros que perdieron su sitio (el resumen de IA) |
| 06 | Antes de reenviar, tres comprobaciones | 02 La zona gris |
| 07 | El entorno explica el lugar… | siguiente mapa: Criterio informativo |

**Definiciones nuevas (◆ propuesta nuestra)**: entorno, espejo y molde, economía de la atención, habitabilidad, autonomía, burbuja de filtros (Pariser, 2011), desinformación, diseño adictivo. Enshittification es la de siempre; su fecha pasa de 2023 a 2022, cuando Doctorow le puso nombre.

## Verificación de datos (30-09-2026)

Cada cifra se comprobó contra su fuente primaria mediante búsqueda. **Las páginas no se pudieron abrir desde el entorno de trabajo** (bloqueo de red): lo confirmado sale de lo que las fuentes publican según los resultados de búsqueda. Antes de producción, alguien con acceso normal debería abrir las marcadas ⚠.

| Dato | Veredicto | Qué cambió |
|---|---|---|
| 01 · 96,4 % usa internet; 87,1 % adultos en redes (DataReportal) | Matizado | DataReportal cuenta perfiles («identidades de usuario»), no personas: «los perfiles en redes sociales equivalen al 87,1 % de los adultos». Fecha: finales de 2025 |
| 01 · >2,5 h al día; «llenar el tiempo libre» 2.º motivo (Digital 2026) | Confirmado | «la persona media» → «el internauta medio». Fuente: nota de prensa de Meltwater |
| 02 · Palabra del año ADS 2023 y Macquarie 2024 | Confirmado | Fuente del Macquarie directa. Edición en español del libro: *Mierdificación* (Capitán Swing, 2026; ISBN sin comprobar) |
| 03 · >50 % de Instagram lo recomienda la IA; 30 % en Facebook | Confirmado | Las dos cifras son de la misma llamada de resultados (24-04-2024). Se quita «no las cuentas que sigues»: Meta no lo dijo |
| 03 · TikTok 1 h 37 min en Android | Matizado | Es el usuario medio de TikTok, no cualquiera |
| 04 · Multas de 90.000 a 900.000 € sin cédula (Cataluña) | **Corregido** ⚠ | La multa no está en el Decreto 141/2012 sino en la **Ley 18/2007 del derecho a la vivienda** (arts. 118 y 123), tramo de 90.001 a 900.000 €. Lo muy grave es vender o alquilar como vivienda **un inmueble que no puede tener cédula**. Pendiente: leer los arts. 118, 123 y 124 en el BOE |
| 05 · Pew: 8 % frente a 15 % de clics; 1 % en el resumen | Confirmado | URL de Pew corregida. EE. UU., búsquedas en Google, marzo 2025 |
| 05 · 80 % usa un buscador cada mes | Matizado ⚠ | 80,3 % «en el último mes», la cifra más baja registrada (GWI). Otra fuente da 79,3 % |
| 05 · Instagram, función para ajustar el algoritmo en 2026; Mosseri reconoce la erosión del control | **Corregido** | La función es «Tu algoritmo»: en Reels desde diciembre de 2025 y en el feed desde junio de 2026. No hay cita comprobada de Mosseri: se retira. Metricool no se encontró: la fuente pasa a TechCrunch |
| 05 · 60 % redes o agregadores; 19 % confía en redes o chatbots | Matizado | Son dos cifras: 19 % en las de redes y 18 % en las de chatbots |
| 05 · 10 % usa chatbots de IA para informarse | Matizado | Es uso **semanal**, media de 48 países |
| 06 · 74 % teme la desinformación | Matizado | Es el 74 % al que le preocupa **distinguir lo verdadero de lo falso** en las noticias de internet (récord) |
| 06 · Primer móvil a los 11 años | Matizado | Es una frase del Gobierno (ministro Bolaños, 10-09-2025), sin estudio citado: «según el Gobierno» |
| 06 · 53 % de menores de 25 con bajo interés y baja confianza | Confirmado | — |
| 06 · Ley española de menores: 16 años y delito de manipular algoritmos | **Corregido** | Sigue en ponencia (reunión del 29-09-2026). Lo de los 16 años para redes con contenido dañino y el delito penal son **enmiendas** de PSOE y Sumar, no texto aprobado. En sept. 2025 el Congreso «dio luz verde a la tramitación» (no «admite a trámite») |
| 06 · Francia aprobó en 2026 una ley que prohíbe las redes a menores de 15 | **Corregido** ⚠ | El Parlamento la aprobó en julio de 2026, pero el Consejo Constitucional anuló esa prohibición el 14-08-2026 (Décision n° 2026-911 DC); el Gobierno prepara un nuevo texto. Comprobar en Légifrance |
| 06 · EU KIDS Act, 17-09-2026 | Confirmado | Es una **propuesta** de la Comisión: «propone» |
| 07 · 33 % confía en las noticias en general; 42 % en las que elige | Confirmado | — |

## Pendientes ◆

- Validar la autora: las correcciones de la tabla de arriba, la exigencia de Valor, la línea de la quinta dimensión, las ocho definiciones, «empezar» del feed y el texto de la parada 00 con índice hecho.
- Abrir en un navegador normal las fuentes marcadas ⚠: Ley 18/2007 en el BOE (arts. 118, 123 y 124), la decisión del Consejo Constitucional francés, el 80,3 % frente al 79,3 % de buscadores.
- Ley española de menores: revisar su estado antes de cada actualización del mapa.
- Si se quiere un ensayo largo de nuevo, o una versión «para leer seguido», hay que decidirlo aparte: hoy no existe.

## Reglas editoriales de la agencia (para actualizar este mapa y escribir los siguientes)

1. Cada parada tiene entre 120 y 150 palabras de texto principal.
2. El titular afirma algo. Nunca es una etiqueta.
3. Cada dato lleva fuente, país y fecha visibles en pantalla.
4. Frases de menos de 25 palabras. Nada de comas encadenadas.
5. Una sola pregunta abierta en todo el mapa, al final.
6. Primero se da el dato y después se pide la reflexión.
7. Cada parada termina con un puente a Criterio informativo (en Entorno digital; en otros mapas, al mapa que corresponda).
8. Los datos se revisan una vez al año, cuando sale el Digital News Report (junio). Las leyes en trámite, antes de cada publicación.
9. Se habla a la lectora de tú y en femenino cuando haga falta concordancia (en este mapa; ver «Voz» arriba).
