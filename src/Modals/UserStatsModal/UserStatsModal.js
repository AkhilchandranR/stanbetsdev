import React,{ useState,useEffect } from 'react';
import './UserStatsModal.css';
import CloseIcon from '@mui/icons-material/Close';
import ReactDom from 'react-dom';
import { useSelector,useDispatch } from 'react-redux';
import { db } from '../../firebase';
import { closeStats } from '../../States/slices/userSlice';
import firebase from 'firebase';
import { v4 as uuidv4} from 'uuid';

function UserStatsModal({isAnAdmin}) {
    const[currentUser,setCurrentUser] = useState([]);
    const chatUser = useSelector((state)=>state.user.chatUserId);
    const showStatsModal = useSelector((state)=>state.user.openStatsModal);
    const dispatch = useDispatch();


    useEffect(() => {
        const getChatUser = async() =>{
            try{
                await db.collection("users").doc(chatUser)
                .onSnapshot((doc) => {
                    setCurrentUser(doc.data())
                });

            }
            catch{
 
            }           
        }
        getChatUser();
     },[chatUser,showStatsModal])


    
    //mute a user
    const muteUser = async(e) =>{
        const ReasonToMute = window.prompt("Why do you want to Mute this user ?");
        if(ReasonToMute === null) return;
        else if(ReasonToMute === ''){
            window.alert("Please provide a reason to mute this user");
            return;
        }
            try{
                const docId = uuidv4();
                await db.collection('users').doc(chatUser).update({
                    isMuted: true,
                    MutedReason: ReasonToMute
                })
                await db.collection('chats').doc(docId).set({
                    id: docId,
                    userId: 1,
                    userName: "System",
                    isAdmin: false,
                    message: `${currentUser.username} is muted for reason ${ReasonToMute}`,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
            catch{
                window.alert("failed to mute.Please try again")
            }
    }

    //unmute a user can be done in same function in mute but stays like this for now
    const unMuteUser = async(e) =>{
        const confirm = window.confirm("Do you want to unmute this user ?");
        if(confirm){
            try{
                await db.collection('users').doc(chatUser).update({
                    isMuted: false,
                    MutedReason: ''
                })
                .catch((e)=>window.alert(e.message))
            }
            catch{
                window.alert("failed to unmute.Please try again")
            }
        }
        else{
            return;
        }       
    }

    const hide =(e)=>{
        e.preventDefault();
        dispatch(closeStats())
    }

    // ban a user by the admin....
    const banUser = async(e) =>{
        e.preventDefault();
        const ReasonToBan = window.prompt("Why do you want to ban this user ?");
        if(ReasonToBan === null) return;
        else if(ReasonToBan === ''){
            window.alert("Please give a reason to ban the user");
            return;
        }

        try{
            const docId = uuidv4();
            await db.collection('users').doc(chatUser).update({
                isBanned: true,
                BanReason: ReasonToBan
            })
            await db.collection('chats').doc(docId).set({
                id: docId,
                userId: 1,
                userName: "System",
                isAdmin: false,
                message: `${currentUser.username} is banned for reason ${ReasonToBan}`,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        catch{
            window.alert("failed to ban")
        }
        
    }

     // Unban a user by the admin....
     //can be changed to same fuction as mute but stays like this for now....
     const unBanUser = async(e) =>{
        e.preventDefault();
        const confirm = window.confirm("Unban this user ?");
        if(!confirm) return;

        await db.collection('users').doc(chatUser).update({
            isBanned: false,
            BanReason: ''
        }).catch((e)=>window.alert(e.message))
        
    }
    

    if(!showStatsModal) return null;

    else{
        if(isAnAdmin){
            return ReactDom.createPortal(
                <>
                <div className="overlay__chats"></div>
                <div className="userstatsmodal">
                        <div className="userstatsmodal__header">
                        <h2>{currentUser?.username}'s Stats/info</h2>
                        <CloseIcon onClick={hide} className="close"/>
                    </div>
                    <div className="userstatsmodal__body">
                        <p>Email:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser?.emailId}</p>
                        </div>
                        <p>Country:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser?.country}</p>
                        </div>
                        <p>Balance:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser?.totalBalance}</p>
                        </div>
                        <p>Total Deposited:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser?.totalDeposited}</p>
                        </div>
                        <p>Total Withdrawn:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser?.totalWithdrawn}</p>
                        </div>
                        <p>Last Online:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser?.lastOnline}</p>
                        </div>
                        <p>Account Created:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser?.accountCreated}</p>
                        </div>
                    </div>
                    <div className="userstatsmodal__buttons">
                        {currentUser.isMuted ? (
                        <button className="usermute" onClick={unMuteUser}>Unmute</button>
                        ):(
                        <button className="usermute" onClick={muteUser}>Mute</button>
                        )
                        }
                        {currentUser.isBanned ? (
                            <button className="userdelete" onClick={unBanUser}>Unban</button>
                        ):(
                            <button className="userdelete" onClick={banUser}>Ban</button>
                        )}
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
                        <h2>{currentUser?.username}'s Stats</h2>
                        <CloseIcon onClick={hide} className="close"/>
                    </div>
                    <div className="userstatsmodal__body">
                        <p>Balance:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser?.totalBalance}</p>
                        </div>
                        <p>Total Wagered:</p>
                        <div className="userstatsmodal__data">
                            <p>${currentUser?.totalWagered}</p>
                        </div>
                        <p>Last Online:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser?.lastOnline}</p>
                        </div>
                        <p>Account Created:</p>
                        <div className="userstatsmodal__data">
                            <p>{currentUser?.accountCreated}</p>
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
