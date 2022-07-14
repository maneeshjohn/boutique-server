import Joi from "joi";
import { Role } from "../../types/user";

const createSchema = Joi.object({
  email: Joi.string().email().min(10).max(30).required(),
  password: Joi.string().min(8).max(20).required(),
  role: Joi.string().valid(Role.Customer, Role.Vendor).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(10).max(30).required(),
  password: Joi.string().min(8).max(20).required()
});

const updateSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  approved: Joi.boolean(),
  image: Joi.string()
});

export {
  createSchema,
  loginSchema,
  updateSchema
}