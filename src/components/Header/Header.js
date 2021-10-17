import React from 'react';
import './Header.css';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StarIcon from '@mui/icons-material/Star';

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
            {/* <div className="header__buttons">
                <button className="header__login">Login</button>
                <button className="header__signup">Sign-Up</button>
            </div> */}
            <div className="header__user">
                <div className="header__username">
                    <StarIcon/>
                    <p>Username</p>
                </div>
                <div className="header__amount">
                    <p>$6.00</p>
                </div>
            </div>
        </div>
    )
}

export default Header
