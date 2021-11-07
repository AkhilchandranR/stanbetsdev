import Close from '@mui/icons-material/Close';
import React,{ useEffect,useState } from 'react';
import './SiteStats.css';
import { db } from '../../firebase';
import ReactDOM from 'react-dom';
import { Pie } from 'react-chartjs-2';

function SiteStats({open,hide}) {
    const [totalUsers,setTotalUsers] = useState(0);
    const [totalOnlineUsers,setTotalOnlineUsers] = useState(0);
    const [totalAmountDeposited,setTotalAmountDeposited] = useState(0);
    const [totalAmountWithdrawn,setTotalAmountWithdrawn] = useState(0);

    //populates data in stats..
    useEffect(() => {
        const getSiteStats = async() =>{
            try{
                //pull necessary data from database..
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
                const Deposited = await userCollection.map((user)=>(user.totalDeposited)).reduce((total,amount)=>(total+amount,0))
                await setTotalAmountDeposited(Deposited)
                const Withdrawn = await userCollection.map((user)=>(user.totalWithdrawn)).reduce((total,amount)=>(total+amount,0))
                await setTotalAmountWithdrawn(Withdrawn)

                //get details related to bets and user activities..
                
                

            }
            catch{
                window.alert("failed to get stats.Please try again after some time.")
            }
            
        }
        getSiteStats();
    }, [])

    //pie chart data
    const data = {
        labels: [],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      //piechart data ends........
    
      if(!open) return null;
      
     return ReactDOM.createPortal(
        <>
        <div className="overlay"/>
        <div className="sitestats">
            <div className="sitestats__header">
                <h2>Site Stats</h2>
                <Close onClick={hide}/>
            </div>
            <div className="sitestats__body">
                <div className="sitestats__left">
                    <p>Total Bets Won Today:</p>
                    <div className="sitestats__leftValue">
                        <p>500</p>
                    </div>
                    <p>Total Bets Won:</p>
                    <div className="sitestats__leftValue">
                        <p>5106</p>
                    </div>
                    <p>Total Bets Lost Today:</p>
                    <div className="sitestats__leftValue">
                        <p>1345</p>
                    </div>
                    <p>Total Bets Lost:</p>
                    <div className="sitestats__leftValue">
                        <p>14724</p>
                    </div>
                    <p>Total User Profit Today:</p>
                    <div className="sitestats__leftValue">
                        <p>$2456.00</p>
                    </div>
                    <p>Total User Profit:</p>
                    <div className="sitestats__leftValue">
                        <p>$5797</p>
                    </div>
                    <p>Total User Loss Today:</p>
                    <div className="sitestats__leftValue">
                        <p>$5267.00</p>
                    </div>
                    <p>Total User Loss:</p>
                    <div className="sitestats__leftValue">
                        <p>$6898.00</p>
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
                    {/* <p>Countries:</p>
                    <div className="sitestats__graph">
                        <Pie data={data}/>
                        <div classname="sitestats__country"></div>
                    </div> */}
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
                        <p>1845</p>
                    </div>
                    <p>Total Bets:</p>
                    <div className="sitestats__leftValue">
                        <p>19830</p>
                    </div>
                    <p>Most Recent Bet:</p>
                    <div className="sitestats__recentbet">
                        <div className="sitestats__details">
                            <p>User: Username</p>
                            <p>Team1 vs Team2</p>
                            <p>Team2 @ 3.33</p>
                            <p>19:00 UTC - 16/09/21</p>
                        </div>
                        <div className="sitestats__amount">
                            <h3>$1.00</h3>
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
