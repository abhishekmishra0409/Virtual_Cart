const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                color: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Color",
                }
            }
        ],
        cartTotal: {
            type: Number,
            default: 0,
        },
        totalAfterDiscount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model("Cart", cartSchema);
