const { Schema, model } = require("mongoose");

const followingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userFollow: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

followingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Following", followingSchema);
