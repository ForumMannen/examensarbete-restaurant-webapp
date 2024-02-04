import { useEffect, useRef } from "react";
import useStripeIntegration from "../hooks/useStripeIntegration";

function PaymentSuccessPage() {
    const { verifyPayment } = useStripeIntegration();
    const verificationAttemptedRef = useRef(false);

    useEffect(() => {
        const sessionId: string | null = sessionStorage.getItem("session-id");
        if (sessionId !== null && !verificationAttemptedRef.current) {
            const handleVerification = async () => {
                try {
                    await verifyPayment(sessionId);
                    console.log("Payment verification successful");
                } catch (error) {
                    console.error("Payment verification failed", error);
                } finally {
                    verificationAttemptedRef.current = true;
                }
            };
            handleVerification();

            return () => {
                verificationAttemptedRef.current = true;
            }
        }
    }, [verifyPayment]);

    return (
        <div>PaymentSuccessPage</div>
    )
}

export default PaymentSuccessPage