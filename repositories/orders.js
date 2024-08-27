const BaseRepository = require('./baseRepo');

class OrdersRepository extends BaseRepository {}

module.exports = new OrdersRepository('orders.json')
