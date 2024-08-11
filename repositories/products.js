const BaseRepository = require("./baseRepo");

class ProductsRepository extends BaseRepository {}

module.exports = new ProductsRepository('products.json')