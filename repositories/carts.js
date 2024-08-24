const BaseRepository = require('./baseRepo');

class CartsRepository extends BaseRepository {}

module.exports = new CartsRepository('carts.json');
