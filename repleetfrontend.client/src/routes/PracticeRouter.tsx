// src/components/PrivateRoute.js
import React from 'react';
import Practice from './Practice';
import App from '../routes/App'
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import LogoutLink from '../components/LogoutLink';
function PracticeRouter(){ 

    const isCompleted = localStorage.getItem('formCompleted') === 'true';
    


    return (

        <AuthorizeView>
                    
        
        <div>

            {isCompleted ? (
                < Practice />
            ) : (< App />)}

            </div>       
        </AuthorizeView>
        
    )

}


export default PracticeRouter;
