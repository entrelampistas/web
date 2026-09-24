/* entrelampistas · variantes en exploración (◆ temporal, 24-09-2026)
   Una página puede traer varias versiones de un bloque (<div data-solo-v="a">, o «c d» si vale para varias) o de su estilo
   (html[data-v="b"] … en CSS, nombres en <main data-variantes="a:actual|b:ritmo">). Se elige con ?v= (se recuerda en la sesión).
   El selector solo aparece fuera de producción; en entrelampistas.com se ve siempre la variante por defecto (a). */
(function () {
  var html = document.documentElement;
  var PROD = /(^|\.)entrelampistas\.com$/i.test(location.hostname);
  // nombres: de <main data-variantes="a:actual|b:ritmo"> (variantes de estilo) o de cada bloque <div data-solo-v="a" data-nombre="…">
  var nombres = {};
  var decl = document.querySelector('[data-variantes]');
  if (decl) decl.getAttribute('data-variantes').split('|').forEach(function (par) { var i = par.indexOf(':'); nombres[par.slice(0, i)] = par.slice(i + 1); });
  else Array.prototype.forEach.call(document.querySelectorAll('[data-solo-v]'), function (b) { nombres[b.getAttribute('data-solo-v')] = b.getAttribute('data-nombre') || b.getAttribute('data-solo-v'); });
  if (!Object.keys(nombres).length) return;
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
