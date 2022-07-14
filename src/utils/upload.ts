import { NextFunction, Request, Response } from "express";
import multer from "multer";

const upload = multer({ dest: "uploads" }).single("image");

const uploadImage = (req: Request, res: Response, cb: NextFunction) => {
  upload(req, res, cb);
}

export default uploadImage;