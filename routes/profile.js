const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Profile Routes - simplified for now

router.put("/profileimage/:id", upload.single("file"), profileController.addProfileImage);

module.exports = router;