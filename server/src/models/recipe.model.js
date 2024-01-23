const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

// MODIFIER
const ModifiersSchema = new Schema({
    // id: { type: String, required: true },
    name: { type: String, required: true },
})

const ModifierModel = models.modifier || model("modifiers", ModifiersSchema);

const ModifierCreateValidationSchema = Joi.object({
    // id: Joi.string().required(),
    name: Joi.string().required(),
})


// TOPPING

const ToppingsSchema = new Schema({
    // id: { type: String, required: true },
    name: { type: String, required: false }
})

const ToppingModel = models.topping || model("toppings", ToppingsSchema)

const ToppingCreateValidationSchema = Joi.object({
    // id: Joi.string().required(),
    name: Joi.string().optional(),
})

const CategorySchema = new Schema({
    name: { type: String, required: true },
})

const CategoryModel = models.category || model("categories", CategorySchema);

const CategoryCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
})


// RECIPE

const RecipesSchema = new Schema({
    name: { type: String, required: true },
    modifiers: {
        type: [ModifiersSchema],
        _id: false
    },
    toppings: [ToppingsSchema],
    category: { type: String, required: true },
    price: { type: Number, required: true },
})

const RecipeModel = models.recipe || model("recipes", RecipesSchema);

const RecipeCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
    modifiers: Joi.array().items(ModifierCreateValidationSchema).min(1).required(),
    toppings: Joi.array().items(ToppingCreateValidationSchema),
    category: Joi.string().required(),
    price: Joi.number().required()
});



// DRINKS

const DrinkSchema = new Schema({
    name: { type: String, required: true },
    volume: { type: Number, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true }
})

const DrinkModel = models.drink || model("drinks", DrinkSchema);

const DrinkCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
    volume: Joi.number().required(),
    description: Joi.string(),
    price: Joi.number().required()
})

module.exports = { ModifierModel, ModifierCreateValidationSchema, ToppingModel, ToppingCreateValidationSchema, CategoryModel, CategoryCreateValidationSchema, RecipeModel, RecipeCreateValidationSchema, DrinkModel, DrinkCreateValidationSchema };