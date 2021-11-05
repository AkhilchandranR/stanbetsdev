import React from 'react';
import './GameDetails.css';
import { useDispatch } from 'react-redux';
import { useAuth } from "../../AuthContext";
import { openBet,setBetGameId } from '../../States/slices/userSlice';

function GameDetails({ id,name,date,time,team1,team2,link }) {
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const handleClick = (e) =>{
        e.preventDefault();

        //only works if the user is logged in otherwise dont...
        if(!currentUser){
            window.alert("You are not logged in");
            return;
        }

        //dispatch set games bet for setting up id in createbetmodal
        // otherwise ie,if user is present,them open the createbetmodal
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
