// Service Worker para PWA - Funcionalidad Offline
const CACHE_NAME = 'luis-shelo-app-v1';
const RUNTIME_CACHE = 'luis-shelo-runtime-v1';

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

// Estrategia: Cache First, fallback a Network
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;

  // Ignorar requests de chrome-extension y otros protocolos
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si está en caché, devolverlo
        if (cachedResponse) {
          console.log('Service Worker: Sirviendo desde caché:', event.request.url);
          return cachedResponse;
        }

        // Si no está en caché, buscarlo en la red
        return fetch(event.request)
          .then((response) => {
            // Verificar que sea una respuesta válida
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar la respuesta (se puede usar solo una vez)
            const responseToCache = response.clone();

            // Guardar en caché para uso futuro
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                // Solo cachear ciertos tipos de archivos
                if (shouldCache(event.request.url)) {
                  console.log('Service Worker: Cacheando nuevo recurso:', event.request.url);
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Error al buscar recurso, usando caché:', error);
            // Si falla la red, intentar devolver desde caché
            return caches.match(event.request);
          });
      })
  );
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
