const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Profile Routes - simplified for now

router.post("/editProfile/:id", upload.single("file"), profileController.editProfile);
router.get("/:userName", ensureAuth, profileController.getProfile);
module.exports = router;