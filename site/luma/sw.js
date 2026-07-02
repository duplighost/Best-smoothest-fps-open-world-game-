// LUMA service-worker cleanup shim.
// Previous builds cached the whole visualizer under /luma/. The website build
// should be network-served, so this worker unregisters itself and clears old
// LUMA caches as soon as browsers discover the updated sw.js.
const LUMA_CACHE_RE = /luma/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    if (self.caches?.keys) {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => LUMA_CACHE_RE.test(key)).map((key) => caches.delete(key)));
    }
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      if (new URL(client.url).pathname.startsWith("/luma/")) client.navigate(client.url);
    }
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request));
});
