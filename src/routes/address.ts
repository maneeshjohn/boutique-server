import express from "express";

import { address } from "../controllers";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, address.create);

router.get("/", verifyToken, address.fetchAll);

router.get("/:id", verifyToken, address.fetchOne);

router.put("/:id", verifyToken, address.update);

router.delete("/:id", verifyToken, address.remove);

export default router;