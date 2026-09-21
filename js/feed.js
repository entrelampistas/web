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
        var fijo = tipos.indexOf('correo') >= 0;
        var ver = clave === 'todos' || fijo || tipos.indexOf(clave) >= 0;
        b.hidden = !ver;
        if (ver && !fijo) visibles++;
      });
      if (vacio) vacio.hidden = visibles > 0;
      if (A.capture) A.capture('feed_filtro', { filtro: clave });
    });
  });

})();
