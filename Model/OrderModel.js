const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true},
    names: { type: String, required: true, trim: true },
    phoneN: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    town: { type: String, required: true, trim: true },
    pickUpLocation: { type: String, required: true, trim: true },
    pickUpDate: { type: Date, required: true },
    pickUpTime: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "paypal", "Bank Transfer"] },
    dropOffLocation: { type: String, required: true, trim: true },
    dropOffDate: { type: Date, required: true },
    amount:{type:String,required:true},
    paid:{type:Boolean,default:false},
    dropOffTime: { type: String, required: true },
    terms: { type: Boolean, required: true, default: false }, // User must accept terms
    status: { type: String, default: "Pending", enum: ["Pending", "Confirmed", "Completed", "Canceled"] },
  },
  { timestamps: true }
);

const RentalModel = mongoose.models.Rental || mongoose.model("Rental", rentalSchema);

module.exports = RentalModel;