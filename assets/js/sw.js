const VERSION = 0.1;
const CACHE_NAME = 'RESTAURANT_REVIEWS';

self.addEventListener('install', (e) => {
  // Cleanup old caches then precache the assets.
  e.waitUntil(
    cleanup().then(() => precache()).catch(err => {
      console.log(`Failed to precache assets ${err.message}`)
    })
  );
});

self.addEventListener('fetch', function (e) {
  // if its an API call, get it from the network.
  if (isAPI(e.request)) {
    e.respondWith(fromNetwork(e.request));
    return;
  }

  e.respondWith(fromCache(e.request)); // otherwise get it from cache.
  e.waitUntil(fromNetwork(e.request)); // update the cache.
});

// Delete old caches.
function cleanup () {
  return caches.delete(`${CACHE_NAME}_${VERSION - 0.1}`);
}

function precache () {
  return caches.open(`${CACHE_NAME}_${VERSION}`).then(function (cache) {
    return cache.addAll([
      './manifest.webmanifest',
      './',
      './restaurant',
      './js/app.js',
      './css/app.css',
      './img/icons/favicon-32x32.png',
      './img/icons/favicon-16x16.png',
      './favicon.icon',
    ]);
  });
}

function isAPI (request) {
  return request.url.includes(self.location.hostname) && /api/.test(request.url);
}

function fromCache (request) {
  return caches.open(`${CACHE_NAME}_${VERSION}`).then(function (cache) {
    if (/restaurant\.html/.test(request.url)) {
      request = new Request('/restaurant.html');
    }

    return cache.match(request).then(function (matching) {
      return matching || fromNetwork(request);
    });
  });
}

function fromNetwork (request) {
  return caches.open(`${CACHE_NAME}_${VERSION}`).then(function (cache) {
    return fetch(request).then(function (response) {
      // don't cache API calls
      if (response.ok && !isAPI(request)) {
        const cloned = response.clone();

        return cache.put(request, cloned).then(() => {
          return response;
        });
      }

      return response;
    }).catch(err => {
      console.log(err);
      return null;
    });
  });
}

