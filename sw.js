const CACHE_NAME = 'lyrics-app-cache-v1';

// List of all the files we want to save offline
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon.png' 
];

// Step 1: Install event (Download and cache the files)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and saving files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Step 2: Fetch event (Serve files from the cache if offline)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If the file is in the cache, return it!
                if (response) {
                    return response;
                }
                // Otherwise, try to fetch it from the internet
                return fetch(event.request);
            })
    );
});
