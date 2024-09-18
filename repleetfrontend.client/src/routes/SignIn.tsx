import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/LandingPageHeader";


function SignIn() {

    // state variables for email and passwords
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);

    // state variable for error messages
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/signup");
    }

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api

            var loginurl = "";
            const apiUrl = import.meta.env.VITE_API_URL;
            if (rememberme == true)
                loginurl = `${apiUrl}/login?useCookies=true`;
            else
                loginurl = `${apiUrl}/login?useSessionCookies=true`;

            fetch(loginurl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })

                .then((data) => {
                    // handle success or error from the server
                    
                    if (data.ok) {
                        setError("Successful Login.");
                        //window.location.href = '/practice';
                        navigate("/practice");
                    }
                    else
                        setError("Error Logging In.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <div className="w-screen h-screen font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500 flex flex-col
            gap-10">
            <Header>
                <div></div>
            </Header>
            <div className="containerbox w-1/2 sm:w-1/3 h-1/2 flex flex-col overflow-hidden">

            

            <h1 className="text-4xl pb-2">Login </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="forminput" htmlFor="email">Email:</label>
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                            onChange={handleChange}
                        className="bg-gray-200"
                            
                         
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                            onChange={handleChange}
                        className="bg-gray-200"
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="rememberme"
                        name="rememberme"
                        checked={rememberme}
                        onChange={handleChange} /><span>Remember Me</span>
                </div>
                <div>
                    <button type="submit" className="border-2 border-black p-1 my-2 rounded-md">Login</button>
                </div>
                <div>
                        <button onClick={handleRegisterClick} className="border-2 border-black p-1 rounded-md my-2">Go To Register</button>
                </div>
            </form>
                    {error && <p className="error">{error}</p>}


                

            </div>
            
        </div>
    );
}

export default SignIn; 