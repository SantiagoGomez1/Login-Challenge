const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  let user = this;
  let userObject = user.toObject();
  return await bcrypt.compare(password, userObject.password);
};

userSchema.methods.createToken = function () {
  const user = this;
  return jwt.sign({ id: user.id, email: user.email }, process.env.jwtSecret, {
    expiresIn: 86400,
  });
};

module.exports = mongoose.model("User", userSchema);
