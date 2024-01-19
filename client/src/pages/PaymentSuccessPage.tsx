import { useEffect, useState } from "react";
import useStripeIntegration from "../hooks/useStripeIntegration";

function PaymentSuccessPage() {
    const { verifyPayment } = useStripeIntegration();
    const [verificationAttempted, setVerificationAttempted] = useState(false);

    useEffect(() => {
        const sessionId: string | null = sessionStorage.getItem("session-id");

        const handleVerification = async () => {
            if (sessionId !== null && !verificationAttempted) {
                try {
                    console.log("Attempting payment verification");
                    
                    await verifyPayment(sessionId);
                    console.log("Payment verification successful");
                } catch (error) {
                    console.error("Payment verification failed", error);
                } finally {
                    setVerificationAttempted(true);
                }
            }
        };
        handleVerification();
    }, [verifyPayment, verificationAttempted]);

  return (
    <div>PaymentSuccessPage</div>
  )
}

export default PaymentSuccessPage