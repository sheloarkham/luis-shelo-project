// Service Worker para PWA - Funcionalidad Offline
const CACHE_NAME = 'luis-shelo-app-v3';
const RUNTIME_CACHE = 'luis-shelo-runtime-v3';

// Archivos críticos para cachear en la instalación
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalación: cachea archivos críticos
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cacheando archivos críticos');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: limpia cachés antiguos
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Service Worker: Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Network First con revalidación (para JS/CSS), Cache First para imágenes
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;

  // Ignorar requests de chrome-extension y otros protocolos
  if (!event.request.url.startsWith('http')) return;

  const url = event.request.url;
  const isAppResource = url.includes('.js') || url.includes('.css') || url.includes('.html');

  // Network First para JS/CSS/HTML (siempre intenta actualizar)
  if (isAppResource) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, usar caché
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First para imágenes y otros recursos estáticos
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type === 'error') {
                return response;
              }
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                if (shouldCache(event.request.url)) {
                  cache.put(event.request, responseToCache);
                }
              });
              return response;
            })
            .catch((error) => {
              return caches.match(event.request);
            });
        })
    );
  }
});

// Función para determinar qué cachear
function shouldCache(url) {
  // Cachear archivos estáticos (JS, CSS, imágenes, fuentes)
  const cacheableExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf'];
  return cacheableExtensions.some(ext => url.includes(ext));
}

// Manejo de mensajes (para actualizar caché manualmente si es necesario)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
