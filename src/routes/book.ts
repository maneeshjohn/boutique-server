import express from "express";

import { book } from "../controllers";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, book.create);

router.get("/", verifyToken, book.fetchAll);

router.get("/:id", verifyToken, book.fetchOne);

router.put("/:id", verifyToken, book.update);

router.delete("/:id", verifyToken, book.remove);

export default router;