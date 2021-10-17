import React from 'react';
import Message from '../Message/Message';
import './ChatWindow.css';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import CloseIcon from '@mui/icons-material/Close';

function ChatWindow() {
    return (
        <div className="chatwindow">
            <div className="chatwindow__close">
                <CloseIcon/>
            </div>
            <div className="chatwindow__messages">
                <Message alternate={true}/>
                <Message alternate={false}/>
                <Message alternate={true}/>
                <Message alternate={false}/>
            </div>
            {/* <div className="chatwindow__login">
                <h2>Login to chat...</h2>
                <div className="chatwindow__loginButtons">
                    <button className="loginbtn">Login</button>
                    <button className="signupbtn">Sign-Up</button>
                </div>
            </div> */}
                <div className="chatwindow__messaging">
                    <form className="chatwindow__inpuField">
                        <input type="text" placeholder="Type message here..."/>
                        <ChatBubbleRoundedIcon/>
                        <button type="submit"/>
                    </form>
                </div>
        </div>
    )
}

export default ChatWindow
