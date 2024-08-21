const BaseRepository = require('./baseRepo');

class CartRepository extends BaseRepository {}

module.exports = new CartRepository('carts.json');
