import React,{ useEffect,useState } from 'react';
import './MyBetsModal.css';
import Close from '@mui/icons-material/Close';
import MyBetComponent from './MyBetComponent';
import ReactDOM from 'react-dom';
import { db } from '../../firebase';
import { useAuth } from "../../AuthContext";

function MyBetsModal({show,hide}) {
    const { currentUser } = useAuth();
    const [userBets,setUserBets] = useState();

    useEffect(() => {
       const getMyBets = async() =>{
           try{
            const betData = await db.collection('bets').get()
            const betCollection = betData?.docs?.map((doc)=>(
                 doc?.data()
            ))
            setUserBets(betCollection.filter((bet)=>(
                 bet.user === currentUser.uid
            )))
           }
           catch{
                console.log("error")
           }
       }
       getMyBets();
    })

    if(!show) return null

    return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="mybets">
            <div className="mybets__header">
                <h2>My Bets</h2>
                <Close onClick={hide}/>
            </div>
            <div className="mybets__body">
                {userBets?.map((bets)=>(
                    <MyBetComponent key={bets?.id}
                    name={bets?.gamename}
                    team={bets?.team}
                    odd={bets?.odd}
                    time={bets?.gameTime}
                    date={bets?.gameDate}
                    amount={bets?.winAmount}
                    />
                ))}
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default MyBetsModal
