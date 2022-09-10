const followingSchema = require("../../models/following.js");
const userSchema = require("../../models/user.js");

const deleteFollower = async (req, res) => {
  const { id, userId } = req.body;
  const unfollow = await followingSchema.deleteMany({
    user: id,
    userFollow: userId,
  });
  //   const user = await userSchema.findByIdAndRemove(id);
  //   const userUnfollow = await userSchema.findById(userId);
  res.json(unfollow);
};

module.exports = deleteFollower;
