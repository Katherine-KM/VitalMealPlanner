// const cloudinary = require("../middleware/cloudinary");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

module.exports = {
    getCategories: async (req, res) => {
        try {
          const limitNumber = 20; 
          const categories = await Category.find({}).limit(limitNumber);
          res.render("categories.ejs", {title: 'Vital CookBook - Categories', categories: categories, user: req.user});
        } catch (err) {
          console.log(err);
        }
      },
    getCategoriesByName: async (req, res) => {
      try {
        const request = req.params.name; 
        const recipes = await Recipe.find({category: req.params.name})
        res.render("category.ejs", {recipes : recipes, title: `Vital CookBook - ${req.params.name}`, user: req.user, request: request})
      } catch(err){
        console.log(err);
      }
    },
};