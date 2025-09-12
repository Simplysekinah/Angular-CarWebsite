const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

// Set up storage on Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/Upload", // Change folder name as needed
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage }).single("image");

module.exports = upload;
