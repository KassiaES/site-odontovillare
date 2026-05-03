// Service Worker para Odonto Villare
// Cache estratégico para melhor performance

const CACHE_NAME = 'odonto-villare-v1.1';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/img/logo.avif',
  '/img/hero.avif',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache aberto, adicionando recursos...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Todos os recursos foram cacheados');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Erro no cache:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker ativo e controlando a página');
        return self.clients.claim();
      })
  );
});

// Estratégia de cache: Cache First para recursos estáticos, Network First para HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requests que não são GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar requests de analytics e externos
  if (url.origin !== location.origin) {
    // Exceto Google Fonts
    if (url.hostname.includes('fonts.googleapis.com') || 
        url.hostname.includes('fonts.gstatic.com')) {
      event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
          return cache.match(request).then((response) => {
            if (response) {
              return response;
            }
            
            return fetch(request).then((response) => {
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            });
          });
        })
      );
    }
    return;
  }
  
  // Cache First para recursos estáticos
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      url.pathname.endsWith('.avif') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            // Recurso encontrado no cache
            console.log('📦 Servindo do cache:', request.url);
            return response;
          }
          
          // Buscar na rede e cachear
          return fetch(request).then((response) => {
            if (response.status === 200) {
              console.log('🌐 Cacheando novo recurso:', request.url);
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => {
            // Fallback para imagens em caso de erro
            if (request.destination === 'image') {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#f0f0f0"/><text x="150" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="#666">Imagem não disponível</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
        });
      })
    );
    
  } else {
    // Network First para HTML e outras requests
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Se a resposta for bem-sucedida, cachear
          if (response.status === 200 && request.url.includes(location.origin)) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback para cache se a rede falhar
          return caches.match(request).then((response) => {
            if (response) {
              console.log('📦 Servindo do cache (offline):', request.url);
              return response;
            }
            
            // Página offline personalizada
            if (request.mode === 'navigate') {
              return new Response(`
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Offline - Odonto Villare</title>
                  <style>
                    body { 
                      font-family: 'Inter', sans-serif; 
                      text-align: center; 
                      padding: 50px 20px; 
                      background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%);
                      color: white;
                      min-height: 100vh;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-direction: column;
                    }
                    .offline-content {
                      max-width: 500px;
                      background: rgba(255, 255, 255, 0.1);
                      backdrop-filter: blur(20px);
                      padding: 40px;
                      border-radius: 20px;
                      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    }
                    h1 { color: #fff; margin-bottom: 20px; }
                    p { color: #E1E7EF; margin-bottom: 30px; line-height: 1.6; }
                    button {
                      background: #fff;
                      color: #0EA5E9;
                      border: none;
                      padding: 12px 24px;
                      border-radius: 8px;
                      font-weight: 600;
                      cursor: pointer;
                      transition: transform 0.2s ease;
                    }
                    button:hover { transform: scale(1.05); }
                  </style>
                </head>
                <body>
                  <div class="offline-content">
                    <h1>🦷 Odonto Villare</h1>
                    <h2>Você está offline</h2>
                    <p>Parece que você está sem conexão com a internet. Verifique sua conexão e tente novamente.</p>
                    <button onclick="window.location.reload()">Tentar Novamente</button>
                  </div>
                </body>
                </html>
              `, {
                headers: { 'Content-Type': 'text/html' }
              });
            }
          });
        })
    );
  }
});

// Message listener para comunicação com a página principal
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.keys().then((cacheNames) => {
      event.ports[0].postMessage({
        type: 'CACHE_STATUS',
        caches: cacheNames,
        current: CACHE_NAME
      });
    });
  }
});

// Sync para quando voltar online (Background Sync)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync ativado');
    event.waitUntil(
      // Aqui pode implementar sync de dados quando voltar online
      Promise.resolve()
    );
  }
});

// Push notifications (para futuras implementações)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da Odonto Villare',
    icon: '/img/logo.avif',
    badge: '/img/logo.avif',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore', 
        title: 'Ver Agora',
        icon: '/img/logo.avif'
      },
      {
        action: 'close', 
        title: 'Fechar',
        icon: '/img/logo.avif'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Odonto Villare', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('🎯 Service Worker para Odonto Villare carregado - v1.1');