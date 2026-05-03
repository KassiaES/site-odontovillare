document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target || 0);
      const duration = 1300;
      const start = performance.now();

      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        element.textContent = value.toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      counterObserver.unobserve(element);
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => counterObserver.observe(counter));
});
