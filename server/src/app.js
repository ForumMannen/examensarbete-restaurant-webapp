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
        // cookie: { secure: true }
    })
)

//Import routers
const { adminRouter } = require("./routes/admin.route");

//Add routers
app.use("/api", adminRouter);

module.exports = { app };