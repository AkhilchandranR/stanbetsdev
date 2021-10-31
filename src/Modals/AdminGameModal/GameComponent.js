import React,{ useState } from 'react';
import './GameComponent.css';
import edit from '../../images/edit.png';
import EditGame from '../AdminGameModal/EditGame/EditGame';
import { useDispatch } from 'react-redux';
import { setEditGameId } from '../../States/slices/userSlice';

function GameComponent({team1,team2,id,name,date,time,link,payout}) {

    const [openEdit,setOpenEdit] = useState(false);

    const dispatch = useDispatch();
    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(setEditGameId({
            editGameId: id
        }))
        setOpenEdit(true)
    }
    return (
        <div className="gamecomponent">
            <p>{team1?.name}</p>
            <p>vs</p>
            <p>{team2.name}</p>
            <img src={edit} onClick={handleClick}/>
            <div className="gamecomponent__odds">
                <p>{team1.odds} | {team2.odds}</p>
            </div>
            <EditGame open={openEdit} hide={()=>{setOpenEdit(false)}}
            name={name} date={date} time={time} link={link} 
            team1={team1} team2={team2} id={id} isPayOut={payout}/>
        </div>
        
    )
}

export default GameComponent
