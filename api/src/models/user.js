const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

const userSchema = new Schema({
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
  publications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Publication",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

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

module.exports = model("User", userSchema);
