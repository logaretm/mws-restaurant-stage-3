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
  },

  async create (req, res) {
    try {
      // normalize input.
      const input = {
        name: req.body.name,
        restaurant_id: Number(req.body.restaurant_id),
        rating: Number(req.body.rating),
        comments: req.body.comments
      };

      const review = await Reviews.create(input);

      res.json({
        review
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
};
