/**
 * Reviews.js
 *
 * @description :: This represents the review entry in the database.
 */

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    comments: { type: 'string', required: true },
    rating: { type: 'number', min: 0, max: 5, required: true },
    restaurant_id: { type: 'string', required: true },
    restaurant: { model: 'restaurants' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};
