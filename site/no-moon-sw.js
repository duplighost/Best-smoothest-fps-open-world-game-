// Root-level No Moon v265 cleanup worker. No Moon no longer uses service workers.
self.addEventListener('install', (event) => { event.waitUntil(self.skipWaiting()); });
self.addEventListener('activate', (event) => { event.waitUntil((async () => { try { const keys = await caches.keys(); await Promise.all(keys.filter((key) => /^no-moon-/i.test(key)).map((key) => caches.delete(key))); await self.registration.unregister(); const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true }); for (const client of clients) { try { client.navigate(client.url); } catch (_) {} } } catch (_) {} })()); });
self.addEventListener('fetch', () => {});
