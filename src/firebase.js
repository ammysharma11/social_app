


// src/firebase.js
import { initializeApp }    from "firebase/app";
import { getAuth }          from "firebase/auth";
import { getFirestore }     from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyCPqD50HWlhps7loxYpk7TwnjAXNUGDkys",
//   authDomain: "social-f9c06.firebaseapp.com",
//   projectId: "social-f9c06",
//   storageBucket: "social-f9c06.firebasestorage.app",
//   messagingSenderId: "494307194063",
//   appId: "1:494307194063:web:7f14963820214cde9af3ba",
//   measurementId: "G-27HEGS8HK8"
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,// ✅ working key
  authDomain: "social-f9c06.firebaseapp.com",
  projectId: "social-f9c06",
  storageBucket: "social-f9c06.firebasestorage.app",
  messagingSenderId: "494307194063",
  appId: "1:494307194063:web:7f14963820214cde9af3ba",
  measurementId: "G-27HEGS8HK8",
};



const app = initializeApp(firebaseConfig);

// **THIS LINE** must be here:
export const auth    = getAuth(app);
export const db      = getFirestore(app);