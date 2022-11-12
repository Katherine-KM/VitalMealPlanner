const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id }).populate('user');
      const favRecipes = await Recipe.find({favorites: req.user.id}).sort({ createdAt: "desc" }).populate('user');
      res.render("profile.ejs", { recipes: recipes, favRecipes: favRecipes, user: req.user, title: 'Vital Cook Book - Profile' });
    } catch (err) {
      console.log(err);
    }
  },
  addProfileImage: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.updateOne({_id: req.params.id},{
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });
        console.log("Image has been added");
        res.redirect("/profile");
      } catch (err) {
      console.log(err);
    }
  },
};
