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
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDECiAt8hDgw_Tp0mqcu8sY2GzZYoOihX4",
  authDomain: "stanbets-dev-2bd85.firebaseapp.com",
  projectId: "stanbets-dev-2bd85",
  storageBucket: "stanbets-dev-2bd85.appspot.com",
  messagingSenderId: "956962062245",
  appId: "1:956962062245:web:2338dfebba35390ed0b24c",
  measurementId: "G-C9DM5JYLKD"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export default app; 