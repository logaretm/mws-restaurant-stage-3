/**
 * Common database helper functions.
 */

export default class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/api`;
  }

  static makeQueryString (query) {
    if (!query) {
      return '';
    }

    let qs = '?';
    if (query.cuisine) {
      qs += `cuisine_type=${query.cuisine}`
    }

    if (query.cuisine && query.neighborhood) {
      qs += `&`
    }

    if (query.neighborhood) {
      qs += `neighborhood=${query.neighborhood}`
    }

    return qs;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants (query) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants/${DBHelper.makeQueryString(query)}`).then(res => {
      return res.json().then(json => json.restaurants);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`)
    });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById (id) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants/${id}`).then(res => {
      return res.json().then(json => json.restaurant);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`);
    });
  }

  /**
   * Fetch reviews by restaurant id.
   */
  static fetchReviewsByRestaurantId (id) {
    return fetch(`${DBHelper.DATABASE_URL}/reviews?restaurant_id=${id}`).then(res => {
      return res.json().then(json => json.reviews);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`);
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods () {
    return fetch(`${DBHelper.DATABASE_URL}/neighborhoods`).then(res => {
      return res.json().then(json => json.neighborhoods);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`)
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines () {
    return fetch(`${DBHelper.DATABASE_URL}/cuisines`).then(res => {
      return res.json().then(json => json.cuisines);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`)
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`/restaurant?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}.jpg`);
  }

  /**
   * Map marker for a restaurant.
   */
  static createMarkerData(restaurant) {
    return {
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
    };
  }

}
