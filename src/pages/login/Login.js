import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Login.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../States/slices/chatSlice';
import Footer from '../../components/Footer/Footer';

function Login() {
    const dispatch = useDispatch();
    useEffect(() => {
        //hides chaticon for non logged in users
        const hideChatButton = () =>{
            dispatch(hideChat());
        }
        hideChatButton();   
    })
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
                        <Link to="/signup">
                            <span>SignUp</span>
                        </Link>
                    </p>
                </form>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Login
