/* ── Formularios de suscripción ── Entrelampistas ──
   ESTADO PROVISIONAL (22-jul-2026)

   No hay servicio de correo conectado: /api/subscribe no está desplegado y aún
   no se ha elegido proveedor. Hasta entonces, este script existe para dos
   cosas concretas:

   1. Que las 22 páginas dejen de pedir un /newsletter.js que devolvía 404.
   2. Que el formulario deje de mentir. Los <form> tienen
      action="javascript:void(0)" y no había ningún manejador desplegado: el
      visitante escribía su correo, pulsaba "Suscribirme" y no pasaba nada —
      ni alta, ni error, ni mensaje. Eso incumple WCAG 3.3.1 por omisión total
      de respuesta, y se comía las altas en silencio.

   La versión anterior de este fichero (nunca commiteada) guardaba el correo en
   localStorage y llamaba a showSuccess() incluso cuando la API fallaba. Sin
   endpoint, eso sería fingir un alta que no existe. Por eso no se despliega.

   CÓMO REVERTIR cuando haya proveedor: sustituir este fichero por el envío
   real, o poner un action nativo en los <form> y borrar este script.
   ─────────────────────────────────────────────────── */

(function () {
  var SELECTORES = [
    '.newsletter-form',
    '.footer-newsletter',
    '.newsletter-cta-form',
    '.cta-form',
    '.cta-capas-form',
    '.footer-form',
    '.hero-form'
  ].join(', ');

  var CORREO = 'entrelampistas@protonmail.com';

  function aviso(form) {
    var previo = form.parentNode.querySelector('.newsletter-aviso');
    if (previo) return previo;

    var p = document.createElement('p');
    p.className = 'newsletter-aviso';
    p.setAttribute('role', 'status');
    p.setAttribute('aria-live', 'polite');
    p.style.cssText = 'margin-top:.6rem;font-size:.78rem;line-height:1.5;';
    form.parentNode.insertBefore(p, form.nextSibling);
    return p;
  }

  function iniciar() {
    var forms = document.querySelectorAll(SELECTORES);

    Array.prototype.forEach.call(forms, function (form) {
      var input = form.querySelector('input[type="email"], input[name="email"]');

      if (input && !input.getAttribute('autocomplete')) {
        input.setAttribute('autocomplete', 'email');
      }

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();

        var valor = input ? input.value.trim() : '';
        var p = aviso(form);

        if (!valor || valor.indexOf('@') === -1) {
          p.textContent = 'Escribe un correo válido para continuar.';
          if (input) input.focus();
          return;
        }

        p.innerHTML =
          'El alta automática está temporalmente fuera de servicio. ' +
          'Escríbenos a <a href="mailto:' + CORREO +
          '?subject=Alta%20en%20la%20newsletter&amp;body=' + encodeURIComponent(valor) +
          '">' + CORREO + '</a> y te damos de alta a mano.';

        if (window.posthog && typeof window.posthog.capture === 'function') {
          window.posthog.capture('newsletter_intento_sin_proveedor', {
            url: window.location.pathname
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
