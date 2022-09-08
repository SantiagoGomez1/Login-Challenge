const publicationSchema = require("../../models/publication");

const updatePublication = async (req, res) => {
  const { id, userId, updateText } = req.body;
  try {
    const update = await publicationSchema.updateMany(
      {
        _id: id,
        user: { _id: userId },
      },
      {
        text: updateText,
      }
    );
    res.json(update);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updatePublication;
