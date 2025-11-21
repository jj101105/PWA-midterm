const CACHE_NAME = "pwa-cache-v2"; 

const STATIC_ASSETS = [
    "/PWA-midterm/",
    "/PWA-midterm/index.html",
    "/PWA-midterm/manifest.json",
    "/PWA-midterm/icon1.png"
];

// Install
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating and cleaning old cache...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});
