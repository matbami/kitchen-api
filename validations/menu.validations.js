import Joi from 'joi';

export const createMenuSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).required(),

});

export const menuIdSchema = Joi.object({
  id: Joi.string().required(),
});
