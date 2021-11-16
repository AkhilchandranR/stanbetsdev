import Close from '@mui/icons-material/Close';
import React, { useState,useEffect } from 'react';
import './AdminGame.css';
import GameComponent from './GameComponent';
import ReactDOM from 'react-dom';
import { db } from '../../firebase';
import { showGameModal,showStatsModal } from '../../States/slices/chatSlice';
import { openStats,setChatUser } from '../../States/slices/userSlice';
import { useDispatch} from 'react-redux';


function AdminGame({ open,close }) {
    const[currentGames,setCurrentGames] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCurrentGames = async()=>{
            try{
                const games = await db.collection('games').get()
                const gameCollection = games?.docs?.map((doc)=>(
                    doc?.data()
                ))
                const gamesGoingOn = gameCollection?.filter((game)=>(
                    game.payOut === false
                ))
                await setCurrentGames(gamesGoingOn);
            }
            catch{
                alert("failed to load games please try again")
            }
        }
        getCurrentGames()
    },[open])

    const openCreateGameModal = (e) =>{
        e.preventDefault();
        close();
        dispatch(showGameModal());
    }
    const openSiteStatsModal =(e) =>{
        e.preventDefault();
        close();
        dispatch(showStatsModal())
    }

    //handles the click of user look up button by admin
    const handleUserLookUp = async(e) =>{
        e.preventDefault();
        close();
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

                    await dispatch(setChatUser({
                        chatUserId: SearchedUserData?.userId
                        }));

                    await dispatch(openStats());

                    return;
                }
                else{
                    window.alert("This user doesn't exist");
                    return;
                }
            }
            catch(error){
                console.log(error)
                window.alert("Search failed .Please try again");
                return;
            }
        }
        
    } 
    
    if(!open) return null;

    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="admingame">
            <div className="admingame__buttons">
                <button className="admingame__control" onClick={openCreateGameModal}>New Game</button>
                <button className="admingame__control" onClick={handleUserLookUp}>User Lookup</button>
                <button className="admingame__control" onClick={openSiteStatsModal}>Site Stats</button>
                <Close onClick={close} className="close"/>
            </div>
            <p>Current Listed Games:</p>
            {(currentGames.length > 0)?(
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
            ):(
                <div className = "admingame__gamesEmpty">
                    <h3>No games are listed currently</h3>
                </div>
            )}
            
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default AdminGame
