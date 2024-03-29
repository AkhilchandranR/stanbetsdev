import React,{ useRef,useState,useEffect } from 'react';
import Header from '../../components/Header/Header';
import './SignUp.css';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideChat } from '../../States/slices/chatSlice';
import { useAuth } from "../../AuthContext";
import { db } from '../../firebase';
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import axios from 'axios';


function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const captchaRef = useRef();
    const { signup } = useAuth();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [wrongCaptcha,setWrongCaptcha] = useState(false);
    const [nameTaken,setNameTaken] = useState(false);
    const[passwordNotMatching,setPasswordNotMatching] = useState(false);
    const dispatch = useDispatch();
    const restrictedUsernames = ["mod","owner","admin","system","stanbets"];

    useEffect(() => {
        //hides the chat icon when the user is not logged in
        dispatch(hideChat());
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

        //check for username format...
        if(!((nameRef.current.value).match("^[A-Za-z0-9]+$"))){
            window.alert("Username should only contain alphabets and numbers");
            return;
        }

        //check whether username is reserved...
        if(restrictedUsernames.includes((nameRef.current.value).toLowerCase())){
            window.alert("Please select a different username");
            return
        }

        //check for password matching...
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            setPasswordNotMatching(true);
            return;
        }

        //check the correctness of captcha..
        if(validateCaptcha(captchaRef.current.value)==false){
            setWrongCaptcha(true);
            return
        }

        //location is added while registering for the account
        const API_KEY = process.env.REACT_APP_LOCATION_ACCESS_KEY;
        const userCountry = await axios.get(`https://api.ipregistry.co/?key=${API_KEY}`)
        .then((response)=>response.data.location)
        .then((data)=>data.country.name)
        .catch((error)=>(error))
        
        //if everything passes proceed to login..., create tha user data with the
        //required credentials in the database.....
        try{
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            .then(
                (response)=>{
                    const today = new Date();
                    const creationDate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                    db.collection('users').doc(response.user.uid).set({
                        username: nameRef.current.value,
                        userId: response.user.uid,
                        isAdmin: false,
                        isMuted: false,
                        isOnline:false,
                        isBanned: false,
                        hasClaimedFree: false,
                        accountCreated: creationDate,
                        lastOnline: creationDate,
                        emailId:response.user.email,
                        country: userCountry,
                        totalBalance: 0,
                        totalDeposited: 0,
                        totalWithdrawn: 0,
                        totalWagered: 0,
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
            setPasswordNotMatching(false);
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
                        <div className="signup__input">
                            <p>Confirm Password:</p>
                            <div className="signup__inputField">
                                <input type="password" ref={confirmPasswordRef} required/>
                            </div>
                            {passwordNotMatching && <p className="captcha">Passwords does not match !</p>}
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
        </div>
    )
}

export default SignUp
