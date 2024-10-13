const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: {
                    type: Number,
                    required: true,
                },
                color: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Color",
                },
            },
        ],
        paymentIntent: {
            amount: {
                type: Number,
            },
            currency: {
                type: String,
                default: "INR",
            },
            method: {
                type: String,
                enum: ["credit_card", "debit_card", "net_banking", "UPI", "wallet" ,"COD"],
                default: "COD",
            },
        },
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: ["Not Processed", "Processing", "Cancelled", "Delivered"],
        },
        orderby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model("Order", orderSchema);
