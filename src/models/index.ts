import mongoose from "mongoose";
import UserSchema from "./User";
import ServiceSchema from "./Service";

export const User = mongoose.model("User", UserSchema);

export const Service = mongoose.model("Service", ServiceSchema);