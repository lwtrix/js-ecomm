const layout = require("./layout")

module.exports = () => {
  return layout({ page: 'dashboard', content: `
    <div class="dashboard-container d-flex flex-column">
      <h3>Dashboard</h3>
      <div class="stats-container">
        <div class="d-flex align-items-center">
          <div class="stat-card">
            <div class="label">Today's Revenue</div>
            <div class="value">£396</div>
          </div>
          <div class="stat-card">
            <div class="label">Today's Revenue</div>
            <div class="value">£396</div>
          </div>
          <div class="stat-card">
            <div class="label">Today's Revenue</div>
            <div class="value">£396</div>
          </div>
        </div>
      </div>
    </div>  
  `})
}