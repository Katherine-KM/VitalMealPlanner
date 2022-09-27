const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ingredients: {
    type: [String],
    require:  true,
  },
  category: {
    type: [String],
    require: true,
  },
  directions: {
    type: [String],
    require: true,
  },
  favorites: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
