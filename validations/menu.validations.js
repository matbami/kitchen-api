import Joi from "joi";

export const createMenuSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required()
});

export const updateMenuSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
  });

export const menuIdSchema = Joi.object({
  id: Joi.string().required(),
});
