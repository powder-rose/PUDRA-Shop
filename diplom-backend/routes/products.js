const { getProducts, getProduct } = require('../controller/products-controller');
const mapProduct = require("../helpers/mapProduct");
const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {

  const { products, lastPage } = await getProducts(
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.category
  );

  router.post("/products", async (req, res) => {
    let Product;
    const product = await Product.create(req.body);

    res.json(product);
  });

  res.send({
    lastPage,
    products: products.map(mapProduct)
  });
});

router.get('/:id', async (req, res) => {
  const product = await getProduct(req.params.id);
  res.send({data: mapProduct(product) });
})

module.exports = router