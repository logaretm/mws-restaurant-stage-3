/**
 * Reviews.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string' },
    comments: { type: 'string' }
    rating: { type: 'number', min: 0, max: 5 },
    restaurant_id: { type: 'number', required: true },
    restaurant: { model: 'restaurants', via: 'restaurant_id' },
    createdAt: true,
    updatedAt: true
  }
};
