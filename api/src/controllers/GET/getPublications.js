const publicationSchema = require("../../models/publication");

const getAllPublications = async (req, res) => {
  try {
    const publications = await publicationSchema.find().populate("user", {
      name: 1,
      lastName: 1,
      image: 1,
    });
    res.json(publications);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getAllPublications;
