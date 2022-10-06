const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

module.exports = {
  getCreateRecipe: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      res.render("create-recipe.ejs", { recipes: recipes, user: req.user, title: 'Vital Cook Book - Create Recipe' });
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
      const recipes = await Recipe.find({favorites: req.user.id}).sort({ createdAt: "desc" }).lean();
      res.render("favorites.ejs", { recipes: recipes, title:'Vital Cook Book - Recipe Feed' });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id});
      res.render("recipe.ejs", { recipe: recipe, comments: comments, user: req.user, title:`Vital Cook Book - ${recipe.title}`});
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
    let liked = false; 
    try {
      let recipe = await Recipe.findById({ _id: req.params.id });
      liked = (recipe.likes.includes(req.user.id));
    } catch (err) {
      console.log(err);
    }

    if(liked){
      try{
        await Recipe.findOneAndUpdate({ _id: req.params.id },
          {$pull : {'likes': req.user.id}
        })
        console.log('Removed User from Likes array');
        res.redirect(`/recipe/${req.params.id}`);
      } catch(err){
        console.log(err)
      }
    }

    else {
      try{
        await Recipe.findOneAndUpdate({ _id: req.params.id },
          {$addToSet: {'likes': req.user.id}
        })
        console.log('Added User to Likes array');
        res.redirect(`/recipe/${req.params.id}`);
      } catch(err){
        console.log(err)
      }
    }
  },
  favoriteRecipe: async (req, res) => {
    let bookmarked = false;
    try {
      let recipe = await Recipe.findById({ _id: req.params.id });
      bookmarked = (recipe.favorites.includes(req.user.id));
    } catch (err) {
      console.log(err);
    }

    if(bookmarked){
      try {
        await Recipe.findOneAndUpdate({ _id: req.params.id }, 
        {$pull : {'favorites': req.user.id}
        })
        console.log('Removed User from favorites array');
        res.redirect(`/recipe/${req.params.id}`);
      }catch(err){
        console.log(err)
      }
    }

    else {
      try{
        await Recipe.findOneAndUpdate({ _id: req.params.id },
          {$addToSet : {'favorites' : req.user.id}
          })
          console.log('Added user to favorites array')
          res.redirect(`/recipe/${req.params.id}`);
      }catch(err){
        console.log(err)
      }
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
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: req.params.id,
      });
      console.log("Comment has been created");
      res.redirect(`/recipe/${req.params.id}`)
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    let liked = false; 
    let comments = await Comment.findById({ _id: req.params.id });
    try {
      liked = (comments.likes.includes(req.user.id));
    } catch (err) {
      console.log(err);
    }

    if(liked){
      try{
        await Comment.findOneAndUpdate({ _id: req.params.id },
          {$pull : {'likes': req.user.id}
        })
        console.log('Removed User from Likes array');
        res.redirect(`/recipe/${comments.post}`);
      } catch(err){
        console.log(err)
      }
    }

    else {
      try{
        await Comment.findOneAndUpdate({ _id: req.params.id },
          {$addToSet: {'likes': req.user.id}
        })
        console.log('Added User to Likes array');
        res.redirect(`/recipe/${comments.post}`);
      } catch(err){
        console.log(err)
      }
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/recipe/${req.params.recipeId}`);
    } catch (err) {
      res.redirect(`/recipe/${req.params.recipeId}`);
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
