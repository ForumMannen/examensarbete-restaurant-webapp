const express = require("express");
const { register, login, logout, seeSecret } = require("../controllers/admin.controller");
const { AdminCreateValidationSchema } = require("../models/admin.model");
const { validate, isLoggedIn } = require("../middlewares");

const adminRouter = express
    .Router()
    .post("/register", validate(AdminCreateValidationSchema), register)
    .post("/login", login)
    .post("/logout", logout)
    .get("/seeSecret", isLoggedIn, seeSecret);

module.exports = { adminRouter };