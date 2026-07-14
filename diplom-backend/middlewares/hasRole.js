
module.exports = function (roles) {
  return (req, res, next) => {
    console.log("USER:", req.user);
    console.log("USER ROLE:", req.user.role);
    console.log("ALLOWED:", roles);

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        error: "Access denied",
      });
    }

    next();
  };
};