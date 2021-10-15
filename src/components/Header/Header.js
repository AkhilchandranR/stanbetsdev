import React from 'react';
import './Header.css';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <h2>StanBets</h2>
                <div className="header__users">
                    <GroupsRoundedIcon/>
                    <p>1234</p>
                </div>
            </div>
            <div className="header__buttons">
                <button className="header__login">Login</button>
                <button className="header__signup">Sign-Up</button>
            </div>
        </div>
    )
}

export default Header
