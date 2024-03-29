import { useEffect, useState } from "react";

export interface IDashboardData {
    recipes: IRecipesData[];
    modifiers: IModifiersData[];
    toppings: IToppingsData[];
    drinks: IDrinksData[];
}

export interface IRecipesData {
    _id: string;
    name: string;
    modifiers: IModifiersData[];
    toppings: IToppingsData[];
    category: string;
    price: number;
}

export interface IModifiersData {
    _id: string;
    name: string;
}

export interface IToppingsData {
    _id: string;
    name: string;
}

export interface IDrinksData {
    _id: string;
    name: string;
    volume: number;
    description: string;
    price: number;
}

export const fetchMenuData = async () => {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw new Error('Error fetching data');
    }
}

export const useMenuData = () => {
    const [menuData, setMenuData] = useState<IDashboardData>({
        recipes: [],
        modifiers: [],
        toppings: [],
        drinks: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMenuData();
                if(data.recipesFromDB.length > 0 || data.modifiersFromDB.length > 0 || data.toppingsFromDB.length > 0 || data.drinksFromDB.length > 0){
                    setMenuData(() => ({
                        recipes: data.recipesFromDB,
                        modifiers: data.modifiersFromDB,
                        toppings: data.toppingsFromDB,
                        drinks: data.drinksFromDB,
                    }));
                }
            } catch (error) {
                if(error){
                   console.error(error); 
                }
            }
        };

        fetchData();
    }, []);

    return { menuData };
}