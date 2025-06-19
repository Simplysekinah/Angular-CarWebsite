export interface UserInterface {
  fullname: string;
  username: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
}
export interface forgetPassword {
  email: string;
}
export interface resetPassword {
  otp: string;
  email: string;
}
export interface verifyPassword {
  email: string;
  otp: string;
  newpassword: string;
  // confirmpassword: string;
}
export interface Review {
  user: string;
  rating: number;
  comment: string;
}
export interface uploadProduct {
  name: string;
  type: string;
  fuelCapacity: string;
  steering: string;
  capacity: Number;
  price: Number;
  availability: string;
  description: string;
  reviews: Review;
  category: string;
  image: string;
}

export interface rentCar {
  _id:String,
  names: String,
  phoneN: String,
  address: String,
  town: String,
  pickUpLocation: String,
  pickUpDate: Date,
  pickUpTime: String,
  paymentMethod: String,
  // cardNumber: String,
  // expirationDate: String,
  // cvc: String,
  dropOffLocation: String,
  dropOffDate: Date,
  dropOffTime: String,
  terms: boolean,
  amount:String,
  paid:boolean
}
