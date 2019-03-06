const request = require("request");
const async = require("async");
const pageSize = 30;
let cachedProducts = [];

let cacheProductPage = (page, done) => {
  let url = `https://mobile-tha-server.firebaseapp.com/walmartproducts/${page + 1}/${pageSize}`;
  request(url, (err, response, body) => {
    if (err) return done(err);
    body = JSON.parse(body);
    cachedProducts.push(body["products"]);
    done(null);
  });
};

let cacheProducts = (done) => {
  request("https://mobile-tha-server.firebaseapp.com/walmartproducts/1/1", (err, response, body) => {
    body = JSON.parse(body);
    let iterations = Math.ceil(body["totalProducts"] / pageSize);
    async.times(iterations, cacheProductPage, (err) => {
      done(err, cachedProducts);
    });
  })
};

module.exports = cacheProducts;
