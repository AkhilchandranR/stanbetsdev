import React from 'react';
import './GameComponent.css';
import edit from '../../images/edit.png';
import { useDispatch } from 'react-redux';
import { setEditGameId } from '../../States/slices/userSlice';

function GameComponent({team1,team2,open,id,key}) {
    const dispatch = useDispatch();
    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(setEditGameId({
            editGameId: id
        }))
        open();
    }
    return (
        <div className="gamecomponent">
            <p>{team1?.name}</p>
            <p>vs</p>
            <p>{team2.name}</p>
            <img src={edit} onClick={handleClick}/>
            <div className="gamecomponent__odds">
                <p>{team1.odds} | {team2.odds}</p>
            </div>
        </div>
    )
}

export default GameComponent
