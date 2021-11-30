import React,{ useEffect, useState } from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import GameDetails from '../../components/GameDetails/GameDetails';
import Header from '../../components/Header/Header';
import './HomePage.css';
import StarIcon from '@mui/icons-material/Star';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useSelector,useDispatch } from 'react-redux';
import { hideUserSettings } from '../../States/slices/chatSlice';
import { showAdminModal,hideAdminModal } from '../../States/slices/chatSlice';
import Footer from '../../components/Footer/Footer';
import chatbubble from '../../images/chaticon.png';
import CreateBetModal from '../../Modals/CreateBetModal/CreateBetModal';
import CreateGame from '../../Modals/AdminGameModal/CreateGame/CreateGame';
import { closeBet } from '../../States/slices/userSlice';
import SettingsModal from '../../Modals/SettingsModal/SettingsModal';
import UserStatsModal from '../../Modals/UserStatsModal/UserStatsModal';
import SiteStats from '../../Modals/SiteStatsModal/SiteStats';
import AdminGame from '../../Modals/AdminGameModal/AdminGame';
import MyBetsModal from '../../Modals/MyBetsModal/MyBetsModal';
import { useAuth } from "../../AuthContext";
import { db } from '../../firebase';
import PaymentModal from '../../Modals/PaymentModal/PaymentModal';
import Loader from '../../components/GamesLaoder /Loader';


function HomePage() {
    const { currentUser } = useAuth();
    const[showOnline,setShowOnline] = useState(true);
    const [searchTerm,setSearchTerm] = useState('');
    const [openBets,setOpenBets] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState({});
    const [noOfOnlineUsers,setNoOfOnlineUsers] = useState(0);
    const [listedGames,setListedGames] = useState([]);
    const [openPaymentModal,setOpenPaymentModal] = useState(false);
    const [loadingUser,setLoadingUser] = useState(false);
    const [loadingGames,setLaodingGames] = useState(false);
    const dispatch = useDispatch();
    const showSettingsModal = useSelector((state)=> state.chat.showSettings);
    const showBetModal = useSelector((state)=>state.user.openBetModal);
    const openAdminModal = useSelector((state)=>state.chat.showAdmin);
    const CreateGameModalValue = useSelector((state)=>state.chat.showCreateGame);

    
    //to open chatwindow,but has to be changed
    //according to the design
    const openChat = () =>{
        document.getElementById("chatwindow").style.left = "0";
        document.getElementById("homepage__chat").style.display = "none";
    }

    //to pull the data of currentuser from the database
    //when logging in
    useEffect(() => {
        const getUserData = async() =>{
            try{
                if(currentUser){
                    setLoadingUser(true);
                    const userData = await db.collection('users').get()
                    const userCollection = userData?.docs?.map((doc)=>(
                        doc?.data()
                    ))
                    const OnlineUsers = await userCollection.filter((user)=>(
                        user.isOnline === true
                    ))
                    setNoOfOnlineUsers(OnlineUsers.length);

                    await db.collection("users").doc(currentUser.uid)
                    .onSnapshot((doc) => {
                        setLoggedInUser(doc.data())
                    });
                    } 
            }
            catch(error){
                console.log(error)
            }
            setLoadingUser(false);
        }
        getUserData();
    },[currentUser])

    //lists out the games in the database and sets it to the state listedGames...
    useEffect(() => {
        const getGamesData = async()=>{
            try{
                setLaodingGames(true);
                const games = await db.collection('games').get()
                const gameCollection = games?.docs?.map((doc)=>(
                    doc?.data()
                ))
                const sortedGames = gameCollection.sort((a,b)=>{
                    if (a.date === b.date){
                        return a.time < b.time ? -1 : 1
                      } else {
                        return a.date < b.date ? -1 : 1
                      }
                })
                await setListedGames(sortedGames);
            }
            catch{

            }
            setLaodingGames(false);
        }
        getGamesData()
    }, [CreateGameModalValue])

    return (
        <div className="homepage">
            <Header 
            user={loggedInUser} 
            online={noOfOnlineUsers} 
            showOnline
            openModal={()=>{setOpenPaymentModal(true)}}
            loading={loadingUser}/>
            
            <div className="homepage__body">
                <div className="homepage__chat" id="homepage__chat" onClick={openChat}>
                    <img src={chatbubble} 
                    className="homepage__chatIcon" 
                    />
                </div>
                <ChatWindow logUser={loggedInUser}/>
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
                            {loggedInUser?.isAdmin && <div className="homepage__icon" onClick={()=>{dispatch(showAdminModal())}}>
                                <StarIcon className="star"/>
                            </div>}
                        </div>
                    </div>
                    {loadingGames ?
                     (
                     <Loader/>
                     ):(
                         <>
                        {(listedGames.length <= 0) ? (
                            <div className="homepage__gamedetailsEmpty">
                                <h2>No games are available currently.Please come back later.</h2>
                            </div>
                        ):(
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
                                isAdmin={loggedInUser?.isAdmin}
                                bannedUser={loggedInUser?.isBanned}
                                bannedReason={loggedInUser?.BanReason}
                            />
                            ))
                            }
                        </div>
                        )}  
                        </>
                    )}
                </div>
            </div>
            <Footer/>
            <SettingsModal show={showSettingsModal} hide={()=>dispatch(hideUserSettings())} user={loggedInUser}/>
            <AdminGame open={openAdminModal} close={()=>{dispatch(hideAdminModal())}}/>
            <UserStatsModal  isAnAdmin={loggedInUser?.isAdmin}/>
            <CreateGame/>
            <SiteStats/>
            <PaymentModal open={openPaymentModal} close={()=>setOpenPaymentModal(false)}/>
            <MyBetsModal show={openBets} hide={()=>setOpenBets(false)}/> 
            <CreateBetModal show={showBetModal} hide={()=>dispatch(closeBet())}
             userBalance={loggedInUser?.totalBalance} username={loggedInUser?.username}/>
        </div>
    )
}

export default HomePage
