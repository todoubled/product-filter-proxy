_ = require("lodash");

const FILTERS = {
  "search": {
    fields: ["productName", "shortDescription", "longDescription"],
    operator: "contains"
  },
  "minPrice": {
    fields: ["price"],
    operator: ">"
  },
  "maxPrice": {
    fields: ["price"],
    operator: "<"
  },
  "minReviewRating": {
    fields: ["reviewRating"],
    operator: ">"
  },
  "maxReviewRating":{
    fields: ["reviewRating"],
    operator: "<"
  },
  "minReviewCount": {
    fields: ["reviewCount"],
    operator: ">"
  },
  "maxReviewCount": {
    fields: ["reviewCount"],
    operator: "<"
  },
  "inStock": {
    fields: ["inStock"],
    operator: "boolean"
  }
};

const filterProducts = (filters, products) => {
  let filteredProducts = []
  _.each(filters, (value, key) => {
    filter = FILTERS[key] || null;
    if (!filter) return;
    filteredProducts = _.filter(products, (product) => {
      let productField = product[filter.fields[0]]
      if (productField) {
        switch (filter.operator) {
          case "boolean":
          if (productField == true) return product;
            break;
        default:
          if (new RegExp(value).test(productField)) return product;
        };
      }
    });
  });
  return filteredProducts;
};

module.exports = filterProducts;
