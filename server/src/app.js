const express = require("express");
const app = express();

app.use(express.json());

//Import routers
const { adminRouter } = require("./routes/admin.route");

//Add routers
app.use("/api", adminRouter);

module.exports = { app };