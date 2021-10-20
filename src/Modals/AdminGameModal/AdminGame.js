import Close from '@mui/icons-material/Close';
import React from 'react';
import './AdminGame.css';
import GameComponent from './GameComponent';
import ReactDOM from 'react-dom';

function AdminGame({ show,hide }) {
    if(!show) return null;

    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="admingame">
            <div className="admingame__buttons">
                <button className="admingame__control">New Game</button>
                <button className="admingame__control">User Lookup</button>
                <button className="admingame__control">Site Stats</button>
                <Close onClick={hide}/>
            </div>
            <p>Current Listed Games:</p>
            <div className="admingame__games">
                <GameComponent/>
                <GameComponent/>
                <GameComponent/>
                <GameComponent/>
                <GameComponent/>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default AdminGame
