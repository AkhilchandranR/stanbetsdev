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
import { v4 as uuidv4} from 'uuid';

function ChatWindow({logUser}) {
    const alternatingColor = [true,false];
    const[input,setInput] = useState('');
    const[messages,setMessages] = useState([]);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();

    //delete older messages....
    useEffect(() => {
        const deleteOlderMeassages = async() =>{
            try{
                const today = new Date();
                const weekBefore = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-7);
                const weekBeforeToMilliseconds = new Date(weekBefore).getTime();

                //delete messages which are 1 week older....
                const messagesObject = await db.collection('chats').get()
                const messagesArray = messagesObject?.docs?.map((doc)=>(
                    doc?.data()
                ))
                const messagesToBeDeleted = messagesArray.filter((m)=>(
                    (m.timestamp).toDate().getTime() < weekBeforeToMilliseconds
                ))
                await messagesToBeDeleted.forEach((message)=>{
                    db.collection('chats').doc(message.id).delete()
                })
            }
            catch{

            }
        }
        deleteOlderMeassages();
    }, [])



    //pulls the new messages from the database when db changes 
    useEffect(() => {
       const getMessages = async() =>{
           
           //function pulls the messages and sorts it according to timestamp
           //in the descending order to display and sets the state 
           try{
            const messagesObject = await db.collection('chats').get()
            const messagesArray = messagesObject?.docs?.map((doc)=>(
                doc?.data()
            ))
            const arrangedMessages = messagesArray.sort((a,b)=>(
                b.timestamp - a.timestamp
            ))
            await setMessages(arrangedMessages.slice(0,50));

           }
           catch{
               window.alert("failed to load messages");
           }
       }
       getMessages();
    }, [input])

    //closes the chat window but has to be changed to dom manipulation methods 
    //according to the design
    const closeChat = () =>{
        //closes the chat window and adjust the body
        dispatch(closeWindow());
    }

   //adds message to the database
   //timestamp is used for sorting and later deletion of expired message
   const sendMessage = async(e) =>{
        e.preventDefault();
        if(input){
            const chatDocumentId = uuidv4();
            await db.collection('chats').doc(chatDocumentId).set({
                id: chatDocumentId,
                userId:logUser.userId,
                userName: logUser.username,
                isAdmin: logUser.isAdmin,
                message: input,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            }).catch((err)=>alert(err.message))
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
                    key={message?.id}
                    id={message?.id}
                    username={message?.userName}
                    userId={message?.userId}
                    isAdmin ={message?.isAdmin}
                    usermessage={message?.message}
                    alternate={alternatingColor[index % alternatingColor.length]}
                    isAnAdmin={logUser?.isAdmin}
                    isMuted={logUser?.isMuted}
                    />
                ))}
            </div>
           {currentUser ? (
               <div className="chatwindow__messaging">
            {logUser?.isMuted ? (
                <div className="chatwindow__muted">
                    <h3>You are muted!!</h3>
                </div>
            ):(
                <form className="chatwindow__inpuField">
                   <input type="text" placeholder="Type message here..."
                   value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                       <button type="submit" onClick={sendMessage}>
                            <ChatBubbleRoundedIcon/>
                       </button>
                </form>
            )}
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
