document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.style.display = 'inline-flex';
    } else {
      backToTop.style.display = 'none';
    }
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth scroll for internal links
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Simple form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      console.log('Form payload', payload);

      // Simulate async submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Mengirim...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
        form.reset();
        form.classList.remove('was-validated');

        // Close modal
        const modalEl = document.getElementById('contactModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.hide();
        }

        // Toast-like feedback
        const alert = document.createElement('div');
        alert.className = 'position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-success shadow';
        alert.style.zIndex = '2000';
        alert.textContent = 'Terima kasih! Kami akan menghubungi Anda segera.';
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
      }, 1000);
    });
  }
});