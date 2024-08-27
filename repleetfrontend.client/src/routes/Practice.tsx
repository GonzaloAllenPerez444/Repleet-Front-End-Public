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
import { useEffect, useState } from 'react';
import Header from '../components/LandingPageHeader';
import LogoutLink from '../components/LogoutLink';
import { AuthorizedUser } from '../components/AuthorizeView';
import FeedbackForm from '../components/FeedbackForm';
import { ProblemInfoDTO, QuestionDifficulty, SkillLevel, SubmitProblemRequestDTO } from '../Contracts/DTOS_AND_ENUMS';



interface GetProblemResponse {
    value: ProblemInfoDTO | string;
    
}


// Type guard to check if value is a ProblemInfoDTO
const isProblemInfoDTO = (value: any): value is ProblemInfoDTO => {
    return (value as ProblemInfoDTO).title !== undefined;
};
const getWordFromDifficulty = (d: QuestionDifficulty | undefined) => {
    if (d == undefined) { return undefined; }
    if (d == QuestionDifficulty.Easy) { return "Easy" }
    else if (d == QuestionDifficulty.Medium) { return "Medium" }
    else if (d == QuestionDifficulty.Hard) {return "Hard" }
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

    const [ProblemData, setProblemData] = useState<ProblemInfoDTO | null>(null);
    const [loading, setLoading] = useState(true); // State to handle loading state

    async function ProcessFormSubmit(rating: SkillLevel) {
        console.log("Called Process Form Submit with " + rating)
        const SPR: SubmitProblemRequestDTO = {

            "problemName": ProblemData?.title,
            "categoryName": ProblemData?.categoryName,
            "report": rating
        };

        //call the submitproblem POST Endpoint with the rating
        fetch("/api/ProblemsAPI/submitproblem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(SPR),
        }).then(response => {
            // Check if the response is successful (status code 200-299)

            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the JSON body if the response is successful
            return response.json();
        }).then(data => {
            console.log("Updated PS was " + JSON.stringify(data.value));

            //Now call the GetNextProblemEndpoint to generate the next card to display
            FetchNextProblem().then((data: { value: string | ProblemInfoDTO }) => {
                console.log(data.value);
                if (isProblemInfoDTO(data.value)) { setProblemData(data.value); }

                setLoading(false);
            });

        });



    };


    

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

                            FetchNextProblem().then((data: {value: string | ProblemInfoDTO}) => {
                                console.log(data.value);
                                if (isProblemInfoDTO(data.value)) { setProblemData(data.value); }
                                
                                setLoading(false);
                            });
                            
                        })

                        //potentially delete userRatings from local storage for security reasons



                    }

                    
                    // If this is a preexisting user
                    else
                    {
                        console.log(data.value)
                        if (isProblemInfoDTO(data.value)) {
                            
                            setProblemData(data.value);
                        }
                        setLoading(false);
                    };
                })
                .catch(error => {
                    // Handle the final error
                    console.log(error.message);
                });


            //If they don't, get the survey results from localstorage, make a new problemset and get the next problem after that.
            //Delete the survey ratings afterward for security?
            

        
    }, []);
    

    // const apiKey = process.env.VITE_REACT_APP_PROBLEMS_API_URL
    //const apiKey = import.meta.env.VITE_REACT_APP_PROBLEMS_API_URL
 
    
   

    return (
        <div className=" w-screen h-screen font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500">

            <Header>
                <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
            </Header>

            <h1 className="text-white">Practice</h1>
            <div className="mix-w-sm max-w-l w-1/2 rounded overflow-hidden shadow-lg m-20 bg-white">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Problem : {ProblemData?.title}</div>
                    <p className="text-gray-700 text-base">Category: {ProblemData?.categoryName}</p>                   
                    <a
                        href={ProblemData?.url}
                        className="text-gray-700 text-base"
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Security and performance
                    >
                        URL: {ProblemData?.url}
                    </a>
                   


                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Problem Difficulty: {getWordFromDifficulty(ProblemData?.difficulty)}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Current Skill Level: {ProblemData?.skillLevel}</span>
                   
                </div>
                
            </div>
            <FeedbackForm finishForm={ProcessFormSubmit } />
        </div>
    );
};

export default Practice;
