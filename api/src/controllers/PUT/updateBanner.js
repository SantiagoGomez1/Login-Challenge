const userSchema = require("../../models/user");

const updateBanner = async (req, res) => {
  const { id, banner } = req.body;
  try {
    const update = await userSchema.updateMany(
      {
        _id: id,
      },
      {
        banner: banner,
      }
    );
    res.json(update);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateBanner;
