const express =require('express')
const { addFavorite, removeFavorite, getUserFavorites } = require('../Controller/UserAuth/UserProductList')

const Router =express.Router()

Router.post('/favourite',addFavorite)
Router.post('/getfavourite',getUserFavorites)
// Router.delete('/favourite',removeFavorite)


module.exports = Router