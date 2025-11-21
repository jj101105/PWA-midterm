// **UPDATED VERSION NUMBER**
const CACHE_NAME = "pwa-cache-v2"; 

const STATIC_ASSETS = [
    // The root path needs to be absolute for GitHub Pages (e.g., /PWA-midterm/)
    "/PWA-midterm/", 
    "/PWA-midterm/index.html", 
    "/PWA-midterm/manifest.json", 
    // Make sure to update the path for your icon file(s)
    "/PWA-midterm/icon.png" // <--- CHECK THIS PATH, it may be icon-192x192.png
];

// install
self.addEventListener("install", (event) => {
  console.log("service worker : installing...");
  self.skipWaiting(); // if 2 or more tabs open we can just force activate the new sw

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("service worker caching static asset");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// for user that already install and using the app again
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse; // retrun from your old cache
      } else {
        return fetch(event.request); // go fecth from network
      }
    })
  );
});

// for deleting old cache
self.addEventListener("activate", (event) => {
  console.log("cleaning up old cache");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});