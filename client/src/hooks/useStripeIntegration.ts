const useStripeIntegration = () => {

    const handlePayment = async (orderData: any) => {
        const cartItems = orderData;
        console.log("handlePayment", cartItems)
        
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
            console.log("Is there a sessionID? ", { url, sessionId });
            sessionStorage.setItem("session-id", sessionId);
            window.location = url;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    const verifyPayment = async (sessionId: string) => {
        try {
            const response = await fetch("api/order/verify-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
              body: JSON.stringify({ sessionId }),
            });

            if(!response.ok){
                console.error("Server error:", response.status);
                return;
            }

            const verified = await response.json();
            
            if (verified) {
              console.log("Payment verified succesfully")
            } else {
              console.log("Payment verification failed");
              
            }
          } catch (error) {
            console.error("Payment couldn't be verified", error)
          }
        }

    return { handlePayment, verifyPayment };
}

export default useStripeIntegration;