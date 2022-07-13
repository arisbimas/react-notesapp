// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// import firebase from 'firebase/compat';
// import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEcm8tl6shE22l0q_BuuV62dC0bZn_dyw",
  authDomain: "formyprojects-1bb32.firebaseapp.com",
  projectId: "formyprojects-1bb32",
  storageBucket: "formyprojects-1bb32.appspot.com",
  messagingSenderId: "860914854523",
  appId: "1:860914854523:web:71c7fc490b6caf9c3410de",
  measurementId: "G-HF7LLPTQZE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    debugger;

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
        .then((r) => {
          return user;
        })
        .catch((err) => {
          //log error
          console.log("success login w/ goggle but cant add new users");
        });
    }

    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (user) {
      const displayName = await updateProfileUser(name);
    }
    const addDc = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
  // console.log(out);
  // debugger;
};

const getUserByUID = async (UID) => {
  const q = query(collection(db, "users"), where("uid", "==", UID));
  const doc = await getDocs(q);
  debugger;
  const data = doc.docs[0].data();
  return data;
};

const updateProfileUser = async (displayName) => {
  const updateName = await updateProfile(auth.currentUser, {
    displayName: displayName,
  });
  debugger;
  console.log("updateName", updateName);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithEmailAndPassword,
  getUserByUID,
};
