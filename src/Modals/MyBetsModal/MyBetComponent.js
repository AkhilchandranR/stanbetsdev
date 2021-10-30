import React from 'react';
import './MyBetComponent.css';

function MyBetComponent({ name,team,odd,time,date}) {
    return (
        <div className="mybetcomponent">
            <div className="mybetcomponent__details">
                <p>{name}</p>
                <p>Team1 vs Team2</p>
                <p>{team}@{odd}</p>
                <p>{time} UTC - {date}</p>
            </div>
            <div className="mybetcomponent__amount">
                <h3>$1:00</h3>
            </div>
        </div>
    )
}

export default MyBetComponent
