import Close from '@mui/icons-material/Close';
import React,{ useEffect,useState } from 'react';
import './SiteStats.css';
import { db } from '../../firebase';
import ReactDOM from 'react-dom';
import { VictoryPie } from 'victory';
import { useSelector,useDispatch } from 'react-redux';
import { hideStatsModal } from '../../States/slices/chatSlice';

function SiteStats() {
    const [totalUsers,setTotalUsers] = useState(0);
    const [totalOnlineUsers,setTotalOnlineUsers] = useState(0);
    const [totalAmountDeposited,setTotalAmountDeposited] = useState(0);
    const [totalAmountWithdrawn,setTotalAmountWithdrawn] = useState(0);
    const [totalBets,setTotalBets] = useState(0);
    const [totalBetsToday,setTotalBetsToday] = useState(0);
    const [totalBetsWon,setTotalBetsWon] = useState(0);
    const [totalBetsWonToday,setTotalBetsWonToday] = useState(0);
    const [totalBetsLost,setTotalBetsLost] = useState(0);
    const [totalBetsLostToday,setTotalBetsLostToday] = useState(0);
    const [totalProfits,setTotalProfits] = useState(0);
    const [totalProfitsToday,setTotalProfitsToday] = useState(0);
    const [totalLoss,setTotalLoss] = useState(0);
    const [totalLossToday,setTotalLossToday] = useState(0);
    const [latestBet,setLatestBet] = useState([]);
    const [pieChartData,setPieChartData] = useState([]);
    const openSiteStatsModal = useSelector((state)=>state.chat.showSiteStats);
    const dispatch = useDispatch();


    //populates data in stats..
    useEffect(() => {
        const getSiteStats = async() =>{
            try{
                //pull necessary data from database..
                const today = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear();
                
                const userData = await db.collection('users').get()
                const userCollection = userData?.docs?.map((doc)=>(
                    doc?.data()
                ))
                const betsData = await db.collection('bets').get()
                const betsCollection = betsData?.docs?.map((doc)=>(
                    doc?.data()
                ))

                // get users data required to populate the fields..
                await setTotalUsers(userCollection.length);
                const Online = await userCollection.filter((user)=>(
                    user.isOnline === true
                ))
                await setTotalOnlineUsers(Online.length);
                const Deposited = await userCollection.map((user)=>(user.totalDeposited)).reduce((total,amount)=>total+amount,0)
                await setTotalAmountDeposited(Number(Deposited).toFixed(2))
                const Withdrawn = await userCollection.map((user)=>(user.totalWithdrawn)).reduce((total,amount)=>total+amount,0)
                await setTotalAmountWithdrawn(Number(Withdrawn).toFixed(2))

                //get details related to bets and user activities..
                await setTotalBets(betsCollection.length);
                const betsToday = await betsCollection.filter((bet)=>(
                    bet.date == today
                ))
                await setTotalBetsToday(betsToday.length);

                const betsWonToday = await betsCollection.filter((bet)=>(
                    bet.isWon === true && bet.OverDate == today
                ))
                await setTotalBetsWonToday(betsWonToday.length);

                const betsWon = await betsCollection.filter((bet)=>(
                    bet.isWon === true
                ))
                await setTotalBetsWon(betsWon.length);

                const betsLostToday = await betsCollection.filter((bet)=>(
                    bet.isOver === true && bet.isWon === false && bet.OverDate == today
                ))
                await setTotalBetsLostToday(betsLostToday.length);

                const betsLost = await betsCollection.filter((bet)=>(
                    bet.isOver === true && bet.isWon === false
                ))
                await setTotalBetsLost(betsLost.length);

                const arrangedBets = await betsCollection.sort((a,b)=>(
                    b.timeStamp - a.timeStamp
                ))
                await setLatestBet(arrangedBets[0]); 

                if(betsLost.length > 0){
                    const AmountLoss = betsLost?.map((bet)=>(bet.winAmount)).reduce((total,amount)=>total + amount,0);
                    await setTotalLoss(Number(AmountLoss).toFixed(2));
                }
                if(betsLostToday.length > 0){
                    const AmountLossToday = betsLostToday?.map((bet)=>(bet.winAmount)).reduce((total,amount)=>total + amount,0);
                    await setTotalLossToday(Number(AmountLossToday).toFixed(2));
                }
                if(betsWon.length > 0){
                    const AmountWon = betsWon?.map((bet)=>(bet.profit)).reduce((total,amount)=>total + amount,0);
                    await setTotalProfits(Number(AmountWon).toFixed(2));
                }
                if(betsWonToday.length > 0){
                    const AmountWonToday = betsWonToday?.map((bet)=>(bet.profit)).reduce((total,amount)=>total + amount,0);
                    await setTotalProfitsToday(Number(AmountWonToday).toFixed(2));
                }

                //get data for pie chart
                const countries = await userCollection ?.map((user)=>(user.country));
                const totalCountries = countries.length;
                const uniqueCountries = [...new Set(countries)];
                await uniqueCountries.forEach(currCountry => {
                    const numItems = countries.filter(cntry => cntry === currCountry) 
                    pieChartData.unshift({y:Number((numItems.length * 100 / totalCountries)).toFixed(2),label:currCountry});
                })
                //pie chart data ends
                          
            }
            catch{
                window.alert("failed to get stats.Please try again after some time.")
            }
            
        }
        getSiteStats();
    }, [])

    const graphicColor = ['#FFB6C1','#FF1493','#9932CC','#8B008B','#C71585'];
      //piechart data ends........
    
      if(!openSiteStatsModal) return null;
      
     return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="sitestats">
            <div className="sitestats__header">
                <h2>Site Stats</h2>
                <Close onClick={()=>{dispatch(hideStatsModal())}} className="close"/>
            </div>
            <div className="sitestats__body">
                <div className="sitestats__left">
                    <p>Total Bets Won Today:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalBetsWonToday}</p>
                    </div>
                    <p>Total Bets Won:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalBetsWon}</p>
                    </div>
                    <p>Total Bets Lost Today:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalBetsLostToday}</p>
                    </div>
                    <p>Total Bets Lost:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalBetsLost}</p>
                    </div>
                    <p>Total User Profit Today:</p>
                    <div className="sitestats__leftValue">
                        <p>${totalProfitsToday}</p>
                    </div>
                    <p>Total User Profit:</p>
                    <div className="sitestats__leftValue">
                        <p>${totalProfits}</p>
                    </div>
                    <p>Total User Loss Today:</p>
                    <div className="sitestats__leftValue">
                        <p>${totalLossToday}</p>
                    </div>
                    <p>Total User Loss:</p>
                    <div className="sitestats__leftValue">
                        <p>${totalLoss}</p>
                    </div>
                    <p>Total Amount Deposited:</p>
                    <div className="sitestats__leftValue">
                        <p>${totalAmountDeposited}</p>
                    </div>
                    <p>Total Amount Withdrawn:</p>
                    <div className="sitestats__leftValue">
                        <p>${totalAmountWithdrawn}</p>
                    </div>
                </div>
                <div className="sitestats__right">
                    <p>Countries:</p>
                    <div className="sitestats__graph">
                        <VictoryPie 
                        data={pieChartData}
                        radius={150}
                        colorScale={graphicColor}
                        />
                        <div className="sitestats__country">
                            {pieChartData.map((data)=>(
                                <p>{data.label}:{data.y}</p>
                            ))}
                        </div>
                    </div>
                    <p>Total Online Users:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalOnlineUsers}</p>
                    </div>
                    <p>Total Registered Users:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalUsers}</p>
                    </div>
                    <p>Total Bets Today:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalBetsToday}</p>
                    </div>
                    <p>Total Bets:</p>
                    <div className="sitestats__leftValue">
                        <p>{totalBets}</p>
                    </div>
                    <p>Most Recent Bet:</p>
                    <div className="sitestats__recentbet">
                        <div className="sitestats__details">
                            <p>User: {latestBet?.userName}</p>
                            <p>{latestBet?.team1} vs {latestBet?.team2}</p>
                            <p>{latestBet?.team} @ {latestBet?.odd}</p>
                            <p>{latestBet?.gameDate}UTC - {latestBet?.gameTime}</p>
                        </div>
                        <div className="sitestats__amount">
                            <h3>${latestBet?.winAmount}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default SiteStats
