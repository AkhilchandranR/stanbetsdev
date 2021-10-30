import Close from '@mui/icons-material/Close';
import React, { useState,useEffect } from 'react';
import './AdminGame.css';
import GameComponent from './GameComponent';
import ReactDOM from 'react-dom';
import CreateGame from './CreateGame/CreateGame';
import { db } from '../../firebase';
import SiteStats from '../SiteStatsModal/SiteStats';
import EditGame from './EditGame/EditGame';


function AdminGame({ show,hide }) {
    const[currentGames,setCurrentGames] = useState([]);
    const [openStats,setOpenStats] = useState(false);
    // const [openEdit,setOpenEdit] = useState(false);
    const[openCreateModal,setOpenCreateModal] = useState(false);
    useEffect(() => {
        const currentGames = async()=>{
            try{
                const games = await db.collection('games').get()
                const gameCollection = games?.docs?.map((doc)=>(
                    doc?.data()
                )).slice(0,5);
                setCurrentGames(gameCollection)
            }
            catch{
                alert("failed to load games please try again")
            }
        }
        currentGames()
    })
    
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
                    key={game?.id}
                    id={game?.id}
                    team1={game?.team1}
                    team2={game?.team2}
                    name={game?.gameName}
                    date={game?.date}
                    time={game?.time}
                    link={game?.link}
                    />
                    // open={()=>{setOpenEdit(true)}
                ))}
            </div>
        </div>
        <CreateGame open={openCreateModal} hide={()=>{setOpenCreateModal(false)}}/>
        {/* <EditGame open={openEdit} hide={()=>{setOpenEdit(false)}}/> */}
        <SiteStats open={openStats} hide={()=>{setOpenStats(false)}}/>
        </>,
        document.getElementById('portal')
    )
}

export default AdminGame
