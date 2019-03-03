const assert = require("assert");
const products = require("./fixtures/products.json");
const filterProducts = require("../app/filter");

describe("filterProducts", () => {
  describe("search", () => {
    it("should filter products containing HDTV", () => {
      let filters = {
        "search": "HDTV"
      };

      let filteredProducts = filterProducts(filters, products)
      assert.equal(filteredProducts.length, 11)
    });
  });

  describe("inStock", () => {
    it("should filter products that are in stock", () => {
      let filters = {
        "inStock": true
      };

      let filteredProducts = filterProducts(filters, products)
      assert.equal(filteredProducts.length, 29)
    });
  });
});
