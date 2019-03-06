const express = require("express");
const _ = require("lodash");
const cacheProducts = require("./app/cache");
const filterProducts = require("./app/filter");

const app = express();
const port = process.env.PORT || 3000;

let products = [];

const respondWith = (response, products) => {
  response.json({totalProducts: products.length, products: products});
};

app.get('/', (req, res) => res.sendFile(__dirname + "/README.md"));

app.get("/products", (req, res) => {
  const filteredProducts = filterProducts(req.query, products);
  if (_.isEmpty(req.query)) return respondWith(res, products);
  respondWith(res, filteredProducts)
});

cacheProducts((err, cachedProducts) => {
  products = _.flatten(cachedProducts);
  app.listen(port, () => {
    app.emit("listening");
    console.log(`Cached ${products.length} products to search with an app listening on port ${port}!`)
  })
});

module.exports = app;
