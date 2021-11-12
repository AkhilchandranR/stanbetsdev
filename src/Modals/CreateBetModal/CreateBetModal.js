import Close from '@mui/icons-material/Close';
import React,{ useState,useEffect,useRef } from 'react';
import './CreateBetModal.css';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import { useAuth } from "../../AuthContext";
import ReactDom from 'react-dom';
import { v4 as uuidv4} from 'uuid';
import LockIcon from '@mui/icons-material/Lock';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import firebase from 'firebase';

function CreateBetModal({ show,hide,userBalance,username }) {
    const { currentUser } = useAuth();
    const [betAmount,setBetAmount] = useState(0);
    const gameToBetId = useSelector((state)=>state.user.betGameId);
    const [gameToBet,setGameToBet] = useState();
    const [moneyForTeam1,setMoneyForTeam1] = useState(0);
    const [moneyForTeam2,setMoneyForTeam2] = useState(0);

    //pulls out the required game
    useEffect(() => {
        const getGame = async() =>{
            try{
                const games = await db.collection('games').get()
                const gamesCollection = await games?.docs?.map((doc)=>(
                    doc?.data()
                ))
                setGameToBet(gamesCollection?.filter((game)=>(
                    game.id == gameToBetId
                )))           
            }
            catch{
                window.alert("failed to load games.Please try again later.")
            }
        }
        getGame()
    },[gameToBetId])



   //updates the win= section
    useEffect(() => {
        const update = async() =>{
            try{
                const team = await gameToBet[0];
                if(team){
                    setMoneyForTeam1((team.team1?.odds * betAmount).toFixed(2));
                    setMoneyForTeam2((team.team2?.odds * betAmount).toFixed(2));
                }
            }
            catch{
                console.log("error");
            }
        }
        update();
    }, [betAmount])

    //place a bet
    const placeBet = async(team) =>{
        if(betAmount <= 0){
            window.alert("Please enter a valid amount");
            return;
        }
        else if((userBalance - betAmount) < 0){
            window.alert("Insufficient Balance");
            return;
        }
        try{
            const betDocumentId = uuidv4();
            await db.collection('bets').doc(betDocumentId).set({
                id:betDocumentId,
                user: currentUser.uid,
                userName: username,
                date: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
                game: gameToBet[0]?.id,
                gamename: gameToBet[0]?.gameName,
                gameTime: gameToBet[0]?.time,
                gameDate: gameToBet[0]?.date,
                team: team?.name,
                team1: gameToBet[0].team1.name,
                team2: gameToBet[0].team2.name,
                odd: team?.odds,
                winAmount: betAmount,
                isWon: false,
                isOver: false,
                OverDate: "",
                AmountIfWon: betAmount * team?.odds,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                profit: (betAmount * team?.odds)-betAmount,
                
            })
            await db.collection('users').doc(currentUser.uid).update({
                totalBalance: firebase.firestore.FieldValue.increment(-(betAmount)),
                totalWagered: firebase.firestore.FieldValue.increment(betAmount),
            })
            window.alert("your bet is placed")
        }
        catch{
            window.alert("failed to create bet. Please try again")
        }
        hide();
        setBetAmount(0);
    }

    
    if (!show) return null;
    return ReactDom.createPortal(
        <>
        <div className="overlay"/>
        <div className="createbet">
            <div className="createbet__header">
                <h2>Bet on {gameToBet[0]?.team1?.name} vs {gameToBet[0]?.team2?.name}</h2>
                <Close onClick={hide}/>
            </div>
            <p>Bet Amount:</p>
            <div className="createbet__amount">
                <input type="number" value={betAmount} onChange={(e)=>setBetAmount(e.target.value)}/>
            </div>

            <div className="createbet__progressBar">
                <ProgressBar completed={gameToBet[0]?.team1?.fairOdds}
                isLabelVisible={false}
                bgColor="#3d96e8"
                baseBgColor="#f27272"
                borderRadius="0px"/>
                <div className="createbet__oddspercent">
                    <p>{gameToBet[0]?.team1?.fairOdds}% | {gameToBet[0]?.team2?.fairOdds}%</p>
                </div>
            </div>

            <div className="createbet__buttons">
                <button className="blue" disabled={gameToBet[0]?.team1?.locked} onClick={()=>{placeBet(gameToBet[0]?.team1)}}>
                {gameToBet[0]?.team1?.locked &&
                    <div>
                        <LockIcon/>
                    </div>
                    }
                    <div>
                    <p>
                        {gameToBet[0]?.team1?.name} @ {gameToBet[0]?.team1?.odds}
                    </p>
                    <p>Win = ${moneyForTeam1}</p>
                    </div>
                </button>
                <button className="red" disabled={gameToBet[0]?.team2?.locked} onClick={()=>{placeBet(gameToBet[0]?.team2)}}>
                    {gameToBet[0]?.team2?.locked &&
                    <div>
                        <LockIcon/>
                    </div>
                    }
                    <div>
                    <p>
                        
                        {gameToBet[0]?.team2?.name} @ {gameToBet[0]?.team2?.odds}
                    </p>
                    <p>Win = ${moneyForTeam2}</p>
                    </div>
                </button>
            </div>
           {gameToBet[0]?.link &&
            <div className="createbet__matchlink">
                <p>
                Watch the game live on Twitch(19:00 UTC 18/10/21)
                <OpenInNewIcon onClick={()=>{window.open(gameToBet[0]?.link,'_blank')}}/>
                </p>
            </div>
            }
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default CreateBetModal
