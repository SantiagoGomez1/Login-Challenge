const userSchema = require("../../models/user");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userSchema
      .findOne({ _id: id })
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

    let userModified = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      publications: user.publications,
      followers: user.followers,
      following: user.following,
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
