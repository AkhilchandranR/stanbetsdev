import React from 'react';
import './GameComponent.css';
import edit from '../../images/edit.png';

function GameComponent() {
    return (
        <div className="gamecomponent">
            <p>Team 1</p>
            <p>vs</p>
            <p>Team 2</p>
            <img src={edit}/>
            <div className="gamecomponent__odds">
                <p>1.25 | 3.33</p>
            </div>
        </div>
    )
}

export default GameComponent
