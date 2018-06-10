import idb from './idb';

/**
 * Common database helper functions.
 */

export default class DBHelper {
  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL () {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/api`;
  }

  static makeQueryString (query) {
    if (!query) {
      return '';
    }

    let qs = '?';
    if (query.cuisine) {
      qs += `cuisine_type=${query.cuisine}`;
    }

    if (query.cuisine && query.neighborhood) {
      qs += `&`;
    }

    if (query.neighborhood) {
      qs += `neighborhood=${query.neighborhood}`;
    }

    return qs;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants (query) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants/${DBHelper.makeQueryString(query)}`).then(res => {
      return res.json().then(json => {
        return idb.cacheCollection('restaurants', json.restaurants).then(() => json.restaurants);
      });
    });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById (id) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants/${id}`).then(res => {
      return res.json().then(json => {
        return idb.cacheItem('restaurants', json.restaurant).then(() => json.restaurant);
      });
    });
  }

  /**
   * Fetch reviews by restaurant id.
   */
  static fetchReviewsByRestaurantId (id) {
    return fetch(`${DBHelper.DATABASE_URL}/reviews?restaurant_id=${id}`).then(res => {
      return res.json().then(json => {
        return idb.cacheCollection('reviews', json.reviews).then(() => json.reviews);
      });
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods () {
    return fetch(`${DBHelper.DATABASE_URL}/neighborhoods`).then(res => {
      return res.json().then(json => {
        return idb.cacheCollection('neighborhoods', json.neighborhoods).then(() => json.neighborhoods);
      });
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines () {
    return fetch(`${DBHelper.DATABASE_URL}/cuisines`).then(res => {
      return res.json().then(json => {
        return idb.cacheCollection('cuisines', json.cuisines).then(() => json.cuisines);
      });
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant (restaurant) {
    return (`/restaurant?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant (restaurant) {
    return [
      { src: `/img/${restaurant.photograph}.webp`, type: 'image/webp' },
      { src: `/img/${restaurant.photograph}.jpg`, type: 'image/jpg' }
    ];
  }

  /**
   * Map marker for a restaurant.
   */
  static createMarkerData (restaurant) {
    return {
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
    };
  }

  static favoriteRestaurant (restaurant, isFavorite) {
    // optimistic update
    restaurant.is_favorite = isFavorite;
    if (!navigator.onLine) {
      return idb.cacheItem('pendingFavorites', {
        id: `temp_${Date.now()}`,
        restaurant,
        isFavorite
      });
    }

    return fetch(`${DBHelper.DATABASE_URL}/restaurants/${restaurant.id}`, {
      method: 'put',
      body: JSON.stringify({
        is_favorite: isFavorite
      })
    }).then(response => response.json()).then(json => {
      // update using fresh result
      restaurant.is_favorite = json.restaurant.is_favorite;
      // update local cache
      return idb.cacheItem('restaurants', json.restaurant).then(() => json.restaurant);
    });
  }

  static postPendingReviews () {
    return idb.getCachedCollection('pendingReviews').then(reviews => {
      return Promise.all(
        reviews.map(review => {
          return DBHelper.postReview(review).then(() => {
            return idb.removeItem('pendingReviews', review.id);
          });
        })
      );
    });
  }

  static postPendingFavorites () {
    return idb.getCachedCollection('pendingFavorites').then(favorites => {
      return Promise.all(
        favorites.map(({ id, restaurant, isFavorite }) => {
          return DBHelper.favoriteRestaurant(restaurant, isFavorite).then(() => {
            return idb.removeItem('pendingFavorites', id);
          });
        })
      );
    });
  }

  static postReview ({ name, rating, comments, restaurantId }) {
    if (!navigator.onLine) {
      const review = {
        id: `temp_${Date.now()}`,
        name,
        rating,
        comments,
        restaurantId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      return idb.cacheItem('pendingReviews', review).then(() => {
        return review;
      });
    }

    return fetch(`${DBHelper.DATABASE_URL}/reviews`, {
      method: 'post',
      body: JSON.stringify({
        name,
        rating,
        comments,
        restaurant_id: restaurantId
      })
    }).then(response => response.json()).then(json => {
      // cache the review object.
      return idb.cacheItem('reviews', json.review).then(() => json.review);
    });
  }
}
