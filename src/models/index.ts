import mongoose from "mongoose";

import UserSchema from "./User";
import BookSchema from "./Book";
import AddressSchema from "./Address";

export const User = mongoose.model("User", UserSchema);

export const Book = mongoose.model("Service", BookSchema);

export const Address = mongoose.model("Address", AddressSchema);