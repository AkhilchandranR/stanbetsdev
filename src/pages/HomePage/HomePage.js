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
import { useAuth } from "../../AuthContext";
import { db } from '../../firebase';
import { DataSaverOffSharp, DataSaverOnRounded } from '@mui/icons-material';


function HomePage() {
    const { currentUser } = useAuth();
    const [searchTerm,setSearchTerm] = useState('');
    const [openAdminGame,setOpenAdminGame] = useState(false);
    const [openBets,setOpenBets] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState([]);
    const [listedGames,setListedGames] = useState([]);
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
    useEffect(() => {
        const getUserData = async() =>{
            if(currentUser){
                const userData = await db.collection('users').get()
                const userCollection = userData?.docs?.map((doc)=>(
                    doc?.data()
                ))
                setLoggedInUser(userCollection.filter((user)=>(
                    user.userId == currentUser.uid
                )))
                }
        }
        getUserData()
    })
    useEffect(() => {
        const getGamesData = async()=>{
            const games = await db.collection('games').get()
            const gameCollection = games?.docs?.map((doc)=>(
                doc?.data()
            ))
            
            setListedGames(gameCollection)
        }
        getGamesData()
    }, [listedGames])
    return (
        <div className="homepage">
            <Header user={loggedInUser}/>
            <div className="homepage__body">
                <div className="homepage__chat" onClick={openChat}>
                    {showChatIcon &&
                    <img src={chatbubble} 
                    className="homepage__chatIcon" 
                    />
                    }
                </div>
                {openChatbox && <ChatWindow logUser={loggedInUser[0]}/>}
                <div className="homepage__contents">
                    <div className="homepage__options">
                        <div className="homepage__searchbar">
                            <input type="text" placeholder="Search for matches (Game or Team)..."
                            value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                        </div>
                        <div className="homepage__optionIcons">
                            {currentUser && <div className="homepage__icon" onClick={()=>setOpenBets(true)}>
                                <ReceiptIcon/>
                            </div>}
                            {loggedInUser[0]?.isAdmin && <div className="homepage__icon" onClick={()=>setOpenAdminGame(true)}>
                                <StarIcon className="star"/>
                            </div>}
                        </div>
                    </div>
                    <div className="homepage__gamedetails">
                        {listedGames?.filter((games)=>{
                            if(searchTerm == ''){
                                return games
                            }
                            else if((games.gameName.toLowerCase().includes(searchTerm.toLowerCase())) 
                            || (games.team1.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            || (games.team2.name.toLowerCase().includes(searchTerm.toLowerCase()))){
                                return games
                            }
                        })?.map((game)=>(
                            <GameDetails key={game?.id}
                            id={game?.id}
                            name={game?.gameName}
                            date={game?.date}
                            time={game?.time}
                            team1 ={game?.team1}
                            team2 = {game?.team2}
                            link={game?.link}
                        />
                        ))
                        }
                    </div>
                </div>
            </div>
            <SettingsModal show={showSettingsModal} hide={()=>dispatch(hideUserSettings())} user={loggedInUser[0]}/>
            <UserStatsModal show={showStatsModal} hide={()=>dispatch(closeStats())} isAnAdmin={loggedInUser[0]?.isAdmin}/>
            <AdminGame show={openAdminGame} hide={()=>setOpenAdminGame(false)}/>
            <MyBetsModal show={openBets} hide={()=>setOpenBets(false)}/> 
            {/* <Footer/> */}
        </div>
    )
}

export default HomePage
