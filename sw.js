const CACHE_NAME = 'nfc-business-card-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600;700&display=swap'
];

// Service Worker kurulumu
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Service Worker aktifleşme
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Network isteklerini yönetme
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache'de varsa döndür
                if (response) {
                    return response;
                }
                
                // Network'ten iste
                return fetch(event.request).then(
                    function(response) {
                        // Geçerli yanıt değilse döndür
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Yanıtı cache'e ekle
                        var responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    }
                ).catch(function() {
                    // Network hatası durumunda offline sayfasını göster
                    return caches.match('/index.html');
                });
            })
    );
});

// Push bildirimleri (isteğe bağlı)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Yeni bir bildirim var!',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Detayları Gör',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Kapat',
                icon: '/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('NFC Kartvizit', options)
    );
});

// Bildirim tıklama olayı
self.addEventListener('notificationclick', function(event) {
    console.log('Bildirim tıklandı:', event.notification.data);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
