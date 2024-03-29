import Close from '@mui/icons-material/Close';
import React,{ useRef,useState } from 'react';
import './CreateGame.css';
import ReactDOM from 'react-dom';
import { db } from '../../../firebase';
import { v4 as uuidv4} from 'uuid';
import { closeGameModal } from '../../../States/slices/chatSlice';
import { useSelector,useDispatch } from 'react-redux';
import firebase from 'firebase';

function CreateGame() {
    const openCreateGameModal = useSelector((state)=>state.chat.showCreateGame);
    const gameRef = useRef();
    const dateRef = useRef();
    const [timeRef,setTimeRef] = useState("00:00");
    const linkRef = useRef(null);
    const teamOneRef = useRef();
    const teamTwoRef = useRef();
    const teamOneOddsRef = useRef();
    const teamTwoOddsRef = useRef();
    const dispatch = useDispatch();


    const createNewGame = async(e) =>{
        e.preventDefault();

        //chech whether all fields are valid..
        if((gameRef.current.value).trim() === '' || (dateRef.current.value).trim() === '' || (teamOneRef.current.value).trim() === ''
        || (teamTwoRef.current.value).trim() === '' || (teamOneOddsRef.current.value).trim() === '' || (teamTwoOddsRef.current.value).trim() === ''){
            window.alert("Please fill in the required fields");
            return;
        }
        if(isNaN(teamOneOddsRef.current.value) || isNaN(teamTwoOddsRef.current.value)){
            window.alert("Odds should be a number");
            return;
        }


        const times = timeRef.split(':')
        const addTime = parseInt(times[0])*60*60 + parseInt(times[1])*60;


        var today = new Date()
        const dateToCheck = today.getTime()+((today.getHours()-2)*60*60*1000)/2;
        const nextMonth = today.getFullYear()+'-'+(today.getMonth()+2)+'-'+(today.getDate());
        const nextMontDate = new Date(nextMonth).getTime();
        const gamesDate = new Date(dateRef.current.value).getTime() + (addTime*1000);


        if(gamesDate < dateToCheck){
            window.alert("Date and time should have to be in the future")
            return;
        }
        else if(gamesDate > nextMontDate){
            window.alert("Date should be within one month")
            return;
        }

        const confirm = window.confirm("List this game ?");
        if (confirm){
            try{
                const gameDocumentId = uuidv4();
                const teamOneOdds = parseFloat(teamOneOddsRef.current.value);
                const teamTwoOdds = parseFloat(teamTwoOddsRef.current.value);
                const fairoddOne = Math.round((1/teamOneOdds*100)/((1/teamOneOdds*100)+(1/teamTwoOdds*100))*100);
                const fairoddTwo = Math.round((1/teamTwoOdds*100)/((1/teamOneOdds*100)+(1/teamTwoOdds*100))*100);
                await db.collection('games').doc(gameDocumentId).set({
                    id:gameDocumentId,
                    gameName:gameRef.current.value,
                    date: dateRef.current.value,
                    time: timeRef,
                    link: linkRef.current.value,
                    payOut: false,
                    team1:{
                        name:teamOneRef.current.value,
                        odds: Number(teamOneOddsRef.current.value).toFixed(2),
                        locked: false,
                        fairOdds: fairoddOne
                    },
                    team2:{
                        name:teamTwoRef.current.value,
                        odds: Number(teamTwoOddsRef.current.value).toFixed(2),
                        locked: false,
                        fairOdds: fairoddTwo
                    }
                })
            }
            catch{
                window.alert("Failed to create")
            }
        }
        dispatch(closeGameModal());
    }

    if (!openCreateGameModal) return null;
    
    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="creategame">
            <div className="creategame__header">
                <h2>Create New Listing</h2>
                <Close onClick={()=>{dispatch(closeGameModal())}} className="close"/>
            </div>
            <div className="creategame__body">
                <p>Game*</p>
                <div className="creategame__inputs">
                    <input type="text" ref={gameRef} required/>
                </div>
                <p>Date*</p>
                <div className="creategame__inputs">
                    <input type="date" ref={dateRef} required/>
                </div>
                <p>Time*</p>
                <div className="creategame__inputs">
                    <input type="time" value={timeRef} onChange={(e)=>setTimeRef(e.target.value)} required/>
                </div>
                <p>Stream Link (if Available):</p>
                <div className="creategame__inputs">
                    <input type="text" ref={linkRef}/>
                </div>
                <div className="creategame__teams">
                    <div className="creategame__team">
                        <p>Team One*</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamOneRef} required/>
                        </div>
                    </div>
                    <div className="creategame__team">
                        <p>Team Two*</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamTwoRef} required/>
                        </div>
                    </div>
                </div>
                <div className="creategame__teams">
                <div className="creategame__team">
                        <p>Team One Odds*</p>
                        <div className="creategame__inputshalf">
                            <input type="text" ref={teamOneOddsRef} required/>
                        </div>
                    </div>
                    <div className="creategame__team">
                        <p>Team Two Odds*</p>
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
