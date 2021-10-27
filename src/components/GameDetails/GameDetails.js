import React, { useState } from 'react';
import './GameDetails.css';
import CreateBetModal from '../../Modals/CreateBetModal/CreateBetModal';
import { useDispatch,useSelector } from 'react-redux';
import { openBet } from '../../States/slices/userSlice';

function GameDetails({ id,name,date,time,team1,team2,link }) {
    
    const[showBetModal,setShowBetModal] = useState(false);
    return (
        <div className="gamedetails" onClick={()=>{setShowBetModal(true)}}>
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
            <CreateBetModal 
            show={showBetModal} 
            hide={()=>setShowBetModal(false)}
            team1={team1} team2={team2} id={id} link={link}
            />
        </div>
    )
}

export default GameDetails
