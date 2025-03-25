// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQf_QXzyZkyRxsbo91PJmdwjEn3lVfDTo",
  authDomain: "cosmicteams-bbf29.firebaseapp.com",
  projectId: "cosmicteams-bbf29",
  storageBucket: "cosmicteams-bbf29.appspot.com",
  messagingSenderId: "807144888137",
  appId: "1:807144888137:web:d4b1b9a0e523cd3cd6ec98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 