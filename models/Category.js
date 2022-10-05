const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String, 
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
