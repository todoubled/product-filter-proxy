const express = require("express");
const request = require("request");
const _ = require("lodash");
const async = require("async");

const app = express();
const port = process.env.PORT || 3000;
const pageSize = 30;

let products = [];

let cacheProductPage = (page, done) => {
  let url = `https://mobile-tha-server.firebaseapp.com/walmartproducts/${page + 1}/${pageSize}`;
  request(url, (err, response, body) => {
    if (err) return done(err);
    body = JSON.parse(body)
    products.push(body["products"]);
    done(null);
  });
};

let cacheProducts = (done) => {
  request("https://mobile-tha-server.firebaseapp.com/walmartproducts/1/1", (err, response, body) => {
    body = JSON.parse(body);
    let iterations = Math.ceil(body["totalProducts"] / pageSize);
    async.timesSeries(iterations, cacheProductPage, done);
  })
};

app.get('/', (req, res) => res.sendFile(__dirname + "/README.md"));

app.get("/products", (req, res) => {
  products = _.flatten(products);
  res.json(products);
});

cacheProducts((err) => {
  app.listen(port, () => {
    console.log(`Product Search app listening on port ${port}!`)
  })
});
