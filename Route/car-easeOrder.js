const express =require('express')
const { rentCar } = require('../Controller/UserAuth/UserProductList')

const Router =express.Router()

Router.post('/carRental',rentCar)


module.exports = Router