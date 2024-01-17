// import { useState } from 'react';

const useStripeIntegration = () => {
    const handlePayment = async (orderData: any) => {
        const cartItems = orderData;

        const response = await fetch("api/order/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartItems })
        })

        if(!response.ok){
            console.error("Request failed:", response.status);
            return;
        }
        try {
            const responseData = await response.json();
            const { url, sessionId } = responseData;
            console.log({ url, sessionId });
            window.location = url;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
    return handlePayment;
}

export default useStripeIntegration;