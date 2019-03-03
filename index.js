const express = require("express");
const _ = require("lodash");
const cacheProducts = require("./app/cache");
const filterProducts = require("./app/filter");

const app = express();
const port = process.env.PORT || 3000;

let products = [];

app.get('/', (req, res) => res.sendFile(__dirname + "/README.md"));

app.get("/products", (req, res) => {
  products = _.flatten(products);
  filteredProducts = filterProducts(req.query, products);
  res.json(filteredProducts);
});

cacheProducts((err, cachedProducts) => {
  products = cachedProducts;
  app.listen(port, () => {
    console.log(`Product Search app listening on port ${port}!`)
  })
});
