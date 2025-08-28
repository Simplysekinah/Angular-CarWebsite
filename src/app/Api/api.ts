
import { admin, main } from "../Utils/api"
const categoryP ='popular';
const categoryR ='recommendation';
export const api = {
  signup: `${main}/signup`,
  signin: `${main}/signin`,
  homepage: `${main}/homepage`,
  forgetpassword: `${main}/forget`,
  resetpassword: `${main}/verify`,
  verifypassword: `${main}/reset`,
  rentaldetails:`${main}/carRental`,
  confirmdetails:`${main}/carRentals`
}
export const adminapi={
  register: `${admin}/register`,
  login: `${admin}/signin`,
  dashboard: `${admin}/dashboard`,
  createproduct: `${admin}/createProduct`,
  getproducts: `${admin}/getProduct`,
  getbycategory: `${admin}/getProduct/${categoryP}`,
  getbycategorys: `${admin}/getProduct/${categoryR}`,
  getbyname: `${admin}/getProductname/`,
  getbyid: `${admin}/getProductbyid/`,
  updateproduct:`${admin}/updateProduct/:id`,
  deleteproduct:`${admin}/deleteProduct/:id`,
}
