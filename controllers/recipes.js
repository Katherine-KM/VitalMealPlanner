const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      res.render("profile.ejs", { recipes: recipes, user: req.user, title: 'Vital Cook Book - Profile' });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const limitNumber = 5; 
      const categories = await Category.find({}).limit(limitNumber);
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean();

      res.render("feed.ejs", { recipes: recipes, title:'Vital Cook Book - Recipe Feed', categories : categories });
      
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean();
      res.render("favorites.ejs", { recipes: recipes, title:'Vital Cook Book - Recipe Feed' });
    } catch (err) {
      console.log(err);
    }
  },
  getMyRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean();
      res.render("myrecipes.ejs", { recipes: recipes, title:'Vital Cook Book - Recipe Feed' });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      res.render("recipe.ejs", { recipe: recipe, user: req.user, title:'Vital Cook Book - Post'});
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Recipe.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        category: req.body.categories,
      });
      console.log("Recipe has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeRecipe: async (req, res) => {
    try {
      await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/recipe/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRecipe: async (req, res) => {
    try {
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Recipe");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};



























// async function insertData(){
//   try {
//     await Category.insertMany(
    //   [
    //     {
    //       "name":"breakfast",
    //       "image": "../imgs/breakfast.webp"
    //     },
    //     {
    //       "name":"lunch",
    //       "image": "../imgs/lunch.webp"
    //     },
    //     {
    //       "name":"dinner",
    //       "image": "../imgs/dinner.webp"
    //     },
    //     {
    //       "name":"appetizer",
    //       "image": "../imgs/appetizer.webp"
    //     },
    //     {
    //       "name":"side-dish",
    //       "image": "../imgs/side-dish.webp"
    //     },
    //     {
    //       "name":"salad",
    //       "image": "../imgs/salad.webp"
    //     },
    //     {
    //       "name":"soup",
    //       "image": "../imgs/soup.webp"
    //     },
    //     {
    //       "name":"dessert",
    //       "image": "../imgs/dessert.webp"
    //     },
    //     {
    //       "name":"alcohol",
    //       "image": "../imgs/alcohol.webp"
    //     },
    //     {
    //       "name":"drinks",
    //       "image": "../imgs/drinks.webp"
    //     },
    //     {
    //       "name":"holiday",
    //       "image": "../imgs/holiday.webp"
    //     },
    //     {
    //       "name":"snacks",
    //       "image": "../imgs/snack.webp"
    //     },
    //   ]
    // );
//   } catch (error) {
//     console.log('err', error)
//   }
// }

// insertData();
