const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const categoryController = require("../controllers/category");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", categoryController.getCategories);
router.get("/:name", categoryController.getCategoriesByName);


module.exports = router;
