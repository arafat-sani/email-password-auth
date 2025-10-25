// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0fcencUyHG2FBIe3CT6VAH6100ESaQrQ",
  authDomain: "email-password-auth-7c311.firebaseapp.com",
  projectId: "email-password-auth-7c311",
  storageBucket: "email-password-auth-7c311.firebasestorage.app",
  messagingSenderId: "754975741587",
  appId: "1:754975741587:web:760d8e4a383d2867561f66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);

//donot share public 