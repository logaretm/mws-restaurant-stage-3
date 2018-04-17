/**
 * RestaurantsController
 *
 * @description :: Server-side logic for managing restaurants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  async index (req, res) {

    const restaurants = await Restaurants.find({});

    res.json({
      restaurants
    });
  }
};
