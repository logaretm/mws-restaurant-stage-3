/**
 * Common database helper functions.
 */

class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants () {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants`).then(res => {
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
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine (cuisine) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants?cuisine_type=${cuisine}`).then(res => {
      return res.json().then(json => json.restaurants);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`)
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood (neighborhood) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants?neighborhood=${neighborhood}`).then(res => {
      return res.json().then(json => json.restaurants);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`)
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood (cuisine, neighborhood) {
    return fetch(`${DBHelper.DATABASE_URL}/restaurants?neighborhood=${neighborhood}&cuisine_type=${cuisine}`).then(res => {
      return res.json().then(json => json.restaurants);
    }).catch(err => {
      throw new Error(`Request failed. Returned status of ${err.status}`)
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
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP
    });

    return marker;
  }

}
