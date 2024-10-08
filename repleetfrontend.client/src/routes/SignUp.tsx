import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/LandingPageHeader";


function SignUp() {
    // state variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/signin");
    }


    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            const apiUrl = import.meta.env.VITE_API_URL;
            fetch(`${apiUrl}/register`, {
                method: "POST",
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
                    
                    if (data.ok)
                        setError("Successful register.");
                    else
                        setError("Error registering.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error registering.");
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
             <h1 className="text-4xl pb-2">Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                </div><div>
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
                    <label htmlFor="password">Password:</label></div><div>
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
                    <label htmlFor="confirmPassword">Confirm Password:</label></div><div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        className="bg-gray-200"
                    />
                </div>
                <div>
                        <button type="submit" className="border-2 border-black p-1 my-2 rounded-md">Register</button>

                </div>
                <div>
                        <button onClick={handleLoginClick} className="border-2 border-black p-1 rounded-md my-2">Go to Login</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default SignUp;