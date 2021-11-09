import React,{ useEffect } from 'react';
import './Message.css';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { openStats,setChatUser } from '../../States/slices/userSlice';

function Message({alternate,id,username,usermessage,isAdmin}) {
    const dispatch = useDispatch();

    //opens the userstats view and sets the id for pulling the 
    //data of user stats using setchatuser....
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(setChatUser({
            chatUserId: id
        }))
        dispatch(openStats())
    }
    
    return (
        <div className={`message ${alternate && "message__alternate"}`} 
        onClick={handleClick}>
            {isAdmin && 
            <div className="message__admin">
                <StarIcon/>
                <p>MOD</p>
            </div>
            }
            <div className="message__user">
                <p>{username}: </p>
                <p className="ms_body">{usermessage}</p>
            </div>
        </div>
    )
}

export default Message
