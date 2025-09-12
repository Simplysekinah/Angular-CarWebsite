const mongoose =require('mongoose');
const express =require('express');
require('dotenv').config()
const userRouter = require('./Route/User/car-easeRouter')
const adminRouter = require('./Route/Admin/car-easeProduct')
const orderRouter = require('./Route/car-easeOrder')
const favRouter = require('./Route/car-easeCart')

const app = express();
const port = process.env.PORT
const cors =require('cors');
const Stripe = require('stripe')
const stripe =Stripe(process.env.STRIPE_KEY)

app.use(express.json({extended:true, limit:"100mb"}))
app.use(express.urlencoded({extended:true, limit:"100mb"}))
app.use((cors({origin: "*"})))
app.use("/car-ease",userRouter,orderRouter,favRouter)
app.use("/adminauth",adminRouter)

const uri = process.env.MONGO_URI
mongoose.connect(uri).then((res)=>{
    console.log("connected to mongoose");
}).catch((error)=>{
    console.log(error);
})

const Server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})