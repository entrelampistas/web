(function () {
  // ── Skip-link (WCAG 2.4.1) ──────────────────
  // Se inyecta desde aquí y no en el HTML porque hay 21 páginas servidas con
  // el mismo <body>, cada una de 50-90 KB, y este sitio es legado: la v2 debe
  // llevarlo en la plantilla. Compromiso asumido: si falla el JS no hay
  // skip-link. Es mejor que la situación anterior, que era no tenerlo nunca.
  (function skipLink() {
    if (document.querySelector('.skip-link')) return;
    var destino = document.querySelector('main')
      || document.querySelector('[role="main"]')
      || document.querySelector('.page-enter');

    // La página de la herramienta no tiene <main>: su contenido es el primer
    // bloque del body que no sea navegación ni script.
    if (!destino) {
      var saltar = { NAV: 1, HEADER: 1, SCRIPT: 1, STYLE: 1, LINK: 1, A: 1 };
      var hijos = document.body.children;
      for (var i = 0; i < hijos.length; i++) {
        if (!saltar[hijos[i].tagName]) { destino = hijos[i]; break; }
      }
    }
    if (!destino) return;
    if (!destino.id) destino.id = 'main';

    var a = document.createElement('a');
    a.className = 'skip-link';
    a.href = '#' + destino.id;
    a.textContent = 'Saltar al contenido';

    // Estilos en línea además de la clase: hay páginas servidas que no cargan
    // main.css (donde vive .skip-link). Sin esto, en ellas el enlace saldría
    // visible en mitad de la cabecera.
    var OCULTO = 'position:absolute;left:-9999px;top:0;z-index:999;' +
      'padding:10px 16px;background:#1B3498;color:#F7F6F2;' +
      'font:400 .85rem system-ui,sans-serif;text-decoration:none;';
    a.style.cssText = OCULTO;
    a.addEventListener('focus', function () { a.style.left = '0'; });
    a.addEventListener('blur', function () { a.style.left = '-9999px'; });

    a.addEventListener('click', function () {
      // <main> no es enfocable por defecto: sin esto el foco se queda en el
      // enlace y el lector de pantalla no salta a ninguna parte.
      destino.setAttribute('tabindex', '-1');
      destino.focus();
    });
    document.body.insertBefore(a, document.body.firstChild);
  })();

  // ── Page-enter animation ────────────────────
  var mainEl = document.querySelector('.page-enter');
  if (mainEl) requestAnimationFrame(function () { mainEl.classList.add('visible'); });

  // ── Sticky header glassmorphism ─────────────
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile nav toggle ───────────────────────
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('is-open', !open);
    });
  }
})();
