 export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to database shop-shop with version 1
    const request = window.indexedDB.open('shop-shop', 1);

    //variables to hold reference to database
    let db, tx, store;

    //if version has changed or first time using, run to create three stores
    request.onupgradeneeded = function(e) {
      const db = request.result;
      //object stores for data
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      //save reference to database
      db = request.result;
      //open a transaction, do whatever is passed into storeName
      tx = db.transaction(storeName, 'readwrite');
      //save reference to that object store
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch(method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid Method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
