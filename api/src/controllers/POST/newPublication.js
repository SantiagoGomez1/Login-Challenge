const publicationSchema = require("../../models/publication");
const userSchema = require("../../models/user");

const newPublication = async (req, res) => {
  const { text, image, userId } = req.body;
  try {
    const user = await userSchema.findById(userId);
    const publication = publicationSchema({
      text: text,
      image: image || null,
      user: user._id,
    });
    await publication.save();
    user.publications = user.publications.concat(publication._id);
    await user.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = newPublication;
