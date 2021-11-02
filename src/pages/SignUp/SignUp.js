import React,{ useRef,useState,useEffect } from 'react';
import Header from '../../components/Header/Header';
import './SignUp.css';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../States/slices/chatSlice';
import Footer from '../../components/Footer/Footer';
import { useAuth } from "../../AuthContext";
import { db } from '../../firebase';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const captchaRef = useRef();
    const { signup,currentUser } = useAuth();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [wrongCaptcha,setWrongCaptcha] = useState(false);
    const [nameTaken,setNameTaken] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        //hides the chat icon when the user is not logged in
        const hideChatButton = () =>{
            dispatch(hideChat());
        }
        hideChatButton();
        //decides the length of captcha
        loadCaptchaEnginge(7);   
    })

    //function to create a user in database
    const handleSubmit = async(e) =>{
        e.preventDefault();

        //check if username is already taken
        const userData = await db.collection('users').get()
        const userCollection = userData?.docs?.map((doc)=>(
            doc?.data()
        ))
        if (userCollection.find((user)=>(
            nameRef.current.value == user.username))){
                    setNameTaken(true)
                    return
        }

        //check the correctness of captcha..
        if(validateCaptcha(captchaRef.current.value)==false){
            setWrongCaptcha(true);
            return
        }

        try{
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            .then(
                (response)=>{
                    const today = new Date();
                    const creationDate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                    db.collection('users').add({
                        username: nameRef.current.value,
                        userId: response.user.uid,
                        isAdmin: false,
                        isMuted: false,
                        isOnline:false,
                        accountCreated: creationDate,
                        lastOnline: creationDate,
                        emailId:response.user.email
                        // country: set country from the navigator,
                    })
                    response.user.sendEmailVerification()
                    .then(()=>{
                        window.alert("Email verification sent. Please verify to continue")
                        history.push("/login")
                    })
                    .catch((err)=>alert(err.message))
                }
            )
            .catch((error)=>{window.alert(error.message)})
            }
            catch{
                window.alert("SignIn not successfull")
            }
            setLoading(false);
            setWrongCaptcha(false);
            setNameTaken(false);
        }


    return (
        <div className="signup">
            <Header/>
            <div className="signup__body">
                <form className="signup__form" onSubmit={handleSubmit}>
                    <h1>Sign-Up</h1>
                        <div className="signup__input">
                            <p>Username:</p>
                            <div className="signup__inputField">
                                <input type="text" ref={nameRef} required/>
                            </div>
                            {nameTaken && <p className="captcha">Username already taken !</p>}
                        </div>
                        <div className="signup__input">
                            <p>Email:</p>
                            <div className="signup__inputField">
                                <input type="email" ref={emailRef} required/>
                            </div>
                        </div>
                        <div className="signup__input">
                            <p>Password:</p>
                            <div className="signup__inputField">
                                <input type="password" ref={passwordRef} required/>
                            </div>
                        </div>
                        <LoadCanvasTemplateNoReload/>
                        <div className="signup__input">
                            <p>Enter the Captcha:</p>
                            <div className="signup__inputField">
                                <input type="text" ref={captchaRef} required/>
                            </div>
                            {wrongCaptcha && <p className="captcha">Captchas does not match !</p>}
                        </div>
                        <button type="submit" disabled={loading}>Sign-Up</button>
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
