const { verify } = require('../helpers/token')
const User = require('../models/User');

module.exports = async function (req, res, next) {
  console.log("AUTH MIDDLEWARE");

  const token = req.cookies.token;

  console.log("TOKEN:", token);

  const tokenData = verify(token);

  const user = await User.findById(tokenData.id);

  console.log("USER FROM DB:", user);

  req.user = user;

  next();
};