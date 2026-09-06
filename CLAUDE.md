# Entrelampistas

Plataforma editorial de pensamiento estructural. Astro, salida estatica, Vercel.

La identidad tiene **dos registros en tension** y el interes esta en el choque:

- **La reticula.** Suizo/Bauhaus. Grotesca pesada, mono en versalitas, filetes de
  1px, bloques de color plano, radio cero, alineacion dura. El rigor.
- **El garabato.** Trazos a mano, gestuales, fuera de reticula. Lo humano que
  habita la estructura. Es lo unico del sistema que puede salirse de la caja.

Romper la reticula en cualquier otro sitio destruye el contraste del que vive
todo el diseno.

## Antes de escribir codigo

1. Lee `styles/tokens.css` — variables CSS. Usa SOLO estas. Ni un hex suelto.
2. Abre `/estilo` con `npm run dev`: es la guia visual viva. Paleta con ratios
   de contraste calculados, escala tipografica, los cinco roles del garabato,
   variantes de tarjeta y controles. Si dudas de un valor, esta ahi.
3. Copia los patrones de `src/components/`. Estan hechos con el craft aplicado.

## Antes de escribir texto

Lee `.claude/skills/editorial-voice/SKILL.md`.

## Reglas (romper cualquiera es un error)

**Tipografia**

- Inter Tight para display y cuerpo. IBM Plex Mono para etiquetas, metadatos,
  numeracion y botones. Nada mas. Sin serif, sin italic.
- La mono va en versalitas con tracking abierto (`.mono`), nunca para lectura.
- El rango entre display y mono es amplio a proposito. Estrecharlo lo vuelve
  generico: el contraste de escala es lo que hace suizo a un suizo.

**Color**

- Solo variables de `tokens.css`. `color: blue` es un error.
- **Dos verdes, y no son intercambiables.** `--verde` (#20B65C) para bloques,
  marcadores y todo lo que va sobre `--ink`. `--verde-texto` (#0F7A3D) para
  texto verde sobre papel. El primero da 2.4:1 sobre papel: como titular no se
  lee. Lo mismo con `--rojo` y `--rojo-texto`.
- `--ambar` (1.4:1) es **solo trazo decorativo**. Nunca texto, nunca borde de
  foco, nunca estado.
- `--ink-light` es para separadores y filetes. Nunca texto, ni siquiera
  atenuado: un modulo no publicado sigue siendo informacion que hay que leer.
- `--azur` es el color del logotipo y esta exento de contraste. No lo uses para
  nada mas.

**Garabatos**

- Uno por viewport, maximo. Repetidos pierden toda la fuerza.
- Cada marca tiene un rol asignado en `src/lib/garabatos.ts` y no se usa fuera
  de el: indice, subrayado, firma, cierre, vacio.
- Un solo acento por marca. Nunca dos colores en el mismo trazo.
- Se dibujan con un barrido de `clip-path` al entrar en pantalla, una sola vez.
  Son rutas rellenas, no contornos: `stroke-dashoffset` no sirve aqui.

**Movimiento**

- Solo variables de timing/easing. `transition: all 0.3s ease` es un error.
- Todo hover tiene transicion. Un cambio brusco es un error.
- `:active` de botones siempre con `transform: scale(0.98)`.
- Lift de tarjeta maximo `translateY(-2px)`.
- Nunca animes `width`, `height`, `margin`, `padding`, `top` ni `left`.

**Enlaces**

- El subrayado cambia de COLOR en hover. Nunca desaparece.
- Un enlace que envuelve un bloque entero lleva `.bloque` (sin subrayado; el
  estado lo comunica la tarjeta).

## Trampas del stack

Cosas que ya han costado tiempo. No las redescubras:

- **Los estilos con scope no llegan a los componentes hijos.** La clase que
  pasas viaja, el `data-astro-cid` no. Ancla en un ancestro del propio template
  y envuelve el resto en `:global(...)`, incluidos los descendientes:
  `:global(.marca svg)`, no `:global(.marca) svg`.
- **`[hidden]` no gana a un `display` de autor.** Por eso `base.css` lleva
  `[hidden] { display: none !important }`. Si ocultas algo con JS, cuenta con
  ello.
- **El HTML que inyecta el JS no lleva el scope.** Los resultados de busqueda se
  estilan desde `.resultados :global(...)`.
- **Una fila implicita de grid se dimensiona por su contenido**, asi que un
  `height: 100%` en el hijo no tiene contra que resolver. Para encajar algo en
  una caja de altura fija, usa flex.
- **`opacity: 0` sigue ocupando sitio** y provoca scroll horizontal. Para lo que
  no debe medir, `visibility: hidden`.
- **zod se importa de `zod/v4`**, que es la version que usa Astro por dentro.
  Con la v3 la validacion de colecciones revienta.

## Estructura

```
styles/tokens.css        ← Variables. La fuente de verdad
styles/fonts.css         ← Generado por scripts/fetch-fonts.mjs. No editar
styles/base.css          ← Reset, tipografia, accesibilidad, reticula
src/content.config.ts    ← Esquemas de contenido (zod)
src/lib/feed.ts          ← Construccion y orden del feed
src/lib/garabatos.ts     ← Catalogo de marcas y sus roles
src/components/          ← Componentes
src/pages/estilo.astro   ← Guia visual viva. No indexada
src/content/temas/       ← Un tema por carpeta: index.md + ensayo.md + conceptos.yaml
src/content/piezas/      ← Piezas sueltas del feed
brand_assets/garabatos/  ← PNG originales de las marcas
src/assets/garabatos/    ← SVG trazados. Generados, commiteados
archive/legacy/          ← La landing anterior. No entra al build
```

## Contenido

- Un **Tema** es la unidad: agrupa modulos (Ensayo y Conceptos hoy;
  Referencias, Mapa y Herramientas estan modelados pero no construidos).
- Una **Pieza** vive por si sola en el feed: `habito`, `nota` o `manifiesto`.
- **Solo puede haber una pieza con `fijada: true`.** Abre el feed siempre, al
  margen de su fecha. El build falla si hay dos.
- `variante` (`fijada` / `destacada` / `estandar`) da la cadencia del scroll.
  Si todo pesa igual, el feed es una pila.
- El indice de modulos de un tema muestra apagados los que no existen. No
  prometas lo que no hay.

## Comandos

```
npm run dev              # http://localhost:4321
npm run build
npm run check            # astro check. Debe salir en 0 errores
npm run shot             # capturas en 390/834/1440 → capturas/
npm run shot -- /estilo/ # una ruta concreta
npm run fetch-fonts      # redescarga y autoaloja las fuentes
npm run trace-garabatos  # revectoriza brand_assets/garabatos/*.png
```

## Verificacion despues de cada cambio visual

1. `npm run shot` y mira las tres anchuras. El escritorio no puede ser el movil
   estirado: a partir de 1100px hay reticula de 12 columnas.
2. Contraste: ningun texto por debajo de 4.5:1 (3:1 en display ≥24px).
3. Craft: hover con transicion, `:focus-visible` visible, `:active` con
   `scale(0.98)`, sin animar propiedades de layout.
4. Desactiva JavaScript. Feed, temas y ensayos deben leerse enteros. Solo
   busqueda y compartir pueden degradar.
5. Recorre la pagina con Tab de principio a fin.

## Accesibilidad (obligatorio)

- `:focus-visible` en todo lo interactivo (ya esta en `base.css`).
- Sobre fondo oscuro, el contenedor lleva `.sobre-ink` para que el foco use el
  verde de senal.
- `@media (prefers-reduced-motion)` (ya esta en `base.css`).
- HTML semantico: `<article>`, `<nav>`, `<main>`, `<section aria-label="">`,
  `<header>`, `<footer>`. Los modulos de un tema son `<details>` nativos.
- Alt text en imagenes. Los garabatos son decorativos y van `aria-hidden`.

## Fase 2 (todavia no)

Perfil de usuario, guardados, y los modulos Referencias / Mapa / Herramientas.
El esquema de contenido y el indice de modulos ya los contemplan: sera sumar,
no migrar. **No hay boton de guardar**: no se implementa ni se deja desactivado.
