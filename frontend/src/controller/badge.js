// Badge.js
import React from 'react';
import './badge.css'; // Importing the CSS file for styling
import badgeLogo from '../BadgeLogo/colour badged.jpg'; // Import the image


const Badge = ({ badgeName, achieved, dateAchieved }) => {
    return (
        <div className={`badge-container ${achieved ? 'achieved' : 'not-achieved'}`}>
            <div className="badge-icon">
            <img src={badgeLogo} alt="Badge" className="badge-icon" /> {/* Use the imported image */}
                <span>{badgeName}</span>
            </div>
            <div className="badge-info">
                <p>{badgeName}</p>
                {achieved ? <p>Achieved on {dateAchieved}</p> : <p>Not achieved</p>}
            </div>
        </div>
    );
};

export default Badge;
