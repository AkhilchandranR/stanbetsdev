import React from 'react';
import Header from '../../components/Header/Header';
import './SignUp.css';

function SignUp() {
    return (
        <div className="signup">
            <Header/>
            <div className="signup__body">
                <form className="signup__form">
                    <h1>Sign-Up</h1>
                        <div className="signup__input">
                            <p>Username:</p>
                            <div className="signup__inputField">
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="signup__input">
                            <p>Email:</p>
                            <div className="signup__inputField">
                                <input type="email"/>
                            </div>
                        </div>
                        <div className="signup__input">
                            <p>Password:</p>
                            <div className="signup__inputField">
                                <input type="password"/>
                            </div>
                        </div>
                        <button type="submit">Sign-Up</button>
                        <p>Already have an account?
                            <span>Login</span>
                        </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
