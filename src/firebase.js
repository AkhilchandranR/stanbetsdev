import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//production version of stanbets
const firebaseConfig = {
    apiKey: "AIzaSyCCLC9pPtKLgwdCpoA7105aDFYw2ZpGemA",
    authDomain: "stanbets-f4ad4.firebaseapp.com",
    projectId: "stanbets-f4ad4",
    storageBucket: "stanbets-f4ad4.appspot.com",
    messagingSenderId: "109801110642",
    appId: "1:109801110642:web:cc7083afd850bb548156eb",
    measurementId: "G-5X5LQEYGG5"
  };

// Development version
// const firebaseConfig = {
//   apiKey: "AIzaSyAi9Rgw6ZK2NV8t1O36sO4fsKTPfjbKQFI",
//   authDomain: "stanbets-dev2.firebaseapp.com",
//   projectId: "stanbets-dev2",
//   storageBucket: "stanbets-dev2.appspot.com",
//   messagingSenderId: "1021663084579",
//   appId: "1:1021663084579:web:789496da1fb5ae52aab196",
//   measurementId: "G-V1H2CF0J4T"
// };

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export default app; 