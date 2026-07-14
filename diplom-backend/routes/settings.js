const { addProduct, deleteProduct, editProduct, getProducts, getProduct } = require('../controller/products-controller.js');
const mapProduct = require('../helpers/mapProduct');
const express = require('express')
const ROLES = require('../constants/roles');
const hasRole = require('../middlewares/hasRole');

const router = express.Router({ mergeParams: true })

const auth = require('../middlewares/auth');
const { getAllProducts } = require("../controller/products-controller");

router.get("/products", auth, async (req, res) => {
  const products = await getAllProducts();

  res.send(products.map(mapProduct));
});

router.post(
    '/',
    auth,
    hasRole([ROLES.ADMIN]),
    async (req, res) => {
      const newProduct = await addProduct({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        category: req.body.category,
        count: req.body.count,
        image: req.body.imageUrl,
      });

      res.send({
        data: mapProduct(newProduct),
      });
    }
);

router.patch('/:id', auth , hasRole([ROLES.ADMIN]), async (req, res) => {
  const patchedProduct = await editProduct(req.params.id, {
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    category: req.body.category,
    count: req.body.count,
    image: req.body.imageUrl,
  });
  res.send({data: mapProduct(patchedProduct)});
})

router.delete('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ error: null } )
})

module.exports = router