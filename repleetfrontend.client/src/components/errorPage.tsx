import { useRouteError } from "react-router-dom";
import React from 'react'
import Header from "./LandingPageHeader";

const ErrorPage: React.FC = () => {
    const error = useRouteError() as Error;
    

    return (
        <div className="w-screen h-screen font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500 flex flex-col
            gap-10">
            <Header>
                <div></div>
            </Header>
        <div id="error-page" className="text-white flex justify-center">
            
            <h1>Sorry, an unexpected error has occurred.</h1>
            <p>
                <i>{error.message}</i>
            </p>
            </div>
        </div>
    );
}

export default ErrorPage;