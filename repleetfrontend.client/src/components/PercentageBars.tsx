import React from 'react';

interface PercentageBarsProps {
    data: Map<string, number>;
}

const PercentageBars: React.FC<PercentageBarsProps> = ({ data }) => {
    return (
        <div style={{
            width: '25%', // Right quarter of the screen
            height: '50vh', // Full height of the screen
            overflowY: 'auto', // Vertical scroll
            padding: '10px',
            position: 'fixed', // Fix the position to the right
            top: '25vh',
            marginRight: '1vh',
            right: 0, // Align to the right
            backgroundColor: '#f4f4f4', // Optional background color for the container
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)', // Optional shadow for the container
            border: '2px solid white', // Add white border
            borderRadius: '5px', // Optional: Rounded corners
            
        }}>
            {Array.from(data.entries()).map(([label, percentage]) => (
                <div key={label} style={{ marginBottom: '10px' }}>
                    <span>{label}</span>
                    <div style={{
                        width: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        marginTop: '5px'
                    }}>
                        <div style={{
                            width: `${percentage}%`,
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
