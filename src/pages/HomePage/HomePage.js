import React from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import GameDetails from '../../components/GameDetails/GameDetails';
import Header from '../../components/Header/Header';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage">
            <Header/>
            <div className="homepage__body">
                <ChatWindow className="homepage__chatwindow"/>
                <div className="homepage__contents">
                    <div className="homepage__searchbar">
                        <input type="text" placeholder="Search for matches (Game or Team)..."/>
                    </div>
                    <div className="homepage__gamedetails">
                        <GameDetails/>
                        <GameDetails/>
                        <GameDetails/>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default HomePage
