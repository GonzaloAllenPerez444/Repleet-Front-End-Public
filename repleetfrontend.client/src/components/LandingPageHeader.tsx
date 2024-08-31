// src/components/Header.js
import React from 'react';
interface DisplayContentProps {
    children: React.ReactNode; // Accepts any valid React node
}

const Header: React.FC<DisplayContentProps> = ({ children }) => {
    return (
       
        <div className="flex flex-row w-full h-20 p-4">
            
            <div id="registerBox" className=" p-10 lg:p-10 w-3/5 md:w-1/5 ml-auto flex flex-col justify-center items-center text-white border-2 border-white-200 ">

                <div className=" md:py-1 md:py-2"> {children} </div>
                
                <a className=' py-1 md:py-2 hover:text-blue-400 transition-colors duration-300' href="/">Back To Main</a>
                </div>
            </div>


    )
}

export default Header;
