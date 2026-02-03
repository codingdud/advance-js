### Service Worker Lifecycle: Installing & Activating

**Installing Phase:**
- Triggered after registration.
- Runs `install` event in SW script.
- Cache assets via `caches.open()` and `cache.addAll(['/index.html', '/styles.css'])`.
- If caching fails (e.g., network error), install fails; SW discarded.
- `self.skipWaiting()` skips waiting state, forces activation.
- State: installing → installed (waiting if old SW active).

**Test Example:**
```js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => cache.addAll(['/app.js']))
  );
});
```
- Console: Check DevTools > Application > Service Workers for "installing" status.

**Activating Phase:**
- After install, if no old SW, activates immediately.
- Runs `activate` event.
- Clean old caches: `caches.keys().then(keys => keys.filter(k => k !== 'v1').map(k => caches.delete(k)))`.
- `self.clients.claim()` takes control of open pages.
- State: activating → activated.

**Test Example:**
```js
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== 'v1').map(k => caches.delete(k))))
  );
  event.waitUntil(self.clients.claim());
});
```
- Reload page; check if new SW controls fetches.

**After Activation: What Happens**
- SW active, intercepts `fetch` events for caching/offline.
- Handles requests: `event.respondWith(caches.match(request).then(res => res || fetch(request)))`.
- Listens for push, sync, message events.
- Idle → terminated (browser kills after ~30s inactivity).
- Wakes on events (fetch/push); re-enters active state.
- Updates: Browser checks for byte-diff on reload; new SW installs parallel, waits until old terminates.

**Test Flow:**
1. Register SW.
2. Open DevTools: See install/activate logs.
3. Fetch resource: Log cache hit/miss.
4. Go offline: Test cached responses.
5. Update SW file: Reload → new version waiting; use `skipWaiting()` to activate.

### Web Services Using Web Workers/Service Workers
- **Service Workers (subtype of Web Workers):** Used for offline PWAs, caching, push notifications.
  - Examples: Google Docs (offline editing), Twitter/X (caching timelines), Netflix (offline queues), Starbucks PWA (offline menu).
- **General Web Workers:** Background threads for heavy JS (no DOM access).
  - Examples: Image processing (Photoshop web), data analysis (Google Sheets computations), crypto mining (background), multiplayer games (real-time calcs).

### Interview Prep Docs
**Service Worker Basics Q&A:**
- Q: Lifecycle stages? A: Register → Install (cache) → Activate (control) → Fetch (intercept) → Idle/Terminate → Wake.
- Q: Diff between install & activate? A: Install caches; activate cleans & claims pages.
- Q: Handle updates? A: New SW waits; use skipWaiting/claim to force.
- Q: Offline strategy? A: Cache-first: caches.match() || fetch().
- Q: Common pitfalls? A: Cache versioning, HTTPS only, scope limits.

**Code Snippet for Interview:**
```js
// sw.js
self.addEventListener('install', e => e.waitUntil(caches.open('v1').then(c => c.addAll(['/']))));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
```

**Tips:** Practice in browser; explain pros (performance, offline) vs cons (debugging hard, battery drain).