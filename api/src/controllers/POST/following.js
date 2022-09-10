const userSchema = require("../../models/user.js");
const followingSchema = require("../../models/following.js");

const setFollowing = async (req, res) => {
  const { id, userId } = req.body;
  try {
    const user = await userSchema.findById(id);
    const noRepeat = await user.following?.find((u) => u._id.toJSON() === userId);
    if (!noRepeat) {
      const follow = await userSchema.findById(userId);
      const newFollow = followingSchema({
        user: user._id,
        userFollow: follow._id,
      });
      await newFollow.save();
      user.following = user.following.concat(newFollow.userFollow);
      await user.save();
      follow.followers = follow.followers.concat(user._id);
      await follow.save();
      res.json(newFollow);
    } else {
      res.json({ msg: "Ya estas siguiendo a este usuario." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = setFollowing;
