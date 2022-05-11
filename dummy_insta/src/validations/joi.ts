import joi, { object } from 'joi';

export const uservalidation = joi.object({
    name: joi.string().min(5).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required()
})
export const bookvalidation = joi.object({
    title: joi.string().min(2).max(20).required(),
})
export const reviewvalidation = joi.object({
    review: joi.string().min(5).max(30).required()
})
