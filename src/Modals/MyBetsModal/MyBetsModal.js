import React from 'react';
import './MyBetsModal.css';
import Close from '@mui/icons-material/Close';
import MyBetComponent from './MyBetComponent';
import ReactDOM from 'react-dom';

function MyBetsModal({show,hide}) {
    if(!show) return null

    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="mybets">
            <div className="mybets__header">
                <h2>My Bets</h2>
                <Close onClick={hide}/>
            </div>
            <div className="mybets__body">
                <MyBetComponent/>
                <MyBetComponent/>
                <MyBetComponent/>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default MyBetsModal
