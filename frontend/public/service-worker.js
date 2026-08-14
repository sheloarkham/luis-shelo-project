// Service Worker para PWA - Funcionalidad Offline
const CACHE_NAME = 'luis-shelo-app-v5';
const RUNTIME_CACHE = 'luis-shelo-runtime-v5';

// Solo recursos estáticos que existen y no cambian de hash entre deploys
const PRECACHE_URLS = ['/manifest.json'];

const isNavigationRequest = (request) =>
  request.mode === 'navigate' ||
  request.headers.get('accept')?.includes('text/html');

const networkFirst = (request) =>
  fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });
      }
      return response;
    })
    .catch(() => caches.match(request));

// Instalación: cachea solo lo esencial (sin bloquear si falta algún archivo)
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch((error) => {
              console.warn('Service Worker: No se pudo precachear', url, error);
            })
          )
        )
      )
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

// Estrategia: Network First para HTML/JS/CSS; Cache First para imágenes
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;

  // Ignorar requests de chrome-extension y otros protocolos
  if (!event.request.url.startsWith('http')) return;

  const url = event.request.url;
  const isAppResource =
    isNavigationRequest(event.request) ||
    url.includes('.js') ||
    url.includes('.css') ||
    url.includes('.html');

  // Network First para navegación y assets versionados (evita pantalla blanca tras deploy)
  if (isAppResource) {
    event.respondWith(networkFirst(event.request));
    return;
  } else {
    // Imágenes: Network First para evitar servir HTML cacheado como imagen
    const isImage = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url);

    if (isImage) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200 && response.headers.get('content-type')?.startsWith('image/')) {
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => caches.match(event.request))
      );
      return;
    }

    // Cache First para otros recursos estáticos
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
