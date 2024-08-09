// src/components/Header.js
import React from 'react';

const Header: React.FC<{ headerName: string }> = ({ headerName }) => {
    return (
       
        <div className="flex flex-row w-full inline-block bg-gray-200 h-20">
            <div className="w-4/5 border-2 border-rose-200 justify-center flex">
                <h1 className="text-6xl text-red-500"> {headerName}</h1>
            </div>
            <div id="registerBox" className=" w-1/5 flex flex-col justify-center items-center">
                <p className='pt-4 hover:text-light-blue-400 transition-colors duration-300'>Sign Up</p>
                <p className='py-4 hover:text-light-blue-400 transition-colors duration-300'>Sign In</p>
                </div>
            </div>


    );
}

export default Header;
