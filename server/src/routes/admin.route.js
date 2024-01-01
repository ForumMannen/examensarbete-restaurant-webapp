const express = require("express");
const { register, login } = require("../controllers/admin.controller");
const { AdminCreateValidationSchema } = require("../models/admin.model");

const adminRouter = express
    .Router()
    .post("/admin/register", register)
    .post("/admin/login", login);

module.exports = { adminRouter };