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
            <div class="label">Today's Revenue</div>
            <div class="value">£${stats.todaysRevenue}</div>
          </div>
          <div class="stat-card">
            <div class="label">Today's Sales</div>
            <div class="value">${stats.todaysSales}</div>
          </div>
          <div class="stat-card">
            <div class="label">Total Revenue</div>
            <div class="value">£${stats.totalRevenue}</div>
          </div>
        </div>
      </div>
    </div>
    </div>  
  `,
  });
};
