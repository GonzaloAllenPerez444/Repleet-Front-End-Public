import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';


const UserContext = createContext({});

interface User {
    email: string;
}


function AuthorizeView(props: { children: React.ReactNode }) {

    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); 
    let emptyuser: User = { email: "" };

    const [user, setUser] = useState(emptyuser);


    useEffect(() => {
        // Get the cookie value
        let retryCount = 0; 
        let maxRetries = 10; 
        let delay: number = 1000; 

        //delay function that returns a promise
        function wait(delay: number) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        // fetch function that retries until status 200 or 401
        async function fetchWithRetry(url: string, options: any) {
            try {
                
                let response = await fetch(url, options);

                
                if (response.status == 200) {

                    let j: any = await response.json();
                    setUser({ email: j.email });
                    setAuthorized(true);
                    return response; 

                } else if (response.status == 401) {
                    return response; 
                } else {
                    // throw an error to trigger the catch block
                    throw new Error("" + response.status);
                }
            } catch (error) {
                
                retryCount++;
                // check if the retry limit is reached
                if (retryCount > maxRetries) {
                    // stop retrying and rethrow the error
                    throw error;
                } else {
                    // wait for some time and retry
                    await wait(delay);
                    return fetchWithRetry(url, options);
                }
            }
        }

        // call the fetch function with retry logic
        fetchWithRetry("/pingauth", {
            method: "GET",
        })
            .catch((error) => {
                // handle the final error
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);  // set loading to false when the fetch is done
            });
    }, []);


    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }
    else {
        if (authorized && !loading) {
            return (
                <>
                    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
                </>
            );
        } else {
            //navigate to sign in page if any errors occurs is a good backup.
            return (
                <>
                    <Navigate to="/signin" />
                </>
            )
        }
    }

}

export function AuthorizedUser(props: { value: string }) {
    // Consume the username from the UserContext
    const user: any = React.useContext(UserContext);

    // Display the username in a h1 tag
    if (props.value == "email")
        return <>{user.email}</>;
    else
        return <></>
}

export default AuthorizeView;