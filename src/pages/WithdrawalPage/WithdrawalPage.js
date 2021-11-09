import React from "react";
import Header from "../../components/Header/Header";
import './WithdrawalPage.css';
import WithdrawalWindow from "../../components/WithdrawalWindow/WithdrawalWindow";
import Footer from '../../components/Footer/Footer';

function WithdrawalPage() {
  return (
    <div className="withdrawalpage">
      <Header />
      <div className="withdrawalpage__body">
        <div className="withdrawalpage__contents">
          <WithdrawalWindow />
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default WithdrawalPage;
