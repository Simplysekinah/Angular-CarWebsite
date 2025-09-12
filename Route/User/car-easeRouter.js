const express =require('express')
const { signup, signin, forgotPassword, verifyPassword, resetPassword, tokenverification, getUser, userInfo } = require('../../Controller/UserAuth/UserAuthController')
const {validate} =require('../../Middleware/Admin/adminValidator');
const { userValidator, loginValidator } = require('../../Middleware/User/userValidate');
const Router =express.Router()

Router.post("/signup", validate(userValidator), signup)
Router.post("/signin",validate(loginValidator),signin)
Router.get("/homepage", tokenverification)
Router.post("/forget",forgotPassword)
Router.post("/verify",verifyPassword)
Router.post("/reset",resetPassword)
Router.post("/getuser",getUser)
Router.post("/updateuser",userInfo)


module.exports = Router