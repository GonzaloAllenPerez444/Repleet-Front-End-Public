import { useEffect, useState } from 'react';
import './App.css';
import Header from './LandingPageHeader.tsx';
import './style.css';
import "tailwindcss/tailwind.css"




function App() {
    const isNotCompleted = !(localStorage.getItem('formCompleted') === 'true');

    return (<>

        <Header headerName="Welcome to Repleet" />
        
        <h1 className="text-6xl ">Landing Page</h1>

        {isNotCompleted ? (
            <a href={`/info`}>Get Started </a>
        ) : <a href={`/practice`}>Continue Learning </a>}
        

    </>)
}

export default App;