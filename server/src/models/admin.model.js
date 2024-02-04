const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

//ADMIN
//Defining the schema
const AdminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false }
});

//Creating the Model from the schema
const AdminModel = models.admin || model("admin", AdminSchema);

//Joi schema to validate incoming data from body
const AdminCreateValidationSchema = Joi.object({
    email: Joi.string().email().strict().required(),
    password: Joi.string().strict().required(),
    isAdmin: Joi.boolean().strict().required(),
});

module.exports = { AdminModel, AdminCreateValidationSchema };