import React,{ useState,useEffect } from 'react';
import './UserStatsModal.css';
import CloseIcon from '@mui/icons-material/Close';
import ReactDom from 'react-dom';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';

function UserStatsModal({show,hide,isAnAdmin}) {
    const[docId,setDocId] = useState("");
    const[currentChatId,setCurrentChatId] = useState([]);
    const[currentUserId,setCurrentUserId] = useState('');
    const[currentUser,setCurrentUser] = useState([]);
    const chatUser = useSelector((state)=>state.user.chatUserId);

    //sets the current user and document id
    const setUser = async(userid) =>{
        const userData = await db.collection('users').get()
        const userCollection = userData?.docs?.map((doc)=>(
             doc?.data()
        ))
        setCurrentUser(userCollection.filter((user)=>(
             user.userId === userid
        )))

        if(currentUser){
            const citiesRef = db.collection('users');
            const snapshot = await citiesRef.get();
            if (snapshot.empty) {
            return;
            }  
            
            snapshot.forEach(doc => {
            if (doc.data().userId == currentUser[0]?.userId){
                setDocId(doc.id)
            }
            })
        }
    }
    
    //mute a user
    const muteUser = async(e) =>{
        await db.collection('users').doc(docId).update({
            isMuted: true
        }).then((response)=>console.log(response))
        .catch((e)=>console.log(e.message))
    }

    //delete a user details
    

    useEffect(() => {
       const getChatUser = async() =>{
            const chats = await db.collection('chats').get()
            const chatsCollection = chats?.docs?.map((doc)=>(
                doc?.data()
            ))
            setCurrentChatId(chatsCollection?.filter((chat)=>(
                chat.id == chatUser
            )))
            setCurrentUserId(currentChatId[0]?.userId)
            await setUser(currentUserId)
       }
       getChatUser()
    },[currentChatId])

    if(!show) return null;

    else{
        if(isAnAdmin){
            return ReactDom.createPortal(
                <>
                <div className="overlay"></div>
                <div className="userstatsmodal">
                    <div className="userstatsmodal__header">
                        <h2>{currentUser[0]?.username}'s Stats/info</h2>
                        <CloseIcon onClick={hide}/>
                    </div>
                    <div className="userstatsmodal__body">
                        <p>Email:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser[0]?.emailId}</p>
                        </div>
                        <p>Country:</p>
                        <div className="userstatsmodal__data">
                            <p>America</p>
                        </div>
                        <p>Balance:</p>
                        <div className="userstatsmodal__data">
                            <p>$105.00</p>
                        </div>
                        <p>Total Deposited:</p>
                        <div className="userstatsmodal__data">
                            <p>$105.20</p>
                        </div>
                        <p>Total Withdrawn:</p>
                        <div className="userstatsmodal__data">
                            <p>$10.40</p>
                        </div>
                        <p>Last Online:</p>
                        <div className="userstatsmodal__data">
                            <p>16/06/21</p>
                        </div>
                        <p>Account Created:</p>
                        <div className="userstatsmodal__data">
                            <p>16/04/21</p>
                        </div>
                    </div>
                    <div className="userstatsmodal__buttons">
                        <button className="usermute" onClick={muteUser}>Mute</button>
                        <button className="userdelete">Delete</button>
                    </div>
                </div>
                </>,
                document.getElementById('portal')
            )
        }
        else{
            return ReactDom.createPortal(
                <>
                <div className="overlay"></div>
                <div className="userstatsmodal">
                    <div className="userstatsmodal__header">
                        <h2>{currentUser[0]?.username}'s Stats</h2>
                        <CloseIcon onClick={hide}/>
                    </div>
                    <div className="userstatsmodal__body">
                        <p>Balance:</p>
                        <div className="userstatsmodal__data">
                            <p>$105.00</p>
                        </div>
                        <p>Total Wagered:</p>
                        <div className="userstatsmodal__data">
                            <p>$105.00</p>
                        </div>
                        <p>Last Online:</p>
                        <div className="userstatsmodal__data">
                            <p>16/06/21</p>
                        </div>
                        <p>Account Created:</p>
                        <div className="userstatsmodal__data">
                            <p>16/04/21</p>
                        </div>
                    </div>
                </div>
                </>,
                document.getElementById('portal')
            )
        }
    }
    
}

export default UserStatsModal
