import React,{useEffect, useState} from 'react';
import './SettingsModal.css';
import edit from '../../images/edit.png';
import CloseIcon from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import { db,auth } from '../../firebase';

function SettingsModal({show,hide,user}) {
    const { currentUser,logout } = useAuth();
    const [docId,setDocId] = useState('');
    const history = useHistory();

    useEffect(() => {
        //finds the doc id of the current user for deletion of firestore data
        const getDocId = async()=>{
            if(currentUser){
                const userRef = db.collection('users');
                const snapshot = await userRef.get();
                if (snapshot.empty) {
                return;
                }  
                
                snapshot.forEach(doc => {
                if (doc.data().userId == currentUser.uid){
                    setDocId(doc.id)
                }
                })
            }
        }
        getDocId();
    },[currentUser])

    //logs out a user and routes to login page
    const handleLogout = async(e) =>{
        e.preventDefault();  
        hide();
        await db.collection('users').doc(docId).update({
            lastOnline: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
            isOnline: false,
        }).then(()=>{
            logout();
            history.push('/login')
        }).catch((err)=>console.log(err))
    }

    //self deletion of users account and data
    const handleSelfDelete = async(e) =>{
        e.preventDefault();
        const confirm = window.confirm("This action cannot be undone.")
        if(confirm){
            await db.collection('users').doc(docId).delete()
            .then(()=>{
                firebase.auth().currentUser.delete()
                .then((res)=>res)
                .catch((err)=>window.alert(err))
                history.push('/login')
                window.alert("account is deleted")
            })
            .catch((err)=>{
                window.alert(err)
            })
        }
        hide();
    }

    //update the username
    const updateUserName = async(e) =>{
        e.preventDefault();
        const newName = window.prompt("Enter your new username:",user?.username);
        //dont have to update if no changes are made
        if(newName === user?.username) return
        else{
            await db.collection('users').doc(docId).update({
                username: newName
            }).then(()=>{
                window.alert("username successfully updated")
            })
            .catch((e)=>window.alert(e.message))
        }
        hide();
    }

    //update the current users password
    const updatePassword = async() =>{
        const newPassword = window.prompt("Enter your new password");
        if(newPassword){
            currentUser.updatePassword(newPassword)
            .then(()=>{
                history.push('/login')
                alert("password updated successfully please login to continue")
            })
            .catch((err)=>window.alert(err.message))
        }
        hide();
    }

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
                    <p>{user?.username}</p>
                    <img src={edit} onClick={updateUserName}/>
                </div>
                <p>Email:</p>
                <div className="settingsmodal__inputone">
                    <p>{user?.emailId}</p>
                </div>
                <p>Password:</p>
                <div className="settingsmodal__input">
                    <p>*********</p>
                    <img src={edit} onClick={updatePassword}/>
                </div>
                <div className="settingmodal__buttons">
                    <button className="logout" onClick={handleLogout}>Log Out</button>
                    <button className="delete" onClick={handleSelfDelete}>Delete Account</button>
                </div>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default SettingsModal
