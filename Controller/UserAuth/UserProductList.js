const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const RentalModel = require('../../Model/OrderModel')
const UserModel = require('../../Model/User/userModel')
const Favorite = require('../../Model/User/Favourites')
const { default: Stripe } = require('stripe')
const ProductModel = require('../../Model/Products/ProductsModel')
const stripe = Stripe(process.env.STRIPE_KEY)
const mongoose =require('mongoose');


const rentCar = async (request, response) => {
  try {
    // console.log(request.body);
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
    console.log(userId,'userid');
    if (!userId) {
      return response.status(400).json({ message: 'User ID is required!' });
    }
    // console.log(request.body);

    const user = await UserModel.findById({ _id: userId });
    console.log(user,'users');
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
    const { rentalId, amount, paid, token,carId } = request.body;

    const charge = await stripe.charges.create({
      amount: amount * 1000, // Stripe expects cents
      currency: 'ngn',
      source: token,
      description: 'Car Rental Payment'
    });
    console.log(charge,'charge');

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
    console.log('updated',updated);
    if (updated.paid === true && updated._id) {
      console.log(updated._id,'rentalid');
      console.log(carId,'carid');
      await ProductModel.findByIdAndUpdate(
        {_id: new mongoose.Types.ObjectId(carId)},
        { available: false },
        {new:true}
      );
    }


    response.json({ message: 'Payment confirmed and rental updated.', rental: updated });

  } catch (error) {
    response.status(500).json({ message: 'Error confirming payment', error: error.message });
  }
};


const addFavorite = async (req, res) => {
  try {
    const { userId, carId } = req.body;

    // Check if the favorite already exists
    const existing = await Favorite.findOne({ userId, carId });

    if (existing) {
      // If it exists, remove it
      await Favorite.findOneAndDelete({ userId, carId });
      return res.status(200).json({ message: 'Removed from favorites' });
    } else {
      // If it doesn't exist, add it
      const favorite = new Favorite({ userId, carId });
      await favorite.save();
      return res.status(201).json({ message: 'Added to favorites', favorite });
    }
  } catch (error) {
    console.error('Toggle error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const favorites = await Favorite.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate("carId"); // optional: populate car details if needed

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { rentCar, confirmPayment,addFavorite,getUserFavorites }
