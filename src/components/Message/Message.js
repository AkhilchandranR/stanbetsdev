import React from 'react';
import './Message.css';
import StarIcon from '@mui/icons-material/Star';

function Message({alternate}) {
    return (
        <div className={`message ${alternate && "message__alternate"}`}>
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
