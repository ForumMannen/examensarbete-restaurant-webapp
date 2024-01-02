const express = require("express");
const { register, login, logout, seeSecret } = require("../controllers/admin.controller");
const { AdminCreateValidationSchema } = require("../models/admin.model");
const { validate, isLoggedIn } = require("../middlewares");

const adminRouter = express
    .Router()
    .post("/admin/register", validate(AdminCreateValidationSchema), register)
    .post("/admin/login", login)
    .post("/admin/logout", logout)
    .get("/admin/seeSecret", isLoggedIn, seeSecret);

module.exports = { adminRouter };