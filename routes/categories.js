const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const categoryController = require("../controllers/category");

router.get("/", categoryController.getCategories);
router.get("/:name", ensureAuth, categoryController.getCategoriesByName);


module.exports = router;
