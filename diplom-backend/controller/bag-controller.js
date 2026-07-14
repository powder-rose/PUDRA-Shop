const User = require("../models/User");

async function addToBag(userId, productId) {
  const user = await User.findById(userId);

  const bagItem = user.bag.find(
      (item) => item.product.toString() === productId,
  );

  if (bagItem) {
    bagItem.count += 1;
  } else {
    user.bag.push({
      product: productId,
      count: 1,
    });
  }

  await user.save();

  return user;
}

module.exports = {
  addToBag,
};