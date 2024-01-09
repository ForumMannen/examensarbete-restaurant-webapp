const express = require("express");
const { getRecipesModifiersAndToppings, getAllDrinks, addModifier, addTopping, addRecipe, addDrink } = require("../controllers/recipe.controller");
const { ModifierCreateValidationSchema, ToppingCreateValidationSchema, RecipeCreateValidationSchema, DrinkCreateValidationSchema } = require("../models/recipe.model");
const { validate, createModifier, createTopping } = require("../middlewares");

const recipeRouter = express
    .Router()
    .get("/recipe", getRecipesModifiersAndToppings)
    .get("/drinks", getAllDrinks)
    .post("/modifiers", validate(ModifierCreateValidationSchema), addModifier)
    .post("/toppings", validate(ToppingCreateValidationSchema), addTopping)
    .post("/recipe", validate(RecipeCreateValidationSchema), createModifier, createTopping, addRecipe)
    .post("/drinks", validate(DrinkCreateValidationSchema), addDrink)

module.exports = { recipeRouter };