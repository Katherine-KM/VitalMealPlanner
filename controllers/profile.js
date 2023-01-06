const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // find the user by their userName
      const userProf = await User.find({userName: req.params.userName}).populate('user')
      // get the user's _id
      const userId = userProf[0]._id; 
      // find the recipes that are favorited by the user
      const favRecipes = await Recipe.find({favorites: userId}).sort({ createdAt: "desc" }).populate('user');
      // find the recipes that were created by the user
      const recipes = await Recipe.find({user: userId}).sort({ createdAt: "desc" })
      // render the profile page with the recipes and favorited recipes
      res.render("profile.ejs", { recipes: recipes, favRecipes: favRecipes, user: req.user, userProf: userProf, title: 'Vital Cook Book - Profile' });
    } catch (err) {
      console.log(err);
    }
  },
  editProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        await User.updateOne({_id: req.params.id},{
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });
      }
      if(req.body.displayName != ""){
        await User.updateOne({_id: req.params.id},{
          displayName: req.body.displayName,
        });
      }
      if(req.body.profBio != ""){
        await User.updateOne({_id: req.params.id},{
          profBio: req.body.profBio,
        });
      }
        console.log("Settings Updated");
        res.redirect(`/profile/${req.user.userName}`);
      } catch (err) {
      console.log(err);
    }
  },
};
