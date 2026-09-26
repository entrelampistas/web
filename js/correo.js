/* entrelampistas · correo · un componente, tres estados (brief §4 Correo) */
(function () {
  var forms = document.querySelectorAll('.correo__form');
  Array.prototype.forEach.call(forms, function (form) {
    var input = form.querySelector('input[type="email"]');
    var boton = form.querySelector('button[type="submit"]');
    var estado = form.querySelector('.correo__estado');
    var etiqueta = boton.textContent;

    function aviso(html, clase) {
      estado.className = 'correo__estado ' + (clase || '');
      estado.innerHTML = html;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        aviso('<span class="aviso">escribe un correo completo, con arroba y punto</span>');
        input.focus();
        return;
      }
      boton.classList.add('es-cargando');
      boton.textContent = '···';
      aviso('');
      if (window.ela && ela.track) ela.track('correo_intento', { origen: location.pathname });
      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, origen: location.pathname })
      }).then(function (r) { return r.ok ? r.json() : Promise.reject(r); })
        .then(function () {
          input.hidden = true; boton.hidden = true;
          // 26-09-2026 · con confirmación por correo (Buttondown): el alta no vale hasta pulsar el enlace
          aviso('<span class="correo__ok mono">casi está · revisa tu correo y confirma</span>', 'es-exito');
          if (window.ela && ela.track) ela.track('correo_alta', { origen: location.pathname });
        })
        .catch(function (r) {
          boton.classList.remove('es-cargando');
          boton.textContent = etiqueta;
          aviso('<span class="aviso">no pudimos guardarlo, prueba otra vez</span>', 'es-error');
          if (window.ela && ela.track) ela.track('correo_error', { origen: location.pathname, motivo: (r && r.status) || 'red' });
          // fuera de producción se enseña el motivo para poder diagnosticar desde el móvil
          if (!/(^|\.)entrelampistas\.com$/i.test(location.hostname)) {
            var mostrar = function (t) { estado.insertAdjacentHTML('beforeend', '<span class="mono meta correo__motivo">' + String(t).replace(/[<>&]/g, '') + '</span>'); };
            if (r && r.json) r.json().then(function (j) { mostrar((r.status || '') + ' · ' + (j.motivo || j.error || '')); }, function () { mostrar(r.status || 'red'); });
            else mostrar('sin conexión');
          }
        });
    });
  });
})();
