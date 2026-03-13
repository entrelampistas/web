(function () {
  // ── Article read (80% scroll) ─────────────────
  var articleTracked = false;
  window.addEventListener('scroll', function () {
    if (articleTracked) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && (scrollTop / docHeight) >= 0.8) {
      articleTracked = true;
      if (window.posthog) {
        posthog.capture('article_read', {
          article_title: document.title,
          url: window.location.pathname
        });
      }
    }
  }, { passive: true });

  // ── Content shared (click on share buttons) ───
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.share-btn, .footer-share-btn, [data-share]');
    if (!btn) return;

    var method = 'unknown';
    var label = (btn.getAttribute('aria-label') || '').toLowerCase();
    if (label.indexOf('linkedin') !== -1) method = 'linkedin';
    else if (label.indexOf(' x') !== -1 || label.indexOf('twitter') !== -1) method = 'twitter';
    else if (label.indexOf('correo') !== -1 || label.indexOf('mail') !== -1) method = 'email';
    else if (label.indexOf('instagram') !== -1) method = 'instagram';

    if (window.posthog) {
      posthog.capture('content_shared', {
        method: method,
        url: window.location.pathname
      });
    }
  });

  // ── Time spent (beforeunload) ─────────────────
  var pageLoadTime = Date.now();
  window.addEventListener('beforeunload', function () {
    var seconds = Math.round((Date.now() - pageLoadTime) / 1000);
    if (window.posthog) {
      posthog.capture('time_spent', {
        seconds: seconds,
        url: window.location.pathname
      });
    }
  });
  // ── Mobile nav toggle ────────────────────
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      links.classList.toggle('is-open', !open);
    });
  }
})();
