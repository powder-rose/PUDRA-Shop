module.exports = function (product) {
  return {

    id: product.id,
    title: product.title,
    desc: product.desc,
    imageUrl: product.image,
    price: product.price,
    count: product.count,
    category: product.category,

  }
}