/* entrelampistas · analítica con consentimiento previo.
   PostHog no se carga hasta que hay «aceptar» guardado. Sin decisión: aviso al pie. */
(function () {
  var KEY = 'ela_consent';
  var PH_KEY = 'phc_7vwoODVvDSUDBPBtM1AHLxIA8OnOwL93NFog7vA126q';
  var PH_HOST = 'https://eu.i.posthog.com';
  // Solo se mide en producción (entrelampistas.com y subdominios). Preview de Vercel y localhost nunca cargan
  // PostHog ni encolan eventos: cero ruido en los datos. Para QA del tracking, usar el dominio real.
  var PROD = /(^|\.)entrelampistas\.com$/i.test(location.hostname);
  var cola = [];

  window.ela = window.ela || {};
  if (!PROD) { window.ela.capture = function () {}; return; }

  window.ela.capture = function (nombre, props) {
    if (window.posthog && typeof window.posthog.capture === 'function') window.posthog.capture(nombre, props || {});
    else cola.push([nombre, props || {}]);
  };

  function leer() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* almacenamiento bloqueado */ } }

  function cargar() {
    if (window.posthog) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = PH_HOST.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
    s.onload = function () {
      if (!window.posthog || !window.posthog.init) return;
      window.posthog.init(PH_KEY, { api_host: PH_HOST, person_profiles: 'identified_only', capture_pageview: true, capture_pageleave: true, autocapture: false });
      cola.forEach(function (c) { window.posthog.capture(c[0], c[1]); });
      cola = [];
    };
    document.head.appendChild(s);
  }

  var decision = leer();
  if (decision === 'granted') { cargar(); return; }
  if (decision === 'denied') { cola = []; window.ela.capture = function () {}; return; }

  function montar() {
    var app = document.querySelector('.app') || document.body;
    var conPestanas = !!document.querySelector('.pestanas');
    var aviso = document.createElement('div');
    aviso.className = 'consentimiento' + (conPestanas ? ' consentimiento--sobre-pestanas' : '');
    aviso.setAttribute('role', 'region');
    aviso.setAttribute('aria-label', 'Aviso de analítica');
    aviso.innerHTML =
      '<p class="cuerpo">Usamos analítica para entender cómo se lee. Sin publicidad ni venta de datos.</p>' +
      '<div class="consentimiento__botones">' +
      '<button type="button" class="btn btn--hueco" data-consent="denied">rechazar</button>' +
      '<button type="button" class="btn btn--tinta" data-consent="granted">aceptar</button>' +
      '</div>';
    app.appendChild(aviso);
    aviso.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var v = b.getAttribute('data-consent');
      guardar(v);
      aviso.remove();
      if (v === 'granted') cargar(); else { cola = []; window.ela.capture = function () {}; }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
