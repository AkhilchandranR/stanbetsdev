import React,{ useEffect, useState } from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import GameDetails from '../../components/GameDetails/GameDetails';
import Header from '../../components/Header/Header';
import './HomePage.css';
import StarIcon from '@mui/icons-material/Star';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useSelector,useDispatch } from 'react-redux';
import { hideUserSettings } from '../../States/slices/chatSlice';
import { showChat } from '../../States/slices/chatSlice';
import Footer from '../../components/Footer/Footer';
import chatbubble from '../../images/chaticon.png';
import { openWindow } from '../../States/slices/chatSlice';
import { closeStats } from '../../States/slices/userSlice';
import SettingsModal from '../../Modals/SettingsModal/SettingsModal';
import UserStatsModal from '../../Modals/UserStatsModal/UserStatsModal';
import AdminGame from '../../Modals/AdminGameModal/AdminGame';
import MyBetsModal from '../../Modals/MyBetsModal/MyBetsModal';

function HomePage() {
    const [openAdminGame,setOpenAdminGame] = useState(false);
    const [openBets,setOpenBets] = useState(false);
    const dispatch = useDispatch();
    const openChatbox = useSelector((state)=> state.chat.openChatWindow);
    const showChatIcon = useSelector((state)=> state.chat.showChatIcon);
    const showSettingsModal = useSelector((state)=> state.chat.showSettings);
    const showStatsModal = useSelector((state)=>state.user.openStatsModal); 
    const openChat = () =>{
        dispatch(openWindow());  
    }
    useEffect(() => {
        const showChatWindowIcon = () =>{
            dispatch(showChat());
        }
        showChatWindowIcon();   
    })
    return (
        <div className="homepage">
            <Header/>
            <div className="homepage__body">
                <div className="homepage__chat" onClick={openChat}>
                    {showChatIcon &&
                    <img src={chatbubble} 
                    className="homepage__chatIcon" 
                    />
                    }
                </div>
                {openChatbox && <ChatWindow/>}
                <div className="homepage__contents">
                    <div className="homepage__options">
                        <div className="homepage__searchbar">
                            <input type="text" placeholder="Search for matches (Game or Team)..."/>
                        </div>
                        <div className="homepage__optionIcons">
                            <div className="homepage__icon" onClick={()=>setOpenBets(true)}>
                                <ReceiptIcon/>
                            </div>
                            <div className="homepage__icon" onClick={()=>setOpenAdminGame(true)}>
                                <StarIcon className="star"/>
                            </div>
                        </div>
                    </div>
                    <div className="homepage__gamedetails">
                        <GameDetails/>
                        <GameDetails/>
                        <GameDetails/>
                    </div>
                </div>
            </div>
            <SettingsModal show={showSettingsModal} hide={()=>dispatch(hideUserSettings())}/>
            <UserStatsModal show={showStatsModal} hide={()=>dispatch(closeStats())}/>
            <AdminGame show={openAdminGame} hide={()=>setOpenAdminGame(false)}/>
            <MyBetsModal show={openBets} hide={()=>setOpenBets(false)}/> 
            {/* <Footer/> */}
        </div>
    )
}

export default HomePage
