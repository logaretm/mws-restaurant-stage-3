/**
 * Restaurants.js
 *
 * @description :: This represents the restaurant entry in the database.
 */

module.exports = {
  attributes: {
    name: { type: 'string' },
    neighborhood: { type: 'string' },
    photograph: { type: 'string' },
    address: { type: 'string' },
    latlng: { type: 'json' },
    cuisine_type: { type: 'string' },
    operating_hours: { type: 'json' },
    is_favorite: { type: 'boolean' },
    reviews: {
      collection: 'reviews',
      via: 'restaurant'
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};
