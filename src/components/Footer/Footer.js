import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <div className="footer__row">
        <div className="footer__rowName">
          <h4>Links:</h4>
        </div>
        <div className="footer__links">
          <p><a href="/">Home</a></p>
          <p><a href="/wallet">Wallet</a></p>
          <p><a href="/about">About Us</a></p>
        </div>
      </div>
      <div className="footer__row">
        <div className="footer__rowName">
          <h4>Support:</h4>
        </div>
        <div className="footer__links">
          <p><a href="/faq">FAQ</a></p>
          <p><a href="/support">Contact Us</a></p>
        </div>
      </div>
      <div className="footer__row">
        <div className="footer__rowName">
          <h4>Social Media:</h4>
        </div>
        <div className="footer__links">
          <p><a href="https://www.twitter.com/StanBetsOnline" target="_blank">Twitter</a></p>
          <p><a href="https://www.instagram.com/StanBetsOnline" target="_blank">Instagram</a></p>
          <p><a href="/support">support@stanbets.com</a></p>
        </div>
      </div>
    </div>
  )
}

export default Footer