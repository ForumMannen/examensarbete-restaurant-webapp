const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const AdminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false }
});

const AdminModel = models.admin || model("admin", AdminSchema);

const AdminCreateValidationSchema = Joi.object({
    email: Joi.string().email().strict().required(),
    password: Joi.string().strict().required(),
    isAdmin: Joi.boolean().strict().required(),
});

module.exports = { AdminModel, AdminCreateValidationSchema };