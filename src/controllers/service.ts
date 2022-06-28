import { Request, Response } from "express";

import { Service } from "../models";
import { serviceValidations } from "../utils/validations";

const create = (req: Request, res: Response) => {
  const { error } = serviceValidations.serviceSchema.validate(req.body);

  if(error){
    return res.status(400).json(error.details[0]);
  }

  Service.findOne({ name: req.body.name })
    .then(service => {
      if(service){
        return res.status(400).json({ message: "This service already exists" });
      }
      const newService = new Service(req.body);
      newService.save()
        .then(service => res.json(service))
        .catch(() => res.status(500).json({ message: "Something went wrong" }));
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchAll = (_: Request, res: Response) => {
  Service.find()
  .then(services => res.json(services || []))
  .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchOne = (req: Request, res: Response) => {
  Service.findById(req.params.id)
  .then(service => {
    if(!service) return res.status(404).json({ message: "Service doesn't exist" });
    return res.json(service);
  })
  .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const update = (req: Request, res: Response) => {
  const { error } = serviceValidations.serviceSchema.validate(req.body);

  if(error) res.status(400).json(error.details[0]);

  const data = req.body;
  data.updated = Date.now();

  Service.findOneAndUpdate({ user: req.params.id }, { $set: data }, { new: true })
    .then(service => {
      if(!service){
        return res.status(404).json({ message: "service doesn't exist" });
      }
      return res.json(service);
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const remove = (req: Request, res: Response) => {

}

export { create, fetchAll, fetchOne, update, remove };