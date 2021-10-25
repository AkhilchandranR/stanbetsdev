import React from 'react';
import './Message.css';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { openStats } from '../../States/slices/userSlice';

function Message({alternate,username,userId,usermessage,isAdmin}) {
    const dispatch = useDispatch();
    return (
        <div className={`message ${alternate && "message__alternate"}`} 
        onClick={()=>{dispatch(openStats())}}
        >
            {isAdmin && 
            <div className="message__admin">
                <StarIcon/>
                <p>MOD</p>
            </div>
            }
            <div className="message__user">
                <p>{username}: {usermessage}</p>
            </div>
        </div>
    )
}

export default Message
