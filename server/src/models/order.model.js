const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

//ORDERITEM
//Defining the schema
const OrderItemSchema = new Schema(
    {
        product: { type: String, required: true },
        quantity: { type: String, required: true },
        unitPrice: { type: Number, default: 0 }
    }
)

//CUSTOMER
//Defining the schema
const CustomerSchema = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true }
    }
)

//ORDER
//Defining the schema
const OrderSchema = new Schema(
    {
        customer: [CustomerSchema],
        orderItems: [OrderItemSchema],
        paymentStatus: { type: String, required: true },
        createdAt: { type: String, required: true },
        sessionId: { type: String, required: true },
        totalPrice: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

//Creating the Model from the OrderSchema
const OrderModel = models.order || model("order", OrderSchema);

//Joi schema to validate incoming data from body
const OrderCreateValidationSchema = Joi.object({
    customer: Joi.array()
        .items(
            Joi.object({
                email: Joi.string().email().required(),
                name: Joi.string().required(),
            })
        )
        .strict()
        .required(),
    orderItems: Joi.array()
        .items(
            Joi.object({
                product: Joi.string().strict().required(),
                quantity: Joi.number().strict().required(),
                price: Joi.number(),
            })
        ),
    paymentStatus: Joi.string().required(),
    createdAt: Joi.string().required(),
    sessionId: Joi.string().required(),
    totalPrice: Joi.number().required()
})

module.exports = { OrderModel, OrderCreateValidationSchema };