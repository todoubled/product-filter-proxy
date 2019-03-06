const _ = require("lodash");
const dollarsToCents = require("dollars-to-cents");

const FILTERS = {
  "search": {
    field: "productName"
  },
  "minPrice": {
    field: "price",
    operator: ">"
  },
  "maxPrice": {
    field: "price",
    operator: "<"
  },
  "minReviewRating": {
    field: "reviewRating",
    operator: ">"
  },
  "maxReviewRating":{
    field: "reviewRating",
    operator: "<"
  },
  "minReviewCount": {
    field: "reviewCount",
    operator: ">"
  },
  "maxReviewCount": {
    field: "reviewCount",
    operator: "<"
  },
  "inStock": {
    field: "inStock"
  }
};

const getProductField = (product, field) => {
  let productField = product[field];
  if (/\$/.test(productField)) productField = dollarsToCents(productField);
  return productField;
};

const filterProducts = (filters, products) => {
  let filteredProducts = []
  _.each(products, (product) => {
    productMatchesFilters = _.every(filters, (value, key) => {
      let filter = FILTERS[key] || null;

      // Whitelist only the supported filters
      if (!filter) return;

      let productField = getProductField(product, filter.field);

      if (productField) {
        switch (filter.operator) {
          case ">":
            if (productField > value) return product;
            break;

          case "<":
            if (productField < value) return product;
            break;

          default:
            if (new RegExp(value).test(productField)) return product;
        };
      }
    });

    if (productMatchesFilters) filteredProducts.push(product)
  });

  return filteredProducts;
};

module.exports = filterProducts;
