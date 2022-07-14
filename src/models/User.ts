import { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  source: {
    type: String,
    name: String,
    file: Buffer
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
});

export default UserSchema;