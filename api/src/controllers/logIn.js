const userSchema = require("../models/user");

const logIn = async (req, res) => {
  const { emailUser, password } = req.body;
  const email = await emailUser.toLowerCase()
  console.log(email)
  if (!email) {
    return res.status(401).json({
      error: "Please send your email",
    });
  } else if (!password) {
    return res.status(401).json({
      error: "Please send your password",
    });
  }

  const user = await userSchema.findOne({ email });

  if (user) {
    const isMatch = await user.isCorrectPassword(password);
    if (isMatch) {
      const token = user.createToken();
      return res.status(201).json({ id: user.id, user: user.name, token });
    }
  }

  return res.status(401).json({ error: "Permission denied" });
};

module.exports = logIn;
