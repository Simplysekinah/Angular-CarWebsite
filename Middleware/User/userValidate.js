const yup = require("yup");
// impoet * as yup from "yup"

const userValidator = yup.object({
  fullname: yup
    .string("Fullname must be a string")
    .min(5, "Fullname must not be less than five characters")
    .max(100, "Fullname must not be greater than 100 characters")
    .required("Fullname is required")
    .matches(/^[a-zA-Z\s]+$/, "Fullname must contain only alphabets"),

  username: yup
    .string("Username must be a string")
    .min(5, "Username must not be less than five characters")
    .max(100, "Username must not be greater than 100 characters")
    .required("Username is required")
    .matches(/^[a-zA-Z]+$/, "Username must contain only alphabets"),

  email: yup
    .string("Email must be a string")
    .email("Email is valid")
    .required("Email is required"),

  password: yup
    .string("password must be a string")
    .min(8, "password must not be less than eight character")
    .max(100, "password must not be greater than 100 character")
    .required("password is required")
    .matches(/^[a-zA-Z0-9]+$/, "password must contain only aphabets"),
});

const loginValidator = yup.object({
  email: yup
    .string("Email must be a string")
    .email("Email is valid")
    .required("Email is required"),

  password: yup
    .string("password must be a string")
    .min(5, "password must not be less than five character")
    .max(100, "password must not be greater than 100 character")
    .required("password is required")
    .matches(/^[a-zA-Z0-9]+$/, "password must contain only aphabets"),
});

module.exports = { userValidator, loginValidator };
