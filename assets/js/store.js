import idb from './idb';

const state = {
  restaurants: [],
  reviews: [],
  neighborhoods: [],
  cuisines: [],
  pendingReviews: [],
  pendingFavorites: []
};

let populated = false;

/**
 * Simple Data Store, I could use Vuex but its not really needed.
 */
export default class Store {
  static populate () {
    if (populated) {
      return Promise.resolve(state);
    }

    return idb.getCachedCollections(['restaurants', 'reviews', 'neighborhoods', 'cuisines', 'pendingReviews', 'pendingFavorites'])
      .then(([ restaurants, reviews, neighborhoods, cuisines, pendingReviews, pendingFavorites ]) => {
        state.restaurants = restaurants;
        state.reviews = reviews;
        state.neighborhoods = neighborhoods;
        state.cuisines = cuisines;
        state.pendingReviews = pendingReviews;
        state.pendingFavorites = pendingFavorites;
        populated = true;
      }).then(() => {
        return state;
      });
  }

  static get state () {
    return state;
  }

  static find (storeName, id) {
    return idb.getCachedItem(storeName, id);
  }
}
