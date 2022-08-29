const userSchema = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const response = await userSchema.find();
    let users = response.map((u) => {
      let user = {
        id: u.id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        image: u.image,
      };
      return user;
    });
    res.status(201).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = getUsers;
