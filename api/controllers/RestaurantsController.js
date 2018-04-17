/**
 * RestaurantsController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Returns a listing of restaurants that match the criteria if specified.
   */
  async index (req, res) {
    const conditions = {};
    Helpers.addProp('is_favorite', conditions, req.query);
    Helpers.addProp('neighborhood', conditions, req.query);
    Helpers.addProp('cuisine_type', conditions, req.query);

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
  },

  async update (req, res) {
    // we should probably use the body as a payload but spec says query, I handled both.
    const isFavorite = Casts.boolean(req.query.is_favorite || req.body.is_favorite);

    await Restaurants.update({ id: req.params.id }, { is_favorite: isFavorite });
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
