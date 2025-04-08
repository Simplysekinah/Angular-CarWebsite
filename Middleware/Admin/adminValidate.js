const yup = require("yup")
// impoet * as yup from "yup"

const adminValidator = yup.object({
    username: yup
        .string("username must be a string")
        .min(5, "username must not be less than five character")
        .max(100, "usernameame must not be greater than 100 character")
        .required("username is required")
        .matches(/^[a-zA-Z0-9]+$/, "username must contain only aphabets"),

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
})

const adminPageValidator = yup.object({
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
})

module.exports = { adminValidator, adminPageValidator }