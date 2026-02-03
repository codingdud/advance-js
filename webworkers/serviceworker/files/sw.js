// ==========================================
// SERVICE WORKER - ADVANCED CACHING STRATEGIES
// Version: 1.0.0
// ==========================================

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

// Static assets to cache during installation
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/main.js',
    '/offline.html'  // Fallback page
];

// Maximum cache sizes
const MAX_CACHE_SIZE = {
    images: 50,
    api: 30,
    dynamic: 100
};

// Cache duration (in milliseconds)
const CACHE_DURATION = {
    images: 7 * 24 * 60 * 60 * 1000,  // 7 days
    api: 5 * 60 * 1000,                // 5 minutes
    dynamic: 24 * 60 * 60 * 1000       // 1 day
};

// ==========================================
// INSTALL EVENT - Precache static assets
// ==========================================

self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...', event);
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Precaching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached successfully');
                // Force activation immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

// ==========================================
// ACTIVATE EVENT - Clean up old caches
// ==========================================

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...', event);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old cache versions
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== IMAGE_CACHE && 
                            cacheName !== API_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Old caches cleaned up');
                // Take control of all pages immediately
                return self.clients.claim();
            })
    );
});

// ==========================================
// FETCH EVENT - Route requests to strategies
// ==========================================

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Only handle same-origin requests and FreeAPI requests
    if (url.origin !== location.origin && !url.origin.includes('freeapi.app')) {
        return;
    }
    
    // Route FreeAPI requests to appropriate strategies
    if (url.href.includes('freeapi.app')) {
        // Dogs API - Cache First (images/static-like data)
        if (url.href.includes('/dogs/dog/random')) {
            event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
        }
        // Products API - Network First (dynamic inventory)
        else if (url.href.includes('/randomproducts')) {
            event.respondWith(networkFirstStrategy(request));
        }
        // Quotes API - Stale While Revalidate (frequently updated)
        else if (url.href.includes('/quotes/quote/random')) {
            event.respondWith(staleWhileRevalidateStrategy(request));
        }
        // Meals API - Cache Only (can work offline)
        else if (url.href.includes('/meals/meal/random')) {
            event.respondWith(cacheOnlyStrategy(request));
        }
        // Jokes API - Network Only (always fresh)
        else if (url.href.includes('/randomjokes')) {
            event.respondWith(networkOnlyStrategy(request));
        }
        // Default for other FreeAPI endpoints
        else {
            event.respondWith(networkFirstStrategy(request));
        }
    }
    // Local resources
    else if (request.destination === 'image') {
        event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    }
    else if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirstStrategy(request));
    }
    else {
        // Default: Cache first for static assets
        event.respondWith(cacheFirstStrategy(request));
    }
});

// ==========================================
// CACHING STRATEGY 1: CACHE FIRST
// Best for: Static assets (CSS, JS, images)
// ==========================================

async function cacheFirstStrategy(request, cacheName = DYNAMIC_CACHE) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            console.log('[SW] Cache hit:', request.url);
            
            // Return cached response and update in background
            updateCacheInBackground(request, cacheName);
            
            return cachedResponse;
        }
        
        // Cache miss - fetch from network
        console.log('[SW] Cache miss, fetching from network:', request.url);
        const networkResponse = await fetch(request);
        
        // Cache the response for future use
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            trimCache(cacheName, MAX_CACHE_SIZE.dynamic);
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('[SW] Cache First failed:', error);
        
        // Return offline fallback if available
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return mock data for demo purposes
        return createMockResponse({
            source: 'cache-first-fallback',
            cached: false,
            message: 'Offline - no cached version available',
            error: error.message
        });
    }
}

// ==========================================
// CACHING STRATEGY 2: NETWORK FIRST
// Best for: API data, user content
// ==========================================

async function networkFirstStrategy(request, timeout = 5000) {
    try {
        // Try network first with timeout
        const networkResponse = await fetchWithTimeout(request, timeout);
        
        if (networkResponse.ok) {
            // Cache the fresh response
            const cache = await caches.open(API_CACHE);
            cache.put(request, networkResponse.clone());
            trimCache(API_CACHE, MAX_CACHE_SIZE.api);
            
            console.log('[SW] Network First: Fresh from network');
            return networkResponse;
        }
        
        throw new Error('Network response not OK');
        
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', error.message);
        
        // Network failed - try cache
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            console.log('[SW] Serving stale data from cache');
            return cachedResponse;
        }
        
        // No cache available - return mock data
        return createMockResponse({
            source: 'network-first-fallback',
            timestamp: Date.now(),
            message: 'Network unavailable and no cached data',
            offline: true
        });
    }
}

// ==========================================
// CACHING STRATEGY 3: STALE WHILE REVALIDATE
// Best for: News feeds, frequently updated content
// ==========================================

async function staleWhileRevalidateStrategy(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Fetch fresh data in background
    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
                console.log('[SW] SWR: Updated cache in background');
            }
            return networkResponse;
        })
        .catch((error) => {
            console.log('[SW] SWR: Background update failed:', error.message);
        });
    
    // Return cached response immediately or wait for network
    if (cachedResponse) {
        console.log('[SW] SWR: Returning cached, updating in background');
        return cachedResponse;
    }
    
    console.log('[SW] SWR: No cache, waiting for network');
    return fetchPromise || createMockResponse({
        source: 'stale-while-revalidate',
        timestamp: Date.now(),
        headline: 'Loading news...',
        message: 'First load - fetching fresh data'
    });
}

// ==========================================
// CACHING STRATEGY 4: CACHE ONLY
// Best for: App shell, offline pages
// ==========================================

async function cacheOnlyStrategy(request) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('[SW] Cache Only: Served from cache');
            return cachedResponse;
        }
        
        console.log('[SW] Cache Only: Not in cache, fetching once to cache');
        
        // First time: fetch and cache for future offline use
        try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
                console.log('[SW] Cache Only: Cached for future offline use');
                return networkResponse;
            }
        } catch (error) {
            console.log('[SW] Cache Only: Network failed, no cache available');
        }
        
        // Return offline fallback
        return new Response(JSON.stringify({
            error: 'Cache not available',
            message: 'This content is not cached yet. Try loading it once while online.'
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('[SW] Cache Only failed:', error);
        return new Response(JSON.stringify({
            error: 'Cache error',
            message: error.message
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// ==========================================
// CACHING STRATEGY 5: NETWORK ONLY
// Best for: Payments, authentication, critical APIs
// ==========================================

async function networkOnlyStrategy(request) {
    try {
        console.log('[SW] Network Only: Always fetch from network');
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            return networkResponse;
        }
        
        throw new Error('Network response not OK');
        
    } catch (error) {
        console.error('[SW] Network Only failed:', error);
        return createMockResponse({
            source: 'network-only-error',
            message: 'Payment failed - network required',
            error: error.message,
            status: 503
        }, 503);
    }
}

// ==========================================
// BACKGROUND SYNC
// ==========================================

self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync triggered:', event.tag);
    
    if (event.tag === 'sync-messages') {
        event.waitUntil(syncMessages());
    }
});

async function syncMessages() {
    try {
        // Get all pending messages from storage
        const clients = await self.clients.matchAll();
        
        for (const client of clients) {
            client.postMessage({
                type: 'sync-complete',
                message: 'Background sync completed successfully',
                timestamp: Date.now()
            });
        }
        
        console.log('[SW] Messages synced successfully');
        return Promise.resolve();
        
    } catch (error) {
        console.error('[SW] Background sync failed:', error);
        return Promise.reject(error);
    }
}

// ==========================================
// PUSH NOTIFICATIONS
// ==========================================

self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received:', event);
    
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'New Notification';
    const options = {
        body: data.body || 'You have a new notification',
        icon: data.icon || '/icon.png',
        badge: data.badge || '/badge.png',
        data: data
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event);
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

// ==========================================
// MESSAGE CHANNEL - Communication with main thread
// ==========================================

self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
    
    // Send response back
    if (event.ports[0]) {
        event.ports[0].postMessage({
            success: true,
            message: 'Message received by Service Worker'
        });
    }
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Fetch with timeout
function fetchWithTimeout(request, timeout) {
    return Promise.race([
        fetch(request),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
}

// Update cache in background without blocking
function updateCacheInBackground(request, cacheName) {
    fetch(request)
        .then((response) => {
            if (response.ok) {
                return caches.open(cacheName).then((cache) => {
                    cache.put(request, response);
                    console.log('[SW] Cache updated in background');
                });
            }
        })
        .catch((error) => {
            console.log('[SW] Background update failed:', error.message);
        });
}

// Trim cache to maximum size
async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        // Delete oldest entries
        const deleteCount = keys.length - maxItems;
        for (let i = 0; i < deleteCount; i++) {
            await cache.delete(keys[i]);
        }
        console.log(`[SW] Trimmed ${deleteCount} items from ${cacheName}`);
    }
}

// Create mock JSON response for demo
function createMockResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status: status,
        statusText: status === 200 ? 'OK' : 'Error',
        headers: {
            'Content-Type': 'application/json',
            'X-Served-By': 'Service-Worker',
            'X-Cache-Status': 'MOCK'
        }
    });
}

// Clean expired cache entries
async function cleanExpiredCache() {
    const caches_to_clean = [
        { name: IMAGE_CACHE, duration: CACHE_DURATION.images },
        { name: API_CACHE, duration: CACHE_DURATION.api },
        { name: DYNAMIC_CACHE, duration: CACHE_DURATION.dynamic }
    ];
    
    for (const { name, duration } of caches_to_clean) {
        const cache = await caches.open(name);
        const requests = await cache.keys();
        const now = Date.now();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const cachedTime = new Date(response.headers.get('date')).getTime();
            
            if (now - cachedTime > duration) {
                await cache.delete(request);
                console.log('[SW] Deleted expired cache:', request.url);
            }
        }
    }
}

// Run cleanup periodically
setInterval(() => {
    cleanExpiredCache();
}, 60 * 60 * 1000); // Every hour

// ==========================================
// SERVICE WORKER LIFECYCLE LOGGING
// ==========================================

console.log('[SW] Service Worker script loaded');

self.addEventListener('install', () => {
    console.log('[SW] 📦 Install event fired');
});

self.addEventListener('activate', () => {
    console.log('[SW] ✅ Activate event fired');
});

self.addEventListener('fetch', () => {
    // Logged in individual strategies
});

console.log('[SW] 🚀 Service Worker ready!');
