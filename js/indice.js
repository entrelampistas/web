/* entrelampistas · índice de habitabilidad digital
   Reglas: design/docs/mapa-pantallas.md §Índice. Estado en localStorage, cálculo en cliente, tarjeta PNG con canvas.
   Rutas por hash: '' portada · q1…q10 · resultado · dimensiones · empezar · apps */
(function () {
  var A = window.ela;
  var D = JSON.parse(document.getElementById('datos-indice').textContent);
  var K_BORRADOR = 'ela_indice_borrador', K_INDICES = 'ela_indices';
  var raiz = document.querySelector('[data-indice]');
  var vistas = { portada: raiz.querySelector('[data-vista="portada"]'), pregunta: raiz.querySelector('[data-vista="pregunta"]'), resultado: raiz.querySelector('[data-vista="resultado"]') };
  var cab = document.querySelector('.cabecera--pieza');
  var cabRuta = cab.querySelector('[data-ruta]'), cabMeta = cab.querySelector('[data-meta]'), cabVolver = cab.querySelector('[data-volver]');
  var cabDer = cab.querySelector('.cabecera__der');
  var DIMS = D.dimensiones, CON_MARGEN = DIMS.filter(function (d) { return !d.condicion; });
  var TOTAL = 10;

  var borrador = A.leer(K_BORRADOR, null) || { respuestas: {}, apps: {}, paso: 0 };
  var indices = A.leer(K_INDICES, []);
  var resultado = null;

  /* ── utilidades ── */
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function guardarBorrador() { A.guardar(K_BORRADOR, borrador); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function estadoDe(p, sin) { if (sin === 2) return 'sin'; return p >= 5 ? 'habitable' : p >= 3 ? 'precaria' : 'capturada'; }
  function plural(n, s) { return n + ' ' + s + (n === 1 ? '' : 's'); }
  function appDe(dim) { var a = borrador.apps[dim.id]; if (!a) return ''; return a.indexOf('Otra:') === 0 ? a.slice(5) : a; }
  function conApp(texto, dim, app) {
    var fb = dim.appFallback || {};
    return texto
      .replace('{de_app}', app ? ' de ' + app : (fb.de_app || ''))
      .replace('{en_app}', app ? ' en ' + app : (fb.en_app || ' en la app que más usas'))
      .replace('{En_app}', app ? 'En ' + app : (fb.En_app || 'En la app que más usas'));
  }
  function setCab(ruta, meta, opciones) {
    opciones = opciones || {};
    cabRuta.textContent = ruta;
    cabMeta.textContent = meta || ''; cabMeta.hidden = !meta;
    var viejo = cabDer.querySelector('[data-compartir-cab]'); if (viejo) viejo.remove();
    if (opciones.compartir) cabDer.insertAdjacentHTML('beforeend', '<button type="button" class="icono-btn" data-compartir-cab aria-label="Compartir"><svg viewBox="0 0 14 14" aria-hidden="true" style="width:18px;height:18px"><polyline points="7,9 7,1"/><polyline points="3.5,4.5 7,1 10.5,4.5"/><polyline points="1,8 1,13 13,13 13,8"/></svg></button>');
    cabVolver.setAttribute('aria-label', opciones.cerrar ? 'salir · se guarda lo respondido' : 'volver');
    cabVolver.setAttribute('title', opciones.cerrar ? 'salir · se guarda lo respondido' : '');
    cabVolver.innerHTML = opciones.cerrar
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="20" y1="12" x2="4" y2="12"/><polyline points="10,6 4,12 10,18"/></svg>';
    cabVolver.setAttribute('href', opciones.volver || '/habitabilidad');
    if (opciones.hashAtras) cabVolver.setAttribute('data-hash', opciones.hashAtras); else cabVolver.removeAttribute('data-hash');
  }
  function mostrar(nombre) {
    Object.keys(vistas).forEach(function (k) { vistas[k].hidden = k !== nombre; });
    window.scrollTo({ top: 0, behavior: 'instant' });
    var m = document.getElementById('contenido'); if (m) m.focus({ preventScroll: true });
  }
  function ir(hash) { if (location.hash.slice(1) === hash) enrutar(); else location.hash = hash; }

  /* ── cálculo (mapa-pantallas §Índice) ── */
  function calcular() {
    var dims = {}, sin = [], apps = {};
    DIMS.forEach(function (d, di) {
      var p = 0, s = 0;
      d.preguntas.forEach(function (q, qi) {
        var r = borrador.respuestas[di * 2 + qi];
        if (r === undefined || r === null || r === 'nose') s++; else p += D.puntos[r];
      });
      dims[d.id] = p;
      if (s) sin.push(d.id);
      var app = appDe(d); if (app) apps[d.id] = app;
    });
    var suma = CON_MARGEN.reduce(function (t, d) { return t + dims[d.id]; }, 0);
    var indice = Math.round(suma / 24 * 100);
    var estados = {}; DIMS.forEach(function (d) { estados[d.id] = estadoDe(dims[d.id], sin.indexOf(d.id) >= 0 ? 2 : 0); });
    var capturadas = CON_MARGEN.filter(function (d) { return estados[d.id] === 'capturada'; }).length;
    var estructura = estados.estructura;
    var titulo = 'medio';
    if (indice >= 75 && estructura !== 'capturada') titulo = 'habitable';
    if (indice < 40 || capturadas >= 2 || (estructura === 'capturada' && indice < 60)) titulo = 'poco';
    var empezar = CON_MARGEN.slice().sort(function (a, b) { return dims[a.id] - dims[b.id]; })[0].id;
    return { fecha: new Date().toISOString(), indice: indice, dimensiones: dims, estados: estados, apps: apps, empezar: empezar, titulo: titulo, sinResponder: sin };
  }
  function terminar() {
    resultado = calcular();
    indices = A.leer(K_INDICES, []);
    indices.push({ fecha: resultado.fecha, indice: resultado.indice, dimensiones: resultado.dimensiones, apps: resultado.apps, empezar: resultado.empezar, sinResponder: resultado.sinResponder });
    while (indices.length > 6) indices.shift();
    A.guardar(K_INDICES, indices);
    borrador = { respuestas: {}, apps: {}, paso: 0 };
    try { localStorage.removeItem(K_BORRADOR); } catch (e) {}
    if (A.track) A.track('indice_terminado', { indice: resultado.indice, titulo: resultado.titulo });
    ir('resultado');
  }
  function resultadoDe(registro) {
    if (!registro) return null;
    var estados = {}; DIMS.forEach(function (d) { estados[d.id] = estadoDe(registro.dimensiones[d.id] || 0, (registro.sinResponder || []).indexOf(d.id) >= 0 ? 2 : 0); });
    var capturadas = CON_MARGEN.filter(function (d) { return estados[d.id] === 'capturada'; }).length;
    var titulo = 'medio';
    if (registro.indice >= 75 && estados.estructura !== 'capturada') titulo = 'habitable';
    if (registro.indice < 40 || capturadas >= 2 || (estados.estructura === 'capturada' && registro.indice < 60)) titulo = 'poco';
    return { fecha: registro.fecha, indice: registro.indice, dimensiones: registro.dimensiones, estados: estados, apps: registro.apps || {}, empezar: registro.empezar, titulo: titulo, sinResponder: registro.sinResponder || [] };
  }

  /* ── portada ── */
  function pintarPortada() {
    var lista = vistas.portada.querySelector('[data-portada-dimensiones]');
    lista.innerHTML = DIMS.map(function (d, i) {
      return '<li><span class="num">' + pad(i + 1) + '</span><span><span class="nombre">' + esc(d.nombre) + (d.condicion ? ' <span class="condicion">— condición</span>' : '') + '</span><span class="pregunta-dim">' + esc(d.pregunta) + '</span></span></li>';
    }).join('');
    var ultimo = indices[indices.length - 1];
    var anterior = vistas.portada.querySelector('[data-portada-anterior]');
    var boton = vistas.portada.querySelector('[data-empezar]');
    var respondidas = Object.keys(borrador.respuestas).length;
    if (respondidas > 0 && respondidas < TOTAL) {
      boton.textContent = D.portada.botonContinuar;
      anterior.hidden = true;
    } else if (ultimo) {
      boton.textContent = D.portada.botonRepetir;
      anterior.textContent = D.portada.anterior.replace('{fecha}', A.fechaLarga(ultimo.fecha)).replace('{indice}', ultimo.indice);
      anterior.hidden = false;
    } else { boton.textContent = D.portada.boton; anterior.hidden = true; }
    setCab('habitabilidad digital', '', { volver: '/habitabilidad' });
    mostrar('portada');
  }
  vistas.portada.querySelector('[data-empezar]').addEventListener('click', function () {
    var respondidas = Object.keys(borrador.respuestas).length;
    if (respondidas >= TOTAL) borrador = { respuestas: {}, apps: {}, paso: 0 };
    var paso = respondidas > 0 && respondidas < TOTAL ? Math.min(TOTAL, (borrador.paso || respondidas) + 1) : 1;
    if (A.track) A.track('indice_empezado', { desde: respondidas ? 'continuar' : 'portada' });
    ir('q' + paso);
  });

  /* ── preguntas ── */
  var actual = 1;
  function pintarPregunta(n) {
    actual = n;
    var di = Math.floor((n - 1) / 2), qi = (n - 1) % 2, dim = DIMS[di], q = dim.preguntas[qi];
    var idx = n - 1, elegida = borrador.respuestas[idx];
    var hay = elegida !== undefined && elegida !== null;
    setCab('índice de habitabilidad', pad(n) + ' / ' + TOTAL, { cerrar: true, volver: '/habitabilidad' });
    var pasos = vistas.pregunta.querySelector('[data-pasos]');
    pasos.innerHTML = '';
    for (var i = 0; i < TOTAL; i++) {
      var s = document.createElement('span');
      var r = borrador.respuestas[i];
      if (i === idx) s.className = 'es-actual'; else if (r !== undefined && r !== null) s.className = 'es-respondida';
      pasos.appendChild(s);
    }
    var cuerpo = vistas.pregunta.querySelector('[data-pregunta-cuerpo]');
    var opciones = q.opciones.map(function (op, i) {
      return '<button type="button" class="opcion" role="radio" aria-checked="' + (elegida === i) + '" data-opcion="' + i + '"><span class="opcion__caja" aria-hidden="true"></span><span>' + esc(op) + '</span><span class="opcion__letra" aria-hidden="true">' + 'abcd'[i] + '</span></button>';
    }).join('') + '<button type="button" class="opcion opcion--nose" role="radio" aria-checked="' + (elegida === 'nose') + '" data-opcion="nose"><span class="opcion__caja" aria-hidden="true"></span><span>' + esc(D.noSe) + '</span><span class="opcion__letra" aria-hidden="true">·</span></button>';
    var html;
    if (qi === 0) {
      html = '<div class="q-dim"><p class="mono meta">dimensión ' + (di + 1) + ' de 5' + (dim.condicion ? ' — la condición' : '') + '</p><h2 class="q-dim__nombre">' + esc(dim.nombre) + '</h2><p class="q-dim__intro">' + esc(dim.intro) + '</p></div>' +
        '<div class="q-bloque sobre-tinta" role="radiogroup" aria-labelledby="q-texto"><p class="q-bloque__cab mono"><span>pregunta 1 de 2</span></p><p class="q-bloque__texto" id="q-texto">' + esc(q.texto) + '</p><div class="opciones' + (hay ? ' hay-eleccion' : '') + '">' + opciones + '</div></div>';
    } else {
      var app = borrador.apps[dim.id] || '';
      var otra = app.indexOf('Otra:') === 0;
      html = '<div class="q-segunda" role="radiogroup" aria-labelledby="q-texto"><p class="mono meta">dimensión ' + (di + 1) + ' de 5 · pregunta 2 de 2</p><h2 class="q-segunda__texto" id="q-texto">' + esc(q.texto) + '</h2><div class="opciones' + (hay ? ' hay-eleccion' : '') + '">' + opciones + '</div></div>' +
        '<div class="q-app"><p class="q-app__cab"><span class="q-app__pregunta">' + esc(q.app) + '</span><span class="mono meta">opcional</span></p><div class="chips" role="group" aria-label="' + esc(q.app) + '">' +
        D.apps.concat([D.otra.etiqueta]).map(function (a) { var el = a === D.otra.etiqueta ? otra : app === a; return '<button type="button" class="chip' + (el ? ' chip--elegido' : '') + '" aria-pressed="' + el + '" data-app="' + esc(a) + '">' + esc(a) + '</button>'; }).join('') +
        '</div><input class="q-app__otra" type="text" maxlength="' + D.otra.max + '" placeholder="' + esc(D.otra.placeholder) + '" aria-label="' + esc(D.otra.placeholder) + '" data-app-otra value="' + esc(otra ? app.slice(5) : '') + '"' + (otra ? '' : ' hidden') + '><p class="mono-fon meta">elige solo una</p></div>';
    }
    cuerpo.innerHTML = html;
    var sig = vistas.pregunta.querySelector('[data-siguiente]');
    sig.textContent = n === TOTAL ? 'ver mi índice' : (qi === 1 ? 'siguiente dimensión' : 'siguiente');
    sig.classList.toggle('btn--atenuado', !hay);
    sig.setAttribute('aria-disabled', String(!hay));
    vistas.pregunta.querySelector('[data-anterior]').style.visibility = n === 1 ? 'hidden' : 'visible';
    mostrar('pregunta');
    if (A.track) A.track('indice_paso', { paso: n, dimension: dim.id, pregunta: qi + 1, respondida: hay });
  }
  function elegir(valor) {
    var idx = actual - 1;
    borrador.respuestas[idx] = valor === 'nose' ? 'nose' : Number(valor);
    borrador.paso = Math.max(borrador.paso || 0, actual);
    guardarBorrador();
    var zona = vistas.pregunta.querySelector('.opciones');
    zona.classList.add('hay-eleccion');
    Array.prototype.forEach.call(zona.querySelectorAll('[data-opcion]'), function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-opcion') === String(valor))); });
    var sig = vistas.pregunta.querySelector('[data-siguiente]');
    sig.classList.remove('btn--atenuado'); sig.setAttribute('aria-disabled', 'false');
  }
  function siguiente() {
    var idx = actual - 1;
    var r = borrador.respuestas[idx];
    if (r === undefined || r === null) return;
    if (actual >= TOTAL) { terminar(); return; }
    ir('q' + (actual + 1));
  }
  function saltar() {
    borrador.respuestas[actual - 1] = 'nose';
    borrador.paso = Math.max(borrador.paso || 0, actual);
    guardarBorrador();
    if (actual >= TOTAL) { terminar(); return; }
    ir('q' + (actual + 1));
  }
  vistas.pregunta.addEventListener('click', function (e) {
    var op = e.target.closest('[data-opcion]');
    if (op) { elegir(op.getAttribute('data-opcion')); return; }
    var app = e.target.closest('[data-app]');
    if (app) {
      var dim = DIMS[Math.floor((actual - 1) / 2)];
      var nombre = app.getAttribute('data-app');
      var otra = vistas.pregunta.querySelector('[data-app-otra]');
      var ya = app.getAttribute('aria-pressed') === 'true';
      Array.prototype.forEach.call(vistas.pregunta.querySelectorAll('[data-app]'), function (b) { b.setAttribute('aria-pressed', 'false'); b.classList.remove('chip--elegido'); });
      if (ya) { delete borrador.apps[dim.id]; otra.hidden = true; }
      else {
        app.setAttribute('aria-pressed', 'true'); app.classList.add('chip--elegido');
        if (nombre === D.otra.etiqueta) { otra.hidden = false; otra.focus(); borrador.apps[dim.id] = 'Otra:' + (otra.value || '').trim(); }
        else { otra.hidden = true; borrador.apps[dim.id] = nombre; }
      }
      guardarBorrador();
      return;
    }
    if (e.target.closest('[data-siguiente]')) siguiente();
    if (e.target.closest('[data-anterior]')) { if (actual > 1) ir('q' + (actual - 1)); }
    if (e.target.closest('[data-saltar]')) saltar();
  });
  vistas.pregunta.addEventListener('input', function (e) {
    var otra = e.target.closest('[data-app-otra]');
    if (!otra) return;
    var dim = DIMS[Math.floor((actual - 1) / 2)];
    borrador.apps[dim.id] = 'Otra:' + otra.value.trim().slice(0, D.otra.max);
    guardarBorrador();
  });
  document.addEventListener('keydown', function (e) {
    if (vistas.pregunta.hidden) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var k = e.key.toLowerCase();
    if ('abcd'.indexOf(k) >= 0 && k.length === 1) { elegir('abcd'.indexOf(k)); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { siguiente(); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { if (actual > 1) ir('q' + (actual - 1)); e.preventDefault(); }
    else if (k === 's') { saltar(); e.preventDefault(); }
  });

  /* ── resultado ── */
  function punto(estado) { return '<span class="punto punto--' + estado + '" aria-hidden="true"></span>'; }
  function nombreDim(id) { return DIMS.filter(function (d) { return d.id === id; })[0]; }
  function cuentaEstados(R) {
    var c = { habitable: 0, precaria: 0, capturada: 0 };
    CON_MARGEN.forEach(function (d) { var e = R.estados[d.id]; if (c[e] !== undefined) c[e]++; });
    var partes = [];
    if (c.habitable) partes.push(plural(c.habitable, 'habitable'));
    if (c.precaria) partes.push(plural(c.precaria, 'precaria'));
    if (c.capturada) partes.push(plural(c.capturada, 'capturada'));
    if (!partes.length) return 'cuatro sin responder';
    return partes.length > 1 ? partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1] : partes[0];
  }
  function barraHtml(d, R, enTarjeta) {
    var e = R.estados[d.id], p = R.dimensiones[d.id] || 0, pct = Math.round(p / 6 * 100);
    var estadoTxt = d.condicion ? 'condición' : (e === 'sin' ? 'sin responder' : e);
    var relleno = e === 'sin' ? '<span class="r-barra__relleno barra__relleno--sin" style="width:100%"></span>' : '<span class="r-barra__relleno barra__relleno--' + e + '" style="width:' + pct + '%"></span>';
    return '<div class="r-barra' + (d.condicion ? ' r-barra--estructura' : '') + '"><span class="mono">' + esc(d.nombre) + '</span><span class="r-barra__pista" role="img" aria-label="' + esc(d.nombre) + ': ' + p + ' de 6, ' + estadoTxt + '">' + relleno + '</span><span class="r-barra__estado">' + estadoTxt + (e === 'sin' ? ' *' : '') + '</span></div>';
  }
  function textoLectura(d, R) {
    var e = R.estados[d.id];
    if (e === 'sin') return D.resultado.sinResponder;
    return d.lecturas[e];
  }
  function tarjetaDatos(R) {
    return {
      cab: D.resultado.tarjeta.cab, cifra: R.indice, titulo: D.resultado.titulos[R.titulo],
      barras: DIMS.map(function (d) { var e = R.estados[d.id]; return { nombre: d.nombre, pct: Math.round((R.dimensiones[d.id] || 0) / 6 * 100), estado: e, estructura: !!d.condicion, sin: e === 'sin' }; }),
      pie: D.resultado.tarjeta.pie, fecha: A.fechaCorta(R.fecha), enlace: 'https://www.entrelampistas.com/indice', nota: D.resultado.tarjeta.nota,
      texto: 'Índice de habitabilidad digital · ' + R.indice + ' de 100 · ' + D.resultado.titulos[R.titulo], archivo: 'entrelampistas-indice-' + R.indice
    };
  }
  function textoPlano(R) {
    return 'Índice de habitabilidad digital · ' + R.indice + '/100 · ' + D.resultado.titulos[R.titulo] + '\n' +
      DIMS.map(function (d) { return d.nombre.toLowerCase() + ' ' + (R.estados[d.id] === 'sin' ? 'sin responder' : R.estados[d.id]) + (d.condicion ? ' (condición)' : ''); }).join(' · ') + '\n' +
      A.fechaCorta(R.fecha) + ' · entrelampistas.com/indice';
  }

  function pintarResultado(vista) {
    var R = resultado || resultadoDe(indices[indices.length - 1]);
    var zona = vistas.resultado;
    if (!R) {
      zona.innerHTML = '<div class="vacio r-vacio"><p class="titulo">Todavía no hay índice en este dispositivo.</p><p class="mono meta">diez preguntas · tres minutos</p><a class="btn btn--acento btn--cta" href="#" data-ir-portada style="margin-top:16px">calcular mi índice</a></div>';
      setCab('tu índice', '', { volver: '/habitabilidad' });
      mostrar('resultado'); return;
    }
    resultado = R;
    var estructuraE = R.estados.estructura;
    var html = '';
    if (vista === 'resultado') {
      setCab('tu índice · ' + A.fechaCorta(R.fecha), '', { compartir: true, volver: '/habitabilidad', hashAtras: '' });
      var plantilla = CON_MARGEN.some(function (d) { return R.estados[d.id] === 'capturada'; }) ? D.resultado.lead : D.resultado.leadSinCapturadas;
      var lead = plantilla.replace('{indice}', R.indice).replace('{cuenta}', cuentaEstados(R)).replace('{estructura}', estructuraE === 'sin' ? 'sin responder' : estructuraE);
      html += '<div class="r-cab"><h2 class="r-titulo">' + esc(D.resultado.titulos[R.titulo]) + '</h2><p class="r-lead">' + esc(lead) + '</p></div>';
      html += '<div class="r-cifra"><span class="r-cifra__num">' + R.indice + '</span><span class="mono meta r-cifra__sub">/ 100<br>' + esc(D.resultado.subcifra) + '</span></div>';
      html += '<div class="r-barras">' + DIMS.map(function (d) { return barraHtml(d, R); }).join('') +
        '<p class="leyenda r-leyenda"><span class="es-habitable">habitable</span><span>precaria</span><span class="es-capturada">capturada</span></p></div>';
      html += '<p class="r-como"><b>Cómo leer este número.</b> ' + esc(D.resultado.comoLeer) + '</p>';
      html += '<div class="r-pie"><a class="btn btn--tinta btn--cta" href="#dimensiones">ver por dimensión</a><button type="button" class="btn btn--hueco btn--cta" data-compartir-res><svg viewBox="0 0 14 14" aria-hidden="true"><polyline points="7,9 7,1"/><polyline points="3.5,4.5 7,1 10.5,4.5"/><polyline points="1,8 1,13 13,13 13,8"/></svg> compartir</button></div>';
    }
    if (vista === 'dimensiones') {
      setCab('tu índice · por dimensión', R.indice + ' / 100', { volver: '#resultado', hashAtras: 'resultado' });
      var porApp = {};
      CON_MARGEN.forEach(function (d) { if (R.estados[d.id] === 'capturada' && R.apps[d.id]) porApp[R.apps[d.id]] = (porApp[R.apps[d.id]] || 0) + 1; });
      var capturadasN = CON_MARGEN.filter(function (d) { return R.estados[d.id] === 'capturada'; }).length + (estructuraE === 'capturada' ? 1 : 0);
      var repetida = Object.keys(porApp).filter(function (a) { return porApp[a] >= 2; })[0];
      if (repetida) html += '<p class="r-aviso"><b>' + esc(repetida) + '</b> ' + esc(D.resultado.appRepetida.replace('{app} ', '').replace('{n}', porApp[repetida]).replace('{total}', capturadasN)) + '</p>';
      html += '<div class="r-dims">' + DIMS.map(function (d) {
        var e = R.estados[d.id], app = R.apps[d.id];
        var gesto = '';
        if (!d.condicion && e === 'capturada' && d.id !== R.empezar) gesto = '<p class="r-dim__gesto"><b>Primer gesto.</b> ' + esc(conApp(d.gesto, d, app)) + '</p>';
        return '<div class="r-dim' + (d.condicion ? ' r-dim--estructura' : '') + '"><p class="r-dim__cab">' + punto(e === 'sin' ? 'precaria' : e) + '<span class="r-dim__nombre">' + esc(d.nombre) + '</span><span class="mono meta">' + (e === 'sin' ? 'sin responder' : e) + (d.condicion ? ' · condición' : '') + '</span>' + (app ? '<span class="r-dim__app">' + esc(app) + '</span>' : '') + '</p><p class="r-dim__texto">' + esc(textoLectura(d, R)) + '</p>' + gesto + '</div>';
      }).join('') + '</div>';
      html += '<div class="r-pie r-pie--una"><a class="btn btn--acento btn--cta" href="#empezar">por dónde empezar</a></div>';
    }
    if (vista === 'empezar') {
      setCab('tu índice · por dónde empezar', R.indice + ' / 100', { volver: '#dimensiones', hashAtras: 'dimensiones' });
      var dimE = nombreDim(R.empezar), appE = R.apps[R.empezar];
      html += '<div class="r-empezar sobre-tinta"><p class="mono r-empezar__cab">' + esc(D.resultado.empezar.cab) + '</p><h2 class="r-empezar__nombre">' + esc(dimE.nombre) + '</h2><p class="r-empezar__linea">' + esc(D.resultado.empezar.linea) + '</p><p class="r-empezar__gesto"><b>' + esc(D.resultado.empezar.gesto) + '</b> ' + esc(conApp(dimE.gesto, dimE, appE)) + '</p></div>';
      var est = nombreDim('estructura');
      if (estructuraE === 'capturada' || estructuraE === 'precaria') {
        var b = est.bloque[estructuraE];
        html += '<div class="r-estructura"><p class="mono meta">' + esc(b.cab) + '</p><h3 class="r-estructura__titulo">' + esc(b.titulo) + '</h3><p class="r-estructura__texto">' + esc(b.texto) + '</p><p class="r-estructura__gesto"><b>Primer gesto.</b> ' + esc(conApp(est.gesto, est, R.apps.estructura)) + '</p></div>';
      }
      var hayApps = Object.keys(R.apps).length > 0, hayAntes = indices.length >= 2;
      if (hayApps || hayAntes) html += '<div class="r-enlace"><a class="enlace-fila mono" href="#apps"><span>' + (hayApps && hayAntes ? 'por app y antes' : hayApps ? 'por app' : 'antes y ahora') + '</span><span aria-hidden="true">›</span></a></div>';
      html += '<div class="r-pie" style="border-top:0"><button type="button" class="btn btn--tinta btn--cta" data-compartir-res>descargar tarjeta</button><button type="button" class="btn btn--hueco btn--cta" data-copiar-texto>copiar como texto</button><button type="button" class="btn btn--texto" data-repetir>repetir el índice</button></div>';
    }
    if (vista === 'apps') {
      setCab('tu índice · por app y antes', R.indice + ' / 100', { volver: '#empezar', hashAtras: 'empezar' });
      var appsMap = {};
      DIMS.forEach(function (d) { var a = R.apps[d.id]; if (a) (appsMap[a] = appsMap[a] || []).push(d); });
      var nombresApps = Object.keys(appsMap);
      if (nombresApps.length) {
        html += '<section class="r-seccion" aria-labelledby="r-porapp"><h2 class="r-seccion__titulo" id="r-porapp">Por app</h2><div class="r-tabla">' + nombresApps.map(function (a) {
          var ds = appsMap[a], cap = ds.filter(function (d) { return R.estados[d.id] === 'capturada'; }).length;
          return '<div class="r-tabla__fila"><span class="r-tabla__nombre">' + esc(a) + '</span><span class="r-tabla__celda">' + ds.map(function (d) { return '<span class="estado" style="color:var(--tinta-2);text-transform:none;letter-spacing:0;font-family:var(--font-display);font-size:13px">' + punto(R.estados[d.id] === 'sin' ? 'precaria' : R.estados[d.id]) + esc(d.nombre) + '</span>'; }).join('') + (cap >= 2 ? '<span class="mono meta">capturada en ' + cap + ' de ' + ds.length + '</span>' : '') + '</span></div>';
        }).join('') + '</div></section>';
      }
      if (indices.length >= 2) {
        var prev = resultadoDe(indices[indices.length - 2]);
        var tend = function (a, b) { return b > a ? '<span class="mono meta">mejor</span>' : b < a ? '<span class="mono meta">peor</span>' : ''; };
        var orden = { capturada: 0, sin: 0, precaria: 1, habitable: 2 };
        html += '<section class="r-seccion" aria-labelledby="r-antes"><h2 class="r-seccion__titulo" id="r-antes">Antes y ahora</h2><div class="r-tabla">' +
          '<div class="r-tabla__fila" style="align-items:center"><span class="r-tabla__nombre">Índice</span><span class="r-tabla__celda mono-num"><span>' + prev.indice + '</span><span class="r-tabla__flecha">→</span><b>' + R.indice + '</b>' + tend(prev.indice, R.indice) + '</span></div>' +
          DIMS.map(function (d) {
            var a = prev.estados[d.id], b = R.estados[d.id];
            return '<div class="r-tabla__fila" style="align-items:center"><span class="r-tabla__nombre">' + esc(d.nombre) + '</span><span class="r-tabla__celda"><span class="estado">' + punto(a === 'sin' ? 'precaria' : a) + a + '</span><span class="r-tabla__flecha">→</span><span class="estado">' + punto(b === 'sin' ? 'precaria' : b) + b + '</span>' + tend(orden[a], orden[b]) + '</span></div>';
          }).join('') + '</div><p class="mono-fon meta">índice anterior: ' + esc(A.fechaLarga(prev.fecha)) + '</p></section>';
      }
      html += '<div class="r-pie r-pie--una" style="border-top:0"><button type="button" class="btn btn--texto" data-repetir>repetir el índice</button></div>';
    }
    zona.innerHTML = html;
    mostrar('resultado');
  }
  vistas.resultado.addEventListener('click', function (e) {
    if (e.target.closest('[data-compartir-res]')) { e.preventDefault(); A.compartir(tarjetaDatos(resultado)); }
    if (e.target.closest('[data-copiar-texto]')) { A.copiar(textoPlano(resultado), 'copiado como texto'); }
    if (e.target.closest('[data-repetir]')) { borrador = { respuestas: {}, apps: {}, paso: 0 }; guardarBorrador(); ir('q1'); }
    if (e.target.closest('[data-ir-portada]')) { e.preventDefault(); ir(''); }
  });
  cab.addEventListener('click', function (e) {
    if (e.target.closest('[data-compartir-cab]')) { A.compartir(tarjetaDatos(resultado)); return; }
    var v = e.target.closest('[data-volver]');
    if (v && v.hasAttribute('data-hash')) { e.preventDefault(); ir(v.getAttribute('data-hash')); }
  });

  /* ── enrutado por hash ── */
  function enrutar() {
    var hs = location.hash.slice(1);
    if (/^q([1-9]|10)$/.test(hs)) { pintarPregunta(parseInt(hs.slice(1), 10)); return; }
    if (hs === 'resultado' || hs === 'dimensiones' || hs === 'empezar' || hs === 'apps') { pintarResultado(hs); return; }
    if (hs === 'empezar-q2') { location.replace('#q2'); return; }
    pintarPortada();
  }
  window.addEventListener('hashchange', enrutar);
  // desde el feed: la primera pregunta ya respondida abre en q2
  if (!location.hash && borrador.desde === 'feed' && borrador.respuestas[0] !== undefined) {
    delete borrador.desde; guardarBorrador();
    location.replace('#q2');
  } else if (location.hash === '#empezar' && borrador.respuestas[0] !== undefined && Object.keys(borrador.respuestas).length < TOTAL) {
    delete borrador.desde; guardarBorrador();
    location.replace('#q2');
  }
  enrutar();
})();
