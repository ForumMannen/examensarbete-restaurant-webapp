import { useEffect, useState } from "react";

interface IDashboardData {
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
}

interface IModifiersData {
    name: string;
}

interface IToppingsData {
    name: string;
}

interface IDrinksData {
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
                setDashboardData({
                    recipes: data.recipesFromDB,
                    modifiers: data.modifiersFromDB,
                    toppings: data.toppingsFromDB,
                    drinks: data.drinksFromDB,
                })
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