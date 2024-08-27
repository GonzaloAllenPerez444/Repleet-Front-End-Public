import React, { useState } from 'react';
import { SkillLevel} from '../Contracts/DTOS_AND_ENUMS';


interface FormProps {
    finishForm: Function;
}


const FeedbackForm: React.FC<FormProps> = ({ finishForm }) => {

    const [rating, setRating] = useState<SkillLevel>(1);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        finishForm(rating);
    }



    return (
        <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 w-full flex justify-center p-4 shadow-md">
            <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg flex items-center">
                <select
                    className="flex-grow p-2 mr-4 rounded-md border border-gray-300"
                    name="rating"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value="1">1 - Completely Stuck</option>
                    <option value="2">2 - Had Some Good Ideas</option>
                    <option value="3">3 - Struggled Hard / Unoptimized Solution</option>
                    <option value="4">4 - Did a Good Job</option>
                    <option value="5">5 - Completely Mastered</option>
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default FeedbackForm;