(function () {
  'use strict';

  const docEl = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');
  const backToTopButton = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');

  // Set current year in footer
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Theme handling with localStorage
  const THEME_KEY = 'preferred-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    docEl.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    if (themeToggleButton) {
      const icon = themeToggleButton.querySelector('i');
      const text = themeToggleButton.querySelector('span');
      if (icon && text) {
        if (isDark) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
          text.textContent = 'Terang';
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
          text.textContent = 'Gelap';
        }
      }
    }
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return prefersDark.matches ? 'dark' : 'light';
  }

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  }

  // Back to top button
  function onScroll() {
    if (!backToTopButton) return;
    const shouldShow = window.scrollY > 300;
    backToTopButton.classList.toggle('show', shouldShow);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Activate ScrollSpy programmatically for reliability
  if (typeof bootstrap !== 'undefined') {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 80,
    });
  }

  // Smooth anchor inline navigation with navbar offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Bootstrap form validation + demo toast feedback (no actual backend)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        // Show toast
        const toastEl = document.getElementById('liveToast');
        if (toastEl && typeof bootstrap !== 'undefined') {
          const toast = new bootstrap.Toast(toastEl);
          toast.show();
        }
        form.reset();
        form.classList.remove('was-validated');
        return;
      }
      form.classList.add('was-validated');
    });
  }
})();