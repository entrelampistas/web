# Prueba final antes de producción

Guion para hacer en el móvil, en la preview. Cada línea dice qué tocar y qué tiene que pasar. Si algo no pasa, anota la pantalla y el paso.

Preview: https://web-git-claude-entrelampistas-mo-5a7847-entrelampistas-projects.vercel.app (ventana privada para empezar sin lecturas guardadas).

## 1 · Feed (`/`)

- [ ] Arriba: logo, filtros «todos · ensayos · herramientas». Debajo, la definición de entrelampistas.
- [ ] Tarjeta de Habitabilidad con «Portada». Tocar la foto: se abre la tesis sobre la foto; «cerrar ×» la cierra.
- [ ] Entorno digital: «ir al mapa» lleva a `/habitabilidad`; «empezar» a `/habitabilidad/01`. En Criterio y El mapa de tu mente, «leer el ensayo» a `/x/ensayo`.
- [ ] Compartir (flecha) abre la hoja con la tarjeta 4:5; «descargar png» y «copiar enlace» funcionan.
- [ ] Guardar (cuadrado) se marca; al volver al feed sigue marcado.
- [ ] Lo mismo en Criterio y El mapa de tu mente.
- [ ] Primera pregunta del índice: responder → «seguir con la pregunta 2 →» lleva al índice en la pregunta 2.
- [ ] Filtros: «ensayos» deja solo mapas; «herramientas» solo el índice.

## 2a · Entorno digital (`/habitabilidad`, mapa por paradas desde el 30-09-2026)

- [ ] Portada «Entorno digital · ¿Cómo habitamos internet?», tesis y «cómo leer este mapa».
- [ ] Parada 00 en negro: «calcular mi índice» (verde) y «leer primero» (lleva a la 01). Con un índice hecho, enseña tu número y «ver mi resultado».
- [ ] Recorrido por tramos: cada parada con su titular, su dato y país · fecha; tocarla abre `/habitabilidad/0N`.
- [ ] En una parada: dato grande con «ver fuente», texto, ejemplo, conceptos (cada chip abre su ficha), puente a una sección de Criterio, fuentes plegadas, «‹ anterior · siguiente ›».
- [ ] Icono ≡ de la cabecera: hoja «el recorrido» con leídas, «estás aquí» y «para ti».
- [ ] Al llegar al final de una parada, vuelve al mapa: esa parada dice «leída» y el botón «seguir leyendo · 0N».
- [ ] Hacer el índice: el mapa marca «para ti · dimensión» en las paradas que tocan, y «por dónde empezar» enlaza a su parada.
- [ ] 05: barras de clics y reparto recomendado / cuentas que sigues. 06: la factura y la línea de tiempo «La reacción». 07: cinco exigencias, gesto y la pregunta en negro con «compartir la pregunta».
- [ ] `/habitabilidad/ensayo#seccion-03` abre la parada 04 (enlaces viejos).

## 2 · Pantalla de mapa (`/criterio`, `/decisiones`)

- [ ] Portada con título y pregunta dentro de la foto.
- [ ] Tesis, recorrido de cinco paradas: tocar una abre un resumen; «ir a la sección ›» abre el ensayo justo en esa sección.
- [ ] Preguntas en bloque negro; «compartir las preguntas» abre la tarjeta.
- [ ] Al final: «leer el ensayo», índice (solo Habitabilidad), conceptos, otros mapas.
- [ ] Después de leer dos secciones de un ensayo, volver al mapa: el botón dice «seguir leyendo · 03» y aparece «tu lectura ■ 2 / 5».

## 3 · Ensayo (`/x/ensayo`)

- [ ] Cada sección abre con su foto a todo lo ancho, velo, número pequeño y título dentro.
- [ ] Al bajar, la cabecera muestra la sección («01», «02»…) y la barra verde de progreso avanza.
- [ ] Palabras subrayadas (enshittification, heurísticas, zona gris, verificación): al tocarlas se abre la ficha.
- [ ] Preguntas de cierre: ○ en Habitabilidad, ■ en Criterio, bloque negro en El mapa de tu mente.
- [ ] Al final: «has terminado · guardado», compartir, volver al mapa, siguiente mapa, preguntas frecuentes (una abierta a la vez), correo.
- [ ] Criterio: cifras 9,87 % / 2.495.300 y 74 % / 1 de 10; «guardar las cuatro preguntas» abre su tarjeta.

## 4 · Mapas (`/mapas`)

- [ ] Nada preseleccionado; «nuevo» en gris; los mapas que has leído, con ■ verde y «leído» o «en curso».
- [ ] Filtros criterio / entornos.
- [ ] Variantes en la preview: `?v=a` retícula, `?v=b` lista, `?v=c` tarjetas. **Elegir una antes de lanzar**; en producción se ve siempre la `a`.

## 5 · Índice (`/indice`)

- [ ] Portada con foto y «¿Es habitable tu vida digital?».
- [ ] Diez preguntas; «no lo sé» siempre disponible; la cruz sale y guarda lo respondido.
- [ ] Resultado, por dimensión, por dónde empezar, por app; compartir el resultado genera la tarjeta.
- [ ] Volver a entrar: ofrece continuar o ver el anterior.

## 6 · Correo

- [ ] `/api/subscribe` en el navegador responde `"listo":true`.
- [ ] Apuntarse con un correo propio (feed o final de un ensayo): «gracias · te avisamos cuando haya pieza nueva».
- [ ] Llega enseguida «Hola desde entrelampistas» (sin correo de confirmación ni enlace que pulsar).
- [ ] En Buttondown aparece el suscriptor activo, con la etiqueta `web` y la página de origen.
- [ ] Vistas previas en `/correo`.

## 7 · Otras

- [ ] `/proyecto`, `/pensamiento-de-mantenimiento`, `/conceptos/enshittification` (foto con título dentro; «aparece en» lleva a la sección 02).
- [ ] Una dirección que no existe muestra la página 404 propia.
- [ ] Enlaces viejos: `/mapa-de-tu-mente` → El mapa de tu mente; `/habitabilidad-digital` → Habitabilidad; `/criterio/capas` → Criterio.
- [ ] Compartir por WhatsApp el enlace de un mapa: sale su foto y su título.

## Lanzamiento

1. Resolver lo que está marcado ◆ en `CLAUDE.md › Pendientes` que deba estar antes de lanzar (textos de la autora, variante de Mapas, textos del correo).
2. Vercel › Production: `NEWSLETTER_PROVIDER` y `BUTTONDOWN_API_KEY` también en *Production*.
3. Buttondown: bienvenida pegada, confirmación desactivada, reply-to y dominio de envío (ver `design/docs/newsletter.md`).
4. Fusionar el PR de esta rama en `main`: Vercel despliega producción en www.entrelampistas.com.
5. En producción:
   - [ ] aparece el aviso de analítica (solo en entrelampistas.com); aceptar → en PostHog (EU) › Activity llegan `$pageview` y `mapa_visto`.
   - [ ] rechazar → no llega nada.
   - [ ] `https://www.entrelampistas.com/api/subscribe` → `"listo":true`.
   - [ ] Google Search Console: enviar `https://www.entrelampistas.com/sitemap.xml`.
6. Crear en PostHog los cuatro embudos de `design/docs/analitica.md`.

## Lo que ya se ha comprobado (26-09-2026)

- 16 páginas, 34 enlaces internos y 19 anclas sin roturas; ninguna ruta tapada por un redirect de `vercel.json`.
- Sin desbordes a 320, 375 y 390; sin errores de JavaScript.
- axe (WCAG 2 AA y buenas prácticas) limpio en todas las rutas, también con lecturas guardadas.
- Un `h1` por página, títulos y descripciones dentro de límite, `og:image` existente en todas.
- Rendimiento en 4G lenta y CPU 4× (LCP): feed 2,7 s; pantallas de mapa 1,0–2,2 s; ensayos 1,4–2,7 s; índice 2,1 s; Pensamiento de mantenimiento 2,9 s. CLS 0.
- Formulario de correo: correo inválido, alta, proveedor caído y sin proveedor; endpoint con Buttondown simulado (9 casos).
- Índice completo de principio a fin, con tarjeta para compartir.
