var cacheName = 'catzby'
var filesToCache = [
"/",
"/graphics/catzby.svg",
"/graphics/arrow-left-line.png",
"/graphics/close-circle-fill.svg",
"/graphics/comment-line.svg",
"/graphics/compass-fill.svg",
"/graphics/compass-line.svg",
"/graphics/emotion.svg",
"/graphics/facebook.svg",
"/graphics/heart-fill.svg",
"/graphics/heart-line.svg",
"/graphics/home-fill.svg",
"/graphics/home-line.svg",
"/graphics/image-fill.svg",
"/graphics/more-2-fill.svg",
"/graphics/more-fill.svg",
"/graphics/notification-fill.svg",
"/graphics/notification-line.svg",
"/graphics/pause-fill.svg",
"/graphics/play-line.svg",
"/graphics/reddit.svg",
"/graphics/restart-line.svg",
"/graphics/search-line.svg",
"/graphics/send-plane-fill.svg",
"/graphics/send-plane-line.svg",
"/graphics/telegram.svg",
"/graphics/twitter.svg",
"/graphics/user-fill.svg",
"/graphics/user-line.svg",
"/graphics/volume-mute-line.svg",
"/graphics/volume-up-line.svg",
"/graphics/whatsapp.svg",
"/graphics/search.png",
]
self.oninstall = function(event) {
event.waitUntil(
caches.open(cacheName).then(function(cache) {
return cache.add(filesToCache);
}));
};

self.addEventListener('activate', function(e) {
e.waitUntil(
caches.keys().then(function(keyList) {
return Promise.all(keyList.map(function(key) {
if (key !== cacheName) {
return caches.delete(key);
}
}));
}));
return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open(cacheName).then(function(cache) {
return caches.match(event.request)
.then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})
return response || fetchPromise;
})
}));
});
