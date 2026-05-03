// Script Profissional para Odonto Villare
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Configurações avançadas
  const CONFIG = {
    animationDelay: 150,
    counterSpeed: 2500,
    scrollOffset: 80,
    parallaxSpeed: 0.5,
    debounceDelay: 10,
    intersectionThreshold: 0.1
  };

  // Utilitários otimizados
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

  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Intersection Observer para animações de entrada suaves
  const observerOptions = {
    threshold: CONFIG.intersectionThreshold,
    rootMargin: `0px 0px -${CONFIG.scrollOffset}px 0px`
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay progressivo para efeito cascata
        setTimeout(() => {
          entry.target.classList.add('animate-in');
          
          // Disparar contador se for seção números
          if (entry.target.closest('.numeros')) {
            animateCounters();
          }
          
          // Animar cards de serviços individualmente
          if (entry.target.classList.contains('servico-card')) {
            entry.target.style.animationDelay = `${index * 100}ms`;
          }
          
        }, index * CONFIG.animationDelay);
        
        // Remover observer após animação
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Selecionar e observar elementos para animação
  const elementsToAnimate = document.querySelectorAll(`
    .fade-in, 
    .fade-in-up, 
    .servico-card, 
    .unidade-card, 
    .stat-item,
    .numero-item,
    .depoimento-card,
    .section-header
  `);
  
  elementsToAnimate.forEach(element => {
    animateOnScroll.observe(element);
  });

  // Animação de contadores otimizada
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = CONFIG.counterSpeed;
      let start = 0;
      const increment = target / (duration / 16); // 60fps
      
      const updateCounter = () => {
        start += increment;
        
        if (start < target) {
          counter.textContent = Math.floor(start).toLocaleString('pt-BR');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('pt-BR');
        }
      };

      // Delay individualizado para cada contador
      const delay = Array.from(counters).indexOf(counter) * 200;
      setTimeout(updateCounter, delay);
    });
  }

  // Header inteligente com múltiplos estados
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  let scrollDirection = 'up';
  let isHeaderHidden = false;

  const handleHeaderScroll = throttle(() => {
    const currentScrollY = window.scrollY;
    
    // Determinar direção do scroll
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    
    // Estados do header baseados na posição
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Auto-hide inteligente
    if (scrollDirection === 'down' && currentScrollY > 200 && !isHeaderHidden) {
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      isHeaderHidden = true;
    } else if (scrollDirection === 'up' && isHeaderHidden) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      isHeaderHidden = false;
    }
    
    lastScrollY = currentScrollY;
  }, CONFIG.debounceDelay);

  window.addEventListener('scroll', handleHeaderScroll);

  // Smooth scroll aprimorado para links internos
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        // Animação de scroll suave com easing personalizado
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const smoothScrollAnimation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutCubic(timeElapsed, startPosition, distance, 1000);
          window.scrollTo(0, run);
          if (timeElapsed < 1000) requestAnimationFrame(smoothScrollAnimation);
        };
        
        // Easing function para scroll mais natural
        const easeInOutCubic = (t, b, c, d) => {
          t /= d/2;
          if (t < 1) return c/2*t*t*t + b;
          t -= 2;
          return c/2*(t*t*t + 2) + b;
        };
        
        requestAnimationFrame(smoothScrollAnimation);
      }
    });
  });

  // Efeito parallax otimizado para hero
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  if (hero && heroImage) {
    const handleParallax = throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -CONFIG.parallaxSpeed;
      
      if (scrolled <= hero.offsetHeight) {
        heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    }, 16); // 60fps

    window.addEventListener('scroll', handleParallax);
  }

  // Hover effects avançados para cards de serviços
  const servicoCards = document.querySelectorAll('.servico-card');
  servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
      this.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
      
      // Efeito shimmer no hover
      const shimmer = document.createElement('div');
      shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.6s ease;
        pointer-events: none;
      `;
      this.appendChild(shimmer);
      
      setTimeout(() => {
        shimmer.style.left = '100%';
        setTimeout(() => shimmer.remove(), 600);
      }, 50);
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Lazy loading otimizado para imagens
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Efeito de fade-in na imagem
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        const loadImage = () => {
          img.onload = () => {
            img.style.opacity = '1';
            img.classList.remove('lazy');
          };
          
          img.src = img.dataset.src || img.src;
        };
        
        // Pequeno delay para suavizar o loading
        setTimeout(loadImage, 100);
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
  lazyImages.forEach(img => imageObserver.observe(img));

  // Botão WhatsApp com interações avançadas
  const whatsappButton = document.querySelector('.whatsapp-float');
  if (whatsappButton) {
    // Efeito de respiração
    let breatheAnimation = null;
    
    const startBreathing = () => {
      let scale = 1;
      let growing = true;
      
      breatheAnimation = setInterval(() => {
        if (growing) {
          scale += 0.002;
          if (scale >= 1.1) growing = false;
        } else {
          scale -= 0.002;
          if (scale <= 1) growing = true;
        }
        whatsappButton.style.transform = `scale(${scale})`;
      }, 16);
    };
    
    const stopBreathing = () => {
      if (breatheAnimation) {
        clearInterval(breatheAnimation);
        whatsappButton.style.transform = 'scale(1)';
      }
    };
    
    // Iniciar animação de respiração
    setTimeout(startBreathing, 2000);
    
    whatsappButton.addEventListener('mouseenter', () => {
      stopBreathing();
      whatsappButton.style.transform = 'scale(1.15)';
      whatsappButton.style.transition = 'transform 0.3s ease';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
      whatsappButton.style.transform = 'scale(1)';
      setTimeout(startBreathing, 1000);
    });
  }

  // Sistema de notificações toast (opcional)
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10B981' : '#3B82F6'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar saída
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  };

  // Tracking melhorado de eventos
  const trackEvent = (category, action, label = '') => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        custom_parameter_1: window.location.pathname
      });
    }
    
    // Log interno para debug
    console.log(`📊 Event: ${category} - ${action}${label ? ` - ${label}` : ''}`);
  };

  // Tracking de cliques em botões WhatsApp
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent.trim();
      trackEvent('WhatsApp', 'click', buttonText);
      showToast('Redirecionando para WhatsApp...', 'success');
    });
  });

  // Tracking de cliques em botões de serviço
  const serviceCards = document.querySelectorAll('.servico-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('h3')?.textContent || 'Serviço';
      trackEvent('Services', 'card_click', serviceName);
    });
  });

  // Performance optimization: Intersection Observer cleanup
  const cleanupObservers = () => {
    if (animateOnScroll) animateOnScroll.disconnect();
    if (imageObserver) imageObserver.disconnect();
  };

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanupObservers);

  // Add dynamic CSS classes for enhanced animations
  const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1) !important;
      }
      
      .fade-in:not(.animate-in),
      .fade-in-up:not(.animate-in) {
        opacity: 0;
        transform: translateY(40px);
      }
      
      .servico-card:not(.animate-in) {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      
      .header {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(25px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }
      
      /* Otimizações de performance */
      .hero-image,
      .servico-img,
      .whatsapp-float {
        will-change: transform;
      }
      
      .servico-card:hover,
      .unidade-card:hover,
      .stat-item:hover {
        will-change: transform, box-shadow;
      }
      
      /* Suporte a prefers-reduced-motion */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Toast animations */
      .toast {
        font-family: 'Inter', sans-serif;
      }
    `;
    document.head.appendChild(style);
  };

  addDynamicStyles();

  // Loading optimization: Preload critical resources
  const preloadCriticalResources = () => {
    const criticalImages = [
      'img/logo.avif',
      'img/hero.avif'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  };

  preloadCriticalResources();

  // Error handling para recursos
  window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      console.warn('🖼️ Erro ao carregar imagem:', e.target.src);
      e.target.style.display = 'none';
      // Opcional: substituir por imagem placeholder
      // e.target.src = 'data:image/svg+xml;base64,...'; // placeholder svg
    }
  });

  // Inicialização completa
  console.log('🦷 Odonto Villare - Site carregado com todas as funcionalidades!');
  console.log(`📊 Elementos observados: ${elementsToAnimate.length}`);
  console.log(`🔗 Links suaves: ${smoothScrollLinks.length}`);
  console.log(`💬 Botões WhatsApp: ${whatsappButtons.length}`);
  console.log('🚀 Sistema de animações e interações ativo');

  // Opcional: Service Worker para PWA
  if ('serviceWorker' in navigator && 'production' === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('📱 Service Worker registrado:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Falha no Service Worker:', error);
        });
    });
  }
});