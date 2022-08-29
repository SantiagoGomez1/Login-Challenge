const userSchema = require("../models/user");

const newUser = async (req, res) => {
  const { name, lastName, password, email, image } = req.body;
  try {
    const user = userSchema({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      password: password,
      email: email,
      image:
        image ||
        "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = newUser;
