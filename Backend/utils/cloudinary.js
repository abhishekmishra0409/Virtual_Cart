const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = async() => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.SECRET_KEY,
        });
        await cloudinary.api.resources({ max_results: 1 });
        console.log("Connected with Cloudinary");
    } catch (error) {
        console.error("Error in connection with Cloudinary:", error);
    }
};

const cloudinaryUploadImg = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        asset_id: result.asset_id,
                        public_id: result.public_id,
                    });
                }
            }
        ).end(fileBuffer);
    });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(fileToDelete, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    message: "Deleted successfully",
                });
            }
        });
    });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg, cloudinaryConfig };
