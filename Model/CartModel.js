const mongoose = require("mongoose")
const { type } = require("os")
const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        // trim:true
    },
    products:[
        {
                productId:{type:String},
                quantity:{ type:Number, default:1}
        }
        ],
},{timestamps:true})



const CartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema)

module.exports = CartModel