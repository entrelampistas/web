/* entrelampistas · mapa por paradas (30-09-2026 · «Entorno digital»)
   · lectura: ela_lectura_<slug> = { paradas: { "01": fecha, … }, fecha } · una parada cuenta como leída al llegar a su navegación final
   · pantalla de mapa (/x): estado de cada parada, «seguir leyendo · 0N», parada 00 con el índice, paradas marcadas por el índice
     (ela_indice_paradas, lo deja js/indice.js), enlaces antiguos al ensayo (/x#seccion-0N, /x/ensayo#seccion-0N → la parada)
   · parada (/x/0N): posición en la barra de progreso, hoja «el recorrido», leída, analítica
   · conceptos (fichas, una abierta a la vez) y FAQ en las dos */
(function () {
  var A = window.ela;
  var mapa = document.querySelector('[data-mapa-paradas]');
  var parada = document.querySelector('[data-parada-pagina]');
  var raiz = mapa || parada;
  if (!raiz) return;
  var SLUG = raiz.getAttribute('data-slug');
  var TOTAL = parseInt(raiz.getAttribute('data-total'), 10) || 7;
  var CLAVE = 'ela_lectura_' + SLUG;
  var RUTA = '/' + SLUG;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function lectura() { var l = A.leer(CLAVE, null) || {}; if (!l.paradas) l.paradas = {}; return l; }
  function leidas(l) { return Object.keys(l.paradas).filter(function (k) { return l.paradas[k]; }).length; }
  function siguienteSinLeer(l) { for (var k = 1; k <= TOTAL; k++) if (!l.paradas[pad(k)]) return pad(k); return null; }

  /* ── conceptos y FAQ: uno abierto a la vez ── */
  function acordeon(sel, alAbrir) {
    document.addEventListener('click', function (e) {
      var b = e.target.closest(sel);
      if (!b) return;
      var abrir = b.getAttribute('aria-expanded') !== 'true';
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (o) {
        var mismo = o === b;
        o.setAttribute('aria-expanded', String(mismo && abrir));
        var c = document.getElementById(o.getAttribute('aria-controls'));
        if (c) c.hidden = !(mismo && abrir);
        var m = o.querySelector('.faq__marca'); if (m) m.textContent = mismo && abrir ? '−' : '+';
      });
      if (abrir && alAbrir) alAbrir(b);
    });
  }
  acordeon('[data-term]', function (b) { A.track('concepto_abierto', { concepto: b.textContent.trim() }); });
  acordeon('[data-faq]');

  /* ── marcas del índice: ela_indice_paradas = { fecha, indice, marcas: [{ dimension, parada, estado }] } ── */
  var indice = A.leer('ela_indice_paradas', null);

  /* ════════ pantalla de mapa ════════ */
  if (mapa) {
    // enlaces antiguos al ensayo: /habitabilidad#seccion-0N o /habitabilidad/ensayo#seccion-0N (redirige aquí conservando el #)
    var VIEJAS = { '01': '01', '02': '02', '03': '04', '04': '03', '05': '07' };
    var m = location.hash.match(/^#seccion-(0\d)$/);
    if (m && VIEJAS[m[1]]) { location.replace(RUTA + '/' + VIEJAS[m[1]]); return; }
    if (/^#(ensayo|fin|preguntas)$/.test(location.hash)) history.replaceState(null, '', location.hash === '#preguntas' ? RUTA + '/07#pregunta-mapa' : '#recorrido');

    var l = lectura(), n = leidas(l);
    Array.prototype.forEach.call(document.querySelectorAll('[data-estado-parada]'), function (el) {
      if (l.paradas[el.getAttribute('data-estado-parada')]) { el.textContent = 'leída'; el.hidden = false; el.classList.add('es-propio'); }
    });
    var cuenta = document.querySelector('[data-leidas]');
    if (cuenta && n) { cuenta.textContent = n + ' de ' + TOTAL + ' leídas'; cuenta.classList.add('es-propio'); }
    var est = document.querySelector('[data-mapa-estado]');
    if (est && n) { est.hidden = false; est.querySelector('[data-lectura-paradas]').textContent = n === TOTAL ? 'leído' : n + ' / ' + TOTAL; }
    var sig = siguienteSinLeer(l);
    if (n && sig) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-cta-leer]'), function (a) { a.textContent = 'seguir leyendo · ' + sig; a.setAttribute('href', RUTA + '/' + sig); });
    }
    // parada 00: con índice en este dispositivo, el número y las paradas que tienen que ver con él
    if (indice && indice.marcas) {
      var sin = document.querySelector('[data-cero-sin]'), con = document.querySelector('[data-cero-con]');
      if (sin && con) {
        sin.hidden = true; con.hidden = false;
        con.querySelector('[data-cero-num]').textContent = indice.indice;
        con.querySelector('[data-cero-fecha]').textContent = A.fechaCorta(indice.fecha);
      }
      indice.marcas.forEach(function (k) {
        var el = document.querySelector('[data-marca-indice="' + k.dimension + '"]');
        if (el) { el.hidden = false; el.classList.add('es-propio'); }
      });
    }
    A.track('mapa_visto', { leidas: n, indice: !!indice });
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-parada-fila]');
      if (a) { A.track('mapa_parada', { parada: a.getAttribute('data-parada-fila') }); try { sessionStorage.setItem('ela_desde', 'mapa'); } catch (err) {} }
    });
    return;
  }

  /* ════════ parada ════════ */
  var N = parada.getAttribute('data-n');
  var progreso = document.querySelector('[data-progreso]');
  if (progreso) progreso.style.transform = 'scaleX(' + (parseInt(N, 10) / TOTAL) + ')';

  var desde = null;
  try { desde = sessionStorage.getItem('ela_desde'); sessionStorage.removeItem('ela_desde'); } catch (err) {}
  if (!desde) {
    var ref = document.referrer && document.referrer.indexOf(location.origin) === 0 ? new URL(document.referrer).pathname : '';
    desde = ref === '/' ? 'feed' : ref === RUTA ? 'mapa' : ref.indexOf(RUTA + '/') === 0 ? 'parada' : ref === '/indice' ? 'indice' : ref ? 'otra' : 'directo';
  }
  A.track('parada_vista', { parada: N, desde: desde });

  // leída: cuando la navegación final entra en pantalla
  var fin = document.querySelector('[data-parada-fin]');
  function marcarLeida() {
    var l = lectura();
    if (l.paradas[N]) return;
    l.paradas[N] = Date.now(); l.fecha = Date.now(); l.total = TOTAL;
    if (leidas(l) === TOTAL) { l.terminado = true; A.track('mapa_leido', {}); }
    A.guardar(CLAVE, l);
    A.track('parada_leida', { parada: N });
  }
  if (fin && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es.some(function (x) { return x.isIntersecting; })) { marcarLeida(); io.disconnect(); } });
    io.observe(fin);
  }

  document.addEventListener('click', function (e) {
    var p = e.target.closest('[data-puente]');
    if (p) A.track('puente_criterio', { parada: N, seccion: p.getAttribute('data-puente') });
    var f = e.target.closest('.dato__ver');
    if (f) A.track('dato_fuente', { parada: N });
  });

  /* ── hoja «el recorrido» ── */
  var hoja = document.querySelector('[data-hoja-recorrido]');
  var abrirBtn = document.querySelector('[data-abrir-recorrido]');
  var ultimoFoco = null;
  function pintarHoja() {
    var l = lectura(), n = leidas(l);
    Array.prototype.forEach.call(hoja.querySelectorAll('[data-estado-parada]'), function (el) {
      var k = el.getAttribute('data-estado-parada');
      var marca = indice && indice.marcas && indice.marcas.some(function (x) { return x.parada === k; });
      el.textContent = l.paradas[k] ? 'leída' : marca ? 'para ti' : '';
      el.hidden = !el.textContent;
      el.classList.toggle('es-propio', !el.hidden);
    });
    var cero = hoja.querySelector('[data-estado-cero]');
    if (cero && indice) { cero.textContent = 'hecho'; cero.hidden = false; cero.classList.add('es-propio'); }
    var h = hoja.querySelector('[data-leidas-hoja]');
    if (h) h.textContent = n ? n + ' de ' + TOTAL + ' leídas' : '';
    var guardados = A.leer('ela_guardados', {});
    var g = Object.keys(guardados).filter(function (k) { return k.indexOf(SLUG + '-') === 0; }).length;
    var gEl = hoja.querySelector('[data-guardadas-hoja]');
    if (gEl) { gEl.textContent = g ? 'guardadas en este dispositivo: ' + g : ''; gEl.hidden = !g; }
  }
  function abrirHoja() {
    if (!hoja) return;
    ultimoFoco = document.activeElement;
    pintarHoja();
    hoja.hidden = false; hoja.classList.add('es-abierta');
    document.body.classList.add('con-hoja');
    if (abrirBtn) abrirBtn.setAttribute('aria-expanded', 'true');
    var actual = hoja.querySelector('[aria-current="page"]') || hoja.querySelector('[data-cerrar-recorrido][aria-label]');
    actual.focus();
    A.track('recorrido_abierto', { parada: N });
  }
  function cerrarHoja() {
    hoja.classList.remove('es-abierta'); hoja.hidden = true;
    document.body.classList.remove('con-hoja');
    if (abrirBtn) abrirBtn.setAttribute('aria-expanded', 'false');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  if (hoja && abrirBtn) {
    abrirBtn.setAttribute('aria-expanded', 'false');
    abrirBtn.addEventListener('click', abrirHoja);
    hoja.addEventListener('click', function (e) { if (e.target.closest('[data-cerrar-recorrido]')) cerrarHoja(); });
    document.addEventListener('keydown', function (e) {
      if (hoja.hidden) return;
      if (e.key === 'Escape') cerrarHoja();
      if (e.key === 'Tab') {
        var f = hoja.querySelectorAll('a[href], button:not([hidden])');
        var primero = f[0], ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
      }
    });
  }
})();
