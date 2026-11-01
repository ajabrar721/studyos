const C = 'studyos-v2';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json',
  'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png'];

// Tolerant precache: one missing file never blocks the service worker from installing
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(C)
      .then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))
      .then(() => clients.claim())
  );
});

// Cache first, refresh in background; always answers (also offline) so Chrome sees a working fetch handler
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => {
    const net = fetch(r).then(res => {
      if (res && res.ok && new URL(r.url).origin === location.origin) {
        const cp = res.clone();
        caches.open(C).then(c => c.put(r, cp));
      }
      return res;
    }).catch(() => hit || (r.mode === 'navigate' ? caches.match('index.html') : Response.error()));
    return hit || net;
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(l => l.length ? l[0].focus() : clients.openWindow('./')));
});
