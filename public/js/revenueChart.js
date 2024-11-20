document.addEventListener('DOMContentLoaded', async () => {
  const jsonRes = await fetch('/admin/dashboard/revenue-graph');
  const orders = await jsonRes.json();

  const data = transformOrdersForChart(orders);
  const formatDate = d3.timeFormat('%Y-%m-%d');

  const today = new Date();
  const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Two months ago, first day

  // Filter the data to show last month from current day
  const lastOneMonthData = data.filter((d) => {
    const orderDate = new Date(d.date);
    return orderDate >= oneMonthAgo && orderDate <= today;
  });

  const startDate = d3.min(lastOneMonthData, (d) => d.date);
  const endDate = d3.max(lastOneMonthData, (d) => d.date);

  // Generate the full range of dates
  const fullDateRange = [];
  let currentDate = startDate;

  while (formatDate(new Date(currentDate)) <= formatDate(new Date(endDate))) {
    fullDateRange.push(new Date(currentDate)); // Add the current date to the array
    currentDate = d3.timeDay.offset(new Date(currentDate), 1); // Increment by 1 day
  }

  // Convert date values to strings
  const completeData = fullDateRange.map((dateStr) => {
    const existingEntry = data.find(
      (d) =>
        new Date(d.date).toISOString().split('T')[0] === formatDate(dateStr)
    );
    return {
      date: dateStr,
      amount: existingEntry ? existingEntry.amount : 0, // Use the amount if it exists, else 0
    };
  });

  // **********************
  // GRAPH CODE
  // **********************

  // Graph dimensions
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const width = 920 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Scales
  const x = d3
    .scaleTime()
    .domain([
      d3.min(completeData, (d) => d.date),
      d3.max(completeData, (d) => d.date),
    ])
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(completeData, (d) => d.amount)])
    .range([height, 0]);

  // X axis
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(4))
        .tickFormat(d3.timeFormat('%b %d'))
    )
    .selectAll('text')
    .attr('transform', 'rotate(45)')
    .style('text-anchor', 'start');

  // Y axis
  svg.append('g').call(d3.axisLeft(y));

  // Line
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.amount));

  // Line Path
  const linePath = svg
    .append('path')
    .datum(completeData)
    .attr('fill', 'none')
    .attr('stroke', '#21212b')
    .attr('stroke-width', 2)
    .attr('d', line);

  const totalLength = linePath.node().getTotalLength();

  // Line Path animation
  linePath
    .attr('stroke-dasharray', totalLength)
    .attr('stroke-dashoffset', totalLength)
    .transition()
    .duration(2000)
    .ease(d3.easePolyIn)
    .attr('stroke-dashoffset', 0);

  const tooltip = d3.select('#tooltip');

  // Dots
  svg
    .selectAll('dot')
    .data(completeData)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.date))
    .attr('cy', (d) => y(d.amount))
    .attr('r', 4)
    .attr('fill', '#f8c630')
    .attr('opacity', 0)
    .on('mouseover', (event, d) => {
      // Show the tooltip on hover
      tooltip
        .style('visibility', 'visible')
        .html(`Date: ${formatDate(d.date)}<br>Amount: £${d.amount.toFixed(2)}`)
        .style('top', `${event.pageY + 10}px`) // Positioning the tooltip slightly below the cursor
        .style('left', `${event.pageX + 10}px`); // Positioning the tooltip slightly to the right of the cursor
    })
    .on('mousemove', (event) => {
      // Update tooltip position as the mouse moves
      tooltip
        .style('top', `${event.pageY + 10}px`)
        .style('left', `${event.pageX + 10}px`);
    })
    .on('mouseout', () => {
      // Hide the tooltip when mouse leaves the dot
      tooltip.style('visibility', 'hidden');
    })
    .transition()
    .duration(2000)
    .delay((d, i) => i * 100)
    .attr('opacity', 1);
});
