//import React from 'react';

import Survey from './Survey';
import App from '../routes/App'
function SurveyRouter() {

    const isCompleted = localStorage.getItem('formCompleted') === 'true';



    return (
        <div>

            {isCompleted ? (
                < App />
            ) : (< Survey />)}

        </div>

    )

}

export default SurveyRouter;
