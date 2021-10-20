import React from 'react';
import './UserStatsModal.css';
import CloseIcon from '@mui/icons-material/Close';
import ReactDom from 'react-dom';

function UserStatsModal({show,hide}) {
    if(!show) return null;

    return ReactDom.createPortal(
        <>
        <div className="overlay"></div>
        <div className="userstatsmodal">
            <div className="userstatsmodal__header">
                <h2>Username's Stats</h2>
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
    // return ReactDom.createPortal(
    //     <>
    //     <div className="overlay"></div>
    //     <div className="userstatsmodal">
    //         <div className="userstatsmodal__header">
    //             <h2>Username's Stats/info</h2>
    //             <CloseIcon onClick={hide}/>
    //         </div>
    //         <div className="userstatsmodal__body">
    //             <p>Email:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>username@gmail.com</p>
    //             </div>
    //             <p>Country:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>America</p>
    //             </div>
    //             <p>Balance:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>$105.00</p>
    //             </div>
    //             <p>Total Deposited:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>$105.20</p>
    //             </div>
    //             <p>Total Withdrawn:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>$10.40</p>
    //             </div>
    //             <p>Last Online:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>16/06/21</p>
    //             </div>
    //             <p>Account Created:</p>
    //             <div className="userstatsmodal__data">
    //                 <p>16/04/21</p>
    //             </div>
    //         </div>
    //         <div className="userstatsmodal__buttons">
    //             <button className="usermute">Mute</button>
    //             <button className="userdelete">Delete</button>
    //         </div>
    //     </div>
    //     </>,
    //     document.getElementById('portal')
    // )
}

export default UserStatsModal
