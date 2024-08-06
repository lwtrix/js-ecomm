module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/styles/main.css"/>
      </head>
        <body>
          ${content}
        </body>
    </html>
  `
}