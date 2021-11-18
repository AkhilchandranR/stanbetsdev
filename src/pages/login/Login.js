import React, { useEffect,useRef,useState } from 'react';
import Header from '../../components/Header/Header';
import './Login.css';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../States/slices/chatSlice';
import { useAuth } from "../../AuthContext";
import { db,auth } from '../../firebase';
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const captchaRef = useRef();
    const { login } = useAuth();
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

        //check the captcha,if wron then return else proceed to the login steps 
        if(validateCaptcha(captchaRef.current.value)==false){
            setWrongCaptcha(true);
            return
        }

        try{
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            .then((res)=>{
                if(!(res.user.emailVerified)){
                    window.alert("Please verify your email")
                    return
                }

                //update user's online status
                db.collection('users').doc(res.user.uid).update({
                    isOnline: true,
                    lastOnline: new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()
                }).catch((err)=>err)

                //route to the home page with the current user
                history.push("/");


            })
            .catch((err)=>console.log(err))

            
        }
        catch{
            window.alert("Invalid email or password")
        }
        setLoading(false);
        setWrongCaptcha(false);
    } 

    //password reset email
    const resetPassword = async() =>{
        try{
            await auth.sendPasswordResetEmail(emailRef.current.value)
            .then(() => {
                window.alert("Please check your mail for furthur instructions");
            })
            .catch((error) => {
                window.alert(error.message);
            });
        }
        catch{
            window.alert("Unable to sent email.Please try again")
        }
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
                        <p className="login__forgotPassword" onClick={resetPassword}>
                            Forgot Password ?
                        </p>
                    </div>
                    <div className="captcha__image">
                        <LoadCanvasTemplateNoReload/>
                    </div>
                        <div className="login__input">
                            <p>Enter the Captcha:</p>
                            <div className="login__inputField">
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
        </div>
    )
}

export default Login
