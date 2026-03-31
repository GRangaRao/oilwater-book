/* ══════════════════════════════════════════════════════════════
   Oil & Water — Book Companion Site  ·  Interactions
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Sticky nav: add .scrolled class after 60px ─────────── */
  const nav = document.getElementById('topnav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Mobile hamburger toggle ────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });
    // Close menu when a link is tapped
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  /* ── Language chips (audio section) ─────────────────────── */
  const chips = document.querySelectorAll('.lang-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  /* ── Scroll-reveal (IntersectionObserver) ───────────────── */
  const revealEls = document.querySelectorAll(
    '.section-header, .about-main, .about-sidebar, .info-card, ' +
    '.foreword-card, .chapter-group, .chapter-card, .author-card, ' +
    '.resource-card, .listen-cta, .lang-grid'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ── Smooth-scroll for nav links (fallback for older browsers) */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
