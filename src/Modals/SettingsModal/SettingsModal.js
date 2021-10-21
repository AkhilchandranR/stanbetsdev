import React from 'react';
import './SettingsModal.css';
import edit from '../../images/edit.png';
import CloseIcon from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';

function SettingsModal({show,hide}) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <>
        <div className="overlay"></div>
        <div className="settingsmodal">
            <div className="settingsmodal__header">
            <h2>Settings</h2>
            <CloseIcon onClick={hide}/>
            </div>
            <div className="settingsmodal__form">
                <p>Username:</p>
                <div className="settingsmodal__input">
                    <p>username</p>
                    <img src={edit}/>
                </div>
                <p>Email:</p>
                <div className="settingsmodal__inputone">
                    <p>username@test.com</p>
                </div>
                <p>Password:</p>
                <div className="settingsmodal__input">
                    <p>*********</p>
                    <img src={edit}/>
                </div>
                <div className="settingmodal__buttons">
                    <button className="logout">Log Out</button>
                    <button className="delete">Delete Account</button>
                </div>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default SettingsModal
