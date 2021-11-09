import React from 'react';
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
        }));
        dispatch(openStats());
    }
    
    return (
        <div className={`message ${alternate && "message__alternate"}`}
        onClick={handleClick}>
            <span className="message__admin">
                    { isAdmin && 
                    <>
                        <StarIcon/> MOD
                    </>
                    }
                    <span>{username}: <span className="message__message">{usermessage}</span></span>
            </span>
        </div>
    )
}

export default Message
