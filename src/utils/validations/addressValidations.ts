import Joi from "joi";

const addressSchema = Joi.object({
  userId: Joi.string().required(),
  region: Joi.string().min(8).max(30).required(),
  state: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  country: Joi.string().min(3).max(30).required(),
  coords: {
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }
});

const updateSchema = Joi.object({
  region: Joi.string().min(8).max(30).required(),
  state: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  country: Joi.string().min(3).max(30).required(),
  coords: {
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }
});

export {
  addressSchema,
  updateSchema
}