const index = (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Shri 2018</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div id="app"></div>
      </body>
      <script src="bundle.js"></script>
    </html>
  `);
};

export default index;
