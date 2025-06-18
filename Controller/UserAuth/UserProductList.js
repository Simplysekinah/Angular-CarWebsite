const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const RentalModel = require('../../Model/OrderModel')
const UserModel = require('../../Model/User/userModel')


const rentCar = async (request, response) => {
    try {
        console.log(request.body);
        const { _id, rentalType,
             names,
            phoneN,
            address,
            town,
            pickUpLocation,
            pickUpDate,
            pickUpTime,
            paymentMethod,
            dropOffLocation,
            dropOffDate,
            dropOffTime,
            terms,
        } = request.body
        console.log(_id);
        if (!_id) {
            return response.status(400).json({ message: 'User ID is required!' });
        }
        console.log(request.body);

        const user = await UserModel.findById(_id);
        console.log(user);
        if (!user) return response.status(404).json({ message: 'User not found' });

        const rental = request.body;
        console.log(rental);
        // await rental.save();
        // res.status(201).send({ message: 'Rental confirmed!', rental });
    } catch (error) {
        response.status(500).send({ message: 'Error processing rental', error });
    }
}

module.exports = { rentCar }
