
import React, { useState } from 'react';

interface RigidSliderProps {
    categoryName: string;
    changeParentState: Function;
}

const RigidSlider: React.FC<RigidSliderProps> = ({categoryName,changeParentState}) => {
    const min: number = 1;
    const max: number = 5;
    const step: number = 1;

    const labels: { [key: number]: string } = {
        1: 'No Experience',
        2: 'Novice',
        3: 'Ok',
        4: 'Good',
        5: 'Mastered'
    };

    //const rangeValues = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    const [value, setValue] = useState<number>(min);
   
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
        changeParentState(categoryName, Number(event.target.value)); //category name is the key of the li and key in the parent dict.
    };

    return (
        <div className="flex flex-col items-center w-1/2 mt-10">
            <h2 className="text-2xl font-semibold mb-4">{categoryName}</h2>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                list={"Ticks"} 
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 pb-5"
            />
            <datalist id="Ticks" className="flex justify-between w-full">
                <option className="text-center"> 1</option>
                <option className="text-center">2</option>
                <option className="text-center">3</option>
                <option className="text-center">4</option>
                <option className="text-center">5</option>
            </datalist>
           
            <div className="mt-2 text-center text-lg">{labels[value]}</div>
        </div>
    );
};

export default RigidSlider;
