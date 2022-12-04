const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async function(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "thisisthetoken");
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token
    });

    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Error: Authentication is required.");
    console.log(e);
  }
};

module.exports = auth;
