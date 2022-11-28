// Using Mongoose
const mongoose = require("mongoose");
const validator = require("validator");

// Modeling User Data
const User = mongoose.model("User", {
  name: {
    type: String,
    default: "Anonymous",
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (
        !validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
        }) ||
        String(value).includes("password")
      )
        throw new Error("Password Not Secure Enough 😔");
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid Email");
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number 😒");
    },
  },
});

module.exports = User;
