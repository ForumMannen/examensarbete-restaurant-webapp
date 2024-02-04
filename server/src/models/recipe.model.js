const { Schema, model, models, Types } = require("mongoose");
const Joi = require("joi");


// MODIFIER
//Defining the schema
const ModifiersSchema = new Schema({
    name: { type: String, required: true },
})

//Creating the Model from the schema
const ModifierModel = models.modifier || model("modifiers", ModifiersSchema);

//Joi schema to validate incoming data from body
const ModifierCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
})


// TOPPING
//Defining the schema
const ToppingsSchema = new Schema({
    name: { type: String, required: false }
})

//Creating the Model from the schema
const ToppingModel = models.topping || model("toppings", ToppingsSchema)

//Joi schema to validate incoming data from body
const ToppingCreateValidationSchema = Joi.object({
    name: Joi.string().optional(),
})

//CATEGORY
//Defining the schema
const CategorySchema = new Schema({
    name: { type: String, required: true },
})

//Creating the Model from the schema
const CategoryModel = models.category || model("categories", CategorySchema);

//Joi schema to validate incoming data from body
const CategoryCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
})


// RECIPE
//Defining the schema
const RecipesSchema = new Schema({
    name: { type: String, required: true },
    modifiers: [String],
    toppings: [String],
    category: { type: String, required: true },
    price: { type: Number, required: true },
})

//Creating the Model from the schema
const RecipeModel = models.recipe || model("recipes", RecipesSchema);

//Joi schema to validate incoming data from body
const RecipeCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
    modifiers: Joi.array().items(Joi.object({
        name: Joi.string().required()
    })).min(1).required(),
    toppings: Joi.array().items(Joi.object({
        name: Joi.string().required()
    })),
    category: Joi.string().required(),
    price: Joi.number().required()
});



// DRINKS
//Defining the schema
const DrinkSchema = new Schema({
    name: { type: String, required: true },
    volume: { type: Number, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true }
})

//Creating the Model from the schema
const DrinkModel = models.drink || model("drinks", DrinkSchema);

//Joi schema to validate incoming data from body
const DrinkCreateValidationSchema = Joi.object({
    name: Joi.string().required(),
    volume: Joi.number().required(),
    description: Joi.string(),
    price: Joi.number().required()
})

module.exports = { ModifierModel, ModifierCreateValidationSchema, ToppingModel, ToppingCreateValidationSchema, CategoryModel, CategoryCreateValidationSchema, RecipeModel, RecipeCreateValidationSchema, DrinkModel, DrinkCreateValidationSchema };