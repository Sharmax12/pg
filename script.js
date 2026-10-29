(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const year = document.querySelector('#year');
  const form = document.querySelector('#waitlist-form');
  const formNote = document.querySelector('#form-note');

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

  // Local preview guard. Netlify-hosted deployments submit the native form to Netlify Forms.
  if (form && formNote && ['localhost', '127.0.0.1', ''].includes(window.location.hostname)) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      formNote.textContent = 'Preview only: connect/deploy Netlify Forms to collect real signups. No email has been stored.';
      formNote.setAttribute('role', 'status');
      formNote.style.color = '#e6c37b';
    });
  }
})();
