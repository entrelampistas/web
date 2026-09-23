# entrelampistas · UI guardrails

v3.0 · 21-09-2026. Cambios v3 (iteración 2): dos ensayos nuevos, *El mapa de nuestras decisiones* y *Criterio informativo*; pantalla **Tema** (T0) como puerta única desde el feed y desde Mapas en los tres ensayos, con tres salidas: tesis, mapa, ensayo completo; foto de la autora a todo lo ancho, proporción natural, sin recorte ni velo (la portada es la única con card/cover de producción); dato del texto destacado como número grande sin alterar el párrafo; sin garabatos en los ensayos nuevos hasta recibir los definitivos; los colores de las fotos (amarillo, rojo) no habilitan esos colores en UI. Texto de la autora siempre verbatim. La propuesta *Mapa de la mente lab B* queda como exploración; nada de ella migra.

v2.0 · 20-09-2026. Cambios v2: cabecera 56 en todas las pantallas móviles; un solo componente de correo (caja con ondas); bitácora deshabilitada «pronto»; cursiva permitida solo en la cita de la autora (proyecto); escritorio aplazado a la fase 2. Fuente única para decisiones de UI. Sustituye la capa visual de `entrelampistas-design-system-v8(1).md` y de `CLAUDE.md`. Ante conflicto con `styles/tokens.css`, manda este documento.

Mocks canónicos (móvil 390): `Feed de inicio v4`, `Mapas`, `Entrelampistas proyecto final`, `Pensamiento de mantenimiento`, `Habitabilidad recorrido final`, `Indice habitabilidad produccion`, `Mapa de nuestras decisiones recorrido A v2`, `Criterio recorrido`. Cualquier otro archivo del proyecto es exploración y no manda.

---

## 1. Límites duros

- `border-radius: 0` y `box-shadow: none` en todo.
- Un solo acento: `#2EBD5E`. Prohibidos naranja, azul, rojo, ámbar, klein, mostaza en UI.
- Máximo dos fondos por pantalla: papel y tinta.
- Tipografías: Archivo (display, cuerpo) y Space Mono (meta, números, botones). Sin serifa. Cursiva prohibida salvo una excepción documentada: la cita de la autora en la pantalla del proyecto.
- Ejes por forma (■ □ ○), nunca por color.
- Verde solo para lo propio del lector (leído, en curso, 2/5, respondida) y para la acción de herramienta (comenzar, ver resultado).
- Fotografía dentro del margen, nunca a sangre. Único degradado permitido: velo de tinta sobre foto.
- Botones y áreas táctiles ≥ 44px.
- Contraste texto ≥ 4.5:1 (`#6B6B6B` sobre papel es el mínimo).
- Sin modo oscuro. Sin `transition: all`. Solo `opacity`/`transform`, con `prefers-reduced-motion`.

---

## 2. Tokens (`styles/tokens.css`)

```css
:root {
  --papel: #F3F2EF;      /* fondo */
  --papel-2: #E9E8E4;    /* hundido, hover de fila */
  --tinta: #111111;      /* texto, fondo inverso, botón avanzar */
  --tinta-2: #3A3A3A;    /* cuerpo secundario */
  --tinta-3: #6B6B6B;    /* meta, estados neutros */
  --linea: #1A1A1A;      /* filete 1px */
  --gris-pista: #E1E0DB; /* pista de barras */
  --gris-paso: #C9C8C3;  /* segmento pendiente */
  --acento: #2EBD5E;

  --font-display: 'Archivo', sans-serif;   /* 400 500 700 800 */
  --font-mono: 'Space Mono', monospace;    /* 400 700 */

  --dur-fast: 120ms; --dur-normal: 200ms; --dur-slow: 350ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

Sobre tinta: texto `--papel`; secundario `opacity: .7`; opciones no elegidas `opacity: .5`.

### Tipografía

| Estilo | Fam. | px / lh / tracking / peso | Uso |
|---|---|---|---|
| display-xl | Archivo | 52 / .98 / -.03em / 800 | tema y concepto, escritorio |
| display-l | Archivo | 44 / .98 / -.03em / 800 | título de sección, escritorio |
| display-m | Archivo | 36 / 1 / -.025em / 800 | título de pantalla móvil, portada sobre foto |
| display-s | Archivo | 28 / 1.12 / -.015em / 800 | pregunta del Índice |
| titulo-l | Archivo | 22 / 1.25 / 0 / 700 | título de pieza, escritorio |
| titulo | Archivo | 19 / 1.25 / 0 / 700 | título de pieza móvil, definición en caja |
| titulo-s | Archivo | 17 / 1.15 / -.01em / 800 | celda de mapa |
| lectura | Archivo | 17 / 1.55 / 0 / 400 | ensayo móvil |
| lectura-xl | Archivo | 19 / 1.55 / 0 / 400 | ensayo escritorio, máx. 620px |
| cuerpo | Archivo | 15 / 1.5 / 0 / 400 | descripciones, opciones, chips |
| cita | Archivo | 24 / 1.15 / -.01em / 800 | pullquote |
| mono | Space Mono | 11 / 1.2 / .08em / 400 · MAYÚS | meta, nav, botones, estados |
| mono-num | Space Mono | 12 / 1.2 / 0 / 400 | puntuaciones, conteos |
| mono-fon | Space Mono | 11 / 1.4 / .04em / 400 | fonética, notas |

Títulos `text-wrap: balance`, cuerpo `text-wrap: pretty`.

### Espacio y filetes

- Escala 4px: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64.
- Margen: 16 móvil · 64 escritorio. Escritorio 12 col, canal 32; repartos 3|9 o 4|8.
- Filete estructural: 1px `--linea`. 2px `--acento` solo en pestaña activa y progreso de lectura. Fila actual: 2px tinta a la izquierda + 700.
- Breakpoints: `<768` móvil · `768–1023` móvil con margen 24 · `≥1024` escritorio.

---

## 3. Formas de eje

10×10, trazo 1.5, `currentColor` (tinta; `--tinta-3` si próximo; papel sobre tinta).

| Eje | Forma | SVG |
|---|---|---|
| criterio (antes ideas) | ■ | `<rect width="10" height="10"/>` |
| entornos | ○ | `<circle cx="5" cy="5" r="4.25" fill="none" stroke-width="1.5"/>` |

Dos ejes desde 19-09-2026: criterio y entornos. □ (hábitos) queda reservado; no reasignar. Garabatos de color (ondas amarillas, ocoo rojo) solo como ilustración, nunca en UI; un garabato por pantalla.

---

## 4. Componentes

**Cabecera de sitio** · Móvil 56: logo 28 izq., buscar 44×44 der. Escritorio 64, `grid 1fr auto 1fr`, padding 0 64: logo 32 · `inicio / mapas / bitácora` mono gap 32, activa filete inf. 2px acento · campo «buscar ⌘K» 240×36 filete inf. 1px `--tinta-3`. Dentro de sección, izq.: `‹ mapas · entornos` mono `--tinta-3`.

**Cabecera de pieza** · 56 (unificada con la de sitio en v2), filete inf., padding 0 4. Izq.: 44×44 `‹` o `×` + ruta mono. Der.: acciones 44×44 (lámpara = tema, cuadrado = guardar) o meta mono `--tinta-3` (`02 · 2 min`, `04 / 12`) padding-right 12. En lectura: barra 2px acento en `bottom:-1px`, ancho = % leído. En herramienta el `×` dice «salir · se guarda lo respondido».

**Barra de pestañas (móvil, solo raíz)** · 84, fondo papel, filete sup., `padding-bottom 20`, 3 col. inicio (cuadrado hueco 22) · mapas (4 cuadrados 6×6) · bitácora (círculo). Etiqueta mono 10. Activa: icono relleno acento + etiqueta tinta. Inactiva: trazo tinta + `--tinta-3`. Bitácora fuera de alcance en fase 1: columna al `opacity .35`, etiqueta «bitácora · pronto», sin acción (`aria-disabled`).

**Botones** · mono, alto 40 inline / 44 estándar / 48 CTA ancho completo / 52 escritorio.
- Acento: fondo acento, texto tinta → acción de herramienta.
- Tinta: fondo tinta, texto papel → avanzar, leer, continuar, guardar.
- Hueco: filete 1px, texto tinta → compartir, repetir, invitar.
- Texto: mono sin caja → anterior, saltar esta, ver glosario ›.
- Sobre tinta: filete y texto papel.
- Estados: hover `--papel-2` (hueco) / `opacity .88` (llenos) · pressed inversión · focus contorno 2px tinta con 2px de separación · disabled `--gris-paso` · loading etiqueta `···`.

**Fila de lista** · Filete sup. en contenedor, inf. en cada fila. `grid 1fr auto` móvil / `140px 1fr auto` escritorio (tipo · título+línea · estado/acción). Izq. opcional: folio mono o forma de eje, 20–24. Título `titulo`, línea `cuerpo` `--tinta-2`, meta mono `--tinta-3`. Der.: estado mono acento o botón 40. Hover escritorio `--papel-2`.

**Celda de mapa** · Retícula 2 col con filetes compartidos (contenedor `border-top+left`, celda `border-right+bottom`). Min-h 132, padding 14 12. Forma arriba-izq., estado mono arriba-der. (`en curso`/`leído` acento, `próximo` `--tinta-3`), título `titulo-s`, meta mono 10. Celda actual: fondo tinta. Próxima: todo `--tinta-3`.

**Pestañas de filtro** · Fila mono con forma, alto 32, gap 20. Activa: filete inf. 2px acento. En escritorio apiladas en columna izq., alto 28, `width: fit-content`.

**Chip de concepto** · 36 móvil / 40 escritorio, padding 0 12–14, filete 1px, `cuerpo` sin mayúsculas. Sin color, sin forma, sin icono. Abre ficha.

**Term (ensayo)** · Subrayado 1px offset 3. Al tocar despliega bajo el párrafo: filetes arriba/abajo, nombre 700 15 + `autor · año` mono der., definición `cuerpo` `--tinta-2`, «Ver en conceptos ›». Uno abierto a la vez.

**Ficha de concepto** · Título display, fuente mono der., fonética `mono-fon`, definición en caja con filete (`titulo` 500, padding 16/24), nota `cuerpo` 17 `--tinta-2`, «aparece en» (filas con forma + tipo), «cerca» (chips), `‹ anterior · siguiente ›` mono al pie.

**Pullquote** · Marca 32×2 acento, `cita`, filetes arriba/abajo, padding 32 16. Máx. una por sección.

**Bloque de pregunta (Índice)** · Fondo tinta, padding 24 20, margen 16, `flex:1`. Cabecera mono `.7` (`eje 02 · exposición` · `1 de 3`), pregunta `display-s`, ayuda `cuerpo` `.75`. Opciones al fondo: 4 × 52 (56 escritorio), filete papel, texto 15, letra `a–d` mono der. «No lo sé» siempre presente. Elegida: fondo acento, texto tinta, check; resto `.5`. Fuera del bloque: `‹ anterior` y `saltar esta` mono, alto 44. Escritorio: teclas `a–d`, `←` `→`, `s`.

**Pasos** · 12 segmentos 3px, gap 3, padding 12 16. Respondida acento · actual tinta · pendiente `--gris-paso`.

**Barra de eje (resultado)** · `grid 110px 1fr 36px` móvil / `140px 1fr 48px`. Nombre mono, pista 12 (16) `--gris-pista`, valor `mono-num`. Relleno: ≥66 acento · ≤40 tinta · 41–65 `--tinta-3` · pregunta sin responder: trama `repeating-linear-gradient(135deg,#111 0 2px,transparent 2px 5px)` + asterisco. ◆ umbrales a validar.

**Hoja / diálogo** · Velo `rgba(17,17,17,.5)`, fondo a `opacity .35`. Móvil: hoja desde abajo, cabecera 48 con `×` der. Escritorio: diálogo 880 centrado, filete 1px, cabecera 56. `Esc` cierra, foco atrapado.

**Tarjeta compartible** · 4:5, fondo tinta, logo invertido, cifra o cita display, barras si Índice, pie con dominio mono. PNG 1080×1350. Nunca respuestas ni identidad. Sobre tinta los estados se invierten: capturada = papel, precaria = `#8A8A86`, habitable = verde.

**Estados del Índice** · habitable verde `#2EBD5E` · precaria `--tinta-3` · capturada tinta. Solo dentro del resultado (es dato de la lectora). Estructura es condición: misma fila, barra y filete discontinuos (`1px dashed`), fuera del número. Sin forma propia: las formas ■ □ ○ son de los ejes editoriales, no de las dimensiones.

**Foto con velo** · **Único patrón de imagen con texto en todo el sitio** (`.foto`, 23-09-2026). 4:5 por defecto (`--4x3` en T0 y Pensamiento, `--corta` 16:9 en Índice, `--natural` sin recorte en E2–E6). Velo `--velo-foto`: transparente en el 40% superior y solo oscurece la banda del texto (`0 → .3 al 65% → .6 al 100%`); texto con `--sombra-texto-foto`. Dentro, abajo-izquierda y siempre en este orden: folio mono con filete inf. papel (solo si aplica: `01`, `pregunta 1 de 10`), título `display-m` (30 en fotos de sección), subtítulo 16/1.4/500 (pregunta, frase o línea de tesis). Máx. una por pantalla. Las fotos sin texto (pausa, apuntes de Pensamiento) van sin velo. `scripts/check.mjs` falla ante cualquier otro velo o degradado fuera de `tokens.css`.

**Correo (único, todas las pantallas)** · Caja con filete 1px sobre papel, padding 20 20 24, margen 16 (40 arriba). Dentro, en columna con gap 16: ilustración `garabato-ondas-amarillo.png` (alto 90–110, `object-fit: contain`, alineada a la izquierda; única excepción de color fuera del acento, es ilustración), título «Únete» 26/1.02/800, línea «Te compartimos novedades y nuevos contenidos.» `cuerpo` `--tinta-2`, campo 48 filete tinta placeholder «tu correo», botón Tinta 48 «suscribirme» ancho completo. Estados: enviando etiqueta `···`; éxito sustituye campo+botón por «gracias · te avisamos cuando haya pieza nueva» mono acento; error aviso con filete izq. 2px tinta «no pudimos guardarlo, prueba otra vez» (nunca rojo).

**Compartir** · Botón hueco 48 con icono 14 (flecha arriba + bandeja, trazo 1.5) en cierre de ensayo y resultado del Índice; sobre tinta (cierre del mapa) como botón de texto `.7`. Abre la hoja con la tarjeta compartible.

**Buscador ⌘K** · Hoja/diálogo, campo 56 con filete inf., `lectura`. Resultados en filas agrupadas por tipo con forma de eje. Vacío: «nada con ese nombre» `cuerpo` `--tinta-3`. Atajo global `⌘K`/`Ctrl K`.

**Estados** · Vacío: `titulo` centrado + línea mono, sin ilustración. Skeleton: bloques `--gris-pista` sin animación. Aviso: filete izq. 2px tinta, `cuerpo`; nunca rojo. Guardado: mono acento inline.

### 4b. Componentes añadidos en iteración 2 (21-09-2026)

Implementar con los tokens de §2 sin añadir ninguno. Referencia: mocks `Criterio recorrido` y `Mapa de nuestras decisiones recorrido A v2`.

**Portada de tema (T0 / E1)** · Componente «Foto con velo» a todo lo ancho (sin margen), `4/3` en T0; 4:5 en E1 y en la tarjeta del feed (la tesis desplegada necesita esa altura). Dentro: título `display-m` + subtítulo (la pregunta del tema: «Criterio informativo» / «¿cómo te llega lo que sabes?»). Sin meta de eje ni tiempos (regla de tanda 1), sin garabato. 23-09-2026: el subtítulo ya no se repite fuera de la foto.

**Foto de ensayo (E2–E6)** · Componente «Foto con velo» en variante `--natural` (proporción del archivo, sin recorte). Dentro: folio mono `01` con filete y el título de la sección (30/1.05/800). 23-09-2026: sustituye al folio 96 sin velo y al título fuera de la foto. La foto de pausa (antes de las preguntas de cierre) va sin velo, sin folio y sin texto.

**Cifra grande** · Un dato que ya está en el párrafo, nunca contenido adicional. Archivo 56/0.95/-0.03em/800 tinta; debajo, línea mono `--tinta-3` con la unidad o el sujeto (`horas al día`, `de las noticias`). En retícula de dos: `grid 1fr 1fr`, contenedor `border-top`, celdas `border-bottom` y la izquierda `border-right`, padding 16 12. Una sola cifra: alineada a la izquierda dentro del margen, filetes arriba/abajo, padding 20 0. Máx. una retícula por sección.

**Acordeón FAQ (E7)** · Etiqueta mono `--tinta-3` «Preguntas frecuentes». Lista con `border-top`; cada fila `border-bottom`, `grid 1fr 44px`, min-h 48, pregunta 15/1.3/700, marca `+` / `−` mono 16 en la columna derecha. Respuesta `cuerpo` `--tinta-2`, padding 0 0 16, `text-wrap: pretty`. Uno abierto a la vez; `aria-expanded` en la fila; sin animación de altura (solo opacity con `prefers-reduced-motion`).

**Retícula de las cuatro preguntas + guardar** · Retícula 2×2 con filetes compartidos (misma construcción que «Celda de mapa»), min-h 150, padding 16 12: folio mono `--tinta-3` arriba, pregunta `titulo-s`. Debajo, botón hueco 48 ancho completo con icono guardar (cuadrado 14, trazo 1.5) «guardar las cuatro preguntas». Abre la hoja con una **tarjeta compartible** 4:5 fondo tinta: logo invertido, etiqueta mono `.7` (`■ criterio · las cuatro preguntas`), las cuatro preguntas en columna 22/1.15/800 papel con filetes papel `.3` entre ellas, pie mono con dominio. PNG 1080×1350 por canvas, como el Índice.

**Correo compacto (cierre de ensayo)** · Variante del «Correo» sin ilustración, para cierres de ensayo donde ya hay foto en la pantalla: caja con filete, padding 20, título «Únete» 26/1.02/800, línea `cuerpo` `--tinta-2`, y una fila `grid 1fr auto gap 8`: campo 48 + botón Tinta 48 «suscribirme». Mismos estados que el Correo completo. El Correo completo (con garabato) se mantiene en el feed y en Sobre el proyecto; en los temas nuevos no hay garabatos hasta recibir los definitivos.

**Fila de T0** · Tres filas de lista (tesis · mapa · ensayo) con folio mono y título `titulo`; en «ensayo» la meta derecha muestra `n / 5` mono acento leído de localStorage (0 / 5 si no hay lectura). Debajo, resumen de la autora `lectura` `--tinta-2` (◆ pendiente en Habitabilidad).

**Parada de mapa (T2)** · Lista de 5 filas (folio · título · `›`). Al tocar, despliega bajo la fila las primeras líneas de la sección (`cuerpo` `--tinta-2`, 3 líneas máx., `line-clamp`) y botón de texto «ir a la sección ›» que salta al anchor. Una abierta a la vez.

---

## 5. Patrones de pantalla

Móvil 390: cabecera (56 sitio / 48 pieza) → título `display-m` + descripción (padding 24 16 0) → bloques a 24px con filetes → 100px de aire al final si hay barra de pestañas.

Escritorio 1280: cabecera 64 → grid 12 col, margen 64, canal 32 → izq. (3–4 col): título, descripción, filtros o «se relaciona con», filete der. → der. (8–9 col): filas, matriz, ficha. Lectura de ensayo: columna única 620px, número de sección `sticky` desde 900px.

---

## 6. Copy de interfaz

Frases en minúscula (`comenzar`, `leer`, `saltar esta`); meta en mono mayúsculas. Sin exclamaciones ni verbos de marketing. Estados descriptivos (`sostiene / captura`), nunca valorativos. Textos desde `content/`, nunca hardcodeados.

---

## 7. Migración de la web actual

1. `tokens.css` → §2. Eliminar klein, rojo, paletas de marca (vermellón…índigo), Space Grotesk, Newsreader, `--radius-*`.
2. `.btn-primary` → Tinta · `.btn-secondary` → Hueco.
3. Definición y newsletter-cta: filete 1px completo, sin tinte ni radio.
4. Cabecera y footer: papel con filete / tinta con papel; acento solo en el pulso.
5. SVG de ensayos: tinta + un único elemento acento.
6. Verificar: `grep -rn "1A3499\|C0321A\|Space Grotesk\|border-radius\|box-shadow" styles/ *.html` → 0 fuera de `archive/`.

---

## 8. ◆ A validar

- Nombres de las cuatro preguntas: el ensayo (sección 03) dice `Atención · Calidad · Agencia · Relación`; el Índice usa `Atención · Agencia · Relación · Valor`. Implementar el Índice como está en el mock; el texto del ensayo es verbatim de la autora. Pendiente de alinear.
- Umbrales del Índice: ver reglas de cálculo en `mapa-pantallas.md` §Índice.
- Forma para un tercer eje futuro (□ reservado).
Marcar en código con `// ◆`.

---

## 9. Checklist por commit

- [ ] Sin `border-radius` ni `box-shadow`.
- [ ] Solo colores de §2; verde solo en lo propio o acción de herramienta.
- [ ] Solo Archivo y Space Mono, sin cursiva.
- [ ] Filetes 1px; 2px solo pestaña activa y progreso.
- [ ] Eje por forma.
- [ ] Botones y táctiles ≥ 44. Contraste ≥ 4.5:1.
- [ ] Máx. dos fondos y una foto por pantalla.
- [ ] Sin overflow a 375px. `prefers-reduced-motion`.
