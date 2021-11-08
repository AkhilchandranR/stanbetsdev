import Close from '@mui/icons-material/Close';
import React, { useState,useEffect } from 'react';
import './AdminGame.css';
import GameComponent from './GameComponent';
import ReactDOM from 'react-dom';
import CreateGame from './CreateGame/CreateGame';
import { db } from '../../firebase';
import SiteStats from '../SiteStatsModal/SiteStats';
import UserLookUpModal from '../UserLookUpModal/UserLookUpModal';


function AdminGame({ show,hide }) {
    const[currentGames,setCurrentGames] = useState([]);
    const [openStats,setOpenStats] = useState(false);
    const[openCreateModal,setOpenCreateModal] = useState(false);
    const[searchedUser,setSearchedUser] = useState();
    const[openLookUp,setOpenLookUp] = useState(false);

    useEffect(() => {
        const getCurrentGames = async()=>{
            try{
                const games = await db.collection('games').get()
                const gameCollection = games?.docs?.map((doc)=>(
                    doc?.data()
                )).slice(0,5);
                await setCurrentGames(gameCollection);
            }
            catch{
                alert("failed to load games please try again")
            }
        }
        getCurrentGames()
    },[show])

    //handles the click of user look up button by admin
    const handleUserLookUp = async(e) =>{
        e.preventDefault();
        const searchName = window.prompt("Please enter the name you want to search");
        if(searchName){
            try{
                const userData = await db.collection('users').get()
                const userCollection = await userData?.docs?.map((doc)=>(
                    doc?.data()
                ))
                const SearchedUserData = await userCollection.find((user)=>(
                    user.username.toLowerCase() === searchName.toLowerCase()
                ))
                if(SearchedUserData){
                   await setSearchedUser(SearchedUserData);
                   await setOpenLookUp(true);
                   return;
                }
                else{
                    window.alert("This user doesn't exist");
                    return;
                }
            }
            catch{
                window.alert("Search failed .Please try again");
                return;
            }
        }
        
    } 
    
    if(!show) return null;

    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="admingame">
            <div className="admingame__buttons">
                <button className="admingame__control" onClick={()=>{setOpenCreateModal(true)}}>New Game</button>
                <button className="admingame__control" onClick={handleUserLookUp}>User Lookup</button>
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
                    payout={game?.payOut}
                    />
                ))}
            </div>
        </div>
        <CreateGame open={openCreateModal} hide={()=>{setOpenCreateModal(false)}}/>
        <SiteStats open={openStats} hide={()=>{setOpenStats(false)}}/>
        <UserLookUpModal open={openLookUp} hide={()=>setOpenLookUp(false)} currentUser={searchedUser}/>
        </>,
        document.getElementById('portal')
    )
}

export default AdminGame
