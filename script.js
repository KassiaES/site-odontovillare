// Script para animações e interatividade da Odonto Villare

document.addEventListener('DOMContentLoaded', function() {
  // Configurações
  const CONFIG = {
    animationDelay: 200,
    counterSpeed: 2000,
    scrollOffset: 100
  };

  // Utilitários
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Intersection Observer para animações de entrada
  const observerOptions = {
    threshold: 0.1,
    rootMargin: `0px 0px -${CONFIG.scrollOffset}px 0px`
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Se for um elemento com contador, iniciar animação
        if (entry.target.classList.contains('numeros-grid')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Selecionar elementos para animação
  const elementsToAnimate = document.querySelectorAll('.fade-in, .fade-in-up');
  elementsToAnimate.forEach(element => {
    animateOnScroll.observe(element);
  });

  // Animação dos contadores na seção números
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = CONFIG.counterSpeed;
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString('pt-BR');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('pt-BR');
        }
      };

      updateCounter();
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  const handleScroll = debounce(() => {
    const currentScrollY = window.scrollY;
    
    // Adicionar/remover classe para efeito de blur
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Auto-hide header ao rolar para baixo
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  }, 10);

  window.addEventListener('scroll', handleScroll);

  // Smooth scroll para links internos
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Efeito parallax para o hero
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  if (hero && heroImage) {
    const handleParallax = debounce(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (scrolled <= hero.offsetHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    }, 10);

    window.addEventListener('scroll', handleParallax);
  }

  // Animação de hover para cards de serviços
  const servicoCards = document.querySelectorAll('.servico-card');
  servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Lazy loading para imagens
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('img[data-src], img.lazy');
  images.forEach(img => imageObserver.observe(img));

  // Preloader (se necessário)
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }

  // Google Analytics (se configurado)
  function trackEvent(category, action, label = '') {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  // Tracking de cliques nos botões do WhatsApp
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
      trackEvent('WhatsApp', 'click', button.textContent.trim());
    });
  });

  // Adicionar classes CSS dinâmicas
  const style = document.createElement('style');
  style.textContent = `
    .animate-in.fade-in {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-in.fade-in-up {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .header.scrolled {
      backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .lazy {
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .servico-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Preloader styles */
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }
    
    .preloader-logo {
      width: 60px;
      height: 60px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    /* Animações responsivas */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* Performance otimizations */
    .hero-image {
      will-change: transform;
    }
    
    .servico-card:hover {
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  // Console log para debug
  console.log('🦷 Odonto Villare - Site carregado com sucesso!');
  console.log('📊 Elementos animados:', elementsToAnimate.length);
  console.log('🔗 Links suaves:', smoothScrollLinks.length);
  console.log('💬 Botões WhatsApp:', whatsappButtons.length);

  // Error handling para imagens
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Erro ao carregar imagem:', this.src);
      this.style.display = 'none';
    });
  });
});

// Service Worker registration (opcional - para PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}