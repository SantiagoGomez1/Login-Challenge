const userSchema = require("../models/user");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userSchema.findOne({ _id: id });
    let userModified = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };
    if (!userModified) {
      throw new Error("Username does not exist");
    } else {
      res.status(201).json(userModified);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = getUser;
