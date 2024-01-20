const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(
    session({
        secret: "VeryS3cr3t",
        resave: false,
        saveUninitialized: true,
        // Set to HTTPS if it's live
        cookie: { secure: false },
        credentials: true,
    })
)

//Import routers
const { adminRouter } = require("./routes/admin.route");
const { recipeRouter } = require("./routes/recipe.route");
const { orderRouter } = require("./routes/order.route");

//Add routers
app.use("/api/admin", adminRouter);
app.use("/api/dashboard", recipeRouter);
app.use("/api/order", orderRouter);

module.exports = { app };