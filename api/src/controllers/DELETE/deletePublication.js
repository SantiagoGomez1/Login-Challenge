const publicationSchema = require("../../models/publication");

const deletePublication = async (req, res) => {
  const { id, userId } = req.body;
  try {
    const deletePub = await publicationSchema.deleteMany({
      _id: id,
      user: { _id: userId },
    });
    res.json(deletePub);
  } catch (error) {
    res.json(error);
  }
};

module.exports = deletePublication;
