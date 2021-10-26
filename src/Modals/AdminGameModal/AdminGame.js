import Close from '@mui/icons-material/Close';
import React, { useState,useEffect } from 'react';
import './AdminGame.css';
import GameComponent from './GameComponent';
import ReactDOM from 'react-dom';
import CreateGame from './CreateGame/CreateGame';
import { db } from '../../firebase';
import SiteStats from '../SiteStatsModal/SiteStats';


function AdminGame({ show,hide }) {
    const[currentGames,setCurrentGames] = useState([]);
    const [openStats,setOpenStats] = useState(false);
    useEffect(() => {
        const currentGames = async()=>{
            const games = await db.collection('games').get()
            const gameCollection = games?.docs?.map((doc)=>(
                doc?.data()
            )).slice(0,5);
            setCurrentGames(gameCollection)
        }
        currentGames()
    })
    const[openCreateModal,setOpenCreateModal] = useState(false);
    if(!show) return null;

    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="admingame">
            <div className="admingame__buttons">
                <button className="admingame__control" onClick={()=>{setOpenCreateModal(true)}}>New Game</button>
                <button className="admingame__control">User Lookup</button>
                <button className="admingame__control" onClick={()=>{setOpenStats(true)}}>Site Stats</button>
                <Close onClick={hide}/>
            </div>
            <p>Current Listed Games:</p>
            <div className="admingame__games">
                {currentGames?.map((game)=>(
                    <GameComponent 
                    team1={game.team1}
                    team2={game.team2}
                    />
                ))}
            </div>
        </div>
        <CreateGame open={openCreateModal} hide={()=>{setOpenCreateModal(false)}}/>
        <SiteStats open={openStats} hide={()=>{setOpenStats(false)}}/>
        </>,
        document.getElementById('portal')
    )
}

export default AdminGame
