// Modules
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";

import router from "./routes";
import passportConfig from "./config/passport";
import { DB_URI } from "./config/db";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect(DB_URI)
.then(() => console.log('connected to db...'))
.catch((e) => console.log(e));

passportConfig(passport);
app.use("/api", router);


const port = 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));