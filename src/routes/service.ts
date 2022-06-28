import express from "express";
import passport from "passport";

import { service } from "../controllers";

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }), service.create);

router.get("/", passport.authenticate('jwt', { session: false }), service.fetchAll);

router.get("/:id", passport.authenticate('jwt', { session: false }), service.fetchOne);

router.put("/:id", passport.authenticate('jwt', { session: false }), service.update);

router.delete("/:id", passport.authenticate('jwt', { session: false }), service.remove);

export default router;