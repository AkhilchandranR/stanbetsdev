import React, { useEffect,useRef,useState } from 'react';
import Header from '../../components/Header/Header';
import './Login.css';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../States/slices/chatSlice';
import Footer from '../../components/Footer/Footer';
import { useAuth } from "../../AuthContext";
import { db } from '../../firebase';
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const captchaRef = useRef();
    const { currentUser,login } = useAuth();
    const history = useHistory();
    const[loading,setLoading] = useState(false);
    const [wrongCaptcha,setWrongCaptcha] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        //hides chaticon for non logged in users
        const hideChatButton = () =>{
            dispatch(hideChat());
        }
        hideChatButton();  
        //decides the length of captcha
        loadCaptchaEnginge(7);   
    })
    //function to handle login functionality
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(validateCaptcha(captchaRef.current.value)==false){
            setWrongCaptcha(true);
            return
        }
        if(!currentUser.emailVerified){
            window.alert("Please verify your email")
            return
        }
        try{
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            const userRef = db.collection('users');
            const snapshot = await userRef.get();
            if (snapshot.empty) {
                return;
            }  
                
            snapshot.forEach(doc => {
            if (doc.data().userId == currentUser.uid){
                db.collection('users').doc(doc.id).update({
                    isOnline: true,
                    lastOnline: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()
            })
            }
            })
            history.push("/")
        }
        catch{
            window.alert("Invalid username or password")
        }
        setLoading(false);
        setWrongCaptcha(false);
    } 
    return (
        <div className="login">
            <Header/>
            <div className="login__body">
                <form className="login__form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="login__input">
                        <p>Email:</p>
                        <div className="login__inputField">
                            <input type="email" ref={emailRef} required/>
                        </div>
                    </div>
                    <div className="login__input">
                        <p>Password:</p>
                        <div className="login__inputField">
                            <input type="password" ref={passwordRef} required/>
                        </div>
                    </div>
                    <div className="captcha__image">
                        <LoadCanvasTemplateNoReload/>
                    </div>
                        <div className="signup__input">
                            <p>Enter the Captcha:</p>
                            <div className="signup__inputField">
                                <input type="text" ref={captchaRef} required/>
                            </div>
                            {wrongCaptcha && <p className="captcha">Captchas does not match !</p>}
                        </div>
                    <button type="submit" disabled={loading}>Login</button>
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
