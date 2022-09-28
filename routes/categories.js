const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const categoryController = require("../controllers/category");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, categoryController.getCategories);


module.exports = router;
