// Using Mongoose
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
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

userSchema.statics.findByCredentials = async (email, password) => {
  // Find user by email as the first step to check login credentials
    const user = await User.findOne({ email });
// If there is no user with this email address
    if (!user)  throw new Error('Unable to login');
    // Store checkup in a variable
    const isMatch = await bcrypt.compare(password, user.password);
// If there is no match, reject login
    if (!isMatch) throw new Error('Unable to login');
// else return user
    return user
};

// Hash password before save , Before the event (validation)
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    // If password added or modified hash the password
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Modeling User Data
const User = mongoose.model("User", userSchema);

module.exports = User;
