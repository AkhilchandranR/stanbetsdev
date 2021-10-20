import React from 'react';
import './Message.css';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { openStats } from '../../States/slices/userSlice';

function Message({alternate}) {
    const dispatch = useDispatch();
    return (
        <div className={`message ${alternate && "message__alternate"}`} 
        onClick={()=>{dispatch(openStats())}}
        >
            <div className="message__admin">
                <StarIcon/>
                <p>MOD</p>
            </div>
            <div className="message__user">
                <p>User:</p>
                <p>Example message</p>
            </div>
        </div>
    )
}

export default Message
