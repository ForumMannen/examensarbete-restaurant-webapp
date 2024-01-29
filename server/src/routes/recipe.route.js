const express = require("express");
const { getDashboardData, getAllDrinks, addModifier, addTopping, addRecipe, addDrink, updateRecipe } = require("../controllers/recipe.controller");
const { ModifierCreateValidationSchema, ToppingCreateValidationSchema, RecipeCreateValidationSchema, DrinkCreateValidationSchema } = require("../models/recipe.model");
const { validate, createModifier, createTopping, deleteItem, createCategory } = require("../middlewares");
const { RecipeModel, ToppingModel, DrinkModel, ModifierModel } = require("../models/recipe.model");

const recipeRouter = express
    .Router()
    .get("/", getDashboardData)
    .post("/recipe", createModifier, createTopping, createCategory, validate(RecipeCreateValidationSchema), addRecipe)
    .delete("/recipe/:id", deleteItem(RecipeModel))
    .put("/recipe/:id", updateRecipe)
    .get("/drinks", getAllDrinks)
    .post("/drinks", validate(DrinkCreateValidationSchema), addDrink)
    .delete("/drinks/:id", deleteItem(DrinkModel))
    .post("/modifiers", validate(ModifierCreateValidationSchema), addModifier)
    .delete("/modifiers/:id", deleteItem(ModifierModel))
    .post("/toppings", validate(ToppingCreateValidationSchema), addTopping)
    .delete("/toppings/:id", deleteItem(ToppingModel))

module.exports = { recipeRouter };