import React,{ useEffect,useState } from 'react';
import './EditGame.css';
import Close from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import { db } from '../../../firebase';
import { TrendingUp } from '@mui/icons-material';

function EditGame({open,hide,name,date,time,link,team1,team2,id,isPayOut}) {
    const[gameName,setGameName] = useState(name);
    const[gameDate,setDate] = useState(date);
    const[gameTime,setTime] = useState(time);
    const[gameLink,setLink] = useState(link);
    const[payedOut,setPayedOut] = useState(isPayOut);
    const[gameTeam1Name,setGameTeam1Name] = useState(team1.name);
    const[gameTeam1odd,setGameTeam1odd] = useState(team1.odds);
    const[gameTeam2Name,setGameTeam2Name] = useState(team2.name);
    const[gameTeam2odd,setGameTeam2odd] = useState(team2.odds);
    const[docId,setDocId] = useState('');
    const[betDocId,setBetDocId] = useState([]);
    const[userDocId,setUserDocId] = useState([]);
    const[userIds,setUserIds] = useState([]);

    //effect to find the current doc id of the game for the purpose of updation
    useEffect(() => {
        const getDocId = async()=>{
            try{
                const gameRef = await db.collection('games');
                    const snapshot = await gameRef.get();
                    if (snapshot.empty) {
                    return;
                    }  
                    
                    snapshot.forEach(doc => {
                    if (doc.data().id == id){
                        setDocId(doc.id)
                    }
                    })
            }
            catch{

            }
        }
        getDocId();
    })

    useEffect(() => {
        const getBetDocId = async() =>{
            try{
                const betRef = await db.collection('bets');
                const eachsnapshot = await betRef.get();
                if (eachsnapshot.empty) {
                    return;
                }  
                    
                eachsnapshot.forEach(doc => {
                if (doc.data().game == id){
                      setBetDocId(oldArray=>[...oldArray,doc.id])
                }
                })
            }
            catch{

            }
        }
        getBetDocId();
    },[])

    //edit the listed game if changes
    const editCurrentGame = async(e) =>{
        e.preventDefault();
        try{
            hide();
            await db.collection('games').doc(docId).update({
                gameName:gameName,
                date:gameDate,
                time:gameTime,
                link:gameLink,
                payOut:false,
                team1:{name:gameTeam1Name,odds:gameTeam1odd,locked:team1.locked},
                team2:{name:gameTeam2Name,odds:gameTeam2odd,locked:team2.locked},
            })
            window.alert("Successfully Updated")

        }
        catch{
            window.alert("Failed to modify.Please try again")
        }
    }

    //locking the bet functionality
    const lockBets = async(team) =>{
        try{
            if(team == "team1"){
                await db.collection('games').doc(docId).update({
                    team1:{name:team1.name,odds:team1.odds,locked:!(team1.locked)}
                }).catch((err)=>alert(err.message))
            }
            if(team == "team2"){
                await db.collection('games').doc(docId).update({
                    team2:{name:team2.name,odds:team2.odds,locked:!(team2.locked)}
                }).catch((err)=>alert(err.message))
            }
        }
        catch{
            window.alert("Process failed.Please try again.")
        }
    }

    //payout for won bets
    const payOut = async(team) =>{
        try{
            await db.collection('games').doc(docId).update({
                payOut: true
            }).catch((err)=>console.log(err))
            setPayedOut(true)
            betDocId.forEach((id)=>{
                const bets = db.collection('bets').doc(id)
                bets.get().then((doc)=>{
                    if(doc.exists){
                        if(doc.data().team == team){
                             db.collection('bets').doc(id).update({
                                isWon: true,
                                isOver: true,
                                wonDate: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()
                            })
                        // setUserIds(old=>[...old,doc.data().user])
                        }
                    }
                
                }).catch((err)=>console.log(err))
            })

        }
        catch{
            window.alert("failed to payout.Please try again")
        }
        hide();
    }

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
                    <input type="text" value={gameName} onChange={(e)=>{setGameName(e.target.value)}}/>
                </div>
                <p>Date:</p>
                <div className="editgame__inputs">
                    <input type="date" value={gameDate} onChange={(e)=>{setDate(e.target.value)}}/>
                </div>
                <p>Time:</p>
                <div className="editgame__inputs">
                    <input type="time" value={gameTime} onChange={(e)=>{setTime(e.target.value)}}/>
                </div>
                <p>Stream Link (if Available):</p>
                <div className="editgame__inputs">
                    <input type="text" value={gameLink} onChange={(e)=>{setLink(e.target.value)}}/>
                </div>
                <div className="editgame__teams">
                    <div className="editgame__team">
                        <p>Team One:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam1Name} onChange={(e)=>{setGameTeam1Name(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="editgame__team">
                        <p>Team Two:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam2Name} onChange={(e)=>{setGameTeam2Name(e.target.value)}}/>
                        </div>
                    </div>
                </div>
                <div className="editgame__teams">
                <div className="editgame__team">
                        <p>Team One Odds:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam1odd} onChange={(e)=>{setGameTeam1odd(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="editgame__team">
                        <p>Team Two Odds:</p>
                        <div className="editgame__inputshalf">
                            <input type="text" value={gameTeam2odd} onChange={(e)=>{setGameTeam2odd(e.target.value)}}/>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={editCurrentGame}>Edit Current Listing</button>
            <div className="editgame__lock">
                <button onClick={()=>{lockBets("team1")}}>
                    {team1.locked ? "Unlock" : "Lock"} Bets For {gameTeam1Name}
                </button>
                <button onClick={()=>{lockBets("team2")}}>
                    {team2.locked ? "Unlock" : "Lock"} Bets For {gameTeam2Name}
                </button>
            </div>
            <div className="editgame__payout">
                <button onClick={()=>{payOut(gameTeam1Name)}} disabled={payedOut}>
                    Payout {gameTeam1Name} @ {gameTeam1odd}
                </button>
                <button onClick={()=>{payOut(gameTeam2Name)}} disabled={payedOut}>
                    Payout {gameTeam2Name} @ {gameTeam2odd}
                </button>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default EditGame
