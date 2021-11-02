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
  apiKey: "AIzaSyAJuBgPE9Nlq-YSGg1S8p021eyexfDhY30",
  authDomain: "stanbets-test.firebaseapp.com",
  projectId: "stanbets-test",
  storageBucket: "stanbets-test.appspot.com",
  messagingSenderId: "873761308583",
  appId: "1:873761308583:web:ea3c3eaa94bba89533c082"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export default app; 