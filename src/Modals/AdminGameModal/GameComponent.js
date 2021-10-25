import React from 'react';
import './GameComponent.css';
import edit from '../../images/edit.png';

function GameComponent({team1,team2}) {
    return (
        <div className="gamecomponent">
            <p>{team1?.name}</p>
            <p>vs</p>
            <p>{team2.name}</p>
            <img src={edit}/>
            <div className="gamecomponent__odds">
                <p>{team1.odds} | {team2.odds}</p>
            </div>
        </div>
    )
}

export default GameComponent
