// src/components/PrivateRoute.js
import React from 'react';
import { Route, redirect } from 'react-router-dom';
import Practice from './Practice';
import App from '../routes/App'
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import LogoutLink from '../components/LogoutLink';
function PracticeRouter(){ 

    const isCompleted = localStorage.getItem('formCompleted') === 'true';
    


    return (

        <AuthorizeView>
            <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
            
        
        <div>

            {isCompleted ? (
                < Practice />
            ) : (< App />)}

            </div>       
        </AuthorizeView>
        
    )

}


export default PracticeRouter;
