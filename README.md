# Product Search Engine Architecture

## Product catalog is cached in memory

On app boot, the server process iterates through the catalog of products to build a dictionary in memory for filtering and searching.

## GET /products filters catalog with query string parameters

- search
- minPrice
- maxPrice
- minReviewRating
- maxReviewRating
- minReviewCount
- maxReviewCount
- inStock

e.g. localhost:3000/products?search=electronics&maxPrice=29900&minReviewCount=10&minReviewRating=3&inStock=true
