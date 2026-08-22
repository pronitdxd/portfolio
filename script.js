// ===========================================
// Pronit Das Portfolio — Base JS
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

  // Inject signature atmosphere layers (grain + scanline)
  const grain = document.createElement('div');
  grain.className = 'grain';
  document.body.appendChild(grain);

  const scanline = document.createElement('div');
  scanline.className = 'scanline';
  document.body.appendChild(scanline);

  // Scroll reveal observer
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));

  // Contact form — AJAX submit to Formspree (no page reload)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: json,
        });

        const result = await response.json();

        if (result.success) {
          status.textContent = "Message sent — I'll get back to you soon.";
          status.classList.remove('hidden', 'text-signal');
          status.classList.add('text-green-400');
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        status.textContent = "Something went wrong. Please email me directly.";
        status.classList.remove('hidden', 'text-green-400');
        status.classList.add('text-signal');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

});