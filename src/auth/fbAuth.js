//import firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWmNZyMLeEIO7Fg6tntuhJ81mT4_Xvzgs",
  authDomain: "kema-7aec6.firebaseapp.com",
  databaseURL: "https://kema-7aec6-default-rtdb.firebaseio.com",
  projectId: "kema-7aec6",
  storageBucket: "kema-7aec6.appspot.com",
  messagingSenderId: "786269936034",
  appId: "1:786269936034:web:e75ca9c08b2ef1c1c3bafb",
  measurementId: "G-ZZZW76QJ23",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fire = firebase;
export default fire;
