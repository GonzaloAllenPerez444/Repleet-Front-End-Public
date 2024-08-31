import React, { useState } from 'react';

interface CarouselItem {
    image: string;
    caption: string;
}

const TutorialCarousel: React.FC = () => {
    const items: CarouselItem[] = [
        {
            image: '../public/SurveyScreenshot.png',
            caption: '1) Plug in your initial Skill Level with Each of the 18 most popular categories of Data Structure and ' +
                'Algorithm Problems and log in to get your own personalized problem reccomendations.',
        },
        {
            image: '../public/CardScreenshot.png',
            caption: "2) We'll pick out a problem based " +
                'on what you should work on next, as well as display your overall progress',
        },
        {
            image: '../public/SubmitScreenshot.png',
            caption: "3) Once you've attempted a problem, submit how well you did to update your progress and generate the next one!",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className=" w-full max-w-xl mx-auto text-white">
            
            <div className="relative w-full h-auto">
                
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 flex items-center transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={item.image} alt={`Carousel ${index + 1}`} className="w-2/3 h-auto" />
                        <p className="text-left ml-4 w-1/3">{item.caption}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={handlePrevious}
                className="absolute left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full ml-10"
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full mr-10"
            >
                &gt;
            </button>
        </div>
    );
};

export default TutorialCarousel;
