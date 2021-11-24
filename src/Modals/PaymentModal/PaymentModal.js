import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './PaymentModal.css';
import Loader from '../../components/Laoder/Loader';
import {db} from '../../firebase';
import { useAuth } from "../../AuthContext";
import firebase from 'firebase';


function PaymentModal({open,close}) {
    const { currentUser } = useAuth();
    const [active,setActive] = useState(true);
    const [inputAmount,setInputAmount] = useState(0);
    const [loading,setLoading] = useState(false);

    const coinBasePayment = async(e) =>{
        e.preventDefault();
        if(inputAmount > 100 || inputAmount < 10){
            window.alert("Amount should be greater than $10 or less than $100");
            return;
        }

        // try{
        //     setLoading(true)
        //     const AmountToPay = {amount : Number(inputAmount).toFixed(2)};
        //     const res = await fetch('http://localhost:5000/stanbets-payment/us-central1/createCharge',{
        //         method: 'POST',
        //         body:  JSON.stringify(AmountToPay)
        //     })
        //     const charge = await res.json();
        //     console.log(charge);
        //     await window.open(charge.hosted_url,'_blank');

        //     // const hooksHandler = await fetch('http://localhost:5000/stanbets-payment/us-central1/webhookHandler')
        //     // const message = await hooksHandler.json();
        //     // console.log(message);
        //     // if (message == 'charge:confirmed'){
        //     //     db.collection('users').doc(currentUser.uid).update({
        //     //         totalBalance: firebase.firestore.FieldValue.increment(inputAmount)
        //     //     })
        //     // }
        // }
        // catch(error){
        //     window.alert(error)
        // }
        // setLoading(false);
        setInputAmount(0);
        close();
    }

    if(!open) return null;

    return ReactDOM.createPortal(
        <>
        <div className="overlay" onClick={close}/>
        <div className="payment">
            <div className="payment__header">
                <div className={`${active && "payment__headerActive"}`} onClick={()=>setActive(true)}><h2>Deposit</h2></div>
                <div className={`${!active && "payment__headerActive"}`} onClick={()=>setActive(false)}><h2>Withdraw</h2></div>
            </div>
            {active ? (
                <div className="payment__pay">
                    <div className="payment__payHeader">
                        <p>Amount to deposit:</p>
                        <p>Min: $10 | Max: $100</p>
                    </div>
                    <form className="payment__amount">
                        <div className="payment__input">
                            <input type="number" value={inputAmount} onChange={(e)=>setInputAmount(e.target.value)}/>
                        </div>
                        <button type="submit" onClick={coinBasePayment}>
                            {loading ? (
                                <Loader/>
                            ):(
                               <p> Pay With Coinbase</p>
                            )}
                        </button>  
                    </form>
                </div>
            ):(
                <div className="payment__withdraw">
                    <p>
                        Withdrawals are currently handled manually,To Withdraw
                        please contact the email below and we will furthur assist you, thankyou.
                    </p>
                    <h2>Min: $25.00  Max: $100</h2>
                    <div>
                        Withdrawals@stanbets.com
                    </div>
                </div>
            )}
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default PaymentModal
