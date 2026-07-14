const express = require("express");
const router = express.Router({ mergeParams: true });

const auth = require("../middlewares/auth");
const User = require("../models/User");
const { addToBag } = require("../controller/bag-controller");

function mapBag(user) {
  return user.bag.map((item) => ({
    productId: item.product._id,
    title: item.product.title,
    desc: item.product.desc,
    imageUrl: item.product.image,
    price: item.product.price,
    count: item.product.count,
    quantity: item.count,
  }));
}

router.post("/", auth, async (req, res) => {
  await addToBag(req.user.id, req.body.productId);

  const user = await User.findById(req.user.id).populate("bag.product");

  res.send({
    data: mapBag(user),
  });
});


router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("bag.product");

  res.send({
    data: mapBag(user),
  });
});

router.patch("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  const item = user.bag.find(
      (item) => item.product.toString() === req.body.productId,
  );

  if (!item) {
    return res.status(404).send({
      error: "Товар не найден в корзине",
    });
  }

  item.count = req.body.count;

  await user.save();
  await user.populate("bag.product");

  res.send({
    data: mapBag(user),
  });
});


router.delete("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.bag = [];

  await user.save();

  res.send({
    data: [],
  });
});


router.delete("/:productId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.bag = user.bag.filter(
      (item) => item.product.toString() !== req.params.productId,
  );

  await user.save();
  await user.populate("bag.product");

  res.send({
    data: mapBag(user),
  });
});

module.exports = router;