// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_fcITmZ5vMSLdUufZ65aou5oLAF1mXa0",
  authDomain: "wallet-watcher-8d92f.firebaseapp.com",
  projectId: "wallet-watcher-8d92f",
  storageBucket: "wallet-watcher-8d92f.appspot.com",
  messagingSenderId: "592652352815",
  appId: "1:592652352815:web:05b43874b3b9e43f6e75da",
  measurementId: "G-QQPHHCS9B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//firebase login
//firebase init
//firebase deploy