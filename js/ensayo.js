/* entrelampistas · tema + ensayo · paradas del mapa, cabecera viva, progreso de lectura, term, guardado en el dispositivo */
(function () {
  var A = window.ela;
  var ensayo = document.querySelector('[data-ensayo]');
  var SLUG = ensayo ? ensayo.getAttribute('data-slug') : 'habitabilidad';
  var RUTA = ensayo ? ensayo.getAttribute('data-ruta') : '';
  var CLAVE = 'ela_lectura_' + SLUG;

  /* ── paradas (T2): una abierta a la vez ── */
  var paradas = document.querySelectorAll('[data-parada]');
  Array.prototype.forEach.call(paradas, function (b) {
    b.addEventListener('click', function () {
      var abierta = b.getAttribute('aria-expanded') === 'true';
      Array.prototype.forEach.call(paradas, function (o) {
        var cuerpo = document.getElementById(o.getAttribute('aria-controls'));
        var abrir = o === b && !abierta;
        o.setAttribute('aria-expanded', String(abrir));
        if (cuerpo) cuerpo.hidden = !abrir;
      });
    });
  });

  /* ── term: uno abierto a la vez ── */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-term]');
    if (!t) return;
    var ficha = document.getElementById(t.getAttribute('aria-controls'));
    var abrir = t.getAttribute('aria-expanded') !== 'true';
    Array.prototype.forEach.call(document.querySelectorAll('[data-term]'), function (o) {
      o.setAttribute('aria-expanded', 'false');
      var f = document.getElementById(o.getAttribute('aria-controls')); if (f) f.hidden = true;
    });
    t.setAttribute('aria-expanded', String(abrir));
    if (ficha) ficha.hidden = !abrir;
  });

  /* ── FAQ (E7): uno abierto a la vez · aria-expanded en el botón · + / − ── */
  var faqs = document.querySelectorAll('[data-faq]');
  Array.prototype.forEach.call(faqs, function (b) {
    b.addEventListener('click', function () {
      var abierta = b.getAttribute('aria-expanded') === 'true';
      Array.prototype.forEach.call(faqs, function (o) {
        var abrir = o === b && !abierta;
        var a = document.getElementById(o.getAttribute('aria-controls'));
        var marca = o.querySelector('.faq__marca');
        o.setAttribute('aria-expanded', String(abrir));
        if (a) a.hidden = !abrir;
        if (marca) marca.textContent = abrir ? '−' : '+';
      });
    });
  });

  /* ── cabecera viva: ruta, meta y progreso según lo visible ── */
  var cab = document.querySelector('.cabecera--pieza');
  var ruta = cab && cab.querySelector('[data-ruta]');
  var meta = cab && cab.querySelector('[data-meta]');
  var progreso = cab && cab.querySelector('[data-progreso]');
  var secciones = ensayo ? ensayo.querySelectorAll('[data-seccion]') : [];
  var pantallas = document.querySelectorAll('[data-pantalla]');
  var nSecciones = Math.max(1, secciones.length - 1);
  var estado = A.leer(CLAVE, null) || { secciones: [], pct: 0, terminado: false };
  var guardadoEl = document.querySelector('[data-guardado]');
  var enTinta = false;

  var iconos = cab ? cab.querySelectorAll('.cabecera__der .icono-btn') : [];
  var lampara = cab ? cab.querySelector('.cabecera__der a[href="#tema"]') : null;
  function setCab(r, m, enT0) {
    if (ruta && r !== undefined) ruta.textContent = r;
    if (meta && m !== undefined) { meta.textContent = m; meta.hidden = !m; }
    // brief §4: a la derecha, acciones (lámpara, guardar) o meta; nunca ambas · en T0 la lámpara sobra
    Array.prototype.forEach.call(iconos, function (i) { i.hidden = !!m || (enT0 && i === lampara); });
  }
  function guardar() {
    estado.fecha = Date.now();
    if (A.guardar(CLAVE, estado) && guardadoEl) guardadoEl.hidden = false;
  }

  function alDesplazar() {
    var y = window.scrollY + (cab ? cab.offsetHeight : 56);
    var alto = window.innerHeight;
    // pantalla del tema visible
    var actual = null;
    Array.prototype.forEach.call(pantallas, function (p) { if (p.offsetTop <= y + alto * .4) actual = p; });
    if (ensayo && ensayo.offsetTop <= y + alto * .4) actual = null;
    if (actual) {
      setCab(actual.getAttribute('data-ruta'), actual.getAttribute('data-meta'), actual.hasAttribute('data-t0'));
      var tinta = actual.hasAttribute('data-tinta');
      if (tinta !== enTinta) { enTinta = tinta; cab.classList.toggle('cabecera--tinta', tinta); }
      if (progreso) progreso.style.transform = 'scaleX(0)';
      return;
    }
    if (enTinta) { enTinta = false; cab.classList.remove('cabecera--tinta'); }
    if (!ensayo) return;
    // dentro del ensayo
    var inicio = ensayo.offsetTop, fin = inicio + ensayo.offsetHeight - alto;
    var pct = Math.max(0, Math.min(1, (window.scrollY - inicio) / Math.max(1, fin - inicio)));
    if (progreso) progreso.style.transform = 'scaleX(' + pct + ')';
    var sec = null, idx = -1;
    Array.prototype.forEach.call(secciones, function (s, i) { if (s.offsetTop <= y + alto * .4) { sec = s; idx = i; } });
    setCab(RUTA, sec ? (sec.getAttribute('data-meta') || sec.getAttribute('data-seccion')) : '');
    // secciones leídas: cuando su final ha pasado por el 60 % de la pantalla
    var cambio = false;
    Array.prototype.forEach.call(secciones, function (s, i) {
      var num = s.getAttribute('data-seccion');
      if (num === 'fin') return;
      var k = parseInt(num, 10) - 1;
      while (estado.secciones.length < nSecciones) estado.secciones.push(false);
      if (!estado.secciones[k] && s.offsetTop + s.offsetHeight <= window.scrollY + alto * .6) { estado.secciones[k] = true; cambio = true; }
    });
    var nuevoPct = Math.round(pct * 100);
    if (nuevoPct > (estado.pct || 0)) { estado.pct = nuevoPct; cambio = cambio || nuevoPct % 10 === 0; }
    if (!estado.terminado && pct >= .98) { estado.terminado = true; cambio = true; if (A.capture) A.capture('ensayo_leido', { ensayo: SLUG }); }
    if (cambio) guardar();
  }
  var pendiente = false;
  window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(function () { pendiente = false; alDesplazar(); }); } }, { passive: true });
  window.addEventListener('resize', alDesplazar);
  if (estado.fecha && guardadoEl) guardadoEl.hidden = false;
  alDesplazar();

  /* enlaces internos: desplazar respetando la cabecera (scroll-margin-top lo cubre); registrar entrada al ensayo */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (id === 'ensayo' && A.capture) A.capture('ensayo_abierto', { desde: 'tema' });
  });
})();
