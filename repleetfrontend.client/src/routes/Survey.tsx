import React, { useState } from 'react';
import RigidSlider from '../Slider';
import SliderForm from '../SliderForm';
import { useNavigate } from 'react-router-dom';


function Survey() {

    const Navigate = useNavigate();

    function MoveToResultsPage(categoryRatingList: number[]){

        
        //set the state of main completed form to true.
        localStorage.setItem('formCompleted', 'true');

        //navigate to practice page with that info.
        Navigate('/practice', { state: { ratingList: categoryRatingList, from: '/info' } });
        

    }

    return (
        <div className="flex flex-col items-center">
            <h1>Survey Page</h1>
            <SliderForm finishForm={MoveToResultsPage} />
            
        </div>

    )
}

export default Survey;