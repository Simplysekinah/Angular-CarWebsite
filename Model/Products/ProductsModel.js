const mongoose = require("mongoose")
const { type } = require("os")
const Vehincle = {
    Bus: 'bus',
    Car: 'car',
    Bike: 'bike'
}
const productSchema = new mongoose.Schema({
        name: { type: String, required: true },
        type: { type: String, enum: ['SUV','MPV', 'Sedan', 'Sport', 'Coupe','Hatchback'], required: true },
        fuelCapacity: { type: String ,enum:['90L','80L', '70L'], required: true},
        steering: { type: String, enum: ['Automatic', 'Manual'], required: true },
        capacity: { type: String,enum: ['2 people','4 people', '6 people', '8 or More']},
        price: { type: Number, required: true }, // store as a number
        available: { type: Boolean, default: true },
        description: { type: String },
        reviews: [
            {
                user: String,
                rating: Number,
                comment: String
            }
        ],
        category: { type: String, enum: ['popular', 'recommendation'], required: true },
        image: { type: String }

    // title: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     // trim:true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true,
    //     // unique:true
    // },
    // category: {
    //     type: String,
    //     require: true,
    //     enum: Object.values(Vehincle)
    // },
    // price: {
    //     type: Number,
    // },
    // color: {
    //     type: String
    // },
    // availability: {
    //     type: Boolean,
    //     default: true
    // }
}, { timestamps: true })



const ProductModel = mongoose.models.Products || mongoose.model("Products", productSchema)

module.exports = ProductModel