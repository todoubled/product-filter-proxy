const assert = require("assert");
const request = require("supertest");
const app = require("../index");

describe("GET /products API", () => {
  before((done) => {
    app.on("listening", done)
  });

  describe("default response", () => {
    it("should get all products", function(done) {
      request(app).get("/products").end(function(err, res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.products.length, 224);
        done();
      });
    });
  });

  describe("compound filtering", () => {
    it("should filter just the expected products", function(done) {
      request(app).get("/products?maxPrice=5100&minReviewCount=10").end(function(err, res) {
        assert(res.statusCode, 200);
        assert.equal(res.body.products.length, 32);
        done();
      });
    });
  });
});
