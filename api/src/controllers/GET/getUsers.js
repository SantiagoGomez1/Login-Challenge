const userSchema = require("../../models/user");

const getUsers = async (req, res) => {
  try {
    const response = await userSchema
      .find()
      .populate("publications", {
        text: 1,
        image: 1,
        date: 1,
      })
      .populate("following", {
        id: 1,
        name: 1,
        lastName: 1,
        image: 1,
        email: 1,
      })
      .populate("followers", {
        id: 1,
        name: 1,
        lastName: 1,
        image: 1,
        email: 1,
      });

    let users = response.map((u) => {
      let user = {
        id: u.id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        image: u.image,
        publications: u.publications,
        followers: u.followers,
        following: u.following,
      };
      return user;
    });
    res.status(201).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = getUsers;
