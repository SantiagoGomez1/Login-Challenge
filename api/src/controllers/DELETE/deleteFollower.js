const followingSchema = require("../../models/following.js");
const userSchema = require("../../models/user.js");

const deleteFollower = async (req, res) => {
  const { id, userId } = req.body;
  try {
    const unfollow = await followingSchema.deleteMany({
      user: id,
      userFollow: userId,
    });
    
    const user = await userSchema.findById(id);
    const userUnfollow = await userSchema.findById(userId);

    let removeUserFollowing = user.following.find(
      (u) => u._id.toJSON() === userId
    );
    let removeUserFollow = await userUnfollow.followers.find(
      (u) => u._id.toJSON() === id
    );

    if (removeUserFollowing && removeUserFollow) {
      user.following.pull(removeUserFollowing);
      await user.save();
      userUnfollow.followers.pull(removeUserFollow);
      await userUnfollow.save();
      res.status(201).json(unfollow);
    } else {
      res.status(400).json({ msg: "No se ha podido completar la operacion." });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = deleteFollower;
