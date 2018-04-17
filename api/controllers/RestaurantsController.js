/**
 * RestaurantsController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 /**
  * @description Adds a value to an object if it exists on the sourceObject.
  */
function useCondition(condition, conditions, source) {
  if (source && source[condition]) {
    conditions[condition] = Casts.boolean(source[condition]);
  }

  return conditions;
}

module.exports = {
  /**
   * Returns a listing of restaurants that match the criteria if specified.
   */
  async index (req, res) {
    const conditions = {};
    useCondition('is_favorite', conditions, req.query);
    useCondition('neighborhood', conditions, req.query);
    useCondition('cuisine_type', conditions, req.query);

    const restaurants = await Restaurants.find(conditions);

    res.json({
      restaurants
    });
  },

  /**
   * Returns a single restaurant that has a matching id with the one specified.
   */
  async show (req, res) {
    const restaurant = await Restaurants.findOne({ id: req.params.id });
    if (!restaurant) {
      return res.status(404).json({
        message: 'Restaurant not found'
      });
    }

    res.json({
      restaurant
    });
  }
};
