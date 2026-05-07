/* ================================================================
   KENYA CANNOT WAIT — MAIN JS
   ================================================================ */

(function () {
  'use strict';

  /* --- NAV SCROLL EFFECT --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* --- HAMBURGER MENU --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- SCROLL REVEAL (IntersectionObserver) --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* --- ANIMATED COUNTERS --- */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.getAttribute('data-counter'), 10);
          animateCounter(e.target, target, 1800);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  /* --- ACTIVE NAV LINK --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === currentPath) {
      link.classList.add('active');
    }
  });

  /* --- FORM VALIDATION (basic) --- */
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ff4444';
          valid = false;
          field.addEventListener('input', () => field.style.borderColor = '', { once: true });
        }
      });
      if (valid) {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = '✓ Message Sent — Thank You!';
          btn.disabled = true;
          btn.style.background = '#2a7a2a';
          btn.style.color = '#fff';
          btn.style.borderColor = '#2a7a2a';
        }
        form.reset();
      }
    });
  });

})();