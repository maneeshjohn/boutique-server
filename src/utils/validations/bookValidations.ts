import Joi from "joi";

const serviceSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  author: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(50).max(250).required(),
  cover: Joi.string()
});

export {
  serviceSchema
}