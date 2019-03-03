const assert = require("assert");
const products = require("./fixtures/products.json");
const filterProducts = require("../app/filter");

let assertProductCountForFilters = (count, filters) => {
  let filteredProducts = filterProducts(filters, products)
  assert.equal(filteredProducts.length, count)
};

describe("filterProducts", () => {
  describe("search", () => {
    it("should filter products containing HDTV", () => {
      assertProductCountForFilters(11, {
        "search": "HDTV"
      });
    });
  });

  describe("minPrice", () => {
    it("should filter products with a minimum price", () => {
      assertProductCountForFilters(7, {
        "minPrice": 50000
      });
    });
  });

  describe("maxPrice", () => {
    it("should filter products with a maximum price", () => {
      assertProductCountForFilters(23, {
        "maxPrice": 50000
      });
    });
  });

  describe("minReviewRating", () => {
    it("should filter products with a minimum review rating", () => {
      assertProductCountForFilters(18, {
        "minReviewRating": 3
      });
    });
  });

  describe("maxReviewRating", () => {
    it("should filter products with a maximum review rating", () => {
      assertProductCountForFilters(2, {
        "maxReviewRating": 3
      });
    });
  });

  describe("minReviewCount", () => {
    it("should filter products that are in stock", () => {
      assertProductCountForFilters(7, {
        "minReviewCount": 5
      });
    });
  });

  describe("maxReviewCount", () => {
    it("should filter products with a maximum number of reviews", () => {
      assertProductCountForFilters(13, {
        "maxReviewCount": 5
      });
    });
  });

  describe("inStock", () => {
    it("should filter products that are in stock", () => {
      assertProductCountForFilters(29, {
        "inStock": true
      });
    });
  });

  describe("compound filters", () => {
    it("should filter products that are in stock, with a minimum price, that contain HDTV", () => {
      assertProductCountForFilters(11, {
        "inStock": true,
        "minPrice": 5000,
        "search": "HDTV"
      });
    });
  });
});
