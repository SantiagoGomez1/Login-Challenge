const { Schema, model } = require("mongoose");

const publicationSchema = new Schema({
  text: String,
  image: String,
  date: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

publicationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Publication", publicationSchema);
