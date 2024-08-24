// src/components/Header.js
import React from 'react';

const Header: React.FC<{ headerName: string }> = ({ headerName }) => {
    return (
       
        <div className="flex flex-row w-full  h-20 ">
            
            <div id="registerBox" className=" w-1/5 ml-auto flex flex-col justify-center items-center text-white border-2 border-white-200 ">
                <p className='pt-4 hover:text-blue-400 transition-colors duration-300'>Sign Up</p>
                <p className='py-4 hover:text-blue-400 transition-colors duration-300'>Sign In</p>
                </div>
            </div>


    );
}

export default Header;
