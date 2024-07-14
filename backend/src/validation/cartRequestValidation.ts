import Joi from 'joi';

export const CartRequestValidation = Joi.object({
    productId: Joi.number().integer().messages({
        'string.base': 'Product ID must be a number',
        'number.integer': 'Product ID must be an integer',
        'any.required': 'Product ID is required'
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required',
    }),
    operation: Joi.string().valid('INC', 'DEC').required()
        .messages({
            'string.base': 'Operation must be a string',
            'any.only': 'Operation must be either INC or DEC',
            'any.required': 'Operation is required'
        })
});
