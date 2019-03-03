# Product Search Engine Architecture

## Product catalog is cached in memory

On app boot, the server process iterates through the catalog of products to build a dictionary in memory for filtering and searching.

## GET /products returns complete product catalog

