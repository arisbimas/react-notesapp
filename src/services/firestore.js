// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

import firebase from 'firebase/compat';
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEcm8tl6shE22l0q_BuuV62dC0bZn_dyw",
    authDomain: "formyprojects-1bb32.firebaseapp.com",
    projectId: "formyprojects-1bb32",
    storageBucket: "formyprojects-1bb32.appspot.com",
    messagingSenderId: "860914854523",
    appId: "1:860914854523:web:71c7fc490b6caf9c3410de",
    measurementId: "G-HF7LLPTQZE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
