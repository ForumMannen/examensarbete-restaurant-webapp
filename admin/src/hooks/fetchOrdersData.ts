import { useEffect, useState } from "react";

export interface ICustomer {
    email: string;
    name: string;
}

export interface IOrder {
    _id: string;
    customer: ICustomer[]
    orderItems: { product: string }[];
    paymentStatus: string;
    createdAt: string;
    sessionId: string;
    totalPrice: string;
}

export const fetchOrdersData = async (): Promise<IOrder[]> => {
    try {
        const response = await fetch("/api/order/get-orders");
        const { ordersFromDB } = await response.json();
        console.log("Fetched!!!!!", ordersFromDB);
        
        return ordersFromDB;
    } catch (error) {
        console.error("Error fetching orders data: ", error);
        throw new Error('Error fetching orders data');
    }
}

export const useOrdersData = () => {
    const [orderData, setOrderData] = useState<IOrder[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrdersData();
                setOrderData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Within the hook: ", orderData);
        
    }, [orderData])

    return { orderData };
}