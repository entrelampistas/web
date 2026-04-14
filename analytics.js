(function () {
  var ph = function () { return window.posthog; };

  // ── UTM capture on first visit ───────────────
  var params = new URLSearchParams(window.location.search);
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utms = {};
  var hasUtm = false;
  utmKeys.forEach(function (k) {
    var v = params.get(k);
    if (v) { utms[k] = v; hasUtm = true; }
  });
  if (hasUtm && ph()) {
    ph().capture('utm_captured', utms);
    ph().register(utms);
  }

  // ── Scroll depth tracking (25/50/75/100%) ────
  var scrollMarkers = { 25: false, 50: false, 75: false, 100: false };
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var pct = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 100].forEach(function (mark) {
      if (!scrollMarkers[mark] && pct >= mark) {
        scrollMarkers[mark] = true;
        if (ph()) {
          ph().capture('scroll_depth', {
            depth: mark,
            url: window.location.pathname,
            title: document.title
          });
        }
      }
    });
  }, { passive: true });

  // ── Article read (80% scroll) ─────────────────
  var articleTracked = false;
  window.addEventListener('scroll', function () {
    if (articleTracked) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && (scrollTop / docHeight) >= 0.8) {
      articleTracked = true;
      if (ph()) {
        ph().capture('article_read', {
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
    else if (label.indexOf('whatsapp') !== -1) method = 'whatsapp';

    if (ph()) {
      ph().capture('content_shared', {
        method: method,
        url: window.location.pathname
      });
    }
  });

  // ── Time on content (buckets on unload) ───────
  var pageLoadTime = Date.now();
  function getTimeBucket(seconds) {
    if (seconds < 30) return '<30s';
    if (seconds < 120) return '30s-2m';
    if (seconds < 300) return '2-5m';
    if (seconds < 600) return '5-10m';
    return '>10m';
  }
  window.addEventListener('beforeunload', function () {
    var seconds = Math.round((Date.now() - pageLoadTime) / 1000);
    if (ph()) {
      ph().capture('time_on_content', {
        seconds: seconds,
        bucket: getTimeBucket(seconds),
        url: window.location.pathname
      });
    }
  });

  // ── Depth selector (Tesis/Mapa/Ensayo) ────────
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-depth], .depth-btn, .layer-tab, .essay-depth-btn');
    if (!btn) return;
    var depth = btn.getAttribute('data-depth') || btn.textContent.trim();
    if (ph()) {
      ph().capture('depth_selected', {
        depth: depth,
        url: window.location.pathname
      });
    }
  });

  // ── Nav click tracking ────────────────────────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.nav-links a, .nav a:not(.nav-logo)');
    if (!link) return;
    if (ph()) {
      ph().capture('nav_click', {
        destination: link.getAttribute('href'),
        label: link.textContent.trim(),
        from: window.location.pathname
      });
    }
  });

  // ── Concept click (links to /conceptos/) ──────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="/conceptos/"]');
    if (!link) return;
    // Skip nav links — only track inline/content clicks
    if (link.closest('.nav-links, .nav, .site-footer')) return;
    if (ph()) {
      ph().capture('concept_click', {
        concept: link.getAttribute('href'),
        label: link.textContent.trim(),
        from: window.location.pathname
      });
    }
  });

  // ── Related content click ─────────────────────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.concept-essay-link, .related-link, [data-related]');
    if (!link) return;
    if (ph()) {
      ph().capture('related_click', {
        destination: link.getAttribute('href'),
        label: link.textContent.trim(),
        from: window.location.pathname
      });
    }
  });

  // ── Newsletter CTA tracking ───────────────────
  // Track CTA visibility with IntersectionObserver
  if (window.IntersectionObserver) {
    var ctaObserved = new Set();
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var id = el.getAttribute('data-cta') || el.className || 'unknown';
          if (!ctaObserved.has(id)) {
            ctaObserved.add(id);
            if (ph()) {
              ph().capture('newsletter_cta_viewed', {
                cta_location: id,
                url: window.location.pathname
              });
            }
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.cta-form, .newsletter-form, .footer-newsletter, [data-cta]').forEach(function (el) {
      ctaObserver.observe(el);
    });
  }

  // Track newsletter form submissions
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.cta-form, .newsletter-form, .footer-newsletter, [data-newsletter]');
    if (!form) return;
    var email = form.querySelector('input[type="email"]');
    var location = 'unknown';
    if (form.closest('.hero')) location = 'hero';
    else if (form.closest('.site-footer, footer')) location = 'footer';
    else if (form.closest('.concept-cta, .article-cta')) location = 'post-article';
    else if (form.closest('.newsletter-page, main')) location = 'page';

    if (ph()) {
      ph().capture('newsletter_cta_clicked', {
        cta_location: location,
        url: window.location.pathname
      });
      // Capture signup (form submitted with email)
      if (email && email.value) {
        ph().capture('newsletter_signup', {
          cta_location: location,
          url: window.location.pathname
        });
      }
    }
  });

  // ── Contact form tracking ─────────────────────
  document.addEventListener('focusin', function (e) {
    var form = e.target.closest('.contact-form, [data-contact-form]');
    if (!form || form.dataset.started) return;
    form.dataset.started = 'true';
    if (ph()) {
      ph().capture('contact_form_started', {
        url: window.location.pathname
      });
    }
  });

  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.contact-form, [data-contact-form]');
    if (!form) return;
    if (ph()) {
      ph().capture('contact_form_submitted', {
        url: window.location.pathname
      });
    }
  });
})();
