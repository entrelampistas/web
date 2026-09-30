/* entrelampistas · taxonomía de analítica.
   Capa fina sobre ela.capture (consent.js): añade propiedades comunes y centraliza los nombres de evento.
   Fuera de producción o sin consentimiento, ela.capture es no-op, así que ela.track no envía nada.

   Catálogo (design/docs/analitica.md manda):
     mapa_visto        { tema, eje }                     · carga de la pantalla de mapa (/x)
     mapa_parada       { tema, eje, parada }             · abre una parada del recorrido
     parada_vista      { tema, eje, parada, desde }      · carga de una parada (/x/0N, mapa por paradas); desde=mapa|parada|feed|indice|otra|directo
     parada_leida      { tema, eje, parada }             · llega a la navegación final de la parada
     mapa_leido        { tema, eje }                     · todas las paradas leídas
     recorrido_abierto { tema, eje, parada }             · abre la hoja «el recorrido»
     puente_criterio   { tema, eje, parada, seccion }    · clic en el puente a Criterio informativo
     dato_fuente       { tema, eje, parada }             · abre la fuente del dato ancla
     concepto_abierto  { tema, eje, concepto }           · abre la ficha de un concepto
     ensayo_abierto    { tema, eje, desde, seccion }     · carga del ensayo (/x/ensayo); desde=mapa|parada|seguir|feed|otra|directo
     ensayo_progreso   { tema, eje, hito }               · hito=25|50|75
     ensayo_leido      { tema, eje }                     · 100 %
     indice_empezado   { desde }                         · desde=portada|continuar|feed
     indice_paso       { paso, dimension, pregunta, respondida } · una por pregunta (1..10)
     indice_terminado  { indice, titulo }
     feed_filtro       { filtro }
     feed_mapa         { tema, destino }                 · clic en «ir al mapa» (destino=mapa) o «leer el ensayo» (destino=ensayo)
     feed_tesis        { tema }                          · abre la tesis en la tarjeta
     correo_intento    { origen }
     correo_alta       { origen }
     correo_error      { origen, motivo }
     compartir_png     { formato:"png", pieza }
     compartir_enlace  { formato:"enlace" | "nativo", pieza }
   PostHog añade solo a cada evento la URL, referente, dispositivo y campaña (utm). */
(function () {
  var A = window.ela = window.ela || {};
  function ctx() {
    var c = {};
    var e = document.querySelector('[data-ensayo][data-slug], [data-mapa][data-slug], [data-mapa-paradas][data-slug], [data-parada-pagina][data-slug]');
    if (e) { c.tema = e.getAttribute('data-slug'); var ej = e.getAttribute('data-eje'); if (ej) c.eje = ej; }
    return c;
  }
  A.track = function (nombre, props) {
    var p = ctx();
    if (props) for (var k in props) if (props[k] !== undefined && props[k] !== null) p[k] = props[k];
    if (typeof A.capture === 'function') A.capture(nombre, p);
  };
})();
