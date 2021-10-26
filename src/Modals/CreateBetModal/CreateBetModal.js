import Close from '@mui/icons-material/Close';
import React,{ useEffect,useState } from 'react';
import './CreateBetModal.css';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import ProgressBar from "@ramonak/react-progress-bar";

function CreateBetModal({ show,hide }) {
    const gameToBetId = useSelector((state)=>state.user.betGameId);
    const [gameToBet,setGameToBet] = useState();
    useEffect(() => {
        const getGame = async() =>{
            const games = await db.collection('games').get()
            const gamesCollection = games?.docs?.map((doc)=>(
                doc?.data()
            ))
            setGameToBet(gamesCollection?.filter((game)=>(
                game.id == gameToBetId
            )))
        }
        getGame()
    })
    if (!show) return null;
    return (
        <>
        <div className="overlay"/>
        <div className="createbet">
            <div className="createbet__header">
                <h2>Bet on {gameToBet[0]?.team1?.name} vs {gameToBet[0]?.team2?.name}</h2>
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
                    <p>{gameToBet[0]?.team1?.name} @ {gameToBet[0]?.team1?.odds}</p>
                    <p>Win = $2.50</p>
                </button>
                <button className="red">
                    <p>{gameToBet[0]?.team2?.name} @ {gameToBet[0]?.team2?.odds}</p>
                    <p>Win = $6.66</p>
                </button>
            </div>
           {gameToBet[0].link && <div className="createbet__matchlink">
                <p>Watch the game live on Twitch(19:00 UTC 18/10/21)
                </p>
            </div>}
        </div>
        </>
    )
}

export default CreateBetModal
