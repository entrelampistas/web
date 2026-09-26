/* entrelampistas · mapas · filtro por eje (■ criterio · ○ entornos) */
(function () {
  var filtros = document.querySelectorAll('.mapas-filtros .filtro');
  var celdas = document.querySelectorAll('[data-mapas] [data-eje]');
  var vacio = document.querySelector('[data-mapas-vacio]');
  Array.prototype.forEach.call(filtros, function (f) {
    f.addEventListener('click', function () {
      var eje = f.getAttribute('data-eje');
      Array.prototype.forEach.call(filtros, function (o) { o.setAttribute('aria-selected', String(o === f)); });
      var n = 0;
      Array.prototype.forEach.call(celdas, function (c) {
        var ver = eje === 'todos' || c.getAttribute('data-eje') === eje;
        c.hidden = !ver; if (ver) n++;
      });
      if (vacio) vacio.hidden = n > 0;
    });
  });
})();
