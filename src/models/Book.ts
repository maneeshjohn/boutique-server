import { Schema } from "mongoose";

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    default: ""
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default BookSchema;