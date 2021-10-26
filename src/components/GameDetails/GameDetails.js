import React from 'react';
import './GameDetails.css';
import { useDispatch } from 'react-redux';
import { openBet,setBetGameId } from '../../States/slices/userSlice';

function GameDetails({ key,id,name,date,time,team1,team2 }) {
    const dispatch = useDispatch();
    const handleClick = (e) =>{
        e.preventDefault();
        //dispatch set games bet
        dispatch(setBetGameId({
            betGameId: id
        }))
        dispatch(openBet());
    }
    return (
        <div className="gamedetails" onClick={handleClick}>
            <div className="gamedetails__heading">
                <h5>{name}</h5>
                <p>{date}</p>
                <p>{time}UTC</p>
            </div>
            <div className="gamedetails__body">
                <h3>{team1?.name} vs {team2?.name}</h3>
                <div className="gamedetails__bets">
                    <div className="gamedetails__bet">
                        <p>{team1?.odds}</p>
                    </div>
                    <div className="gamedetails__bet">
                        <p>{team2?.odds}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetails
