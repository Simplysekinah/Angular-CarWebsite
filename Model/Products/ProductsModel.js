const mongoose = require("mongoose")
const { type } = require("os")
const Vehincle ={
    Bus:'bus',
    Car:'car',
    Bike:'bike'
}
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        // trim:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        // unique:true
    },
    category:{
        type:String,
        require:true,
        enum: Object.values(Vehincle)
    },
    price:{
        type:Number,
    },
    color:{
        type: String
    },
    availability:{
        type:Boolean,
        default:true
    }
},{timestamps:true})



const ProductModel = mongoose.models.Products || mongoose.model("Products", productSchema)

module.exports = ProductModel