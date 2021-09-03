import { checkSchema } from "express-validator"
const productValidator = checkSchema({
    title: {
        notEmpty: true,
        isLength: {
            options: { min: 3 },
            errorMessage: "more than 3 char"
        },
        errorMessage: "required"
    },
    desc: {
        notEmpty: true,
        errorMessage: "required"
    },
    price: {
        notEmpty: true,
        isNumeric: {
            errorMessage: "number !"
        },
        errorMessage: "required"
    },
    slug: {
        errorMessage: "required",
        notEmpty: true,
    }
})

const orderValidator = checkSchema({
    date: {
        notEmpty: true,
        errorMessage: "required"
    },
    status: {
        notEmpty: true,
    },
    desc: {
        notEmpty: true,
    },
    total: {
        notEmpty: true,
    }
})
const orderLineValidator = checkSchema({
    order_id: {
        notEmpty: true,
        errorMessage: "required"
    },
    product_id: {
        notEmpty: true,
        errorMessage: "required"
    },
    qty: {
        notEmpty: true,
        errorMessage: "required"
    },
    price: {
        notEmpty: true,
        errorMessage: "required"
    }
})
export {
    productValidator,
    orderValidator,
    orderLineValidator
}