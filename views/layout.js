module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" href="/styles/main.css"/>
        <link rel="stylesheet" href="/fonts/bootstrap-icons.css">
      </head>
        <body>
          <nav class="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div class="container">
              <a class="navbar-brand" href="/"><img src="/logo/monklogo.png" width="120px"/></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-auto d-flex align-items-center">
                  <li class="nav-item">
                    <a class="nav-link active fs-5" aria-current="page" href="/">Shop</a>
                  </li>
                  <li class="nav-item ms-3">
                    <a class="nav-link active" aria-current="page" href="/cart">
                      <i class="bi bi-cart" style="font-size: 1.5rem"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          <div class="container">
            ${content}
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
          <script defer src="/js/handleFormSubmitBtns.js"></script>

        </body>
    </html>
  `;
};
