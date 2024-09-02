import React from 'react';

interface PercentageBarsProps {
    data: Map<string, number>;
}

const PercentageBars: React.FC<PercentageBarsProps> = ({ data }) => {
    return (
        <div 
            
            className="w-1/4 h-[50vh] overflow-y-auto p-2 fixed top-1/4 mr-[1vh] right-0 bg-gray-100 shadow-md border-2 border-white rounded-md"
       >
            {Array.from(data.entries()).map(([label, percentage]) => (
                <div key={label} className="mb-2">
                    <span>{label}</span>
                    <div 
                        className="w-full bg-gray-300 rounded-md overflow-hidden mt-1"
                    >

                        
                        <div style={{
                            width: `${percentage}%`, //this uses inline styles so I'll keep it as inline css
                            backgroundColor: '#4caf50',
                            padding: '5px 0',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            {percentage}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PercentageBars;
