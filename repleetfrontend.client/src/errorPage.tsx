import { useRouteError } from "react-router-dom";
import React from 'react'

const ErrorPage: React.FC = () => {
    const error = useRouteError() as Error;
    

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred. Best, Gonzalo</p>
            <p>
                <i>{error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;