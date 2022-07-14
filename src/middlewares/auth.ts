import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { SECRET_KEY } from "../config/db";
import { ExtendedRequest } from "../types/user";

export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction){

  const token = req.headers["authorization"];
  
  if(!token){
    return res.status(401).json({ message: "Token is missing in headers" });
  }

  try {
    const decodedData = jwt.verify(token, SECRET_KEY);
    req.user = decodedData;
  } catch(err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  return next();
}