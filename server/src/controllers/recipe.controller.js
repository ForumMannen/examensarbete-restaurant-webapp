const { ModifierModel, ToppingModel, RecipeModel, DrinkModel, CategoryModel } = require("../models/recipe.model");

//Get all data about "products", both for dashboardpanel and the public website
async function getDashboardData(req, res) {
    try {
        let recipesFromDB = await RecipeModel.find();
        let modifiersFromDB = await ModifierModel.find();
        let toppingsFromDB = await ToppingModel.find();
        let drinksFromDB = await DrinkModel.find();
        let categoriesFromDB = await CategoryModel.find();

        if (!recipesFromDB) {
            return res.status(409).send("Couldn't find recipes from database")
        }

        if (!modifiersFromDB) {
            return res.status(409).send("Couldn't find modifiers from database")
        }

        if (!toppingsFromDB) {
            return res.status(409).send("Couldn't find toppings from database")
        }

        if (!drinksFromDB) {
            return res.status(409).send("Couldn't find drinks from database")
        }

        if (!categoriesFromDB) {
            return res.status(409).send("Couldn't find categories from database")
        }

        res.status(200).send({ recipesFromDB, modifiersFromDB, toppingsFromDB, drinksFromDB, categoriesFromDB });
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getAllDrinks(req, res) {
    try {
        let drinksFromDB = await DrinkModel.find();

        if (!drinksFromDB) {
            return res.status(409).json("Couldn't find drinks from database")
        }

        res.status(200).send({ drinksFromDB });
    } catch (error) {
        console.error("Error adding drinks: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//This function is to add modifier
//Will probably be removed as I use the middleware
async function addModifier(req, res) {
    let { name } = req.body;

    try {
        let modifier = await ModifierModel.findOne({ name });
        if (modifier) {
            return res.sendStatus(409);
        }

        modifier = new ModifierModel(req.body);
        await modifier.save();
        res.status(201).json({ modifier });
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//This function is to add modifier
//Will probably be removed as I use the middleware
async function addTopping(req, res) {
    let { name } = req.body;

    try {
        let topping = await ToppingModel.findOne({ name });
        if (topping) {
            return res.sendStatus(409);
        }
        topping = new ToppingModel(req.body);
        await topping.save();
        res.status(201).json({ topping });
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Add a new recipe
async function addRecipe(req, res) {
    const { name, toppings, category, price } = req.body;
    try {
        //Check if there is a recipe with that name
        const recipeExists = await RecipeModel.findOne({ name });
        if (recipeExists) {
            return res.status(409).send("A recipe with that name already exists");
        }

        //Extracting IDs
        const modifierIds = req.existingModifiers.map(modifier => modifier._id.toString());
        const toppingIds = req.existingToppings.map(topping => topping._id);
        const categoryId = req.existingCategories._id;

        //Check for duplicates with the same ingredients
        const sortedModifiers = modifierIds.slice().sort((a, b) => a.localeCompare(b));
        const allRecipesModifiers = await RecipeModel.find({}, { _id: 0, modifiers: 1 });

        const recipeDuplicatesExist = allRecipesModifiers.some((recipe) => {
            const sortedModifiersFromDB = recipe.modifiers.slice().sort((a, b) => a.localeCompare(b));
            return JSON.stringify(sortedModifiers) === JSON.stringify(sortedModifiersFromDB);
        })

        if (recipeDuplicatesExist) {
            return res.status(409).send("A recipe with that ingredients already exists");
        }

        //Create a new recipe
        const recipe = new RecipeModel({
            name,
            modifiers: modifierIds,
            toppings: toppingIds,
            category: categoryId,
            price
        });

        await recipe.save();

        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding recipe: ", error);
    }
}

async function addDrink(req, res) {
    let { name, volume, description, price } = req.body;

    try {
        const drink = await DrinkModel.findOne({ name, volume });
        if (drink) {
            return res.sendStatus(409);
        }
        const newDrink = new DrinkModel({ name, volume, description, price });
        await newDrink.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function addCategory(req, res) {
    let { name } = req.body;

    try {
        const category = await CategoryModel.findOne({ name });
        if (category) {
            return res.sendStatus(409);
        }
        const newCategory = new CategoryModel({ name });
        await newCategory.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding category: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updateRecipe(req, res) {
    let { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found! " });
        }

        res.status(200).json({ message: "Recipe updated succesfully: ", updatedRecipe })
    } catch (error) {
        console.error("Error updating recipe", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getDashboardData, getAllDrinks, addModifier, addTopping, addRecipe, addDrink, addCategory, updateRecipe }