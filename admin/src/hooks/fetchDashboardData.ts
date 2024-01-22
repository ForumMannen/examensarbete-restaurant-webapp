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

export const fetchDashboardData = async () => {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw new Error('Error fetching data');
    }
}

export const useDashboardData = () => {
    const [dashboardData, setDashboardData] = useState<IDashboardData>({
        recipes: [],
        modifiers: [],
        toppings: [],
        drinks: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDashboardData();
                if(data.recipesFromDB.length > 0 || data.modifiersFromDB.length > 0 || data.toppingsFromDB.length > 0 || data.drinksFromDB.length > 0){
                    setDashboardData(() => ({
                        recipes: data.recipesFromDB,
                        modifiers: data.modifiersFromDB,
                        toppings: data.toppingsFromDB,
                        drinks: data.drinksFromDB,
                    }));
                }
                // console.log("The hook: ", data)
            } catch (error) {
                if(error){
                   console.error(error); 
                }
            }
        };

        fetchData();
    }, []);

    return { dashboardData };
}