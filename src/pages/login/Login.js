import React from 'react';
import Header from '../../components/Header/Header';
import './Login.css';

function Login() {
    return (
        <div className="login">
            <Header/>
            <div className="login__body">
                <form className="login__form">
                    <h1>Login</h1>
                    <div className="login__input">
                        <p>Email:</p>
                        <div className="login__inputField">
                            <input type="email"/>
                        </div>
                    </div>
                    <div className="login__input">
                        <p>Password:</p>
                        <div className="login__inputField">
                            <input type="password"/>
                        </div>
                    </div>
                    <button type="submit">Login</button>
                    <p>Don't already have an account?
                        <span>SignUp</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
