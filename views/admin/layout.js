module.exports = ({ content, page }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" href="/styles/main.css"/>
        <link rel="stylesheet" href="/styles/main.css"/>
        <link rel="stylesheet" href="/fonts/bootstrap-icons.css">
      </head>
        <body>
          <div class="admin-layout container d-flex">
            <nav class="d-flex justify-content-center">
              <div class="nav-items-container d-flex flex-column">
                <a href="/admin/dashboard" class="nav-item ${page === 'dashboard' ? 'active' : ''}">
                  <div class="icon-container">
                    <i class="bi bi-grid"></i>
                  </div>
                  <span href="/admin/dashboard">Dashboard</span>
                </a>
                <a href="/admin/products" class="nav-item ${page === 'products' ? 'active' : ''}">
                  <div class="icon-container">
                    <i class="bi bi-journals"></i>
                  </div>
                  <span href="/admin/dashboard">Products</span>
                </a>
                <a href="/admin/dashboard" class="nav-item ${page === 'orders' ? 'active' : ''}">
                  <div class="icon-container">
                    <i class="bi bi-tags"></i>
                  </div>
                  <span href="/admin/dashboard">Orders</span>
                </a>
              </div>
            </nav>

            ${content}
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
    </html>
  `;
};
