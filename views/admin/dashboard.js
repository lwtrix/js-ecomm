const layout = require('./layout');

module.exports = ({ stats }) => {
  return layout({
    page: 'dashboard',
    content: `
    <div class="dashboard-view d-flex flex-column">
      <div class="admin-view-wrapper">
        <h3>Dashboard</h3>
        <div class="stats-container">
          <div class="d-flex align-items-center">
            <div class="stat-card">
              <div class="label">
                <i class="bi bi-wallet2"></i>
                <span>Today's Revenue</span>
              </div>
              <div class="value">£${stats.todaysRevenue}</div>
            </div>
            <div class="stat-card">
              <div class="label">
                <i class="bi bi-receipt"></i>
                <span>Today's Sales</span>
              </div>
              <div class="value">${stats.todaysSales}</div>
            </div>
            <div class="stat-card">
              <div class="label">
                <i class="bi bi-bank"></i>
                <span>Total Revenue</span>
              </div>
              <div class="value">£${stats.totalRevenue}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-view-wrapper revenue-graph">
        <div class="revenue-chart">
          <h4>Revenue Graph</h4>
          <div class="graph-info">
            <span>Y Axis - Revenue in £ (British Pounds)</span>
            <span>X Axis - Date (Month/Day)</span>
          </div>
          <div class="chart" id="chart"></div>
          <div id="tooltip"></div>
        </div>
      </div>
    </div>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="/js/transformOrdersForGraph.js"></script>
    <script src="/js/revenueChart.js"></script>
    `,
  });
};
