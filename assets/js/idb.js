import idb from 'idb';


let dbPromise = null;

/**
 * Custom Wrapper around the idb library.
 */
export default class IDB {
  static get idb () {
    if (!dbPromise) {
      dbPromise = idb.open('app-store', 1, upgradeDB => {
        switch (upgradeDB.oldVersion) {
          case 0:
            upgradeDB.createObjectStore('restaurants', { keypath: 'id' });
            upgradeDB.createObjectStore('reviews', { keyPath: 'id' });
            upgradeDB.createObjectStore('neighborhoods');
            upgradeDB.createObjectStore('cuisines');
        }
      });
    }

    return dbPromise;
  }

  static getCachedCollection(storeName) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve([]);
    }

    return this.idb.then(db => {
      return db.transaction(storeName).objectStore(storeName).getAll();
    });
  }

  static getCachedItem(storeName, id) {
    if (typeof indexedDB === 'undefined') {
      return Promise.resolve(null);
    }

    return this.idb.then(db => {
      return db.transaction(storeName).objectStore(storeName).get(id);
    });
  }

  static cacheCollection(storeName, items, limit) {
    items = limit ? items.slice(0, limit) : items;

    if (typeof indexedDB === 'undefined') {
      return Promise.resolve();
    }

    return this.idb.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      items.forEach(item => {
        tx.objectStore(storeName).put(item);
      });

      return tx.complete;
    });
  }

  static cacheItem(storeName, item) {
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
