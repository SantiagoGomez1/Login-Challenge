const mongoose = require("mongoose");

require("dotenv").config();

const URI = process.env.URI;

mongoose.connect(URI, (err) => {
  if (err) {
    console.log("%n db error");
  } else {
    console.log("%n Connected to MongoDB Atlas");
  }
});
