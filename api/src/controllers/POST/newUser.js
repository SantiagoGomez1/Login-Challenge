const userSchema = require("../../models/user");

const newUser = async (req, res) => {
  const { name, lastName, password, email, image } = req.body;
  try {
    const user = userSchema({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      password: password,
      email: email.toLowerCase().trim(),
      image:
        image ||
        "https://www.seekpng.com/png/full/847-8474751_download-empty-profile.png",
      banner:
        "https://img.freepik.com/vector-gratis/fondo-pantalla-textura-granulada-degradado-degradado_23-2148968811.jpg",
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = newUser;
