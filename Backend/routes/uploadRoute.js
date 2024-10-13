const express = require("express");
const { uploadImages, deleteImages, upload } = require("../controller/uploadCtrl");
const router = express.Router();

router.post("/", upload.array("images", 10), uploadImages); // 10 is the max number of files
router.delete("/delete-img/:id", deleteImages);

module.exports = router;
