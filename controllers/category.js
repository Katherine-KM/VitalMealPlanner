// const cloudinary = require("../middleware/cloudinary");
const Category = require("../models/Category");

module.exports = {
    getCategories: async (req, res) => {
        try {
          const limitNumber = 20; 
          const categories = await Category.find({}).limit(limitNumber);
          res.render("categories.ejs", {title: 'Vital CookBook - Categories', categories: categories});
        } catch (err) {
          console.log(err);
        }
      },
};