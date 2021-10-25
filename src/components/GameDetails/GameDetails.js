import React from 'react';
import './GameDetails.css';
import { useDispatch } from 'react-redux';
import { openBet } from '../../States/slices/userSlice';

function GameDetails({ id,name,date,time,team1,team2 }) {
    const dispatch = useDispatch();
    return (
        <div className="gamedetails" onClick={()=>{dispatch(openBet())}}>
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
