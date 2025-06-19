const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const RentalModel = require('../../Model/OrderModel')
const UserModel = require('../../Model/User/userModel')


const rentCar = async (request, response) => {
    try {
        console.log(request.body);
        const { userId, rentalType,
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
            amount
        } = request.body
        console.log(userId);
        if (!userId) {
            return response.status(400).json({ message: 'User ID is required!' });
        }
        console.log(request.body);

        const user = await UserModel.findById({_id:userId});
        console.log(user);
        if (!user) return response.status(404).json({ message: 'User not found' });

        const rental = request.body;
        // console.log(rental);
        const rentalDetails = await RentalModel.create(rental);
        response.status(201).send({ message: 'Rental confirmed!', rentalDetails });
    } catch (error) {
        response.status(500).send({ message: 'Error processing rental', error:error.message });
    }
}
// PATCH /rentals/:id/confirm-payment
const confirmPayment = async (request, response) => {
  try {
    console.log(request.body);
    const {rentalId} = request.body;

    const updated = await RentalModel.findByIdAndUpdate(
      rentalId,
      { paid: true },
      { new: true }
    );

    response.json({ message: 'Payment confirmed and rental updated.', rental: updated });
  } catch (error) {
    response.status(500).json({ message: 'Error confirming payment', error });
  }
};

module.exports = { rentCar,confirmPayment }
