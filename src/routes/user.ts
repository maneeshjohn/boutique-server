import express from "express";
import passport from "passport";

import { user } from "../controllers";

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }), user.create);

router.post("/login", passport.authenticate('jwt', { session: false }), user.login);

router.get("/", passport.authenticate('jwt', { session: false }), user.fetchAll);

router.get("/:id", passport.authenticate('jwt', { session: false }), user.fetchOne);

router.put("/:id", passport.authenticate('jwt', { session: false }), user.update);

router.delete("/:id", passport.authenticate('jwt', { session: false }), user.remove);

export default router;