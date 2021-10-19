import React,{ useEffect } from 'react';
import Header from '../../components/Header/Header';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../States/slices/chatSlice';
import Footer from '../../components/Footer/Footer';

function SignUp() {
    const dispatch = useDispatch();
    useEffect(() => {
        //hides the chat icon when the user is not logged in
        const hideChatButton = () =>{
            dispatch(hideChat());
        }
        hideChatButton();   
    })
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
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </p>
                </form>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default SignUp
