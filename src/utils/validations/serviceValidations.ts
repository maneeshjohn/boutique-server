import Joi from "joi";

const serviceSchema = Joi.object({
  name: Joi.string().min(8).max(20).required(),
  description: Joi.string().min(20).max(100)
});

export {
  serviceSchema
}