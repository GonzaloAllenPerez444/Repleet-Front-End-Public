// src/components/PrivateRoute.js
import React from 'react';
import { Route, redirect } from 'react-router-dom';
import Practice from './Practice';
import App from '../App'
function PracticeRouter(){ 

    const isCompleted = localStorage.getItem('formCompleted') === 'true';
    


    return (
        <div>

            {isCompleted ? (
                < Practice />
            ) : (< App />)}

            </div>       
        
    )

}


export default PracticeRouter;
