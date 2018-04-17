/**
 * Restaurants.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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
    createdAt: true,
    updatedAt: true,
  }
};
