# Newsletter · recién suscrito · encargo de diseño

Para quien diseña el correo que recibe una persona al apuntarse al newsletter de entrelampistas. Reúne los textos (verbatim, no se reescriben para que quepan), qué es entrelampistas y la dirección de arte y de marca. La fuente de los textos es `content/newsletter/`; si este documento y esa carpeta difieren, manda la carpeta. Configuración técnica del envío en `design/docs/newsletter.md`.

## Qué hay que diseñar

| # | Pieza | Cuándo la ve | Estado |
|---|---|---|---|
| 0 | Aviso en la web tras apuntarse | al pulsar «suscribirme» | hecho, es referencia |
| 1 | Correo de bienvenida (confirma el alta) | justo después, en su bandeja | **diseñar** |

Es **un solo correo**. Desde el 29-09-2026 no hay correo de confirmación con enlace que pulsar: el alta entra activa al instante y la bienvenida hace de confirmación.

Las entregas (`entrega-01.md` y siguientes) usan la misma plantilla que la bienvenida; no entran en este encargo, pero la plantilla tiene que servirles (titulares `###`, listas, un botón, filete de separación).

Envío: Buttondown, alta directa (sin doble opt-in). Buttondown añade al pie el enlace para darse de baja: el diseño deja sitio para él y no lo imita.

---

## 1 · Qué es entrelampistas

Un espacio de aprendizaje editorial en español: ensayos y herramientas para construir un pensamiento más autónomo y consciente. Web en `entrelampistas.com`.

**La palabra** (definición única de la marca; se copia tal cual)

> **entre·lam·pis·tas** · [ɛ̃tɾə·lamˈpistas] · sustantivo colectivo, adj. ocasional, verbo.
> 1. Nombre prestado del oficio de quienes cuidan, arreglan y mantienen los espacios donde vivimos.
> 2. Un trabajo silencioso y constante que ayuda a construir un pensamiento más autónomo y consciente.

**La cita de la autora**: «Entrelampistas es un espacio de aprendizaje editorial: ensayos y herramientas para construir un pensamiento más autónomo y consciente.»

**La idea de fondo · pensamiento de mantenimiento**

> 1. Práctica de revisar nuestras ideas, hábitos y entornos.
> 2. Reconocer que sabemos menos de lo que creemos, y que nuestra actitud e ideas tienen un impacto directo en el bien común.

- «Entrelampistas parte de una idea sencilla: lo que pensamos necesita trabajo. Revisarlo es una forma de cuidarnos y de cuidar lo que nos rodea.»
- «¿Cuándo revisaste por última vez lo que piensas?»
- «Queremos pensar con más pausa, más contexto y más conversación.»
- Por qué: «Cuidamos la forma en la que pensamos.» · Cómo: «Desarrollamos un hábito de mantenimiento.»

**Dos ejes**, marcados solo con una forma (nunca con color):

- ■ **Criterio** · Cómo decidimos qué merece atención, tiempo y confianza.
- ○ **Entornos** · Los lugares, físicos y digitales, que nos hacen y que podemos rehacer.

**Tres mapas y una herramienta** (un mapa = una pregunta, un recorrido de cinco paradas y un ensayo)

| Pieza | Pregunta | Eje | Ruta | Portada (en `assets/img/`) | Primera frase |
|---|---|---|---|---|---|
| Habitabilidad digital | ¿Qué tipo de entorno es internet? | ○ | `/habitabilidad` | `og-habitabilidad.jpg` · fachadas con árboles delante | Quizá lo más curioso de la tecnología no es su complejidad sino la facilidad con la que aceptamos vivir dentro de ella. |
| Criterio informativo | ¿Cómo te llega lo que sabes? | ■ | `/criterio` | `og-criterio.jpg` · copas de árbol y cables a luz natural | En el grupo alguien reenvía una captura de pantalla, un titular sin fecha, sin enlace y sin medio, en diez minutos hay tres opiniones en donde ninguna aporta un dato. |
| El mapa de tu mente | ¿Desde dónde decides? | ■ | `/decisiones` | `og-decisiones.jpg` · botánica de estudio sobre negro | La mayoría de nuestras decisiones ocurren antes de que nos demos cuenta. |
| Índice de habitabilidad digital | ¿Es habitable tu vida digital? | ○ | `/indice` | — | Diez preguntas, cinco dimensiones, unos tres minutos. Una medida del lugar, no de ti. |

**Cómo suena**: sereno, cercano, sin prisa. Habla de ideas grandes con palabras de conversación; no impresiona, acompaña; no instruye, invita. Sin exclamaciones, sin verbos de marketing («descubre», «no te pierdas», «únete ya»), sin emojis. La marca se escribe **entrelampistas**, en minúscula (en los textos de la autora puede abrir frase con mayúscula: se respeta).

---

## 2 · Los textos

Tal cual se pegan en Buttondown. `◆` = propuesta nuestra pendiente de validar por la autora; el resto son textos ya aprobados en la web.

### 0 · Aviso en la web (referencia)

Formulario (feed, sobre el proyecto, cierre de los ensayos):

- Título: **Únete**
- Línea: Te compartimos novedades y nuevos contenidos.
- Campo: `tu correo` · Botón: `suscribirme`

Estados, en el mismo sitio del formulario:

- Enviando: `···`
- Hecho: `gracias · te avisamos cuando haya pieza nueva` (mono, mayúsculas por estilo, en tinta con un cuadrado verde delante)
- Error: «no pudimos guardarlo, prueba otra vez» (aviso con filete izquierdo de tinta, nunca en rojo)
- Correo mal escrito: «escribe un correo completo, con arroba y punto»

### 1 · Bienvenida

- **De**: entrelampistas
- **Asunto**: Hola desde entrelampistas
- **Texto de previsualización** ◆: Ya estás en la lista. Qué es entrelampistas y por dónde empezar.

```
Hola:

Ya estás en la lista de entrelampistas. Te escribiremos cuando haya algo nuevo
que pensar: un mapa, una herramienta, una pregunta que merezca un rato.
Sin prisa y sin ruido.

── ENTRELAMPISTAS ─────────────────────────────
entre·lam·pis·tas · [ɛ̃tɾə·lamˈpistas] · sustantivo colectivo, adj. ocasional, verbo.
1  Nombre prestado del oficio de quienes cuidan, arreglan y mantienen
   los espacios donde vivimos.
2  Un trabajo silencioso y constante que ayuda a construir un pensamiento
   más autónomo y consciente.

Entrelampistas parte de una idea sencilla: lo que pensamos necesita trabajo.
Revisarlo es una forma de cuidarnos y de cuidar lo que nos rodea.

pensamiento de mantenimiento →                    ← enlace de texto

── TRES MAPAS ─────────────────────────────────
Si quieres empezar por algún sitio, cada mapa es una pregunta, un recorrido
de cinco paradas y un ensayo para leer con calma.

[foto]  Habitabilidad digital
        ¿Qué tipo de entorno es internet?
        Quizá lo más curioso de la tecnología no es su complejidad sino la
        facilidad con la que aceptamos vivir dentro de ella.
        ir al mapa →

[foto]  Criterio informativo
        ¿Cómo te llega lo que sabes?
        En el grupo alguien reenvía una captura de pantalla, un titular sin
        fecha, sin enlace y sin medio, en diez minutos hay tres opiniones en
        donde ninguna aporta un dato.
        ir al mapa →

[foto]  El mapa de tu mente
        ¿Desde dónde decides?
        La mayoría de nuestras decisiones ocurren antes de que nos demos cuenta.
        ir al mapa →

── UNA HERRAMIENTA ────────────────────────────
Índice de habitabilidad digital: diez preguntas, cinco dimensiones, unos tres
minutos. Una medida del lugar, no de ti.

[ calcular mi índice ]                            ← botón verde

───────────────────────────────────────────────
Puedes responder a este correo cuando quieras. Lo leemos.

Si no te apuntaste tú, date de baja con el enlace de abajo y no te
escribiremos más.                                  ← cuerpo secundario, pequeño

— entrelampistas
```

- «ir al mapa» es el texto del botón del feed; en el correo va como enlace de texto (mono) para que haya un solo botón principal por bloque. Todo el bloque del mapa (foto y título) enlaza al mapa.
- Enlaces: `https://www.entrelampistas.com/<ruta>?utm_source=newsletter&utm_medium=email&utm_campaign=bienvenida` (ya están en `content/newsletter/bienvenida.md`).
- Nuevo respecto a la versión del 26-09: la definición es la verbatim del feed (antes era una paráfrasis), entra pensamiento de mantenimiento, cada mapa lleva su primera frase y el índice su línea aprobada. Son textos ya publicados en la web; lo único nuestro son el saludo, «Ya estás en la lista de entrelampistas», la línea de «tres mapas», el cierre y la línea de baja (◆).
- La primera línea tiene que dejar claro en un vistazo que el alta está hecha: es lo que antes hacía el correo de confirmación.
- La línea «Si no te apuntaste tú…» es necesaria sin doble opt-in (alguien puede escribir una dirección ajena): discreta, pero legible, justo encima del enlace de baja de Buttondown.

---

## 3 · Dirección de arte

**Idea**: el correo es una página de la web en pequeño. Papel, tinta y un solo verde; mucho aire; filetes finos en lugar de cajas; tipografía grande y seca para títulos, mono pequeña en mayúsculas para lo que es meta. Nada que parezca publicidad: sin cabeceras de color, sin banners, sin iconos de redes, sin «ver en el navegador» destacado.

### Límites (los de la web, sin excepciones)

- Esquinas rectas (radio 0) y sin sombras, también en botones e imágenes.
- Sin degradados. Sin fondos de color salvo papel, tinta y el botón verde del índice.
- Filetes de 1 px en `#1A1A1A` para separar bloques. Nada de cajas redondeadas ni tarjetas con sombra.
- Solo dos familias: Archivo y Space Mono. Sin serifa. Sin cursiva.
- Contraste mínimo 4.5:1. Botones de 48 px de alto como mínimo, a todo el ancho de la columna en móvil.
- Todo el texto es texto real (nada de texto dentro de imágenes).

### Color

| Nombre (token) | Hex | Uso en el correo |
|---|---|---|
| papel `--papel` | `#F3F2EF` | fondo de la columna del correo |
| papel hundido `--papel-2` | `#E9E8E4` | fondo exterior a la columna (en escritorio) |
| tinta `--tinta` | `#111111` | texto, botón principal (fondo tinta, texto papel) |
| tinta 2 `--tinta-2` | `#3A3A3A` | cuerpo secundario (primera frase de cada mapa) |
| tinta 3 `--tinta-3` | `#6B6B6B` | meta: fonética, «— entrelampistas», pie |
| línea `--linea` | `#1A1A1A` | filetes de 1 px |
| acento `--acento` | `#2EBD5E` | **solo** el botón «calcular mi índice» (fondo verde, texto tinta) |

El verde es el color de lo propio del lector y de la acción de herramienta; por eso lo lleva el índice y nada más. Nunca texto verde sobre papel (se queda en ≈ 2:1), nunca verde decorativo, nunca en filetes. Los colores de las fotos (amarillos, rojos, verdes de follaje) no pasan a la interfaz.

### Tipografía

Los tamaños son los de la web en móvil. En el correo se piden como fuente web y, como Gmail y Outlook no la cargan, **el diseño tiene que aguantar con la de respaldo**: pruébalo también en Arial y Courier.

| Estilo | Familia · respaldo | px / interlínea / tracking / peso | Dónde |
|---|---|---|---|
| título de bloque | Archivo · Helvetica, Arial | 28 / 1.12 / -.015em / 800 | «entrelampistas», «Tres mapas», «Una herramienta» (o en mono como meta: ver estructura) |
| título de mapa | Archivo · Helvetica, Arial | 19 / 1.25 / 0 / 700 | «Habitabilidad digital» |
| pregunta del mapa | Archivo · Helvetica, Arial | 17 / 1.4 / 0 / 500 | «¿Qué tipo de entorno es internet?» |
| cuerpo | Archivo · Helvetica, Arial | 17 / 1.55 / 0 / 400 | saludo, párrafos |
| cuerpo secundario | Archivo · Helvetica, Arial | 15 / 1.5 / 0 / 400, `--tinta-2` | primera frase de cada mapa |
| meta | Space Mono · Courier New, monospace | 11 / 1.2 / .08em / 400, MAYÚSCULAS | etiquetas de bloque, «ir al mapa →», pie |
| botón | Space Mono · Courier New, monospace | 11–12 / 1 / .08em / 400, MAYÚSCULAS | «calcular mi índice» |
| fonética | Space Mono · Courier New, monospace | 11 / 1.4 / .04em / 400, `--tinta-3` | `[ɛ̃tɾə·lamˈpistas]` |

Las fuentes están en `assets/fonts/` (Archivo 400/500/700/800, Space Mono 400/700; licencia OFL). Títulos en bandera a la izquierda, nunca centrados ni justificados.

### Marca

- **Logo: la cara dibujada, negro y verde**, una sola versión. No se recolorea, no se invierte, no se recorta, no se anima, no se pone sobre foto.
- En el correo: arriba a la izquierda, **48 px de alto** (como en la cabecera de la web), sobre papel, enlazado a `entrelampistas.com`. Sin texto al lado: la cara es la marca.
- Archivo: exportar a PNG desde `assets/img/logo-cara.webp` **con el fondo papel `#F3F2EF` incrustado**, a 2× o 3× (96–144 px de alto). La placa de papel lo protege en los clientes con modo oscuro, que invierten los fondos pero no las imágenes; con fondo transparente, la tinta negra desaparecería sobre fondo oscuro. `icono-192.png` ya es la cara en placa de papel y sirve de referencia.
- En texto corrido, **entrelampistas** en minúscula; el dominio, `entrelampistas.com`.

### Imágenes

- **Garabatos** (dibujos de la autora; se usan como en la web, sin inventar otros):
  - Arriba, bajo el logo: `garabato-ondas-amarillo.webp`, el mismo del formulario «Únete», 90–110 px de alto, alineado a la izquierda. Es la única excepción de color (es ilustración) y hace de hilo entre el formulario y el correo.
  - `il-velas.webp` junto a la definición de entrelampistas (como en el feed) y, si cabe sin alargar demasiado, `garabato-bosque-tinta.webp` centrado antes del cierre (como en /proyecto).
  - Exportar a PNG con fondo papel incrustado (son tinta sobre transparente: mismo problema de modo oscuro que el logo).
- **Fotos de los mapas**: una por mapa, la portada de cada tema, que es siempre la misma en feed, mapa, ensayo e imagen de enlace. Usar los recortes `og-<tema>.jpg` (1200×630): a 480 px de ancho ocupan 252 px de alto y el correo no se hace eterno. A todo lo ancho de la columna, sin marco, sin esquinas redondeadas, `alt=""` (el título va justo debajo).
- ◆ **Texto sobre foto**: en la web toda foto de los mapas lleva el título dentro, con velo medido. En el correo proponemos **título debajo de la foto, no encima**: la mayoría de clientes no garantiza texto sobre imagen de fondo y, con las imágenes bloqueadas, el título desaparecería. Es una excepción a la regla de fotos del 26-09 y la tiene que aprobar la autora.

### Estructura y medidas

- Columna de **480 px** (la misma de la web en escritorio) centrada sobre `--papel-2`; en móvil, a todo el ancho con **16 px** de margen lateral.
- Ritmo vertical de 8 en 8: 16 entre párrafos, 32 entre bloques, 48 antes y después de cada filete de sección.
- Cada bloque abre con un filete de 1 px a todo lo ancho de la columna y una etiqueta mono en mayúsculas (`ENTRELAMPISTAS`, `TRES MAPAS`, `UNA HERRAMIENTA`); el título grande queda para lo que se nombra (la palabra, cada mapa).
- La definición se compone como en el feed: la palabra grande, la fonética en mono gris y las dos acepciones numeradas con el número en mono.
- Delante del título de cada mapa puede ir su forma de eje (■ o ○, 10 px, tinta). Nunca color por eje.
- Botón principal: fondo tinta, texto papel, mono mayúsculas, 48 px de alto, ancho completo en móvil. Botón del índice: fondo `--acento`, texto tinta. Enlaces de texto: tinta, subrayado de 1 px o flecha `→`, nunca azul.
- Pie: filete, «— entrelampistas» ya va en el texto; debajo, en mono `--tinta-3`, `entrelampistas.com` y el enlace de baja que pone Buttondown.

**Bienvenida** (de la presentación a la acción):

```
[logo 48]
[garabato ondas]
Hola: / Ya estás en la lista de entrelampistas…
─── ENTRELAMPISTAS ───
[il-velas]  entrelampistas  [fonética]
            1 … / 2 …
Entrelampistas parte de una idea sencilla…
PENSAMIENTO DE MANTENIMIENTO →
─── TRES MAPAS ───
Si quieres empezar por algún sitio…
[foto 480×252] ○ Habitabilidad digital / pregunta / frase / IR AL MAPA →
[foto 480×252] ■ Criterio informativo  / pregunta / frase / IR AL MAPA →
[foto 480×252] ■ El mapa de tu mente   / pregunta / frase / IR AL MAPA →
─── UNA HERRAMIENTA ───
Índice de habitabilidad digital: …
[▓▓▓▓▓▓ CALCULAR MI ÍNDICE ▓▓▓▓▓▓]   verde, 48, ancho completo
[garabato bosque, opcional]
───────────────
Puedes responder a este correo…
Si no te apuntaste tú, date de baja…   (secundario)
— entrelampistas
ENTRELAMPISTAS.COM · baja (Buttondown)
```

### Detalles técnicos que condicionan el diseño

- HTML de correo: maquetado con tablas y CSS en línea, `lang="es"`, `<meta name="color-scheme" content="light">`. Nada de fondos de imagen para contenido.
- Modo oscuro: pedimos esquema claro, pero Gmail y Outlook en móvil pueden invertir colores. Por eso logo y garabatos llevan el papel incrustado y ningún texto depende de una imagen.
- Con imágenes bloqueadas el correo tiene que leerse entero: títulos, preguntas y botones son texto.
- Buttondown: el correo no lleva variables obligatorias (ya no hay enlace de confirmación); el enlace de baja lo añade Buttondown al pie. ◆ Cómo se sube la plantilla (HTML propio o CSS sobre su plantilla) depende del plan contratado: comprobarlo antes de maquetar.

### Qué entregar

1. El correo a 390 px (móvil) y a 480 px de columna sobre fondo de escritorio.
2. Especificaciones (tamaños, espacios, colores por token) sobre las pantallas.
3. Si cambias algún asset, expórtalo igual que los del paquete (PNG 2× con fondo papel; fotos 960×504 JPG q80 sin metadatos).
4. Si se puede, el HTML del correo probado en Gmail (web y app), Apple Mail (iOS y macOS) y Outlook.

---

## Paquete para quien diseña

Se entrega como carpeta `entrelampistas-correo-bienvenida` (zip):

- `01-encargo.md` · este documento. `02-texto-bienvenida.md` · el texto tal cual se pega en Buttondown.
- `assets/` · ya exportados, con el papel `#F3F2EF` incrustado: `logo-cara-papel-48@2x.png` y `@3x`, `garabato-ondas-papel-110@2x.png`, `il-velas-papel-120@2x.png`, `garabato-bosque-papel-200@2x.png`; y las tres portadas a 960×504 (`foto-<mapa>-480x252@2x.jpg`, JPG q80 sin metadatos).
- `fuentes/` · Archivo 400/500/700/800 y Space Mono 400/700 en woff2 (las de la web). Para diseñar en Figma u otra app, instalar Archivo y Space Mono desde Google Fonts (licencia OFL).
- `referencia/` · capturas de la web a 390 px: formulario «Únete» antes y después de apuntarse, las dos definiciones, las tres tarjetas de mapa, el índice y la vista previa del texto de la bienvenida (`/correo/bienvenida`).

## ◆ Pendiente de la autora

- Validar la bienvenida (ahora también confirma el alta), su texto de previsualización y la línea de baja.
- Aprobar la excepción de las fotos sin texto encima en el correo.
- Dirección de reply-to (la bienvenida dice «responde a este correo, lo leemos»).
- La entrega 01 repite la lista de mapas con la primera frase que ahora lleva la bienvenida: decidir si la entrega la mantiene o se queda con la farola, el índice y la pregunta de la semana.
- La definición de entrelampistas vive en `src/partials/definicion-entrelampistas.html`; si cambia, hay que cambiarla también en `content/newsletter/bienvenida.md`.
