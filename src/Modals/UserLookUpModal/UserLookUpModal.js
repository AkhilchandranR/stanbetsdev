import React from 'react';
import './UserLookUpModal.css';
import ReactDom from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

function UserLookUpModal({open,hide,currentUser}) {

    if(!open) return null;

    return ReactDom.createPortal(
        <>
        <div className="overlay"></div>
        <div className="userlookupmodal">
        <div className="userlookupmodal__header">
                <h2>{currentUser?.username}'s Stats/info</h2>
                <CloseIcon onClick={hide}/>
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
                {currentUser?.isMuted ? (
                <button className="usermute">Unmute</button>
                ):(
                <button className="usermute">Mute</button>
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
