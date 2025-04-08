const mongoose = require("mongoose")
const { type } = require("os")
const orderSchema = new mongoose.Schema({
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
    amount:{ type:Number,required:true},
    address:{ type:Object,required:true},
    status:{ type:String,default:'Pending'}
},{timestamps:true})



const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema)

module.exports = OrderModel