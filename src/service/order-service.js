const Joi = require('joi');
const { OrderRepository } = require("../database");
const {
    NotFoundError,
    AuthorizeError,
    ValidationError,
    APIError,
} = require("../utils/errors/app-errors");

class OrderService{
    constructor(){
        this.repository = new OrderRepository();
    }

    async CreateOrder(userInputs){
        try{
            const validatedInputs = await this.ValidatedInputs(userInputs);
            
            const data = await this.repository.CreateOrder(validatedInputs);

            return data;
        }catch(err){
            throw err;
        }
    }

    async ValidatedInputs(userInputs){
        try{
            const schema = Joi.object({
                name: Joi.string()
                .min(3)
                .max(30).required(),
                phone : Joi.string().required(),
                address: Joi.string()
                .min(3)
                .max(30).required(),
                items: Joi.array().min(1).items(
                    Joi.object({
                        name: Joi.string().required(),
                        price: Joi.number().min(0).required(),
                        image: Joi.string().optional(),
                        size : Joi.string().optional(),
                        quantity: Joi.number().integer().min(1).required(),
                    })
                ).required().messages({
                  'array.required': 'Items is required.',
                  'array.min': 'At least one item is required.'
                }),
                shippingFee: Joi.number().messages({
                    'any.required': 'Shipping fee is required.'
                }),
                status: Joi.string().valid("Order Requested", "Order Completed").messages({
                    'any.only': 'Order status must be either "Order Requested" or "Order Completed".'
                }),
            });

            const validatedInputs = await schema.validateAsync(userInputs, { abortEarly: false });

            return validatedInputs;
        }catch(err){
            throw err;
        }
    }
};

module.exports = OrderService;