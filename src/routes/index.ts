import express from "express";
import user from "./user";
import service from "./service";

const app = express();

app.use("/user", user);
app.use("/service", service);

export default app;