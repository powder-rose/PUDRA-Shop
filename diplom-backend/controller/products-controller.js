const Product = require('../models/Product');

function addProduct(product) {
  return Product.create(product);
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id })
}


async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, { returnDocument: 'after' })
  return newProduct
}

async function getAllProducts() {
  return Product.find().sort({ createdAt: -1 });
}

function getProduct(id) {
  return Product.findById(id)
}

async function getProducts(
    search = "",
    limit = 3,
    page = 1,
    category
) {
  const filter = {
    title: {
      $regex: search,
      $options: "i",
    },
  };

  if (category) {
    filter.category = {
      $regex: `^${category}$`,
      $options: "i",
    };
  }

  const [products, count] = await Promise.all([
    Product.find(filter)
        .limit(Number(limit))
        .skip((page - 1) * Number(limit))
        .sort({ createdAt: -1 }),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / Number(limit)),
  };
}

 module.exports = {
  addProduct,
   deleteProduct,
   editProduct,
   getProducts,
   getProduct,
   getAllProducts
 }


