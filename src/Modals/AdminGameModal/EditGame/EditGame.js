import React,{ useEffect,useState } from 'react';
import './EditGame.css';
import Close from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';

function EditGame({open,hide}) {
    const gameId = useSelector((state)=>state.user.editGameId);
    const[game,setGame] = useState([])
    const[gameName,setGameName] = useState('');
    const[gameDate,setDate] = useState('');
    const[gameTime,setTime] = useState('');
    const[gameLink,setLink] = useState('');
    const[gameTeam1,setTeam1] = useState({});
    const[gameTeam2,setTeam2] = useState({});

    useEffect(() => {
       const getEditGame = async() =>{
        const gameData = await db.collection('games').get()
        const gamesCollection = gameData?.docs?.map((doc)=>(
            doc?.data()
       ))
       await setGame(gamesCollection.filter((game)=>(
        game.id == gameId
         )))
         await setDate(game[0]?.date);
         await setGameName(game[0]?.gameName)
         await setTime(game[0]?.time)
         await setLink(game[0]?.link)
         await setTeam1(game[0]?.team1)
         await setTeam2(game[0]?.team2)
       }
       getEditGame();
    },[gameId])

    useEffect(() => {
        console.log("????",gameName)
        
    }, [gameName])

    if(!open) return null
    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="editgame">
            <div className="editgame__header">
                <h2>Edit Listing</h2>
                <Close onClick={hide}/>
            </div>
            <div className="editgame__body">
                <p>Game:</p>
                <div className="editgame__inputs">
                    <input type="text" defaultValue={gameName} onChange={(e)=>{setGameName(e.target.value)}}/>
                </div>
                <p>Date:</p>
                <div className="editgame__inputs">
                    <input type="date" value={gameDate}/>
                </div>
                <p>Time:</p>
                <div className="editgame__inputs">
                    <input type="time" value={gameTime}/>
                </div>
                <p>Stream Link (if Available):</p>
                <div className="editgame__inputs">
                    <input type="text" value={gameLink}/>
                </div>
                <div className="editgame__teams">
                    <div className="editgame__team">
                        <p>Team One:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam1?.name}/>
                        </div>
                    </div>
                    <div className="editgame__team">
                        <p>Team Two:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam2?.name}/>
                        </div>
                    </div>
                </div>
                <div className="editgame__teams">
                <div className="editgame__team">
                        <p>Team One Odds:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam1?.odds}/>
                        </div>
                    </div>
                    <div className="editgame__team">
                        <p>Team Two Odds:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam2?.odds}/>
                        </div>
                    </div>
                </div>
            </div>
            <button>Edit Current Listing</button>
            <div className="editgame__lock">
                <button>Lock Bets For Team1</button>
                <button>Lock Bets For Team2</button>
            </div>
            <div className="editgame__payout">
                <button>Payout Team1 @ 1.25</button>
                <button>Payout Team2 @ 3.33</button>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default EditGame
