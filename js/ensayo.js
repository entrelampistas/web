/* entrelampistas · mapa y ensayo (24-09-2026: dos páginas)
   · pantalla de mapa (/x): paradas, botón «leer el ensayo» que recuerda dónde te quedaste, enlaces viejos con #sección → /x/ensayo
   · ensayo (/x/ensayo): cabecera viva, progreso, secciones leídas, términos, FAQ, analítica de lectura */
(function () {
  var A = window.ela;
  var mapa = document.querySelector('[data-mapa]');
  var ensayo = document.querySelector('[data-ensayo]');
  var raiz = mapa || ensayo;
  if (!raiz) return;
  var SLUG = raiz.getAttribute('data-slug');
  var CLAVE = 'ela_lectura_' + SLUG;
  var estado = A.leer(CLAVE, null) || { secciones: [], pct: 0, terminado: false };
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ── acordeones: paradas y FAQ, uno abierto a la vez, marca + / − ── */
  function acordeon(sel, marcaSel, alAbrir) {
    var botones = document.querySelectorAll(sel);
    Array.prototype.forEach.call(botones, function (b) {
      b.addEventListener('click', function () {
        var abierta = b.getAttribute('aria-expanded') === 'true';
        Array.prototype.forEach.call(botones, function (o) {
          var abrir = o === b && !abierta;
          var cuerpo = document.getElementById(o.getAttribute('aria-controls'));
          var marca = o.querySelector(marcaSel);
          o.setAttribute('aria-expanded', String(abrir));
          if (cuerpo) cuerpo.hidden = !abrir;
          if (marca) marca.textContent = abrir ? '−' : '+';
        });
        if (!abierta && alAbrir) alAbrir(b);
      });
    });
  }
  acordeon('[data-parada]', '.parada__marca', function (b) { A.track('mapa_parada', { parada: b.getAttribute('data-parada') }); });
  acordeon('[data-faq]', '.faq__marca');

  /* ── términos: uno abierto a la vez ── */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-term]');
    if (!t) return;
    var abrir = t.getAttribute('aria-expanded') !== 'true';
    Array.prototype.forEach.call(document.querySelectorAll('[data-term]'), function (o) {
      o.setAttribute('aria-expanded', 'false');
      var f = document.getElementById(o.getAttribute('aria-controls')); if (f) f.hidden = true;
    });
    t.setAttribute('aria-expanded', String(abrir));
    var ficha = document.getElementById(t.getAttribute('aria-controls'));
    if (ficha) ficha.hidden = !abrir;
  });

  /* ════════ pantalla de mapa ════════ */
  if (mapa) {
    var ENS = location.pathname.replace(/\/$/, '') + '/ensayo';
    // enlaces antiguos al ensayo dentro de la misma página: /x#seccion-03 → /x/ensayo#seccion-03
    if (/^#(ensayo|fin|seccion-\d\d)$/.test(location.hash)) { location.replace(ENS + (location.hash === '#ensayo' ? '' : location.hash)); return; }
    if (location.hash === '#mapa') history.replaceState(null, '', '#recorrido');

    // «leer el ensayo» recuerda dónde te quedaste
    var leidas = (estado.secciones || []).filter(Boolean).length;
    var total = parseInt(mapa.getAttribute('data-secciones'), 10) || 5;
    if (leidas && !estado.terminado) {
      var sig = 1; while (sig <= total && estado.secciones[sig - 1]) sig++;
      if (sig > total) sig = total;
      Array.prototype.forEach.call(document.querySelectorAll('[data-cta-ensayo]'), function (a) {
        a.textContent = 'seguir leyendo · ' + pad(sig);
        a.setAttribute('href', ENS + '#seccion-' + pad(sig));
        a.setAttribute('data-desde', 'seguir');
      });
    }
    var est = document.querySelector('[data-mapa-estado]');
    if (est && (leidas || estado.terminado)) est.hidden = false;

    A.track('mapa_visto', {});
    // de dónde sale la lectora hacia el ensayo: botón, parada o seguir
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-desde]');
      if (a) { try { sessionStorage.setItem('ela_desde', a.getAttribute('data-desde')); } catch (err) {} }
    });
    return;
  }

  /* ════════ ensayo ════════ */
  var RUTA = ensayo.getAttribute('data-ruta');
  var cab = document.querySelector('.cabecera--pieza');
  var ruta = cab && cab.querySelector('[data-ruta]');
  var meta = cab && cab.querySelector('[data-meta]');
  var progreso = cab && cab.querySelector('[data-progreso]');
  var iconos = cab ? cab.querySelectorAll('.cabecera__der .icono-btn') : [];
  var secciones = ensayo.querySelectorAll('[data-seccion]');
  var nSecciones = Math.max(1, secciones.length - 1);
  var guardadoEl = document.querySelector('[data-guardado]');
  var hitos = { 25: false, 50: false, 75: false };

  // origen de la entrada: lo deja el clic en el mapa o el feed; si no, el referente
  var desde = null;
  try { desde = sessionStorage.getItem('ela_desde'); sessionStorage.removeItem('ela_desde'); } catch (err) {}
  if (!desde) {
    var ref = document.referrer && document.referrer.indexOf(location.origin) === 0 ? new URL(document.referrer).pathname : '';
    desde = ref === '/' ? 'feed' : ref === ensayo.getAttribute('data-mapa-ruta') ? 'mapa' : ref ? 'otra' : 'directo';
  }
  A.track('ensayo_abierto', { desde: desde, seccion: /^#seccion-\d\d$/.test(location.hash) ? location.hash.slice(9) : '' });

  function setCab(m) {
    if (ruta) ruta.textContent = RUTA;
    if (meta) { meta.textContent = m; meta.hidden = !m; }
    // brief §4: a la derecha, acciones (guardar, compartir) o meta; nunca ambas
    Array.prototype.forEach.call(iconos, function (i) { i.hidden = !!m; });
  }
  function guardar() {
    estado.fecha = Date.now();
    if (A.guardar(CLAVE, estado) && guardadoEl) guardadoEl.hidden = false;
  }

  function alDesplazar() {
    var y = window.scrollY + (cab ? cab.offsetHeight : 56);
    var alto = window.innerHeight;
    var inicio = ensayo.offsetTop, fin = inicio + ensayo.offsetHeight - alto;
    var pct = Math.max(0, Math.min(1, (window.scrollY - inicio) / Math.max(1, fin - inicio)));
    if (progreso) progreso.style.transform = 'scaleX(' + pct + ')';
    var sec = null;
    Array.prototype.forEach.call(secciones, function (s) { if (s.offsetTop <= y + alto * .4) sec = s; });
    setCab(sec ? (sec.getAttribute('data-meta') || sec.getAttribute('data-seccion')) : '');
    // secciones leídas: cuando su final ha pasado por el 60 % de la pantalla
    var cambio = false;
    Array.prototype.forEach.call(secciones, function (s) {
      var num = s.getAttribute('data-seccion');
      if (num === 'fin') return;
      var k = parseInt(num, 10) - 1;
      while (estado.secciones.length < nSecciones) estado.secciones.push(false);
      if (!estado.secciones[k] && s.offsetTop + s.offsetHeight <= window.scrollY + alto * .6) { estado.secciones[k] = true; cambio = true; }
    });
    var nuevoPct = Math.round(pct * 100);
    if (nuevoPct > (estado.pct || 0)) { estado.pct = nuevoPct; cambio = cambio || nuevoPct % 10 === 0; }
    [25, 50, 75].forEach(function (h) { if (!hitos[h] && nuevoPct >= h) { hitos[h] = true; A.track('ensayo_progreso', { hito: h }); } });
    if (!estado.terminado && pct >= .98) { estado.terminado = true; cambio = true; A.track('ensayo_leido', {}); }
    if (cambio) guardar();
  }
  var pendiente = false;
  window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(function () { pendiente = false; alDesplazar(); }); } }, { passive: true });
  window.addEventListener('resize', alDesplazar);
  if (estado.fecha && guardadoEl) guardadoEl.hidden = false;
  alDesplazar();
})();
