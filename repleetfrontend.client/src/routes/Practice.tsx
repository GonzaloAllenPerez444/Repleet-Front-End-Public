/* 
This page should only be able to be reached if there's a initial rating of all of the categories.
Once it's down that, it should fetch the api of the .net backend, initialize all of the data, then print out the next chosen problem.
*/


import { useEffect, useState } from 'react';
import Header from '../components/LandingPageHeader';
import LogoutLink from '../components/LogoutLink';
import { AuthorizedUser } from '../components/AuthorizeView';
import FeedbackForm from '../components/FeedbackForm';
import { ProblemInfoDTO, ProblemSetProgressResponseDTO, QuestionDifficulty, SkillLevel, SubmitProblemRequestDTO } from '../Contracts/DTOS_AND_ENUMS';
import PercentageBars from '../components/PercentageBars';



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

//This function returns the response of the GET request "getnextproblem" in the backend
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
        throw error; 
    }
}

//This function returns the response of the GET request "getcategoryprogress" in the backend
async function FetchProgress(): Promise<ProblemSetProgressResponseDTO> {
    try {
        const response = await fetch("/api/ProblemsAPI/getcategoryprogress", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON body if the response is successful
        return await response.json() as ProblemSetProgressResponseDTO;

    } catch (error) {
        // Handle the final error
        console.error("An error occurred:", (error as Error).message);
        throw error; 
    }
}



const Practice = () => {

    const [ProblemData, setProblemData] = useState<ProblemInfoDTO | null>(null); //information on cards
    const [CategoryPercents, setCategoryPercents] = useState<Map<string,number> | null>(null); //map of category: percent done
    const [loading, setLoading] = useState(true); // State to handle loading state


    //This function submits the rating for the current problem, then the backend updates it.
    //Then, we fetch the next problem and new percentages to display top the user.
    async function ProcessFormSubmit(rating: SkillLevel) {
        
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
                
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON body if the response is successful
            return response.json();
        }).then(data => {

            //console.log("Updated PS was " + JSON.stringify(data.value));
            var a = data;
            a += 1;
            //Now call the GetNextProblemEndpoint to generate the next card to display
            FetchNextProblem().then((data: { value: string | ProblemInfoDTO }) => {
                
                if (isProblemInfoDTO(data.value)) { setProblemData(data.value); }

                setLoading(false);
            });

        });

        //After the above, Fetch and display the new percentage bar again to give the user the most recent feedback!
        FetchProgress().then(
            (value: ProblemSetProgressResponseDTO) => {
                
                const categoryMap: Map<string, number> = new Map(Object.entries(value.data))
                setCategoryPercents(categoryMap);
                
            })
        

    };


    

    useEffect(() => {
        
            
        //This effect connects to the backend API and gets/creates the information of the user.
        //First,we  check if a user has a problemSet associated with them by attempting to create a 
        //new problem set with the submitratings  POST endpoint if there's not one already.
        //Then, we get the next suggested problem and percentaes from FetchNextProblem and FetchCategoryProgress
        

        const ratingListString = localStorage.getItem('userRatings');

        FetchNextProblem()
            .then(data => {
                    //if it's a new user
                    if (data.value === "Problem Set Not Found")
                    {
                        //This means its a new user so we create a new problem set for them if they filled out the survey


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
                                
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            // Parse the JSON body if the response is successful
                            return response.json();

                        }).then(data => {
                            //new PS created.
                            var a = data;
                            a += 1;
                            //Fetch problem and percentages for this new problemSet.
                        
                            FetchNextProblem().then((data: { value: string | ProblemInfoDTO }) => {

                                
                                if (isProblemInfoDTO(data.value)) { setProblemData(data.value); }

                                //process percentage bars now and display
                                FetchProgress().then(
                                    (value: ProblemSetProgressResponseDTO) => {
                                        
                                        const categoryMap: Map<string, number> = new Map(Object.entries(value.data))
                                        setCategoryPercents(categoryMap);

                                    })


                                setLoading(false);

                            });
                            
                        })

                        //potentially delete userRatings from local storage for security reasons



                    }

                    
                    // If this is a preexisting user, we can skip the PS creation step.
                    else
                    {
                        
                        if (isProblemInfoDTO(data.value)) {
                            
                            setProblemData(data.value);
                        }
                        

                        //fetch percentages and display
                        FetchProgress().then(
                            (value: ProblemSetProgressResponseDTO) => {
                                console.log("progress data is " + JSON.stringify(value.data));
                                const categoryMap: Map<string, number> = new Map(Object.entries(value.data))
                                setCategoryPercents(categoryMap);

                            })
                        setLoading(false);

                    };
                })
                .catch(error => {
                    
                    console.log(error.message);
                });                         
    }, []);
    

    
 
    
   

    return (
        <div className=" w-screen h-[100vh] max-h-[150vh] font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500">

            <Header>
                <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
            </Header>

            <h1 className="text-white text-[5vw] ml-20 mt-10">Practice</h1>
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
            {!loading && CategoryPercents ? (
                <PercentageBars data={CategoryPercents} />
            ) : (
                 <div>No data available</div>
            )}
            <FeedbackForm finishForm={ProcessFormSubmit } />
        </div>
    );
};

export default Practice;
