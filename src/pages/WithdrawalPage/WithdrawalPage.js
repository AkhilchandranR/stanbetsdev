import React from "react";
import Header from "../../components/Header/Header";
import './WithdrawalPage.css';
import WithdrawalWindow from "../../components/WithdrawalWindow/WithdrawalWindow";

function WithdrawalPage() {
  return (
    <div className="withdrawalpage">
      <Header />
      <div className="withdrawalpage__body">
        <div className="withdrawalpage__contents">
          <WithdrawalWindow />
        </div>
      </div>
    </div>
  );
}

export default WithdrawalPage;
