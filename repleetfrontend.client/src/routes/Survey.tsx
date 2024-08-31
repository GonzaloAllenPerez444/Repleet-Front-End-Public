import React, { useState } from 'react';
import RigidSlider from '../components/Slider';
import SliderForm from '../components/SliderForm';
import { useNavigate } from 'react-router-dom';
import Header from '../components/LandingPageHeader';
import { useAuth } from '../components/AuthContext';


function Survey() {

    const Navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    function MoveToResultsPage(categoryRatingList: number[]){

        
        //set the state of main completed form to true.
        localStorage.setItem('formCompleted', 'true');
        const userRatingsString = categoryRatingList.join(",");
        localStorage.setItem('userRatings',userRatingsString);

        //navigate to practice page with that info.
        Navigate('/practice', { state: { ratingList: categoryRatingList, from: '/info' } });
        

    }

    return (
        <div className="w-full h-full font-bold text-white font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500">
            <Header>
                {isAuthenticated ? (
                    <p className='py-4 hover:text-blue-400 transition-colors duration-300'>User Signed In</p>
                ) : (
                    <a className='py-4 hover:text-blue-400 transition-colors duration-300' href="/signin">Sign Up / Sign In</a>
                )}
            </Header>
            
        <div className="flex flex-col items-center ">
                <h1 className="text-[5vw] mt-10">Survey</h1>
                <h3 className="text=[3vw">Let's Get a Grasp on Your Starting Point</h3>
            <SliderForm finishForm={MoveToResultsPage} />
            
            </div>
        </div>

    )
}

export default Survey;