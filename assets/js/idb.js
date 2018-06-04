/* eslint-disable no-fallthrough */
import idb from 'idb';

let dbPromise = null;

/**
 * Custom Wrapper around the idb library.
 */
export default class IDB {
  static get idb () {
    if (!dbPromise) {
      dbPromise = idb.open('app-store', 2, upgradeDB => {
        switch (upgradeDB.oldVersion) {
          case 0:
            upgradeDB.createObjectStore('restaurants', { keyPath: 'id' });
            upgradeDB.createObjectStore('reviews', { keyPath: 'id' });
            upgradeDB.createObjectStore('neighborhoods');
            upgradeDB.createObjectStore('cuisines');
          case 1:
            upgradeDB.createObjectStore('pendingReviews', { keyPath: 'id' });
            upgradeDB.createObjectStore('pendingFavorites', { keyPath: 'id' });
        }
      });
    }

    return dbPromise;
  }

  static getCachedCollections (stores) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve({});
    }

    return this.idb.then(db => {
      const transaction = db.transaction(stores);

      return Promise.all(stores.map(store => {
        return transaction.objectStore(store).getAll();
      }));
    });
  }

  static removeItem (storeName, id) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve(false);
    }

    return this.idb.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).delete(id);

      return tx.complete;
    });
  }

  static getCachedCollection (storeName) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve([]);
    }

    return this.idb.then(db => {
      return db.transaction(storeName).objectStore(storeName).getAll();
    });
  }

  static getCachedItem (storeName, id) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve(null);
    }

    return this.idb.then(db => {
      return db.transaction(storeName).objectStore(storeName).get(id);
    });
  }

  static cacheCollection (storeName, items) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve();
    }

    return this.idb.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      items.forEach((item, idx) => {
        const args = typeof item === 'string' ? [item, idx] : [item];
        tx.objectStore(storeName).put(...args);
      });

      return tx.complete;
    });
  }

  static cacheItem (storeName, item) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve();
    }

    return this.idb.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(item);

      return tx.complete;
    });
  }
}
