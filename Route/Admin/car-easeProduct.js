const express = require('express');
const { adminSignup, adminSignin, tokenverification } = require('../../Controller/AdminAuth/AdminController');
const { adminValidator, adminPageValidator } = require('../../Middleware/Admin/adminValidate');
const {validate} =require('../../Middleware/Admin/adminValidator');
const { CreateProducts, getAllProducts, getAllProductsbyCategory, updateProducts, deleteProducts } = require('../../Controller/Product/productController');

const Router =express.Router()

Router.post('/register',validate(adminValidator),adminSignup)
Router.post('/signin',validate(adminPageValidator),adminSignin)
Router.get('/dashboard',tokenverification)
Router.post('/createProduct',CreateProducts)
Router.get('/getProduct',getAllProducts)
Router.get('/getProduct/:category',getAllProductsbyCategory)
Router.get('/updateProduct/:id',updateProducts)
Router.get('/deleteProduct/:id',deleteProducts)


module.exports = Router