import React,{ useState,useEffect } from 'react';
import './UserStatsModal.css';
import CloseIcon from '@mui/icons-material/Close';
import ReactDom from 'react-dom';
import { useSelector,useDispatch } from 'react-redux';
import { db } from '../../firebase';
import Loader from '../../components/Laoder/Loader';
import { closeStats } from '../../States/slices/userSlice';

function UserStatsModal({isAnAdmin,isMuted}) {
    const[currentUser,setCurrentUser] = useState([]);
    const chatUser = useSelector((state)=>state.user.chatUserId);
    const showStatsModal = useSelector((state)=>state.user.openStatsModal);
    const[userMuted,setUserMuted] = useState(isMuted);
    const dispatch = useDispatch();


    useEffect(() => {
        const getChatUser = async() =>{
            console.log(chatUser)
            try{
             const user = await db.collection('users').get()
             const userCollection = user?.docs?.map((doc)=>(
                 doc?.data()
             ))
             setCurrentUser(userCollection?.filter((u)=>(
                 u.userId == chatUser
             )))
            }
            catch{
 
            }           
        }
        getChatUser();
     },[chatUser,showStatsModal])


    
    //mute a user
    const muteUser = async(e) =>{
        try{
            await db.collection('users').doc(chatUser).update({
                isMuted: true
            })
            .catch((e)=>window.alert(e.message))
            setUserMuted(true);
        }
        catch{
            window.alert("failed to mute.Please try again")
        }
        
    }

    //unmute a user can be done in same function in mute but stays like this for now
    const unMuteUser = async(e) =>{
        try{
            await db.collection('users').doc(chatUser).update({
                isMuted: false
            })
            .catch((e)=>window.alert(e.message))
            setUserMuted(false);
        }
        catch{
            window.alert("failed to unmute.Please try again")
        }
        
    }

    const hide =(e)=>{
        e.preventDefault();
        dispatch(closeStats())
    }

    //delete a user details, can only be performed from server side
    // const deleteUser = async(e) =>{
    //     e.preventDefault();
    //     // await db.collection('users').doc(docId).delete()
    // }
    

    if(!showStatsModal) return null;

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
                        {userMuted ? (
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
                            <p>${currentUser[0]?.totalWagered}</p>
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
