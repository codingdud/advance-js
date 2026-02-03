self.addEventListener("install", (event) => {
  console.log("[SW] Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");
});

self.addEventListener("fetch", (event) => {
  console.log("[SW] Fetching:", event.request.url);
});
