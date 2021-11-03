import Close from '@mui/icons-material/Close';
import React,{ useState,useEffect,useRef } from 'react';
import './CreateBetModal.css';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import { useAuth } from "../../AuthContext";
import ReactDom from 'react-dom';
import { v4 as uuidv4} from 'uuid';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function CreateBetModal({ show,hide }) {
    const { currentUser } = useAuth();
    const [betAmount,setBetAmount] = useState(0);
    const gameToBetId = useSelector((state)=>state.user.betGameId);
    const [gameToBet,setGameToBet] = useState();
    const moneyForTeam1 = useRef(0.0);
    const moneyForTeam2 = useRef(0.0);

    //pulls out the required game
    useEffect(() => {
        const subscription = {unsubscribe: () => undefined}
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
                console.log("please wait")
            }
        }
        getGame()
        return () => {
            subscription.unsubscribe()
        }
    },[gameToBetId])



   //updates the win= section
    useEffect(() => {
        const subscription = {unsubscribe: () => undefined}
        const update = async() =>{
            try{
                const team = await gameToBet[0];
                if(team){
                    moneyForTeam1.current = team.team1?.odds * betAmount;
                    moneyForTeam2.current = team.team2?.odds * betAmount;
                }
            }
            catch{
                console.log("error");
            }
        }
        update();
        return () => {
            subscription.unsubscribe()
        }
    }, [betAmount])

    //place a bet
    const placeBet = async(team) =>{
        try{
            await db.collection('bets').add({
                id:uuidv4(),
                user: currentUser.uid,
                game: gameToBet[0]?.id,
                gamename: gameToBet[0]?.gameName,
                gameTime: gameToBet[0]?.time,
                gameDate: gameToBet[0]?.date,
                team: team?.name,
                odd: team?.odds,
                winAmount: betAmount,
                isWon: false,
                isOver: false
            })
            window.alert("your bet is placed")
        }
        catch{
            window.alert("failed to create bet. Please try again")
        }
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
                    <p>Win = ${moneyForTeam1.current}</p>
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
                    <p>Win = ${moneyForTeam2.current}</p>
                    </div>
                </button>
            </div>
           {gameToBet[0]?.link &&
            <div className="createbet__matchlink">
                <p>
                Watch the game live on Twitch(19:00 UTC 18/10/21)
                <Link to={gameToBet[0].link} target="_blank" rel="noreferrer noopener">
                    <OpenInNewIcon/>
                </Link>
                </p>
            </div>
            }
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default CreateBetModal
