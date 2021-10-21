import Close from '@mui/icons-material/Close';
import React from 'react';
import './CreateBetModal.css';
import ProgressBar from "@ramonak/react-progress-bar";

function CreateBetModal({ show,hide }) {
    if (!show) return null;
    return (
        <>
        <div className="overlay"/>
        <div className="createbet">
            <div className="createbet__header">
                <h2>Bet on Team1 vs Team2</h2>
                <Close onClick={hide}/>
            </div>
            <p>Bet Amount:</p>
            <div className="createbet__amount">
                <input type="text" value="$2.00"/>
            </div>
            <ProgressBar completed={73}
             isLabelVisible={false}
             bgColor="#3d96e8"
             baseBgColor="#f27272"
             borderRadius="0px"/>
            <div className="createbet__buttons">
                <button className="blue">
                    <p>Team1 @ 1.25</p>
                    <p>Win = $2.50</p>
                </button>
                <button className="red">
                    <p>Team1 @ 3.33</p>
                    <p>Win = $6.66</p>
                </button>
            </div>
            {/* <div className="createbet__matchlink">
                <p>Watch the game live on Twitch(19:00 UTC 18/10/21)
                </p>
            </div> */}
        </div>
        </>
    )
}

export default CreateBetModal
