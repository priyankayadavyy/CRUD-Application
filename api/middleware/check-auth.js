const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split("")[1];
    console.log(token);
    const verify = jwt.verify(token, "this is dummy text");
    if (verify) {
      next();
    } else {
      return res.status(401).json({
        msg: "not a valid types of user",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};
