import React,{ useState,useEffect } from 'react';
import Message from '../Message/Message';
import './ChatWindow.css';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { closeWindow } from '../../States/slices/chatSlice';
import { Link } from 'react-router-dom';
import { useAuth } from "../../AuthContext";
import { db } from '../../firebase';
import firebase from 'firebase';

function ChatWindow({logUser}) {
    const alternatingColor = [true,false];
    const[input,setInput] = useState('');
    const[messages,setMessages] = useState([]);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
       const getMessages = async() =>{
            const messagesObject = await db.collection('chats').get()
            const messagesArray = messagesObject?.docs?.map((doc)=>(
                doc?.data()
            ))
            const arrangedMessages = messagesArray.sort((a,b)=>(
                b.timestamp - a.timestamp
            ))
            setMessages(arrangedMessages);
       }
       getMessages();
    }, [messages])
    const closeChat = () =>{
        //closes the chat window and adjust the body
        dispatch(closeWindow());
    }
   const sendMessage = (e) =>{
        e.preventDefault();
        if(input){
            db.collection('chats').add({
                userId:logUser.userId,
                userName: logUser.username,
                isAdmin: logUser.isAdmin,
                message: input,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setInput('');
   }
    
    return (
        <div className="chatwindow">
            <div className="chatwindow__close">
                <CloseIcon 
                onClick={closeChat}
                />
            </div>
            <div className="chatwindow__messages">
                {messages.map((message,index)=>(
                    <Message 
                    username={message?.userName}
                    userId={message?.userId}
                    isAdmin ={message?.isAdmin}
                    usermessage={message?.message}
                    alternate={alternatingColor[index % alternatingColor.length]}
                    />
                ))}
            </div>
           {currentUser ? (
               <div className="chatwindow__messaging">
               <form className="chatwindow__inpuField">
                   <input type="text" placeholder="Type message here..."
                   value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                       <button type="submit" onClick={sendMessage}>
                            <ChatBubbleRoundedIcon/>
                       </button>
               </form>
           </div>
           ):(
            <div className="chatwindow__login">
                <h2>Login to chat...</h2>
                <div className="chatwindow__loginButtons">
                    <Link to="/login">
                        <button className="loginbtn">Login</button>
                    </Link>
                    <Link to="signup">
                        <button className="signupbtn">Sign-Up</button>
                    </Link>
                </div>
            </div>
           )
            }
        </div>
    )
}

export default ChatWindow
