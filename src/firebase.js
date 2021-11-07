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

// Development version
const firebaseConfig = {
  apiKey: "AIzaSyCLPrOzkWQ60bB8JrD_K8JPqiISbbHyLUM",
  authDomain: "stanbets-dev-ac21b.firebaseapp.com",
  projectId: "stanbets-dev-ac21b",
  storageBucket: "stanbets-dev-ac21b.appspot.com",
  messagingSenderId: "742490728990",
  appId: "1:742490728990:web:38f1765b37dc1bfe571c0f",
  measurementId: "G-58YQW24236"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export default app; 