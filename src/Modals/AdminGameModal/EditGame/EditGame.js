import React,{ useEffect,useState } from 'react';
import './EditGame.css';
import Close from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import { db } from '../../../firebase';
import firebase from 'firebase';
import Loader from '../../../components/Laoder/Loader';

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
    const[TeamOneLocked,setTeamOneLocked] = useState(team1.locked);
    const[TeamTwoLocked,setTeamTwoLocked] = useState(team2.locked);
    const[loadingPayoutOne,setLoadingPayoutOne] = useState(false);
    const[loadingPayoutTwo,setLoadingPayoutTwo] = useState(false);
    const[userIds,setUserIds] = useState([]);


    //edit the listed game if changes
    const editCurrentGame = async(e) =>{
        e.preventDefault();

        //chech whether all fields are valid..
        if(gameName.trim() === '' || gameDate.trim() === '' || gameTeam1Name.trim() === ''
        || gameTeam2Name.trim() === '' || gameTeam1odd.trim() === '' || gameTeam2odd.trim() === ''){
            window.alert("Please fill in the required fields");
            return;
        }

        if(isNaN(gameTeam1odd) || isNaN(gameTeam2odd)){
            window.alert("Odds should be a number");
            return;
        }

        const times = gameTime.split(':')
        const addTime = parseInt(times[0])*60*60 + parseInt(times[1])*60;


        var today = new Date()
        const dateToCheck = today.getTime()+((today.getHours()-2)*60*60*1000)/2;
        const nextMonth = today.getFullYear()+'-'+(today.getMonth()+2)+'-'+(today.getDate());
        const nextMontDate = new Date(nextMonth).getTime();
        const gamesDate = new Date(gameDate).getTime() + (addTime*1000);


        if(gamesDate < dateToCheck){
            window.alert("Date and time should have to be in the future")
            return;
        }
        else if(gamesDate > nextMontDate){
            window.alert("Date should be within one month")
            return;
        }

        try{
            hide();
            const teamOneOdds = parseFloat(gameTeam1odd);
            const teamTwoOdds = parseFloat(gameTeam2odd);
            const fairoddOne = Math.round((1/teamOneOdds*100)/((1/teamOneOdds*100)+(1/teamTwoOdds*100))*100);
            const fairoddTwo = Math.round((1/teamTwoOdds*100)/((1/teamOneOdds*100)+(1/teamTwoOdds*100))*100);
            await db.collection('games').doc(id).update({
                gameName:gameName,
                date:gameDate,
                time:gameTime,
                link:gameLink,
                payOut:false,
                team1:{name:gameTeam1Name,odds:gameTeam1odd,locked:team1.locked,fairOdds:fairoddOne},
                team2:{name:gameTeam2Name,odds:gameTeam2odd,locked:team2.locked,fairOdds:fairoddTwo},
            })
            window.location.reload();
        }
        catch{
            window.alert("Failed to modify.Please try again")
        }
    }

    //locking the bet functionality
    const lockBets = async(team) =>{
        try{
            if(team == "team1"){
                await db.collection('games').doc(id).update({
                    team1:{name:team1.name,odds:team1.odds,locked:!(team1.locked),fairOdds:team1.fairOdds}
                }).catch((err)=>alert(err.message))
                setTeamOneLocked(!TeamOneLocked);
            }
            if(team == "team2"){
                await db.collection('games').doc(id).update({
                    team2:{name:team2.name,odds:team2.odds,locked:!(team2.locked),fairOdds:team2.fairOdds}
                }).catch((err)=>alert(err.message))
                setTeamTwoLocked(!TeamTwoLocked);
            }
        }
        catch{
            window.alert("Process failed.Please try again.")
        }
    }

    //payout for won bets
    const payOut = async(team) =>{
       try{
           if(team == team1.name){
                setLoadingPayoutOne(true);
           }
           else if(team == team2.name){
               setLoadingPayoutTwo(true);
           }
           
           //has to specify that the game is already paid out..
           await db.collection('games').doc(id).update({
                payOut: true,
                team1:{name:team1.name,odds:team1.odds,locked:true,fairOdds:team1.fairOdds},
                team2:{name:team2.name,odds:team2.odds,locked:true,fairOdds:team2.fairOdds},
           })
           //find out the bets with the game id and update it to payed out and iswon or not....
           //also update the user balance
           await db.collection("bets").where("game", "==", id)
           .get()
           .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                   const today = new Date();
                   const data = doc.data();
                   if(data.team == team){
                       const updateBetsAndUser =async()=>{
                            await db.collection('bets').doc(doc.id).update({
                                isOver: true,
                                isWon: true,
                                OverDate:  today.getDate()+'/'+(today.getMonth()+1)+'/'+ today.getFullYear(),
                            })
                            const wonUser = data.user;
                            const Amount = parseFloat(data.AmountIfWon).toFixed(2);
                            await db.collection('users').doc(wonUser).update({
                                totalBalance: firebase.firestore.FieldValue.increment(Amount)
                            }).catch((err)=>{console.log(err)})
                       }
                       updateBetsAndUser();
                   }
                   else{
                        db.collection('bets').doc(doc.id).update({
                            isOver: true,
                            isWon: false,
                            OverDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+ today.getFullYear(),
                        })
                   }
               });
           })
           .catch((error) => {
               console.log("Error getting documents: ", error);
           });

       }
       catch{
           window.alert("failed to payout.Please try again")
       }
       setLoadingPayoutOne(false);
       setLoadingPayoutTwo(false);
        hide();
    }

    if(!open) return null
    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="editgame">
            <div className="editgame__header">
                <h2>Edit Listing</h2>
                <Close onClick={hide} className="close"/>
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
                    {TeamOneLocked? "Unlock" : "Lock"} Bets For {gameTeam1Name}
                </button>
                <button onClick={()=>{lockBets("team2")}}>
                    {TeamTwoLocked? "Unlock" : "Lock"} Bets For {gameTeam2Name}
                </button>
            </div>
            <div className="editgame__payout">
                <button onClick={()=>{payOut(gameTeam1Name)}} disabled={payedOut}>
                    {loadingPayoutOne ? (
                        <Loader/>
                    ):(
                        `Payout ${gameTeam1Name} @ ${gameTeam1odd}`  
                    )} 
                </button>
                <button onClick={()=>{payOut(gameTeam2Name)}} disabled={payedOut}>
                    {loadingPayoutTwo ? (
                        <Loader/>
                    ):(
                        `Payout ${gameTeam2Name} @ ${gameTeam2odd}` 
                    )} 
                </button>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default EditGame
