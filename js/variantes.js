/* entrelampistas · variantes en exploración (◆ temporal, 24-09-2026)
   Una página puede traer varias versiones de un bloque: <div data-solo-v="a|b|c">. Se elige con ?v=a|b|c (se recuerda en la sesión).
   El selector solo aparece fuera de producción; en entrelampistas.com se ve siempre la variante por defecto (a). */
(function () {
  var html = document.documentElement;
  var PROD = /(^|\.)entrelampistas\.com$/i.test(location.hostname);
  var bloques = document.querySelectorAll('[data-solo-v]');
  if (!bloques.length) return;
  var nombres = {};
  Array.prototype.forEach.call(bloques, function (b) { nombres[b.getAttribute('data-solo-v')] = b.getAttribute('data-nombre') || b.getAttribute('data-solo-v'); });
  var clave = 'ela_v_' + location.pathname;
  var q = new URLSearchParams(location.search).get('v');
  var v = null;
  if (!PROD) { try { v = q || sessionStorage.getItem(clave); if (q) sessionStorage.setItem(clave, q); } catch (e) { v = q; } }
  if (!v || !nombres[v]) v = 'a';
  html.setAttribute('data-v', v);
  if (PROD) return;
  var nav = document.createElement('nav');
  nav.className = 'variantes';
  nav.setAttribute('aria-label', 'Variantes en exploración');
  nav.innerHTML = '<span class="mono meta">variante</span>' + Object.keys(nombres).sort().map(function (k) {
    return '<a class="variantes__opcion mono' + (k === v ? ' es-activa' : '') + '" href="?v=' + k + '"' + (k === v ? ' aria-current="true"' : '') + '>' + k + ' · ' + nombres[k] + '</a>';
  }).join('');
  var main = document.querySelector('main');
  if (main) main.insertBefore(nav, main.firstChild);
})();
