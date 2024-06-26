import Joi from "joi";

export const vendorIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const vendorQuerySchema = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});
