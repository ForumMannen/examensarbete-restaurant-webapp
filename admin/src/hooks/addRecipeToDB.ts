import { IModifiersData, IToppingsData } from "./fetchDashboardData";
export interface Recipe{
    name: string;
    modifiers: { name: string }[];
    toppings: { name: string }[];
    category: string;
    price: number;
}

export const addRecipeToDB = async (recipe: Recipe) => {
    try {
        console.log("AddRecipeToDBHook: ", recipe);
        
        const response = await fetch("/api/dashboard/recipe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
          })

        if(response.ok){
            console.log("It worked");
        } else {
            console.log("It failed!");
        }

        console.log(response);
        
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addModifierToDB = async (modifierName: IModifiersData) => {
    try {
        const response = await fetch('/api/dashboard/modifiers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifierName),
        })

        if(response.ok){
            return modifierName;
        }
      } catch (error) {
        console.error(error);
      }
}

export const addToppingToDB = async (toppingName: IToppingsData) => {
    try {
        const response = await fetch('/api/dashboard/toppings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toppingName),
        })

        if(response.ok){
            return toppingName;
        }
      } catch (error) {
        console.error(error);
      }
}