// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey:process.env.REACT_APP_apikey,
  // authDomain:process.env.REACT_APP_authDomain,
  // projectId:process.env.REACT_APP_projectId,
  // storageBucket:process.env.REACT_APP_storageBucket,
  // messagingSenderId:process.env.REACT_APP_messagingSenderId,
  // appId:process.env.REACT_APP_appId,
  apiKey: "AIzaSyC4dcr_6eBQ5oibmBIxR5HPdYtQUGNTC9c",
  authDomain: "doctors-portal-e02f6.firebaseapp.com",
  projectId: "doctors-portal-e02f6",
  storageBucket: "doctors-portal-e02f6.appspot.com",
  messagingSenderId: "665331429200",
  appId: "1:665331429200:web:5f1c1ea298ff9f75c6c655"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
