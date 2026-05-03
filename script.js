// Animações e interações modernas para o site
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar elementos com fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  };

  // Observer para números
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Scroll suave para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // WhatsApp float animation on scroll
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      whatsappFloat.style.transform = 'scale(0.9)';
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        whatsappFloat.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // Parallax effect para hero
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  if (hero && heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      
      if (scrolled < heroHeight) {
        const speed = scrolled * 0.5;
        heroImage.style.transform = `translateY(${speed}px)`;
      }
    });
  }

  // Hover effects para cards de serviço
  const servicoCards = document.querySelectorAll('.servico-card');
  
  servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Lazy loading para imagens
  const images = document.querySelectorAll('img[src$=".avif"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Smooth hover effect nos botões
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Performance: Debounced scroll handler
  let ticking = false;
  
  function updateOnScroll() {
    // Scroll-based animations here
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);

  // Acessibilidade: Focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
});