module.exports = {
  async index (req, res) {
    const restaurants = await Restaurants.find({});

    const set = new Set(restaurants.map(r => r.neighborhood));

    res.json({
      neighborhoods: Array.from(set)
    });
  }
}