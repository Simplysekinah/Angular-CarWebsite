const express =require('express')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminModel = require('../../Model/Admin/adminModel')
const { generateToken,verifyToken } = require('../../Service/SessionService')


const adminSignup=async (request, response,next) => {
    try {
        const {email,username,password,role} = request.body
        console.log(request.body)
        const admin = await adminModel.create({email,username,password,role})
        response.status(201).send({admin,message:'Admin Signup Successfully'})
    } catch (error) {
        next(error)
        console.log(error)
    }
}

const adminSignin=async (request, response,next) => {
    try {
        const {email,password} = request.body
        const admin = await adminModel.findOne({email:email})
        if(!admin){
            response.status(500).send({message:'User notfound'})
        }
        const compare = await bcrypt.compare(password,admin.password)
        if(!compare){
            response.status(500).send({message:'Invalid password'})
        }
        let emailToken = email
        const token = generateToken(emailToken)
        console.log(token);
        return response.status(200).send({ admin, token, message: "Welcome" + admin.username })
    } catch (error) {
        next(error)
    }
}

const tokenverification = async (request, response, next) => {
    try {
        let token = request.headers.authorization.split(" ")[1]
        // token = token.
        const email = verifyToken(token)
        console.log(token);
        response.status(200).send({ email })
    } catch (error) {
        // console.log(error);
        next(error)
    }
}

module.exports ={adminSignup,adminSignin,tokenverification}