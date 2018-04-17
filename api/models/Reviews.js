/**
 * Reviews.js
 *
 * @description :: This represents the review entry in the database.
 */

module.exports = {
  attributes: {
    name: { type: 'string' },
    comments: { type: 'string' },
    rating: { type: 'number', min: 0, max: 5 },
    restaurant_id: { type: 'number', required: true },
    restaurant: { model: 'restaurants', via: 'restaurant_id' },
    createdAt: true,
    updatedAt: true
  }
};
