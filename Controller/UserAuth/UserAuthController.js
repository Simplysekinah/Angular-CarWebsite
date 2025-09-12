const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../../Model/User/userModel')
const { generateToken, verifyToken } = require('../../Service/SessionService')
const { forgotPasswordModel } = require('../../Model/User/ForgotpasswordModel')
const { forgotPasswordMail, SendMail } = require('../../Utils/mailer')
const { generateCode } = require('../../Config/User/codeGenerator')
const {cloudinary} = require("../../Config/User/Cloudinary")

const signup = async (request, response, next) => {
    console.log(request.body);
    try {
        const { fullname, username, email, password } = request.body
        const mailer = await SendMail(email, username)
        const user = await userModel.create({ fullname, username, email, password })
        if (mailer !== "Mail sent") {
            return response.status(500).send({ message: "Welcome mail not sent", status: false })
        }
        response.status(201).send({ user, message: "Account created successfully" })
    } catch (error) {
        // response.status(500).send({ message: error.message })
        next(error)
    }
}

const signin = async (request, response, next) => {
    try {
        console.log(request.body);
        const { email, password } = request.body

        console.log(password)
        const user = await userModel.findOne({ email })
        console.log(user)
        if (!user) {
            return response.status(404).send({ message: "User not found" })
        }
        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return response.status(400).send({ message: "Invalid password" })
        }
        let email2 = user.email
        const token = generateToken(email2)
        console.log(token);
        return response.status(200).send({ user, token, message: "Welcome" + user.username })

    } catch (error) {
        // console.log(error);
        // return response.status(500).send({ message: error.message })
        next(error)
    }
}
const tokenverification = async (request, response, next) => {
    try {
        let token = request.headers.authorization
        token = token.split(" ")[1]
        const email = verifyToken(token)
        console.log(token);
        response.status(200).send({ email })
    } catch (error) {
        // console.log(error);
        next(error)
    }
}
const forgotPassword = async (request, response, next) => {
    try {
        const { email } = request.body
        const OTP = generateCode()
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return response.status(404).send({ message: "Account does not exist", status: false })
        }

        //   return response.status(200).send({ message: "Account found", status: true })
        const forgotPassword = await forgotPasswordModel.create({
            email: email,
            OTP: OTP
        })
        await forgotPasswordMail(email, OTP)
        response.status(201).send({ message: "Check your mail for password reset token", status: true, OTP })
    } catch (error) {
        next(error)
    }
}

const verifyPassword = async (request, response, next) => {
    try {
        console.log(request.body)
        const { email, OTP } = request.body;
        const findOTP = await forgotPasswordModel.findOne({ email: email })
        console.log(findOTP, 'fineotp');
        if (!findOTP) {
            return response.status(404).send({ message: "Invalid OTP", status: false })
        }
        return response.status(200).send({ message: "OTP Confirmed", status: true })
        // const deleteForgotten = await forgotPasswordModel.deleteOne({ email: email })

        // const hashedPassword = await bcryptjs.hash(password, 10);
        // const update = await userModel.updateOne({ email: email }, { $set: { password: hashedPassword } })
        // if(!update.acknowledged) return response.status(500).send({message:"error updating password"})
        // response.status(204).send({message:"Password updated successfully"})
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (request, response, next) => {
    try {
        const { email, otp, password } = request.body;
        console.log(request.body)
        const findOTP = await forgotPasswordModel.findOne({ email: email, OTP: otp })
        if (!findOTP) return response.status(404).send({ message: "OTP not created. Kindly create one", status: false })
        const hashedPassword = await bcrypt.hash(password, 10);
        const update = await userModel.updateOne({ email: email }, { $set: { password: hashedPassword } })
        if (!update.acknowledged) return response.status(500).send({ message: "error updating password" })
        const deleteForgotten = await forgotPasswordModel.deleteOne({ email: email })

        response.status(200).send({ message: "Password updated successfully" })
    } catch (error) {
        next(error)
    }

}

const getUser = async (request, response, next) => {
    try {
        console.log(request.body);
        const { _id } = request.body
        console.log(_id)
        const user = await userModel.findById(_id)
        if (!user) {
            return response.status(404).send({ message: "No user Found" })
        }
        return response.status(200).send({ message: "user fetched", user })
    } catch (error) {
        next(error)
    }
}

const userInfo = async (request, response, next) => {
    try {
        const { fullname, username, email, password, picture, _id } = request.body
        console.log(request.body);
        const user = await userModel.findById({ _id: _id })
        console.log('user',user);
        if (!user) {
            return response.status(404).send({ message: "User does not exist", status: false })
        }
        let saltround = 10
        const pass = await bcrypt.hash(password,saltround)
        const profilepicture = await cloudinary.uploader.upload(picture)
        console.log("profilepicture:", profilepicture);
        let update = {
            picture: profilepicture.secure_url,
            fullname: fullname,
            username: username,
            email: email,
            password: pass,
        }

        const personal = await userModel.findByIdAndUpdate(
            { _id: user._id },
            { $set: update },
            { new: true })
        if (!personal) {
            return response.status(401).send({ message: "error occured" })
        }
        console.log(personal);
        return response.status(200).send({ personal })
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, signin,userInfo, tokenverification, forgotPassword, resetPassword, verifyPassword, getUser }