import React from 'react';
import './WithdrawalWindow.css';

function WithdrawalWindow() {
  return (
    <div className="withdrawalwindow">
      <div className="withdrawalwindow__heading">
        <h2>Withdraw</h2>
      </div>
      <div className="withdrawalwindow__body">
        <p>Hello username, Currently our withdrawal system is manual!</p>
        <p>To withdraw you funds ($25 USD Minimum Withdrawal) please contact us at the email provided below, we'll do everything we can to get back to you within 2-24 hours!</p>
        <p>Please make sure to email us from the same email your account is registered with!</p>
        <div className="withdrawalwindow__email">
          <p>withdrawals@stanbets.com</p>
        </div>
      </div>
    </div>
  )
}

export default WithdrawalWindow
