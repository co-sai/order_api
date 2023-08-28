const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    shippingFee : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["Order Requested", "Order Completed"],
        default : "Order Requested"
    },
    items: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                default : null
            },
            size : {
                type : String,
                default : null
            },
            quantity : {
                type : Number,
                required : true
            }
        },
    ],
}, {timestamps : true});

module.exports = mongoose.model("Order", orderSchema);