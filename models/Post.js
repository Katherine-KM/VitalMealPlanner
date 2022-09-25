const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
    required: true,
  },
  likes: {
    type: Number,
    required: true,
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
    type: Array,
    required:  true,
  },
  category: {
    type: String,
    enum:['Breakfast', 'Lunch', 'Dinner', 'Side Dishes', 'Soups', 'Desserts', 'Alcohol', 'Drinks', 'Holiday Recipes', 'Snacks', 'Salads'],
    required: true,
  }
});

module.exports = mongoose.model("Post", PostSchema);
