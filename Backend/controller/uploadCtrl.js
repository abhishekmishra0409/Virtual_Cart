const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");
const multer = require("multer");

// Setting up Multer to handle file upload without saving it to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (fileBuffer) => cloudinaryUploadImg(fileBuffer, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const newpath = await uploader(file.buffer); // Upload file buffer directly
      console.log(newpath);
      urls.push(newpath);
    }

    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    console.error("Error in uploadImages:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error in deleteImages:", error);
    res.status(500).json({ success: false, message: "Image deletion failed" });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
  upload, // Exporting Multer configuration for route usage
};
