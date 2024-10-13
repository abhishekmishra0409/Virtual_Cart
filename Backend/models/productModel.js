const mongoose = require("mongoose"); // Ensure Mongoose is imported

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // Trim whitespace
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0, // Ensure the price is not negative
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PCategory',
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0, // Ensure quantity is not negative
        },
        sold: {
            type: Number,
            default: 0,
            min: 0, // Ensure sold is not negative
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true, // Ensure public_id is provided
                },
                url: {
                    type: String,
                    required: true, // Ensure URL is provided
                },
            },
        ],
        color: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color'
        }],
        tags: {
            type: String,
            trim: true,
        },
        ratings: [
            {
                star: {
                    type: Number,
                    min: 0,
                    max: 5,
                },
                comment: String,
                postedby: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
            },
        ],
        totalrating: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Product", productSchema);
