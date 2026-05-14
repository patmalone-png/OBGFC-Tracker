var C='obgfc-v1',U=['./index.html'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(U)}));
  self.skipWaiting()
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(n){
    return Promise.all(n.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))
  }));
  self.clients.claim()
});
self.addEventListener('fetch',function(e){
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))
});
