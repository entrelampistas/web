/* ── Consentimiento de analítica ── Entrelampistas ──
   PostHog se inicializa en línea en el <head> de cada página, así que empieza
   a capturar antes de que este script llegue a ejecutarse. Por eso lo primero
   que se hace aquí es desactivar la captura y solo reactivarla si hay
   consentimiento explícito guardado: consentimiento previo, no opt-out.
   ─────────────────────────────────────────────────── */

(function () {
  var KEY = 'ph_consent';

  function ph() { return window.posthog; }

  // Aplica la decisión en cuanto posthog esté disponible (puede cargar tarde).
  function aplicar(decision) {
    var intentos = 0;
    (function intentar() {
      var p = ph();
      if (p && typeof p.opt_out_capturing === 'function') {
        if (decision === 'granted') { p.opt_in_capturing(); }
        else { p.opt_out_capturing(); }
        return;
      }
      if (intentos++ < 50) { setTimeout(intentar, 100); }
    })();
  }

  var guardado = null;
  try { guardado = localStorage.getItem(KEY); } catch (e) { /* almacenamiento bloqueado */ }

  if (guardado === 'granted') { aplicar('granted'); return; }

  // Sin decisión o rechazado: no se captura.
  aplicar('denied');
  if (guardado === 'denied') { return; }

  // ── Banner ────────────────────────────────────────
  function montar() {
    var style = document.createElement('style');
    style.textContent = [
      '.consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;',
      'background:hsl(230,65%,28%);color:hsl(40,25%,96%);',
      'padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;',
      'font-family:system-ui,sans-serif;font-size:0.8rem;line-height:1.4;',
      'box-shadow:0 -2px 12px rgba(0,0,0,0.15);',
      'animation:consentSlide .3s ease-out}',
      '@media (prefers-reduced-motion: reduce){.consent-banner{animation:none}}',
      '@keyframes consentSlide{from{transform:translateY(100%)}to{transform:translateY(0)}}',
      '.consent-banner p{flex:1;min-width:200px;margin:0}',
      '.consent-btns{display:flex;gap:0.5rem;flex-shrink:0}',
      '.consent-btn{border:none;border-radius:4px;padding:0.6rem 1rem;min-height:44px;',
      'font-size:0.75rem;font-weight:500;cursor:pointer;transition:opacity .15s}',
      '.consent-btn:hover{opacity:0.85}',
      '.consent-btn:focus-visible{outline:2px solid hsl(40,25%,96%);outline-offset:2px}',
      '.consent-accept{background:hsl(40,25%,96%);color:hsl(230,65%,28%)}',
      '.consent-reject{background:transparent;color:hsl(40,25%,96%);',
      'border:1px solid hsla(40,25%,96%,0.6)}'
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p>Usamos cookies analíticas para entender cómo se lee el contenido. ' +
      'No vendemos datos ni mostramos publicidad.</p>' +
      '<div class="consent-btns">' +
      '<button type="button" class="consent-btn consent-reject" id="consentReject">Rechazar</button>' +
      '<button type="button" class="consent-btn consent-accept" id="consentAccept">Aceptar</button>' +
      '</div>';

    document.body.appendChild(banner);

    function decidir(valor) {
      try { localStorage.setItem(KEY, valor); } catch (e) { /* ignorar */ }
      aplicar(valor);
      banner.remove();
    }

    document.getElementById('consentAccept').addEventListener('click', function () { decidir('granted'); });
    document.getElementById('consentReject').addEventListener('click', function () { decidir('denied'); });
  }

  if (document.body) { montar(); }
  else { document.addEventListener('DOMContentLoaded', montar); }
})();
