/* entrelampistas · común · almacenamiento, guardar, estado de lectura, avisos */
(function () {
  var A = window.ela = window.ela || {};
  A.leer = A.leer || function (k, def) { try { var v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } };
  A.guardar = A.guardar || function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  /* aviso breve (2,2 s) · role=status */
  var zona;
  A.aviso = function (texto) {
    if (!zona) {
      zona = document.createElement('div');
      zona.className = 'aviso-flotante mono';
      zona.setAttribute('role', 'status'); zona.setAttribute('aria-live', 'polite');
      (document.querySelector('.app') || document.body).appendChild(zona);
    }
    zona.textContent = texto;
    zona.classList.add('es-visible');
    clearTimeout(zona._t);
    zona._t = setTimeout(function () { zona.classList.remove('es-visible'); }, 2200);
  };

  /* fecha «19 sep 2026» · «2 de septiembre» */
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  A.fechaCorta = function (iso) { var d = new Date(iso); return d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear(); };
  A.fechaLarga = function (iso) { var d = new Date(iso); return d.getDate() + ' de ' + MESES[d.getMonth()]; };

  /* guardar (cuadrado) */
  var guardados = A.leer('ela_guardados', {});
  Array.prototype.forEach.call(document.querySelectorAll('[data-guardar]'), function (b) {
    var id = b.getAttribute('data-guardar');
    b.setAttribute('aria-pressed', String(!!guardados[id]));
    b.addEventListener('click', function () {
      guardados = A.leer('ela_guardados', {});
      if (guardados[id]) delete guardados[id]; else guardados[id] = Date.now();
      A.guardar('ela_guardados', guardados);
      b.setAttribute('aria-pressed', String(!!guardados[id]));
      A.aviso(guardados[id] ? 'guardado en este dispositivo' : 'quitado de guardados');
    });
  });

  /* estado de lectura del ensayo, para mapas y tema: «n / 5», «leído», «en curso» · data-slug elige el ensayo, data-vacio el texto sin lectura */
  var lecturas = {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-lectura]'), function (el) {
    var modo = el.getAttribute('data-lectura');
    var slug = el.getAttribute('data-slug') || 'habitabilidad';
    if (!(slug in lecturas)) lecturas[slug] = A.leer('ela_lectura_' + slug, null);
    var lectura = lecturas[slug];
    if (!lectura || !lectura.secciones) { if (el.hasAttribute('data-vacio')) el.textContent = el.getAttribute('data-vacio'); else el.hidden = true; return; }
    var leidas = lectura.secciones.filter(Boolean).length;
    var total = Math.max(5, lectura.secciones.length);
    var texto = '';
    if (modo === 'fraccion') texto = lectura.terminado ? 'leído' : (leidas ? leidas + ' / ' + total : (el.getAttribute('data-vacio') || 'en curso'));
    if (modo === 'estado') texto = lectura.terminado ? 'leído' : 'en curso';
    el.textContent = texto;
    el.hidden = !texto;
    el.classList.add('es-propio'); // estado de quien lee: acento (brief §1)
  });

  /* copiar al portapapeles con aviso */
  A.copiar = function (texto, ok) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).then(function () { A.aviso(ok || 'copiado'); }, function () { A.aviso('no se pudo copiar'); });
    }
    A.aviso('no se pudo copiar');
    return Promise.resolve();
  };
})();
