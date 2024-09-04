const getTodayOrders = (orders) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const foundOrders = orders.filter((item) => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);

    return itemDate.getTime() === today.getTime();
  });

  return foundOrders
}

const calcTodayRevenue = (orders) => {
  const foundOrders = getTodayOrders(orders)

  return foundOrders.reduce((total, item) => (
    total += item.totalPrice
  ), 0)
};

const calcTodaySales = (orders) => {
  const foundOrders = getTodayOrders(orders)
  return foundOrders.length
}

const calcTotalRevenue = (orders) => {
  return orders.reduce((total, item) => (
    total += item.totalPrice
  ), 0)
}

module.exports = {
  calcTodayRevenue,
  calcTodaySales,
  calcTotalRevenue
};
