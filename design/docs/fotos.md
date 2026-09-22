# Fotos · iteración 2

> 22-09-2026 · Archivos recibidos de la autora («Fotos criterio.zip», HEIC del iPhone; «Mapa decisiones.zip», jpg de Rodrig Moss). Se sirven desde `assets/img/` a 1000 px (jpg q82) y a 1600 px (`-w1600.jpg`, srcset) sin metadatos EXIF. Las dimensiones de los archivos coinciden una a una con la tabla, que es la asignación vigente (el mock de Decisiones las tenía en otro orden). Sobran dos de Criterio (plátano con cables sobre muro, palmeras) y una de Decisiones (espatifilos en sombra).

14 archivos en `mocks/assets/`, JPEG q82, 1000px de ancho. Todas a todo lo ancho, sin recorte, proporción natural. Solo T0 y E1 llevan velo.
Alt: las fotos con título encima (T0, E1, feed) y las de pausa son decorativas (`alt=""`). Las de sección llevan alt breve porque el folio 96 va encima y la foto sí es contenido visual de la sección.

Crédito global en pie o /proyecto: `dec-*` Rodrig Moss / Unsplash · `cri-*` fotos de la autora.

| Archivo | px | Pantalla | Alt |
|---|---|---|---|
| cri-portada-platano-cables.jpg | 1000×750 | Criterio E1 (portada, con velo) | decorativa |
| cri-02-ramas-cables.jpg | 1000×1333 | Criterio T0 (4:3), tarjeta del feed, E3 sección 02 | T0/feed: decorativa · E3: «Ramas desnudas cruzadas por cables eléctricos» |
| cri-01-copa-nubes.jpg | 1000×750 | Criterio E2 sección 01 | «Copa de un árbol contra un cielo con nubes» |
| cri-pausa-pinos-palma.jpg | 1000×750 | Criterio E3c, pausa antes de las preguntas de 02 | decorativa |
| cri-03-pinos-avion.jpg | 1000×750 | Criterio E4 sección 03 | «Pinos y la estela de un avión» |
| cri-04-dosel.jpg | 1000×1333 | Criterio E5 sección 04 | «Dosel de hojas visto desde abajo» |
| cri-05-tronco-cielo.jpg | 1000×750 | Criterio E6 sección 05 | «Tronco y ramas altas contra el cielo» |
| dec-portada-palma-frutos.jpg | 1000×833 | Decisiones T0, tarjeta del feed, E1 (con velo) | decorativa |
| dec-01-dos-espatifilos-rojo.jpg | 1000×791 | Decisiones E2 sección 01 | «Dos espatifilos sobre fondo rojo» |
| dec-02-ramas-frutos.jpg | 1000×762 | Decisiones E3 sección 02 | «Ramas con frutos pequeños» |
| dec-03-espatifilo-foco.jpg | 1000×590 | Decisiones E4 sección 03 | «Espatifilo bajo un foco de luz» |
| dec-04-frutos-rojo-azul.jpg | 1000×670 | Decisiones E5 sección 04 | «Frutos sobre fondo rojo y azul» |
| dec-05-claveles-rojos.jpg | 1000×831 | Decisiones E6 sección 05 | «Claveles rojos» |
| dec-pausa-flores-rojas.jpg | 1000×789 | Decisiones, pausa antes de las preguntas de cierre | decorativa |

Los `.png` originales de estas 14 fotos se retiran del handoff; si Code encuentra una referencia `.png` a un `cri-*` o `dec-*`, es un error: usar `.jpg`.
