# Product Catalog Cache

`npm start`

`npm test`

---


On app boot, the server process iterates through the catalog of products to build a dictionary in memory for filtering and searching.

#### GET /products filters catalog with query string parameters

```
- search
- minPrice
- maxPrice
- minReviewRating
- maxReviewRating
- minReviewCount
- maxReviewCount
- inStock
```

> e.g. localhost:3000/products?search=electronics&maxPrice=29900&minReviewCount=10&minReviewRating=3&inStock=true

### Known Limitations

As the product catalog size grows, this will become a performance bottleneck. It won't be sufficient to just store it in memory and some other form of persistence will be necessary. 

Given more scale, time and dependencies, I'd suggest deploying ElasticSearch to cache the API responses with a webhook for sycing product catalog changes or at the very least a cronjob to refresh the catalog on a schedule via the API.
