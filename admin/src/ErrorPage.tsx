import { useRouteError } from "react-router-dom";
import { ReactNode } from "react";

interface ErrorType {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
  const error = useRouteError();
  
  const renderErrorDetails = (error: unknown): ReactNode => {
    if(typeof error === "object" && error !== null){
        const { statusText, message } = error as ErrorType;
        return (
            <i>
                {statusText || message || "Unknown error"}
            </i>
        )
    }
    return null;
  }

  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{renderErrorDetails(error)}</p>
    </div>
  );
}