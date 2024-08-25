import { useEffect, useState } from 'react';
import '../App.css';
import Header from '../components/LandingPageHeader.tsx';
import '../style.css';
import "tailwindcss/tailwind.css"
import { useAuth } from '../components/AuthContext.tsx';




function App() {
    const isNotCompleted = !(localStorage.getItem('formCompleted') === 'true');
    const { isAuthenticated } = useAuth();

    return (

        <div className="w-screen h-screen font-bold font-helvetica bg-gradient-to-b from-black via-black/90 via-70% to-blue-500 flex flex-col
            gap-10">

            <Header>
                {isAuthenticated ? (
                    <p className='py-4 hover:text-blue-400 transition-colors duration-300'>You Are Signed In</p>
                ) : (
                    <a className='py-4 hover:text-blue-400 transition-colors duration-300' href="/signin">Sign Up / Sign In</a>
                )}
            </Header>
            
            

        
            <h1 className="text-[10vw] text-white  pl-20 ">Repleet</h1>
         <h2 className="text-[5vw] text-white pl-20"> Spaced Repetition for DSA Problems </h2>

            <div className="pl-20 pt-10 ">
         
        
        {isNotCompleted ? (
                    <a href={`/info`} className=" w-1/5 text-white bg-blue-500 rounded-lg p-4  border border-blue-700 hover:text-black transition-colors duration-300">Get Started </a>
                ) : <a href={`/practice`} className=" w-1/5 text-white bg-blue-500 rounded-lg p-4  border border-blue-700 hover:text-black transition-colors duration-300">Continue Learning </a>}

            </div>

    </div>)
}

export default App;