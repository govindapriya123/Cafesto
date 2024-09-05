// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDq4rvEUySTYhFvL-u0cVOmN1lSEay12aY",
    authDomain: "cafe-managment-system-a6c01.firebaseapp.com",
    projectId: "cafe-managment-system-a6c01",
    storageBucket: "cafe-managment-system-a6c01.appspot.com",
    messagingSenderId: "683118450007",
    appId: "1:683118450007:web:b1f1889b599628d0741a12",
    measurementId: "G-FKDZ4RZE9R"
  };

const app=initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };