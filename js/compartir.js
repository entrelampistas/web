/* entrelampistas · compartir · hoja desde abajo con tarjeta 4:5 en tinta → PNG 1080×1350 + copiar enlace.
   [data-compartir] abre la hoja. Datos en el propio botón o en un <script type="application/json" data-tarjeta>:
   { cab, cifra, sub, titulo, cita, barras:[{nombre, pct, estado}], pie, fecha, enlace, texto } */
(function () {
  var A = window.ela = window.ela || {};
  var PAPEL = '#F3F2EF', TINTA = '#111111', ACENTO = '#2EBD5E', GRIS = '#8A8A86';

  function datos(boton) {
    var id = boton.getAttribute('data-compartir');
    var nodo = id ? document.getElementById(id) : document.querySelector('script[data-tarjeta]');
    var d = nodo ? JSON.parse(nodo.textContent) : {};
    if (!d.enlace) d.enlace = location.origin + location.pathname;
    if (!d.pie) d.pie = 'entrelampistas.com' + location.pathname;
    if (!d.fecha) d.fecha = A.fechaCorta ? A.fechaCorta(Date.now()) : '';
    if (!d.cab) d.cab = document.title.split('·')[0].trim().toLowerCase();
    return d;
  }

  /* ── tarjeta en canvas · 1080×1350 ── */
  function dibujar(d, escala) {
    var W = 1080, H = 1350, c = document.createElement('canvas');
    c.width = W * escala; c.height = H * escala;
    var x = c.getContext('2d'); x.scale(escala, escala);
    x.fillStyle = TINTA; x.fillRect(0, 0, W, H);
    x.fillStyle = PAPEL; x.textBaseline = 'top';
    var M = 72;
    x.font = '400 28px "Space Mono", monospace';
    x.fillText('ENTRELAMPISTAS', M, M);
    var cab = (d.cab || '').toUpperCase(); x.textAlign = 'right'; x.fillText(cab, W - M, M); x.textAlign = 'left';

    var y = M + 120;
    if (d.cifra !== undefined && d.cifra !== null) {
      x.font = '800 320px Archivo, sans-serif'; x.fillText(String(d.cifra), M - 8, y);
      x.font = '400 30px "Space Mono", monospace'; x.fillText('/ 100', M + x.measureText('').width + 30 + medir(x, String(d.cifra), '800 320px Archivo, sans-serif'), y + 250);
      y += 340;
    }
    if (d.titulo) { x.font = '800 60px Archivo, sans-serif'; y = parrafo(x, d.titulo, M, y, W - 2 * M, 66) + 40; }
    if (d.cita && !d.cifra) { x.font = '800 72px Archivo, sans-serif'; y = parrafo(x, d.cita, M, y + 60, W - 2 * M, 80) + 40; }
    if (d.lineas && d.lineas.length) {
      x.font = '500 40px Archivo, sans-serif';
      d.lineas.forEach(function (l) {
        x.fillStyle = ACENTO; x.fillText('◆', M, y + 4);
        x.fillStyle = PAPEL; y = parrafo(x, l, M + 48, y, W - 2 * M - 48, 50) + 28;
        x.fillStyle = 'rgba(243,242,239,.4)'; x.fillRect(M, y - 14, W - 2 * M, 1);
      });
    }
    if (d.barras && d.barras.length) {
      y = Math.max(y, H - 480);
      x.font = '400 26px "Space Mono", monospace';
      d.barras.forEach(function (b) {
        x.fillStyle = PAPEL; x.fillText(b.nombre.toUpperCase(), M, y + 6);
        var bx = M + 300, bw = W - M - bx, bh = 24;
        if (b.estructura) {
          x.setLineDash([8, 8]); x.strokeStyle = PAPEL; x.lineWidth = 2; x.strokeRect(bx, y, bw, bh); x.setLineDash([]);
        } else { x.fillStyle = 'rgba(243,242,239,.18)'; x.fillRect(bx, y, bw, bh); }
        var color = b.estado === 'habitable' ? ACENTO : b.estado === 'precaria' ? GRIS : PAPEL;
        if (b.sin) { x.fillStyle = PAPEL; x.font = '400 26px "Space Mono", monospace'; x.fillText('*', bx + bw + 12, y); }
        else { x.fillStyle = color; x.fillRect(bx, y, Math.round(bw * Math.max(0, Math.min(1, (b.pct || 0) / 100))), bh); }
        y += 60;
      });
    }
    x.fillStyle = PAPEL; x.font = '400 26px "Space Mono", monospace';
    x.fillText((d.pie || '').toUpperCase(), M, H - M - 26);
    x.textAlign = 'right'; x.fillText((d.fecha || '').toUpperCase(), W - M, H - M - 26); x.textAlign = 'left';
    return c;
  }
  function medir(x, t, f) { var prev = x.font; x.font = f; var w = x.measureText(t).width; x.font = prev; return w; }
  function parrafo(x, texto, px, py, ancho, lh) {
    var palabras = texto.split(' '), linea = '';
    palabras.forEach(function (p) {
      var prueba = linea ? linea + ' ' + p : p;
      if (x.measureText(prueba).width > ancho && linea) { x.fillText(linea, px, py); py += lh; linea = p; } else linea = prueba;
    });
    if (linea) { x.fillText(linea, px, py); py += lh; }
    return py;
  }

  /* ── hoja ── */
  var hoja, ultimoFoco;
  function abrir(d) {
    ultimoFoco = document.activeElement;
    if (!hoja) {
      hoja = document.createElement('div');
      hoja.className = 'hoja';
      hoja.innerHTML =
        '<div class="hoja__velo" data-cerrar></div>' +
        '<div class="hoja__panel" role="dialog" aria-modal="true" aria-labelledby="hoja-titulo">' +
        '<div class="hoja__cab"><span class="mono" id="hoja-titulo">compartir</span><span class="mono meta" style="margin-left:auto;margin-right:12px">png 1080×1350</span><button type="button" class="icono-btn" data-cerrar aria-label="cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div>' +
        '<div class="hoja__cuerpo"><div class="tarjeta-lienzo" data-lienzo></div><p class="mono-fon meta tarjeta-nota" data-nota></p>' +
        '<div class="hoja__acciones"><button type="button" class="btn btn--tinta btn--cta" data-png>descargar png</button><button type="button" class="btn btn--hueco btn--cta" data-enlace>copiar enlace</button></div>' +
        '<button type="button" class="btn btn--texto btn--cta" data-nativo hidden>compartir con otra app</button></div></div>';
      (document.querySelector('.app') || document.body).appendChild(hoja);
      hoja.addEventListener('click', function (e) { if (e.target.closest('[data-cerrar]')) cerrar(); });
      document.addEventListener('keydown', function (e) {
        if (!hoja.classList.contains('es-abierta')) return;
        if (e.key === 'Escape') cerrar();
        if (e.key === 'Tab') atrapar(e);
      });
    }
    var lienzo = hoja.querySelector('[data-lienzo]');
    lienzo.innerHTML = '';
    var previa = dibujar(d, 0.5); previa.style.width = '100%'; previa.style.height = 'auto'; previa.setAttribute('role', 'img');
    previa.setAttribute('aria-label', 'Tarjeta para compartir: ' + (d.titulo || d.cita || d.cab));
    lienzo.appendChild(previa);
    hoja.querySelector('[data-nota]').textContent = d.nota || '';
    hoja.querySelector('[data-png]').onclick = function () {
      var c = dibujar(d, 1);
      var a = document.createElement('a');
      a.download = (d.archivo || 'entrelampistas') + '.png';
      a.href = c.toDataURL('image/png');
      a.click();
      if (A.track) A.track('compartir_png', { formato: 'png', pieza: d.archivo || '' });
    };
    hoja.querySelector('[data-enlace]').onclick = function () { A.copiar(d.enlace, 'enlace copiado'); if (A.track) A.track('compartir_enlace', { formato: 'enlace', pieza: d.archivo || '' }); };
    var nativo = hoja.querySelector('[data-nativo]');
    nativo.hidden = !navigator.share;
    nativo.onclick = function () { navigator.share({ title: d.titulo || d.cab, text: d.texto || d.cita || '', url: d.enlace }).catch(function () {}); };
    hoja.classList.add('es-abierta');
    document.body.classList.add('con-hoja');
    hoja.querySelector('[data-cerrar][aria-label]').focus();
  }
  function cerrar() {
    hoja.classList.remove('es-abierta');
    document.body.classList.remove('con-hoja');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  function atrapar(e) {
    var f = hoja.querySelectorAll('button:not([hidden]), a[href]');
    if (!f.length) return;
    var primero = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }

  window.addEventListener('hashchange', function () { if (hoja && hoja.classList.contains('es-abierta')) cerrar(); });
  A.compartir = function (d) { abrir(d); };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-compartir]');
    if (!b) return;
    e.preventDefault();
    abrir(datos(b));
  });
})();
