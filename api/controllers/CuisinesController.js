module.exports = {
  async index (req, res) {
    const cuisines = await Restaurants.find({});

    const set = new Set(cuisines.map(r => r.cuisine_type));

    res.json({
      cuisines: Array.from(set)
    });
  }
}
