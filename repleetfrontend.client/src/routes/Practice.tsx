/* 
This page should only be able to be reached if there's a initial rating of all of the categories.
Once it's down that, it should fetch the api of the .net backend, initialize all of the data, then print out the next chosen problem.
*/
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import { useLocation, redirect ,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


const Practice = () => {
    const location = useLocation();
    let state = location.state;

    console.log(state);

    useEffect(() => {
        if ( state !== undefined && state?.from === '/info') {
            console.log('Navigated from Survey');
            console.log(state.ratingList);


            //Connect to the backend API here!
            

        }
    }, []);
    //this effect runs even if i just refresh the page 0_0 i need to figure out why state doesn't


    //become null on refresh


    // const apiKey = process.env.VITE_REACT_APP_PROBLEMS_API_URL
    const apiKey = import.meta.env.VITE_REACT_APP_PROBLEMS_API_URL

    console.log("api key is " + apiKey);
   
   

    return (
        <div className="w-screen h-screen font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500">
            <h1 className="text-white">Practice Page 2</h1>
            <div className="mix-w-sm max-w-l w-1/2 rounded overflow-hidden shadow-lg m-20 bg-white">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">CategoryName</div>
                    <p className="text-gray-700 text-base">Problem Here</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag1</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag2</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag3</span>
                </div>
            </div>
        </div>
    );
};

export default Practice;
