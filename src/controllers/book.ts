import { Request, Response } from "express";

import { Book } from "../models";
import { bookValidations } from "../utils/validations";

const create = (req: Request, res: Response) => {
  const { error } = bookValidations.serviceSchema.validate(req.body);

  if(error){
    return res.status(400).json(error.details[0]);
  }

  Book.findOne({ name: req.body.name })
    .then(book => {
      if(book){
        return res.status(400).json({ message: "This book already exists" });
      }
      const newBook = new Book(req.body);
      newBook.save()
        .then(book => res.json(book))
        .catch(() => res.status(500).json({ message: "Something went wrong" }));
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchAll = (_: Request, res: Response) => {
  Book.find()
  .then(books => res.json(books || []))
  .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const fetchOne = (req: Request, res: Response) => {
  Book.findById(req.params.id)
  .then(book => {
    if(!book) return res.status(404).json({ message: "Book doesn't exist" });
    return res.json(book);
  })
  .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const update = (req: Request, res: Response) => {
  const { error } = bookValidations.serviceSchema.validate(req.body);

  if(error) res.status(400).json(error.details[0]);

  const data = req.body;
  data.updated = Date.now();

  Book.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then(book => {
      if(!book){
        return res.status(404).json({ message: "book doesn't exist" });
      }
      return res.json(book);
    })
    .catch(() => res.status(500).json({ message: "Something went wrong" }));
}

const remove = (req: Request, res: Response) => {

}

export { create, fetchAll, fetchOne, update, remove };