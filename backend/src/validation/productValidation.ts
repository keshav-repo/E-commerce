import Joi from 'joi';

export const productSchema = Joi.object({
    productId: Joi.string().optional().messages({
        'string.base': 'Product ID must be a string'
    }),
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 100 characters',
        'any.required': 'Name is required',
    }),
    description: Joi.string().min(10).max(500).required().messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description should have at least 10 characters',
        'string.max': 'Description should have at most 500 characters',
        'any.required': 'Description is required',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required',
    }),
    category: Joi.string().valid('Electronics', 'Clothing', 'Home', 'Toys').required().messages({
        'string.base': 'Category must be a string',
        'any.only': 'Category must be one of the following: Electronics, Clothing, Home, Toys',
        'any.required': 'Category is required',
    }),
});
