
import { admin, main } from "../Utils/api"
export const api = {
  signup: `${main}/signup`,
  signin: `${main}/signin`,
  homepage: `${main}/homepage`,
  forgetpassword: `${main}/forget`,
  resetpassword: `${main}/verify`,
  verifypassword: `${main}/reset`
}
export const adminapi={
  register: `${admin}/register`,
  login: `${admin}/signin`,
  dashboard: `${admin}/dashboard`,
  createproduct: `${admin}/createProduct`,
  getproducts: `${admin}/getProduct`,
  getbycategory: `${admin}/getProduct/:category`,
  updateproduct:`${admin}/updateProduct/:id`,
  deleteproduct:`${admin}/deleteProduct/:id`
}
