const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const userProf = await User.find({userName: req.params.userName})
      // const recipes = await Recipe.find({userProf}).populate('user');
      // const favRecipes = await Recipe.find({favorites: userProf}).sort({ createdAt: "desc" }).populate('user');
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).populate('user');

      res.render("profile.ejs", { recipes: recipes, title:'Vital Cook Book - Recipe Feed', user: req.user, userProf: userProf});
      // res.render("profile.ejs", { recipes: recipes, favRecipes: favRecipes, user: req.user, userProf: userProf, title: 'Vital Cook Book - Profile' });
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
