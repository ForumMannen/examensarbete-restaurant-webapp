export interface Recipe{
    name: string;
    modifiers: { name: string }[];
    toppings: { name: string }[];
    category: string;
    price: number;
}

export const addRecipeToDB = async (recipe: Recipe) => {
    try {
        console.log(recipe);
        
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