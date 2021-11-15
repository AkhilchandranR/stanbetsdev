import React,{ useState } from 'react';
import './UserLookUpModal.css';
import ReactDom from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../firebase';

function UserLookUpModal({open,hide,currentUser}) {
    const[userMuted,setUserMuted] = useState(currentUser?.isMuted);

    //mute a user....
    const muteUser = async(e) =>{
        e.preventDefault();
        try{
            await db.collection('users').doc(currentUser?.userId).update({
                isMuted: true
            })
            .catch((e)=>window.alert(e.message))
            setUserMuted(true);
        }
        catch{
            window.alert("failed to mute.Please try again")
        }
        
    }

    //unmute a user can be done in same function in mute but stays like this for now...
    const unMuteUser = async(e) =>{
        e.preventDefault();
        try{
            await db.collection('users').doc(currentUser?.userId).update({
                isMuted: false
            })
            .catch((e)=>window.alert(e.message))
            setUserMuted(false);
        }
        catch{
            window.alert("failed to unmute.Please try again")
        }
        
    }

    if(!open) return null;

    return ReactDom.createPortal(
        <>
        <div className="overlay"></div>
        <div className="userlookupmodal">
        <div className="userlookupmodal__header">
                <h2>{currentUser?.username}'s Stats/info</h2>
                <CloseIcon onClick={hide} className="close"/>
            </div>
            <div className="userlookupmodal__body">
                <p>Email:</p>
                <div className="userlookupmodal__data">
                    <p>{currentUser?.emailId}</p>
                </div>
                <p>Country:</p>
                <div className="userlookupmodal__data">
                    <p>{currentUser?.country}</p>
                </div>
                <p>Balance:</p>
                <div className="userlookupmodal__data">
                    <p>${currentUser?.totalBalance}</p>
                </div>
                <p>Total Deposited:</p>
                <div className="userlookupmodal__data">
                    <p>${currentUser?.totalDeposited}</p>
                </div>
                <p>Total Withdrawn:</p>
                <div className="userlookupmodal__data">
                    <p>${currentUser?.totalWithdrawn}</p>
                </div>
                <p>Last Online:</p>
                <div className="userlookupmodal__data">
                    <p>{currentUser?.lastOnline}</p>
                </div>
                <p>Account Created:</p>
                <div className="userlookupmodal__data">
                    <p>{currentUser?.accountCreated}</p>
                </div>
            </div>
            <div className="userlookupmodal__buttons">
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

export default UserLookUpModal
