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
    const reviews = await Reviews.find(conditions).sort('updatedAt DESC');;

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
  },

  async update (req, res) {
    // normalize input.
    const input = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comments: req.body.comments
    };

    const [review] = await Reviews.update({ id: req.params.id }, input);
    if (!review) {
      return res.status(404).json({
        message: 'Review not found'
      });
    }

    res.json({
      review
    });
  },

  async destroy (req, res) {
    const [review] = await Reviews.destroy({ id: req.params.id });

    res.json({
      review,
      deleted: !!review
    });
  }
};
