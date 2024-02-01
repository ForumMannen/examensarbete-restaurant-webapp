const express = require("express");
const session = require("express-session");

//Creating an Express application instance
const app = express();

//Parse JSON bodies of incoming requests
app.use(express.json());

//Session management
app.use(
    session({
        secret: "VeryS3cr3t",
        resave: false,
        saveUninitialized: true,
        // Set to true for HTTPS if it's live
        cookie: { secure: false },
        credentials: true,
    })
)

//Import routers
const { adminRouter } = require("./routes/admin.route");
const { recipeRouter } = require("./routes/recipe.route");
const { orderRouter } = require("./routes/order.route");

//Add routers and their paths
app.use("/api/admin", adminRouter);
app.use("/api/dashboard", recipeRouter);
app.use("/api/order", orderRouter);

module.exports = { app };