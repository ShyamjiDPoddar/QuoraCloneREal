import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmyaORDnIYkI6UeObirzzJSTQL1ifqe7E",
  authDomain: "quaraclone-35598.firebaseapp.com",
  projectId: "quaraclone-35598",
  storageBucket: "quaraclone-35598.appspot.com",
  messagingSenderId: "739289029072",
  appId: "1:739289029072:web:babdddad4db69c0e9881d5",
  measurementId: "G-2V0NYZ04JF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export { auth, provider };
export default db;
