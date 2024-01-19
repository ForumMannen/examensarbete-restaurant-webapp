const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const OrderItemSchema = new Schema(
    {
        product: { type: String, required: true },
        quantity: { type: String, required: true },
        price: { type: Number, default: 0 }
    }
)

const CustomerSchema = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true }
    }
)

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

const OrderModel = models.order || model("order", OrderSchema);

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