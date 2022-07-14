import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export enum Role {
  Customer = "Customer",
  Vendor = "Vendor"
}

export interface ExtendedRequest extends Request {
  user?: string | JwtPayload;
}