// Probador de celular · service worker (Yupasoft)
// Guarda la propia herramienta para que abra aunque no haya internet. No toca las pantallas que se prueban.
var V='yupa-probador-v4',ARCH=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/favicon.svg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(ARCH)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n.indexOf('yupa-probador-')===0&&n!==V}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(V).then(function(h){h.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));
});
