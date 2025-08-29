const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const RentalModel = require('../../Model/OrderModel')
const UserModel = require('../../Model/User/userModel')
const { default: Stripe } = require('stripe')
const ProductModel = require('../../Model/Products/ProductsModel')
const stripe = Stripe(process.env.STRIPE_KEY)


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

    const user = await UserModel.findById({ _id: userId });
    console.log(user);
    if (!user) return response.status(404).json({ message: 'User not found' });

    const rental = request.body;
    // console.log(rental);
    const rentalDetails = await RentalModel.create(rental);
    response.status(201).send({ message: 'Rental confirmed!', rentalDetails });
  } catch (error) {
    response.status(500).send({ message: 'Error processing rental', error: error.message });
  }
}
// PATCH /rentals/:id/confirm-payment
const confirmPayment = async (request, response) => {
  try {
    console.log(request.body, 'rentals');
    const { rentalId, amount, paid, token } = request.body;

    const charge = await stripe.charges.create({
      amount: amount * 1000, // Stripe expects cents
      currency: 'ngn',
      source: token,
      description: 'Car Rental Payment'
    });
    console.log(charge);

    const updated = await RentalModel.findByIdAndUpdate(
      rentalId,
      {
        currency: charge.currency,
        status: charge.status,
        amount: charge.amount,
        paid: true,
        stripeChargeId: charge.id
      },
      { new: true }
    );

    if (updated.paid === true && updated.rentalId) {
      await ProductModel.findByIdAndUpdate(
        updated.rentalId,
        { available: false }
      );
    }


    response.json({ message: 'Payment confirmed and rental updated.', rental: updated });

  } catch (error) {
    response.status(500).json({ message: 'Error confirming payment', error: error.message });
  }
};

module.exports = { rentCar, confirmPayment }
