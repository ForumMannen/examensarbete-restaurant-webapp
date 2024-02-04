const express = require("express");
const { getDashboardData, getAllDrinks, addModifier, addTopping, addRecipe, addDrink, updateRecipe } = require("../controllers/recipe.controller");
const { ModifierCreateValidationSchema, ToppingCreateValidationSchema, RecipeCreateValidationSchema, DrinkCreateValidationSchema } = require("../models/recipe.model");
const { validate, createModifier, createTopping, deleteItem, createCategory, updateItem } = require("../middlewares");
const { RecipeModel, ToppingModel, DrinkModel, ModifierModel } = require("../models/recipe.model");

//All routes and their controller functions, middlewares and validation schemas for recipes, modifiers, toppings, drinks
const recipeRouter = express
    .Router()
    .get("/", getDashboardData)
    .post("/recipe", createModifier, createTopping, createCategory, validate(RecipeCreateValidationSchema), addRecipe)
    .delete("/recipe/:id", deleteItem(RecipeModel))
    .put("/recipe/:id", updateRecipe)
    .get("/drinks", getAllDrinks)
    .post("/drinks", validate(DrinkCreateValidationSchema), addDrink)
    .delete("/drinks/:id", deleteItem(DrinkModel))
    .put("/drinks/:id", updateItem(DrinkModel))
    .post("/modifiers", validate(ModifierCreateValidationSchema), addModifier)
    .delete("/modifiers/:id", deleteItem(ModifierModel))
    .put("/modifiers/:id", updateItem(ModifierModel))
    .post("/toppings", validate(ToppingCreateValidationSchema), addTopping)
    .delete("/toppings/:id", deleteItem(ToppingModel))
    .put("/toppings/:id", updateItem(ToppingModel))

module.exports = { recipeRouter };