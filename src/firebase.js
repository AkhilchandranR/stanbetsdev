import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//production version of stanbets
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };


const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export default app; 