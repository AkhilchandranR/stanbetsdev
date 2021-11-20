import React,{ useState } from 'react';
import './Message.css';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { openStats,setChatUser } from '../../States/slices/userSlice';
import KeyboardIcon from '@mui/icons-material/Keyboard';

function Message({alternate,username,usermessage,userId,isAdmin}) {
    const dispatch = useDispatch();

    //opens the userstats view and sets the id for pulling the 
    //data of user stats using setchatuser....
    const handleClick = (e)=>{
        e.preventDefault();
        if(userId === null){
            window.alert("This user does not exist anymore");
            return;
        }
        else if(userId == 1){
            window.alert("This is a system generated message");
            return;
        }


        dispatch(setChatUser({
            chatUserId: userId
        }));
        dispatch(openStats());
    }
    
    return (
        <>
        <div className={`message ${alternate && "message__alternate"}`}
        onClick={handleClick}>
            <span className="message__admin">
                    { isAdmin && 
                    <>
                        <StarIcon/> MOD
                    </>
                    }
                    <span>
                        {(userId == 1) && <KeyboardIcon/>}
                        {username}: 
                        <span className="message__message">{usermessage}</span></span>
            </span>
        </div>
        </>
    )
}

export default Message
