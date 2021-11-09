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
        try{
            const userData = await db.collection('users').get()
            const userCollection = userData?.docs?.map((doc)=>(
                doc?.data()
            ))
            setCurrentUser(userCollection.filter((user)=>(
                user.userId === userid
            )))

            if(currentUser){
                const userRef = db.collection('users');
                const snapshot = await userRef.get();
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
        catch{

        }
    }
    
    //mute a user
    const muteUser = async(e) =>{
        await db.collection('users').doc(docId).update({
            isMuted: true
        }).then((response)=>response)
        .catch((e)=>window.alert(e.message))
    }

    //unmute a user can be done in same function in mute but stays like this for now
    const unMuteUser = async(e) =>{
        await db.collection('users').doc(docId).update({
            isMuted: false
        }).then((response)=>response)
        .catch((e)=>window.alert(e.message))
    }

    //delete a user details, can only be performed from server side
    // const deleteUser = async(e) =>{
    //     e.preventDefault();
    //     // await db.collection('users').doc(docId).delete()
    // }
    

    useEffect(() => {
       const getChatUser = async() =>{
           try{
            const chats = await db.collection('chats').get()
            const chatsCollection = chats?.docs?.map((doc)=>(
                doc?.data()
            ))
            setCurrentChatId(chatsCollection?.filter((chat)=>(
                chat.id == chatUser
            )))
            if(currentChatId){
                setCurrentUserId(currentChatId[0]?.userId)
                await setUser(currentUserId)
            }
           }
           catch{

           }           
       }
       getChatUser();
    },[show])

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
                            <p>{currentUser[0]?.country}</p>
                        </div>
                        <p>Balance:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser[0]?.totalBalance}</p>
                        </div>
                        <p>Total Deposited:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser[0]?.totalDeposited}</p>
                        </div>
                        <p>Total Withdrawn:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser[0]?.totalWithdrawn}</p>
                        </div>
                        <p>Last Online:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser[0]?.lastOnline}</p>
                        </div>
                        <p>Account Created:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser[0]?.accountCreated}</p>
                        </div>
                    </div>
                    <div className="userstatsmodal__buttons">
                        {currentUser[0]?.isMuted ? (
                        <button className="usermute" onClick={unMuteUser}>Unmute</button>
                        ):(
                        <button className="usermute" onClick={muteUser}>Mute</button>
                        )
                        }
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
                            <p>$1{currentUser[0]?.totalBalance}</p>
                        </div>
                        <p>Total Wagered:</p>
                        <div className="userstatsmodal__data">
                            <p>$105.00</p>
                        </div>
                        <p>Last Online:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser[0]?.lastOnline}</p>
                        </div>
                        <p>Account Created:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser[0]?.accountCreated}</p>
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
