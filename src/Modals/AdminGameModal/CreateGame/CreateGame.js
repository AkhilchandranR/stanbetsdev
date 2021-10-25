import Close from '@mui/icons-material/Close';
import React,{ useRef,useState } from 'react';
import './CreateGame.css';
import ReactDOM from 'react-dom';
import { db } from '../../../firebase';
import { v4 as uuidv4} from 'uuid';

function CreateGame({open,hide}) {
    const gameRef = useRef();
    const dateRef = useRef();
    const [timeRef,setTimeRef] = useState("00:00");
    const linkRef = useRef(null);
    const teamOneRef = useRef();
    const teamTwoRef = useRef();
    const teamOneOddsRef = useRef();
    const teamTwoOddsRef = useRef();

    const createNewGame = async(e) =>{
        e.preventDefault();
        const confirm = window.confirm("List this game ?");
        if (confirm){
            try{
                await db.collection('games').add({
                    id:uuidv4(),
                    gameName:gameRef.current.value,
                    date: dateRef.current.value,
                    time: timeRef,
                    link: linkRef.current.value,
                    team1:{
                        name:teamOneRef.current.value,
                        odds: teamOneOddsRef.current.value
                    },
                    team2:{
                        name:teamTwoRef.current.value,
                        odds: teamTwoOddsRef.current.value
                    }
                })
            }
            catch{
                window.alert("Failed to create")
            }
        }
        hide();
    }

    if (!open) return null;
    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="creategame">
            <div className="creategame__header">
                <h2>Create New Listing</h2>
                <Close onClick={hide}/>
            </div>
            <div className="creategame__body">
                <p>Game:</p>
                <div className="creategame__inputs">
                    <input type="text" ref={gameRef} required/>
                </div>
                <p>Date:</p>
                <div className="creategame__inputs">
                    <input type="date" ref={dateRef} required/>
                </div>
                <p>Time:</p>
                <div className="creategame__inputs">
                    <input type="time" value={timeRef} onChange={(e)=>setTimeRef(e.target.value)} required/>
                </div>
                <p>Stream Link (if Available):</p>
                <div className="creategame__inputs">
                    <input type="text" ref={linkRef}/>
                </div>
                <div className="creategame__teams">
                    <div className="creategame__team">
                        <p>Team One:</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamOneRef} required/>
                        </div>
                    </div>
                    <div className="creategame__team">
                        <p>Team Two:</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamTwoRef} required/>
                        </div>
                    </div>
                </div>
                <div className="creategame__teams">
                <div className="creategame__team">
                        <p>Team One Odds:</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamOneOddsRef} required/>
                        </div>
                    </div>
                    <div className="creategame__team">
                        <p>Team Two Odds:</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamTwoOddsRef} required/>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={createNewGame}>List New Game</button>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default CreateGame
