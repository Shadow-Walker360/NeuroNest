/* ═══════════════════════════════════════════════════════
   LEARNVERSE SERVICE WORKER
   Handles offline caching and enables PWA install prompt.
   Chrome/Edge/Safari will only show the install button
   when a valid service worker is registered.
═══════════════════════════════════════════════════════ */

const CACHE_NAME     = 'learnverse-v1';
const OFFLINE_URL    = '/offline.html';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
];

// ── Install: pre-cache shell assets ─────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_ASSETS)
    )
  );
  self.skipWaiting(); // activate immediately
});

// ── Activate: clean up old caches ───────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control immediately
});

// ── Fetch: network-first for API, cache-first for assets ─
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests: network only, no caching
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(
          JSON.stringify({ detail: 'You are offline. Please check your connection.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );
    return;
  }

  // Navigation requests: network first, fallback to cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() =>
          caches.match(request).then(
            (cached) => cached || caches.match(OFFLINE_URL)
          )
        )
    );
    return;
  }

  // Static assets: cache first, then network
  if (
    request.destination === 'style'    ||
    request.destination === 'script'   ||
    request.destination === 'font'     ||
    request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200) return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Everything else: network with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ── Background sync (study session data) ────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-study-session') {
    event.waitUntil(syncStudySession());
  }
});

async function syncStudySession() {
  // When back online, flush any pending study events stored in IndexedDB
  // The main app handles the actual IDB writes; SW just triggers the sync
  const clients = await self.clients.matchAll();
  clients.forEach((client) =>
    client.postMessage({ type: 'SYNC_STUDY_SESSION' })
  );
}

// ── Push notifications ───────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try { data = event.data.json(); }
  catch (_) { data = { title: 'LearnVerse', body: event.data.text() }; }

  event.waitUntil(
    self.registration.showNotification(data.title || 'LearnVerse', {
      body:    data.body    || 'You have a new notification.',
      icon:    data.icon    || '/icon-192.png',
      badge:   data.badge   || '/icon-192.png',
      tag:     data.tag     || 'learnverse-notification',
      data:    data.url     || '/',
      actions: data.actions || [],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      const url = event.notification.data || '/';
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});