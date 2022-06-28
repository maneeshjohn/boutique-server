import mongoose from "mongoose";
import { PassportStatic } from "passport";

import PassportJwt from "passport-jwt";
import { SECRET_KEY } from "./db";
import { User } from "../models";

const options = {
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}

export default (passport: PassportStatic) => {
  passport.use(
    new PassportJwt.Strategy(options, (user, done) => {
      User.findById(user.id)
        .then(user => {
          if(user){
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(e => console.log(e));
    })
  )
}