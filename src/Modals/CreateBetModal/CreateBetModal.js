import Close from '@mui/icons-material/Close';
import React,{ useState,useEffect } from 'react';
import './CreateBetModal.css';
import { db } from '../../firebase';
import ProgressBar from "@ramonak/react-progress-bar";
import ReactDom from 'react-dom';

function CreateBetModal({ show,hide,id,team1,team2,link }) {
    const [betAmount,setBetAmount] = useState(0.0);

    if (!show) return null;
    return ReactDom.createPortal(
        <>
        <div className="overlay"/>
        <div className="createbet">
            <div className="createbet__header">
                <h2>Bet on {team1?.name} vs {team2?.name}</h2>
                <Close onClick={hide}/>
            </div>
            <p>Bet Amount:</p>
            <div className="createbet__amount">
                <input type="text" value={betAmount} onChange={(e)=>{setBetAmount(e.target.value)}}/>
            </div>
            <ProgressBar completed={73}
             isLabelVisible={false}
             bgColor="#3d96e8"
             baseBgColor="#f27272"
             borderRadius="0px"/>
            <div className="createbet__buttons">
                <button className="blue">
                    <p>{team1?.name} @ {team1?.odds}</p>
                    <p>Win = $2.50</p>
                </button>
                <button className="red">
                    <p>{team2?.name} @ {team2?.odds}</p>
                    <p>Win = $6.66</p>
                </button>
            </div>
           {link && <div className="createbet__matchlink">
                <p>Watch the game live on Twitch(19:00 UTC 18/10/21)
                </p>
            </div>}
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default CreateBetModal
