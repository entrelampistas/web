(function () {
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
