import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models";
import { userValidations } from "../utils/validations";
import { Role } from "../types/user";
import { SECRET_KEY } from "../config/db";

const create = (req: Request, res: Response) => {
  const { error } = userValidations.createSchema.validate(req.body);
  if(error) return res.status(400).json(error.details[0]);

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user){
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = new User(req.body);
      newUser.approved = newUser.role !== Role.Vendor;

      bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const { _id, email, role, approved, ..._ } = user;
              const token = jwt.sign({ id: _id, email, role, approved }, SECRET_KEY);
              const userData = { _id, email, role, approved };
              const resp = { user: userData, token };
              res.json(resp);
            })
            .catch(err => res.status(500).send(err));
        });
      });
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchOne = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then(user => {
      if(!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchAll = (_: Request, res: Response) => {
  User.find()
    .then(users => {
      return res.json(users || []);
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const update = (req: Request, res: Response) => {
  const { error } = userValidations.updateSchema.validate(req.body);
  if(error) return res.status(400).json(error.details[0]);

  const data = req.body;
  data.updated = Date.now();

  User.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then(user => {
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
  
}

const remove = (req: Request, res: Response) => {

}

const login = (req: Request, res: Response) => {
  const { error } = userValidations.loginSchema.validate(req.body);
  if(error) return res.status(400).json(error.details[0]);

  User.findOne({ email: req.body.email }).select("+password")
    .then(user => {
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      const { _id, email, name, approved, role } = user;
      bcrypt.compare(req.body.password, user.password)
        .then(success => {
          if(success) {
            const payload = { id: _id, name, email, role, approved };
            const token = jwt.sign(payload, SECRET_KEY);
            const userData = { _id, email, role, approved, name };
            return res.json({ user: userData, token });
          } else {
            return res.status(400).json({ message: "Invalid password" });
          }
        })
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

export { create, fetchAll, fetchOne, update, remove, login }