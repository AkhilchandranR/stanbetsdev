import React from 'react';
import './GameDetails.css';
import { useDispatch } from 'react-redux';
import { useAuth } from "../../AuthContext";
import { openBet,setBetGameId } from '../../States/slices/userSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import {db} from '../../firebase';
 
function GameDetails({ id,name,date,time,team1,team2,isAdmin }) {
    const { currentUser } = useAuth();
    const dispatch = useDispatch();

    const handleClick = (e) =>{
        e.preventDefault();

        //only works if the user is logged in otherwise dont...
        if(!currentUser){
            window.alert("You are not logged in");
            return;
        }

        //dispatch set games bet for setting up id in createbetmodal
        // otherwise ie,if user is present,them open the createbetmodal
        dispatch(setBetGameId({
            betGameId: id
        }))
        dispatch(openBet());
        
    }

    const deleteGame = async(e) =>{
        e.preventDefault();
        const confirm = window.confirm("This action cannot be undone.");
        if(confirm){
            try{
                await db.collection('games').doc(id).delete()
                window.location.reload();
            }
            catch{
                window.alert("failed to delete.Please try again")
            }
        }
    }

    return (
        <div className="gamedetails">
            <div className="gamedetails__heading">
                <h5>{name}</h5>
                <p>{date}</p>
                <p className="gamedetails__time">{time}UTC
                    {isAdmin && <DeleteIcon onClick={deleteGame}/>}
                </p>
            </div>
            <div className="gamedetails__body" onClick={handleClick}>
                <h3>{team1?.name} vs {team2?.name}</h3>
                <div className="gamedetails__bets">
                    <div className="gamedetails__bet">
                        <p>{team1?.odds}</p>
                    </div>
                    <div className="gamedetails__bet">
                        <p>{team2?.odds}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetails
