/* entrelampistas · feed · tesis en la foto, filtros, primera pregunta del índice, guardar */
(function () {
  var A = window.ela;

  /* ── tesis dentro de la portada ── */
  var cover = document.getElementById('feed-tesis');
  if (cover) {
    var capa = cover.querySelector('[data-tesis]');
    var texto = document.getElementById('feed-tesis-texto');
    function abrir(v) {
      cover.classList.toggle('es-abierta', v);
      texto.hidden = !v;
      capa.setAttribute('aria-expanded', String(v));
      if (v) texto.querySelector('[data-tesis-cerrar]').focus(); else capa.focus();
    }
    capa.addEventListener('click', function () { abrir(true); });
    texto.addEventListener('click', function (e) {
      if (e.target.closest('[data-tesis-cerrar]') || e.target === texto) abrir(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !texto.hidden) abrir(false); });
  }

  /* ── filtros ── */
  var filtros = document.querySelectorAll('.feed-filtros .filtro');
  var bloques = document.querySelectorAll('[data-tipo]');
  var vacio = document.querySelector('[data-feed-vacio]');
  Array.prototype.forEach.call(filtros, function (f) {
    f.addEventListener('click', function () {
      var clave = f.getAttribute('data-filtro');
      Array.prototype.forEach.call(filtros, function (o) { o.setAttribute('aria-selected', String(o === f)); });
      var visibles = 0;
      Array.prototype.forEach.call(bloques, function (b) {
        var tipos = b.getAttribute('data-tipo').split(' ');
        var fijo = tipos.indexOf('correo') >= 0 || tipos.indexOf('fin') >= 0;
        var ver = clave === 'todos' || fijo || tipos.indexOf(clave) >= 0;
        b.hidden = !ver;
        if (ver && !fijo) visibles++;
      });
      if (vacio) vacio.hidden = visibles > 0;
      if (A.capture) A.capture('feed_filtro', { filtro: clave });
    });
  });

  /* ── primera pregunta del índice, respondible aquí ── */
  var nodo = document.getElementById('datos-indice');
  var zona = document.querySelector('[data-feed-opciones]');
  if (!nodo || !zona) return;
  var datos = JSON.parse(nodo.textContent);
  var dim = datos.dimensiones[0];
  var q = dim.preguntas[0];
  var borrador = A.leer('ela_indice_borrador', { respuestas: {}, apps: {}, paso: 0 });
  var elegida = borrador.respuestas[0];
  var seguir = document.querySelector('[data-feed-seguir]');
  var pasos = document.querySelector('[data-feed-pasos]');

  function pintar() {
    zona.innerHTML = '';
    zona.classList.toggle('hay-eleccion', elegida !== undefined && elegida !== null);
    q.opciones.forEach(function (op, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opcion'; b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(elegida === i));
      b.innerHTML = '<span class="opcion__caja" aria-hidden="true"></span><span>' + op + '</span>';
      b.addEventListener('click', function () { elegir(i); });
      zona.appendChild(b);
    });
    if (pasos) {
      pasos.innerHTML = '';
      for (var i = 0; i < 10; i++) {
        var s = document.createElement('span');
        if (i === 0) s.className = elegida !== undefined && elegida !== null ? 'es-respondida' : 'es-actual';
        pasos.appendChild(s);
      }
    }
    if (seguir) {
      var hecha = elegida !== undefined && elegida !== null;
      seguir.classList.toggle('es-respondida', hecha);
      seguir.textContent = hecha ? 'respondida · sigues en la herramienta ›' : 'respondes aquí y sigues en la herramienta ›';
      seguir.setAttribute("href", hecha ? "/indice#empezar" : "/indice");
    }
  }
  function elegir(i) {
    elegida = i;
    borrador = A.leer('ela_indice_borrador', { respuestas: {}, apps: {}, paso: 0 });
    borrador.respuestas[0] = i;
    borrador.paso = Math.max(borrador.paso || 0, 1);
    borrador.desde = 'feed';
    A.guardar('ela_indice_borrador', borrador);
    pintar();
    if (A.capture) A.capture('indice_q1_feed', {});
  }
  pintar();
})();
