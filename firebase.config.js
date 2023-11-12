// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByJ2XjJPp3Vvpbw0DDW3CKRoGr0XgGZVc",
  authDomain: "alamin-login.firebaseapp.com",
  projectId: "alamin-login",
  storageBucket: "alamin-login.appspot.com",
  messagingSenderId: "385519153729",
  appId: "1:385519153729:web:89cab097df8180fdccccc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app