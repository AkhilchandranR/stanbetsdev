import React from 'react';
import './MyBetComponent.css';

function MyBetComponent() {
    return (
        <div className="mybetcomponent">
            <div className="mybetcomponent__details">
                <p>League of Legends</p>
                <p>Team1 vs Team2</p>
                <p>Team2@3.33</p>
                <p>19:00 UTC - 16/09/21</p>
            </div>
            <div className="mybetcomponent__amount">
                <h3>$1:00</h3>
            </div>
        </div>
    )
}

export default MyBetComponent
