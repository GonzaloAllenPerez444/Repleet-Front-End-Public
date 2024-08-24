import React, { useState } from 'react';
import RigidSlider from '../components/Slider';
import SliderForm from '../components/SliderForm';
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
        <div className="w-full h-full font-bold text-white font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500">
        <div className="flex flex-col items-center">
                <h1 className="text-[5vw]">Survey</h1>
                <h3 className="text=[3vw">Let's Get a Grasp on Your Starting Point</h3>
            <SliderForm finishForm={MoveToResultsPage} />
            
            </div>
        </div>

    )
}

export default Survey;