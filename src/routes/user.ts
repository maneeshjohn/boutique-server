import express from "express";

import { user } from "../controllers";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/", user.create);

router.post("/login", user.login);

router.get("/", verifyToken, user.fetchAll);

router.get("/:id", verifyToken, user.fetchOne);

router.put("/:id", verifyToken, user.update);

router.delete("/:id", verifyToken, user.remove);

export default router;