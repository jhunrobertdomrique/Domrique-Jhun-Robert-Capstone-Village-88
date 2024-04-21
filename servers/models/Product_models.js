const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [false, "Description is not required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    image: {
        type: String,
        required: [false, "Image is not required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
    userOrders: [
        {
            userId: {
                type: String,
                required: [true, "UserId is required"],
            },
            orderId: {
                type: String,
                required: [false, "OrderId is optional"],
            },
        },
    ],
});

module.exports = mongoose.model("Product", productSchema);
