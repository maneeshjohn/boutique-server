import { Request, Response } from "express";

import { Address } from "../models";
import { addressValidations } from "../utils/validations";
import { ExtendedRequest } from "../types/user";
import { JwtPayload } from "jsonwebtoken";

const create = (req: ExtendedRequest, res: Response) => {
  const { error } = addressValidations.addressSchema.validate(req.body);

  if(error){
    return res.status(400).json(error.details[0]);
  }

  const { id } = req.user as JwtPayload;

  const newAddress = new Address({
    userId: id,
    ...req.body
  });
  newAddress.save()
    .then(address => res.json(address))
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchAll = (req: ExtendedRequest, res: Response) => {

  const { id } = req.user as JwtPayload;

  Address.find({ userId: id })
  .then(addresses => res.json(addresses || []))
  .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchOne = (req: Request, res: Response) => {
  Address.findById(req.params.id)
  .then(address => {
    if(!address) return res.status(404).json({ message: "Address doesn't exist" });
    return res.json(address);
  })
  .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const update = (req: Request, res: Response) => {
  const { error } = addressValidations.updateSchema.validate(req.body);

  if(error) res.status(400).json(error.details[0]);

  const data = req.body;
  data.updated = Date.now();

  Address.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then(address => {
      if(!address){
        return res.status(404).json({ message: "Address doesn't exist" });
      }
      return res.json(address);
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const remove = (req: Request, res: Response) => {
  Address.findByIdAndRemove({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Address deleted successfully" }))
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

export { create, fetchAll, fetchOne, update, remove };