const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    }
},{timestamps:true})

adminSchema.pre("save",async function(next){
    let saltround = 10
    if(this.password !==undefined){
        this.password = await bcrypt.hash(this.password, saltround)
        next()
    }
})


const adminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema)

module.exports = adminModel