import Slider from './Slider';
import React, { useState } from 'react';
import {
    Outlet,
    Link,
    useLoaderData,
    Form,
} from "react-router-dom";

interface SliderFormProps {
    finishForm: Function;
}

const SliderForm: React.FC<SliderFormProps> = ({finishForm}) => {

    const categoryNames: string[] = [
        "Arrays & Hashing",
        "Two Pointers",
        "Sliding Window",
        "Stack",
        "Binary Search",
        "Linked Lists",
        "Heap/Priority Queue",
        "Trees",
        "Backstracking",
        "Tries",
        "Graphs",
        "Advanced Graphs",
        "1D Dynamic Programming",
        "2D Dynamic Programming",
        "Greedy",
        "Intervals",
        "Math & Geometry",
        "Bit Manipulation"
    ]

    const categoryDict: { [key: string]: number } = {};
    categoryNames.forEach(category => {
        categoryDict[category] = 1;
    });

    const handleSliderChange = (name:string,rangeValue:number) => {
        categoryDict[name] = rangeValue;

    }

    const listSliders = categoryNames.map(name => <li key={name}> <Slider categoryName={name} changeParentState={handleSliderChange} /></li>)


    

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        

        //convert hashmap into list of comma-seperated string of ratings to work with the backend.
        const numberList: number[] = Object.values(categoryDict);
        finishForm(numberList);
        
        
    };

    return (
        <form className='w-full max-w-4xl mx-auto p-4'  onSubmit={handleSubmit}> 
            <ul>{listSliders}</ul>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
                Submit
            </button>
        </form>
    )

}


export default SliderForm;