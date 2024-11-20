const transformOrdersForChart = (orders) => {
  const groupedData = {};

  // Group orders by day and sum totalPrice for each day
  orders.forEach((order) => {
    const formattedDate = new Date(order.date).toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'

    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = 0;
    }

    groupedData[formattedDate] += order.totalPrice;
  });
  // Convert the grouped data into an array of { formattedDate, amount }
  const result = Object.keys(groupedData).map((date) => {
    return {date, amount: groupedData[date]}
  });


  return result;
};
