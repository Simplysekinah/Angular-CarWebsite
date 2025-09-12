const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        // required:true,
        unique:true,
        // trim:true
    },
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
     picture: {
    type: String, // store image URL
    default: "https://images.pexels.com/photos/14157139/pexels-photo-14157139.jpeg"
  },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    let saltround = 10
    if(this.password !==undefined){
        this.password = await bcrypt.hash(this.password, saltround)
        next()
    }
})


const userModel = mongoose.models.Users || mongoose.model("Users", userSchema)

module.exports = userModel