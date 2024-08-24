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

interface GetProblemResponse {
    value: string;
    // Add other properties that are expected in the response
}
async function FetchNextProblem(): Promise<GetProblemResponse> {
    try {
        const response = await fetch("/api/ProblemsAPI/getnextproblem", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON body if the response is successful
        return await response.json() as GetProblemResponse;

    } catch (error) {
        // Handle the final error
        console.error("An error occurred:", (error as Error).message);
        throw error; // Re-throw the error if needed, or handle it differently
    }
}


const Practice = () => {
    

    useEffect(() => {
        
            //Connect to the backend API here!
            //First, check if a user has a problemSet associated with them. if they do, get next problem.
            //To do this, add the endpoints to the proxy and fetch getnextproblem.
        //If you get return new JsonResult(Ok("Problem Set Not Found")) then we need to make a problem set first.

        const ratingListString = localStorage.getItem('userRatings');

        FetchNextProblem()
            .then(data => {
                    //if it's a new user
                    if (data.value === "Problem Set Not Found")
                    {
                        console.log("New User, creating new Problem Set");
                        console.log(ratingListString);
                        if (ratingListString == null) { console.log("fill out survey first!"); return; }

                        //make new problemSet
                        fetch("/api/ProblemsAPI/submitratings", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                "ratingList": ratingListString
                            }),
                        }).then(response => {
                            // Check if the response is successful (status code 200-299)

                            if (!response.ok) {
                                console.log(`HTTP error! status: ${response.status}`)
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            // Parse the JSON body if the response is successful
                            return response.json();
                        }).then(data => {
                            console.log("new PS ID is " + data.value);

                            //Now that user is Created, get the next problem as before.

                            FetchNextProblem().then(data => {
                                console.log(data.value);
                            });
                            
                        })

                        //potentially delete userRatings from local storage for security reasons



                    }

                    
                    // If this is a preexisting user
                    else
                    {
                        console.log(data.value)
                    };
                })
                .catch(error => {
                    // Handle the final error
                    console.log(error.message);
                });


            //If they don't, get the survey results from localstorage, make a new problemset and get the next problem after that.
            //Delete the survey ratings afterward for security?
            

        
    }, []);
    //this effect runs even if i just refresh the page 0_0 i need to figure out why state doesn't


    //become null on refresh


    // const apiKey = process.env.VITE_REACT_APP_PROBLEMS_API_URL
    //const apiKey = import.meta.env.VITE_REACT_APP_PROBLEMS_API_URL

    //console.log("api key is " + apiKey);
    
   

    return (
        <div className=" w-screen h-screen font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500">
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
