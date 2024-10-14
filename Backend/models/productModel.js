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
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
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
            min: 0,
        },
        sold: {
            type: Number,
            default: 0,
            min: 0,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
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
