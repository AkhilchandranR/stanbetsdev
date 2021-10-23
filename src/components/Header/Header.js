import React from 'react';
import './Header.css';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { showUserSettings } from '../../States/slices/chatSlice';
import { Link } from 'react-router-dom'; 
import { useAuth } from "../../AuthContext";

function Header({ user }) {
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    return (
        <div className="header">
            <div className="header__logo">
                <h2>StanBets</h2>
                <div className="header__users">
                    <GroupsRoundedIcon/>
                    <p>1234</p>
                </div>
            </div>
            {(currentUser&& user) ? (
                <div className="header__user" onClick={()=>{dispatch(showUserSettings())}}>
                <div className="header__username">
                    {user[0]?.isAdmin && <StarIcon/>}
                    <p>{user[0]?.username}</p>
                </div>
                <div className="header__amount">
                    <p>$6.00</p>
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
        </div>
    )
}

export default Header
