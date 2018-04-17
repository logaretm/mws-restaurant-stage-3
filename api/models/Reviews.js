/**
 * Reviews.js
 *
 * @description :: This represents the review entry in the database.
 */

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    comments: { type: 'string', required: true },
    rating: { type: 'string', min: 0, max: 5, required: true },
    restaurant_id: { type: 'string', required: true },
    restaurant: { model: 'restaurants', via: 'restaurant_id' },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' }
  }
};
