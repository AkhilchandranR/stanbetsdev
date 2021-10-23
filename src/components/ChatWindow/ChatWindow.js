import React from 'react';
import Message from '../Message/Message';
import './ChatWindow.css';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { closeWindow } from '../../States/slices/chatSlice';
import { Link } from 'react-router-dom';

function ChatWindow() {
    const dispatch = useDispatch();
    const closeChat = () =>{
        //closes the chat window and adjust the body
        dispatch(closeWindow());
    }
    const adjustWindow = () =>{
        document.body.style.marginLeft = "0px";
    }
    return (
        <div className="chatwindow">
            <div className="chatwindow__close">
                <CloseIcon 
                onClick={closeChat}
                />
            </div>
            <div className="chatwindow__messages">
                <Message alternate={true}/>
                <Message alternate={false}/>
                <Message alternate={true}/>
                <Message alternate={false}/>
            </div>
            <div className="chatwindow__login">
                <h2>Login to chat...</h2>
                <div className="chatwindow__loginButtons">
                    <Link to="/login">
                        <button className="loginbtn" onClick={adjustWindow}>Login</button>
                    </Link>
                    <Link to="signup">
                        <button className="signupbtn" onClick={adjustWindow}>Sign-Up</button>
                    </Link>
                </div>
            </div>
                {/* <div className="chatwindow__messaging">
                    <form className="chatwindow__inpuField">
                        <input type="text" placeholder="Type message here..."/>
                        <ChatBubbleRoundedIcon/>
                        <button type="submit"/>
                    </form>
                </div> */}
        </div>
    )
}

export default ChatWindow
