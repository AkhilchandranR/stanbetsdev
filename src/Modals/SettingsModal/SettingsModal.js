import React,{useEffect, useState} from 'react';
import './SettingsModal.css';
import edit from '../../images/edit.png';
import CloseIcon from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import { db } from '../../firebase';

function SettingsModal({show,hide,user}) {
    const { currentUser,logout } = useAuth();
    const history = useHistory();


    //logs out a user and routes to login page
    const handleLogout = async(e) =>{
        e.preventDefault();  
        hide();
        try{
            await db.collection('users').doc(currentUser.uid).update({
                lastOnline: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
                isOnline: false,
            }).then(()=>{
                logout();
                history.push('/login')
            }).catch((err)=>console.log(err))
        }
        catch{
            window.alert("failed to logout")
        }
    }

    //self deletion of users account and data
    const handleSelfDelete = async(e) =>{
        e.preventDefault();
        const confirm = window.confirm("This action cannot be undone.")
        if(confirm){

            //change username to unknown....
            await db.collection('chats').where("userId","==",currentUser.uid)
            .get()
            .then((querySnapShot)=>{
                querySnapShot.forEach((doc)=>{
                    db.collection('chats').doc(doc.id).update({
                        userName : "unknown",
                        userId: null,
                    })
                })
            }).catch((err)=>err)

            //delete the user itself.... 
            await db.collection('users').doc(currentUser.uid).delete()
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

        if(newName === null) return;
        else if(newName === '') return;
        else if(newName.toLowerCase() === (user.username).toLowerCase()) return;

        if(!((newName).match("^[A-Za-z0-9]+$"))){
            window.alert("Username should only contain alphabets and numbers");
            return;
        }

        else{
            const userData = await db.collection('users').get()
            const userCollection = userData?.docs?.map((doc)=>(
                doc?.data()
            ))
            if (userCollection.find((user)=>(
                newName.toLowerCase() === (user.username).toLowerCase()))){
                    window.alert("Username already taken")
                    return;
            }

            await db.collection('users').doc(currentUser.uid).update({
                username: newName
            }).then(()=>{
                window.alert("username successfully updated")
            })
            .catch((e)=>window.alert(e.message))

            //update bets and chats with username
            //update chats.....
            await db.collection('chats').where("userId","==",currentUser.uid)
            .get()
            .then((querySnapShot)=>{
                querySnapShot.forEach((doc)=>{
                    db.collection('chats').doc(doc.id).update({
                        userName : newName
                    })
                })
            }).catch((err)=>err)

            //update bets.......
            await db.collection('bets').where("user","==",currentUser.uid)
            .get()
            .then((querySnapShot)=>{
                querySnapShot.forEach((doc)=>{
                    db.collection('bets').doc(doc.id).update({
                        userName : newName
                    })
                })
            }).catch((err)=>err)
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
            <CloseIcon onClick={hide} className="close"/>
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
