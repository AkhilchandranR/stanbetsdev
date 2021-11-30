import React,{ useEffect,useState } from 'react';
import './Header.css';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { showUserSettings } from '../../States/slices/chatSlice';
import { Link } from 'react-router-dom'; 
import { useAuth } from "../../AuthContext";
import wallet from "../../images/wallet.png";
import { db } from '../../firebase';
import firebase from 'firebase';
import UserLoader from '../UserLoader/UserLoader';
import sblong from '../../images/SB-Long.png';
import sbshort from '../../images/SB-Short.png';

function Header({ user,online,showOnline,openModal,loading }) {
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const [loadDots,setLoadDots] = useState(true);

    useEffect(() => {
        setTimeout(function(){
            setLoadDots(false);
        },5000);
    }, [])

    const claimBalance = async(e) =>{
        e.preventDefault();
        const confirm = window.confirm("This can only be claimed once.");
        if(confirm){
            await db.collection('users').doc(currentUser.uid).update({
                totalBalance: firebase.firestore.FieldValue.increment(0.25),
                hasClaimedFree: true
            }).then(()=>{
                 window.alert("Balance successfully updated")
            }).catch((err)=>{ window.alert(err)})
            
        }
    }

    return (
        <div className="header">
            <div className="header__logo">
                <img src={sblong} alt="stanbets_long" className="header__logoLong"/>
                <img src={sbshort} alt="stanbets_short" className="header__logoShort"/>
               { showOnline &&
               <div className="header__users">
                    <GroupsRoundedIcon/>
                    <p>{online}</p>
                </div>
                }
            </div>
            {(loadDots || loading) ? (
                <UserLoader/>
            ):(
                <>
                    {(currentUser&& user) ? (
                        <div className="header__user">
                        {!(user?.hasClaimedFree) && <button className="header__claimBalance" onClick={claimBalance}>Claim Free $0.25</button>}  
                        <div className="header__username" onClick={()=>{dispatch(showUserSettings())}}>
                            {user?.isAdmin && <StarIcon/>}
                            <p>{user?.username}</p>
                        </div>
                        <div className="header__amount">
                            <p>${user?.totalBalance}</p>
                            {!(user?.isAdmin) && <img src={wallet} alt="wallet" onClick={openModal}/>}
                        </div>
                    </div>
                    ):(
                        <div className="header__buttons">
                        <Link to="/login">
                            <button className="header__login">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="header__signup">Sign-Up</button>
                        </Link>
                    </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Header
