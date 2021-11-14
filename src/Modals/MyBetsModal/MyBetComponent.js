import React from 'react';
import './MyBetComponent.css';

function MyBetComponent({ name,team,odd,time,date,amount,wonAmount,bets,over,team1,team2}) {
    return (
        <div className="mybetcomponent">
            <div className="mybetcomponent__details">
                <p>{name}</p>
                <p>{team1} vs {team2}</p>
                <p>{team}@{odd}</p>
                <p>{time} UTC - {date}</p>
            </div>
            {!over ? (
            <div className="mybetcomponent__amount">
                <h3>${amount}</h3>
            </div>):(
            <div className={`${bets ? "mybetcomponent__amountWon":"mybetcomponent__amountLoss"}`}>
                {bets ? (
                    <h3>+${wonAmount}</h3>
                ):(
                    <h3>-${amount}</h3>
                )}
            </div>
            )}
        </div>
    )
}

export default MyBetComponent
