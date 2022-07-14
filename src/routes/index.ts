import express from "express";

import user from "./user";
import book from "./book";
import address from "./address";

const app = express();

app.use("/user", user);
app.use("/book", book);
app.use("/address", address);

export default app;