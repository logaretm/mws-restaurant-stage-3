/**
 * ReviewsController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
  async index (req, res) {
    const conditions = {};
    Helpers.addProp('restaurant_id', conditions, req.query);
    const reviews = await Reviews.find(conditions);

    res.json({
      reviews
    });
  }
};
