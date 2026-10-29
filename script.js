(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const year = document.querySelector('#year');
  const form = document.querySelector('#waitlist-form');
  const formNote = document.querySelector('#form-note');
  const submitButton = form?.querySelector('button[type="submit"]');

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  if (form && formNote && submitButton) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const isLocalPreview = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
      const configuredApiUrl = window.PGFINDERS_API_URL;
      const apiUrl = configuredApiUrl ||
        (isLocalPreview ? 'http://localhost:3000' : window.location.origin);
      const email = new FormData(form).get('email');

      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      formNote.textContent = 'Joining the list…';
      formNote.setAttribute('role', 'status');
      formNote.style.color = '';

      try {
        const response = await fetch(`${apiUrl}/api/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.error || 'We could not complete your signup.');
        }

        window.location.href = '/thanks.html';
      } catch (error) {
        formNote.textContent = error instanceof Error
          ? error.message
          : 'We could not complete your signup. Please try again.';
        formNote.style.color = '#f4a6a6';
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
      }
    });
  }
})();
