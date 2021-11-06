import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//production version of stanbets
// const firebaseConfig = {
//     apiKey: "AIzaSyCCLC9pPtKLgwdCpoA7105aDFYw2ZpGemA",
//     authDomain: "stanbets-f4ad4.firebaseapp.com",
//     projectId: "stanbets-f4ad4",
//     storageBucket: "stanbets-f4ad4.appspot.com",
//     messagingSenderId: "109801110642",
//     appId: "1:109801110642:web:cc7083afd850bb548156eb",
//     measurementId: "G-5X5LQEYGG5"
//   };

//development version
const firebaseConfig = {
  apiKey: "AIzaSyC6PAOL5IXzB7YzWQwMjQ-hV6bYnbJiXmw",
  authDomain: "stanbets-test-b83db.firebaseapp.com",
  projectId: "stanbets-test-b83db",
  storageBucket: "stanbets-test-b83db.appspot.com",
  messagingSenderId: "12568318192",
  appId: "1:12568318192:web:7eeaf571464267d3337235"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export default app; 