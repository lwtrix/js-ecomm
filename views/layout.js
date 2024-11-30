module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;500;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/styles/main.css"/>
        <link rel="stylesheet" href="/styles/client.css"/>
        <link rel="stylesheet" href="/fonts/bootstrap-icons.css">
      </head>
        <body>
          <nav>
            <div class="container">
              <a class="nav-logo" href="/"><img src="/logo/monklogo.png"/></a>
              <div class="nav-right">
                <a class=""href="/cart">
                  <i class="bi bi-cart" style="font-size: 1.5rem"></i>
                </a>
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
