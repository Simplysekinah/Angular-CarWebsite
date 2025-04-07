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
export interface uploadProduct {
  title: string;
  price: Number;
  description: string;
  category: string;
  availability: string;
  color: string;
  image: string;
}
