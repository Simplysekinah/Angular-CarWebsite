const express =require('express')
const { rentCar, confirmPayment } = require('../Controller/UserAuth/UserProductList')

const Router =express.Router()

Router.post('/carRental',rentCar)
Router.post('/carRentals',confirmPayment)


module.exports = Router