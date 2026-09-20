# Handoff: entrelampistas · fase 1 móvil

## Qué es
Web editorial de entrelampistas. Fase 1: seis rutas en móvil (390 de referencia, fluido de 320 a 1023). Inicio, mapas, proyecto, pensamiento de mantenimiento, el tema Habitabilidad digital (tesis, mapa, ensayo) y la herramienta Índice de habitabilidad digital. Escritorio queda para la fase 2.

## Sobre los archivos de diseño
Los `.dc.html` de `mocks/` son **referencias de diseño hechas en HTML**, no código de producción. Hay que **recrearlos en el repo `entrelampistas/web`** con sus patrones (HTML estático + `styles/tokens.css`, sin framework salvo que el equipo decida otra cosa). Cada mock muestra varias pantallas en un lienzo con notas grises en Space Mono debajo de cada una: esas notas son instrucciones, no UI. Ábrelos en el navegador directamente (necesitan `support.js` y `assets/` al lado, ya incluidos).

## Fidelidad
**Alta.** Colores, tipografía, espaciado y textos son finales. Recrear al píxel con los tokens de `docs/design-brief.md` §2. Donde el mock y el brief difieran, manda el brief; donde el brief calle, manda el mock.

## Orden de lectura
1. `docs/design-brief.md` — límites, tokens, componentes, copy de interfaz, checklist por commit.
2. `docs/mapa-pantallas.md` — rutas, qué pantalla de qué mock, enlaces, comportamiento del ensayo y del índice (reglas de cálculo).
3. `mocks/` — los seis archivos canónicos.
4. `content/ensayo-habitabilidad-final.md` — texto íntegro del ensayo (los mocks E1–E6 solo muestran el primer pliegue de cada sección).
5. `docs/indice-herramienta-notas.md` — contexto del código previo de la herramienta (`practica.v3`) y el renombrado.

## Pantallas
Ver tabla en `docs/mapa-pantallas.md`. Resumen: Feed (1) · Mapas (3) · Proyecto (1, con scroll) · Pensamiento (1, con scroll) · Tema (3) + Ensayo (7 cortes de una página) · Índice (2 portadas + 10 preguntas + 4 resultados + compartir).

## Interacciones
- Tesis dentro de la foto del feed (toggle), term desplegable en el ensayo, barra de progreso de lectura, pregunta 1 del índice respondible desde el feed.
- Índice: estado en localStorage, cálculo en cliente, tarjeta PNG con canvas. Reglas exactas en mapa-pantallas §Índice.
- Correo: un componente, tres estados. Endpoint a definir.
- Bitácora: pestaña deshabilitada .35 «pronto».

## Estado
- Índice: `{fecha, indice, dimensiones:{atencion,agencia,relacion,valor,estructura}, apps, empezar}`, hasta 6.
- Lectura: % leído del ensayo y «leído / en curso» solo si se guarda en el dispositivo (opcional en fase 1).
- Feed: respuesta a Q1 pendiente de completar en /indice.

## Tokens
`docs/design-brief.md` §2. Resumen: papel #F3F2EF · papel-2 #E9E8E4 · tinta #111111 · tinta-2 #3A3A3A · tinta-3 #6B6B6B · línea #1A1A1A · acento #2EBD5E. Archivo 400/500/700/800 + Space Mono 400/700 (Google Fonts). Radio 0, sin sombras, filetes 1px, escala 4px.

## Assets
`mocks/assets/` contiene solo lo que usan las seis pantallas canónicas (14 archivos). Nombres finales; copiar a `assets/` del repo tal cual. Fotos ya recortadas a ≤1000px de ancho. Las fotos de portada de E1 (árbol y obra) e I1/P1 (farola) son las definitivas de fase 1.

## Pendientes marcados ◆
- Nombres de las cuatro preguntas (ensayo: calidad; índice: valor). Implementar el índice como está.
- Umbrales del título del índice: validar con datos reales.
- Endpoint de correo.

## Archivos
```
README.md
docs/design-brief.md · docs/mapa-pantallas.md · docs/indice-herramienta-notas.md
content/ensayo-habitabilidad-final.md
mocks/*.dc.html (6) · mocks/support.js · mocks/assets/ (14)
```
