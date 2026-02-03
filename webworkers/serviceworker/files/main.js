// ==========================================
// SERVICE WORKER REGISTRATION & MANAGEMENT
// ==========================================

let swRegistration = null;

// Register Service Worker on page load
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        registerServiceWorker();
        checkOnlineStatus();
    });
}

async function registerServiceWorker() {
    try {
        addLog('📝 Registering Service Worker...', 'info');
        
        swRegistration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });

        addLog('✅ Service Worker registered successfully!', 'success');
        updateSWStatus('installing');

        // Listen for updates
        swRegistration.addEventListener('updatefound', () => {
            const newWorker = swRegistration.installing;
            addLog('🔄 New Service Worker found, installing...', 'info');
            
            newWorker.addEventListener('statechange', () => {
                addLog(`📊 SW State: ${newWorker.state}`, 'info');
                updateSWStatus(newWorker.state);
            });
        });

        // Check if SW is already active
        if (swRegistration.active) {
            updateSWStatus('active');
        }

        // Listen for controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            addLog('🔄 New Service Worker activated, reloading...', 'success');
            window.location.reload();
        });

    } catch (error) {
        addLog(`❌ Service Worker registration failed: ${error.message}`, 'error');
        updateSWStatus('inactive');
    }
}

function updateSWStatus(state) {
    const statusEl = document.getElementById('swStatus');
    
    const statusMap = {
        'installing': { text: 'Service Worker: Installing', class: 'installing' },
        'installed': { text: 'Service Worker: Installed', class: 'installing' },
        'activating': { text: 'Service Worker: Activating', class: 'installing' },
        'activated': { text: 'Service Worker: Active ✓', class: 'active' },
        'active': { text: 'Service Worker: Active ✓', class: 'active' },
        'redundant': { text: 'Service Worker: Redundant', class: 'inactive' },
        'inactive': { text: 'Service Worker: Not Active', class: 'inactive' }
    };

    const status = statusMap[state] || statusMap['inactive'];
    statusEl.textContent = status.text;
    statusEl.className = `status ${status.class}`;
}

// ==========================================
// ONLINE/OFFLINE STATUS MANAGEMENT
// ==========================================

function checkOnlineStatus() {
    window.addEventListener('online', () => {
        showOfflineIndicator(false);
        addLog('🌐 Connection restored!', 'success');
    });

    window.addEventListener('offline', () => {
        showOfflineIndicator(true);
        addLog('📡 Connection lost - working offline', 'error');
    });

    // Initial check
    if (!navigator.onLine) {
        showOfflineIndicator(true);
    }
}

function showOfflineIndicator(isOffline) {
    const indicator = document.getElementById('offlineIndicator');
    if (isOffline) {
        indicator.textContent = '📡 You are offline';
        indicator.className = 'offline-indicator show';
    } else {
        indicator.textContent = '🌐 Back online!';
        indicator.className = 'offline-indicator show online';
        setTimeout(() => {
            indicator.className = 'offline-indicator';
        }, 3000);
    }
}

// ==========================================
// CACHING STRATEGY TESTS
// ==========================================

// 1. Cache First Strategy - For static assets
async function testCacheFirst() {
    const resultEl = document.getElementById('cacheFirstResult');
    resultEl.className = 'result loading';
    resultEl.textContent = '⏳ Loading dog image from cache...';
    
    addLog('🔍 Testing Cache First strategy with FreeAPI...', 'info');
    
    try {
        const startTime = Date.now();
        // Using FreeAPI - Get random dog
        const response = await fetch('https://api.freeapi.app/api/v1/public/dogs/dog/random');
        const data = await response.json();
        const loadTime = Date.now() - startTime;
        
        const dog = data.data;
        
        resultEl.className = 'result success';
        resultEl.innerHTML = `
            ✅ <strong>Loaded in ${loadTime}ms</strong><br>
            🐕 <strong>${dog.name}</strong> (${dog.breed_group || 'Mixed'})<br>
            Origin: ${dog.origin || 'Unknown'}<br>
            Temperament: ${dog.temperament?.substring(0, 50) || 'Friendly'}...<br>
            <small>Source: ${response.headers.get('x-cache-status') || 'Network'}</small>
        `;
        
        addLog(`✅ Cache First: Dog data loaded (${loadTime}ms)`, 'success');
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `❌ Error: ${error.message}`;
        addLog(`❌ Cache First failed: ${error.message}`, 'error');
    }
}

// 2. Network First Strategy - For API data
async function testNetworkFirst() {
    const resultEl = document.getElementById('networkFirstResult');
    resultEl.className = 'result loading';
    resultEl.textContent = '⏳ Fetching product from network...';
    
    addLog('🌐 Testing Network First strategy with FreeAPI...', 'info');
    
    try {
        const startTime = Date.now();
        // Using FreeAPI - Get random product
        const response = await fetch('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=1');
        const data = await response.json();
        const loadTime = Date.now() - startTime;
        
        const product = data.data.data[0];
        
        resultEl.className = 'result success';
        resultEl.innerHTML = `
            ✅ <strong>Loaded in ${loadTime}ms</strong><br>
            🛍️ <strong>${product.title}</strong><br>
            Price: $${product.price} (${product.discountPercentage}% off)<br>
            Rating: ⭐ ${product.rating}/5<br>
            ${navigator.onLine ? '🌐 Fresh from Network' : '📡 From Cache (Offline)'}
        `;
        
        addLog(`✅ Network First: Product loaded (${loadTime}ms)`, 'success');
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `❌ Error: ${error.message}`;
        addLog(`❌ Network First failed: ${error.message}`, 'error');
    }
}

// 3. Stale While Revalidate - For frequently updated content
async function testStaleWhileRevalidate() {
    const resultEl = document.getElementById('swrResult');
    resultEl.className = 'result loading';
    resultEl.textContent = '⏳ Loading inspirational quote...';
    
    addLog('🔄 Testing Stale While Revalidate with FreeAPI...', 'info');
    
    try {
        const startTime = Date.now();
        // Using FreeAPI - Get random quote
        const response = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random');
        const data = await response.json();
        const loadTime = Date.now() - startTime;
        
        const quote = data.data;
        
        resultEl.className = 'result success';
        resultEl.innerHTML = `
            ✅ <strong>Loaded in ${loadTime}ms</strong><br>
            💭 <em>"${quote.content}"</em><br>
            - <strong>${quote.author}</strong><br>
            <small>Tags: ${quote.tags.join(', ')}</small><br>
            📰 Cache returns instantly, updating in background
        `;
        
        addLog(`✅ SWR: Quote loaded (${loadTime}ms)`, 'success');
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `❌ Error: ${error.message}`;
        addLog(`❌ SWR failed: ${error.message}`, 'error');
    }
}

// 4. Cache Only Strategy - For app shell
async function testCacheOnly() {
    const resultEl = document.getElementById('cacheOnlyResult');
    resultEl.className = 'result loading';
    resultEl.textContent = '⏳ Loading from cache only...';
    
    addLog('💾 Testing Cache Only strategy with FreeAPI...', 'info');
    
    try {
        const startTime = Date.now();
        // Using FreeAPI - Get random meal (will be cached after first load)
        const response = await fetch('https://api.freeapi.app/api/v1/public/meals/meal/random');
        const data = await response.json();
        const loadTime = Date.now() - startTime;
        
        const meal = data.data;
        
        resultEl.className = 'result success';
        resultEl.innerHTML = `
            ✅ <strong>Loaded in ${loadTime}ms</strong><br>
            🍽️ <strong>${meal.strMeal}</strong><br>
            Category: ${meal.strCategory}<br>
            Area: ${meal.strArea}<br>
            💾 Served from cache (offline-ready)
        `;
        
        addLog(`✅ Cache Only: Meal data loaded (${loadTime}ms)`, 'success');
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `❌ Error: ${error.message} (Cache not available)`;
        addLog(`❌ Cache Only failed: ${error.message}`, 'error');
    }
}

// 5. Network Only Strategy - For critical requests
async function testNetworkOnly() {
    const resultEl = document.getElementById('networkOnlyResult');
    resultEl.className = 'result loading';
    resultEl.textContent = '⏳ Fetching fresh joke...';
    
    addLog('⚡ Testing Network Only strategy with FreeAPI...', 'info');
    
    try {
        const startTime = Date.now();
        // Using FreeAPI - Get random joke (always fresh, never cached)
        const response = await fetch('https://api.freeapi.app/api/v1/public/randomjokes?limit=1');
        const data = await response.json();
        const loadTime = Date.now() - startTime;
        
        const joke = data.data.data[0];
        
        resultEl.className = 'result success';
        resultEl.innerHTML = `
            ✅ <strong>Loaded in ${loadTime}ms</strong><br>
            😂 <strong>${joke.content}</strong><br>
            <small>Categories: ${joke.categories.join(', ')}</small><br>
            🔐 Never cached (always fresh)
        `;
        
        addLog(`✅ Network Only: Joke loaded (${loadTime}ms)`, 'success');
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `❌ Error: ${error.message} (Network required)`;
        addLog(`❌ Network Only failed: ${error.message}`, 'error');
    }
}

// 6. Background Sync - For offline queue
async function testBackgroundSync() {
    const resultEl = document.getElementById('syncResult');
    resultEl.className = 'result loading';
    resultEl.textContent = '⏳ Queuing message...';
    
    addLog('🔁 Testing Background Sync...', 'info');
    
    try {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            
            // Store data in IndexedDB or localStorage
            const message = {
                id: Date.now(),
                text: 'Test message from ' + new Date().toLocaleTimeString(),
                timestamp: Date.now()
            };
            
            localStorage.setItem('pending-sync-' + message.id, JSON.stringify(message));
            
            // Register sync
            await registration.sync.register('sync-messages');
            
            resultEl.className = 'result success';
            resultEl.innerHTML = `
                ✅ <strong>Message queued!</strong><br>
                ${navigator.onLine ? 
                    '🌐 Will sync immediately (online)' : 
                    '📡 Will sync when connection restored'}<br>
                Message: "${message.text}"
            `;
            
            addLog('✅ Background Sync registered successfully', 'success');
        } else {
            throw new Error('Background Sync not supported');
        }
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `❌ Error: ${error.message}`;
        addLog(`❌ Background Sync failed: ${error.message}`, 'error');
    }
}

// ==========================================
// CACHE MANAGEMENT FUNCTIONS
// ==========================================

async function showCaches() {
    addLog('📋 Fetching cache information...', 'info');
    
    try {
        const cacheNames = await caches.keys();
        const cacheListEl = document.getElementById('cacheList');
        
        if (cacheNames.length === 0) {
            cacheListEl.innerHTML = '<div class="cache-item">No caches found</div>';
            addLog('ℹ️ No caches currently stored', 'info');
            return;
        }
        
        cacheListEl.innerHTML = '';
        
        for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            
            const item = document.createElement('div');
            item.className = 'cache-item';
            item.textContent = `${cacheName} (${keys.length} items)`;
            item.style.cursor = 'pointer';
            item.title = 'Click to see cached URLs';
            
            item.onclick = async () => {
                const urls = keys.map(req => req.url);
                addLog(`📦 Cache "${cacheName}" contains:\n${urls.join('\n')}`, 'info');
            };
            
            cacheListEl.appendChild(item);
        }
        
        addLog(`✅ Found ${cacheNames.length} cache(s)`, 'success');
    } catch (error) {
        addLog(`❌ Error fetching caches: ${error.message}`, 'error');
    }
}

async function clearAllCaches() {
    if (!confirm('Are you sure you want to clear all caches?')) return;
    
    addLog('🗑️ Clearing all caches...', 'info');
    
    try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        document.getElementById('cacheList').innerHTML = '<div class="cache-item">All caches cleared</div>';
        addLog(`✅ Cleared ${cacheNames.length} cache(s) successfully`, 'success');
    } catch (error) {
        addLog(`❌ Error clearing caches: ${error.message}`, 'error');
    }
}

async function updateServiceWorker() {
    addLog('🔄 Checking for Service Worker updates...', 'info');
    
    try {
        if (!swRegistration) {
            throw new Error('No Service Worker registered');
        }
        
        await swRegistration.update();
        addLog('✅ Service Worker update check complete', 'success');
    } catch (error) {
        addLog(`❌ Error updating Service Worker: ${error.message}`, 'error');
    }
}

async function unregisterSW() {
    if (!confirm('Are you sure you want to unregister the Service Worker?')) return;
    
    addLog('🗑️ Unregistering Service Worker...', 'info');
    
    try {
        if (!swRegistration) {
            throw new Error('No Service Worker registered');
        }
        
        await swRegistration.unregister();
        swRegistration = null;
        updateSWStatus('inactive');
        addLog('✅ Service Worker unregistered successfully', 'success');
        
        setTimeout(() => {
            addLog('🔄 Reloading page...', 'info');
            window.location.reload();
        }, 1500);
    } catch (error) {
        addLog(`❌ Error unregistering Service Worker: ${error.message}`, 'error');
    }
}

// ==========================================
// LOGGING UTILITY
// ==========================================

function addLog(message, type = 'info') {
    const logEl = document.getElementById('log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    entry.textContent = `[${timestamp}] ${message}`;
    
    logEl.appendChild(entry);
    logEl.scrollTop = logEl.scrollHeight;
    
    // Keep only last 50 entries
    while (logEl.children.length > 50) {
        logEl.removeChild(logEl.firstChild);
    }
}

// ==========================================
// UTILITY: Send message to Service Worker
// ==========================================

async function sendMessageToSW(message) {
    if (!navigator.serviceWorker.controller) {
        throw new Error('No active Service Worker');
    }
    
    return new Promise((resolve, reject) => {
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = (event) => {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };
        
        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
    });
}

// ==========================================
// INITIAL SETUP
// ==========================================

console.log('%c🚀 Service Worker Demo Ready!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cOpen DevTools > Application > Service Workers to see it in action', 'color: #666; font-size: 14px;');
